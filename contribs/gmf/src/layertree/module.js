goog.provide('gmf.layertree.module');

goog.require('gmf.layertree.component');
goog.require('gmf.layertree.datasourceGroupTreeComponent');
goog.require('gmf.layertree.SyncLayertreeMap');
goog.require('gmf.layertree.timeSliderComponent');
goog.require('gmf.layertree.TreeManager');


/**
 * @type {!angular.Module}
 */
gmf.layertree.module = angular.module('gmfLayertreeModule', [
  gmf.layertree.component.name,
  gmf.layertree.datasourceGroupTreeComponent.name,
  gmf.layertree.SyncLayertreeMap.module.name,
  gmf.layertree.timeSliderComponent.name,
  gmf.layertree.TreeManager.module.name,
]);
