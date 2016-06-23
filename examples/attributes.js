goog.provide('attributes');

goog.require('ngeo.mapDirective');
goog.require('ngeo.format.XSDAttribute');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {angular.$http} $http Angular http service.
 * @constructor
 */
app.MainController = function($http) {

  $http.get('data/xsdattributes.xml').then(
    /**
     * @param {angular.$http.Response} resp Ajax response.
     * @return {Array.<ngeox.Attribute>} List of attributes.
     * @private
     */
    function(resp) {
      var format = new ngeo.format.XSDAttribute();
      var attributes = format.read(resp.data);
      document.getElementById('list-of-attributes').innerHTML =
        JSON.stringify(attributes);
      return attributes;
    }
  );
};


app.module.controller('MainController', app.MainController);
