goog.provide('gmf.ProfileController');
goog.provide('gmf.profileDirective');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('ngeo.profileDirective');
goog.require('ol.geom.LineString');


ngeo.module.value('gmfProfileTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfProfileTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/profile.html';
    });


/**
 * Provide a directive that display a profile panel. This profile use the given
 * LineString geometry to request the c2cgeoportal profile.json service. The
 * raster used in the request are the keys of the 'linesconfiguration' object.
 * The 'profileActive', 'informationscallback' and 'map' attributes are
 * optionals and are only used to retrieve and display on the map the
 * informations that concerne the hovered point (in the profile or on the
 * map) of the line.
 * This profile relies on the ngeo.profile (d3) and ngeo.ProfileDirective.
 *
 * Example:
 *
 *      <gmf-profile
 *        gmf-profile-active="ctrl.profileActive"
 *        gmf-profile-line="ctrl.profileLine"
 *        gmf-profile-map="::ctrl.map"
 *        gmf-profile-linesconfiguration="::ctrl.profileLinesconfiguration"
 *        gmf-profile-informationscallback="::ctrl.profileInformationsCallback"
 *        gmf-profile-numberofpoints="::ctrl.profileNumberOfPoints"
 *        gmf-profile-css="::ctrl.profileCss">
 *      </gmf-profile>
 *
 *
 * @htmlAttribute {boolean?} gmf-profile-active Optional to active the hover
 *     functions.
 * @htmlAttribute {ol.geom.LineString} gmf-profile-line The linestring geometry
 *     to use to draw the profile.
 * @htmlAttribute {ol.Map?} gmf-profile-map An optional map.
 * @htmlAttribute {Object.<string, gmfx.ProfileLineConfiguration>}
 *     gmf-profile-linesconfiguration The configuration of the lines. Each keys
 *     will be used to request elevation layers.
 * @htmlAttribute {function(gmfx.ProfileHoverPointInformations)?}
 *     gmf-profile-informationscallback Optional callback function that will be
 *     called at each changes on profile and line hover (component must be
 *     active and must have a map).
 * @htmlAttribute {number?} gmf-profile-numberofpoints Optional maximum limit of
 *     points to request. Default to 100.
 * @htmlAttribute {string?} gmf-profile-css Inline Optional CSS style definition
 *     to inject in the SVG.
 * @param {string} gmfProfileTemplateUrl URL to a template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfProfile
 */
gmf.profileDirective = function(gmfProfileTemplateUrl) {
  return {
    bindToController: true,
    controller: 'GmfProfileController',
    controllerAs: 'ctrl',
    templateUrl: gmfProfileTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'active': '<?gmfProfileActive',
      'line': '<gmfProfileLine',
      'getMapFn': '&?gmfProfileMap',
      'getLinesConfigurationFn': '&gmfProfileLinesconfiguration',
      'getInformationsCallbackFn': '&?gmfProfileInformationscallback',
      'getNbPointsFn': '&?gmfProfileNumberofpoints',
      'getCssFn': '&?gmfProfileCss'
    }
  };
};


gmf.module.directive('gmfProfile', gmf.profileDirective);


/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {angular.$http} $http Angular http service.
 * @param {angular.JQLite} $element Element.
 * @param {string} gmfProfileJsonUrl URL of GMF service JSON profile.
 * @param {string} gmfProfileCsvUrl URL of GMF service CSV profile.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfProfileController
 */
gmf.ProfileController = function($scope, $http, $element, gmfProfileJsonUrl,
    gmfProfileCsvUrl) {

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
   * @type {string}
   * @private
   */
  this.gmfProfileJsonUrl_ = gmfProfileJsonUrl;

  /**
   * @type {string}
   * @private
   */
  this.gmfProfileCsvUrl_ = gmfProfileCsvUrl;

  var map = null;
  var mapFn = this['getMapFn'];
  if (mapFn) {
    map = mapFn();
    goog.asserts.assertInstanceof(map, ol.Map);
  }

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = map;

  var linesConfiguration = this['getLinesConfigurationFn']();
  goog.asserts.assertInstanceof(linesConfiguration, Object);

  /**
   * @type {Object<string, gmfx.ProfileLineConfiguration>}
   * @private
   */
  this.linesConfiguration_ = linesConfiguration;

  /**
   * @type {Array.<string>}
   * @private
   */
  this.layersNames_ = [];

  var name, lineConfig;
  for (name in this.linesConfiguration_) {
    // Keep an array of all layer names.
    this.layersNames_.push(name);
    // Add generic zExtractor to lineConfiguration object that doesn't have one.
    lineConfig = this.linesConfiguration_[name];
    if (!lineConfig.zExtractor) {
      this.linesConfiguration_[name].zExtractor = this.getZFactory_(name);
    }
  }

  var css;
  var cssFn = this['getCssFn'];
  if (cssFn) {
    css = cssFn();
    goog.asserts.assertString(css);
  }

  /**
   * @type {string|undefined}
   * @private
   */
  this.css_ = css;

  var nbPoints = 100;
  var nbPointsFn = this['getNbPointsFn'];
  if (nbPointsFn) {
    nbPoints = nbPointsFn();
    goog.asserts.assertNumber(nbPoints);
  }

  /**
   * @type {number}
   * @private
   */
  this.nbPoints_ = nbPoints;

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
   * @type {number}
   * @export
   */
  this.profileHighlight = -1;

  /**
   * @type {ngeox.profile.ProfileOptions}
   * @export
   */
  this.profileOptions = /** @type {ngeox.profile.ProfileOptions} */ ({
    styleDefs: this.css_,
    linesConfiguration: this.linesConfiguration_,
    distanceExtractor: this.getDist_,
    hoverCallback: this.hoverCallback_.bind(this),
    outCallback: this.outCallback_.bind(this)
  });

  /**
   * @type {boolean}
   * @export
   */
  this.active = this.active === true;

  var informationsCallback = null;
  var informationsCallbackFn = this['getInformationsCallbackFn'];
  if (informationsCallbackFn) {
    informationsCallback = informationsCallbackFn();
    goog.asserts.assertInstanceof(informationsCallback, Function);
  }

  /**
   * @type {gmfx.ProfileHoverPointInformations}
   * @private
   */
  this.informationsCallback_ = /** @type {function(gmfx.ProfileHoverPointInformations)} */ (informationsCallback);

  /**
   * @type {ol.EventsKey}
   * @private
   */
  this.pointerMoveKey_;

  // Watch the active value to activate/deactive events listening.
  $scope.$watch(
    function() {
      return this.active;
    }.bind(this),
    function(oldValue, newValue) {
      if (oldValue !== newValue) {
        this.updateEventsListening_();
      }
    }.bind(this));

  // Watch the line to update the profileData (data for the chart).
  $scope.$watch(
    function() {
      return this.line;
    }.bind(this),
    function(oldLine, newLine) {
      if (oldLine !== newLine) {
        this.update_();
      }
    }.bind(this));

  this.updateEventsListening_();
};


/**
 * @private
 */
gmf.ProfileController.prototype.update_ = function() {
  if (this.line) {
    this.getJsonProfile_();
  } else {
    this.profileData = [];
  }
};


/**
 * @private
 */
gmf.ProfileController.prototype.updateEventsListening_ = function() {
  if (this.active === true && this.map_ !== null) {
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
  var coordinate = this.map_.getEventCoordinate(e.originalEvent);
  var closestPoint = this.line.getClosestPoint(coordinate);
  // compute distance to line in pixels
  var eventToLine = new ol.geom.LineString([closestPoint, coordinate]);
  var pixelDist = eventToLine.getLength() / this.map_.getView().getResolution();

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
  var segment;
  var distOnLine = 0;
  var fakeExtent = [
    pointOnLine[0] - 0.5,
    pointOnLine[1] - 0.5,
    pointOnLine[0] + 0.5,
    pointOnLine[1] + 0.5
  ];
  this.line.forEachSegment(function(firstPoint, lastPoint) {
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
  @param {string} yUnits Y units label.
 * @private
 */
gmf.ProfileController.prototype.hoverCallback_ = function(point, dist, xUnits,
    elevationsRef, yUnits) {
  var ref;
  var coordinate = [point.x, point.y];
  for (ref in elevationsRef) {
    this.currentPoint.elevations[ref] = elevationsRef[ref];
  }
  this.currentPoint.distance = dist;
  this.currentPoint.xUnits = xUnits;
  this.currentPoint.yUnits = yUnits;
  this.currentPoint.coordinate = coordinate;
  if (this.informationsCallback_ !== null) {
    this.informationsCallback_.call(null, this.currentPoint);
  }
};


/**
 * @private
 */
gmf.ProfileController.prototype.outCallback_ = function() {
  this.currentPoint.coordinate = undefined;
  this.currentPoint.distance = undefined;
  this.currentPoint.elevations = {};
  this.currentPoint.xUnits = undefined;
  this.currentPoint.yUnits = undefined;
  if (this.informationsCallback_ !== null) {
    this.informationsCallback_.call(null, this.currentPoint);
  }
};


/**
 * Return the color value of a gmfx.ProfileLineConfiguration.
 * @param {string} layerName name of the elevation layer.
 * @return {string|undefined} A HEX color or undefined is nothing is found.
 * @export
 */
gmf.ProfileController.prototype.getColor = function(layerName) {
  var lineConfiguration = this.linesConfiguration_[layerName];
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
  var getZFn = function(item) {
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
  var geom = {
    'type': 'LineString',
    'coordinates': this.line.getCoordinates()
  };

  var params = {
    'layers': this.layersNames_.join(','),
    'geom': JSON.stringify(geom),
    'nbPoints': this.nbPoints_
  };

  /** @type {Function} */ (this.$http_)({
    url: this.gmfProfileJsonUrl_,
    method: 'POST',
    params: params,
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
  var profileData = resp.data['profile'];
  if (profileData instanceof Array) {
    this.profileData = profileData;
  }
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.ProfileController.prototype.getProfileDataError_ = function(resp) {
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
  var geom = {
    'type': 'LineString',
    'coordinates': this.line.getCoordinates()
  };

  var params = {
    'layers': this.layersNames_.join(','),
    'geom': JSON.stringify(geom),
    'nbPoints': this.nbPoints_
  };

  /** @type {Function} */ (this.$http_)({
    url: this.gmfProfileCsvUrl_,
    method: 'POST',
    params: params,
    paramSerializer: '$httpParamSerializerJQLike',
    headers: {
      'Content-Type': 'text/csv;'
    }
  }).then(
    this.getCsvSuccess_.bind(this),
    this.getCsvError_.bind(this)
  );
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.ProfileController.prototype.getCsvSuccess_ = function(resp) {
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:attachment/csv,' + encodeURI(resp.data);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'profile.csv';
  hiddenElement.click();
  hiddenElement.remove();
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.ProfileController.prototype.getCsvError_ = function(resp) {
  console.error('Can not get CSV profile.');
};


gmf.module.controller('GmfProfileController', gmf.ProfileController);
