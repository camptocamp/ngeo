/**
 * @module app.attributes
 */
const exports = {};
import ngeoFormatXSDAttribute from 'ngeo/format/XSDAttribute.js';

/** @suppress {extraRequire} */
import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent.js';

import olFeature from 'ol/Feature.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.Module} */
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoEditingAttributesComponent.name,
]);


/**
 * @param {angular.$http} $http Angular http service.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {!angular.Scope} $scope Scope.
 * @ngInject
 * @constructor
 */
exports.MainController = function($http, $timeout, $scope) {

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {?Array.<ngeox.Attribute>}
   * @export
   */
  this.attributes = null;

  /**
   * @type {boolean}
   * @export
   */
  this.disabled = false;

  /**
   * @type {ol.Feature}
   * @export
   */
  this.feature = new olFeature({
    'name': 'A feature',
    'kind': 'house'
  });

  $http.get('data/xsdattributes.xml').then(
    this.handleXSDAttributeGet_.bind(this));

  //
  // Visual feedback for changes applied to feature:

  /**
   * @type {string}
   * @export
   */
  this.log = '';

  $scope.$watch(
    () => this.feature.get('name'),
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.appendLog(`name changed from '${oldValue}' to '${newValue}'`);
      }
    }
  );

  $scope.$watch(
    () => this.feature.get('kind'),
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.appendLog(`kind changed from '${oldValue}' to '${newValue}'`);
      }
    }
  );
};


/**
 * @param {angular.$http.Response} resp Ajax response.
 * @return {Array.<ngeox.Attribute>} List of attributes.
 * @private
 */
exports.MainController.prototype.handleXSDAttributeGet_ = function(resp) {
  const format = new ngeoFormatXSDAttribute();
  const attributes = format.read(resp.data);
  this.attributes = attributes;
  return attributes;
};


/**
 * @export
 */
exports.MainController.prototype.updateName = function() {
  this.timeout_(() => {
    this.feature.set('name', 'An alternate name');
  }, 0);
};

/**
 * @param {string} newMessage New message to add to log.
 */
exports.MainController.prototype.appendLog = function(newMessage) {
  this.log = `${newMessage}\n${this.log}`;
};


exports.module.controller('MainController', exports.MainController);


export default exports;
