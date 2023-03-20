import angular from 'angular';
import * as olEvents from 'ol/events.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoProfileD3Elevation from 'ngeo/profile/d3Elevation.js';

import {select as d3select} from 'd3';

/**
 * The POI data extractor is used to extract data from a POI.
 * The POI is an item of the POI data array.
 *
 * @typedef {Object} PoiExtractor
 * @property {function(Object): string} id Extract the id of a POI.
 * @property {function(Object): number} dist Extract the distance from origin of a POI.
 * @property {function(Object, number=): number} z Extract the elevation of a POI.
 * @property {function(Object): number} sort Extract the sequence number of a POI.
 * @property {function(Object): string} title Extract the title of a POI.
 */

/**
 * Configuration object for one profile's line.
 *
 * @typedef {Object} LineConfiguration
 * @property {string} [color] Color of the line (hex color string).
 * @property {!function(Object): number} zExtractor Extract the elevation of a point (an item of the
 * elevation data array).
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
 * @property {string} [styleDefs] Inline CSS style definition to inject in the SVG.
 * @property {number} [poiLabelAngle] Inline CSS style definition to inject in the SVG.
 * @property {ProfileFormatter} [formatter] Formatter giving full control on how numbers are formatted.
 * @property {function(Object): number} distanceExtractor Extract the distance from origin of a point (an
 * item of the elevation data array).
 * @property {!Object.<string, LineConfiguration>} linesConfiguration Configuration object for the profile's
 * lines. The key string of each object is used as class for its respective svg line.
 * @property {PoiExtractor} [poiExtractor] Extractor for parsing POI data.
 * @property {boolean} [light] Show a simplified profile when true.
 * @property {boolean} [lightXAxis] Show a simplified x axis with only both end ticks.
 * @property {function(function(), function(), number, number)} [scaleModifier] Allows to modify the raw x
 * and y scales. Notably, it is possible to modify the y domain according to XY ratio rules,
 * add padding or enforce y lower bound.
 * @property {function(Object)} [hoverCallback] A callback called from the profile when the mouse moves over
 * a point. The point, an item of the elevation data array, is passed as the first argument of the function.
 * @property {function()} [outCallback] A callback called from the profile when the mouse leaves the profile.
 * @property {I18n} [i18n]
 */

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoProfile', [ngeoMiscDebounce.name]);

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
 * `linesConfiguration` `{Object.<string, LineConfiguration>}` {@link LineConfiguration} and
 * {@link PoiExtractor}.
 *
 * See our live example: [../examples/profile.html](../examples/profile.html)
 *
 * @htmlAttribute {?Object} ngeo-profile The profile data.
 * @htmlAttribute {ProfileOptions} ngeo-profile-options The options.
 * @htmlAttribute {?Array} ngeo-profile-pois The data for POIs.
 * @htmlAttribute {*} ngeo-profile-highlight Any property on the scope which
 *    evaluated value may correspond to distance from origin.
 * @param {import("ngeo/misc/debounce.js").miscDebounce<function(import('ol/events/Event.js').default): void>} ngeoDebounce
 *    ngeo Debounce factory.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoProfile
 */
function profileElevationComponent(ngeoDebounce) {
  return {
    restrict: 'A',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {
      const optionsAttr = attrs['ngeoProfileOptions'];
      console.assert(optionsAttr !== undefined);

      const selection = d3select(element[0]);
      let profile, elevationData, poiData;

      scope.$watchCollection(optionsAttr, (newVal) => {
        /** @type {ProfileOptions} */
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

          profile = ngeoProfileD3Elevation(options);
          refreshData();
        }
      });

      scope.$watch(attrs['ngeoProfile'], (newVal, oldVal) => {
        elevationData = newVal;
        refreshData();
      });

      scope.$watch(attrs['ngeoProfilePois'], (newVal, oldVal) => {
        poiData = newVal;
        refreshData();
      });

      scope.$watch(attrs['ngeoProfileHighlight'], (newVal, oldVal) => {
        if (newVal === undefined) {
          return;
        }
        if (newVal > 0) {
          profile.highlight(newVal);
        } else {
          profile.clearHighlight();
        }
      });

      olEvents.listen(window, 'resize', ngeoDebounce(refreshData, 50, true));

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

module.directive('ngeoProfile', profileElevationComponent);

export default module;
