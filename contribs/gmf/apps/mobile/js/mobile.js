/**
 * @fileoverview Application entry point.
 *
 * This file defines the "app_mobile" Closure namespace, which is be used as the
 * Closure entry point (see "closure_entry_point" in the "build.json" file).
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
goog.provide('app.MobileController');
goog.provide('app_mobile');

goog.require('app');
goog.require('gmf.AbstractMobileController');



/**
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {Object} serverVars vars from GMF
 * @constructor
 * @extends {gmf.AbstractMobileController}
 * @ngInject
 * @export
 */
app.MobileController = function(ngeoFeatureOverlayMgr, serverVars) {
  goog.base(this, ngeoFeatureOverlayMgr, serverVars);
};
goog.inherits(app.MobileController, gmf.AbstractMobileController);


appModule.controller('MobileController', app.MobileController);
