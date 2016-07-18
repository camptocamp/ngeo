goog.provide('ngeo.profileDirective');

goog.require('goog.asserts');
goog.require('goog.events');
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
 * See our live example: {@link ../examples/profile.html}
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
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         */
        function(scope, element, attrs) {

          var optionsAttr = attrs['ngeoProfileOptions'];
          goog.asserts.assert(optionsAttr !== undefined);

          var selection = d3.select(element[0]);
          var profile, elevationData, poiData;

          scope.$watchCollection(optionsAttr, function(newVal) {

            var options = /** @type {ngeox.profile.ProfileOptions} */
                (goog.object.clone(newVal));

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
                var origHoverCallback = options.hoverCallback;
                options.hoverCallback = function() {
                  origHoverCallback.apply(null, arguments);
                  scope.$applyAsync();
                };
              }

              if (options.outCallback !== undefined) {
                var origOutCallback = options.outCallback;
                options.outCallback = function() {
                  origOutCallback();
                  scope.$applyAsync();
                };
              }

              profile = ngeo.profile(options);
              refreshData();
            }
          });

          scope.$watch(attrs['ngeoProfile'], function(newVal, oldVal) {
            elevationData = newVal;
            refreshData();
          });

          scope.$watch(attrs['ngeoProfilePois'], function(newVal, oldVal) {
            poiData = newVal;
            refreshData();
          });

          scope.$watch(attrs['ngeoProfileHighlight'],
              function(newVal, oldVal) {
                if (newVal === undefined) {
                  return;
                }
                if (newVal > 0) {
                  profile.highlight(newVal);
                } else {
                  profile.clearHighlight();
                }
              });

          goog.events.listen(window, goog.events.EventType.RESIZE,
              ngeoDebounce(refreshData, 50, true),
              false, this);

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
