/**
 * @module import("ngeo/draw/features.js").default
 */
import angular from 'angular';
import olCollection from 'ol/Collection.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoFeatures', []);

exports.value('ngeoFeatures', new olCollection());


export default exports;
