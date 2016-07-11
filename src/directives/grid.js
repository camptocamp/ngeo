goog.provide('ngeo.GridController');
goog.provide('ngeo.gridDirective');

goog.require('ngeo');

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
 * TODO
 * TODO Object -> specific type
 *
 * Example:
 *
 *     <ngeo-grid
 *       ngeo-grid-configuration="::ctrl.gridConfiguration"
 *     </ngeo-grid>
 *
 * @htmlAttribute {Array.<Object>} ngeo-grid-configuration The
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
   * TODO
   * @type {Object}
   * @export
   */
  this.configuration;

  /**
   * TODO
   * @type {Object.<number, Object>}
   * @export
   */
  this.selectedRows = {};

  /**
   * @type {string}
   * @export
   */
  this.sortedBy;

  /**
   * @type {boolean}
   * @export
   */
  this.sortAscending = true;

};


/**
 * Sort function that always put undefined values to the bottom of the grid.
 * A new call will sort ascending. A seconde one will sort descending (and so
 * on).
 * @param {string} columnName TODO.
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
 * @param {Object} attributes TODO.
 * @return {number} Unique id for this Object.
 * @export
 */
ngeo.GridController.prototype.getRowUid = function(attributes) {
  return goog.getUid(attributes);
};


/**
 * @param {Object} attributes TODO.
 * @return {boolean} True if already Selected. False otherwise.
 * @export
 */
ngeo.GridController.prototype.isRowSelected = function(attributes) {
  var uid = goog.getUid(attributes);
  if (this.selectedRows[uid]) {
    return true;
  }
  return false;
};


/**
 * @param {Object} attributes TODO.
 * @export
 */
ngeo.GridController.prototype.toggleRow = function(attributes) {
  // TODO If shift is pressed, Select all row bewtween this attributes
  // Object and the previous selected attributes Object in
  // this.configuration.data.
  this.toggleRow_(this.isRowSelected(attributes), attributes);
};


/**
 * @param {boolean} select TODO.
 * @param {Object} attributes TODO.
 * @private
 */
ngeo.GridController.prototype.toggleRow_ = function(select, attributes) {
  var uid = goog.getUid(attributes);
  if (select) {
    delete this.selectedRows[uid];
  } else {
    this.selectedRows[uid] = attributes;
  }
  // Fire event with add/remove information and the attributes in params ?
};


/**
 * Draft, Not tested
 * @param {boolean} select TODO.
 * @export
 */
ngeo.GridController.prototype.toggleAll = function(select) {
  this.configuration.data.forEach(function(attributes) {
    this.toggleRow_(select, attributes);
  }.bind(this));
};


/**
 * Draft, Not tested
 * @export
 */
ngeo.GridController.prototype.inverteSelection = function() {
  this.configuration.data.forEach(function(attributes) {
    this.isRowSelected(attributes);
    this.toggleRow_(!this.isRowSelected(attributes), attributes);
  }.bind(this));
};


ngeo.module.controller('ngeoGridController', ngeo.GridController);
