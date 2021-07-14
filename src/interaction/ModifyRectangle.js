// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

import {getDefaultModifyStyleFunction} from 'ngeo/interaction/common.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import olFeature from 'ol/Feature.js';
import {listen} from 'ol/events.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olInteractionPointer from 'ol/interaction/Pointer.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';
import {CollectionEvent} from 'ol/Collection.js';

/**
 * Interaction for modifying feature geometries.
 * @private
 * @hidden
 */
class ModifyRectangle extends olInteractionPointer {
  /**
   * @param {import('ol/interaction/Modify.js').Options} options Options.
   * @fires import("ngeo/interaction/ModifyCircleEvent.js").default
   */
  constructor(options) {
    super();
    console.assert(options.features);
    this.handleDownEvent = this.handleDown_;
    this.handleDragEvent = this.handleDrag_;
    this.handleUpEvent = this.handleUp_;

    /**
     * @type {boolean}
     * @private
     */
    this.modified_ = false;

    /**
     * @type {import("ol/layer/Vector.js").default<import("ol/source/Vector.js").default<import("ol/geom/Geometry.js").default>>}
     * @private
     */
    this.vectorPoints_ = new olLayerVector({
      source: new olSourceVector({
        wrapX: !!options.wrapX,
      }),
      visible: this.getActive(),
      style: options.style || getDefaultModifyStyleFunction(),
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    /**
     * @type {import("ol/Collection.js").default<olFeature<import("ol/geom/Geometry.js").default>>}
     * @private
     */
    this.features_ = options.features;

    /**
     * The feature currently modified.
     * @type {?olFeature<import("ol/geom/Geometry.js").default>}
     * @private
     */
    this.feature_ = null;

    /**
     * @type {Object<string, CacheItem>}
     * @private
     */
    this.cache_ = {};

    /**
     * @type {?ModifyParams}
     * @private
     */
    this.params_ = null;

    listen(this.features_, 'add', this.handleFeatureAdd_, this);
    listen(this.features_, 'remove', this.handleFeatureRemove_, this);

    this.features_.forEach((feature) => {
      this.addFeature_(feature);
    });
  }

  /**
   * @param {boolean} active Active.
   * @override
   */
  setActive(active) {
    olInteractionPointer.prototype.setActive.call(this, active);
    if (this.vectorPoints_) {
      this.vectorPoints_.setVisible(active);
    }
  }

  /**
   * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
   * @private
   */
  addFeature_(feature) {
    const featureGeom = feature.getGeometry();
    if (featureGeom instanceof olGeomPolygon) {
      // If the feature's corners are already set, no need to set them again
      const uid = olUtilGetUid(feature);
      let item = this.cache_[uid];
      if (item) {
        return;
      }

      /**
       * @type {olSourceVector<import("ol/geom/Geometry.js").default>}
       */
      const pointSource = this.vectorPoints_.getSource();

      // from each corners, create a point feature and add it to the point layer.
      // each point is then associated with 2 siblings in order to update the
      // siblings geometry at the same time when a point gets dragged around.
      // mark each one as 'corner'
      /** @type {number[][]} */
      const corners = featureGeom.getCoordinates()[0];
      while (corners.length > 4) {
        if (corners[0][0] < corners[1][0] && corners[0][1] <= corners[1][1]) {
          corners.pop();
        } else {
          corners.shift();
        }
      }
      /** @type {olFeature<import("ol/geom/Geometry.js").default>[]} */
      const pointFeatures = [];
      let cornerPoint;
      let cornerFeature;
      corners.forEach((corner) => {
        cornerPoint = new olGeomPoint(corner);
        cornerFeature = new olFeature({
          'corner': true,
          'geometry': cornerPoint,
          'siblingX': null,
          'siblingY': null,
          'boxFeature': feature,
        });

        pointFeatures.push(cornerFeature);
      }, this);
      item = /** @type {CacheItem} */ ({
        corners: pointFeatures,
      });
      this.cache_[uid] = item;

      let previousFeature;
      let nextFeature;
      pointFeatures.forEach((cornerFeature, index) => {
        previousFeature = pointFeatures[index - 1];
        if (!previousFeature) {
          previousFeature = pointFeatures[pointFeatures.length - 1];
        }

        nextFeature = pointFeatures[index + 1];
        if (!nextFeature) {
          nextFeature = pointFeatures[0];
        }

        if (index % 2 === 0) {
          cornerFeature.set('siblingX', nextFeature);
          cornerFeature.set('siblingY', previousFeature);
        } else {
          cornerFeature.set('siblingX', previousFeature);
          cornerFeature.set('siblingY', nextFeature);
        }
      }, this);
      pointSource.addFeatures(pointFeatures);
    }
  }

  /**
   * @param {import("ol/MapBrowserEvent.js").default<unknown>} evt MapBrowserEvent
   * @private
   */
  willModifyFeatures_(evt) {
    if (!this.modified_) {
      this.modified_ = true;
      const event = new ngeoCustomEvent('modifystart', {features: this.features_});
      this.dispatchEvent(event);
      this.params_ = this.initializeParams_();
    }
  }

  /**
   * @return {ModifyParams} The initialised params
   * @private
   */
  initializeParams_() {
    if (!this.feature_) {
      throw new Error('Missing feature');
    }
    const feature = this.feature_;

    // 1. Find the origin (opposite) point for the modify operation
    // siblingY relative to the origin is siblingX relative to the opposite
    const siblingY = feature.get('siblingX');
    console.assert(siblingY instanceof olFeature);

    const origin = siblingY.get('siblingY');
    console.assert(origin instanceof olFeature);
    const originPoint = origin.getGeometry();
    console.assert(originPoint instanceof olGeomPoint);
    const originCoordinate = originPoint.getCoordinates();
    const originPixel = this.getMap().getPixelFromCoordinate(originCoordinate);

    // 2. Find the origin's X sibling and the normal vector from the origin to it
    const siblingX = origin.get('siblingX');
    console.assert(siblingX instanceof olFeature);
    const siblingXPoint = siblingX.getGeometry();
    console.assert(siblingXPoint instanceof olGeomPoint);
    const siblingXCoordinate = siblingXPoint.getCoordinates();
    const siblingXPixel = this.getMap().getPixelFromCoordinate(siblingXCoordinate);
    let vectorX = [siblingXPixel[0] - originPixel[0], siblingXPixel[1] - originPixel[1]];
    const vectorXMagnitude = Math.sqrt(vectorX[0] * vectorX[0] + vectorX[1] * vectorX[1]);
    vectorX[0] /= vectorXMagnitude;
    vectorX[1] /= vectorXMagnitude;

    // 3. Find the origin's Y sibling and the normal vector from the origin to it
    const siblingYPoint = siblingY.getGeometry();
    console.assert(siblingYPoint instanceof olGeomPoint);
    const siblingYCoordinate = siblingYPoint.getCoordinates();
    const siblingYPixel = this.getMap().getPixelFromCoordinate(siblingYCoordinate);
    let vectorY = [siblingYPixel[0] - originPixel[0], siblingYPixel[1] - originPixel[1]];
    const vectorYMagnitude = Math.sqrt(vectorY[0] * vectorY[0] + vectorY[1] * vectorY[1]);
    vectorY[0] /= vectorYMagnitude;
    vectorY[1] /= vectorYMagnitude;

    // 4. Validate the vectors.
    if (isNaN(vectorX[0]) && isNaN(vectorY[0])) {
      // Both vector are invalid. Rotation information has already been lost
      vectorX = [0, 1];
      vectorY = [1, 0];
    } else if (isNaN(vectorX[0])) {
      vectorX = [vectorY[1], -vectorY[0]];
    } else if (isNaN(vectorY[0])) {
      vectorY = [vectorX[1], -vectorX[0]];
    }

    return {
      originCoordinate,
      originPixel,
      siblingXPoint,
      siblingYPoint,
      vectorX,
      vectorY,
    };
  }

  /**
   * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
   * @private
   */
  removeFeature_(feature) {
    const uid = olUtilGetUid(feature);
    const item = this.cache_[uid];
    const corners = item.corners;
    for (const corner of corners) {
      /** @type {olSourceVector<import("ol/geom/Geometry.js").default>} */ (this.vectorPoints_.getSource()).removeFeature(
        corner
      );
    }
    this.feature_ = null;
    corners.length = 0;
    delete this.cache_[uid];
  }

  /**
   * @param {import("ol/PluggableMap.js").default} map Map.
   */
  setMap(map) {
    this.vectorPoints_.setMap(map);
    olInteractionPointer.prototype.setMap.call(this, map);
  }

  /**
   * @param {Event|import('ol/events/Event.js').default} evt Event.
   * @private
   */
  handleFeatureAdd_(evt) {
    if (evt instanceof CollectionEvent) {
      const feature = evt.element;
      console.assert(feature instanceof olFeature, 'feature should be an ol.Feature');
      this.addFeature_(feature);
    }
  }

  /**
   * @param {Event|import('ol/events/Event.js').default} evt Event.
   * @private
   */
  handleFeatureRemove_(evt) {
    if (evt instanceof CollectionEvent) {
      /**
       * @type {olFeature<import("ol/geom/Geometry.js").default>}
       */
      const feature = evt.element;
      this.removeFeature_(feature);
    }
  }

  /**
   * @param {import("ol/MapBrowserEvent.js").default<unknown>} evt MapBrowserEvent.
   * @return {boolean} Start drag sequence?
   * @private
   */
  handleDown_(evt) {
    const map = evt.map;

    const feature = /** @type {olFeature<import("ol/geom/Geometry.js").default>} */ (map.forEachFeatureAtPixel(
      evt.pixel,
      (feature) => (feature.get('siblingX') && feature.get('siblingY') ? feature : undefined)
    ));

    if (feature) {
      this.feature_ = feature;

      return true;
    }

    return false;
  }

  /**
   * @param {import("ol/MapBrowserEvent.js").default<unknown>} evt MapBrowserEvent.
   * @private
   */
  handleDrag_(evt) {
    this.willModifyFeatures_(evt);
    if (!this.feature_) {
      throw new Error('Missing feature');
    }
    const feature = this.feature_;

    const geometry = /** @type {import("ol/geom/SimpleGeometry.js").default} */ (feature.getGeometry());

    if (geometry instanceof olGeomPoint) {
      geometry.setCoordinates(evt.coordinate);
      if (!this.params_) {
        throw new Error('Missing params');
      }

      const destinationPixel = evt.pixel;

      const originPixel = this.params_.originPixel;
      const siblingXPoint = this.params_.siblingXPoint;
      const siblingYPoint = this.params_.siblingYPoint;
      const vectorX = this.params_.vectorX;
      const vectorY = this.params_.vectorY;
      const originCoordinate = this.params_.originCoordinate;

      // Calculate new positions of siblings
      const b2Pixel = this.calculateNewPixel_(originPixel, destinationPixel, vectorX);
      const b2Coordinate = this.getMap().getCoordinateFromPixel(b2Pixel);
      siblingXPoint.setCoordinates(b2Coordinate);

      const c2Pixel = this.calculateNewPixel_(originPixel, destinationPixel, vectorY);
      const c2Coordinate = this.getMap().getCoordinateFromPixel(c2Pixel);
      siblingYPoint.setCoordinates(c2Coordinate);

      // Resize the box
      const boxFeature = feature.get('boxFeature');
      const geom = boxFeature.getGeometry();
      console.assert(geom instanceof olGeomPolygon);
      geom.setCoordinates([[evt.coordinate, b2Coordinate, originCoordinate, c2Coordinate, evt.coordinate]]);
    }
  }

  /**
   * Calculate the new position of a point as projected on a vector from origin to
   * destination.
   * @param {import("ol/pixel.js").Pixel} origin Pixel of origin (opposite of the drag handle)
   * @param {import("ol/pixel.js").Pixel} destination Pixel of destination (the handle we dragged)
   * @param {import("ol/pixel.js").Pixel} vector The normalized vector to the point
   * @return {import("ol/pixel.js").Pixel} The new pixel of the point
   * @private
   */
  calculateNewPixel_(origin, destination, vector) {
    const aVector = [destination[0] - origin[0], destination[1] - origin[1]];

    const abScalarProduct = aVector[0] * vector[0] + aVector[1] * vector[1];

    const deltaVector = [vector[0] * abScalarProduct, vector[1] * abScalarProduct];

    return [deltaVector[0] + origin[0], deltaVector[1] + origin[1]];
  }

  /**
   * @param {import("ol/MapBrowserEvent.js").default<unknown>} evt MapBrowserEvent.
   * @return {boolean} Stop drag sequence?
   * @private
   */
  handleUp_(evt) {
    if (this.modified_) {
      const event = new ngeoCustomEvent('modifyend', {features: this.features_});
      this.dispatchEvent(event);
      this.params_ = null;
      this.modified_ = false;
    }
    return false;
  }
}

/**
 * @typedef {Object} CacheItem
 * @property {olFeature<import("ol/geom/Geometry.js").default>[]} corners
 */

/**
 * @typedef {Object} ModifyParams
 * @property {import("ol/coordinate.js").Coordinate} originCoordinate
 * @property {import("ol/pixel.js").Pixel} originPixel
 * @property {import("ol/geom/Point.js").default} siblingXPoint
 * @property {import("ol/geom/Point.js").default} siblingYPoint
 * @property {number[]} vectorX
 * @property {number[]} vectorY
 */

export default ModifyRectangle;
