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
  if (coordinates.length >= 2) {
    const coord = /** @type{import("ol/coordinate.js").Coordinate} */(coordinates);
    return [coord[0], coord[1]];
  }
}


/**
 * Convert a given coordinate or list of coordinates of any 'nesting' level
 * to XY, i.e. remove any extra dimensions to the coordinates and keep only 2.
 *
 * @template {number|Coordinate|Array<Coordinate>|Array<Array<Coordinate>>} T
 * @param {Array<T>} coordinates Coordinates
 * @param {number} nesting Nesting level.
 * @return {Array<T>} Converted coordinates.
 * @private
 * @hidden
 */
function toXY(coordinates, nesting) {
  if (nesting === 0) {
    return /** @type {Array<T>} */(coordinatesToXY0(/** @type {Coordinate} */(coordinates)));
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
