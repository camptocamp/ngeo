goog.provide('gmf-authentication');

goog.require('gmf.authenticationDirective');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.constant(
    'authenticationBaseUrl',
    'https://geomapfish-demo.camptocamp.net/2.0/wsgi');



/**
 * @constructor
 */
app.MainController = function() {};


app.module.controller('MainController', app.MainController);
