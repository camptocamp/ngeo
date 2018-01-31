goog.provide('gmf.profile.drawLineComponent');

goog.require('gmf');
goog.require('goog.asserts');
goog.require('ol.Collection');
goog.require('ol.interaction.Draw');
goog.require('ol.Map');
goog.require('ol.style.Style');
goog.require('ol.style.Stroke');
goog.require('ngeo.map.FeatureOverlayMgr');
goog.require('ngeo.misc.decorate');


/**
 * @type {!angular.Module}
 */
gmf.profile.drawLineComponent = angular.module('gmfDrawProfileLine', [
  ngeo.map.FeatureOverlayMgr.module.name,
]);

gmf.module.requires.push(gmf.profile.drawLineComponent.name);


/**
 * Simple directive that can be put on any element. The directive listen on
 * clicks events to allow/disallow to draw one line (and only one) on the
 * map. Typically used to draw the line that will serve the gmf.Profile.
 *
 * Example:
 *
 *      <gmf-drawprofileline
 *        gmf-drawprofileline-active="mainCtrl.drawProfileActive"
 *        gmf-drawprofileline-map="mainCtrl.map"
 *        gmf-drawprofileline-line="mainCtrl.line"
 *      </gmf-drawprofileline>
 *
 *
 * @htmlAttribute {ol.Map} gmf-drawprofileline-map The map.
 * @htmlAttribute {ol.geom.LineString} gmf-drawprofileline-line The variable to
 *     connect with the drawed line.
 * @htmlAttribute {boolean=} gmf-drawprofileline-active Active the component.
 * @htmlAttribute {ol.style.Style=} gmf-drawprofileline-style Optional style
 *     for the drawed line.
 * @return {angular.Directive} Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfDrawprofileline
 */
gmf.profile.drawLineComponent.directive_ = function() {
  return {
    scope: true,
    controller: 'GmfDrawprofilelineController as ctrl',
    restrict: 'A',
    bindToController: {
      'getMapFn': '&gmfDrawprofilelineMap',
      'line': '=gmfDrawprofilelineLine',
      'active': '=gmfDrawprofilelineActive',
      'getStyleFn': '&?gmfDrawprofilelineStyle'
    }
  };
};


gmf.profile.drawLineComponent.directive('gmfDrawprofileline',
  gmf.profile.drawLineComponent.directive_);

/**
 * @param {!angular.Scope} $scope Scope.
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.$timeout} $timeout Angular timeout service.
 * @param {!ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname gmfDrawprofilelineController
 */
gmf.profile.drawLineComponent.Controller_ = function($scope, $element, $timeout,
  ngeoFeatureOverlayMgr) {

  /**
   * @type {?ol.geom.LineString}
   * @export
   */
  this.line;

  /**
   * @type {?ol.Map}
   * @private
   */
  this.map_ = null;


  /**
   * @type {boolean}
   * @export
   */
  this.active;

  /**
   * @type {!ol.Collection}
   * @private
   */
  this.features_ = new ol.Collection();

  const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(this.features_);

  let style;
  const styleFn = this['getStyleFn'];
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

  /**
   * @type {!ol.interaction.Draw}
   * @export
   */
  this.interaction = new ol.interaction.Draw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    features: this.features_
  });

  ngeo.misc.decorate.interaction(this.interaction);

  // Clear the line as soon as the interaction is activated.
  this.interaction.on('change:active', () => {
    if (this.interaction.getActive()) {
      this.clear_();
    }
  });

  // Update the profile with the new geometry.
  this.interaction.on('drawend', (event) => {
    this.line = event.feature.getGeometry();
    // using timeout to prevent double click to zoom the map
    $timeout(() => {
      this.interaction.setActive(false);
    }, 0);
  });

  // Line may be removed from an other component
  // for example closing the chart panel
  $scope.$watch(
    () => this.line,
    (newLine, oldLine) => {
      if (newLine === null) {
        this.clear_();
      }
    });

  $scope.$watch(
    () => this.active,
    (newValue) => {
      if (newValue === false) {
        this.clear_();
      }
      // Will activate the interaction automatically the first time
      this.interaction.setActive(this.active);
    }
  );
};


/**
 * Initialise the controller.
 */
gmf.profile.drawLineComponent.Controller_.prototype.$onInit = function() {
  const map = this['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);
  this.map_ = map;
  this.map_.addInteraction(this.interaction);
};


/**
 * Clear the overlay and profile line.
 * @private
 */
gmf.profile.drawLineComponent.Controller_.prototype.clear_ = function() {
  this.features_.clear();
  this.line = null;
};


gmf.profile.drawLineComponent.controller('GmfDrawprofilelineController',
  gmf.profile.drawLineComponent.Controller_);
