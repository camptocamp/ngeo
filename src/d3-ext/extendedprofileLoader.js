goog.provide('ngeo.extendedProfile.loader');

/**
 * Provides a function that sends xhr requests to cpotree app and parses
 * its binary output format
 */
ngeo.extendedProfile.loader.xhrRequest = function(method, minLOD, maxLOD, iter, coordinates, distanceOffset, clearPlot, lastLOD) {

  let hurl = 'http://localhost:5001/get_profile?minLOD=' + minLOD + '&maxLOD=' + maxLOD;
  hurl += '&width=' + $('#width').val() + '&coordinates=' + coordinates;
  hurl += '&pointCloud=' + $('#pointCloud').val();
  hurl += '&attributes=' + $('#attributes').val();

  let xhr = new XMLHttpRequest();
  xhr.open(method, hurl, true);
  xhr.responseType = 'arraybuffer';
  xhr.overrideMimeType('text/plain; charset=x-user-defined');
  xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200 || xhr.status === 0) {
    processBuffer(xhr.response, iter, distanceOffset, clearPlot, lastLOD);
    } else {
    console.log('Failed to load data! HTTP status: ' + xhr.status + ', file: ' + url);
    }
  }
  };
  try {
  xhr.send(null);
  } catch(e) {
  console.log('Error: ' + e);
  }
};

ngeo.extendedProfile.loader.processBuffer = function (profile, iter, distanceOffset, clearPlot, lastLOD) {
  this.profilePoints = {
    distance: [],
    altitude: [],
    color_packed: [],
    intensity: [],
    classification: []
  }
  try {
  // ***Get header size***
  let typedArrayInt32 = new Int32Array(profile, 0,4);
  let headerSize = typedArrayInt32[0];

  // ***Get JSON header content***
  let uInt8header = new Uint8Array(profile, 4, headerSize);
  let strHeaderLocal = '';
  for (let i =0; i < uInt8header.length; i++) {
    strHeaderLocal += String.fromCharCode(uInt8header[i]);
  }

  let jHeader = JSON.parse(strHeaderLocal);

  let attr = jHeader.pointAttributes;
  let attributes = [];
  for (let j=0; j<attr.length; j++){
    if (pointAttributes[attr[j]] != undefined){
    attributes.push(pointAttributes[attr[j]]);  
    }      
  }
  // ***Get points from buffer ***

  let scale = jHeader.scale;
  let points = {
    distance: [],
    altitude: [],
    classification: [],
    intensity: [],
    color_packed: []
  }
  let bytesPerPoint = jHeader.bytesPerPoint;
  let buffer = profile.slice(4 + headerSize);

  for (let i = 0; i < jHeader.points; i++) {

    let byteOffset = bytesPerPoint * i;
    let view = new DataView(buffer, byteOffset, bytesPerPoint);
    let aoffset = 0;
    for(let k=0; k<attributes.length; k++) {

    let attribute = attributes[k];

    if (attribute.name == 'POSITION_PROJECTED_PROFILE') {

      let ux = view.getUint32(aoffset, true);
      let uy = view.getUint32(aoffset + 4, true);
      let x = ux * scale;
      let y = uy * scale;
      points.distance.push(Math.round(100 * (distanceOffset + x))/100);
      points.altitude.push(Math.round(100 * y)/100);
      profilePoints.distance.push(Math.round(100 * (distanceOffset + x))/100);
      profilePoints.altitude.push(Math.round(100 * y)/100);
      
    } else if (attribute.name == 'CLASSIFICATION') {
      let classif = view.getUint8(aoffset, true);
      points.classification.push(classif);
      profilePoints.classification.push(classif);

    } else if (attribute.name == 'INTENSITY') {
      let intensity = view.getUint16(aoffset, true);
      points.intensity.push(intensity);
      profilePoints.intensity.push(intensity);

    } else if (attribute.name == 'COLOR_PACKED') {
      let r = view.getUint8(aoffset, true);
      let g = view.getUint8(aoffset + 1, true);
      let b = view.getUint8(aoffset + 2, true);
      points.color_packed.push([r, g, b]);
      profilePoints.color_packed.push([r, g, b]);

    }
    aoffset = aoffset + attribute.bytes;
    }
  }

  if (clearPlot) {
    let ctx = d3.select('#profileCanvas')
    .node().getContext('2d');
    ctx.clearRect(0, 0, $('#profileCanvas').width(), $('#profileCanvas').height());
  }
  // draw this LOD
  if (iter == 0) {
    let rangeX = [arrayMin(points.distance), arrayMax(points.distance)];
    let rangeY = [arrayMin(points.altitude), arrayMax(points.altitude)];
    setupPlot(rangeX, rangeY);
    drawPoints(points, $('#material').val(), plotParams.currentZoom);
  } else {
    let rangeX = [arrayMin(points.distance), arrayMax(points.distance)];
    let rangeY = [arrayMin(points.altitude), arrayMax(points.altitude)];
    // setupPlot(rangeX, rangeY);
    drawPoints(points, $('#material').val(), plotParams.currentZoom);
  }

  if (lastLOD) {
    generateDemDsm();
  }

  } catch (e) {
  console.log('error during buffer processing: ' + e);
  }

}

ngeo.extendedProfile.loader.loadDeeperLOD = function () {

  // reload only of mouse position changed

  let domain = plotParams.currentScaleX.domain();
  let clip = clipLineByMeasure(domain[0], domain[1]);
  let line = clip.clippedLine;
  // create the line String as taken by cpotree
  let cPotreeLineStr = '';
  for (let i in line) {
    cPotreeLineStr += '{' + line[i][0] + ',' + line[i][1] + '},';
  }
  cPotreeLineStr = cPotreeLineStr.substr(0,cPotreeLineStr.length-1);
  let minLOD = 0;
  let maxLOD = 6;

  let span = domain[1] - domain[0];

  let niceLOD = getNiceLOD(span);

  // Load gmf dem/dsm from gmf webservice
  if (d3.select('#demdsm').node().checked){
    getGmfProfile(100, line, clip.distanceOffset);
  } else {
    svg.selectAll('#line_dem').remove();
    svg.selectAll('#line_dsm').remove();
  }
  if (parseInt($('#maxLOD').val()) >= niceLOD) {
    drawPoints(profilePoints, $('#material').val(), plotParams.currentZoom);
    console.log('no loading required')
    return;
  } else {

    console.log('loading additionnal LOD');
    let m = d3.mouse(this);
    if (mousePositionStart[0] !==  m[0] && mousePositionStart[1] !== m[1]){
      xhrRequest('GET', 0, niceLOD, 100, cPotreeLineStr, clip.distanceOffset, true, true);
    } 

  }
}

/*Custom store
*/
ngeo.extendedProfile.loader.profilePoints = {
  distance: [],
  altitude: [],
  color_packed: [],
  intensity: [],
  classification: []
}

