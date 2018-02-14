goog.provide('ngeo.draw.module');

goog.require('ngeo.draw.component');
goog.require('ngeo.draw.Controller');
goog.require('ngeo.draw.features');
goog.require('ngeo.draw.point');
goog.require('ngeo.draw.rectangle');
goog.require('ngeo.draw.text');

/**
 * @type {!angular.Module}
 */
ngeo.draw.module = angular.module('ngeoDrawModule', [
  ngeo.draw.Controller.module.name,
  ngeo.draw.component.name,
  ngeo.draw.features.name,
  ngeo.draw.point.name,
  ngeo.draw.rectangle.name,
  ngeo.draw.text.name,
]);
