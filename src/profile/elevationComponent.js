/**
 * @module ngeo.profile.elevationComponent
 */
import angular from 'angular';
import googAsserts from 'goog/asserts.js';
import * as olEvents from 'ol/events.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoProfileD3Elevation from 'ngeo/profile/d3Elevation.js';

import {select as d3select} from 'd3';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoProfile', [
  ngeoMiscDebounce.name
]);


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
 * Where "ctrl.profileOptions" is of type {@link ngeox.profile.ProfileOptions};
 * "ctrl.profileData" and "ctrl.profilePois" are arrays which will be
 * processed by {@link ngeox.profile.ElevationExtractor} and
 * {@link ngeox.profile.PoiExtractor}.
 *
 * See our live example: [../examples/profile.html](../examples/profile.html)
 *
 * @htmlAttribute {?Object} ngeo-profile The profile data.
 * @htmlAttribute {ngeox.profile.ProfileOptions} ngeo-profile-options The options.
 * @htmlAttribute {?Array} ngeo-profile-pois The data for POIs.
 * @htmlAttribute {*} ngeo-profile-highlight Any property on the scope which
 * evaluated value may correspond to distance from origin.
 * @param {ngeox.miscDebounce} ngeoDebounce ngeo Debounce factory.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoProfile
 */
function directive(ngeoDebounce) {
  return {
    restrict: 'A',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {

      const optionsAttr = attrs['ngeoProfileOptions'];
      googAsserts.assert(optionsAttr !== undefined);

      const selection = d3select(element[0]);
      let profile, elevationData, poiData;

      scope.$watchCollection(optionsAttr, (newVal) => {

        const options = /** @type {ngeox.profile.ProfileOptions} */
                (Object.assign({}, newVal));

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
            options.hoverCallback = function(...args) {
              origHoverCallback(...args);
              scope.$applyAsync();
            };
          }

          if (options.outCallback !== undefined) {
            const origOutCallback = options.outCallback;
            options.outCallback = function() {
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

      scope.$watch(attrs['ngeoProfileHighlight'],
        (newVal, oldVal) => {
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
    }
  };
}

exports.directive('ngeoProfile', directive);


export default exports;
