/**
 * @module ngeo.editing.createregularpolygonfromclickComponent
 */
import ngeoInteractionDrawRegularPolygonFromClick from 'ngeo/interaction/DrawRegularPolygonFromClick.js';
import * as olEvents from 'ol/events.js';
import olFeature from 'ol/Feature.js';

const exports = angular.module('ngeoCreateregularpolygonfromclick', [
]);


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
 * @htmlAttribute {ol.Collection} ngeo-createregularpolygonfromclick-features
 *     The collection of features where to add those created by this directive.
 * @htmlAttribute {ol.Map} ngeo-createregularpolygonfromclick-map The map.
 * @htmlAttribute {number} ngeo-createregularpolygonfromclick-radius Radius
 *     size in map units.
 * @htmlAttribute {number|undefined} ngeo-createregularpolygonfromclick-sides
 *     The number of sides for the regular polygon. Default value is 3.
 *
 * @return {angular.Directive} The directive specs.
 * @ngdoc directive
 * @ngname ngeoCreateregularpolygonfromclick
 */
exports.directive_ = function() {
  return {
    controller: 'ngeoCreateregularpolygonfromclickController',
    bindToController: true,
    scope: {
      'active': '=ngeoCreateregularpolygonfromclickActive',
      'angle': '<?ngeoCreateregularpolygonfromclickAngle',
      'features': '=ngeoCreateregularpolygonfromclickFeatures',
      'map': '=ngeoCreateregularpolygonfromclickMap',
      'radius': '<ngeoCreateregularpolygonfromclickRadius',
      'sides': '<?ngeoCreateregularpolygonfromclickSides'
    }
  };
};

exports.directive(
  'ngeoCreateregularpolygonfromclick',
  exports.directive_
);


/**
 * @param {!angular.Scope} $scope Scope.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoCreateregularpolygonfromclickController
 */
exports.Controller_ = function($scope) {

  // == Scope properties ==

  /**
   * @type {boolean}
   * @export
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
   * @export
   */
  this.angle;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.features;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {number}
   * @export
   */
  this.radius;

  /**
   * @type {number|undefined}
   * @export
   */
  this.sides;


  // == Other properties ==

  /**
   * @type {ngeo.interaction.DrawRegularPolygonFromClick}
   * @private
   */
  this.interaction_;

  /**
   * @type {ol.EventsKey}
   * @private
   */
  this.interactionListenerKey_;

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
};


/**
 * Initialize the directive.
 */
exports.Controller_.prototype.$onInit = function() {

  this.interaction_ = new ngeoInteractionDrawRegularPolygonFromClick({
    angle: this.angle,
    radius: this.radius,
    sides: this.sides
  });
  this.interaction_.setActive(this.active);

  this.interactionListenerKey_ = olEvents.listen(
    this.interaction_,
    'drawend',
    this.handleDrawEnd_,
    this
  );

  this.map.addInteraction(this.interaction_);
};


/**
 * Called when a feature is finished being drawn. Add the feature to the
 * collection.
 * @param {ol.interaction.Draw.Event} evt Event.
 * @private
 */
exports.Controller_.prototype.handleDrawEnd_ = function(evt) {
  const feature = new olFeature(evt.feature.getGeometry());
  this.features.push(feature);
};


/**
 * Cleanup event listeners and remove the interaction from the map.
 * @private
 */
exports.Controller_.prototype.handleDestroy_ = function() {
  olEvents.unlistenByKey(this.interactionListenerKey_);
  this.interaction_.setActive(false);
  this.map.removeInteraction(this.interaction_);
};


exports.controller(
  'ngeoCreateregularpolygonfromclickController',
  exports.Controller_
);


export default exports;
