import angular from 'angular';
import 'angular-sanitize';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoPopup', ['ngSanitize']);

module.value(
  'ngeoPopupTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['ngeoPopupTemplateurl'];
    return templateUrl !== undefined ? templateUrl : 'ngeo/message/popupcomponent';
  }
);

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/message/popupcomponent', require('./popupcomponent.html'));
  }
);

/**
 * Provides a directive used to show a popup over the page with
 * a title and content.
 *
 *
 * Things to know about this directive:
 *
 * - This directive is intended to be used along with the popup service.
 *
 * - By default the directive uses "popup.html" as its templateUrl. This can be
 *   changed by redefining the "ngeoPopupTemplateUrl" value.
 *
 * - The directive doesn't create any scope but relies on its parent scope.
 *   Properties like 'content', 'title' or 'open' come from the parent scope.
 *
 * @param {string} ngeoPopupTemplateUrl URL to popup template.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoPopup
 */
function messagePopopComponent(ngeoPopupTemplateUrl) {
  return {
    restrict: 'A',
    templateUrl: ngeoPopupTemplateUrl,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {
      element.addClass('popover');

      /**
       * @param {JQueryEventObject} evt Event.
       */
      scope['close'] = function (evt) {
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
    },
  };
}

module.directive('ngeoPopup', messagePopopComponent);

export default module;
