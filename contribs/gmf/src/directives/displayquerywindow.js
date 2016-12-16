goog.provide('gmf.DisplayquerywindowController');
goog.provide('gmf.displayquerywindowDirective');

goog.require('gmf');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ol.Collection');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


ngeo.module.value('gmfDisplayquerywindowTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfDisplayquerywindowTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/displayquerywindow.html';
    });


/**
 * Provide a directive to display results of the {@link ngeo.queryResult}
 * and shows related features on the map using the {@link ngeo.FeatureOverlayMgr}.
 *
 * You can override the default directive's template by setting the
 * value `gmfDisplayquerywindowTemplateUrl`.
 *
 * Features displayed on the map use a default style but you can override these
 * styles by passing ol.style.Style objects as attributes of this directive.
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
 * @htmlAttribute {boolean} desktop If the directive is used in the desktop
 *     application.
 * @htmlAttribute {boolean} showunqueriedlayers If also layers, that have not
 *     been queried for the last query, should be shown in the filter.
 * @param {string} gmfDisplayquerywindowTemplateUrl URL to a template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDisplayquerywindow
 */
gmf.displayquerywindowDirective = function(
    gmfDisplayquerywindowTemplateUrl) {
  return {
    bindToController: true,
    controller: 'GmfDisplayquerywindowController as ctrl',
    templateUrl: gmfDisplayquerywindowTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'featuresStyleFn': '&gmfDisplayquerywindowFeaturesstyle',
      'selectedFeatureStyleFn': '&gmfDisplayquerywindowSelectedfeaturestyle',
      'defaultCollapsedFn': '&?gmfDisplayquerywindowDefaultcollapsed',
      'desktopIn': '=gmfDisplayquerywindowDesktop',
      'showUnqueriedLayersIn': '=gmfDisplayquerywindowShowunqueriedlayers'
    }
  };
};


gmf.module.directive('gmfDisplayquerywindow', gmf.displayquerywindowDirective);


/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {ngeox.QueryResult} ngeoQueryResult ngeo query result.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper the ngeo FeatureHelper service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfDisplayquerywindowController
 */
gmf.DisplayquerywindowController = function($scope, ngeoQueryResult,
    ngeoFeatureHelper, ngeoFeatureOverlayMgr) {

  /**
   * @type {boolean}
   * @export
   */
  this.desktop = this['desktopIn'] === true;

  /**
   * Is the window currently collapsed?
   * When used for Desktop, it is shown non-collapsed.
   * @type {boolean}
   * @export
   */
  this.collapsed = this['defaultCollapsedFn'] !== undefined ?
    this['defaultCollapsedFn']() === true : !this.desktop;

  /**
   * @type {boolean}
   * @private
   */
  this.showUnqueriedLayers_ = this['showUnqueriedLayersIn'] !== undefined ?
    this['showUnqueriedLayersIn'] === true : false;

  /**
   * Object that is used to filter the source list in the template.
   * @type {Object}
   * @export
   */
  this.sourcesFilter = this.showUnqueriedLayers ? {} : {'queried': true};

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.ngeoQueryResult = ngeoQueryResult;


  /**
   * @type {ngeo.FeatureHelper}
   * @export
   */
  this.ngeoFeatureHelper_ = ngeoFeatureHelper;

  /**
   * @type {?ngeox.QueryResultSource}
   * @export
   */
  this.selectedSource = null;

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
      stroke: stroke
    });
  }
  this.highlightFeatureOverlay_.setStyle(highlightFeatureStyle);

  /**
   * @type {ngeox.QueryResultSource?}
   * @export
   */
  this.source = null;

  /**
   * @type {ol.Feature}
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
      function() {
        return ngeoQueryResult;
      },
      function(newQueryResult, oldQueryResult) {
        if (newQueryResult.total > 0) {
          this.show();
        } else if (oldQueryResult !== newQueryResult) {
          this.close();
        }
      }.bind(this));
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
  var hasChanged = false;
  if (position !== this.currentResult) {
    var i, source, features;
    var lastFeature = this.feature;
    var sources = this.ngeoQueryResult.sources;
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
  var position = this.currentResult - 1;
  if (position < 0) {
    position = this.getResultLength() - 1;
  }
  var hasChanged = this.setCurrentResult_(position, true);
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
  var position = this.currentResult + 1;
  var positionMax = this.getResultLength() - 1;
  if (position > positionMax) {
    position = 0;
  }
  var hasChanged = this.setCurrentResult_(position, true);
  if (hasChanged) {
    this.animate_(true);
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
  return this.ngeoFeatureHelper_.getFilteredFeatureValues(this.feature);
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
  var sources = this.ngeoQueryResult.sources;
  this.features_.clear();
  for (var i = 0; i < sources.length; i++) {
    var source = sources[i];
    if (this.selectedSource !== null && this.selectedSource !== source) {
      // when filtering on a source, only add features of the selected source
      continue;
    }
    var features = source.features;
    for (var ii = 0; ii < features.length; ii++) {
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
