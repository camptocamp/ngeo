goog.provide('ngeo.interaction.MobileDraw');

goog.require('ol.events');
goog.require('ol.Feature');
goog.require('ol.functions');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.geom.SimpleGeometry');
goog.require('ol.interaction.Draw');
goog.require('ol.interaction.Interaction');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');


/**
 * @enum {string}
 */
ngeo.interaction.MobileDrawProperty = {
  DIRTY: 'dirty',
  DRAWING: 'drawing',
  VALID: 'valid'
};


/**
 * @classdesc
 * Interaction for drawing feature geometries from a mobile device using the
 * center of the map view as entry for points added.
 *
 * Supports:
 * - point
 * - line string
 *
 * @constructor
 * @struct
 * @fires ol.interaction.Draw.Event
 * @extends {ol.interaction.Interaction}
 * @param {ngeox.interaction.MobileDrawOptions} options Options
 */
ngeo.interaction.MobileDraw = function(options) {

  ol.interaction.Interaction.call(this, {
    handleEvent: ol.functions.TRUE
  });

  /**
   * The key for view center change event.
   * @type {?ol.EventsKey}
   * @private
   */
  this.changeEventKey_ = null;

  /**
   * Geometry type.
   * @type {ol.geom.GeometryType}
   * @private
   */
  this.type_ = options.type;

  /**
   * The number of points that must be drawn before a polygon ring or line
   * string can be finished.  The default is 3 for polygon rings and 2 for
   * line strings.
   * @type {number}
   * @private
   */
  this.minPoints_ = options.minPoints ?
    options.minPoints :
    (this.type_ === 'Polygon' ? 3 : 2);

  /**
   * Sketch feature.
   * @type {ol.Feature}
   * @private
   */
  this.sketchFeature_ = null;

  /**
   * Previous sketch points, saved to be able to display them on the layer.
   * @type {Array.<ol.Feature>}
   * @private
   */
  this.sketchPoints_ = [];

  /**
   * Current sketch point.
   * @type {ol.Feature}
   * @private
   */
  this.sketchPoint_ = null;

  /**
   * Draw overlay where our sketch features are drawn.
   * @type {ol.layer.Vector}
   * @private
   */
  this.overlay_ = new ol.layer.Vector({
    source: new ol.source.Vector({
      useSpatialIndex: false,
      wrapX: options.wrapX ? options.wrapX : false
    }),
    style: options.style ? options.style :
      ol.interaction.Draw.getDefaultStyleFunction(),
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  ol.events.listen(this, 'change:active', this.updateState_, this);

  this.set(ngeo.interaction.MobileDrawProperty.DIRTY, false);
  this.set(ngeo.interaction.MobileDrawProperty.DRAWING, false);
  this.set(ngeo.interaction.MobileDrawProperty.VALID, false);

};
ol.inherits(ngeo.interaction.MobileDraw, ol.interaction.Interaction);


/**
 * @inheritDoc
 */
ngeo.interaction.MobileDraw.prototype.setMap = function(map) {

  const currentMap = this.getMap();
  if (currentMap) {
    if (this.changeEventKey_) {
      ol.events.unlistenByKey(this.changeEventKey_);
    }
  }

  ol.interaction.Interaction.prototype.setMap.call(this, map);

  if (map) {
    this.changeEventKey_ = ol.events.listen(map.getView(),
      'change:center',
      this.handleViewCenterChange_, this);
  }

  this.updateState_();
};


// === PUBLIC METHODS - PROPERTY GETTERS ===


/**
 * Return whether the interaction is currently dirty. It is if the sketch
 * feature has its geometry last coordinate set to the center without the
 * use of the `addToDrawing` method.
 * @return {boolean} `true` if the interaction is dirty, `false` otherwise.
 * @observable
 */
ngeo.interaction.MobileDraw.prototype.getDirty = function() {
  return /** @type {boolean} */ (
    this.get(ngeo.interaction.MobileDrawProperty.DIRTY));
};


/**
 * Return whether the interaction is currently drawing.
 * @return {boolean} `true` if the interaction is drawing, `false` otherwise.
 * @observable
 */
ngeo.interaction.MobileDraw.prototype.getDrawing = function() {
  return /** @type {boolean} */ (
    this.get(ngeo.interaction.MobileDrawProperty.DRAWING));
};


/**
 * Return whether the interaction as a valid sketch feature, i.e. its geometry
 * is valid.
 * @return {boolean} `true` if the interaction has a valid sketch feature,
 *     `false` otherwise.
 * @observable
 */
ngeo.interaction.MobileDraw.prototype.getValid = function() {
  return /** @type {boolean} */ (
    this.get(ngeo.interaction.MobileDrawProperty.VALID));
};


/**
 * Returns the current sketch feature.
 * @return {?ol.Feature} The sketch feature, or null if none.
 */
ngeo.interaction.MobileDraw.prototype.getFeature = function() {
  return this.sketchFeature_;
};


// === PUBLIC METHODS ===


/**
 * Add current sketch point to sketch feature if the latter exists, else create
 * it.
 */
ngeo.interaction.MobileDraw.prototype.addToDrawing = function() {

  // no need to do anything if interaction is not active, nor drawing
  const active = this.getActive();
  const drawing = this.getDrawing();

  if (!active || !drawing) {
    return;
  }

  let sketchFeatureGeom;
  const sketchPointGeom = this.getSketchPointGeometry_();
  const coordinate = sketchPointGeom.getCoordinates();
  let coordinates;

  // == point ==
  if (this.type_ === 'Point') {
    if (!this.sketchFeature_) {
      this.sketchFeature_ = new ol.Feature(new ol.geom.Point(coordinate));
      this.dispatchEvent(new ol.interaction.Draw.Event(
        /** @type {ol.interaction.DrawEventType} */ ('drawstart'), this.sketchFeature_));
    }
    sketchFeatureGeom = this.sketchFeature_.getGeometry();
    goog.asserts.assertInstanceof(sketchFeatureGeom, ol.geom.SimpleGeometry);
    sketchFeatureGeom.setCoordinates(coordinate);
    return;
  }

  // == line string ==
  if (this.type_ === 'LineString') {
    this.sketchPoints_.push(this.sketchPoint_);
    if (!this.sketchFeature_) {
      coordinates = [coordinate.slice(), coordinate.slice()];
      this.sketchFeature_ = new ol.Feature(new ol.geom.LineString(coordinates));
      this.dispatchEvent(new ol.interaction.Draw.Event(
        /** @type {ol.interaction.DrawEventType} */ ('drawstart'), this.sketchFeature_));
    } else {
      sketchFeatureGeom = this.sketchFeature_.getGeometry();
      goog.asserts.assertInstanceof(sketchFeatureGeom, ol.geom.SimpleGeometry);
      coordinates = sketchFeatureGeom.getCoordinates();
      coordinates.push(coordinate.slice());
      sketchFeatureGeom.setCoordinates(coordinates);
    }
  }

  const dirty = this.getDirty();
  if (dirty) {
    this.set(ngeo.interaction.MobileDrawProperty.DIRTY, false);
  }

  // minPoints validation
  const valid = this.getValid();
  if (this.type_ === 'LineString') {
    if (coordinates.length >= this.minPoints_) {
      if (!valid) {
        this.set(ngeo.interaction.MobileDrawProperty.VALID, true);
      }
    } else {
      if (valid) {
        this.set(ngeo.interaction.MobileDrawProperty.VALID, false);
      }
    }
  }

  // reset sketch point
  this.sketchPoint_ = null;

  // update sketch features
  this.updateSketchFeatures_();
};


/**
 * Clear the drawing
 */
ngeo.interaction.MobileDraw.prototype.clearDrawing = function() {
  this.setActive(false);
  this.setActive(true);
};


/**
 * Finish drawing. If there's a sketch point, it's added first.
 */
ngeo.interaction.MobileDraw.prototype.finishDrawing = function() {

  // no need to do anything if interaction is not active, nor drawing
  const active = this.getActive();
  const drawing = this.getDrawing();

  if (!active || !drawing) {
    return;
  }

  if (this.sketchPoint_) {
    this.addToDrawing();
  }

  this.set(ngeo.interaction.MobileDrawProperty.DRAWING, false);

  this.dispatchEvent(new ol.interaction.Draw.Event(
    /** @type {ol.interaction.DrawEventType} */ ('drawend'), this.sketchFeature_));
};


// === PRIVATE METHODS ===


/**
 * Start drawing by adding the sketch point first.
 * @private
 */
ngeo.interaction.MobileDraw.prototype.startDrawing_ = function() {
  this.set(ngeo.interaction.MobileDrawProperty.DRAWING, true);
  this.createOrUpdateSketchPoint_();
  this.updateSketchFeatures_();

  if (this.type_ === 'Point') {
    this.addToDrawing();
  }
};


/**
 * Modify the geometry of the sketch feature to have its last coordinate
 * set to the center of the map.
 * @private
 */
ngeo.interaction.MobileDraw.prototype.modifyDrawing_ = function() {
  if (!this.sketchFeature_) {
    return;
  }

  const center = this.getCenter_();

  if (this.type_ === 'LineString') {
    const sketchFeatureGeom = this.sketchFeature_.getGeometry();
    goog.asserts.assertInstanceof(sketchFeatureGeom, ol.geom.SimpleGeometry);
    const coordinates = sketchFeatureGeom.getCoordinates();
    coordinates.pop();
    coordinates.push(center);
    sketchFeatureGeom.setCoordinates(coordinates);
  }

  const dirty = this.getDirty();
  if (!dirty) {
    this.set(ngeo.interaction.MobileDrawProperty.DIRTY, true);
  }

};


/**
 * Stop drawing without adding the sketch feature to the target layer.
 * @return {?ol.Feature} The sketch feature (or null if none).
 * @private
 */
ngeo.interaction.MobileDraw.prototype.abortDrawing_ = function() {
  const sketchFeature = this.sketchFeature_;
  if (sketchFeature || this.sketchPoints_.length > 0) {
    this.sketchFeature_ = null;
    this.sketchPoint_ = null;
    this.overlay_.getSource().clear(true);
  }
  this.sketchPoints_ = [];
  this.set(ngeo.interaction.MobileDrawProperty.DIRTY, false);
  this.set(ngeo.interaction.MobileDrawProperty.DRAWING, false);
  this.set(ngeo.interaction.MobileDrawProperty.VALID, false);
  return sketchFeature;
};


/**
 * @private
 */
ngeo.interaction.MobileDraw.prototype.updateState_ = function() {
  const map = this.getMap();
  const active = this.getActive();
  if (!map || !active) {
    this.abortDrawing_();
  } else {
    this.startDrawing_();
  }
  this.overlay_.setMap(active ? map : null);
};


/**
 * @param {ol.Object.Event} evt Event.
 * @private
 */
ngeo.interaction.MobileDraw.prototype.handleViewCenterChange_ = function(evt) {
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
};


/**
 * @private
 */
ngeo.interaction.MobileDraw.prototype.createOrUpdateSketchPoint_ = function() {
  const center = this.getCenter_();

  if (this.sketchPoint_) {
    const geometry = this.getSketchPointGeometry_();
    geometry.setCoordinates(center);
  } else {
    this.sketchPoint_ = new ol.Feature(new ol.geom.Point(center));
  }

};


/**
 * Redraw the sketch features.
 * @private
 */
ngeo.interaction.MobileDraw.prototype.updateSketchFeatures_ = function() {
  const sketchFeatures = [];
  if (this.sketchFeature_) {
    sketchFeatures.push(this.sketchFeature_);
  }
  if (this.sketchPoint_) {
    sketchFeatures.push(this.sketchPoint_);
  }
  const overlaySource = this.overlay_.getSource();
  overlaySource.clear(true);
  overlaySource.addFeatures(sketchFeatures);
  overlaySource.addFeatures(this.sketchPoints_);
};


/**
 * Returns the geometry of the sketch point feature.
 * @return {ol.geom.Point} Point.
 * @private
 */
ngeo.interaction.MobileDraw.prototype.getSketchPointGeometry_ = function() {
  goog.asserts.assert(this.sketchPoint_, 'sketch point should be thruty');
  const geometry = this.sketchPoint_.getGeometry();
  goog.asserts.assertInstanceof(geometry, ol.geom.Point);
  return geometry;
};


/**
 * Returns the center of the map view
 * @return {ol.Coordinate} Coordinate.
 * @private
 */
ngeo.interaction.MobileDraw.prototype.getCenter_ = function() {
  const center = this.getMap().getView().getCenter();
  goog.asserts.assertArray(center);
  return center;
};
