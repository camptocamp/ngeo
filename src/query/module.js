/**
 * @module ngeo.query.module
 */
import ngeoQueryQuerent from 'ngeo/query/Querent.js';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import ngeoQueryMapQueryComponent from 'ngeo/query/mapQueryComponent.js';
import ngeoQueryBboxQueryComponent from 'ngeo/query/bboxQueryComponent.js';

/**
 * @type {angular.Module}
 */
const exports = angular.module('ngeoQueryModule', [
  ngeoQueryQuerent.module.name,
  ngeoQueryMapQuerent.module.name,
  ngeoQueryMapQueryComponent.name,
  ngeoQueryBboxQueryComponent.name,
]);


export default exports;
