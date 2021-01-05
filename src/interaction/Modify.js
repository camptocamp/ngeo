// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

import {deleteCondition} from 'ngeo/utils.js';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoInteractionModifyCircle from 'ngeo/interaction/ModifyCircle.js';
import ngeoInteractionModifyRectangle from 'ngeo/interaction/ModifyRectangle.js';
import {listen, unlistenByKey} from 'ol/events.js';
import {TRUE} from 'ol/functions.js';
import olInteractionInteraction from 'ol/interaction/Interaction.js';
import olCollection from 'ol/Collection.js';
import olInteractionModify from 'ol/interaction/Modify.js';
import olFeature from 'ol/Feature.js';
import {CollectionEvent} from 'ol/Collection.js';

/**
 * @typedef {Object} ModifyEventItem
 * @property {olFeature<import("ol/geom/Geometry.js").default>} features
 */

/**
 * @typedef {import("ngeo/CustomEvent.js").default<ModifyEventItem>} ModifyEvent
 */

/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] From ol/interaction/Modify.Options.
 * @property {import("../events/condition.js").Condition} [deleteCondition] From ol/interaction/Modify.Options.
 * @property {import("../events/condition.js").Condition} [insertVertexCondition] From ol/interaction/Modify.Options.
 * @property {number} [pixelTolerance=10] From ol/interaction/Modify.Options.
 * @property {import("../style/Style.js").StyleLike} [style] From ol/interaction/Modify.Options.
 * @property {VectorSource} [source] From ol/interaction/Modify.Options.
 * @property {Collection<Feature>} [features] From ol/interaction/Modify.Options.
 * @property {boolean} [wrapX=false] From ol/interaction/Modify.Options.
 * @property {number} [nbPoints=64] The number of points in the circle.
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
 * @hidden
 */
export default class extends olInteractionInteraction {
  /**
   * @param {Options} options Options.
   */
  constructor(options) {
    super({
      handleEvent: TRUE,
    });
    console.assert(options.features);

    /**
     * @type {import("ol/Collection.js").default<olFeature<import("ol/geom/Geometry.js").default>>}
     * @private
     */
    this.features_ = options.features;

    /**
     * @type {Array<import("ol/events.js").EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * @type {Array<import("ol/interaction/Interaction.js").default>}
     * @private
     */
    this.interactions_ = [];

    /**
     * @type {import("ol/Collection.js").default<olFeature<import("ol/geom/Geometry.js").default>>}
     * @private
     */
    this.otherFeatures_ = new olCollection();

    this.interactions_.push(
      new olInteractionModify({
        deleteCondition: deleteCondition,
        features: this.otherFeatures_,
        pixelTolerance: options.pixelTolerance,
        style: options.style,
        wrapX: options.wrapX,
      })
    );

    /**
     * @type {import("ol/Collection.js").default<olFeature<import("ol/geom/Geometry.js").default>>}
     * @private
     */
    this.circleFeatures_ = new olCollection();

    this.interactions_.push(
      new ngeoInteractionModifyCircle({
        features: this.circleFeatures_,
        pixelTolerance: options.pixelTolerance,
        style: options.style,
        wrapX: options.wrapX,
        nbPoints: options.nbPoints,
      })
    );

    /**
     * @type {import("ol/Collection.js").default<olFeature<import("ol/geom/Geometry.js").default>>}
     * @private
     */
    this.rectangleFeatures_ = new olCollection();

    this.interactions_.push(
      new ngeoInteractionModifyRectangle({
        features: this.rectangleFeatures_,
        pixelTolerance: options.pixelTolerance,
        style: options.style,
        wrapX: options.wrapX,
      })
    );
  }

  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @override
   */
  setActive(active) {
    super.setActive.call(this, active);
    this.setState_();
  }

  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("ol/PluggableMap.js").default} map Map.
   * @override
   */
  setMap(map) {
    const interactions = this.interactions_;

    const currentMap = this.getMap();
    if (currentMap) {
      interactions.forEach((interaction) => {
        currentMap.removeInteraction(interaction);
      });
    }

    super.setMap.call(this, map);

    if (map) {
      interactions.forEach((interaction) => {
        map.addInteraction(interaction);
      });
    }

    this.setState_();
  }

  /**
   * Toggle interactions.
   * @private
   */
  setState_() {
    const map = this.getMap();
    const active = this.getActive();
    const interactions = this.interactions_;
    const keys = this.listenerKeys_;

    if (!interactions || !keys) {
      return;
    }

    interactions.forEach((interaction) => {
      interaction.setActive(active && !!map);
    });

    if (active && map) {
      this.features_.forEach((feature) => this.addFeature_(feature));
      keys.push(
        listen(this.features_, 'add', this.handleFeaturesAdd_, this),
        listen(this.features_, 'remove', this.handleFeaturesRemove_, this)
      );
    } else {
      keys.forEach(unlistenByKey);
      keys.length = 0;
      this.features_.forEach((feature) => this.removeFeature_(feature));
    }
  }

  /**
   * @param {Event|import('ol/events/Event.js').default} evt Event.
   * @private
   */
  handleFeaturesAdd_(evt) {
    if (evt instanceof CollectionEvent) {
      const feature = evt.element;
      console.assert(feature instanceof olFeature, 'feature should be an ol.Feature');
      this.addFeature_(feature);
    }
  }

  /**
   * @param {Event|import('ol/events/Event.js').default} evt Event.
   * @private
   */
  handleFeaturesRemove_(evt) {
    if (evt instanceof CollectionEvent) {
      /**
       * @type {olFeature<import("ol/geom/Geometry.js").default>}
       */
      const feature = evt.element;
      this.removeFeature_(feature);
    }
  }

  /**
   * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
   * @private
   */
  addFeature_(feature) {
    const collection = this.getFeatureCollection_(feature);
    collection.push(feature);
  }

  /**
   * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
   * @private
   */
  removeFeature_(feature) {
    const collection = this.getFeatureCollection_(feature);
    collection.remove(feature);
  }

  /**
   * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
   * @return {import("ol/Collection.js").default<olFeature<import("ol/geom/Geometry.js").default>>} Collection of features for
   *    this feature.
   * @private
   */
  getFeatureCollection_(feature) {
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
  }
}
