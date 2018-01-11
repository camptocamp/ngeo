goog.provide('gmf.lidarProfile.loader');


/**
* @constructor
* @param {Object} options to be defined in gmfx
* @param {gmf.lidarProfile.plot} plot instance
*/
gmf.lidarProfile.loader = function(options, plot) {

  /**
  * @type {Object}
  * @export
  */
  this.options = options;

  /**
  * @type {gmf.lidarProfile.plot}
  * @private
  */
  this.plot_ = plot;

  /**
  * The hovered point attributes in d3 profile highlighted on the 2D map
  * @type {ol.Overlay}
  * @export
  */
  this.cartoHighlight = new ol.Overlay({
    offset: [0, -15],
    positioning: 'bottom-center'
  });

  /**
  * The hovered point geometry (point) in d3 profile highlighted on the 2D map
  * @type {ol.layer.Vector}
  * @export
  */
  this.lidarPointHighlight = new ol.layer.Vector({
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


  /**
  * The profile footpring represented as a LineString represented
  * with real mapunites stroke width
  * @type {ol.layer.Vector}
  * @export
  */
  this.lidarBuffer = new ol.layer.Vector({
    source: new ol.source.Vector({
    })
  });


  /**
  * Queue of xhr requests to Pytree service
  * Used to abort pending requests when user queries new profile before
  * all pytree requests are recieved
  * @type {Array}
  */
  this.requestsQueue_ = [];

  /**
  * The variable where all points of the profile are stored
  * @type {gmfx.LidarProfilePoints}
  * @export
  */
  this.profilePoints = {
    distance: [],
    altitude: [],
    color_packed: [],
    intensity: [],
    classification: [],
    coords: []
  };

  /**
  * Clears the profile footprint
  * @export
  */
  this.clearBuffer = function() {
    if (this.lidarBuffer) {
      this.lidarBuffer.getSource().clear();
    }
  };

  /**
  * @type {string}
  * @private
  */
  this.lastUuid_;
  /**
  * @type {boolean}
  * @private
  */
  this.isPlotSetup_ = false;
  /**
  * @type {ol.geom.LineString}
  * @private
  */
  this.line;

  /**
  * @type {gmf.lidarProfile.utils}
  */
  this.utils = new gmf.lidarProfile.utils(options, this.profilePoints);

};


/**
* Set the line for the profile
* @export
* @param {ol.geom.LineString} line that defines the profile
*/
gmf.lidarProfile.loader.prototype.setLine = function(line) {
  this.line = line;
};

/**
* Set the map for the ol.layer.Vector layers
* @export
* @param {ol.Map} map of the desktop app
*/
gmf.lidarProfile.loader.prototype.setMap = function(map) {
  this.cartoHighlight.setMap(map);
  this.lidarPointHighlight.setMap(map);
  this.lidarBuffer.setMap(map);
  this.utils.setMap(map);
};


/**
* Load profile data (lidar points) by succesive Levels Of Details using asynchronous requests
* @param {number} distanceOffset the left side of d3 profile domain at current zoom and pan configuration
* @param {boolean} resetPlot wether to reset d3 plot or not
* @param {number} minLOD minimum level of detail
* @export
*/
gmf.lidarProfile.loader.prototype.getProfileByLOD = function(distanceOffset, resetPlot, minLOD) {

  this.profilePoints = {
    distance: [],
    altitude: [],
    color_packed: [],
    intensity: [],
    classification: [],
    coords: []
  };

  if (resetPlot) {
    this.isPlotSetup_ = false;
  }

  d3.select('#lidarError').style('visibility', 'hidden');
  this.options.pytreeLinestring =  this.utils.getPytreeLinestring(this.line);

  let profileLine;
  let maxLODWith;
  if (distanceOffset == 0) {
    profileLine = this.options.pytreeLinestring;
    maxLODWith = this.utils.getNiceLOD(this.line.getLength());
  } else {

    const domain = this.plot_.scaleX.domain();
    const clip = this.utils.clipLineByMeasure(this.line, domain[0], domain[1]);
    profileLine = '';
    for (let i = 0; i < clip.clippedLine.length; i++) {
      profileLine += `{${clip.clippedLine[i][0]},${clip.clippedLine[i][1]}},`;
    }
    profileLine = profileLine.substr(0, profileLine.length - 1);
    maxLODWith = this.utils.getNiceLOD(domain[1] - domain[0]);

  }

  const uuid = this.utils.UUID();
  this.lastUuid_ = uuid;
  let lastLOD = false;

  d3.select('#lodInfo').html('');
  this.options.profileConfig.pointSum = 0;
  let profileWidth = 0;
  if (this.options.profileConfig.autoWidth) {
    profileWidth = maxLODWith.width;
  } else {
    profileWidth = this.options.profileConfig.profilWidth;
  }

  d3.select('#widthInfo').html(`Profile width: ${profileWidth}m`);

  for (let i = 0; i < maxLODWith.maxLOD; i++) {
    if (i == 0) {
      this.xhrRequest_(this.options, minLOD, this.options.profileConfig.initialLOD, i, profileLine, distanceOffset, lastLOD, profileWidth, resetPlot, uuid);
      i += this.options.profileConfig.initialLOD - 1;
    } else if (i < maxLODWith.maxLOD - 1) {
      this.xhrRequest_(this.options, minLOD + i, minLOD + i + 1, i, profileLine, distanceOffset, lastLOD, profileWidth, false, uuid);
    } else {
      lastLOD = true;
      this.xhrRequest_(this.options, minLOD + i, minLOD + i + 1, i, profileLine, distanceOffset, lastLOD, profileWidth, false, uuid);
    }
  }

};

/**
* XHR request to Pytree service for a range of Level Of Detail
* @param {Object} options the profile Options
* @param {number} minLOD minimum level of detail of the request
* @param {number} maxLOD maximum level of detail of the request
* @param {number} iter the iteration in profile requests cycle
* @param {string} coordinates linestring in cPotree format
* @param {number} distanceOffset the left side of d3 profile domain at current zoom and pan configuration
* @param {boolean} lastLOD the deepest level to retrieve for this profile
* @param {number} width the width of the profile
* @param {boolean} resetPlot wether to reset d3 plot or not, used for first LOD
* @param {string} uuid the unique identifier of the current profile requests cycle
* @private
*/
gmf.lidarProfile.loader.prototype.xhrRequest_ = function(options, minLOD, maxLOD, iter, coordinates, distanceOffset, lastLOD, width, resetPlot, uuid) {

  if (this.options.profileConfig.debug) {
    let html = d3.select('#lodInfo').html();
    html += `Loading LOD: ${minLOD}-${maxLOD}...<br>`;
    d3.select('#lodInfo').html(html);
  }

  const pointCloudName = this.options.profileConfig.defaultPointCloud;
  const hurl = `${options.pytreeLidarProfileJsonUrl_}/get_profile?minLOD=${minLOD}
    &maxLOD=${maxLOD}&width=${width}&coordinates=${coordinates}&pointCloud=${pointCloudName}&attributes='`;

  for (let i = 0; i < this.requestsQueue_.length; i++) {
    if (this.requestsQueue_[i].uuid != this.lastUuid_) {
      this.requestsQueue_[i].abort();
      this.requestsQueue_.splice(i, 1);
    }
  }

  const that = this;
  const xhr = new XMLHttpRequest();
  xhr.uuid = uuid;
  xhr.lastUuid = this.lastUuid_;
  xhr.debug = this.options.profileConfig.debug;
  xhr.open('GET', hurl, true);
  xhr.responseType = 'arraybuffer';
  xhr.overrideMimeType('text/plain; charset=x-user-defined');
  xhr.onreadystatechange = function() {

    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (xhr.uuid == xhr.lastUuid) {
          if (xhr.debug) {
            let html = d3.select('#lodInfo').html();
            html += `LOD: ${minLOD}-${maxLOD} loaded <br>`;
            d3.select('#lodInfo').html(html);
          }
          const xhrresponse = /** @type {!ArrayBuffer}*/(xhr.response);
          that.processBuffer_(xhrresponse, iter, distanceOffset, lastLOD, resetPlot);
        }
      }
    }
  };

  try {
    this.requestsQueue_.push(xhr);
    xhr.send(null);
  } catch (e) {
    console.log(e);
  }
};

/**
* Process the binary array return by Pytree (cPotree)
* @param {ArrayBuffer} profile binary array returned by cPotree executable called by Pytree
* @param {number} iter the iteration in profile requests cycle
* @param {number} distanceOffset the left side of d3 profile domain at current zoom and pan configuration
* @param {boolean} lastLOD the deepest level to retrieve for this profile
* @param {boolean} resetPlot wether to reset d3 plot or not
* @private
*/
gmf.lidarProfile.loader.prototype.processBuffer_ = function(profile, iter, distanceOffset, lastLOD, resetPlot) {

  const typedArrayInt32 = new Int32Array(profile, 0, 4);
  const headerSize = typedArrayInt32[0];

  const uInt8header = new Uint8Array(profile, 4, headerSize);
  let strHeaderLocal = '';
  for (let i = 0; i < uInt8header.length; i++) {
    strHeaderLocal += String.fromCharCode(uInt8header[i]);
  }

  try {

    JSON.parse(strHeaderLocal);

  } catch (e) {
    if (!this.isPlotSetup_) {
      const canvasEl = d3.select('#profileCanvas').node();
      const ctx = d3.select('#profileCanvas')
        .node().getContext('2d');
      ctx.clearRect(0, 0, canvasEl.getBoundingClientRect().width, canvasEl.getBoundingClientRect().height);
      d3.select('svg#profileSVG').selectAll('*').remove();
      let errorTxt = '<p><b>Lidar profile service error</b></p>';
      errorTxt += '<p>It might be offline</p>';
      // TODO: check extent consistency earlier
      errorTxt += '<p>Or did you attempt to draw a profile outside data extent ?</p>';
      errorTxt += '<p>Or did you attempt to draw such a small profile that no point was returned ?</p>';
      d3.select('#lidarError').style('visibility', 'visible');
      d3.select('#lidarError').html(errorTxt);
    }
    return;
  }

  d3.select('#lidarError').style('visibility', 'hidden');

  const jHeader = JSON.parse(strHeaderLocal);

  // If number of points return is higher than Pytree configuration max value,
  // stop sending requests.
  this.options.profileConfig.pointSum += jHeader['points'];
  if (this.options.profileConfig.pointSum > this.options.profileConfig.maxPoints) {
    this.abortPendingRequests();
  }

  const attr = jHeader['pointAttributes'];
  const attributes = [];
  for (let j = 0; j < attr.length; j++) {
    if (this.options.profileConfig.pointAttributesRaw [attr[j]] != undefined) {
      attributes.push(this.options.profileConfig.pointAttributesRaw[attr[j]]);
    }
  }
  const scale = jHeader['scale'];

  if (jHeader['points'] < 3) {
    this.isPlotSetup_ = false;
    return;
  }

  /**
  * @type {gmfx.LidarProfilePoints}
  */
  const points = {
    distance: [],
    altitude: [],
    color_packed: [],
    intensity: [],
    classification: [],
    coords: []
  };

  const bytesPerPoint = jHeader['bytesPerPoint'];
  const buffer = profile.slice(4 + headerSize);
  for (let i = 0; i < jHeader['points']; i++) {

    const byteOffset = bytesPerPoint * i;
    const view = new DataView(buffer, byteOffset, bytesPerPoint);
    let aoffset = 0;
    for (let k = 0; k < attributes.length; k++) {

      if (attributes[k]['value'] == 'POSITION_PROJECTED_PROFILE') {

        const udist = view.getUint32(aoffset, true);
        const ualti = view.getUint32(aoffset + 4, true);
        const dist = udist * scale;
        const alti = ualti * scale;
        points.distance.push(Math.round(100 * (distanceOffset + dist)) / 100);
        this.profilePoints.distance.push(Math.round(100 * (distanceOffset + dist)) / 100);
        points.altitude.push(Math.round(100 * alti) / 100);
        this.profilePoints.altitude.push(Math.round(100 * alti) / 100);

      } else if (attributes[k]['value']  == 'CLASSIFICATION') {
        const classif = view.getUint8(aoffset);
        points.classification.push(classif);
        this.profilePoints.classification.push(classif);

      } else if (attributes[k]['value']  == 'INTENSITY') {
        const intensity = view.getUint8(aoffset);
        points.intensity.push(intensity);
        this.profilePoints.intensity.push(intensity);

      } else if (attributes[k]['value'] == 'COLOR_PACKED') {
        const r = view.getUint8(aoffset);
        const g = view.getUint8(aoffset + 1);
        const b = view.getUint8(aoffset + 2);
        points.color_packed.push([r, g, b]);
        this.profilePoints.color_packed.push([r, g, b]);

      } else if (attributes[k]['value']  == 'POSITION_CARTESIAN') {
        const x = view.getInt32(aoffset, true) * scale + jHeader['boundingBox']['lx'];
        const y = view.getInt32(aoffset + 4, true) * scale + jHeader['boundingBox']['ly'];
        points.coords.push([x, y]);
        this.profilePoints.coords.push([x, y]);
      }
      aoffset = aoffset + attributes[k]['bytes'];
    }
  }

  const rangeX = [0, this.line.getLength()];

  // TODO fix z offset issue in Pytree!

  const rangeY = [this.utils.arrayMin(points.altitude), this.utils.arrayMax(points.altitude)];

  if (iter == 0 && resetPlot) {
    this.plot_.setupPlot(rangeX, rangeY);
    this.isPlotSetup_ = true;
    this.plot_.drawPoints(points, this.options.profileConfig.defaultAttribute);

  } else if (!this.isPlotSetup_) {
    this.plot_.setupPlot(rangeX, rangeY);
    this.isPlotSetup_ = true;
    this.plot_.drawPoints(points, this.options.profileConfig.defaultAttribute);
  } else {
    this.plot_.drawPoints(points, this.options.profileConfig.defaultAttribute);
  }

};

/**
* Update the profile data according to d3 chart zoom and pan level
* @export
*/
gmf.lidarProfile.loader.prototype.updateData = function() {

  const domainX = this.plot_.scaleX.domain();
  const domainY = this.plot_.scaleY.domain();
  const clip = this.utils.clipLineByMeasure(this.line, domainX[0], domainX[1]);

  this.lidarBuffer.getSource().clear();
  this.lidarBuffer.getSource().addFeature(clip.bufferGeom);
  this.lidarBuffer.setStyle(clip.bufferStyle);

  const span = domainX[1] - domainX[0];
  const maxLODWidth = this.utils.getNiceLOD(span);
  const xTolerance = 0.2;

  if (Math.abs(domainX[0] - this.plot_.previousDomainX[0]) < xTolerance &&
      Math.abs(domainX[1] - this.plot_.previousDomainX[1]) < xTolerance) {

    this.plot_.drawPoints(this.profilePoints,
      this.options.profileConfig.defaultAttribute);

  } else {
    if (maxLODWidth.maxLOD <= this.options.profileConfig.initialLOD) {
      this.plot_.drawPoints(this.profilePoints,
        this.options.profileConfig.defaultAttribute);
    } else {
      this.getProfileByLOD(clip.distanceOffset, false, 0);

    }
  }

  this.plot_.previousDomainX = domainX;
  this.plot_.previousDomainY = domainY;

};


/**
* Abort pending request to Pytree service when new batch of request is sent
* after zoom, pan or when new profile is drawn
* @export
*/
gmf.lidarProfile.loader.prototype.abortPendingRequests = function() {

  for (let i = 0; i < this.requestsQueue_.length; i++) {
    this.requestsQueue_[i].abort();
    this.requestsQueue_.splice(i, 1);
  }
};
