goog.provide('gmf.displayquerywindowComponent');

goog.require('gmf');
goog.require('ngeo.FeatureOverlayMgr');
/** @suppress {extraRequire} - required for `ngeoQueryResult` */
goog.require('ngeo.MapQuerent');
goog.require('ol.Collection');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


ngeo.module.value('gmfDisplayquerywindowTemplateUrl',
  /**
     * @param {!angular.JQLite} $element Element.
     * @param {!angular.Attributes} $attrs Attributes.
     * @return {string} Template.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfDisplayquerywindowTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/displayquerywindow.html`;
  });


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfDisplayquerywindowTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfDisplayquerywindowTemplateUrl($element, $attrs, gmfDisplayquerywindowTemplateUrl) {
  return gmfDisplayquerywindowTemplateUrl($element, $attrs);
}


/**
 * Provide a component to display results of the {@link ngeo.queryResult}
 * and shows related features on the map using the {@link ngeo.FeatureOverlayMgr}.
 *
 * You can override the default component's template by setting the
 * value `gmfDisplayquerywindowTemplateUrl`.
 *
 * Features displayed on the map use a default style but you can override these
 * styles by passing ol.style.Style objects as attributes of this component.
 *
 * Example:
 *
 *      <gmf-displayquerywindow
 *        gmf-displayquerywindow-featuresstyle="ctrl.styleForAllFeatures"
 *        gmf-displayquerywindow-selectedfeaturestyle="ctrl.styleForTheCurrentFeature">
 *      </gmf-displayquerywindow>
 *
 * @htmlAttribute {ol.style.Style} gmf-displayquerywindow-featuresstyle A style
 *     object for all features from the result of the query.
 * @htmlAttribute {ol.style.Style} selectedfeaturestyle A style
 *     object for the current displayed feature.
 * @htmlAttribute {boolean=} defaultcollapsed If the query result window is
 *     collapsed.
 * @htmlAttribute {boolean} desktop If the component is used in the desktop
 *     application.
 * @htmlAttribute {boolean} showunqueriedlayers If also layers, that have not
 *     been queried for the last query, should be shown in the filter.
 *
 * @ngdoc component
 * @ngname gmfDisplayquerywindow
 */
gmf.displayquerywindowComponent = {
  controller: 'GmfDisplayquerywindowController as ctrl',
  bindings: {
    'featuresStyleFn': '&gmfDisplayquerywindowFeaturesstyle',
    'selectedFeatureStyleFn': '&gmfDisplayquerywindowSelectedfeaturestyle',
    'defaultCollapsedFn': '&?gmfDisplayquerywindowDefaultcollapsed',
    'desktop': '=gmfDisplayquerywindowDesktop',
    'showUnqueriedLayers': '=gmfDisplayquerywindowShowunqueriedlayers'
  },
  templateUrl: gmfDisplayquerywindowTemplateUrl
};


gmf.module.component('gmfDisplayquerywindow', gmf.displayquerywindowComponent);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!ngeox.QueryResult} ngeoQueryResult ngeo query result.
 * @param {!ngeo.MapQuerent} ngeoMapQuerent ngeo map querent service.
 * @param {!ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDisplayquerywindowController
 */
gmf.DisplayquerywindowController = function($scope, ngeoQueryResult, ngeoMapQuerent,
  ngeoFeatureOverlayMgr) {

  /**
   * @type {boolean}
   * @export
   */
  this.desktop = false;

  /**
   * Is the window currently collapsed?
   * When used for Desktop, it is shown non-collapsed.
   * @type {boolean}
   * @export
   */
  this.collapsed = !this.desktop;

  /**
   * @type {boolean}
   * @private
   */
  this.showUnqueriedLayers_ = false;

  /**
   * Object that is used to filter the source list in the template.
   * @type {Object}
   * @export
   */
  this.sourcesFilter = {'queried': true};

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.ngeoQueryResult = {
    sources: [],
    total: 0,
    pending: false
  };

  /**
   * @type {!ngeo.MapQuerent}
   * @private
   */
  this.ngeoMapQuerent_ = ngeoMapQuerent;

  /**
   * @type {?ngeox.QueryResultSource}
   * @export
   */
  this.selectedSource = null;

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
   * @type {?ngeox.QueryResultSource}
   * @export
   */
  this.source = null;

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.feature = null;

  /**
   * @type {number}
   * @export
   */
  this.currentResult = -1;

  /**
   * @type {boolean}
   * @export
   */
  this.isNext = true;

  /**
   * @type {number}
   * @export
   */
  this.animate = 0;

  /**
   * @type {boolean}
   * @export
   */
  this.open = false;

  $scope.$watchCollection(
    () => ngeoQueryResult,
    (newQueryResult, oldQueryResult) => {
      this.updateQueryResult_(newQueryResult);
      if (newQueryResult.total > 0) {
        this.show();
      } else if (oldQueryResult !== newQueryResult) {
        this.close();
      }
    });
};

/**
 * Initialise the controller.
 */
gmf.DisplayquerywindowController.prototype.$onInit = function() {
  this.desktop = this.desktop;
  this.collapsed = this['defaultCollapsedFn'] ?
    this['defaultCollapsedFn']() === true : !this.desktop;

  this.showUnqueriedLayers_ = this['showUnqueriedLayers'] ?
    this['showUnqueriedLayers'] === true : false;

  this.sourcesFilter = this.showUnqueriedLayers_ ? {} : {'queried': true};

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
      stroke
    });
  }
  highlightFeaturesOverlay.setStyle(highlightFeatureStyle);
};


/**
 * Remove current displayed results then get new results from the
 * ngeoQueryResult service. Display all results on the map and display,
 * highlight the first feature.
 * @export
 */
gmf.DisplayquerywindowController.prototype.show = function() {
  this.clear();
  this.updateFeatures_();
};


/**
 * @private
 */
gmf.DisplayquerywindowController.prototype.updateFeatures_ = function() {
  this.setCurrentResult_(0, false);
  if (this.source !== null) {
    this.collectFeatures_();
    this.highlightCurrentFeature_();
    this.open = true;
  }
};

/**
 * Select a source and a feature depending of the given position.
 * @param {number} position The index of the feature. If the position is bigger
 * than the length of the first source, get it in the next source. Etc.
 * @param {boolean} setHighlight True to set the highlight automatically.
 * @return {boolean} True if result has changed. False else.
 * @private
 */
gmf.DisplayquerywindowController.prototype.setCurrentResult_ = function(
  position, setHighlight) {
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
      this.highlightCurrentFeature_(lastFeature);
    }
  }
  return hasChanged;
};


/**
 * Select the logical previous source and feature then highlight this feature on
 * the map.
 * @export
 */
gmf.DisplayquerywindowController.prototype.previous = function() {
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
 * @export
 */
gmf.DisplayquerywindowController.prototype.next = function() {
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
 * @param {ngeox.QueryResult} queryResult ngeo query result.
 * @private
 */
gmf.DisplayquerywindowController.prototype.updateQueryResult_ = function(queryResult) {
  this.ngeoQueryResult.total = 0;
  this.ngeoQueryResult.sources.length = 0;
  for (let i = 0; i < queryResult.sources.length; i++) {
    const source = queryResult.sources[i];
    source.features = source.features.filter((feature) => {
      goog.asserts.assert(feature);
      return !ol.obj.isEmpty(ngeo.FeatureHelper.getFilteredFeatureValues(feature));
    });
    this.ngeoQueryResult.sources.push(source);
    this.ngeoQueryResult.total += source.features.length;
  }
};

/**
 * Get the total count of features in the result of the query. If a source
 * has been select, only the number of features of that source are returned.
 * @return {number} Total number of features.
 * @export
 */
gmf.DisplayquerywindowController.prototype.getResultLength = function() {
  if (this.selectedSource === null) {
    return this.ngeoQueryResult.total;
  } else {
    return this.selectedSource.features.length;
  }
};


/**
 * @return {boolean} If the first result is active.
 * @export
 */
gmf.DisplayquerywindowController.prototype.isFirst = function() {
  return this.currentResult == 0;
};


/**
 * @return {boolean} If the last result is active.
 * @export
 */
gmf.DisplayquerywindowController.prototype.isLast = function() {
  return this.currentResult == this.getResultLength() - 1;
};


/**
 * Delete the unwanted ol3 properties from the current feature then return the
 * properties.
 * @return {Object?} Filtered properties of the current feature or null.
 * @export
 */
gmf.DisplayquerywindowController.prototype.getFeatureValues = function() {
  if (!this.feature) {
    return null;
  }
  return ngeo.FeatureHelper.getFilteredFeatureValues(this.feature);
};


/**
 * Special function that's used to set the "animation" value after to set the
 * "isNext" value. The aim is to wait on Angular to add a class (corresponding
 * to "isNext") on the DOM before to set the "animation" value and do the
 * animation.
 * @param {boolean} isNext used to indicate if the user wants to see the next
 * or the previous result.
 * @private
 */
gmf.DisplayquerywindowController.prototype.animate_ = function(isNext) {
  this.isNext = isNext;
  this.animate++;
};


/**
 * Collect all features in the queryResult object.
 * @private
 */
gmf.DisplayquerywindowController.prototype.collectFeatures_ = function() {
  const sources = this.ngeoQueryResult.sources;
  this.features_.clear();
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    if (this.selectedSource !== null && this.selectedSource !== source) {
      // when filtering on a source, only add features of the selected source
      continue;
    }
    const features = source.features;
    for (let ii = 0; ii < features.length; ii++) {
      this.features_.push(features[ii]);
    }
  }
};


/**
 * Highlight the current displayed feature.
 * @param {ol.Feature=} opt_lastFeature last highlighted feature. Require if
 * it exists because it must be added to the 'non-selected' features collection.
 * @private
 */
gmf.DisplayquerywindowController.prototype.highlightCurrentFeature_ =
function(opt_lastFeature) {
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
 * @export
 */
gmf.DisplayquerywindowController.prototype.close = function() {
  this.open = false;
  this.clear();
  this.ngeoMapQuerent_.clear();
};


/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 * @export
 */
gmf.DisplayquerywindowController.prototype.clear = function() {
  this.feature = null;
  this.source = null;
  this.currentResult = -1;
  this.features_.clear();
  this.highlightFeatures_.clear();
  this.selectedSource = null;
};


/**
 * @param {ngeox.QueryResultSource} source The source to select.
 * @export
 */
gmf.DisplayquerywindowController.prototype.setSelectedSource = function(source) {
  if (source !== null && source.features.length <= 0) {
    // sources with no results can not be selected
    return;
  }
  this.clear();
  this.selectedSource = source;
  this.updateFeatures_();
};


gmf.module.controller('GmfDisplayquerywindowController', gmf.DisplayquerywindowController);
