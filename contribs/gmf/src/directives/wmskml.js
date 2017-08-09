goog.provide('gmf.wmskmlDirective');

goog.require('gmf');

goog.require('ol.format.GPX');
goog.require('ol.format.KML');
goog.require('ol.source.ImageWMS');
goog.require('ol.layer.Image');
goog.require('ol.source.Vector');
goog.require('ol.layer.Vector');


/**
 * Directive used to add layers by adding a WMS URL or uploading a KML file.
 *
 * @ngInject
 * @ngdoc directive
 * @ngname gmfWmskml
 */
gmf.wmskmlDirective = function() {
  return {
    controller: 'GmfWmskmlController as wkCtrl',
    scope: {
      'active': '=gmfWmskmlActive',
      'map': '<gmfWmskmlMap',
      'importOptions': '=gmfWmskmlImportOptions',
      'wmsGetCap': '=gmfWmskmlWmsGetCap',
      'wmtsGetCap': '=gmfWmskmlWmtsGetCap'
    },
    bindToController: true,
    templateUrl: `${gmf.baseTemplateUrl}/wmskml.html`
  };
};

gmf.module.directive('gmfWmskml', gmf.wmskmlDirective);


/**
 * @constructor
 * @private
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {gettext} gettext .
 * @param {ngeo.File} ngeoFile Ngeo file.
 * @param {angular.$q} $q Q.
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDrawfeatureController
 */
gmf.WmskmlController = function(gmfTreeManager, gettext, ngeoFile, $q) {
  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  this.gettext_ = gettext;
  this.ngeoFile_ = ngeoFile;
  this.$q_ = $q;

  this.gpxFormat_ = new ol.format.GPX();
  this.kmlFormat_ = new ol.format.KML();
};


gmf.WmskmlController.prototype.$onInit = function() {
  this['importOptions']['getOlLayerFromGetCapLayer'] = this.getOlLayerFromGetCapLayer_.bind(this);
  this['importOptions']['handleFileContent'] = this.handleFileContent_.bind(this);
};


/**
 * @param {Object} params .
 * @param {Object} options .
 * @return {ol.layer.Image} .
 */
gmf.WmskmlController.prototype.createWmsLayer_ = function(params, options) {
  options = options || {};
  options.id = `WMS||${options.label}||${options.url}||${params['LAYERS']}`;

  // If the WMS has a version specified, we add it in
  // the id. It's important that the layer keeps the same id as the
  // one in the url otherwise it breaks the asynchronous reordering of
  // layers.
  if (params.VERSION) {
    options.id += `||${params.VERSION}`;

    if (options['useReprojection']) {
      options.projection = 'EPSG:4326';
      options.id += '||true';
    }
  } else {
    params.VERSION = '1.3.0';
  }

  const source = new ol.source.ImageWMS({
    params,
    url: options.url,
    ratio: options.ratio || 1,
    projection: options.projection
  });

  const layer = new ol.layer.Image({
    id: options.id,
    url: options.url,
    type: 'WMS',
    opacity: options.opacity,
    visible: options.visible,
    attribution: options.attribution,
    extent: options.extent,
    source
  });
  //gaDefinePropertiesForLayer(layer);
  // FIXME: do we need this? layer.label = options.label;
  // return layer;

  this.gmfTreeManager_.addFirstLevelGroups([])
};


/**
 * @param {Object} options .
 * @return {ol.layer.Tile} .
 */
gmf.WmskmlController.prototype.createWmtsLayer_ = function(options) {
  const source = new ol.source.WMTS(options['sourceConfig']);

  const layer = new ol.layer.Tile({
    id: options['id'],
    extent: options.extent,
    source
  });

  return layer;
};


/**
 * @param {Object} getCapLayer .
 * @return {ol.layer.Image|ol.layer.Tile} .
 */
gmf.WmskmlController.prototype.getOlLayerFromGetCapLayer_ = function(getCapLayer) {
  if (getCapLayer['capabilitiesUrl']) {
    return this.createWmtsLayer_(getCapLayer);
  }

  const wmsParams = {
    'LAYERS': getCapLayer['Name'],
    'VERSION': getCapLayer['wmsVersion']
  };
  const wmsOptions = {
    url: getCapLayer['wmsUrl'],
    label: getCapLayer['Title'],
    //extent: gaMapUtils.intersectWithDefaultExtent(getCapLayer.extent),
    'useReprojection': getCapLayer['useReprojection']
  };
  return this.createWmsLayer_(wmsParams, wmsOptions);
};


/**
 * @param {ol.Map} map The map
 * @param {Array<ol.Feature>} features The features
 */
gmf.WmskmlController.prototype.addFeatures_ = function(map, features) {
  const source = new ol.source.Vector({
    features
  });
  const layer = new ol.layer.Vector({
    source
  });
  map.addLayer(layer);
  const size = map.getSize();
  if (size) {
    map.getView().fit(source.getExtent(), {size, padding: [30, 30, 30, 30]});
  }
};


/** Manage data depending on the content
 * @param {string} data Content of the file.
 * @param {Object} metadata
 * @return {angular.$q.Promise} The promise
 */
gmf.WmskmlController.prototype.handleFileContent_ = function(data, metadata) {
  const map = this.map;
  const defer = this.$q_.defer();
  const ngeoFile = this.ngeoFile_;

  this['wmsGetCap'] = null;
  this['wmtsGetCap'] = null;

  if (ngeoFile.isWmsGetCap(data)) {
    this['wmsGetCap'] = data;
    defer.resolve({
      'message': this.gettext_('Download succeeded')
    });
  } else if (ngeoFile.isWmtsGetCap(data)) {
    this['wmtsGetCap'] = data;
    defer.resolve({
      'message': this.gettext_('Download succeeded')
    });
  } else if (ngeoFile.isKml(data)) {
    const features = this.kmlFormat_.readFeatures(data, {
      featureProjection: map.getView().getProjection()
    });

    this.addFeatures_(map, features);
    defer.resolve({
      'message': this.gettext_('Parsing succeeded')
    });
  } else if (ngeoFile.isGpx(data)) {
    const features = this.gpxFormat_.readFeatures(data, {
      featureProjection: map.getView().getProjection()
    });

    this.addFeatures_(map, features);
    defer.resolve({
      'message': this.gettext_('Parsing succeeded')
    });

  } else {
    console.error('Unparseable content: ', data);
    defer.reject({
      'message': this.gettext_('Parsing failed'),
      'reason': this.gettext_('unsupported format')
    });
  }
  // WMTS

  return defer.promise;
};


gmf.module.controller('GmfWmskmlController', gmf.WmskmlController);
