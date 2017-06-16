goog.provide('ngeo.extendedProfile.measure');

/***
Height measure toolbar
***/
ngeo.extendedProfile.measure.clearMeasure = function () {

  ngeo.extendedProfile.measure.profileMeasure = {
    pStart: {
      set: false
    },
    pEnd: {
      set: false
    }
  };

  svg.selectAll('#text_m').remove();
  svg.selectAll('#start_m').remove();
  svg.selectAll('#end_m').remove();
  svg.selectAll('#line_m').remove();

  $('#height_measure').html('');

}

ngeo.extendedProfile.measure.startMeasure = function () {

  ngeo.extendedProfile.measure.clearMeasure();
  d3.select('svg#profileSVG').on('click', ngeo.extendedProfile.measure.measureHeight);

}

ngeo.extendedProfile.measure.stopMeasure = function () {

  ngeo.extendedProfile.measure.clearMeasure();
  d3.select('svg#profileSVG').on('click', null)

}

ngeo.extendedProfile.measure.measureHeight = function () {

  let canvasCoordinates = d3.mouse(d3.select('#profileCanvas').node());
  let svgCoordinates = d3.mouse(this);
  let xs = svgCoordinates[0];
  let ys = svgCoordinates[1];
  let tolerance = 2; 
  let sx = ngeo.extendedProfile.config.plotParams.scaleX;
  let sy = ngeo.extendedProfile.config.plotParams.scaleY;
  let pointSize = 3;
  let p = ngeo.extendedProfile.plot2canvas.getClosestPoint(ngeo.extendedProfile.loader.profilePoints, canvasCoordinates[0], canvasCoordinates[1], tolerance);

  if (!ngeo.extendedProfile.measure.profileMeasure.pStart.set) {
    if (p != undefined) {

      ngeo.extendedProfile.measure.profileMeasure.pStart.distance = p.distance;
      ngeo.extendedProfile.measure.profileMeasure.pStart.altitude = p.altitude;
      ngeo.extendedProfile.measure.profileMeasure.pStart.cx = sx(p.distance ) + margin.left;
      ngeo.extendedProfile.measure.profileMeasure.pStart.cy = sy(p.altitude) + margin.top;

    } else {

      ngeo.extendedProfile.measure.profileMeasure.pStart.distance = sx.invert(xs);
      ngeo.extendedProfile.measure.profileMeasure.pStart.altitude = sy.invert(ys);
      ngeo.extendedProfile.measure.profileMeasure.pStart.cx = xs ;
      ngeo.extendedProfile.measure.profileMeasure.pStart.cy = ys;

    }

    ngeo.extendedProfile.measure.profileMeasure.pStart.set = true;
    let highlightCircle = d3.select('svg#profileSVG').append('circle')
    .attr('id', 'start_m')
    .attr('cx', ngeo.extendedProfile.measure.profileMeasure.pStart.cx)
    .attr('cy', ngeo.extendedProfile.measure.profileMeasure.pStart.cy)
    .attr('r', pointSize)
    .style('fill', 'red');

  } else if (!ngeo.extendedProfile.measure.profileMeasure.pEnd.set){
    if (p != undefined) {

      ngeo.extendedProfile.measure.profileMeasure.pEnd.distance = p.distance;
      ngeo.extendedProfile.measure.profileMeasure.pEnd.altitude = p.altitude;
      ngeo.extendedProfile.measure.profileMeasure.pEnd.cx = sx(p.distance ) + margin.left;
      ngeo.extendedProfile.measure.profileMeasure.pEnd.cy = sy(p.altitude) + margin.top;

    } else {
      ngeo.extendedProfile.measure.profileMeasure.pEnd.distance = sx.invert(xs);
      ngeo.extendedProfile.measure.profileMeasure.pEnd.altitude = sy.invert(ys);
      ngeo.extendedProfile.measure.profileMeasure.pEnd.cx = xs;
      ngeo.extendedProfile.measure.profileMeasure.pEnd.cy = ys;
    }

    ngeo.extendedProfile.measure.profileMeasure.pEnd.set = true;
    let highlightCircle = d3.select('svg#profileSVG').append('circle')
    .attr('id', 'end_m')
    .attr('cx', ngeo.extendedProfile.measure.profileMeasure.pEnd.cx)
    .attr('cy', ngeo.extendedProfile.measure.profileMeasure.pEnd.cy)
    .attr('r', pointSize)
    .style('fill', 'red');

    let line = d3.select('svg#profileSVG').append('line')
    .attr('id', 'line_m')
    .attr('x1', ngeo.extendedProfile.measure.profileMeasure.pStart.cx)
    .attr('y1', ngeo.extendedProfile.measure.profileMeasure.pStart.cy)
    .attr('x2', ngeo.extendedProfile.measure.profileMeasure.pEnd.cx)
    .attr('y2', ngeo.extendedProfile.measure.profileMeasure.pEnd.cy)
    .attr('stroke-width', 2)
    .attr('stroke', 'red');


  } else {

    ngeo.extendedProfile.measure.startMeasure();

  }

  let dH = ngeo.extendedProfile.measure.profileMeasure.pEnd.altitude-ngeo.extendedProfile.measure.profileMeasure.pStart.altitude;
  let dD = ngeo.extendedProfile.measure.profileMeasure.pEnd.distance-ngeo.extendedProfile.measure.profileMeasure.pStart.distance;
  let height = Math.round(10 * Math.sqrt(Math.pow(dH,2) + Math.pow(dD,2)))/10;

  if (!isNaN(height)) {
    $('#height_measure').html('Hauteur: ' + height + '</p>');
    d3.select('svg#profileSVG').append('text')
    .attr('id', 'text_m')
    .attr('x', 10 + (ngeo.extendedProfile.measure.profileMeasure.pStart.cx + ngeo.extendedProfile.measure.profileMeasure.pEnd.cx)/2)
    .attr('y', (ngeo.extendedProfile.measure.profileMeasure.pStart.cy + ngeo.extendedProfile.measure.profileMeasure.pEnd.cy)/2)
    .text( height + 'm')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '14px')
    .style('font-weight', 'bold')
    .attr('fill', 'red');
  }

}
