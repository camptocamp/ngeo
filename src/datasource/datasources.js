goog.provide('ngeo.datasource.DataSources');

goog.require('ngeo');
goog.require('ol.Collection');


ngeo.module.value('ngeoDataSources', new ol.Collection());


/**
 * @typedef {!ol.Collection.<!ngeo.datasource.DataSource>}
 */
ngeo.datasource.DataSources;
