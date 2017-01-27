goog.provide('ngeo.mapDirective');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ngeo.SyncDataSourcesMap');
goog.require('ol.Map');


/**
 * Provides a directive used to insert a user-defined OpenLayers
 * map in the DOM. The directive does not create an isolate scope.
 *
 * Example:
 *
 *      <div ngeo-map="ctrl.map"></div>
 *
 * See our live examples:
 * [../examples/permalink.html](../examples/permalink.html)
 * [../examples/simple.html](../examples/simple.html)
 *
 * @htmlAttribute {ol.Map} ngeo-map The map.
 * @param {ngeo.SyncDataSourcesMap} ngeoSyncDataSourcesMap Ngeo sync
 *     data sources map service.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoMap
 */
ngeo.mapDirective = function(ngeoSyncDataSourcesMap) {
  return {
    restrict: 'A',
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link(scope, element, attrs) {
      const attr = 'ngeoMap';
      const prop = attrs[attr];

      const map = /** @type {ol.Map} */ (scope.$eval(prop));
      goog.asserts.assertInstanceof(map, ol.Map);

      map.setTarget(element[0]);

      ngeoSyncDataSourcesMap.map = map;
    }
  };
};

ngeo.module.directive('ngeoMap', ngeo.mapDirective);
