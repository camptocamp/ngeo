/**
 * @module ngeo.grid.component
 */
import googAsserts from 'goog/asserts.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoGridConfig from 'ngeo/grid/Config.js';
import * as olHas from 'ol/has.js';

import 'floatthead';
import 'angular-float-thead';


/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoGrid', [
  ngeoGridConfig.module.name,
  ngeoMiscFilters.name,
  'floatThead',
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/grid', require('./component.html'));
});


exports.value('ngeoGridTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoGridTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/grid';
  }
);

/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} ngeoGridTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoGridTemplateUrl($attrs, ngeoGridTemplateUrl) {
  return ngeoGridTemplateUrl($attrs);
}


/**
 * A grid component for displaying tabular data. The columns of the grid
 * are sortable, rows can be selected with a single click (also in combination
 * with SHIFT and CTRL/Meta).
 *
 * Example:
 *
 *     <ngeo-grid
 *       ngeo-grid-configuration="::ctrl.gridConfiguration"
 *     </ngeo-grid>
 *
 * @htmlAttribute {ngeo.grid.Config} ngeo-grid-configuration The
 * configuration to use.
 *
 * @ngdoc component
 * @ngname ngeoGrid
 */
exports.component_ = {
  controller: 'ngeoGridController as ctrl',
  bindings: {
    'configuration': '=ngeoGridConfiguration'
  },
  templateUrl: ngeoGridTemplateUrl
};

exports.component('ngeoGrid', exports.component_);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoGridController
 */
exports.Controller_ = function($scope) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {ngeo.grid.Config}
   * @export
   */
  this.configuration;

  /**
   * @type {Object.<string, Object>}
   * @export
   */
  this.selectedRows;

  /**
   * The name of the column used to sort the grid.
   * @type {string}
   * @export
   */
  this.sortedBy;

  /**
   * @type {boolean}
   * @export
   */
  this.sortAscending = true;

  /**
   * Configuration object for float-thead.
   * @type {Object}
   * @export
   */
  this.floatTheadConfig = {
    'scrollContainer': function($table) {
      return $table.closest('.ngeo-grid-table-container');
    }
  };
};


/**
 * Init the controller
 */
exports.Controller_.prototype.$onInit = function() {
  this.selectedRows = this.configuration.selectedRows;
};


/**
 * Sort function that always puts undefined values to the bottom of the grid.
 * A new call will sort ascending. A next one will sort descending (and so
 * on).
 * @param {string} columnName The name of the column that should be used to
 *    sort the data.
 * @export
 */
exports.Controller_.prototype.sort = function(columnName) {
  this.sortAscending = this.sortedBy === columnName ? !this.sortAscending : true;
  this.sortedBy = columnName;

  const asc = this.sortAscending ? 1 : -1;
  this.configuration.data.sort((attributes1, attributes2) => {
    if (!attributes1[columnName]) {
      return 1;
    }
    if (!attributes2[columnName]) {
      return -1;
    }
    return attributes1[columnName] > attributes2[columnName] ? asc : -asc;
  });
};


/**
 * Handler for clicks on a row.
 * @param {Object} attributes An entry/row.
 * @param {jQuery.Event} event Event.
 * @export
 */
exports.Controller_.prototype.clickRow = function(attributes, event) {
  const shiftKey = this.isShiftKeyOnly_(event);
  const platformModifierKey = this.isPlatformModifierKeyOnly_(event);

  this.clickRow_(attributes, shiftKey, platformModifierKey);
};


/**
 * @param {Object} attributes An entry/row.
 * @param {boolean} shiftKey Shift pressed?
 * @param {boolean} platformModifierKey CTRL/Meta pressed?
 * @private
 */
exports.Controller_.prototype.clickRow_ = function(
  attributes, shiftKey, platformModifierKey) {

  if (shiftKey && !platformModifierKey) {
    this.selectRange_(attributes);
  } else if (!shiftKey && platformModifierKey) {
    this.configuration.toggleRow(attributes);
  } else {
    const isSelected = this.configuration.isRowSelected(attributes);
    this.configuration.unselectAll();
    if (!isSelected) {
      this.configuration.selectRow(attributes);
    }
  }
};


/**
 * Selects all rows between the given row and the closest already selected row.
 * @param {Object} attributes An entry/row.
 * @private
 */
exports.Controller_.prototype.selectRange_ = function(attributes) {
  const targetUid = ngeoGridConfig.getRowUid(attributes);
  const data = this.configuration.data;

  if (this.configuration.isRowSelected(attributes)) {
    return;
  }

  // get the position of the clicked and all already selected rows
  /** @type {number|undefined} */
  let posClickedRow = undefined;
  const posSelectedRows = [];
  for (let i = 0; i < data.length; i++) {
    const currentRow = data[i];
    const currentUid = ngeoGridConfig.getRowUid(currentRow);

    if (targetUid === currentUid) {
      posClickedRow = i;
    } else if (this.configuration.isRowSelected(currentRow)) {
      posSelectedRows.push(i);
    }
  }
  googAsserts.assert(posClickedRow !== undefined);

  if (posSelectedRows.length == 0) {
    // if no other row is selected, select the clicked one and stop
    this.configuration.selectRow(attributes);
  }

  // find the selected row which is the closest to the clicked row
  let distance = Infinity;
  let posClosestRow = posSelectedRows[0];
  for (let j = 0; j < posSelectedRows.length; j++) {
    const currentPos = posSelectedRows[j];
    const currentDistance = Math.abs(currentPos - posClickedRow);
    if (distance > currentDistance) {
      distance = currentDistance;
      posClosestRow = currentPos;
    }
    // note: this could be optimized because `posSelectedRows` is ordered.
  }

  // then select all rows between the clicked one and the closest
  const rangeStart = (posClickedRow < posClosestRow) ? posClickedRow : posClosestRow;
  const rangeEnd = (posClickedRow > posClosestRow) ? posClickedRow : posClosestRow;

  for (let l = rangeStart; l <= rangeEnd; l++) {
    this.configuration.selectRow(data[l]);
  }
};


/**
 * Prevent the default browser behaviour of selecting text
 * when selecting multiple rows with SHIFT or CTRL/Meta.
 * @param {jQuery.Event} event Event.
 * @export
 */
exports.Controller_.prototype.preventTextSelection = function(event) {
  const shiftKey = this.isShiftKeyOnly_(event);
  const platformModifierKey = this.isPlatformModifierKeyOnly_(event);

  if (shiftKey || platformModifierKey) {
    event.preventDefault();
  }
};


/**
 * Same as `ol.events.condition.platformModifierKeyOnly`.
 * @param {jQuery.Event} event Event.
 * @return {boolean} True if only the platform modifier key is pressed.
 * @private
 */
exports.Controller_.prototype.isPlatformModifierKeyOnly_ = function(event) {
  return !event.altKey &&
    (olHas.MAC ? event.metaKey : event.ctrlKey) &&
    !event.shiftKey;
};


/**
 * Same as `ol.events.condition.shiftKeyOnly`.
 * @param {jQuery.Event} event Event.
 * @return {boolean} True if only the shift key is pressed.
 * @private
 */
exports.Controller_.prototype.isShiftKeyOnly_ = function(event) {
  return (
    !event.altKey &&
      !(event.metaKey || event.ctrlKey) &&
      event.shiftKey);
};


exports.controller('ngeoGridController', exports.Controller_);


export default exports;
