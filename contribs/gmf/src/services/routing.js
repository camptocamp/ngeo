goog.provide('gmf.RoutingService');

goog.require('gmf');

/**
 * Service to provide acces to a Open Source Routing Machine (OSRM)
 * backend and its features.
 * @param {angular.$http} $http Angular http service.
 * @param {angular.$injector} $injector Main injector.
 * @constructor
 * @struct
 * @ngInject
 * @export
 * @ngname gmfRoutingService
 */
gmf.RoutingService = function($http, $injector) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;


  /**
   * URL for OSRM backend API.
   * Defaults to demo backend.
   * @type {string}
   * @private
   */
  this.gmfOsrmBackendUrl_ = 'http://router.project-osrm.org/';

  if ($injector.has('gmfOsrmBackendUrl')) {
    this.gmfOsrmBackendUrl_ = $injector.get('gmfOsrmBackendUrl');
  }

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
  if (!config['service']) {
    config['service'] = 'route'; // default to route
  }

  // Mode of transportation,
  // can be: car, bike, foot
  // see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#requests
  //
  // As of version 5.8.0, OSRM (server) does not support multiple profiles simultaneously.
  // This means the value actually does not matter.
  if (!config['profile']) {
    config['profile'] = 'car'; // default to car
  }

  // build request URL
  let url = this.gmfOsrmBackendUrl_;

  // Common workaround to provide multiple profiles (since it is not supported yet)
  // Every profile runs on its own instance.
  if (config['instance']) {
    url += `${config['instance']}/`;
  }

  url += `${config['service']}/${this.protocolVersion_}/${config['profile']}/`;

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
    url += options.join('&');
  }

  return this.$http_.get(url);
};

/**
 * Snaps a coordinate to the street network and returns the nearest match
 * @param {ol.Coordinate} coordinate coordinate to query
 * @param {?Object} config optional configuration
 * @return {!angular.$http.HttpPromise} promise of the OSRM API request
 * @see https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#nearest-service
 */
gmf.RoutingService.prototype.getNearest = function(coordinate, config) {
  config = config || {};

  // service is always nearest
  config['service'] = 'nearest';

  // Mode of transportation
  // If used in combination with a getRoute request, choose the same profile.
  if (!config['profile']) {
    config['profile'] = 'car'; // default to car
  }

  // build request URL
  let url = this.gmfOsrmBackendUrl_;

  // Common workaround to provide multiple profiles (since it is not supported yet)
  // Every profile runs on its own instance.
  if (config['instance']) {
    url += `${config['instance']}/`;
  }

  url += `${config['service']}/${this.protocolVersion_}/${config['profile']}/`;

  // [a,b] -> 'a,b'
  const coordinateString = coordinate.join(',');
  url += coordinateString;

  // look for nereast service options
  if (config.options) {
    url += '?';
    const options = [];
    for (const option of Object.keys(config.options)) {
      options.push(`${option}=${config.options[option]}`);
    }
    url += options.join('&');
  }

  return this.$http_.get(url);
};

gmf.module.service('gmfRoutingService', gmf.RoutingService);
