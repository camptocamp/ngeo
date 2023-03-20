import olFeature from 'ol/Feature.js';
import olGeomPoint from 'ol/geom/Point.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStyle from 'ol/style/Style.js';
import {
  axisBottom as d3axisBottom,
  axisLeft as d3axisLeft,
  scaleLinear as d3scaleLinear,
  event as d3event,
  mouse as d3mouse,
  select as d3select,
  zoom as d3zoom,
} from 'd3';

/**
 * @hidden
 */
export default class {
  /**
   * Provides a service to create an SVG element with defined axis and a LIDAR
   * point drawing mechanism.
   *
   * @param {import("gmf/lidarprofile/Manager.js").LidarprofileManager} gmfLidarprofileManagerInstance
   *    gmf lidar profile manager instance
   */
  constructor(gmfLidarprofileManagerInstance) {
    /**
     * @type {import("gmf/lidarprofile/Manager.js").LidarprofileManager}
     * @private
     */
    this.manager_ = gmfLidarprofileManagerInstance;

    /**
     * d3.scaleLinear X scale.
     * @type {d3.ScaleLinear<number, number>}
     */
    this.scaleX;

    /**
     * d3.scaleLinear X scale.
     * @type {Function}
     */
    this.updateScaleX;

    /**
     * d3.scaleLinear Y scale.
     * @type {d3.ScaleLinear<number, number>}
     */
    this.scaleY;

    /**
     * d3.scaleLinear Y scale.
     * @type {Function}
     */
    this.updateScaleY;

    /**
     * The material used for the drawing process. Initialized in the setup
     * @type {string}
     */
    this.material;

    /**
     * @type {number}
     * @private
     */
    this.width_;

    /**
     * @type {number}
     * @private
     */
    this.height_;

    /**
     * @type {Array.<number>}
     */
    this.previousDomainX = [];

    /**
     * @type {boolean}
     * @private
     */
    this.moved_ = false;
  }

  /**
   * Draw the points to the canvas element
   * @param {import("gmf/lidarprofile/Utils.js").LidarprofilePoints} points of the profile
   */
  drawPoints(points) {
    let i = -1;
    const nPoints = points.distance.length;
    let cx, cy;
    const canvas = d3select('#gmf-lidarprofile-container .lidar-canvas');
    const canvasEl = /** @type {HTMLCanvasElement} */ (canvas.node());
    const ctx = canvasEl.getContext('2d');
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
   * @param {Array.<number>} rangeX range of the x scale
   * @param {Array.<number>} rangeY range of the y scale
   */
  setupPlot(rangeX, rangeY) {
    const canvas = d3select('#gmf-lidarprofile-container .lidar-canvas');
    const canvasEl = /** @type {HTMLCanvasElement} */ (canvas.node());
    const ctx = canvasEl.getContext('2d');
    ctx.clearRect(0, 0, canvasEl.getBoundingClientRect().width, canvasEl.getBoundingClientRect().height);

    const margin = this.manager_.config.clientConfig.margin;
    const container = d3select('#gmf-lidarprofile-container');
    const containerEl = /** @type {HTMLElement} */ (container.node());
    const containerWidth = containerEl.getBoundingClientRect().width;
    const containerHeight = containerEl.getBoundingClientRect().height;
    this.width_ = containerWidth - (margin.left + margin.right);
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

    this.previousDomainX = this.scaleX['domain']();
    this.updateScaleX = this.scaleX;
    this.updateScaleY = this.scaleY;

    const svg = d3select('#gmf-lidarprofile-container svg.lidar-svg');

    svg.call(zoom).on('dblclick.zoom', null);

    svg.selectAll('*').remove();

    svg.attr('width', this.width_ + margin.left).attr('height', this.height_ + margin.top + margin.bottom);

    svg.on('mousemove', () => {
      this.pointHighlight.bind(this)();
    });

    const xAxis = d3axisBottom(this.scaleX);
    const yAxis = d3axisLeft(this.scaleY).tickSize(-this.width_);

    svg.select('.y.axis').selectAll('g.tick line').style('stroke', '#b7cff7');

    svg.append('g').attr('class', 'y axis').call(yAxis);

    svg.append('g').attr('class', 'x axis').call(xAxis);

    svg.select('.y.axis').attr('transform', `translate(${margin.left}, ${margin.top})`);
    svg.select('.x.axis').attr('transform', `translate(${margin.left}, ${this.height_ + margin.top})`);

    svg.select('.y.axis').selectAll('g.tick line').style('opacity', '0.5').style('stroke', '#b7cff7');
  }

  /**
   * Update the plot data at the end of the zoom process
   */
  zoomEnd() {
    if (d3event.sourceEvent && this.moved_ === false) {
      return;
    }
    this.moved_ = false;
    const canvas = d3select('#gmf-lidarprofile-container .lidar-canvas');
    const canvasEl = /** @type {HTMLCanvasElement} */ (canvas.node());
    const ctx = canvasEl.getContext('2d');
    ctx.clearRect(0, 0, this.width_, this.height_);
    this.manager_.updateData();
  }

  /**
   * Update the plot axis during the zoom process
   */
  zoomed() {
    if (d3event.sourceEvent && d3event.sourceEvent.type === 'mousemove') {
      this.moved_ = true;
      if (d3event.sourceEvent.movementX == 0 && d3event.sourceEvent.movementY == 0) {
        return;
      }
    }

    this.manager_.measure.clearMeasure();

    const tr = d3event.transform;
    const svg = d3select('#gmf-lidarprofile-container svg.lidar-svg');
    const xAxis = d3axisBottom(this.scaleX);
    const yAxis = d3axisLeft(this.scaleY).tickSize(-this.width_);

    const new_scaleX = tr.rescaleX(this.scaleX);
    const new_scaleY = tr.rescaleY(this.scaleY);

    svg.select('.x.axis').call(xAxis.scale(new_scaleX));
    svg.select('.y.axis').call(yAxis.scale(new_scaleY));

    const canvas = d3select('#gmf-lidarprofile-container .lidar-canvas');
    const canvasEl = /** @type {HTMLCanvasElement} */ (canvas.node());
    const ctx = canvasEl.getContext('2d');
    ctx.clearRect(0, 0, this.width_, this.height_);

    svg.select('.y.axis').selectAll('g.tick line').style('opacity', '0.5').style('stroke', '#b7cff7');

    this.updateScaleX = new_scaleX;
    this.updateScaleY = new_scaleY;
  }

  /**
   * Update the Openlayers overlay that displays point position and attributes values
   */
  pointHighlight() {
    const svg = d3select('#gmf-lidarprofile-container svg.lidar-svg');
    const lidarInfo = d3select('#gmf-lidarprofile-container .lidar-info');
    const pointSize = this.manager_.config.serverConfig.point_size;
    const margin = this.manager_.config.clientConfig.margin;
    const tolerance = this.manager_.config.clientConfig.tolerance || 0;

    const canvas = d3select('#gmf-lidarprofile-container .lidar-canvas');
    const canvasEl = /** @type {HTMLCanvasElement} */ (canvas.node());
    const canvasCoordinates = d3mouse(canvasEl);
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

    if (p != undefined) {
      cx = this.updateScaleX(p.distance) + margin.left;
      cy = this.updateScaleY(p.altitude) + margin.top;

      svg.selectAll('#highlightCircle').remove();

      svg
        .append('circle')
        .attr('id', 'highlightCircle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', pointSize + 1)
        .style('fill', 'orange');

      const pClassification = p.classification || -1;
      const pointClassification = classification_colors[pClassification] || {};

      const html = this.getInfoHTML(p, pointClassification, 1);

      lidarInfo.html(html);
      this.manager_.cartoHighlight.setElement(null);
      const el = document.createElement('div');
      el.className += 'tooltip gmf-tooltip-measure';
      el.innerHTML = html;

      this.manager_.cartoHighlight.setElement(el);
      this.manager_.cartoHighlight.setPosition([p.coords[0], p.coords[1]]);
      /** @type {import("ol/source/Vector.js").default} */ (
        this.manager_.lidarPointHighlight.getSource()
      ).clear();
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

      /** @type {import("ol/source/Vector.js").default} */ (
        this.manager_.lidarPointHighlight.getSource()
      ).addFeature(lidarPointFeature);
    } else {
      /** @type {import("ol/source/Vector.js").default} */ (
        this.manager_.lidarPointHighlight.getSource()
      ).clear();
      svg.select('#highlightCircle').remove();
      lidarInfo.html('');
      this.manager_.cartoHighlight.setPosition(undefined);
    }
  }

  /**
   * @param {import("gmf/lidarprofile/Utils.js").LidarPoint} point the concerned point.
   * @param {import("gmf/lidarprofile/Config.js").LidarprofileServerConfigClassification} classification_color
   *    the classification object concerning this point.
   * @param {number} distDecimal the number of decimal to keep.
   * @return {string} the text for the html info.
   */
  getInfoHTML(point, classification_color, distDecimal) {
    const gettextCatalog = this.manager_.gettextCatalog;
    const html = [];
    const number = this.manager_.$filter('number');

    const distance = point.distance;
    const altitude = point.altitude;
    const classification = gettextCatalog.getString(classification_color.name);
    const intensity = point.intensity;

    if (distance !== undefined) {
      const distanceTxt = gettextCatalog.getString('Distance: ');
      html.push(`${distanceTxt + number(distance, distDecimal)}`);
    }
    if (altitude !== undefined) {
      const altitudeTxt = gettextCatalog.getString('Altitude: ');
      html.push(`${altitudeTxt + number(altitude, distDecimal)}`);
    }
    if (classification.length > 0) {
      const classificationTxt = gettextCatalog.getString('Classification: ');
      html.push(`${classificationTxt + classification}`);
    }
    if (intensity !== undefined) {
      const intensityTxt = gettextCatalog.getString('Intensity: ');
      html.push(`${intensityTxt + number(intensity, 0)}`);
    }

    return html.join('</br>');
  }

  /**
   * Change the profile style according to the material color
   * @param {string} material value as defined in Pytree attribute configuration
   */
  changeStyle(material) {
    this.material = material;
    const canvas = d3select('#gmf-lidarprofile-container .lidar-canvas');
    const canvasEl = /** @type {HTMLCanvasElement} */ (canvas.node());
    const ctx = canvasEl.getContext('2d');
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    this.drawPoints(this.manager_.profilePoints);
  }

  /**
   * Show/Hide classes in the profile
   * @param {import("gmf/lidarprofile/Config.js").LidarprofileServerConfigClassifications} classification
   *   value as defined in the Pytree classification_colors configuration
   * @param {string} material  value as defined in Pytree attribute configuration
   */
  setClassActive(classification, material) {
    this.manager_.config.serverConfig.classification_colors = classification;
    this.changeStyle(material);
  }
}
