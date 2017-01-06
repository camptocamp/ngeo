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
  const ngeoFeatureHelper = $injector.get('ngeoFeatureHelper');
  ngeoFeatureHelper.setProjection(this.map.getView().getProjection());

  /**
   * @type {gmf.ThemeManager}
   * @export
   */
  this.gmfThemeManager = $injector.get('gmfThemeManager');

  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = $injector.get('gmfTreeManager');

  /**
   * Themes service
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = $injector.get('gmfThemes');

  /**
   * Authentication service
   * @type {gmf.Authentication}
   */
  const gmfAuthentication = $injector.get('gmfAuthentication');

  /**
   * Permalink service
   * @type {gmf.Permalink}
   */
  const permalink = $injector.get('gmfPermalink');

  const userChange = function(evt) {
    const roleId = (evt.user.username !== null) ? evt.user.role_id : undefined;
    // Reload theme and background layer when login status changes.
    if (evt.type !== gmf.AuthenticationEventType.READY) {
      this.updateCurrentTheme_();
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
    projection: `EPSG:${config.srid || 21781}`,
    url: /** @type {string} **/ ($injector.get('fulltextsearchUrl'))
  }];

  /**
   * @type {Object.<string, string>}
   * @export
   */
  this.dimensions = {};

  // watch any change on dimensions object to refresh the url
  permalink.setDimensions(this.dimensions);

  const queryManager = $injector.get('gmfQueryManager');
  queryManager.setDimensions(this.dimensions);

  if ($injector.has('gmfDefaultDimensions')) {
    // Set defaults
    const defaultDimensions = $injector.get('gmfDefaultDimensions');
    for (const dim in defaultDimensions) {
      if (this.dimensions[dim] === undefined) {
        this.dimensions[dim] = defaultDimensions[dim];
      }
    }
  }

  const backgroundLayerMgr = $injector.get('ngeoBackgroundLayerMgr');

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

  const queryFill = new ol.style.Fill({color: [255, 170, 0, 0.6]});
  const queryStroke = new ol.style.Stroke({color: [255, 170, 0, 1], width: 2});

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
  const ngeoFeatureOverlayMgr = $injector.get('ngeoFeatureOverlayMgr');
  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * The ngeo ToolActivate manager service.
   * @type {ngeo.ToolActivateMgr}
   */
  const ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

  const queryToolActivate = new ngeo.ToolActivate(this, 'queryActive');
  ngeoToolActivateMgr.registerTool('mapTools', queryToolActivate, true);

  const measurePointActivate = new ngeo.ToolActivate(this, 'measurePointActive');
  ngeoToolActivateMgr.registerTool('mapTools', measurePointActivate, false);

  const measureLengthActivate = new ngeo.ToolActivate(this, 'measureLengthActive');
  ngeoToolActivateMgr.registerTool('mapTools', measureLengthActivate, false);

  const drawFeatureActivate = new ngeo.ToolActivate(this, 'drawFeatureActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawFeatureActivate, false);

  const drawProfilePanelActivate = new ngeo.ToolActivate(this, 'drawProfilePanelActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawProfilePanelActivate, false);

  const printPanelActivate = new ngeo.ToolActivate(this, 'printPanelActive');
  ngeoToolActivateMgr.registerTool('mapTools', printPanelActivate, false);


  $scope.$watch(function() {
    return this.gmfThemeManager.themeName;
  }.bind(this), function(name) {
    const map = this.map;
    this.gmfThemes_.getThemeObject(name).then(function(theme) {
      if (theme) {
        const backgrounds = theme['functionalities']['default_basemap'];
        if (backgrounds && backgrounds.length > 0) {
          const background = backgrounds[0];
          this.gmfThemes_.getBgLayers(this.dimensions).then(function(layers) {
            const layer = ol.array.find(layers, function(layer) {
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
      let background;
      if (!skipPermalink) {
        // get the background from the permalink
        background = permalink.getBackgroundLayer(layers);
      }
      if (!background) {
        // get the background from the user settings
        const functionalities = this.gmfUser.functionalities;
        if (functionalities) {
          const defaultBasemapArray = functionalities.default_basemap;
          if (defaultBasemapArray.length > 0) {
            const defaultBasemapLabel = defaultBasemapArray[0];
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

  const browserLanguage = /** @type {string|undefined} */
      (this.getBrowserLanguage(Object.keys(this.langUrls)));
  const urlLanguage = /** @type {string|undefined} */
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
    let themeName;

    // check if we have a theme in the user functionalities
    const functionalities = this.gmfUser.functionalities;
    if (functionalities && 'default_theme' in functionalities) {
      const defaultTheme = functionalities.default_theme;
      if (defaultTheme.length > 0) {
        themeName = defaultTheme[0];
      }
    }
    if (themeName) {
      const theme = gmf.Themes.findThemeByName(themes, /** @type {string} */ (themeName));
      if (theme) {
        this.gmfThemeManager.addTheme(theme, true);
      }
    }
  }.bind(this));
};

gmf.module.controller('AbstractController', gmf.AbstractController);
