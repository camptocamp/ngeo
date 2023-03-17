import angular from 'angular';
import Service from 'ngeo/olcs/Service.js';
import control from 'ngeo/olcs/controls3d.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoOlcsModule', [control.name, Service.name]);

export default module;
