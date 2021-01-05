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

/**
 * Options for the geolocation directive.
 *
 * @typedef {Object} GeolocationDirectiveOptions
 * @property {import("ol/style/Style.js").StyleLike} [accuracyFeatureStyle] The style to
 * use to sketch the accuracy feature, which is a regular polygon.
 * @property {import("ol/style/Style.js").StyleLike} [positionFeatureStyle] The style to
 * use to sketch the position feature, which is a point.
 * @property {number} [zoom] If set, in addition to recentering the map view at the location, determines
 * the zoom level to set when obtaining a new position
 * @property {boolean} [autorotate] Autorotate.
 */

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
 *        ngeo-geolocation-map="ctrl.map"
 *        ngeo-geolocation-options="ctrl.geolocationOptions">
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
      'getMapFn': '&ngeoGeolocationMap',
      'getOptionsFn': '&ngeoGeolocationOptions',
    },
    controller: 'ngeoGeolocationController',
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
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoGeolocationController
 */
export function Controller($scope, $element, gettextCatalog, ngeoFeatureOverlayMgr, ngeoNotification) {
  $element.on('click', this.toggleTracking.bind(this));

  // @ts-ignore
  const map = $scope.getMapFn();
  if (!(map instanceof olMap)) {
    throw new Error('Wrong map type');
  }

  /**
   * @type {angular.IScope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {import("ol/Map.js").default}
   * @private
   */
  this.map_ = map;

  // @ts-ignore
  const options = $scope.getOptionsFn() || {};
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
   * @type {olFeature<import("ol/geom/Geometry.js").default>}
   * @private
   */
  this.positionFeature_ = new olFeature();

  if (options.positionFeatureStyle) {
    this.positionFeature_.setStyle(options.positionFeatureStyle);
  }

  /**
   * @type {olFeature<import("ol/geom/Geometry.js").default>}
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

  listen(this.geolocation_, 'change:accuracyGeometry', () => {
    const geometry = this.geolocation_.getAccuracyGeometry();
    if (!geometry) {
      throw new Error('Missing geometry');
    }
    this.accuracyFeature_.setGeometry(geometry);
    this.setPosition_();
  });

  listen(this.geolocation_, 'change:position', () => {
    this.setPosition_();
  });

  const view = map.getView();

  listen(view, 'change:center', this.handleViewChange_, this);
  listen(view, 'change:resolution', this.handleViewChange_, this);
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
    const view = this.map_.getView();
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
  const view = this.map_.getView();
  const position = this.geolocation_.getPosition();
  if (position === undefined) {
    throw new Error('Missing position');
  }
  const point = new olGeomPoint(position);

  this.positionFeature_.setGeometry(point);
  const accuracy = this.accuracyFeature_.getGeometry();

  if (this.follow_) {
    this.viewChangedByMe_ = true;
    if (this.zoom_ !== undefined) {
      view.setCenter(position);
      view.setZoom(this.zoom_);
    } else if (accuracy instanceof Polygon) {
      const size = this.map_.getSize();
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

module.controller('ngeoGeolocationController', Controller);

export default module;
