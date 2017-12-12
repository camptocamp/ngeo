/**
 * @module gmf authentication namespace
 */
goog.provide('gmf.authentication.module');

goog.require('gmf.authentication.component');
goog.require('gmf.authentication.Service');


/**
 * @type {!angular.Module}
 */
gmf.authentication.module = angular.module('gmfAuthenticationModule', [
  gmf.authentication.component.name,
  gmf.authentication.service.module.name,
  'gmfUser'
]);
