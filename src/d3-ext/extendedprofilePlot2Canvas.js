goog.provide('ngeo.extendedProfile.plot2canvas');

/***
@SITN/OM 2017
LiDAR profile from protreeViewer adapated for new d3 API after d3 4.0 API break
***/

/***
Draw the points to canvas
***/
ngeo.extendedProfile.plot2canvas.drawPoints = function(points, material, scale) {
  // In order to optimize the point size, we scale data, not canvas!
  let pointSize = 2;
  // if (scale != null) {
    // pointSize = Math.max(pointSize/scale, 2);;
  // }

  let i = -1;
  let n = points.distance.length;
  let cx, cy;
  let ctx = d3.select('#profileCanvas').node().getContext('2d');

  while (++i < n) {

    let distance = points.distance[i];
    let altitude = points.altitude[i];
    let rgb = points.color_packed[i];
    let intensity = points.intensity[i];
    let classification = points.classification[i];

    if (ngeo.extendedProfile.config.profileConfig.classification[classification] && ngeo.extendedProfile.config.profileConfig.classification[classification].visible) {
      
      cx = ngeo.extendedProfile.config.plotParams.scaleX(distance);
      cy = ngeo.extendedProfile.config.plotParams.scaleY(altitude);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      if (material == 'COLOR_PACKED') {
        ctx.fillStyle = 'RGB(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
      } else if (material == 'INTENSITY') {
        ctx.fillStyle = 'RGB(' + intensity + ', ' + intensity + ', ' + intensity + ')';
      } else if (material == 'CLASSIFICATION') {
        ctx.fillStyle = 'RGB(' + ngeo.extendedProfile.config.profileConfig.classification[classification].color + ')';
      } else {
        ctx.fillStyle = 'RGB(' + 150 + ', ' + 150 + ', ' + 150 + ')';
      }
      ctx.arc(cx, cy, pointSize, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  }
};

/***
Setup the d3 canvas & svg plot
***/
ngeo.extendedProfile.plot2canvas.setupPlot = function (rangeX, rangeY) {
  console.log('setupPlot');
  let canvasEl = d3.select('#profileCanvas').node();
  let ctx = d3.select('#profileCanvas')
  .node().getContext('2d');
  ctx.clearRect(0, 0, canvasEl.getBoundingClientRect().width, canvasEl.getBoundingClientRect().height);

  // MOVE THAT!
  margin = {
    'left': 40,
    'top': 10,
    'right': 10,
    'bottom': 40
  }

  let containerWidth = $('div.extended-profile').width();
  let containerHeight = $('div.extended-profile').height();
  
  let width = containerWidth - (margin.left + margin.right);
  let height = containerHeight - (margin.top + margin.bottom);

  d3.select("#profileCanvas")
    .attr("height", height)
    .attr("width", width)
    .style('background-color', 'black')
    .style('z-index', 0)
    .style('position', 'absolute')
    .style('margin-left', margin.left.toString() + 'px')
    .style('margin-top', margin.top.toString() + 'px')  
  let domainProfileWidth = rangeX[1] - rangeX[0];
  let domainProfileHeight = rangeY[1] - rangeY[0];

  let domainRatio = domainProfileWidth / domainProfileHeight;
  let rangeProfileWidth = width;
  let rangeProfileHeight = height;
  let rangeRatio = rangeProfileWidth / rangeProfileHeight;
  let sx, sy;
  
  if(domainRatio < rangeRatio){
  let targetWidth = domainProfileWidth * (rangeProfileHeight / domainProfileHeight);
    let domainScale = rangeRatio / domainRatio;
    let domainScaledWidth = domainProfileWidth * domainScale;
    sx = d3.scaleLinear()
      .domain([
        domainProfileWidth / 2 - domainScaledWidth / 2 , 
        domainProfileWidth / 2 + domainScaledWidth / 2 ])
      .range([0, width]);
    sy = d3.scaleLinear()
      .domain(rangeY)
      .range([height, 0]);
  } else {
    let targetHeight = domainProfileHeight* (rangeProfileWidth / domainProfileWidth);
    let domainScale =  domainRatio / rangeRatio;
    let domainScaledHeight = domainProfileHeight * domainScale;
    let domainHeightCentroid = (rangeY[1] + rangeY[0]) / 2;
    sx = d3.scaleLinear()
      .domain(rangeX)
      .range([0, width]);
    sy = d3.scaleLinear()
      .domain([
        domainHeightCentroid - domainScaledHeight / 2 , 
        domainHeightCentroid + domainScaledHeight / 2 ])
      .range([height, 0]);
  }
  ngeo.extendedProfile.config.plotParams.scaleX = sx;
  ngeo.extendedProfile.config.plotParams.scaleY = sy;
  
  function zoomed() {
    let tr = d3.event.transform;
    svg.select('.x.axis').call(xAxis.scale(tr.rescaleX(sx)));
    svg.select('.y.axis').call(yAxis.scale(tr.rescaleY(sy)));

    ctx.clearRect(0, 0, width, height);

    d3.select('g.y.axis').selectAll('g.tick line')
    .style('opacity', '0.5')
    .style('stroke', '#d8d8d8');

    ngeo.extendedProfile.measure.clearMeasure();
    ngeo.extendedProfile.config.plotParams.currentZoom = tr.k;
    ngeo.extendedProfile.config.plotParams.scaleX = tr.rescaleX(sx);
    ngeo.extendedProfile.config.plotParams.scaleY = tr.rescaleY(sy);
    // ngeo.extendedProfile.loader.updateData();
  }

  let zoom = d3.zoom()
    .scaleExtent([1, 100])
    .on("zoom", zoomed);
  // zoom.translateExtent([[0, null], [rangeX[1], null]]);

  d3.select('svg#profileSVG').call(zoom.on('end', ngeo.extendedProfile.loader.updateData));
  // d3.select('svg#profileSVG').call(zoom);

  let context = d3.select('#profileCanvas')
    .node().getContext('2d');

  d3.select('svg#profileSVG').selectAll('*').remove();

  svg = d3.select('svg#profileSVG')
  .attr('width', (width + margin.left + margin.right).toString())
  .attr('height', (height + margin.top + margin.bottom).toString())

  d3.select('svg#profileSVG')
  .on('mousemove', ngeo.extendedProfile.plot2canvas.pointHighlight);

  let xAxis = d3.axisBottom(sx)
  let yAxis = d3.axisLeft(sy)
  .tickSize(-width);
  
  d3.select('g.y.axis').selectAll('g.tick line').style('stroke', '#d8d8d8');

  let gx = svg.append('g')
    .attr('class', 'x axis')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  svg.select('.y.axis').attr('transform', 'translate('+ (margin.left).toString() + ',' + margin.top.toString() + ')');
  svg.select('.x.axis').attr('transform', 'translate(' + margin.left.toString() + ',' + (height + margin.top).toString() + ')');

  d3.select('g.y.axis').selectAll('g.tick line')
  .style('opacity', '0.5')
  .style('stroke', '#d8d8d8');
  
  ngeo.extendedProfile.config.plotParams.previousDomain= sx.domain();

};

/***
Find the closest neighboor of the mouse coordinates within tolerance
***/
ngeo.extendedProfile.plot2canvas.getClosestPoint = function (points, xs,ys,tolerance) {
  let d = points;
  let tol = tolerance;
  let sx = ngeo.extendedProfile.config.plotParams.scaleX;
  let sy = ngeo.extendedProfile.config.plotParams.scaleY;
  let distances = [];
  let hP = [];

  for (let i=0; i < d.distance.length; i++){
    if(sx(d.distance[i]) < xs + tol && sx(d.distance[i]) > xs - tol && sy(d.altitude[i]) < ys + tol && sy(d.altitude[i]) > ys -tol){

      let pDistance =  Math.sqrt(Math.pow((sx(d.distance[i]) - xs), 2) + Math.pow((sy(d.altitude[i]) - ys), 2));

      hP.push({
        distance: d.distance[i],
        altitude: d.altitude[i],
        classification: d.classification[i],
        color_packed: d.color_packed[i],
        intensity: d.intensity[i], 
      }); 
      distances.push(pDistance);
    }
  }

  let closestPoint;

  if (hP.length > 0) {
    let minDist = Math.min(distances);
    let indexMin = distances.indexOf(minDist);
    if (indexMin != -1) {
      closestPoint = hP[indexMin];
    } else {
      closestPoint = hP[0];
    }
  }
  return closestPoint;
}

/***
Find the closest neighboor of the mouse coordinates within tolerance
***/
ngeo.extendedProfile.plot2canvas.pointHighlight = function () {

  let pointSize = 2;

  let canvasCoordinates = d3.mouse(d3.select('#profileCanvas').node());
  let svgCoordinates = d3.mouse(this);
  let xs = svgCoordinates[0];
  let ys = svgCoordinates[1];
  let tolerance = 5; 
  let sx = ngeo.extendedProfile.config.plotParams.scaleX;
  let sy = ngeo.extendedProfile.config.plotParams.scaleY;

  let p = ngeo.extendedProfile.plot2canvas.getClosestPoint(ngeo.extendedProfile.loader.profilePoints, canvasCoordinates[0], canvasCoordinates[1], tolerance);
  if (p != undefined) {

    cx = sx(p.distance ) + margin.left;
    cy = sy(p.altitude) + margin.top;

    svg.selectAll('#highlightCircle').remove();

    let highlightCircle = d3.select('svg#profileSVG').append('circle')
    .attr('id', 'highlightCircle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', pointSize + 1)
    .style('fill', 'orange');

    let html = 'distance: ' + Math.round(10 * p.distance) / 10 + ' alti: ' + Math.round( 10 * p.altitude) / 10 + '  -  ';
    html += 'Classification: ' + ngeo.extendedProfile.config.profileConfig.classification[p.classification].name + '  -  ';
    html += 'Intensity: ' + p.intensity;

    $('#profileInfo').css('color', 'orange');
    $('#profileInfo').css('font-size', '14px');
    $('#profileInfo').css('font-weight', 'bold');
    $('#profileInfo').html(html);

  } else {
    svg.select('#highlightCircle').remove();
    $('#profileInfo').html('');
  }
};

ngeo.extendedProfile.plot2canvas.changeStyle = function(material) {
  let ctx = d3.select('#profileCanvas')
  .node().getContext('2d');
  ctx.clearRect(0, 0, $('#profileCanvas').width(), $('#profileCanvas').height());
  ngeo.extendedProfile.plot2canvas.drawPoints(ngeo.extendedProfile.loader.profilePoints, material, ngeo.extendedProfile.config.plotParams.currentZoom);
}

ngeo.extendedProfile.plot2canvas.setClassActive = function(me) {
  ngeo.extendedProfile.config.profileConfig.classification[me.value].visible = me.checked;
  let ctx = d3.select('#profileCanvas')
  .node().getContext('2d');
  ctx.clearRect(0, 0, $('#profileCanvas').width(), $('#profileCanvas').height());
  ngeo.extendedProfile.plot2canvas.drawPoints(ngeo.extendedProfile.loader.profilePoints, $('#material').val(), ngeo.extendedProfile.config.plotParams.currentZoom);
}

ngeo.extendedProfile.plot2canvas.arrayMax = function (array) {
  return array.reduce((a, b) => Math.max(a, b));
}

ngeo.extendedProfile.plot2canvas.arrayMin = function (array) {
  
  let minVal = Infinity;
  for (let i=0; i<array.length; i++) {
    if(array[i] < minVal) {
      minVal = array[i];
    }
  }
  return minVal;

}
