import angular from 'angular';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import ngeoMessageNotification from 'ngeo/message/Notification.js';
import * as olEasing from 'ol/easing.js';
import * as olEvents from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import olGeolocation from 'ol/Geolocation.js';
import olMap from 'ol/Map.js';
import olGeomPoint from 'ol/geom/Point.js';

/**
 * Options for the mobile geolocations directive.
 *
 * @typedef {Object} MobileGeolocationDirectiveOptions
 * @property {import("ol/style/Style.js").StyleLike} [accuracyFeatureStyle] The style to
 * use to sketch the accuracy feature, which is a regular polygon.
 * @property {import("ol/style/Style.js").StyleLike} [positionFeatureStyle] The style to
 * use to sketch the position feature, which is a point.
 * @property {number} [zoom] If set, in addition to recentering the map view at the location, determines
 * the zoom level to set when obtaining a new position
 * @property {boolean} [autorotate] Autorotate.
 */

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoMobileGeolocation', [
  ngeoMapFeatureOverlayMgr.name,
  ngeoMessageNotification.name,
]);

/**
 * @enum {string}
 * @private
 * @hidden
 */
const GeolocationEventType = {
  /**
   * Triggered when an error occurs.
   */
  ERROR: 'mobile-geolocation-error',
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
 * @htmlAttribute {import("ol/Map.js").default} ngeo-mobile-geolocation-map The map.
 * @htmlAttribute {MobileGeolocationDirectiveOptions} ngeo-mobile-geolocation-options The options.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoMobileGeolocation
 */
function geolocationMobileComponent() {
  return {
    restrict: 'A',
    scope: {
      'getMobileMapFn': '&ngeoMobileGeolocationMap',
      'getMobileGeolocationOptionsFn': '&ngeoMobileGeolocationOptions',
    },
    controller: 'ngeoGeolocationMobileController',
  };
}

module.directive('ngeoMobileGeolocation', geolocationMobileComponent);

/**
 * @constructor
 * @private
 * @hidden
 * @param {angular.IScope} $scope The directive's scope.
 * @param {JQuery} $element Element.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *    overlay manager service.
 * @param {import("ngeo/message/Notification.js").MessageNotification} ngeoNotification Ngeo notification
 *    service.
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoMobileGeolocationController
 */
function Controller($scope, $element, gettextCatalog, ngeoFeatureOverlayMgr, ngeoNotification) {
  $element.on('click', this.toggleTracking.bind(this));

  const map = $scope['getMobileMapFn']();
  console.assert(map instanceof olMap);

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {!import("ol/Map.js").default}
   * @private
   */
  this.map_ = map;

  const options = $scope['getMobileGeolocationOptionsFn']() || {};
  console.assert(options);

  /**
   * @type {import("ngeo/message/Notification.js").MessageNotification}
   * @private
   */
  this.notification_ = ngeoNotification;

  /**
   * @type {import("ngeo/map/FeatureOverlay.js").FeatureOverlay}
   * @private
   */
  this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  /**
   * @type {import("ol/Geolocation.js").default}
   * @private
   */
  this.geolocation_ = new olGeolocation({
    projection: map.getView().getProjection(),
    trackingOptions: /** @type {PositionOptions} */ ({
      enableHighAccuracy: true,
    }),
  });

  if (options.autorotate) {
    this.autorotateListener();
  }

  // handle geolocation error.
  this.geolocation_.on('error', (error) => {
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
    $scope.$emit(GeolocationEventType.ERROR, error);
  });

  /**
   * @type {import("ol/Feature.js").default}
   * @private
   */
  this.positionFeature_ = new olFeature();

  if (options.positionFeatureStyle) {
    this.positionFeature_.setStyle(options.positionFeatureStyle);
  }

  /**
   * @type {import("ol/Feature.js").default}
   * @private
   */
  this.accuracyFeature_ = new olFeature();

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

  olEvents.listen(this.geolocation_, 'change:accuracyGeometry', () => {
    this.accuracyFeature_.setGeometry(this.geolocation_.getAccuracyGeometry());
    this.setPosition_();
  });

  olEvents.listen(this.geolocation_, 'change:position', () => {
    this.setPosition_();
  });

  const view = map.getView();

  olEvents.listen(view, 'change:center', this.handleViewChange_, this);

  olEvents.listen(view, 'change:resolution', this.handleViewChange_, this);
}

/**
 */
Controller.prototype.toggleTracking = function () {
  if (this.geolocation_.getTracking()) {
    // if map center is different than geolocation position, then track again
    const currentPosition = this.geolocation_.getPosition();
    // if user is using Firefox and selects the "not now" option, OL geolocation
    // doesn't return an error
    if (currentPosition === undefined) {
      this.untrack_();
      this.$scope_.$emit(GeolocationEventType.ERROR, null);
      return;
    }
    console.assert(currentPosition !== undefined);
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
Controller.prototype.track_ = function () {
  this.featureOverlay_.addFeature(this.positionFeature_);
  this.featureOverlay_.addFeature(this.accuracyFeature_);
  this.follow_ = true;
  this.geolocation_.setTracking(true);
};

/**
 * @private
 */
Controller.prototype.untrack_ = function () {
  this.featureOverlay_.clear();
  this.follow_ = false;
  this.geolocation_.setTracking(false);
  this.notification_.clear();
};

/**
 * @private
 */
Controller.prototype.setPosition_ = function () {
  const position = /** @type {import("ol/coordinate.js").Coordinate} */ (this.geolocation_.getPosition());
  const point = new olGeomPoint(position);

  this.positionFeature_.setGeometry(point);
  const accuracy = this.accuracyFeature_.getGeometry();

  if (this.follow_) {
    this.viewChangedByMe_ = true;
    if (this.zoom_ !== undefined) {
      this.map_.getView().setCenter(position);
      this.map_.getView().setZoom(this.zoom_);
    } else if (accuracy) {
      const size = /** @type {!import("ol/size.js").Size} */ (this.map_.getSize());
      this.map_.getView().fit(/** @type {!import("ol/geom/Polygon.js").default} */ (accuracy), {size});
    }
    this.viewChangedByMe_ = false;
  }
};

/**
 * @param {import("ol/events/Event.js").default} event Event.
 * @private
 */
Controller.prototype.handleViewChange_ = function (event) {
  if (this.follow_ && !this.viewChangedByMe_) {
    this.follow_ = false;
  }
};

// Orientation control events
Controller.prototype.autorotateListener = function () {
  let currentAlpha = 0;
  if (window.hasOwnProperty('ondeviceorientationabsolute')) {
    window.addEventListener(
      'deviceorientationabsolute',
      (evt) => {
        const event = /** @type {DeviceOrientationEvent} */ (evt);
        currentAlpha = this.handleRotate_(event.alpha, currentAlpha);
      },
      true
    );
  } else if (window.hasOwnProperty('ondeviceorientation')) {
    window.addEventListener(
      'deviceorientation',
      (evt) => {
        // @ts-ignore: ios only
        if (evt.webkitCompassHeading) {
          // check for iOS property
          // @ts-ignore: ios only
          currentAlpha = this.handleRotate_(-evt.webkitCompassHeading, currentAlpha);
        } else {
          // non iOS
          currentAlpha = this.handleRotate_(evt.alpha - 270, currentAlpha);
        }
      },
      true
    );
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
Controller.prototype.handleRotate_ = function (eventAlpha, currentAlpha) {
  if (this.geolocation_.getTracking() && Math.abs(eventAlpha - currentAlpha) > 0.2) {
    currentAlpha = eventAlpha;
    const radAlpha = (currentAlpha * Math.PI) / 180;
    this.map_.getView().animate({
      rotation: radAlpha,
      duration: 350,
      easing: olEasing.linear,
    });
  }
  return currentAlpha;
};

module.controller('ngeoGeolocationMobileController', Controller);

export default module;
