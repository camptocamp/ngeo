// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import ngeoMessageNotification from 'ngeo/message/Notification.js';
import * as olEasing from 'ol/easing.js';
import {listen} from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import olGeolocation from 'ol/Geolocation.js';
import olMap from 'ol/Map.js';
import olGeomPoint from 'ol/geom/Point.js';
import Polygon from 'ol/geom/Polygon.js';
import {buildStyle} from 'ngeo/options.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoGeolocation', [
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
  ERROR: 'geolocation-error',
};

/**
 * Provide a geolocation directive.
 *
 * Example:
 *
 *      <button ngeo-geolocation
 *        ngeo-geolocation-map="ctrl.map">
 *      </button>
 *
 * See our live example: [../examples/mobilegeolocation.html](../examples/mobilegeolocation.html)
 *
 * @htmlAttribute {import("ol/Map.js").default} ngeo-geolocation-map The map.
 * @htmlAttribute {GeolocationDirectiveOptions} ngeo-geolocation-options The options.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoGeolocation
 */
function geolocationComponent() {
  return {
    restrict: 'A',
    scope: {
      'map': '<ngeoGeolocationMap',
      'loading': '=ngeoGeolocationLoading',
    },
    controller: 'ngeoGeolocationController',
    bindToController: true,
  };
}

module.directive('ngeoGeolocation', geolocationComponent);

/**
 * @constructor
 * @hidden
 * @param {angular.IScope} $scope The directive's scope.
 * @param {JQuery} $element Element.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *    overlay manager service.
 * @param {import("ngeo/message/Notification.js").MessageNotification} ngeoNotification Ngeo notification
 *    service.
 * @param {import('ngeo/options.js').ngeoGeolocationOptions} ngeoGeolocationOptions The options.
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoGeolocationController
 */
export function Controller(
  $scope,
  $element,
  gettextCatalog,
  ngeoFeatureOverlayMgr,
  ngeoNotification,
  ngeoGeolocationOptions
) {
  this.options = ngeoGeolocationOptions;

  $element.on('click', this.toggleTracking.bind(this));

  /**
   * @type {angular.IScope}
   */
  this.$scope_ = $scope;

  /**
   * @type {import("ngeo/message/Notification.js").MessageNotification}
   */
  this.notification_ = ngeoNotification;

  /**
   * @type {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr}
   */
  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map;

  /**
   * A flag used to determine if the application has finished loading.
   * @type {boolean}
   */
  this.loading;
}

/**
 */
Controller.prototype.$onInit = function () {
  if (!(this.map instanceof olMap)) {
    throw new Error('Wrong map type');
  }

  /**
   * @type {import("ngeo/map/FeatureOverlay.js").FeatureOverlay}
   */
  this.featureOverlay_ = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();

  /**
   * @type {import("ol/Geolocation.js").default}
   */
  this.geolocation_ = new olGeolocation({
    projection: this.map.getView().getProjection(),
    trackingOptions: /** @type {PositionOptions} */ ({
      enableHighAccuracy: true,
    }),
  });

  if (this.options.autoRotate) {
    this.autoRotateListener();
  }

  // Add alias for automatic i18n string collection
  const gettextCatalog = this.gettextCatalog_;

  // handle geolocation error.
  this.geolocation_.on(
    'error',
    /** @type {function(?): ?} */ (
      /**
       * @param {GeolocationPositionError} error
       */
      (error) => {
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
        this.$scope_.$emit(GeolocationEventType.ERROR, error);
      }
    )
  );

  /**
   * @type {olFeature<import("ol/geom/Geometry.js").default>}
   */
  this.positionFeature_ = new olFeature();

  this.positionFeature_.setStyle(buildStyle(this.options.positionFeatureStyle));

  /**
   * @type {olFeature<import("ol/geom/Geometry.js").default>}
   */
  this.accuracyFeature_ = new olFeature();

  this.accuracyFeature_.setStyle(buildStyle(this.options.accuracyFeatureStyle));

  /**
   * Whether to recenter the map at the position it gets updated
   * @type {boolean}
   */
  this.follow_ = false;

  /**
   * A flag used to determine whether the view was changed by me or something
   * else. In the latter case, stop following.
   * @type {boolean}
   */
  this.viewChangedByMe_ = false;

  listen(
    this.geolocation_,
    'change:accuracyGeometry',
    /** @type {import("ol/events.js").ListenerFunction} */
    (evt) => {
      const geometry = this.geolocation_.getAccuracyGeometry();
      if (!geometry) {
        throw new Error('Missing geometry');
      }
      this.accuracyFeature_.setGeometry(geometry);
      this.setPosition_();
    }
  );

  listen(
    this.geolocation_,
    'change:position',
    /** @type {import("ol/events.js").ListenerFunction} */
    () => {
      this.setPosition_();
    }
  );

  const view = this.map.getView();

  listen(view, 'change:center', this.handleViewChange_, this);
  listen(view, 'change:resolution', this.handleViewChange_, this);

  if (this.options.atLoadingTime && this.loading !== undefined) {
    this.$scope_.$watch(
      () => this.loading,
      (newVal) => {
        if (newVal === false) {
          this.toggleTracking();
        }
      }
    );
  }
};

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
    // stop tracking if the position is close to the center of the map.
    const view = this.map.getView();
    const center = view.getCenter();
    if (!center) {
      throw new Error('Missing center');
    }
    const diff = Math.abs(currentPosition[0] - center[0]) + Math.abs(currentPosition[1] - center[1]);
    if (diff < 2) {
      this.untrack_();
    } else {
      // immediately recenter to the latest position to avoid a delay if the GPS device is slow to respond.
      view.setCenter(currentPosition);
      this.untrack_();
      this.track_();
    }
  } else {
    this.track_();
  }
};

Controller.prototype.track_ = function () {
  this.featureOverlay_.addFeature(this.positionFeature_);
  this.featureOverlay_.addFeature(this.accuracyFeature_);
  this.follow_ = true;
  this.geolocation_.setTracking(true);
};

Controller.prototype.untrack_ = function () {
  this.featureOverlay_.clear();
  this.follow_ = false;
  this.geolocation_.setTracking(false);
  this.notification_.clear();
};

Controller.prototype.setPosition_ = function () {
  const view = this.map.getView();
  const position = this.geolocation_.getPosition();
  if (position === undefined) {
    throw new Error('Missing position');
  }
  const point = new olGeomPoint(position);

  this.positionFeature_.setGeometry(point);
  const accuracy = this.accuracyFeature_.getGeometry();

  if (this.follow_) {
    this.viewChangedByMe_ = true;
    if (this.options.zoom !== undefined) {
      view.setCenter(position);
      view.setZoom(this.options.zoom);
    } else if (accuracy instanceof Polygon) {
      const size = this.map.getSize();
      if (size === undefined) {
        throw new Error('Missing size');
      }
      view.fit(accuracy, {size});
    }
    this.viewChangedByMe_ = false;
  }
};

/**
 * @param {Event|import("ol/events/Event.js").default} event Event.
 */
Controller.prototype.handleViewChange_ = function (event) {
  if (this.follow_ && !this.viewChangedByMe_) {
    this.follow_ = false;
  }
};

// Orientation control events
Controller.prototype.autoRotateListener = function () {
  let currentAlpha = 0;
  if (window.hasOwnProperty('ondeviceorientationabsolute')) {
    window.addEventListener(
      'deviceorientationabsolute',
      (event) => {
        if (!(event instanceof DeviceOrientationEvent)) {
          throw new Error('Wrong event type');
        }
        if (event.alpha !== null) {
          currentAlpha = this.handleRotate_(event.alpha, currentAlpha);
        }
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
          if (!evt.alpha) {
            throw new Error('Missing evt.alpha');
          }
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
 * @param {number} eventAlpha
 * @param {number} currentAlpha
 * @return {number}
 */
Controller.prototype.handleRotate_ = function (eventAlpha, currentAlpha) {
  if (this.geolocation_.getTracking() && Math.abs(eventAlpha - currentAlpha) > 0.2) {
    currentAlpha = eventAlpha;
    const radAlpha = (currentAlpha * Math.PI) / 180;
    this.map.getView().animate({
      rotation: radAlpha,
      duration: 350,
      easing: olEasing.linear,
    });
  }
  return currentAlpha;
};

module.controller('ngeoGeolocationController', Controller);

export default module;
