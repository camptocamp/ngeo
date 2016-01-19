goog.provide('gmf.querypopupDirective');

goog.require('gmf');


ngeoModule.value('gmfQuerypopupTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfQuerypopupTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/querypopup.html';
    });


/**
 * Provides a directive used to show some query results.
 *
 * Things to know about this directive:
 *
 * - This directive is intented to be used along with the gmf query popup
 *   service (and then, as content of the ngeo popup.)
 *
 * - By default the directive uses "querypopup.html" as its templateUrl.
 *   This can be changed by redefining the "gmfQueryPopupTemplateUrl" value.
 *
 * - The directive doesn't create any scope but relies on its parent scope.
 *
 * @param {string} gmfQuerypopupTemplateUrl URL to popup template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfQueryPopup
 */
gmf.querypopupDirective = function(gmfQuerypopupTemplateUrl) {
  return {
    restrict: 'A',
    templateUrl: gmfQuerypopupTemplateUrl
  };
};

gmfModule.directive('gmfQuerypopup', gmf.querypopupDirective);
