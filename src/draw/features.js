/**
 * @module ngeo.draw.features
 */
import olCollection from 'ol/Collection.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoFeatures', []);

exports.value('ngeoFeatures', new olCollection());


export default exports;
