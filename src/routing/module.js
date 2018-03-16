goog.provide('ngeo.routing.module');

goog.require('ngeo.routing.RoutingComponent');

/**
 * @type {angular.Module}
 */
ngeo.routing.module = angular.module('ngeoRoutingModule', [
  ngeo.routing.RoutingComponent.module.name
]);
