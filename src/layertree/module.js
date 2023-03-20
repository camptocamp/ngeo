/**
 */
import angular from 'angular';
import ngeoLayertreeComponent from 'ngeo/layertree/component.js';

/**
 * Also related to the map but not included in the module:
 *  - ngeo.layertree.Controller (already required by ngeo.layertree.component)
 * @type {!angular.IModule}
 */
export default angular.module('ngeoLayertreeModule', [ngeoLayertreeComponent.name]);
