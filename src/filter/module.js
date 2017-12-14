/**
 * @module ngeo filter namespace
 */
goog.provide('ngeo.filter.module');

goog.require('ngeo.filter.component');
goog.require('ngeo.filter.RuleHelper');
goog.require('ngeo.filter.ruleComponent');

/**
 * @type {!angular.Module}
 */
ngeo.filter.module = angular.module('ngeoFilterModule', [
  ngeo.filter.component.module.name,
  ngeo.filter.RuleHelper.module.name,
  ngeo.filter.ruleComponent.module.name,
]);
