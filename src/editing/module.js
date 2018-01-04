goog.provide('ngeo.editing.module');

goog.require('ngeo');
goog.require('ngeo.editing.attributesComponent');
goog.require('ngeo.editing.createfeatureComponent');
goog.require('ngeo.editing.createregularpolygonfromclickComponent');

/**
 * @type {!angular.Module}
 */
ngeo.editing.module = angular.module('ngeoEditingModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.editing.attributesComponent.name,
  ngeo.editing.createfeatureComponent.name,
  ngeo.editing.createregularpolygonfromclickComponent.name,
]);
