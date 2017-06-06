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

/**
 * Provides a function that sends xhr requests to cpotree app and parses
 * its binary output format
 */
ngeo.extendedProfile.loader.xhrRequest = function(method, minLOD, maxLOD, iter, coordinates, distanceOffset, clearPlot, lastLOD) {

  let hurl = 'http://localhost:5001/get_profile?minLOD=' + minLOD + '&maxLOD=' + maxLOD;
  hurl += '&width=100' + '&coordinates=' + coordinates;
  hurl += '&pointCloud=sitn2010';
  hurl += '&attributes=';

  let xhr = new XMLHttpRequest();
  xhr.open(method, hurl, true);
  xhr.responseType = 'arraybuffer';
  xhr.overrideMimeType('text/plain; charset=x-user-defined');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
          ngeo.extendedProfile.loader.processBuffer(xhr.response, iter, distanceOffset, clearPlot, lastLOD);
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

    if (clearPlot) {
      let ctx = d3.select('#profileCanvas')
      .node().getContext('2d');
      ctx.clearRect(0, 0, $('#profileCanvas').width(), $('#profileCanvas').height());
    }
    // draw this LOD
    if (iter == 0) {
      let rangeX = [ngeo.extendedProfile.plot2canvas.arrayMin(points.distance), ngeo.extendedProfile.plot2canvas.arrayMax(points.distance)];
      let rangeY = [ngeo.extendedProfile.plot2canvas.arrayMin(points.altitude), ngeo.extendedProfile.plot2canvas.arrayMax(points.altitude)];
      ngeo.extendedProfile.plot2canvas.setupPlot(rangeX, rangeY);
      ngeo.extendedProfile.plot2canvas.drawPoints (points, $('#material').val(), ngeo.extendedProfile.config.plotParams.currentZoom);
    } else {
      let rangeX = [ngeo.extendedProfile.plot2canvas.arrayMin(points.distance), ngeo.extendedProfile.plot2canvas.arrayMax(points.distance)];
      let rangeY = [ngeo.extendedProfile.plot2canvas.arrayMin(points.altitude), ngeo.extendedProfile.plot2canvas.arrayMax(points.altitude)];
      ngeo.extendedProfile.plot2canvas.drawPoints (points, $('#material').val(), ngeo.extendedProfile.config.plotParams.currentZoom);
    }

    if (lastLOD) {
      ngeo.extendedProfile.raster.generateDemDsm();
    }

  // } catch (e) {
  // console.log('error during buffer processing: ' + e);
  // }

}

ngeo.extendedProfile.loader.loadDeeperLOD = function () {

  let domain = ngeo.extendedProfile.config.plotParams.currentScaleX.domain();
  let clip = ngeo.extendedProfile.utils.clipLineByMeasure(domain[0], domain[1]);
  let line = clip.clippedLine;

  let cPotreeLineStr = '';
  for (let i in line) {
    cPotreeLineStr += '{' + line[i][0] + ',' + line[i][1] + '},';
  }
  cPotreeLineStr = cPotreeLineStr.substr(0,cPotreeLineStr.length-1);
  let minLOD = 0;
  let maxLOD = 6;

  let span = domain[1] - domain[0];

  let niceLOD = ngeo.extendedProfile.utils.getNiceLOD(span);

  // Load gmf dem/dsm from gmf webservice
  // let loadDTM = d3.select('#demdsm').node().checked; FIX THAT!!!
  let loadDTM = false;
  if (loadDTM){
    ngeo.extendedProfile.raster.getGmfProfile(100, line, clip.distanceOffset);
  } else {
    svg.selectAll('#line_dem').remove();
    svg.selectAll('#line_dsm').remove();
  }
  
  // Load additional LOD if useful
  if (maxLOD >= niceLOD) { // FIX THAT HARDCODED STUFF!!!
    ngeo.extendedProfile.plot2canvas.drawPoints(ngeo.extendedProfile.loader.profilePoints, 'CLASSIFICATION', ngeo.extendedProfile.config.plotParams.currentZoom);
  } else {
    if (mousePositionStart[0] !==  d3.mouse(this)[0] && mousePositionStart[1] !== d3.mouse(this)[1]){
      ngeo.extendedProfile.loader.xhrRequest('GET', 0, niceLOD, 100, cPotreeLineStr, clip.distanceOffset, true, true);
    } 
  }
}

