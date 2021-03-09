// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {getUid as olUtilGetUid} from 'ol/util.js';

/**
 * @param {Object<string, string|number|boolean>[]|undefined} data Entries/objects to be shown in a grid.
 * @param {import('ngeo/download/Csv.js').GridColumnDef[] | undefined} columnDefs Column definition of a
 *    grid.
 * @class
 * @private
 * @hidden
 */
function GridConfig(data, columnDefs) {
  /**
   * @type {Object<string, string|number|boolean>[]|undefined}
   */
  this.data = data;

  /**
   * @type {import('ngeo/download/Csv.js').GridColumnDef[] | undefined}
   */
  this.columnDefs = columnDefs;

  /**
   * @type {Object<string, Object>}
   */
  this.selectedRows = {};
}

/**
 * Get an ID for a row.
 * @param {unknown} attributes An entry/row.
 * @return {string} Unique id for this object.
 * @hidden
 */
export function getRowUid(attributes) {
  return `${olUtilGetUid(attributes)}`;
}

/**
 * Is the given row selected?
 * @param {unknown} attributes An entry/row.
 * @return {boolean} True if already selected. False otherwise.
 */
GridConfig.prototype.isRowSelected = function (attributes) {
  return !!this.selectedRows[getRowUid(attributes)];
};

/**
 * Returns the number of selected rows.
 * @return {number} Number of selected rows.
 */
GridConfig.prototype.getSelectedCount = function () {
  return Object.keys(this.selectedRows).length;
};

/**
 * Returns the selected rows.
 * @return {unknown[]} Selected rows in the current ordering.
 */
GridConfig.prototype.getSelectedRows = function () {
  if (!this.data) {
    throw new Error('Missing data');
  }
  return this.data.filter((row) => this.isRowSelected(row));
};

/**
 * @param {unknown} attributes An entry/row.
 * @public
 */
GridConfig.prototype.selectRow = function (attributes) {
  const uid = getRowUid(attributes);
  this.selectedRows[uid] = attributes;
};

/**
 * @param {unknown} attributes An entry/row.
 * @public
 */
GridConfig.prototype.toggleRow = function (attributes) {
  const uid = getRowUid(attributes);
  const isSelected = this.isRowSelected(attributes);
  if (isSelected) {
    delete this.selectedRows[uid];
  } else {
    this.selectedRows[uid] = attributes;
  }
};

/**
 * Select all rows.
 */
GridConfig.prototype.selectAll = function () {
  if (!this.data) {
    throw new Error('Missing data');
  }
  this.data.forEach((attributes) => {
    this.selectRow(attributes);
  });
};

/**
 * Deselect all rows.
 */
GridConfig.prototype.unselectAll = function () {
  for (const rowId in this.selectedRows) {
    delete this.selectedRows[rowId];
  }
};

/**
 * Invert selection.
 */
GridConfig.prototype.invertSelection = function () {
  if (!this.data) {
    throw new Error('Missing data');
  }
  this.data.forEach((attributes) => {
    this.toggleRow(attributes);
  });
};

export default GridConfig;
