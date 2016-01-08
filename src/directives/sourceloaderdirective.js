goog.provide('ngeo.SourceLoaderController');
goog.provide('ngeo.sourceLoaderDirective');

goog.require('ngeo');
goog.require('ol.format.KML');
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
      'previewMap': '=ngeoSourceLoaderPreviewMap'
    },
    bindToController: true
  };
};

ngeoModule.directive('ngeoSourceLoader', ngeo.sourceLoaderDirective);



/**
 * @constructor
 * @param {angular.Scope} $scope
 * @ngInject
 * @export
 */
ngeo.SourceLoaderController = function($scope) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map; // scope

  /**
   * @type {ol.Map}
   * @export
   */
  this.previewMap; // scope

  // Hack to get the controller exported
  $scope.$parent['sourceLoaderCtrl'] = this;

  /**
   * @type {Array.<ngeo.SourceLoaderUrlObject>}
   * @export
   */
  this.availableLayers = [];
};


/**
 * @param {string} url
 * @export
 */
ngeo.SourceLoaderController.prototype.retrieveUnknownUrl = function(url) {
  // TODO: try each type of retrieval method (WMS, WMTS, KML, geojson, ...)
  this.availableLayers = [url + 'ufakelayer1', url + 'ufakelayer2'];
};


/**
 * @param {ngeo.SourceLoaderUrlObject} urlObject
 * @export
 */
ngeo.SourceLoaderController.prototype.retrieveUrlObject = function(urlObject) {
  // TODO
  // if WMS, use wms retrieval
  // if WMTS, use wmts retrieval
  // if KML, geojson, ... download and use dedicated retrieval
  this.availableLayers = [
    urlObject.url + 'ofakelayer1',
    urlObject.url + 'ofakelayer2'
  ];
};


/**
 * @param {string} content
 */
ngeo.SourceLoaderController.prototype.readFileContent = function(content) {
  var kmlFormat = new ol.format.KML();

  /** @type {Array.<ol.Feature>} */
  var features = kmlFormat.readFeatures(content, {
    featureProjection: this.map.getView().getProjection()
  });
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
