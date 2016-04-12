goog.provide('ngeo.interaction.Modify');

goog.require('ol.interaction.Interaction');
goog.require('ol.Collection');
goog.require('ol.interaction.Modify');


/**
 * This interaction combines multiple kind of feature modification interactions
 * in order to be able to modify vector features depending on their geometry
 * type. The different kind of interactions supported are:
 *
 * - `ol.interaction.Modify`
 * - `ngeo.interaction.ModifyCircle`
 * - `ngeo.interaction.ModifyCircle`
 *
 * This interaction receives a collection of features. Its job is to listen
 * to added/removed features to and from it and add them in the proper
 * collection that is uniquely used for each inner interaction. Those inner
 * interactions follow the `active` property of this interaction, i.e. when
 * this interaction is activated, so do the inner interactions. Since they will
 * never share the same feature, they don't collide with one an other.
 *
 * @constructor
 * @extends {ol.interaction.Interaction}
 * @param {ngeo.interaction.MeasureBaseOptions} options Options.
 * @export
 */
ngeo.interaction.Modify = function(options) {

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.features_ = options.features;

  /**
   * @type {!Array.<ol.events.Key>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {Array.<ol.interaction.Interaction>}
   * @private
   */
  this.interactions_ = [];

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.otherFeatures_ = new ol.Collection();

  this.interactions_.push(new ol.interaction.Modify({
    features: this.otherFeatures_
  }));

  goog.base(this, {
    handleEvent: goog.functions.TRUE
  });

};
goog.inherits(ngeo.interaction.Modify, ol.interaction.Interaction);


/**
 * Activate or deactivate the interaction.
 * @param {boolean} active Active.
 * @export
 */
ngeo.interaction.Modify.prototype.setActive = function(active) {
  goog.base(this, 'setActive', active);
  this.setState_();
};


/**
 * Remove the interaction from its current map and attach it to the new map.
 * Subclasses may set up event handlers to get notified about changes to
 * the map here.
 * @param {ol.Map} map Map.
 */
ngeo.interaction.Modify.prototype.setMap = function(map) {

  var interactions = this.interactions_;

  var currentMap = this.getMap();
  if (currentMap) {
    interactions.forEach(function(interaction) {
      currentMap.removeInteraction(interaction);
    }, this);
  }

  goog.base(this, 'setMap', map);

  if (map) {
    interactions.forEach(function(interaction) {
      map.addInteraction(interaction);
    }, this);
  }

  this.setState_();
};


/**
 * Toggle interactions.
 * @private
 */
ngeo.interaction.Modify.prototype.setState_ = function() {
  var map = this.getMap();
  var active = this.getActive();
  var interactions = this.interactions_;
  var keys = this.listenerKeys_;

  interactions.forEach(function(interaction) {
    interaction.setActive(active && !!map);
  }, this);

  if (active && map) {
    this.features_.forEach(this.addFeature_, this);
    keys.push(ol.events.listen(this.features_, ol.CollectionEventType.ADD,
        this.handleFeaturesAdd_, this));
    keys.push(ol.events.listen(this.features_, ol.CollectionEventType.REMOVE,
        this.handleFeaturesRemove_, this));
  } else {
    keys.forEach(function(key) {
      ol.events.unlistenByKey(key);
    }, this);
    this.features_.forEach(this.removeFeature_, this);
  }
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
ngeo.interaction.Modify.prototype.handleFeaturesAdd_ = function(evt) {
  var feature = evt.element;
  goog.asserts.assertInstanceof(feature, ol.Feature,
      'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
ngeo.interaction.Modify.prototype.handleFeaturesRemove_ = function(evt) {
  var feature = /** @type {ol.Feature} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.interaction.Modify.prototype.addFeature_ = function(feature) {
  var collection = this.getFeatureCollection_(feature);
  collection.push(feature);
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.interaction.Modify.prototype.removeFeature_ = function(feature) {
  var collection = this.getFeatureCollection_(feature);
  collection.remove(feature);
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {ol.Collection.<ol.Feature>} Collection of features for this feature.
 * @private
 */
ngeo.interaction.Modify.prototype.getFeatureCollection_ = function(feature) {
  // FIXME - update when more than one interaction is supported here
  return this.otherFeatures_;
};
