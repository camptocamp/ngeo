/**
 * @module gmf.map.mousepositionComponent
 */
import googAsserts from 'goog/asserts.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import olControlMousePosition from 'ol/control/MousePosition.js';
import * as olProj from 'ol/proj.js';

import 'bootstrap/js/src/dropdown.js';


/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfMapMouseposition', [
  ngeoMiscFilters.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/map/mousepositionComponent', require('./mousepositionComponent.html'));
});


exports.value('gmfMapMousepositionTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfMapMousepositionTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/map/mousepositionComponent';
  });


/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} gmfMapMousepositionTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfMapMousepositionTemplateUrl($attrs, gmfMapMousepositionTemplateUrl) {
  return gmfMapMousepositionTemplateUrl($attrs);
}

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
const component = {
  controller: 'gmfMousepositionController as ctrl',
  bindings: {
    'map': '<gmfMousepositionMap',
    'projections': '<gmfMousepositionProjections'
  },
  templateUrl: gmfMapMousepositionTemplateUrl
};

exports.component('gmfMouseposition', component);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.IFilterService} $filter Angular filter.
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname gmfMousepositionController
 */
function Controller($element, $filter, $scope, gettextCatalog) {
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
   * @type {angular.IScope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.$element_ = $element;

  /**
   * @type {angular.IFilterService}
   * @private
   */
  this.$filter_ = $filter;

  /**
   * @type  {?ol.control.MousePosition}
   * @private
   */
  this.control_ = null;
}


/**
 * Initialise the controller.
 */
Controller.prototype.$onInit = function() {
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
Controller.prototype.initOlControl_ = function() {
  if (this.control_ !== null) {
    this.map.removeControl(this.control_);
  }

  // function that apply the filter.
  const formatFn = function(coordinates) {
    const filterAndArgs = this.projection.filter.split(':');
    const filter = this.$filter_(filterAndArgs.shift());
    googAsserts.assertFunction(filter);
    const args = filterAndArgs;
    args.unshift(coordinates);
    return filter.apply(this, args);
  };

  const gettextCatalog = this.gettextCatalog_;
  this.control_ = new olControlMousePosition({
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
Controller.prototype.setProjection = function(projection) {
  this.control_.setProjection(olProj.get(projection.code));
  this.projection = projection;
};

exports.controller('gmfMousepositionController', Controller);


export default exports;
