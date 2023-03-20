import angular from 'angular';
import ngeoGridComponent from 'ngeo/grid/component.js';

/**
 * Also related to the grid but not included in the module:
 *  - ngeo.grid.Config (already required by ngeo.grid.component)
 *
 * @type {!angular.IModule}
 */
export default angular.module('ngeoGridModule', [ngeoGridComponent.name]);
