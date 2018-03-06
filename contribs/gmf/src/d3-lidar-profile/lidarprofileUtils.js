goog.provide('gmf.lidarProfile.Utils');

goog.require('ol.Feature');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.style.Fill');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


gmf.lidarProfile.Utils = class {

  /**
   * Clip a linstring with start and end measure givent by d3 Chart domain
   * @param {gmf.lidarProfile.Config} config the LIDAR profile config instance
   * @param {number} map_resolution the current resolution of the map
   * @param {ol.geom.LineString} linestring an OpenLayer Linestring
   * @param {number} dLeft domain minimum
   * @param {number} dRight domain maximum
   * @return {{clippedLine: Array.<ol.Coordinate>, distanceOffset: number}} Object with clipped lined coordinates and left domain value
   */
  clipLineByMeasure(config, map_resolution, linestring, dLeft, dRight) {

    const clippedLine = new ol.geom.LineString([]);
    let mileage_start = 0;
    let mileage_end = 0;

    const totalLength = linestring.getLength();
    const fractionStart = dLeft / totalLength;
    const fractionEnd = dRight / totalLength;

    linestring.forEachSegment((segStart, segEnd) => {

      const segLine = new ol.geom.LineString([segStart, segEnd]);
      mileage_end += segLine.getLength();

      if (dLeft == mileage_start) {
        clippedLine.appendCoordinate(segStart);
      } else if (dLeft > mileage_start && dLeft < mileage_end) {
        clippedLine.appendCoordinate(linestring.getCoordinateAt(fractionStart));
      }

      if (mileage_start > dLeft && mileage_start < dRight) {
        clippedLine.appendCoordinate(segStart);
      }

      if (dRight == mileage_end) {
        clippedLine.appendCoordinate(segEnd);
      } else if (dRight > mileage_start && dRight < mileage_end) {
        clippedLine.appendCoordinate(linestring.getCoordinateAt(fractionEnd));
      }

      mileage_start += segLine.getLength();

    });

    let profileWidth;
    if (config.clientConfig.autoWidth) {
      profileWidth = this.getNiceLOD(clippedLine.getLength(), config.serverConfig.max_levels).width;
    } else {
      profileWidth = config.serverConfig.width;
    }
    const feat = new ol.Feature({
      geometry: clippedLine
    });

    const widthInMapsUnits = profileWidth / map_resolution;

    const lineStyle = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(255,0,0,1)',
        width: widthInMapsUnits,
        lineCap: 'square'
      })
    });

    let firstSegmentAngle = 0;
    let lastSegementAngle = 0;
    const segNumber = clippedLine.getCoordinates().length - 1;
    let segCounter = 1;

    clippedLine.forEachSegment((start, end) => {
      if (segCounter == 1) {
        const dx = end[0] - start[0];
        const dy = end[1] - start[1];
        firstSegmentAngle = Math.atan2(dx, dy);
      }

      if (segCounter == segNumber) {
        const dx = end[0] - start[0];
        const dy = end[1] - start[1];

        lastSegementAngle = Math.atan2(dx, dy);
      }
      segCounter += 1;


    });

    const styles = [lineStyle];
    const lineEnd = clippedLine.getLastCoordinate();
    const lineStart = clippedLine.getFirstCoordinate();

    styles.push(
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
          rotation: firstSegmentAngle,
          angle: Math.PI / 3
        })
      }),
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
          rotation: lastSegementAngle,
          angle: 4 * Math.PI / 3
        })
      })
    );

    return {
      clippedLine: clippedLine.getCoordinates(),
      distanceOffset: dLeft,
      bufferGeom: feat,
      bufferStyle: styles
    };

  }


  /**
   * Get a LOD and with for a given chart span
   * Configuration is set up in Pytree configuration
   * @param {number} span domain extent
   * @param {lidarProfileServer.ConfigLevels} max_levels levels defined by a LIDAR server
   * @return {{maxLOD: number, width: number}} Object with optimized LOD and width for this profile span
   */
  getNiceLOD(span, max_levels) {
    let maxLOD = 0;
    let width = 0;
    for (const key in max_levels) {
      const level = parseInt(key, 10);
      if (span < level && max_levels[level].max > maxLOD) {
        maxLOD = max_levels[level].max;
        width = max_levels[level].width;
      }
    }
    return {
      maxLOD,
      width
    };
  }


  /**
   * Create a image file by combining SVG and canvas elements and let the user downloads it.
   * @param {gmfx.LidarProfileClientConfig} profileClientConfig The profile client configuration.
   * @export
   */
  downloadProfileAsImageFile(profileClientConfig) {
    const profileSVG = d3.select('#gmf-lidar-profile-container svg.lidar-svg');
    const w = parseInt(profileSVG.attr('width'), 10);
    const h = parseInt(profileSVG.attr('height'), 10);
    const margin = profileClientConfig.margin;

    // Create a new canvas element to avoid manipulate the one with profile.
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);

    // Draw the profile canvas (the points) into the new canvas.
    const profileCanvas = d3.select('#gmf-lidar-profile-container .lidar-canvas').node();
    ctx.drawImage(profileCanvas, margin.left, margin.top,
      w - (margin.left + margin.right), h - (margin.top + margin.bottom));

    // Add transforms the profile into an image.
    const exportImage = new Image();
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(profileSVG.node());

    // Draw the image of the profile into the context of the new canvas.
    const img_id = 'lidare_profile_for_export_uid';
    exportImage.id = img_id;
    exportImage.src = `data:image/svg+xml;base64, ${btoa(svgStr)}`;
    exportImage.style.setProperty('display', 'none');
    const main = document.getElementsByTagName('main')[0];
    // The image must be loaded to be drawn.
    exportImage.onload = () => {
      ctx.drawImage(exportImage, 0, 0, w, h);
      main.removeChild(document.getElementById(img_id));
      // Let the user download the image.
      canvas.toBlob((blob) => {
        saveAs(blob, 'LIDAR_profile.png');
      });
    };
    main.appendChild(exportImage);
  }


  /**
   * Transforms a lidarProfile into mutliple single points sorted by distance.
   * @param {gmfx.LidarProfilePoints} profilePoints in the profile
   * @return {Array.<gmfx.LidarPoint>} An array of Lidar Points.
   */
  getFlatPointsByDistance(profilePoints) {
    const points = [];
    for (let i = 0; i < profilePoints.distance.length; i++) {
      const p = {
        distance: profilePoints.distance[i],
        altitude: profilePoints.altitude[i],
        color_packed: profilePoints.color_packed[i],
        intensity: profilePoints.intensity[i],
        classification: profilePoints.classification[i],
        coords: profilePoints.coords[i]
      };
      points.push(p);
    }
    points.sort((a, b) => (a.distance - b.distance));
    return points;
  }


  /**
   * Get the data for a CSV export of the profile.
   * @param {gmfx.LidarPoint} points a lidar profile points object.
   * @return {Array.<Object>} Objects for a csv export (column: value).
   * @export
   */
  getCSVData(points) {
    return points.map((point) => {
      const row = {};
      for (const key in point) {
        const value = point[key];
        if (key == 'altitude') {
          row[key] = value.toFixed(4);
        } else if (key == 'color_packed' || key == 'coords') {
          row[key] = value.join(' ');
        } else {
          row[key] = value;
        }
      }
      return row;
    });
  }


  /**
   * Find the maximum value in am array of numbers
   * @param {(Array.<number>|undefined)} array of number
   * @return {number} the maximum of input array
   */
  arrayMax(array) {
    return array.reduce((a, b) => Math.max(a, b));
  }


  /**
   * Find the minimum value in am array of numbers
   * @param {Array.<number>|undefined} array of number
   * @return {number} the minimum of input array
   */
  arrayMin(array) {
    let minVal = Infinity;
    for (let i = 0; i < array.length; i++) {
      if (array[i] < minVal) {
        minVal = array[i];
      }
    }
    return minVal;
  }


  /**
   * Transform Openlayers linestring into a cPotree compatible definition
   * @param {ol.geom.LineString} line the profile 2D line
   * @return {string} linestring in a cPotree/pytree compatible string definition
   */
  getPytreeLinestring(line) {
    const coords = line.getCoordinates();
    let pytreeLineString = '';
    for (let i = 0; i < coords.length; i++) {
      const px = coords[i][0];
      const py = coords[i][1];
      pytreeLineString += `{${Math.round(100 * px) / 100}, ${Math.round(100 * py) / 100}},`;
    }
    return pytreeLineString.substr(0, pytreeLineString.length - 1);
  }


  /**
   * Find the profile's closest point in profile data to the chart mouse position
   * @param {gmfx.LidarProfilePoints} points Object containing points properties as arrays
   * @param {number} xs mouse x coordinate on canvas element
   * @param {number} ys mouse y coordinate on canvas element
   * @param {number} tolerance snap sensibility
   * @param {Function} sx d3.scalelinear x scale
   * @param {Function} sy d3.scalelinear y scale
   * @param {lidarProfileServer.ConfigClassifications} classification_colors classification colors
   * @return {gmfx.LidarPoint} closestPoint the closest point to the clicked coordinates
   */
  getClosestPoint(points, xs, ys, tolerance, sx, sy, classification_colors) {
    const d = points;
    const tol = tolerance;
    const distances = [];
    const hP = [];

    for (let i = 0; i < d.distance.length; i++) {
      if (sx(d.distance[i]) < xs + tol && sx(d.distance[i]) > xs - tol && sy(d.altitude[i]) < ys + tol && sy(d.altitude[i]) > ys - tol) {

        const pDistance =  Math.sqrt(Math.pow((sx(d.distance[i]) - xs), 2) + Math.pow((sy(d.altitude[i]) - ys), 2));
        const cClassif = classification_colors[d.classification[i]];
        if (cClassif && cClassif.visible == 1) {

          hP.push({
            distance: d.distance[i],
            altitude: d.altitude[i],
            classification: d.classification[i],
            color_packed: d.color_packed[i],
            intensity: d.intensity[i],
            coords: d.coords[i]
          });
          distances.push(pDistance);

        }
      }
    }

    let closestPoint;

    if (hP.length > 0) {
      const minDist = Math.min(distances);
      const indexMin = distances.indexOf(minDist);
      if (indexMin != -1) {
        closestPoint = hP[indexMin];
      } else {
        closestPoint = hP[0];
      }
    }
    return closestPoint;
  }
};
