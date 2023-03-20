import {getDefaultModifyStyleFunction} from 'ngeo/interaction/common.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import * as olExtent from 'ol/extent.js';
import olFeature from 'ol/Feature.js';
import * as olEvents from 'ol/events.js';
import olInteractionPointer from 'ol/interaction/Pointer.js';
import olGeomGeometry from 'ol/geom/Geometry.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';

/**
 * @typedef {Object} RotateEventItem
 * @property {import("ol/Feature.js").default} feature
 */

/**
 * @typedef {import("ngeo/CustomEvent.js").default.<RotateEventItem>} RotateEvent
 */

/**
 * Interaction to rotate features.
 * @hidden
 */
export default class extends olInteractionPointer {
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
     * @type {Array.<import("ol/events.js").EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * @type {boolean}
     * @private
     */
    this.modified_ = false;

    /**
     * @type {?import("ol/events.js").EventsKey}
     * @private
     */
    this.keyPressListenerKey_ = null;

    /**
     * Indicate whether the interaction is currently changing a feature's
     * coordinates.
     * @type {boolean}
     * @private
     */
    this.changingFeature_ = false;

    /**
     * @type {number}
     * @private
     */
    this.pixelTolerance_ = options.pixelTolerance !== undefined ? options.pixelTolerance : 10;

    /**
     * @type {!import("ol/Collection.js").default.<import("ol/Feature.js").default>}
     * @private
     */
    this.features_ = options.features;

    /**
     * The feature currently modified.
     * @type {import("ol/Feature.js").default}
     * @private
     */
    this.feature_ = null;

    /**
     * @type {import("ol/pixel.js").Pixel}
     * @private
     */
    this.coordinate_ = null;

    /**
     * @type {import("ol/coordinate.js").Coordinate}
     * @private
     */
    this.centerCoordinate_ = null;

    /**
     * Draw overlay where sketch features are drawn.
     * @type {import("ol/layer/Vector.js").default}
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
     * @type {!Object.<number, import("ol/Feature.js").default>}
     * @private
     */
    this.centerFeatures_ = {};
  }

  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @override
   */
  setActive(active) {
    if (!this.features_) {
      return;
    }
    if (this.keyPressListenerKey_) {
      olEvents.unlistenByKey(this.keyPressListenerKey_);
      this.keyPressListenerKey_ = null;
    }

    olInteractionPointer.prototype.setActive.call(this, active);

    if (active) {
      this.keyPressListenerKey_ = olEvents.listen(document, 'keyup', this.handleKeyUp_, this);
      this.features_.forEach((feature) => this.addFeature_(feature));
      this.listenerKeys_.push(
        olEvents.listen(this.features_, 'add', this.handleFeatureAdd_, this),
        olEvents.listen(this.features_, 'remove', this.handleFeatureRemove_, this)
      );
    } else {
      this.listenerKeys_.forEach(olEvents.unlistenByKey);
      this.listenerKeys_.length = 0;
      this.features_.forEach((feature) => this.removeFeature_(feature));
    }
  }

  /**
   * @param {import("ol/Feature.js").default} feature Feature.
   * @private
   */
  addFeature_(feature) {
    const geometry = feature.getGeometry();
    console.assert(geometry instanceof olGeomGeometry);

    feature.set('angle', 0);

    // Add the center icon to the overlay
    const uid = olUtilGetUid(feature);
    const point = new olGeomPoint(this.getCenterCoordinate_(geometry));
    const centerFeature = new olFeature(point);
    this.centerFeatures_[uid] = centerFeature;
    /** @type {olSourceVector} */ (this.overlay_.getSource()).addFeature(centerFeature);
  }

  /**
   * @param {import("ol/MapBrowserPointerEvent.js").default} evt Map browser event
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
   * @param {import("ol/Feature.js").default} feature Feature.
   * @private
   */
  removeFeature_(feature) {
    this.feature_ = null;

    if (feature) {
      const uid = olUtilGetUid(feature);

      if (this.centerFeatures_[uid]) {
        /** @type {olSourceVector} */ (this.overlay_.getSource()).removeFeature(this.centerFeatures_[uid]);
        delete this.centerFeatures_[uid];
      }
    }
  }

  /**
   * @inheritDoc
   */
  setMap(map) {
    this.overlay_.setMap(map);
    olInteractionPointer.prototype.setMap.call(this, map);
  }

  /**
   * @param {import("ol/Collection.js").CollectionEvent} evt Event.
   * @private
   */
  handleFeatureAdd_(evt) {
    const feature = evt.element;
    console.assert(feature instanceof olFeature, 'feature should be an ol.Feature');
    this.addFeature_(feature);
  }

  /**
   * @param {import("ol/Collection.js").CollectionEvent} evt Event.
   * @private
   */
  handleFeatureRemove_(evt) {
    const feature = /** @type {import("ol/Feature.js").default} */ (evt.element);
    this.removeFeature_(feature);
  }

  /**
   * @param {import("ol/MapBrowserPointerEvent.js").default} evt Event.
   * @return {boolean} Start drag sequence?
   * @private
   */
  handleDown_(evt) {
    const map = evt.map;

    let feature = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => feature, undefined);

    if (feature) {
      let found = false;
      this.features_.forEach((f) => {
        if (olUtilGetUid(f) == olUtilGetUid(feature)) {
          found = true;
        }
      });
      if (!found) {
        feature = null;
      }
    }

    if (feature) {
      this.coordinate_ = evt.coordinate;
      this.feature_ = /** @type {olFeature} */ (feature);
      const geometry = this.feature_.getGeometry();
      if (geometry !== undefined) {
        this.centerCoordinate_ = this.getCenterCoordinate_(geometry);
      }

      return true;
    }
    return false;
  }

  /**
   * @param {import("ol/geom/Geometry.js").default} geometry Geometry.
   * @return {import("ol/coordinate.js").Coordinate} The center coordinate of the geometry.
   * @private
   */
  getCenterCoordinate_(geometry) {
    let center;

    if (geometry instanceof olGeomLineString) {
      center = geometry.getFlatMidpoint();
    } else if (geometry instanceof olGeomPolygon) {
      center = geometry.getFlatInteriorPoint();
    } else {
      const extent = geometry.getExtent();
      center = olExtent.getCenter(extent);
    }

    return center;
  }

  /**
   * @param {import("ol/MapBrowserPointerEvent.js").default} evt Event.
   * @private
   */
  handleDrag_(evt) {
    this.willModifyFeatures_(evt);

    const geometry = /** @type {import("ol/geom/SimpleGeometry.js").default} */ (this.feature_.getGeometry());

    const oldX = this.coordinate_[0];
    const oldY = this.coordinate_[1];

    const centerX = this.centerCoordinate_[0];
    const centerY = this.centerCoordinate_[1];

    const dx1 = oldX - centerX;
    const dy1 = oldY - centerY;
    const dx0 = evt.coordinate[0] - centerX;
    const dy0 = evt.coordinate[1] - centerY;

    this.coordinate_[0] = evt.coordinate[0];
    this.coordinate_[1] = evt.coordinate[1];

    const a0 = Math.atan2(dy0, dx0);
    const a1 = Math.atan2(dy1, dx1);
    const angle = a1 - a0;

    geometry.rotate(-angle, [centerX, centerY]);
  }

  /**
   * @param {import("ol/MapBrowserPointerEvent.js").default} evt Event.
   * @return {boolean} Stop drag sequence?
   * @private
   */
  handleUp_(evt) {
    if (this.modified_) {
      /** @type {RotateEvent} */
      const event = new ngeoCustomEvent('rotateend', {feature: this.feature_});
      this.dispatchEvent(event);
      this.modified_ = false;
      this.setActive(false);
    }
    return false;
  }

  /**
   * Deactivate this interaction if the ESC key is pressed.
   * @param {KeyboardEvent} evt Event.
   * @private
   */
  handleKeyUp_(evt) {
    // 27 == ESC key
    if (evt.keyCode === 27) {
      this.setActive(false);
    }
  }
}
