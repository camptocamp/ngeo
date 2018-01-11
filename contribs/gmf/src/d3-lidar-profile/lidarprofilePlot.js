goog.provide('gmf.lidarProfile.plot');

/**
* @constructor
* @param {Object} options to be defined in gmfx
* @param {gmf.lidarProfile} parent instance
*/
gmf.lidarProfile.plot = function(options, parent) {

/**
 * @type {Object}
 * @export
 */
  this.options = options;

  /**
  * @type {gmf.lidarProfile}
  * @private
  */
  this.parent_ = parent;

  /**
  * @type {gmf.lidarProfile.utils}
  * @private
  */
  this.utils_ = new gmf.lidarProfile.utils(options, null);

  /**
   * @type {Object}
   * @export
   */
  this.scaleX;

  /**
   * @type {Object}
   * @export
   */
  this.scaleY;

  /**
   * @type {number}
   * @export
   */
  this.width;

  /**
   * @type {number}
   * @export
   */
  this.height;
  /**
   * @type {Array.<number>}
   * @export
   */
  this.previousDomainX = [];
  /**
   * @type {Array.<number>}
   * @export
   */
  this.previousDomainY = [];

};

/**
 * Draw the points to the canvas element
 * @param {gmfx.LidarProfilePoints} points of the profile
 * @param {string} material used to determine point color
 * @export
*/
gmf.lidarProfile.plot.prototype.drawPoints = function(points, material) {
  let i = -1;
  const nPoints = points.distance.length;
  let cx, cy;
  const ctx = d3.select('#profileCanvas').node().getContext('2d');
  const profileConfig = this.options.profileConfig;

  while (++i < nPoints) {

    const distance = points.distance[i];
    const altitude = points.altitude[i];
    const rgb = points.color_packed[i];
    const intensity = points.intensity[i];
    const classification = points.classification[i];
    if (profileConfig.classification[classification] && profileConfig.classification[classification].visible) {

      cx = this.scaleX(distance);
      cy = this.scaleY(altitude);

      ctx.beginPath();
      ctx.moveTo(cx, cy);

      if (material == 'COLOR_PACKED') {
        ctx.fillStyle = `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      } else if (material == 'INTENSITY') {
        ctx.fillStyle = `RGB(${intensity}, ${intensity}, ${intensity})`;
      } else if (material == 'CLASSIFICATION') {
        ctx.fillStyle = `RGB(${profileConfig.classification[classification].color})`;
      } else {
        ctx.fillStyle = profileConfig.defaultColor;
      }
      ctx.arc(cx, cy, profileConfig.pointSize, 0, 2 * Math.PI, false);
      ctx.fill();

    }
  }
};

/**
 * Setup the SVG components of the d3 chart
 * @param {Array.<number>} rangeX range of the x scale
 * @param {Array.<number>} rangeY range of the y scale
 * @export
*/
gmf.lidarProfile.plot.prototype.setupPlot = function(rangeX, rangeY) {

  const canvasEl = d3.select('#profileCanvas').node();
  const ctx = d3.select('#profileCanvas')
    .node().getContext('2d');
  ctx.clearRect(0, 0, canvasEl.getBoundingClientRect().width, canvasEl.getBoundingClientRect().height);

  const margin = this.options.profileConfig.margin;
  const containerWidth = d3.select('.gmf-lidar-profile-container').node().getBoundingClientRect().width;
  const containerHeight = d3.select('.gmf-lidar-profile-container').node().getBoundingClientRect().height;
  this.width = containerWidth - (margin.left + margin.right);
  this.height = containerHeight - (margin.top + margin.bottom);

  d3.select('#profileCanvas')
    .attr('height', this.height)
    .attr('width', this.width)
    .style('background-color', 'black')
    .style('z-index', 0)
    .style('position', 'absolute')
    .style('margin-left', `${margin.left.toString()}px`)
    .style('margin-top', `${margin.top.toString()}px`);

  const domainProfileWidth = rangeX[1] - rangeX[0];
  const domainProfileHeight = rangeY[1] - rangeY[0];
  const domainRatio = domainProfileWidth / domainProfileHeight;
  const rangeProfileWidth = this.width;
  const rangeProfileHeight = this.height;
  const rangeRatio = rangeProfileWidth / rangeProfileHeight;

  let domainScale;
  if (domainRatio < rangeRatio) {
    const domainScale = rangeRatio / domainRatio;
    const domainScaledWidth = domainProfileWidth * domainScale;
    this.scaleX = d3.scaleLinear()
      .domain([0, domainScaledWidth])
      .range([0, this.width]);
    this.scaleY = d3.scaleLinear()
      .domain(rangeY)
      .range([this.height, 0]);
  } else {
    domainScale =  domainRatio / rangeRatio;
    const domainScaledHeight = domainProfileHeight * domainScale;
    const domainHeightCentroid = (rangeY[1] + rangeY[0]) / 2;
    this.scaleX = d3.scaleLinear()
      .domain(rangeX)
      .range([0, this.width]);
    this.scaleY = d3.scaleLinear()
      .domain([
        domainHeightCentroid - domainScaledHeight / 2,
        domainHeightCentroid + domainScaledHeight / 2])
      .range([this.height, 0]);
  }

  const zoom = d3.zoom()
    .scaleExtent([1, 100])
    .translateExtent([[0, 0], [this.width, this.height]])
    .extent([[0, 0], [this.width, this.height]])
    .on('zoom', this.zoomed.bind(this));

  zoom.on('end', this.zoomEnd.bind(this));

  this.previousDomainX = this.scaleX.domain();
  this.previousDomainY = this.scaleY.domain();

  d3.select('svg#profileSVG')
    .call(zoom)
    .on('dblclick.zoom', null);

  d3.select('svg#profileSVG').selectAll('*').remove();

  const svg = d3.select('svg#profileSVG')
    .attr('width', this.width + margin.left)
    .attr('height', this.height + margin.top + margin.bottom);

  d3.select('svg#profileSVG')
    .on('mousemove', () => {
      this.pointHighlight.bind(this);
    });


  const xAxis = d3.axisBottom(this.scaleX);
  const yAxis = d3.axisLeft(this.scaleY)
    .tickSize(-this.width);  this.previousDomainX = this.scaleX.domain();
  this.previousDomainY = this.scaleY.domain();

  svg.select('.y.axis').selectAll('g.tick line').style('stroke', '#b7cff7');

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  svg.append('g')
    .attr('class', 'x axis')
    .call(xAxis);

  svg.select('.y.axis').attr('transform', `translate(${margin.left}, ${margin.top})`);
  svg.select('.x.axis').attr('transform', `translate(${margin.left}, ${this.height + margin.top})`);

  svg.select('.y.axis').selectAll('g.tick line')
    .style('opacity', '0.5')
    .style('stroke', '#b7cff7');

  this.previousDomainX = this.scaleX.domain();
  this.previousDomainY = this.scaleY.domain();

};

gmf.lidarProfile.plot.prototype.zoomEnd = function() {
  const ctx = d3.select('#profileCanvas')
    .node().getContext('2d');
  ctx.clearRect(0, 0, this.width, this.height);
  this.parent_.loader.updateData();
};

gmf.lidarProfile.plot.prototype.zoomed = function() {

  if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'mousemove') {
    if (d3.event.sourceEvent.movementX == 0 && d3.event.sourceEvent.movementY == 0) {
      return;
    }
  }

  this.parent_.measure.clearMeasure();

  const tr = d3.event.transform;
  const svg = d3.select('svg#profileSVG');
  const xAxis = d3.axisBottom(this.scaleX);
  const yAxis = d3.axisLeft(this.scaleY)
    .tickSize(-this.width);

  svg.select('.x.axis').call(xAxis.scale(tr.rescaleX(this.scaleX)));
  svg.select('.y.axis').call(yAxis.scale(tr.rescaleY(this.scaleY)));
  const ctx = d3.select('#profileCanvas')
    .node().getContext('2d');
  ctx.clearRect(0, 0, this.width, this.height);

  svg.select('.y.axis').selectAll('g.tick line')
    .style('opacity', '0.5')
    .style('stroke', '#b7cff7');

  this.scaleX = tr.rescaleX(this.scaleX);
  this.scaleY = tr.rescaleY(this.scaleY);
  console.log(this);
};

/**
 * Update the Openlayers overlay that displays point position and attributes values
 * @export
*/
gmf.lidarProfile.plot.prototype.pointHighlight = function() {

  const svg = d3.select('svg#profileSVG');
  const pointSize = this.options.profileConfig.pointSize;
  const margin = this.options.profileConfig.margin;
  const tolerance = this.options.profileConfig.tolerance;

  const canvasCoordinates = d3.mouse(d3.select('#profileCanvas').node());

  let cx, cy;
  const p = this.utils_.getClosestPoint(this.parent_.loader.profilePoints,
    canvasCoordinates[0], canvasCoordinates[1], tolerance, this.scaleX, this.scaleY);

  if (p != undefined) {

    cx = this.scaleX(p.distance) + margin.left;
    cy = this.scaleY(p.altitude) + margin.top;

    svg.selectAll('#highlightCircle').remove();

    d3.select('svg#profileSVG').append('circle')
      .attr('id', 'highlightCircle')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', pointSize + 1)
      .style('fill', 'orange');

    const html = `Distance: ${Math.round(10 * p.distance) / 10}<br>
    Altitude: ${Math.round(10 * p.altitude) / 10}<br>
    Classification: ${this.options.profileConfig.classification[p.classification].name}<br>
    Intensity: ${p.intensity}<br>`;

    d3.select('#profileInfo')
      .html(html);
    this.parent_.loader.cartoHighlight.setElement(null);
    const el = document.createElement('div');
    el.className += 'tooltip gmf-tooltip-measure';
    el.innerHTML = html;

    this.parent_.loader.cartoHighlight.setElement(el);
    this.parent_.loader.cartoHighlight.setPosition([p.coords[0], p.coords[1]]);
    const classifColor = this.options.profileConfig.classification[p.classification].color;
    this.parent_.loader.lidarPointHighlight.getSource().clear();
    const lidarPointGeom = new ol.geom.Point([p.coords[0], p.coords[1]]);
    const lidarPointFeature = new ol.Feature(lidarPointGeom);
    if (typeof (classifColor) !== undefined) {

      lidarPointFeature.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: `rgba(${classifColor}, 1)`
          }),
          radius: 3
        })
      }));
    }

    this.parent_.loader.lidarPointHighlight.getSource().addFeature(lidarPointFeature);
  } else {
    this.parent_.loader.lidarPointHighlight.getSource().clear();
    svg.select('#highlightCircle').remove();
    d3.select('#profileInfo').html('');
    this.parent_.loader.cartoHighlight.setPosition(undefined);
  }
};

/**
* Change the profile style according to the material color
* @param {string} material value as defined in Pytree attribute configuration
* @export
*/
gmf.lidarProfile.plot.prototype.changeStyle = function(material) {

  const ctx = d3.select('#profileCanvas')
    .node().getContext('2d');
  ctx.clearRect(0, 0, d3.select('#profileCanvas').node().width, d3.select('#profileCanvas').node().height);
  this.drawPoints(this.parent_.loader.profilePoints, material);

};

/**
* Show/Hide classes in the profile
* @param {gmfx.lidarPointAttribute} classification value as defined in the Pytree classification_colors configuration
* @param {string} material  value as defined in Pytree attribute configuration
* @export
*/
gmf.lidarProfile.plot.prototype.setClassActive = function(classification, material) {

  this.options.profileConfig.classification = classification;
  const ctx = d3.select('#profileCanvas')
    .node().getContext('2d');
  ctx.clearRect(0, 0, d3.select('#profileCanvas').node().width, d3.select('#profileCanvas').node().height);
  this.drawPoints(this.parent_.loader.profilePoints, material);

};
