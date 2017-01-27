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
 * An application-specific map component that updates the URL in the browser
 * address bar when the map view changes. It also sets the initial view based
 * on the URL query params at init time.
 *
 * This component gets a reference to the map instance through the "app-map"
 * attribute.
 *
 * @type {!angular.Component}
 */
app.mapComponent = {
  controller: 'AppMapController as ctrl',
  bindings: {
    'map': '=appMap'
  },
  template: '<div ngeo-map=ctrl.map></div>'
};


app.module.component('appMap', app.mapComponent);


/**
 * @param {ngeo.Location} ngeoLocation ngeo Location service.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @constructor
 * @ngInject
 */
app.MapComponentController = function(ngeoLocation, ngeoDebounce) {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {ngeo.Location}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {ngeo.Debounce}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;
};

app.module.controller('AppMapController', app.MapComponentController);

app.MapComponentController.prototype.$onInit = function() {
  const view = this.map.getView();

  let zoom = this.ngeoLocation_.getParam('z');
  zoom = zoom !== undefined ? +zoom : 4;

  const x = this.ngeoLocation_.getParam('x');
  const y = this.ngeoLocation_.getParam('y');
  const center = (x !== undefined) && (y !== undefined) ?
      [+x, +y] : [0, 0];

  view.setCenter(center);
  view.setZoom(zoom);

  this.ngeoLocation_.updateParams({
    'z': zoom,
    'x': Math.round(center[0]),
    'y': Math.round(center[1])
  });

  view.on('propertychange',
      this.ngeoDebounce_(
          /**
           * @param {ol.ObjectEventType} e Object event.
           */
          (e) => {
            const center = view.getCenter();
            const params = {
              'z': view.getZoom(),
              'x': Math.round(center[0]),
              'y': Math.round(center[1])
            };
            this.ngeoLocation_.updateParams(params);
          }, 300, /* invokeApply */ true));
};

/**
 * A draw component that adds a simple draw tool.
 *
 * @type {!angular.Component}
 */
app.drawComponent = {
  controller: 'AppDrawController as ctrl',
  bindings: {
    'map': '=appDrawMap',
    'layer': '=appDrawLayer'
  },
  template:
      '<label>Enable drawing:' +
      '<input type="checkbox" ng-model="ctrl.interaction.active" />' +
      '</label><br>' +
      '<button ng-click="ctrl.clearLayer()">Clear layer</button>'
};


app.module.component('appDraw', app.drawComponent);


/**
 * @param {!angular.Scope} $scope Scope.
 * @param {!ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {!ngeo.Location} ngeoLocation ngeo Location service.
 * @constructor
 * @export
 * @ngInject
 */
app.DrawComponentController = function($scope, ngeoDecorateInteraction, ngeoLocation) {

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
   * @type {!ngeo.Location}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {number}
   * @private
   */
  this.featureSeq_ = 0;

  /**
   * @type {!ngeo.DecorateInteraction}
   * @private
   */
  this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.interaction;
};

app.DrawComponentController.prototype.$onInit = function() {
  const vectorSource = this.layer.getSource();

  this.interaction = new ol.interaction.Draw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    source: vectorSource
  });

  this.interaction.setActive(false);
  this.map.addInteraction(this.interaction);
  this.ngeoDecorateInteraction_(this.interaction);

  this.interaction.on('drawend', function(e) {
    e.feature.set('id', ++this.featureSeq_);
  }, this);

  // Deal with the encoding and decoding of features in the URL.

  const fhFormat = new ngeo.format.FeatureHash();

  vectorSource.on('addfeature', (e) => {
    const feature = e.feature;
    feature.setStyle(new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: [255, 0, 0, 1],
        width: 2
      })
    }));
    const features = vectorSource.getFeatures();
    const encodedFeatures = fhFormat.writeFeatures(features);
    this.scope_.$applyAsync(() => {
      this.ngeoLocation_.updateParams({'features': encodedFeatures});
    });
  });

  const encodedFeatures = this.ngeoLocation_.getParam('features');
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
app.DrawComponentController.prototype.clearLayer = function() {
  this.layer.getSource().clear(true);
  this.featureSeq_ = 0;
  this.ngeoLocation_.deleteParam('features');
};

app.module.controller('AppDrawController', app.DrawComponentController);


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
