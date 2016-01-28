goog.provide('gmf.DisplayqueriesController');
goog.provide('gmf.displayqueriesDirective');

goog.require('gmf');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ol.Collection');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


ngeoModule.value('gmfDisplayqueriesTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfDisplayqueriesTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/displayqueries.html';
    });


/**
 * Provide a "gmf display queries" directive.
 *
 * This directive displays results of the ngeoQueryResult and shows related
 * features on the map using the ngeoFeatureOverlayMgr.
 *
 * You can override the default directive's template by setting the value
 * 'gmfDisplayqueriesTemplateUrl'.
 *
 * Features displayed on the map use a default style but you can override these
 * styles by passing ol.style.Style objects as attributes of this directive.
 *
 * @example
 * <gmf-displayqueries
 *     gmf-displayqueries-featuresstyle="ctrl.styleForAllFeatures"
 *     gmf-displayqueries-selectedfeaturestyle="ctrl.styleForTheCurrentFeature">
 * </gmf-displayqueries>
 *
 * @htmlAttribute {ol.style.Style} gmf-displayqueries-featuresstyle A style
 *     object for all features from the result of the query.
 * @htmlAttribute {ol.style.Style} selectedfeaturestyle A style
 *     object for the current displayed feature.
 * @param {string} gmfDisplayqueriesTemplateUrl URL to a template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDisplayqueries
 */
gmf.displayqueriesDirective = function(gmfDisplayqueriesTemplateUrl) {
  return {
    bindToController: true,
    controller: 'GmfDisplayqueriesController',
    controllerAs: 'ctrl',
    templateUrl: gmfDisplayqueriesTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'featuresStyleFn': '&gmfDisplayqueriesFeaturesstyle',
      'selectedFeatureStyleFn': '&gmfDisplayqueriesSelectedfeaturestyle'
    }
  };
};


gmfModule.directive('gmfDisplayqueries', gmf.displayqueriesDirective);



/**
 * @param {Object} ngeoQueryResult ngeo query result FIXME.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfDisplayqueriesController
 */
gmf.DisplayqueriesController = function(ngeoQueryResult,
    ngeoFeatureOverlayMgr) {

  /**
   * @type {Object} FIXME
   * @private
   */
  this.ngeoQueryResult_ = ngeoQueryResult;

  /**
   * @type {ol.Collection}
   * @private
   */
  this.features_ = new ol.Collection();

  var featureOverlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  var featuresStyle = this['featuresStyleFn']();
  if (goog.isDef(featuresStyle)) {
    goog.asserts.assertInstanceof(featuresStyle, ol.style.Style);
    featureOverlay.setStyle(featuresStyle);
  }
  featureOverlay.setFeatures(this.features_);

  /**
   * @type {ngeo.FeatureOverlay}
   * @private
   */
  this.selectedFeatureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  var selectedFeatureStyle = this['selectedFeatureStyleFn']();
  if (goog.isDef(selectedFeatureStyle)) {
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
   * @type {boolean}
   * @export
   */
  this.open = false;

  /**
   * @type {Object}
   * @export
   */
  this.result = ngeoQueryResult;

  /**
   * @type {Object}
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
  this.currentResult = 0;

  this.show(); // FIXME (on event or on watch ?)
};


/**
 * Remove current displayed results then get new results from the
 * ngeoQueryResult sevice. Display all results on the map and display,
 * highlight the first feature.
 * @export
 */
gmf.DisplayqueriesController.prototype.show = function() {
  this.clear();
  this.setCurrentResult_(0);
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
 * @private
 */
gmf.DisplayqueriesController.prototype.setCurrentResult_ = function(position) {
  var i, source, features;
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
      break;
    }
  }
};


/**
 * Select the logical previous source and feature then highlight this feature on
 * the map.
 * @export
 */
gmf.DisplayqueriesController.prototype.previous = function() {
  var lastFeature = this.feature;
  var position = this.currentResult - 1;
  if (position < 0) {
    position = this.getResultLength() - 1;
  }
  this.setCurrentResult_(position);
  this.highlightCurrentFeature_(lastFeature);
};


/**
 * Select the logical next source and feature then highlight this feature on
 * the map.
 * @export
 */
gmf.DisplayqueriesController.prototype.next = function() {
  var lastFeature = this.feature;
  var position = this.currentResult + 1;
  var positionMax = this.getResultLength() - 1;
  if (position > positionMax) {
    position = 0;
  }
  this.setCurrentResult_(position);
  this.highlightCurrentFeature_(lastFeature);
};


/**
 * Get the total count of features in the result of the query.
 * @return {number}
 * @export
 */
gmf.DisplayqueriesController.prototype.getResultLength = function() {
  var sources = this.ngeoQueryResult_.sources;
  var sourcesLength = sources.length;
  return sourcesLength + sources[sourcesLength - 1].features.length;
};


/**
 * Collect all features in the queryResult object.
 * @private
 */
gmf.DisplayqueriesController.prototype.collectFeatures_ = function() {
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
gmf.DisplayqueriesController.prototype.highlightCurrentFeature_ = function(
    opt_lastFeature) {
  this.selectedFeatureOverlay_.clear();
  this.features_.remove(this.feature);
  this.selectedFeatureOverlay_.addFeature(this.feature);
  if (goog.isDef(opt_lastFeature)) {
    this.features_.push(opt_lastFeature);
  }
};


/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 * @export
 */
gmf.DisplayqueriesController.prototype.clear = function() {
  this.feature = null;
  this.source = null;
  this.features_.clear();
  this.selectedFeatureOverlay_.clear();
};


gmfModule.controller('GmfDisplayqueriesController',
    gmf.DisplayqueriesController);
