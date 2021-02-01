/**
 * @module ngeo.interaction.MeasureLength
 */
import googAsserts from 'goog/asserts.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasure from 'ngeo/interaction/Measure.js';
import * as olBase from 'ol/index.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import {distance} from 'ol/coordinate.js';
import {containsXY} from 'ol/extent';

let modifierPressed = undefined;


/**
 * @classdesc
 * Interaction dedicated to measure length.
 *
 * See our live example: [../examples/measure.html](../examples/measure.html)
 *
 * @constructor
 * @struct
 * @extends {ngeo.interaction.Measure}
 * @param {!ngeox.unitPrefix} format The format function
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeox.interaction.MeasureOptions=} options Options
 */
const exports = function(format, gettextCatalog, options = /** @type {ngeox.interaction.MeasureOptions} */({})) {

  ngeoInteractionMeasure.call(this, /** @type {ngeo.interaction.MeasureBaseOptions} */ (options));

  if (modifierPressed === undefined) {
    modifierPressed = false;
    document.body.addEventListener('keydown', (evt) => {
      const SafariModifierPressed = !!evt.metaKey; // Cmd Key (MacOS)
      const ctrlModifierPressed = evt.keyCode === 17; // Ctrl key
      modifierPressed = SafariModifierPressed || ctrlModifierPressed;
    });
    document.body.addEventListener('keyup', () => {
      modifierPressed = false;
    });
  }

  if (options.continueMsg !== undefined) {
    this.continueMsg = options.continueMsg;
  } else {
    this.continueMsg = document.createElement('span');
    this.continueMsg.textContent = gettextCatalog.getString('Click to continue drawing the line.');
    const br = document.createElement('br');
    br.textContent = gettextCatalog.getString('Double-click or click last point to finish.');
    this.continueMsg.appendChild(br);
  }

  /**
   * The format function
   * @type {ngeox.unitPrefix}
   */
  this.format = format;

  /**
   * The snapping tolerance in pixels.
   * @params {number}
   */
  this.tolerance = options.tolerance;

  /**
   * The snapping source
   * @params {ol.source.Vector}
   */
  this.source = options.source;
};

olBase.inherits(exports, ngeoInteractionMeasure);


/**
 * @inheritDoc
 */
exports.prototype.createDrawInteraction = function(style, source) {
  return new olInteractionDraw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    geometryFunction: this.linestringGeometryFunction.bind(this),
    condition: () => true,
    style: style,
    source: source,
  });
};


/**
 * Create a `linestringGeometryFunction` that will create a line string with segments
 * snapped to pi/4 angle.
 * Use this with the draw interaction and `type: 'LineString'`.
 * @param {LineCoordType} coordinates Coordinates.
 * @param {LineString=} opt_geometry Geometry.
 * @return {LineString} Geometry.
 */
exports.prototype.linestringGeometryFunction = function(coordinates, opt_geometry) {
  if (modifierPressed) {
    const viewRotation = this.getMap().getView().getRotation();
    const angle = Math.PI / 4;
    const from = coordinates[coordinates.length - 2];
    const to = coordinates[coordinates.length - 1];
    const dx = from[0] - to[0];
    const dy = from[1] - to[1];
    const length = distance(from, to);
    const rotation = viewRotation + Math.round((Math.atan2(dy, dx) - viewRotation) / angle) * angle;

    to[0] = from[0] - (length * Math.cos(rotation));
    to[1] = from[1] - (length * Math.sin(rotation));

    if (this.tolerance !== undefined && this.source !== undefined) {
      const delta = this.getMap().getView().getResolution() * this.tolerance;
      const bbox = [to[0] - delta, to[1] - delta, to[0] + delta, to[1] + delta];

      const layerSource = this.source;
      const featuresInExtent = layerSource.getFeaturesInExtent(bbox);
      featuresInExtent.forEach((feature) => {

        const geom = feature.getGeometry();

        if (geom.getType() === ngeoGeometryType.POINT) {
            // ignore point geometry
            return;
        } else {

            let lastIntersection = [];
            let bestIntersection = [];
            let bestDistance = Infinity;

            // Line points are: from A to M (to B that we need to find)
            const distanceFromTo = distance(from, to);
            const ax = from[0];
            const ay = from[1];
            const mx = to[0];
            const my = to[1];
            const unitVector = [(mx - ax) / distanceFromTo, (my - ay) / distanceFromTo];
            const b = [(ax + (distanceFromTo + delta) * unitVector[0]), (ay + (distanceFromTo + delta) * unitVector[1])];

            geom.forEachSegment((point1, point2) => {
            //feature.getGeometry().forEachSegment((point1, point2) => {
              // intersection calculation
              lastIntersection = this.computeLineSegmentIntersection(from, b, point1, point2);
              if (lastIntersection !== undefined && containsXY(bbox, lastIntersection[0], lastIntersection[1])) {
                const lastDistance = distance(to, lastIntersection);
                if (lastDistance < bestDistance) {
                  bestDistance = lastDistance;
                  bestIntersection = lastIntersection;
                }
              }
            });

            if (bestIntersection) {
              to[0] = bestIntersection[0] || to[0];
              to[1] = bestIntersection[1] || to[1];
            }
        }
      });
    }
  }

  const geometry = opt_geometry;
  if (geometry) {
    geometry.setCoordinates(coordinates);
    return geometry;
  }
  return new olGeomLineString(coordinates);
};


/**
 * @inheritDoc
 */
exports.prototype.handleMeasure = function(callback) {
  const geom = googAsserts.assertInstanceof(this.sketchFeature.getGeometry(), olGeomLineString);
  const proj = this.getMap().getView().getProjection();
  googAsserts.assert(proj);
  const output = ngeoInteractionMeasure.getFormattedLength(geom, proj, this.precision, this.format);
  const coord = geom.getLastCoordinate();
  callback(output, coord);
};

/**
 * Compute the intersection between 2 segments
 *
 * @param {Number} line1vertex1 The coordinates of the first line's first vertex.
 * @param {Number} line1vertex2 The coordinates of the first line's second vertex.
 * @param {Number} line2vertex1 The coordinates of the second line's first vertex.
 * @param {Number} line2vertex2 The coordinates of the second line's second vertex.
 * @return {Array<number> | undefined} The intersection point, undefined if there is no intersection point or lines are coincident.
 */
exports.prototype.computeLineSegmentIntersection = function(line1vertex1, line1vertex2, line2vertex1, line2vertex2) {
  const numerator1A = (line2vertex2[0] - line2vertex1[0]) * (line1vertex1[1] - line2vertex1[1])
    - (line2vertex2[1] - line2vertex1[1]) * (line1vertex1[0] - line2vertex1[0]);
  const numerator1B = (line1vertex2[0] - line1vertex1[0]) * (line1vertex1[1] - line2vertex1[1])
    - (line1vertex2[1] - line1vertex1[1]) * (line1vertex1[0] - line2vertex1[0]);
  const denominator1 = (line2vertex2[1] - line2vertex1[1]) * (line1vertex2[0] - line1vertex1[0])
    - (line2vertex2[0] - line2vertex1[0]) * (line1vertex2[1] - line1vertex1[1]);

  // If denominator = 0, then lines are parallel. If denominator = 0 and both numerators are 0, then coincident
  if (denominator1 === 0) {
    return;
  }

  const ua1 = numerator1A / denominator1;
  const  ub1 = numerator1B / denominator1;

  if (ua1 >= 0 && ua1 <= 1 && ub1 >= 0 && ub1 <= 1) {
    const result = [];
    result[0] = line1vertex1[0] + ua1 * (line1vertex2[0] - line1vertex1[0]);
    result[1] = line1vertex1[1] + ua1 * (line1vertex2[1] - line1vertex1[1]);
    return result;
  }
};


export default exports;
