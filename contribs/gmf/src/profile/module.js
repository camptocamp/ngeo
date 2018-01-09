goog.provide('gmf.profile.module');

goog.require('gmf.profile.component');
goog.require('gmf.profile.drawLineComponent');


/**
 * @type {!angular.Module}
 */
gmf.profile.module = angular.module('gmfProifleModule', [
  gmf.profile.component.name,
  gmf.profile.drawLineComponent.name,
]);
