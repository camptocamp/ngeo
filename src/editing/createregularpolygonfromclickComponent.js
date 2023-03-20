import angular from 'angular';
import ngeoInteractionDrawRegularPolygonFromClick from 'ngeo/interaction/DrawRegularPolygonFromClick.js';
import * as olEvents from 'ol/events.js';
import olFeature from 'ol/Feature.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoCreateregularpolygonfromclick', []);

/**
 * A directive used to draw vector features of a single geometry type using
 * either a 'draw' or 'measure' interaction. Once a feature is finished being
 * drawn, it is added to a collection of features.
 *
 * The geometry types supported are:
 *  - Point
 *  - LineString
 *  - Polygon
 *
 * Example:
 *
 *     <a
 *       href
 *       translate
 *       ngeo-btn
 *       ngeo-createregularpolygonfromclick
 *       ngeo-createregularpolygonfromclick-active="ctrl.active"
 *       ngeo-createregularpolygonfromclick-angle="::ctrl.angle"
 *       ngeo-createregularpolygonfromclick-features="ctrl.features"
 *       ngeo-createregularpolygonfromclick-map="::ctrl.map"
 *       ngeo-createregularpolygonfromclick-radius="::ctrl.radius"
 *       ngeo-createregularpolygonfromclick-sides="::ctrl.sides"
 *       class="btn btn-default ngeo-createregularpolygonfromclick"
 *       ng-class="{active: ctrl.active}"
 *       ng-model="ctrl.active">
 *     </a>
 *
 * @htmlAttribute {boolean} ngeo-createregularpolygonfromclick-active Whether
 *     the directive is active or not.
 * @htmlAttribute {number|undefined} ngeo-createregularpolygonfromclick-angle
 *     Angle in radians. A value of 0 will have one of the shape's point
 *     facing up. Default value is 0.
 * @htmlAttribute {import("ol/Collection.js").default} ngeo-createregularpolygonfromclick-features
 *     The collection of features where to add those created by this directive.
 * @htmlAttribute {import("ol/Map.js").default} ngeo-createregularpolygonfromclick-map The map.
 * @htmlAttribute {number} ngeo-createregularpolygonfromclick-radius Radius
 *     size in map units.
 * @htmlAttribute {number|undefined} ngeo-createregularpolygonfromclick-sides
 *     The number of sides for the regular polygon. Default value is 3.
 *
 * @return {angular.IDirective} The directive specs.
 * @ngdoc directive
 * @ngname ngeoCreateregularpolygonfromclick
 */
function editingCreateRegularPolygonFromClickComponent() {
  return {
    controller: 'ngeoCreateregularpolygonfromclickController',
    bindToController: true,
    scope: {
      'active': '=ngeoCreateregularpolygonfromclickActive',
      'angle': '<?ngeoCreateregularpolygonfromclickAngle',
      'features': '=ngeoCreateregularpolygonfromclickFeatures',
      'map': '=ngeoCreateregularpolygonfromclickMap',
      'radius': '<ngeoCreateregularpolygonfromclickRadius',
      'sides': '<?ngeoCreateregularpolygonfromclickSides',
    },
  };
}

module.directive('ngeoCreateregularpolygonfromclick', editingCreateRegularPolygonFromClickComponent);

/**
 * @param {!angular.IScope} $scope Scope.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoCreateregularpolygonfromclickController
 */
function Controller($scope) {
  // == Scope properties ==

  /**
   * @type {boolean}
   */
  this.active = false;

  $scope.$watch(
    () => this.active,
    (newVal) => {
      this.interaction_.setActive(newVal);
    }
  );

  /**
   * @type {number|undefined}
   */
  this.angle;

  /**
   * @type {import("ol/Collection.js").default.<import("ol/Feature.js").default>}
   */
  this.features;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {number}
   */
  this.radius;

  /**
   * @type {number|undefined}
   */
  this.sides;

  // == Other properties ==

  /**
   * @type {import("ngeo/interaction/DrawRegularPolygonFromClick.js").default}
   * @private
   */
  this.interaction_;

  /**
   * @type {import("ol/events.js").EventsKey}
   * @private
   */
  this.interactionListenerKey_;

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
}

/**
 * Initialize the directive.
 */
Controller.prototype.$onInit = function () {
  this.interaction_ = new ngeoInteractionDrawRegularPolygonFromClick({
    angle: this.angle,
    radius: this.radius,
    sides: this.sides,
  });
  this.interaction_.setActive(this.active);

  this.interactionListenerKey_ = olEvents.listen(this.interaction_, 'drawend', this.handleDrawEnd_, this);

  this.map.addInteraction(this.interaction_);
};

/**
 * Called when a feature is finished being drawn. Add the feature to the
 * collection.
 * @param {import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleDrawEnd_ = function (evt) {
  // @ts-ignore: evt should be of type {import('ol/interaction/Draw.js').DrawEvent but he is private
  const feature = new olFeature(evt.detail.feature.getGeometry());
  this.features.push(feature);
};

/**
 * Cleanup event listeners and remove the interaction from the map.
 * @private
 */
Controller.prototype.handleDestroy_ = function () {
  olEvents.unlistenByKey(this.interactionListenerKey_);
  this.interaction_.setActive(false);
  this.map.removeInteraction(this.interaction_);
};

module.controller('ngeoCreateregularpolygonfromclickController', Controller);

export default module;
