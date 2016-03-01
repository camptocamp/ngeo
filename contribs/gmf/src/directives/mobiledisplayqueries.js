goog.provide('gmf.MobiledisplayqueriesController');
goog.provide('gmf.mobiledisplayqueriesDirective');

goog.require('gmf');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ol.Collection');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


ngeo.module.value('gmfMobiledisplayqueriesTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfMobiledisplayqueriesTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/mobiledisplayqueries.html';
    });


/**
 * Provide a "gmf mobile display queries" directive.
 *
 * This directive displays results of the ngeoQueryResult and shows related
 * features on the map using the ngeoFeatureOverlayMgr.
 *
 * You can override the default directive's template by setting the value
 * 'gmfMobiledisplayqueriesTemplateUrl'.
 *
 * Features displayed on the map use a default style but you can override these
 * styles by passing ol.style.Style objects as attributes of this directive.
 *
 * Example:
 *
 *      <gmf-mobiledisplayqueries
 *        gmf-mobiledisplayqueries-featuresstyle="ctrl.styleForAllFeatures"
 *        gmf-mobiledisplayqueries-selectedfeaturestyle="ctrl.styleForTheCurrentFeature">
 *      </gmf-mobiledisplayqueries>
 *
 * @htmlAttribute {ol.style.Style} gmf-mobiledisplayqueries-featuresstyle A style
 *     object for all features from the result of the query.
 * @htmlAttribute {ol.style.Style} selectedfeaturestyle A style
 *     object for the current displayed feature.
 * @param {string} gmfMobiledisplayqueriesTemplateUrl URL to a template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobiledisplayqueries
 */
gmf.mobiledisplayqueriesDirective = function(
    gmfMobiledisplayqueriesTemplateUrl) {
  return {
    bindToController: true,
    controller: 'GmfMobiledisplayqueriesController',
    controllerAs: 'ctrl',
    templateUrl: gmfMobiledisplayqueriesTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'featuresStyleFn': '&gmfMobiledisplayqueriesFeaturesstyle',
      'selectedFeatureStyleFn': '&gmfMobiledisplayqueriesSelectedfeaturestyle'
    }
  };
};


gmf.module.directive('gmfMobiledisplayqueries',
    gmf.mobiledisplayqueriesDirective);


/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {ngeo.QueryResult} ngeoQueryResult ngeo query result.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfMobiledisplayqueriesController
 */
gmf.MobiledisplayqueriesController = function($scope, ngeoQueryResult,
    ngeoFeatureOverlayMgr) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {ngeo.QueryResult}
   * @private
   */
  this.ngeoQueryResult_ = ngeoQueryResult;

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
  this.selectedFeatureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  var selectedFeatureStyle = this['selectedFeatureStyleFn']();
  if (selectedFeatureStyle !== undefined) {
    goog.asserts.assertInstanceof(selectedFeatureStyle, ol.style.Style);
  } else {
    var fill = new ol.style.Fill({color: [255, 0, 0, 0.6]});
    var stroke = new ol.style.Stroke({color: [255, 0, 0, 1], width: 2});
    selectedFeatureStyle = new ol.style.Style({
      fill: fill,
      image: new ol.style.Circle({fill: fill, radius: 5, stroke: stroke}),
      stroke: stroke
    });
  }
  this.selectedFeatureOverlay_.setStyle(selectedFeatureStyle);

  /**
   * @type {ngeo.QueryResultSource?}
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

  this.scope_.$watchCollection(
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
 * ngeoQueryResult sevice. Display all results on the map and display,
 * highlight the first feature.
 * @export
 */
gmf.MobiledisplayqueriesController.prototype.show = function() {
  this.clear();
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
 * @param {boolean} setHighlight True to set the highlight automatically.
 * than the length of the first source, get it in the next source. Etc.
 * @return {boolean} True if result has changed. False else.
 * @private
 */
gmf.MobiledisplayqueriesController.prototype.setCurrentResult_ = function(
    position, setHighlight) {
  var hasChanged = false;
  if (position !== this.currentResult) {
    var i, source, features;
    var lastFeature = this.feature;
    var sources = this.ngeoQueryResult_.sources;
    this.currentResult = position;
    for (i = 0; i < sources.length; i++) {
      source = sources[i];
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
gmf.MobiledisplayqueriesController.prototype.previous = function() {
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
gmf.MobiledisplayqueriesController.prototype.next = function() {
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
 * Get the total count of features in the result of the query.
 * @return {number} Total number of features.
 * @export
 */
gmf.MobiledisplayqueriesController.prototype.getResultLength = function() {
  return this.ngeoQueryResult_.total;
};


/**
 * Get the properties in the current feature.
 * @return {Object?} properties of the current feature or null.
 * @export
 */
gmf.MobiledisplayqueriesController.prototype.getFeatureValues = function() {
  return goog.isDefAndNotNull(this.feature) ?
      this.feature.getProperties() : null;
};


/**
 * Special function that's used to set the "animation" value after to set the
 * "isNext" value. The aim is to wait on Angular to add a class (corresponding
 * to "isNext") on the DOM before to set the "animation" value and do the
 * animation.
 * @param {boolean} isNext used to indicate if the user want to see the next
 * or the previopus result.
 * @private
 */
gmf.MobiledisplayqueriesController.prototype.animate_ = function(isNext) {
  this.isNext = isNext;
  this.scope_.$evalAsync(function() {
    this.animate++;
  }.bind(this));
};


/**
 * Collect all features in the queryResult object.
 * @private
 */
gmf.MobiledisplayqueriesController.prototype.collectFeatures_ = function() {
  var i, ii, features;
  var sources = this.ngeoQueryResult_.sources;
  this.features_.clear();
  for (i = 0; i < sources.length; i++) {
    features = sources[i].features;
    for (ii = 0; ii < features.length; ii++) {
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
gmf.MobiledisplayqueriesController.prototype.highlightCurrentFeature_ =
function(opt_lastFeature) {
  this.selectedFeatureOverlay_.clear();
  this.features_.remove(this.feature);
  this.selectedFeatureOverlay_.addFeature(this.feature);
  if (opt_lastFeature !== undefined) {
    this.features_.push(opt_lastFeature);
  }
};


/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 * @export
 */
gmf.MobiledisplayqueriesController.prototype.close = function() {
  this.open = false;
  this.clear();
};


/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 * @export
 */
gmf.MobiledisplayqueriesController.prototype.clear = function() {
  this.feature = null;
  this.source = null;
  this.currentResult = -1;
  this.features_.clear();
  this.selectedFeatureOverlay_.clear();
};


gmf.module.controller('GmfMobiledisplayqueriesController',
    gmf.MobiledisplayqueriesController);
