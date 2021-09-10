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

import angular from 'angular';
import {COORDINATES_LAYER_NAME} from 'gmf/index';
import {gmfBackgroundlayerStatus} from 'gmf/backgroundlayerselector/status';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager';
import gmfSearchFulltextSearch from 'gmf/search/FulltextSearch';
import gmfThemeThemes, {findThemeByName} from 'gmf/theme/Themes';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';
import ngeoMiscAutoProjection from 'ngeo/misc/AutoProjection';

import ngeoMiscColorpickerComponent from 'ngeo/misc/colorpickerComponent';

import ngeoMessagePopoverComponent from 'ngeo/message/popoverComponent';

import ngeoSearchModule from 'ngeo/search/module';
import olFeature from 'ol/Feature';
import {asArray as asColorArray} from 'ol/color';
import olGeomPoint from 'ol/geom/Point';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import * as olProj from 'ol/proj';
import {appendParams as olUriAppendParams} from 'ol/uri';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import {buildStyle} from 'ngeo/options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfSearch', [
  gmfLayertreeTreeManager.name,
  gmfSearchFulltextSearch.name,
  gmfThemeThemes.name,
  ngeoMiscAutoProjection.name,
  ngeoMiscColorpickerComponent.name,
  ngeoSearchModule.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoMessagePopoverComponent.name,
]);

/**
 * @param {JQuery} element Element.
 * @param {angular.IAttributes} attrs Attributes.
 * @return {string} Template URL.
 * @private
 * @hidden
 */
function gmfSearchTemplateUrl_(element, attrs) {
  const templateUrl = attrs.gmfSearchTemplateurl;
  return templateUrl !== undefined ? templateUrl : 'gmf/search';
}

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/search', require('./component.html'));
  }
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfSearchTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfSearchTemplateUrl($element, $attrs, gmfSearchTemplateUrl) {
  return gmfSearchTemplateUrl($element, $attrs);
}

/**
 * A component that allows to search and recenter on a selected
 * result's feature.
 * It can search in multiple GeoJSON datasources.
 * It can filter and group results by a feature's property.
 *
 * This component uses the {@link import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} to create a
 * feature overlay for drawing features on the map. The application
 * is responsible to initialize the {@link import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr}
 * with the map.
 *
 * Example:
 *
 *      <gmf-search gmf-search-map="::ctrl.map"
 *        gmf-search-options="::ctrl.searchOptions">
 *      </gmf-search>
 *
 * The 'fulltextsearchUrl' value in the examples above set three "_query" parameters: "limit",
 * "partitionlimit" and "ranksystem". For this last one "ts_rank_cd" is the only effective value. It's used to
 * order your search results with the "ts_rank_cd" ranking system from PostgreSQL module pg_trgm. Without
 * this value, the PostgreSQL function "similarity" (module pg_trgm) is used for the ranking. Read the
 * full-text search c2cgeoportal documentation to know more.
 * You can also add these parameters to the "url" variable of one (or more) of the
 * SearchDirectiveDatasource given to this component. That
 * allows you to have multiples configurations on one search component.
 *
 * @htmlAttribute {string} gmf-search-input-value The input value (read only).
 * @htmlAttribute {import('ol/Map').default} gmf-search-map The map.
 * @htmlAttribute {Twitter.Typeahead.Options|undefined} gmf-search-options Addition Twitter.Typeahead.
 *    options.
 * @htmlAttribute {SearchComponentListeners} gmf-search-listeners The listeners.
 * @htmlAttribute {Function} [gmf]-search-on-init Optional function called when the component is initialized.
 * @htmlAttribute {Function} [gmf]-search-action Optional function called when no default action is defined.
 * @ngdoc component
 * @ngname gmfSearch
 */
const searchComponent = {
  bindings: {
    'inputValue': '=?gmfSearchInputValue',
    'map': '<gmfSearchMap',
    'typeaheadOptions': '<?gmfSearchOptions',
    'additionalListeners': '<gmfSearchListeners',
    'onInitCallback': '<?gmfSearchOnInit',
    'searchActionCallback': '&?gmfSearchAction',
  },
  controller: 'gmfSearchController',
  templateUrl: gmfSearchTemplateUrl,
};

myModule.value('gmfSearchTemplateUrl', gmfSearchTemplateUrl_);

// Register the controller in the module
myModule.component('gmfSearch', searchComponent);

/**
 * @hidden
 */
export class SearchController {
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IScope} $scope The component's scope.
   * @param {angular.ICompileService} $compile Angular compile service.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/misc/AutoProjection').AutoProjectionService} ngeoAutoProjection The ngeo
   *    coordinates service.
   * @param {Function} ngeoSearchCreateGeoJSONBloodhound
   *    The ngeo create GeoJSON Bloodhound service.
   * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
   *     overlay manager service.
   * @param {import('gmf/theme/Themes').ThemesService} gmfThemes gmf Themes service.
   * @param {import('gmf/layertree/TreeManager').LayertreeTreeManager} gmfTreeManager gmf Tree Manager
   *    service.
   * @param {import('gmf/search/FulltextSearch').FulltextSearchService} gmfSearchFulltextSearch
   *    gmf Full text search service.
   * @param {import('ngeo/statemanager/Location').StatemanagerLocation} ngeoLocation The location service.
   * @param {import('gmf/options').gmfSearchOptions} gmfSearchOptions The options.
   * @param {import('gmf/options').gmfSearchGroups} gmfSearchGroups The groups.
   * @param {string} fulltextsearchUrl The service URL.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfSearchController
   */
  constructor(
    $element,
    $scope,
    $compile,
    $timeout,
    gettextCatalog,
    ngeoAutoProjection,
    ngeoSearchCreateGeoJSONBloodhound,
    ngeoFeatureOverlayMgr,
    gmfThemes,
    gmfTreeManager,
    gmfSearchFulltextSearch,
    ngeoLocation,
    gmfSearchOptions,
    gmfSearchGroups,
    fulltextsearchUrl
  ) {
    this.options = gmfSearchOptions;
    this.groups = gmfSearchGroups;
    this.fulltextsearchUrl = fulltextsearchUrl;

    /**
     * @type {JQuery}
     * @private
     */
    this.element_ = $element;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {angular.ICompileService}
     * @private
     */
    this.compile_ = $compile;

    /**
     * @type {angular.ITimeoutService}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * @type {import('gmf/theme/Themes').ThemesService}
     * @private
     */
    this.gmfThemes_ = gmfThemes;

    /**
     * @type {import('gmf/layertree/TreeManager').LayertreeTreeManager}
     * @private
     */
    this.gmfTreeManager_ = gmfTreeManager;

    /**
     * @type {import('gmf/search/FulltextSearch').FulltextSearchService}
     * @private
     */
    this.fullTextSearch_ = gmfSearchFulltextSearch;

    /**
     * @type {Function}
     * @private
     */
    this.ngeoSearchCreateGeoJSONBloodhound_ = ngeoSearchCreateGeoJSONBloodhound;

    /**
     * @type {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr}
     * @private
     */
    this.ngeoFeatureOverlayMgr = ngeoFeatureOverlayMgr;

    /**
     * @type {import('ngeo/statemanager/Location').StatemanagerLocation|undefined}
     * @private
     */
    this.ngeoLocation_ = ngeoLocation;

    /**
     * @type {import('ngeo/misc/AutoProjection').AutoProjectionService}
     * @private
     */
    this.ngeoAutoProjection_ = ngeoAutoProjection;

    /**
     * @type {?import('ol/Map').default}
     */
    this.map = null;

    /**
     * @type {?function(): void}
     */
    this.onInitCallback = null;

    /**
     * @type {function(unknown): void}
     */
    this.searchActionCallback;

    /**
     * @type {string}
     */
    this.placeholder = this.options.placeholder || 'Search…';
    gettextCatalog.getString('Search…');

    /**
     * Supported projections for coordinates search.
     * @type {import('ol/proj/Projection').default[]}
     * @private
     */
    this.coordinatesProjectionsInstances_ = [];

    /**
     * @type {import('ngeo/map/FeatureOverlay').FeatureOverlay}
     * @private
     */
    this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

    /**
     * @type {Twitter.Typeahead.Options}
     */
    this.typeaheadOptions = /** @type {Twitter.Typeahead.Options} */ ({
      highlight: true,
    });

    /**
     * @type {(Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry').default>>|Twitter.Typeahead.Dataset<CoordinateSuggestion>)[]}
     */
    this.datasets = [];

    /**
     * @type {string}
     */
    this.inputValue = '';

    /**
     * @type {string}
     */
    this.color = '';

    /**
     * @type {boolean}
     */
    this.displayColorPicker = false;

    /**
     * @type {?import('ngeo/search/searchDirective').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry').default>>}
     */
    this.listeners = null;

    /**
     * @type {import('ngeo/search/searchDirective').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry').default>>}
     */
    this.additionalListeners = {};

    /**
     * @type {boolean}
     */
    this.clearButton = this.options.clearButton !== false;

    if (!this.clearButton) {
      // Empty the search field on focus and blur.
      this.element_.find('input').on('focus blur', () => {
        this.clear();
      });
    }

    this.featureOverlay_.setStyle(this.getSearchStyle_.bind(this));

    this.scope_.$watch(() => this.color, this.setStyleColor.bind(this));

    if (this.ngeoLocation_) {
      const searchQuery = this.ngeoLocation_.getParam('search');
      if (searchQuery) {
        let resultIndex = 1;
        if (this.ngeoLocation_.getParam('search-select-index')) {
          resultIndex = parseInt(this.ngeoLocation_.getParam('search-select-index') || '', 10);
        }
        let mapZoom;
        if (this.ngeoLocation_.getParam('search-maxzoom')) {
          mapZoom = parseInt(this.ngeoLocation_.getParam('search-maxzoom') || '', 10);
        } else if (this.ngeoLocation_.getParam('map_zoom')) {
          mapZoom = parseInt(this.ngeoLocation_.getParam('map_zoom') || '', 10);
        }
        this.fulltextsearch_(searchQuery, resultIndex, mapZoom);
      }
    }
  }

  /**
   * Called on initialization of the controller.
   */
  $onInit() {
    this.coordinatesProjectionsInstances_ =
      this.options.coordinatesProjections === undefined
        ? [this.map.getView().getProjection()]
        : this.ngeoAutoProjection_.getProjectionList(this.options.coordinatesProjections);

    // Merge typeahead options from the controller options with the constant options
    if (this.typeaheadOptions) {
      Object.assign(this.options, this.typeaheadOptions);
    }

    this.initDatasets_();

    this.listeners = this.mergeListeners_(this.additionalListeners, {
      select: this.select_.bind(this),
      change: this.handleChange_.bind(this),
      close: this.close_.bind(this),
      datasetsempty: this.datasetsempty_.bind(this),
    });

    if (this.onInitCallback) {
      this.onInitCallback();
    }
  }

  /**
   * Merges the custom listeners received via the component attributes and the
   * listeners that are needed for this controller to function (close and select).
   * @param {import('ngeo/search/searchDirective').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry').default>>} additionalListeners
   *    Custom provided listeners.
   * @param {import('ngeo/search/searchDirective').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry').default>>} listeners Default listeners.
   * @return {import('ngeo/search/searchDirective').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry').default>>} Merged listeners.
   * @private
   */
  mergeListeners_(additionalListeners, listeners) {
    if (additionalListeners === undefined) {
      return listeners;
    }
    return {
      open: additionalListeners.open,
      close:
        additionalListeners.close === undefined
          ? listeners.close
          : function () {
              listeners.close();
              additionalListeners.close();
            },
      change: additionalListeners.change,
      cursorchange: additionalListeners.cursorchange,
      datasetsempty: additionalListeners.datasetsempty,
      select:
        additionalListeners.select === undefined
          ? listeners.select
          : function (evt, obj, dataset) {
              listeners.select(evt, obj, dataset);
              additionalListeners.select(evt, obj, dataset);
            },
      autocomplete: additionalListeners.autocomplete,
    };
  }

  /**
   * Initialize datasets for the search
   * @private
   */
  initDatasets_() {
    const gettextCatalog = this.gettextCatalog_;
    for (const datasource of this.options.datasources || []) {
      /** @type {string[]} */
      const groupValues = datasource.groupValues !== undefined ? datasource.groupValues : this.groups;
      /** @type {import('gmf/options').SearchAction[]} */
      const groupActions = datasource.groupActions || [];
      /** @type {{title: string, filter: function(import("geojson").Feature): boolean}[]} */
      const filters = [];

      if (groupValues.length === 0) {
        filters.push({
          'title': '',
          'filter': this.filterLayername_(),
        });
      } else {
        groupValues.forEach((layerName) => {
          filters.push({
            'title': layerName,
            'filter': this.filterLayername_(layerName),
          });
        });
      }

      groupActions.forEach((action) => {
        filters.push({
          'title': gettextCatalog.getString(action.title),
          'filter': this.filterAction_(action.action),
        });
      });

      filters.forEach((filter) => {
        this.datasets.push(
          this.createDataset_(
            {
              bloodhoundOptions: datasource.bloodhoundOptions,
              datasetTitle: filter.title,
              labelKey: datasource.labelKey,
              projection: datasource.projection,
              typeaheadDatasetOptions: datasource.typeaheadDatasetOptions,
              url: datasource.url || this.fulltextsearchUrl,
            },
            filter.filter
          )
        );
      });
    }

    // For searching coordinates
    this.datasets.push({
      source: this.createSearchCoordinates_(this.map.getView()),
      name: 'coordinates',
      display: 'label',
      templates: {
        header: () => {
          const header = gettextCatalog.getString('Recenter to');
          return `<div class="gmf-search-header" translate>${header}</div>`;
        },
        /**
         * @param {CoordinateSuggestion} suggestion
         * @return {string}
         */
        suggestion: (suggestion) => {
          const coordinates = suggestion.label;

          let html = `<p class="gmf-search-label">${coordinates}</p>`;
          html = `<div class="gmf-search-datum">${html}</div>`;
          return html;
        },
      },
    });
  }

  /**
   * @param {import('gmf/options').SearchComponentDatasource} config The config of the dataset.
   * @param {(function(import("geojson").Feature): boolean)} [opt_filter] A filter function
   *     based on a GeoJSONFeaturesCollection's array.
   * @return {Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry').default>>} A typeahead dataset.
   * @private
   */
  createDataset_(config, opt_filter) {
    const gettextCatalog = this.gettextCatalog_;
    const componentScope = this.scope_;
    const compile = this.compile_;
    const bloodhoundEngine = this.createAndInitBloodhound_(config, opt_filter);
    /** @type {Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry').default>>} */
    const typeaheadDataset = {
      limit: Infinity,
      source: bloodhoundEngine.ttAdapter(),
      display: (suggestion) => {
        return suggestion.get(config.labelKey);
      },
      templates: {
        header: () => {
          if (!config.datasetTitle) {
            return '';
          } else {
            const header = gettextCatalog.getString(config.datasetTitle);
            return `<div class="gmf-search-header">${header}</div>`;
          }
        },
        suggestion: (suggestion) => {
          const scope = componentScope.$new(true);
          // @ts-ignore: scope ...
          scope.feature = suggestion;

          let html = `<p class="gmf-search-label" translate>${suggestion.get(config.labelKey)}</p>`;
          html += `<p class="gmf-search-group" translate>${
            suggestion.get('layer_name') || config.datasetTitle
          }</p>`;
          html = `<div class="gmf-search-datum">${html}</div>`;
          return compile(html)(scope).html();
        },
      },
    };
    if (config.typeaheadDatasetOptions) {
      Object.assign(typeaheadDataset, config.typeaheadDatasetOptions);
    }
    return typeaheadDataset;
  }

  /**
   * @param {string} action The action to keep.
   * @return {(function(import("geojson").Feature): boolean)} A filter function based on a
   *     GeoJSONFeaturesCollection's array.
   * @private
   */
  filterAction_(action) {
    return (
      /**
       * @param {import("geojson").Feature} feature
       * @return {boolean}
       */
      function (feature) {
        const properties = feature.properties || {};
        if (properties.actions) {
          // result is an action (add_theme, add_group, ...)
          // add it to the corresponding group
          return (
            !properties.layer_name &&
            /** @type {import('gmf/options').SearchAction[]} */ (properties.actions).some(
              (act) => act.action === action
            )
          );
        } else {
          return false;
        }
      }
    );
  }

  /**
   * @param {string} [opt_layerName] The layerName to keep. If null, keep all layers
   *     (In all cases, except actions layers).
   * @return {function(import("geojson").Feature): boolean} A filter function based on a
   *     GeoJSONFeaturesCollection's array.
   * @private
   */
  filterLayername_(opt_layerName) {
    return (
      /**
       * @param {import("geojson").Feature} feature
       * @return {boolean}
       */
      function (feature) {
        const featureLayerName = (feature.properties || {}).layer_name;
        // Keep only layers with layer_name (don't keep action layers).
        if (featureLayerName === undefined) {
          return false;
        }
        if (opt_layerName === undefined) {
          return true;
        }
        return featureLayerName === opt_layerName;
      }
    );
  }

  /**
   * @param {import('gmf/options').SearchComponentDatasource} config The config of the dataset.
   * @param {(function(import("geojson").Feature): boolean)} [opt_filter] Afilter function
   *     based on a GeoJSONFeaturesCollection's array.
   * @return {Bloodhound<olFeature<import('ol/geom/Geometry').default>[]>} The bloodhound engine.
   * @private
   */
  createAndInitBloodhound_(config, opt_filter) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    const mapProjectionCode = this.map.getView().getProjection().getCode();
    const remoteOptions = this.getBloodhoudRemoteOptions_();
    const bloodhound = this.ngeoSearchCreateGeoJSONBloodhound_(
      config.url,
      opt_filter,
      olProj.get(mapProjectionCode),
      olProj.get(config.projection),
      config.bloodhoundOptions,
      remoteOptions
    );
    bloodhound.initialize();
    return bloodhound;
  }

  /**
   * @return {Bloodhound.RemoteOptions<GeoJSON.FeatureCollection>} Options.
   * @private
   */
  getBloodhoudRemoteOptions_() {
    const gettextCatalog = this.gettextCatalog_;
    return /** @type {Bloodhound.RemoteOptions<GeoJSON.FeatureCollection>} */ ({
      rateLimitWait: this.options.delay == undefined ? 50 : this.options.delay,
      prepare: (query, settings) => {
        const url = settings.url;
        if (!url) {
          throw new Error('Missing URL');
        }
        const lang = gettextCatalog.getCurrentLanguage();
        settings.xhrFields = {
          withCredentials: true,
        };
        settings.url = olUriAppendParams(url, {
          query: query,
          lang: lang,
        });
        return settings;
      },
    });
  }

  /**
   * @typedef {Object} CoordinateSuggestion
   * @property {string} label
   * @property {number[]} position
   * @property {string} tt_source
   */

  /**
   * @param {import('ol/View').default} view View.
   * @return {function(string, function(CoordinateSuggestion[]))} function defining parameters for the search
   *    suggestions.
   * @private
   */
  createSearchCoordinates_(view) {
    const viewProjection = view.getProjection();
    const extent = viewProjection.getExtent();
    return (query, callback) => {
      const suggestions = [];
      const coordinates = this.ngeoAutoProjection_.stringToCoordinates(query);
      if (coordinates === null) {
        return;
      }
      const position = this.ngeoAutoProjection_.tryProjectionsWithInversion(
        coordinates,
        extent,
        viewProjection,
        this.coordinatesProjectionsInstances_.map((proj) => proj.getCode())
      );
      if (position === null) {
        return;
      }
      suggestions.push({
        label: coordinates.join(' '),
        position: position,
        tt_source: 'coordinates',
      });
      callback(suggestions);
    };
  }

  /**
   * Style for search results.
   * @param {null|olFeature<import('ol/geom/Geometry').default>|import('ol/render/Feature').default} feature
   *    The searched feature.
   * @param {number} resolution The current resolution of the map.
   * @return {import('ol/style/Style').default} A style for this kind of features.
   * @private
   */
  getSearchStyle_(feature, resolution) {
    if (!feature) {
      throw new Error('Missing feature');
    }
    const style = buildStyle(
      this.options.styles[feature.get('layer_name')] || this.options.styles['default']
    );
    const trueStyle = /** @type {import('ol/style/Style').default} */ (style);
    if (this.color) {
      const color = asColorArray(this.color);

      const strokeStyle = trueStyle.getStroke();
      const prevStrokeColor = /** @type {number[]} */ (strokeStyle.getColor());
      const strokeColor = color.slice();
      strokeColor[3] = prevStrokeColor[3];
      if (strokeStyle) {
        strokeStyle.setColor(strokeColor);
      }
      const fillStyle = trueStyle.getFill();
      const prevFillColor = /** @type {number[]} */ (fillStyle.getColor());
      const fillColor = color.slice();
      fillColor[3] = prevFillColor[3];
      if (fillStyle) {
        fillStyle.setColor(fillColor);
      }

      let imageStyle = trueStyle.getImage();
      if (imageStyle) {
        const circleStyle = /** @type {import('ol/style/Circle').default} */ (imageStyle);
        const imageStrokeStyle = circleStyle.getStroke();
        if (imageStrokeStyle) {
          imageStrokeStyle.setColor(strokeColor);
        }
        const imageFillStyle = circleStyle.getFill();
        if (imageFillStyle) {
          imageFillStyle.setColor(fillColor);
        }
        // clone the image as only new ones are rerendered
        imageStyle = imageStyle.clone();
        trueStyle.setImage(imageStyle);
      }
    }
    return trueStyle;
  }

  /**
   * Set a new color for the search feature style.
   * @param {string} color The color to set.
   */
  setStyleColor(color) {
    if (color) {
      this.color = color;
      this.ngeoFeatureOverlayMgr.getLayer().changed();
    }
  }

  /**
   * @private
   */
  setTTDropdownVisibility_() {
    if (this.clearButton) {
      const ttDropdown = this.element_.find('.twitter-typeahead .tt-menu');
      this.inputValue ? ttDropdown.show() : ttDropdown.hide();
    }
  }

  /**
   */
  onClearButton() {
    this.featureOverlay_.clear();
    this.clear();
    this.displayColorPicker = false;
  }

  /**
   */
  clear() {
    const typeahead = this.element_.find('.twitter-typeahead');
    const ttmenu = typeahead.children('.tt-menu');
    const inputs = typeahead.children('input');
    // clear model value, the 'real' input value and tt's suggestions
    this.inputValue = '';
    $(inputs[1]).typeahead('val', '');
    ttmenu.children('.tt-dataset').empty();
    this.setTTDropdownVisibility_();
  }

  /**
   */
  blur() {
    const typeahead = this.element_.find('.twitter-typeahead');
    const inputs = typeahead.children('input');
    // Blur as soon as possible in digest loops
    this.timeout_(() => {
      $(inputs[1]).blur();
    });
  }

  /**
   * @param {JQueryEventObject} event Event.
   * @param {olFeature<import('ol/geom/Geometry').default>|CoordinateSuggestion} suggestion Suggestion.
   * @param {Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry').default>>} dataset Dataset.
   * @private
   */
  select_(event, suggestion, dataset) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    // @ts-ignore: extra parameter
    if (suggestion.tt_source === 'coordinates') {
      const coordinateSuggestion = /** @type {CoordinateSuggestion} */ (suggestion);
      const geom = new olGeomPoint(coordinateSuggestion.position);

      this.featureOverlay_.clear();
      this.featureOverlay_.addFeature(
        new olFeature({
          geometry: geom,
          'layer_name': COORDINATES_LAYER_NAME,
        })
      );
      this.map.getView().setCenter(coordinateSuggestion.position);
      this.leaveSearch_();
    } else {
      if (!(suggestion instanceof olFeature)) {
        throw new Error('Wrong suggestion type');
      }
      this.selectFromGMF_(event, suggestion, dataset);
    }
  }

  /**
   * @param {JQueryEventObject} event Event.
   * @param {olFeature<import('ol/geom/Geometry').default>} feature Feature.
   * @param {Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry').default>>} dataset Dataset.
   * @private
   */
  selectFromGMF_(event, feature, dataset) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    const actions = feature.get('actions');
    const featureGeometry = feature.getGeometry();
    if (actions) {
      for (let i = 0, ii = actions.length; i < ii; i++) {
        const action = actions[i];
        const actionName = action.action;
        const actionData = action.data;
        if (actionName == 'add_theme') {
          this.gmfThemes_.getThemesObject().then((themes) => {
            const theme = findThemeByName(themes, actionData);
            if (theme) {
              gmfBackgroundlayerStatus.touchedByUser = true;
              this.gmfTreeManager_.addFirstLevelGroups(theme.children);
            }
          });
        } else if (actionName == 'add_group') {
          this.gmfTreeManager_.addGroupByName(actionData, true);
        } else if (actionName == 'add_layer') {
          const groupActions = /** @type {import('gmf/options').SearchAction[]} */ (
            this.options.datasources[0].groupActions
          );
          let datasourcesActionsHaveAddLayer;
          groupActions.forEach((groupAction) => {
            if (groupAction.action === 'add_layer') {
              datasourcesActionsHaveAddLayer = true;
              return true;
            }
          });
          if (datasourcesActionsHaveAddLayer) {
            const silent = !!featureGeometry;
            this.gmfTreeManager_.addGroupByLayerName(actionData, true, silent);
          }
        } else {
          if (this.searchActionCallback) {
            this.searchActionCallback(action);
          }
        }
      }
    }

    const size = this.map.getSize();
    if (featureGeometry instanceof SimpleGeometry && size) {
      const view = this.map.getView();
      this.featureOverlay_.clear();
      this.featureOverlay_.addFeature(feature);
      this.displayColorPicker = true;
      const fitArray =
        featureGeometry.getType() === 'GeometryCollection' ? featureGeometry.getExtent() : featureGeometry;
      view.fit(fitArray, {
        size: size,
        maxZoom: this.options.maxZoom || 16,
      });
    }
    this.leaveSearch_();
  }

  /**
   * @private
   */
  leaveSearch_() {
    if (!this.clearButton) {
      this.clear();
    }
    this.blur();
  }

  /**
   * @private
   */
  close_() {
    if (!this.clearButton) {
      this.setTTDropdownVisibility_();
    }
  }

  /**
   * @param {JQueryEventObject} event Event.
   * @param {string} query Query.
   * @param {boolean} empty Empty.
   * @private
   */
  datasetsempty_(event, query, empty) {
    // workaround to display a 'no result found' in the search result when all of
    // the datasets are empty.
    // based on https://github.com/twitter/typeahead.js/issues/780#issuecomment-251554452
    // FIXME: remove this workaround when https://github.com/corejavascript/typeahead.js/issues/60 is fixed

    // If there is no clear button clean the map and colorpicker.
    if (!this.clearButton) {
      this.featureOverlay_.clear();
      this.displayColorPicker = false;
    }

    const menu = this.element_.find('.twitter-typeahead .tt-menu');
    const message = menu.children('.gmf-search-no-results');
    if (message.length == 0) {
      const gettextCatalog = this.gettextCatalog_;
      const innerHTML = gettextCatalog.getString('No result found');
      const div = $(`<div class="gmf-search-no-results" translate>${innerHTML}</div>`);
      menu.append(div);
    }
    if (empty) {
      message.show();
      menu.addClass('gmf-search-no-results');
    } else {
      menu.removeClass('gmf-search-no-results');
      message.hide();
    }
  }

  /**
   * Performs a full-text search and centers the map on the first search result.
   * @param {string} query Search query.
   * @param {number} resultIndex Return nth result instead.
   * @param {number} [opt_zoom] Optional zoom level.
   * @private
   */
  fulltextsearch_(query, resultIndex, opt_zoom) {
    if (resultIndex < 1) {
      // can't be lower than one
      resultIndex = 1;
    }
    this.fullTextSearch_.search(query, {limit: `${resultIndex}`}).then((data) => {
      if (!this.map) {
        throw new Error('Missing map');
      }
      if (data && data.features[resultIndex - 1]) {
        const format = new olFormatGeoJSON();
        const feature = /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>} */ (
          format.readFeature(data.features[resultIndex - 1])
        );
        this.featureOverlay_.addFeature(feature);
        /**
         * @type {import('ol/View').FitOptions}
         */
        const fitOptions = {};
        if (opt_zoom !== undefined) {
          fitOptions.maxZoom = opt_zoom;
          fitOptions.size = this.map.getSize() || null;
        }
        const geometry = feature.getGeometry();
        if (!geometry) {
          throw new Error('Missing geometry');
        }
        this.map.getView().fit(geometry.getExtent(), fitOptions);
        this.inputValue = /** @type {string} */ (feature.get('label'));
      }
    });
  }

  /**
   * @param {JQueryEventObject} event Event.
   * @param {string} query Query.
   * @private
   */
  handleChange_(event, query) {
    // On change, if there's a query then no need to do anything
    if (query) {
      return;
    }

    // There's no query, hide the no result message
    this.datasetsempty_(event, query, false);
  }
}

// Register the controller in the module
myModule.controller('gmfSearchController', SearchController);

export default myModule;
