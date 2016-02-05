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
goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.authenticationDirective');
/** @suppress {extraRequire} */
goog.require('gmf.proj.EPSG21781');


appModule.constant(
    'authenticationBaseUrl',
    'https://geomapfish-demo.camptocamp.net/2.0/wsgi');



/**
 * @param {string} defaultLang The default language.
 * @param {Object.<string, string>} langUrls The languages URLs.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.GetBrowserLanguage} ngeoGetBrowserLanguage
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.StateManager} ngeoStateManager the state manager.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @param {string} fulltextsearchUrl url to a gmf fulltextsearch service.
 * @constructor
 * @extends {gmf.AbstractDesktopController}
 * @ngInject
 * @export
 */
app.DesktopController = function(
    defaultLang, langUrls, gettextCatalog, ngeoGetBrowserLanguage,
    $scope, ngeoStateManager, ngeoFeatureOverlayMgr,
    gmfThemes, fulltextsearchUrl) {
  goog.base(
      this, {
        srid: 21781,
        mapViewConfig: {
          center: [632464, 185457],
          minZoom: 3,
          zoom: 3
        }
      }, defaultLang, langUrls, gettextCatalog, ngeoGetBrowserLanguage,
      $scope, ngeoStateManager, ngeoFeatureOverlayMgr,
      gmfThemes, fulltextsearchUrl);
};
goog.inherits(app.DesktopController, gmf.AbstractDesktopController);


appModule.controller('DesktopController', app.DesktopController);
