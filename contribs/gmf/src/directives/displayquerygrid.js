goog.provide('gmf.displayquerygridComponent');

goog.require('gmf');
goog.require('ngeo.CsvDownload');
goog.require('ngeo.GridConfig');
/** @suppress {extraRequire} */
goog.require('ngeo.gridComponent');
goog.require('ngeo.FeatureOverlayMgr');
/** @suppress {extraRequire} - required for `ngeoQueryResult` */
goog.require('ngeo.MapQuerent');
goog.require('ol.Collection');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


ngeo.module.value('gmfDisplayquerygridTemplateUrl',
  /**
     * @param {!angular.JQLite} $element Element.
     * @param {!angular.Attributes} $attrs Attributes.
     * @return {string} Template URL.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfDisplayquerygridTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/displayquerygrid.html`;
  }
);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfDisplayquerygridTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfDisplayquerygridTemplateUrl($element, $attrs, gmfDisplayquerygridTemplateUrl) {
  return gmfDisplayquerygridTemplateUrl($element, $attrs);
}


/**
 * Provides a component to display results of the {@link ngeo.queryResult} in a
 * grid and shows related features on the map using
 * the {@link ngeo.FeatureOverlayMgr}.
 *
 * You can override the default component's template by setting the
 * value `gmfDisplayquerygridTemplateUrl`.
 *
 * Features displayed on the map use a default style but you can override these
 * styles by passing ol.style.Style objects as attributes of this component.
 *
 * Note: the following ng-class need to be present in the interface <body> element to display the footer
 * when the grid is active (initially there should be the code for the profile tool):
 *      <body ng-class="{'gmf-profile-chart-active': !!profileChartActive, 'gmf-query-grid-active': !!queryGridActive}">
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
 * @htmlAttribute {ol.style.Style} gmf-displayquerygrid-featuresstyle A style
 *     object for all features from the result of the query.
 * @htmlAttribute {ol.style.Style} gmf-displayquerygrid-selectedfeaturestyle A style
 *     object for the currently selected features.
 * @htmlAttribute {ol.Map} gmf-displayquerygrid-map The map.
 * @htmlAttribute {boolean?} gmf-displayquerygrid-removeemptycolumns Optional. Should
 *     empty columns be hidden? Default: `false`.
 * @htmlAttribute {number?} gmf-displayquerygrid-maxrecenterzoom Optional. Maximum
 *     zoom-level to use when zooming to selected features.
 * @htmlAttribute {gmfx.GridMergeTabs?} gmf-displayquerygrid-gridmergetabs Optional.
 *     Configuration to merge grids with the same attributes into a single grid.
 *
 * @ngdoc component
 * @ngname gmfDisplayquerygrid
 */
gmf.displayquerygridComponent = {
  controller: 'GmfDisplayquerygridController as ctrl',
  bindings: {
    'active': '=?gmfDisplayquerygridActive',
    'featuresStyleFn': '&gmfDisplayquerygridFeaturesstyle',
    'selectedFeatureStyleFn': '&gmfDisplayquerygridSelectedfeaturestyle',
    'getMapFn': '&gmfDisplayquerygridMap',
    'removeEmptyColumnsFn': '&?gmfDisplayquerygridRemoveemptycolumns',
    'maxResultsFn': '&?gmfDisplayquerygridMaxresults',
    'maxRecenterZoomFn': '&?gmfDisplayquerygridMaxrecenterzoom',
    'mergeTabsFn': '&?gmfDisplayquerygridMergetabs'
  },
  templateUrl: gmfDisplayquerygridTemplateUrl
};


gmf.module.component('gmfDisplayquerygrid', gmf.displayquerygridComponent);


/**
 * Controller for the query grid.
 *
 * @param {!angular.$injector} $injector Main injector.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!ngeox.QueryResult} ngeoQueryResult ngeo query result.
 * @param {!ngeo.MapQuerent} ngeoMapQuerent ngeo map querent service.
 * @param {!ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {!angular.$timeout} $timeout Angular timeout service.
 * @param {!ngeo.CsvDownload} ngeoCsvDownload CSV download service.
 * @param {!angular.JQLite} $element Element.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDisplayquerygridController
 */
gmf.DisplayquerygridController = function($injector, $scope, ngeoQueryResult, ngeoMapQuerent,
  ngeoFeatureOverlayMgr, $timeout, ngeoCsvDownload, $element) {

  const queryOptions = /** @type {ngeox.QueryOptions} */ (
    $injector.has('ngeoQueryOptions') ?
      $injector.get('ngeoQueryOptions') : {});

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {!angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {!ngeox.QueryResult}
   * @export
   */
  this.ngeoQueryResult = ngeoQueryResult;

  /**
   * @type {!ngeo.MapQuerent}
   * @private
   */
  this.ngeoMapQuerent_ = ngeoMapQuerent;

  /**
   * @type {!ngeo.CsvDownload}
   * @private
   */
  this.ngeoCsvDownload_ = ngeoCsvDownload;

  /**
   * @type {!angular.JQLite}
   * @private
   */
  this.$element_ = $element;

  /**
   * @type {number}
   * @export
   */
  this.maxResults = queryOptions.limit !== undefined ? queryOptions.limit : 50;

  /**
   * @type {boolean}
   * @export
   */
  this.active = false;

  /**
   * @type {boolean}
   * @export
   */
  this.pending = false;

  /**
   * @type {!Object.<string, gmfx.GridSource>}
   * @export
   */
  this.gridSources = {};

  /**
   * IDs of the grid sources in the order they were loaded.
   * @type {!Array.<string>}
   * @export
   */
  this.loadedGridSources = [];

  /**
   * The id of the currently shown query source.
   * @type {string|number|null}
   * @export
   */
  this.selectedTab = null;

  /**
   * @type {boolean}
   * @private
   */
  this.removeEmptyColumns_ = false;

  /**
   * @type {number|undefined}
   * @export
   */
  this.maxRecenterZoom;

  /**
   * @type {!gmfx.GridMergeTabs}
   * @private
   */
  this.mergeTabs_ = {};

  /**
   * A mapping between row uid and the corresponding feature for each
   * source.
   * @type {!Object.<string, Object.<string, ol.Feature>>}
   * @private
   */
  this.featuresForSources_ = {};

  // Styles for displayed features (features) and selected features
  // (highlightFeatures_) (user can set both styles).
  /**
   * @type {!ol.Collection}
   * @private
   */
  this.features_ = new ol.Collection();

  /**
   * @type {!ngeo.FeatureOverlayMgr}
   * @private
   */
  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;

  /**
   * @type {!ol.Collection}
   * @private
   */
  this.highlightFeatures_ = new ol.Collection();

  /**
   * @type {ol.Map}
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
   * @type {?function()}
   * @private
   */
  this.unregisterSelectWatcher_ = null;
};

/**
 * Init the controller
 */
gmf.DisplayquerygridController.prototype.$onInit = function() {
  this.removeEmptyColumns_ = this['removeEmptyColumnsFn'] ? this['removeEmptyColumnsFn']() === true : false;
  this.maxRecenterZoom = this['maxRecenterZoomFn'] ? this['maxRecenterZoomFn']() : undefined;
  this.mergeTabs_ = this['mergeTabsFn'] ? this['mergeTabsFn']() : {};

  const featuresOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  featuresOverlay.setFeatures(this.features_);
  const featuresStyle = this['featuresStyleFn']();
  if (featuresStyle !== undefined) {
    goog.asserts.assertInstanceof(featuresStyle, ol.style.Style);
    featuresOverlay.setStyle(featuresStyle);
  }

  const highlightFeaturesOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  highlightFeaturesOverlay.setFeatures(this.highlightFeatures_);
  let highlightFeatureStyle = this['selectedFeatureStyleFn']();
  if (highlightFeatureStyle !== undefined) {
    goog.asserts.assertInstanceof(highlightFeatureStyle, ol.style.Style);
  } else {
    const fill = new ol.style.Fill({color: [255, 0, 0, 0.6]});
    const stroke = new ol.style.Stroke({color: [255, 0, 0, 1], width: 2});
    highlightFeatureStyle = new ol.style.Style({
      fill,
      image: new ol.style.Circle({fill, radius: 5, stroke}),
      stroke,
      zIndex: 10
    });
  }
  highlightFeaturesOverlay.setStyle(highlightFeatureStyle);

  const mapFn = this['getMapFn'];
  if (mapFn) {
    const map = mapFn();
    goog.asserts.assertInstanceof(map, ol.Map);
    this.map_ = map;
  }
};

/**
 * Returns a list of grid sources in the order they were loaded.
 * @export
 * @return {Array.<gmfx.GridSource>} Grid sources.
 */
gmf.DisplayquerygridController.prototype.getGridSources = function() {
  return this.loadedGridSources.map(sourceLabel => this.gridSources[sourceLabel]);
};


/**
 * @private
 */
gmf.DisplayquerygridController.prototype.updateData_ = function() {
  // close if there are no results
  if (this.ngeoQueryResult.total === 0 && !this.hasOneWithTooManyResults_()) {
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
  if (Object.keys(this.mergeTabs_).length > 0) {
    sources = this.getMergedSources_(sources);
  }

  // create grids (only for source with features or with too many results)
  sources.forEach((source) => {
    if (source.tooManyResults) {
      this.makeGrid_(null, source);
    } else {
      source.id = this.escapeValue_(source.id);
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
gmf.DisplayquerygridController.prototype.hasOneWithTooManyResults_ = function() {
  return this.ngeoQueryResult.sources.some(source => source.tooManyResults);
};

/**
 * Returns an escaped value.
 * @param {string|number} value A value to escape.
 * @returns {string|number} value An escaped value.
 * @private
 */
gmf.DisplayquerygridController.prototype.escapeValue_ = function(value) {
  // Work-around for Number.isInteger() when not always getting a number ...
  if (Number.isInteger(/** @type {number} */ (value))) {
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
 * @export
 * @param {gmfx.GridSource} gridSource Grid source.
 * @return {boolean} Is selected?
 */
gmf.DisplayquerygridController.prototype.isSelected = function(gridSource) {
  return this.selectedTab === gridSource.source.label;
};


/**
 * Try to merge the mergable sources.
 * @param {Array.<ngeox.QueryResultSource>} sources Sources.
 * @return {Array.<ngeox.QueryResultSource>} The merged sources.
 * @private
 */
gmf.DisplayquerygridController.prototype.getMergedSources_ = function(sources) {
  const allSources = [];
  /** @type {Object.<string, ngeox.QueryResultSource>} */
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
 * that will contain the features of all mergable sources is returned. If not,
 * `null` is returned.
 * @param {ngeox.QueryResultSource} source Source.
 * @param {Object.<string, ngeox.QueryResultSource>} mergedSources Merged sources.
 * @return {?ngeox.QueryResultSource} A merged source of null if the source should
 *    not be merged.
 * @private
 */
gmf.DisplayquerygridController.prototype.getMergedSource_ = function(source, mergedSources) {
  let mergeSourceId = null;

  for (const currentMergeSourceId in this.mergeTabs_) {
    const sourceLabels = this.mergeTabs_[currentMergeSourceId];
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

  /** @type {ngeox.QueryResultSource} */
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
 * @param {ngeox.QueryResultSource} source Result source.
 * @private
 */
gmf.DisplayquerygridController.prototype.collectData_ = function(source) {
  const features = source.features;
  const allProperties = [];
  const featureGeometriesNames = [];
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
      featuresForSource[ngeo.GridConfig.getRowUid(properties)] = feature;
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
gmf.DisplayquerygridController.prototype.cleanProperties_ = function(
  allProperties, featureGeometriesNames) {
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
gmf.DisplayquerygridController.prototype.removeEmptyColumnsFn_ = function(
  allProperties) {
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
 * @param {ngeox.QueryResultSource} source Query source.
 * @return {boolean} Returns true if a grid was created.
 * @private
 */
gmf.DisplayquerygridController.prototype.makeGrid_ = function(data, source) {
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
    source
  };
  return true;
};


/**
 * @param {Array.<!Object>} data Grid rows.
 * @return {?ngeo.GridConfig} Grid config.
 * @private
 */
gmf.DisplayquerygridController.prototype.getGridConfiguration_ = function(
  data) {
  goog.asserts.assert(data.length > 0);
  const clone = {};
  Object.assign(clone, data[0]);
  delete clone.ol_uid;
  const columns = Object.keys(clone);

  /** @type {Array.<ngeox.GridColumnDef>} */
  const columnDefs = [];
  columns.forEach((column) => {
    columnDefs.push(/** @type {ngeox.GridColumnDef} */ ({
      name: column
    }));
  });

  if (columnDefs.length > 0) {
    return new ngeo.GridConfig(data, columnDefs);
  } else {
    // no columns, do not show grid
    return null;
  }
};


/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 * @export
 */
gmf.DisplayquerygridController.prototype.clear = function() {
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
 * @param {gmfx.GridSource} gridSource Grid source.
 * @export
 */
gmf.DisplayquerygridController.prototype.selectTab = function(gridSource) {
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

  this.reflowGrid_(source.id);
};


/**
 * @private
 * @param {string|number} sourceId Id of the source that should be refreshed.
 */
gmf.DisplayquerygridController.prototype.reflowGrid_ = function(sourceId) {
  // This is a "work-around" to make sure that the grid is rendered correctly.
  // When a pane is activated by setting `this.selectedTab`, the class `active`
  // is not yet set on the pane. That's why the class is set manually, and
  // after the pane is shown (in the next digest loop), the grid table can
  // be refreshed.
  const activePane = this.$element_.find(`div.tab-pane#${sourceId}`);
  activePane.removeClass('active').addClass('active');
  this.$timeout_(() => {
    activePane.find('div.ngeo-grid-table-container table')['trigger']('reflow');
  });
};


/**
 * Called when the row selection has changed.
 * @private
 */
gmf.DisplayquerygridController.prototype.onSelectionChanged_ = function() {
  if (this.selectedTab === null) {
    return;
  }

  const gridSource = this.gridSources[`${this.selectedTab}`];
  this.updateFeatures_(gridSource);
};


/**
 * @param {gmfx.GridSource} gridSource Grid source
 * @private
 */
gmf.DisplayquerygridController.prototype.updateFeatures_ = function(gridSource) {
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
 * @export
 * @return {gmfx.GridSource|null} Grid source.
 */
gmf.DisplayquerygridController.prototype.getActiveGridSource = function() {
  if (this.selectedTab === null) {
    return null;
  } else {
    return this.gridSources[`${this.selectedTab}`];
  }
};


/**
 * Returns if a row of the currently active grid is selected?
 * @export
 * @return {boolean} Is one selected?
 */
gmf.DisplayquerygridController.prototype.isOneSelected = function() {
  const source = this.getActiveGridSource();
  if (source === null || source.configuration === null) {
    return false;
  } else {
    return source.configuration.getSelectedCount() > 0;
  }
};


/**
 * Returns the number of selected rows of the currently active grid.
 * @export
 * @return {number} The number of selected rows.
 */
gmf.DisplayquerygridController.prototype.getSelectedRowCount = function() {
  const source = this.getActiveGridSource();
  if (source === null || source.configuration === null) {
    return 0;
  } else {
    return source.configuration.getSelectedCount();
  }
};


/**
 * Select all rows of the currently active grid.
 * @export
 */
gmf.DisplayquerygridController.prototype.selectAll = function() {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.selectAll();
  }
};


/**
 * Unselect all rows of the currently active grid.
 * @export
 */
gmf.DisplayquerygridController.prototype.unselectAll = function() {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.unselectAll();
  }
};


/**
 * Invert the selection of the currently active grid.
 * @export
 */
gmf.DisplayquerygridController.prototype.invertSelection = function() {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.invertSelection();
  }
};


/**
 * Zoom to the selected features.
 * @export
 */
gmf.DisplayquerygridController.prototype.zoomToSelection = function() {
  const source = this.getActiveGridSource();
  if (source !== null) {
    const extent = ol.extent.createEmpty();
    this.highlightFeatures_.forEach((feature) => {
      ol.extent.extend(extent, feature.getGeometry().getExtent());
    });
    const size = this.map_.getSize();
    goog.asserts.assert(size !== undefined);
    const maxZoom = this.maxRecenterZoom;
    this.map_.getView().fit(extent, {size, maxZoom});
  }
};


/**
 * Start a CSV download for the selected features.
 * @export
 */
gmf.DisplayquerygridController.prototype.downloadCsv = function() {
  const source = this.getActiveGridSource();
  if (source !== null) {
    const columnDefs = source.configuration.columnDefs;
    goog.asserts.assert(columnDefs !== undefined);
    const selectedRows = source.configuration.getSelectedRows();

    this.ngeoCsvDownload_.startDownload(
      selectedRows, columnDefs, 'query-results.csv');
  }
};


gmf.module.controller('GmfDisplayquerygridController',
  gmf.DisplayquerygridController);
