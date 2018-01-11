goog.provide('gmf.objectediting.module');

goog.require('gmf.objectediting.component');
goog.require('gmf.objectediting.getWMSFeatureComponent');
goog.require('gmf.objectediting.Manager');
goog.require('gmf.objectediting.Query');
goog.require('gmf.objectediting.toolsComponent');


/**
 * @type {!angular.Module}
 */
gmf.objectediting.module = angular.module('gmfObjecteditingModule', [
  gmf.objectediting.component.name,
  gmf.objectediting.getWMSFeatureComponent.name,
  gmf.objectediting.Manager.module.name,
  gmf.objectediting.Query.module.name,
  gmf.objectediting.toolsComponent.name,
]);
