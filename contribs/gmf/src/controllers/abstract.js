goog.provide('gmf.AbstractController');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.layertreeDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('gmf.searchDirective');
/** @suppress {extraRequire} */
goog.require('gmf.themeselectorDirective');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.GetBrowserLanguage');
goog.require('ngeo.StateManager');



/**
 * Application abstract cntroller.
 *
 * This file includes `goog.require`'for base components/directives used
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
 * @constructor
 * @ngInject
 * @export
 */
gmf.AbstractController = function(
    config, defaultLang, langUrls, gettextCatalog, ngeoGetBrowserLanguage,
    $scope, ngeoStateManager, ngeoFeatureOverlayMgr,
    gmfThemes, fulltextsearchUrl) {

  /**
   * A reference to the current theme
   * @type {Object}
   * @export
   */
  this.theme;

  gmfThemes.loadThemes();

  /**
   * @type {Array.<gmfx.SearchDirectiveDatasource>}
   * @export
   */
  this.searchDatasources = [{
    datasetTitle: 'Internal',
    labelKey: 'label',
    groupsKey: 'layer_name',
    groupValues: ['osm'],
    projection: 'EPSG:' + (config.srid || 21781),
    url: fulltextsearchUrl
  }];

  /**
   * @type {boolean}
   * @export
   */
  this.leftNavVisible = false;

  /**
   * @type {boolean}
   * @export
   */
  this.rightNavVisible = false;

  /**
   * @type {ngeo.GetBrowserLanguage}
   */
  this.getBrowserLanguage = ngeoGetBrowserLanguage;

  /**
   * @type {ngeo.StateManager}
   */
  this.stateManager = ngeoStateManager;

  /**
   * @type {angular.Scope}
   */
  this.scope = $scope;

  /**
   * Default language
   * @type {string}
   */
  this.defaultLang = defaultLang;

  /**
   * Languages URL
   * @type {Object.<string, string>}
   */
  this.langUrls = langUrls;

  /**
   * The gettext catalog
   * @type {angularGettext.Catalog}
   */
  this.gettextCatalog = gettextCatalog;

  this.initLanguage();

  ngeoFeatureOverlayMgr.init(this.map);

};


/**
 * @param {string} lang Language code.
 * @export
 */
gmf.AbstractController.prototype.switchLanguage = function(lang) {
  goog.asserts.assert(lang in this.langUrls);
  this.gettextCatalog.setCurrentLanguage(lang);
  this.gettextCatalog.loadRemote(this.langUrls[lang]);
  this['lang'] = lang;
};


/**
 */
gmf.AbstractController.prototype.initLanguage = function() {
  this.scope.$watch(goog.bind(function() {
    return this['lang'];
  }, this), goog.bind(function(newValue) {
    this.stateManager.updateState({
      'lang': newValue
    });
  }, this));

  var browserLanguage = /** @type {string|undefined} */
      (this.getBrowserLanguage(goog.object.getKeys(this.langUrls)));
  var urlLanguage = /** @type {string|undefined} */
      (this.stateManager.getInitialValue('lang'));

  if (goog.isDef(urlLanguage) &&
      goog.object.containsKey(this.langUrls, urlLanguage)) {
    this.switchLanguage(urlLanguage);
    return;
  } else if (goog.isDef(browserLanguage) &&
      goog.object.containsKey(this.langUrls, browserLanguage)) {
    this.switchLanguage(browserLanguage);
    return;
  } else {
    // if there is no information about language preference,
    // fallback to default language

    this.switchLanguage(this.defaultLang);
    return;
  }
};

gmfModule.controller('AbstractController', gmf.AbstractController);
