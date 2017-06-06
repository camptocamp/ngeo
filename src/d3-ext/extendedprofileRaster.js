goog.provide('ngeo.extendedProfile.raster');

/***
@SITN/OM 2017
***/
ngeo.extendedProfile.raster.generateDemDsm = function() {

  svg.selectAll('#line_js_dem').remove();
  svg.selectAll('#line_js_dsm').remove();
  let points = [];
  for (let i=0; i<ngeo.extendedProfile.loader.profilePoints.distance.length; i++) {

    points.push({
      distance: ngeo.extendedProfile.loader.profilePoints.distance[i],
      altitude: ngeo.extendedProfile.loader.profilePoints.altitude[i],
      color_packed: ngeo.extendedProfile.loader.profilePoints.color_packed[i],
      intensity: ngeo.extendedProfile.loader.profilePoints.intensity[i],
      classification: ngeo.extendedProfile.loader.profilePoints.classification[i]
    })

  }

  points.sort((a, b) => (a.distance - b.distance));

  // let step = 1;
  let startD = points[0].distance;
  let endD = points[points.length-1].distance;
  let range = endD - startD;
  let step =  range / (10* Math.log(points.length));
  let output = [];
  let mileage_left = 0;
  let mileage_right = 0;
  let increment = 0;
  let mileage = [];
  for (let i=0; i<points.length; i++) {

    if (mileage_right <= points[i].distance) {
      while (mileage_right <= points[i].distance) {
        mileage_left = mileage_right;
        mileage_right += step;
      }
      if(points[i].distance > mileage_left && points[i].distance <= mileage_right) {
        increment += 1;
      }
    }

    if (output[increment]===undefined) {
      output[increment] = {
        distanceDem: 0,
        dem: 1000000,
        distanceDsm: 0,
        dsm: -1
      }
    }

    mileage.push(mileage_left + ' - ' + mileage_right); 
    if(points[i].distance > mileage_left && points[i].distance <= mileage_right) {
      if (output[increment].dem > points[i].altitude) {
        output[increment].dem = points[i].altitude;
        output[increment].distanceDem =  points[i].distance;
      }

      if (output[increment].dsm < points[i].altitude) {
        output[increment].dsm = points[i].altitude;
        output[increment].distanceDsm = points[i].distance;
      }
    }
  }

  let sx = ngeo.extendedProfile.config.plotParams.currentScaleX;
  let sy = ngeo.extendedProfile.config.plotParams.currentScaleY;
  for (let i=0; i<output.length-1;i++) {

    // if (output[i] != undefined) {

      // let line = d3.select('svg#profileSVG').append('line')
      // .attr('id', 'line_js_dsm')
      // .attr('x1', sx(output[i].distanceDsm) + margin.left)
      // .attr('y1', sy(output[i].dsm) + margin.top)
      // .attr('x2', sx(output[i+1].distanceDsm) + margin.left)
      // .attr('y2', sy(output[i+1].dsm) + margin.top)
      // .attr('stroke-width', 1.5)
      // .attr('stroke', '#a4f442');
    // }
  }
}

ngeo.extendedProfile.raster.getGmfProfile = function(nbPoints, coordinates, distanceOffset) {

  if (distanceOffset > 0) {
    svg.selectAll('#line_dem').remove();
    svg.selectAll('#line_dsm').remove();
  }

  let gmfurl = 'http://localhost:5001/get_gmf_dem_dsm?';

  gmfurl += 'coord=' + coordinates;
  gmfurl += '&nbPoints=' + nbPoints;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', gmfurl, true);
  xhr.responseType = 'json';
  xhr.overrideMimeType('text/plain; charset=x-user-defined');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 0) {
        ngeo.extendedProfile.raster.drawDem(JSON.parse(xhr.response), distanceOffset);
      } else {
        console.log('Failed to load data! HTTP status: ' + xhr.status + ', file: ' + gmfurl);
      }
    }
  };

  try {
    xhr.send(null);
  } catch(e) {
    console.log('Error: ' + e);
  }
}

// for gmf dem service
ngeo.extendedProfile.raster.drawDem = function(data, distanceOffset) {
  
  if(data == null) {
    return;
  }

  let d = data.profile;
  let sx = ngeo.extendedProfile.config.plotParams.currentScaleX;
  let sy = ngeo.extendedProfile.config.plotParams.currentScaleY;
  for (let i=0; i<d.length-1;i++) {
    let line = d3.select('svg#profileSVG').append('line')
    .attr('id', 'line_dem')
    .attr('x1', sx(d[i].dist + distanceOffset) + margin.left)
    .attr('y1', sy(d[i].values.mnt) + margin.top)
    .attr('x2', sx(d[i+1].dist + distanceOffset) + margin.left)
    .attr('y2', sy(d[i+1].values.mnt) + margin.top)
    .attr('stroke-width', 1.5)
    .attr('stroke', '#41caf4');
  }
}
