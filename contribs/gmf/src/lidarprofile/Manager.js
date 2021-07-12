// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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
import gmfLidarprofileMeasure from 'gmf/lidarprofile/Measure.js';
import gmfLidarprofilePlot from 'gmf/lidarprofile/Plot.js';
import gmfLidarprofileUtils from 'gmf/lidarprofile/Utils.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import olLayerVector from 'ol/layer/Vector.js';
import olOverlay from 'ol/Overlay.js';
import olSourceVector from 'ol/source/Vector.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleStyle from 'ol/style/Style.js';
import {select as d3select} from 'd3';

/**
 * @hidden
 */
export class LidarprofileManager {
  /**
   * Provides a service to manage a D3js component to be used to draw an lidar point cloud profile chart.
   * Requires access to a Pytree webservice: https://github.com/sitn/pytree
   *
   * @param {angular.IHttpService} $http Angular http service.
   * @param {angular.IFilterService} $filter Angular filter.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import("ngeo/misc/debounce.js").miscDebounce<function(): void>} ngeoDebounce ngeo debounce
   *    service.
   * @ngInject
   * @ngdoc service
   * @ngname gmflidarprofileManager
   */
  constructor($http, $filter, gettextCatalog, ngeoDebounce) {
    /**
     * @type {angular.IHttpService}
     */
    this.$http = $http;

    /**
     * @type {angular.IFilterService}
     */
    this.$filter = $filter;

    /**
     * @type {angular.gettext.gettextCatalog}
     */
    this.gettextCatalog = gettextCatalog;

    /**
     * @type {import("ngeo/misc/debounce.js").miscDebounce<function(): void>}
     * @private
     */
    this.ngeoDebounce_ = ngeoDebounce;

    /**
     * @type {?angular.IPromise<never>}
     * @private
     */
    this.promise = null;

    /**
     * @type {?import("gmf/lidarprofile/Plot.js").default}
     */
    this.plot = null;

    /**
     * @type {?import("gmf/lidarprofile/Measure.js").default}
     */
    this.measure = null;

    /**
     * @type {?import("gmf/lidarprofile/Config.js").LidarprofileConfigService}
     */
    this.config = null;

    /**
     * @type {?import("ol/Map.js").default}
     * @private
     */
    this.map_ = null;

    /**
     * The hovered point attributes in D3 profile highlighted on the 2D map
     * @type {import("ol/Overlay.js").default}
     */
    this.cartoHighlight = new olOverlay({
      offset: [0, -15],
      positioning: 'bottom-center',
    });

    /**
     * The hovered point geometry (point) in D3 profile highlighted on the 2D map
     */
    this.lidarPointHighlight = new olLayerVector({
      source: new olSourceVector({}),
      style: new olStyleStyle({
        image: new olStyleCircle({
          fill: new olStyleFill({
            color: 'rgba(0, 0, 255, 1)',
          }),
          radius: 3,
        }),
      }),
    });

    /**
     * The profile footpring represented as a LineString represented
     * with real mapunites stroke width
     * @type {import("ol/layer/Vector.js").default}
     */
    this.lidarBuffer = new olLayerVector({
      source: new olSourceVector({}),
    });

    /**
     * The variable where all points of the profile are stored
     * @type {import("gmf/lidarprofile/Utils.js").LidarprofilePoints}
     */
    this.profilePoints = this.getEmptyProfilePoints_();

    /**
     * @type {boolean}
     * @private
     */
    this.isPlotSetup_ = false;

    /**
     * @type {?import("ol/geom/LineString.js").default}
     * @private
     */
    this.line_ = null;

    /**
     * @type {import("gmf/lidarprofile/Utils.js").default}
     */
    this.utils = new gmfLidarprofileUtils();
  }

  /**
   * @param {import("gmf/lidarprofile/Config.js").LidarprofileConfigService} config Config
   * @param {import("ol/Map.js").default} map The map.
   */
  init(config, map) {
    this.config = config;
    this.plot = new gmfLidarprofilePlot(this);
    this.measure = new gmfLidarprofileMeasure(this);
    this.setMap(map);
  }

  /**
   * Clears the profile footprint
   */
  clearBuffer() {
    if (this.lidarBuffer) {
      /** @type {olSourceVector<import("ol/geom/LineString.js").default>} */ (this.lidarBuffer.getSource()).clear();
    }
  }

  /**
   * Set the line for the profile
   * @param {?import("ol/geom/LineString.js").default} line that defines the profile
   */
  setLine(line) {
    this.line_ = line;
  }

  /**
   * Set the map used by the profile
   * @param {import("ol/Map.js").default} map The map.
   */
  setMap(map) {
    this.map_ = map;
    this.cartoHighlight.setMap(map);
    this.lidarPointHighlight.setMap(map);
    this.lidarBuffer.setMap(map);
  }

  /**
   * @return {import("gmf/lidarprofile/Utils.js").LidarprofilePoints} An empty lidarprofile points object.
   * @private
   */
  getEmptyProfilePoints_() {
    return {
      distance: [],
      altitude: [],
      color_packed: [],
      intensity: [],
      classification: [],
      coords: [],
    };
  }

  /**
   * Load profile data (lidar points) by successive Levels Of Details using asynchronous requests
   * @param {import("ol/coordinate.js").Coordinate[]} clippedLine an array of the clipped line coordinates
   * @param {number} distanceOffset the left side of D3 profile domain at current zoom and pan configuration
   * @param {boolean} resetPlot whether to reset D3 plot or not
   * @param {number} minLOD minimum Level Of Detail
   */
  getProfileByLOD(clippedLine, distanceOffset, resetPlot, minLOD) {
    if (!this.config) {
      throw new Error('Missing config');
    }
    if (!this.plot) {
      throw new Error('Missing plot');
    }
    if (!this.line_) {
      throw new Error('Missing line');
    }
    if (!this.config.serverConfig) {
      throw new Error('Missing config.serverConfig');
    }

    const gettextCatalog = this.gettextCatalog;
    this.profilePoints = this.getEmptyProfilePoints_();

    if (resetPlot) {
      this.isPlotSetup_ = false;
    }

    d3select('#gmf-lidarprofile-container .lidar-error').style('visibility', 'hidden');
    let pytreeLinestring = this.utils.getPytreeLinestring(this.line_);

    let maxLODWith;
    const max_levels = this.config.serverConfig.max_levels;
    if (distanceOffset == 0) {
      maxLODWith = this.utils.getNiceLOD(this.line_.getLength(), max_levels);
    } else {
      // @ts-ignore
      const domain = this.plot.updateScaleX.domain();
      pytreeLinestring = '';

      for (const clipped of clippedLine) {
        pytreeLinestring += `{${clipped[0]},${clipped[1]}},`;
      }
      pytreeLinestring = pytreeLinestring.substr(0, pytreeLinestring.length - 1);
      maxLODWith = this.utils.getNiceLOD(domain[1] - domain[0], max_levels);
    }

    let lastLOD = false;
    d3select('#gmf-lidarprofile-container .lod-info').html('');
    this.config.clientConfig.pointSum = 0;
    let profileWidth = 0;
    if (this.config.clientConfig.autoWidth) {
      profileWidth = maxLODWith.width;
    } else {
      profileWidth = this.config.serverConfig.width;
    }

    const profileWidthTxt = gettextCatalog.getString('Profile width: ');
    d3select('#gmf-lidarprofile-container .width-info').html(`${profileWidthTxt} ${profileWidth}m`);

    for (let i = 0; i < maxLODWith.maxLOD; i++) {
      if (i == 0) {
        this.queryPytree_(
          minLOD,
          this.config.serverConfig.initialLOD,
          i,
          pytreeLinestring,
          distanceOffset,
          lastLOD,
          profileWidth,
          resetPlot
        );
        i += this.config.serverConfig.initialLOD - 1;
      } else if (i < maxLODWith.maxLOD - 1) {
        this.queryPytree_(
          minLOD + i,
          minLOD + i + 1,
          i,
          pytreeLinestring,
          distanceOffset,
          lastLOD,
          profileWidth,
          false
        );
      } else {
        lastLOD = true;
        this.queryPytree_(
          minLOD + i,
          minLOD + i + 1,
          i,
          pytreeLinestring,
          distanceOffset,
          lastLOD,
          profileWidth,
          false
        );
      }
    }
  }

  /**
   * Request to Pytree service for a range of Level Of Detail (LOD)
   * @param {number} minLOD minimum Level Of Detail of the request
   * @param {number} maxLOD maximum Level Of Detail of the request
   * @param {number} iter the iteration in profile requests cycle
   * @param {string} coordinates linestring in cPotree format
   * @param {number} distanceOffset the left side of D3 profile domain at current zoom and pan configuration
   * @param {boolean} lastLOD the deepest level to retrieve for this profile
   * @param {number} width the width of the profile
   * @param {boolean} resetPlot whether to reset D3 plot or not, used for first LOD
   * @private
   */
  queryPytree_(minLOD, maxLOD, iter, coordinates, distanceOffset, lastLOD, width, resetPlot) {
    if (!this.config) {
      throw new Error('Missing config');
    }
    if (!this.config.serverConfig) {
      throw new Error('Missing config.serverConfig');
    }
    const gettextCatalog = this.gettextCatalog;
    const lodInfo = d3select('#gmf-lidarprofile-container .lod-info');
    if (this.config.serverConfig.debug) {
      let html = lodInfo.html();
      const loadingLodTxt = gettextCatalog.getString('Loading LOD: ');
      html += `${loadingLodTxt} ${minLOD}-${maxLOD}..<br>`;
      lodInfo.html(html);
    }

    const pointCloudName = this.config.serverConfig.default_point_cloud;
    const hurl = `${this.config.pytreeLidarprofileJsonUrl}/profile/get?minLOD=${minLOD}
      &maxLOD=${maxLOD}&width=${width}&coordinates=${coordinates}&pointCloud=${pointCloudName}&attributes=`;

    this.$http
      .get(hurl, {
        headers: {
          'Content-Type': 'text/plain; charset=x-user-defined',
        },
        responseType: 'arraybuffer',
      })
      .then(
        (response) => {
          if (!this.config) {
            throw new Error('Missing config');
          }
          if (!this.config.serverConfig) {
            throw new Error('Missing config.serverConfig');
          }
          if (this.config.serverConfig.debug) {
            let html = lodInfo.html();
            const lodTxt = gettextCatalog.getString('LOD: ');
            const loadedTxt = gettextCatalog.getString('loaded');
            html += `${lodTxt} ${minLOD}-${maxLOD} ${loadedTxt}<br>`;
            lodInfo.html(html);
          }
          this.processBuffer_(response.data, iter, distanceOffset, lastLOD, resetPlot);
        },
        (response) => {
          console.error(response);
        }
      );
  }

  /**
   * Process the binary array return by Pytree (cPotree)
   * @param {ArrayBuffer} profile binary array returned by cPotree executable called by Pytree
   * @param {number} iter the iteration in profile requests cycle
   * @param {number} distanceOffset the left side of D3 profile domain at current zoom and pan configuration
   * @param {boolean} lastLOD the deepest level to retrieve for this profile
   * @param {boolean} resetPlot whether to reset D3 plot or not
   * @private
   */
  processBuffer_(profile, iter, distanceOffset, lastLOD, resetPlot) {
    if (!this.config) {
      throw new Error('Missing config');
    }
    if (!this.config.serverConfig) {
      throw new Error('Missing config.serverConfig');
    }
    if (!this.plot) {
      throw new Error('Missing plot');
    }
    if (!this.line_) {
      throw new Error('Missing line');
    }
    const lidarError = d3select('#gmf-lidarprofile-container .lidar-error');

    const typedArrayInt32 = new Int32Array(profile, 0, 4);
    const headerSize = typedArrayInt32[0];

    const uInt8header = new Uint8Array(profile, 4, headerSize);
    let strHeaderLocal = '';
    for (const header of uInt8header) {
      strHeaderLocal += String.fromCharCode(header);
    }

    try {
      JSON.parse(strHeaderLocal);
    } catch (e) {
      if (!this.isPlotSetup_) {
        const canvas = d3select('#gmf-lidarprofile-container .lidar-canvas');
        const canvasEl = /** @type {HTMLCanvasElement} */ (canvas.node());
        const ctx = canvasEl.getContext('2d');
        if (ctx === null) {
          throw new Error('Missing ctx');
        }
        ctx.clearRect(0, 0, canvasEl.getBoundingClientRect().width, canvasEl.getBoundingClientRect().height);
        canvas.selectAll('*').remove();
        const errorTxt = this.getHTMLError_();
        lidarError.style('visibility', 'visible');
        lidarError.html(errorTxt);
      }
      return;
    }

    lidarError.style('visibility', 'hidden');

    const jHeader = JSON.parse(strHeaderLocal);

    // If number of points return is higher than Pytree configuration max value,
    // stop sending requests.
    this.config.clientConfig.pointSum += jHeader.points;
    if (this.config.clientConfig.pointSum > this.config.serverConfig.max_point_number) {
      console.warn('Number of points is higher than Pytree configuration max value !');
    }

    const attr = jHeader.pointAttributes;
    const attributes = [];
    for (const att of attr) {
      if (this.config.serverConfig.point_attributes[att] != undefined) {
        attributes.push(this.config.serverConfig.point_attributes[att]);
      }
    }
    /**
     * @type {number}
     */
    const scale = jHeader.scale;

    if (jHeader.points < 3) {
      return;
    }

    const points = this.getEmptyProfilePoints_();
    const bytesPerPoint = jHeader.bytesPerPoint;
    const buffer = profile.slice(4 + headerSize);
    for (let i = 0; i < jHeader.points; i++) {
      const byteOffset = bytesPerPoint * i;
      const view = new DataView(buffer, byteOffset, bytesPerPoint);
      let aoffset = 0;
      for (const attribute of attributes) {
        if (attribute.value == 'POSITION_PROJECTED_PROFILE') {
          const udist = view.getUint32(aoffset, true);
          const dist = udist * scale;
          points.distance.push(Math.round(100 * (distanceOffset + dist)) / 100);
          this.profilePoints.distance.push(Math.round(100 * (distanceOffset + dist)) / 100);
        } else if (attribute.value == 'CLASSIFICATION') {
          const classif = view.getUint8(aoffset);
          points.classification.push(classif);
          this.profilePoints.classification.push(classif);
        } else if (attribute.value == 'INTENSITY') {
          const intensity = view.getUint8(aoffset);
          points.intensity.push(intensity);
          this.profilePoints.intensity.push(intensity);
        } else if (attribute.value == 'COLOR_PACKED') {
          const r = view.getUint8(aoffset);
          const g = view.getUint8(aoffset + 1);
          const b = view.getUint8(aoffset + 2);
          points.color_packed.push([r, g, b]);
          this.profilePoints.color_packed.push([r, g, b]);
        } else if (attribute.value == 'POSITION_CARTESIAN') {
          const lx = jHeader.boundingBox.lx;
          if (typeof lx != 'number') {
            throw new Error('Wrong lx type');
          }
          const ly = jHeader.boundingBox.ly;
          if (typeof ly != 'number') {
            throw new Error('Wrong ly type');
          }
          const lz = jHeader.boundingBox.lz;
          if (typeof lz != 'number') {
            throw new Error('Wrong lz type');
          }
          const x = view.getInt32(aoffset, true) * scale + lx;
          const y = view.getInt32(aoffset + 4, true) * scale + ly;
          const z = view.getInt32(aoffset + 8, true) * scale + lz;
          points.coords.push([x, y]);
          points.altitude.push(z);
          this.profilePoints.altitude.push(z);
          this.profilePoints.coords.push([x, y]);
        }
        aoffset = aoffset + attribute.bytes;
      }
    }

    const rangeX = [0, this.line_.getLength()];

    const rangeY = [this.utils.arrayMin(points.altitude), this.utils.arrayMax(points.altitude)];

    if ((iter == 0 && resetPlot) || !this.isPlotSetup_) {
      this.plot.setupPlot(rangeX, rangeY);
      this.isPlotSetup_ = true;
    }
    this.plot.drawPoints(points);
  }

  /**
   * @return {string} The html for errors.
   * @private
   */
  getHTMLError_() {
    const gettextCatalog = this.gettextCatalog;
    const errorInfoTxt = gettextCatalog.getString('Lidar profile service error');
    const errorOfflineTxt = gettextCatalog.getString('It might be offline');
    const errorOutsideTxt = gettextCatalog.getString(
      'Or did you attempt to draw a profile outside data extent?'
    );
    const errorNoPointError = gettextCatalog.getString(
      'Or did you attempt to draw such a small profile that no point was returned?'
    );
    return `
      <div class="lidarprofile-error">
      <p class="bold">${errorInfoTxt}</p>
      <p>${errorOfflineTxt}</p>
      <p>${errorOutsideTxt}</p>
      <p>${errorNoPointError}</p>
    `;
  }

  /**
   * Update the profile data according to D3 chart zoom and pan level
   * The update will wait on a 200ms pause on the actions of users before to do the update.
   */
  updateData() {
    this.ngeoDebounce_(this.updateData_.bind(this), 200, true)();
  }

  /**
   * @private
   */
  updateData_() {
    if (!this.config) {
      throw new Error('Missing config');
    }
    if (!this.config.serverConfig) {
      throw new Error('Missing config.serverConfig');
    }
    if (!this.plot) {
      throw new Error('Missing plot');
    }
    if (!this.line_) {
      throw new Error('Missing line');
    }
    // @ts-ignore
    const domainX = this.plot.updateScaleX.domain();
    let map_resolution = this.map_ ? this.map_.getView().getResolution() : 0;
    map_resolution = map_resolution || 0;
    const clip = this.utils.clipLineByMeasure(
      this.config,
      map_resolution,
      this.line_,
      domainX[0],
      domainX[1]
    );

    /**
     * @type {olSourceVector<import("ol/geom/Geometry.js").default>}
     */
    const source = this.lidarBuffer.getSource();
    source.clear();
    source.addFeature(clip.bufferGeom);
    this.lidarBuffer.setStyle(clip.bufferStyle);

    const span = domainX[1] - domainX[0];
    const maxLODWidth = this.utils.getNiceLOD(span, this.config.serverConfig.max_levels);
    const xTolerance = 0.2;

    if (
      Math.abs(domainX[0] - this.plot.previousDomainX[0]) < xTolerance &&
      Math.abs(domainX[1] - this.plot.previousDomainX[1]) < xTolerance
    ) {
      this.plot.drawPoints(this.profilePoints);
    } else {
      if (maxLODWidth.maxLOD <= this.config.serverConfig.initialLOD) {
        this.plot.drawPoints(this.profilePoints);
      } else {
        this.getProfileByLOD(clip.clippedLine, clip.distanceOffset, false, 0);
      }
    }

    this.plot.previousDomainX = domainX;
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfLidarprofileManager', [ngeoMiscDebounce.name]);
myModule.service('gmfLidarprofileManager', LidarprofileManager);

export default myModule;
