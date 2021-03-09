// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import olControlMousePosition from 'ol/control/MousePosition.js';

import 'bootstrap/js/src/dropdown.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfMapMouseposition', [ngeoMiscFilters.name]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/map/mousepositionComponent', require('./mousepositionComponent.html'));
  }
);

myModule.value(
  'gmfMapMousepositionTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfMapMousepositionTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/map/mousepositionComponent';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} gmfMapMousepositionTemplateUrl Template function.
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
 *  <gmf-mouseposition gmf-mouseposition-map="ctrl.map">
 *  </gmf-mouseposition>
 *
 * @htmlAttribute {import("ol/Map.js").default} gmf-mouseposition-map The map.
 *
 * @ngdoc component
 * @ngname gmfMouseposition
 */
const mapMousepositionComponent = {
  controller: 'gmfMousepositionController as ctrl',
  bindings: {
    'map': '<gmfMousepositionMap',
  },
  templateUrl: gmfMapMousepositionTemplateUrl,
};

myModule.component('gmfMouseposition', mapMousepositionComponent);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IFilterService} $filter Angular filter.
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import('gmf/options.js').gmfMousePositionOptions} gmfMousePositionOptions The options.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfMousepositionController
 */
export function Controller($element, $filter, $scope, gettextCatalog, gmfMousePositionOptions) {
  /**
   * @type {import('gmf/options.js').gmfMousePositionOptions}
   */
  this.options_ = gmfMousePositionOptions;

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {?import('gmf/options.js').MousePositionProjection[]}
   */
  this.projections = this.options_.projections;

  /**
   * @type {?import('gmf/options.js').MousePositionProjection}
   */
  this.projection = null;

  /**
   * @type {angular.IScope}
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {JQuery}
   */
  this.$element_ = $element;

  /**
   * @type {angular.IFilterService}
   */
  this.$filter_ = $filter;

  /**
   * @type {?import("ol/control/MousePosition.js").default}
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
 */
Controller.prototype.initOlControl_ = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (this.control_ !== null) {
    this.map.removeControl(this.control_);
  }

  // function that apply the filter.
  /**
   * @param {number[]|undefined} coordinates
   * @return {string}
   */
  const formatFn = (coordinates) => {
    if (!this.projection) {
      throw new Error('Missing projection');
    }
    const filterAndArgs = this.projection.filter.split(':');
    const shiftedFilterAndArgs = filterAndArgs.shift();
    if (!shiftedFilterAndArgs) {
      throw new Error('Missing shiftedFilterAndArgs');
    }
    const filter = this.$filter_(shiftedFilterAndArgs);
    if (typeof filter != 'function') {
      throw new Error('Wrong filter type');
    }
    const args = filterAndArgs;
    // @ts-ignore: is the following line needed?
    args.unshift(coordinates);
    return filter.apply(this, args);
  };

  const gettextCatalog = this.gettextCatalog_;
  this.control_ = new olControlMousePosition({
    className: 'gmf-mouseposition-control',
    coordinateFormat: formatFn,
    target: this.$element_.find('.gmf-mouseposition-control-target').get(0),
    undefinedHTML: gettextCatalog.getString('Coordinates'),
  });

  this.setProjection(this.projections[0]);

  this.map.addControl(this.control_);
};

/**
 * @param {import('gmf/options.js').MousePositionProjection} projection The new projection to use.
 */
Controller.prototype.setProjection = function (projection) {
  if (!this.control_) {
    throw new Error('Missing control');
  }
  this.control_.setProjection(projection.code);
  this.projection = projection;
};

myModule.controller('gmfMousepositionController', Controller);

export default myModule;
