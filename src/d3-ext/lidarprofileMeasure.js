goog.provide('ngeo.lidarProfile.measure');

ngeo.lidarProfile.measure.clearMeasure = function() {
  ngeo.lidarProfile.measure.profileMeasure = {
    pStart: {
      set: false
    },
    pEnd: {
      set: false
    }
  };

  const svg = d3.select('svg#profileSVG');
  svg.selectAll('#text_m').remove();
  svg.selectAll('#start_m').remove();
  svg.selectAll('#end_m').remove();
  svg.selectAll('#line_m').remove();

  d3.select('#height_measure').html('');

};

ngeo.lidarProfile.measure.setMeasureActive = function(el) {
  if (el.className.indexOf('active') == -1) {
    ngeo.lidarProfile.measure.clearMeasure();
    d3.select('svg#profileSVG').on('click', ngeo.lidarProfile.measure.measureHeight);
  } else {
    ngeo.lidarProfile.measure.clearMeasure();
    d3.select('svg#profileSVG').on('click', null);
  }
};

ngeo.lidarProfile.measure.startMeasure = function() {
  ngeo.lidarProfile.measure.clearMeasure();
  d3.select('svg#profileSVG').on('click', ngeo.lidarProfile.measure.measureHeight);
};

ngeo.lidarProfile.measure.measureHeight = function() {

  const margin = ngeo.lidarProfile.options.profileConfig.margin;
  const canvasCoordinates = d3.mouse(d3.select('#profileCanvas').node());
  const svgCoordinates = d3.mouse(this);
  const xs = svgCoordinates[0];
  const ys = svgCoordinates[1];
  const tolerance = 2;
  const sx = ngeo.lidarProfile.options.profileConfig.scaleX;
  const sy = ngeo.lidarProfile.options.profileConfig.scaleY;
  const pointSize = 3;
  const p = ngeo.lidarProfile.plot2canvas.getClosestPoint(ngeo.lidarProfile.loader.profilePoints, canvasCoordinates[0], canvasCoordinates[1], tolerance);

  if (!ngeo.lidarProfile.measure.profileMeasure.pStart.set) {
    if (p !== undefined) {

      ngeo.lidarProfile.measure.profileMeasure.pStart.distance = p.distance;
      ngeo.lidarProfile.measure.profileMeasure.pStart.altitude = p.altitude;
      ngeo.lidarProfile.measure.profileMeasure.pStart.cx = sx(p.distance) + margin.left;
      ngeo.lidarProfile.measure.profileMeasure.pStart.cy = sy(p.altitude) + margin.top;

    } else {

      ngeo.lidarProfile.measure.profileMeasure.pStart.distance = sx.invert(xs);
      ngeo.lidarProfile.measure.profileMeasure.pStart.altitude = sy.invert(ys);
      ngeo.lidarProfile.measure.profileMeasure.pStart.cx = xs;
      ngeo.lidarProfile.measure.profileMeasure.pStart.cy = ys;

    }

    ngeo.lidarProfile.measure.profileMeasure.pStart.set = true;
    d3.select('svg#profileSVG').append('circle')
      .attr('id', 'start_m')
      .attr('cx', ngeo.lidarProfile.measure.profileMeasure.pStart.cx)
      .attr('cy', ngeo.lidarProfile.measure.profileMeasure.pStart.cy)
      .attr('r', pointSize)
      .style('fill', 'red');

  } else if (!ngeo.lidarProfile.measure.profileMeasure.pEnd.set) {
    if (p !== undefined) {

      ngeo.lidarProfile.measure.profileMeasure.pEnd.distance = p.distance;
      ngeo.lidarProfile.measure.profileMeasure.pEnd.altitude = p.altitude;
      ngeo.lidarProfile.measure.profileMeasure.pEnd.cx = sx(p.distance) + margin.left;
      ngeo.lidarProfile.measure.profileMeasure.pEnd.cy = sy(p.altitude) + margin.top;

    } else {
      ngeo.lidarProfile.measure.profileMeasure.pEnd.distance = sx.invert(xs);
      ngeo.lidarProfile.measure.profileMeasure.pEnd.altitude = sy.invert(ys);
      ngeo.lidarProfile.measure.profileMeasure.pEnd.cx = xs;
      ngeo.lidarProfile.measure.profileMeasure.pEnd.cy = ys;
    }

    ngeo.lidarProfile.measure.profileMeasure.pEnd.set = true;
    d3.select('svg#profileSVG').append('circle')
      .attr('id', 'end_m')
      .attr('cx', ngeo.lidarProfile.measure.profileMeasure.pEnd.cx)
      .attr('cy', ngeo.lidarProfile.measure.profileMeasure.pEnd.cy)
      .attr('r', pointSize)
      .style('fill', 'red');

    d3.select('svg#profileSVG').append('line')
      .attr('id', 'line_m')
      .attr('x1', ngeo.lidarProfile.measure.profileMeasure.pStart.cx)
      .attr('y1', ngeo.lidarProfile.measure.profileMeasure.pStart.cy)
      .attr('x2', ngeo.lidarProfile.measure.profileMeasure.pEnd.cx)
      .attr('y2', ngeo.lidarProfile.measure.profileMeasure.pEnd.cy)
      .attr('stroke-width', 2)
      .attr('stroke', 'red');

  } else {

    ngeo.lidarProfile.measure.startMeasure();

  }

  const dH = ngeo.lidarProfile.measure.profileMeasure.pEnd.altitude - ngeo.lidarProfile.measure.profileMeasure.pStart.altitude;
  const dD = ngeo.lidarProfile.measure.profileMeasure.pEnd.distance - ngeo.lidarProfile.measure.profileMeasure.pStart.distance;
  const height = Math.round(10 * Math.sqrt(Math.pow(dH, 2) + Math.pow(dD, 2))) / 10;

  if (!isNaN(height)) {
    d3.select('#height_measure').html(`Hauteur: ${height}</p>`);
    d3.select('svg#profileSVG').append('text')
      .attr('id', 'text_m')
      .attr('x', 10 + (ngeo.lidarProfile.measure.profileMeasure.pStart.cx + ngeo.lidarProfile.measure.profileMeasure.pEnd.cx) / 2)
      .attr('y', (ngeo.lidarProfile.measure.profileMeasure.pStart.cy + ngeo.lidarProfile.measure.profileMeasure.pEnd.cy) / 2)
      .text(`${height} m`)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px')
      .style('font-weight', 'bold')
      .attr('fill', 'red');
  }

};
