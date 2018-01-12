goog.provide('gmf.permalink.module');

goog.require('gmf.permalink.Permalink');
goog.require('gmf.permalink.ShareService');
goog.require('gmf.permalink.shareComponent');


/**
 * @type {!angular.Module}
 */
gmf.permalink.module = angular.module('gmfPermalinkModule', [
  gmf.permalink.Permalink.module.name,
  gmf.permalink.ShareService.module.name,
  gmf.permalink.shareComponent.name,
]);
