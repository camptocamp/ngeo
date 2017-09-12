goog.provide('ngeo.DataSources');
goog.require('ngeo');

goog.require('ol.Collection');


ngeo.module.value('ngeoDataSources', new ol.Collection());


/**
 * @typedef {!ol.Collection.<!ngeo.DataSource>}
 */
ngeo.DataSources;
