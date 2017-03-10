goog.provide('gmf.DataSourceBeingFiltered');

goog.require('gmf');


gmf.module.value('gmfDataSourceBeingFiltered', {
  dataSource: null
});


/**
 * @record
 * @struct
 */
gmf.DataSourceBeingFiltered = function() {};


/**
 * @type {?gmf.DataSource}
 */
gmf.DataSourceBeingFiltered.prototype.dataSource;
