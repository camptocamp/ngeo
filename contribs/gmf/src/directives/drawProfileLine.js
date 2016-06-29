goog.provide('gmf.DrawprofilelineController');
goog.provide('gmf.drawprofilelineDirective');

goog.require('gmf');
goog.require('ol.Collection');
goog.require('ol.geom.LineString');
goog.require('ol.interaction.Draw');
goog.require('ol.style.Style');
goog.require('ol.style.Stroke');
goog.require('ngeo.DecorateInteraction');


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
    scope: true,
    controller: 'GmfDrawprofilelineController',
    controllerAs: 'ctrl',
    restrict: 'A',
    bindToController: {
      'getMapFn': '&gmfDrawprofilelineMap',
      'line': '=gmfDrawprofilelineLine',
      'active': '<gmfDrawprofilelineActive',
      'getInitialStateFn': '&?gmfDrawprofileLineInitialstate',
      'getStyleFn': '&?gmfDrawprofilelineStyle'
    }
  };
};


gmf.module.directive('gmfDrawprofileline', gmf.drawprofilelineDirective);

/**
 * @param {!angular.Scope} $scope Scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfDrawprofilelineController
 */
gmf.DrawprofilelineController = function($scope, $element, $timeout,
    ngeoFeatureOverlayMgr, ngeoDecorateInteraction) {

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
   * @type {boolean}
   * @export
   */
  this.active;

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
   * @export
   */
  this.interaction = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'LineString',
        features: this.features_
      }));

  this.map_.addInteraction(this.interaction);
  this.interaction.setActive(initialState);
  ngeoDecorateInteraction(this.interaction);

  // Clear the line as soon as the interaction is activated.
  this.interaction.on(
    ol.Object.getChangeEventType(ol.interaction.InteractionProperty.ACTIVE),
    function() {
      if (this.interaction.getActive()) {
        this.clear_();
      }
    }, this);

  // Update the profile with the new geometry.
  this.interaction.on(ol.interaction.DrawEventType.DRAWEND, function(e) {
    this.line = e.feature.getGeometry();
    // using timeout to prevent dblclick to zoom the map
    $timeout(function() {
      this.interaction.setActive(false);
    }.bind(this), 0);
  }, this);

  // Line may be removed from an an other component
  // for example closing the chart panel
  $scope.$watch(
    function() {
      return this.line;
    }.bind(this),
    function(newLine, oldLine) {
      if (newLine === null) {
        this.clear_();
      }
    }.bind(this));

  $scope.$watch(
    function() {
      return this.active;
    }.bind(this),
    function(newValue) {
      if (newValue === false) {
        this.clear_();
      }
      // Will activate the interaction automatically the first time
      this.interaction.setActive(newValue);
    }.bind(this)
  );
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
