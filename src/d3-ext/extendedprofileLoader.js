goog.provide('ngeo.extendedProfile.loader');
goog.require('ol.interaction.Select');
goog.require('ol.interaction.Modify');

ngeo.extendedProfile.options = {};

ngeo.extendedProfile.setOptions = function(options) {

  ngeo.extendedProfile.options = options;

  ngeo.extendedProfile.loader.cartoHighlight = new ol.layer.Vector({
    source: new ol.source.Vector({
    })
  });
  ngeo.extendedProfile.loader.cartoHighlight.setMap(options.map);

};

ngeo.extendedProfile.loader.requestsQueue = [];

ngeo.extendedProfile.loader.getProfileByLOD = function(distanceOffset, resetPlot, minLOD, maxLOD) {

  ngeo.extendedProfile.options.pytreeLinestring =  ngeo.extendedProfile.utils.getPytreeLinestring(ngeo.extendedProfile.options.olLinestring);

  const uuid = ngeo.extendedProfile.utils.UUID();
  ngeo.extendedProfile.loader.lastUuid = uuid;
  let lastLOD = false;

  ngeo.extendedProfile.loader.profilePoints = {
    distance: [],
    altitude: [],
    color_packed: [],
    intensity: [],
    classification: [],
    coords: []
  };

  for (let i = 0; i < maxLOD; i++) {
    if (i == 0) {
      ngeo.extendedProfile.loader.xhrRequest(ngeo.extendedProfile.options, minLOD, ngeo.extendedProfile.options.profileConfig.initialLOD, i, ngeo.extendedProfile.options.pytreeLinestring, distanceOffset, lastLOD, ngeo.extendedProfile.options.profileConfig.profilWidth, resetPlot, uuid);
      i += ngeo.extendedProfile.options.profileConfig.initialLOD - 1;
    } else if (i < maxLOD - 1) {
      ngeo.extendedProfile.loader.xhrRequest(ngeo.extendedProfile.options, minLOD + i, minLOD + i + 1, i, ngeo.extendedProfile.options.pytreeLinestring, distanceOffset, lastLOD, ngeo.extendedProfile.options.profileConfig.profilWidth, false, uuid);
    } else {
      lastLOD = true;
      ngeo.extendedProfile.loader.xhrRequest(ngeo.extendedProfile.options, minLOD + i, minLOD + i + 1, i, ngeo.extendedProfile.options.pytreeLinestring, distanceOffset, lastLOD, ngeo.extendedProfile.options.profileConfig.profilWidth, false, uuid);
    }
  }

};

ngeo.extendedProfile.loader.xhrRequest = function(options, minLOD, maxLOD, iter, coordinates, distanceOffset, lastLOD, width, resetPlot, uuid) {
  d3.select('#profileInfo').html(`Loading levels:\n ${minLOD}  to ${maxLOD} ...`);
  // TODO get pointCloud from pytree config
  const hurl = `${options.pytreeLidarProfileJsonUrl_}/get_profile?minLOD=${minLOD}&maxLOD=${maxLOD}&width=${width}&coordinates=${coordinates}&pointCloud=sitn2016&attributes='`;

  for (let i = 0; i < ngeo.extendedProfile.loader.requestsQueue.length; i++) {
    if (ngeo.extendedProfile.loader.requestsQueue[i].uuid != ngeo.extendedProfile.loader.lastUuid) {
      ngeo.extendedProfile.loader.requestsQueue[i].abort();
      ngeo.extendedProfile.loader.requestsQueue.splice(i, 1);
    }
  }

  const xhr = new XMLHttpRequest();
  xhr.uuid = uuid;
  xhr.open('GET', hurl, true);
  xhr.responseType = 'arraybuffer';
  xhr.overrideMimeType('text/plain; charset=x-user-defined');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (this.uuid == ngeo.extendedProfile.loader.lastUuid) {
          d3.select('#profileInfo').html(`Levels loaded:<br> ${minLOD} to ${maxLOD}`);
          ngeo.extendedProfile.loader.processBuffer(options, xhr.response, iter, distanceOffset, lastLOD, resetPlot);
        }
      }
    }
  };

  try {
    ngeo.extendedProfile.loader.requestsQueue.push(xhr);
    xhr.send(null);
  } catch (e) {
    console.log(e);
  }
};

ngeo.extendedProfile.loader.processBuffer = function(options, profile, iter, distanceOffset, lastLOD, resetPlot) {

  try {

    const typedArrayInt32 = new Int32Array(profile, 0, 4);
    const headerSize = typedArrayInt32[0];

    const uInt8header = new Uint8Array(profile, 4, headerSize);
    let strHeaderLocal = '';
    for (let i = 0; i < uInt8header.length; i++) {
      strHeaderLocal += String.fromCharCode(uInt8header[i]);
    }

    const isEmpty = strHeaderLocal.indexOf('"points": 0');
    if (isEmpty != -1) {
      return;
    }

    const jHeader = JSON.parse(strHeaderLocal);
    const attr = jHeader.pointAttributes;
    const attributes = [];
    for (let j = 0; j < attr.length; j++) {
      if (ngeo.extendedProfile.options.profileConfig.pointAttributes[attr[j]] != undefined) {
        attributes.push(ngeo.extendedProfile.options.profileConfig.pointAttributes[attr[j]]);
      }
    }

    const scale = jHeader.scale;
    const points = {
      distance: [],
      altitude: [],
      classification: [],
      intensity: [],
      color_packed: [],
      coords: []
    };
    const bytesPerPoint = jHeader.bytesPerPoint;
    const buffer = profile.slice(4 + headerSize);

    for (let i = 0; i < jHeader.points; i++) {

      const byteOffset = bytesPerPoint * i;
      const view = new DataView(buffer, byteOffset, bytesPerPoint);
      let aoffset = 0;
      for (let k = 0; k < attributes.length; k++) {

        const attribute = attributes[k];

        if (attribute.name == 'POSITION_PROJECTED_PROFILE') {

          const ux = view.getUint32(aoffset, true);
          const uy = view.getUint32(aoffset + 4, true);
          const x = ux * scale;
          const y = uy * scale;
          points.distance.push(Math.round(100 * (distanceOffset + x)) / 100);
          points.altitude.push(Math.round(100 * y) / 100);
          ngeo.extendedProfile.loader.profilePoints.distance.push(Math.round(100 * (distanceOffset + x)) / 100);
          ngeo.extendedProfile.loader.profilePoints.altitude.push(Math.round(100 * y) / 100);

        } else if (attribute.name == 'CLASSIFICATION') {
          const classif = view.getUint8(aoffset, true);
          points.classification.push(classif);
          ngeo.extendedProfile.loader.profilePoints.classification.push(classif);

        } else if (attribute.name == 'INTENSITY') {
          const intensity = view.getUint16(aoffset, true);
          points.intensity.push(intensity);
          ngeo.extendedProfile.loader.profilePoints.intensity.push(intensity);

        } else if (attribute.name == 'COLOR_PACKED') {
          const r = view.getUint8(aoffset, true);
          const g = view.getUint8(aoffset + 1, true);
          const b = view.getUint8(aoffset + 2, true);
          points.color_packed.push([r, g, b]);
          ngeo.extendedProfile.loader.profilePoints.color_packed.push([r, g, b]);

        } else if (attribute.name == 'POSITION_CARTESIAN') {
          const x = view.getInt32(aoffset, true) * scale + jHeader.boundingBox.lx;
          const y = view.getInt32(aoffset + 4, true) * scale + jHeader.boundingBox.ly;
          // TODO handle CRS
          points.coords.push([x, y]);
          ngeo.extendedProfile.loader.profilePoints.coords.push([x, y]);
        }
        aoffset = aoffset + attribute.bytes;
      }
    }
    const initialProfile = ngeo.extendedProfile.utils.getLinestring();
    const lastSegment = initialProfile[initialProfile.length - 1];
    const rangeX = [0, lastSegment.endD];
    const rangeY = [ngeo.extendedProfile.plot2canvas.arrayMin(points.altitude), ngeo.extendedProfile.plot2canvas.arrayMax(points.altitude)];

    if (iter == 0 && resetPlot) {
      ngeo.extendedProfile.plot2canvas.setupPlot(rangeX, rangeY);
      ngeo.extendedProfile.plot2canvas.drawPoints(points, options.defaultMaterial, ngeo.extendedProfile.options.profileConfig.currentZoom);

    } else {
      ngeo.extendedProfile.plot2canvas.drawPoints(points, options.defaultMaterial, ngeo.extendedProfile.options.profileConfig.currentZoom);
    }

  } catch (e) {
    console.log(e);
  }
};

ngeo.extendedProfile.loader.updateData = function() {
  const domain = ngeo.extendedProfile.options.profileConfig.scaleX.domain();
  const clip = ngeo.extendedProfile.utils.clipLineByMeasure(domain[0], domain[1]);
  const span = domain[1] - domain[0];
  const niceLOD = ngeo.extendedProfile.utils.getNiceLOD(span);
  const previousSpan = ngeo.extendedProfile.options.profileConfig.previousDomain[1] - ngeo.extendedProfile.options.profileConfig.previousDomain[0];
  const dxL = ngeo.extendedProfile.options.profileConfig.previousDomain[0] - domain[0];
  const dxR = ngeo.extendedProfile.options.profileConfig.previousDomain[1] - domain[1];

  ngeo.extendedProfile.options.profileConfig.previousDomain = domain;

  const zoomDir = previousSpan - span;

  if (niceLOD <= ngeo.extendedProfile.options.profileConfig.initialLOD && zoomDir > 0) {
    ngeo.extendedProfile.plot2canvas.drawPoints(ngeo.extendedProfile.loader.profilePoints, ngeo.extendedProfile.options.profileConfig.defaultAttribute, ngeo.extendedProfile.options.profileConfig.currentZoom);
    return;

  } else if (niceLOD <= ngeo.extendedProfile.options.profileConfig.initialLOD && Math.abs(dxL) == 0 && Math.abs(dxR) == 0) {
    ngeo.extendedProfile.plot2canvas.drawPoints(ngeo.extendedProfile.loader.profilePoints, ngeo.extendedProfile.options.profileConfig.defaultAttribute, ngeo.extendedProfile.options.profileConfig.currentZoom);
    return;

  } else {
    const line = clip.clippedLine;
    if (clip.clippedLine.length < 2) {
      return;
    }

    let cPotreeLineStr = '';
    for (const i in line) {
      cPotreeLineStr += `{${line[i][0]} + ',' + ${line[i][1]}},`;
    }
    cPotreeLineStr = cPotreeLineStr.substr(0, cPotreeLineStr.length - 1);
    ngeo.extendedProfile.loader.getProfileByLOD(clip.distanceOffset, false, 0, niceLOD);

  }

};
