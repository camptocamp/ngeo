// The MIT License (MIT)
//
// Copyright (c) 2018-2022 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import olFeature from 'ol/Feature';
import olGeomLineString from 'ol/geom/LineString';
import olGeomPoint from 'ol/geom/Point';
import olStyleFill from 'ol/style/Fill';
import olStyleRegularShape from 'ol/style/RegularShape';
import olStyleStroke from 'ol/style/Stroke';
import olStyleStyle from 'ol/style/Style';
import {saveAs} from 'file-saver';
import {select as d3select} from 'd3';

import OlGeomLineString from 'ol/geom/LineString';
import {Coordinate as OlCoordinateCoordinate} from 'ol/coordinate';
import {
  LidarprofileConfigService as GmfLidarprofileConfigLidarprofileConfigService,
  LidarprofileServerConfigClassifications,
  LidarprofileServerConfigLevels,
  LidarprofileServerConfigPointAttributes,
  LidarprofileServerConfigPointAttribute,
} from 'ngeo/lidar/Config';
import {updateScaleFunction} from 'ngeo/lidar/Plot';

/**
 * The lidar point attribute list width default option
 */
type LidarPointAttributeList = {
  availableOptions?: LidarprofileServerConfigPointAttributes[];

  selectedOption?: LidarprofileServerConfigPointAttribute;
};

/**
 * The object containing all points in profile
 */
export type LidarprofileClientConfig = {
  autoWidth?: boolean;

  margin?: {
    [x: string]: number;
  };

  pointAttributes?: LidarPointAttributeList;
  pointSum?: number;
  tolerance?: number;
};

/**
 * The object containing all points in profile
 */
export type LidarprofilePoints = {
  distance?: number[];
  altitude?: number[];
  color_packed?: number[][];
  intensity?: number[];
  classification?: number[];
  coords?: number[][];
};

/**
 * Profile point after measure or after parsing of the binary array returned by Pytree
 */
export type LidarPoint = {
  cx?: number;
  cy?: number;
  distance?: number;
  altitude?: number;
  color_packed?: number[];
  coords?: number[];
  intensity?: number;
  classification?: number;
  set?: boolean;
};

type ClippedLine = {
  bufferGeom: olFeature<OlGeomLineString>;
  bufferStyle: olStyleStyle[];
  clippedLine: OlCoordinateCoordinate[];
  distanceOffset: number;
};

type NiceLOD = {
  maxLOD: number;
  width: number;
};

export default class {
  onload: () => void;
  /**
   * Clip a linstring with start and end measure given by D3 Chart domain
   *
   * @param config the LIDAR profile config
   *    instance
   * @param map_resolution the current resolution of the map
   * @param linestring an OpenLayers Linestring
   * @param dLeft domain minimum
   * @param dRight domain maximum
   * @returns Object with clipped lined coordinates and left domain value
   */
  clipLineByMeasure(
    config: GmfLidarprofileConfigLidarprofileConfigService,
    map_resolution: number,
    linestring: OlGeomLineString,
    dLeft: number,
    dRight: number
  ): ClippedLine {
    const clippedLine = new olGeomLineString([]);
    let mileage_start = 0;
    let mileage_end = 0;

    const totalLength = linestring.getLength();
    const fractionStart = dLeft / totalLength;
    const fractionEnd = dRight / totalLength;

    let segNumber = linestring.getCoordinates().length - 1;
    let counter = 0;

    linestring.forEachSegment((segStart, segEnd) => {
      counter += 1;
      const segLine = new olGeomLineString([segStart, segEnd]);
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
      } else if (dRight > mileage_start && dRight > mileage_end && counter === segNumber) {
        clippedLine.appendCoordinate(linestring.getCoordinateAt(fractionEnd));
      }

      mileage_start += segLine.getLength();
    });

    const feat = /** @type {olFeature<OlGeomLineString>} */ new olFeature({
      geometry: clippedLine,
    });

    const lineStyle = new olStyleStyle({
      stroke: new olStyleStroke({
        color: 'rgba(255,0,0,1)',
        width: 2,
        lineCap: 'square',
      }),
    });

    let firstSegmentAngle = 0;
    let lastSegementAngle = 0;

    segNumber = clippedLine.getCoordinates().length - 1;
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
      new olStyleStyle({
        geometry: new olGeomPoint(lineStart),
        image: new olStyleRegularShape({
          fill: new olStyleFill({
            color: 'rgba(255, 0, 0, 1)',
          }),
          stroke: new olStyleStroke({
            color: 'rgba(255,0,0,1)',
            width: 1,
            lineCap: 'square',
          }),
          points: 3,
          radius: 5,
          rotation: firstSegmentAngle,
          angle: Math.PI / 3,
        }),
      }),
      new olStyleStyle({
        geometry: new olGeomPoint(lineEnd),
        image: new olStyleRegularShape({
          fill: new olStyleFill({
            color: 'rgba(255, 0, 0, 1)',
          }),
          stroke: new olStyleStroke({
            color: 'rgba(255,0,0,1)',
            width: 1,
            lineCap: 'square',
          }),
          points: 3,
          radius: 5,
          rotation: lastSegementAngle,
          angle: (4 * Math.PI) / 3,
        }),
      })
    );

    return {
      clippedLine: clippedLine.getCoordinates(),
      distanceOffset: dLeft,
      bufferGeom: feat,
      bufferStyle: styles,
    };
  }

  /**
   * Get a Level Of Details and with for a given chart span
   * Configuration is set up in Pytree configuration
   *
   * @param span domain extent
   * @param max_levels levels defined
   *    by a LIDAR server
   * @returns Object with optimized Level Of Details and width for this profile span
   */
  getNiceLOD(span: number, max_levels: LidarprofileServerConfigLevels): NiceLOD {
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
      width,
    };
  }

  /**
   * Create a image file by combining SVG and canvas elements and let the user downloads it.
   *
   * @param profileClientConfig The profile client configuration.
   */
  downloadProfileAsImageFile(profileClientConfig: LidarprofileClientConfig): void {
    const lidarContainerElement = document
      .querySelector('gmf-desktop-canvas gmf-lidar-footer')
      .shadowRoot.querySelector('#gmf-lidarprofile-container ');
    const profileSVG = d3select(lidarContainerElement.querySelector('svg.lidar-svg'));
    const w = parseInt(profileSVG.attr('width'), 10);
    const h = parseInt(profileSVG.attr('height'), 10);
    const margin = profileClientConfig.margin;

    // Create a new canvas element to avoid manipulate the one with profile.
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Missing ctx');
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);

    // Draw the profile canvas (the points) into the new canvas.
    const profileCanvas = d3select(lidarContainerElement.querySelector('.lidar-canvas'));
    const profileCanvasEl = profileCanvas.node();
    // @ts-ignore
    ctx.drawImage(profileCanvasEl, margin.left, margin.top);

    // Add transforms the profile into an image.
    const exportImage = new Image();
    const serializer = new XMLSerializer();
    const profileSVGEl =
      /**
       * @type {HTMLElement}
       */ profileSVG.node();
    // @ts-ignore
    const svgStr = serializer.serializeToString(profileSVGEl);

    // Draw the image of the profile into the context of the new canvas.
    const img_id = 'lidare_profile_for_export_uid';
    exportImage.id = img_id;
    exportImage.src = `data:image/svg+xml;base64, ${btoa(svgStr)}`;
    exportImage.style.setProperty('display', 'none');
    const body = document.getElementsByTagName('body')[0];
    // The image must be loaded to be drawn.
    exportImage.onload = () => {
      ctx.drawImage(exportImage, 0, 0, w, h);
      const elImg = document.getElementById(img_id);
      if (!elImg) {
        throw new Error('Missing elImg');
      }
      body.removeChild(elImg);
      // Let the user download the image.
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Missing blob');
        }
        saveAs(blob, 'LIDAR_profile.png');
      });
    };
    body.appendChild(exportImage);
  }

  /**
   * Transforms a lidarprofile into multiple single points sorted by distance.
   *
   * @param profilePoints in the profile
   * @returns An array of Lidar Points.
   */
  getFlatPointsByDistance(profilePoints: LidarprofilePoints): LidarPoint[] {
    const points = [];
    for (let i = 0; i < profilePoints.distance.length; i++) {
      const p = {
        distance: profilePoints.distance[i],
        altitude: profilePoints.altitude[i],
        color_packed: profilePoints.color_packed[i],
        intensity: profilePoints.intensity[i],
        classification: profilePoints.classification[i],
        coords: profilePoints.coords[i],
      };
      points.push(p);
    }
    points.sort((a, b) => a.distance - b.distance);
    return points;
  }

  /**
   * Get the data for a CSV export of the profile.
   *
   * @param points A list of lidar profile point objects.
   * @returns Objects for a csv export (column: value).
   */
  getCSVData(points: LidarPoint[]): {[key: string]: string | number}[] {
    return points.map((point) => {
      const row: {[key: string]: string | number} = {};
      for (const key in point) {
        // @ts-ignore: unsupported by typescript
        const value = point[key]; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        if (key == 'altitude') {
          row[key] = (value as LidarPoint['altitude']).toFixed(4);
        } else if (key == 'color_packed' || key == 'coords') {
          row[key] = (value as LidarPoint['color_packed'] | LidarPoint['coords']).join(' ');
        } else {
          row[key] = value; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        }
      }
      return row;
    });
  }

  /**
   * Find the maximum value in am array of numbers
   *
   * @param array of number
   * @returns the maximum of input array
   */
  arrayMax(array: number[]): number {
    return array.reduce((a, b) => Math.max(a, b));
  }

  /**
   * Find the minimum value in am array of numbers
   *
   * @param array of number
   * @returns the minimum of input array
   */
  arrayMin(array: number[]): number {
    let minVal = Infinity;
    for (const element of array) {
      if (element < minVal) {
        minVal = element;
      }
    }
    return minVal;
  }

  /**
   * Transform OpenLayers linestring into a cPotree compatible definition
   *
   * @param line the profile 2D line
   * @returns linestring in a cPotree/pytree compatible string definition
   */
  getPytreeLinestring(line: OlGeomLineString): string {
    const coords = line.getCoordinates();
    let pytreeLineString = '';
    for (const coord of coords) {
      const px = coord[0];
      const py = coord[1];
      pytreeLineString += `{${Math.round(100 * px) / 100}, ${Math.round(100 * py) / 100}},`;
    }
    return pytreeLineString.substr(0, pytreeLineString.length - 1);
  }

  /**
   * Find the profile's closest point in profile data to the chart mouse position
   *
   * @param points Object containing points properties as arrays
   * @param xs mouse x coordinate on canvas element
   * @param ys mouse y coordinate on canvas element
   * @param tolerance snap sensibility
   * @param sx d3.scalelinear x scale
   * @param sy d3.scalelinear y scale
   * @param classification_colors
   *    classification colors
   * @returns closestPoint the closest point to the clicked coordinates
   */
  getClosestPoint(
    points: LidarprofilePoints,
    xs: number,
    ys: number,
    tolerance: number,
    sx: updateScaleFunction,
    sy: updateScaleFunction,
    classification_colors: LidarprofileServerConfigClassifications
  ): undefined | LidarPoint {
    const d = points;
    const tol = tolerance;
    const distances = [];
    const hP = [];

    for (let i = 0; i < d.distance.length; i++) {
      if (
        sx(d.distance[i]) < xs + tol &&
        sx(d.distance[i]) > xs - tol &&
        sy(d.altitude[i]) < ys + tol &&
        sy(d.altitude[i]) > ys - tol
      ) {
        const pDistance = Math.sqrt(
          Math.pow(sx(d.distance[i]) - xs, 2) + Math.pow(sy(d.altitude[i]) - ys, 2)
        );
        const cClassif = classification_colors[d.classification[i]];
        if (cClassif && cClassif.visible == 1) {
          hP.push({
            distance: d.distance[i],
            altitude: d.altitude[i],
            classification: d.classification[i],
            color_packed: d.color_packed[i],
            intensity: d.intensity[i],
            coords: d.coords[i],
          });
          distances.push(pDistance);
        }
      }
    }

    let closestPoint = null;

    if (hP.length > 0) {
      const minDist = Math.min(...distances);
      const indexMin = distances.indexOf(minDist);
      if (indexMin != -1) {
        closestPoint = hP[indexMin];
      } else {
        closestPoint = hP[0];
      }
    }
    return closestPoint;
  }
}
