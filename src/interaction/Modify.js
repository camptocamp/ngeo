import {deleteCondition} from 'ngeo/utils.js';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoInteractionModifyCircle from 'ngeo/interaction/ModifyCircle.js';
import ngeoInteractionModifyRectangle from 'ngeo/interaction/ModifyRectangle.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import * as olEvents from 'ol/events.js';
import {TRUE} from 'ol/functions.js';
import olInteractionInteraction from 'ol/interaction/Interaction.js';
import olCollection from 'ol/Collection.js';
import olInteractionModify from 'ol/interaction/Modify.js';
import olFeature from 'ol/Feature.js';


/**
 * @typedef {import("ngeo/CustomEvent.js").default.<{
 * @property {import("ol/Feature.js").default} features
 * }>} ModifyEvent
 */


/**
 * This interaction combines multiple kind of feature modification interactions
 * in order to be able to modify vector features depending on their geometry
 * type. The different kind of interactions supported are:
 *
 * - `ol.interaction.Modify`
 * - `ngeo.interaction.ModifyCircle`
 * - `ngeo.interaction.ModifyRectangle`
 *
 * This interaction receives a collection of features. Its job is to listen
 * to added/removed features to and from it and add them in the proper
 * collection that is uniquely used for each inner interaction. Those inner
 * interactions follow the `active` property of this interaction, i.e. when
 * this interaction is activated, so do the inner interactions. Since they will
 * never share the same feature, they don't collide with one an other.
 *
 * @constructor
 * @extends {import("ol/interaction/Interaction.js").default}
 * @param {olx.interaction.ModifyOptions} options Options.
 */
function Modify(options) {

  console.assert(options.features);

  /**
   * @type {!import("ol/Collection.js").Collection.<import("ol/Feature.js").default>}
   * @private
   */
  this.features_ = options.features;

  /**
   * @type {!Array.<import("ol/events.js").EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {Array.<import("ol/interaction/Interaction.js").default>}
   * @private
   */
  this.interactions_ = [];

  /**
   * @type {import("ol/Collection.js").Collection.<import("ol/Feature.js").default>}
   * @private
   */
  this.otherFeatures_ = new olCollection();

  this.interactions_.push(new olInteractionModify({
    deleteCondition: deleteCondition,
    features: this.otherFeatures_,
    pixelTolerance: options.pixelTolerance,
    style: options.style,
    wrapX: options.wrapX
  }));

  /**
   * @type {import("ol/Collection.js").Collection.<import("ol/Feature.js").default>}
   * @private
   */
  this.circleFeatures_ = new olCollection();

  this.interactions_.push(new ngeoInteractionModifyCircle({
    features: this.circleFeatures_,
    pixelTolerance: options.pixelTolerance,
    style: options.style,
    wrapX: options.wrapX
  }));

  /**
   * @type {import("ol/Collection.js").Collection.<import("ol/Feature.js").default>}
   * @private
   */
  this.rectangleFeatures_ = new olCollection();

  this.interactions_.push(new ngeoInteractionModifyRectangle({
    features: this.rectangleFeatures_,
    pixelTolerance: options.pixelTolerance,
    style: options.style,
    wrapX: options.wrapX
  }));


  olInteractionInteraction.call(this, {
    handleEvent: TRUE
  });

}

olUtilInherits(Modify, olInteractionInteraction);


/**
 * Activate or deactivate the interaction.
 * @param {boolean} active Active.
 * @override
 */
Modify.prototype.setActive = function(active) {
  olInteractionInteraction.prototype.setActive.call(this, active);
  this.setState_();
};


/**
 * Remove the interaction from its current map and attach it to the new map.
 * Subclasses may set up event handlers to get notified about changes to
 * the map here.
 * @param {import("ol/PluggableMap.js").default} map Map.
 * @override
 */
Modify.prototype.setMap = function(map) {

  const interactions = this.interactions_;

  const currentMap = this.getMap();
  if (currentMap) {
    interactions.forEach((interaction) => {
      currentMap.removeInteraction(interaction);
    });
  }

  olInteractionInteraction.prototype.setMap.call(this, map);

  if (map) {
    interactions.forEach((interaction) => {
      map.addInteraction(interaction);
    });
  }

  this.setState_();
};


/**
 * Toggle interactions.
 * @private
 */
Modify.prototype.setState_ = function() {
  const map = this.getMap();
  const active = this.getActive();
  const interactions = this.interactions_;
  const keys = this.listenerKeys_;

  interactions.forEach((interaction) => {
    interaction.setActive(active && !!map);
  });

  if (active && map) {
    this.features_.forEach(feature => this.addFeature_(feature));
    keys.push(
      olEvents.listen(this.features_, 'add', this.handleFeaturesAdd_, this),
      olEvents.listen(this.features_, 'remove', this.handleFeaturesRemove_, this)
    );
  } else {
    keys.forEach(olEvents.unlistenByKey);
    keys.length = 0;
    this.features_.forEach(feature => this.removeFeature_(feature));
  }
};


/**
 * @param {import("ol/Collection/Event.js").default} evt Event.
 * @private
 */
Modify.prototype.handleFeaturesAdd_ = function(evt) {
  const feature = evt.element;
  console.assert(feature instanceof olFeature, 'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {import("ol/Collection/Event.js").default} evt Event.
 * @private
 */
Modify.prototype.handleFeaturesRemove_ = function(evt) {
  const feature = /** @type {import("ol/Feature.js").default} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {import("ol/Feature.js").default} feature Feature.
 * @private
 */
Modify.prototype.addFeature_ = function(feature) {
  const collection = this.getFeatureCollection_(feature);
  collection.push(feature);
};


/**
 * @param {import("ol/Feature.js").default} feature Feature.
 * @private
 */
Modify.prototype.removeFeature_ = function(feature) {
  const collection = this.getFeatureCollection_(feature);
  collection.remove(feature);
};


/**
 * @param {import("ol/Feature.js").default} feature Feature.
 * @return {import("ol/Collection.js").Collection.<import("ol/Feature.js").default>} Collection of features for this feature.
 * @private
 */
Modify.prototype.getFeatureCollection_ = function(feature) {
  let features;
  const isCircle = feature.get(ngeoFormatFeatureProperties.IS_CIRCLE);
  const isRectangle = feature.get(ngeoFormatFeatureProperties.IS_RECTANGLE);
  if (isCircle === true || isCircle === 'true') {
    features = this.circleFeatures_;
  } else if (isRectangle === true || isRectangle === 'true') {
    features = this.rectangleFeatures_;
  } else {
    features = this.otherFeatures_;
  }
  return features;
};


export default Modify;
