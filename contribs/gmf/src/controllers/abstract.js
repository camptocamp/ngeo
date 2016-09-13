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
goog.require('gmf.displayquerywindowDirective');
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
goog.require('ngeo.Query');
goog.require('ngeo.StateManager');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


gmf.module.value('ngeoExportFeatureFormats', [
  ngeo.FeatureHelper.FormatType.KML,
  ngeo.FeatureHelper.FormatType.GPX
]);


// Filter to apply by default on all coordinates (such points in draw).
gmf.module.value('ngeoPointfilter', 'ngeoNumberCoordinates:0:{x} E, {y} N');


gmf.module.value('ngeoQueryOptions', {
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

  /**
   * Location service
   * @type {ngeo.Location}
   */
  this.ngeoLocation = $injector.get('ngeoLocation');
  if (this.ngeoLocation.hasParam('debug')) {
    // make the injector globally available
    window.injector = $injector;
  }

  goog.asserts.assertInstanceof(this.map, ol.Map);

  /**
   * Ngeo FeatureHelper service
   * @type {ngeo.FeatureHelper}
   */
  var ngeoFeatureHelper = $injector.get('ngeoFeatureHelper');
  ngeoFeatureHelper.setProjection(this.map.getView().getProjection());

  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = $injector.get('gmfTreeManager');

  /**
   * A reference to the current theme
   * @type {GmfThemesTheme}
   * @export
   */
  this.theme = this.gmfTreeManager_.tree;

  /**
   * Themes service
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = $injector.get('gmfThemes');

  /**
   * @type {string}
   * @private
   */
  this.defaultTheme_ = $injector.get('defaultTheme');

  /**
   * Authentication service
   * @type {gmf.Authentication}
   */
  var gmfAuthentication = $injector.get('gmfAuthentication');

  var userChange = function(evt) {
    var roleId = (evt.user.username !== null) ? evt.user.role_id : undefined;
    // Reload theme when login status changes.
    this.updateCurrentTheme_();
    // Reload background layer when login status changes.
    if (evt.type !== gmf.AuthenticationEventType.READY) {
      this.updateCurrentBackgroundLayer_(true);
    }
    // Reload themes when login status changes.
    this.gmfThemes_.loadThemes(roleId);
    this.updateHasEditableLayers_();
  }.bind(this);

  ol.events.listen(gmfAuthentication, gmf.AuthenticationEventType.READY, userChange);
  ol.events.listen(gmfAuthentication, gmf.AuthenticationEventType.LOGIN, userChange);
  ol.events.listen(gmfAuthentication, gmf.AuthenticationEventType.LOGOUT, userChange);

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
   * @type {Object.<string, string>}
   * @export
   */
  this.dimensions = {};

  var permalink = $injector.get('gmfPermalink');

  // watch any change on dimensions object to refresh the url
  permalink.setDimensions(this.dimensions);

  if ($injector.has('gmfDefaultDimensions')) {
    // Set defaults
    var defaultDimensions = $injector.get('gmfDefaultDimensions');
    for (var dim in defaultDimensions) {
      if (this.dimensions[dim] === undefined) {
        this.dimensions[dim] = defaultDimensions[dim];
      }
    }
  }

  var backgroundLayerMgr = $injector.get('ngeoBackgroundLayerMgr');

  // watch any change on dimensions object to refresh the background layer
  $scope.$watchCollection(function() {
    return this.dimensions;
  }.bind(this), function() {
    backgroundLayerMgr.updateDimensions(this.map, this.dimensions);
  }.bind(this));

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

  // Not used in this file but the QueryManager must be injected to be watched.
  $injector.get('gmfQueryManager');

  var queryFill = new ol.style.Fill({color: [255, 170, 0, 0.6]});
  var queryStroke = new ol.style.Stroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the displayquerywindow directive
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
   * The active state of the ngeo query directive.
   * @type {boolean}
   * @export
   */
  this.queryActive = true;

  /**
   * Set the clearing of the ngeoQuery after the deactivation of the query
   * @type {boolean}
   * @export
   */
  this.queryAutoClear = true;

  /**
   * @type {boolean}
   * @export
   */
  this.printPanelActive = false;

  /**
   * @type {boolean}
   * @export
   */
  this.printActive = false;

  /**
   * @type {ngeo.Query}
   * @private
   */
  this.ngeoQuery_ = $injector.get('ngeoQuery');

  // Don't deactivate ngeoQuery on print activation
  $scope.$watch(function() {
    return this.printPanelActive;
  }.bind(this), function(newVal) {
    // Clear queries if another panel is open but not if user go back to the
    // map form the print.
    if (!newVal && !this.queryActive) {
      this.ngeoQuery_.clear();
    }
    this.queryAutoClear = !newVal;
    this.printActive = newVal;
  }.bind(this));

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
   * @type {boolean}
   * @export
   */
  this.drawFeatureActive = false;

  /**
   * @type {boolean}
   * @export
   */
  this.drawProfilePanelActive = false;

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

  var measureLengthActivate = new ngeo.ToolActivate(this, 'measureLengthActive');
  ngeoToolActivateMgr.registerTool('mapTools', measureLengthActivate, false);

  var drawFeatureActivate = new ngeo.ToolActivate(this, 'drawFeatureActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawFeatureActivate, false);

  var drawProfilePanelActivate = new ngeo.ToolActivate(this, 'drawProfilePanelActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawProfilePanelActivate, false);

  var printPanelActivate = new ngeo.ToolActivate(this, 'printPanelActive');
  ngeoToolActivateMgr.registerTool('mapTools', printPanelActivate, false);


  $scope.$watch(function() {
    return this.theme.name;
  }.bind(this), function(name) {
    this.setThemeInUrl_(name);
    var map = this.map;
    this.gmfThemes_.getThemeObject(name).then(function(theme) {
      if (theme) {
        var backgrounds = theme['functionalities']['default_basemap'];
        if (backgrounds && backgrounds.length > 0) {
          var background = backgrounds[0];
          this.gmfThemes_.getBgLayers(this.dimensions).then(function(layers) {
            var layer = ol.array.find(layers, function(layer) {
              return layer.get('label') === background;
            });
            if (layer) {
              backgroundLayerMgr.set(map, layer);
            }
          });
        }
      }
    }.bind(this));
  }.bind(this));

  /**
   * @param {boolean} skipPermalink If True, don't use permalink
   * background layer.
   * @private
   */
  this.updateCurrentBackgroundLayer_ = function(skipPermalink) {
    this.gmfThemes_.getBgLayers(this.dimensions).then(function(layers) {
      var background;
      if (!skipPermalink) {
        // get the background from the permalink
        background = permalink.getBackgroundLayer(layers);
      }
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
        backgroundLayerMgr.set(this.map, background);
      }
    }.bind(this));
  }.bind(this);

  this.updateCurrentBackgroundLayer_(false);

  /**
   * @type {boolean}
   * @export
   */
  this.hasEditableLayers = false;

  /**
   * @private
   */
  this.updateHasEditableLayers_ = function() {
    this.gmfThemes_.hasEditableLayers().then(function(hasEditableLayers) {
      this.hasEditableLayers = hasEditableLayers;
    }.bind(this));
  };
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


/**
 * @private
 */
gmf.AbstractController.prototype.updateCurrentTheme_ = function() {
  this.gmfThemes_.getThemesObject().then(function(themes) {
    var themeName;

    // check if we have a theme in the permalink
    var pathElements = this.ngeoLocation.getPath().split('/');
    if (gmf.AbstractController.themeInUrl(pathElements)) {
      themeName = pathElements[pathElements.length - 1];
    }
    if (!themeName) {
      // check if we have a theme in the local storage
      themeName = this.stateManager.getInitialValue('theme');
    }

    if (!themeName) {
      // check if we have a theme in the user functionalities
      var functionalities = this.gmfUser.functionalities;
      if (functionalities && 'default_theme' in functionalities) {
        var defaultTheme = functionalities.default_theme;
        if (defaultTheme.length > 0) {
          themeName = defaultTheme[0];
        }
      }
    }
    if (!themeName) {
      // fallback to the default theme
      themeName = this.defaultTheme_;
    }
    var theme = gmf.Themes.findThemeByName(themes, /** @type {string} */ (themeName));
    this.gmfTreeManager_.addTheme(theme, true);

  }.bind(this));
};


/**
 * Return true if there is a theme specified in the URL path.
 * @param {Array.<string>} pathElements Array of path elements.
 * @return {boolean} theme in path.
 */
gmf.AbstractController.themeInUrl = function(pathElements) {
  var indexOfTheme = pathElements.indexOf('theme');
  return indexOfTheme >= 0 &&
      pathElements.indexOf('theme') == pathElements.length - 2;
};


/**
 * @param {string} themeId The theme id to set in the path of the URL.
 * @private
 */
gmf.AbstractController.prototype.setThemeInUrl_ = function(themeId) {
  if (themeId) {
    var pathElements = this.ngeoLocation.getPath().split('/');
    goog.asserts.assert(pathElements.length > 1);
    if (pathElements[pathElements.length - 1] === '') {
      // case where the path is just "/"
      pathElements.splice(pathElements.length - 1);
    }
    if (gmf.AbstractController.themeInUrl(pathElements)) {
      pathElements[pathElements.length - 1] = themeId;
    } else {
      pathElements.push('theme', themeId);
    }
    this.ngeoLocation.setPath(pathElements.join('/'));
  }
};

gmf.module.controller('AbstractController', gmf.AbstractController);
