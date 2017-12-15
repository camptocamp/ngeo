goog.provide('gmf.drawprofilelineDirective');

goog.require('gmf');
goog.require('ol.Collection');
goog.require('ol.geom.LineString');
goog.require('ol.interaction.Draw');
goog.require('ol.style.Style');
goog.require('ol.style.Stroke');
goog.require('ngeo.DecorateInteraction');

goog.require('ngeo.map.FeatureOverlayMgr');


// In the future module declaration, don't forget to require:
// - ngeo.map.FeatureOverlayMgr.module.name


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
gmf.drawprofilelineDirective = function() {
  return {
    scope: true,
    controller: 'GmfDrawprofilelineController as ctrl',
    restrict: 'A',
    bindToController: {
      'getMapFn': '&gmfDrawprofilelineMap',
      'line': '=gmfDrawprofilelineLine',
      'active': '=gmfDrawprofilelineActive',
      'getStyleFn': '&?gmfDrawprofilelineStyle'
    },
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {gmf.ContextualdataController} controller Controller.
     */
    link: (scope, element, attrs, controller) => {
      controller.init();
    }
  };
};


gmf.module.directive('gmfDrawprofileline', gmf.drawprofilelineDirective);

/**
 * @param {!angular.Scope} $scope Scope.
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.$timeout} $timeout Angular timeout service.
 * @param {!ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @param {!ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname gmfDrawprofilelineController
 */
gmf.DrawprofilelineController = function($scope, $element, $timeout,
  ngeoFeatureOverlayMgr, ngeoDecorateInteraction) {

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

  ngeoDecorateInteraction(this.interaction);

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
gmf.DrawprofilelineController.prototype.init = function() {
  const map = this['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);
  this.map_ = map;
  this.map_.addInteraction(this.interaction);
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
