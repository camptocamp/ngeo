goog.provide('gmf.datasource.DataSourceBeingFiltered');

goog.require('gmf');


gmf.module.value('gmfDataSourceBeingFiltered', {
  dataSource: null
});


/**
 * @record
 * @struct
 * @export
 */
gmf.datasource.DataSourceBeingFiltered = function() {};


/**
 * @type {?gmf.datasource.OGC}
 * @export
 */
gmf.datasource.DataSourceBeingFiltered.prototype.dataSource;
