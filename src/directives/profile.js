/**
 * @fileoverview Provides a directive used to insert an elevation profile chart
 * in the DOM.
 *
 * Example:
 *
 * <div ngeo-profile="ctrl.profileData"
 *      ngeo-profile-ooptions="ctrl.profileOptions"></div>
 *
 * Note: "ctrl.profileOptions" is of type ngeox.profile.ProfileOptions.
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

          var options = /** @type {ngeox.profile.ProfileOptions} */
              (scope.$eval(optionsAttr));
          var profile = ngeo.profile(options);

          scope.$watch(attrs['ngeoProfile'], function(newVal, oldVal) {
            var data = newVal;
            if (goog.isDef(data)) {
              selection.datum(data).call(profile);
            }
          });
        }
  };
};

ngeoModule.directive('ngeoProfile', ngeo.profileDirective);
