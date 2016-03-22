goog.provide('popover');

goog.require('ngeo.popoverDirective');
goog.require('ngeo.popoverAnchorDirective');
goog.require('ngeo.popoverContentDirective');

/** @const **/
var app = {};

/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);
