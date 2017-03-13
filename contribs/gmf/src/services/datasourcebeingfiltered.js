goog.provide('gmf.DataSourceBeingFiltered');

goog.require('gmf');


gmf.module.value('gmfDataSourceBeingFiltered', {
  dataSource: null
});


/**
 * @record
 * @struct
 * @export
 */
gmf.DataSourceBeingFiltered = function() {};


/**
 * @type {?gmf.DataSource}
 * @export
 */
gmf.DataSourceBeingFiltered.prototype.dataSource;
