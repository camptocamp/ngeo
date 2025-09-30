// The MIT License (MIT)
//
// Copyright (c) 2016-2025 Camptocamp SA
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

import ngeoCustomEvent from 'ngeo/CustomEvent';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties';
import {getDefaultModifyStyleFunction} from 'ngeo/interaction/common';
import {getAzimut} from 'ngeo/interaction/MeasureAzimut';
import {getUid as olUtilGetUid} from 'ol/util';
import olFeature from 'ol/Feature';
import olMapBrowserEvent from 'ol/MapBrowserEvent';
import * as olCoordinate from 'ol/coordinate';
import {listen} from 'ol/events';
import * as olExtent from 'ol/extent';
import olGeomCircle from 'ol/geom/Circle';
import olGeomLineString from 'ol/geom/LineString';
import olGeomPoint from 'ol/geom/Point';
import Polygon, {fromCircle} from 'ol/geom/Polygon';
import olInteractionPointer from 'ol/interaction/Pointer';
import olLayerVector from 'ol/layer/Vector';
import olSourceVector from 'ol/source/Vector';
import olStructsRBush from 'ol/structs/RBush';
import {CollectionEvent} from 'ol/Collection';

/**
 * Interaction for modifying feature geometries.
 *
 * @hidden
 */
export default class extends olInteractionPointer {
  /**
   * @param {import('ol/interaction/Modify').Options} options Options.
   * @param {number} [nbPoints]
   * @fires import('ngeo/interaction/ModifyCircleEvent').default
   */
  constructor(options, nbPoints) {
    super();

    this.handleDownEvent = this.handleDownEvent_;
    this.handleDragEvent = this.handleDragEvent_;
    this.handleUpEvent = this.handleUpEvent_;

    console.assert(options.features);

    /**
     * Editing vertex.
     *
     * @type {?olFeature<import('ol/geom/Geometry').default>}
     * @private
     */
    this.vertexFeature_ = null;

    /**
     * @type {import('ol/pixel').Pixel}
     * @private
     */
    this.lastPixel_ = [0, 0];

    /**
     * @type {boolean}
     * @private
     */
    this.modified_ = false;

    /**
     * Segment RTree for each layer
     *
     * @type {import('ol/structs/RBush').default<import('ol/interaction/Modify').SegmentData>}
     * @private
     */
    this.rBush_ = new olStructsRBush();

    /**
     * @type {number}
     * @private
     */
    this.pixelTolerance_ = options.pixelTolerance !== undefined ? options.pixelTolerance : 10;

    /**
     * @type {number}
     * @private
     */
    this.nbPoints = nbPoints || 64;

    /**
     * @type {boolean}
     * @private
     */
    this.snappedToVertex_ = false;

    /**
     * Indicate whether the interaction is currently changing a feature's
     * coordinates.
     *
     * @type {boolean}
     * @private
     */
    this.changingFeature_ = false;

    /**
     * @type {[import('ol/interaction/Modify').SegmentData, number][]}
     * @private
     */
    this.dragSegments_ = [];

    /**
     * Draw overlay where sketch features are drawn.
     *
     * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.overlay_ = new olLayerVector({
      source: new olSourceVector({
        useSpatialIndex: false,
        wrapX: !!options.wrapX,
      }),
      style: options.style || getDefaultModifyStyleFunction(),
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    /**
     * @type {import('ol/Collection').default<olFeature<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.features_ = options.features;

    this.features_.forEach((feature) => this.addFeature_(feature));
    listen(this.features_, 'add', this.handleFeatureAdd_, this);
    listen(this.features_, 'remove', this.handleFeatureRemove_, this);
  }

  /**
   * @param {olFeature<import('ol/geom/Geometry').default>} feature Feature.
   * @private
   */
  addFeature_(feature) {
    const geometry = feature.getGeometry();
    if (!geometry) {
      throw new Error('Missing geometry');
    }
    if (geometry.getType() === 'Polygon' && !!feature.get(ngeoFormatFeatureProperties.IS_CIRCLE)) {
      const geometry = /** @type {import('ol/geom/Polygon').default}*/ (feature.getGeometry());
      this.writeCircleGeometry_(feature, geometry);

      const map = this.getMap();
      if (map) {
        this.handlePointerAtPixel_(this.lastPixel_, map);
      }
    }
  }

  /**
   * @param {import('ol/MapBrowserEvent').default<unknown>} evt MapBrowserEvent
   * @private
   */
  willModifyFeatures_(evt) {
    if (!this.modified_) {
      this.modified_ = true;
      const event = new ngeoCustomEvent('modifystart', {features: this.features_});
      this.dispatchEvent(event);
    }
  }

  /**
   * @param {olFeature<import('ol/geom/Geometry').default>} feature Feature.
   * @private
   */
  removeFeature_(feature) {
    this.removeFeatureSegmentData_(feature);
    // Remove the vertex feature if the collection of canditate features
    // is empty.
    if (this.vertexFeature_ && this.features_.getLength() === 0) {
      /** @type {olSourceVector<import('ol/geom/Geometry').default>} */ (
        this.overlay_.getSource()
      ).removeFeature(this.vertexFeature_);
      this.vertexFeature_ = null;
    }
  }

  /**
   * @param {olFeature<import('ol/geom/Geometry').default>} feature Feature.
   * @private
   */
  removeFeatureSegmentData_(feature) {
    const rBush = this.rBush_;
    /** @type {import('ol/interaction/Modify').SegmentData[]} */
    const nodesToRemove = [];
    rBush.forEach(
      /**
       * @param {import('ol/interaction/Modify').SegmentData} node RTree node.
       */
      (node) => {
        if (feature === node.feature) {
          nodesToRemove.push(node);
        }
      }
    );
    for (let i = nodesToRemove.length - 1; i >= 0; --i) {
      rBush.remove(nodesToRemove[i]);
    }
  }

  /**
   * @param {import('ol/PluggableMap').default} map Map.
   */
  setMap(map) {
    this.overlay_.setMap(map);
    super.setMap(map);
  }

  /**
   * @param {Event|import('ol/events/Event').default} evt Event.
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
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleFeatureRemove_(evt) {
    if (evt instanceof CollectionEvent) {
      /**
       * @type {olFeature<import('ol/geom/Geometry').default>}
       */
      const feature = evt.element;
      this.removeFeature_(feature);
    }
  }

  /**
   * @param {olFeature<import('ol/geom/Geometry').default>} feature Feature
   * @param {import('ol/geom/Polygon').default} geometry Geometry.
   * @private
   */
  writeCircleGeometry_(feature, geometry) {
    const rings = geometry.getCoordinates();
    for (let j = 0, jj = rings.length; j < jj; ++j) {
      const coordinates = rings[j];
      for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        const segment = /** @type {[number, number, number, number][]} */ (coordinates.slice(i, i + 2));
        /** @type {import('ol/interaction/Modify').SegmentData} */
        const segmentData = {
          feature: feature,
          geometry: geometry,
          depth: [j],
          index: i,
          segment: segment,
        };
        this.rBush_.insert(olExtent.boundingExtent(segment), segmentData);
      }
    }
  }

  /**
   * @param {import('ol/coordinate').Coordinate} coordinates Coordinates.
   * @returns {olFeature<import('ol/geom/Geometry').default>} Vertex feature.
   * @private
   */
  createOrUpdateVertexFeature_(coordinates) {
    let vertexFeature = this.vertexFeature_;
    if (!vertexFeature) {
      vertexFeature = new olFeature(new olGeomPoint(coordinates));
      this.vertexFeature_ = vertexFeature;
      /** @type {olSourceVector<import('ol/geom/Geometry').default>} */ (
        this.overlay_.getSource()
      ).addFeature(vertexFeature);
    } else {
      const geometry = vertexFeature.getGeometry();
      if (!(geometry instanceof olGeomPoint)) {
        throw new Error('Wrong geometry type');
      }
      geometry.setCoordinates(coordinates);
    }
    return vertexFeature;
  }

  /**
   * @param {import('ol/MapBrowserEvent').default<unknown>} evt Event.
   * @private
   */
  handlePointerMove_(evt) {
    this.lastPixel_ = evt.pixel;
    this.handlePointerAtPixel_(evt.pixel, evt.map);
  }

  /**
   * @param {import('ol/pixel').Pixel} pixel Pixel
   * @param {import('ol/PluggableMap').default} map Map.
   * @private
   */
  handlePointerAtPixel_(pixel, map) {
    const pixelCoordinate = map.getCoordinateFromPixel(pixel);
    /**
     * @param {import('ol/interaction/Modify').SegmentData} a
     * @param {import('ol/interaction/Modify').SegmentData} b
     * @returns {number}
     */
    const sortByDistance = function (a, b) {
      return (
        olCoordinate.squaredDistanceToSegment(pixelCoordinate, a.segment) -
        olCoordinate.squaredDistanceToSegment(pixelCoordinate, b.segment)
      );
    };

    const lowerLeft = map.getCoordinateFromPixel([
      pixel[0] - this.pixelTolerance_,
      pixel[1] + this.pixelTolerance_,
    ]);
    const upperRight = map.getCoordinateFromPixel([
      pixel[0] + this.pixelTolerance_,
      pixel[1] - this.pixelTolerance_,
    ]);
    const box = olExtent.boundingExtent([lowerLeft, upperRight]);

    const nodes = this.rBush_.getInExtent(box);
    if (nodes.length > 0) {
      nodes.sort(sortByDistance);
      const node = nodes[0];
      const closestSegment = node.segment;
      let vertex = olCoordinate.closestOnSegment(pixelCoordinate, closestSegment);
      const vertexPixel = map.getPixelFromCoordinate(vertex);
      if (Math.sqrt(olCoordinate.squaredDistance(pixel, vertexPixel)) <= this.pixelTolerance_) {
        const pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
        const pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
        const squaredDist1 = olCoordinate.squaredDistance(vertexPixel, pixel1);
        const squaredDist2 = olCoordinate.squaredDistance(vertexPixel, pixel2);
        const dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
        this.snappedToVertex_ = dist <= this.pixelTolerance_;
        if (this.snappedToVertex_) {
          vertex = squaredDist1 > squaredDist2 ? closestSegment[1] : closestSegment[0];
          this.createOrUpdateVertexFeature_(vertex);
          /** @type {Object<string, boolean>} */
          const vertexSegments = {};
          vertexSegments[olUtilGetUid(closestSegment)] = true;
          let segment;
          for (let i = 1, ii = nodes.length; i < ii; ++i) {
            segment = nodes[i].segment;
            if (
              (olCoordinate.equals(closestSegment[0], segment[0]) &&
                olCoordinate.equals(closestSegment[1], segment[1])) ||
              (olCoordinate.equals(closestSegment[0], segment[1]) &&
                olCoordinate.equals(closestSegment[1], segment[0]))
            ) {
              vertexSegments[olUtilGetUid(segment)] = true;
            } else {
              break;
            }
          }
          return;
        }
      }
    }
    if (this.vertexFeature_) {
      this.overlay_.getSource().removeFeature(this.vertexFeature_);
      this.vertexFeature_ = null;
    }
  }

  /**
   * @param {import('ol/geom/SimpleGeometry').default} geometry Geometry.
   * @param {number[][]|number[][][]} coordinates Coordinates.
   * @private
   */
  setGeometryCoordinates_(geometry, coordinates) {
    this.changingFeature_ = true;
    geometry.setCoordinates(coordinates);
    this.changingFeature_ = false;
  }

  /**
   * @param {import('ol/MapBrowserEvent').default<unknown>} evt MapBrowserEvent.
   * @returns {boolean} Start drag sequence?
   * @private
   */
  handleDownEvent_(evt) {
    this.handlePointerAtPixel_(evt.pixel, evt.map);
    this.dragSegments_ = [];
    this.modified_ = false;
    const vertexFeature = this.vertexFeature_;
    if (vertexFeature) {
      const geometry = vertexFeature.getGeometry();
      if (!(geometry instanceof olGeomPoint)) {
        throw new Error('Wrong geometry type');
      }
      const vertex = geometry.getCoordinates();
      const vertexExtent = olExtent.boundingExtent([vertex]);
      const segmentDataMatches = this.rBush_.getInExtent(vertexExtent);
      /** @type {Object<string, import('ol/interaction/Modify').SegmentData[]>} */
      const componentSegments = {};
      segmentDataMatches.sort(compareIndexes);
      for (let i = 0, ii = segmentDataMatches.length; i < ii; ++i) {
        const segmentDataMatch = segmentDataMatches[i];
        const segment = segmentDataMatch.segment;
        let uid = olUtilGetUid(segmentDataMatch.feature);
        const depth = segmentDataMatch.depth;
        if (depth) {
          uid += `-${depth.join('-')}`; // separate feature components
        }
        if (!componentSegments[uid]) {
          componentSegments[uid] = new Array(2);
        }
        if (olCoordinate.equals(segment[0], vertex) && !componentSegments[uid][0]) {
          this.dragSegments_.push([segmentDataMatch, 0]);
          componentSegments[uid][0] = segmentDataMatch;
        } else if (olCoordinate.equals(segment[1], vertex) && !componentSegments[uid][1]) {
          this.dragSegments_.push([segmentDataMatch, 1]);
          componentSegments[uid][1] = segmentDataMatch;
        }
      }
    }
    return !!this.vertexFeature_;
  }

  /**
   * @param {import('ol/MapBrowserEvent').default<unknown>} evt MapBrowserEvent.
   * @private
   */
  handleDragEvent_(evt) {
    this.willModifyFeatures_(evt);
    const vertex = evt.coordinate;
    const geometry = this.dragSegments_[0][0].geometry;
    const center = olExtent.getCenter(geometry.getExtent());

    const line = new olGeomLineString([center, vertex]);

    /**
     * @type {import('ol/geom/Circle').default}
     */
    const circle = new olGeomCircle(center, line.getLength());
    const coordinates = fromCircle(circle, this.nbPoints).getCoordinates();
    this.setGeometryCoordinates_(geometry, coordinates);

    const azimut = getAzimut(line);
    this.features_.getArray()[0].set(ngeoFormatFeatureProperties.AZIMUT, azimut);

    this.createOrUpdateVertexFeature_(vertex);
  }

  /**
   * @param {import('ol/MapBrowserEvent').default<unknown>} evt MapBrowserEvent.
   * @returns {boolean} Stop drag sequence?
   * @private
   */
  handleUpEvent_(evt) {
    this.rBush_.clear();
    const geometry = this.dragSegments_[0][0].geometry;
    if (geometry instanceof Polygon) {
      this.writeCircleGeometry_(
        /** @type {olFeature<import('ol/geom/Geometry').default>} */ (this.dragSegments_[0][0].feature),
        geometry
      );
    }

    if (this.modified_) {
      const event = new ngeoCustomEvent('modifyend', {features: this.features_});
      this.dispatchEvent(event);
      this.modified_ = false;
    }
    return false;
  }

  /**
   * Handles the {@link import('ol/MapBrowserEvent').default map browser event} and may modify the
   * geometry.
   *
   * @param {import('ol/MapBrowserEvent').default<unknown>} mapBrowserEvent Map browser event.
   * @returns {boolean} `false` to stop event propagation.
   */
  handleEvent(mapBrowserEvent) {
    if (!(mapBrowserEvent instanceof olMapBrowserEvent)) {
      return true;
    }

    let handled;
    if (
      !mapBrowserEvent.map.getView().getInteracting() &&
      mapBrowserEvent.type == 'pointermove' &&
      !this.handlingDownUpSequence
    ) {
      this.handlePointerMove_(mapBrowserEvent);
    }

    return super.handleEvent(mapBrowserEvent) && !handled;
  }
}

/**
 * @param {import('ol/interaction/Modify').SegmentData} a The first segment data.
 * @param {import('ol/interaction/Modify').SegmentData} b The second segment data.
 * @returns {number} The difference in indexes.
 * @private
 * @hidden
 */
function compareIndexes(a, b) {
  return a.index - b.index;
}
