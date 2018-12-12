/**
 * @module ngeo.routing.module
 */
import * as angular from 'angular';
import ngeoRoutingRoutingComponent from 'ngeo/routing/RoutingComponent.js';

import './routing.scss';

/**
 * @type {angular.IModule}
 */
export default angular.module('ngeoRoutingModule', [
  ngeoRoutingRoutingComponent.module.name
]);
