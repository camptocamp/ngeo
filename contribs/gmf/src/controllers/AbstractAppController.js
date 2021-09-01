// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import 'jquery';
import angular from 'angular';
import 'angular-gettext';
import 'angular-dynamic-locale';
import bootstrap from 'gmf/controllers/bootstrap.js';
import gmfAuthenticationModule from 'gmf/authentication/module.js';
import gmfBackgroundlayerselectorComponent from 'gmf/backgroundlayerselector/component.js';
import {gmfBackgroundlayerStatus} from 'gmf/backgroundlayerselector/status.js';
import gmfDatasourceModule from 'gmf/datasource/module.js';
import gmfDisclaimerComponent from 'gmf/disclaimer/component.js';
import gmfLayertreeModule from 'gmf/layertree/module.js';
import gmfMapModule from 'gmf/map/module.js';
import gmfQueryExtraModule from 'gmf/query/extraModule.js';
import gmfSearchModule from 'gmf/search/module.js';
import gmfThemeModule from 'gmf/theme/module.js';
import calculateCssVars from 'gmf/controllers/calculateCssVars';
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
import {ThemeEventType} from 'gmf/theme/Manager.js';
import {getBrowserLanguage} from 'ngeo/utils.js';
import * as Sentry from '@sentry/browser';
import {Integrations} from '@sentry/tracing';
import {Angular as AngularIntegration} from '@sentry/integrations';
import createProjection from 'ngeo/proj/utils.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olControlScaleLine from 'ol/control/ScaleLine.js';
import olControlZoom from 'ol/control/Zoom.js';
import olControlRotate from 'ol/control/Rotate.js';
import {defaults as interactionsDefaults} from 'ol/interaction.js';
import olInteractionDragPan from 'ol/interaction/DragPan.js';
import {noModifierKeys} from 'ol/events/condition.js';
import 'regenerator-runtime/runtime';

import user, {UserState} from 'ngeo/store/user.ts';

/**
 * Application abstract controller.
 *
 * Used functionalities:
 *
 *  * `open_panel`: When set, contains the name of the panel to open upon loading an application.
 *      Note: although this is a list, only one can be defined.
 *
 *
 * @param {angular.IScope} $scope Scope.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {boolean} [mobile] Is mobile.
 * @class
 * @ngdoc controller
 * @ngInject
 */
export function AbstractAppController($scope, $injector, mobile) {
  /** @type {import('gmf/options.js').gmfProjectionsOptions} */
  const projections = $injector.get('gmfProjectionsOptions');
  for (const code in projections) {
    createProjection(code, projections[code].definition.join(' '), projections[code].extent);
  }
  /** @type {import('gmf/options.js').gmfOptions} */
  this.options = $injector.get('gmfOptions');

  if (this.options.cssVars) {
    const cssVars = calculateCssVars(this.options.cssVars);
    const style = document.documentElement.style;
    for (const cssVar in cssVars) {
      style.setProperty(`--${cssVar}`, cssVars[cssVar]);
    }
  }

  const scaleline = document.getElementById('scaleline');
  const map = new olMap(
    Object.assign(
      {
        layers: [],
        view: new olView(this.options.view),
        controls: this.options.mapControls || [
          new olControlScaleLine({
            target: scaleline,
            // See: https://www.w3.org/TR/CSS21/syndata.html#length-units
            dpi: 96,
          }),
          new olControlZoom(
            this.options.controlZoom || {
              target: mobile ? undefined : 'ol-zoom-control',
              zoomInTipLabel: '',
              zoomOutTipLabel: '',
            }
          ),
          new olControlRotate({
            label: getLocationIcon(),
            tipLabel: '',
          }),
        ],
        interactions:
          this.options.mapInteractions ||
          interactionsDefaults(
            this.options.interationDefaults ||
              (mobile
                ? {}
                : {
                    dragPan: false,
                  })
          ),
      },
      this.options.map
    )
  );

  if (!mobile) {
    map.addInteraction(
      new olInteractionDragPan({
        condition: dragPanCondition,
      })
    );
  }

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
   */
  this.gmfTreeManager_ = $injector.get('gmfTreeManager');

  /**
   * Themes service
   * @type {import("gmf/theme/Themes.js").ThemesService}
   */
  this.gmfThemes = $injector.get('gmfThemes');

  /**
   * Checks if the themes are loaded
   * @type {boolean}
   */
  this.loading = true;
  this.gmfThemes.getThemesObject().finally(() => {
    this.loading = false;
  });

  /**
   * This property is set to `true` when the themes change after a
   * successful login
   * @type {boolean}
   */
  this.postLoading = false;

  /**
   * Permalink service
   * @type {import("gmf/permalink/Permalink.js").PermalinkService}
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
   * @this {AbstractAppController}
   */
  this.updateHasEditableLayers_ = function () {
    this.gmfThemes.hasEditableLayers().then((hasEditableLayers) => {
      this.hasEditableLayers = hasEditableLayers;
    });
  };

  /**
   * URL to redirect to after login success.
   * @type {?string}
   */
  this.loginRedirectUrl = null;

  /**
   * Information message for the login form.
   * @type {?string}
   */
  this.loginInfoMessage = null;

  $scope.$on('authenticationrequired', (event, args) => {
    /** @type {angular.gettext.gettextCatalog} */
    const gettextCatalog = $injector.get('gettextCatalog');
    this.loginInfoMessage = gettextCatalog.getString(
      'Some layers in this link are not accessible to unauthenticated users. ' +
        'Please log in to see whole data.'
    );
    this.loginRedirectUrl = args.url;
    this.loginActive = true;

    const unbind = $scope.$watch(
      () => this.loginActive,
      () => {
        if (!this.loginActive) {
          this.loginInfoMessage = null;
          this.loginRedirectUrl = null;
          unbind();
        }
      }
    );
  });

  /**
   * Update the page with the user settings.
   */
  const userChange = () => {
    if (this.loginRedirectUrl) {
      window.location.href = this.loginRedirectUrl;
      return;
    }
    const roleId = gmfAuthentication.getRolesIds().join(',');

    const functionalities = this.gmfUser.functionalities;

    // Enable filter tool in toolbar
    if (
      functionalities &&
      functionalities.filterable_layers &&
      functionalities.filterable_layers.length > 0
    ) {
      this.filterSelectorEnabled = true;
    }

    // Open filter panel if 'open_panel' is set in functionalities and
    // has 'layer_filter' as first value
    this.gmfThemes.getThemesObject().then((themes) => {
      if (functionalities && functionalities.open_panel && functionalities.open_panel[0] === 'layer_filter') {
        this.filterSelectorActive = true;
      }
    });

    // Reload theme when login status changes.
    const previousThemeName = this.gmfThemeManager.getThemeName();

    // Reload themes and background layer when login status changes.
    this.gmfThemes.loadThemes(roleId);

    if (user.getState().value !== UserState.READY) {
      const themeName = this.permalink_.defaultThemeNameFromFunctionalities();
      this.gmfThemeManager.updateCurrentTheme(themeName, previousThemeName, true);
    }
    this.setDefaultBackground_(null);
    this.updateHasEditableLayers_();
  };

  /**
   * @type {import('gmf/authentication/Service.js').User}
   */
  this.gmfUser = null;

  // On user state update, set features user based.
  user.getState().subscribe({
    next: (userState) => {
      this.gmfUser = user.getProperties().value;
      if (userState === UserState.NOT_INITIALIZED) {
        return;
      }
      if (userState === UserState.DISCONNECTED) {
        this.loginActive = true;
      }
      userChange();
    },
  });

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
   */
  this.backgroundLayerMgr_ = $injector.get('ngeoBackgroundLayerMgr');

  // watch any change on dimensions object to refresh the background layer
  $scope.$watchCollection(
    () => this.dimensions,
    () => {
      this.backgroundLayerMgr_.updateDimensions(this.map, this.dimensions);
    }
  );

  this.backgroundLayerMgr_.on('change', () => {
    this.backgroundLayerMgr_.updateDimensions(this.map, this.dimensions);
  });

  /**
   * @type {boolean}
   */
  this.filterSelectorEnabled = false;

  /**
   * The active state of the ngeo query directive.
   * @type {boolean}
   */
  this.queryActive = true;

  /**
   * @type {import("ngeo/query/MapQuerent.js").MapQuerent}
   */
  this.ngeoMapQuerent_ = $injector.get('ngeoMapQuerent');

  /**
   * @type {import("ngeo/statemanager/Service.js").StatemanagerService}
   */
  this.stateManager = $injector.get('ngeoStateManager');

  /**
   * @type {tmh.tmh.IDynamicLocale}
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
   * @type {import('gmf/options.js').defaultLang}
   */
  this.defaultLang = $injector.get('defaultLang');

  /**
   * Languages URL
   * @type {import('gmf/options.js').langUrls}
   */
  this.langUrls = $injector.get('langUrls');

  /**
   * The gettext catalog
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog = $injector.get('gettextCatalog');

  this.initLanguage();

  /**
   * @type {string}
   */
  this.mapToolsGroup = 'mapTools';

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
  ngeoToolActivateMgr.registerTool(this.mapToolsGroup, queryToolActivate, true);

  $scope.$root.$on(ThemeEventType.THEME_NAME_SET, (event, name) => {
    this.gmfThemes.getThemeObject(name).then((theme) => {
      this.setDefaultBackground_(theme);
    });
  });

  /**
   * @param {string} title (text).
   * @param {number} [opt_width] CSS width in pixel.
   * @param {number} [opt_height] CSS height in pixel.
   * @param {boolean} [opt_apply] If true, trigger the Angular digest loop. Default to true.
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
  // @ts-ignore: We do want to define a new property on `window`.
  window.gmfx = gmfx;

  /**
   * Static function to create a popup with an iframe.
   * @param {string} url an url.
   * @param {string} title (text).
   * @param {number} [opt_width] CSS width.
   * @param {number} [opt_height] CSS height.
   * @param {boolean} [opt_apply] If true, trigger the Angular digest loop. Default to true.
   */
  gmfx.openIframePopup = (url, title, opt_width, opt_height, opt_apply) => {
    this.displaywindowUrl = url;
    openPopup_(title, opt_width, opt_height, opt_apply);
  };

  /**
   * Static function to create a popup with html content.
   * @param {string} content (text or html).
   * @param {string} title (text).
   * @param {number} [opt_width] CSS width in pixel.
   * @param {number} [opt_height] CSS height in pixel.
   * @param {boolean} [opt_apply] If true, trigger the Angular digest loop. Default to true.
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
  // @ts-ignore: We do want to define a new property on `window`.
  window.cgxp = cgxp;
  cgxp.tools = window.cgxp.tools || {};

  /**
   * Static function to create a popup with an iframe.
   * @param {string} url an url.
   * @param {string} title (text).
   * @param {number} [opt_width] CSS width in pixel.
   * @param {number} [opt_height] CSS height in pixel.
   * @param {boolean} [opt_apply] If true, trigger the Angular digest loop. Default to true.
   */
  cgxp.tools.openInfoWindow = function (url, title, opt_width, opt_height, opt_apply) {
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
    if (options.dsn) {
      // For Angularjs code
      options.serverName = options.environment;

      // For booth
      options.integrations = [new Integrations.BrowserTracing(), new AngularIntegration()];

      // For non Angularjs code
      const tags = options.tags || [];
      delete options.tags;
      Object.assign(options, {
        beforeBreadcrumb: augmentBreadcrumb,
      });
      Sentry.init(options);
      if ($injector.has('interface') && !tags['interface']) {
        Sentry.setTag('interface', $injector.get('interface'));
      }
      for (const tag in tags) {
        Sentry.setTag(tag, tags[tag]);
      }
    }
  }
}

/**
 * Allow map pan with all buttons except right click (context menu)
 * @param {import("ol/MapBrowserEvent.js").default<MouseEvent>} event MapBrowser event
 * @return {boolean}
 */
function dragPanCondition(event) {
  return noModifierKeys(event) && event.originalEvent.button !== 2;
}

/**
 * @param {import("ol/layer/Base.js").default[]} layers Layers list.
 * @param {string[]} labels default_basemap list.
 * @return {?import("ol/layer/Base.js").default} layer or null
 * @private
 * @hidden
 */
function getLayerByLabels(layers, labels) {
  if (labels && labels.length > 0) {
    return olArray.find(layers, (layer) => layer.get('label') === labels[0]);
  }
  return null;
}

/**
 * @param {string} lang Language code.
 */
AbstractAppController.prototype.switchLanguage = function (lang) {
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
AbstractAppController.prototype.initLanguage = function () {
  this.$scope.$watch(
    () => this.lang,
    (newValue) => {
      this.stateManager.updateState({
        'lang': newValue,
      });
    }
  );

  const browserLanguage = getBrowserLanguage(Object.keys(this.langUrls));
  const urlLanguage = /** @type {string|undefined} */ (this.stateManager.getInitialStringValue('lang'));

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
 */
AbstractAppController.prototype.setDefaultBackground_ = function (theme) {
  this.gmfThemes.getBgLayers().then((layers) => {
    let layer;

    // get the initial background from the permalink
    if (!gmfBackgroundlayerStatus.touchedByUser) {
      layer = this.permalink_.getBackgroundLayer(layers);
    }

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
const myModule = angular.module('GmfAbstractAppControllerModule', [
  'gettext',
  'tmh.dynamicLocale',
  //'ngSentry',
  gmfAuthenticationModule.name,
  gmfBackgroundlayerselectorComponent.name,
  gmfDatasourceModule.name,
  gmfDisclaimerComponent.name,
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

myModule.controller('AbstractController', AbstractAppController);

myModule.value('ngeoExportFeatureFormats', [FeatureFormatType.KML, FeatureFormatType.GPX]);

myModule.config([
  'tmhDynamicLocaleProvider',
  'angularLocaleScript',
  /**
   * @param {angular.dynamicLocale.tmhDynamicLocaleProvider} tmhDynamicLocaleProvider
   *     angular-dynamic-locale provider.
   * @param {string} angularLocaleScript the script.
   */
  function (tmhDynamicLocaleProvider, angularLocaleScript) {
    // configure the script URL
    tmhDynamicLocaleProvider.localeLocationPattern(angularLocaleScript);
  },
]);

bootstrap(myModule);

export default myModule;
