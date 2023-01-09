// The MIT License (MIT)
//
// Copyright (c) 2016-2023 Camptocamp SA
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

import {getDefaultDrawStyleFunction} from 'ngeo/interaction/common';
import ngeoCustomEvent from 'ngeo/CustomEvent';
import {listen, unlistenByKey} from 'ol/events';
import olFeature from 'ol/Feature';
import {TRUE} from 'ol/functions';
import olGeomLineString from 'ol/geom/LineString';
import olGeomPoint from 'ol/geom/Point';
import olGeomPolygon from 'ol/geom/Polygon';
import olGeomSimpleGeometry from 'ol/geom/SimpleGeometry';
import olInteractionInteraction from 'ol/interaction/Interaction';
import olLayerVector from 'ol/layer/Vector';
import olSourceVector from 'ol/source/Vector';

/**
 * MobileDraw Interaction.
 *
 * @typedef {Object} MobileDrawOptions
 * @property {number} [minPoints] The number of points that must be drawn before a polygon ring or line
 * string can be finished. Default is `3` for polygon rings and `2` for line strings.
 * @property {import('ol/style/Style').StyleLike} [style] Style for sketch features.
 * @property {string} type Drawing type ('Point' or 'LineString'.
 * @property {boolean} [wrapX] Wrap the world horizontally on the sketch overlay. Default is `false`.
 */

/**
 * Interaction for drawing feature geometries from a mobile device using the
 * center of the map view as entry for points added.
 *
 * Supports:
 * - point
 * - line string
 * - polygon
 *
 * @hidden
 */
export default class extends olInteractionInteraction {
  /**
   * @fires DrawEvent
   * @param {MobileDrawOptions} options Options
   */
  constructor(options) {
    super({
      handleEvent: TRUE,
    });

    /**
     * The key for view center change event.
     *
     * @type {?import('ol/events').EventsKey}
     * @private
     */
    this.changeEventKey_ = null;

    /**
     * Geometry type.
     *
     * @type {string}
     * @private
     */
    this.type_ = options.type;

    /**
     * The number of points that must be drawn before a polygon ring or line
     * string can be finished.  The default is 3 for polygon rings and 2 for
     * line strings.
     *
     * @type {number}
     * @private
     */
    this.minPoints_ = options.minPoints ? options.minPoints : this.type_ === 'Polygon' ? 3 : 2;

    /**
     * Sketch feature.
     *
     * @type {?olFeature<import('ol/geom/Geometry').default>}
     * @private
     */
    this.sketchFeature_ = null;

    /**
     * Previous sketch points, saved to be able to display them on the layer.
     *
     * @type {olFeature<import('ol/geom/Geometry').default>[]}
     * @private
     */
    this.sketchPoints_ = [];

    /**
     * Current sketch point.
     *
     * @type {?olFeature<import('ol/geom/Geometry').default>}
     * @private
     */
    this.sketchPoint_ = null;

    /**
     * Draw overlay where our sketch features are drawn.
     *
     * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.overlay_ = new olLayerVector({
      className: 'canvas2d',
      source: new olSourceVector({
        useSpatialIndex: false,
        wrapX: options.wrapX ? options.wrapX : false,
      }),
      style: options.style || getDefaultDrawStyleFunction(),
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    listen(this, 'change:active', this.updateState_, this);

    this.set('dirty', false);
    this.set('drawing', false);
    this.set('valid', false);
  }

  /**
   * @param {import('ol/Map').default} map Map.
   */
  setMap(map) {
    const currentMap = this.getMap();
    if (currentMap) {
      if (this.changeEventKey_) {
        unlistenByKey(this.changeEventKey_);
      }
    }

    olInteractionInteraction.prototype.setMap.call(this, map);

    if (map) {
      this.changeEventKey_ = listen(map.getView(), 'change:center', this.handleViewCenterChange_, this);
    }

    this.updateState_();
  }

  // === PUBLIC METHODS - PROPERTY GETTERS ===

  /**
   * Return whether the interaction is currently dirty. It is if the sketch
   * feature has its geometry last coordinate set to the center without the
   * use of the `addToDrawing` method.
   *
   * @returns {boolean} `true` if the interaction is dirty, `false` otherwise.
   * @observable
   */
  getDirty() {
    return /** @type {boolean} */ (this.get('dirty'));
  }

  /**
   * Return whether the interaction is currently drawing.
   *
   * @returns {boolean} `true` if the interaction is drawing, `false` otherwise.
   * @observable
   */
  getDrawing() {
    return /** @type {boolean} */ (this.get('drawing'));
  }

  /**
   * Return whether the interaction as a valid sketch feature, i.e. its geometry
   * is valid.
   *
   * @returns {boolean} `true` if the interaction has a valid sketch feature,
   *     `false` otherwise.
   * @observable
   */
  getValid() {
    return /** @type {boolean} */ (this.get('valid'));
  }

  /**
   * Returns the current sketch feature.
   *
   * @returns {?olFeature<import('ol/geom/Geometry').default>} The sketch feature, or null if none.
   */
  getFeature() {
    return this.sketchFeature_;
  }

  // === PUBLIC METHODS ===

  /**
   * Add current sketch point to sketch feature if the latter exists, else create
   * it.
   */
  addToDrawing() {
    if (!this.sketchPoint_) {
      throw new Error('Missing sketchPoint');
    }

    // no need to do anything if interaction is not active, nor drawing
    const active = this.getActive();
    const drawing = this.getDrawing();

    if (!active || !drawing) {
      return;
    }

    let sketchFeatureGeom;
    const sketchPointGeom = this.getSketchPointGeometry_();
    const coordinate = sketchPointGeom.getCoordinates();
    let coordinates = null;

    // == point ==
    if (this.type_ === 'Point') {
      if (!this.sketchFeature_) {
        this.sketchFeature_ = new olFeature({geometry: new olGeomPoint(coordinate), name: 'mobileDrawPoint'});
        const event = new ngeoCustomEvent('drawstart', {feature: this.sketchFeature_});
        this.dispatchEvent(event);
      }
      sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (sketchFeatureGeom instanceof olGeomSimpleGeometry) {
        sketchFeatureGeom.setCoordinates(coordinate);
      }
      return;
    }

    // == line string ==
    if (this.type_ === 'LineString') {
      this.sketchPoints_.push(this.sketchPoint_);
      if (!this.sketchFeature_) {
        coordinates = [coordinate.slice(), coordinate.slice()];
        this.sketchFeature_ = new olFeature({
          geometry: new olGeomLineString(coordinates),
          name: 'mobileDrawLine',
        });
        const event = new ngeoCustomEvent('drawstart', {feature: this.sketchFeature_});
        this.dispatchEvent(event);
      } else {
        sketchFeatureGeom = this.sketchFeature_.getGeometry();
        if (sketchFeatureGeom instanceof olGeomSimpleGeometry) {
          coordinates = sketchFeatureGeom.getCoordinates();
          coordinates.push(coordinate.slice());
          sketchFeatureGeom.setCoordinates(coordinates);
        }
      }
    }

    // == polygon ==
    if (this.type_ === 'Polygon') {
      this.sketchPoints_.push(this.sketchPoint_);
      if (!this.sketchFeature_) {
        coordinates = [coordinate.slice(), coordinate.slice(), coordinate.slice()];
        this.sketchFeature_ = new olFeature({
          geometry: new olGeomPolygon([coordinates]),
          name: 'DrawMobilePolygon',
        });
        const event = new ngeoCustomEvent('drawstart', {
          feature: this.sketchFeature_,
        });
        this.dispatchEvent(event);
      } else {
        sketchFeatureGeom = this.sketchFeature_.getGeometry();
        if (sketchFeatureGeom instanceof olGeomPolygon) {
          const coordinates2 = sketchFeatureGeom.getCoordinates();
          coordinates = coordinates2[0];
          coordinates.push(coordinate.slice());
          sketchFeatureGeom.setCoordinates(coordinates2);
        }
      }
    }

    const dirty = this.getDirty();
    if (dirty) {
      this.set('dirty', false);
    }

    if (!coordinates) {
      throw new Error('Missing coordinates');
    }
    // minPoints validation
    const valid = this.getValid();
    if (this.type_ === 'LineString' || this.type_ === 'Polygon') {
      if (coordinates.length >= this.minPoints_) {
        if (!valid) {
          this.set('valid', true);
        }
      } else {
        if (valid) {
          this.set('valid', false);
        }
      }
    }

    // reset sketch point
    this.sketchPoint_ = null;

    // update sketch features
    this.updateSketchFeatures_();
  }

  /**
   * Clear the drawing
   */
  clearDrawing() {
    this.setActive(false);
    this.setActive(true);
  }

  /**
   * Finish drawing. If there's a sketch point, it's added first.
   */
  finishDrawing() {
    // no need to do anything if interaction is not active, nor drawing
    const active = this.getActive();
    const drawing = this.getDrawing();

    if (!active || !drawing) {
      return;
    }

    if (this.sketchPoint_) {
      this.addToDrawing();
    }

    this.set('drawing', false);

    const event = new ngeoCustomEvent('drawend', {feature: this.sketchFeature_});
    this.dispatchEvent(event);
  }

  // === PRIVATE METHODS ===

  /**
   * Start drawing by adding the sketch point first.
   *
   * @private
   */
  startDrawing_() {
    this.set('drawing', true);
    this.createOrUpdateSketchPoint_();
    this.updateSketchFeatures_();

    if (this.type_ === 'Point') {
      this.addToDrawing();
    }
  }

  /**
   * Modify the geometry of the sketch feature to have its last coordinate
   * set to the center of the map.
   *
   * @private
   */
  modifyDrawing_() {
    if (!this.sketchFeature_) {
      return;
    }

    const center = this.getCenter_();

    if (this.type_ === 'LineString') {
      const sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (sketchFeatureGeom instanceof olGeomSimpleGeometry) {
        const coordinates = sketchFeatureGeom.getCoordinates();
        coordinates.pop();
        coordinates.push(center);
        sketchFeatureGeom.setCoordinates(coordinates);
      }
    } else if (this.type_ === 'Polygon') {
      const sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (sketchFeatureGeom instanceof olGeomPolygon) {
        const coordinates2 = sketchFeatureGeom.getCoordinates();
        const coordinates = coordinates2[0];
        coordinates.pop();
        coordinates.push(center);
        sketchFeatureGeom.setCoordinates([coordinates]);
      }
    }

    const dirty = this.getDirty();
    if (!dirty) {
      this.set('dirty', true);
    }
  }

  /**
   * Stop drawing without adding the sketch feature to the target layer.
   *
   * @returns {?olFeature<import('ol/geom/Geometry').default>} The sketch feature (or null if none).
   * @private
   */
  abortDrawing_() {
    const sketchFeature = this.sketchFeature_;
    if (sketchFeature || this.sketchPoints_.length > 0) {
      this.sketchFeature_ = null;
      this.sketchPoint_ = null;
      /** @type {olSourceVector<import('ol/geom/Geometry').default>} */ (this.overlay_.getSource()).clear(
        true
      );
    }
    this.sketchPoints_ = [];
    this.set('dirty', false);
    this.set('drawing', false);
    this.set('valid', false);
    return sketchFeature;
  }

  /**
   * @private
   */
  updateState_() {
    const map = this.getMap();
    const active = this.getActive();
    if (!map || !active) {
      this.abortDrawing_();
    } else {
      this.startDrawing_();
    }
    this.overlay_.setMap(active ? map : null);
  }

  /**
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleViewCenterChange_(evt) {
    // no need to do anything if interaction is not active, nor drawing
    const active = this.getActive();
    const drawing = this.getDrawing();

    if (!active || !drawing) {
      return;
    }

    this.createOrUpdateSketchPoint_();

    if (this.type_ === 'Point') {
      this.addToDrawing();
    } else {
      this.modifyDrawing_();
      this.updateSketchFeatures_();
    }
  }

  /**
   * @private
   */
  createOrUpdateSketchPoint_() {
    const center = this.getCenter_();

    if (this.sketchPoint_) {
      const geometry = this.getSketchPointGeometry_();
      geometry.setCoordinates(center);
    } else {
      this.sketchPoint_ = new olFeature({geometry: new olGeomPoint(center), name: 'mobileDrawPoint'});
    }
  }

  /**
   * Redraw the sketch features.
   *
   * @private
   */
  updateSketchFeatures_() {
    const sketchFeatures = [];
    if (this.sketchFeature_) {
      sketchFeatures.push(this.sketchFeature_);
    }
    if (this.sketchPoint_) {
      sketchFeatures.push(this.sketchPoint_);
    }
    const overlaySource = /** @type {olSourceVector<import('ol/geom/Geometry').default>} */ (
      this.overlay_.getSource()
    );
    overlaySource.clear(true);
    overlaySource.addFeatures(sketchFeatures);
    overlaySource.addFeatures(this.sketchPoints_);
  }

  /**
   * Returns the geometry of the sketch point feature.
   *
   * @returns {import('ol/geom/Point').default} Point.
   * @private
   */
  getSketchPointGeometry_() {
    if (!this.sketchPoint_) {
      throw new Error('Missing sketchPoint');
    }
    const geometry = this.sketchPoint_.getGeometry();
    if (geometry instanceof olGeomPoint) {
      return geometry;
    } else {
      throw new Error('Wrong geometry type');
    }
  }

  /**
   * Returns the center of the map view
   *
   * @returns {import('ol/coordinate').Coordinate} Coordinate.
   * @private
   */
  getCenter_() {
    const center = this.getMap().getView().getCenter();
    if (!Array.isArray(center)) {
      throw new Error('Missing center');
    }
    return center;
  }
}
