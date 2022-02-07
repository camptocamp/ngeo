// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

import downloadCsvService from 'ngeo/download/Csv';

import ngeoGridComponent from 'ngeo/grid/component';

import ngeoGridConfig, {getRowUid} from 'ngeo/grid/Config';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';

import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent';

import olCollection from 'ol/Collection';
import * as olExtent from 'ol/extent';
import olMap from 'ol/Map';
import {buildStyle} from 'ngeo/options';
import panels from 'gmfapi/store/panels';

import 'bootstrap/js/src/dropdown';

/**
 * Configuration for a grid tab.
 *
 * @typedef {Object} GridSource
 * @property {import('ngeo/grid/Config').default} [configuration] Configuration used to initialize a grid.
 * @property {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source Results of the query
 *    source.
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfQueryGridComponent', [
  ngeoGridComponent.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoQueryMapQuerent.name,
]);

myModule.value(
  'gmfDisplayquerygridTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfDisplayquerygridTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/query/gridComponent';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/query/gridComponent', require('./gridComponent.html'));
  }
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfDisplayquerygridTemplateUrl Template function.
 * @returns {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfDisplayquerygridTemplateUrl($element, $attrs, gmfDisplayquerygridTemplateUrl) {
  return gmfDisplayquerygridTemplateUrl($element, $attrs);
}

/**
 * Provides a component to display results of the {@link import('ngeo/queryResult').default} in a
 * grid and shows related features on the map using
 * the {@link import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr}.
 *
 * You can override the default component's template by setting the
 * value `gmfDisplayquerygridTemplateUrl`.
 *
 * Features displayed on the map use a default style but you can override these
 * styles by passing ol.style.Style objects as attributes of this component.
 *
 * Note: the following ng-class need to be present in the interface <body> element to display the footer
 * when the grid is active (initially there should be the code for the profile tool):
 *      <body ng-class="{
 *        'gmf-profile-chart-active': !!profileChartActive,
 *        'gmf-query-grid-active': !!queryGridActive
 *      }">
 *
 * Example:
 *
 *      <gmf-displayquerygrid gmf-displayquerygrid-map="ctrl.map"></gmf-displayquerygrid>
 *
 * @htmlAttribute {boolean} gmf-displayquerygrid-active The active state of the component.
 * @htmlAttribute {import('ol/Map').default} gmf-displayquerygrid-map The map.
 * @ngdoc component
 * @ngname gmfDisplayquerygrid
 */
const queryGridComponent = {
  controller: 'GmfDisplayquerygridController as ctrl',
  bindings: {
    'active': '=?gmfDisplayquerygridActive',
    'getMapFn': '&gmfDisplayquerygridMap',
  },
  templateUrl: gmfDisplayquerygridTemplateUrl,
};

myModule.component('gmfDisplayquerygrid', queryGridComponent);

/**
 * Controller for the query grid.
 *
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ngeo/query/MapQuerent').QueryResult} ngeoQueryResult ngeo query result.
 * @param {import('ngeo/query/MapQuerent').MapQuerent} ngeoMapQuerent ngeo map querent service.
 * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import('ngeo/options').ngeoQueryOptions} ngeoQueryOptions The options.
 * @param {import('gmf/options').gmfCsvFilename} gmfCsvFilename The CSV file name.
 * @param {JQuery} $element Element.
 * @param {import('gmf/options').gmfDisplayQueryGridOptions} gmfDisplayQueryGridOptions The options.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDisplayquerygridController
 */
export function QueryGridController(
  $scope,
  ngeoQueryResult,
  ngeoMapQuerent,
  ngeoFeatureOverlayMgr,
  $timeout,
  ngeoQueryOptions,
  gmfCsvFilename,
  $element,
  gmfDisplayQueryGridOptions
) {
  /**
   * @type {import('gmf/options').gmfDisplayQueryGridOptions}
   */
  this.options = gmfDisplayQueryGridOptions;

  /**
   * @type {angular.IScope}
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.ITimeoutService}
   */
  this.$timeout_ = $timeout;

  /**
   * @type {import('ngeo/query/MapQuerent').QueryResult}
   */
  this.ngeoQueryResult = ngeoQueryResult;

  /**
   * @type {import('ngeo/query/MapQuerent').MapQuerent}
   */
  this.ngeoMapQuerent_ = ngeoMapQuerent;

  /**
   * @type {import('ngeo/download/Csv').DownloadCsvService}
   */
  this.ngeoCsvDownload_ = downloadCsvService;

  /**
   * @type {JQuery}
   */
  this.$element_ = $element;

  /**
   * @type {number}
   */
  this.maxResults = ngeoQueryOptions.limit !== undefined ? ngeoQueryOptions.limit : 50;

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {boolean}
   */
  this.pending = false;

  /**
   * @type {Object<string, GridSource>}
   */
  this.gridSources = {};

  /**
   * IDs of the grid sources in the order they were loaded.
   *
   * @type {string[]}
   */
  this.loadedGridSources = [];

  /**
   * The id of the currently shown query source.
   *
   * @type {?string|number}
   */
  this.selectedTab = null;

  /**
   * A mapping between row uid and the corresponding feature for each
   * source.
   *
   * @type {Object<string, Object<string, import('ol/Feature').default<import('ol/geom/Geometry').default>>>}
   */
  this.featuresForSources_ = {};

  // Styles for displayed features (features) and selected features
  // (highlightFeatures_) (user can set both styles).
  /**
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.features_ = new olCollection();

  /**
   * @type {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr}
   */
  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;

  /**
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.highlightFeatures_ = new olCollection();

  /**
   * Filename
   *
   * @type {import('gmf/options').gmfCsvFilename}
   */
  this.filename_ = gmfCsvFilename;

  /**
   * @type {?import('ol/Map').default}
   */
  this.map_ = null;

  /**
   * Sum over all tabs of the obtained results
   *
   * @type {number}
   */
  this.sumOfFeatures = 0;

  /**
   * Sum over all tabs of the available results
   *
   * @type {number}
   */
  this.sumOfAvailableResults = 0;

  // Watch the ngeo query result service.
  this.$scope_.$watchCollection(
    () => ngeoQueryResult,
    (newQueryResult, oldQueryResult) => {
      // Open the panel before results for first request (display the spinner)
      if (ngeoQueryResult.pending) {
        this.active = true;
        this.pending = true;
        panels.openFooterPanel('queryresult', {state: true, noError: true});
      }

      if (newQueryResult !== oldQueryResult) {
        this.updateData_();
      }
    }
  );

  /**
   * An unregister function returned from `$scope.$watchCollection` for
   * "on-select" changes (when rows are selected/unselected).
   *
   * @type {?function(): void}
   */
  this.unregisterSelectWatcher_ = null;

  /**
   * @type {?() => olMap}
   */
  this.getMapFn = null;
}

/**
 * Init the controller
 */
QueryGridController.prototype.$onInit = function () {
  if (!this.getMapFn) {
    throw new Error('Missing getMapFn');
  }

  const featuresOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  featuresOverlay.setFeatures(this.features_);

  featuresOverlay.setStyle(buildStyle(this.options.featuresStyle));

  const highlightFeaturesOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  highlightFeaturesOverlay.setFeatures(this.highlightFeatures_);
  const highlightFeatureStyle = buildStyle(this.options.selectedFeatureStyle);
  highlightFeaturesOverlay.setStyle(highlightFeatureStyle);

  const mapFn = this.getMapFn;
  if (mapFn) {
    const map = mapFn();
    if (!(map instanceof olMap)) {
      throw new Error('Wrong map type');
    }
    this.map_ = map;
  }
};

/**
 * Returns a list of grid sources in the order they were loaded.
 *
 * @returns {GridSource[]} Grid sources.
 */
QueryGridController.prototype.getGridSources = function () {
  return this.loadedGridSources.map((sourceLabel) => this.gridSources[sourceLabel]);
};

QueryGridController.prototype.updateData_ = function () {
  // close if there are no results
  if (
    (this.ngeoQueryResult.pending || this.ngeoQueryResult.total === 0) &&
    !this.hasOneWithTooManyResults_()
  ) {
    const oldActive = this.active;
    this.clear();
    if (oldActive) {
      // don't close if there are pending queries
      this.active = this.ngeoQueryResult.pending;
      panels.openFooterPanel('queryresult', {state: this.active});
      this.pending = this.ngeoQueryResult.pending;
    }
    return;
  }

  this.sumOfAvailableResults = 0;
  this.sumOfFeatures = 0;

  /**
   * @type {string[]}
   */
  const countedSources = [];
  this.ngeoQueryResult.sources.forEach((source) => {
    if (!countedSources.includes(source.label)) {
      this.sumOfFeatures += source.features.length;
    }
    if (!source.requestPartners || !source.requestPartners.some((label) => countedSources.includes(label))) {
      this.sumOfAvailableResults += source.totalFeatureCount;
    }
    countedSources.push(source.label);
  });

  this.active = true;
  panels.openFooterPanel('queryresult', {state: true});
  this.pending = false;
  let sources = this.ngeoQueryResult.sources;
  // merge sources if requested
  if (Object.keys(this.options.mergeTabs || {}).length > 0) {
    sources = this.getMergedSources_(sources);
  }

  // create grids (only for source with features or with too many results)
  sources.forEach((source) => {
    if (source.tooManyResults && source.features.length === 0) {
      this.makeGrid_(null, source);
    } else {
      source.id = this.escapeValue(source.id);
      const features = source.features;
      if (features.length > 0) {
        this.collectData_(source);
      }
    }
  });

  if (this.loadedGridSources.length === 0) {
    // if no grids were created, do not show
    this.active = false;
    panels.openFooterPanel('queryresult', {state: false, noError: true});
    return;
  }

  // keep the first existing navigation tab open
  if (this.selectedTab === null || !(`${this.selectedTab}` in this.gridSources)) {
    // selecting the tab is done in a timeout, because otherwise in rare cases
    // `ng-class` might set the `active` class on multiple tabs.
    this.$timeout_(() => {
      const firstSourceId = this.loadedGridSources[0];
      this.selectTab(this.gridSources[firstSourceId]);
    }, 0);
  }
};

/**
 * @returns {boolean} If one of the source has too many results.
 */
QueryGridController.prototype.hasOneWithTooManyResults_ = function () {
  return this.ngeoQueryResult.sources.some((source) => source.tooManyResults);
};

/**
 * Returns the value with all symbols and spaces replaced by an underscore.
 *
 * @param {string|number} value A value to escape.
 * @returns {string|number} value An escaped value.
 */
QueryGridController.prototype.escapeValue = function (value) {
  // Work-around for Number.isInteger() when not always getting a number ...
  if (typeof value == 'number') {
    return value;
  } else {
    const toEscape = /[-[\]/{}()*+?.\\^$ |]/g;
    if (value.match(toEscape) !== null) {
      return value.replace(toEscape, '_');
    } else {
      return value;
    }
  }
};

/**
 * Returns if the given grid source is selected?
 *
 * @param {GridSource} gridSource Grid source.
 * @returns {boolean} Is selected?
 */
QueryGridController.prototype.isSelected = function (gridSource) {
  return this.selectedTab === gridSource.source.label;
};

/**
 * Try to merge the mergeable sources.
 *
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource[]} sources Sources.
 * @returns {import('ngeo/statemanager/WfsPermalink').QueryResultSource[]} The merged sources.
 */
QueryGridController.prototype.getMergedSources_ = function (sources) {
  /** @type {import('ngeo/statemanager/WfsPermalink').QueryResultSource[]} */
  const allSources = [];
  /** @type {Object<string, import('ngeo/statemanager/WfsPermalink').QueryResultSource>} */
  const mergedSources = {};

  sources.forEach((source) => {
    // check if this source can be merged
    const mergedSource = this.getMergedSource_(source, mergedSources);

    if (mergedSource === null) {
      // this source should not be merged, add as is
      allSources.push(source);
    }
  });

  for (const mergedSourceId in mergedSources) {
    allSources.push(mergedSources[mergedSourceId]);
  }

  return allSources;
};

/**
 * Check if the given source should be merged. If so, an artificial source
 * that will contain the features of all mergeable sources is returned. If not,
 * `null` is returned.
 *
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source Source.
 * @param {Object<string, import('ngeo/statemanager/WfsPermalink').QueryResultSource>} mergedSources
 *    Merged sources.
 * @returns {?import('ngeo/statemanager/WfsPermalink').QueryResultSource} A merged source of null if the
 *    source should not be merged.
 */
QueryGridController.prototype.getMergedSource_ = function (source, mergedSources) {
  let mergeSourceId = null;

  for (const currentMergeSourceId in this.options.mergeTabs || {}) {
    const sourceLabels = this.options.mergeTabs[currentMergeSourceId];
    const containsSource = sourceLabels.some((sourceLabel) => sourceLabel == source.label);
    if (containsSource) {
      mergeSourceId = currentMergeSourceId;
      break;
    }
  }

  if (mergeSourceId === null) {
    // this source should not be merged
    return null;
  }

  /** @type {boolean} */
  let newRequest = true;

  /** @type {import('ngeo/statemanager/WfsPermalink').QueryResultSource} */
  let mergeSource;
  if (mergeSourceId in mergedSources) {
    mergeSource = mergedSources[mergeSourceId];
    if (source.requestPartners) {
      newRequest = !source.requestPartners.some((label) => mergeSource.mergeComposants.includes(label));
    }
    mergeSource.mergeComposants.push(source.label);
  } else {
    mergeSource = {
      features: [],
      id: mergeSourceId,
      label: mergeSourceId,
      limit: 0, //the sum of the obtained results of the query is computed later
      pending: false,
      tooManyResults: false,
      mergeComposants: [source.label],
    };
    mergedSources[mergeSourceId] = mergeSource;
  }

  // add features of source to merge source
  source.features.forEach((feature) => {
    mergeSource.features.push(feature);
  });

  // if one of the source has too many results, the resulting merged source will
  // also be marked with `tooManyResults`.
  mergeSource.tooManyResults = mergeSource.tooManyResults || source.tooManyResults;

  // for layers called with the previous request the totalFeatureCount (available results) and the limit (obtained results)
  // are still valid
  if (newRequest) {
    if (source.totalFeatureCount !== undefined) {
      mergeSource.totalFeatureCount =
        mergeSource.totalFeatureCount !== undefined
          ? mergeSource.totalFeatureCount + source.totalFeatureCount
          : source.totalFeatureCount;
    }
    mergeSource.limit += source.limit;
  }

  return mergeSource;
};

/**
 * Collect all features in the queryResult object.
 *
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source Result source.
 */
QueryGridController.prototype.collectData_ = function (source) {
  const features = source.features;
  /** @type {Object<string, *>[]} */
  const allProperties = [];
  /** @type {string[]} */
  const featureGeometriesNames = [];
  /** @type {Object<string, import('ol/Feature').default<import('ol/geom/Geometry').default>>} */
  const featuresForSource = {};
  let properties, featureGeometryName;
  features.forEach((feature) => {
    properties = feature.getProperties();
    if (properties !== undefined) {
      // Keeps distinct geometry names to remove theme later.
      featureGeometryName = feature.getGeometryName();
      if (!featureGeometriesNames.includes(featureGeometryName)) {
        featureGeometriesNames.push(featureGeometryName);
      }

      allProperties.push(properties);
      featuresForSource[getRowUid(properties)] = feature;
    }
  });

  this.cleanProperties_(allProperties, featureGeometriesNames);
  if (allProperties.length > 0) {
    const gridCreated = this.makeGrid_(allProperties, source);
    if (gridCreated) {
      this.featuresForSources_[`${source.label}`] = featuresForSource;
    }
  }
};

/**
 * Remove all unwanted columns.
 *
 * @param {Object<string, string|number|boolean>[]} allProperties A row.
 * @param {string[]} featureGeometriesNames Geometry names.
 */
QueryGridController.prototype.cleanProperties_ = function (allProperties, featureGeometriesNames) {
  allProperties.forEach((properties) => {
    featureGeometriesNames.forEach((featureGeometryName) => {
      delete properties[featureGeometryName];
    });
    delete properties.boundedBy;
    delete properties.ngeo_feature_type_;
  });

  if (this.options.removeEmptyColumns === true) {
    this.removeEmptyColumnsFn_(allProperties);
  }
};

/**
 * Remove columns that will be completely empty between each properties.
 *
 * @param {Object<string, string|number|boolean>[]} allProperties A row.
 */
QueryGridController.prototype.removeEmptyColumnsFn_ = function (allProperties) {
  // Keep all keys that correspond to at least one value in a properties object.
  /** @type {string[]} */
  const keysToKeep = [];
  let i, key;
  for (key in allProperties[0]) {
    for (i = 0; i < allProperties.length; i++) {
      if (allProperties[i][key] !== undefined) {
        keysToKeep.push(key);
        break;
      }
    }
  }
  // Get all keys that previously always refers always to an empty value.
  let keyToRemove;
  allProperties.forEach((properties) => {
    keyToRemove = [];
    for (key in properties) {
      if (!keysToKeep.includes(key)) {
        keyToRemove.push(key);
      }
    }
    // Remove these keys.
    keyToRemove.forEach((key) => {
      delete properties[key];
    });
  });
};

/**
 * @param {?Object<string, string|number|boolean>[]} data Grid rows.
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source Query source.
 * @returns {boolean} Returns true if a grid was created.
 */
QueryGridController.prototype.makeGrid_ = function (data, source) {
  const sourceLabel = `${source.label}`;
  let gridConfig = null;
  if (data !== null) {
    gridConfig = this.getGridConfiguration_(data);
    if (gridConfig === null) {
      return false;
    }
  }
  if (!this.loadedGridSources.includes(sourceLabel)) {
    this.loadedGridSources.push(sourceLabel);
  }
  this.gridSources[sourceLabel] = {
    source: source,
  };
  if (gridConfig) {
    this.gridSources[sourceLabel].configuration = gridConfig;
  }
  return true;
};

/**
 * @param {Object<string, string|number|boolean>[]} data Grid rows.
 * @returns {?import('ngeo/grid/Config').default} Grid config.
 */
QueryGridController.prototype.getGridConfiguration_ = function (data) {
  if (!data.length) {
    throw new Error('Missing data');
  }
  const clone = {};
  Object.assign(clone, data[0]);
  // @ts-ignore
  delete clone.ol_uid;
  const columns = Object.keys(clone);

  /** @type {import('ngeo/download/Csv').GridColumnDef[]} */
  const columnDefs = [];
  columns.forEach((column) => {
    columnDefs.push(
      /** @type {import('ngeo/download/Csv').GridColumnDef} */ ({
        name: column,
      })
    );
  });

  if (columnDefs.length > 0) {
    return new ngeoGridConfig(data, columnDefs);
  } else {
    // no columns, do not show grid
    return null;
  }
};

/**
 * Get the currently shown grid source.
 *
 * @returns {GridSource|null} Grid source.
 */
QueryGridController.prototype.getActiveGridSource = function () {
  if (this.selectedTab === null) {
    return null;
  } else {
    return this.gridSources[`${this.selectedTab}`];
  }
};

/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 */
QueryGridController.prototype.clear = function () {
  this.active = false;
  panels.openFooterPanel('queryresult', {state: false, noError: true});
  this.pending = false;
  this.gridSources = {};
  this.loadedGridSources = [];
  this.selectedTab = null;
  this.tooManyResults = false;
  this.features_.clear();
  this.highlightFeatures_.clear();
  this.ngeoMapQuerent_.clear();
  this.featuresForSources_ = {};
  if (this.unregisterSelectWatcher_) {
    this.unregisterSelectWatcher_();
  }
};

/**
 * Select the tab for the given grid source.
 *
 * @param {GridSource} gridSource Grid source.
 */
QueryGridController.prototype.selectTab = function (gridSource) {
  const source = gridSource.source;
  this.selectedTab = source.label;

  if (this.unregisterSelectWatcher_) {
    this.unregisterSelectWatcher_();
    this.unregisterSelectWatcher_ = null;
  }

  if (gridSource.configuration !== undefined) {
    this.unregisterSelectWatcher_ = this.$scope_.$watchCollection(
      () => gridSource.configuration.selectedRows,
      (newSelected, oldSelectedRows) => {
        if (Object.keys(newSelected) !== Object.keys(oldSelectedRows)) {
          this.onSelectionChanged_();
        }
      }
    );
  }
  this.updateFeatures_(gridSource);

  this.reflowGrid_();
};

QueryGridController.prototype.reflowGrid_ = function () {
  // This is a "work-around" to make sure that the grid is rendered correctly.
  // When a pane is activated by setting `this.selectedTab`, the class `active`
  // is not yet set on the pane. That's why the class is set manually, and
  // after the pane is shown (in the next digest loop), the grid table can
  // be refreshed.
  const id = this.escapeValue(this.selectedTab || '');
  const activePane = this.$element_.find(`div.tab-pane#${id}`);
  activePane.removeClass('active').addClass('active');
  this.$timeout_(() => {
    activePane.find('div.ngeo-grid-table-container table').trigger('reflow');
  });
};

/**
 * Called when the row selection has changed.
 */
QueryGridController.prototype.onSelectionChanged_ = function () {
  if (this.selectedTab === null) {
    return;
  }

  const gridSource = this.gridSources[`${this.selectedTab}`];
  this.updateFeatures_(gridSource);
};

/**
 * @param {GridSource} gridSource Grid source
 */
QueryGridController.prototype.updateFeatures_ = function (gridSource) {
  this.features_.clear();
  this.highlightFeatures_.clear();

  if (!gridSource.configuration) {
    return;
  }

  const sourceLabel = `${gridSource.source.label}`;
  const featuresForSource = this.featuresForSources_[sourceLabel];
  const selectedRows = gridSource.configuration.selectedRows;

  for (const rowId in featuresForSource) {
    const feature = featuresForSource[rowId];
    if (rowId in selectedRows) {
      this.highlightFeatures_.push(feature);
    } else {
      this.features_.push(feature);
    }
  }
};

/**
 * Returns if a row of the currently active grid is selected?
 *
 * @returns {boolean} Is one selected?
 */
QueryGridController.prototype.isOneSelected = function () {
  const source = this.getActiveGridSource();
  if (source === null || source.configuration === null) {
    return false;
  } else {
    return source.configuration.getSelectedCount() > 0;
  }
};

/**
 * Returns the number of selected rows of the currently active grid.
 *
 * @returns {number} The number of selected rows.
 */
QueryGridController.prototype.getSelectedRowCount = function () {
  const source = this.getActiveGridSource();
  if (source === null || source.configuration === null) {
    return 0;
  } else {
    return source.configuration.getSelectedCount();
  }
};

/**
 * Select all rows of the currently active grid.
 */
QueryGridController.prototype.selectAll = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.selectAll();
  }
};

/**
 * Deselect all rows of the currently active grid.
 */
QueryGridController.prototype.unselectAll = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.unselectAll();
  }
};

/**
 * Invert the selection of the currently active grid.
 */
QueryGridController.prototype.invertSelection = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.invertSelection();
  }
};

/**
 * Zoom to the selected features.
 */
QueryGridController.prototype.zoomToSelection = function () {
  if (!this.map_) {
    throw new Error('Missing map');
  }
  const source = this.getActiveGridSource();
  if (source !== null) {
    const extent = olExtent.createEmpty();
    this.highlightFeatures_.forEach((feature) => {
      const geometry = feature.getGeometry();
      if (!geometry) {
        throw new Error('Missing geometry');
      }
      olExtent.extend(extent, geometry.getExtent());
    });
    const size = this.map_.getSize();
    if (!size) {
      throw new Error('Missing size');
    }
    this.map_.getView().fit(extent, {size, maxZoom: this.options.maxRecenterZoom});
  }
};

/**
 * Start a CSV download for the selected features.
 */
QueryGridController.prototype.downloadCsv = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    const columnDefs = source.configuration.columnDefs;
    if (!columnDefs) {
      throw new Error('Missing columnDefs');
    }
    const selectedRows = source.configuration.getSelectedRows();

    this.ngeoCsvDownload_.startDownload(selectedRows, columnDefs, this.filename_);
  }
};

myModule.controller('GmfDisplayquerygridController', QueryGridController);

export default myModule;
