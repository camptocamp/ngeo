goog.provide('ngeo.coordinate');


ngeo.coordinate.toXY = function(coordinates, nesting) {
  if (nesting === 0) {
    if (coordinates.length > 2) {
      coordinates = [coordinates[0], coordinates[1]];
    }
  } else {
    for (let i = 0, ii = coordinates.length; i < ii; i++) {
      coordinates[i] = ngeo.coordinate.toXY(coordinates[i], nesting - 1);
    }
  }
  return coordinates;
};
