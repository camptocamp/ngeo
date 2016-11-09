goog.provide('app.authentication');

/** @suppress {extraRequire} */
goog.require('gmf.authenticationDirective');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value(
    'authenticationBaseUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi');


/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {};


app.module.controller('MainController', app.MainController);
