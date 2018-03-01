goog.provide('app.permalink');

// webpack: import './permalink.css';
goog.require('ngeo.format.FeatureHash');
goog.require('ngeo.map.module');
goog.require('ngeo.misc.debounce');
goog.require('ngeo.misc.decorate');
goog.require('ngeo.statemanager.module');
goog.require('ol.Map');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @type {!angular.Module} **/
app.permalink.module = angular.module('app', [
  'gettext',
  ngeo.map.module.name,
  ngeo.misc.debounce.name,
  ngeo.statemanager.module.name,
]);

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
app.permalink.mapComponent = {
  controller: 'AppMapController as ctrl',
  bindings: {
    'map': '=appMap'
  },
  template: '<div ngeo-map=ctrl.map></div>'
};


app.permalink.module.component('appMap', app.permalink.mapComponent);


/**
 * @param {ngeo.statemanager.Location} ngeoLocation ngeo Location service.
 * @param {ngeox.miscDebounce} ngeoDebounce ngeo Debounce factory.
 * @constructor
 * @ngInject
 */
app.permalink.MapComponentController = function(ngeoLocation, ngeoDebounce) {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {ngeo.statemanager.Location}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {ngeox.miscDebounce}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;
};

app.permalink.module.controller('AppMapController', app.permalink.MapComponentController);

app.permalink.MapComponentController.prototype.$onInit = function() {
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
       * @param {ol.Object.Event} e Object event.
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
app.permalink.drawComponent = {
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


app.permalink.module.component('appDraw', app.permalink.drawComponent);


/**
 * @param {!angular.Scope} $scope Scope.
 * @param {!ngeo.statemanager.Location} ngeoLocation ngeo Location service.
 * @constructor
 * @export
 * @ngInject
 */
app.permalink.DrawComponentController = function($scope, ngeoLocation) {

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
   * @type {!ngeo.statemanager.Location}
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
   * @type {ol.interaction.Draw}
   * @export
   */
  this.interaction;
};

app.permalink.DrawComponentController.prototype.$onInit = function() {
  const vectorSource = this.layer.getSource();

  this.interaction = new ol.interaction.Draw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    source: vectorSource
  });

  this.interaction.setActive(false);
  this.map.addInteraction(this.interaction);
  ngeo.misc.decorate.interaction(this.interaction);

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
app.permalink.DrawComponentController.prototype.clearLayer = function() {
  this.layer.getSource().clear(true);
  this.featureSeq_ = 0;
  this.ngeoLocation_.deleteParam('features');
};

app.permalink.module.controller('AppDrawController', app.permalink.DrawComponentController);


/**
 * @constructor
 */
app.permalink.MainController = function() {

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


app.permalink.module.controller('MainController', app.permalink.MainController);
