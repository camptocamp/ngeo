/**
 * @module gmf.controllers.AbstractAppController
 */
import 'jquery';
import 'angular';
import 'angular-gettext';
import 'angular-dynamic-locale';
import gmfAuthenticationModule from 'gmf/authentication/module.js';

import gmfBackgroundlayerselectorComponent from 'gmf/backgroundlayerselector/component.js';
import gmfDatasourceModule from 'gmf/datasource/module.js';
import gmfDisclaimerComponent from 'gmf/disclaimer/component.js';
import gmfFiltersModule from 'gmf/filters/module.js';
import gmfLayertreeModule from 'gmf/layertree/module.js';
import gmfMapModule from 'gmf/map/module.js';
import gmfQueryExtraModule from 'gmf/query/extraModule.js';
import gmfSearchModule from 'gmf/search/module.js';
import gmfThemeModule from 'gmf/theme/module.js';
import ngeoMessageDisplaywindowComponent from 'ngeo/message/displaywindowComponent.js';
import ngeoMiscExtraModule from 'ngeo/misc/extraModule.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoPolyfill from 'ngeo/polyfill.js';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import ngeoQueryMapQueryComponent from 'ngeo/query/mapQueryComponent.js';
import ngeoStatemanagerModule from 'ngeo/statemanager/module.js';
import ngeoStatemanagerWfsPermalink from 'ngeo/statemanager/WfsPermalink.js';
import googAsserts from 'goog/asserts.js';
import * as olArray from 'ol/array.js';
import * as olEvents from 'ol/events.js';
import olMap from 'ol/Map.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import gmfThemeManager from 'gmf/theme/Manager.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';

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
const exports = function(config, $scope, $injector) {

  ngeoPolyfill.fill();

  /**
   * Location service
   * @type {ngeo.statemanager.Location}
   */
  this.ngeoLocation = $injector.get('ngeoLocation');
  if (this.ngeoLocation.hasParam('debug')) {
    // make the injector globally available
    window.injector = $injector;
  }

  googAsserts.assertInstanceof(this.map, olMap);

  /**
   * Ngeo FeatureHelper service
   * @type {ngeo.misc.FeatureHelper}
   */
  const ngeoFeatureHelper = $injector.get('ngeoFeatureHelper');
  ngeoFeatureHelper.setProjection(googAsserts.assert(this.map.getView().getProjection()));

  /**
   * @type {gmf.theme.Manager}
   * @export
   */
  this.gmfThemeManager = $injector.get('gmfThemeManager');

  /**
   * @type {gmf.layertree.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = $injector.get('gmfTreeManager');

  /**
   * Themes service
   * @type {gmf.theme.Themes}
   * @private
   */
  this.gmfThemes_ = $injector.get('gmfThemes');

  /**
   * Permalink service
   * @type {gmf.permalink.Permalink}
   * @private
   */
  this.permalink_ = $injector.get('gmfPermalink');

  /**
   * Authentication service
   * @type {gmf.authentication.Service}
   */
  const gmfAuthentication = $injector.get('gmfAuthenticationService');

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

  /**
   * @param {gmfx.AuthenticationEvent} evt Event.
   */
  const userChange = (evt) => {
    const user = evt.detail.user;
    const roleId = (user.username !== null) ? user.role_id : undefined;

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
    if (evt.type !== 'ready') {
      this.updateCurrentTheme_(previousThemeName);
    }
    // Reload themes when login status changes.
    this.gmfThemes_.loadThemes(roleId);
    this.updateHasEditableLayers_();
  };

  olEvents.listen(gmfAuthentication, 'ready', userChange);
  olEvents.listen(gmfAuthentication, 'login', userChange);
  olEvents.listen(gmfAuthentication, 'logout', userChange);

  /**
   * @type {Array.<gmfx.SearchComponentDatasource>}
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
  // Init the datasources with our map.
  gmfDataSourcesManager.setDatasourceMap(this.map);
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
   * @type {ngeo.map.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = $injector.get('ngeoBackgroundLayerMgr');

  // watch any change on dimensions object to refresh the background layer
  $scope.$watchCollection(() => this.dimensions, () => {
    this.backgroundLayerMgr_.updateDimensions(this.map, this.dimensions);
  });

  this.backgroundLayerMgr_.on('change', () => {
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

  const queryFill = new olStyleFill({color: [255, 170, 0, 0.6]});
  const queryStroke = new olStyleStroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the gmf.query.windowComponent
   * @type {ol.style.Style}
   * @export
   */
  this.queryFeatureStyle = new olStyleStyle({
    fill: queryFill,
    image: new olStyleCircle({
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
   * @type {ngeo.query.MapQuerent}
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

  /**
   * @type {ngeox.miscGetBrowserLanguage}
   */
  this.getBrowserLanguage = $injector.get('ngeoGetBrowserLanguage');

  /**
   * @type {ngeo.statemanager.Service}
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
   * @type {string}
   * @export
   */
  this.lang;

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
   * @type {ngeo.map.FeatureOverlayMgr}
   */
  const ngeoFeatureOverlayMgr = $injector.get('ngeoFeatureOverlayMgr');
  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * The ngeo ToolActivate manager service.
   * @type {ngeo.misc.ToolActivateMgr}
   */
  const ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

  const queryToolActivate = new ngeoMiscToolActivate(this, 'queryActive');
  ngeoToolActivateMgr.registerTool(mapTools, queryToolActivate, true);

  const measurePointActivate = new ngeoMiscToolActivate(this, 'measurePointActive');
  ngeoToolActivateMgr.registerTool(mapTools, measurePointActivate, false);

  const measureLengthActivate = new ngeoMiscToolActivate(this, 'measureLengthActive');
  ngeoToolActivateMgr.registerTool(mapTools, measureLengthActivate, false);

  const drawFeatureActivate = new ngeoMiscToolActivate(this, 'drawFeatureActive');
  ngeoToolActivateMgr.registerTool(mapTools, drawFeatureActivate, false);

  const drawProfilePanelActivate = new ngeoMiscToolActivate(this, 'drawProfilePanelActive');
  ngeoToolActivateMgr.registerTool(mapTools, drawProfilePanelActivate, false);

  const printPanelActivate = new ngeoMiscToolActivate(this, 'printPanelActive');
  ngeoToolActivateMgr.registerTool(mapTools, printPanelActivate, false);

  $scope.$root.$on(gmfThemeManager.EventType.THEME_NAME_SET, (event, name) => {
    this.gmfThemes_.getThemeObject(name).then((theme) => {
      this.setDefaultBackground_(theme);
    });
  });

  /**
   * @param {boolean} skipPermalink If True, don't use permalink
   * background layer.
   * @private
   */
  this.updateCurrentBackgroundLayer_ = function(skipPermalink) {
    this.gmfThemes_.getBgLayers().then((layers) => {
      let background;
      if (!skipPermalink) {
        // get the background from the permalink
        background = this.permalink_.getBackgroundLayer(layers);
      }
      if (!background) {
        // get the background from the user settings
        const functionalities = this.gmfUser.functionalities;
        if (functionalities) {
          const defaultBasemapArray = functionalities.default_basemap;
          if (defaultBasemapArray.length > 0) {
            const defaultBasemapLabel = defaultBasemapArray[0];
            background = olArray.find(layers, layer => layer.get('label') === defaultBasemapLabel);
          }
        }
      }
      if (!background && layers[1]) {
        // fallback to the layers list, use the second one because the first
        // is the blank layer
        background = layers[1];
      }

      if (background) {
        this.backgroundLayerMgr_.set(this.map, background);
      }
    });
  }.bind(this);

  this.updateCurrentBackgroundLayer_(false);

  // Static "not used" functions should be in the window because otherwise
  // closure remove them. "export" tag doesn't work on static function below,
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
   * @param {number=} opt_width CSS width.
   * @param {number=} opt_height CSS height.
   * @param {boolean=} opt_apply If true, trigger the Angular digest loop. Default to true.
   * @export
   */
  gmfx.openIframePopup = (
    url, title, opt_width, opt_height, opt_apply
  ) => {
    this.displaywindowUrl = url;
    gmfx.openPopup_(title, opt_width, opt_height, opt_apply);
  };

  /**
   * Static function to create a popup with html content.
   * @param {string} content (text or html).
   * @param {string} title (text).
   * @param {number=} opt_width CSS width in pixel.
   * @param {number=} opt_height CSS height in pixel.
   * @param {boolean=} opt_apply If true, trigger the Angular digest loop. Default to true.
   * @export
   */
  gmfx.openTextPopup = (
    content, title, opt_width, opt_height, opt_apply
  ) => {
    this.displaywindowContent = content;
    gmfx.openPopup_(title, opt_width, opt_height, opt_apply);
  };

  /**
   * @param {string} title (text).
   * @param {number=} opt_width CSS width in pixel.
   * @param {number=} opt_height CSS height in pixel.
   * @param {boolean=} opt_apply If true, trigger the Angular digest loop. Default to true.
   */
  gmfx.openPopup_ = (title, opt_width, opt_height, opt_apply) => {

    this.displaywindowTitle = title;
    this.displaywindowOpen = true;

    if (opt_width) {
      this.displaywindowWidth = `${opt_width}px`;
    }
    if (opt_height) {
      this.displaywindowHeight = `${opt_height}px`;
    }
    if (opt_apply !== false) {
      this.$scope.$apply();
    }
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
   * @param {number=} opt_width CSS width in pixel.
   * @param {number=} opt_height CSS height in pixel.
   * @param {boolean=} opt_apply If true, trigger the Angular digest loop. Default to true.
   * @export
   */
  cgxp.tools.openInfoWindow = function(url, title, opt_width, opt_height, opt_apply) {
    gmfx.openIframePopup(url, title, opt_width, opt_height, opt_apply);
  };

  /**
   * @type {?string}
   * @export
   */
  this.displaywindowContent = null;

  /**
   * @type {string}
   * @export
   */
  this.displaywindowDraggableContainment = '.gmf-map';

  /**
   * @type {?string}
   * @export
   */
  this.displaywindowHeight = '50vh';

  /**
   * @type {boolean}
   * @export
   */
  this.displaywindowOpen = false;

  /**
   * @type {?string}
   * @export
   */
  this.displaywindowTitle = null;

  /**
   * @type {?string}
   * @export
   */
  this.displaywindowUrl = null;

  /**
   * @type {?string}
   * @export
   */
  this.displaywindowWidth = '50vw';
};


/**
 * @return {boolean} Return true if a user exists and its 'is_password_changed' value is explicitly set
 *     to false.
 * @export
 */
exports.prototype.userMustChangeItsPassword = function() {
  return this.gmfUser.is_password_changed === false;
};


/**
 * @param {Array.<ol.layer.Base>} layers Layers list.
 * @param {Array.<string>} labels default_basemap list.
 * @return {ol.layer.Base} layer or null
 */
exports.getLayerByLabels = function(layers, labels) {
  if (labels && labels.length > 0) {
    return olArray.find(layers, layer => layer.get('label') === labels[0]);
  }
  return null;
};


/**
 * @param {string} lang Language code.
 * @export
 */
exports.prototype.switchLanguage = function(lang) {
  googAsserts.assert(lang in this.langUrls);
  this.gettextCatalog.setCurrentLanguage(lang);
  this.gettextCatalog.loadRemote(this.langUrls[lang]);
  this.tmhDynamicLocale.set(lang);
  this.lang = lang;
};


/**
 */
exports.prototype.initLanguage = function() {
  this.$scope.$watch(() => this.lang, (newValue) => {
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
exports.prototype.setDefaultBackground_ = function(theme) {
  this.gmfThemes_.getBgLayers().then((layers) => {
    let layer;

    // get the background from the permalink
    layer = this.permalink_.getBackgroundLayer(layers);

    if (!layer && this.gmfUser.functionalities) {
      // get the background from the user settings
      layer = exports.getLayerByLabels(layers, this.gmfUser.functionalities.default_basemap);
    }

    if (!layer && theme) {
      // get the background from the theme
      layer = exports.getLayerByLabels(layers, theme.functionalities.default_basemap);
    }

    if (!layer) {
      // fallback to the layers list, use the second one because the first is the blank layer.
      layer = layers[layers.length > 1 ? 1 : 0];
    }

    googAsserts.assert(layer);
    this.backgroundLayerMgr_.set(this.map, layer);
  });
};

/**
 * @param {string} fallbackThemeName fallback theme name.
 * @private
 */
exports.prototype.updateCurrentTheme_ = function(fallbackThemeName) {
  this.gmfThemes_.getThemesObject().then((themes) => {
    const themeName = this.permalink_.defaultThemeNameFromFunctionalities();
    if (themeName) {
      const theme = gmfThemeThemes.findThemeByName(themes, /** @type {string} */ (themeName));
      if (theme) {
        this.gmfThemeManager.addTheme(theme, true);
      }
    } else {
      this.gmfThemeManager.setThemeName(fallbackThemeName);
    }
  });
};

/**
 * @protected
 * @return {Element} Span element with font-awesome inside of it
 */
exports.prototype.getLocationIcon = function() {
  const arrow = document.createElement('span');
  arrow.className = 'fa fa-location-arrow';
  arrow.style.transform = 'rotate(-0.82rad)';
  const arrowWrapper = document.createElement('span');
  arrowWrapper.appendChild(arrow);
  return arrowWrapper;
};


exports.module = angular.module('GmfAbstractAppControllerModule', [
  'gettext',
  'tmh.dynamicLocale',
  gmfAuthenticationModule.name,
  gmfBackgroundlayerselectorComponent.name,
  gmfDatasourceModule.name,
  gmfDisclaimerComponent.name,
  gmfFiltersModule.name,
  gmfLayertreeModule.name,
  gmfMapModule.name,
  gmfQueryExtraModule.name,
  gmfSearchModule.name,
  gmfThemeModule.name,
  ngeoMessageDisplaywindowComponent.name,
  ngeoMiscExtraModule.name,
  ngeoMiscFeatureHelper.module.name,
  ngeoQueryMapQuerent.module.name,
  ngeoQueryMapQueryComponent.name,
  ngeoStatemanagerModule.name,
  ngeoStatemanagerWfsPermalink.module.name,
]);


exports.module.controller('AbstractController', exports);


exports.module.value('ngeoExportFeatureFormats', [
  ngeoMiscFeatureHelper.FormatType.KML,
  ngeoMiscFeatureHelper.FormatType.GPX
]);

exports.module.config(['tmhDynamicLocaleProvider', 'angularLocaleScript',
  /**
   * @param {tmhDynamicLocaleProvider} tmhDynamicLocaleProvider angular-dynamic-locale provider.
   * @param {string} angularLocaleScript the script.
   */
  function(tmhDynamicLocaleProvider, angularLocaleScript) {
    // configure the script URL
    tmhDynamicLocaleProvider.localeLocationPattern(angularLocaleScript);
  }
]);


export default exports;
