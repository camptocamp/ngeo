// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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

import ngeoInteractionMeasure, {getFormattedLength} from 'ngeo/interaction/Measure';
import olInteractionDraw from 'ol/interaction/Draw';
import LineString from 'ol/geom/LineString';
import {distance} from 'ol/coordinate';
import {containsXY} from 'ol/extent';

/** @type {boolean|undefined} */
let modifierPressed;

/**
 * Interaction dedicated to measure length.
 *
 * See our live example: [../examples/measure.html](../examples/measure.html)
 */
export default class extends ngeoInteractionMeasure {
  /**
   * @param {import('ngeo/misc/filters').unitPrefix} format The format function
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/interaction/Measure').MeasureOptions} [options] Options
   */
  constructor(format, gettextCatalog, options = {}) {
    super(options);

    if (modifierPressed === undefined) {
      modifierPressed = false;
      document.body.addEventListener('keydown', (evt) => {
        modifierPressed = evt.keyCode === 17; // Ctrl key
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
     * @type {boolean}
     */
    this.spherical = false;

    /**
     * The format function
     *
     * @type {import('ngeo/misc/filters').unitPrefix}
     */
    this.format = format;

    /**
     * The snapping tolerance in pixels.
     *
     * @type {number}
     */
    this.tolerance = options.tolerance;

    /**
     * The snapping source
     *
     * @type {import('ol/source/Vector').default<*>}
     */
    this.source = options.source;
  }

  /**
   * @param {import('ol/style/Style').StyleLike} style The sketchStyle used for the drawing
   *    interaction.
   * @param {import('ol/source/Vector').default<import('ol/geom/LineString').default>} source Vector source.
   * @returns {olInteractionDraw|import('ngeo/interaction/MobileDraw').default} The interaction
   */
  createDrawInteraction(style, source) {
    return new olInteractionDraw({
      type: 'LineString',
      geometryFunction: (coordinates, opt_geometry) => {
        return this.linestringGeometryFunction(/** @type {number[][]} */ (coordinates), opt_geometry);
      },
      condition: () => true,
      style: style,
      source: source,
    });
  }

  /**
   * Create a `linestringGeometryFunction` that will create a line string with segments
   * snapped to π/4 angle.
   * Use this with the draw interaction and `type: 'LineString'`.
   *
   * @param {number[][]} coordinates Coordinates.
   * @param {import('ol/geom/SimpleGeometry').default|undefined} [opt_geometry] Geometry.
   * @returns {import('ol/geom/SimpleGeometry').default} Geometry.
   */
  linestringGeometryFunction(coordinates, opt_geometry) {
    if (modifierPressed) {
      const viewRotation = this.getMap().getView().getRotation();
      const angle = Math.PI / 4;
      const from = coordinates[coordinates.length - 2];
      const to = coordinates[coordinates.length - 1];
      const dx = from[0] - to[0];
      const dy = from[1] - to[1];
      const length = distance(from, to);
      const rotation = viewRotation + Math.round((Math.atan2(dy, dx) - viewRotation) / angle) * angle;

      to[0] = from[0] - length * Math.cos(rotation);
      to[1] = from[1] - length * Math.sin(rotation);

      if (this.tolerance !== undefined && this.source !== undefined) {
        const view = this.getMap().getView();
        if (!view) {
          throw new Error('Missing view');
        }
        const resolution = view.getResolution();
        if (!resolution) {
          throw new Error('Missing resolution');
        }
        const delta = resolution * this.tolerance;
        /** @type {import('ol/extent').Extent} */
        const bbox = [to[0] - delta, to[1] - delta, to[0] + delta, to[1] + delta];

        const layerSource = this.source;
        const featuresInExtent = layerSource.getFeaturesInExtent(bbox);
        featuresInExtent.forEach((feature) => {
          /** @type {number[] | undefined} */
          let lastIntersection = [];
          /** @type {number[] | undefined} */
          let bestIntersection = [];
          let bestDistance = Infinity;

          // Line points are: from A to M (to B that we need to find)
          const distanceFromTo = distance(from, to);
          const ax = from[0];
          const ay = from[1];
          const mx = to[0];
          const my = to[1];
          const unitVector = [(mx - ax) / distanceFromTo, (my - ay) / distanceFromTo];
          const b = [
            ax + (distanceFromTo + delta) * unitVector[0],
            ay + (distanceFromTo + delta) * unitVector[1],
          ];

          const geom = feature.getGeometry();
          if (!(geom instanceof LineString)) {
            throw new Error('Wrong geometry type');
          }
          geom.forEachSegment((point1, point2) => {
            // intersection calculation
            lastIntersection = this.computeLineSegmentIntersection([from, b], [point1, point2]);
            if (
              lastIntersection !== undefined &&
              containsXY(bbox, lastIntersection[0], lastIntersection[1])
            ) {
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
        });
      }
    }

    const geometry = opt_geometry;
    if (geometry) {
      geometry.setCoordinates(coordinates);
      return geometry;
    }
    return new LineString(coordinates);
  }

  /**
   * Function implemented in inherited classes to compute measurement, determine
   * where to place the tooltip and determine which help message to display.
   *
   * @param {function(string, ?import('ol/coordinate').Coordinate): void} callback The function
   *     to be called.
   */
  handleMeasure(callback) {
    if (!this.sketchFeature) {
      throw new Error('Missing sketchFeature');
    }
    const geom = this.sketchFeature.getGeometry();
    if (!(geom instanceof LineString)) {
      throw new Error('Wrong geometry type');
    }
    const proj = this.getMap().getView().getProjection();
    console.assert(proj);
    const output = getFormattedLength(geom, proj, this.precision, this.format, this.spherical);
    const coord = geom.getLastCoordinate();
    callback(output, coord);
  }

  /**
   * Compute the intersection between 2 segments.
   *
   * @param {number[][]} line1 The coordinates of the first line.
   * @param {number[][]} line2 The coordinates of the second line.
   * @returns {number[] | undefined} The intersection point, undefined if there is no intersection point or lines are coincident.
   */
  computeLineSegmentIntersection(line1, line2) {
    const numerator1A =
      (line2[1][0] - line2[0][0]) * (line1[0][1] - line2[0][1]) -
      (line2[1][1] - line2[0][1]) * (line1[0][0] - line2[0][0]);
    const numerator1B =
      (line1[1][0] - line1[0][0]) * (line1[0][1] - line2[0][1]) -
      (line1[1][1] - line1[0][1]) * (line1[0][0] - line2[0][0]);
    const denominator1 =
      (line2[1][1] - line2[0][1]) * (line1[1][0] - line1[0][0]) -
      (line2[1][0] - line2[0][0]) * (line1[1][1] - line1[0][1]);

    // If denominator = 0, then lines are parallel. If denominator = 0 and both numerators are 0, then coincident
    if (denominator1 === 0) {
      return;
    }

    const ua1 = numerator1A / denominator1;
    const ub1 = numerator1B / denominator1;

    if (ua1 >= 0 && ua1 <= 1 && ub1 >= 0 && ub1 <= 1) {
      const result = [];
      result[0] = line1[0][0] + ua1 * (line1[1][0] - line1[0][0]);
      result[1] = line1[0][1] + ua1 * (line1[1][1] - line1[0][1]);
      return result;
    }
  }
}
