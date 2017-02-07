goog.provide('app.attributes');

/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ngeo.format.XSDAttribute');
/** @suppress {extraRequire} */
goog.require('ngeo.attributesComponent');
goog.require('ol.Feature');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {angular.$http} $http Angular http service.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @ngInject
 * @constructor
 */
app.MainController = function($http, $timeout) {

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
};


/**
 * @param {angular.$http.Response} resp Ajax response.
 * @return {Array.<ngeox.Attribute>} List of attributes.
 * @private
 */
app.MainController.prototype.handleXSDAttributeGet_ = function(resp) {
  const format = new ngeo.format.XSDAttribute();
  const attributes = format.read(resp.data);
  this.attributes = attributes;
  return attributes;
};


/**
 * @export
 */
app.MainController.prototype.updateName = function() {
  this.timeout_(() => {
    this.feature.set('name', 'An alternate name');
  }, 0);
};


app.module.controller('MainController', app.MainController);
