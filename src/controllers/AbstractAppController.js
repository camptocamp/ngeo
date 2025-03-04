// The MIT License (MIT)
//
// Copyright (c) 2015-2025 Camptocamp SA
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

import 'ngeo/misc/common-jquery-dependencies';
import angular from 'angular';
import 'angular-gettext';
import 'angular-dynamic-locale';
import bootstrap from 'gmf/controllers/bootstrap';
import gmfBackgroundlayerselectorComponent from 'gmf/backgroundlayerselector/component';
import {gmfBackgroundlayerStatus} from 'gmf/backgroundlayerselector/status';
import ngeoDatasourceModule from 'ngeo/datasource/module';
import gmfDisclaimerComponent from 'gmf/disclaimer/component';
import ngeoLayertreeModule from 'ngeo/layertree/module';
import ngeoMapModule from 'ngeo/map/module';
import gmfQueryExtraModule from 'gmf/query/extraModule';
import ngeoSearchModule from 'ngeo/search/module';
import gmfThemeModule from 'gmf/theme/module';
import calculateCssVars from 'gmf/controllers/calculateCssVars';
import ngeoMessageDisplaywindowComponent from 'ngeo/message/displaywindowComponent';
import ngeoMiscExtraModule from 'ngeo/misc/extraModule';
import ngeoMiscFeatureHelper, {FeatureFormatType} from 'ngeo/misc/FeatureHelper';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent';
import ngeoQueryComponent from 'ngeo/query/component';
import ngeoStatemanagerModule from 'ngeo/statemanager/module';
import ngeoStatemanagerWfsPermalink from 'ngeo/statemanager/WfsPermalink';
import ngeoGeolocation from 'ngeo/geolocation/component';
import gmfMapComponent from 'gmf/map/component';
import {ThemeEventType} from 'gmf/theme/Manager';
import {getBrowserLanguage} from 'ngeo/utils';
import * as Sentry from '@sentry/browser';
import createProjections from 'ngeo/proj/utils';
import olMap from 'ol/Map';
import olView from 'ol/View';
import ViewHint from 'ol/ViewHint.js';
import olControlScaleLine from 'ol/control/ScaleLine';
import olControlZoom from 'ol/control/Zoom';
import olControlRotate from 'ol/control/Rotate';
import {defaults as interactionsDefaults} from 'ol/interaction';
import olInteractionDragPan from 'ol/interaction/DragPan';
import {noModifierKeys} from 'ol/events/condition';
import gmfAuthenticationService from 'ngeo/auth/service';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';
import storeMap from 'gmfapi/store/map';
import user, {UserState, loginMessageRequired} from 'gmfapi/store/user';
import {debounce} from 'gmf/misc/debounce2';

AbstractAppController.$inject = ['$scope', '$injector', 'mobile'];
/**
 * Application abstract controller.
 *
 * Used functionalities:
 *
 *  - `open_panel`: When set, contains the name of the panel to open upon loading an application.
 *      Note: although this is a list, only one can be defined.
 *
 *
 * @param {angular.IScope} $scope Scope.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {boolean} [mobile] Is mobile.
 * @class
 * @ngdoc controller
 */
export function AbstractAppController($scope, $injector, mobile) {
  createProjections($injector.get('gmfProjectionsOptions'));

  /** @type {import('gmf/options').gmfOptions} */
  this.options = $injector.get('gmfOptions');
  if (this.options.cssVars) {
    const cssVars = calculateCssVars(this.options.cssVars);
    const style = document.documentElement.style;
    for (const cssVar in cssVars) {
      style.setProperty(`--${cssVar}`, cssVars[cssVar]);
    }
  }
  const scaleline = document.getElementById('scaleline');
  const view = new olView(this.options.view);
  const constraints = view.getConstraints();
  const centerConstraint = constraints.center;
  /**
   * @param {number} number The number.
   * @param {number} base The base.
   * @returns {number} The modulo.
   */
  const fixedModulo = (number, base) => {
    return number > 0 ? number % base : base + (number % base);
  };

  /**
   * @param {import("./coordinate.js").Coordinate|undefined} center Center.
   * @param {number|undefined} resolution Resolution.
   * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @param {Array<number>} [centerShift] Shift between map center and viewport center.
   * @return {import("./coordinate.js").Coordinate|undefined} Center.
   */
  constraints.center = (coord, resolution, size, isMoving, centerShift) => {
    const newCenter = centerConstraint(coord, resolution, size, isMoving, centerShift);

    // Constraint the center on the WMTS grid
    if (!isMoving) {
      const wmtsTopLeft = this.options.wmtsTopLeft || [0, 0];
      const correctionX =
        fixedModulo((newCenter[0] - wmtsTopLeft[1]) / resolution - size[0] / 2 + 0.5, 1) - 0.5;
      const correctionY =
        fixedModulo((wmtsTopLeft[0] - newCenter[1]) / resolution - size[1] / 2 + 0.5, 1) - 0.5;
      newCenter[0] -= correctionX * resolution;
      newCenter[1] += correctionY * resolution;
    }
    return newCenter;
  };

  /**
   * Base OL view.setHint function.
   * Keep it to be able to reset its normal behavior if wanted.
   * @private
   */
  this.originalViewSetHint = view.setHint;
  // Be sure the center is aligned with the grid (anti-blur effect).
  this.fixCenterOnGrid(view);

  const map = new olMap(
    Object.assign(
      {
        layers: [],
        view: view,
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
            },
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
                  }),
          ),
      },
      this.options.map,
    ),
  );

  /**
   * Use the parseFloat function as in updateSize() to allow non integer number of pixel.
   * https://github.com/openlayers/openlayers/blob/c8590eda8ec256e6055dbda6659b257e01317d6d/src/ol/Map.js#L1694-L1707
   */
  map.updateViewportSize_ = function () {
    const view = this.getView();
    if (view) {
      let size = undefined;
      const computedStyle = getComputedStyle(this.viewport_);
      if (computedStyle.width && computedStyle.height) {
        size = [Math.round(parseFloat(computedStyle.width)), Math.round(parseFloat(computedStyle.height))];
      }
      view.setViewportSize(size);
    }
  };
  if (!mobile) {
    map.addInteraction(
      new olInteractionDragPan({
        condition: dragPanCondition,
      }),
    );
  }
  storeMap.setMap(map);

  // Needed cypress e2e tests
  window['map'] = map;

  /**
   * Location service
   *
   * @type {import('ngeo/statemanager/Location').StatemanagerLocation}
   */
  this.ngeoLocation = $injector.get('ngeoLocation');
  if (this.ngeoLocation.hasParam('debug')) {
    // make the injector globally available
    // @ts-ignore: available in debug mode only
    window.injector = $injector;
  }

  /**
   * @type {import('ol/Map').default}
   */
  this.map = map;
  if (!(this.map instanceof olMap)) {
    throw new Error('Wrong map type');
  }

  /**
   * Collection of features for the draw interaction
   *
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  const ngeoFeatures = $injector.get('ngeoFeatures');

  /**
   * @type {import('ngeo/map/FeatureOverlay').FeatureOverlay}
   */
  this.drawFeatureLayer = ngeoMapFeatureOverlayMgr.getFeatureOverlay();
  this.drawFeatureLayer.setFeatures(ngeoFeatures);

  /**
   * Ngeo FeatureHelper service
   *
   * @type {import('ngeo/misc/FeatureHelper').FeatureHelper}
   */
  const ngeoFeatureHelper = $injector.get('ngeoFeatureHelper');
  ngeoFeatureHelper.setProjection(this.map.getView().getProjection());

  /**
   * @type {import('gmf/theme/Manager').ThemeManagerService}
   */
  this.gmfThemeManager = $injector.get('gmfThemeManager');

  /**
   * @type {import('gmf/layertree/TreeManager').LayertreeTreeManager}
   */
  this.gmfTreeManager_ = $injector.get('gmfTreeManager');

  /**
   * Themes service
   *
   * @type {import('gmf/theme/Themes').ThemesService}
   */
  this.gmfThemes = $injector.get('gmfThemes');

  /**
   * Checks if the themes are loaded
   *
   * @type {boolean}
   */
  this.loading = true;
  this.gmfThemes.getThemesObject().finally(() => {
    this.loading = false;
  });

  /**
   * This property is set to `true` when the themes change after a
   * successful login
   *
   * @type {boolean}
   */
  this.postLoading = false;

  /**
   * Permalink service
   *
   * @type {import('gmf/permalink/Permalink').PermalinkService}
   */
  this.permalink_ = $injector.get('gmfPermalink');

  /**
   * @type {boolean}
   */
  this.hasEditableLayers = false;

  /**
   * Check editable layers
   */
  this.updateHasEditableLayers_ = () => {
    this.gmfThemes.hasEditableLayers().then((hasEditableLayers) => {
      this.hasEditableLayers = hasEditableLayers;
    });
  };

  /**
   * URL to redirect to after login success.
   *
   * @type {?string}
   */
  this.loginRedirectUrl = null;

  /**
   * Listeners passed to searchDirective.
   *
   * @type {import('ngeo/search/searchDirective').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry').default>>}
   */
  this.searchListeners = {
    select: function (event, feature, dataset) {
      // If its coordinates, no getter is present
      if (typeof feature.get !== 'undefined') {
        const params = feature.get('params') || {};
        for (const key in params) {
          this.dimensions[key] = params[key].toString();
        }
      }
    }.bind(this),
  };
  $scope.$on('authenticationrequired', (event, args) => {
    this.loginRedirectUrl = args.url;
    this.loginActive = true;
    const unbind = $scope.$watch(
      () => this.loginActive,
      () => {
        if (!this.loginActive) {
          this.loginRedirectUrl = null;
          unbind();
        }
      },
    );
  });
  this.hasPrivateLayers = false;
  user.getLoginMessage().subscribe({
    next: (loginMessage) => {
      this.hasPrivateLayers = loginMessage == loginMessageRequired;
    },
  });

  /**
   * Update the page with the user settings.
   */
  const userChange = () => {
    if (this.loginRedirectUrl) {
      window.location.href = this.loginRedirectUrl;
      return;
    }
    const roleId = gmfAuthenticationService.getRolesIds().join(',');
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
    if (user.getState() !== UserState.READY) {
      const themeName = this.permalink_.defaultThemeNameFromFunctionalities();
      this.gmfThemeManager.updateCurrentTheme(themeName, previousThemeName, true, this.hasPrivateLayers);
    }
    this.setDefaultBackground_(null);
    this.updateHasEditableLayers_();
  };

  /**
   * @type {import('ngeo/store/user').User}
   */
  this.gmfUser = null;

  // On user update, set features user based.
  user.getProperties().subscribe({
    next: (properties) => {
      const userState = user.getState();
      if (userState === UserState.DISCONNECTED && this.gmfUser.is_password_changed === false) {
        this.gmfUser = properties;
        return;
      }
      this.gmfUser = properties;
      if (userState === UserState.NOT_INITIALIZED) {
        return;
      }
      if (userState === UserState.DISCONNECTED) {
        this.loginActive = true;
      }
      if (this.gmfUser.is_password_changed === false) {
        return;
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
   * @type {import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager}
   */
  this.backgroundLayerMgr_ = $injector.get('ngeoBackgroundLayerMgr');

  // watch any change on dimensions object to refresh the background layer
  $scope.$watchCollection(
    () => this.dimensions,
    () => {
      this.backgroundLayerMgr_.updateDimensions(this.map, this.dimensions);
    },
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
   *
   * @type {boolean}
   */
  this.queryActive = true;

  /**
   * @type {import('ngeo/query/MapQuerent').MapQuerent}
   */
  this.ngeoMapQuerent_ = $injector.get('ngeoMapQuerent');

  /**
   * @type {import('ngeo/statemanager/Service').StatemanagerService}
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
   *
   * @type {import('gmf/options').defaultLang}
   */
  this.defaultLang = $injector.get('defaultLang');

  /**
   * Languages URL
   *
   * @type {import('gmf/options').langUrls}
   */
  this.langUrls = $injector.get('langUrls');

  /**
   * The gettext catalog
   *
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
   *
   * @type {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr}
   */
  const ngeoFeatureOverlayMgr = ngeoMapFeatureOverlayMgr;
  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * The ngeo ToolActivate manager service.
   *
   * @type {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr}
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
   *
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
   *
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
   *
   * @type {boolean}
   */
  this.manageResize = false;

  /**
   * The duration (milliseconds) of the animation that may occur on the div
   * containing the map. Used to smoothly resize the map while the animation
   * is in progress.
   *
   * @type {number|undefined}
   */
  this.resizeTransition;
  const cgxp = window.cgxp || {};
  // @ts-ignore: We do want to define a new property on `window`.
  window.cgxp = cgxp;
  cgxp.tools = window.cgxp.tools || {};

  /**
   * Static function to create a popup with an iframe.
   *
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
      options.integrations = [Sentry.browserTracingIntegration()];
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
 *
 * @param {import('ol/MapBrowserEvent').default<MouseEvent>} event MapBrowser event
 * @returns {boolean}
 */
function dragPanCondition(event) {
  return noModifierKeys(event) && event.originalEvent.button !== 2;
}

/**
 * @param {import('ol/layer/Base').default[]} layers Layers list.
 * @param {string[]} labels default_basemap list.
 * @returns {?import('ol/layer/Base').default} layer or null
 * @private
 * @hidden
 */
function getLayerByLabels(layers, labels) {
  if (labels && labels.length > 0) {
    return layers.find((layer) => layer.get('label') === labels[0]);
  }
  return null;
}

/**
 * Fix the center on the WMTS grid on animation end.
 * This could help to have a not blurred map, but without
 * timeout (and with map.view.constrainResolution to true), the map
 * could "jump around" slightly on zooming in/out quickly.
 * @param {import ('ol/View').View} view an ol view.
 * @private
 */
AbstractAppController.prototype.fixCenterOnGrid = function (view) {
  const debounceSetCenter = debounce((view, hint, value) => {
    if (hint === ViewHint.ANIMATING && value === -1) {
      view.setCenter(view.getCenter());
    }
  }, 50);
  view.setHint = (hint, value) => {
    this.originalViewSetHint.call(view, hint, value);
    debounceSetCenter(view, hint, value);
  };
};

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
    },
  );
  const browserLanguage = getBrowserLanguage(Object.keys(this.langUrls));
  const urlLanguage = /** @type {string|undefined} */ this.stateManager.getInitialStringValue('lang');
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
 * @param {?import('gmf/themes').GmfTheme} theme Theme.
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
 * @returns {HTMLSpanElement} Span element with font-awesome inside of it
 */
export function getLocationIcon() {
  const arrow = document.createElement('span');
  arrow.className = 'fa-solid fa-location-arrow';
  arrow.style.transform = 'rotate(-0.82rad)';
  arrow.style.fontSize = '1.3em';
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
  gmfBackgroundlayerselectorComponent.name,
  ngeoDatasourceModule.name,
  gmfDisclaimerComponent.name,
  ngeoLayertreeModule.name,
  ngeoMapModule.name,
  gmfQueryExtraModule.name,
  ngeoSearchModule.name,
  gmfThemeModule.name,
  ngeoMessageDisplaywindowComponent.name,
  ngeoMiscExtraModule.name,
  ngeoMiscFeatureHelper.name,
  ngeoQueryMapQuerent.name,
  ngeoQueryComponent.name,
  ngeoStatemanagerModule.name,
  ngeoStatemanagerWfsPermalink.name,
  ngeoGeolocation.name,
  gmfMapComponent.name,
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
