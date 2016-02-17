goog.provide('ngeo.MobileQueryController');
goog.provide('ngeo.mobileQueryDirective');

goog.require('ngeo');
goog.require('ngeo.Query');


/**
 * Provide a "mobile query" directive.
 *
 * This directive is responsible of binding a map and the ngeo query service
 * together. While active, clicks made on the map are listened by the directive
 * and a request gets issued to the query service.
 *
 * This directive doesn't require to be rendered in a visible DOM element, but
 * it could be used with a ngeo-btn to manage the activation of the directive.
 * See below an example without any use of UI:
 *
 * Example:
 *
 *      <span
 *        ngeo-mobile-query=""
 *        ngeo-mobile-query-map="::ctrl.map"
 *        ngeo-mobile-query-active="ctrl.queryActive">
 *      </span>
 *
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoMobileQuery
 */
ngeo.mobileQueryDirective = function() {
  return {
    restrict: 'A',
    scope: {
      'active': '=ngeoMobileQueryActive',
      'map': '=ngeoMobileQueryMap'
    },
    bindToController: true,
    controller: 'NgeoMobileQueryController',
    controllerAs: 'ctrl'
  };
};


ngeo.module.directive('ngeoMobileQuery', ngeo.mobileQueryDirective);


/**
 * @constructor
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.Query} ngeoQuery The ngeo Query service.
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoMobileQueryController
 */
ngeo.MobileQueryController = function($scope, ngeoQuery) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  /**
   * @type {ngeo.Query}
   * @private
   */
  this.query_ = ngeoQuery;

  /**
   * The key for map click event.
   * @type {?ol.events.Key}
   * @private
   */
  this.clickEventKey_ = null;

  // watch 'active' property -> activate/deactivate accordingly
  $scope.$watch(
      function() {
        return this.active;
      }.bind(this),
      function() {
        if (this.active) {
          this.activate_();
        } else {
          this.deactivate_();
        }
      }.bind(this)
  );

};


/**
 * Listen to the map 'click' event.
 * @private
 */
ngeo.MobileQueryController.prototype.activate_ = function() {
  this.clickEventKey_ = ol.events.listen(this.map,
      ol.events.EventType.CLICK, this.handleMapClick_, this);
};


/**
 * Unlisten the map 'click' event.
 * @private
 */
ngeo.MobileQueryController.prototype.deactivate_ = function() {
  if (this.clickEventKey_ !== null) {
    ol.events.unlistenByKey(this.clickEventKey_);
    this.clickEventKey_ = null;
  }
  this.query_.clear();
};


/**
 * Called when the map is clicked while this controller is active. Issue
 * a request to the query service using the coordinate that was clicked.
 * @param {ol.MapBrowserEvent} evt The map browser event being fired.
 * @private
 */
ngeo.MobileQueryController.prototype.handleMapClick_ = function(evt) {
  this.query_.issue(this.map, evt.coordinate);
};


ngeo.module.controller('NgeoMobileQueryController', ngeo.MobileQueryController);
