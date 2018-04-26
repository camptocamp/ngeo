/**
 * @module gmf.objectediting.coordinate
 */
const exports = {};


/**
 * Convert a given coordinate or list of coordinates of any 'nesting' level
 * to XY, i.e. remove any extra dimensions to the coordinates and keep only 2.
 *
 * @param {Array.<ol.Coordinate>|ol.Coordinate} coordinates Coordinates
 * @param {number} nesting Nesting level.
 * @return {Array.<ol.Coordinate>|ol.Coordinate} Converted coordinates.
 */
exports.toXY = function(coordinates, nesting) {
  if (nesting === 0) {
    if (coordinates.length > 2) {
      coordinates = [coordinates[0], coordinates[1]];
    }
  } else {
    for (let i = 0, ii = coordinates.length; i < ii; i++) {
      coordinates[i] = exports.toXY(coordinates[i], nesting - 1);
    }
  }
  return coordinates;
};


export default exports;
