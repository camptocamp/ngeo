// The MIT License (MIT)
//
// Copyright (c) 2018-2022 Camptocamp SA
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

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import olFeature from 'ol/Feature';
import olGeomPoint from 'ol/geom/Point';
import olStyleCircle from 'ol/style/Circle';
import olStyleFill from 'ol/style/Fill';
import olStyleStyle from 'ol/style/Style';
import {
  axisBottom as d3axisBottom,
  axisLeft as d3axisLeft,
  scaleLinear as d3scaleLinear,
  pointer as d3pointer,
  select as d3select,
  zoom as d3zoom,
} from 'd3';

import {LidarprofileManager as GmfLidarprofileManagerLidarprofileManager} from 'ngeo/lidar/Manager';
import {LidarprofilePoints as GmfLidarprofileUtilsLidarprofilePoints} from 'ngeo/lidar/Utils';
import {LidarPoint as GmfLidarprofileUtilsLidarPoint} from 'ngeo/lidar/Utils';
import {LidarprofileServerConfigClassification as GmfLidarprofileConfigLidarprofileServerConfigClassification} from 'ngeo/lidar/Config';
import {LidarprofileServerConfigClassifications as GmfLidarprofileConfigLidarprofileServerConfigClassifications} from 'ngeo/lidar/Config';

import i18next from 'i18next';

export type updateScaleFunction = {
  (arg1: number): number;
};

export default class {
  /**
   * @private
   */
  manager_: GmfLidarprofileManagerLidarprofileManager;

  /**
   * d3.scaleLinear X scale.
   */
  scaleX: undefined | d3.ScaleLinear<number, number>;

  /**
   * d3.scaleLinear X scale.
   */
  updateScaleX: updateScaleFunction;

  /**
   * d3.scaleLinear Y scale.
   */
  scaleY: undefined | d3.ScaleLinear<number, number>;

  /**
   * d3.scaleLinear Y scale.
   */
  updateScaleY: updateScaleFunction;

  /**
   * The material used for the drawing process. Initialized in the setup
   */
  material: undefined | string;

  /**
   * @private
   */
  width_: number;

  /**
   * @private
   */
  height_: number;

  previousDomainX: number[];

  /**
   * @private
   */
  moved_: boolean;

  /**
   * Provides a service to create an SVG element with defined axis and a LIDAR
   * point drawing mechanism.
   *
   * @param gmfLidarprofileManagerInstance
   *    gmf lidar profile manager instance
   */
  constructor(gmfLidarprofileManagerInstance: GmfLidarprofileManagerLidarprofileManager) {
    /**
     * @private
     */
    this.manager_ = gmfLidarprofileManagerInstance;

    /**
     * d3.scaleLinear X scale.
     */
    this.scaleX = null;

    /**
     * d3.scaleLinear X scale.
     *
     * @param x .
     * @returns x .
     */
    this.updateScaleX = (x) => x;

    /**
     * d3.scaleLinear Y scale.
     */
    this.scaleY = null;

    /**
     * d3.scaleLinear Y scale.
     *
     * @param y .
     * @returns y .
     */
    this.updateScaleY = (y) => y;

    /**
     * The material used for the drawing process. Initialized in the setup
     */
    this.material = null;

    /**
     * @private
     */
    this.width_ = 0;

    /**
     * @private
     */
    this.height_ = 0;

    this.previousDomainX = [];

    /**
     * @private
     */
    this.moved_ = false;
  }

  /**
   * Draw the points to the canvas element
   *
   * @param points of the profile
   */
  drawPoints(points: GmfLidarprofileUtilsLidarprofilePoints): void {
    if (!this.manager_.config) {
      throw new Error('Missing manager.config');
    }
    if (!this.manager_.config.serverConfig) {
      throw new Error('Missing manager_.config.serverConfig');
    }
    let i = -1;
    const nPoints = points.distance.length;
    let cx, cy;
    const canvas: any = d3select(
      document
        .querySelector('gmf-desktop-canvas gmf-lidar-footer')
        .shadowRoot.querySelector('#gmf-lidarprofile-container .lidar-canvas')
    );
    const canvasEl: HTMLCanvasElement = canvas.node();
    const ctx = canvasEl.getContext('2d');
    if (ctx === null) {
      throw new Error('Missing ctx');
    }
    const profileServerConfig = this.manager_.config.serverConfig;

    while (++i < nPoints) {
      const distance = points.distance[i];
      const altitude = points.altitude[i];
      const rgb = points.color_packed[i];
      const intensity = points.intensity[i];
      const classification = points.classification[i];
      if (
        profileServerConfig.classification_colors[classification] &&
        profileServerConfig.classification_colors[classification].visible
      ) {
        cx = this.updateScaleX(distance);
        cy = this.updateScaleY(altitude);

        ctx.beginPath();
        ctx.moveTo(cx, cy);

        if (this.material == 'COLOR_PACKED') {
          ctx.fillStyle = `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        } else if (this.material == 'INTENSITY') {
          ctx.fillStyle = `RGB(${intensity}, ${intensity}, ${intensity})`;
        } else if (this.material == 'CLASSIFICATION') {
          ctx.fillStyle = `RGB(${profileServerConfig.classification_colors[classification].color})`;
        } else {
          ctx.fillStyle = profileServerConfig.default_color;
        }
        ctx.arc(cx, cy, profileServerConfig.point_size, 0, 2 * Math.PI, false);
        ctx.fill();
      }
    }
  }

  /**
   * Setup the SVG components of the D3 chart
   *
   * @param rangeX range of the x scale
   * @param rangeY range of the y scale
   */
  setupPlot(rangeX: number[], rangeY: number[]): void {
    if (!this.manager_.config) {
      throw new Error('Missing manager.config');
    }
    if (!this.manager_.config.serverConfig) {
      throw new Error('Missing manager_.config.serverConfig');
    }
    const canvas: any = d3select(
      document
        .querySelector('gmf-desktop-canvas gmf-lidar-footer')
        .shadowRoot.querySelector('#gmf-lidarprofile-container .lidar-canvas')
    );
    const canvasEl: HTMLCanvasElement = canvas.node();
    const ctx = canvasEl.getContext('2d');
    if (ctx === null) {
      throw new Error('Missing ctx');
    }
    ctx.clearRect(0, 0, canvasEl.getBoundingClientRect().width, canvasEl.getBoundingClientRect().height);

    const margin = this.manager_.config.clientConfig.margin;
    const container: any = d3select(
      document
        .querySelector('gmf-desktop-canvas gmf-lidar-footer')
        .shadowRoot.querySelector('#gmf-lidarprofile-container')
    );
    const containerEl = container.node();
    const containerWidth = containerEl.getBoundingClientRect().width;
    const containerHeight = containerEl.getBoundingClientRect().height;
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this.width_ = containerWidth - (margin.left + margin.right);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this.height_ = containerHeight - (margin.top + margin.bottom);

    this.material = this.manager_.config.serverConfig.default_attribute;

    canvas
      .attr('height', this.height_)
      .attr('width', this.width_)
      .style('background-color', 'black')
      .style('z-index', 0)
      .style('position', 'absolute')
      .style('margin-left', `${margin.left.toString()}px`)
      .style('margin-top', `${margin.top.toString()}px`);

    const domainProfileWidth = rangeX[1] - rangeX[0];
    const domainProfileHeight = rangeY[1] - rangeY[0];
    const domainRatio = domainProfileWidth / domainProfileHeight;
    const rangeProfileWidth = this.width_;
    const rangeProfileHeight = this.height_;
    const rangeRatio = rangeProfileWidth / rangeProfileHeight;

    let domainScale;
    if (domainRatio < rangeRatio) {
      const domainScale = rangeRatio / domainRatio;
      const domainScaledWidth = domainProfileWidth * domainScale;
      this.scaleX = d3scaleLinear();
      this.scaleX.domain([0, domainScaledWidth]);
      this.scaleX.range([0, this.width_]);
      this.scaleY = d3scaleLinear();
      this.scaleY.domain(rangeY);
      this.scaleY.range([this.height_, 0]);
    } else {
      domainScale = domainRatio / rangeRatio;
      const domainScaledHeight = domainProfileHeight * domainScale;
      const domainHeightCentroid = (rangeY[1] + rangeY[0]) / 2;
      this.scaleX = d3scaleLinear();
      this.scaleX.domain(rangeX);
      this.scaleX.range([0, this.width_]);
      this.scaleY = d3scaleLinear();
      this.scaleY.domain([
        domainHeightCentroid - domainScaledHeight / 2,
        domainHeightCentroid + domainScaledHeight / 2,
      ]);
      this.scaleY.range([this.height_, 0]);
    }

    const zoom = d3zoom()
      .scaleExtent([-10, 100])
      .translateExtent([
        [0, 0],
        [this.width_, this.height_],
      ])
      .extent([
        [0, 0],
        [this.width_, this.height_],
      ])
      .on('zoom', this.zoomed.bind(this));

    zoom.on('end', this.zoomEnd.bind(this));

    this.previousDomainX = this.scaleX.domain();
    this.updateScaleX = this.scaleX;
    this.updateScaleY = this.scaleY;

    const svg = d3select(
      document
        .querySelector('gmf-desktop-canvas gmf-lidar-footer')
        .shadowRoot.querySelector('#gmf-lidarprofile-container svg.lidar-svg')
    );

    // @ts-ignore
    svg.call(zoom).on('dblclick.zoom', null);

    svg.selectAll('*').remove();

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    svg.attr('width', this.width_ + margin.left).attr('height', this.height_ + margin.top + margin.bottom);

    svg.on('mousemove', (event: MouseEvent) => {
      this.pointHighlight(event);
    });

    const xAxis = d3axisBottom(this.scaleX);
    const yAxis = d3axisLeft(this.scaleY).tickSize(-this.width_);

    svg.select('.y.axis').selectAll('g.tick line').style('stroke', '#b7cff7');

    // @ts-ignore
    svg.append('g').attr('class', 'y axis').call(yAxis);

    // @ts-ignore
    svg.append('g').attr('class', 'x axis').call(xAxis);

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    svg.select('.y.axis').attr('transform', `translate(${margin.left}, ${margin.top})`);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    svg.select('.x.axis').attr('transform', `translate(${margin.left}, ${this.height_ + margin.top})`);

    svg.select('.y.axis').selectAll('g.tick line').style('opacity', '0.5').style('stroke', '#b7cff7');
  }

  /**
   * Update the plot data at the end of the zoom process
   *
   * @param event Event .
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  zoomEnd(event: any): void {
    if (event.sourceEvent && this.moved_ === false) {
      return;
    }
    this.moved_ = false;
    const canvas: any = d3select(
      document
        .querySelector('gmf-desktop-canvas gmf-lidar-footer')
        .shadowRoot.querySelector('#gmf-lidarprofile-container .lidar-canvas')
    );
    const canvasEl: HTMLCanvasElement = canvas.node();
    const ctx = canvasEl.getContext('2d');
    if (ctx === null) {
      throw new Error('Missing ctx');
    }
    ctx.clearRect(0, 0, this.width_, this.height_);
    this.manager_.updateData();
  }

  /**
   * Update the plot axis during the zoom process
   *
   * @param event Event .
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  zoomed(event: any): void {
    if (!this.manager_.measure) {
      throw new Error('Missing manager.measure');
    }
    if (!this.scaleX) {
      throw new Error('Missing scaleX');
    }
    if (!this.scaleY) {
      throw new Error('Missing scaleY');
    }
    if (event.sourceEvent && event.sourceEvent.type === 'mousemove') {
      this.moved_ = true;
      if (event.sourceEvent.movementX == 0 && event.sourceEvent.movementY == 0) {
        return;
      }
    }

    this.manager_.measure.clearMeasure();

    const tr = event.transform;
    const svg = d3select(
      document
        .querySelector('gmf-desktop-canvas gmf-lidar-footer')
        .shadowRoot.querySelector('#gmf-lidarprofile-container svg.lidar-svg')
    );
    const xAxis: any = d3axisBottom(this.scaleX);
    const yAxis: any = d3axisLeft(this.scaleY).tickSize(-this.width_);

    const newScaleX = tr.rescaleX(this.scaleX);
    const newScaleY = tr.rescaleY(this.scaleY);

    svg.select('.x.axis').call(xAxis.scale(newScaleX));
    svg.select('.y.axis').call(yAxis.scale(newScaleY));

    const canvas: any = d3select(
      document
        .querySelector('gmf-desktop-canvas gmf-lidar-footer')
        .shadowRoot.querySelector('#gmf-lidarprofile-container .lidar-canvas')
    );
    const canvasEl: HTMLCanvasElement = canvas.node();
    const ctx = canvasEl.getContext('2d');
    if (ctx === null) {
      throw new Error('Missing ctx');
    }
    ctx.clearRect(0, 0, this.width_, this.height_);

    svg.select('.y.axis').selectAll('g.tick line').style('opacity', '0.5').style('stroke', '#b7cff7');

    this.updateScaleX = newScaleX;
    this.updateScaleY = newScaleY;
  }

  /**
   * Update the OpenLayers overlay that displays point position and attributes values
   *
   * @param event Event .
   */
  pointHighlight(event: MouseEvent): void {
    if (!this.manager_.config) {
      throw new Error('Missing manager.config');
    }
    if (!this.manager_.config.serverConfig) {
      throw new Error('Missing manager_.config.serverConfig');
    }

    const lidarContainerElement = document
      .querySelector('gmf-desktop-canvas gmf-lidar-footer')
      .shadowRoot.querySelector('#gmf-lidarprofile-container ');

    const svg = d3select(lidarContainerElement.querySelector('svg.lidar-svg'));
    const lidarInfo = d3select(lidarContainerElement.querySelector('.lidar-info'));
    const pointSize = this.manager_.config.serverConfig.point_size;
    const margin = this.manager_.config.clientConfig.margin;
    const tolerance = this.manager_.config.clientConfig.tolerance || 0;

    const canvas = d3select(lidarContainerElement.querySelector('.lidar-canvas'));
    const canvasEl = canvas.node();
    const canvasCoordinates = d3pointer(event, canvasEl);
    const classification_colors = this.manager_.config.serverConfig.classification_colors;

    let cx, cy;
    const p = this.manager_.utils.getClosestPoint(
      this.manager_.profilePoints,
      canvasCoordinates[0],
      canvasCoordinates[1],
      tolerance,
      this.updateScaleX,
      this.updateScaleY,
      classification_colors
    );

    const source = this.manager_.lidarPointHighlight.getSource();
    if (p != undefined) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      cx = this.updateScaleX(p.distance) + margin.left;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      cy = this.updateScaleY(p.altitude) + margin.top;

      svg.selectAll('#highlightCircle').remove();

      svg
        .append('circle')
        .attr('id', 'highlightCircle')
        .attr('cx', cx)
        .attr('cy', cy)
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        .attr('r', pointSize + 1)
        .style('fill', 'orange');

      const pClassification = p.classification || -1;
      const pointClassification = classification_colors[pClassification] || {};

      const html = this.getInfoHTML(p, pointClassification, 1);

      lidarInfo.html(html);
      this.manager_.cartoHighlight.setElement(undefined);
      const el = document.createElement('div');
      el.className += 'tooltip gmf-tooltip-measure';
      el.innerHTML = html;

      this.manager_.cartoHighlight.setElement(el);
      this.manager_.cartoHighlight.setPosition([p.coords[0], p.coords[1]]);
      source.clear();
      const lidarPointGeom = new olGeomPoint([p.coords[0], p.coords[1]]);
      const lidarPointFeature = new olFeature(lidarPointGeom);
      if (typeof pointClassification.color !== undefined) {
        lidarPointFeature.setStyle(
          new olStyleStyle({
            image: new olStyleCircle({
              fill: new olStyleFill({
                color: `rgba(${pointClassification.color}, 1)`,
              }),
              radius: 3,
            }),
          })
        );
      }

      source.addFeature(lidarPointFeature);
    } else {
      source.clear();
      svg.select('#highlightCircle').remove();
      lidarInfo.html('');
      this.manager_.cartoHighlight.setPosition(undefined);
    }
  }

  /**
   * @param point the concerned point.
   * @param classification_color
   *    the classification object concerning this point.
   * @param distDecimal the number of decimal to keep.
   * @returns the text for the html info.
   */
  getInfoHTML(
    point: GmfLidarprofileUtilsLidarPoint,
    classification_color: GmfLidarprofileConfigLidarprofileServerConfigClassification,
    distDecimal: number
  ): string {
    const html = [];
    const distance = point.distance;
    const altitude = point.altitude;
    const classification = i18next.t(classification_color.name);
    const intensity = point.intensity;

    if (distance !== undefined) {
      const distanceTxt = i18next.t('Distance: ');
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      html.push(`${distanceTxt + this.formatDecimals(distance, distDecimal)}`);
    }
    if (altitude !== undefined) {
      const altitudeTxt = i18next.t('Altitude: ');
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      html.push(`${altitudeTxt + this.formatDecimals(altitude, distDecimal)}`);
    }
    if (classification.length > 0) {
      const classificationTxt = i18next.t('Classification: ');
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      html.push(`${classificationTxt + classification}`);
    }
    if (intensity !== undefined) {
      const intensityTxt = i18next.t('Intensity: ');
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      html.push(`${intensityTxt + this.formatDecimals(intensity, 0)}`);
    }

    return html.join('</br>');
  }

  formatDecimals(num: number, decimals: number): number {
    return Number((Math.round(num * 100) / 100).toFixed(decimals));
  }

  /**
   * Change the profile style according to the material color
   *
   * @param material value as defined in Pytree attribute configuration
   */
  changeStyle(material: string): void {
    this.material = material;
    const canvas: any = d3select(
      document
        .querySelector('gmf-desktop-canvas gmf-lidar-footer')
        .shadowRoot.querySelector('#gmf-lidarprofile-container .lidar-canvas')
    );
    const canvasEl: HTMLCanvasElement = canvas.node();
    const ctx = canvasEl.getContext('2d');
    if (ctx === null) {
      throw new Error('Missing ctx');
    }
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    this.drawPoints(this.manager_.profilePoints);
  }

  /**
   * Show/Hide classes in the profile
   *
   * @param classification
   *   value as defined in the Pytree classification_colors configuration
   * @param material  value as defined in Pytree attribute configuration
   */
  setClassActive(
    classification: GmfLidarprofileConfigLidarprofileServerConfigClassifications,
    material: string
  ): void {
    if (!this.manager_.config) {
      throw new Error('Missing manager.config');
    }
    if (!this.manager_.config.serverConfig) {
      throw new Error('Missing manager_.config.serverConfig');
    }
    this.manager_.config.serverConfig.classification_colors = classification;
    this.changeStyle(material);
  }
}
