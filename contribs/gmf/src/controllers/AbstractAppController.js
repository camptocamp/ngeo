import 'jquery';
import angular from 'angular';
import 'angular-gettext';
import 'angular-dynamic-locale';
import bootstrap from 'gmf/controllers/bootstrap.js';
import gmfAuthenticationModule from 'gmf/authentication/module.js';
import gmfBackgroundlayerselectorComponent from 'gmf/backgroundlayerselector/component.js';
import gmfDatasourceModule from 'gmf/datasource/module.js';
import gmfDisclaimerComponent from 'gmf/disclaimer/component.js';
import gmfDrawingModule from 'gmf/drawing/module.js';
import gmfFiltersModule from 'gmf/filters/module.js';
import gmfLayertreeModule from 'gmf/layertree/module.js';
import gmfMapModule from 'gmf/map/module.js';
import gmfQueryExtraModule from 'gmf/query/extraModule.js';
import gmfSearchModule from 'gmf/search/module.js';
import gmfThemeModule from 'gmf/theme/module.js';
import ngeoMessageDisplaywindowComponent from 'ngeo/message/displaywindowComponent.js';
import ngeoMiscExtraModule from 'ngeo/misc/extraModule.js';
import ngeoMiscFeatureHelper, {FeatureFormatType} from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import ngeoQueryComponent from 'ngeo/query/component.js';
import ngeoStatemanagerModule from 'ngeo/statemanager/module.js';
import ngeoStatemanagerWfsPermalink from 'ngeo/statemanager/WfsPermalink.js';
import ngeoGeolocation from 'ngeo/geolocation/component.js';
import * as olArray from 'ol/array.js';
import {listen} from 'ol/events.js';
import olMap from 'ol/Map.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import {ThemeEventType} from 'gmf/theme/Manager.js';
import {getBrowserLanguage} from 'ngeo/utils.js';
// @ts-ignore
import * as Sentry from '@sentry/browser';


/**
 * A part of the application config.
 *
 * @typedef {Object} Config
 * @property {number} srid
 * @property {import("ol/style/Style.js").default} [positionFeatureStyle]
 * @property {import("ol/style/Style.js").default} [accuracyFeatureStyle]
 * @property {number} [geolocationZoom]
 * @property {boolean} [autorotate]
 * @property {olx.ViewOptions} [mapViewConfig]
 * @property {import("ol/Collection.js").default<import('ol/control/Control.js').default>|Array<import('ol/control/Control.js').default>} [mapControls]
 * @property {import("ol/Collection.js").default<import('"ol/interaction/Interaction.js').default>|Array<import('ol/interaction/Interaction.js').default>} [mapInteractions]
 * @property {number} [mapPixelRatio]
 */


/**
 * Application abstract controller.
 *
 * Used functionalities:
 *
 *  * `open_panel`: When set, contains the name of the panel to open upon loading an application.
 *      Note: although this is a list, only one can be defined.
 *
 *
 * @param {Config} config A part of the application config.
 * @param {import('ol/Map.js').default} map The map.
 * @param {angular.IScope} $scope Scope.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @constructor
 * @ngdoc controller
 * @ngInject
 */
export function AbstractAppController(config, map, $scope, $injector) {

  /**
   * Location service
   * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
   */
  this.ngeoLocation = $injector.get('ngeoLocation');
  if (this.ngeoLocation.hasParam('debug')) {
    // make the injector globally available
    // @ts-ignore: available in debug mode only
    window.injector = $injector;
  }

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = map;
  if (!(this.map instanceof olMap)) {
    throw new Error('Wrong map type');
  }

  /**
   * Collection of features for the draw interaction
   * @type {import("ol/Collection.js").default<import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>>}
   */
  const ngeoFeatures = $injector.get('ngeoFeatures');

  /**
   * @type {import("ngeo/map/FeatureOverlay.js").FeatureOverlay}
   */
  this.drawFeatureLayer = $injector.get('ngeoFeatureOverlayMgr').getFeatureOverlay();
  this.drawFeatureLayer.setFeatures(ngeoFeatures);

  /**
   * Ngeo FeatureHelper service
   * @type {import("ngeo/misc/FeatureHelper.js").FeatureHelper}
   */
  const ngeoFeatureHelper = $injector.get('ngeoFeatureHelper');
  ngeoFeatureHelper.setProjection(this.map.getView().getProjection());

  /**
   * @type {import("gmf/theme/Manager.js").ThemeManagerService}
   */
  this.gmfThemeManager = $injector.get('gmfThemeManager');

  /**
   * @type {import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
   * @private
   */
  this.gmfTreeManager_ = $injector.get('gmfTreeManager');

  /**
   * Themes service
   * @type {import("gmf/theme/Themes.js").ThemesService}
   * @private
   */
  this.gmfThemes_ = $injector.get('gmfThemes');

  /**
   * Checks if the themes are loaded
   * @type {boolean}
   */
  this.loading = true;
  this.gmfThemes_.getThemesObject().finally(() => {
    this.loading = false;
  });

  /**
   * Permalink service
   * @type {import("gmf/permalink/Permalink.js").PermalinkService}
   * @private
   */
  this.permalink_ = $injector.get('gmfPermalink');

  /**
   * Authentication service
   * @type {import("gmf/authentication/Service.js").AuthenticationService}
   */
  const gmfAuthentication = $injector.get('gmfAuthenticationService');

  /**
   * @type {boolean}
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
   * Url to redirect to after login success.
   * @type {?string}
   */
  this.loginRedirectUrl = null;

  /**
   * Information message for the login form.
   * @type {?string}
   */
  this.loginInfoMessage = null;

  /**
   * @type {boolean}
   * @export
   */
  this.userMustChangeItsPassword = false;

  $scope.$on('authenticationrequired', (event, args) => {
    /** @type {angular.gettext.gettextCatalog} */
    const gettextCatalog = $injector.get('gettextCatalog');
    this.loginInfoMessage = gettextCatalog.getString(
      'Some layers in this link are not accessible to unauthenticated users. ' +
      'Please log in to see whole data.');
    this.loginRedirectUrl = args.url;
    this.loginActive = true;

    const unbind = $scope.$watch(() => this.loginActive, () => {
      if (!this.loginActive) {
        this.loginInfoMessage = null;
        this.loginRedirectUrl = null;
        unbind();
      }
    });
  });

  /**
   * @param {Event|import('ol/events/Event.js').default} evt Event.
   */
  const userChange = (evt) => {
    if (this.loginRedirectUrl) {
      window.location.href = this.loginRedirectUrl;
      return;
    }
    const roleId = gmfAuthentication.getRolesIds().join(',');

    const functionalities = this.gmfUser.functionalities;

    // Enable filter tool in toolbar
    if (functionalities &&
      functionalities.filterable_layers &&
      functionalities.filterable_layers.length > 0) {
      this.filterSelectorEnabled = true;
    }

    // Open filter panel if 'open_panel' is set in functionalities and
    // has 'layer_filter' as first value
    this.gmfThemes_.getThemesObject().then((themes) => {
      if (functionalities &&
          functionalities.open_panel &&
          functionalities.open_panel[0] === 'layer_filter') {
        this.filterSelectorActive = true;
      }
    });

    // Reload theme when login status changes.
    const previousThemeName = this.gmfThemeManager.getThemeName();
    this.gmfThemeManager.setThemeName('', true);

    // Reload themes and background layer when login status changes.
    this.gmfThemes_.loadThemes(roleId);

    if (evt.type !== 'ready') {
      const themeName = this.permalink_.defaultThemeNameFromFunctionalities();
      this.gmfThemeManager.updateCurrentTheme(themeName, previousThemeName, true);
    }
    this.setDefaultBackground_(null);
    this.updateHasEditableLayers_();
  };

  listen(gmfAuthentication, 'ready', userChange);
  listen(gmfAuthentication, 'login', userChange);
  listen(gmfAuthentication, 'logout', userChange);

  /**
   * @type {Array<import('gmf/search/component.js').SearchComponentDatasource>}
   */
  this.searchDatasources = [{
    labelKey: 'label',
    groupValues: /** @type {string[]} **/ ($injector.get('gmfSearchGroups')),
    groupActions: /** @type {Array<import('gmf/search/component.js').gmfSearchAction>} **/(
      $injector.get('gmfSearchActions')),
    projection: `EPSG:${config.srid || 2056}`,
    url: /** @type {string} **/ ($injector.get('fulltextsearchUrl'))
  }];

  /**
   * @type {Object<string, string>}
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
   * @type {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager}
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
   */
  this.leftNavVisible = false;

  /**
   * @type {boolean}
   */
  this.rightNavVisible = false;

  const queryFill = new olStyleFill({color: [255, 170, 0, 0.6]});
  const queryStroke = new olStyleStroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the gmf.query.windowComponent
   * @type {import("ol/style/Style.js").default}
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
   */
  this.filterSelectorEnabled = false;

  /**
   * @type {boolean}
   * @export
   */
  this.filterSelectorActive = false;

  /**
   * The active state of the ngeo query directive.
   * @type {boolean}
   */
  this.queryActive = true;

  /**
   * Set the clearing of the ngeoQuery after the deactivation of the query
   * @type {boolean}
   */
  this.queryAutoClear = true;

  /**
   * @type {boolean}
   */
  this.printPanelActive = false;

  /**
   * @type {boolean}
   */
  this.contextdataActive;

  /**
   * @type {boolean}
   */
  this.printActive = false;

  /**
   * @type {import("ngeo/query/MapQuerent.js").MapQuerent}
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
   * The active state of the directive responsible of area measurements.
   * @type {boolean}
   */
  this.measureAreaActive = false;

  /**
   * The active state of the directive responsible of point measurements.
   * @type {boolean}
   */
  this.measurePointActive = false;

  /**
   * The active state of the directive responsible of length measurements.
   * @type {boolean}
   */
  this.measureLengthActive = false;

  /**
   * @type {boolean}
   */
  this.drawFeatureActive = false;

  /**
   * @type {boolean}
   */
  this.drawProfilePanelActive = false;

  /**
   * @type {import('gmf/authentication/Service.js').User}
   */
  this.gmfUser = $injector.get('gmfUser');
  $scope.$watch(
    () => this.gmfUser.is_password_changed,
    (value) => {
      this.userMustChangeItsPassword = value === false;
    }
  );

  /**
   * @type {import("ngeo/statemanager/Service.js").StatemanagerService}
   */
  this.stateManager = $injector.get('ngeoStateManager');

  /**
   * @type {angular.dynamicLocale.tmhDynamicLocaleService}
   */
  this.tmhDynamicLocale = $injector.get('tmhDynamicLocale');

  /**
   * @type {angular.IScope}
   */
  this.$scope = $scope;

  /**
   * @type {string}
   */
  this.lang = '';

  /**
   * Default language
   * @type {string}
   */
  this.defaultLang = $injector.get('defaultLang');

  /**
   * Languages URL
   * @type {Object<string, string>}
   */
  this.langUrls = $injector.get('langUrls');

  /**
   * The gettext catalog
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog = $injector.get('gettextCatalog');

  this.initLanguage();

  const mapTools = 'mapTools';

  /**
   * @type {string}
   */
  this.mapToolsGroup = mapTools;

  /**
   * The ngeo feature overlay manager service
   * @type {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr}
   */
  const ngeoFeatureOverlayMgr = $injector.get('ngeoFeatureOverlayMgr');
  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * The ngeo ToolActivate manager service.
   * @type {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr}
   */
  const ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

  const queryToolActivate = new ngeoMiscToolActivate(this, 'queryActive');
  ngeoToolActivateMgr.registerTool(mapTools, queryToolActivate, true);

  const measureAreaActivate = new ngeoMiscToolActivate(this, 'measureAreaActive');
  ngeoToolActivateMgr.registerTool(mapTools, measureAreaActivate, false);

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

  const contextdataActivate = new ngeoMiscToolActivate(this, 'contextdataActive');
  ngeoToolActivateMgr.registerTool(mapTools, contextdataActivate, false);

  $scope.$root.$on(ThemeEventType.THEME_NAME_SET, (event, name) => {
    this.gmfThemes_.getThemeObject(name).then((theme) => {
      this.setDefaultBackground_(theme);
    });
  });

  /**
   * @param {boolean} skipPermalink If True, don't use permalink
   * background layer.
   * @private
   */
  this.updateCurrentBackgroundLayer_ = (skipPermalink) => {
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
  };

  this.updateCurrentBackgroundLayer_(false);

  /**
   * @param {string} title (text).
   * @param {number=} opt_width CSS width in pixel.
   * @param {number=} opt_height CSS height in pixel.
   * @param {boolean=} opt_apply If true, trigger the Angular digest loop. Default to true.
   */
  const openPopup_ = (title, opt_width, opt_height, opt_apply) => {

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

  // Static "not used" functions should be in the window because otherwise
  // closure remove them. "export" tag doesn't work on static function below,
  // we "export" them as externs in the gmfx options file.
  const gmfx = window.gmfx || {};
  /**
   */
  // @ts-ignore: We do want to define a new property on `window`.
  window.gmfx = gmfx;

  /**
   * Static function to create a popup with an iframe.
   * @param {string} url an url.
   * @param {string} title (text).
   * @param {number=} opt_width CSS width.
   * @param {number=} opt_height CSS height.
   * @param {boolean=} opt_apply If true, trigger the Angular digest loop. Default to true.
   */
  gmfx.openIframePopup = (
    url, title, opt_width, opt_height, opt_apply
  ) => {
    this.displaywindowUrl = url;
    openPopup_(title, opt_width, opt_height, opt_apply);
  };

  /**
   * Static function to create a popup with html content.
   * @param {string} content (text or html).
   * @param {string} title (text).
   * @param {number=} opt_width CSS width in pixel.
   * @param {number=} opt_height CSS height in pixel.
   * @param {boolean=} opt_apply If true, trigger the Angular digest loop. Default to true.
   */
  gmfx.openTextPopup = (content, title, opt_width, opt_height, opt_apply) => {
    this.displaywindowContent = content;
    openPopup_(title, opt_width, opt_height, opt_apply);
  };

  /**
   * Whether to update the size of the map on browser window resize.
   * @type {boolean}
   */
  this.manageResize = false;

  /**
   * The duration (milliseconds) of the animation that may occur on the div
   * containing the map. Used to smoothly resize the map while the animation
   * is in progress.
   * @type {number|undefined}
   */
  this.resizeTransition;

  const cgxp = window.cgxp || {};
  /**
   */
  // @ts-ignore: We do want to define a new property on `window`.
  window.cgxp = cgxp;
  /**
   */
  cgxp.tools = window.cgxp.tools || {};
  /**
   * Static function to create a popup with an iframe.
   * @param {string} url an url.
   * @param {string} title (text).
   * @param {number=} opt_width CSS width in pixel.
   * @param {number=} opt_height CSS height in pixel.
   * @param {boolean=} opt_apply If true, trigger the Angular digest loop. Default to true.
   */
  cgxp.tools.openInfoWindow = function(url, title, opt_width, opt_height, opt_apply) {
    gmfx.openIframePopup(url, title, opt_width, opt_height, opt_apply);
  };

  /**
   * @type {?string}
   */
  this.displaywindowContent = null;

  /**
   * @type {string}
   */
  this.displaywindowDraggableContainment = '.gmf-map';

  /**
   * @type {?string}
   */
  this.displaywindowHeight = '50vh';

  /**
   * @type {boolean}
   */
  this.displaywindowOpen = false;

  /**
   * @type {?string}
   */
  this.displaywindowTitle = null;

  /**
   * @type {?string}
   */
  this.displaywindowUrl = null;

  /**
   * @type {?string}
   */
  this.displaywindowWidth = '50vw';

  if ($injector.has('sentryOptions')) {
    const options = $injector.get('sentryOptions');
    const tags = options.tags || [];
    delete options.tags;
    Object.assign(options, {
      beforeBreadcrumb: augmentBreadcrumb
    });
    Sentry.init(options);
    for (const tag in tags) {
      Sentry.setTag(tag, tags[tag]);
    }
  }

  const positionFeatureStyle = config.positionFeatureStyle || new olStyleStyle({
    image: new olStyleCircle({
      radius: 6,
      fill: new olStyleFill({color: 'rgba(230, 100, 100, 1)'}),
      stroke: new olStyleStroke({color: 'rgba(230, 40, 40, 1)', width: 2})
    })
  });

  const accuracyFeatureStyle = config.accuracyFeatureStyle || new olStyleStyle({
    fill: new olStyleFill({color: 'rgba(100, 100, 230, 0.3)'}),
    stroke: new olStyleStroke({color: 'rgba(40, 40, 230, 1)', width: 2})
  });

  /**
   * @type {import('ngeo/geolocation/component.js').GeolocationDirectiveOptions}
   */
  this.geolocationOptions = {
    positionFeatureStyle: positionFeatureStyle,
    accuracyFeatureStyle: accuracyFeatureStyle,
    zoom: config.geolocationZoom,
    autorotate: config.autorotate
  };

}


/**
 * @param {Array<import("ol/layer/Base.js").default>} layers Layers list.
 * @param {string[]} labels default_basemap list.
 * @return {?import("ol/layer/Base.js").default} layer or null
 * @private
 * @hidden
 */
function getLayerByLabels(layers, labels) {
  if (labels && labels.length > 0) {
    return olArray.find(layers, layer => layer.get('label') === labels[0]);
  }
  return null;
}


/**
 * @param {string} lang Language code.
 */
AbstractAppController.prototype.switchLanguage = function(lang) {
  if (!(lang in this.langUrls)) {
    throw new Error('Missing lang URL');
  }
  this.gettextCatalog.setCurrentLanguage(lang);
  this.gettextCatalog.loadRemote(this.langUrls[lang]);
  this.tmhDynamicLocale.set(lang);
  this.lang = lang;
};


/**
 */
AbstractAppController.prototype.initLanguage = function() {
  this.$scope.$watch(() => this.lang, (newValue) => {
    this.stateManager.updateState({
      'lang': newValue
    });
  });

  const browserLanguage = getBrowserLanguage(Object.keys(this.langUrls));
  const urlLanguage = /** @type {string|undefined} */
      (this.stateManager.getInitialStringValue('lang'));

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
 * @param {?import('gmf/themes.js').GmfTheme} theme Theme.
 * @private
 */
AbstractAppController.prototype.setDefaultBackground_ = function(theme) {
  this.gmfThemes_.getBgLayers().then((layers) => {
    let layer;

    // get the background from the permalink
    layer = this.permalink_.getBackgroundLayer(layers);

    if (!layer && this.gmfUser.functionalities) {
      // get the background from the user settings
      layer = getLayerByLabels(layers, this.gmfUser.functionalities.default_basemap);
    }

    if (!layer && theme) {
      // get the background from the theme
      layer = getLayerByLabels(layers, theme.functionalities.default_basemap);
    }

    if (!layer) {
      // fallback to the layers list, use the second one because the first is the blank layer.
      layer = layers[layers.length > 1 ? 1 : 0];
    }

    if (!layer) {
      throw new Error('Missing layer');
    }
    this.backgroundLayerMgr_.set(this.map, layer);
  });
};


/**
 * @protected
 * @return {HTMLSpanElement} Span element with font-awesome inside of it
 */
export function getLocationIcon() {
  const arrow = document.createElement('span');
  arrow.className = 'fa fa-location-arrow';
  arrow.style.transform = 'rotate(-0.82rad)';
  const arrowWrapper = document.createElement('span');
  arrowWrapper.appendChild(arrow);
  return arrowWrapper;
}


/**
 * @param {Sentry.Breadcrumb} breadcrumb
 * @param {Sentry.BreadcrumbHint} hint
 */
function augmentBreadcrumb(breadcrumb, hint) {
  if (breadcrumb.category === 'ui.click') {
    const target = hint.event.target;
    if (target) {
      const message = target.dataset.sentry;
      if (message) {
        breadcrumb.message = `${breadcrumb.message} | ${message}`;
      }
    }
  }
}


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('GmfAbstractAppControllerModule', [
  'gettext',
  'tmh.dynamicLocale',
  gmfAuthenticationModule.name,
  gmfBackgroundlayerselectorComponent.name,
  gmfDatasourceModule.name,
  gmfDisclaimerComponent.name,
  gmfDrawingModule.name,
  gmfFiltersModule.name,
  gmfLayertreeModule.name,
  gmfMapModule.name,
  gmfQueryExtraModule.name,
  gmfSearchModule.name,
  gmfThemeModule.name,
  ngeoMessageDisplaywindowComponent.name,
  ngeoMiscExtraModule.name,
  ngeoMiscFeatureHelper.name,
  ngeoQueryMapQuerent.name,
  ngeoQueryComponent.name,
  ngeoStatemanagerModule.name,
  ngeoStatemanagerWfsPermalink.name,
  ngeoGeolocation.name,
]);


module.controller('AbstractController', AbstractAppController);


module.value('ngeoExportFeatureFormats', [
  FeatureFormatType.KML,
  FeatureFormatType.GPX
]);

module.config(['tmhDynamicLocaleProvider', 'angularLocaleScript',
  /**
   * @param {angular.dynamicLocale.tmhDynamicLocaleProvider} tmhDynamicLocaleProvider
   *     angular-dynamic-locale provider.
   * @param {string} angularLocaleScript the script.
   */
  function(tmhDynamicLocaleProvider, angularLocaleScript) {
    // configure the script URL
    tmhDynamicLocaleProvider.localeLocationPattern(angularLocaleScript);
  }
]);

bootstrap(module);

export default module;
