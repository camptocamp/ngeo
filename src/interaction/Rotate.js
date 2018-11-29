/**
 * @module ngeo.interaction.Rotate
 */
import googAsserts from 'goog/asserts.js';
import ngeoInteractionCommon from 'ngeo/interaction/common.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import {
  getUid as olUtilGetUid,
  inherits as olUtilInherits
} from 'ol/util.js';
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
 * @classdesc
 * Interaction to rotate features.
 *
 * @constructor
 * @extends {ol.interaction.Pointer}
 * @param {olx.interaction.ModifyOptions} options Options.
 * @fires ngeo.interaction.ModifyCircleEvent
 * @api
 */
const exports = function(options) {

  googAsserts.assert(options.features);

  /**
   * @type {Array.<ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {boolean}
   * @private
   */
  this.modified_ = false;

  /**
   * @type {?ol.EventsKey}
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
  this.pixelTolerance_ = options.pixelTolerance !== undefined ?
    options.pixelTolerance : 10;

  /**
   * @type {!ol.Collection.<ol.Feature>}
   * @private
   */
  this.features_ = options.features;

  /**
   * The feature currently modified.
   * @type {ol.Feature}
   * @private
   */
  this.feature_ = null;

  /**
   * @type {ol.Pixel}
   * @private
   */
  this.coordinate_ = null;

  /**
   * @type {ol.Coordinate}
   * @private
   */
  this.centerCoordinate_ = null;

  /**
   * Draw overlay where sketch features are drawn.
   * @type {ol.layer.Vector}
   * @private
   */
  this.overlay_ = new olLayerVector({
    source: new olSourceVector({
      useSpatialIndex: false,
      wrapX: !!options.wrapX
    }),
    style: options.style || ngeoInteractionCommon.getDefaultModifyStyleFunction(),
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  /**
   * @type {!Object.<number, ol.Feature>}
   * @private
   */
  this.centerFeatures_ = {};

  olInteractionPointer.call(this, {
    handleDownEvent: this.handleDown_,
    handleDragEvent: this.handleDrag_,
    handleUpEvent: this.handleUp_
  });

};

olUtilInherits(exports, olInteractionPointer);


/**
 * Activate or deactivate the interaction.
 * @param {boolean} active Active.
 * @override
 */
exports.prototype.setActive = function(active) {

  if (this.keyPressListenerKey_) {
    olEvents.unlistenByKey(this.keyPressListenerKey_);
    this.keyPressListenerKey_ = null;
  }

  olInteractionPointer.prototype.setActive.call(this, active);

  if (active) {
    this.keyPressListenerKey_ = olEvents.listen(
      document,
      'keyup',
      this.handleKeyUp_,
      this
    );
    this.features_.forEach(feature => this.addFeature_(feature));
    this.listenerKeys_.push(
      olEvents.listen(this.features_, 'add', this.handleFeatureAdd_, this),
      olEvents.listen(this.features_, 'remove', this.handleFeatureRemove_, this)
    );

  } else {
    this.listenerKeys_.forEach(olEvents.unlistenByKey);
    this.listenerKeys_.length = 0;
    this.features_.forEach(feature => this.removeFeature_(feature));
  }
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
exports.prototype.addFeature_ = function(feature) {
  const geometry = feature.getGeometry();
  googAsserts.assertInstanceof(geometry, olGeomGeometry);

  feature.set('angle', 0);

  // Add the center icon to the overlay
  const uid = olUtilGetUid(feature);
  const point = new olGeomPoint(this.getCenterCoordinate_(geometry));
  const centerFeature = new olFeature(point);
  this.centerFeatures_[uid] = centerFeature;
  this.overlay_.getSource().addFeature(centerFeature);

};


/**
 * @param {ol.MapBrowserPointerEvent} evt Map browser event
 * @private
 */
exports.prototype.willModifyFeatures_ = function(evt) {
  if (!this.modified_) {
    this.modified_ = true;
    /** @type {ngeox.ModifyEvent} */
    const event = new ngeoCustomEvent('modifystart', {features: this.features_});
    this.dispatchEvent(event);
  }
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
exports.prototype.removeFeature_ = function(feature) {
  this.feature_ = null;
  //this.overlay_.getSource().removeFeature(feature);

  if (feature) {
    const uid = olUtilGetUid(feature);

    if (this.centerFeatures_[uid]) {
      this.overlay_.getSource().removeFeature(this.centerFeatures_[uid]);
      delete this.centerFeatures_[uid];
    }
  }
};


/**
 * @inheritDoc
 */
exports.prototype.setMap = function(map) {
  this.overlay_.setMap(map);
  olInteractionPointer.prototype.setMap.call(this, map);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
exports.prototype.handleFeatureAdd_ = function(evt) {
  const feature = evt.element;
  googAsserts.assertInstanceof(feature, olFeature,
    'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
exports.prototype.handleFeatureRemove_ = function(evt) {
  const feature = /** @type {ol.Feature} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @return {boolean} Start drag sequence?
 * @private
 */
exports.prototype.handleDown_ = function(evt) {
  const map = evt.map;

  let feature = map.forEachFeatureAtPixel(evt.pixel,
    (feature, layer) => feature, undefined);

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
    this.feature_ = feature;
    const geometry = (this.feature_.getGeometry());
    if (geometry !== undefined) {
      this.centerCoordinate_ = this.getCenterCoordinate_(geometry);
    }

    return true;
  }

  return false;
};


/**
 * @param {ol.geom.Geometry} geometry Geometry.
 * @return {ol.Coordinate} The center coordinate of the geometry.
 * @private
 */
exports.prototype.getCenterCoordinate_ = function(
  geometry) {

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
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @private
 */
exports.prototype.handleDrag_ = function(evt) {
  this.willModifyFeatures_(evt);

  const geometry = /** @type {ol.geom.SimpleGeometry} */
      (this.feature_.getGeometry());

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
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @return {boolean} Stop drag sequence?
 * @private
 */
exports.prototype.handleUp_ = function(evt) {
  if (this.modified_) {
    /** @type {ngeox.RotateEvent} */
    const event = new ngeoCustomEvent('rotateend', {feature: this.feature_});
    this.dispatchEvent(event);
    this.modified_ = false;
    this.setActive(false);
  }
  return false;
};


/**
 * Deactivate this interaction if the ESC key is pressed.
 * @param {KeyboardEvent} evt Event.
 * @private
 */
exports.prototype.handleKeyUp_ = function(evt) {
  // 27 == ESC key
  if (evt.keyCode === 27) {
    this.setActive(false);
  }
};


export default exports;
