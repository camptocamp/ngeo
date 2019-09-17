import angular from 'angular';
import ngeoQueryModeSelector from 'ngeo/query/ModeSelector.js';
import ngeoQueryQuerent from 'ngeo/query/Querent.js';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import ngeoQueryComponent from 'ngeo/query/component.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('ngeoQueryModule', [
  ngeoQueryModeSelector.name,
  ngeoQueryQuerent.name,
  ngeoQueryMapQuerent.name,
  ngeoQueryComponent.name,
]);
