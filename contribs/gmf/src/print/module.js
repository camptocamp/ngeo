goog.provide('gmf.print.module');

goog.require('gmf.print.component');


/**
 * @type {!angular.Module}
 */
gmf.print.module = angular.module('gmfPrintModule', [
  gmf.print.component.name,
]);
