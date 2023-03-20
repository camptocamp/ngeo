import angular from 'angular';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import olControlMousePosition from 'ol/control/MousePosition.js';

import 'bootstrap/js/src/dropdown.js';

/**
 * Projection object for the MousePositionDirective. Define a label and a filter
 * to use to display coordinates for a projection.
 * @typedef {Object} MousePositionProjection
 * @property {string} code The epsg name of a projection.
 * @property {string} label The label to display with this projection.
 * @property {string} filter The filter function to use to format this projection. Arguments can be passed
 * with colon as separator (example: MyFilter:args1:args2:...)
 */

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfMapMouseposition', [ngeoMiscFilters.name]);

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/map/mousepositionComponent', require('./mousepositionComponent.html'));
  }
);

module.value(
  'gmfMapMousepositionTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfMapMousepositionTemplateUrl'];
    return templateUrl !== undefined ? templateUrl : 'gmf/map/mousepositionComponent';
  }
);

/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} gmfMapMousepositionTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
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
 * @htmlAttribute {import("ol/Map.js").default} gmf-mouseposition-map The map.
 * @htmlAttribute {Array.<MousePositionProjection>}
 *    gmf-mouseposition-projection The list of the projections.
 *
 * @ngdoc component
 * @ngname gmfMouseposition
 */
const mapMousepositionComponent = {
  controller: 'gmfMousepositionController as ctrl',
  bindings: {
    'map': '<gmfMousepositionMap',
    'projections': '<gmfMousepositionProjections',
  },
  templateUrl: gmfMapMousepositionTemplateUrl,
};

module.component('gmfMouseposition', mapMousepositionComponent);

/**
 * @param {!JQuery} $element Element.
 * @param {!angular.IFilterService} $filter Angular filter.
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfMousepositionController
 */
function Controller($element, $filter, $scope, gettextCatalog) {
  /**
   * @type {!import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {!Array.<!MousePositionProjection>}
   */
  this.projections;

  /**
   * @type {!MousePositionProjection}
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
   * @type {JQuery}
   * @private
   */
  this.$element_ = $element;

  /**
   * @type {angular.IFilterService}
   * @private
   */
  this.$filter_ = $filter;

  /**
   * @type  {?import("ol/control/MousePosition.js").default}
   * @private
   */
  this.control_ = null;
}

/**
 * Initialise the controller.
 */
Controller.prototype.$onInit = function () {
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
Controller.prototype.initOlControl_ = function () {
  if (this.control_ !== null) {
    this.map.removeControl(this.control_);
  }

  // function that apply the filter.
  const formatFn = function (coordinates) {
    const filterAndArgs = this.projection.filter.split(':');
    const filter = this.$filter_(filterAndArgs.shift());
    console.assert(typeof filter == 'function');
    const args = filterAndArgs;
    args.unshift(coordinates);
    return filter.apply(this, args);
  };

  const gettextCatalog = this.gettextCatalog_;
  this.control_ = new olControlMousePosition({
    className: 'gmf-mouseposition-control',
    coordinateFormat: formatFn.bind(this),
    target: this.$element_.find('.gmf-mouseposition-control-target').get(0),
    undefinedHTML: gettextCatalog.getString('Coordinates'),
  });

  this.setProjection(this.projections[0]);

  this.map.addControl(this.control_);
};

/**
 * @param {MousePositionProjection} projection The new projection to use.
 */
Controller.prototype.setProjection = function (projection) {
  this.control_.setProjection(projection.code);
  this.projection = projection;
};

module.controller('gmfMousepositionController', Controller);

export default module;
