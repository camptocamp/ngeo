goog.provide('ngeo.lidarProfile.utils');

ngeo.lidarProfile.utils.getLinestring = function() {
  const linestringStr = ngeo.lidarProfile.options.pytreeLinestring.replace(/{/g, '').replace(/}/g, '').split(',');
  const linestring = [];

  for (let j = 0; j  < linestringStr.length; j++) {
    linestring.push([parseFloat(linestringStr[j]), parseFloat(linestringStr[j + 1])]);
    j += 1;
  }

  const lShifted = [];
  let distance = 0;
  for (let k = 0; k < linestring.length - 1; k++) {

    const shiftedX = linestring[k + 1][0] - linestring[k][0];
    const shiftedY = linestring[k + 1][1] - linestring[k][1];
    const endDistance = distance + Math.sqrt(Math.pow(shiftedX, 2) + Math.pow(shiftedY, 2));

    lShifted.push({
      shiftedX: shiftedX,
      shiftedY: shiftedY,
      origX: linestring[k][0],
      origY: linestring[k][1],
      endX: linestring[k + 1][0],
      endY: linestring[k + 1][1],
      coeffA: shiftedY / shiftedX,
      startD: distance,
      endD: endDistance
    });

    distance += Math.sqrt(Math.pow(shiftedX, 2) + Math.pow(shiftedY, 2));

  }
  return lShifted;
};

ngeo.lidarProfile.utils.interpolatePoint = function(d, segment) {
  let xLocal;
  if (isFinite(segment.coeffA)) {
    xLocal = Math.round(Math.sqrt(Math.pow(d, 2) / (1 + Math.pow(segment.coeffA, 2))));
  } else {
    xLocal = d;
  }
  const yLocal = Math.round(segment.coeffA * xLocal);
  const x = xLocal + segment.origX;
  const y = yLocal + segment.origY;
  return [x, y];

};

ngeo.lidarProfile.utils.clipLineByMeasure = function(dLeft, dRight) {
  const l = ngeo.lidarProfile.utils.getLinestring();
  const clippedLine = [];

  for (let i = 0; i < l.length; i++) {

    if (dLeft <= l[i].endD) {
      if (dLeft >= l[i].startD) {
        clippedLine.push(ngeo.lidarProfile.utils.interpolatePoint(dLeft, l[i]));
      }
      if (dRight <= l[i].endD) {
        clippedLine.push(ngeo.lidarProfile.utils.interpolatePoint(dRight, l[i]));
      } else {
        clippedLine.push([l[i].endX, l[i].endY]);
      }
    }
  }
  ngeo.lidarProfile.loader.lidarBuffer.getSource().clear();
  const feat = new ol.Feature({
    geometry: new ol.geom.LineString(clippedLine)
  });
  ngeo.lidarProfile.loader.lidarBuffer.getSource().addFeature(feat);
  return {
    clippedLine: clippedLine,
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
