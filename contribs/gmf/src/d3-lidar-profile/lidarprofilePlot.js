goog.provide('gmf.lidarProfile.Plot');

goog.require('ol.Feature');
goog.require('ol.geom.Point');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Style');


gmf.lidarProfile.Plot = class {

  /**
   * FIXME missing description
   * @struct
   * @param {gmf.lidarProfile.Manager} gmfLidarProfileManagerInstance gmf lidar profile manager instance
   */
  constructor(gmfLidarProfileManagerInstance) {

    /**
     * @type {gmf.lidarProfile.Manager}
     * @private
     */
    this.manager_ = gmfLidarProfileManagerInstance;

    /**
     * d3.scaleLinear X scale.
     * @type {Function}
     */
    this.scaleX;

    /**
     * d3.scaleLinear Y scale.
     * @type {Function}
     */
    this.scaleY;

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
     * @type {Array.<number>}
     */
    this.previousDomainY = [];
  }


  /**
   * Draw the points to the canvas element
   * @param {gmfx.LidarProfilePoints} points of the profile
   * @param {string} material used to determine point color
   * @export
   */
  drawPoints(points, material) {
    let i = -1;
    const nPoints = points.distance.length;
    let cx, cy;
    const ctx = d3.select('#gmf-lidar-profile-container .lidar-canvas').node().getContext('2d');
    const profileServerConfig = this.manager_.config.serverConfig;

    while (++i < nPoints) {

      const distance = points.distance[i];
      const altitude = points.altitude[i];
      const rgb = points.color_packed[i];
      const intensity = points.intensity[i];
      const classification = points.classification[i];
      if (profileServerConfig.classification_colors[classification] &&
            profileServerConfig.classification_colors[classification].visible) {

        cx = this.scaleX(distance);
        cy = this.scaleY(altitude);

        ctx.beginPath();
        ctx.moveTo(cx, cy);

        if (material == 'COLOR_PACKED') {
          ctx.fillStyle = `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        } else if (material == 'INTENSITY') {
          ctx.fillStyle = `RGB(${intensity}, ${intensity}, ${intensity})`;
        } else if (material == 'CLASSIFICATION') {
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
   * Setup the SVG components of the d3 chart
   * @param {Array.<number>} rangeX range of the x scale
   * @param {Array.<number>} rangeY range of the y scale
   * @export
   */
  setupPlot(rangeX, rangeY) {
    const canvas = d3.select('#gmf-lidar-profile-container .lidar-canvas');
    const canvasEl = canvas.node();
    const ctx = canvasEl.getContext('2d');
    ctx.clearRect(0, 0, canvasEl.getBoundingClientRect().width, canvasEl.getBoundingClientRect().height);

    const margin = this.manager_.config.clientConfig.margin;
    const containerEl = d3.select('#gmf-lidar-profile-container').node();
    const containerWidth = containerEl.getBoundingClientRect().width;
    const containerHeight = containerEl.getBoundingClientRect().height;
    this.width_ = containerWidth - (margin.left + margin.right);
    this.height_ = containerHeight - (margin.top + margin.bottom);

    canvas.attr('height', this.height_)
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
      this.scaleX = d3.scaleLinear();
      this.scaleX['domain']([0, domainScaledWidth]);
      this.scaleX['range']([0, this.width_]);
      this.scaleY = d3.scaleLinear();
      this.scaleY['domain'](rangeY);
      this.scaleY['range']([this.height_, 0]);
    } else {
      domainScale =  domainRatio / rangeRatio;
      const domainScaledHeight = domainProfileHeight * domainScale;
      const domainHeightCentroid = (rangeY[1] + rangeY[0]) / 2;
      this.scaleX = d3.scaleLinear();
      this.scaleX['domain'](rangeX);
      this.scaleX['range']([0, this.width_]);
      this.scaleY = d3.scaleLinear();
      this.scaleY['domain']([
        domainHeightCentroid - domainScaledHeight / 2,
        domainHeightCentroid + domainScaledHeight / 2]);
      this.scaleY['range']([this.height_, 0]);
    }

    const zoom = d3.zoom()
      .scaleExtent([1, 100])
      .translateExtent([[0, 0], [this.width_, this.height_]])
      .extent([[0, 0], [this.width_, this.height_]])
      .on('zoom', this.zoomed.bind(this));

    zoom.on('end', this.zoomEnd.bind(this));

    this.previousDomainX = this.scaleX['domain']();
    this.previousDomainY = this.scaleY['domain']();

    const svg = d3.select('#gmf-lidar-profile-container svg.lidar-svg');

    svg.call(zoom).on('dblclick.zoom', null);
    svg.selectAll('*').remove();

    svg.attr('width', this.width_ + margin.left)
      .attr('height', this.height_ + margin.top + margin.bottom);

    svg.on('mousemove', () => {
      this.pointHighlight.bind(this)();
    });


    const xAxis = d3.axisBottom(this.scaleX);
    const yAxis = d3.axisLeft(this.scaleY)
      .tickSize(-this.width_);  this.previousDomainX = this.scaleX['domain']();
    this.previousDomainY = this.scaleY['domain']();

    svg.select('.y.axis').selectAll('g.tick line').style('stroke', '#b7cff7');

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    svg.append('g')
      .attr('class', 'x axis')
      .call(xAxis);

    svg.select('.y.axis').attr('transform', `translate(${margin.left}, ${margin.top})`);
    svg.select('.x.axis').attr('transform', `translate(${margin.left}, ${this.height_ + margin.top})`);

    svg.select('.y.axis').selectAll('g.tick line')
      .style('opacity', '0.5')
      .style('stroke', '#b7cff7');

    this.previousDomainX = this.scaleX['domain']();
    this.previousDomainY = this.scaleY['domain']();
  }


  /**
   * FIXME missing description
   */
  zoomEnd() {
    const ctx = d3.select('#gmf-lidar-profile-container .lidar-canvas')
      .node().getContext('2d');
    ctx.clearRect(0, 0, this.width_, this.height_);
    this.manager_.updateData();
  }


  /**
   * FIXME missing description
   */
  zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'mousemove') {
      if (d3.event.sourceEvent.movementX == 0 && d3.event.sourceEvent.movementY == 0) {
        return;
      }
    }

    this.manager_.measure.clearMeasure();

    const tr = d3.event.transform;
    const svg = d3.select('#gmf-lidar-profile-container svg.lidar-svg');
    const xAxis = d3.axisBottom(this.scaleX);
    const yAxis = d3.axisLeft(this.scaleY)
      .tickSize(-this.width_);

    svg.select('.x.axis').call(xAxis.scale(tr.rescaleX(this.scaleX)));
    svg.select('.y.axis').call(yAxis.scale(tr.rescaleY(this.scaleY)));
    const ctx = d3.select('#gmf-lidar-profile-container .lidar-canvas')
      .node().getContext('2d');
    ctx.clearRect(0, 0, this.width_, this.height_);

    svg.select('.y.axis').selectAll('g.tick line')
      .style('opacity', '0.5')
      .style('stroke', '#b7cff7');

    this.scaleX = tr.rescaleX(this.scaleX);
    this.scaleY = tr.rescaleY(this.scaleY);
  }


  /**
   * Update the Openlayers overlay that displays point position and attributes values
   * @export
   */
  pointHighlight() {
    const svg = d3.select('#gmf-lidar-profile-container svg.lidar-svg');
    const lidarInfo = d3.select('#gmf-lidar-profile-container .lidar-info');
    const pointSize = this.manager_.config.serverConfig.point_size;
    const margin = this.manager_.config.clientConfig.margin;
    const tolerance = this.manager_.config.clientConfig.tolerance || 0;

    const canvasCoordinates = d3.mouse(d3.select('#gmf-lidar-profile-container .lidar-canvas').node());
    const classification_colors = this.manager_.config.serverConfig.classification_colors;

    let cx, cy;
    const p = this.manager_.utils.getClosestPoint(this.manager_.profilePoints,
      canvasCoordinates[0], canvasCoordinates[1], tolerance, this.scaleX, this.scaleY, classification_colors);

    if (p != undefined) {

      cx = this.scaleX(p.distance) + margin.left;
      cy = this.scaleY(p.altitude) + margin.top;

      svg.selectAll('#highlightCircle').remove();

      svg.append('circle')
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
      this.manager_.lidarPointHighlight.getSource().clear();
      const lidarPointGeom = new ol.geom.Point([p.coords[0], p.coords[1]]);
      const lidarPointFeature = new ol.Feature(lidarPointGeom);
      if (typeof (pointClassification.color) !== undefined) {

        lidarPointFeature.setStyle(new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: `rgba(${pointClassification.color}, 1)`
            }),
            radius: 3
          })
        }));
      }

      this.manager_.lidarPointHighlight.getSource().addFeature(lidarPointFeature);
    } else {
      this.manager_.lidarPointHighlight.getSource().clear();
      svg.select('#highlightCircle').remove();
      lidarInfo.html('');
      this.manager_.cartoHighlight.setPosition(undefined);
    }
  }


  /**
   * @param {gmfx.LidarPoint} point the concerned point.
   * @param {lidarProfileServer.ConfigClassification} classification_color the classification
   *     object concerning this point.
   * @param {number} distDecimal the number of decimal to keep.
   * @return {string} the text for the html info.
   * @export
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
  * @export
  */
  changeStyle(material) {
    const canvasEl = d3.select('#gmf-lidar-profile-container .lidar-canvas').node();
    const ctx = canvasEl.getContext('2d');
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    this.drawPoints(this.manager_.profilePoints, material);
  }


  /**
  * Show/Hide classes in the profile
  * @param {lidarProfileServer.ConfigClassifications} classification value as defined in the Pytree classification_colors
  *     configuration
  * @param {string} material  value as defined in Pytree attribute configuration
  * @export
  */
  setClassActive(classification, material) {
    this.manager_.config.serverConfig.classification_colors = classification;
    this.changeStyle(material);
  }
};
