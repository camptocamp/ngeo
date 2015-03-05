/**
 * @fileoverview Provides a directive used to insert an elevation profile chart
 * in the DOM.
 *
 * Example:
 *
 * <div ngeo-profile="ctrl.profileData"
 *      ngeo-profile-options="ctrl.profileOptions"
 *      ngeo-profile-pois="ctrl.profilePois"
 * ></div>
 *
 * Where "ctrl.profileOptions" is of type {@link ngeox.profile.ProfileOptions);
 * "ctrl.profileData" and "ctrl.profilePois" are arrays which will be
 * processed by {@link ngeox.profile.ElevationExtractor) and
 * {@link ngeox.profile.PoiExtractor).
 */
goog.provide('ngeo.profileDirective');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ngeo.profile');


/**
 * @return {angular.Directive} Directive Definition Object.
 */
ngeo.profileDirective = function() {
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
          goog.asserts.assert(goog.isDef(optionsAttr));

          var selection = d3.select(element[0]);
          var profile, options, elevationData, poiData;

          scope.$watchCollection(optionsAttr, function(newVal) {
            options = newVal;
            if (goog.isDef(options)) {
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

          function refreshData() {
            if (goog.isDef(profile) && goog.isDef(elevationData)) {
              selection.datum(elevationData).call(profile);
              profile.showPois(poiData);
            }
          }
        }
  };
};

ngeoModule.directive('ngeoProfile', ngeo.profileDirective);
