goog.provide('ngeo.draw.features');

goog.require('ol.Collection');


/**
 * @type {!angular.Module}
 */
ngeo.draw.features = angular.module('ngeoFeatures', []);

ngeo.draw.features.value('ngeoFeatures', new ol.Collection());
