goog.provide('gmf.AbstractController');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.QueryManager');
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
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');


/**
 * Application abstract controller.
 *
 * This file includes `goog.require` for base components/directives used
 * by the HTML page and the controller to provide the configuration.
 *
 * @param {gmfx.Config} config A part of the application config.
 * @param {angular.Scope} $scope Scope.
 * @param {angular.$injector} $injector Main injector.
 * @constructor
 * @ngInject
 * @export
 */
gmf.AbstractController = function(config, $scope, $injector) {


  goog.asserts.assertInstanceof(this.map, ol.Map);

  /**
   * A reference to the current theme
   * @type {Object}
   * @export
   */
  this.theme;

  /**
   * Themes service
   * @type {gmf.Themes}
   */
  var gmfThemes = $injector.get('gmfThemes');
  gmfThemes.loadThemes();

  /**
   * @type {Array.<gmfx.SearchDirectiveDatasource>}
   * @export
   */
  this.searchDatasources = [{
    labelKey: 'label',
    groupValues: /** @type {Array.<string>} **/ ($injector.get('gmfSearchGroups')),
    groupActions: /** @type {Array.<string>} **/ ($injector.get('gmfSearchActions')),
    projection: 'EPSG:' + (config.srid || 21781),
    url: /** @type {string} **/ ($injector.get('fulltextsearchUrl'))
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
   * The active state of the ngeo query directive.
   * @type {boolean}
   * @export
   */
  this.queryActive = true;

  // Not used in this file but the QueryManager must be injected to be watched.
  $injector.get('gmfQueryManager');

  /**
   * The active state of the directive responsible of point measurements.
   * @type {boolean}
   * @export
   */
  this.measurePointActive = false;

  /**
   * The active state of the directive responsible of length measurements.
   * @type {boolean}
   * @export
   */
  this.measureLengthActive = false;

  /**
   * @type {ngeo.GetBrowserLanguage}
   */
  this.getBrowserLanguage = $injector.get('ngeoGetBrowserLanguage');

  /**
   * @type {ngeo.StateManager}
   */
  this.stateManager = $injector.get('ngeoStateManager');

  /**
   * @type {angular.Scope}
   */
  this.$scope = $scope;

  /**
   * Default language
   * @type {string}
   */
  this.defaultLang = $injector.get('defaultLang');

  /**
   * Languages URL
   * @type {Object.<string, string>}
   */
  this.langUrls = $injector.get('langUrls');

  /**
   * The gettext catalog
   * @type {angularGettext.Catalog}
   */
  this.gettextCatalog = $injector.get('gettextCatalog');

  this.initLanguage();

  /**
   * The ngeo feature overlay manager service
   * @type {ngeo.FeatureOverlayMgr}
   */
  var ngeoFeatureOverlayMgr = $injector.get('ngeoFeatureOverlayMgr');
  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * The ngeo ToolActivate manager service.
   * @type {ngeo.ToolActivateMgr}
   */
  var ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

  var queryToolActivate = new ngeo.ToolActivate(this, 'queryActive');
  ngeoToolActivateMgr.registerTool('mapTools', queryToolActivate, true);

  var measurePointActivate = new ngeo.ToolActivate(this, 'measurePointActive');
  ngeoToolActivateMgr.registerTool('mapTools', measurePointActivate, false);

  var measureLengthActivate = new ngeo.ToolActivate(
      this, 'measureLengthActive');
  ngeoToolActivateMgr.registerTool('mapTools', measureLengthActivate, false);

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
  this.$scope.$watch(function() {
    return this['lang'];
  }.bind(this), function(newValue) {
    this.stateManager.updateState({
      'lang': newValue
    });
  }.bind(this));

  var browserLanguage = /** @type {string|undefined} */
      (this.getBrowserLanguage(goog.object.getKeys(this.langUrls)));
  var urlLanguage = /** @type {string|undefined} */
      (this.stateManager.getInitialValue('lang'));

  if (urlLanguage !== undefined &&
      goog.object.containsKey(this.langUrls, urlLanguage)) {
    this.switchLanguage(urlLanguage);
    return;
  } else if (browserLanguage !== undefined &&
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

gmf.module.controller('AbstractController', gmf.AbstractController);
