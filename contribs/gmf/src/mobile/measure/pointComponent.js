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
import gmfRasterRasterService from 'gmf/raster/RasterService.js';
import ngeoInteractionMeasurePointMobile from 'ngeo/interaction/MeasurePointMobile.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import {interactionDecoration} from 'ngeo/misc/decorate.js';
import {listen, unlistenByKey} from 'ol/events.js';
import MobileDraw from 'ngeo/interaction/MobileDraw.js';
import {buildStyle} from 'ngeo/options.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfMobileMeasurePoint', [
  gmfRasterRasterService.name,
  ngeoMiscDebounce.name,
]);

myModule.value(
  'gmfMobileMeasurePointTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} The template url.
   */
  (element, attrs) => {
    const templateUrl = attrs.gmfMobileMeasurePointTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/measure/pointComponent';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/measure/pointComponent', require('./pointComponent.html'));
  }
);

/**
 * Provide a directive to do a point (coordinate and elevation) measure on the
 * mobile devices.
 *
 * Example:
 *
 *      <div gmf-mobile-measurepoint
 *        gmf-mobile-measurepoint-active="ctrl.measurePointActive"
 *        gmf-mobile-measurepoint-map="::ctrl.map">
 *      </div>
 *
 * Where ctrl.measurePointLayers is an object like this:
 *
 *      this.measurePointLayers = [
 *        {name: 'srtm', unit: 'm', decimals: 2},
 *        {name: 'wind', {unit: 'km/h'},
 *        {name: 'humidity'}
 *      ];
 *
 * @htmlAttribute {boolean} gmf-mobile-measurepoint-active Used to active
 * or deactivate the component.
 * @htmlAttribute {import("ol/Map.js").default} gmf-mobile-measurepoint-map The map.
 * @param {string|function(JQuery=, angular.IAttributes=): string}
 *     gmfMobileMeasurePointTemplateUrl Template URL for the directive.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileMeasurePoint
 */
function mobileMeasurePointComponent(gmfMobileMeasurePointTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurepointActive',
      'map': '=gmfMobileMeasurepointMap',
    },
    controller: 'GmfMobileMeasurePointController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasurePointTemplateUrl,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController=} controller Controller.
     */
    link: (scope, element, attrs, controller) => {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    },
  };
}

myModule.directive('gmfMobileMeasurepoint', mobileMeasurePointComponent);

/**
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.IFilterService} $filter Angular filter service.
 * @param {import("gmf/raster/RasterService.js").RasterService} gmfRaster gmf Raster service.
 * @param {import("ngeo/misc/debounce.js").miscDebounce<function(): void>} ngeoDebounce ngeo Debounce factory.
 * @param {import('gmf/options.js').gmfMobileMeasurePointOptions} gmfMobileMeasurePointOptions The options.
 * @constructor
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasurePointController
 */
export function MobileMeasurePointController(
  gettextCatalog,
  $scope,
  $filter,
  gmfRaster,
  ngeoDebounce,
  gmfMobileMeasurePointOptions
) {
  /**
   * @type {import('gmf/options.js').gmfMobileMeasurePointOptions}
   */
  this.options = gmfMobileMeasurePointOptions;

  /**
   * @type {import("gmf/raster/RasterService.js").RasterService}
   */
  this.gmfRaster_ = gmfRaster;

  /**
   * @type {import("ngeo/misc/debounce.js").miscDebounce<function(): void>}
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {angular.IFilterService}
   */
  this.$filter_ = $filter;

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {boolean}
   */
  this.active = false;

  $scope.$watch(
    () => this.active,
    (newVal) => {
      if (!this.measure) {
        throw new Error('Missing measure');
      }
      this.measure.setActive(newVal);
      this.handleMeasureActiveChange_();
    }
  );

  /**
   * @type {?import("ngeo/interaction/MeasurePointMobile.js").default}
   */
  this.measure = null;

  /**
   * @type {?import("ngeo/interaction/MobileDraw.js").default}
   */
  this.drawInteraction = null;

  /**
   * The key for map view 'propertychange' event.
   * @type {?import("ol/events.js").EventsKey}
   */
  this.mapViewPropertyChangeEventKey_ = null;
}

/**
 * Initialise the controller.
 */
MobileMeasurePointController.prototype.init = function () {
  this.measure = new ngeoInteractionMeasurePointMobile(
    /** @type {import('ngeo/misc/filters.js').numberCoordinates} */ (this.$filter_('ngeoNumberCoordinates')),
    this.options.format,
    {
      decimals: this.options.decimals,
      sketchStyle: buildStyle(this.options.sketchStyle),
    }
  );
  this.measure.setActive(this.active);
  interactionDecoration(this.measure);
  const drawInteraction = this.measure.getDrawInteraction();
  if (!(drawInteraction instanceof MobileDraw)) {
    throw new Error('Wrong drawInteraction');
  }
  this.drawInteraction = drawInteraction;
  interactionDecoration(this.drawInteraction);

  if (!this.map) {
    throw new Error('Missing map');
  }
  this.map.addInteraction(this.measure);
};

/**
 * Deactivate the directive.
 */
MobileMeasurePointController.prototype.deactivate = function () {
  this.active = false;
};

/**
 * @param {string} str String to translate.
 * @return {string} The translated text.
 */
MobileMeasurePointController.prototype.translate = function (str) {
  return this.gettextCatalog_.getString(str);
};

/**
 * Called when the measure becomes active or inactive. Act accordingly:
 * - on activate, listen to the map property changes to call for the elevation
 *   service.
 * - on deactivate, unlisten
 * @hidden
 */
MobileMeasurePointController.prototype.handleMeasureActiveChange_ = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.measure) {
    throw new Error('Missing measure');
  }
  if (this.measure.getActive()) {
    const view = this.map.getView();
    this.mapViewPropertyChangeEventKey_ = listen(
      view,
      'propertychange',
      this.ngeoDebounce_(this.getMeasure_.bind(this), 300, /* invokeApply */ true),
      this
    );
    this.getMeasure_();
  } else if (this.mapViewPropertyChangeEventKey_) {
    unlistenByKey(this.mapViewPropertyChangeEventKey_);
    this.mapViewPropertyChangeEventKey_ = null;
  }
};

/**
 * Call the elevation service to get information about the measure at
 * the current map center location.
 * @hidden
 */
MobileMeasurePointController.prototype.getMeasure_ = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const center = this.map.getView().getCenter();
  if (!Array.isArray(center)) {
    throw new Error('Wrong center');
  }
  if (!this.options.rasterLayers || this.options.rasterLayers.length === 0) {
    return;
  }
  const params = {
    'layers': this.options.rasterLayers.map((config) => config.name).join(','),
  };
  this.gmfRaster_.getRaster(center, params).then((object) => {
    if (!this.measure) {
      throw new Error('Missing measure');
    }
    const el = this.measure.getTooltipElement();
    const ctn = document.createElement('div');
    const className = 'gmf-mobile-measure-point';
    ctn.className = className;

    for (const config of this.options.rasterLayers) {
      const key = config.name;
      if (key in object) {
        /** @type {string|number} */
        let value = object[key];
        const childEl = document.createElement('div');
        childEl.className = `gmf-mobile-measure-point-${key}`;
        const unit = config.unit || '';
        const decimals = config.decimals > 0 ? config.decimals : 0;
        value = this.$filter_('number')(value, decimals);
        childEl.innerHTML = [this.translate(key), ': ', value, ' ', unit].join('');
        ctn.appendChild(childEl);
      }
    }

    const previousCtn = el.getElementsByClassName(className);
    if (previousCtn[0]) {
      previousCtn[0].remove();
    }
    el.appendChild(ctn);
  });
};

myModule.controller('GmfMobileMeasurePointController', MobileMeasurePointController);

export default myModule;
