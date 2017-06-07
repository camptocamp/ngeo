goog.provide('gmf.RoutingService');

goog.require('gmf');

/**
 * Service to provide acces to a Open Source Routing Machine (OSRM)
 * backend and its features.
 * @param {angular.$http} $http Angular http service.
 * @param {string=} gmfOsrmBackendUrl URL for OSRM backend API
 * @constructor
 * @struct
 * @ngInject
 * @export
 * @ngname gmfRoutingService
 */
gmf.RoutingService = function($http, gmfOsrmBackendUrl) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;


  /**
   * @type {string}
   * @private
   */
  this.gmfOsrmBackendUrl_ = gmfOsrmBackendUrl || 'http://router.project-osrm.org/';


  /**
   * Version of the protocol implemented by the service.
   * see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md
   * @type {string}
   * @private
   */
  this.protocolVersion_ = 'v1';

};

/**
 * Route request
 * @param {Array.<ol.Coordinate>} coordinates coordinates of the route (at least two!)
 * @param {?Object} config optional configuration
 * @return {!angular.$http.HttpPromise} promise of the OSRM API request
 */
gmf.RoutingService.prototype.getRoute = function(coordinates, config) {

  config = config || {};

  // Service
  // see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#requests
  if (!config.service) {
    config.service = 'route'; // default to route
  }

  // Mode of transportation,
  // can be: car, bike, foot
  // see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#requests
  if (!config.profile) {
    config.profile = 'car'; // default to car
  }

  // build request URL
  let url = this.gmfOsrmBackendUrl_;
  url += `${config.service}/${this.protocolVersion_}/${config.profile}/`;

  // [ [a,b] , [c,d] ] -> 'a,b;c,d'
  const coordinateString = coordinates.map(c => c.join(',')).join(';');

  url += coordinateString;

  // look for route service options
  // see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#route-service
  if (config.options) {
    url += '?';
    const options = [];
    for (const option of Object.keys(config.options)) {
      options.push(`${option}=${config.options[option]}`);
    }
    url += `?${options.join('&')}`;
  }

  return this.$http_.get(url);
};

gmf.module.service('gmfRoutingService', gmf.RoutingService);
