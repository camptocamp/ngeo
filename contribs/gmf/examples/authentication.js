goog.provide('gmfapp.authentication');


// webpack: import './authentication.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
goog.require('gmf.authentication.module');


/** @type {!angular.Module} **/
gmfapp.authentication.module = angular.module('gmfapp', [
  gmf.module.name,
  gmf.authentication.module.name
]);


gmfapp.authentication.module.value(
  'authenticationBaseUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi');

gmfapp.authentication.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @ngInject
 */
gmfapp.authentication.MainController = function() {};


gmfapp.authentication.module.controller('MainController', gmfapp.authentication.MainController);
