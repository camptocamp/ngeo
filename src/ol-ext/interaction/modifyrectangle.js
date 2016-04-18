goog.provide('ngeo.interaction.ModifyRectangle');

goog.require('goog.asserts');
goog.require('ol');
goog.require('ol.Collection');
goog.require('ol.CollectionEventType');
goog.require('ol.Feature');
goog.require('ol.MapBrowserPointerEvent');
goog.require('ol.events');
goog.require('ol.extent');
goog.require('ol.geom.GeometryType');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');
goog.require('ol.interaction.ModifyEvent');
goog.require('ol.interaction.Pointer');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');


/**
 * @typedef {{depth: (Array.<number>|undefined),
 *            feature: ol.Feature,
 *            geometry: ol.geom.SimpleGeometry,
 *            index: (number|undefined),
 *            segment: Array.<ol.Extent>}}
 */
ol.interaction.SegmentDataType;


/**
 * @classdesc
 * Interaction for modifying feature geometries.
 *
 * @constructor
 * @extends {ol.interaction.Pointer}
 * @param {ngeox.interaction.ModifyRectangleOptions} options Options.
 * @fires ngeo.interaction.ModifyCircleEvent
 * @export
 * @api
 */
ngeo.interaction.ModifyRectangle = function(options) {

  goog.base(this, {
    handleDownEvent: ngeo.interaction.ModifyRectangle.handleDownEvent_,
    handleDragEvent: ngeo.interaction.ModifyRectangle.handleDragEvent_,
    handleUpEvent: ngeo.interaction.ModifyRectangle.handleUpEvent_
  });

  /**
   * @type {boolean}
   * @private
   */
  this.modified_ = false;

  /**
   * Indicate whether the interaction is currently changing a feature's
   * coordinates.
   * @type {boolean}
   * @private
   */
  this.changingFeature_ = false;
  // actionInProgress_

  /**
   * @type {number}
   * @private
   */
  this.pixelTolerance_ = options.pixelTolerance !== undefined ?
      options.pixelTolerance : 10;

  // Get the style for the box and the points
  var stylePolygon = null;
  var stylePoint = null;
  if (options.style) {
    stylePolygon = options.style[ol.geom.GeometryType.POLYGON];
    stylePoint = options.style[ol.geom.GeometryType.POINT];
  } else {
    stylePolygon = ngeo.interaction.ModifyRectangle.getDefaultStyleFunction(ol.geom.GeometryType.POLYGON);

    stylePoint = ngeo.interaction.ModifyRectangle.getDefaultStyleFunction(ol.geom.GeometryType.POINT);

  }

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorBoxes_ = new ol.layer.Vector({
    source: new ol.source.Vector({
      wrapX: !!options.wrapX
    }),
    style: stylePolygon,
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorPoints_ = new ol.layer.Vector({
    source: new ol.source.Vector({
      wrapX: !!options.wrapX
    }),
    style: stylePoint,
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

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

  this.features_.forEach(this.addFeature_, this);
  ol.events.listen(this.features_, ol.CollectionEventType.ADD,
      this.handleFeatureAdd_, this);
  ol.events.listen(this.features_, ol.CollectionEventType.REMOVE,
      this.handleFeatureRemove_, this);

};
goog.inherits(ngeo.interaction.ModifyRectangle, ol.interaction.Pointer);


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.interaction.ModifyRectangle.prototype.addFeature_ = function(feature) {
  var featureGeom = feature.getGeometry();
  if (featureGeom instanceof ol.geom.Polygon) {
    var boxSource = this.vectorBoxes_.getSource();
    var pointSource = this.vectorPoints_.getSource();
    boxSource.addFeature(feature);

    // from each corners, create a point feature and add it to the point layer.
    // each point is then associated with 2 siblings in order to update the
    // siblings geometry at the same time when a point gets dragged around.
    // mark each one as 'corner'
    var corners = featureGeom.getCoordinates()[0];
    var pointFeatures = [];
    var cornerPoint;
    var cornerFeature;
    goog.array.forEach(corners, function(corner) {
      cornerPoint = new ol.geom.Point(corner);
      cornerFeature = new ol.Feature({
        'corner': true,
        'geometry': cornerPoint,
        'siblingX': null,
        'siblingY': null
      });
      ol.events.listen(cornerPoint, ol.events.EventType.CHANGE,
          goog.bind(this.handleCornerGeometryChange_, this, cornerFeature), this);

      pointFeatures.push(cornerFeature);
    }, this);

    var previousFeature;
    var nextFeature;
    goog.array.forEach(pointFeatures, function(cornerFeature, index) {
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
};


/**
 * Callback method fired when the geometry of one of the corner features is
 * changed.  Change the siblings geometry accordingly.  Prevent handling
 * corner geometry change if an other action is already in progress,
 * i.e. an other feature (corner or center) is already being dragged.
 *
 * @param {ol.Feature} feature the corner feature
 * @param {goog.events.Event} event event
 * @private
 */
ngeo.interaction.ModifyRectangle.prototype.handleCornerGeometryChange_ = function(
    feature, event) {

  if (this.changingFeature_) {
    return;
  }

  this.changingFeature_ = true;

  // update the siblings coordinates
  var point = feature.getGeometry();
  goog.asserts.assertInstanceof(point, ol.geom.Point);
  var coordinates = /** @type {ol.geom.Point} */ (point).getCoordinates();

  var siblingX = feature.get('siblingX');
  goog.asserts.assertInstanceof(siblingX, ol.Feature);
  var siblingXPoint = siblingX.getGeometry();
  goog.asserts.assertInstanceof(siblingXPoint, ol.geom.Point);
  siblingXPoint.setCoordinates([
    siblingXPoint.getCoordinates()[0],
    coordinates[1]
  ]);

  var siblingY = feature.get('siblingY');
  goog.asserts.assertInstanceof(siblingY, ol.Feature);
  var siblingYPoint = siblingY.getGeometry();
  goog.asserts.assertInstanceof(siblingYPoint, ol.geom.Point);
  siblingYPoint.setCoordinates([
    coordinates[0],
    siblingYPoint.getCoordinates()[1]
  ]);

  // update box
  var boxExtent = ol.extent.createEmpty();
  var pointFeatures = this.vectorPoints_.getSource().getFeatures();
  goog.array.forEach(pointFeatures, function(pointFeature) {
    point = pointFeature.getGeometry();
    ol.extent.extendCoordinate(boxExtent, /** @type {ol.geom.Point} */ (point).getCoordinates());
  });

  var corners = [];
  ol.extent.forEachCorner(boxExtent, function(corner) {
    corners.push(corner);
  }, this);
  var boxCoordinates = goog.array.concat(corners, [corners[0]]);

  var boxFeatures = this.vectorBoxes_.getSource().getFeatures();
  goog.array.forEach(boxFeatures, function(boxFeature) {
    var geom = boxFeature.getGeometry();
    goog.asserts.assertInstanceof(geom, ol.geom.Polygon);
    geom.setCoordinates([boxCoordinates]);
  }, this);


  this.changingFeature_ = false;
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Map browser event
 * @private
 */
ngeo.interaction.ModifyRectangle.prototype.willModifyFeatures_ = function(evt) {
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
ngeo.interaction.ModifyRectangle.prototype.removeFeature_ = function(feature) {
  ol.events.unlisten(feature, ol.events.EventType.CHANGE,
      this.handleFeatureChange_, this);
};


/**
 * @inheritDoc
 */
ngeo.interaction.ModifyRectangle.prototype.setMap = function(map) {
  this.vectorBoxes_.setMap(map);
  this.vectorPoints_.setMap(map);
  goog.base(this, 'setMap', map);
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
ngeo.interaction.ModifyRectangle.prototype.handleFeatureAdd_ = function(evt) {
  var feature = evt.element;
  goog.asserts.assertInstanceof(feature, ol.Feature,
      'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {ol.events.Event} evt Event.
 * @private
 */
ngeo.interaction.ModifyRectangle.prototype.handleFeatureChange_ = function(evt) {
  if (!this.changingFeature_) {
    var feature = /** @type {ol.Feature} */ (evt.target);
    this.removeFeature_(feature);
    this.addFeature_(feature);
  }
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
ngeo.interaction.ModifyRectangle.prototype.handleFeatureRemove_ = function(evt) {
  var feature = /** @type {ol.Feature} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @return {boolean} Start drag sequence?
 * @this {ngeo.interaction.ModifyRectangle}
 * @private
 */
ngeo.interaction.ModifyRectangle.handleDownEvent_ = function(evt) {
  var map = evt.map;

  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      }, undefined);

  if (feature && feature.getGeometry() instanceof ol.geom.Point) {
    this.coordinate_ = evt.coordinate;
    this.feature_ = feature;

    return true;
  }

  return false;
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @this {ngeo.interaction.ModifyRectangle}
 * @private
 */
ngeo.interaction.ModifyRectangle.handleDragEvent_ = function(evt) {
  this.willModifyFeatures_(evt);

  var geometry = /** @type {ol.geom.SimpleGeometry} */
      (this.feature_.getGeometry());

  if (geometry instanceof ol.geom.Point) {
    var deltaX = evt.coordinate[0] - this.coordinate_[0];
    var deltaY = evt.coordinate[1] - this.coordinate_[1];

    geometry.translate(deltaX, deltaY);

    this.coordinate_[0] = evt.coordinate[0];
    this.coordinate_[1] = evt.coordinate[1];
  }
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @return {boolean} Stop drag sequence?
 * @this {ngeo.interaction.ModifyRectangle}
 * @private
 */
ngeo.interaction.ModifyRectangle.handleUpEvent_ = function(evt) {
  if (this.modified_) {
    this.dispatchEvent(new ol.interaction.ModifyEvent(
        ol.ModifyEventType.MODIFYEND, this.features_, evt));
    this.modified_ = false;
  }
  return false;
};


/**
 * @param {ol.geom.GeometryType<string>} featureType What geom type's style to get
 * @return {ol.style.StyleFunction} Styles.
 */
ngeo.interaction.ModifyRectangle.getDefaultStyleFunction = function(featureType) {
  var style = ol.style.createDefaultEditingStyles();
  return function(feature, resolution) {
    return style[featureType];
  };
};
