goog.provide('app.attributes');

goog.require('ngeo.format.XSDAttribute');
/** @suppress {extraRequire} */
goog.require('ngeo.editing.attributesComponent');
goog.require('ol.Feature');
goog.require('ngeo.map.module');


/** @type {!angular.Module} */
app.attributes.module = angular.module('app', [
  'gettext',
  ngeo.map.module.name,
  ngeo.editing.attributesComponent.name,
]);


/**
 * @param {angular.$http} $http Angular http service.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {!angular.Scope} $scope Scope.
 * @ngInject
 * @constructor
 */
app.attributes.MainController = function($http, $timeout, $scope) {

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
  this.feature = new ol.Feature({
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
app.attributes.MainController.prototype.handleXSDAttributeGet_ = function(resp) {
  const format = new ngeo.format.XSDAttribute();
  const attributes = format.read(resp.data);
  this.attributes = attributes;
  return attributes;
};


/**
 * @export
 */
app.attributes.MainController.prototype.updateName = function() {
  this.timeout_(() => {
    this.feature.set('name', 'An alternate name');
  }, 0);
};

/**
 * @param {string} newMessage New message to add to log.
 */
app.attributes.MainController.prototype.appendLog = function(newMessage) {
  this.log = `${newMessage}\n${this.log}`;
};


app.attributes.module.controller('MainController', app.attributes.MainController);
