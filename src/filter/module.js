/**
 * @module ngeo.filter.module
 */
import ngeoFilterComponent from 'ngeo/filter/component.js';
import ngeoFilterRuleHelper from 'ngeo/filter/RuleHelper.js';
import ngeoFilterRuleComponent from 'ngeo/filter/ruleComponent.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('ngeoFilterModule', [
  ngeoFilterComponent.name,
  ngeoFilterRuleHelper.module.name,
  ngeoFilterRuleComponent.name,
]);
