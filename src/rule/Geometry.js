// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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

import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleRule from 'ngeo/rule/Rule.js';
import {listen, unlistenByKey} from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';

/**
 * extends import('ngeo/rule/Rule.js').RuleOptions
 * @typedef {Object} GeometryOptions
 * @property {Object<string, *>} [featureProperties] Properties for the feature.
 * @property {boolean} [active=false] (RuleOptions)
 * @property {number|string} [expression] (RuleOptions)
 * @property {boolean} [isCustom] (RuleOptions)
 * @property {number} [lowerBoundary] (RuleOptions)
 * @property {string} name (RuleOptions)
 * @property {string} [operator] (RuleOptions)
 * @property {string[]} [operators] (RuleOptions)
 * @property {string} propertyName (RuleOptions)
 * @property {string} [type] (RuleOptions)
 * @property {number} [upperBoundary] (RuleOptions)
 */

/**
 * @hidden
 */
export default class extends ngeoRuleRule {
  /**
   * A rule bound to the geometry of a `ol.Feature` object. Changes made
   * to the geometry are applied to the `expression` property of the rule.
   *
   * @param {GeometryOptions} options Options.
   */
  constructor(options) {
    options.type = ngeoFormatAttributeType.GEOMETRY;

    super(options);

    // === STATIC properties ===

    const properties = options.featureProperties || {};

    /**
     * @private
     */
    this.feature_ = new olFeature(properties);

    /**
     * @type {import("ol/format/GeoJSON.js").default}
     * @private
     */
    this.format_ = new olFormatGeoJSON();

    /**
     * @type {boolean}
     * @private
     */
    this.updatingExpression_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.updatingGeometry_ = false;

    /**
     * @type {?import("ol/events.js").EventsKey}
     * @private
     */
    this.geometryChangeListenerKey_ = null;

    this.listenerKeys.push(
      listen(
        this.feature_,
        `change:${this.feature.getGeometryName()}`,
        this.handleFeatureGeometryChange_,
        this
      )
    );

    this.setGeometryFromExpression_();
  }

  // === Static property getters/setters ===

  /**
   * @return {olFeature<import("ol/geom/Geometry.js").default>} Feature.
   */
  get feature() {
    return this.feature_;
  }

  /**
   * @param {?number|string} expression
   */
  setExpression(expression) {
    this.updatingExpression_ = true;
    super.setExpression(expression);

    if (!this.updatingGeometry_) {
      this.setGeometryFromExpression_();
    }

    this.registerGeometryChange_();

    this.updatingExpression_ = false;
  }

  // === Calculated property getters/setters ===

  /**
   * @return {?import("ol/geom/Geometry.js").default} Geometry
   */
  get geometry() {
    return this.feature_.getGeometry() || null;
  }

  /**
   * @param {?import("ol/geom/Geometry.js").default} geometry Geometry
   */
  set geometry(geometry) {
    this.feature_.setGeometry(geometry || undefined);
  }

  // === Other methods ===

  /**
   * Called when the geometry property in the feature changes. Update the expression accordingly.
   * @returns {boolean}
   * @private
   */
  handleFeatureGeometryChange_() {
    if (this.updatingExpression_) {
      return;
    }

    this.updatingGeometry_ = true;

    const geometry = this.feature_.getGeometry();
    if (geometry) {
      this.expression = this.format_.writeGeometry(geometry);
    } else {
      this.expression = null;
    }

    this.registerGeometryChange_();

    this.updatingGeometry_ = false;
  }

  /**
   * Called when the geometry of the features changes. Update the expression
   * accordingly.
   * @param {Event|import("ol/events/Event.js").default} evt Event
   * @private
   */
  handleGeometryChange_(evt) {
    const geometry = evt.target;
    this.updatingGeometry_ = true;
    this.expression = this.format_.writeGeometry(geometry);
    this.updatingGeometry_ = false;
  }

  /**
   * Set geometry property using the expression property.
   * @private
   */
  setGeometryFromExpression_() {
    let geometry = null;
    if (this.expression) {
      // An expression can only have a string value with a geometry rule.
      const expression = `${this.expression}`;
      geometry = this.format_.readGeometry(expression);
    }
    this.geometry = geometry;
  }

  /**
   * Unlisten the feature geometry change event, then listen to it if the
   * feature has a geometry.
   * @private
   */
  registerGeometryChange_() {
    // (1) Unlisten
    if (this.geometryChangeListenerKey_ !== null) {
      unlistenByKey(this.geometryChangeListenerKey_);
      this.geometryChangeListenerKey_ = null;
    }

    // (2) Listen, if geom
    const geometry = this.feature_.getGeometry();
    if (geometry) {
      this.geometryChangeListenerKey_ = listen(geometry, 'change', this.handleGeometryChange_, this);
    }
  }
}
