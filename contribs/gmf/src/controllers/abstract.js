goog.provide('gmf.AbstractController');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.authenticationDirective');
/** @suppress {extraRequire} */
goog.require('gmf.backgroundlayerselectorComponent');
/** @suppress {extraRequire} */
goog.require('gmf.DataSourcesManager');
/** @suppress {extraRequire} */
goog.require('gmf.TreeManager');
/** @suppress {extraRequire} */
goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.disclaimerComponent');
/** @suppress {extraRequire} */
goog.require('gmf.displayquerywindowComponent');
/** @suppress {extraRequire} */
goog.require('gmf.layertreeComponent');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('gmf.searchDirective');
/** @suppress {extraRequire} */
goog.require('gmf.FulltextSearchService');
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
/** @suppress {extraRequire} */
goog.require('ngeo.MapQuerent');
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
 * @ngdoc controller
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
  ngeoFeatureHelper.setProjection(goog.asserts.assert(this.map.getView().getProjection()));

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
   * Permalink service
   * @type {gmf.Permalink}
   * @private
   */
  this.permalink_ = $injector.get('gmfPermalink');

  /**
   * Authentication service
   * @type {gmf.Authentication}
   */
  const gmfAuthentication = $injector.get('gmfAuthentication');

  /**
   * @type {boolean}
   * @export
   */
  this.hasEditableLayers = false;

  /**
   * @private
   */
  this.updateHasEditableLayers_ = function() {
    this.gmfThemes_.hasEditableLayers().then((hasEditableLayers) => {
      this.hasEditableLayers = hasEditableLayers;
    });
  };

  const userChange = (evt) => {
    const roleId = (evt.user.username !== null) ? evt.user.role_id : undefined;

    // Open filter panel if 'open_panel' is set in functionalities and
    // has 'layer_filter' as first value
    this.gmfThemes_.getThemesObject().then((themes) => {
      const functionalities = this.gmfUser.functionalities;
      if (functionalities &&
          functionalities.open_panel &&
          functionalities.open_panel[0] === 'layer_filter') {
        this.filterSelectorActive = true;
      }
    });

    // Reload theme and background layer when login status changes.
    const previousThemeName = this.gmfThemeManager.getThemeName();
    this.gmfThemeManager.setThemeName('', true);
    if (evt.type !== gmf.AuthenticationEventType.READY) {
      this.updateCurrentTheme_(previousThemeName);
    }
    // Reload themes when login status changes.
    this.gmfThemes_.loadThemes(roleId);
    this.updateHasEditableLayers_();
  };

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
   * @type {!Object.<string, string>}
   * @export
   */
  this.dimensions = {};

  // watch any change on dimensions object to refresh the url
  this.permalink_.setDimensions(this.dimensions);

  // Injecting the gmfDataSourcesManager service creates the data sources
  const gmfDataSourcesManager = $injector.get('gmfDataSourcesManager');

  // Give the dimensions to the gmfDataSourcesManager
  gmfDataSourcesManager.setDimensions(this.dimensions);

  if ($injector.has('gmfDefaultDimensions')) {
    // Set defaults
    const defaultDimensions = $injector.get('gmfDefaultDimensions');
    for (const dim in defaultDimensions) {
      if (this.dimensions[dim] === undefined) {
        this.dimensions[dim] = defaultDimensions[dim];
      }
    }
  }

  /**
   * @type {ngeo.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = $injector.get('ngeoBackgroundLayerMgr');

  // watch any change on dimensions object to refresh the background layer
  $scope.$watchCollection(() => this.dimensions, () => {
    this.backgroundLayerMgr_.updateDimensions(this.map, this.dimensions);
  });

  this.backgroundLayerMgr_.on(ngeo.BackgroundEventType.CHANGE, () => {
    this.backgroundLayerMgr_.updateDimensions(this.map, this.dimensions);
  });

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
   * @type {boolean}
   * @export
   */
  this.filterSelectorActive = false;

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
   * @type {ngeo.MapQuerent}
   * @private
   */
  this.ngeoMapQuerent_ = $injector.get('ngeoMapQuerent');

  // Don't deactivate ngeoQuery on print activation
  $scope.$watch(() => this.printPanelActive, (newVal) => {
    // Clear queries if another panel is open but not if user go back to the
    // map form the print.
    if (!newVal && !this.queryActive) {
      this.ngeoMapQuerent_.clear();
    }
    this.queryAutoClear = !newVal;
    this.printActive = newVal;
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
  $scope.$watch(() => this.gmfUser.username, (newVal) => {
    if (newVal !== null && this.navIsVisible) {
      this.rightNavVisible = false;
    }
  });

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

  const mapTools = 'mapTools';

  /**
   * @type {string}
   * @export
   */
  this.mapToolsGroup = mapTools;

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
  ngeoToolActivateMgr.registerTool(mapTools, queryToolActivate, true);

  const measurePointActivate = new ngeo.ToolActivate(this, 'measurePointActive');
  ngeoToolActivateMgr.registerTool(mapTools, measurePointActivate, false);

  const measureLengthActivate = new ngeo.ToolActivate(this, 'measureLengthActive');
  ngeoToolActivateMgr.registerTool(mapTools, measureLengthActivate, false);

  const drawFeatureActivate = new ngeo.ToolActivate(this, 'drawFeatureActive');
  ngeoToolActivateMgr.registerTool(mapTools, drawFeatureActivate, false);

  const drawProfilePanelActivate = new ngeo.ToolActivate(this, 'drawProfilePanelActive');
  ngeoToolActivateMgr.registerTool(mapTools, drawProfilePanelActivate, false);

  const printPanelActivate = new ngeo.ToolActivate(this, 'printPanelActive');
  ngeoToolActivateMgr.registerTool(mapTools, printPanelActivate, false);

  $scope.$root.$on(gmf.ThemeManagerEventType.THEME_NAME_SET, (event, name) => {
    this.gmfThemes_.getThemeObject(name).then((theme) => {
      this.setDefaultBackground_(theme);
    });
  });

  /**
   * Ngeo create popup factory
   * @type {ngeo.CreatePopup}
   */
  const ngeoCreatePopup = $injector.get('ngeoCreatePopup');

  // Static "not used" functions should be in the window because otherwise
  // closure remove them. "export" tag doens't work on static function below,
  // we "export" them as externs in the gmfx options file.
  const gmfx = window.gmfx || {};
  /**
   * @export
   */
  window.gmfx = gmfx;

  /**
   * Static function to create a popup with an iframe.
   * @param {string} url an url.
   * @param {string} title (text).
   * @param {string=} opt_width CSS width.
   * @param {string=} opt_height CSS height.
   * @export
   */
  gmfx.openIframePopup = function(url, title, opt_width, opt_height) {
    const popup = ngeoCreatePopup();
    popup.setUrl(`${url}`);
    gmfx.openPopup_(popup, title, opt_width, opt_height);
  };

  /**
   * Static function to create a popup with html content.
   * @param {string} content (text or html).
   * @param {string} title (text).
   * @param {string=} opt_width CSS width.
   * @param {string=} opt_height CSS height.
   * @export
   */
  gmfx.openTextPopup = function(content, title, opt_width, opt_height) {
    const popup = ngeoCreatePopup();
    popup.setContent(`${content}`, true);
    gmfx.openPopup_(popup, title, opt_width, opt_height);
  };

  /**
   * @param {ngeo.Popup!} popup a ngeoPopup.
   * @param {string} title (text).
   * @param {string=} opt_width CSS width.
   * @param {string=} opt_height CSS height.
   */
  gmfx.openPopup_ = function(popup, title, opt_width, opt_height) {
    if (opt_width) {
      popup.setWidth(`${opt_width}`);
    }
    if (opt_height) {
      popup.setHeight(`${opt_height}`);
    }
    popup.setTitle(`${title}`);
    popup.setAutoDestroy(true);
    popup.setOpen(true);
  };

  /**
   * Whether to update the size of the map on browser window resize.
   * @type {boolean}
   * @export
   */
  this.manageResize = false;

  /**
   * The duration (milliseconds) of the animation that may occur on the div
   * containing the map. Used to smoothly resize the map while the animation
   * is in progress.
   * @type {number|undefined}
   * @export
   */
  this.resizeTransition;

  const cgxp = window.cgxp || {};
  /**
   * @export
   */
  window.cgxp = cgxp;
  /**
   * @export
   */
  cgxp.tools = window.cgxp.tools || {};
  /**
   * Static function to create a popup with an iframe.
   * @param {string} url an url.
   * @param {string} title (text).
   * @param {string=} opt_width CSS width.
   * @param {string=} opt_height CSS height.
   * @export
   */
  cgxp.tools.openInfoWindow = function(url, title, opt_width, opt_height) {
    gmfx.openIframePopup(url, title, opt_width, opt_height);
  };

  /**
   * @private
   */
  this.fullTextSearch_ = $injector.get('gmfFulltextSearchService');

  const searchQuery = this.ngeoLocation.getParam('search');
  if (searchQuery) {
    const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
    this.search_(searchQuery, overlay);
  }
};


/**
 * @param {Array.<ol.layer.Base>} layers Layers list.
 * @param {Array.<string>} labels default_basemap list.
 * @return {ol.layer.Base} layer or null
 */
gmf.AbstractController.getLayerByLabels = function(layers, labels) {
  if (labels && labels.length > 0) {
    return ol.array.find(layers, layer => layer.get('label') === labels[0]);
  }
  return null;
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
  this.$scope.$watch(() => this['lang'], (newValue) => {
    this.stateManager.updateState({
      'lang': newValue
    });
  });

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
 * @param {gmfThemes.GmfTheme} theme Theme.
 * @private
 */
gmf.AbstractController.prototype.setDefaultBackground_ = function(theme) {
  this.gmfThemes_.getBgLayers(this.dimensions).then((layers) => {
    let layer;

    // get the background from the permalink
    layer = this.permalink_.getBackgroundLayer(layers);

    if (!layer) {
      // get the background from the user settings
      layer = gmf.AbstractController.getLayerByLabels(layers, this.gmfUser.functionalities.default_basemap);
    }

    if (!layer && theme) {
      // get the background from the theme
      layer = gmf.AbstractController.getLayerByLabels(layers, theme.functionalities.default_basemap);
    }

    if (!layer) {
      // fallback to the layers list, use the second one because the first is the blank layer.
      layer = layers[layers.length > 1 ? 1 : 0];
    }

    goog.asserts.assert(layer);
    this.backgroundLayerMgr_.set(this.map, layer);
  });
};

/**
 * @param {string} fallbackThemeName fallback theme name.
 * @private
 */
gmf.AbstractController.prototype.updateCurrentTheme_ = function(fallbackThemeName) {
  this.gmfThemes_.getThemesObject().then((themes) => {
    const themeName = this.permalink_.defaultThemeNameFromFunctionalities();
    if (themeName) {
      const theme = gmf.Themes.findThemeByName(themes, /** @type {string} */ (themeName));
      if (theme) {
        this.gmfThemeManager.addTheme(theme, true);
      }
    } else {
      this.gmfThemeManager.setThemeName(fallbackThemeName);
    }
  });
};

/**
 * Performs a full-text search and centers the map on the first search result.
 * @param {string} query Search query.
 * @param {ngeo.FeatureOverlay} overlay Feature overlay to add the feature if found.
 * @private
 */
gmf.AbstractController.prototype.search_ = function(query, overlay) {
  this.fullTextSearch_.search(query, {'limit': 1})
    .then((data) => {
      if (data && data.features[0]) {
        const format = new ol.format.GeoJSON();
        const feature = format.readFeature(data.features[0]);
        overlay.addFeature(feature);
        this.map.getView().fit(feature.getGeometry().getExtent());
      }
    });
};

gmf.module.controller('AbstractController', gmf.AbstractController);
