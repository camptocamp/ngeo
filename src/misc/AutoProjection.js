// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

import angular from 'angular';
import * as olProj from 'ol/proj.js';
import * as olExtent from 'ol/extent.js';

/**
 * @constructor
 * @ngdoc service
 * @ngname ngeoAutoProjection
 * @hidden
 */
export function AutoProjectionService() {}

/**
 * Parse a string and return a coordinate if the result is valid. Given string
 * must be a two numbers separated by a space.
 * @param {string} str the string to parse.
 * @return {?import("ol/coordinate.js").Coordinate} A coordinate or null if the format is not valid.
 */
AutoProjectionService.prototype.stringToCoordinates = function (str) {
  const coords = str.match(/([\d\.']+)[\s,]+([\d\.']+)/);
  if (coords) {
    const x = parseFloat(coords[1].replace(/'/g, ''));
    const y = parseFloat(coords[2].replace(/'/g, ''));
    if (!isNaN(x) && !isNaN(y)) {
      return [x, y];
    }
  }
  return null;
};

/**
 * Get an array of projections corresponding to their EPSG codes. Log an error
 *     for each code that are not defined in ol projections.
 * @param {string[]} projectionsCodes EPSG codes (e.g. 'EPSG:3857',
 *     'epsg:3857' or '3857').
 * @return {Array<import("ol/proj/Projection.js").default>} An array of projections.
 */
AutoProjectionService.prototype.getProjectionList = function (projectionsCodes) {
  let code, proj;
  /** @type {import('ol/proj/Projection.js').default[]} */
  const projections = [];
  projectionsCodes.forEach((projection) => {
    code = projection.toUpperCase();
    if (code.substr(0, 5) != 'EPSG:') {
      code = `EPSG:${code}`;
    }
    proj = olProj.get(code);
    if (proj !== null) {
      projections.push(proj);
    } else {
      console.error(`The projection ${code} is not defined in ol.proj.`);
    }
  });
  return projections;
};

/**
 * It projects the point using the projection array and finds the first one for
 * which it falls inside of the viewProjection extent.
 * @param {import("ol/coordinate.js").Coordinate} coordinates The point to test.
 * @param {import("ol/extent.js").Extent} extent Limits in which coordinates can be valid.
 * @param {import("ol/proj/Projection.js").default} viewProjection Target projection the point.
 * @param {Array<import("ol/proj/Projection.js").default|string>=} opt_projections optional array of
 *     projections. The point is tested in each projection, in the order of
 *     the array.
 * @return {?import("ol/coordinate.js").Coordinate} A coordinates in the view's projection if it matches
 *     in one of the given projections, or null else.
 */
AutoProjectionService.prototype.tryProjections = function (
  coordinates,
  extent,
  viewProjection,
  opt_projections
) {
  let position = null;
  if (opt_projections === undefined) {
    opt_projections = [viewProjection];
  }
  opt_projections.some((projection) => {
    try {
      position = olProj.transform(coordinates, projection, viewProjection);
      if (olExtent.containsCoordinate(extent, position)) {
        return true;
      }
    } catch (e) {
      // Wrong coordinate leads to a transform error and ol throw an exception that we won't log.
    }
    position = null;
    return false;
  });
  return position;
};

/**
 * Same as AutoProjection.tryProjections but if tryProjections return null,
 * re-call it with coordinates in reverse order.
 * @param {import("ol/coordinate.js").Coordinate} coordinates The point to test.
 * @param {import("ol/extent.js").Extent} extent Limits in which coordinates can be valid.
 * @param {import("ol/proj/Projection.js").default} viewProjection Target projection the point.
 * @param {Array<import("ol/proj/Projection.js").default|string>=} opt_projections optional array of
 *     projections. The point is tested in each projection, in the order of
 *     the array.
 * @return {?import("ol/coordinate.js").Coordinate} A coordinates in the view's projection if it matches
 *     in one of the given projections, or null else.
 */
AutoProjectionService.prototype.tryProjectionsWithInversion = function (
  coordinates,
  extent,
  viewProjection,
  opt_projections
) {
  let position = this.tryProjections(coordinates, extent, viewProjection, opt_projections);
  if (position === null) {
    position = this.tryProjections(coordinates.reverse(), extent, viewProjection, opt_projections);
  }
  return position;
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoAutoProjection', []);
module.service('ngeoAutoProjection', AutoProjectionService);

export default module;
