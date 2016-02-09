goog.provide('gmf.AbstractDesktopController');

goog.require('gmf');
goog.require('gmf.AbstractController');
/** @suppress {extraRequire} */
goog.require('gmf.mobileBackgroundLayerSelectorDirective');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.GetBrowserLanguage');
goog.require('ngeo.StateManager');
/** @suppress {extraRequire} */
goog.require('ngeo.btngroupDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.resizemapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.control.Zoom');
goog.require('ol.interaction');

gmfModule.constant('isDesktop', true);



/**
 * Desktop application abstract controller.
 *
 * This file includes `goog.require`'s for desktop components/directives used
 * by the HTML page and the controller to provide the configuration.
 *
 * @param {gmfx.Config} config A part of the application config.
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
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr The ngeo ToolActivate
 * @param {gmf.QueryManager} gmfQueryManager The gmf query manager service.
 * @constructor
 * @extends {gmf.AbstractController}
 * @ngInject
 * @export
 */
gmf.AbstractDesktopController = function(
    config, defaultLang, langUrls, gettextCatalog, ngeoGetBrowserLanguage,
    $scope, ngeoStateManager, ngeoFeatureOverlayMgr,
    gmfThemes, fulltextsearchUrl, ngeoToolActivateMgr,
    gmfQueryManager) {
  goog.base(
      this, config, defaultLang, langUrls, gettextCatalog,
      ngeoGetBrowserLanguage,
      $scope, ngeoStateManager, ngeoFeatureOverlayMgr,
      gmfThemes, fulltextsearchUrl, ngeoToolActivateMgr,
      gmfQueryManager);

  var viewConfig = {
    projection: ol.proj.get('epsg:' + (config.srid || 21781))
  };
  goog.object.extend(viewConfig, config.mapViewConfig || {});

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [],
    view: new ol.View(viewConfig),
    controls: config.mapControls || [
      new ol.control.ScaleLine(),
      new ol.control.Zoom()
    ],
    interactions: config.mapInteractions || ol.interaction.defaults({
      pinchRotate: false,
      altShiftDragRotate: false
    })
  });

  /**
   * @type {boolean}
   * @export
   */
  this.toolsActive = false;

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body'
  });
};
goog.inherits(gmf.AbstractDesktopController, gmf.AbstractController);


gmfModule.controller(
    'AbstractDesktopController',
    gmf.AbstractDesktopController);
