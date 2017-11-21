goog.provide('ngeo.GridConfig');


/**
 * @param {Array.<Object>|undefined} data Entries/objects to be shown in a grid.
 * @param {Array.<ngeox.GridColumnDef>|undefined} columnDefs Column definition of a grid.
 * @constructor
 * @struct
 * @export
 */
ngeo.GridConfig = function(data, columnDefs) {
  /**
   * @type {Array.<Object>|undefined}
   * @export
   */
  this.data = data;

  /**
   * @type {Array.<ngeox.GridColumnDef>|undefined}
   * @export
   */
  this.columnDefs = columnDefs;

  /**
   * @type {!Object.<string, Object>}
   * @export
   */
  this.selectedRows = {};
};


/**
 * Get an ID for a row.
 * @param {Object} attributes An entry/row.
 * @return {string} Unique id for this object.
 * @export
 */
ngeo.GridConfig.getRowUid = function(attributes) {
  return `${ol.getUid(attributes)}`;
};


/**
 * Is the given row selected?
 * @param {Object} attributes An entry/row.
 * @return {boolean} True if already selected. False otherwise.
 * @export
 */
ngeo.GridConfig.prototype.isRowSelected = function(attributes) {
  return !!this.selectedRows[ngeo.GridConfig.getRowUid(attributes)];
};


/**
 * Returns the number of selected rows.
 * @return {number} Number of selected rows.
 * @export
 */
ngeo.GridConfig.prototype.getSelectedCount = function() {
  return Object.keys(this.selectedRows).length;
};


/**
 * Returns the selected rows.
 * @return {Array.<Object>} Selected rows in the current ordering.
 * @export
 */
ngeo.GridConfig.prototype.getSelectedRows = function() {
  return this.data.filter(row => this.isRowSelected(row));
};


/**
 * @param {Object} attributes An entry/row.
 * @public
 */
ngeo.GridConfig.prototype.selectRow = function(attributes) {
  const uid = ngeo.GridConfig.getRowUid(attributes);
  this.selectedRows[uid] = attributes;
};


/**
 * @param {Object} attributes An entry/row.
 * @public
 */
ngeo.GridConfig.prototype.toggleRow = function(attributes) {
  const uid = ngeo.GridConfig.getRowUid(attributes);
  const isSelected = this.isRowSelected(attributes);
  if (isSelected) {
    delete this.selectedRows[uid];
  } else {
    this.selectedRows[uid] = attributes;
  }
};


/**
 * Select all rows.
 * @export
 */
ngeo.GridConfig.prototype.selectAll = function() {
  this.data.forEach((attributes) => {
    this.selectRow(attributes);
  });
};


/**
 * Unselect all rows.
 * @export
 */
ngeo.GridConfig.prototype.unselectAll = function() {
  for (const rowId in this.selectedRows) {
    delete this.selectedRows[rowId];
  }
};


/**
 * Invert selection.
 * @export
 */
ngeo.GridConfig.prototype.invertSelection = function() {
  this.data.forEach((attributes) => {
    this.toggleRow(attributes);
  });
};
