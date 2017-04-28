goog.provide('ngeo.extendedProfile.measure');

/***
Height measure toolbar
***/
ngeo.extendedProfile.measure.clearMeasure = function () {

  this.profileMeasure = {
    pStart: {
      set: false
    },
    pEnd: {
      set: false
    }
  };

  svg.selectAll("#text_m").remove();
  svg.selectAll("#start_m").remove();
  svg.selectAll("#end_m").remove();
  svg.selectAll("#line_m").remove();

  $('#height_measure').html("");

}

ngeo.extendedProfile.measure.startMeasure = function () {

  clearMeasure();
  d3.select("svg#profileSVG").on("click", measureHeight)

}

ngeo.extendedProfile.measure.stopMeasure = function () {

  clearMeasure();
  d3.select("svg#profileSVG").on("click", null)

}

ngeo.extendedProfile.measure.measureHeight = function () {

  let canvasCoordinates = d3.mouse(d3.select("#profileCanvas").node());
  let svgCoordinates = d3.mouse(this);
  let xs = svgCoordinates[0];
  let ys = svgCoordinates[1];
  let tolerance = 2; 
  let sx = plotParams.currentScaleX;
  let sy = plotParams.currentScaleY;
  let pointSize = 3;
  let p = getClosestPoint(profilePoints, canvasCoordinates[0], canvasCoordinates[1], tolerance);

  if (!this.profileMeasure.pStart.set) {
    if (p != undefined) {
      this.profileMeasure.pStart.distance = p.distance;
      this.profileMeasure.pStart.altitude = p.altitude;
      this.profileMeasure.pStart.cx = sx(p.distance ) + margin.left;
      this.profileMeasure.pStart.cy = sy(p.altitude) + margin.top;
    } else {
      this.profileMeasure.pStart.distance = sx.invert(xs);
      this.profileMeasure.pStart.altitude = sy.invert(ys);
      this.profileMeasure.pStart.cx = xs ;
      this.profileMeasure.pStart.cy = ys;
    }

    this.profileMeasure.pStart.set = true;
    
    let highlightCircle = d3.select("svg#profileSVG").append("circle")
    .attr("id", "start_m")
    .attr("cx", this.profileMeasure.pStart.cx)
    .attr("cy", this.profileMeasure.pStart.cy)
    .attr("r", pointSize)
    .style("fill", "red");


  } else if (!this.profileMeasure.pEnd.set){
    if (p != undefined) {
      this.profileMeasure.pEnd.distance = p.distance;
      this.profileMeasure.pEnd.altitude = p.altitude;
      this.profileMeasure.pEnd.cxEnd = sx(p.distance ) + margin.left;
      this.profileMeasure.pEnd.cyEnd = sy(p.altitude) + margin.top;
    } else {
      this.profileMeasure.pEnd.distance = sx.invert(xs);
      this.profileMeasure.pEnd.altitude = sy.invert(ys);
      this.profileMeasure.pEnd.cx = xs;
      this.profileMeasure.pEnd.cy = ys;
    }

    this.profileMeasure.pEnd.set = true;
    let highlightCircle = d3.select("svg#profileSVG").append("circle")
    .attr("id", "end_m")
    .attr("cx", this.profileMeasure.pEnd.cx)
    .attr("cy", this.profileMeasure.pEnd.cy)
    .attr("r", pointSize)
    .style("fill", "red");

    let line = d3.select("svg#profileSVG").append("line")
    .attr("id", "line_m")
    .attr("x1", this.profileMeasure.pStart.cx)
    .attr("y1", this.profileMeasure.pStart.cy)
    .attr("x2", this.profileMeasure.pEnd.cx)
    .attr("y2", this.profileMeasure.pEnd.cy)
    .attr("stroke-width", 2)
    .attr("stroke", "red");


  } else {
    startMeasure();

  }

  let dH = profileMeasure.pEnd.altitude-profileMeasure.pStart.altitude;
  let dD = profileMeasure.pEnd.distance-profileMeasure.pStart.distance;
  let height = Math.round(10 * Math.sqrt(Math.pow(dH,2) + Math.pow(dD,2)))/10;

  if (!isNaN(height)) {
    $('#height_measure').html('Hauteur: ' + height + '</p>');
    d3.select("svg#profileSVG").append("text")
    .attr("id", "text_m")
    .attr("x", 10 + (profileMeasure.pStart.cx + profileMeasure.pEnd.cx)/2)
    .attr("y", (profileMeasure.pStart.cy + profileMeasure.pEnd.cy)/2)
    .text( height + 'm')
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "red");
  }

}
