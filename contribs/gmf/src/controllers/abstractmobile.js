/**
 * @fileoverview Application entry point.
 *
 * This file defines the "app_mobile" Closure namespace, which is be used as the
 * Closure entry point (see "closure_entry_point" in the "build.json" file).
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
goog.provide('gmf.AbstractMobileController');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mobileNavDirective');
/** @suppress {extraRequire} */
goog.require('gmf.proj.EPSG21781');
/** @suppress {extraRequire} */
goog.require('gmf.searchDirective');
/** @suppress {extraRequire} */
goog.require('gmf.themeselectorDirective');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.GetBrowserLanguage');
goog.require('ngeo.StateManager');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.control.Zoom');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');

gmfModule.constant('isMobile', true);


gmfModule.constant(
    'gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.0/wsgi/themes?' +
        'version=2&background=background');



/**
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {Object} serverVars vars from GMF
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.StateManager} ngeoStateManager the state manager.
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.GetBrowserLanguage} ngeoGetBrowserLanguage
 * @param {gmf.Themes} gmfThemes Themes service.
 * @constructor
 * @ngInject
 * @export
 */
gmf.AbstractMobileController = function(
    ngeoFeatureOverlayMgr, serverVars, gettextCatalog, ngeoStateManager, $scope,
    ngeoGetBrowserLanguage, gmfThemes) {

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
    projection: 'EPSG:21781',
    url: serverVars['serviceUrls']['fulltextsearch']
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

  var positionFeatureStyle = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({color: 'rgba(230, 100, 100, 1)'}),
      stroke: new ol.style.Stroke({color: 'rgba(230, 40, 40, 1)', width: 2})
    })
  });

  var accuracyFeatureStyle = new ol.style.Style({
    fill: new ol.style.Fill({color: 'rgba(100, 100, 230, 0.3)'}),
    stroke: new ol.style.Stroke({color: 'rgba(40, 40, 230, 1)', width: 2})
  });

  /**
   * @type {ngeox.MobileGeolocationDirectiveOptions}
   * @export
   */
  this.mobileGeolocationOptions = {
    positionFeatureStyle: positionFeatureStyle,
    accuracyFeatureStyle: accuracyFeatureStyle,
    zoom: 17
  };

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    }),
    controls: [
      new ol.control.ScaleLine(),
      new ol.control.Zoom()
    ]
  });

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
  this.defaultLang = serverVars['defaultLang'];

  /**
   * Languages URL
   * @type {Object.<string, string>}
   */
  this.langUrls = serverVars['langUrls'];

  /**
   * The gettext catalog
   * @type {angularGettext.Catalog}
   */
  this.gettextCatalog = gettextCatalog;

  this.initLanguage();

  ngeoFeatureOverlayMgr.init(this.map);

};


/**
 * @export
 */
gmf.AbstractMobileController.prototype.toggleLeftNavVisibility = function() {
  this.leftNavVisible = !this.leftNavVisible;
};


/**
 * @export
 */
gmf.AbstractMobileController.prototype.toggleRightNavVisibility = function() {
  this.rightNavVisible = !this.rightNavVisible;
};


/**
 * Hide both navigation menus.
 * @export
 */
gmf.AbstractMobileController.prototype.hideNav = function() {
  this.leftNavVisible = this.rightNavVisible = false;
};


/**
 * @return {boolean} Return true if one of the navigation menus is visible,
 * otherwise false.
 * @export
 */
gmf.AbstractMobileController.prototype.navIsVisible = function() {
  return this.leftNavVisible || this.rightNavVisible;
};


/**
 * @return {boolean} Return true if the left navigation menus is visible,
 * otherwise false.
 * @export
 */
gmf.AbstractMobileController.prototype.leftNavIsVisible = function() {
  return this.leftNavVisible;
};


/**
 * @return {boolean} Return true if the right navigation menus is visible,
 * otherwise false.
 * @export
 */
gmf.AbstractMobileController.prototype.rightNavIsVisible = function() {
  return this.rightNavVisible;
};


/**
 * @param {string} lang Language code.
 * @export
 */
gmf.AbstractMobileController.prototype.switchLanguage = function(lang) {
  goog.asserts.assert(lang in this.langUrls);
  this.gettextCatalog.setCurrentLanguage(lang);
  this.gettextCatalog.loadRemote(this.langUrls[lang]);
  this['lang'] = lang;
};


/**
 */
gmf.AbstractMobileController.prototype.initLanguage = function() {
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

gmfModule.controller('AbstractMobileController', gmf.AbstractMobileController);
