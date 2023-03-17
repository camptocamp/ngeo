import angular from 'angular';
import olCollection from 'ol/Collection.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoFeatures', []);

module.value('ngeoFeatures', new olCollection());

export default module;
