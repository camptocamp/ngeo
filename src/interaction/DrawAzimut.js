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

import {getDefaultDrawStyleFunction} from 'ngeo/interaction/common.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import Feature from 'ol/Feature.js';
import {listen} from 'ol/events.js';
import {FALSE} from 'ol/functions.js';
import olGeomCircle from 'ol/geom/Circle.js';
import olGeomGeometryCollection from 'ol/geom/GeometryCollection.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import olInteractionPointer from 'ol/interaction/Draw.js';
import olLayerVector from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';

/**
 * @typedef {Object} Options
 * @property {!VectorSource<import("ol/geom/Geometry.js").default>} source
 * @property {import('ol/style/Style.js').StyleLike} style
 */

/**
 * Interaction dedicated to measure azimut.
 * @private
 * @hidden
 */
// @ts-ignore: error «error TS2415: Class 'DrawAzimut' incorrectly extends base class 'Draw'.» is unclear...
class DrawAzimut extends olInteractionPointer {
  /**
   * @param {Options} options Options.
   */
  constructor(options) {
    super({
      type: '',
    });

    this.shouldStopEvent = FALSE;

    /**
     * @type {import("ol/pixel.js").Pixel}
     * @private
     */
    this.downPx_ = [];

    /**
     * Target source for drawn features.
     * @type {!import("ol/source/Vector.js").default<import("ol/geom/Geometry.js").default>}
     * @private
     */
    this.source_ = options.source;

    /**
     * Whether the drawing has started or not.
     * @type {boolean}
     * @private
     */
    this.started_ = false;

    /**
     * Sketch feature.
     * @type {Feature<import("ol/geom/GeometryCollection.js").default>}
     * @private
     */
    this.sketchFeature_ = new Feature();

    /**
     * Sketch point.
     * @type {Feature<import("ol/geom/Point.js").default>}
     * @private
     */
    this.sketchPoint_ = new Feature();

    /**
     * Squared tolerance for handling up events.  If the squared distance
     * between a down and up event is greater than this tolerance, up events
     * will not be handled.
     * @type {number}
     * @private
     */
    this.squaredClickTolerance_ = 4;

    /**
     * Vector layer where our sketch features are drawn.
     * @type {import("ol/layer/Vector.js").default}
     * @private
     */
    this.sketchLayer_ = new olLayerVector({
      source: new VectorSource({
        useSpatialIndex: false,
        wrapX: false,
      }),
      style: options.style || getDefaultDrawStyleFunction(),
    });

    listen(this, 'change:active', this.updateState_, this);
  }

  /**
   * Handle move events.
   * @param {import("ol/MapBrowserEvent.js").default} event A move event.
   * @return {boolean} Pass the event to other interactions.
   * @private
   */
  handlePointerMove_(event) {
    if (this.started_) {
      this.modifyDrawing_(event);
    } else {
      this.createOrUpdateSketchPoint_(event);
    }
    return true;
  }

  /**
   * @param {import("ol/MapBrowserEvent.js").default} event Event.
   * @private
   */
  createOrUpdateSketchPoint_(event) {
    const coordinates = event.coordinate.slice();
    const sketchPointGeom = this.sketchPoint_.getGeometry();
    if (!sketchPointGeom) {
      this.sketchPoint_ = new Feature(new olGeomPoint(coordinates));
      this.updateSketchFeatures_();
    } else {
      sketchPointGeom.setCoordinates(coordinates);
    }
  }

  /**
   * Redraw the sketch features.
   * @private
   */
  updateSketchFeatures_() {
    const sketchFeatures = [];
    sketchFeatures.push(this.sketchFeature_);
    sketchFeatures.push(this.sketchPoint_);
    const source = this.sketchLayer_.getSource();
    source.clear(true);
    source.addFeatures(sketchFeatures);
  }

  /**
   * Start the drawing.
   * @param {import("ol/MapBrowserEvent.js").default} event Event.
   * @private
   */
  startDrawing_(event) {
    const start = event.coordinate;
    this.started_ = true;
    const line = new olGeomLineString([start.slice(), start.slice()]);
    const circle = new olGeomCircle(start, 0);
    const geometry = new olGeomGeometryCollection([line, circle]);
    this.sketchFeature_ = new Feature();
    this.sketchFeature_.setGeometry(geometry);
    this.updateSketchFeatures_();
    const evt = new ngeoCustomEvent('drawstart', {feature: this.sketchFeature_});
    this.dispatchEvent(evt);
  }

  /**
   * Modify the drawing.
   * @param {import("ol/MapBrowserEvent.js").default} event Event.
   * @private
   */
  modifyDrawing_(event) {
    const coordinate = event.coordinate;
    const geometry = this.sketchFeature_.getGeometry();
    if (!(geometry instanceof olGeomGeometryCollection)) {
      throw new Error('Missing geometry');
    }
    const geometries = geometry.getGeometriesArray();
    const line = geometries[0];
    if (line instanceof olGeomLineString) {
      const coordinates = line.getCoordinates();
      const sketchPointGeom = this.sketchPoint_.getGeometry();
      if (sketchPointGeom instanceof olGeomPoint) {
        sketchPointGeom.setCoordinates(coordinate);
        const last = coordinates[coordinates.length - 1];
        last[0] = coordinate[0];
        last[1] = coordinate[1];
        console.assert(line instanceof olGeomLineString);
        line.setCoordinates(coordinates);
        const circle = geometries[1];
        if (circle instanceof olGeomCircle) {
          circle.setRadius(line.getLength());
          this.updateSketchFeatures_();
        }
      }
    }
  }

  /**
   * Stop drawing without adding the sketch feature to the target layer.
   * @return {Feature<import("ol/geom/Geometry.js").default>} The sketch feature (or null if none).
   * @private
   */
  abortDrawing_() {
    this.started_ = false;
    const sketchFeature = this.sketchFeature_;
    this.sketchFeature_ = new Feature();
    this.sketchPoint_ = new Feature();
    const source = this.sketchLayer_.getSource();
    if (!(source instanceof VectorSource)) {
      throw new Error('Missing source');
    }
    source.clear(true);
    return sketchFeature;
  }

  /**
   * @private
   */
  updateState_() {
    const map = this.getMap();
    const active = this.getActive();
    if (map === null || !active) {
      this.abortDrawing_();
    }
    this.sketchLayer_.setMap(active ? map : null);
  }

  /**
   * Stop drawing and add the sketch feature to the target layer.
   * @private
   */
  finishDrawing_() {
    const sketchFeature = this.abortDrawing_();

    this.source_.addFeature(sketchFeature);

    const event = new ngeoCustomEvent('drawend', {feature: this.sketchFeature_});
    this.dispatchEvent(event);
  }

  /**
   * @param {import("ol/PluggableMap.js").default} map Map.
   */
  setMap(map) {
    olInteractionPointer.prototype.setMap.call(this, map);
    this.updateState_();
  }

  /**
   * @param {import("ol/MapBrowserPointerEvent.js").default} event Event.
   * @return {boolean} If the event was consumed.
   */
  handleDownEvent(event) {
    this.downPx_ = event.pixel;
    return true;
  }

  /**
   * @param {import("ol/MapBrowserPointerEvent.js").default} event Event.
   * @return {boolean} If the event was consumed.
   */
  handleUpEvent(event) {
    if (!this.downPx_) {
      throw new Error('Missing downPx');
    }
    const downPx = this.downPx_;
    const clickPx = event.pixel;
    const dx = downPx[0] - clickPx[0];
    const dy = downPx[1] - clickPx[1];
    const squaredDistance = dx * dx + dy * dy;
    let pass = true;
    if (squaredDistance <= this.squaredClickTolerance_) {
      this.handlePointerMove_(event);
      if (!this.started_) {
        this.startDrawing_(event);
      } else {
        this.finishDrawing_();
      }
      pass = false;
    }
    return pass;
  }

  /**
   * @param {import("ol/MapBrowserPointerEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleEvent(mapBrowserEvent) {
    let pass = true;
    if (mapBrowserEvent.type === 'pointermove') {
      pass = this.handlePointerMove_(mapBrowserEvent);
    } else if (mapBrowserEvent.type === 'dblclick') {
      pass = false;
    }
    return super.handleEvent(mapBrowserEvent) && pass;
  }
}

export default DrawAzimut;
