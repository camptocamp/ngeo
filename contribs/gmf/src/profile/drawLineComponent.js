import angular from 'angular';
import olCollection from 'ol/Collection.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import olMap from 'ol/Map.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleStroke from 'ol/style/Stroke.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import {interactionDecoration} from 'ngeo/misc/decorate.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfDrawProfileLine', [ngeoMapFeatureOverlayMgr.name]);

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
 * @htmlAttribute {import("ol/Map.js").default} gmf-drawprofileline-map The map.
 * @htmlAttribute {import("ol/geom/LineString.js").default} gmf-drawprofileline-line The variable to
 *     connect with the drawn line.
 * @htmlAttribute {boolean=} gmf-drawprofileline-active Active the component.
 * @htmlAttribute {import("ol/style/Style.js").default=} gmf-drawprofileline-style Optional style
 *     for the drawn line.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfDrawprofileline
 */
function profileDarwLineComponent() {
  return {
    scope: true,
    controller: 'GmfDrawprofilelineController as ctrl',
    restrict: 'A',
    bindToController: {
      'getMapFn': '&gmfDrawprofilelineMap',
      'line': '=gmfDrawprofilelineLine',
      'active': '=gmfDrawprofilelineActive',
      'getStyleFn': '&?gmfDrawprofilelineStyle',
    },
  };
}

module.directive('gmfDrawprofileline', profileDarwLineComponent);

/**
 * @param {!angular.IScope} $scope Scope.
 * @param {!angular.ITimeoutService} $timeout Angular timeout service.
 * @param {!import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *    manager.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfDrawprofilelineController
 */
function Controller($scope, $timeout, ngeoFeatureOverlayMgr) {
  /**
   * @type {?import("ol/geom/LineString.js").default}
   */
  this.line;

  /**
   * @type {?import("ol/Map.js").default}
   * @private
   */
  this.map_ = null;

  /**
   * @type {boolean}
   */
  this.active;

  /**
   * @type {!import("ol/Collection.js").default}
   * @private
   */
  this.features_ = new olCollection();

  const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(this.features_);

  let style;
  const styleFn = this['getStyleFn'];
  if (styleFn) {
    style = styleFn();
    console.assert(style instanceof olStyleStyle);
  } else {
    style = new olStyleStyle({
      stroke: new olStyleStroke({
        color: '#ffcc33',
        width: 2,
      }),
    });
  }
  overlay.setStyle(style);

  /**
   * @type {!import("ol/interaction/Draw.js").default}
   */
  this.interaction = new olInteractionDraw({
    type: /** @type {import("ol/geom/GeometryType.js").default} */ ('LineString'),
    features: this.features_,
  });

  interactionDecoration(this.interaction);

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
    }
  );

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
}

/**
 * Initialise the controller.
 */
Controller.prototype.$onInit = function () {
  const map = this['getMapFn']();
  console.assert(map instanceof olMap);
  this.map_ = map;
  this.map_.addInteraction(this.interaction);
};

/**
 * Clear the overlay and profile line.
 * @private
 */
Controller.prototype.clear_ = function () {
  this.features_.clear();
  this.line = null;
};

module.controller('GmfDrawprofilelineController', Controller);

export default module;
