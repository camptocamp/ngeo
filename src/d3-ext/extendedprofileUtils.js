goog.provide('ngeo.extendedProfile.utils');

/***@SITN/OM 2017
Utility fonctions for point cloud Profile
***/

ngeo.extendedProfile.utils.getLinestring = function () {

  let linestringStr = $('#coordinates').val().replace(/{/g, '').replace(/}/g, '').split(',');
  let linestring = [];

  for (let j=0; j<linestringStr.length;j++) {
    linestring.push([parseFloat(linestringStr[j]), parseFloat(linestringStr[j+1])]);
    j+=1;
  }

  let lShifted = [];
  let distance = 0;
  for (let k=0; k<linestring.length - 1; k++) {

    let shiftedX = linestring[k+1][0]-linestring[k][0];
    let shiftedY = linestring[k+1][1]-linestring[k][1];

    let endDistance = distance + Math.sqrt(Math.pow(shiftedX,2) + Math.pow(shiftedY,2));

    lShifted.push({
      shiftedX: shiftedX,
      shiftedY: shiftedY,
      origX: linestring[k][0],
      origY: linestring[k][1],
      endX: linestring[k+1][0],
      endY: linestring[k+1][1],
      coeffA: shiftedY/shiftedX, 
      startD: distance,
      endD: endDistance
    });

    distance += Math.sqrt(Math.pow(shiftedX,2) + Math.pow(shiftedY,2));

  }
  return lShifted;
}

/***
Interpolate the 2D coordinate from a profile distance (=measure M)
***/
ngeo.extendedProfile.utils.interpolatePoint = function (d, segment) {

  let xLocal = Math.round(Math.sqrt(Math.pow(d,2)/(1 + Math.pow(segment.coeffA,2))));
  let yLocal = Math.round(segment.coeffA * xLocal);
  let x = xLocal + segment.origX;
  let y = yLocal + segment.origY;
  return [x,y];

}

/***
Clip a linestring to a given plot domain
***/
ngeo.extendedProfile.utils.clipLineByMeasure = function (dLeft, dRight) {
  let l = ngeo.extendedProfile.utils.getLinestring();
  let clippedLine = [];
  // CHECK LOGIC HERE!!!
  for (let i in l) {
    if (dLeft <= l[i].endD) {
      if (dLeft >= l[i].startD) {
        clippedLine.push(ngeo.extendedProfile.utils.interpolatePoint(dLeft, l[i]));
      }
      if (dRight <= l[i].endD) {
        clippedLine.push(ngeo.extendedProfile.utils.interpolatePoint(dRight, l[i]));
      } else {
        clippedLine.push([l[i].endX,l[i].endY]);
      }
    } 
  }

  return {
    clippedLine: clippedLine,
    distanceOffset: dLeft
  }
}

ngeo.extendedProfile.utils.getNiceLOD = function(span) {
  let maxLOD = 0;
  if (span < 200) {
    maxLOD = 10;
  } else if (span < 250) {
    maxLOD = 9;
  } else if (span < 500) {
    maxLOD = 8;
  } else if (span < 1000) {
    maxLOD = 7;
  } else if (span < 1500) {
    maxLOD = 6;
  } else if (span < 2000) {
    maxLOD = 5;
  } else {
    maxLOD = 6;
  }
  return maxLOD;
}

ngeo.extendedProfile.utils.downloadDataUrlFromJavascript = function(filename, dataUrl) {

  // Construct the a element
  let link = document.createElement('a');
  link.download = filename;
  link.target = '_blank';

  // Construct the uri
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();

  // Cleanup the DOM
  document.body.removeChild(link);
  delete link;
}

/***
Export chart to a png file
@SITN/OM 2017 Adapted from http://stackoverflow.com/questions/11567668/svg-to-canvas-with-d3-js
***/
ngeo.extendedProfile.utils.exportToImageFile= function (format) {

  let svg = d3.select('#profileSVG').node();

  let img = new Image();
  let serializer = new XMLSerializer();
  let svgStr = serializer.serializeToString(svg);

  img.onload = function() {

    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    let w = d3.select('#profileSVG').attr('width');
    let h = d3.select('#profileSVG').attr('height');
    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,w,h);
    let pointsCanvas = d3.select('#profileCanvas').node();
    canvas.getContext('2d').drawImage(pointsCanvas,margin.left,margin.top,w - (margin.left + margin.right),h - (margin.top + margin.bottom));
    canvas.getContext('2d').drawImage(img,0,0,w,h);
    let dataURL = canvas.toDataURL();
    ngeo.extendedProfile.utils.downloadDataUrlFromJavascript('sitn_profile.png', dataURL);

  };

  img.src = 'data:image/svg+xml;utf8,' + svgStr;

}

/***
Code adapted from Markus Schuetz @Potree
***/

ngeo.extendedProfile.utils.getPointsInProfileAsCSV = function (profilePoints) {
  if(profilePoints.distance.length === 0){
    return;
  }

  let file = 'data:text/csv;charset=utf-8,';

  let points = [];
  for (let i=0; i<profilePoints.distance.length; i++) {

    points.push({
      distance: profilePoints.distance[i],
      altitude: profilePoints.altitude[i],
      color_packed: profilePoints.color_packed[i],
      intensity: profilePoints.intensity[i],
      classification: profilePoints.classification[i]
    })
  }

  points.sort((a, b) => (a.distance - b.distance));

  { 
    let header = '';
    if(points[0].hasOwnProperty('x')){
      header += ', x';
    }
    if(points[0].hasOwnProperty('y')){
      header += ', y';
    }
    if(points[0].hasOwnProperty('distance')){
      header += ', distance';
    }
    if(points[0].hasOwnProperty('altitude')){
      header += ', altitude';
    }
    if(points[0].hasOwnProperty('color_packed')){
      header += ', r, g, b';
    }

    if(points[0].hasOwnProperty('intensity')){
      header += ', intensity';
    }

    if(points[0].hasOwnProperty('classification')){
      header += ', classification';
    }

    if(points[0].hasOwnProperty('numberOfReturns')){
      header += ', numberOfReturns';
    }

    if(points[0].hasOwnProperty('pointSourceID')){
      header += ', pointSourceID';
    }

    if(points[0].hasOwnProperty('returnNumber')){
      header += ', returnNumber';
    }
    file += header.substr(2) + '\n';
  }

  // actual data
  for(let point of points){
    let line = point.distance.toFixed(4) + ', ';
    line += point.altitude.toFixed(4) + ', ';

    if(point.hasOwnProperty('color_packed')){
      line += point.color_packed.join(', ');
    }

    if(point.hasOwnProperty('intensity')){
      line += ', ' + point.intensity;
    }

    if(point.hasOwnProperty('classification')){
      line += ', ' + point.classification;
    }

    if(point.hasOwnProperty('numberOfReturns')){
      line += ', ' + point.numberOfReturns;
    }

    if(point.hasOwnProperty('pointSourceID')){
      line += ', ' + point.pointSourceID;
    }

    if(point.hasOwnProperty('returnNumber')){
      line += ', ' + point.returnNumber;
    }

    line += '\n';

    file = file + line;
  }

  let encodedUri = encodeURI(file);
  ngeo.extendedProfile.utils.downloadDataUrlFromJavascript('sitn_profile.csv', encodedUri);

}


