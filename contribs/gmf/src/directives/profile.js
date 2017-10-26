goog.provide('gmf.profileComponent');

goog.require('gmf');
goog.require('ngeo.CsvDownload');
goog.require('ngeo.FeatureOverlayMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.profileDirective');
goog.require('ol.Feature');
goog.require('ol.Overlay');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.obj');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Style');


ngeo.module.value('gmfProfileTemplateUrl',
  /**
     * @param {!angular.JQLite} $element Element.
     * @param {!angular.Attributes} $attrs Attributes.
     * @return {string} Template.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfProfileTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/profile.html`;
  });


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfProfileTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfProfileTemplateUrl($element, $attrs, gmfProfileTemplateUrl) {
  return gmfProfileTemplateUrl($element, $attrs);
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
 * @ngname gmfProfile
 */
gmf.profileComponent = {
  controller: 'GmfProfileController as ctrl',
  bindings: {
    'active': '=gmfProfileActive',
    'line': '=gmfProfileLine',
    'getMapFn': '&?gmfProfileMap',
    'getLinesConfigurationFn': '&gmfProfileLinesconfiguration',
    'getHoverPointStyleFn': '&?gmfProfileHoverpointstyle',
    'getNbPointsFn': '&?gmfProfileNumberofpoints',
    'getOptionsFn': '&?gmfProfileOptions'
  },
  templateUrl: gmfProfileTemplateUrl
};


gmf.module.component('gmfProfile', gmf.profileComponent);


/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {angular.$http} $http Angular http service.
 * @param {angular.JQLite} $element Element.
 * @param {angular.$filter} $filter Angular filter
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @param {string} gmfProfileJsonUrl URL of GMF service JSON profile.
 * @param {ngeo.CsvDownload} ngeoCsvDownload CSV Download service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfProfileController
 */
gmf.ProfileController = function($scope, $http, $element, $filter,
  gettextCatalog, ngeoFeatureOverlayMgr, gmfProfileJsonUrl,
  ngeoCsvDownload) {

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
   * @type {ngeo.FeatureOverlay}
   * @private
   */
  this.pointHoverOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  /**
   * @type {string}
   * @private
   */
  this.gmfProfileJsonUrl_ = gmfProfileJsonUrl;

  /**
   * @type {ngeo.CsvDownload}
   * @private
   */
  this.ngeoCsvDownload_ = ngeoCsvDownload;

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = null;

  /**
   * @type {?Object<string, !gmfx.ProfileLineConfiguration>}
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
  this.nbPoints_ = 100;

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
  this.snappedPoint_ = new ol.Feature();
  this.pointHoverOverlay_.addFeature(this.snappedPoint_);

  /**
   * @type {ngeox.profile.I18n}
   * @private
   */
  this.profileLabels_ = {
    xAxis: gettextCatalog.getString('Distance'),
    yAxis: gettextCatalog.getString('Elevation')
  };


  /**
   * @type {?ngeox.profile.ProfileOptions}
   * @export
   */
  this.profileOptions = null;

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

  this.updateEventsListening_();
};


/**
 * Init the controller
 */
gmf.ProfileController.prototype.$onInit = function() {
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
  this.pointHoverOverlay_.setStyle(hoverPointStyle);

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

  this.profileOptions = /** @type {ngeox.profile.ProfileOptions} */ ({
    linesConfiguration: this.linesConfiguration_,
    distanceExtractor: this.getDist_,
    hoverCallback: this.hoverCallback_.bind(this),
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
gmf.ProfileController.prototype.update_ = function() {
  this.isErrored = false;
  if (this.line) {
    this.getJsonProfile_();
  } else {
    this.profileData = [];
  }
  this.active = !!this.line;
};


/**
 * @private
 */
gmf.ProfileController.prototype.updateEventsListening_ = function() {
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
gmf.ProfileController.prototype.onPointerMove_ = function(e) {
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
gmf.ProfileController.prototype.getDistanceOnALine_ = function(pointOnLine,
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
gmf.ProfileController.prototype.hoverCallback_ = function(point, dist, xUnits,
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
gmf.ProfileController.prototype.outCallback_ = function() {
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
gmf.ProfileController.prototype.getTooltipHTML_ = function() {
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
gmf.ProfileController.prototype.createMeasureTooltip_ = function() {
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
gmf.ProfileController.prototype.removeMeasureTooltip_ = function() {
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
gmf.ProfileController.prototype.getColor = function(layerName) {
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
gmf.ProfileController.prototype.getLayersNames = function() {
  return this.layersNames_.slice(0);
};


/**
 * @param {string} layerName name of the elevation layer.
 * @return {function(Object):number} Z extractor function.
 * @private
 */
gmf.ProfileController.prototype.getZFactory_ = function(layerName) {
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
gmf.ProfileController.prototype.getDist_ = function(item) {
  if ('dist' in item) {
    return item['dist'];
  }
  return 0;
};


/**
 * Request the profile.
 * @private
 */
gmf.ProfileController.prototype.getJsonProfile_ = function() {
  const geom = {
    'type': 'LineString',
    'coordinates': this.line.getCoordinates()
  };

  const params = {
    'layers': this.layersNames_.join(','),
    'geom': JSON.stringify(geom),
    'nbPoints': this.nbPoints_
  };

  /** @type {Function} */ (this.$http_)({
    url: this.gmfProfileJsonUrl_,
    method: 'POST',
    params,
    paramSerializer: '$httpParamSerializerJQLike',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(
    this.getProfileDataSuccess_.bind(this),
    this.getProfileDataError_.bind(this)
  );
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.ProfileController.prototype.getProfileDataSuccess_ = function(resp) {
  const profileData = resp.data['profile'];
  if (profileData instanceof Array) {
    this.profileData = profileData;
  }
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.ProfileController.prototype.getProfileDataError_ = function(resp) {
  this.isErrored = true;
  console.error('Can not get JSON profile.');
};


/**
 * Request the csv profile with the current profile data.
 * @export
 */
gmf.ProfileController.prototype.downloadCsv = function() {
  if (this.profileData.length === 0) {
    return;
  }

  /** @type {Array.<ngeox.GridColumnDef>} */
  const headers = [];
  let hasDistance = false;
  const firstPoint = this.profileData[0];
  if ('dist' in firstPoint) {
    headers.push({name: 'distance'});
    hasDistance = true;
  }
  const layers = [];
  for (const layer in firstPoint['values']) {
    headers.push({'name': layer});
    layers.push(layer);
  }
  headers.push({name: 'x'});
  headers.push({name: 'y'});

  const rows = this.profileData.map((point) => {
    const row = {};
    if (hasDistance) {
      row['distance'] = point['dist'];
    }

    layers.forEach((layer) => {
      row[layer] = point['values'][layer];
    });

    row['x'] = point['x'];
    row['y'] = point['y'];

    return row;
  });

  this.ngeoCsvDownload_.startDownload(rows, headers, 'profile.csv');
};


gmf.module.controller('GmfProfileController', gmf.ProfileController);
