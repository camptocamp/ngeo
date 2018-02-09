goog.provide('gmf.map.mousepositionComponent');

goog.require('gmf');
goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ngeo.misc.filters');
goog.require('ol.control.MousePosition');
goog.require('ol.proj');


/**
 * @type {!angular.Module}
 */
gmf.map.mousepositionComponent = angular.module('gmfMapMouseposition', [
  ngeo.misc.filters.name,
]);


/**
 * Provide a component to display the mouse position coordinates depending
 * on the chosen projection. The component also provides a projection picker
 * to choose how the coordinates are displayed.
 * service.
 *
 * Example:
 *  <gmf-mouseposition gmf-mouseposition-map="ctrl.map"
 *     gmf-mouseposition-projections="ctrl.projections">
 *  </gmf-mouseposition>
 *
 * @htmlAttribute {ol.Map} gmf-mouseposition-map The map.
 * @htmlAttribute {Array.<gmfx.MousePositionProjection>}
 *    gmf-mouseposition-projection The list of the projections.
 *
 * @ngdoc component
 * @ngname gmfMouseposition
 */
gmf.map.mousepositionComponent.component_ = {
  controller: 'gmfMousepositionController as ctrl',
  bindings: {
    'map': '<gmfMousepositionMap',
    'projections': '<gmfMousepositionProjections'
  },
  templateUrl: () => `${gmf.baseModuleTemplateUrl}/map/mousepositionComponent.html`
};

gmf.map.mousepositionComponent.component('gmfMouseposition',
  gmf.map.mousepositionComponent.component_);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.$filter} $filter Angular filter.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname gmfMousepositionController
 */
gmf.map.mousepositionComponent.Controller_ = function($element, $filter, $scope, gettextCatalog) {
  /**
   * @type {!ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {!Array.<!gmfx.MousePositionProjection>}
   * @export
   */
  this.projections;

  /**
   * @type {!gmfx.MousePositionProjection}
   * @export
   */
  this.projection;

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.$element_ = $element;

  /**
   * @type {angular.$filter}
   * @private
   */
  this.$filter_ = $filter;

  /**
   * @type  {?ol.control.MousePosition}
   * @private
   */
  this.control_ = null;
};


/**
 * Initialise the controller.
 */
gmf.map.mousepositionComponent.Controller_.prototype.$onInit = function() {
  this.$scope_.$on('gettextLanguageChanged', () => {
    this.initOlControl_();
  });

  // Init control once, in case of applications that never set the language.
  this.initOlControl_();
};


/**
 * Init the ol.control.MousePosition
 * @private
 */
gmf.map.mousepositionComponent.Controller_.prototype.initOlControl_ = function() {
  if (this.control_ !== null) {
    this.map.removeControl(this.control_);
  }

  // function that apply the filter.
  const formatFn = function(coordinates) {
    const filterAndArgs = this.projection.filter.split(':');
    const filter = this.$filter_(filterAndArgs.shift());
    goog.asserts.assertFunction(filter);
    const args = filterAndArgs;
    args.unshift(coordinates);
    return filter.apply(this, args);
  };

  const gettextCatalog = this.gettextCatalog_;
  this.control_ = new ol.control.MousePosition({
    className: 'gmf-mouseposition-control',
    coordinateFormat: formatFn.bind(this),
    target: angular.element('.gmf-mouseposition-control-target', this.$element_)[0],
    undefinedHTML: gettextCatalog.getString('Coordinates')
  });

  this.setProjection(this.projections[0]);

  this.map.addControl(this.control_);
};


/**
 * @param {gmfx.MousePositionProjection} projection The new projection to use.
 * @export
 */
gmf.map.mousepositionComponent.Controller_.prototype.setProjection = function(projection) {
  this.control_.setProjection(ol.proj.get(projection.code));
  this.projection = projection;
};

gmf.map.mousepositionComponent.controller('gmfMousepositionController',
  gmf.map.mousepositionComponent.Controller_);
