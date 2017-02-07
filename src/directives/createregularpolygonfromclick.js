goog.provide('ngeo.CreateregularpolygonfromclickController');
goog.provide('ngeo.createregularpolygonfromclickComponent');

goog.require('ngeo');
goog.require('ngeo.interaction.DrawRegularPolygonFromClick');
goog.require('ol.Feature');
goog.require('ol.interaction.DrawEventType');


/**
 * A component used to draw vector features of a single geometry type using
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
 *     the component is active or not.
 * @htmlAttribute {number|undefined} ngeo-createregularpolygonfromclick-angle
 *     Angle in radians. A value of 0 will have one of the shape's point
 *     facing up. Default value is 0.
 * @htmlAttribute {ol.Collection} ngeo-createregularpolygonfromclick-features
 *     The collection of features where to add those created by this component.
 * @htmlAttribute {ol.Map} ngeo-createregularpolygonfromclick-map The map.
 * @htmlAttribute {number} ngeo-createregularpolygonfromclick-radius Radius
 *     size in map units.
 * @htmlAttribute {number|undefined} ngeo-createregularpolygonfromclick-sides
 *     The number of sides for the regular polygon. Default value is 3.
 *
 * @ngdoc component
 * @ngname ngeoCreateregularpolygonfromclick
 */
ngeo.createregularpolygonfromclickComponent = {
  controller: 'ngeoCreateregularpolygonfromclickController as crpfcCtrl',
  bindings: {
    'active': '=ngeoCreateregularpolygonfromclickActive',
    'angle': '<?ngeoCreateregularpolygonfromclickAngle',
    'features': '=ngeoCreateregularpolygonfromclickFeatures',
    'map': '=ngeoCreateregularpolygonfromclickMap',
    'radius': '<ngeoCreateregularpolygonfromclickRadius',
    'sides': '<?ngeoCreateregularpolygonfromclickSides'
  }
};

ngeo.module.component(
  'ngeoCreateregularpolygonfromclick',
  ngeo.createregularpolygonfromclickComponent);


/**
 * @param {!angular.Scope} $scope Scope.
 * @constructor
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoCreateregularpolygonfromclickController
 */
ngeo.CreateregularpolygonfromclickController = function($scope) {

  // == Scope properties ==

  /**
   * @type {boolean}
   * @export
   */
  this.active = this.active === true;

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
  this.interaction_ = new ngeo.interaction.DrawRegularPolygonFromClick({
    angle: this.angle,
    radius: this.radius,
    sides: this.sides
  });
  this.interaction_.setActive(this.active);

  /**
   * @type {ol.EventsKey}
   * @private
   */
  this.interactionListenerKey_ = ol.events.listen(
    this.interaction_,
    ol.interaction.DrawEventType.DRAWEND,
    this.handleDrawEnd_,
    this
  );

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
};


/**
 * Initialise the component.
 */
ngeo.CreateregularpolygonfromclickController.prototype.$onInit = function() {
  this.map.addInteraction(this.interaction_);
};


/**
 * Called when a feature is finished being drawn. Add the feature to the
 * collection.
 * @param {ol.interaction.Draw.Event} evt Event.
 * @private
 */
ngeo.CreateregularpolygonfromclickController.prototype.handleDrawEnd_ = function(evt) {
  const feature = new ol.Feature(evt.feature.getGeometry());
  this.features.push(feature);
};


/**
 * Cleanup event listeners and remove the interaction from the map.
 * @private
 */
ngeo.CreateregularpolygonfromclickController.prototype.handleDestroy_ = function() {
  ol.events.unlistenByKey(this.interactionListenerKey_);
  this.interaction_.setActive(false);
  this.map.removeInteraction(this.interaction_);
};


ngeo.module.controller(
  'ngeoCreateregularpolygonfromclickController',
  ngeo.CreateregularpolygonfromclickController);
