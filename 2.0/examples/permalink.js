


/** @const **/
var app = {};


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
 */
app.mapDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appMap'
    },
    controller: 'AppMapController',
    controllerAs: 'ctrl',
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

  var map = this.map;
  var view = map.getView();

  var zoom = ngeoLocation.getParam('z');
  zoom = angular.isDefined(zoom) ? +zoom : 4;

  var x = ngeoLocation.getParam('x');
  var y = ngeoLocation.getParam('y');
  var center = angular.isDefined(x) && angular.isDefined(y) ?
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
            var center = view.getCenter();
            var params = {
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
    controller: 'AppDrawController',
    controllerAs: 'ctrl',
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

  var vectorSource = this.layer.getSource();

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.interaction = new ol.interaction.Draw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    source: vectorSource
  });

  var interaction = this.interaction;
  interaction.setActive(false);
  this.map.addInteraction(interaction);
  ngeoDecorateInteraction(interaction);

  this.interaction.on('drawend', function(e) {
    e.feature.set('id', ++this.featureSeq_);
  }, this);


  // Deal with the encoding and decoding of features in the URL.

  var fhFormat = new ngeo.format.FeatureHash();

  vectorSource.on('addfeature', function(e) {
    var feature = e.feature;
    feature.setStyle(new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: [255, 0, 0, 1],
        width: 2
      })
    }));
    var features = vectorSource.getFeatures();
    var encodedFeatures = fhFormat.writeFeatures(features);
    $scope.$applyAsync(function() {
      ngeoLocation.updateParams({'features': encodedFeatures});
    });
  });

  var encodedFeatures = ngeoLocation.getParam('features');
  if (angular.isDefined(encodedFeatures)) {
    var features = fhFormat.readFeatures(encodedFeatures);
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


  var vectorSource = new ol.source.Vector();

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
