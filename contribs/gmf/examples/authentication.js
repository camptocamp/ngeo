goog.provide('gmfapp.authentication');


goog.require('gmf.authentication.module');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', [
  gmf.module.name,
  gmf.authentication.module.name
]);


gmfapp.module.value(
  'authenticationBaseUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi');


/**
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function() {};


gmfapp.module.controller('MainController', gmfapp.MainController);
