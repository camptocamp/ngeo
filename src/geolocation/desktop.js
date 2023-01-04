import angular from 'angular';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import ngeoMessageNotification from 'ngeo/message/Notification.js';
import * as olEvents from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import olGeolocation from 'ol/Geolocation.js';
import olMap from 'ol/Map.js';
import olGeomPoint from 'ol/geom/Point.js';

/**
 * Options for the desktop geolocations directive.
 *
 * @typedef {Object} DesktopGeolocationDirectiveOptions
 * @property {import("ol/style/Style.js").StyleLike} [accuracyFeatureStyle] The style to
 * use to sketch the accuracy feature, which is a regular polygon.
 * @property {import("ol/style/Style.js").StyleLike} [positionFeatureStyle] The style to
 * use to sketch the position feature, which is a point.
 * @property {number} [zoom] If set, in addition to recentering the map view at the location, determines
 * the zoom level to set when obtaining a new position.
 */

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDesktopGeolocation', [
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
  ERROR: 'desktop-geolocation-error',
};

/**
 * Provide a "desktop geolocation" directive.
 *
 * Example:
 *
 *      <button ngeo-desktop-geolocation=""
 *        ngeo-desktop-geolocation-map="ctrl.map"
 *        ngeo-desktop-geolocation-options="ctrl.desktopGeolocationOptions">
 *      </button>
 *
 * See our live example: [../examples/desktopgeolocation.html](../examples/desktopgeolocation.html)
 *
 * @htmlAttribute {import("ol/Map.js").default} gmf-geolocation-map The map.
 * @htmlAttribute {DesktopGeolocationDirectiveOptions} gmf-geolocation-options The options.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDesktopGeolocation
 */
function GeolocationDesktopComponent() {
  return {
    restrict: 'A',
    scope: {
      'getDesktopMapFn': '&ngeoDesktopGeolocationMap',
      'getDesktopGeolocationOptionsFn': '&ngeoDesktopGeolocationOptions',
    },
    controller: 'ngeoGeolocationDesktopController',
  };
}

module.directive('ngeoDesktopGeolocation', GeolocationDesktopComponent);

/**
 * @constructor
 * @private
 * @hidden
 * @param {angular.IScope} $scope The directive's scope.
 * @param {JQuery} $element Element.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *    overlay manager service.
 * @param {import("ngeo/message/Notification.js").MessageNotification} ngeoNotification Ngeo notification
 *    service.
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoDesktopGeolocationController
 */
function Controller($scope, $element, ngeoFeatureOverlayMgr, ngeoNotification) {
  $element.on('click', this.toggle.bind(this));

  const map = $scope['getDesktopMapFn']();
  console.assert(map instanceof olMap);

  /**
   * @type {!import("ol/Map.js").default}
   * @private
   */
  this.map_ = map;

  const options = $scope['getDesktopGeolocationOptionsFn']() || {};
  console.assert(options);

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.$scope_ = $scope;

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
  });

  // handle geolocation error.
  this.geolocation_.on('error', (error) => {
    this.deactivate_();
    this.notification_.error(error.message);
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
   * @type {boolean}
   * @private
   */
  this.active_ = false;

  olEvents.listen(this.geolocation_, 'change:accuracyGeometry', () => {
    this.accuracyFeature_.setGeometry(this.geolocation_.getAccuracyGeometry());
  });

  olEvents.listen(this.geolocation_, 'change:position', (evt) => {
    const event = /** @type {import("ol/events/Event.js").default} */ (evt);
    this.setPosition_(event);
  });
}

/**
 */
Controller.prototype.toggle = function () {
  if (this.active_) {
    this.deactivate_();
  } else {
    this.activate_();
  }
};

/**
 * @private
 */
Controller.prototype.activate_ = function () {
  this.featureOverlay_.addFeature(this.positionFeature_);
  this.featureOverlay_.addFeature(this.accuracyFeature_);
  this.geolocation_.setTracking(true);
  this.active_ = true;
};

/**
 * @private
 */
Controller.prototype.deactivate_ = function () {
  this.featureOverlay_.clear();
  this.active_ = false;
  this.notification_.clear();
};

/**
 * @param {import("ol/events/Event.js").default} event Event.
 * @private
 */
Controller.prototype.setPosition_ = function (event) {
  const position = /** @type {import("ol/coordinate.js").Coordinate} */ (this.geolocation_.getPosition());
  const point = new olGeomPoint(position);

  this.positionFeature_.setGeometry(point);
  this.map_.getView().setCenter(position);

  if (this.zoom_ !== undefined) {
    this.map_.getView().setZoom(this.zoom_);
  }

  this.geolocation_.setTracking(false);
};

module.controller('ngeoGeolocationDesktopController', Controller);

export default module;
