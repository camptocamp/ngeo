/**
 * @fileoverview Provides a directive used to show a popup over the page with
 * a title and content.
 *
 *
 * Things to know about this directive:
 *
 * - This directive is intented to be used along with the popup service.
 *
 * - By default the directive uses "popup.html" as its templateUrl. This can be
 *   changed by redefining the "ngeoPopupTemplateUrl" value.
 *
 * - The directive doesn't create any scope but relies on its parent scope.
 *   Properties like 'content', 'title' or 'open' come from the parent scope.
 */
goog.provide('ngeo.popupDirective');

goog.require('goog.style');
goog.require('ngeo');


/**
 * @const
 * @type {string}
 */
ngeo.popupTemplateUrl = 'partials/popup.html';


ngeoModule.value('ngeoPopupTemplateUrl', ngeo.popupTemplateUrl);


/**
 * @param {string} ngeoPopupTemplateUrl Url to popup template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 */
ngeo.popupDirective = function(ngeoPopupTemplateUrl) {
  return {
    restrict: 'A',
    templateUrl: ngeoPopupTemplateUrl,
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
          scope.$watch('open', function(newVal, oldVal) {
            element.css('display', newVal ? 'block' : 'none');
          });
        }
  };
};

ngeoModule.directive('ngeoPopup', ngeo.popupDirective);
