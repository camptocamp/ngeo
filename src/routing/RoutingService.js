// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';

/**
 * Service to provide access to a
 * [Open Source Routing Machine (OSRM) backend](https://github.com/Project-OSRM/osrm-backend)
 * of version 5.8 and higher and its features.
 * @param {angular.IHttpService} $http Angular http service.
 * @param {import('ngeo/options').ngeoRoutingOptions} ngeoRoutingOptions The options.
 * @class
 * @ngdoc service
 * @ngInject
 * @ngname ngeoRoutingService
 * @hidden
 */
export function RoutingService($http, ngeoRoutingOptions) {
  /**
   * @type {angular.IHttpService}
   */
  this.$http_ = $http;

  /**
   * @type {import('ngeo/options').ngeoRoutingOptions}
   */
  this.routingOptions_ = ngeoRoutingOptions;

  /**
   * URL for OSRM backend API.
   * Defaults to demo backend.
   * @type {string}
   */
  this.ngeoOsrmBackendUrl_ = this.routingOptions_.backendUrl || 'https://router.project-osrm.org/';

  // the url is expected to end with a slash
  if (this.ngeoOsrmBackendUrl_.substr(-1) !== '/') {
    this.ngeoOsrmBackendUrl_ += '/';
  }

  /**
   * Version of the protocol implemented by the service.
   * see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md
   * @type {string}
   */
  this.protocolVersion_ = 'v1';
}

/**
 * @typedef {Object} Config
 * @property {string} [service]
 * @property {string} [profile]
 * @property {string} [instance]
 * @property {Object<string, string|boolean>} [options]
 */

/**
 * @typedef {Object} Routes
 * @property {Route[]} routes
 */

/**
 * @typedef {Object} Route
 * @property {Leg[]} [legs]
 * @property {string} [geometry]
 * @property {number} distance
 * @property {number} duration
 */

/**
 * @typedef {Object} Leg
 * @property {Step[]} steps
 */

/**
 * @typedef {Object} Step
 * @property {string} geometry
 */

/**
 * Route request
 * @param {import('ol/coordinate').Coordinate[]} coordinates coordinates of the route (at least two!)
 * @param {?Config} config optional configuration
 * @return {angular.IHttpPromise<Routes>} promise of the OSRM API request
 */
RoutingService.prototype.getRoute = function (coordinates, config) {
  config = config || {};

  // Service
  // see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#requests
  if (!config.service) {
    config.service = 'route'; // default to route
  }

  // Mode of transportation,
  // can be: car, bike, foot
  // see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#requests
  //
  // As of version 5.8.0, OSRM (server) does not support multiple profiles simultaneously.
  // This means the value actually does not matter.
  if (!config.profile) {
    config.profile = 'car'; // default to car
  }

  // build request URL
  let url = this.ngeoOsrmBackendUrl_;

  // Common workaround to provide multiple profiles (since it is not supported yet)
  // Every profile runs on its own instance.
  if (config.instance) {
    url += `${config.instance}/`;
  }

  url += `${config.service}/${this.protocolVersion_}/${config.profile}/`;

  // [ [a,b] , [c,d] ] -> 'a,b;c,d'
  const coordinateString = coordinates.map((c) => c.join(',')).join(';');

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
 * @param {import('ol/coordinate').Coordinate} coordinate coordinate to query
 * @param {?Config} config optional configuration
 * @return {angular.IHttpPromise<Object>} promise of the OSRM API request
 * @see https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#nearest-service
 */
RoutingService.prototype.getNearest = function (coordinate, config) {
  config = config || {};

  // service is always nearest
  config.service = 'nearest';

  // Mode of transportation
  // If used in combination with a getRoute request, choose the same profile.
  if (!config.profile) {
    config.profile = 'car'; // default to car
  }

  // build request URL
  let url = this.ngeoOsrmBackendUrl_;

  // Common workaround to provide multiple profiles (since it is not supported yet)
  // Every profile runs on its own instance.
  if (config.instance) {
    url += `${config.instance}/`;
  }

  url += `${config.service}/${this.protocolVersion_}/${config.profile}/`;

  // [a,b] -> 'a,b'
  const coordinateString = coordinate.join(',');
  url += coordinateString;

  // look for nearest service options
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
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoRoutingService', []);

myModule.service('ngeoRoutingService', RoutingService);

export default myModule;
