import angular from 'angular';
import ngeoQueryModeSelector from 'ngeo/query/ModeSelector.js';
import ngeoQueryQuerent from 'ngeo/query/Querent.js';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import ngeoQueryMapQueryComponent from 'ngeo/query/mapQueryComponent.js';
import ngeoQueryBboxQueryComponent from 'ngeo/query/bboxQueryComponent.js';
import ngeoQueryComponent from 'ngeo/query/component.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('ngeoQueryModule', [
  ngeoQueryModeSelector.name,
  ngeoQueryQuerent.name,
  ngeoQueryMapQuerent.name,
  ngeoQueryMapQueryComponent.name,
  ngeoQueryBboxQueryComponent.name,
  ngeoQueryComponent.name,
]);
