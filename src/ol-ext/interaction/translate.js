goog.provide('ngeo.interaction.Translate');

goog.require('goog.events.KeyCodes');
goog.require('ol.Feature');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');
goog.require('ol.interaction.Translate');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');


/**
 * An extension of the OpenLayers Translate interaction that adds the following
 * features to it:
 *
 * - show a small arrow icon in the middle of the features allowing a visual
 *   aspect that tells the user "this feature can be moved"
 * - pressing the ESC key automatically deactivate the interaction.
 *
 * @constructor
 * @struct
 * @extends {ol.interaction.Translate}
 * @param {ngeox.interaction.TranslateOptions} options Options.
 * @export
 */
ngeo.interaction.Translate = function(options) {

  /**
   * @type {!Array.<ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {!Object.<number, ol.EventsKey>}
   * @private
   */
  this.featureListenerKeys_ = {};

  /**
   * @type {?goog.events.Key}
   * @private
   */
  this.keyPressListenerKey_ = null;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.myFeatures_ = options.features !== undefined ? options.features : null;

  /**
   * @type {ol.source.Vector}
   * @private
   */
  this.vectorSource_ = new ol.source.Vector({
    useSpatialIndex: false
  });

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = new ol.layer.Vector({
    source: this.vectorSource_,
    style: options.style,
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  /**
   * @type {!Object.<number, ol.Feature>}
   * @private
   */
  this.centerFeatures_ = {};

  ol.interaction.Translate.call(
    this, /** @type {olx.interaction.TranslateOptions} */ (options));
};
ol.inherits(ngeo.interaction.Translate, ol.interaction.Translate);


/**
 * Activate or deactivate the interaction.
 * @param {boolean} active Active.
 * @export
 * @override
 */
ngeo.interaction.Translate.prototype.setActive = function(active) {

  if (this.keyPressListenerKey_) {
    goog.events.unlistenByKey(this.keyPressListenerKey_);
    this.keyPressListenerKey_ = null;
  }

  ol.interaction.Translate.prototype.setActive.call(this, active);

  if (active) {
    this.keyPressListenerKey_ = goog.events.listen(
      document,
      goog.events.EventType.KEYUP,
      this.handleKeyUp_,
      false,
      this
    );
  }

  this.setState_();
};


/**
 * Remove the interaction from its current map and attach it to the new map.
 * Subclasses may set up event handlers to get notified about changes to
 * the map here.
 * @param {ol.PluggableMap} map Map.
 * @override
 */
ngeo.interaction.Translate.prototype.setMap = function(map) {

  const currentMap = this.getMap();
  if (currentMap) {
    this.vectorLayer_.setMap(null);
  }

  ol.interaction.Translate.prototype.setMap.call(this, map);

  if (map) {
    this.vectorLayer_.setMap(map);
  }

  this.setState_();
};


/**
 * @private
 */
ngeo.interaction.Translate.prototype.setState_ = function() {
  const map = this.getMap();
  const active = this.getActive();
  const features = this.myFeatures_;
  const keys = this.listenerKeys_;

  if (map && active && features) {
    features.forEach(this.addFeature_, this);
    keys.push(ol.events.listen(features, ol.CollectionEventType.ADD,
      this.handleFeaturesAdd_, this));
    keys.push(ol.events.listen(features, ol.CollectionEventType.REMOVE,
      this.handleFeaturesRemove_, this));
  } else {

    if (map) {
      const elem = map.getTargetElement();
      elem.style.cursor = 'default';
    }

    keys.forEach((key) => {
      ol.events.unlistenByKey(key);
    }, this);
    features.forEach(this.removeFeature_, this);
  }
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
ngeo.interaction.Translate.prototype.handleFeaturesAdd_ = function(evt) {
  const feature = evt.element;
  goog.asserts.assertInstanceof(feature, ol.Feature,
    'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
ngeo.interaction.Translate.prototype.handleFeaturesRemove_ = function(evt) {
  const feature = /** @type {ol.Feature} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.interaction.Translate.prototype.addFeature_ = function(feature) {
  const uid = ol.getUid(feature);
  const geometry = feature.getGeometry();
  goog.asserts.assertInstanceof(geometry, ol.geom.Geometry);

  this.featureListenerKeys_[uid] = ol.events.listen(
    geometry,
    ol.events.EventType.CHANGE,
    this.handleGeometryChange_.bind(this, feature),
    this
  );

  const point = this.getGeometryCenterPoint_(geometry);
  const centerFeature = new ol.Feature(point);
  this.centerFeatures_[uid] = centerFeature;
  this.vectorSource_.addFeature(centerFeature);
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.interaction.Translate.prototype.removeFeature_ = function(feature) {
  const uid = ol.getUid(feature);
  if (this.featureListenerKeys_[uid]) {
    ol.events.unlistenByKey(this.featureListenerKeys_[uid]);
    delete this.featureListenerKeys_[uid];

    this.vectorSource_.removeFeature(this.centerFeatures_[uid]);
    delete this.centerFeatures_[uid];
  }
};


/**
 * @param {ol.Feature} feature Feature being moved.
 * @param {ol.events.Event} evt Event.
 * @private
 */
ngeo.interaction.Translate.prototype.handleGeometryChange_ = function(feature,
  evt) {
  const geometry = evt.target;
  goog.asserts.assertInstanceof(geometry, ol.geom.Geometry);

  const point = this.getGeometryCenterPoint_(geometry);
  const uid = ol.getUid(feature);
  this.centerFeatures_[uid].setGeometry(point);
};


/**
 * @param {ol.geom.Geometry} geometry Geometry.
 * @return {ol.geom.Point} The center point of the geometry.
 * @private
 */
ngeo.interaction.Translate.prototype.getGeometryCenterPoint_ = function(
  geometry) {

  let center;
  let point;

  if (geometry instanceof ol.geom.Polygon) {
    point = geometry.getInteriorPoint();
  } else if (geometry instanceof ol.geom.LineString) {
    center = geometry.getCoordinateAt(0.5);
  } else {
    const extent = geometry.getExtent();
    center = ol.extent.getCenter(extent);
  }

  if (!point && center) {
    point = new ol.geom.Point(center);
  }

  goog.asserts.assert(point, 'Point should be thruthy');

  return point;
};


/**
 * Deactivate this interaction if the ESC key is pressed.
 * @param {goog.events.Event} evt Event.
 * @private
 */
ngeo.interaction.Translate.prototype.handleKeyUp_ = function(evt) {
  if (evt.keyCode === goog.events.KeyCodes.ESC) {
    this.setActive(false);
  }
};
