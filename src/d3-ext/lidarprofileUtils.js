goog.provide('ngeo.lidarProfile.utils');

ngeo.lidarProfile.utils.clipLineByMeasure = function(dLeft, dRight) {

  const clippedLine = new ol.geom.LineString();
  let mileage_start = 0;
  let mileage_end = 0;

  const totalLength = ngeo.lidarProfile.options.olLinestring.getLength();
  const fractionStart = dLeft / totalLength;
  const fractionEnd = dRight / totalLength;

  ngeo.lidarProfile.options.olLinestring.forEachSegment((segStart, segEnd) => {

    const segLine = new ol.geom.LineString([segStart, segEnd]);
    mileage_end += segLine.getLength();

    if (dLeft == mileage_start) {
      clippedLine.appendCoordinate(segStart);
    } else if (dLeft > mileage_start && dLeft < mileage_end) {
      clippedLine.appendCoordinate(ngeo.lidarProfile.options.olLinestring.getCoordinateAt(fractionStart));
    }

    if (mileage_start > dLeft && mileage_start < dRight) {
      clippedLine.appendCoordinate(segStart);
    }

    if (dRight == mileage_end) {
      clippedLine.appendCoordinate(segEnd);
    } else if (dRight > mileage_start && dRight < mileage_end) {
      clippedLine.appendCoordinate(ngeo.lidarProfile.options.olLinestring.getCoordinateAt(fractionEnd));
    }

    mileage_start += segLine.getLength();

  });

  let profileWidth;
  if (ngeo.lidarProfile.options.profileConfig.autoWidth) {
    profileWidth = ngeo.lidarProfile.utils.getNiceLOD(clippedLine.getLength()).width;
  } else {
    profileWidth = ngeo.lidarProfile.options.profileConfig.profilWidth;
  }
  const feat = new ol.Feature({
    geometry: clippedLine
  });

  const widthInMapsUnits = profileWidth / ngeo.lidarProfile.options.map.getView().getResolution();

  const lineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(255,0,0,1)',
      width: widthInMapsUnits,
      lineCap: 'square'
    })
  });

  let firstSegmentAngle = 0;
  let lastSegementAngle = 0;
  const segNumber = clippedLine.getCoordinates.length - 1;
  let segCounter = 0;
  clippedLine.forEachSegment((end, start) => {
    if (segCounter == 0) {
      const dx = end[0] - start[0];
      const dy = end[1] - start[1];
      firstSegmentAngle = Math.atan2(dy, dx);
    }
    if (segCounter == segNumber) {
      const dx = end[0] - start[0];
      const dy = end[1] - start[1];
      lastSegementAngle = Math.atan2(dy, dx);
    }
    segCounter += 1;
  });

  const styles = [lineStyle];
  const lineEnd = clippedLine.getLastCoordinate();
  const lineStart = clippedLine.getFirstCoordinate();
  console.log(lineEnd);
  console.log(firstSegmentAngle, lastSegementAngle);
  styles.push(
    new ol.style.Style({
      geometry: new ol.geom.Point(lineEnd),
      image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
          color: 'rgba(255, 0, 0, 1)'
        }),
        stroke: new ol.style.Stroke({
          color: 'rgba(255,0,0,1)',
          width: 1,
          lineCap: 'square'
        }),
        points: 3,
        radius: 5,
        rotation: firstSegmentAngle,
        angle: 0
      })
    }),
    new ol.style.Style({
      geometry: new ol.geom.Point(lineStart),
      image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
          color: 'rgba(255, 0, 0, 1)'
        }),
        stroke: new ol.style.Stroke({
          color: 'rgba(255,0,0,1)',
          width: 1,
          lineCap: 'square'
        }),
        points: 3,
        radius: 5,
        rotation: lastSegementAngle,
        angle: 0
      })
    })
  );
  console.log('icirr');
  const vectorSource = new ol.source.Vector({
    features: [feat]
  });
  ngeo.lidarProfile.loader.lidarBuffer.setSource(null);
  ngeo.lidarProfile.loader.lidarBuffer.setSource(vectorSource);
  ngeo.lidarProfile.loader.lidarBuffer.setStyle(styles);

  return {
    clippedLine: clippedLine.getCoordinates(),
    distanceOffset: dLeft
  };
};

ngeo.lidarProfile.utils.getNiceLOD = function(span) {
  let maxLOD = 0;
  let width;
  const levels = ngeo.lidarProfile.options.profileConfig.maxLevels;
  for (const key in levels) {
    if (span < key && levels[key].max > maxLOD) {
      maxLOD = levels[key].max;
      width = levels[key].width;
    }
  }
  return {
    maxLOD: maxLOD,
    width: width
  };
};

ngeo.lidarProfile.utils.downloadDataUrlFromJavascript = function(filename, dataUrl) {

  const link = document.createElement('a');
  link.download = filename;
  link.target = '_blank';
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

ngeo.lidarProfile.utils.exportToImageFile = function(format) {
  const margin = ngeo.lidarProfile.options.profileConfig.margin;
  const svg = d3.select('#profileSVG').node();
  const img = new Image();
  const DOMURL = window.URL || window.webkitURL || window;
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  const svgImage = new Blob([svgStr], {type: 'image/svg+xml'});
  const canvas = document.createElement('canvas');
  const url = DOMURL.createObjectURL(svgImage);

  img.onload = function() {
    canvas.style.display = 'none';
    document.body.appendChild(canvas);
    const w = d3.select('#profileSVG').attr('width');
    const h = d3.select('#profileSVG').attr('height');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
    const pointsCanvas = d3.select('#profileCanvas').node();
    canvas.getContext('2d').drawImage(pointsCanvas, margin.left, margin.top, w - (margin.left + margin.right), h - (margin.top + margin.bottom));
    ctx.drawImage(img, 0, 0, w, h);
    const dataURL = canvas.toDataURL();
    ngeo.lidarProfile.utils.downloadDataUrlFromJavascript('sitn_profile.png', dataURL);
    DOMURL.revokeObjectURL(url);
  };
  img.src = url;
};

ngeo.lidarProfile.utils.getPointsInProfileAsCSV = function(profilePoints) {
  if (profilePoints.distance.length === 0) {
    return;
  }

  let file = 'data:text/csv;charset=utf-8,';

  const points = [];
  for (let i = 0; i < profilePoints.distance.length; i++) {

    points.push({
      distance: profilePoints.distance[i],
      altitude: profilePoints.altitude[i],
      color_packed: profilePoints.color_packed[i],
      intensity: profilePoints.intensity[i],
      classification: profilePoints.classification[i]
    });
  }

  points.sort((a, b) => (a.distance - b.distance));

  {
    let header = '';
    if (points[0].hasOwnProperty('x')) {
      header += ', x';
    }
    if (points[0].hasOwnProperty('y')) {
      header += ', y';
    }
    if (points[0].hasOwnProperty('distance')) {
      header += ', distance';
    }
    if (points[0].hasOwnProperty('altitude')) {
      header += ', altitude';
    }
    if (points[0].hasOwnProperty('color_packed')) {
      header += ', r, g, b';
    }

    if (points[0].hasOwnProperty('intensity')) {
      header += ', intensity';
    }

    if (points[0].hasOwnProperty('classification')) {
      header += ', classification';
    }

    if (points[0].hasOwnProperty('numberOfReturns')) {
      header += ', numberOfReturns';
    }

    if (points[0].hasOwnProperty('pointSourceID')) {
      header += ', pointSourceID';
    }

    if (points[0].hasOwnProperty('returnNumber')) {
      header += ', returnNumber';
    }
    file += `${header.substr(2)} \n`;
  }
  for (const point of points) {
    let line = `${point.distance.toFixed(4)}, `;
    line += `${point.altitude.toFixed(4)}, `;

    if (point.hasOwnProperty('color_packed')) {
      line += point.color_packed.join(', ');
    }

    if (point.hasOwnProperty('intensity')) {
      line += `, ${point.intensity}`;
    }

    if (point.hasOwnProperty('classification')) {
      line += `, ${point.classification}`;
    }

    if (point.hasOwnProperty('numberOfReturns')) {
      line += `, ${point.numberOfReturns}`;
    }

    if (point.hasOwnProperty('pointSourceID')) {
      line += `, ${point.pointSourceID}`;
    }

    if (point.hasOwnProperty('returnNumber')) {
      line += `, ${point.returnNumber}`;
    }

    line += '\n';

    file = file + line;
  }

  const encodedUri = encodeURI(file);
  ngeo.lidarProfile.utils.downloadDataUrlFromJavascript('sitn_profile.csv', encodedUri);

};

ngeo.lidarProfile.utils.UUID = function() {
  let nbr, randStr = '';
  do {
    randStr += (nbr = Math.random()).toString(16).substr(2);
  } while (randStr.length < 30);
  return [
    randStr.substr(0, 8), '-',
    randStr.substr(8, 4), '-4',
    randStr.substr(12, 3), '-',
    ((nbr * 4 | 0) + 8).toString(16),
    randStr.substr(15, 3), '-',
    randStr.substr(18, 12)
  ].join('');
};

ngeo.lidarProfile.utils.getPytreeLinestring = function(line) {
  const flat = line.flatCoordinates;
  let pytreeLineString = '';
  for (let i = 0; i < flat.length; i++) {
    const px = flat[i];
    const py = flat[i + 1];
    pytreeLineString += `{${Math.round(100 * px) / 100}, ${Math.round(100 * py) / 100}},`;
    i += 1;
  }
  return pytreeLineString.substr(0, pytreeLineString.length - 1);
};
