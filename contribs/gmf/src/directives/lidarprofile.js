goog.provide('gmf.lidarProfileComponent');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('ol.events');
goog.require('ol.Feature');
goog.require('ol.Overlay');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.obj');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Style');

goog.require('ngeo.lidarProfile.loader');
goog.require('ngeo.lidarProfile.utils');
goog.require('ngeo.lidarProfile.measure');
goog.require('ngeo.lidarProfile.plot2canvas');

ngeo.module.value('gmfLidarProfileTemplateUrl',
  /**
     * @param {!angular.JQLite} $element Element.
     * @param {!angular.Attributes} $attrs Attributes.
     * @return {string} Template.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfLidarProfileTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/lidarprofile.html`;
  });


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfLidarProfileTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfLidarProfileTemplateUrl($element, $attrs, gmfLidarProfileTemplateUrl) {
  return gmfLidarProfileTemplateUrl($element, $attrs);
}


/**
 * Provide a component that display a lidar profile panel. This profile use the given
 * The 'map' attribute is optional and are only used to display on the map the
 * information that concern the hovered point (in the profile and on the map)
 * of the line.
 * This profile relies on the ngeo.profile (d3) and ngeo.ProfileComponent.
 *
 * Example:
 *
 *      <gmf-profile
 *        gmf-profile-active="ctrl.profileActive"
 *        gmf-profile-line="ctrl.profileLine"
 *        gmf-profile-map="::ctrl.map"
 *      </gmf-profile>
 *
 *
 * @htmlAttribute {boolean} gmf-profile-active Active the component.
 * @htmlAttribute {ol.geom.LineString} gmf-profile-line The linestring geometry
 *     to use to draw the profile.
 * @htmlAttribute {ol.Map?} gmf-profile-map An optional map.
 * @htmlAttribute {Object.<string, *>?} gmf-lidar-profile-options Optional options
 *     object like {@link ngeox.profile.ProfileOptions} but without any
 *     mandatory value. Will be passed to the ngeo profile component. Providing
*     i18n will override native gmf profile values.
 *
 * @ngdoc component
 * @ngname gmfLidarProfile
 */
gmf.lidarProfileComponent = {
  controller: 'GmfLidarProfileController',
  bindings: {
    'active': '=gmfLidarProfileActive',
    'line': '=gmfLidarProfileLine',
    'getMapFn': '&?gmfLidarProfileMap',
    'getOptionsFn': '&?gmfLidarProfileOptions'
  },
  templateUrl: gmfLidarProfileTemplateUrl
};


gmf.module.component('gmfLidarProfile', gmf.lidarProfileComponent);


/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {angular.$http} $http Angular http service.
 * @param {angular.JQLite} $element Element.
 * @param {angular.$filter} $filter Angular filter
 * @param {angular.$window} $window Angular window service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {string} pytreeLidarProfileJsonUrl URL of GMF service JSON profile.
 * @param {gmf.gmfLidarProfileConfig} gmfLidarProfileConfig LiDAR Profile Configuration Service
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfLidarProfileController
 */
gmf.LidarProfileController = function($scope, $http, $element, $filter,  $window,
  gettextCatalog, pytreeLidarProfileJsonUrl, gmfLidarProfileConfig) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.$element_ = $element;

  /**
   * @type {angular.$filter}
   * @export
   */
  this.$filter_ = $filter;
  /**
   * @type {angular.$window}
   * @export
   */
  this.$window_ = $window;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {string}
   * @private
   */
  this.pytreeLidarProfileJsonUrl_ = pytreeLidarProfileJsonUrl;

  /**
   * @type {string}
   * @private
   */
  this.gmfLidarProfileConfig_ = gmfLidarProfileConfig;

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = null;


  /**
   * @type {ol.geom.LineString}
   * @export
   */
  this.line;


  /**
   * Distance to highlight on the profile. (Property used in ngeo.Profile.)
   * @type {number}
   * @export
   */
  this.profileHighlight = -1;
  /**
   * Measure tool state
   * @type {boolean}
   * @export
   */
  this.lidarProfileMeasureActive = false;

  /**
   * Overlay to show the measurement.
   * @type {ol.Overlay}
   * @private
   */
  this.measureTooltip_ = null;

  /**
   * The measure tooltip element.
   * @type {Element}
   * @private
   */
  this.measureTooltipElement_ = null;

  /**
   * @type {ol.Feature}
   * @private
   */

  /**
   * @type {ngeox.profile.I18n}
   * @private
   */
  this.profileLabels_ = {
    xAxis: gettextCatalog.getString('Distance'),
    yAxis: gettextCatalog.getString('Elevation')
  };


  /**
   * @type {?ngeox.profile.LidarProfileOptions}
   * @export
   */
  this.lidarProfileOptions = null;

  /**
   * @type {boolean}
   * @export
   */
  this.active = false;

  /**
   * @type {ol.EventsKey}
   * @private
   */
  this.pointerMoveKey_;

  // Watch the active value to activate/deactive events listening.
  $scope.$watch(
    () => this.active,
    (newValue, oldValue) => {
      if (oldValue !== newValue) {
        this.updateEventsListening_();
      }
    });

  // Watch the line to update the profileData (data for the chart).
  $scope.$watch(
    () => this.line,
    (newLine, oldLine) => {
      if (oldLine !== newLine) {
        this.update_();
      }
    });

  $scope.$watch(
    () => this.gmfLidarProfileConfig_,
    (newConfig, oldConfig) => {
      if (oldConfig !== newConfig) {
        this.update_();
      }
    }
  );

  this.updateEventsListening_();
};


/**
 * Init the controller
 */
gmf.LidarProfileController.prototype.$onInit = function() {
  this.map_ = this['getMapFn'] ? this['getMapFn']() : null;
  this.nbPoints_ = this['getNbPointsFn'] ? this['getNbPointsFn']() : 100;

  let hoverPointStyle;
  const hoverPointStyleFn = this['getHoverPointStyleFn'];
  if (hoverPointStyleFn) {
    hoverPointStyle = hoverPointStyleFn();
    goog.asserts.assertInstanceof(hoverPointStyle, ol.style.Style);
  } else {
    hoverPointStyle = new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({color: '#ffffff'}),
        radius: 3
      })
    });
  }

  const optionsFn = this['getOptionsFn'];
  if (optionsFn) {
    const options = optionsFn();
    goog.asserts.assertObject(options);
    ol.obj.assign(this.profileOptions, options);
  }

};


/**
 * @private
 */
gmf.LidarProfileController.prototype.update_ = function() {
  this.isErrored = false;
  ngeo.lidarProfile.loader.clearBuffer();
  if (this.line) {
    this.gmfLidarProfileConfig_.olLinestring = this.line;
    this.gmfLidarProfileConfig_.map = this.map_;
    ngeo.lidarProfile.setOptions(this.gmfLidarProfileConfig_);
    ngeo.lidarProfile.loader.getProfileByLOD(0,
      true,
      this.gmfLidarProfileConfig_.profileConfig.minLOD);
  } else {
    ngeo.lidarProfile.loader.cartoHighlight.setPosition(undefined);
  }
  this.active = !!this.line;
};


/**
 * @private
 */
gmf.LidarProfileController.prototype.updateEventsListening_ = function() {
  if (this.active && this.map_ !== null) {
    this.pointerMoveKey_ = ol.events.listen(this.map_, 'pointermove',
      this.onPointerMove_.bind(this));
  } else {
    ol.Observable.unByKey(this.pointerMoveKey_);
  }
};


/**
 * @param {ol.MapBrowserPointerEvent} e An ol map browser pointer event.
 * @private
 */
gmf.LidarProfileController.prototype.onPointerMove_ = function(e) {
  if (e.dragging || !this.line) {
    return;
  }
  const coordinate = this.map_.getEventCoordinate(e.originalEvent);
  const closestPoint = this.line.getClosestPoint(coordinate);
  const eventToLine = new ol.geom.LineString([closestPoint, coordinate]);
  const pixelDist = eventToLine.getLength() / this.map_.getView().getResolution();

  if (pixelDist < 16) {
    this.profileHighlight = this.getDistanceOnALine_(closestPoint, this.line);
    ngeo.lidarProfile.drawProfilePosition(this.profileHighlight);
  } else {
    this.profileHighlight = -1;
    ngeo.lidarProfile.clearProfilePosition();
  }
  this.$scope_.$apply();
};


/**
 * Return the distance between the beginning of the line and the given point.
 * The point must be on the line. If not, this function will return the total
 * length of the line.
 * @param {ol.Coordinate} pointOnLine A point on the given line.
 * @param {ol.geom.LineString} line A line.
 * @return {number} A distance.
 * @private
 */
gmf.LidarProfileController.prototype.getDistanceOnALine_ = function(pointOnLine,
  line) {
  let segment;
  let distOnLine = 0;
  const fakeExtent = [
    pointOnLine[0] - 0.5,
    pointOnLine[1] - 0.5,
    pointOnLine[0] + 0.5,
    pointOnLine[1] + 0.5
  ];
  this.line.forEachSegment((firstPoint, lastPoint) => {
    segment = new ol.geom.LineString([firstPoint, lastPoint]);
    if (segment.intersectsExtent(fakeExtent)) {

      segment.setCoordinates([firstPoint, pointOnLine]);
      return distOnLine += segment.getLength();
    } else {
      distOnLine += segment.getLength();
    }
  });
  return distOnLine;
};


gmf.module.controller('GmfLidarProfileController', gmf.LidarProfileController);
