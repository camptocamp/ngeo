/**
 * @fileoverview Provides a directive used to insert an elevation profile chart
 * in the DOM.
 *
 * Example:
 *
 * <div ngeo-profile="ctrl.profileData"
 *      ngeo-profile-onhover="ctrl.onHover(point)"
 *      ngeo-profile-onout="ctrl.onProfileOut()"></div>
 *
 * Note: "point" in the onhover callback corresponds to an item of the data
 * provided to the profile (profileData in the above example). It's
 * integrator's job to extract the information he/she wants for the given
 * point (coordinates, elevation, distance, ...).
 */
goog.provide('ngeo.profileDirective');

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

          var selection = d3.select(element[0]);
          var profile = ngeo.profile();

          scope.$watch(attrs['ngeoProfile'], function(newVal, oldVal) {
            if (goog.isDef(newVal)) {
              selection.datum(newVal).call(profile);
            }
          });

          profile.onHover(function(point) {
            scope.$apply(function() {
              scope.$eval(attrs['ngeoProfileOnhover'], {'point': point});
            });
          });

          profile.onOut(function() {
            scope.$apply(function() {
              scope.$eval(attrs['ngeoProfileOnout']);
            });
          });
        }
  };
};

ngeoModule.directive('ngeoProfile', ngeo.profileDirective);
