goog.provide('ngeo.message.popupComponent');

goog.require('ngeo'); // nowebpack
// webpack: import 'angular-sanitize';


ngeo.message.popupComponent = angular.module('ngeoPopup', [
  'ngSanitize',
]);


ngeo.message.popupComponent.value('ngeoPopupTemplateUrl',
  /**
   * @param {angular.JQLite} element Element.
   * @param {angular.Attributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['ngeoPopupTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseModuleTemplateUrl}/message/popupcomponent.html`; // nowebpack
    // webpack: 'ngeo/message/popupcomponent';
  });

// webpack: exports.run(/* @ngInject */ ($templateCache) => {
// webpack:   $templateCache.put('ngeo/message/popupcomponent', require('./popupcomponent.html'));
// webpack: });


/**
 * Provides a directive used to show a popup over the page with
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
 *
 * @private
 * @param {string} ngeoPopupTemplateUrl URL to popup template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoPopup
 */
ngeo.message.popupComponent.directive_ = function(ngeoPopupTemplateUrl) {
  return {
    restrict: 'A',
    templateUrl: ngeoPopupTemplateUrl,
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link: (scope, element, attrs) => {
      element.addClass('popover');

      /**
       * @param {jQuery.Event} evt Event.
       */
      scope.close = function(evt) {
        if (evt) {
          evt.stopPropagation();
          evt.preventDefault();
        }
        element.addClass('hidden');
      };

      // Watch the open property
      scope.$watch('open', (newVal, oldVal) => {
        element.css('display', newVal ? 'block' : 'none');
      });
    }
  };
};

ngeo.message.popupComponent.directive('ngeoPopup', ngeo.message.popupComponent.directive_);
