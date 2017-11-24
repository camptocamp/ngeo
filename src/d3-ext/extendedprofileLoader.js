goog.provide('ngeo.extendedProfile.loader');
goog.require('ol.interaction.Select');

ngeo.extendedProfile.options = {};

ngeo.extendedProfile.setOptions = function(options) {
  ngeo.extendedProfile.options = options;
  console.log(ngeo.extendedProfile.options);
  
  ngeo.extendedProfile.loader.cartoPoints = new ol.layer.Vector({
    source: new ol.source.Vector({
    })
  });
  ngeo.extendedProfile.loader.cartoPoints.setMap(options.map);
  ngeo.extendedProfile.loader.cartoHighlight = new ol.layer.Vector({
    source: new ol.source.Vector({
    })
  });
  ngeo.extendedProfile.loader.cartoHighlight.setMap(options.map);

}

ngeo.extendedProfile.loader.requestsQueue = [];


// Load points by LOD
ngeo.extendedProfile.loader.getProfileByLOD = function (distanceOffset, resetPlot, minLOD, maxLOD) {
  ngeo.extendedProfile.loader.cartoPoints.getSource().clear()
  ngeo.extendedProfile.options.pytreeLinestring =  ngeo.extendedProfile.utils.getPytreeLinestring(ngeo.extendedProfile.options.olLinestring);;
  
  let uuid = ngeo.extendedProfile.utils.UUID();
  ngeo.extendedProfile.loader.lastUuid = uuid;
  let lastLOD = false;

  ngeo.extendedProfile.loader.profilePoints = {
    distance: [],
    altitude: [],
    color_packed: [],
    intensity: [],
    classification: [],
    coords: []
  }

  for (let i=0; i<maxLOD; i++) {
    if (i==0){
      ngeo.extendedProfile.loader.xhrRequest(ngeo.extendedProfile.options, minLOD, ngeo.extendedProfile.options.profileConfig.initialLOD, i, ngeo.extendedProfile.options.pytreeLinestring, distanceOffset, lastLOD, ngeo.extendedProfile.options.profileConfig.profilWidth, resetPlot, uuid);
      i += ngeo.extendedProfile.options.profileConfig.initialLOD - 1;
    } else if (i < maxLOD - 1) {
      ngeo.extendedProfile.loader.xhrRequest(ngeo.extendedProfile.options, minLOD + i, minLOD + i + 1, i, ngeo.extendedProfile.options.pytreeLinestring, distanceOffset, lastLOD, ngeo.extendedProfile.options.profileConfig.profilWidth, false, uuid);
    } else {
      lastLOD = true;
      ngeo.extendedProfile.loader.xhrRequest(ngeo.extendedProfile.options, minLOD + i, minLOD + i + 1, i, ngeo.extendedProfile.options.pytreeLinestring, distanceOffset, lastLOD, ngeo.extendedProfile.options.profileConfig.profilWidth, false, uuid);
    }
  }

}


/**
 * Provides a function that sends xhr requests to cpotree app and parses
 * its binary output format
 */
ngeo.extendedProfile.loader.xhrRequest = function(options, minLOD, maxLOD, iter, coordinates, distanceOffset, lastLOD, width, resetPlot, uuid) {
  console.log("xhrRequest");
  let hurl = options.pytreeLidarProfileJsonUrl_ + '/get_profile?minLOD=' + minLOD + '&maxLOD=' + maxLOD;
  hurl += '&width=' + width + '&coordinates=' + coordinates;
  hurl += '&pointCloud=sitn2016';
  hurl += '&attributes=';


  for (let i=0; i<ngeo.extendedProfile.loader.requestsQueue.length; i++) {
    if (ngeo.extendedProfile.loader.requestsQueue[i].uuid != ngeo.extendedProfile.loader.lastUuid) {
      ngeo.extendedProfile.loader.requestsQueue[i].abort();
      ngeo.extendedProfile.loader.requestsQueue.splice(i, 1);
    }
  }

  let xhr = new XMLHttpRequest();
  xhr.uuid = uuid;
  xhr.open('GET', hurl, true);
  xhr.responseType = 'arraybuffer';
  xhr.overrideMimeType('text/plain; charset=x-user-defined');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (this.uuid == ngeo.extendedProfile.loader.lastUuid) {
          ngeo.extendedProfile.loader.processBuffer(options, xhr.response, iter, distanceOffset, lastLOD, resetPlot);
        }
      }
    }
  };

  try {
    ngeo.extendedProfile.loader.requestsQueue.push(xhr);
    xhr.send(null);
  } catch(e) {
    console.log('Error: ' + e);
  }
};

ngeo.extendedProfile.loader.processBuffer = function (options, profile, iter, distanceOffset, lastLOD, resetPlot) {

  // try {
    
    let typedArrayInt32 = new Int32Array(profile, 0,4);
    let headerSize = typedArrayInt32[0];

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
      if (ngeo.extendedProfile.options.profileConfig.pointAttributes[attr[j]] != undefined){
      attributes.push(ngeo.extendedProfile.options.profileConfig.pointAttributes[attr[j]]);
      }
    }

    let scale = jHeader.scale;
    let points = {
      distance: [],
      altitude: [],
      classification: [],
      intensity: [],
      color_packed: [],
      coords: []
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

        } else if (attribute.name == 'POSITION_CARTESIAN') {
            let x = view.getInt32(aoffset, true) * scale + jHeader.boundingBox.lx;
            let y = view.getInt32(aoffset + 4, true) * scale + jHeader.boundingBox.ly;
            // TODO handle CRS
            points.coords.push([x,y]);
            ngeo.extendedProfile.loader.profilePoints.coords.push([x,y]);
        }
          aoffset = aoffset + attribute.bytes;
      }
    }
    let initialProfile = ngeo.extendedProfile.utils.getLinestring();
    let lastSegment = initialProfile[initialProfile.length-1];
    let rangeX = [0, lastSegment.endD];
    let rangeY = [ngeo.extendedProfile.plot2canvas.arrayMin(points.altitude), ngeo.extendedProfile.plot2canvas.arrayMax(points.altitude)];

    if (iter==0 && resetPlot) {
      ngeo.extendedProfile.plot2canvas.setupPlot(rangeX, rangeY);
      ngeo.extendedProfile.plot2canvas.drawPoints(points, options.defaultMaterial, ngeo.extendedProfile.options.profileConfig.currentZoom);

    } else {
      ngeo.extendedProfile.plot2canvas.drawPoints(points, options.defaultMaterial, ngeo.extendedProfile.options.profileConfig.currentZoom);
    }

  // } catch (e) {
    // console.log('error during buffer processing: ' + e);
  // }
}

ngeo.extendedProfile.loader.updateData = function () {
  let domain = ngeo.extendedProfile.options.profileConfig.scaleX.domain();
  let clip = ngeo.extendedProfile.utils.clipLineByMeasure(domain[0], domain[1]);
  let span = domain[1] - domain[0];
  let niceLOD = ngeo.extendedProfile.utils.getNiceLOD(span);
  let previousSpan = ngeo.extendedProfile.options.profileConfig.previousDomain[1] - ngeo.extendedProfile.options.profileConfig.previousDomain[0];
  let dxL = ngeo.extendedProfile.options.profileConfig.previousDomain[0] - domain[0];
  let dxR = ngeo.extendedProfile.options.profileConfig.previousDomain[1] - domain[1];

  ngeo.extendedProfile.options.profileConfig.previousDomain = domain;
  let canvasEl = d3.select('#profileCanvas').node();
  let ctx = d3.select('#profileCanvas')
  .node().getContext('2d');
  let zoomDir = previousSpan - span;

  if (niceLOD <= ngeo.extendedProfile.options.profileConfig.initialLOD && zoomDir > 0) {
    ngeo.extendedProfile.plot2canvas.drawPoints(ngeo.extendedProfile.loader.profilePoints, ngeo.extendedProfile.options.profileConfig.selectedMaterial, ngeo.extendedProfile.options.profileConfig.currentZoom);
    return;

  } else if (niceLOD <= ngeo.extendedProfile.options.profileConfig.initialLOD && Math.abs(dxL) == 0 && Math.abs(dxR) == 0) {
    ngeo.extendedProfile.plot2canvas.drawPoints(ngeo.extendedProfile.loader.profilePoints, ngeo.extendedProfile.options.profileConfig.selectedMaterial, ngeo.extendedProfile.options.profileConfig.currentZoom);
    return;

  } else {
    let line = clip.clippedLine;
    if(clip.clippedLine.length < 2) {
      return;
    }

    let cPotreeLineStr = '';
    for (let i in line) {
      cPotreeLineStr += '{' + line[i][0] + ',' + line[i][1] + '},';
    }
    cPotreeLineStr = cPotreeLineStr.substr(0,cPotreeLineStr.length-1);
    ngeo.extendedProfile.loader.getProfileByLOD(clip.distanceOffset, false, 0, niceLOD);

  }

}
