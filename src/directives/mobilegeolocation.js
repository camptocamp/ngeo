goog.provide('ngeo.MobileGeolocationController');
goog.provide('ngeo.mobileGeolocationDirective');

goog.require('ngeo');
goog.require('ngeo.DecorateGeolocation');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ol.Feature');
goog.require('ol.Geolocation');
goog.require('ol.Map');
goog.require('ol.geom.Point');


/**
 * @enum {string}
 * @export
 */
ngeo.MobileGeolocationEventType = {
  /**
   * Triggered when an error occures.
   */
  ERROR: 'mobile-geolocation-error'
};

/**
 * Provide a "mobile geolocation" directive.
 *
 * Example:
 *
 *      <button ngeo-mobile-geolocation
 *        ngeo-mobile-geolocation-map="ctrl.map"
 *        ngeo-mobile-geolocation-options="ctrl.mobileGeolocationOptions">
 *      </button>
 *
 * @htmlAttribute {ol.Map} ngeo-mobile-geolocation-map The map.
 * @htmlAttribute {ngeox.MobileGeolocationDirectiveOptions} ngeo-mobile-geolocation-options The options.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoMobileGeolocation
 */
ngeo.mobileGeolocationDirective = function() {
  return {
    restrict: 'A',
    scope: {
      'getMobileMapFn': '&ngeoMobileGeolocationMap',
      'getMobileGeolocationOptionsFn': '&ngeoMobileGeolocationOptions'
    },
    controller: 'NgeoMobileGeolocationController',
    controllerAs: 'ctrl'
  };
};


ngeo.module.directive('ngeoMobileGeolocation', ngeo.mobileGeolocationDirective);


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
 * @ngname NgeoMobileGeolocationController
 */
ngeo.MobileGeolocationController = function($scope, $element,
    ngeoDecorateGeolocation, ngeoFeatureOverlayMgr) {

  $element.on('click', this.toggleTracking.bind(this));

  var map = $scope['getMobileMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {!ol.Map}
   * @private
   */
  this.map_ = map;

  var options = $scope['getMobileGeolocationOptionsFn']() || {};
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

  // handle geolocation error.
  this.geolocation_.on('error', function(error) {
    this.untrack_();
    $scope.$emit(ngeo.MobileGeolocationEventType.ERROR, error);
  }, this);

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
   * Whether to recenter the map at the position it gets updated
   * @type {boolean}
   * @private
   */
  this.follow_ = false;

  /**
   * A flag used to determine whether the view was changed by me or something
   * else. In the latter case, stop following.
   * @type {boolean}
   * @private
   */
  this.viewChangedByMe_ = false;

  ol.events.listen(
      this.geolocation_,
      ol.Object.getChangeEventType(ol.GeolocationProperty.ACCURACY_GEOMETRY),
      function() {
        this.accuracyFeature_.setGeometry(
            this.geolocation_.getAccuracyGeometry());
      },
      this);

  ol.events.listen(
      this.geolocation_,
      ol.Object.getChangeEventType(ol.GeolocationProperty.POSITION),
      function(e) {
        this.setPosition_(e);
      },
      this);

  var view = map.getView();

  ol.events.listen(
      view,
      ol.Object.getChangeEventType(ol.ViewProperty.CENTER),
      this.handleViewChange_,
      this);

  ol.events.listen(
      view,
      ol.Object.getChangeEventType(ol.ViewProperty.RESOLUTION),
      this.handleViewChange_,
      this);

  ol.events.listen(
      view,
      ol.Object.getChangeEventType(ol.ViewProperty.ROTATION),
      this.handleViewChange_,
      this);

  ngeoDecorateGeolocation(this.geolocation_);
};


/**
 * @export
 */
ngeo.MobileGeolocationController.prototype.toggleTracking = function() {
  if (this.geolocation_.getTracking()) {
    // if map center is different than geolocation position, then track again
    var currentPosition = this.geolocation_.getPosition();
    // if user is using Firefox and selects the "not now" option, OL geolocation
    // doesn't return an error
    if (currentPosition === undefined) {
      this.untrack_();
      this.$scope_.$emit(ngeo.MobileGeolocationEventType.ERROR, null);
      return;
    }
    goog.asserts.assert(currentPosition !== undefined);
    var center = this.map_.getView().getCenter();
    if (currentPosition[0] === center[0] &&
        currentPosition[1] === center[1]) {
      this.untrack_();
    } else {
      this.untrack_();
      this.track_();
    }
  } else {
    this.track_();
  }
};


/**
 * @private
 */
ngeo.MobileGeolocationController.prototype.track_ = function() {
  this.featureOverlay_.addFeature(this.positionFeature_);
  this.featureOverlay_.addFeature(this.accuracyFeature_);
  this.follow_ = true;
  this.geolocation_.setTracking(true);
};


/**
 * @private
 */
ngeo.MobileGeolocationController.prototype.untrack_ = function() {
  this.featureOverlay_.clear();
  this.follow_ = false;
  this.geolocation_.setTracking(false);
};


/**
 * @param {ol.ObjectEvent} event Event.
 * @private
 */
ngeo.MobileGeolocationController.prototype.setPosition_ = function(event) {
  var position = /** @type {ol.Coordinate} */ (this.geolocation_.getPosition());
  var point = new ol.geom.Point(position);

  this.positionFeature_.setGeometry(point);

  if (this.follow_) {
    this.viewChangedByMe_ = true;
    this.map_.getView().setCenter(position);
    if (this.zoom_ !== undefined) {
      this.map_.getView().setZoom(this.zoom_);
    }
    this.viewChangedByMe_ = false;
  }
};


/**
 * @param {ol.ObjectEvent} event Event.
 * @private
 */
ngeo.MobileGeolocationController.prototype.handleViewChange_ = function(event) {
  if (this.follow_ && !this.viewChangedByMe_) {
    this.follow_ = false;
  }
};


ngeo.module.controller('NgeoMobileGeolocationController',
    ngeo.MobileGeolocationController);
