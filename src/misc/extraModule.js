goog.provide('ngeo.misc.extraModule');

goog.require('ngeo');
goog.require('ngeo.misc.AutoProjection');
goog.require('ngeo.misc.btnComponent');
goog.require('ngeo.misc.controlComponent');
goog.require('ngeo.misc.datepickerComponent');
goog.require('ngeo.misc.debounce');
goog.require('ngeo.misc.EventHelper');
goog.require('ngeo.misc.FeatureHelper');
goog.require('ngeo.misc.filereaderComponent');
goog.require('ngeo.misc.getBrowserLanguage');
goog.require('ngeo.misc.sortableComponent');
goog.require('ngeo.misc.Time');
goog.require('ngeo.misc.WMSTime');

/**
 * @type {!angular.Module}
 */
ngeo.misc.extraModule = angular.module('ngeoMiscExtraModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.misc.AutoProjection.module.name,
  ngeo.misc.btnComponent.name,
  ngeo.misc.controlComponent.name,
  ngeo.misc.datepickerComponent.name,
  ngeo.misc.debounce.name,
  ngeo.misc.EventHelper.module.name,
  ngeo.misc.FeatureHelper.module.name,
  ngeo.misc.filereaderComponent.name,
  ngeo.misc.getBrowserLanguage.name,
  ngeo.misc.sortableComponent.name,
  ngeo.misc.Time.module.name,
  ngeo.misc.WMSTime.module.name,
]);
