import {getDefaultDrawStyleFunction} from 'ngeo/interaction/common.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import olFeature from 'ol/Feature.js';
import * as olEvents from 'ol/events.js';
import {FALSE} from 'ol/functions.js';
import olGeomCircle from 'ol/geom/Circle.js';
import olGeomGeometryCollection from 'ol/geom/GeometryCollection.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import olInteractionPointer from 'ol/interaction/Draw.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';

/**
 * @typedef {Object} Options
 * @property {olSourceVector} source
 * @property {import('ol/style/Style.js').StyleLike} style
 */

/**
 * Interaction dedicated to measure azimut.
 * @private
 * @hidden
 */
class DrawAzimut extends olInteractionPointer {
  /**
   * @param {Options} options Options.
   */
  constructor(options) {
    super({
      type: undefined,
    });

    this.shouldStopEvent = FALSE;

    /**
     * @type {import("ol/pixel.js").Pixel}
     * @private
     */
    this.downPx_ = null;

    /**
     * Target source for drawn features.
     * @type {import("ol/source/Vector.js").default}
     * @private
     */
    this.source_ = options.source !== undefined ? options.source : null;

    /**
     * Tglls whether the drawing has started or not.
     * @type {boolean}
     * @private
     */
    this.started_ = false;

    /**
     * Sketch feature.
     * @type {import("ol/Feature.js").default}
     * @private
     */
    this.sketchFeature_ = null;

    /**
     * Sketch point.
     * @type {import("ol/Feature.js").default}
     * @private
     */
    this.sketchPoint_ = null;

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
      source: new olSourceVector({
        useSpatialIndex: false,
        wrapX: false,
      }),
      style: options.style || getDefaultDrawStyleFunction(),
    });

    olEvents.listen(this, 'change:active', this.updateState_, this);
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
    if (this.sketchPoint_ === null) {
      this.sketchPoint_ = new olFeature(new olGeomPoint(coordinates));
      this.updateSketchFeatures_();
    } else {
      const sketchPointGeom = this.sketchPoint_.getGeometry();
      if (sketchPointGeom instanceof olGeomPoint) {
        sketchPointGeom.setCoordinates(coordinates);
      }
    }
  }

  /**
   * Redraw the sketch features.
   * @private
   */
  updateSketchFeatures_() {
    const sketchFeatures = [];
    if (this.sketchFeature_ !== null) {
      sketchFeatures.push(this.sketchFeature_);
    }
    if (this.sketchPoint_ !== null) {
      sketchFeatures.push(this.sketchPoint_);
    }
    const source = /** @type {olSourceVector} */ (this.sketchLayer_.getSource());
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
    console.assert(geometry !== undefined);
    this.sketchFeature_ = new olFeature();
    this.sketchFeature_.setGeometry(geometry);
    this.updateSketchFeatures_();
    /** @type {import('ngeo/interaction/common.js').DrawEvent} */
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
    const geometry = /** @type {import('ol/geom/GeometryCollection.js').default} */ (
      this.sketchFeature_.getGeometry()
    );
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
   * @return {import("ol/Feature.js").default} The sketch feature (or null if none).
   * @private
   */
  abortDrawing_() {
    this.started_ = false;
    const sketchFeature = this.sketchFeature_;
    if (sketchFeature !== null) {
      this.sketchFeature_ = null;
      this.sketchPoint_ = null;
      /** @type {olSourceVector} */ (this.sketchLayer_.getSource()).clear(true);
    }
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
    console.assert(sketchFeature !== null);

    if (this.source_ !== null) {
      this.source_.addFeature(sketchFeature);
    }

    /** @type {import('ngeo/interaction/common.js').DrawEvent} */
    const event = new ngeoCustomEvent('drawend', {feature: this.sketchFeature_});
    this.dispatchEvent(event);
  }

  /**
   * @inheritDoc
   */
  setMap(map) {
    olInteractionPointer.prototype.setMap.call(this, map);
    this.updateState_();
  }

  /**
   * @param {import("ol/MapBrowserPointerEvent.js").default} event Event.
   * @return {boolean} Start drag sequence?
   */
  handleDownEvent(event) {
    this.downPx_ = event.pixel;
    return true;
  }

  /**
   * @param {import("ol/MapBrowserPointerEvent.js").default} event Event.
   * @return {boolean} Stop drag sequence?
   */
  handleUpEvent(event) {
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
   * @param {import("ol/MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
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
