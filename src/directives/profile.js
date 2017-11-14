goog.provide('ngeo.profileDirective');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ngeo.profile');
goog.require('ngeo.Debounce');


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
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoProfile
 */
ngeo.profileDirective = function(ngeoDebounce) {
  return {
    restrict: 'A',
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link(scope, element, attrs) {

      const optionsAttr = attrs['ngeoProfileOptions'];
      goog.asserts.assert(optionsAttr !== undefined);

      const selection = d3.select(element[0]);
      let profile, elevationData, poiData;

      scope.$watchCollection(optionsAttr, (newVal) => {

        const options = /** @type {ngeox.profile.ProfileOptions} */
                (ol.obj.assign({}, newVal));

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

          profile = ngeo.profile(options);
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

      ol.events.listen(window, 'resize', ngeoDebounce(refreshData, 50, true), this);

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
};

ngeo.module.directive('ngeoProfile', ngeo.profileDirective);
