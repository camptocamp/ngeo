goog.provide('ngeo.controlDirective');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ol.Map');
goog.require('ol.control.Control');


/**
 * Provides a directive can be used to add a control to a DOM
 * element of the HTML page.
 *
 * Example:
 *
 *     <div ngeo-control="ctrl.control" ngeo-control-map="ctrl.map"></div>
 *
 * The expression passed to "ngeo-control" should evaluate to a control
 * instance, and the expression passed to "ngeo-control-map" should
 * evaluate to a map instance.
 *
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoControl
 */
ngeo.controlDirective = function() {
  return {
    restrict: 'A',
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         */
        function(scope, element, attrs) {

          var control = /** @type {ol.control.Control} */
              (scope.$eval(attrs['ngeoControl']));
          goog.asserts.assertInstanceof(control, ol.control.Control);

          var map = /** @type {ol.Map} */
              (scope.$eval(attrs['ngeoControlMap']));
          goog.asserts.assertInstanceof(map, ol.Map);

          control.setTarget(element[0]);
          map.addControl(control);
        }
  };
};


ngeo.module.directive('ngeoControl', ngeo.controlDirective);
