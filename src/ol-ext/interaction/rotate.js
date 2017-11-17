goog.provide('ngeo.RotateEvent');
goog.provide('ngeo.RotateEventType');
goog.provide('ngeo.interaction.Rotate');

goog.require('goog.asserts');
goog.require('ol');
goog.require('ol.Collection');
goog.require('ol.Feature');
goog.require('ol.MapBrowserPointerEvent');
goog.require('ol.events');
goog.require('ol.interaction.Modify');
goog.require('ol.interaction.ModifyEventType');
goog.require('ol.interaction.Pointer');
goog.require('ol.geom.Point');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');


/**
 * @enum {string}
 */
ngeo.RotateEventType = {
  /**
   * Triggered upon rotate draw end
   * @event ngeo.RotateEvent#rotateend
   */
  ROTATEEND: 'rotateend'

};


/**
 * @classdesc
 * Events emitted by {@link ngeo.interaction.Rotate} instances are
 * instances of this type.
 *
 * @constructor
 * @struct
 * @extends {ol.events.Event}
 * @implements {ngeox.RotateEvent}
 * @param {ngeo.RotateEventType} type Type.
 * @param {ol.Feature} feature The feature rotated.
 */
ngeo.RotateEvent = function(type, feature) {

  ol.events.Event.call(this, type);

  /**
   * The feature being rotated.
   * @type {ol.Feature}
   * @api stable
   */
  this.feature = feature;

};
ol.inherits(ngeo.RotateEvent, ol.events.Event);


/**
 * @classdesc
 * Interaction to rotate features.
 *
 * @constructor
 * @struct
 * @extends {ol.interaction.Pointer}
 * @param {olx.interaction.ModifyOptions} options Options.
 * @fires ngeo.interaction.ModifyCircleEvent
 * @export
 * @api
 */
ngeo.interaction.Rotate = function(options) {

  goog.asserts.assert(options.features);

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

  const style = options.style ? options.style : ol.interaction.Modify.getDefaultStyleFunction();

  /**
   * Draw overlay where sketch features are drawn.
   * @type {ol.layer.Vector}
   * @private
   */
  this.overlay_ = new ol.layer.Vector({
    source: new ol.source.Vector({
      useSpatialIndex: false,
      wrapX: !!options.wrapX
    }),
    style: style,
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  /**
   * @type {!Object.<number, ol.Feature>}
   * @private
   */
  this.centerFeatures_ = {};

  ol.interaction.Pointer.call(this, {
    handleDownEvent: this.handleDown_,
    handleDragEvent: this.handleDrag_,
    handleUpEvent: this.handleUp_
  });

};
ol.inherits(ngeo.interaction.Rotate, ol.interaction.Pointer);


/**
 * Activate or deactivate the interaction.
 * @param {boolean} active Active.
 * @override
 * @export
 */
ngeo.interaction.Rotate.prototype.setActive = function(active) {

  if (this.keyPressListenerKey_) {
    ol.events.unlistenByKey(this.keyPressListenerKey_);
    this.keyPressListenerKey_ = null;
  }

  ol.interaction.Pointer.prototype.setActive.call(this, active);

  if (active) {
    this.keyPressListenerKey_ = ol.events.listen(
      document,
      'keyup',
      this.handleKeyUp_,
      this
    );
    this.features_.forEach(this.addFeature_, this);
    this.listenerKeys_.push(ol.events.listen(this.features_,
      ol.CollectionEventType.ADD, this.handleFeatureAdd_, this));
    this.listenerKeys_.push(ol.events.listen(this.features_,
      ol.CollectionEventType.REMOVE, this.handleFeatureRemove_, this));

  } else {
    this.listenerKeys_.forEach((key) => {
      ol.events.unlistenByKey(key);
    }, this);
    this.features_.forEach(this.removeFeature_, this);
  }
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.interaction.Rotate.prototype.addFeature_ = function(feature) {
  const geometry = feature.getGeometry();
  goog.asserts.assertInstanceof(geometry, ol.geom.Geometry);

  feature.set('angle', 0);

  // Add the center icon to the overlay
  const uid = ol.getUid(feature);
  const point = new ol.geom.Point(this.getCenterCoordinate_(geometry));
  const centerFeature = new ol.Feature(point);
  this.centerFeatures_[uid] = centerFeature;
  this.overlay_.getSource().addFeature(centerFeature);

};


/**
 * @param {ol.MapBrowserPointerEvent} evt Map browser event
 * @private
 */
ngeo.interaction.Rotate.prototype.willModifyFeatures_ = function(evt) {
  if (!this.modified_) {
    this.modified_ = true;
    this.dispatchEvent(new ol.interaction.Modify.Event(
      ol.interaction.ModifyEventType.MODIFYSTART, this.features_, evt));
  }
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.interaction.Rotate.prototype.removeFeature_ = function(feature) {
  this.feature_ = null;
  //this.overlay_.getSource().removeFeature(feature);

  if (feature) {
    const uid = ol.getUid(feature);

    if (this.centerFeatures_[uid]) {
      this.overlay_.getSource().removeFeature(this.centerFeatures_[uid]);
      delete this.centerFeatures_[uid];
    }
  }
};


/**
 * @inheritDoc
 */
ngeo.interaction.Rotate.prototype.setMap = function(map) {
  this.overlay_.setMap(map);
  ol.interaction.Pointer.prototype.setMap.call(this, map);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
ngeo.interaction.Rotate.prototype.handleFeatureAdd_ = function(evt) {
  const feature = evt.element;
  goog.asserts.assertInstanceof(feature, ol.Feature,
    'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
ngeo.interaction.Rotate.prototype.handleFeatureRemove_ = function(evt) {
  const feature = /** @type {ol.Feature} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @return {boolean} Start drag sequence?
 * @private
 */
ngeo.interaction.Rotate.prototype.handleDown_ = function(evt) {
  const map = evt.map;

  let feature = map.forEachFeatureAtPixel(evt.pixel,
    (feature, layer) => feature, undefined);

  if (feature) {
    let found = false;
    this.features_.forEach((f) => {
      if (ol.getUid(f) == ol.getUid(feature)) {
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
ngeo.interaction.Rotate.prototype.getCenterCoordinate_ = function(
  geometry) {

  let center;

  if (geometry instanceof ol.geom.LineString) {
    center = geometry.getFlatMidpoint();
  } else if (geometry instanceof ol.geom.Polygon) {
    center = geometry.getFlatInteriorPoint();
  } else {
    const extent = geometry.getExtent();
    center = ol.extent.getCenter(extent);
  }

  return center;
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @private
 */
ngeo.interaction.Rotate.prototype.handleDrag_ = function(evt) {
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
ngeo.interaction.Rotate.prototype.handleUp_ = function(evt) {
  if (this.modified_) {
    this.dispatchEvent(new ngeo.RotateEvent(ngeo.RotateEventType.ROTATEEND,
      this.feature_));
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
ngeo.interaction.Rotate.prototype.handleKeyUp_ = function(evt) {
  // 27 == ESC key
  if (evt.keyCode === 27) {
    this.setActive(false);
  }
};
