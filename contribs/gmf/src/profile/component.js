// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import {listen, unlistenByKey} from 'ol/events';
import olFeature from 'ol/Feature';
import olOverlay from 'ol/Overlay';
import olGeomLineString from 'ol/geom/LineString';
import olGeomPoint from 'ol/geom/Point';

import ngeoDownloadCsv from 'ngeo/download/Csv';

import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';

import ngeoProfileElevationComponent from 'ngeo/profile/elevationComponent';

import {buildStyle} from 'ngeo/options';

import 'bootstrap/js/src/dropdown';

/**
 * @typedef {Object} ProfileElement
 * @property {number} dist
 * @property {number} x
 * @property {number} y
 * @property {Object<string, number>} values
 */

/**
 * @typedef {Object} ProfileServiceResult
 * The eesult of the profile service
 * @property {ProfileElement[]} profile
 */

/**
 * Information to display for a given point in the profile. The point is
 * typically given by the profile's hover.
 * @typedef {Object} ProfileHoverPointInformations
 * @property {import('ol/coordinate').Coordinate} [coordinate] Coordinate of the point.
 * @property {number} [distance] distance of the point on the line. Can be in meters or kilometers.
 * @property {Object<string, number>} [elevations] Elevations of the point (example:
 *    {aster: 556.5, srtm: 560}).
 * @property {string} [xUnits] Units of the x axis.
 * @property {string} [yUnits] Units of the y axis.
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfProfile', [
  ngeoDownloadCsv.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoProfileElevationComponent.name,
]);

myModule.value(
  'gmfProfileTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} Template.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfProfileTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/profile';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/profile', require('./component.html'));
  }
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfProfileTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
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
 *        gmf-profile-map="::ctrl.map">
 *      </gmf-profile>
 *
 *
 * @htmlAttribute {boolean} gmf-profile-active Active the component.
 * @htmlAttribute {import('ol/geom/LineString').default} gmf-profile-line The linestring geometry
 *     to use to draw the profile.
 * @htmlAttribute {import('ol/Map').default?} gmf-profile-map An optional map.
 * @htmlAttribute {import('ol/style/Style').default?} gmf-profile-hoverpointstyle Optional style
 *     for the 'on Hover' point on the line.
 * @htmlAttribute {Object<string, *>?} gmf-profile-options Optional options
 *     object like {@link import('ngeo/profile/elevationComponent').ProfileOptions} but without any
 *     mandatory value. Will be passed to the ngeo profile component. Providing
 *     'linesConfiguration', 'distanceExtractor', hoverCallback, outCallback
 *     or i18n will override native gmf profile values.
 *
 * @ngdoc component
 * @ngname gmfProfile
 */
const profileComponent = {
  controller: 'GmfProfileController as ctrl',
  bindings: {
    'active': '=gmfProfileActive',
    'line': '=gmfProfileLine',
    'getMapFn': '&?gmfProfileMap',
    'getOptionsFn': '&?gmfProfileOptions',
  },
  templateUrl: gmfProfileTemplateUrl,
};

myModule.component('gmfProfile', profileComponent);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.IHttpService} $http Angular http service.
 * @param {JQuery} $element Element.
 * @param {angular.IFilterService} $filter Angular filter
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @param {string} gmfProfileJsonUrl URL of GMF service JSON profile.
 * @param {import('ngeo/download/Csv').DownloadCsvService} ngeoCsvDownload CSV Download service.
 * @param {import('gmf/options').gmfProfileOptions} gmfProfileOptions The options.
 * @param {import('ngeo/options').ngeoProfileOptions} ngeoProfileOptions The options.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfProfileController
 */
export function ProfileController(
  $scope,
  $http,
  $element,
  $filter,
  gettextCatalog,
  ngeoFeatureOverlayMgr,
  gmfProfileJsonUrl,
  ngeoCsvDownload,
  gmfProfileOptions,
  ngeoProfileOptions
) {
  this.options = gmfProfileOptions;
  this.ngeoOptions = ngeoProfileOptions;

  /**
   * @type {angular.IScope}
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.IHttpService}
   */
  this.$http_ = $http;

  /**
   * @type {JQuery}
   */
  this.$element_ = $element;

  /**
   * @type {angular.IFilterService}
   */
  this.$filter_ = $filter;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {import('ngeo/map/FeatureOverlay').FeatureOverlay}
   */
  this.pointHoverOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  /**
   * @type {string}
   */
  this.gmfProfileJsonUrl_ = gmfProfileJsonUrl;

  /**
   * @type {import('ngeo/download/Csv').DownloadCsvService}
   */
  this.ngeoCsvDownload_ = ngeoCsvDownload;

  /**
   * @type {?import('ol/Map').default}
   */
  this.map_ = null;

  /**
   * @type {string[]}
   */
  this.layersNames_ = [];

  /**
   * @type {number}
   */
  this.nbPoints_ = 100;

  /**
   * @type {?import('ol/geom/LineString').default}
   */
  this.line = null;

  /**
   * @type {ProfileElement[]}
   */
  this.profileData = [];

  /**
   * @type {ProfileHoverPointInformations}
   */
  this.currentPoint = {
    elevations: {},
  };

  /**
   * Distance to highlight on the profile. (Property used in ngeo.Profile.)
   * @type {number}
   */
  this.profileHighlight = -1;

  /**
   * Overlay to show the measurement.
   * @type {?import('ol/Overlay').default}
   */
  this.measureTooltip_ = null;

  /**
   * The measure tooltip element.
   * @type {?HTMLElement}
   */
  this.measureTooltipElement_ = null;

  /**
   * @type {olFeature<import('ol/geom/Geometry').default>}
   */
  this.snappedPoint_ = new olFeature();
  this.pointHoverOverlay_.addFeature(this.snappedPoint_);

  /**
   * @type {import('ngeo/profile/elevationComponent').I18n}
   */
  this.profileLabels_ = {
    xAxis: gettextCatalog.getString('Distance'),
    yAxis: gettextCatalog.getString('Elevation'),
  };

  /**
   * @type {?import('ngeo/profile/elevationComponent').ProfileOptions<ProfileElement>}
   */
  this.profileOptions = null;

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {?import('ol/events').EventsKey}
   */
  this.pointerMoveKey_ = null;

  /**
   * @type {boolean}
   */
  this.isErrored = false;

  /**
   * @type {boolean}
   */
  this.isLoading = false;

  /**
   * @type {function():import('ol/Map').default}
   */
  this.getMapFn = () => null;
  this.getOptionsFn = () => ({});

  // Watch the active value to activate/deactivate events listening.
  $scope.$watch(
    () => this.active,
    (newValue, oldValue) => {
      if (oldValue !== newValue) {
        this.updateEventsListening_();
      }
    }
  );

  // Watch the line to update the profileData (data for the chart).
  $scope.$watch(
    () => this.line,
    (newLine, oldLine) => {
      if (oldLine !== newLine) {
        this.update_();
      }
    }
  );

  this.updateEventsListening_();
}

/**
 * Init the controller
 */
ProfileController.prototype.$onInit = function () {
  this.map_ = this.getMapFn();
  this.nbPoints_ = this.options.numberOfPoints || 100;

  this.pointHoverOverlay_.setStyle(buildStyle(this.options.hoverPointStyle));

  for (const name in this.ngeoOptions.linesConfiguration) {
    // Keep an array of all layer names.
    this.layersNames_.push(name);
    // Add generic zExtractor to lineConfiguration object that doesn't have one.
    const lineConfig = this.ngeoOptions.linesConfiguration[name];
    if (!lineConfig.zExtractor) {
      // @ts-ignore: There look to have a type error in d3
      this.ngeoOptions.linesConfiguration[name].zExtractor = this.getZFactory_(name);
    }
  }

  this.profileOptions =
    /** @type {import('ngeo/profile/elevationComponent').ProfileOptions<ProfileElement>} */ ({
      linesConfiguration: this.ngeoOptions.linesConfiguration,
      distanceExtractor: this.getDist_,
      hoverCallback: this.hoverCallback_.bind(this),
      outCallback: this.outCallback_.bind(this),
      i18n: this.profileLabels_,
    });

  const optionsFn = this.getOptionsFn;
  if (optionsFn) {
    const options = optionsFn();
    if (!options) {
      throw new Error('Missing options');
    }
    Object.assign(this.profileOptions, options);
  }
};

ProfileController.prototype.update_ = function () {
  this.isErrored = false;
  if (this.line) {
    this.getJsonProfile_();
  } else {
    this.profileData = [];
  }
  this.active = !!this.line;
};

ProfileController.prototype.updateEventsListening_ = function () {
  if (this.active && this.map_ !== null) {
    this.pointerMoveKey_ = listen(
      this.map_,
      'pointermove',
      /** @type {import('ol/events').ListenerFunction} */ (
        /**
         * @param {import('ol/MapBrowserEvent').default<MouseEvent>} mapBrowserEvent
         */
        (mapBrowserEvent) => {
          if (!this.map_) {
            throw new Error('Missing map');
          }
          if (mapBrowserEvent.dragging || !this.line) {
            return;
          }
          const coordinate = this.map_.getEventCoordinate(mapBrowserEvent.originalEvent);
          const closestPoint = this.line.getClosestPoint(coordinate);
          // compute distance to line in pixels
          const eventToLine = new olGeomLineString([closestPoint, coordinate]);
          const resolution = this.map_.getView().getResolution();
          if (resolution === undefined) {
            throw new Error('Missing resolution');
          }
          const pixelDist = eventToLine.getLength() / resolution;

          if (pixelDist < 16) {
            this.profileHighlight = this.getDistanceOnALine_(closestPoint);
          } else {
            this.profileHighlight = -1;
          }
          this.$scope_.$apply();
        }
      )
    );
  } else {
    if (this.pointerMoveKey_) {
      unlistenByKey(this.pointerMoveKey_);
    }
  }
};

/**
 * Return the distance between the beginning of the line and the given point.
 * The point must be on the line. If not, this function will return the total
 * length of the line.
 * @param {import('ol/coordinate').Coordinate} pointOnLine A point on the given line.
 * @return {number} A distance.
 */
ProfileController.prototype.getDistanceOnALine_ = function (pointOnLine) {
  if (!this.line) {
    throw new Error('Missing line');
  }
  let segment;
  let distOnLine = 0;
  /** @type {[number, number, number, number]} */
  const fakeExtent = [pointOnLine[0] - 0.5, pointOnLine[1] - 0.5, pointOnLine[0] + 0.5, pointOnLine[1] + 0.5];
  this.line.forEachSegment((firstPoint, lastPoint) => {
    segment = new olGeomLineString([firstPoint, lastPoint]);
    // Is the pointOnLine on this swegement ?
    if (segment.intersectsExtent(fakeExtent)) {
      // If the closestPoint is on the line, add the distance between the first
      // point of this segment and the pointOnLine.
      segment.setCoordinates([firstPoint, pointOnLine]);
      return (distOnLine += segment.getLength()); // Assign value and break;
    } else {
      // Do the sum of the length of each eventual previous segment.
      distOnLine += segment.getLength();
    }
  });
  return distOnLine;
};

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {unknown} pointObject Point.
 * @param {number} dist distance on the line.
 * @param {string} xUnits X units label.
 * @param {Object<string, number>} elevationsRef Elevations references.
 * @param {string} yUnits Y units label.
 */
ProfileController.prototype.hoverCallback_ = function (pointObject, dist, xUnits, elevationsRef, yUnits) {
  const point = /** @type {Point} */ (pointObject);
  // Update information point.
  const coordinate = [point.x, point.y];

  this.currentPoint.elevations = elevationsRef;
  this.currentPoint.distance = dist;
  this.currentPoint.xUnits = xUnits;
  this.currentPoint.yUnits = yUnits;
  this.currentPoint.coordinate = coordinate;

  // Update hover.
  const geom = new olGeomPoint(coordinate);
  this.createMeasureTooltip_();
  this.measureTooltipElement_.innerHTML = this.getTooltipHTML_();
  this.measureTooltip_.setPosition(coordinate);
  this.snappedPoint_.setGeometry(geom);
};

ProfileController.prototype.outCallback_ = function () {
  // Reset information point.
  delete this.currentPoint.coordinate;
  delete this.currentPoint.distance;
  this.currentPoint.elevations = {};
  delete this.currentPoint.xUnits;
  delete this.currentPoint.yUnits;

  // Reset hover.
  this.removeMeasureTooltip_();
  this.snappedPoint_.setGeometry(undefined);
};

/**
 * @return {string} A text formatted to a tooltip.
 */
ProfileController.prototype.getTooltipHTML_ = function () {
  const gettextCatalog = this.gettextCatalog_;
  const separator = '&nbsp;: ';
  let elevationName, translatedElevationName;
  const innerHTML = [];
  const number = this.$filter_('number');
  const DistDecimal = this.currentPoint.xUnits === 'm' ? 0 : 2;
  const value = number(this.currentPoint.distance, DistDecimal);
  innerHTML.push(`${this.profileLabels_.xAxis} ${separator} ${value}&nbsp;${this.currentPoint.xUnits}`);
  for (elevationName in this.currentPoint.elevations) {
    translatedElevationName = gettextCatalog.getString(elevationName);
    const intValue = this.currentPoint.elevations[elevationName];
    const value =
      intValue === null
        ? gettextCatalog.getString('no value')
        : `${number(intValue, 0)}&nbsp;${this.currentPoint.yUnits}`;
    innerHTML.push(`${translatedElevationName} ${separator} ${value}`);
  }
  return innerHTML.join('</br>');
};

/**
 * Creates a new 'hover' tooltip
 */
ProfileController.prototype.createMeasureTooltip_ = function () {
  if (!this.map_) {
    throw new Error('Missing map');
  }
  this.removeMeasureTooltip_();
  this.measureTooltipElement_ = document.createElement('div');
  this.measureTooltipElement_.className += 'tooltip ngeo-tooltip-measure';
  this.measureTooltip_ = new olOverlay({
    element: this.measureTooltipElement_,
    offset: [0, -15],
    positioning: 'bottom-center',
  });
  this.map_.addOverlay(this.measureTooltip_);
};

/**
 * Destroy the 'hover' tooltip
 */
ProfileController.prototype.removeMeasureTooltip_ = function () {
  if (this.measureTooltipElement_ !== null) {
    if (!this.map_) {
      throw new Error('Missing map');
    }
    if (!this.measureTooltip_) {
      throw new Error('Missing measureTooltip_');
    }
    if (!this.measureTooltipElement_.parentNode) {
      throw new Error('Missing measureTooltipElement_.parentNode');
    }
    this.measureTooltipElement_.parentNode.removeChild(this.measureTooltipElement_);
    this.measureTooltipElement_ = null;
    this.map_.removeOverlay(this.measureTooltip_);
  }
};

/**
 * Return the styler value of a ProfileLineConfiguration.
 * @param {string} layerName name of the elevation layer.
 * @return {object} The object representation of the style.
 */
ProfileController.prototype.getStyle = function (layerName) {
  const lineConfiguration = this.ngeoOptions.linesConfiguration[layerName];
  if (!lineConfiguration) {
    return {};
  }
  return {
    'color': lineConfiguration.color || '#F00',
  };
};

/**
 * Return a copy of the existing layer names.
 * @return {string[]} The names of layers.
 */
ProfileController.prototype.getLayersNames = function () {
  return this.layersNames_.slice(0);
};

/**
 * @param {string} layerName name of the elevation layer.
 * @return {function(ProfileElement): number} Z extractor function.
 */
ProfileController.prototype.getZFactory_ = function (layerName) {
  /**
   * Generic GMF extractor for the 'given' value in 'values' in profileData.
   * @param {ProfileElement} item The item.
   * @return {number|null} The elevation or `null` if the value is not present in the data.
   * @private
   */
  const getZFn = function (item) {
    if ('values' in item && layerName in item.values && item.values[layerName]) {
      return item.values[layerName];
    }
    return null;
  };
  return getZFn;
};

/**
 * Extractor for the 'dist' value in profileData.
 * @param {ProfileElement} item The item.
 * @return {number} The distance.
 */
ProfileController.prototype.getDist_ = function (item) {
  if ('dist' in item) {
    return item.dist;
  }
  return 0;
};

/**
 * Request the profile.
 */
ProfileController.prototype.getJsonProfile_ = function () {
  if (!this.line) {
    throw new Error('Missing line');
  }

  this.isLoading = true;

  const geom = {
    'type': 'LineString',
    'coordinates': this.line.getCoordinates(),
  };

  const params = {
    'layers': this.layersNames_.join(','),
    'geom': JSON.stringify(geom),
    'nbPoints': this.nbPoints_,
  };

  this.$http_({
    url: this.gmfProfileJsonUrl_,
    method: 'POST',
    params: params,
    paramSerializer: '$httpParamSerializerJQLike',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(this.getProfileDataSuccess_.bind(this), this.getProfileDataError_.bind(this));
};

/**
 * @param {angular.IHttpResponse<ProfileServiceResult>} resp Response.
 */
ProfileController.prototype.getProfileDataSuccess_ = function (resp) {
  const profileData = resp.data.profile;
  if (profileData instanceof Array) {
    this.isLoading = false;
    this.profileData = profileData;
  }
};

/**
 * @param {angular.IHttpResponse<never>} resp Response.
 */
ProfileController.prototype.getProfileDataError_ = function (resp) {
  this.isLoading = false;
  this.isErrored = true;
  console.error('Can not get JSON profile.');
};

/**
 * Request the csv profile with the current profile data.
 */
ProfileController.prototype.downloadCsv = function () {
  if (this.profileData.length === 0) {
    return;
  }

  /** @type {import('ngeo/download/Csv').GridColumnDef[]} */
  const headers = [];
  let hasDistance = false;
  const firstPoint = this.profileData[0];
  if ('dist' in firstPoint) {
    headers.push({name: 'distance'});
    hasDistance = true;
  }
  /** @type {string[]} */
  const layers = [];
  for (const layer in firstPoint.values) {
    headers.push({'name': layer});
    layers.push(layer);
  }
  headers.push({name: 'x'});
  headers.push({name: 'y'});

  const rows = this.profileData.map((point) => {
    /** @type {Object<string, unknown>} */
    const row = {};
    if (hasDistance) {
      row.distance = point.dist;
    }

    layers.forEach((layer) => {
      row[layer] = point.values[layer];
    });

    row.x = point.x;
    row.y = point.y;

    return row;
  });

  this.ngeoCsvDownload_.startDownload(rows, headers, 'profile.csv');
};

myModule.controller('GmfProfileController', ProfileController);

export default myModule;
