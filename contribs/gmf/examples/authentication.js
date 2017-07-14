goog.provide('gmfapp.authentication');

/** @suppress {extraRequire} */
goog.require('gmf.authenticationDirective');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


gmfapp.module.value(
    'authenticationBaseUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi');


/**
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function() {};


gmfapp.module.controller('MainController', gmfapp.MainController);
