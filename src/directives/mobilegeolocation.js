goog.provide('ngeo.mobileGeolocationDirective');

goog.require('ngeo');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.Notification');
goog.require('ol.events');
goog.require('ol.Feature');
goog.require('ol.Geolocation');
goog.require('ol.GeolocationProperty');
goog.require('ol.Map');
goog.require('ol.geom.Point');
goog.require('ol.DeviceOrientation');


/**
 * @enum {string}
 */
ngeo.MobileGeolocationEventType = {
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
ngeo.mobileGeolocationDirective = function() {
  return {
    restrict: 'A',
    scope: {
      'getMobileMapFn': '&ngeoMobileGeolocationMap',
      'getMobileGeolocationOptionsFn': '&ngeoMobileGeolocationOptions'
    },
    controller: ngeo.MobileGeolocationController
  };
};


ngeo.module.directive('ngeoMobileGeolocation', ngeo.mobileGeolocationDirective);


/**
 * @constructor
 * @private
 * @struct
 * @param {angular.Scope} $scope The directive's scope.
 * @param {angular.JQLite} $element Element.
 * @param {angularGettext.Catalog} gettextCatalog Gettext service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {ngeo.Notification} ngeoNotification Ngeo notification service.
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoMobileGeolocationController
 */
ngeo.MobileGeolocationController = function($scope, $element,
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
   * @type {ngeo.FeatureOverlay}
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

  /**
   * @private
   * @type {ol.DeviceOrientation}
   */
  this.deviceOrientation;

  if (options.autorotate) {
    this.autorotateListener();
  }

  // handle geolocation error.
  this.geolocation_.on('error', function(error) {
    this.untrack_();
    if (this.deviceOrientation) {
      this.deviceOrientation.setTracking(false);
    }
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
      this.setPosition_();
    },
    this);

  ol.events.listen(
    this.geolocation_,
    ol.Object.getChangeEventType(ol.GeolocationProperty.POSITION),
    function() {
      this.setPosition_();
    },
    this);

  const view = map.getView();

  ol.events.listen(view, 'change:center', this.handleViewChange_, this);

  ol.events.listen(view, 'change:resolution', this.handleViewChange_, this);

};


/**
 * @export
 */
ngeo.MobileGeolocationController.prototype.toggleTracking = function() {
  if (this.geolocation_.getTracking()) {
    // if map center is different than geolocation position, then track again
    const currentPosition = this.geolocation_.getPosition();
    // if user is using Firefox and selects the "not now" option, OL geolocation
    // doesn't return an error
    if (currentPosition === undefined) {
      this.untrack_();
      this.$scope_.$emit(ngeo.MobileGeolocationEventType.ERROR, null);
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
  this.notification_.clear();
};


/**
 * @private
 */
ngeo.MobileGeolocationController.prototype.setPosition_ = function() {
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
ngeo.MobileGeolocationController.prototype.handleViewChange_ = function(event) {
  if (this.follow_ && !this.viewChangedByMe_) {
    this.follow_ = false;
  }
};

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window['MSStream'];
}

// Get heading depending on devices
function headingFromDevices(deviceOrientation) {
  let hdg = deviceOrientation.getHeading();
  let orientation = window.orientation;
  if (hdg === undefined) {
    return undefined;
  }
  if (!isIOS()) {
    hdg = -hdg;
    if (window.screen.orientation.angle) {
      orientation = window.screen.orientation.angle;
    }
  }
  // Normalize to be between -90 and 180
  orientation =  ((orientation + 179) % 360 - 179);
  // Add to hdg in radian
  hdg += orientation * Math.PI / 180;
  return hdg;
}

// Update heading
ngeo.MobileGeolocationController.prototype.headingUpdate = function() {
  let heading = headingFromDevices(this.deviceOrientation);
  if (heading !== undefined) {
    heading = -heading;
    const currRotation = this.map_.getView().getRotation();
    const diff = heading - currRotation;

    if (diff > Math.PI) {
      heading -= 2 * Math.PI;
    }
    this.map_.getView().animate({
      rotation: heading,
      duration: 350,
      easing: ol.easing.linear
    });
  }
};

/**
 * Orientation control events
 * @suppress {deprecated}
 */
ngeo.MobileGeolocationController.prototype.autorotateListener = function() {
  this.deviceOrientation = new ol.DeviceOrientation();

  let currHeading = 0;
  const headngUpdateWhenMapRotate = throttle(this.headingUpdate, 300, this);

  this.deviceOrientation.on(['change'], (event) => {
    const heading = headingFromDevices(this.deviceOrientation);
    if (heading === undefined) {
      console.error('Heading is undefined');
      return;
    }

    if (Math.abs(heading - currHeading) > 0.05) {
      currHeading = heading;
      headngUpdateWhenMapRotate();
    }
  });

  this.deviceOrientation.setTracking(true);
};

function throttle(fn, time, context) {
  let lock, args, asyncKey, destroyed;

  function later() {
    // reset lock and call if queued
    lock = false;
    if (args) {
      throttled.call(context, args);
      args = false;
    }
  }

  const checkDestroyed = function() {
    if (destroyed) {
      throw new Error('Method was already destroyed');
    }
  };

  function throttled(...argumentList) {
    checkDestroyed();

    if (lock) {
      // called too soon, queue to call later
      args = argumentList;
      return;
    }

    // call and lock until later
    fn.apply(context, argumentList);
    asyncKey = setTimeout(later, time);
    lock = true;
  }

  throttled.destroy = function() {
    checkDestroyed();

    if (asyncKey) {
      clearTimeout(asyncKey);
    }

    destroyed = true;
  };

  return throttled;
}
