// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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

import {
  coordinatesToXY0,
  coordinatesToXY1,
  coordinatesToXY2,
  coordinatesToXY3,
} from 'gmf/objectediting/coordinate';
import olGeomLineString from 'ol/geom/LineString';
import olGeomMultiLineString from 'ol/geom/MultiLineString';
import olGeomMultiPoint from 'ol/geom/MultiPoint';
import olGeomMultiPolygon from 'ol/geom/MultiPolygon';
import olGeomPoint from 'ol/geom/Point';
import olGeomPolygon from 'ol/geom/Polygon';
import olGeomSimpleGeometry from 'ol/geom/SimpleGeometry';

/**
 * Determines whether a given geometry is empty or not. A null or undefined
 * value can be given for convenience, i.e. when using methods than can
 * return a geometry or not, for example:
 * `gmf.objectediting.geom.isEmpty(feature.getGeometry())`.
 *
 * @param {?import('ol/geom/Geometry').default|undefined} geom Geometry.
 * @return {boolean} Whether the given geometry is empty or not. A null or
 *     undefined geometry is considered empty.
 * @hidden
 */
export function isEmpty(geom) {
  let isEmpty = true;
  if (geom && geom instanceof olGeomSimpleGeometry) {
    isEmpty = geom.getFlatCoordinates().length === 0;
  }
  return isEmpty;
}

/**
 * Convert all coordinates within a geometry object to XY, i.e. remove any
 * extra dimension other than X and Y to the coordinates of a geometry.
 *
 * @param {import('ol/geom/Geometry').default} geom Geometry
 * @hidden
 */
export function toXY(geom) {
  if (geom instanceof olGeomPoint) {
    geom.setCoordinates(coordinatesToXY0(geom.getCoordinates()));
  } else if (geom instanceof olGeomMultiPoint) {
    geom.setCoordinates(coordinatesToXY1(geom.getCoordinates()));
  } else if (geom instanceof olGeomLineString) {
    geom.setCoordinates(coordinatesToXY1(geom.getCoordinates()));
  } else if (geom instanceof olGeomMultiLineString) {
    geom.setCoordinates(coordinatesToXY2(geom.getCoordinates()));
  } else if (geom instanceof olGeomPolygon) {
    geom.setCoordinates(coordinatesToXY2(geom.getCoordinates()));
  } else if (geom instanceof olGeomMultiPolygon) {
    geom.setCoordinates(coordinatesToXY3(geom.getCoordinates()));
  } else {
    throw 'gmf.objectediting.geom.toXY - unsupported geometry type';
  }
}
