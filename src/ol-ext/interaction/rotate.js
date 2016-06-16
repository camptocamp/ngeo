goog.provide('ngeo.RotateEvent');
goog.provide('ngeo.RotateEventType');
goog.provide('ngeo.interaction.Rotate');

goog.require('goog.asserts');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('ol');
goog.require('ol.Collection');
goog.require('ol.CollectionEventType');
goog.require('ol.Feature');
goog.require('ol.MapBrowserPointerEvent');
goog.require('ol.events');
goog.require('ol.interaction.ModifyEvent');
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
 * @extends {ol.events.Event}
 * @implements {ngeox.RotateEvent}
 * @param {ngeo.RotateEventType} type Type.
 * @param {ol.Feature} feature The feature rotated.
 */
ngeo.RotateEvent = function(type, feature) {

  goog.base(this, type);

  /**
   * The feature being rotated.
   * @type {ol.Feature}
   * @api stable
   */
  this.feature = feature;

};
goog.inherits(ngeo.RotateEvent, ol.events.Event);


/**
 * @classdesc
 * Interaction to rotate features.
 *
 * @constructor
 * @extends {ol.interaction.Pointer}
 * @param {olx.interaction.ModifyOptions} options Options.
 * @fires ngeo.interaction.ModifyCircleEvent
 * @export
 * @api
 */
ngeo.interaction.Rotate = function(options) {

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
   * @type {?goog.events.Key}
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
   * @type {ol.Collection.<ol.Feature>}
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

  var style = options.style ? options.style : ol.interaction.Modify.getDefaultStyleFunction();

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

  goog.base(this, {
    handleDownEvent: this.handleDown_,
    handleDragEvent: this.handleDrag_,
    handleUpEvent: this.handleUp_
  });

};
goog.inherits(ngeo.interaction.Rotate, ol.interaction.Pointer);


/**
 * Activate or deactivate the interaction.
 * @param {boolean} active Active.
 * @export
 */
ngeo.interaction.Rotate.prototype.setActive = function(active) {

  if (this.keyPressListenerKey_) {
    goog.events.unlistenByKey(this.keyPressListenerKey_);
    this.keyPressListenerKey_ = null;
  }

  goog.base(this, 'setActive', active);

  if (active) {
    this.keyPressListenerKey_ = goog.events.listen(
      document,
      goog.events.EventType.KEYUP,
      this.handleKeyUp_,
      false,
      this
    );
    this.features_.forEach(this.addFeature_, this);
    this.listenerKeys_.push(ol.events.listen(this.features_,
        ol.CollectionEventType.ADD, this.handleFeatureAdd_, this));
    this.listenerKeys_.push(ol.events.listen(this.features_,
        ol.CollectionEventType.REMOVE, this.handleFeatureRemove_, this));

  } else {
    this.listenerKeys_.forEach(function(key) {
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
  var geometry = feature.getGeometry();
  goog.asserts.assertInstanceof(geometry, ol.geom.Geometry);

  feature.set('angle', 0);

  // Add the center icon to the overlay
  var uid = goog.getUid(feature);
  var point = new ol.geom.Point(this.getCenterCoordinate_(geometry));
  var centerFeature = new ol.Feature(point);
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
    this.dispatchEvent(new ol.interaction.ModifyEvent(
        ol.ModifyEventType.MODIFYSTART, this.features_, evt));
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
    var uid = goog.getUid(feature);

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
  goog.base(this, 'setMap', map);
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
ngeo.interaction.Rotate.prototype.handleFeatureAdd_ = function(evt) {
  var feature = evt.element;
  goog.asserts.assertInstanceof(feature, ol.Feature,
      'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
ngeo.interaction.Rotate.prototype.handleFeatureRemove_ = function(evt) {
  var feature = /** @type {ol.Feature} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @return {boolean} Start drag sequence?
 * @private
 */
ngeo.interaction.Rotate.prototype.handleDown_ = function(evt) {
  var map = evt.map;

  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      }, undefined);

  if (feature) {
    var found = false;
    this.features_.forEach(function(f) {
      if (goog.getUid(f) == goog.getUid(feature)) {
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
    var geometry = (this.feature_.getGeometry());
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

  var center;

  if (geometry instanceof ol.geom.LineString) {
    center = geometry.getFlatMidpoint();
  } else if (geometry instanceof ol.geom.Polygon) {
    center = geometry.getFlatInteriorPoint();
  } else {
    var extent = geometry.getExtent();
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

  var geometry = /** @type {ol.geom.SimpleGeometry} */
      (this.feature_.getGeometry());

  var oldX = this.coordinate_[0], oldY = this.coordinate_[1];

  var centerX = this.centerCoordinate_[0];
  var centerY = this.centerCoordinate_[1];

  var dx1 = oldX - centerX;
  var dy1 = oldY - centerY;
  var dx0 = evt.coordinate[0] - centerX;
  var dy0 = evt.coordinate[1] - centerY;

  this.coordinate_[0] = evt.coordinate[0];
  this.coordinate_[1] = evt.coordinate[1];

  var a0 = Math.atan2(dy0, dx0);
  var a1 = Math.atan2(dy1, dx1);
  var angle = a1 - a0;

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
 * @param {goog.events.Event} evt Event.
 * @private
 */
ngeo.interaction.Rotate.prototype.handleKeyUp_ = function(evt) {
  if (evt.keyCode === goog.events.KeyCodes.ESC) {
    this.setActive(false);
  }
};
