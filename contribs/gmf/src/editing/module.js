goog.provide('gmf.editing.module');

goog.require('gmf.editing.EditFeature');
goog.require('gmf.editing.editFeatureComponent');
goog.require('gmf.editing.editFeatureSelectorComponent');
goog.require('gmf.editing.EnumerateAttribute');
goog.require('gmf.editing.Snapping');
goog.require('gmf.editing.XSDAttributes');


/**
 * @type {!angular.Module}
 */
gmf.editing.module = angular.module('gmfEditingModule', [
  gmf.editing.EditFeature.module.name,
  gmf.editing.editFeatureComponent.name,
  gmf.editing.editFeatureSelectorComponent.name,
  gmf.editing.EnumerateAttribute.module.name,
  gmf.editing.Snapping.module.name,
  gmf.editing.XSDAttributes.module.name,
]);
