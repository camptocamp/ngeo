goog.provide('ngeo.SourceLoaderController');
goog.provide('ngeo.sourceLoaderDirective');

goog.require('ngeo');
goog.require('ngeo.WMSLayerFromCap');
goog.require('ngeo.formatIdentify');
goog.require('ol.format.WMSCapabilities');
goog.require('ol.format.WMTSCapabilities');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');


/**
 * @typedef {{
 *   url: string,
 *   type: string
 * }}
 * @export
 */
ngeo.SourceLoaderUrlObject;


/**
 * @return {angular.Directive} The directive specs.
 * @ngdoc directive
 * @ngname ngeoSourceLoader
 */
ngeo.sourceLoaderDirective = function() {
  return {
    restrict: 'A',
    controller: 'ngeoSourceLoaderController as sourceLoaderCtrl',
    scope: {
      'map': '=ngeoSourceLoader',
      'ogcproxy': '@ngeoSourceOgcproxy',
      'previewMap': '=ngeoSourceLoaderPreviewMap'
    },
    bindToController: true
  };
};

ngeoModule.directive('ngeoSourceLoader', ngeo.sourceLoaderDirective);



/**
 * @constructor
 * @param {angular.Scope} $scope
 * @param {angular.$http} $http
 * @param {angular.$q} $q
 * @ngInject
 * @export
 */
ngeo.SourceLoaderController = function($scope, $http, $q) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map; // scope

  /**
   * @type {string}
   * @export
   */
  this.ogcproxy; // scope

  /**
   * @type {ol.Map}
   * @export
   */
  this.previewMap; // scope

  // Hack to get the controller exported
  $scope.$parent['sourceLoaderCtrl'] = this;

  /**
   * @type {Array.<ngeox.LayerItem>|undefined}
   * @export
   */
  this.availableLayers = [];

  /**
   * @type {angular.$http}
   * @private
   */
  this.http_ = $http;

  /**
   * @type {angular.$q}
   * @private
   */
  this.q_ = $q;

  /**
   * @type {ol.format.WMTSCapabilities}
   * @private
   */
  this.wmtsCapabilityFormat_ = new ol.format.WMTSCapabilities();

  /**
   * @type {ol.format.WMSCapabilities}
   * @private
   */
  this.wmsCapabilityFormat_ = new ol.format.WMSCapabilities();
};


/**
 * @param {string} url
 * @param {ol.format.WMSCapabilities|ol.format.WMTSCapabilities} format
 * @return {angular.$q.Promise<string>}
 * @export
 */
ngeo.SourceLoaderController.prototype.retrieveCapability = function(url,
    format) {
  if (format instanceof ol.format.WMSCapabilities) {
    url += '?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0';
  } else if (format instanceof ol.format.WMTSCapabilities) {
    url += '/WMTSCapabilities.xml';
  }

  if (this.ogcproxy) {
    url = this.ogcproxy + encodeURIComponent(url);
  }

  return this.http_.get(url).then(function(response) {
    try {
      // When content is unknown we need to try parsing.
      // An alternative would be to identify the content first.
      return format.read(response.data);
    } catch (e) {
      return this.q_.reject(null);
    }
  }.bind(this));
};


/**
 * @param {string} url
 * @return {angular.$q.Promise<null|Array.<ol.Feature|null>|null>}
 * @export
 */
ngeo.SourceLoaderController.prototype.retrieveFile = function(url) {
  return this.http_.get(url).then(function(response) {
    var features = this.readFeaturesFromFileContent(response.data);
    return features && features.length > 0 ? features : this.q_.reject(null);
  }.bind(this));
};


/**
 * @param {ngeo.SourceLoaderUrlObject} urlObject
 * @export
 */
ngeo.SourceLoaderController.prototype.retrieveUrlObject = function(urlObject) {
  var url = urlObject.url;

  var resultPromise;
  switch (urlObject.type) {
    case 'file':
      resultPromise = this.retrieveFile(url);
      break;
    case 'unknown':
      // Take the first valid result from
      // File, then WMTS, then WMS.
      resultPromise = this.retrieveFile(url).then(null, function() {
        return this.retrieveCapability(url, this.wmtsCapabilityFormat_);
      }.bind(this)).then(null, function() {
        return this.retrieveCapability(url, this.wmsCapabilityFormat_);
      }.bind(this));
      break;
    case 'wmts':
      resultPromise = this.retrieveCapability(url, this.wmtsCapabilityFormat_);
      break;
    case 'wms':
      resultPromise = this.retrieveCapability(url, this.wmsCapabilityFormat_);
      break;
  }

  resultPromise.then(function(result) {
    if (!Array.isArray(result)) {
      // If WMS or WMTS get layers from capability result
      if (result.Capability.Layer) {
        var code = this.map.getView().getProjection().getCode();
        var layerFromCap = new ngeo.WMSLayerFromCap(this.map, result, url);
        var root = layerFromCap.getChildLayers(result.Capability.Layer, code);
        if (root) {
          this.availableLayers = root.children;
        }
      }
    } else {
      // if KML, geojson create vector layer using features
      var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: result
        })
      });
      this.map.addLayer(layer);
    }
  }.bind(this));
};


/**
 * @param {string} content
 * @return {Array.<ol.Feature>}
 */
ngeo.SourceLoaderController.prototype.readFeaturesFromFileContent =
    function(content) {
  var fConstructor = ngeo.formatIdentify(content);
  if (!fConstructor) {
    return null;
  }

  var format = new fConstructor();
  if (!(format instanceof ol.format.Feature)) {
    return null;
  }

  return format.readFeatures(content, {
    featureProjection: this.map.getView().getProjection()
  });
};


/**
 * @param {string} content
 */
ngeo.SourceLoaderController.prototype.readFileContent = function(content) {
  var features = this.readFeaturesFromFileContent(content);
  if (!features) {
    // FIXME: error?
    return;
  }

  // Add to the map
  var source = new ol.source.Vector({
    features: features
  });

  var layer = new ol.layer.Vector({
    source: source
  });

  this.map.addLayer(layer);
};

ngeoModule.controller('ngeoSourceLoaderController',
    ngeo.SourceLoaderController);
