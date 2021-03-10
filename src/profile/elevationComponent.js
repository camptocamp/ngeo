// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
import {listen} from 'ol/events.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoProfileD3Elevation from 'ngeo/profile/d3Elevation.js';

import {select as d3select} from 'd3';

/**
 * The POI data extractor is used to extract data from a POI.
 * The POI is an item of the POI data array.
 *
 * @typedef {Object} PoiExtractor
 * @property {function(unknown): string} id Extract the id of a POI.
 * @property {function(unknown): number} dist Extract the distance from origin of a POI.
 * @property {function(unknown, number=): number} z Extract the elevation of a POI.
 * @property {function(unknown): number} sort Extract the sequence number of a POI.
 * @property {function(unknown): string} title Extract the title of a POI.
 */

/**
 * @typedef {Object} ProfileFormatter
 * @property {function(number, string): string} xhover Format the xhover distance.
 * @property {function(number, string): string} yhover Format the yhover elevation.
 * @property {function(number, string): (string|number)} xtick Format the xtick, for graduating the x axis.
 * @property {function(number, string): (string|number)} ytick Format the ytick, for graduating the y axis.
 */

/**
 * @typedef {Object} I18n
 * @property {string} [xAxis] Text for the x axis. Will be completed by ` km` or ' m' (for kilometers or meters).
 * @property {string} [yAxis] Text for the y axis. Will be completed by ' m' (for meters).
 */

/**
 * Options for the profile.
 *
 * @typedef {Object} ProfileOptions
 * @property {ProfileFormatter} [formatter] Formatter giving full control on how numbers are formatted.
 * @property {function(T): number} distanceExtractor Extract the distance from origin of a point (an
 * item of the elevation data array).
 * @property {PoiExtractor} [poiExtractor] Extractor for parsing POI data.
 * @property {function(Function, Function, number, number): void} [scaleModifier] Allows to modify the raw x
 * and y scales. Notably, it is possible to modify the y domain according to XY ratio rules,
 * add padding or enforce y lower bound.
 * @property {function(Object, number, string, Object<string, number>, string): void} [hoverCallback] A
 * callback called from the profile when the mouse moves over a point. The point, an item of the elevation
 * data array, is passed as the first argument of the function.
 * @property {function(): void} [outCallback] A callback called from the profile when the mouse leaves the profile.
 * @property {I18n} [i18n]
 * @template T
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoProfile', [ngeoMiscDebounce.name]);

/**
 * Provides a directive used to insert an elevation profile chart
 * in the DOM.
 *
 * Example:
 *
 *      <div ngeo-profile="ctrl.profileData"
 *        ngeo-profile-options="ctrl.profileOptions"
 *        ngeo-profile-pois="ctrl.profilePois">
 *      </div>
 *
 * Where `ctrl.profileOptions` is of type {@link ProfileOptions}; `ctrl.profileData` and `ctrl.profilePois`
 * are arrays which will be processed by `distanceExtractor` `{function(Object): number}`,
 * `linesConfiguration` `{Object<string, LineConfiguration>}` {@link LineConfiguration} and
 * {@link PoiExtractor}.
 *
 * See our live example: [../examples/profile.html](../examples/profile.html)
 *
 * @htmlAttribute {?Object} ngeo-profile The profile data.
 * @htmlAttribute {ProfileOptions} ngeo-profile-options The options.
 * @htmlAttribute {?Array} ngeo-profile-pois The data for POIs.
 * @htmlAttribute {*} ngeo-profile-highlight Any property on the scope which
 *    evaluated value may correspond to distance from origin.
 * @param {import("ngeo/misc/debounce.js").miscDebounce<function((Event|import('ol/events/Event.js').default)): void>} ngeoDebounce
 *    ngeo Debounce factory.
 * @param {import('ngeo/options.js').ngeoProfileOptions} ngeoProfileOptions The options.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoProfile
 */
function profileElevationComponent(ngeoDebounce, ngeoProfileOptions) {
  return {
    restrict: 'A',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {
      const optionsAttr = attrs.ngeoProfileOptions;
      console.assert(optionsAttr !== undefined);

      const selection = d3select(element[0]);

      /** @type {*} */
      let profile = undefined;
      scope.$watchCollection(optionsAttr, (newVal) => {
        /** @type {ProfileOptions<unknown>} */
        const options = Object.assign({}, newVal);

        if (options !== undefined) {
          // proxy the hoverCallback and outCallbackin order to be able to
          // call $applyAsync
          //
          // We're using $applyAsync here because the callback may be
          // called inside the Angular context. For example, it's the case
          // when the user hover's the line geometry on the map and the
          // profileHighlight property is changed.
          //
          // For that reason we use $applyAsync instead of $apply here.
          if (options.hoverCallback !== undefined) {
            const origHoverCallback = options.hoverCallback;
            options.hoverCallback = function (...args) {
              origHoverCallback(...args);
              scope.$applyAsync();
            };
          }

          if (options.outCallback !== undefined) {
            const origOutCallback = options.outCallback;
            options.outCallback = function () {
              origOutCallback();
              scope.$applyAsync();
            };
          }

          profile = ngeoProfileD3Elevation(ngeoProfileOptions, options);
          refreshData();
        }
      });

      /** @type {undefined|*[]} */
      let elevationData = undefined;
      scope.$watch(attrs.ngeoProfile, (newVal, oldVal) => {
        elevationData = newVal;
        refreshData();
      });

      /** @type {undefined|*[]} */
      let poiData = undefined;
      scope.$watch(attrs.ngeoProfilePois, (newVal, oldVal) => {
        poiData = newVal;
        refreshData();
      });

      scope.$watch(attrs.ngeoProfileHighlight, (newVal, oldVal) => {
        if (newVal === undefined) {
          return;
        }
        if (newVal > 0) {
          profile.highlight(newVal);
        } else {
          profile.clearHighlight();
        }
      });

      listen(window, 'resize', ngeoDebounce(refreshData, 50, true));

      function refreshData() {
        if (profile !== undefined) {
          selection.datum(elevationData).call(profile);
          if (elevationData !== undefined) {
            profile.showPois(poiData);
          }
        }
      }
    },
  };
}

myModule.directive('ngeoProfile', profileElevationComponent);

export default myModule;
