goog.provide('gmf.AbstractController');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.authenticationDirective');
/** @suppress {extraRequire} */
goog.require('gmf.backgroundlayerselectorDirective');
/** @suppress {extraRequire} */
goog.require('gmf.QueryManager');
/** @suppress {extraRequire} */
goog.require('gmf.TreeManager');
/** @suppress {extraRequire} */
goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.disclaimerDirective');
/** @suppress {extraRequire} */
goog.require('gmf.displayqueriesDirective');
/** @suppress {extraRequire} */
goog.require('gmf.layertreeDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('gmf.searchDirective');
/** @suppress {extraRequire} */
goog.require('gmf.themeselectorDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.BackgroundLayerMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
/** @suppress {extraRequire} */
goog.require('ngeo.mapQueryDirective');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.GetBrowserLanguage');
goog.require('ngeo.StateManager');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


gmf.module.constant('ngeoExportFeatureFormats', [
  ngeo.FeatureHelper.FormatType.KML,
  ngeo.FeatureHelper.FormatType.GPX
]);


// Filter to apply by default on all coordinates (such points in draw).
gmf.module.constant('ngeoPointfilter', 'ngeoNumberCoordinates:0:{x} E, {y} N');


gmf.module.constant('ngeoQueryOptions', {
  'limit': 20
});


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

  var ngeoLocation = $injector.get('ngeoLocation');
  if (ngeoLocation.hasParam('debug')) {
    // make the injector globally available
    window.injector = $injector;
  }

  goog.asserts.assertInstanceof(this.map, ol.Map);

  var gmfTreeManager = $injector.get('gmfTreeManager');
  /**
   * A reference to the current theme
   * @type {GmfThemesNode}
   * @export
   */
  this.theme = gmfTreeManager.tree;

  /**
   * Themes service
   * @type {gmf.Themes}
   */
  var gmfThemes = $injector.get('gmfThemes');

  /**
   * Authentication service
   * @type {gmf.Authentication}
   */
  var gmfAuthentication = $injector.get('gmfAuthentication');
  var loadThemes = function(evt) {
    // reload themes when login status changes
    var roleId = (evt.user.username !== null) ? evt.user.role_id : undefined;
    gmfThemes.loadThemes(roleId);
  };
  ol.events.listen(gmfAuthentication, gmf.AuthenticationEventType.READY, loadThemes);
  ol.events.listen(gmfAuthentication, gmf.AuthenticationEventType.LOGIN, loadThemes);
  ol.events.listen(gmfAuthentication, gmf.AuthenticationEventType.LOGOUT, loadThemes);

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

  var queryFill = new ol.style.Fill({color: [255, 170, 0, 0.6]});
  var queryStroke = new ol.style.Stroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the displayqueries directive
   * @type {ol.style.Style}
   * @export
   */
  this.queryFeatureStyle = new ol.style.Style({
    fill: queryFill,
    image: new ol.style.Circle({
      fill: queryFill,
      radius: 5,
      stroke: queryStroke
    }),
    stroke: queryStroke
  });

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
   * @type {gmfx.User}
   * @export
   */
  this.gmfUser = $injector.get('gmfUser');

  // close right nave on successful login
  $scope.$watch(function() {
    return this.gmfUser.username;
  }.bind(this), function(newVal) {
    if (newVal !== null && this.navIsVisible) {
      this.rightNavVisible = false;
    }
  }.bind(this));

  /**
   * @type {ngeo.GetBrowserLanguage}
   */
  this.getBrowserLanguage = $injector.get('ngeoGetBrowserLanguage');

  /**
   * @type {ngeo.StateManager}
   */
  this.stateManager = $injector.get('ngeoStateManager');

  /**
   * @type {tmhDynamicLocale}
   */
  this.tmhDynamicLocale = $injector.get('tmhDynamicLocale');

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
   * @type {!Object.<string, string>}
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

  gmfThemes.getBgLayers().then(function(layers) {
    // get the background from the permalink
    var permalink = $injector.get('gmfPermalink');
    var background = permalink.getBackgroundLayer(layers);
    if (!background) {
      // get the background from the user settings
      var functionalities = this.gmfUser.functionalities;
      if (functionalities) {
        var defaultBasemapArray = functionalities.default_basemap;
        if (defaultBasemapArray.length > 0) {
          var defaultBasemapLabel = defaultBasemapArray[0];
          background = ol.array.find(layers, function(layer) {
            return layer.get('label') === defaultBasemapLabel;
          });
        }
      }
    }
    if (!background && layers[1]) {
      // fallback to the layers list, use the second one because the first
      // is the blank layer
      background = layers[1];
    }

    if (background) {
      var backgroundLayerMgr = $injector.get('ngeoBackgroundLayerMgr');
      backgroundLayerMgr.set(this.map, background);
    }
  }.bind(this));
};


/**
 * @param {string} lang Language code.
 * @export
 */
gmf.AbstractController.prototype.switchLanguage = function(lang) {
  goog.asserts.assert(lang in this.langUrls);
  this.gettextCatalog.setCurrentLanguage(lang);
  this.gettextCatalog.loadRemote(this.langUrls[lang]);
  this.tmhDynamicLocale.set(lang);
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
      (this.getBrowserLanguage(Object.keys(this.langUrls)));
  var urlLanguage = /** @type {string|undefined} */
      (this.stateManager.getInitialValue('lang'));

  if (urlLanguage !== undefined && urlLanguage in this.langUrls) {
    this.switchLanguage(urlLanguage);
    return;
  } else if (browserLanguage !== undefined && browserLanguage in this.langUrls) {
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
