/**
 * @module ngeo.routing.module
 */
import ngeoRoutingRoutingComponent from 'ngeo/routing/RoutingComponent.js';

import './routing.less';

/**
 * @type {angular.Module}
 */
const exports = angular.module('ngeoRoutingModule', [
  ngeoRoutingRoutingComponent.module.name
]);


export default exports;
