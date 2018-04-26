/**
 * @module gmf.profile.drawLineComponent
 */
import googAsserts from 'goog/asserts.js';
import olCollection from 'ol/Collection.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import olMap from 'ol/Map.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleStroke from 'ol/style/Stroke.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import ngeoMiscDecorate from 'ngeo/misc/decorate.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfDrawProfileLine', [
  ngeoMapFeatureOverlayMgr.module.name,
]);


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
exports.directive_ = function() {
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


exports.directive('gmfDrawprofileline',
  exports.directive_);

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
exports.Controller_ = function($scope, $element, $timeout,
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
  this.features_ = new olCollection();

  const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(this.features_);

  let style;
  const styleFn = this['getStyleFn'];
  if (styleFn) {
    style = styleFn();
    googAsserts.assertInstanceof(style, olStyleStyle);
  } else {
    style = new olStyleStyle({
      stroke: new olStyleStroke({
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
  this.interaction = new olInteractionDraw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    features: this.features_
  });

  ngeoMiscDecorate.interaction(this.interaction);

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
exports.Controller_.prototype.$onInit = function() {
  const map = this['getMapFn']();
  googAsserts.assertInstanceof(map, olMap);
  this.map_ = map;
  this.map_.addInteraction(this.interaction);
};


/**
 * Clear the overlay and profile line.
 * @private
 */
exports.Controller_.prototype.clear_ = function() {
  this.features_.clear();
  this.line = null;
};


exports.controller('GmfDrawprofilelineController',
  exports.Controller_);


export default exports;
