/**
 * @module gmf authentication namespace
 */
goog.provide('gmf.authentication.module');

goog.require('gmf');
goog.require('gmf.authentication.component');
goog.require('gmf.authentication.service');


/**
 * @type {!angular.Module}
 */
gmf.authentication.module = angular.module('gmfAuthenticationModule', [
  gmf.authentication.component.name,
  gmf.authentication.service.name
]);
