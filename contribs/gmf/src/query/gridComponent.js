import angular from 'angular';

import ngeoDownloadCsv from 'ngeo/download/Csv.js';

import ngeoDownloadService from 'ngeo/download/service.js';

import ngeoGridComponent from 'ngeo/grid/component.js';

import ngeoGridConfig, {getRowUid} from 'ngeo/grid/Config.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';

import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';

import olCollection from 'ol/Collection.js';
import * as olExtent from 'ol/extent.js';
import olMap from 'ol/Map.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

import 'bootstrap/js/src/dropdown.js';


/**
 * Configuration for a grid tab.
 * @typedef {Object} GridSource
 * @property {import("ngeo/grid/Config.js").default} configuration Configuration used to initialize a grid.
 * @property {import('ngeo/statemanager/WfsPermalink.js').QueryResultSource} source Results of the query
 *    source.
 */


/**
 * Configuration option for {@link import("gmf/query/gridComponent.js").default} to merge
 * grid tabs.
 *
 * E.g. `'two_wheels_park': ['velo_park', 'moto_park']}` merges the sources
 * with label `velo_park` and `moto_park` into a new source `two_wheels_park`.
 *
 * @typedef {Object<string, Array.<string>>} GridMergeTabs
 */


/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfQueryGridComponent', [
  ngeoDownloadCsv.name,
  ngeoDownloadService.name,
  ngeoGridComponent.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoQueryMapQuerent.name,
]);


module.value('gmfDisplayquerygridTemplateUrl',
  /**
   * @param {!JQuery} $element Element.
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfDisplayquerygridTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/query/gridComponent';
  }
);

module.run(/* @ngInject */ ($templateCache) => {
  // @ts-ignore: webpack
  $templateCache.put('gmf/query/gridComponent', require('./gridComponent.html'));
});


/**
 * @param {!JQuery} $element Element.
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!JQuery, !angular.IAttributes): string} gmfDisplayquerygridTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfDisplayquerygridTemplateUrl($element, $attrs, gmfDisplayquerygridTemplateUrl) {
  return gmfDisplayquerygridTemplateUrl($element, $attrs);
}


/**
 * Provides a component to display results of the {@link import("ngeo/queryResult.js").default} in a
 * grid and shows related features on the map using
 * the {@link import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr}.
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
 *      <gmf-displayquerygrid
 *        gmf-displayquerygrid-map="ctrl.map"
 *        gmf-displayquerygrid-featuresstyle="ctrl.styleForAllFeatures"
 *        gmf-displayquerygrid-selectedfeaturestyle="ctrl.styleForTheCurrentFeature">
 *      </gmf-displayquerygrid>
 *
 * @htmlAttribute {boolean} gmf-displayquerygrid-active The active state of the component.
 * @htmlAttribute {import("ol/style/Style.js").default} gmf-displayquerygrid-featuresstyle A style
 *     object for all features from the result of the query.
 * @htmlAttribute {import("ol/style/Style.js").default} gmf-displayquerygrid-selectedfeaturestyle A style
 *     object for the currently selected features.
 * @htmlAttribute {import("ol/Map.js").default} gmf-displayquerygrid-map The map.
 * @htmlAttribute {boolean?} gmf-displayquerygrid-removeemptycolumns Optional. Should
 *     empty columns be hidden? Default: `false`.
 * @htmlAttribute {number?} gmf-displayquerygrid-maxrecenterzoom Optional. Maximum
 *     zoom-level to use when zooming to selected features.
 * @htmlAttribute {GridMergeTabs?} gmf-displayquerygrid-gridmergetabs Optional.
 *     Configuration to merge grids with the same attributes into a single grid.
 *
 * @ngdoc component
 * @ngname gmfDisplayquerygrid
 */
const queryGridComponent = {
  controller: 'GmfDisplayquerygridController as ctrl',
  bindings: {
    'active': '=?gmfDisplayquerygridActive',
    'featuresStyleFn': '&gmfDisplayquerygridFeaturesstyle',
    'selectedFeatureStyleFn': '&gmfDisplayquerygridSelectedfeaturestyle',
    'getMapFn': '&gmfDisplayquerygridMap',
    'removeEmptyColumnsFn': '&?gmfDisplayquerygridRemoveemptycolumns',
    'maxResultsFn': '&?gmfDisplayquerygridMaxresults',
    'maxRecenterZoomFn': '&?gmfDisplayquerygridMaxrecenterzoom',
    'mergeTabs': '<?gmfDisplayquerygridMergetabs'
  },
  templateUrl: gmfDisplayquerygridTemplateUrl
};


module.component('gmfDisplayquerygrid', queryGridComponent);


/**
 * Controller for the query grid.
 *
 * @param {!angular.auto.IInjectorService} $injector Main injector.
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!import('ngeo/query/MapQuerent.js').QueryResult} ngeoQueryResult ngeo query result.
 * @param {!import("ngeo/query/MapQuerent.js").MapQuerent} ngeoMapQuerent ngeo map querent service.
 * @param {!import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {!angular.ITimeoutService} $timeout Angular timeout service.
 * @param {!import("ngeo/download/Csv.js").DownloadCsvService} ngeoCsvDownload CSV download service.
 * @param {!JQuery} $element Element.
 * @constructor
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDisplayquerygridController
 */
export function QueryGridController($injector, $scope, ngeoQueryResult, ngeoMapQuerent,
  ngeoFeatureOverlayMgr, $timeout, ngeoCsvDownload, $element) {

  const queryOptions = /** @type {import('ngeo/query/MapQuerent.js').QueryOptions} */ (
    $injector.has('ngeoQueryOptions') ?
      $injector.get('ngeoQueryOptions') : {});

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {!angular.ITimeoutService}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {!import('ngeo/query/MapQuerent.js').QueryResult}
   */
  this.ngeoQueryResult = ngeoQueryResult;

  /**
   * @type {!import("ngeo/query/MapQuerent.js").MapQuerent}
   * @private
   */
  this.ngeoMapQuerent_ = ngeoMapQuerent;

  /**
   * @type {!import("ngeo/download/Csv.js").DownloadCsvService}
   * @private
   */
  this.ngeoCsvDownload_ = ngeoCsvDownload;

  /**
   * @type {!JQuery}
   * @private
   */
  this.$element_ = $element;

  /**
   * @type {number}
   */
  this.maxResults = queryOptions.limit !== undefined ? queryOptions.limit : 50;

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {boolean}
   */
  this.pending = false;

  /**
   * @type {!Object.<string, GridSource>}
   */
  this.gridSources = {};

  /**
   * IDs of the grid sources in the order they were loaded.
   * @type {!Array.<string>}
   */
  this.loadedGridSources = [];

  /**
   * The id of the currently shown query source.
   * @type {string|number|null}
   */
  this.selectedTab = null;

  /**
   * @type {boolean}
   * @private
   */
  this.removeEmptyColumns_ = false;

  /**
   * @type {number|undefined}
   */
  this.maxRecenterZoom;

  /**
   * @type {!GridMergeTabs}
   */
  this.mergeTabs = {};

  /**
   * A mapping between row uid and the corresponding feature for each
   * source.
   * @type {!Object.<string, Object.<string, import("ol/Feature.js").default>>}
   * @private
   */
  this.featuresForSources_ = {};

  // Styles for displayed features (features) and selected features
  // (highlightFeatures_) (user can set both styles).
  /**
   * @type {!import("ol/Collection.js").default}
   * @private
   */
  this.features_ = new olCollection();

  /**
   * @type {!import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr}
   * @private
   */
  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;

  /**
   * @type {!import("ol/Collection.js").default}
   * @private
   */
  this.highlightFeatures_ = new olCollection();

  /**
   * Filename
   * @type {string}
   * @private
   */
  this.filename_ = $injector.has('gmfCsvFilename') ?
    $injector.get('gmfCsvFilename') : 'query-results.csv';

  /**
   * @type {import("ol/Map.js").default}
   * @private
   */
  this.map_ = null;

  // Watch the ngeo query result service.
  this.$scope_.$watchCollection(
    () => ngeoQueryResult,
    (newQueryResult, oldQueryResult) => {
      if (newQueryResult !== oldQueryResult) {
        this.updateData_();
      }
    });

  /**
   * An unregister function returned from `$scope.$watchCollection` for
   * "on-select" changes (when rows are selected/unselected).
   * @type {?function(): void}
   * @private
   */
  this.unregisterSelectWatcher_ = null;
}

/**
 * Init the controller
 */
QueryGridController.prototype.$onInit = function() {
  this.removeEmptyColumns_ = this['removeEmptyColumnsFn'] ? this['removeEmptyColumnsFn']() === true : false;
  this.maxRecenterZoom = this['maxRecenterZoomFn'] ? this['maxRecenterZoomFn']() : undefined;

  const featuresOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  featuresOverlay.setFeatures(this.features_);
  const featuresStyle = this['featuresStyleFn']();
  if (featuresStyle !== undefined) {
    console.assert(featuresStyle instanceof olStyleStyle);
    featuresOverlay.setStyle(featuresStyle);
  }

  const highlightFeaturesOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  highlightFeaturesOverlay.setFeatures(this.highlightFeatures_);
  let highlightFeatureStyle = this['selectedFeatureStyleFn']();
  if (highlightFeatureStyle !== undefined) {
    console.assert(highlightFeatureStyle instanceof olStyleStyle);
  } else {
    const fill = new olStyleFill({color: [255, 0, 0, 0.6]});
    const stroke = new olStyleStroke({color: [255, 0, 0, 1], width: 2});
    highlightFeatureStyle = new olStyleStyle({
      fill: fill,
      image: new olStyleCircle({
        fill: fill,
        radius: 5,
        stroke: stroke
      }),
      stroke: stroke,
      zIndex: 10
    });
  }
  highlightFeaturesOverlay.setStyle(highlightFeatureStyle);

  const mapFn = this['getMapFn'];
  if (mapFn) {
    const map = mapFn();
    console.assert(map instanceof olMap);
    this.map_ = map;
  }
};

/**
 * Returns a list of grid sources in the order they were loaded.
 * @return {Array.<GridSource>} Grid sources.
 */
QueryGridController.prototype.getGridSources = function() {
  return this.loadedGridSources.map(sourceLabel => this.gridSources[sourceLabel]);
};


/**
 * @private
 */
QueryGridController.prototype.updateData_ = function() {
  // close if there are no results
  if (
    (
      this.ngeoQueryResult.pending ||
      this.ngeoQueryResult.total === 0
    ) &&
    !this.hasOneWithTooManyResults_()
  ) {
    const oldActive = this.active;
    this.clear();
    if (oldActive) {
      // don't close if there are pending queries
      this.active = this.ngeoQueryResult.pending;
      this.pending = this.ngeoQueryResult.pending;
    }
    return;
  }

  this.active = true;
  this.pending = false;
  let sources = this.ngeoQueryResult.sources;
  // merge sources if requested
  if (Object.keys(this.mergeTabs).length > 0) {
    sources = this.getMergedSources_(sources);
  }

  // create grids (only for source with features or with too many results)
  sources.forEach((source) => {
    if (source.tooManyResults) {
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
    return;
  }

  // keep the first existing navigation tab open
  if (this.selectedTab === null || !((`${this.selectedTab}`) in this.gridSources)) {
    // selecting the tab is done in a timeout, because otherwise in rare cases
    // `ng-class` might set the `active` class on multiple tabs.
    this.$timeout_(() => {
      const firstSourceId = this.loadedGridSources[0];
      this.selectTab(this.gridSources[firstSourceId]);
    }, 0);
  }
};


/**
 * @private
 * @return {boolean} If one of the source has too many results.
 */
QueryGridController.prototype.hasOneWithTooManyResults_ = function() {
  return this.ngeoQueryResult.sources.some(source => source.tooManyResults);
};

/**
 * Returns the value with all symbols and spaces replaced by an underscore.
 * @param {string|number} value A value to escape.
 * @returns {string|number} value An escaped value.
 */
QueryGridController.prototype.escapeValue = function(value) {
  // Work-around for Number.isInteger() when not always getting a number ...
  if (typeof value == 'number') {
    return value;
  } else {
    const toEscape = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\ |]/g;
    if (value.match(toEscape) !== null) {
      return value.replace(toEscape, '_');
    } else {
      return value;
    }
  }
};


/**
 * Returns if the given grid source is selected?
 * @param {GridSource} gridSource Grid source.
 * @return {boolean} Is selected?
 */
QueryGridController.prototype.isSelected = function(gridSource) {
  return this.selectedTab === gridSource.source.label;
};


/**
 * Try to merge the mergable sources.
 * @param {Array.<import('ngeo/statemanager/WfsPermalink.js').QueryResultSource>} sources Sources.
 * @return {Array.<import('ngeo/statemanager/WfsPermalink.js').QueryResultSource>} The merged sources.
 * @private
 */
QueryGridController.prototype.getMergedSources_ = function(sources) {
  const allSources = [];
  /** @type {Object.<string, import('ngeo/statemanager/WfsPermalink.js').QueryResultSource>} */
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
 * @param {import('ngeo/statemanager/WfsPermalink.js').QueryResultSource} source Source.
 * @param {Object.<string, import('ngeo/statemanager/WfsPermalink.js').QueryResultSource>} mergedSources
 *    Merged sources.
 * @return {?import('ngeo/statemanager/WfsPermalink.js').QueryResultSource} A merged source of null if the
 *    source should not be merged.
 * @private
 */
QueryGridController.prototype.getMergedSource_ = function(source, mergedSources) {
  let mergeSourceId = null;

  for (const currentMergeSourceId in this.mergeTabs) {
    const sourceLabels = this.mergeTabs[currentMergeSourceId];
    const containsSource = sourceLabels.some(sourceLabel => sourceLabel == source.label);
    if (containsSource) {
      mergeSourceId = currentMergeSourceId;
      break;
    }
  }

  if (mergeSourceId === null) {
    // this source should not be merged
    return null;
  }

  /** @type {import('ngeo/statemanager/WfsPermalink.js').QueryResultSource} */
  let mergeSource;
  if (mergeSourceId in mergedSources) {
    mergeSource = mergedSources[mergeSourceId];
  } else {
    mergeSource = {
      features: [],
      id: mergeSourceId,
      label: mergeSourceId,
      limit: this.maxResults,
      pending: false,
      queried: true,
      tooManyResults: false,
      totalFeatureCount: undefined
    };
    mergedSources[mergeSourceId] = mergeSource;
  }

  // add features of source to merge source
  source.features.forEach((feature) => {
    mergeSource.features.push(feature);
  });

  // if one of the source has too many results, the resulting merged source will
  // also be marked with `tooManyResults` and will not contain any features.
  mergeSource.tooManyResults = mergeSource.tooManyResults || source.tooManyResults;
  if (mergeSource.tooManyResults) {
    mergeSource.totalFeatureCount = (mergeSource.totalFeatureCount !== undefined) ?
      mergeSource.totalFeatureCount + mergeSource.features.length : mergeSource.features.length;
    mergeSource.features = [];
  }
  if (source.totalFeatureCount !== undefined) {
    mergeSource.totalFeatureCount = (mergeSource.totalFeatureCount !== undefined) ?
      mergeSource.totalFeatureCount + source.totalFeatureCount : source.totalFeatureCount;
  }

  return mergeSource;
};


/**
 * Collect all features in the queryResult object.
 * @param {import('ngeo/statemanager/WfsPermalink.js').QueryResultSource} source Result source.
 * @private
 */
QueryGridController.prototype.collectData_ = function(source) {
  const features = source.features;
  const allProperties = [];
  const featureGeometriesNames = [];
  /** @type {Object<string, !import("ol/Feature.js").default>} */
  const featuresForSource = {};
  let properties, featureGeometryName;
  features.forEach((feature) => {
    properties = feature.getProperties();
    if (properties !== undefined) {
      // Keeps distinct geometry names to remove theme later.
      featureGeometryName = feature.getGeometryName();
      if (featureGeometriesNames.indexOf(featureGeometryName) === -1) {
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
 * @param {Array.<Object>} allProperties A row.
 * @param {Array.<string>} featureGeometriesNames Geometry names.
 * @private
 */
QueryGridController.prototype.cleanProperties_ = function(allProperties, featureGeometriesNames) {
  allProperties.forEach((properties) => {
    featureGeometriesNames.forEach((featureGeometryName) => {
      delete properties[featureGeometryName];
    });
    delete properties['boundedBy'];
    delete properties['ngeo_feature_type_'];
  });

  if (this.removeEmptyColumns_ === true) {
    this.removeEmptyColumnsFn_(allProperties);
  }
};


/**
 * Remove columns that will be completely empty between each properties.
 * @param {Array.<Object>} allProperties A row.
 * @private
 */
QueryGridController.prototype.removeEmptyColumnsFn_ = function(allProperties) {
  // Keep all keys that correspond to at least one value in a properties object.
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
      if (keysToKeep.indexOf(key) === -1) {
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
 * @param {?Array.<Object>} data Grid rows.
 * @param {import('ngeo/statemanager/WfsPermalink.js').QueryResultSource} source Query source.
 * @return {boolean} Returns true if a grid was created.
 * @private
 */
QueryGridController.prototype.makeGrid_ = function(data, source) {
  const sourceLabel = `${source.label}`;
  let gridConfig = null;
  if (data !== null) {
    gridConfig = this.getGridConfiguration_(data);
    if (gridConfig === null) {
      return false;
    }
  }
  if (this.loadedGridSources.indexOf(sourceLabel) == -1) {
    this.loadedGridSources.push(sourceLabel);
  }
  this.gridSources[sourceLabel] = {
    configuration: gridConfig,
    source: source
  };
  return true;
};


/**
 * @param {Array.<!Object>} data Grid rows.
 * @return {?import("ngeo/grid/Config.js").default} Grid config.
 * @private
 */
QueryGridController.prototype.getGridConfiguration_ = function(data) {
  console.assert(data.length > 0);
  const clone = {};
  Object.assign(clone, data[0]);
  delete clone.ol_uid;
  const columns = Object.keys(clone);

  /** @type {Array.<import('ngeo/download/Csv.js').GridColumnDef>} */
  const columnDefs = [];
  columns.forEach((column) => {
    columnDefs.push(/** @type {import('ngeo/download/Csv.js').GridColumnDef} */ ({
      name: column
    }));
  });

  if (columnDefs.length > 0) {
    return new ngeoGridConfig(data, columnDefs);
  } else {
    // no columns, do not show grid
    return null;
  }
};


/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 */
QueryGridController.prototype.clear = function() {
  this.active = false;
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
 * @param {GridSource} gridSource Grid source.
 */
QueryGridController.prototype.selectTab = function(gridSource) {
  const source = gridSource.source;
  this.selectedTab = source.label;

  if (this.unregisterSelectWatcher_) {
    this.unregisterSelectWatcher_();
    this.unregisterSelectWatcher_ = null;
  }

  if (gridSource.configuration !== null) {
    this.unregisterSelectWatcher_ = this.$scope_.$watchCollection(
      () => gridSource.configuration.selectedRows,
      (newSelected, oldSelectedRows) => {
        if (Object.keys(newSelected) !== Object.keys(oldSelectedRows)) {
          this.onSelectionChanged_();
        }
      });
  }
  this.updateFeatures_(gridSource);

  this.reflowGrid_();
};


/**
 * @private
 */
QueryGridController.prototype.reflowGrid_ = function() {
  // This is a "work-around" to make sure that the grid is rendered correctly.
  // When a pane is activated by setting `this.selectedTab`, the class `active`
  // is not yet set on the pane. That's why the class is set manually, and
  // after the pane is shown (in the next digest loop), the grid table can
  // be refreshed.
  const id = this.escapeValue(this.selectedTab || '');
  const activePane = this.$element_.find(`div.tab-pane#${id}`);
  activePane.removeClass('active').addClass('active');
  this.$timeout_(() => {
    activePane.find('div.ngeo-grid-table-container table')['trigger']('reflow');
  });
};


/**
 * Called when the row selection has changed.
 * @private
 */
QueryGridController.prototype.onSelectionChanged_ = function() {
  if (this.selectedTab === null) {
    return;
  }

  const gridSource = this.gridSources[`${this.selectedTab}`];
  this.updateFeatures_(gridSource);
};


/**
 * @param {GridSource} gridSource Grid source
 * @private
 */
QueryGridController.prototype.updateFeatures_ = function(gridSource) {
  this.features_.clear();
  this.highlightFeatures_.clear();

  if (gridSource.configuration === null) {
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
 * Get the currently shown grid source.
 * @return {GridSource|null} Grid source.
 */
QueryGridController.prototype.getActiveGridSource = function() {
  if (this.selectedTab === null) {
    return null;
  } else {
    return this.gridSources[`${this.selectedTab}`];
  }
};


/**
 * Returns if a row of the currently active grid is selected?
 * @return {boolean} Is one selected?
 */
QueryGridController.prototype.isOneSelected = function() {
  const source = this.getActiveGridSource();
  if (source === null || source.configuration === null) {
    return false;
  } else {
    return source.configuration.getSelectedCount() > 0;
  }
};


/**
 * Returns the number of selected rows of the currently active grid.
 * @return {number} The number of selected rows.
 */
QueryGridController.prototype.getSelectedRowCount = function() {
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
QueryGridController.prototype.selectAll = function() {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.selectAll();
  }
};


/**
 * Deselect all rows of the currently active grid.
 */
QueryGridController.prototype.unselectAll = function() {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.unselectAll();
  }
};


/**
 * Invert the selection of the currently active grid.
 */
QueryGridController.prototype.invertSelection = function() {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.invertSelection();
  }
};


/**
 * Zoom to the selected features.
 */
QueryGridController.prototype.zoomToSelection = function() {
  const source = this.getActiveGridSource();
  if (source !== null) {
    const extent = olExtent.createEmpty();
    this.highlightFeatures_.forEach((feature) => {
      olExtent.extend(extent, feature.getGeometry().getExtent());
    });
    const size = this.map_.getSize();
    console.assert(size !== undefined);
    const maxZoom = this.maxRecenterZoom;
    this.map_.getView().fit(extent, {size, maxZoom});
  }
};


/**
 * Start a CSV download for the selected features.
 */
QueryGridController.prototype.downloadCsv = function() {
  const source = this.getActiveGridSource();
  if (source !== null) {
    const columnDefs = source.configuration.columnDefs;
    console.assert(columnDefs !== undefined);
    const selectedRows = source.configuration.getSelectedRows();

    this.ngeoCsvDownload_.startDownload(
      selectedRows, columnDefs, this.filename_);
  }
};


module.controller('GmfDisplayquerygridController', QueryGridController);


export default module;
