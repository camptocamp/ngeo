goog.provide('ngeo.GridConfig');
goog.provide('ngeo.GridController');
goog.provide('ngeo.gridDirective');

goog.require('ngeo');
goog.require('ol.has');
goog.require('goog.asserts');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');

ngeo.module.value('ngeoGridTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {boolean} Template URL.
     */
    function(element, attrs) {
      var templateUrl = attrs['ngeoGridTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          ngeo.baseTemplateUrl + '/grid.html';
    });

/**
 * @param {Array.<Object>|undefined} data Entries/objects to be shown in a grid.
 * @param {Array.<ngeox.GridColumnDef>|undefined} columnDefs Column definition of a grid.
 * @constructor
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
  return '' + goog.getUid(attributes);
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
  return this.data.filter(function(row) {
    return this.isRowSelected(row);
  }.bind(this));
};


/**
 * @param {Object} attributes An entry/row.
 * @public
 */
ngeo.GridConfig.prototype.selectRow = function(attributes) {
  var uid = ngeo.GridConfig.getRowUid(attributes);
  this.selectedRows[uid] = attributes;
};


/**
 * @param {Object} attributes An entry/row.
 * @public
 */
ngeo.GridConfig.prototype.toggleRow = function(attributes) {
  var uid = ngeo.GridConfig.getRowUid(attributes);
  var isSelected = this.isRowSelected(attributes);
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
  this.data.forEach(function(attributes) {
    this.selectRow(attributes);
  }.bind(this));
};


/**
 * Unselect all rows.
 * @export
 */
ngeo.GridConfig.prototype.unselectAll = function() {
  for (var rowId in this.selectedRows) {
    delete this.selectedRows[rowId];
  }
};


/**
 * Invert selection.
 * @export
 */
ngeo.GridConfig.prototype.invertSelection = function() {
  this.data.forEach(function(attributes) {
    this.toggleRow(attributes);
  }.bind(this));
};


/**
 * A grid directive for displaying tabular data. The columns of the grid
 * are sortable, rows can be selected with a single click (also in combination
 * with SHIFT and CTRL/Meta).
 *
 * Example:
 *
 *     <ngeo-grid
 *       ngeo-grid-configuration="::ctrl.gridConfiguration"
 *     </ngeo-grid>
 *
 * @htmlAttribute {ngeo.GridConfig} ngeo-grid-configuration The
 * configuration to use.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoGridTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoGrid
 */
ngeo.gridDirective = function(ngeoGridTemplateUrl) {
  return {
    bindToController: true,
    controller: 'ngeoGridController',
    controllerAs: 'ctrl',
    restrict: 'E',
    scope: {
      'configuration': '=ngeoGridConfiguration'
    },
    templateUrl: ngeoGridTemplateUrl
  };
};

ngeo.module.directive('ngeoGrid', ngeo.gridDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoGridController
 */
ngeo.GridController = function($scope) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {ngeo.GridConfig}
   * @export
   */
  this.configuration;

  /**
   * @type {Object.<string, Object>}
   * @export
   */
  this.selectedRows = this.configuration.selectedRows;

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
      return $table.closest('.table-container');
    }
  };

};


/**
 * Sort function that always puts undefined values to the bottom of the grid.
 * A new call will sort ascending. A next one will sort descending (and so
 * on).
 * @param {string} columnName The name of the column that should be used to
 *    sort the data.
 * @export
 */
ngeo.GridController.prototype.sort = function(columnName) {
  this.sortAscending = this.sortedBy === columnName ? !this.sortAscending : true;
  this.sortedBy = columnName;

  var asc = this.sortAscending ? 1 : -1;
  this.configuration.data.sort(function(attributes1, attributes2) {
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
ngeo.GridController.prototype.clickRow = function(attributes, event) {
  var shiftKey = this.isShiftKeyOnly_(event);
  var platformModifierKey = this.isPlatformModifierKeyOnly_(event);

  this.clickRow_(attributes, shiftKey, platformModifierKey);
};


/**
 * @param {Object} attributes An entry/row.
 * @param {boolean} shiftKey Shift pressed?
 * @param {boolean} platformModifierKey CTRL/Meta pressed?
 * @private
 */
ngeo.GridController.prototype.clickRow_ = function(
    attributes, shiftKey, platformModifierKey) {

  if (shiftKey && !platformModifierKey) {
    this.selectRange_(attributes);
  } else if (!shiftKey && platformModifierKey) {
    this.configuration.toggleRow(attributes);
  } else {
    var isSelected = this.configuration.isRowSelected(attributes);
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
ngeo.GridController.prototype.selectRange_ = function(attributes) {
  var targetUid = ngeo.GridConfig.getRowUid(attributes);
  var data = this.configuration.data;

  if (this.configuration.isRowSelected(attributes)) {
    return;
  }

  // get the position of the clicked and all already selected rows
  /** @type {number|undefined} */
  var posClickedRow = undefined;
  var posSelectedRows = [];
  for (var i = 0; i < data.length; i++) {
    var currentRow = data[i];
    var currentUid = ngeo.GridConfig.getRowUid(currentRow);

    if (targetUid === currentUid) {
      posClickedRow = i;
    } else if (this.configuration.isRowSelected(currentRow)) {
      posSelectedRows.push(i);
    }
  }
  goog.asserts.assert(posClickedRow !== undefined);

  if (posSelectedRows.length == 0) {
    // if no other row is selected, select the clicked one and stop
    this.configuration.selectRow(attributes);
  }

  // find the selected row which is the closest to the clicked row
  var distance = Infinity;
  var posClosestRow = posSelectedRows[0];
  for (var j = 0; j < posSelectedRows.length; j++) {
    var currentPos = posSelectedRows[j];
    var currentDistance = Math.abs(currentPos - posClickedRow);
    if (distance > currentDistance) {
      distance = currentDistance;
      posClosestRow = currentPos;
    }
    // note: this could be optimized because `posSelectedRows` is ordered.
  }

  // then select all rows between the clicked one and the closest
  var rangeStart = (posClickedRow < posClosestRow) ? posClickedRow : posClosestRow;
  var rangeEnd = (posClickedRow > posClosestRow) ? posClickedRow : posClosestRow;

  for (var l = rangeStart; l <= rangeEnd; l++) {
    this.configuration.selectRow(data[l]);
  }
};


/**
 * Prevent the default browser behaviour of selecting text
 * when selecting multiple rows with SHIFT or CTRL/Meta.
 * @param {jQuery.Event} event Event.
 * @export
 */
ngeo.GridController.prototype.preventTextSelection = function(event) {
  var shiftKey = this.isShiftKeyOnly_(event);
  var platformModifierKey = this.isPlatformModifierKeyOnly_(event);

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
ngeo.GridController.prototype.isPlatformModifierKeyOnly_ = function(event) {
  return (
      !event.altKey &&
      (ol.has.MAC ? event.metaKey : event.ctrlKey) &&
      !event.shiftKey);
};


/**
 * Same as `ol.events.condition.shiftKeyOnly`.
 * @param {jQuery.Event} event Event.
 * @return {boolean} True if only the shift key is pressed.
 * @private
 */
ngeo.GridController.prototype.isShiftKeyOnly_ = function(event) {
  return (
      !event.altKey &&
      !(event.metaKey || event.ctrlKey) &&
      event.shiftKey);
};


ngeo.module.controller('ngeoGridController', ngeo.GridController);
