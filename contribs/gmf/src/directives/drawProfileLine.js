goog.provide('gmf.DrawprofilelineController');
goog.provide('gmf.drawprofilelineDirective');

goog.require('gmf');
goog.require('ol.Collection');
goog.require('ol.geom.LineString');
goog.require('ol.interaction.Draw');
goog.require('ol.style.Style');
goog.require('ol.style.Stroke');


/**
 * Simple directive that can be put on any element. The directive listen on
 *     clicks events to allow/disallow to draw one line (and only one) on the
 *     map. Typically used to draw the line that will serve the gmf.Profile.
 *
 * Example:
 *
 *      <gmf-drawprofileline
 *        gmf-drawprofileline-map="mainCtrl.map"
 *        gmf-drawprofileline-line="mainCtrl.line"
 *      </gmf-drawprofileline>
 *
 *
 * @htmlAttribute {ol.Map} gmf-drawprofileline-map The map.
 * @htmlAttribute {ol.geom.LineString} gmf-drawprofileline-line The variable to
 *     connect with the drawed line.
 * @htmlAttribute {boolean=} gmf-drawprofileline-initialstate Optional boolean
 *     to set the draw fonction to "active" state at initialisation. By default
 *     it is inactive.
 * @htmlAttribute {ol.style.Style=} gmf-drawprofileline-style Optional style
 *     for the drawed line.
 * @return {angular.Directive} Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfDrawprofileline
 */
gmf.drawprofilelineDirective = function() {
  return {
    bindToController: true,
    controller: 'GmfDrawprofilelineController',
    controllerAs: 'ctrl',
    restrict: 'A',
    scope: {
      'getMapFn': '&gmfDrawprofilelineMap',
      'line': '=gmfDrawprofilelineLine',
      'getInitialStateFn': '&?gmfDrawprofileLineInitialstate',
      'getStyleFn': '&?gmfDrawprofilelineStyle'
    }
  };
};


gmf.module.directive('gmfDrawprofileline', gmf.drawprofilelineDirective);

/**
 * @param {!angular.Scope} $scope Scope.
 * @param {angular.JQLite} $element Element.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfDrawprofilelineController
 */
gmf.DrawprofilelineController = function($scope, $element,
    ngeoFeatureOverlayMgr) {

  /**
   * @type {ol.geom.LineString}
   * @export
   */
  this.line;

  var map = this['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = map;

  /**
   * @type {ol.Collection}
   * @private
   */
  this.features_ = new ol.Collection();

  var overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(this.features_);

  var style;
  var styleFn = this['getStyleFn'];
  if (styleFn) {
    style = styleFn();
    goog.asserts.assertInstanceof(style, ol.style.Style);
  } else {
    style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2
      })
    });
  }
  overlay.setStyle(style);

  var initialStateFn = this['getInitialStateFn'];
  var initialState = initialStateFn && initialStateFn() === true;

  /**
   * @type {ol.interaction.Draw}
   * @private
   */
  this.drawLine_ = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'LineString',
        features: this.features_
      }));

  this.map_.addInteraction(this.drawLine_);
  this.drawLine_.setActive(initialState);

  // Clear the line to draw a new one.
  this.drawLine_.on('drawstart', function() {
    this.clear_();
  }, this);

  // Update the profile with the new geometry.
  this.drawLine_.on('drawend', function(e) {
    this.line = e.feature.getGeometry();
    $scope.$digest();
  }, this);

  // Activate or deactive the draw.
  $element.on('click' , function() {
    this.toggleActive_();
  }.bind(this));
};


/**
 * Toggle activation of the draw line interaction.
 * @private
 */
gmf.DrawprofilelineController.prototype.toggleActive_ = function() {
  if (this.drawLine_.getActive()) {
    this.drawLine_.setActive(false);
    this.clear_();
  } else {
    this.drawLine_.setActive(true);
  }
};


/**
 * Clear the overlay and profile line.
 * @private
 */
gmf.DrawprofilelineController.prototype.clear_ = function() {
  this.features_.clear();
  this.line = null;
};


gmf.module.controller('GmfDrawprofilelineController',
    gmf.DrawprofilelineController);
