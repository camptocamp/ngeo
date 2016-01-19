/**
 * @fileoverview Application entry point.
 *
 * This file defines the "app_desktop" Closure namespace, which is be used as
 * the Closure entry point (see "closure_entry_point" in the "build.json"
 * file).
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
goog.provide('app.DesktopController');
goog.provide('app_desktop');

goog.require('app');
goog.require('gmf.AbstractDesktopController');
/** @suppress {extraRequire} */
goog.require('gmf.authenticationDirective');


appModule.constant(
    'authenticationBaseUrl',
    'https://geomapfish-demo.camptocamp.net/2.0/wsgi');



/**
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {string} fulltextsearchUrl url to a gmf fulltextsearch service.
 * @constructor
 * @extends {gmf.AbstractDesktopController}
 * @ngInject
 * @export
 */
app.DesktopController = function(
    ngeoFeatureOverlayMgr, fulltextsearchUrl) {
  goog.base(this, ngeoFeatureOverlayMgr, fulltextsearchUrl);
};
goog.inherits(app.DesktopController, gmf.AbstractDesktopController);


appModule.controller('DesktopController', app.DesktopController);
