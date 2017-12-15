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

goog.require('ngeo.extendedProfile.loader');
goog.require('ngeo.extendedProfile.utils');
goog.require('ngeo.extendedProfile.measure');
goog.require('ngeo.extendedProfile.plot2canvas');

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
 * Provide a component that display a profile panel. This profile use the given
 * LineString geometry to request the c2cgeoportal profile.json service. The
 * raster used in the request are the keys of the 'linesconfiguration' object.
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
 *        gmf-profile-linesconfiguration="::ctrl.profileLinesconfiguration">
 *      </gmf-profile>
 *
 *
 * @htmlAttribute {boolean} gmf-profile-active Active the component.
 * @htmlAttribute {ol.geom.LineString} gmf-profile-line The linestring geometry
 *     to use to draw the profile.
 * @htmlAttribute {ol.Map?} gmf-profile-map An optional map.
 * @htmlAttribute {Object.<string, gmfx.ProfileLineConfiguration>}
 *     gmf-profile-linesconfiguration The configuration of the lines. Each keys
 *     will be used to request elevation layers.
 * @htmlAttribute {ol.style.Style?} gmf-profile-hoverpointstyle Optional style
 *     for the 'on Hover' point on the line.
 * @htmlAttribute {number?} gmf-profile-numberofpoints Optional maximum limit of
 *     points to request. Default to 100.
 * @htmlAttribute {Object.<string, *>?} gmf-profile-options Optional options
 *     object like {@link ngeox.profile.ProfileOptions} but without any
 *     mandatory value. Will be passed to the ngeo profile component. Providing
 *     'linesConfiguration', 'distanceExtractor', hoverCallback, outCallback
 *     or i18n will override native gmf profile values.
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
    'getLinesConfigurationFn': '&gmfLidarProfileLinesconfiguration',
    'getHoverPointStyleFn': '&?gmfLidarProfileHoverpointstyle',
    'getNbPointsFn': '&?gmfLidarProfileNumberofpoints',
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
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {string} pytreeLidarProfileJsonUrl URL of GMF service JSON profile.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfLidarProfileController
 */
gmf.LidarProfileController = function($scope, $http, $element, $filter,
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
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {string}
   * @private
   */
  this.pytreeLidarProfileJsonUrl_ = pytreeLidarProfileJsonUrl;
  
  this.gmfLidarProfileConfig_ = gmfLidarProfileConfig;

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = null;

  /**
   * @type {?Object<string, !gmfx.LidarProfileLineConfiguration>}
   * @private
   */
  this.linesConfiguration_ = null;

  /**
   * @type {!Array.<string>}
   * @private
   */
  this.layersNames_ = [];

  /**
   * @type {number}
   * @private
   */
  this.nbPoints_ = 1000;

  /**
   * @type {ol.geom.LineString}
   * @export
   */
  this.line;

  /**
   * @type {Array.<Object>}
   * @export
   */
  this.profileData = [];

  /**
   * @type {gmfx.ProfileHoverPointInformations}
   * @export
   */
  this.currentPoint = {
    coordinate: undefined,
    distance: undefined,
    elevations: {},
    xUnits: undefined,
    yUnits: undefined
  };

  /**
   * Distance to highlight on the profile. (Property used in ngeo.Profile.)
   * @type {number}
   * @export
   */
  this.profileHighlight = -1;

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
  // this.snappedPoint_ = new ol.Feature();
  // this.pointHoverOverlay_.addFeature(this.snappedPoint_);

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

  /**
   * @type {boolean}
   * @export
   */
  this.isErrored = false;


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
  // this.pointHoverOverlay_.setStyle(hoverPointStyle);

  const linesConfiguration = this['getLinesConfigurationFn']();
  goog.asserts.assertInstanceof(linesConfiguration, Object);

  this.linesConfiguration_ = linesConfiguration;

  for (const name in this.linesConfiguration_) {
    // Keep an array of all layer names.
    this.layersNames_.push(name);
    // Add generic zExtractor to lineConfiguration object that doesn't have one.
    const lineConfig = this.linesConfiguration_[name];
    if (!lineConfig.zExtractor) {
      this.linesConfiguration_[name].zExtractor = this.getZFactory_(name);
    }
  }

  this.LidarProfileOptions = /** @type {ngeox.lidarProfile.LidarProfileOptions} */ ({
    linesConfiguration: this.linesConfiguration_,
    distanceExtractor: this.getDist_,
    // hoverCallback: this.hoverCallback_.bind(this),
    outCallback: this.outCallback_.bind(this),
    i18n: this.profileLabels_
  });

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
  if (this.line) {
    this.gmfLidarProfileConfig_.olLinestring = this.line;
    this.gmfLidarProfileConfig_.map = this.map_;
    ngeo.extendedProfile.setOptions(this.gmfLidarProfileConfig_);
    ngeo.extendedProfile.loader.getProfileByLOD(0, true, this.gmfLidarProfileConfig_.profileConfig.minLOD, this.gmfLidarProfileConfig_.profileConfig.maxLOD);
  } else {
    this.profileData = [];
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
  // compute distance to line in pixels
  const eventToLine = new ol.geom.LineString([closestPoint, coordinate]);
  const pixelDist = eventToLine.getLength() / this.map_.getView().getResolution();

  if (pixelDist < 16) {
    this.profileHighlight = this.getDistanceOnALine_(closestPoint, this.line);
  } else {
    this.profileHighlight = -1;
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
    // Is the pointOnLine on this swegement ?
    if (segment.intersectsExtent(fakeExtent)) {
      // If the closestPoint is on the line, add the distance between the first
      // point of this segment and the pointOnLine.
      segment.setCoordinates([firstPoint, pointOnLine]);
      return distOnLine += segment.getLength(); // Assign value and break;
    } else {
      // Do the sum of the length of each eventual previous segment.
      distOnLine += segment.getLength();
    }
  });
  return distOnLine;
};


/**
 * @param {Object} point Point.
 * @param {number} dist distance on the line.
 * @param {string} xUnits X units label.
 * @param {Object.<string, number>} elevationsRef Elevations references.
 *  @param {string} yUnits Y units label.
 * @private
 */
gmf.LidarProfileController.prototype.hoverCallback_ = function(point, dist, xUnits,
  elevationsRef, yUnits) {
  // Update information point.
  let ref;
  const coordinate = [point.x, point.y];
  for (ref in elevationsRef) {
    this.currentPoint.elevations[ref] = elevationsRef[ref];
  }
  this.currentPoint.distance = dist;
  this.currentPoint.xUnits = xUnits;
  this.currentPoint.yUnits = yUnits;
  this.currentPoint.coordinate = coordinate;

  // Update hover.
  const geom = new ol.geom.Point(coordinate);
  this.createMeasureTooltip_();
  this.measureTooltipElement_.innerHTML = this.getTooltipHTML_();
  this.measureTooltip_.setPosition(coordinate);
  this.snappedPoint_.setGeometry(geom);
};


/**
 * @private
 */
gmf.LidarProfileController.prototype.outCallback_ = function() {
  // Reset information point.
  this.currentPoint.coordinate = undefined;
  this.currentPoint.distance = undefined;
  this.currentPoint.elevations = {};
  this.currentPoint.xUnits = undefined;
  this.currentPoint.yUnits = undefined;

  // Reset hover.
  this.removeMeasureTooltip_();
  this.snappedPoint_.setGeometry(null);
};


/**
 * @return {string} A texte formatted to a tooltip.
 * @private
 */
gmf.LidarProfileController.prototype.getTooltipHTML_ = function() {
  const separator = ' : ';
  let elevationName, translatedElevationName;
  const innerHTML = [];
  const number = this.$filter_('number');
  const DistDecimal = this.currentPoint.xUnits === 'm' ? 0 : 2;
  innerHTML.push(
    `${this.profileLabels_.xAxis +
      separator +
      number(this.currentPoint.distance, DistDecimal)
    } ${
      this.currentPoint.xUnits}`
  );
  for (elevationName in this.currentPoint.elevations) {
    translatedElevationName = this.gettextCatalog_.getString(elevationName);
    innerHTML.push(
      `${translatedElevationName +
        separator +
        number(this.currentPoint.elevations[elevationName], 0)
      } ${this.currentPoint.yUnits}`
    );
  }
  return innerHTML.join('</br>');
};


/**
 * Creates a new 'hover' tooltip
 * @private
 */
gmf.LidarProfileController.prototype.createMeasureTooltip_ = function() {
  this.removeMeasureTooltip_();
  this.measureTooltipElement_ = document.createElement('div');
  this.measureTooltipElement_.className += 'tooltip ngeo-tooltip-measure';
  this.measureTooltip_ = new ol.Overlay({
    element: this.measureTooltipElement_,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  this.map_.addOverlay(this.measureTooltip_);
};


/**
 * Destroy the 'hover' tooltip
 * @private
 */
gmf.LidarProfileController.prototype.removeMeasureTooltip_ = function() {
  if (this.measureTooltipElement_ !== null) {
    this.measureTooltipElement_.parentNode.removeChild(
      this.measureTooltipElement_);
    this.measureTooltipElement_ = null;
    this.map_.removeOverlay(this.measureTooltip_);
  }
};


/**
 * Return the color value of a gmfx.ProfileLineConfiguration.
 * @param {string} layerName name of the elevation layer.
 * @return {string|undefined} A HEX color or undefined is nothing is found.
 * @export
 */
gmf.LidarProfileController.prototype.getColor = function(layerName) {
  const lineConfiguration = this.linesConfiguration_[layerName];
  if (!lineConfiguration) {
    return undefined;
  }
  return lineConfiguration.color;
};


/**
 * Return a copy of the existing layer names.
 * @return {Array.<string>} The names of layers.
 * @export
 */
gmf.LidarProfileController.prototype.getLayersNames = function() {
  return this.layersNames_.slice(0);
};


/**
 * @param {string} layerName name of the elevation layer.
 * @return {function(Object):number} Z extractor function.
 * @private
 */
gmf.LidarProfileController.prototype.getZFactory_ = function(layerName) {
  /**
   * Generic GMF extractor for the 'given' value in 'values' in profileData.
   * @param {Object} item The item.
   * @return {number} The elevation.
   * @private
   */
  const getZFn = function(item) {
    if ('values' in item && layerName in item['values']) {
      return parseFloat(item['values'][layerName]);
    }
    return 0;
  };
  return getZFn;
};


/**
 * Extractor for the 'dist' value in profileData.
 * @param {Object} item The item.
 * @return {number} The distance.
 * @private
 */
gmf.LidarProfileController.prototype.getDist_ = function(item) {
  if ('dist' in item) {
    return item['dist'];
  }
  return 0;
};

/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.LidarProfileController.prototype.getProfileDataSuccess_ = function(resp) {
  const profileData = resp.data['profile'];
  if (profileData instanceof Array) {
    this.profileData = profileData;
  }
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.LidarProfileController.prototype.getProfileDataError_ = function(resp) {
  this.isErrored = true;
};


gmf.module.controller('GmfLidarProfileController', gmf.LidarProfileController);
