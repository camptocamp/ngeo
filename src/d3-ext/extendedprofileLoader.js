goog.provide('ngeo.extendedProfile.loader');

/*Custom point cloud store
*/
ngeo.extendedProfile.loader.profilePoints = {
  distance: [],
  altitude: [],
  color_packed: [],
  intensity: [],
  classification: []
}

ngeo.extendedProfile.loader.requests = [];
ngeo.extendedProfile.loader.lastBatchId = '';


// Load points by LOD
ngeo.extendedProfile.loader.getProfileByLOD = function (minLOD, maxLOD, polyline, distanceOffset, width, resetPlot) {

  let uuid = ngeo.extendedProfile.utils.UUID();
  ngeo.extendedProfile.loader.lastUuid = uuid;
  let lastLOD = false;
  
  ngeo.extendedProfile.loader.profilePoints = {
    distance: [],
    altitude: [],
    color_packed: [],
    intensity: [],
    classification: []
  }

  for (var i=0; i<maxLOD; i++) {

    if (i==0){
      // the first 4 levels are usually fast to load
      ngeo.extendedProfile.loader.xhrRequest(minLOD + i, minLOD + i + 4, i, polyline, distanceOffset, lastLOD, width, resetPlot, uuid);
      i += 3;
    } else if (i < maxLOD - 1) {
      ngeo.extendedProfile.loader.xhrRequest(minLOD + i, minLOD + i + 1, i, polyline, distanceOffset, lastLOD, width, false, uuid);
    } else {
      lastLOD = true;
      ngeo.extendedProfile.loader.xhrRequest(minLOD + i, minLOD + i + 1, i, polyline, distanceOffset, lastLOD, width, false, uuid);
    }
  }

}


/**
 * Provides a function that sends xhr requests to cpotree app and parses
 * its binary output format
 */
ngeo.extendedProfile.loader.xhrRequest = function(minLOD, maxLOD, iter, coordinates, distanceOffset, lastLOD, width, resetPlot, uuid) {

  let hurl = 'http://localhost:5001/get_profile?minLOD=' + minLOD + '&maxLOD=' + maxLOD;
  hurl += '&width=' + width + '&coordinates=' + coordinates;
  hurl += '&pointCloud=sitn2010';
  hurl += '&attributes=';
  let xhr = new XMLHttpRequest();
  xhr.uuid = uuid;
  xhr.open('GET', hurl, true);
  xhr.responseType = 'arraybuffer';
  xhr.overrideMimeType('text/plain; charset=x-user-defined');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (this.uuid == ngeo.extendedProfile.loader.lastUuid) {
          ngeo.extendedProfile.loader.processBuffer(xhr.response, iter, distanceOffset, lastLOD, resetPlot);
        } else {
          console.log("cancelled query due to multiple queries");
        }
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

ngeo.extendedProfile.loader.processBuffer = function (profile, iter, distanceOffset, lastLOD, resetPlot) {
  // try {
    // ***Get header size***
    let typedArrayInt32 = new Int32Array(profile, 0,4);
    let headerSize = typedArrayInt32[0];

    // ***Get JSON header content***
    let uInt8header = new Uint8Array(profile, 4, headerSize);
    let strHeaderLocal = '';
    for (let i =0; i < uInt8header.length; i++) {
      strHeaderLocal += String.fromCharCode(uInt8header[i]);
    }

    let isEmpty = strHeaderLocal.indexOf('"points": 0');
    if (isEmpty != -1) {
      return;
    }

    let jHeader = JSON.parse(strHeaderLocal);
    let attr = jHeader.pointAttributes;
    let attributes = [];
    for (let j=0; j<attr.length; j++){
      if (ngeo.extendedProfile.config.pointAttributes[attr[j]] != undefined){
      attributes.push(ngeo.extendedProfile.config.pointAttributes[attr[j]]);  
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
        ngeo.extendedProfile.loader.profilePoints.distance.push(Math.round(100 * (distanceOffset + x))/100);
        ngeo.extendedProfile.loader.profilePoints.altitude.push(Math.round(100 * y)/100);
        
      } else if (attribute.name == 'CLASSIFICATION') {
        let classif = view.getUint8(aoffset, true);
        points.classification.push(classif);
        ngeo.extendedProfile.loader.profilePoints.classification.push(classif);

      } else if (attribute.name == 'INTENSITY') {
        let intensity = view.getUint16(aoffset, true);
        points.intensity.push(intensity);
        ngeo.extendedProfile.loader.profilePoints.intensity.push(intensity);

      } else if (attribute.name == 'COLOR_PACKED') {
        let r = view.getUint8(aoffset, true);
        let g = view.getUint8(aoffset + 1, true);
        let b = view.getUint8(aoffset + 2, true);
        points.color_packed.push([r, g, b]);
        ngeo.extendedProfile.loader.profilePoints.color_packed.push([r, g, b]);

      }
      aoffset = aoffset + attribute.bytes;
      }
    }

    // draw this LOD
    let initialProfile = ngeo.extendedProfile.utils.getLinestring();
    let lastSegment = initialProfile[initialProfile.length-1];
    let rangeX = [0, lastSegment.endD];
    let rangeY = [ngeo.extendedProfile.plot2canvas.arrayMin(points.altitude), ngeo.extendedProfile.plot2canvas.arrayMax(points.altitude)];
    console.log("RANGE Y", rangeY);
    if (iter==0 && resetPlot) {
      ngeo.extendedProfile.plot2canvas.setupPlot(rangeX, rangeY);
      ngeo.extendedProfile.plot2canvas.drawPoints(points, d3.select('#material').node().value, ngeo.extendedProfile.config.plotParams.currentZoom);

    } else {
      ngeo.extendedProfile.plot2canvas.drawPoints(points, d3.select('#material').node().value, ngeo.extendedProfile.config.plotParams.currentZoom);
    }

    if (resetPlot) {
      // ngeo.extendedProfile.raster.generateDemDsm(); // For now only add GMF
      // ngeo.extendedProfile.raster.getGmfProfile(ngeo.extendedProfile.utils.formatLinestring(), distanceOffset);
    }

  // } catch (e) {
  // console.log('error during buffer processing: ' + e);
  // }

}

ngeo.extendedProfile.loader.updateData = function () {
  
  let domain = ngeo.extendedProfile.config.plotParams.scaleX.domain();
  let clip = ngeo.extendedProfile.utils.clipLineByMeasure(domain[0], domain[1]);
  let span = domain[1] - domain[0];
  let niceLOD = ngeo.extendedProfile.utils.getNiceLOD(span);
  let previousSpan = ngeo.extendedProfile.config.plotParams.previousDomain[1] - ngeo.extendedProfile.config.plotParams.previousDomain[0];
  let dxL = ngeo.extendedProfile.config.plotParams.previousDomain[0] - domain[0];
  let dxR = ngeo.extendedProfile.config.plotParams.previousDomain[1] - domain[1];
  ngeo.extendedProfile.config.plotParams.previousDomain = domain;
  let canvasEl = d3.select('#profileCanvas').node();
  let ctx = d3.select('#profileCanvas')
  .node().getContext('2d');
  let zoomDir = previousSpan - span;

  // ngeo.extendedProfile.raster.getGmfProfile(clip.clippedLine, clip.distanceOffset);

  if (niceLOD <= ngeo.extendedProfile.config.plotParams.initialLOD && zoomDir >= 0) {
    
    console.log("zoom foward, no deeper LOD needed");
    ngeo.extendedProfile.plot2canvas.drawPoints(ngeo.extendedProfile.loader.profilePoints, d3.select('#material').node().value, ngeo.extendedProfile.config.plotParams.currentZoom);
    return;
  } else if (Math.abs(dxL) < 0.5 && Math.abs(dxR) < 0.5) {
    
    console.log("Vertical translation only, no deeper LOD needed")
    ngeo.extendedProfile.plot2canvas.drawPoints(ngeo.extendedProfile.loader.profilePoints, d3.select('#material').node().value, ngeo.extendedProfile.config.plotParams.currentZoom);
    return;

  } else {

    console.log("loading additional LOD");
    let line = clip.clippedLine;
    let cPotreeLineStr = '';

    for (let i in line) {
      cPotreeLineStr += '{' + line[i][0] + ',' + line[i][1] + '},';
    }
    cPotreeLineStr = cPotreeLineStr.substr(0,cPotreeLineStr.length-1);
    ngeo.extendedProfile.loader.getProfileByLOD(0, niceLOD, cPotreeLineStr, clip.distanceOffset, 5, false);

  }

}

