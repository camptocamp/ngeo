goog.provide('ngeo.geolocation.mobile');

goog.require('ngeo');
goog.require('ngeo.Notification');
goog.require('ol.easing');
goog.require('ol.events');
goog.require('ol.Feature');
goog.require('ol.Geolocation');
goog.require('ol.Map');
goog.require('ol.geom.Point');

goog.require('ngeo.map.FeatureOverlayMgr');


/**
 * @type {!angular.Module}
 */
ngeo.geolocation.mobile = angular.module('ngeoMobileGeolocation', [
  ngeo.map.FeatureOverlayMgr.module.name
]);

ngeo.module.requires.push(ngeo.geolocation.mobile.name);


/**
 * @enum {string}
 */
ngeo.geolocation.mobile.GeolocationEventType = {
  /**
   * Triggered when an error occurs.
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
 * See our live example: [../examples/mobilegeolocation.html](../examples/mobilegeolocation.html)
 *
 * @htmlAttribute {ol.Map} ngeo-mobile-geolocation-map The map.
 * @htmlAttribute {ngeox.MobileGeolocationDirectiveOptions} ngeo-mobile-geolocation-options The options.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoMobileGeolocation
 */
ngeo.geolocation.mobile.directive_ = function() {
  return {
    restrict: 'A',
    scope: {
      'getMobileMapFn': '&ngeoMobileGeolocationMap',
      'getMobileGeolocationOptionsFn': '&ngeoMobileGeolocationOptions'
    },
    controller: 'ngeoGeolocationMobileController'
  };
};


ngeo.geolocation.mobile.directive('ngeoMobileGeolocation', ngeo.geolocation.mobile.directive_);


/**
 * @constructor
 * @private
 * @struct
 * @param {angular.Scope} $scope The directive's scope.
 * @param {angular.JQLite} $element Element.
 * @param {angularGettext.Catalog} gettextCatalog Gettext service.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {ngeo.Notification} ngeoNotification Ngeo notification service.
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoMobileGeolocationController
 */
ngeo.geolocation.mobile.Controller_ = function($scope, $element,
  gettextCatalog, ngeoFeatureOverlayMgr, ngeoNotification) {

  $element.on('click', this.toggleTracking.bind(this));

  const map = $scope['getMobileMapFn']();
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

  const options = $scope['getMobileGeolocationOptionsFn']() || {};
  goog.asserts.assertObject(options);

  /**
   * @type {ngeo.Notification}
   * @private
   */
  this.notification_ = ngeoNotification;

  /**
   * @type {ngeo.map.FeatureOverlay}
   * @private
   */
  this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  /**
   * @type {ol.Geolocation}
   * @private
   */
  this.geolocation_ = new ol.Geolocation({
    projection: map.getView().getProjection(),
    trackingOptions: /** @type {GeolocationPositionOptions} */ ({
      enableHighAccuracy: true
    })
  });

  if (options.autorotate) {
    this.autorotateListener();
  }

  // handle geolocation error.
  this.geolocation_.on('error', function(error) {
    this.untrack_();
    let msg;
    switch (error.code) {
      case 1:
        msg = gettextCatalog.getString('User denied the request for Geolocation.');
        break;
      case 2:
        msg = gettextCatalog.getString('Location information is unavailable.');
        break;
      case 3:
        msg = gettextCatalog.getString('The request to get user location timed out.');
        break;
      default:
        msg = gettextCatalog.getString('Geolocation: An unknown error occurred.');
        break;
    }
    this.notification_.error(msg);
    $scope.$emit(ngeo.geolocation.mobile.GeolocationEventType.ERROR, error);
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

  ol.events.listen(this.geolocation_, 'change:accuracyGeometry', () => {
    this.accuracyFeature_.setGeometry(this.geolocation_.getAccuracyGeometry());
    this.setPosition_();
  });

  ol.events.listen(this.geolocation_, 'change:position', () => {
    this.setPosition_();
  });

  const view = map.getView();

  ol.events.listen(view, 'change:center', this.handleViewChange_, this);

  ol.events.listen(view, 'change:resolution', this.handleViewChange_, this);

};


/**
 * @export
 */
ngeo.geolocation.mobile.Controller_.prototype.toggleTracking = function() {
  if (this.geolocation_.getTracking()) {
    // if map center is different than geolocation position, then track again
    const currentPosition = this.geolocation_.getPosition();
    // if user is using Firefox and selects the "not now" option, OL geolocation
    // doesn't return an error
    if (currentPosition === undefined) {
      this.untrack_();
      this.$scope_.$emit(ngeo.geolocation.mobile.GeolocationEventType.ERROR, null);
      return;
    }
    goog.asserts.assert(currentPosition !== undefined);
    // stop tracking if the position is close to the center of the map.
    const center = this.map_.getView().getCenter();
    const diff = Math.abs(currentPosition[0] - center[0]) + Math.abs(currentPosition[1] - center[1]);
    if (diff < 2) {
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
ngeo.geolocation.mobile.Controller_.prototype.track_ = function() {
  this.featureOverlay_.addFeature(this.positionFeature_);
  this.featureOverlay_.addFeature(this.accuracyFeature_);
  this.follow_ = true;
  this.geolocation_.setTracking(true);
};


/**
 * @private
 */
ngeo.geolocation.mobile.Controller_.prototype.untrack_ = function() {
  this.featureOverlay_.clear();
  this.follow_ = false;
  this.geolocation_.setTracking(false);
  this.notification_.clear();
};


/**
 * @private
 */
ngeo.geolocation.mobile.Controller_.prototype.setPosition_ = function() {
  const position = /** @type {ol.Coordinate} */ (this.geolocation_.getPosition());
  const point = new ol.geom.Point(position);

  this.positionFeature_.setGeometry(point);
  const accuracy = this.accuracyFeature_.getGeometry();

  if (this.follow_) {
    this.viewChangedByMe_ = true;
    if (this.zoom_ !== undefined) {
      this.map_.getView().setCenter(position);
      this.map_.getView().setZoom(this.zoom_);
    } else if (accuracy) {
      const size = /** @type {!ol.Size} */ (this.map_.getSize());
      this.map_.getView().fit(/** @type {!ol.geom.Polygon} */ (accuracy), size);
    }
    this.viewChangedByMe_ = false;
  }
};


/**
 * @param {ol.Object.Event} event Event.
 * @private
 */
ngeo.geolocation.mobile.Controller_.prototype.handleViewChange_ = function(event) {
  if (this.follow_ && !this.viewChangedByMe_) {
    this.follow_ = false;
  }
};


// Orientation control events
ngeo.geolocation.mobile.Controller_.prototype.autorotateListener = function() {
  let currentAlpha = 0;
  if (window.hasOwnProperty('ondeviceorientationabsolute')) {
    window.addEventListener('deviceorientationabsolute', (evt) => {
      currentAlpha = this.handleRotate_(evt.alpha, currentAlpha);
    }, true);
  } else if (window.hasOwnProperty('ondeviceorientation')) {
    window.addEventListener('deviceorientation', (evt) => {
      if (evt.webkitCompassHeading) { // check for iOS property
        currentAlpha = this.handleRotate_(-evt.webkitCompassHeading, currentAlpha);
      } else { // non iOS
        currentAlpha = this.handleRotate_(evt.alpha - 270, currentAlpha);
      }
    }, true);
  } else {
    console.error('Orientation is not supported on this device');
  }
};

/**
 * Handle rotation.
 * @param {number} eventAlpha .
 * @param {number} currentAlpha .
 * @return {number} .
 * @private
 */
ngeo.geolocation.mobile.Controller_.prototype.handleRotate_ = function(eventAlpha, currentAlpha) {
  if (Math.abs(eventAlpha - currentAlpha) > 0.2) {
    currentAlpha = eventAlpha;
    const radAlpha = currentAlpha * Math.PI / 180;
    this.map_.getView().animate({
      rotation: radAlpha,
      duration: 350,
      easing: ol.easing.linear
    });
  }
  return currentAlpha;
};


ngeo.geolocation.mobile.controller('ngeoGeolocationMobileController',
  ngeo.geolocation.mobile.Controller_);
