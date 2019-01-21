import angular from 'angular';
import ngeoQueryQuerent from 'ngeo/query/Querent.js';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import ngeoQueryMapQueryComponent from 'ngeo/query/mapQueryComponent.js';
import ngeoQueryBboxQueryComponent from 'ngeo/query/bboxQueryComponent.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('ngeoQueryModule', [
  ngeoQueryQuerent.name,
  ngeoQueryMapQuerent.name,
  ngeoQueryMapQueryComponent.name,
  ngeoQueryBboxQueryComponent.name,
]);
