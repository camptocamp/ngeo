goog.provide('ngeo.DesktopGeolocationController');
goog.provide('ngeo.desktopGeolocationDirective');

goog.require('ngeo');
goog.require('ngeo.DecorateGeolocation');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ol.Feature');
goog.require('ol.Geolocation');
goog.require('ol.Map');
goog.require('ol.geom.Point');


/**
 * Provide a "desktop geolocation" directive.
 *
 * @example
 * <button ngeo-desktop-geolocation=""
 *   ngeo-desktop-geolocation-map="ctrl.map"
 *   ngeo-desktop-geolocation-options="ctrl.desktopGeolocationOptions">
 * </button>
 *
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDesktopGeolocation
 */
ngeo.desktopGeolocationDirective = function() {
  return {
    restrict: 'A',
    scope: {
      'getDesktopMapFn': '&ngeoDesktopGeolocationMap',
      'getDesktopGeolocationOptionsFn': '&ngeoDesktopGeolocationOptions'
    },
    controller: 'NgeoDesktopGeolocationController',
    controllerAs: 'ctrl'
  };
};


ngeoModule.directive('ngeoDesktopGeolocation',
    ngeo.desktopGeolocationDirective);



/**
 * @constructor
 * @param {angular.Scope} $scope The directive's scope.
 * @param {angular.JQLite} $element Element.

 * @param {ngeo.DecorateGeolocation} ngeoDecorateGeolocation Decorate
 *     Geolocation service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoDesktopGeolocationController
 */
ngeo.DesktopGeolocationController = function($scope, $element,
    ngeoDecorateGeolocation, ngeoFeatureOverlayMgr) {

  $element.on('click', goog.bind(this.toggle, this));

  var map = $scope['getDesktopMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!ol.Map}
   * @private
   */
  this.map_ = map;

  var options = $scope['getDesktopGeolocationOptionsFn']() || {};
  goog.asserts.assertObject(options);

  /**
   * @type {ngeo.FeatureOverlay}
   * @private
   */
  this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  /**
   * @type {ol.Geolocation}
   * @private
   */
  this.geolocation_ = new ol.Geolocation({
    projection: map.getView().getProjection()
  });

  /**
   * @type {ol.Feature}
   * @private
   */
  this.positionFeature_ = new ol.Feature();

  if (options.positionFeatureStyle) {
    this.positionFeature_.setStyle(options.positionFeatureStyle);
  }

  /**
   * @type {ol.Feature}
   * @private
   */
  this.accuracyFeature_ = new ol.Feature();

  if (options.accuracyFeatureStyle) {
    this.accuracyFeature_.setStyle(options.accuracyFeatureStyle);
  }

  /**
   * @type {number|undefined}
   * @private
   */
  this.zoom_ = options.zoom;

  /**
   * @type {boolean}
   * @private
   */
  this.active_ = false;

  goog.events.listen(
      this.geolocation_,
      ol.Object.getChangeEventType(ol.GeolocationProperty.ACCURACY_GEOMETRY),
      function() {
        this.accuracyFeature_.setGeometry(
            this.geolocation_.getAccuracyGeometry());
      },
      false,
      this);

  goog.events.listen(
      this.geolocation_,
      ol.Object.getChangeEventType(ol.GeolocationProperty.POSITION),
      function(e) {
        this.setPosition_(e);
      },
      false,
      this);

  ngeoDecorateGeolocation(this.geolocation_);
};


/**
 * @export
 */
ngeo.DesktopGeolocationController.prototype.toggle = function() {
  if (this.active_) {
    this.deactivate_();
  } else {
    this.activate_();
  }
};


/**
 * @private
 */
ngeo.DesktopGeolocationController.prototype.activate_ = function() {
  this.featureOverlay_.addFeature(this.positionFeature_);
  this.featureOverlay_.addFeature(this.accuracyFeature_);
  this.geolocation_.setTracking(true);
  this.active_ = true;
};


/**
 * @private
 */
ngeo.DesktopGeolocationController.prototype.deactivate_ = function() {
  this.featureOverlay_.clear();
  this.active_ = false;
};


/**
 * @param {ol.ObjectEvent} event Event.
 * @private
 */
ngeo.DesktopGeolocationController.prototype.setPosition_ = function(event) {
  var position = /** @type {ol.Coordinate} */ (this.geolocation_.getPosition());
  var point = new ol.geom.Point(position);

  this.positionFeature_.setGeometry(point);
  this.map_.getView().setCenter(position);

  if (this.zoom_ !== undefined) {
    this.map_.getView().setZoom(this.zoom_);
  }

  this.geolocation_.setTracking(false);
};


ngeoModule.controller('NgeoDesktopGeolocationController',
    ngeo.DesktopGeolocationController);
