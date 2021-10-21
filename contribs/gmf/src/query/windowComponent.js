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
import ngeoDownloadCsv from 'ngeo/download/Csv';
import ngeoDownloadService from 'ngeo/download/service';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';
import ngeoMiscFeatureHelper, {getFilteredFeatureValues} from 'ngeo/misc/FeatureHelper';

import ngeoMiscSwipe from 'ngeo/misc/swipe';

import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent';

import olCollection from 'ol/Collection';
import {isEmpty} from 'ol/obj';
import {buildStyle} from 'ngeo/options';

import 'jquery-ui/ui/widgets/resizable';
import 'ngeo/sass/jquery-ui.scss';
import 'angular-animate';
import 'angular-touch';
import 'bootstrap/js/src/collapse';
import 'bootstrap/js/src/dropdown';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfQueryWindowComponent', [
  ngeoDownloadCsv.name,
  ngeoDownloadService.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoMiscFeatureHelper.name,
  ngeoMiscSwipe.name,
  ngeoQueryMapQuerent.name,
  'ngAnimate',
  'ngTouch',
]);

myModule.config([
  '$animateProvider',
  /**
   * For performance reason, only perform animation on elements that have the
   * `gmf-animatable` css class.
   *
   * @param {angular.animate.IAnimateProvider} $animateProvider animate provider.
   */
  function ($animateProvider) {
    $animateProvider.classNameFilter(/gmf-animatable/);
  },
]);

myModule.value(
  'gmfDisplayquerywindowTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfDisplayquerywindowTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/query/windowComponent';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/query/windowComponent', require('./windowComponent.html'));
  }
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfDisplayquerywindowTemplateUrl Template
 *    function.
 * @returns {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfDisplayquerywindowTemplateUrl($element, $attrs, gmfDisplayquerywindowTemplateUrl) {
  return gmfDisplayquerywindowTemplateUrl($element, $attrs);
}

/**
 * Provide a component to display results of the {@link import('ngeo/queryResult').default}
 * and shows related features on the map using the
 * {@link import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr}.
 *
 * You can override the default component's template by setting the
 * value `gmfDisplayquerywindowTemplateUrl`.
 *
 * Features displayed on the map use a default style but you can override these
 * styles by passing ol.style.Style objects as attributes of this component.
 *
 * Example:
 *
 *      <gmf-displayquerywindow></gmf-displayquerywindow>
 *
 * @htmlAttribute {boolean} desktop If the component is used in the desktop
 *     application.
 * @ngdoc component
 * @ngname gmfDisplayquerywindow
 */
const queryWindowComponent = {
  controller: 'GmfDisplayquerywindowController as ctrl',
  bindings: {
    'draggableContainment': '<?gmfDisplayquerywindowDraggableContainment',
    'desktop': '=gmfDisplayquerywindowDesktop',
  },
  templateUrl: gmfDisplayquerywindowTemplateUrl,
};

myModule.component('gmfDisplayquerywindow', queryWindowComponent);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ngeo/query/MapQuerent').QueryResult} ngeoQueryResult ngeo query result.
 * @param {import('ngeo/query/MapQuerent').MapQuerent} ngeoMapQuerent ngeo map querent service.
 * @param {import('ngeo/download/Csv').DownloadCsvService} ngeoCsvDownload CSV download service.
 * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {import('gmf/options').gmfCsvFilename} gmfCsvFilename The CSV file name.
 * @param {import('gmf/options').gmfDisplayQueryWindowOptions} gmfDisplayQueryWindowOptions The options.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDisplayquerywindowController
 */
export function QueryWindowController(
  $element,
  $scope,
  ngeoQueryResult,
  ngeoMapQuerent,
  ngeoCsvDownload,
  ngeoFeatureOverlayMgr,
  gmfCsvFilename,
  gmfDisplayQueryWindowOptions
) {
  /**
   * @type {import('gmf/options').gmfDisplayQueryWindowOptions}
   */
  this.options = gmfDisplayQueryWindowOptions;

  /**
   * @type {Element|string}
   */
  this.draggableContainment = '';

  /**
   * @type {boolean}
   */
  this.desktop = false;

  /**
   * Is the window currently collapsed?
   * When used for Desktop, it is shown non-collapsed.
   *
   * @type {boolean}
   */
  this.collapsed = false;

  /**
   * @type {import('ngeo/query/MapQuerent').QueryResult}
   */
  this.ngeoQueryResult = {
    sources: [],
    total: 0,
    pending: false,
  };

  /**
   * @type {import('ngeo/query/MapQuerent').MapQuerent}
   */
  this.ngeoMapQuerent_ = ngeoMapQuerent;

  /**
   * @type {import('ngeo/download/Csv').DownloadCsvService}
   */
  this.ngeoCsvDownload_ = ngeoCsvDownload;

  /**
   * Filename
   *
   * @type {import('gmf/options').gmfCsvFilename}
   */
  this.filename_ = gmfCsvFilename;

  /**
   * @type {?import('ngeo/statemanager/WfsPermalink').QueryResultSource}
   */
  this.selectedSource = null;

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
   * @type {?import('ngeo/statemanager/WfsPermalink').QueryResultSource}
   */
  this.source = null;

  /**
   * @type {?import('ol/Feature').default<import('ol/geom/Geometry').default>}
   */
  this.feature = null;

  /**
   * @type {number}
   */
  this.currentResult = -1;

  /**
   * @type {boolean}
   */
  this.isNext = true;

  /**
   * @type {number}
   */
  this.animate = 0;

  /**
   * @type {boolean}
   */
  this.open = false;

  /**
   * @constant {JQuery}
   */
  this.element_ = $element;

  /**
   * @type {boolean}
   */
  this.isLoading = false;

  $scope.$watchCollection(
    () => ngeoQueryResult,
    (newQueryResult, oldQueryResult) => {
      this.isLoading = newQueryResult.pending;
      this.updateQueryResult_(newQueryResult);
      if (newQueryResult.total > 0) {
        this.show();
      } else if (oldQueryResult !== newQueryResult) {
        this.open = false;
        this.clear();
      }
    }
  );
}

/**
 * Initialise the controller.
 */
QueryWindowController.prototype.$onInit = function () {
  if (this.options.collapsed !== undefined) {
    this.collapsed = this.options.collapsed;
  }
  this.draggableContainment = this.draggableContainment || 'document';

  const featuresOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  featuresOverlay.setFeatures(this.features_);
  featuresOverlay.setStyle(buildStyle(this.options.featuresStyle));

  const highlightFeaturesOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  highlightFeaturesOverlay.setFeatures(this.highlightFeatures_);
  highlightFeaturesOverlay.setStyle(buildStyle(this.options.selectedFeatureStyle));

  const windowContainer = this.element_.find('.gmf-displayquerywindow .windowcontainer');
  if (this.desktop) {
    windowContainer.draggable({
      handle: '.header',
      containment: this.draggableContainment,
    });
    windowContainer.resizable({
      handles: 'all',
      minHeight: 240,
      minWidth: 260,
    });
  }
};

/**
 * Remove current displayed results then get new results from the
 * ngeoQueryResult service. Display all results on the map and display,
 * highlight the first feature.
 */
QueryWindowController.prototype.show = function () {
  this.clear();
  this.updateFeatures_();
};

QueryWindowController.prototype.updateFeatures_ = function () {
  this.setCurrentResult_(0, false);
  if (this.source !== null) {
    this.collectFeatures_();
    this.highlightCurrentFeature_();
    this.open = true;
  }
};

/**
 * Select a source and a feature depending of the given position.
 *
 * @param {number} position The index of the feature. If the position is bigger
 * than the length of the first source, get it in the next source. Etc.
 * @param {boolean} setHighlight True to set the highlight automatically.
 * @returns {boolean} True if result has changed. False else.
 */
QueryWindowController.prototype.setCurrentResult_ = function (position, setHighlight) {
  let hasChanged = false;
  if (position !== this.currentResult) {
    let i, source, features;
    const lastFeature = this.feature;
    const sources = this.ngeoQueryResult.sources;
    this.currentResult = position;
    for (i = 0; i < sources.length; i++) {
      source = sources[i];
      if (this.selectedSource !== null && this.selectedSource !== source) {
        // when filtering on a source, only consider features of the selected source
        continue;
      }
      features = source.features;
      if (position >= features.length) {
        position -= features.length;
      } else {
        this.source = source;
        this.feature = source.features[position];
        hasChanged = true;
        break;
      }
    }
    if (setHighlight) {
      this.highlightCurrentFeature_(lastFeature || undefined);
    }
  }
  return hasChanged;
};

/**
 * Select the logical previous source and feature then highlight this feature on
 * the map.
 */
QueryWindowController.prototype.previous = function () {
  let position = this.currentResult - 1;
  if (position < 0) {
    position = this.getResultLength() - 1;
  }
  const hasChanged = this.setCurrentResult_(position, true);
  if (hasChanged) {
    this.animate_(false);
  }
};

/**
 * Select the logical next source and feature then highlight this feature on
 * the map.
 */
QueryWindowController.prototype.next = function () {
  let position = this.currentResult + 1;
  const positionMax = this.getResultLength() - 1;
  if (position > positionMax) {
    position = 0;
  }
  const hasChanged = this.setCurrentResult_(position, true);
  if (hasChanged) {
    this.animate_(true);
  }
};

/**
 * Remove features without properties from the query result.
 *
 * @param {import('ngeo/query/MapQuerent').QueryResult} queryResult ngeo query result.
 */
QueryWindowController.prototype.updateQueryResult_ = function (queryResult) {
  this.ngeoQueryResult.total = 0;
  this.ngeoQueryResult.sources.length = 0;
  for (const source of queryResult.sources) {
    source.features = source.features.filter((feature) => {
      if (!feature) {
        throw new Error('Missing feature');
      }
      return !isEmpty(getFilteredFeatureValues(feature));
    });
    this.ngeoQueryResult.sources.push(source);
    this.ngeoQueryResult.total += source.features.length;
  }
};

/**
 * Get the total count of features in the result of the query. If a source
 * has been select, only the number of features of that source are returned.
 *
 * @returns {number} Total number of features.
 */
QueryWindowController.prototype.getResultLength = function () {
  if (this.selectedSource === null) {
    return this.ngeoQueryResult.total;
  } else {
    return this.selectedSource.features.length;
  }
};

/**
 * @returns {boolean} If the first result is active.
 */
QueryWindowController.prototype.isFirst = function () {
  return this.currentResult == 0;
};

/**
 * @returns {boolean} If the last result is active.
 */
QueryWindowController.prototype.isLast = function () {
  return this.currentResult == this.getResultLength() - 1;
};

/**
 * Delete the unwanted ol3 properties from the current feature then return the
 * properties.
 *
 * @returns {Object<string, string|number|boolean>?} Filtered properties of the current feature or null.
 */
QueryWindowController.prototype.getFeatureValues = function () {
  if (!this.feature) {
    return null;
  }
  return getFilteredFeatureValues(this.feature);
};

/**
 * Special function that's used to set the "animation" value after to set the
 * "isNext" value. The aim is to wait on Angular to add a class (corresponding
 * to "isNext") on the DOM before to set the "animation" value and do the
 * animation.
 *
 * @param {boolean} isNext used to indicate if the user wants to see the next
 * or the previous result.
 */
QueryWindowController.prototype.animate_ = function (isNext) {
  this.isNext = isNext;
  this.animate++;
};

/**
 * Collect all features in the queryResult object.
 */
QueryWindowController.prototype.collectFeatures_ = function () {
  const sources = this.ngeoQueryResult.sources;
  this.features_.clear();
  for (const source of sources) {
    if (this.selectedSource !== null && this.selectedSource !== source) {
      // when filtering on a source, only add features of the selected source
      continue;
    }
    const features = source.features;
    for (const feature of features) {
      this.features_.push(feature);
    }
  }
};

/**
 * Highlight the current displayed feature.
 *
 * @param {import('ol/Feature').default<import('ol/geom/Geometry').default>} [opt_lastFeature] last highlighted feature. Require if
 * it exists because it must be added to the 'non-selected' features collection.
 */
QueryWindowController.prototype.highlightCurrentFeature_ = function (opt_lastFeature) {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  this.highlightFeatures_.clear();
  this.features_.remove(this.feature);
  this.highlightFeatures_.push(this.feature);
  if (opt_lastFeature !== undefined) {
    this.features_.push(opt_lastFeature);
  }
};

/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 */
QueryWindowController.prototype.close = function () {
  this.open = false;
  this.clear();
  this.ngeoMapQuerent_.clear();
};

/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 */
QueryWindowController.prototype.clear = function () {
  this.feature = null;
  this.source = null;
  this.currentResult = -1;
  this.features_.clear();
  this.highlightFeatures_.clear();
  this.selectedSource = null;
};

/**
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source The source to select.
 */
QueryWindowController.prototype.setSelectedSource = function (source) {
  if (source !== null && source.features.length <= 0) {
    // sources with no results can not be selected
    return;
  }
  this.clear();
  this.selectedSource = source;
  this.updateFeatures_();
};

/**
 * Download a CSV with features of the given source.
 *
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source The source to export as csv.
 */
QueryWindowController.prototype.downloadCSV = function (source) {
  const data = this.getCSVData_(source);
  const columnDefs = this.getCSVHeaderDefinition_(data);
  if (columnDefs) {
    this.ngeoCsvDownload_.startDownload(data, columnDefs, this.filename_);
  }
};

/**
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source The source to export as csv.
 * @returns {Object<string, string|number|boolean>[]} data.
 */
QueryWindowController.prototype.getCSVData_ = function (source) {
  if (!source || source.features.length <= 0) {
    // Without source, or with sources with no results, export can't be done
    return;
  }

  // Get properties (name - value) without unwanted ol properties.
  return source.features.map((feature) => getFilteredFeatureValues(feature));
};

/**
 * @param {Object<string, string|number|boolean>[]} data where keys with at least one defined value will be used as csv column header.
 * @returns {import('ngeo/download/Csv').GridColumnDef[]} columns definitions for the CSV.
 */
QueryWindowController.prototype.getCSVHeaderDefinition_ = function (data) {
  if (!data) {
    return;
  }
  const distinctKeys = new Set();
  data.forEach((datum) => {
    // keep property name for not undefined values.
    Object.keys(datum)
      .filter((key) => datum[key] !== undefined)
      .forEach((key) => distinctKeys.add(key));
  });

  // From Set (distinct values) to array.
  /** @type {import('ngeo/download/Csv').GridColumnDef[]} */
  const columnDefs = [];
  distinctKeys.forEach((key) => columnDefs.push({name: key}));

  return columnDefs;
};

myModule.controller('GmfDisplayquerywindowController', QueryWindowController);

export default myModule;
