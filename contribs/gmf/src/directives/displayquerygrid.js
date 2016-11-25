goog.provide('gmf.DisplayquerygridController');
goog.provide('gmf.displayquerygridDirective');

goog.require('gmf');
goog.require('ngeo.CsvDownload');
goog.require('ngeo.GridConfig');
/** @suppress {extraRequire} */
goog.require('ngeo.gridDirective');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ol.Collection');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


ngeo.module.value('gmfDisplayquerygridTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfDisplayquerygridTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/displayquerygrid.html';
    });


/**
 * Provides a directive to display results of the {@link ngeo.queryResult} in a
 * grid and shows related features on the map using
 * the {@link ngeo.FeatureOverlayMgr}.
 *
 * You can override the default directive's template by setting the
 * value `gmfDisplayquerygridTemplateUrl`.
 *
 * Features displayed on the map use a default style but you can override these
 * styles by passing ol.style.Style objects as attributes of this directive.
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
 * @htmlAttribute {gmfx.GridMergeTabs?} gmf-displayquerygrid-gridmergetabas Optional.
 *     Configuration to merge grids with the same attributes into a single grid.
 * @param {string} gmfDisplayquerygridTemplateUrl URL to a template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDisplayquerygrid
 */
gmf.displayquerygridDirective = function(
    gmfDisplayquerygridTemplateUrl) {
  return {
    bindToController: true,
    controller: 'GmfDisplayquerygridController',
    controllerAs: 'ctrl',
    templateUrl: gmfDisplayquerygridTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'active': '=gmfDisplayquerygridActive',
      'featuresStyleFn': '&gmfDisplayquerygridFeaturesstyle',
      'selectedFeatureStyleFn': '&gmfDisplayquerygridSourceselectedfeaturestyle',
      'getMapFn': '&gmfDisplayquerygridMap',
      'removeEmptyColumnsFn': '&?gmfDisplayquerygridRemoveemptycolumns',
      'maxResultsFn': '&?gmfDisplayquerygridMaxresults',
      'maxRecenterZoomFn': '&?gmfDisplayquerygridMaxrecenterzoom',
      'mergeTabsFn': '&?gmfDisplayquerygridMergetabs'
    }
  };
};


gmf.module.directive('gmfDisplayquerygrid', gmf.displayquerygridDirective);


/**
 * Controller for the query grid.
 *
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeox.QueryResult} ngeoQueryResult ngeo query result.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {ngeo.CsvDownload} ngeoCsvDownload CSV download service.
 * @param {ngeo.Query} ngeoQuery Query service.
 * @param {angular.JQLite} $element Element.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfDisplayquerygridController
 */
gmf.DisplayquerygridController = function($scope, ngeoQueryResult,
    ngeoFeatureOverlayMgr, $timeout, ngeoCsvDownload, ngeoQuery, $element) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.ngeoQueryResult = ngeoQueryResult;

  /**
   * @type {ngeo.CsvDownload}
   * @private
   */
  this.ngeoCsvDownload_ = ngeoCsvDownload;

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.$element_ = $element;

  /**
   * @type {number}
   * @export
   */
  this.maxResults = ngeoQuery.getLimit();

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
   * @type {Array.<string>}
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
  this.removeEmptyColumns_ = this['removeEmptyColumnsFn'] ?
      this['removeEmptyColumnsFn']() === true : false;

  /**
   * @type {number|undefined}
   * @export
   */
  this.maxRecenterZoom = this['maxRecenterZoomFn'] ? this['maxRecenterZoomFn']() : undefined;

  var mergeTabs = this['mergeTabsFn'] ? this['mergeTabsFn']() : {};
  /**
   * @type {!gmfx.GridMergeTabs}
   * @private
   */
  this.mergeTabs_ = mergeTabs ? mergeTabs : {};

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
   * @type {ol.Collection}
   * @private
   */
  this.features_ = new ol.Collection();

  var featuresOverlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  var featuresStyle = this['featuresStyleFn']();
  if (featuresStyle !== undefined) {
    goog.asserts.assertInstanceof(featuresStyle, ol.style.Style);
    featuresOverlay.setStyle(featuresStyle);
  }
  featuresOverlay.setFeatures(this.features_);

  /**
   * @type {ngeo.FeatureOverlay}
   * @private
   */
  this.highlightFeatureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  /**
   * @type {ol.Collection}
   * @private
   */
  this.highlightFeatures_ = new ol.Collection();
  this.highlightFeatureOverlay_.setFeatures(this.highlightFeatures_);

  var highlightFeatureStyle = this['selectedFeatureStyleFn']();
  if (highlightFeatureStyle !== undefined) {
    goog.asserts.assertInstanceof(highlightFeatureStyle, ol.style.Style);
  } else {
    var fill = new ol.style.Fill({color: [255, 0, 0, 0.6]});
    var stroke = new ol.style.Stroke({color: [255, 0, 0, 1], width: 2});
    highlightFeatureStyle = new ol.style.Style({
      fill: fill,
      image: new ol.style.Circle({fill: fill, radius: 5, stroke: stroke}),
      stroke: stroke,
      zIndex: 10
    });
  }
  this.highlightFeatureOverlay_.setStyle(highlightFeatureStyle);

  var map = null;
  var mapFn = this['getMapFn'];
  if (mapFn) {
    map = mapFn();
    goog.asserts.assertInstanceof(map, ol.Map);
  }

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = map;

  // Watch the ngeo query result service.
  this.$scope_.$watchCollection(
      function() {
        return ngeoQueryResult;
      },
      function(newQueryResult, oldQueryResult) {
        if (newQueryResult !== oldQueryResult) {
          this.updateData_();
        }
      }.bind(this));

  /**
   * An unregister function returned from `$scope.$watchCollection` for
   * "on-select" changes (when rows are selected/unselected).
   * @type {?function()}
   * @private
   */
  this.unregisterSelectWatcher_ = null;
};


/**
 * Returns a list of grid sources in the order they were loaded.
 * @export
 * @return {Array.<gmfx.GridSource>} Grid sources.
 */
gmf.DisplayquerygridController.prototype.getGridSources = function() {
  return this.loadedGridSources.map(function(sourceId) {
    return this.gridSources[sourceId];
  }.bind(this));
};


/**
 * @private
 */
gmf.DisplayquerygridController.prototype.updateData_ = function() {
  // close if there are no results
  if (this.ngeoQueryResult.total === 0 && !this.hasOneWithTooManyResults_()) {
    var oldActive = this.active;
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
  var sources = this.ngeoQueryResult.sources;
  // merge sources if requested
  if (Object.keys(this.mergeTabs_).length > 0) {
    sources = this.getMergedSources_(sources);
  }

  // create grids (only for source with features or with too many results)
  sources.forEach(function(source) {
    if (source.tooManyResults) {
      this.makeGrid_(null, source);
    } else {
      var features = source.features;
      if (features.length > 0) {
        this.collectData_(source);
      }
    }
  }.bind(this));

  if (this.loadedGridSources.length == 0) {
    // if no grids were created, do not show
    this.active = false;
    return;
  }

  // keep the first existing navigation tab open
  if (this.selectedTab === null || !(('' + this.selectedTab) in this.gridSources)) {
    // selecting the tab is done in a timeout, because otherwise in rare cases
    // `ng-class` might set the `active` class on multiple tabs.
    this.$timeout_(function() {
      var firstSourceId = this.loadedGridSources[0];
      this.selectTab(this.gridSources[firstSourceId]);
      this.reflowGrid_(firstSourceId);
    }.bind(this), 0);
  }
};


/**
 * @private
 * @return {boolean} If one of the source has too many results.
 */
gmf.DisplayquerygridController.prototype.hasOneWithTooManyResults_ = function() {
  return this.ngeoQueryResult.sources.some(function(source) {
    return source.tooManyResults;
  });
};


/**
 * Returns if the given grid source is selected?
 * @export
 * @param {gmfx.GridSource} gridSource Grid source.
 * @return {boolean} Is selected?
 */
gmf.DisplayquerygridController.prototype.isSelected = function(gridSource) {
  return this.selectedTab === gridSource.source.id;
};


/**
 * Try to merge the mergable sources.
 * @param {Array.<ngeox.QueryResultSource>} sources Sources.
 * @return {Array.<ngeox.QueryResultSource>} The merged sources.
 * @private
 */
gmf.DisplayquerygridController.prototype.getMergedSources_ = function(sources) {
  var allSources = [];
  /** @type {Object.<string, ngeox.QueryResultSource>} */
  var mergedSources = {};

  sources.forEach(function(source) {
    // check if this source can be merged
    var mergedSource = this.getMergedSource_(source, mergedSources);

    if (mergedSource === null) {
      // this source should not be merged, add as is
      allSources.push(source);
    }
  }.bind(this));

  for (var mergedSourceId in mergedSources) {
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
  var mergeSourceId = null;

  for (var currentMergeSourceId in this.mergeTabs_) {
    var sourceIds = this.mergeTabs_[currentMergeSourceId];
    var containsSource = sourceIds.some(function(sourceId) {
      return sourceId == source.id;
    });
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
  var mergeSource;
  if (mergeSourceId in mergedSources) {
    mergeSource = mergedSources[mergeSourceId];
  } else {
    mergeSource = {
      features: [],
      id: mergeSourceId,
      label: mergeSourceId,
      pending: false,
      queried: true,
      tooManyResults: false,
      totalFeatureCount: undefined
    };
    mergedSources[mergeSourceId] = mergeSource;
  }

  // add features of source to merge source
  source.features.forEach(function(feature) {
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
  var features = source.features;
  var allProperties = [];
  var featureGeometriesNames = [];
  var featuresForSource = {};
  var properties, featureGeometryName;
  features.forEach(function(feature) {
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
  }.bind(this));

  this.cleanProperties_(allProperties, featureGeometriesNames);
  if (allProperties.length > 0) {
    var gridCreated = this.makeGrid_(allProperties, source);
    if (gridCreated) {
      this.featuresForSources_['' + source.id] = featuresForSource;
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
  allProperties.forEach(function(properties) {
    featureGeometriesNames.forEach(function(featureGeometryName) {
      delete properties[featureGeometryName];
    });
    delete properties['boundedBy'];
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
  var keysToKeep = [];
  var i, key;
  for (key in allProperties[0]) {
    for (i = 0; i < allProperties.length; i++) {
      if (allProperties[i][key] !== undefined) {
        keysToKeep.push(key);
        break;
      }
    }
  }
  // Get all keys that previously always refers always to an empty value.
  var keyToRemove;
  allProperties.forEach(function(properties) {
    keyToRemove = [];
    for (key in properties) {
      if (keysToKeep.indexOf(key) === -1) {
        keyToRemove.push(key);
      }
    }
    // Remove these keys.
    keyToRemove.forEach(function(key) {
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
  var sourceId = '' + source.id;
  var gridConfig = null;
  if (data !== null) {
    gridConfig = this.getGridConfiguration_(data);
    if (gridConfig === null) {
      return false;
    }
  }
  if (this.loadedGridSources.indexOf(sourceId) == -1) {
    this.loadedGridSources.push(sourceId);
  }
  this.gridSources[sourceId] = {
    configuration: gridConfig,
    source: source
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
  var columns = Object.keys(data[0]);

  /** @type {Array.<ngeox.GridColumnDef>} */
  var columnDefs = [];
  columns.forEach(function(column) {
    if (column !== 'ol_uid') {
      columnDefs.push(/** @type {ngeox.GridColumnDef} */ ({
        name: column
      }));
    }
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
  var source = gridSource.source;
  this.selectedTab = source.id;

  if (this.unregisterSelectWatcher_) {
    this.unregisterSelectWatcher_();
    this.unregisterSelectWatcher_ = null;
  }

  if (gridSource.configuration !== null) {
    this.unregisterSelectWatcher_ = this.$scope_.$watchCollection(
        function() {
          return gridSource.configuration.selectedRows;
        },
        function(newSelected, oldSelectedRows) {
          if (Object.keys(newSelected) !== Object.keys(oldSelectedRows)) {
            this.onSelectionChanged_();
          }
        }.bind(this));
  }
  this.updateFeatures_(gridSource);
};


/**
 * @private
 * @param {string|number} sourceId Id of the source that should be refreshed.
 */
gmf.DisplayquerygridController.prototype.reflowGrid_ = function(sourceId) {
  // this is a "work-around" to make sure that the grid is rendered correctly.
  // when a pane is activated by setting `this.selectedTab`, the class `active`
  // is not yet set on the pane. that's why the class is set manually, and
  // after the pane is shown (in the next digest loop), the grid table can
  // be refreshed.
  var activePane = this.$element_.find('div.tab-pane#' + sourceId);
  activePane.removeClass('active').addClass('active');
  this.$timeout_(function() {
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

  var gridSource = this.gridSources['' + this.selectedTab];
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

  var sourceId = '' + gridSource.source.id;
  var featuresForSource = this.featuresForSources_[sourceId];
  var selectedRows = gridSource.configuration.selectedRows;

  for (var rowId in featuresForSource) {
    var feature = featuresForSource[rowId];
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
    return this.gridSources['' + this.selectedTab];
  }
};


/**
 * Returns if a row of the currently active grid is selected?
 * @export
 * @return {boolean} Is one selected?
 */
gmf.DisplayquerygridController.prototype.isOneSelected = function() {
  var source = this.getActiveGridSource();
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
  var source = this.getActiveGridSource();
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
  var source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.selectAll();
  }
};


/**
 * Unselect all rows of the currently active grid.
 * @export
 */
gmf.DisplayquerygridController.prototype.unselectAll = function() {
  var source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.unselectAll();
  }
};


/**
 * Invert the selection of the currently active grid.
 * @export
 */
gmf.DisplayquerygridController.prototype.invertSelection = function() {
  var source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.invertSelection();
  }
};


/**
 * Zoom to the selected features.
 * @export
 */
gmf.DisplayquerygridController.prototype.zoomToSelection = function() {
  var source = this.getActiveGridSource();
  if (source !== null) {
    var extent = ol.extent.createEmpty();
    this.highlightFeatures_.forEach(function(feature) {
      ol.extent.extend(extent, feature.getGeometry().getExtent());
    });
    var mapSize = this.map_.getSize();
    goog.asserts.assert(mapSize !== undefined);
    this.map_.getView().fit(extent, mapSize, {maxZoom: this.maxRecenterZoom});
  }
};


/**
 * Start a CSV download for the selected features.
 * @export
 */
gmf.DisplayquerygridController.prototype.downloadCsv = function() {
  var source = this.getActiveGridSource();
  if (source !== null) {
    var columnDefs = source.configuration.columnDefs;
    goog.asserts.assert(columnDefs !== undefined);
    var selectedRows = source.configuration.getSelectedRows();

    this.ngeoCsvDownload_.startDownload(
        selectedRows, columnDefs, 'query-results');
  }
};


gmf.module.controller('GmfDisplayquerygridController',
    gmf.DisplayquerygridController);
