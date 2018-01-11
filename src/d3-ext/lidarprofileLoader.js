goog.provide('ngeo.lidarProfile.loader');
goog.require('ol.interaction.Select');
goog.require('ol.interaction.Modify');

ngeo.lidarProfile.options = {};

ngeo.lidarProfile.setOptions = function(options) {
  ngeo.lidarProfile.options = options;

  ngeo.lidarProfile.loader.cartoHighlight = new ol.Overlay({
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  ngeo.lidarProfile.loader.cartoHighlight.setMap(options.map);

  ngeo.lidarProfile.loader.lidarPointHighlight = new ol.layer.Vector({
    source: new ol.source.Vector({
    }),
    style: new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: 'rgba(0, 0, 255, 1)'
        }),
        radius: 3
      })
    })
  });

  ngeo.lidarProfile.loader.lidarBuffer = new ol.layer.Vector({});

  ngeo.lidarProfile.loader.lidarPointHighlight.setMap(options.map);
  ngeo.lidarProfile.loader.lidarBuffer.setMap(options.map);
};

ngeo.lidarProfile.loader.clearBuffer = function() {
  if (ngeo.lidarProfile.loader.lidarBuffer) {
    ngeo.lidarProfile.loader.lidarBuffer.setSource(null);
  }
};

ngeo.lidarProfile.loader.requestsQueue = [];

ngeo.lidarProfile.loader.getProfileByLOD = function(distanceOffset, resetPlot, minLOD) {
  ngeo.lidarProfile.loader.clearBuffer();
  ngeo.lidarProfile.options.pytreeLinestring =  ngeo.lidarProfile.utils.getPytreeLinestring(ngeo.lidarProfile.options.olLinestring);
  let profileLine;
  let maxLODWith;
  if (distanceOffset == 0) {
    profileLine = ngeo.lidarProfile.options.pytreeLinestring;
    maxLODWith = ngeo.lidarProfile.utils.getNiceLOD(ngeo.lidarProfile.options.olLinestring.getLength());
  } else {

    const domain = ngeo.lidarProfile.options.profileConfig.scaleX.domain();
    console.log('initial clip');
    const clip = ngeo.lidarProfile.utils.clipLineByMeasure(domain[0], domain[1]);
    profileLine = '';
    for (const i in clip.clippedLine) {
      profileLine += `{${clip.clippedLine[i][0]},${clip.clippedLine[i][1]}},`;
    }
    profileLine = profileLine.substr(0, profileLine.length - 1);
    maxLODWith = ngeo.lidarProfile.utils.getNiceLOD(domain[1] - domain[0]);
  }

  const uuid = ngeo.lidarProfile.utils.UUID();
  ngeo.lidarProfile.loader.lastUuid = uuid;
  let lastLOD = false;

  ngeo.lidarProfile.loader.profilePoints = {
    distance: [],
    altitude: [],
    color_packed: [],
    intensity: [],
    classification: [],
    coords: []
  };
  d3.select('#lodInfo').html('');
  ngeo.lidarProfile.options.profileConfig.pointSum = 0;
  let profileWidth = 0;
  if (ngeo.lidarProfile.options.profileConfig.autoWidth) {
    profileWidth = maxLODWith.width;
  } else {
    profileWidth = ngeo.lidarProfile.options.profileConfig.profilWidth;
  }

  d3.select('#widthInfo').html(`Profile width: ${profileWidth}m`);

  for (let i = 0; i < maxLODWith.maxLOD; i++) {
    if (i == 0) {
      ngeo.lidarProfile.loader.xhrRequest(ngeo.lidarProfile.options, minLOD, ngeo.lidarProfile.options.profileConfig.initialLOD, i, profileLine, distanceOffset, lastLOD, profileWidth, resetPlot, uuid);
      i += ngeo.lidarProfile.options.profileConfig.initialLOD - 1;
    } else if (i < maxLODWith.maxLOD - 1) {
      ngeo.lidarProfile.loader.xhrRequest(ngeo.lidarProfile.options, minLOD + i, minLOD + i + 1, i, profileLine, distanceOffset, lastLOD, profileWidth, false, uuid);
    } else {
      lastLOD = true;
      ngeo.lidarProfile.loader.xhrRequest(ngeo.lidarProfile.options, minLOD + i, minLOD + i + 1, i, profileLine, distanceOffset, lastLOD, profileWidth, false, uuid);
    }
  }

};

ngeo.lidarProfile.loader.xhrRequest = function(options, minLOD, maxLOD, iter, coordinates, distanceOffset, lastLOD, width, resetPlot, uuid) {
  let html = d3.select('#lodInfo').html();
  html += `Loading LOD: ${minLOD}-${maxLOD}...<br>`;
  d3.select('#lodInfo').html(html);
  const pointCloudName = ngeo.lidarProfile.options.profileConfig.defaultPointCloud;
  const hurl = `${options.pytreeLidarProfileJsonUrl_}/get_profile?minLOD=${minLOD}
    &maxLOD=${maxLOD}&width=${width}&coordinates=${coordinates}&pointCloud=${pointCloudName}&attributes='`;

  for (let i = 0; i < ngeo.lidarProfile.loader.requestsQueue.length; i++) {
    if (ngeo.lidarProfile.loader.requestsQueue[i].uuid != ngeo.lidarProfile.loader.lastUuid) {
      ngeo.lidarProfile.loader.requestsQueue[i].abort();
      ngeo.lidarProfile.loader.requestsQueue.splice(i, 1);
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
        if (this.uuid == ngeo.lidarProfile.loader.lastUuid) {
          let html = d3.select('#lodInfo').html();
          html += `LOD: ${minLOD}-${maxLOD} loaded <br>`;
          d3.select('#lodInfo').html(html);
          ngeo.lidarProfile.loader.processBuffer(options, xhr.response, iter, distanceOffset, lastLOD, resetPlot);
        }
      }
    }
  };

  try {
    ngeo.lidarProfile.loader.requestsQueue.push(xhr);
    xhr.send(null);
  } catch (e) {
    console.log(e);
  }
};

ngeo.lidarProfile.loader.processBuffer = function(options, profile, iter, distanceOffset, lastLOD, resetPlot) {

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
    ngeo.lidarProfile.options.profileConfig.pointSum += jHeader.points;
    if (ngeo.lidarProfile.options.profileConfig.pointSum > ngeo.lidarProfile.options.profileConfig.maxPoints) {
      ngeo.lidarProfile.loader.abortPendingRequests();
      console.log('points limit reached. canceling pending requests');
    }
    const attr = jHeader.pointAttributes;
    const attributes = [];
    for (let j = 0; j < attr.length; j++) {
      if (ngeo.lidarProfile.options.profileConfig.pointAttributes[attr[j]] != undefined) {
        attributes.push(ngeo.lidarProfile.options.profileConfig.pointAttributes[attr[j]]);
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

        if (attribute.value == 'POSITION_PROJECTED_PROFILE') {

          const udist = view.getUint32(aoffset, true);
          const ualti = view.getUint32(aoffset + 4, true);
          const dist = udist * scale;
          const alti = ualti * scale;
          points.distance.push(Math.round(100 * (distanceOffset + dist)) / 100);
          ngeo.lidarProfile.loader.profilePoints.distance.push(Math.round(100 * (distanceOffset + dist)) / 100);
          points.altitude.push(Math.round(100 * alti) / 100);
          ngeo.lidarProfile.loader.profilePoints.altitude.push(Math.round(100 * alti) / 100);

        } else if (attribute.value == 'CLASSIFICATION') {
          const classif = view.getUint8(aoffset, true);
          points.classification.push(classif);
          ngeo.lidarProfile.loader.profilePoints.classification.push(classif);

        } else if (attribute.value == 'INTENSITY') {
          const intensity = view.getUint8(aoffset, true);
          points.intensity.push(intensity);
          ngeo.lidarProfile.loader.profilePoints.intensity.push(intensity);

        } else if (attribute.value == 'COLOR_PACKED') {
          const r = view.getUint8(aoffset, true);
          const g = view.getUint8(aoffset + 1, true);
          const b = view.getUint8(aoffset + 2, true);
          points.color_packed.push([r, g, b]);
          ngeo.lidarProfile.loader.profilePoints.color_packed.push([r, g, b]);

        } else if (attribute.value == 'POSITION_CARTESIAN') {
          const x = view.getInt32(aoffset, true) * scale + jHeader.boundingBox.lx;
          const y = view.getInt32(aoffset + 4, true) * scale + jHeader.boundingBox.ly;
          points.coords.push([x, y]);
          ngeo.lidarProfile.loader.profilePoints.coords.push([x, y]);
        }
        aoffset = aoffset + attribute.bytes;
      }
    }

    const rangeX = [0, ngeo.lidarProfile.options.olLinestring.getLength()];
    // let rangeY = [ngeo.lidarProfile.plot2canvas.arrayMin(points.altitude), ngeo.lidarProfile.plot2canvas.arrayMax(points.altitude)];
    let rangeY = [jHeader.boundingBox.lz, jHeader.boundingBox.uz];

    // TODO fix z offset issue in cPotree here is an hugly fix:
    // for (let b = 0; b < points.altitude.length; b++) {
    //   points.altitude[b] = points.altitude[b] - rangeY[0] + jHeader.boundingBox.lz;
    //   ngeo.lidarProfile.loader.profilePoints.altitude[b] = ngeo.lidarProfile.loader.profilePoints.altitude[b] - rangeY[0] + jHeader.boundingBox.lz;
    // }

    rangeY = [ngeo.lidarProfile.plot2canvas.arrayMin(points.altitude), ngeo.lidarProfile.plot2canvas.arrayMax(points.altitude)];

    if (iter == 0 && resetPlot) {
      ngeo.lidarProfile.plot2canvas.setupPlot(rangeX, rangeY);
      ngeo.lidarProfile.plot2canvas.drawPoints(points, options.profileConfig.defaultAttribute,
        ngeo.lidarProfile.options.profileConfig.currentZoom);

    } else {
      ngeo.lidarProfile.plot2canvas.drawPoints(points, options.profileConfig.defaultAttribute,
        ngeo.lidarProfile.options.profileConfig.currentZoom);
    }

  } catch (e) {
    console.log(e);
  }
};

ngeo.lidarProfile.loader.updateData = function() {
  const scaleX = ngeo.lidarProfile.options.profileConfig.scaleX;
  const scaleY = ngeo.lidarProfile.options.profileConfig.scaleY;
  const domainX = scaleX.domain();
  const domainY = scaleY.domain();
  console.log('updateData clip', domainX[0], domainX[1]);

  const clip = ngeo.lidarProfile.utils.clipLineByMeasure(domainX[0], domainX[1]);
  const span = domainX[1] - domainX[0];
  const maxLODWidth = ngeo.lidarProfile.utils.getNiceLOD(span);
  const xTolerance = 0.2;

  if (Math.abs(domainX[0] - ngeo.lidarProfile.options.profileConfig.previousDomainX[0]) < xTolerance &&
      Math.abs(domainX[1] - ngeo.lidarProfile.options.profileConfig.previousDomainX[1]) < xTolerance) {
    console.log('only drawpoints 2');

    ngeo.lidarProfile.plot2canvas.drawPoints(ngeo.lidarProfile.loader.profilePoints,
      ngeo.lidarProfile.options.profileConfig.defaultAttribute,
      ngeo.lidarProfile.options.profileConfig.currentZoom);
  } else {
    console.log(maxLODWidth.maxLOD, ngeo.lidarProfile.options.profileConfig.initialLOD);
    if (maxLODWidth.maxLOD <= ngeo.lidarProfile.options.profileConfig.initialLOD) {
      console.log('only drawpoints 2');
      ngeo.lidarProfile.plot2canvas.drawPoints(ngeo.lidarProfile.loader.profilePoints,
        ngeo.lidarProfile.options.profileConfig.defaultAttribute,
        ngeo.lidarProfile.options.profileConfig.currentZoom);
    } else {
      console.log('get more lod');

      //let cPotreeLineStr = '';
      //for (const i in clip.clippedLine) {
      //  cPotreeLineStr += `{${clip.clippedLine[i][0]} + ',' + ${clip.clippedLine[i][1]}},`;
      //}
      //cPotreeLineStr = cPotreeLineStr.substr(0, cPotreeLineStr.length - 1);
      ngeo.lidarProfile.loader.getProfileByLOD(clip.distanceOffset, false, 0);

    }
  }

  ngeo.lidarProfile.options.profileConfig.previousDomainX = domainX;
  ngeo.lidarProfile.options.profileConfig.previousDomainY = domainY;

};

ngeo.lidarProfile.loader.abortPendingRequests = function() {

  for (let i = 0; i < ngeo.lidarProfile.loader.requestsQueue.length; i++) {
    ngeo.lidarProfile.loader.requestsQueue[i].abort();
    ngeo.lidarProfile.loader.requestsQueue.splice(i, 1);
  }
};
