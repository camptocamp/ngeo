goog.provide('app.GmfImportHelper');

goog.require('ol.format.GPX');
goog.require('ol.format.KML');
goog.require('ol.source.ImageWMS');
goog.require('ol.layer.Image');
goog.require('ol.source.Vector');
goog.require('ol.layer.Vector');


/**
 * @constructor
 * @param {ol.Map} map The map.
 * @param {angular.Scope} $scope The scope.
 * @param {ngeo.File} ngeoFile Ngeo file.
 * @param {angular.$q} $q Q.
 */
app.GmfImportHelper = function(map, $scope, ngeoFile, $q) {
  this.map_ = map;
  this.$scope_ = $scope;
  $scope['map'] = map;
  this.ngeoFile_ = ngeoFile;
  this.$q_ = $q;
  this.gpxFormat_ = new ol.format.GPX();
  this.kmlFormat_ = new ol.format.KML();

  this.urls = [
    {'name': 'geoadmin', 'url': 'https://wms.geo.admin.ch/'},
    {'name': 'heig', 'url': 'http://ogc.heig-vd.ch/mapserver/wms'}
  ];
};


/**
 * @param {Object} params .
 * @param {Object} options .
 * @return {ol.layer.Image} .
 */
app.GmfImportHelper.prototype.createWmsLayer = function(params, options) {
  options = options || {};
  options.id = 'WMS||' + options.label + '||' + options.url + '||' +
      params.LAYERS;

  // If the WMS has a version specified, we add it in
  // the id. It's important that the layer keeps the same id as the
  // one in the url otherwise it breaks the asynchronous reordering of
  // layers.
  if (params.VERSION) {
    options.id += '||' + params.VERSION;

    if (options.useReprojection) {
      options.projection = 'EPSG:4326';
      options.id += '||true';
    }
  } else {
    params.VERSION = '1.3.0';
  }

  var source = new ol.source.ImageWMS({
    params: params,
    url: options.url,
    ratio: options.ratio || 1,
    projection: options.projection
  });

  var layer = new ol.layer.Image({
    id: options.id,
    url: options.url,
    type: 'WMS',
    opacity: options.opacity,
    visible: options.visible,
    attribution: options.attribution,
    extent: options.extent,
    source: source
  });
  //gaDefinePropertiesForLayer(layer);
  // FIXME: do we need this? layer.label = options.label;
  return layer;
};

/**
 * @param {Object} getCapLayer .
 * @return {ol.layer.Image} .
 */
app.GmfImportHelper.prototype.getOlLayerFromGetCapLayer = function(getCapLayer) {
  var wmsParams = {
    LAYERS: getCapLayer.Name,
    VERSION: getCapLayer.wmsVersion
  };
  var wmsOptions = {
    url: getCapLayer.wmsUrl,
    label: getCapLayer.Title,
    //extent: gaMapUtils.intersectWithDefaultExtent(getCapLayer.extent),
    useReprojection: getCapLayer.useReprojection
  };
  return this.createWmsLayer(wmsParams, wmsOptions);
};


/**
 * @param {ol.Map} map The map
 * @param {Array<ol.Feature>} features The features
 */
app.GmfImportHelper.prototype.addFeatures = function(map, features) {
  var source = new ol.source.Vector({
    features: features
  });
  var layer = new ol.layer.Vector({
    source: source
  });
  map.addLayer(layer);
  var size = map.getSize();
  if (size) {
    map.getView().fit(source.getExtent(), size, {
      padding: [30, 30, 30, 30]
    });
  }
};


/** Manage data depending on the content
 * @param {string} data Content of the file.
 * @param {File} file Informations of the file (if available).
 * @return {angular.$q.Promise} The promise
 */
app.GmfImportHelper.prototype.handleFileContent = function(data, file) {
  var map = this.map_;
  var defer = this.$q_.defer();
  var $scope = this.$scope_;
  var ngeoFile = this.ngeoFile_;
  var features;

  $scope.gpxContent = null;
  $scope.kmlContent = null;
  $scope.wmsGetCap = null;
  $scope.wmtsGetCap = null;

  if (ngeoFile.isWmsGetCap(data)) {
    $scope.wmsGetCap = data;
    defer.resolve({
      message: 'download_succeeded'
    });
  } else if (ngeoFile.isKml(data)) {
    features = this.kmlFormat_.readFeatures(data, {
      featureProjection: map.getView().getProjection()
    });

    this.addFeatures(map, features);
    defer.reject({
      message: 'parse_failed',
      reason: 'not_implemented_yet'
    });
  } else if (ngeoFile.isGpx(data)) {
    features = this.gpxFormat_.readFeatures(data, {
      featureProjection: map.getView().getProjection()
    });

    this.addFeatures(map, features);
    defer.resolve({
      message: 'parse_succeeded'
    });

  } else {
    console.error('Unparseable content: ', data);
    defer.reject({
      message: 'parse_failed',
      reason: 'format_not_supported'
    });
  }
  // WMTS

  return defer.promise;
};


/**
 * @return {Object} the options
 */
app.GmfImportHelper.prototype.createOptions = function() {
  return {
    'urls': this.urls,
    //'isValidUrl': gaUrlUtils.isValid,
    'getOlLayerFromGetCapLayer': this.getOlLayerFromGetCapLayer.bind(this),
    'addPreviewLayer': function(map, layer) {
      return; // FIXME
    },
    'removePreviewLayer': function(map, layer) {
      return; // FIXME
    },
    //'transformExtent': gaMapUtils.intersectWithDefaultExtent,
    'transformUrl': function(url) {
      // Transform the url before loading it.
      if (/(wms|service\.svc|osm)/i.test(url)) {
        // Append WMS GetCapabilities default parameters
        url += '?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0';
      }
      return url;
    },
    'handleFileContent': this.handleFileContent.bind(this)
  };
};
