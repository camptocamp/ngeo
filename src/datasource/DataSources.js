goog.provide('ngeo.datasource.DataSources');

goog.require('ngeo');
goog.require('ol.Collection');


/**
 * @type {!angular.Module}
 */
ngeo.datasource.DataSources.module = angular.module('ngeoDataSources', []);
// DataSources with the ngeox.datasource.DataSources type.
ngeo.datasource.DataSources.module.value('ngeoDataSources', new ol.Collection());
ngeo.module.requires.push(ngeo.datasource.DataSources.module.name);
