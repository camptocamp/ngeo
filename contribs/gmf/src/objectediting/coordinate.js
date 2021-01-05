// The MIT License (MIT)
//
// Copyright (c) 2017-2020 Camptocamp SA
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

/**
 * @typedef {import("ol/coordinate.js").Coordinate} Coordinate
 */

/**
 * Convert a given coordinate or list of coordinates of any 'nesting' level
 * to XY, i.e. remove any extra dimensions to the coordinates and keep only 2.
 *
 * @param {Coordinate} coordinates Coordinates
 * @return {Coordinate} Converted coordinates.
 * @hidden
 */
export function coordinatesToXY0(coordinates) {
  if (coordinates.length > 2) {
    const coord = coordinates;
    return [coord[0], coord[1]];
  }
  return coordinates;
}

/**
 * Convert a given coordinate or list of coordinates of any 'nesting' level
 * to XY, i.e. remove any extra dimensions to the coordinates and keep only 2.
 *
 * @template {number|Coordinate|Coordinate[]|Coordinate[][]} T
 * @param {T[]} coordinates Coordinates
 * @param {number} nesting Nesting level.
 * @return {T[]} Converted coordinates.
 * @hidden
 */
export function toXY(coordinates, nesting) {
  if (nesting === 0) {
    return /** @type {T[]} */ (coordinatesToXY0(/** @type {Coordinate} */ (coordinates)));
  } else {
    for (let i = 0, ii = coordinates.length; i < ii; i++) {
      // @ts-ignore: TypeScript is not able to do recurtion with deferent type in generic
      coordinates[i] = toXY(coordinates[i], nesting - 1);
    }
  }
  return coordinates;
}

/**
 * Convert a given coordinate or list of coordinates of any 'nesting' level
 * to XY, i.e. remove any extra dimensions to the coordinates and keep only 2.
 *
 * @param {Array<import("ol/coordinate.js").Coordinate>} coordinates Coordinates
 * @return {Array<import("ol/coordinate.js").Coordinate>} Converted coordinates.
 * @hidden
 */
export function coordinatesToXY1(coordinates) {
  return toXY(coordinates, 1);
}

/**
 * Convert a given coordinate or list of coordinates of any 'nesting' level
 * to XY, i.e. remove any extra dimensions to the coordinates and keep only 2.
 *
 * @param {Array<Array<import("ol/coordinate.js").Coordinate>>} coordinates Coordinates
 * @return {Array<Array<import("ol/coordinate.js").Coordinate>>} Converted coordinates.
 * @hidden
 */
export function coordinatesToXY2(coordinates) {
  return toXY(coordinates, 2);
}

/**
 * Convert a given coordinate or list of coordinates of any 'nesting' level
 * to XY, i.e. remove any extra dimensions to the coordinates and keep only 2.
 *
 * @param {Array<Array<Array<import("ol/coordinate.js").Coordinate>>>} coordinates Coordinates
 * @return {Array<Array<Array<import("ol/coordinate.js").Coordinate>>>} Converted coordinates.
 * @hidden
 */
export function coordinatesToXY3(coordinates) {
  return toXY(coordinates, 3);
}
