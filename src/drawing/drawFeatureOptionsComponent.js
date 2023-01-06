// The MIT License (MIT)
//
// Copyright (c) 2019-2022 Camptocamp SA
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

import angular from 'angular';

import {listen as olEventsListen} from 'ol/events';
import OLFeature from 'ol/Feature';
import OLGeomCircle from 'ol/geom/Circle';
import OLGeomGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeomLineString from 'ol/geom/LineString';
import OLGeomPolygon from 'ol/geom/Polygon';
import {fromExtent as olGeomPolygonFromExtent} from 'ol/geom/Polygon';
import OLInteractionDraw from 'ol/interaction/Draw';
import OLInteractionPointer from 'ol/interaction/Pointer';
import OLInteractionSnap from 'ol/interaction/Snap';
import OLMapBrowserEvent from 'ol/MapBrowserEvent';
import OLSourceVector from 'ol/source/Vector';

import {unlistenByKeys as ngeoEventsUnlistenByKeys} from 'ngeo/events';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('GmfDrawFeatureOptionsComponent', []);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    $templateCache.put(
      'gmf/drawing/drawFeatureOptionsComponent',
      // @ts-ignore: webpack
      require('./drawFeatureOptionsComponent.html')
    );
  }
);

/**
 * @hidden
 */
export class DrawFeatureOptionsController {
  /**
   * @param {angular.IScope} $scope Scope.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfDrawFeatureOptionsController
   */
  constructor($scope) {
    // === Binding properties ===

    /**
     * @type {!import('ol/Map').default}
     */
    this.map;

    // Note: only one of the 4 interactions below should be set

    /**
     * @type {?import('ngeo/interaction/MeasureLength').default}
     */
    this.measureLength = null;

    /**
     * @type {?import('ngeo/interaction/MeasureArea').default}
     */
    this.measureArea = null;

    /**
     * @type {?import('ngeo/interaction/MeasureAzimut').default}
     */
    this.measureAzimut = null;

    /**
     * @type {?OLInteractionDraw}
     */
    this.drawRectangle = null;

    // === Injected properties ===

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    // === Inner properties ===

    /**
     * The length is used to determine:
     * - the length of a line segment to draw (for length and area measurements)
     * - the width of a rectangle to draw
     * - the radius of a circle to draw (for azimut measurements)
     *
     * @type {number}
     */
    this.length = NaN;

    /**
     * Measure unit for the length. Possible values are: 'm', 'km'.
     *
     * @type {string}
     */
    this.lengthUnits = 'm';

    /**
     * The height is used to determine:
     * - the height of the rectangle to draw
     *
     * @type {number}
     */
    this.height = NaN;

    /**
     * Measure unit for the height. Possible values are: 'm', 'km'.
     *
     * @type {string}
     */
    this.heightUnits = 'm';

    // === Private properties ===

    /**
     * The draw interaction that was given.
     *
     * @type {?OLInteractionDraw}
     * @private
     */
    this.drawInteraction_ = null;

    /**
     * The feature being drawn. Set when the 'drawstart' event is
     * fired by the draw interaction.
     *
     * @type {?OLFeature<import('ol/geom/Geometry').default>}
     * @private
     */
    this.feature_ = null;

    /**
     * @type {import('ol/events').EventsKey[]}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * Used to keep track of the current number of vertices while
     * drawing a LineString or a Polygon. Why? Because the only way to
     * keep track of the changes that occur within their geometry is
     * with the 'change' event, which occurs while the mouse is
     * moving.
     *
     * If at any moment, while drawing, this number becomes different
     * than the actual number of vertices in the geometry, then we
     * need to update the snap feature.
     *
     * @type {number}
     */
    this.verticesCounter_ = NaN;

    /**
     * @type {!OLFeature<import('ol/geom/Geometry').default>}
     * @private
     */
    this.snapFeature_ = new OLFeature();

    /**
     * @type {!OLSourceVector<import('ol/geom/Geometry').default>}
     * @private
     */
    this.snapSource_ = new OLSourceVector({
      className: 'canvas2d',
      features: [this.snapFeature_],
    });

    /**
     * @type {!OLInteractionSnap}
     * @private
     */
    this.snapInteraction_ = new OLInteractionSnap({
      // @ts-ignore: webpack
      handleEvent: this.snapInteractionHandleEvent_.bind(this),
      pixelTolerance: 10000,
      source: this.snapSource_,
    });

    /**
     * Flag used to manually stop drawing after a double
     * click. See explanations where used.
     *
     * @type {boolean}
     * @private
     */
    this.shouldStopDrawing_ = false;
  }

  /**
   * Called on initialization of the controller.
   */
  $onInit() {
    // Find which measure/draw interaction was set, then get its draw
    // interaction
    let requiresHeight = false;
    let drawInteraction;
    if (this.measureLength) {
      drawInteraction = this.measureLength.getDrawInteraction();
    } else if (this.measureArea) {
      drawInteraction = this.measureArea.getDrawInteraction();
    } else if (this.measureAzimut) {
      drawInteraction = this.measureAzimut.getDrawInteraction();
    } else if (this.drawRectangle) {
      drawInteraction = this.drawRectangle;
      requiresHeight = true;
    }

    if (drawInteraction instanceof OLInteractionDraw) {
      this.drawInteraction_ = /** @type {OLInteractionDraw} */ (drawInteraction);
    } else {
      throw new Error('No draw interaction given to DrawFeatureOptions component');
    }

    this.map.addInteraction(this.snapInteraction_);

    this.listenerKeys_.push(
      olEventsListen(drawInteraction, 'drawstart', this.handleDrawInteractionDrawStart_, this),
      olEventsListen(this.map, 'singleclick', this.handleMapSingleClick_, this),
      olEventsListen(this.map, 'dblclick', this.handleMapDoubleClick_, this)
    );

    if (requiresHeight) {
      this.scope_.$watch(
        () => {
          let ret = null;
          if (this.length && this.feature_ && this.height) {
            ret = `${this.length}${this.lengthUnits}${this.height}${this.heightUnits}`;
          }
          return ret;
        },
        (newVal, oldVal) => {
          if (newVal) {
            this.adjustSnapFeature_(this.length, this.lengthUnits, this.height, this.heightUnits);
          } else {
            this.resetSnapFeature_();
          }
        }
      );
    } else {
      this.scope_.$watch(
        () => {
          let ret = null;
          if (this.length && this.feature_) {
            ret = `${this.length}${this.lengthUnits}$`;
          }
          return ret;
        },
        (newVal, oldVal) => {
          if (newVal) {
            this.adjustSnapFeature_(this.length, this.lengthUnits);
          } else {
            this.resetSnapFeature_();
          }
        }
      );
    }
  }

  /**
   * Called on destruction of the controller.
   */
  $onDestroy() {
    if (!this.drawInteraction_) {
      return;
    }

    ngeoEventsUnlistenByKeys(this.listenerKeys_);

    this.map.removeInteraction(this.snapInteraction_);
    this.snapSource_.clear();
  }

  /**
   * When the draw interaction starts drawing, the feature being drawn
   * is stored.
   *
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleDrawInteractionDrawStart_(evt) {
    // evt.feature - ol.interaction.Draw - DrawEvent not exported by OL
    // evt.detail.feature - ngeo.interaction.DrawAzimut
    // @ts-ignore: webpack
    const feature = evt.feature || evt.detail.feature;

    this.feature_ = feature;

    const geometry = feature.getGeometry();
    this.listenerKeys_.push(olEventsListen(geometry, 'change', this.handleFeatureGeometryChange_, this));
  }

  /**
   * Called every time the geometry of the feature being drawn changes.
   *
   * @private
   */
  handleFeatureGeometryChange_() {
    let adjust = false;

    if (this.measureLength) {
      // Length, i.e. LineString
      const lineStringGeometry = this.feature_.getGeometry();
      if (lineStringGeometry instanceof OLGeomLineString) {
        const coordinates = lineStringGeometry.getCoordinates();
        if (this.verticesCounter_ !== coordinates.length) {
          this.verticesCounter_ = coordinates.length;
          adjust = true;
        }
      }
    } else if (this.measureArea) {
      // Area, i.e. Polygon
      const polygonGeometry = this.feature_.getGeometry();
      if (polygonGeometry instanceof OLGeomPolygon) {
        const coordinates = polygonGeometry.getCoordinates()[0];
        if (this.verticesCounter_ !== coordinates.length) {
          this.verticesCounter_ = coordinates.length;
          adjust = true;
        }
      }
    } else if (this.drawRectangle) {
      if (this.length && this.height) {
        this.adjustSnapFeature_(this.length, this.lengthUnits, this.height, this.heightUnits);
        return;
      }
    } else if (this.measureAzimut) {
      adjust = true;
    }

    // Adjust snap feature if the number of vertices changed
    if (adjust && this.length && this.feature_) {
      this.adjustSnapFeature_(this.length, this.lengthUnits);
    }
  }

  /**
   * Reset the snap feature's geometry.
   *
   * @private
   */
  resetSnapFeature_() {
    this.snapFeature_.setGeometry(undefined);
  }

  /**
   * Adjust the snap feature's geometry depending on the given arguments.
   *
   * @param {number} length Length
   * @param {string} lengthUnits Length units
   * @param {number} [opt_height] Height
   * @param {string} [opt_heightUnits] Height units
   * @private
   */
  adjustSnapFeature_(length, lengthUnits, opt_height, opt_heightUnits) {
    const lengthMeters = lengthUnits === 'm' ? length : length * 1000;
    const heightMeters =
      opt_height && opt_heightUnits ? (opt_heightUnits === 'm' ? opt_height : opt_height * 1000) : null;

    let snapGeometry;

    if (this.measureLength) {
      // Length, i.e. LineString
      const lineStringGeometry = this.feature_.getGeometry();
      if (lineStringGeometry instanceof OLGeomLineString) {
        const coordinates = lineStringGeometry.getCoordinates();
        const center = coordinates[this.verticesCounter_ - 2];
        if (center) {
          snapGeometry = new OLGeomCircle(center, lengthMeters);
        }
      }
    } else if (this.measureArea && this.verticesCounter_ !== 2) {
      // Area, i.e. Polygon
      const polygonGeometry = this.feature_.getGeometry();
      if (polygonGeometry instanceof OLGeomPolygon) {
        const coordinates = polygonGeometry.getCoordinates()[0];
        const center = coordinates[this.verticesCounter_ - 3];
        if (center) {
          snapGeometry = new OLGeomCircle(center, lengthMeters);
        }
      }
    } else if (this.measureAzimut) {
      // Azimut, i.e. Circle
      const geometryCollection = this.feature_.getGeometry();
      if (geometryCollection instanceof OLGeomGeometryCollection) {
        const circleGeometry = geometryCollection.getGeometries()[1];
        if (circleGeometry instanceof OLGeomCircle) {
          const center = circleGeometry.getCenter();
          snapGeometry = new OLGeomCircle(center, lengthMeters);
        }
      }
    } else if (this.drawRectangle && heightMeters) {
      // Rectangle
      const polygonGeometry = this.feature_.getGeometry();
      if (polygonGeometry instanceof OLGeomPolygon) {
        const center = polygonGeometry.getCoordinates()[0][0];
        console.assert(typeof center[0] === 'number');
        console.assert(typeof center[1] === 'number');
        snapGeometry = olGeomPolygonFromExtent([
          Number(center[0]) - lengthMeters,
          Number(center[1]) - heightMeters,
          Number(center[0]) + lengthMeters,
          Number(center[1]) + heightMeters,
        ]);
      }
    }

    if (snapGeometry) {
      this.snapFeature_.setGeometry(snapGeometry);
    }
  }

  /**
   * Override handler method of the map browser event for the snap
   * interaction. If the event is 'pointerup', if the following map
   * browser event is 'dblclick', then we should stop drawing.
   *
   * @param {import('ol/MapBrowserEvent').default<unknown>} evt Map browser event.
   * @returns {boolean} `false` to stop event propagation.
   * @private
   */
  snapInteractionHandleEvent_(evt) {
    const result = this.snapInteraction_.snapTo(evt.pixel, evt.coordinate, evt.map);
    if (result) {
      evt.coordinate = result.vertex.slice(0, 2);
      evt.pixel = result.vertexPixel;

      // We should stop drawing if a 'dblclick' event comes next
      if (evt.type === 'pointerup') {
        this.shouldStopDrawing_ = true;
      }
    }

    return OLInteractionPointer.prototype.handleEvent.call(this.snapInteraction_, evt);
  }

  /**
   * If a 'singleclick' event occur on the map after a snap, then we
   * can continue drawing.
   *
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleMapSingleClick_(evt) {
    if (!(evt instanceof OLMapBrowserEvent)) {
      return;
    }

    this.shouldStopDrawing_ = false;
  }

  /**
   * If a 'dblclick' event occur on the map after a snap, then we
   * should stop drawing.
   *
   * Note: double clicking to end drawing only occurs while measuring
   * length or area, i.e. while drawing a LineString or Polygon. When
   * that happens while snapping, then we need to manually force the
   * drawing to finish and also remove the last point that has been
   * added as a consequence of the snap still being active and causing
   * an unwanted point to be added.
   *
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleMapDoubleClick_(evt) {
    if (!(evt instanceof OLMapBrowserEvent)) {
      return;
    }

    if (this.shouldStopDrawing_) {
      this.drawInteraction_.removeLastPoint();
      this.drawInteraction_.finishDrawing();
    }
  }
}

myModule.component('gmfDrawfeatureoptions', {
  bindings: {
    'map': '<',
    // Note - only one of the below properties should be set at a time
    'drawRectangle': '<?',
    'measureArea': '<?',
    'measureAzimut': '<?',
    'measureLength': '<?',
  },
  controller: DrawFeatureOptionsController,
  templateUrl: 'gmf/drawing/drawFeatureOptionsComponent',
});

export default myModule;
