goog.provide('ngeo.draw.features');

goog.require('ngeo');
goog.require('ol.Collection');


/**
 * @type {!angular.Module}
 */
ngeo.draw.features = angular.module('ngeoFeatures', []);

ngeo.module.requires.push(ngeo.draw.features.name);

ngeo.draw.features.value('ngeoFeatures', new ol.Collection());
