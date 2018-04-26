/**
 * @module ngeo.geolocation.desktop
 */
import googAsserts from 'goog/asserts.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import ngeoMessageNotification from 'ngeo/message/Notification.js';
import * as olEvents from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import olGeolocation from 'ol/Geolocation.js';
import olMap from 'ol/Map.js';
import olGeomPoint from 'ol/geom/Point.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoDesktopGeolocation', [
  ngeoMapFeatureOverlayMgr.module.name,
  ngeoMessageNotification.module.name,
]);


/**
 * @enum {string}
 */
exports.GeolocationEventType = {
  /**
   * Triggered when an error occurs.
   */
  ERROR: 'desktop-geolocation-error'
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
 * @htmlAttribute {ol.Map} gmf-geolocation-map The map.
 * @htmlAttribute {ngeox.DesktopGeolocationDirectiveOptions} gmf-geolocation-options The options.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDesktopGeolocation
 */
exports.directive_ = function() {
  return {
    restrict: 'A',
    scope: {
      'getDesktopMapFn': '&ngeoDesktopGeolocationMap',
      'getDesktopGeolocationOptionsFn': '&ngeoDesktopGeolocationOptions'
    },
    controller: 'ngeoGeolocationDesktopController'
  };
};


exports.directive('ngeoDesktopGeolocation', exports.directive_);


/**
 * @constructor
 * @private
 * @struct
 * @param {angular.Scope} $scope The directive's scope.
 * @param {angular.JQLite} $element Element.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {ngeo.message.Notification} ngeoNotification Ngeo notification service.
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoDesktopGeolocationController
 */
exports.Controller_ = function($scope, $element,
  ngeoFeatureOverlayMgr, ngeoNotification) {

  $element.on('click', this.toggle.bind(this));

  const map = $scope['getDesktopMapFn']();
  googAsserts.assertInstanceof(map, olMap);

  /**
   * @type {!ol.Map}
   * @private
   */
  this.map_ = map;

  const options = $scope['getDesktopGeolocationOptionsFn']() || {};
  googAsserts.assertObject(options);

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {ngeo.message.Notification}
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
  this.geolocation_ = new olGeolocation({
    projection: map.getView().getProjection()
  });

  // handle geolocation error.
  this.geolocation_.on('error', function(error) {
    this.deactivate_();
    this.notification_.error(error.message);
    $scope.$emit(exports.GeolocationEventType.ERROR, error);
  }, this);

  /**
   * @type {ol.Feature}
   * @private
   */
  this.positionFeature_ = new olFeature();

  if (options.positionFeatureStyle) {
    this.positionFeature_.setStyle(options.positionFeatureStyle);
  }

  /**
   * @type {ol.Feature}
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

  olEvents.listen(this.geolocation_, 'change:position', (event) => {
    this.setPosition_(event);
  });

};


/**
 * @export
 */
exports.Controller_.prototype.toggle = function() {
  if (this.active_) {
    this.deactivate_();
  } else {
    this.activate_();
  }
};


/**
 * @private
 */
exports.Controller_.prototype.activate_ = function() {
  this.featureOverlay_.addFeature(this.positionFeature_);
  this.featureOverlay_.addFeature(this.accuracyFeature_);
  this.geolocation_.setTracking(true);
  this.active_ = true;
};


/**
 * @private
 */
exports.Controller_.prototype.deactivate_ = function() {
  this.featureOverlay_.clear();
  this.active_ = false;
  this.notification_.clear();
};


/**
 * @param {ol.Object.Event} event Event.
 * @private
 */
exports.Controller_.prototype.setPosition_ = function(event) {
  const position = /** @type {ol.Coordinate} */ (this.geolocation_.getPosition());
  const point = new olGeomPoint(position);

  this.positionFeature_.setGeometry(point);
  this.map_.getView().setCenter(position);

  if (this.zoom_ !== undefined) {
    this.map_.getView().setZoom(this.zoom_);
  }

  this.geolocation_.setTracking(false);
};

exports.controller('ngeoGeolocationDesktopController',
  exports.Controller_);


export default exports;
