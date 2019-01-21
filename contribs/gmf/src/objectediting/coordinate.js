/**
 * Convert a given coordinate or list of coordinates of any 'nesting' level
 * to XY, i.e. remove any extra dimensions to the coordinates and keep only 2.
 *
 * @param {Array.<import("ol/coordinate.js").Coordinate>|import("ol/coordinate.js").Coordinate} coordinates Coordinates
 * @param {number} nesting Nesting level.
 * @return {Array.<import("ol/coordinate.js").Coordinate>|import("ol/coordinate.js").Coordinate} Converted coordinates.
 */
export function toXY(coordinates, nesting) {
  if (nesting === 0) {
    if (coordinates.length > 2) {
      coordinates = [coordinates[0], coordinates[1]];
    }
  } else {
    for (let i = 0, ii = coordinates.length; i < ii; i++) {
      coordinates[i] = toXY(coordinates[i], nesting - 1);
    }
  }
  return coordinates;
}
