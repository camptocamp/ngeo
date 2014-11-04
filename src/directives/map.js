goog.provide('ngeo.MapDirectiveController');
goog.provide('ngeo_map_directive');

goog.require('goog.asserts');
goog.require('ngeo');



/**
 * @constructor
 */
ngeo.MapDirectiveController = function() {
  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = null;
};


/**
 * @return {ol.Map} Map.
 * @api
 */
ngeo.MapDirectiveController.prototype.getMap = function() {
  return this.map_;
};


/**
 * @param {ol.Map} map Map.
 */
ngeo.MapDirectiveController.prototype.setMap = function(map) {
  this.map_ = map;
};


/**
 * The "map" directive. Used to insert a user-defined OpenLayers map
 * in the DOM. The directive does not create an isolate scope and it
 * expects a map instance in the parent scope.
 *
 * Example:
 *
 * <div ngeo-map></div>
 *
 * In this case the map directive will assume that the name of the
 * scope property including the map instance is "map". To specify
 * that name use this:
 *
 * <div ngeo-map="map1"></div>
 *
 */
ngeoModule.directive('ngeoMap', ['ngeoDefaultMap',
  /**
   * @param {string} ngeoDefaultMap Default map constant.
   * @return {angular.Directive} The directive specs.
   */
  function(ngeoDefaultMap) {
    return {
      restrict: 'A',
      controller: ngeo.MapDirectiveController,
      link:
          /**
           * @param {angular.Scope} scope Scope.
           * @param {angular.JQLite} element Element.
           * @param {angular.Attributes} attrs Attributes.
           * @param {ngeo.MapDirectiveController} controller Controller.
           */
          function(scope, element, attrs, controller) {
            var attr = 'ngeoMap';
            var prop = attrs[attr] || ngeoDefaultMap;

            var map = /** @type {ol.Map} */ (scope.$eval(prop));
            goog.asserts.assertInstanceof(map, ol.Map);

            controller.setMap(map);
            map.setTarget(element[0]);
          }
    };
  }]);
