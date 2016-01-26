goog.provide('gmf.displayqueriesDirective');

goog.require('gmf');


ngeoModule.value('gmfDisplayqueriesTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfDisplayqueriesTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/displayqueries.html';
    });


/**
 * Provides a directive used to show some query results.
 *
 * Things to know about this directive:
 *
 * - This directive is intented to be used along with the gmf displayqueries
 *   service.
 *
 * - By default the directive uses "displayqueries.html" as its templateUrl.
 *   This can be changed by redefining the "gmfQueryPopupTemplateUrl" value.
 *
 * - The directive doesn't create any scope but relies on its parent scope.
 *
 * @param {string} gmfDisplayqueriesTemplateUrl URL to popup template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDisplayqueries
 */
gmf.displayqueriesDirective = function(gmfDisplayqueriesTemplateUrl) {
  return {
    restrict: 'A',
    templateUrl: gmfDisplayqueriesTemplateUrl,
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         */
        function(scope, element, attrs) {
          element.addClass('popover');

          scope.close = function(evt) {
            if (evt) {
              evt.stopPropagation();
              evt.preventDefault();
            }
            element.addClass('hidden');
          };

          // Watch the open property
          scope.$watch('show', function(newVal, oldVal) {
            element.css('display', newVal ? 'block' : 'none');
          });
        }
  };
};

gmfModule.directive('gmfDisplayqueries', gmf.displayqueriesDirective);
