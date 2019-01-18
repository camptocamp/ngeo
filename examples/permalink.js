/**
 */

import './permalink.css';
import angular from 'angular';
import ngeoFormatFeatureHash from 'ngeo/format/FeatureHash.js';

import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoMiscDecorate from 'ngeo/misc/decorate.js';
import ngeoStatemanagerModule from 'ngeo/statemanager/module.js';
import olMap from 'ol/Map.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';


/** @type {!angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscDebounce.name,
  ngeoStatemanagerModule.name,
]);

/**
 * An application-specific map component that updates the URL in the browser
 * address bar when the map view changes. It also sets the initial view based
 * on the URL query params at init time.
 *
 * This component gets a reference to the map instance through the "app-map"
 * attribute.
 *
 * @type {!angular.IComponentOptions}
 */
exports.mapComponent = {
  controller: 'AppMapController as ctrl',
  bindings: {
    'map': '=appMap'
  },
  template: '<div ngeo-map=ctrl.map></div>'
};


exports.module.component('appMap', exports.mapComponent);


/**
 * @param {import("ngeo/statemanager/Location.js").default} ngeoLocation ngeo Location service.
 * @param {miscDebounce} ngeoDebounce ngeo Debounce factory.
 * @constructor
 * @ngInject
 */
exports.MapComponentController = function(ngeoLocation, ngeoDebounce) {
  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map;

  /**
   * @type {import("ngeo/statemanager/Location.js").default}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {miscDebounce}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;
};

exports.module.controller('AppMapController', exports.MapComponentController);

exports.MapComponentController.prototype.$onInit = function() {
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
       * @param {import("ol/Object/Event.js").default} e Object event.
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
 * @type {!angular.IComponentOptions}
 */
exports.drawComponent = {
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


exports.module.component('appDraw', exports.drawComponent);


/**
 * @param {!angular.IScope} $scope Scope.
 * @param {!import("ngeo/statemanager/Location.js").default} ngeoLocation ngeo Location service.
 * @constructor
 * @export
 * @ngInject
 */
exports.DrawComponentController = function($scope, ngeoLocation) {

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map;

  /**
   * @type {import("ol/layer/Vector.js").default}
   */
  this.layer;

  /**
   * @type {!import("ngeo/statemanager/Location.js").default}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {number}
   * @private
   */
  this.featureSeq_ = 0;

  /**
   * @type {import("ol/interaction/Draw.js").default}
   * @export
   */
  this.interaction;
};

exports.DrawComponentController.prototype.$onInit = function() {
  const vectorSource = this.layer.getSource();

  this.interaction = new olInteractionDraw({
    type: /** @type {import("ol/geom/GeometryType.js").default} */ ('LineString'),
    source: vectorSource
  });

  this.interaction.setActive(false);
  this.map.addInteraction(this.interaction);
  ngeoMiscDecorate.interaction(this.interaction);

  this.interaction.on('drawend', function(e) {
    e.feature.set('id', ++this.featureSeq_);
  }, this);

  // Deal with the encoding and decoding of features in the URL.

  const fhFormat = new ngeoFormatFeatureHash();

  vectorSource.on('addfeature', (e) => {
    const feature = e.feature;
    feature.setStyle(new olStyleStyle({
      stroke: new olStyleStroke({
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
exports.DrawComponentController.prototype.clearLayer = function() {
  this.layer.getSource().clear(true);
  this.featureSeq_ = 0;
  this.ngeoLocation_.deleteParam('features');
};

exports.module.controller('AppDrawController', exports.DrawComponentController);


/**
 * @constructor
 */
exports.MainController = function() {

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ]
  });


  const vectorSource = new olSourceVector();

  /**
   * @type {import("ol/layer/Vector.js").default}
   * @export
   */
  this.vectorLayer = new olLayerVector({
    source: vectorSource
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  this.vectorLayer.setMap(this.map);

};


exports.module.controller('MainController', exports.MainController);


export default exports;
