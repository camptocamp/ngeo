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
import {COORDINATES_LAYER_NAME} from 'gmf/index.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import gmfSearchFulltextSearch from 'gmf/search/FulltextSearch.js';
import gmfThemeThemes, {findThemeByName} from 'gmf/theme/Themes.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import ngeoMiscAutoProjection from 'ngeo/misc/AutoProjection.js';

import ngeoMiscColorpickerComponent from 'ngeo/misc/colorpickerComponent.js';

import ngeoMessagePopoverComponent from 'ngeo/message/popoverComponent.js';

import ngeoSearchModule from 'ngeo/search/module.js';
import olFeature from 'ol/Feature.js';
import {asArray as asColorArray} from 'ol/color.js';
import olGeomPoint from 'ol/geom/Point.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import * as olProj from 'ol/proj.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import {appendParams as olUriAppendParams} from 'ol/uri.js';
import SimpleGeometry from 'ol/geom/SimpleGeometry.js';

/**
 * @typedef {Object} gmfSearchAction
 * @property {string} action The action
 * @property {string} title The title
 */

/**
 * Datasource configuration options for the search directive.
 * @typedef {Object} SearchComponentDatasource
 * @property {Bloodhound.BloodhoundOptions<GeoJSON.FeatureCollection>} [bloodhoundOptions] The optional Bloodhound configuration for this
 * data set. See: https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
 * @property {string} labelKey The name of a corresponding GeoJSON property key in the current dataset.
 * The bound value of this property key will be used as label.
 * @property {string[]} [groupValues] Possible values for the 'layer_name' key.
 * Used to define groups of dataset.
 * @property {gmfSearchAction[]} [groupActions] List of allowed actions. The list may contain a
 * combination of `add_theme`, `add_group` or `add_layer`
 * @property {string} [projection] The geometry's projection for this set of data.
 * @property {Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry.js').default>>} [typeaheadDatasetOptions] The optional Twitter.Typeahead.
 *    configuration for this dataset. See: https://github.com/twitter/typeahead.js/blob/master/
 * @property {string} url URL of the search service. Must contain a '%QUERY' term that will be
 * replaced by the input string.
 * @property {string} [datasetTitle]
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfSearch', [
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

module.run(
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
 * This component uses the {@link import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} to create a
 * feature overlay for drawing features on the map. The application
 * is responsible to initialize the {@link import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr}
 * with the map.
 *
 * Example flat results:
 *
 *      <gmf-search gmf-search-map="::ctrl.map"
 *        gmf-search-options="::ctrl.searchOptions"
 *        gmf-search-styles="::ctrl.searchStyles"
 *        gmf-search-datasources="::ctrl.searchDatasources"
 *        gmf-search-coordinatesprojections="::ctrl.searchCoordinatesProjections">
 *      </gmf-search>
 *      <script>
 *        (function() {
 *          let module = angular.module('app');
 *          module.value('fulltextsearchUrl', '${request.route_url(
 *            'fulltextsearch', _query={"limit": 20}
 *          ) | n}');
 *          module.value('gmfSearchGroups', []);
 *          module.constant('gmfSearchActions', [
 *                {action: 'add_theme', title: 'Add a theme'},
 *                {action: 'add_group', title: 'Add a sub theme'},
 *                {action: 'add_layer', title: 'Add a layer'}
 *          ]);
 *        })();
 *      </script>
 *
 * Example with categories:
 *
 *      <gmf-search gmf-search-map="::ctrl.map"
 *        gmf-search-options="::ctrl.searchOptions"
 *        gmf-search-styles="::ctrl.searchStyles"
 *        gmf-search-datasources="::ctrl.searchDatasources"
 *        gmf-search-coordinatesprojections="::ctrl.searchCoordinatesProjections">
 *      </gmf-search>
 *      <script>
 *        (function() {
 *          let module = angular.module('app');
 *          module.value('fulltextsearchUrl', '${request.route_url(
 *            'fulltextsearch',
 *            _query={"limit": 30, "partitionlimit": 5}
 *          ) | n}');
 *          module.value('gmfSearchGroups', ${dumps(fulltextsearch_groups) | n});
 *          module.value('gmfSearchActions', []);
 *        })();
 *     </scriptrchUrl' value in the examples above set three "_query" parameters: "limit",
 *
 * The 'fulltextsearchUrl' value in the examples above set three "_query" parameters: "limit",
 * "partitionlimit" and "ranksystem". For this last one "ts_rank_cd" is the only effective value. It's used to
 * order your search results with the "ts_rank_cd" ranking system from PostgreSQL module pg_trgm. Without
 * this value, the PostgreSQL function "similarity" (module pg_trgm) is used for the ranking. Read the
 * full-text search c2cgeoportal documentation to know more.
 * You can also add these parameters to the "url" variable of one (or more) of the
 * SearchDirectiveDatasource given to this component (here within the "ctrl.searchDatasources"). That
 * allows you to have multiples configurations on one search component.
 *
 * @htmlAttribute {string} gmf-search-input-value The input value (read only).
 * @htmlAttribute {import("ol/Map.js").default} gmf-search-map The map.
 * @htmlAttribute {Twitter.Typeahead.Options|undefined} gmf-search-options Addition Twitter.Typeahead.
 *    options.
 * @htmlAttribute {SearchComponentDatasource} gmf-search-datasource
 *    The datasources.
 * @htmlAttribute {Object<string, import("ol/style/Style.js").default>}
 *    gmf-search-styles A map of styles to apply on searched features. Keys
 *    must be the 'layer_name' property of features except for coordinates
 *    where the key ifor its style is the value of the constant
 *    'gmf.COORDINATES_LAYER_NAME'. The 'default' key is used to apply the
 *    default style.
 * @htmlAttribute {string[]} gmf-search-coordinatesprojections codes
 *    of supported projections for coordinates search (projections must be
 *    defined in ol3). If not provided, only the map's view projection
 *    format will be supported.
 * @htmlAttribute {SearchComponentListeners} gmf-search-listeners
 *    The listeners.
 * @htmlAttribute {boolean=} gmf-search-clearbutton Optional clear button in the input search.
 *    Default to true.
 * @htmlAttribute {number=} gmf-search-delay Optional bloodhound request delay in ms. Default to 50 ms.
 * @htmlAttribute {boolean=} gmf-search-colorchooser Optional. Whether to let the user
 *    change the style of the feature on the map. Default is false.
 * @htmlAttribute {number=} gmf-search-maxzoom Optional maximum zoom we will zoom on result, default is 16.
 * @htmlAttribute {function=} gmf-search-on-init Optional function called when the component is initialized.
 * @htmlAttribute {function=} gmf-search-action Optional function called when no default action is defined.
 * @ngdoc component
 * @ngname gmfSearch
 */
const searchComponent = {
  bindings: {
    'inputValue': '=?gmfSearchInputValue',
    'placeholder': '@?gmfSearchPlaceholder',
    'map': '<gmfSearchMap',
    'datasources': '<gmfSearchDatasources',
    'typeaheadOptions': '<?gmfSearchOptions',
    'featuresStyles': '<?gmfSearchStyles',
    'clearButton': '=?gmfSearchClearbutton',
    'colorChooser': '<?gmfSearchColorchooser',
    'coordinatesProjections': '<?gmfSearchCoordinatesprojections',
    'additionalListeners': '<gmfSearchListeners',
    'maxZoom': '<?gmfSearchMaxzoom',
    'delay': '<?gmfSearchDelay',
    'onInitCallback': '<?gmfSearchOnInit',
    'searchActionCallback': '&?gmfSearchAction',
  },
  controller: 'gmfSearchController',
  templateUrl: gmfSearchTemplateUrl,
};

module.value('gmfSearchTemplateUrl', gmfSearchTemplateUrl_);

// Register the controller in the module
module.component('gmfSearch', searchComponent);

/**
 * @hidden
 */
export class SearchController {
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IScope} $scope The component's scope.
   * @param {angular.ICompileService} $compile Angular compile service.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import("ngeo/misc/AutoProjection.js").AutoProjectionService} ngeoAutoProjection The ngeo
   *    coordinates service.
   * @param {import("ngeo/search/createGeoJSONBloodhound.js").createGeoJSONBloodhound} ngeoSearchCreateGeoJSONBloodhound
   *    The ngeo create GeoJSON Bloodhound service.
   * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
   *     overlay manager service.
   * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes gmf Themes service.
   * @param {import("gmf/layertree/TreeManager.js").LayertreeTreeManager} gmfTreeManager gmf Tree Manager
   *    service.
   * @param {import("gmf/search/FulltextSearch.js").FulltextSearchService} gmfSearchFulltextSearch
   *    gmf Full text search service.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfSearchController
   */
  constructor(
    $element,
    $scope,
    $compile,
    $timeout,
    $injector,
    gettextCatalog,
    ngeoAutoProjection,
    ngeoSearchCreateGeoJSONBloodhound,
    ngeoFeatureOverlayMgr,
    gmfThemes,
    gmfTreeManager,
    gmfSearchFulltextSearch
  ) {
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
     * @type {import("gmf/theme/Themes.js").ThemesService}
     * @private
     */
    this.gmfThemes_ = gmfThemes;

    /**
     * @type {import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
     * @private
     */
    this.gmfTreeManager_ = gmfTreeManager;

    /**
     * @type {import("gmf/search/FulltextSearch.js").FulltextSearchService}
     * @private
     */
    this.fullTextSearch_ = gmfSearchFulltextSearch;

    /**
     * @type {import("ngeo/search/createGeoJSONBloodhound.js").createGeoJSONBloodhound}
     * @private
     */
    this.ngeoSearchCreateGeoJSONBloodhound_ = ngeoSearchCreateGeoJSONBloodhound;

    /**
     * @type {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr}
     * @private
     */
    this.ngeoFeatureOverlayMgr = ngeoFeatureOverlayMgr;

    /**
     * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation|undefined}
     * @private
     */
    this.ngeoLocation_;

    if ($injector.has('ngeoLocation')) {
      this.ngeoLocation_ = $injector.get('ngeoLocation');
    }

    /**
     * @type {import("ngeo/misc/AutoProjection.js").AutoProjectionService}
     * @private
     */
    this.ngeoAutoProjection_ = ngeoAutoProjection;

    /**
     * @type {?import("ol/Map.js").default}
     */
    this.map = null;

    /**
     * @type {Object}
     * @private
     */
    this.styles_ = {};

    /**
     * @type {?function(): void}
     */
    this.onInitCallback = null;

    /**
     * @type {function(any): void}
     */
    this.searchActionCallback;

    /**
     * Whether or not to show a button to clear the search text.
     * Default to true.
     * @type {boolean}
     */
    this.clearButton = true;

    /**
     * @type {boolean}
     */
    this.colorChooser = false;

    /**
     * @type {string}
     */
    this.placeholder = '';

    /**
     * @type {number}
     */
    this.delay = 0;

    /**
     * The maximum zoom we will zoom on result.
     * @type {number}
     */
    this.maxZoom = 16;

    /**
     * Supported projections for coordinates search.
     * @type {string[]}
     */
    this.coordinatesProjections = [];

    /**
     * Supported projections for coordinates search.
     * @type {olProj.Projection[]}
     */
    this.coordinatesProjectionsInstances = [];

    /**
     * @type {import("ngeo/map/FeatureOverlay.js").FeatureOverlay}
     * @private
     */
    this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

    /**
     * @type {SearchComponentDatasource[]}
     */
    this.datasources = [];

    /**
     * @type {?Twitter.Typeahead.Options}
     */
    this.typeaheadOptions = null;

    /**
     * @type {Twitter.Typeahead.Options}
     */
    this.options = /** @type {Twitter.Typeahead.Options} */ ({
      highlight: true,
    });

    /**
     * @type {Object<string, import("ol/style/Style.js").default>}
     */
    this.featuresStyles = {};

    /**
     * @type {(Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry.js').default>>|Twitter.Typeahead.Dataset<CoordinateSuggestion>)[]}
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
     * @type {?import('ngeo/search/searchDirective.js').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry.js').default>>}
     */
    this.listeners = null;

    /**
     * @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry.js').default>>}
     */
    this.additionalListeners = {};
  }

  /**
   * Called on initialization of the controller.
   */
  $onInit() {
    if (!this.map) {
      throw new Error('Missing map');
    }
    if (!this.ngeoLocation_) {
      throw new Error('Missing ngeoLocation');
    }
    const gettextCatalog = this.gettextCatalog_;
    this.clearButton = this.clearButton !== false;
    this.colorChooser = this.colorChooser === true;
    if (this.delay === undefined) {
      this.delay = 50;
    }
    this.placeholder = this.placeholder ? this.placeholder : gettextCatalog.getString('Search…');

    // Init coordinates projections instances
    this.coordinatesProjectionsInstances =
      this.coordinatesProjections === undefined
        ? [this.map.getView().getProjection()]
        : this.ngeoAutoProjection_.getProjectionList(this.coordinatesProjections);

    if (!this.clearButton) {
      // Empty the search field on focus and blur.
      this.element_.find('input').on('focus blur', () => {
        this.clear();
      });
    }

    if (this.onInitCallback) {
      this.onInitCallback();
    }

    this.initStyles_();

    this.featureOverlay_.setStyle(this.getSearchStyle_.bind(this));

    if (this.typeaheadOptions) {
      Object.assign(this.options, this.typeaheadOptions);
    }

    this.initDatasets_();

    this.scope_.$watch(() => this.color, this.setStyleColor.bind(this));

    this.listeners = this.mergeListeners_(this.additionalListeners, {
      select: this.select_.bind(this),
      change: this.handleChange_.bind(this),
      close: this.close_.bind(this),
      datasetsempty: this.datasetsempty_.bind(this),
    });

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
   * Merges the custom listeners received via the component attributes and the
   * listeners that are needed for this controller to function (close and select).
   * @param {import('ngeo/search/searchDirective.js').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry.js').default>>} additionalListeners
   *    Custom provided listeners.
   * @param {import('ngeo/search/searchDirective.js').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry.js').default>>} listeners Default listeners.
   * @return {import('ngeo/search/searchDirective.js').SearchDirectiveListeners<olFeature<import('ol/geom/Geometry.js').default>>} Merged listeners.
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
    if (!this.map) {
      throw new Error('Missing map');
    }
    const gettextCatalog = this.gettextCatalog_;
    for (const datasource of this.datasources) {
      /** @type {string[]} */
      const groupValues = datasource.groupValues !== undefined ? datasource.groupValues : [];
      /** @type {gmfSearchAction[]} */
      const groupActions = datasource.groupActions ? datasource.groupActions : [];
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
              url: datasource.url,
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
   * @param {SearchComponentDatasource} config The config of the dataset.
   * @param {(function(import("geojson").Feature): boolean)=} opt_filter A filter function
   *     based on a GeoJSONFeaturesCollection's array.
   * @return {Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry.js').default>>} A typeahead dataset.
   * @private
   */
  createDataset_(config, opt_filter) {
    const gettextCatalog = this.gettextCatalog_;
    const componentScope = this.scope_;
    const compile = this.compile_;
    const bloodhoundEngine = this.createAndInitBloodhound_(config, opt_filter);
    /** @type {Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry.js').default>>} */
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
            /** @type {gmfSearchAction[]} */ (properties.actions).some((act) => act.action === action)
          );
        } else {
          return false;
        }
      }
    );
  }

  /**
   * @param {string=} opt_layerName The layerName to keep. If null, keep all layers
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
   * @param {SearchComponentDatasource} config The config of the dataset.
   * @param {(function(import("geojson").Feature): boolean)=} opt_filter Afilter function
   *     based on a GeoJSONFeaturesCollection's array.
   * @return {Bloodhound<olFeature<import('ol/geom/Geometry.js').default>[]>} The bloodhound engine.
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
      rateLimitWait: this.delay,
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
   * @param {import("ol/View.js").default} view View.
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
        this.coordinatesProjections
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
   * Init the style object for the search results. It set defaults for the
   * coordinates and the polygon styles, and both can be overloaded from component
   * attributes. The styles from component attributes can specify custom styles
   * for each search group.
   * @private
   */
  initStyles_() {
    this.styles_[COORDINATES_LAYER_NAME] = new olStyleStyle({
      image: new olStyleRegularShape({
        stroke: new olStyleStroke({color: [0, 0, 0, 0.7], width: 2}),
        points: 4,
        radius: 8,
        radius2: 0,
        angle: 0,
      }),
    });
    const fill = new olStyleFill({
      color: [65, 134, 240, 0.5],
    });
    const stroke = new olStyleStroke({
      color: [65, 134, 240, 1],
      width: 2,
    });
    this.styles_['default'] = new olStyleStyle({
      fill: fill,
      image: new olStyleCircle({
        fill: fill,
        radius: 5,
        stroke: stroke,
      }),
      stroke: stroke,
    });
    const customStyles = this.featuresStyles || {};
    Object.assign(this.styles_, customStyles);
  }

  /**
   * Style for search results.
   * @param {null|olFeature<import('ol/geom/Geometry.js').default>|import("ol/render/Feature.js").default} feature
   *    The searched feature.
   * @param {number} resolution The current resolution of the map.
   * @return {import("ol/style/Style.js").default} A style for this kind of features.
   * @private
   */
  getSearchStyle_(feature, resolution) {
    if (!feature) {
      throw new Error('Missing feature');
    }
    const style = this.styles_[feature.get('layer_name')] || this.styles_['default'];
    if (this.color) {
      const color = asColorArray(this.color);

      const strokeStyle = style.getStroke();
      const prevStrokeColor = strokeStyle.getColor();
      const strokeColor = color.slice();
      strokeColor[3] = prevStrokeColor[3];
      if (strokeStyle) {
        strokeStyle.setColor(strokeColor);
      }
      const fillStyle = style.getFill();
      const prevFillColor = fillStyle.getColor();
      const fillColor = color.slice();
      fillColor[3] = prevFillColor[3];
      if (fillStyle) {
        fillStyle.setColor(fillColor);
      }
      // the image style can't be changed in place, the colors are updated on a clone.
      let imageStyle = style.getImage();
      if (imageStyle) {
        imageStyle = imageStyle.clone();
        const imageStrokeStyle = imageStyle.getStroke();
        if (imageStrokeStyle) {
          imageStrokeStyle.setColor(strokeColor);
        }
        const imageFillStyle = imageStyle.getFill();
        if (imageFillStyle) {
          imageFillStyle.setColor(fillColor);
        }
        style.setImage(imageStyle);
      }
    }
    return style;
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
   * @param {Object|olFeature<import('ol/geom/Geometry.js').default>} suggestion Suggestion.
   * @param {Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry.js').default>>} dataset Dataset.
   * @private
   */
  select_(event, suggestion, dataset) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    if (suggestion.tt_source === 'coordinates') {
      const geom = new olGeomPoint(suggestion.position);

      this.featureOverlay_.clear();
      this.featureOverlay_.addFeature(
        new olFeature({
          geometry: geom,
          'layer_name': COORDINATES_LAYER_NAME,
        })
      );
      this.map.getView().setCenter(suggestion.position);
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
   * @param {olFeature<import('ol/geom/Geometry.js').default>} feature Feature.
   * @param {Twitter.Typeahead.Dataset<olFeature<import('ol/geom/Geometry.js').default>>} dataset Dataset.
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
              this.gmfTreeManager_.addFirstLevelGroups(theme.children);
            }
          });
        } else if (actionName == 'add_group') {
          this.gmfTreeManager_.addGroupByName(actionData, true);
        } else if (actionName == 'add_layer') {
          const groupActions = /** @type {gmfSearchAction[]} */ (this.datasources[0].groupActions);
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
        maxZoom: this.maxZoom,
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
   * @param {JQueryEventObject} event Event.
   * @private
   */
  close_(event) {
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
   * @param {number=} opt_zoom Optional zoom level.
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
        const feature = format.readFeature(data.features[resultIndex - 1]);
        this.featureOverlay_.addFeature(feature);
        /**
         * @type {import('ol/View.js').FitOptions}
         */
        const fitOptions = {};
        if (opt_zoom !== undefined) {
          fitOptions.maxZoom = opt_zoom;
          fitOptions.size = this.map.getSize() || [];
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
module.controller('gmfSearchController', SearchController);

export default module;
