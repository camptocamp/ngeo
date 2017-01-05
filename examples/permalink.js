goog.provide('app.permalink');

goog.require('ngeo.Debounce');
goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.Location');
goog.require('ngeo.format.FeatureHash');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.geom.GeometryType');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * An application-specific map directive that updates the URL in the browser
 * address bar when the map view changes. It also sets the initial view based
 * on the URL query params at init time.
 *
 * This directive gets a reference to the map instance through the "app-map"
 * attribute.
 *
 * @return {angular.Directive} The directive specs.
 * @ngInject
 */
app.mapDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appMap'
    },
    controller: 'AppMapController as ctrl',
    bindToController: true,
    template: '<div ngeo-map=ctrl.map></div>'
  };
};


app.module.directive('appMap', app.mapDirective);


/**
 * @param {ngeo.Location} ngeoLocation ngeo Location service.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @constructor
 * @ngInject
 */
app.MapDirectiveController = function(ngeoLocation, ngeoDebounce) {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  const map = this.map;
  const view = map.getView();

  let zoom = ngeoLocation.getParam('z');
  zoom = zoom !== undefined ? +zoom : 4;

  const x = ngeoLocation.getParam('x');
  const y = ngeoLocation.getParam('y');
  const center = (x !== undefined) && (y !== undefined) ?
      [+x, +y] : [0, 0];

  view.setCenter(center);
  view.setZoom(zoom);

  ngeoLocation.updateParams({
    'z': zoom,
    'x': Math.round(center[0]),
    'y': Math.round(center[1])
  });

  view.on('propertychange',
      ngeoDebounce(
          /**
           * @param {ol.ObjectEvent} e Object event.
           */
          function(e) {
            const center = view.getCenter();
            const params = {
              'z': view.getZoom(),
              'x': Math.round(center[0]),
              'y': Math.round(center[1])
            };
            ngeoLocation.updateParams(params);
          }, 300, /* invokeApply */ true));
};


app.module.controller('AppMapController', app.MapDirectiveController);


/**
 * A draw directive that adds a simple draw tool.
 *
 * @return {angular.Directive} The directive specs.
 */
app.drawDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appDrawMap',
      'layer': '=appDrawLayer'
    },
    controller: 'AppDrawController as ctrl',
    bindToController: true,
    template:
        '<label>Enable drawing:' +
        '<input type="checkbox" ng-model="ctrl.interaction.active" />' +
        '</label><br>' +
        '<button ng-click="ctrl.clearLayer()">Clear layer</button>'

  };
};


app.module.directive('appDraw', app.drawDirective);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {ngeo.Location} ngeoLocation ngeo Location service.
 * @constructor
 * @export
 * @ngInject
 */
app.DrawDirectiveController = function($scope, ngeoDecorateInteraction, ngeoLocation) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {ol.layer.Vector}
   */
  this.layer;

  /**
   * @type {ngeo.Location}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {number}
   * @private
   */
  this.featureSeq_ = 0;

  const vectorSource = this.layer.getSource();

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.interaction = new ol.interaction.Draw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    source: vectorSource
  });

  const interaction = this.interaction;
  interaction.setActive(false);
  this.map.addInteraction(interaction);
  ngeoDecorateInteraction(interaction);

  this.interaction.on('drawend', function(e) {
    e.feature.set('id', ++this.featureSeq_);
  }, this);


  // Deal with the encoding and decoding of features in the URL.

  const fhFormat = new ngeo.format.FeatureHash();

  vectorSource.on('addfeature', function(e) {
    const feature = e.feature;
    feature.setStyle(new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: [255, 0, 0, 1],
        width: 2
      })
    }));
    const features = vectorSource.getFeatures();
    const encodedFeatures = fhFormat.writeFeatures(features);
    $scope.$applyAsync(function() {
      ngeoLocation.updateParams({'features': encodedFeatures});
    });
  });

  const encodedFeatures = ngeoLocation.getParam('features');
  if (encodedFeatures !== undefined) {
    const features = fhFormat.readFeatures(encodedFeatures);
    this.featureSeq_ = features.length;
    vectorSource.addFeatures(features);
  }

};


/**
 * Clear the vector layer.
 * @export
 */
app.DrawDirectiveController.prototype.clearLayer = function() {
  this.layer.getSource().clear(true);
  this.featureSeq_ = 0;
  this.ngeoLocation_.deleteParam('features');
};

app.module.controller('AppDrawController', app.DrawDirectiveController);


/**
 * @constructor
 */
app.MainController = function() {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ]
  });


  const vectorSource = new ol.source.Vector();

  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  this.vectorLayer.setMap(this.map);

};


app.module.controller('MainController', app.MainController);
