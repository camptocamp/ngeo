goog.provide('ngeo.trustHtmlFilter');
goog.require('ngeo');


/**
 * A filter to mark a string as trusted HTML.
 *
 * Usage:
 *
 *    <p ng-bind-html="ctrl.someValue | ngeoTrustHtml"></p>
 *
 * @return {function(string):string} The filter function.
 * @ngInject
 * @ngdoc filter
 * @param {angular.$sce} $sce Angular sce service.
 * @ngname ngeoTrustHtml
 */
ngeo.trustHtmlFilter = function($sce) {
  return function(input) {
    return $sce.trustAsHtml(input);
  };
};

ngeo.module.filter('ngeoTrustHtml', ngeo.trustHtmlFilter);
