/**
 * Application entry point.
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
goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.authenticationDirective');
/** @suppress {extraRequire} */
goog.require('gmf.proj.EPSG21781');
/** @suppress {extraRequire} */
goog.require('ngeo.mobileGeolocationDirective');



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
 * @extends {gmf.AbstractMobileController}
 * @ngInject
 * @export
 */
app.MobileController = function(
    defaultLang, langUrls, gettextCatalog, ngeoGetBrowserLanguage,
    $scope, ngeoStateManager, ngeoFeatureOverlayMgr,
    gmfThemes, fulltextsearchUrl) {
  goog.base(
      this, defaultLang, langUrls, gettextCatalog, ngeoGetBrowserLanguage,
      $scope, ngeoStateManager, ngeoFeatureOverlayMgr, 21781,
      gmfThemes, fulltextsearchUrl);
};
goog.inherits(app.MobileController, gmf.AbstractMobileController);



appModule.controller('MobileController', app.MobileController);
