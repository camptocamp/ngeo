goog.provide('gmf.wmskmlDirective');

goog.require('gmf');

goog.require('ol.format.GPX');
goog.require('ol.format.KML');


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
 * @param {gmf.Themes} gmfThemes The gmf Themes service.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {gettext} gettext .
 * @param {ngeo.File} ngeoFile Ngeo file.
 * @param {angular.$q} $q Q.
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDrawfeatureController
 */
gmf.WmskmlController = function(gmfThemes, gmfTreeManager, gettext, ngeoFile, $q) {
  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {number}
   * @private
   */
  this.nextFreshId_ = -1;

  this.firstLevelGroups_ = {};

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
 * @private
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

  this.addFirstLevelWMSGroup_(this['sourceName'], options.url).then((group) => {
    const gmfLayerWms = /** @type {!gmfThemes.GmfLayerWMS} */ ({
      childLayers: [{
        maxResolutionHint: Infinity,
        minResolutionHint: 0,
        name: params['LAYERS']
      }],
      id: this.freshId_(), // FIXME
      imageType: 'image/png',
      layers: params['LAYERS'],
      metadata: {
        isChecked: true
      },
      maxResolutionHint: Infinity,
      minResolutionHint: 0,
      name: options['label'],
      type: 'WMS'
    });

    group.children.push(gmfLayerWms);

    this.gmfTreeManager_.addFirstLevelGroups([group]);
  });

  return null;
};


/**
 * @private
 * @returns {angular.$q.Promise.<!gmfThemes.GmfGroup>}
 */
gmf.WmskmlController.prototype.addFirstLevelWMSGroup_ = function(name, ogcServerUrl) {
  if (this.firstLevelGroups_[name]) {
    return this.$q_.when(this.firstLevelGroups_[name]);
  } else {
    return this.gmfThemes_.getOgcServersObject().then((ogcServers) => {
      const ogcServer = /** @type {!gmfThemes.GmfOgcServer} */ ({
        credential: false,
        url: ogcServerUrl,
        isSingleTile: false,
        wfsSupport: false,
        urlWfs: '',
        type: 'mapserver',
        imageType: 'image/png'
      });

      ogcServers[name] = ogcServer;

      this.firstLevelGroups_[name] = {
        children: [],
        dimensions: {},
        id: this.freshId_(),
        metadata: {},
        mixed: false,
        name: name,
        ogcServer: name
      };

      return this.firstLevelGroups_[name];
    });
  }
};


/**
 * @private
 * @returns {!gmfThemes.GmfGroup}
 */
gmf.WmskmlController.prototype.addFirstLevelWMTSGroup_ = function(name) {
  if (!this.firstLevelGroups_[name]) {
    this.firstLevelGroups_[name] = {
      children: [],
      dimensions: {},
      id: this.freshId_(),
      metadata: {},
      mixed: true,
      name: name
    };
  }
  return this.firstLevelGroups_[name];
};


/**
 * @private
 * @returns {number}
 */
gmf.WmskmlController.prototype.freshId_ = function() {
  // FIXME: find a better way to generate unique ids, maybe using strings?
  const freshId = this.nextFreshId_;
  this.nextFreshId_--;
  return freshId;
};


/**
 * @private
 * @param {Object} options .
 * @return {ol.layer.Tile} .
 */
gmf.WmskmlController.prototype.createWmtsLayer_ = function(options) {
  const group = this.addFirstLevelWMTSGroup_(this['sourceName']);
  const gmfLayerWmts = /** @type {!gmfThemes.GmfLayerWMTS} */ ({
    childLayers: [{
      maxResolutionHint: Infinity,
      minResolutionHint: 0,
      name: options['sourceConfig']['layer']
    }],
    id: this.freshId_(), // FIXME
    imageType: options['sourceConfig']['format'],
    layer: options['sourceConfig']['layer'],
    metadata: {
      isChecked: true
    },
    maxResolutionHint: Infinity,
    minResolutionHint: 0,
    name: options['Title'],
    type: 'WMTS',
    url: options['capabilitiesUrl']
  });

  group.children.push(gmfLayerWmts);

  this.gmfTreeManager_.addFirstLevelGroups([group]);

  return null;
};


/**
 * @private
 * @param {Object} getCapLayer .
 * @return {ol.layer.Image|ol.layer.Tile} .
 */
gmf.WmskmlController.prototype.getOlLayerFromGetCapLayer_ = function(getCapLayer) {
  // if (getCapLayer['capabilitiesUrl']) {
  if (this['wmtsUrl']) {
    getCapLayer['capabilitiesUrl'] = this['wmtsUrl'];
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
 * @private
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
 * @private
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
    this['sourceName'] = metadata['name'];
    this['wmtsUrl'] = null;
    defer.resolve({
      'message': this.gettext_('Download succeeded')
    });
  } else if (ngeoFile.isWmtsGetCap(data)) {
    this['wmtsGetCap'] = data;
    this['sourceName'] = metadata['name'];
    this['wmtsUrl'] = metadata['url'];
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
