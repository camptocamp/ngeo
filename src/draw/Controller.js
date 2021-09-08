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

import angular from 'angular';

import ngeoDrawFeatures from 'ngeo/draw/features';

import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties';
import ngeoGeometryType from 'ngeo/GeometryType';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent';
import {interactionDecoration as ngeoMiscDecorateInteraction} from 'ngeo/misc/decorate';
import ngeoMiscFeatureHelper, {ArrowDirections, ArrowPositions} from 'ngeo/misc/FeatureHelper';
import olFeature from 'ol/Feature';

/**
 * @hidden
 */
export class DrawController {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
   * @param {import('ngeo/misc/FeatureHelper').FeatureHelper} ngeoFeatureHelper Ngeo feature helper
   *    service.
   * @param {import('ol/Collection').default<olFeature<import('ol/geom/Geometry').default>>} ngeoFeatures Collection of
   *    features.
   * @ngInject
   */
  constructor($scope, gettextCatalog, ngeoFeatureHelper, ngeoFeatures) {
    /**
     * @type {boolean}
     */
    this.active = false;

    /**
     * Alternate collection of features in which to push the drawn features.
     * If not defined, then `ngeoFeatures` is used instead.
     * @type {?import('ol/Collection').default<olFeature<import('ol/geom/Geometry').default>>}
     */
    this.features = null;

    /**
     * @type {?import('ol/Map').default}
     */
    this.map = null;

    /**
     * @type {boolean}
     */
    this.showMeasure = false;

    /**
     * @type {?string}
     */
    this.uid = null;

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;
    // Fill the string collection
    gettextCatalog.getString('Point');
    gettextCatalog.getString('LineString');
    gettextCatalog.getString('Polygon');
    gettextCatalog.getString('Circle');
    gettextCatalog.getString('Rectangle');
    gettextCatalog.getString('Text');

    /**
     * @type {import('ngeo/misc/FeatureHelper').FeatureHelper}
     * @private
     */
    this.featureHelper_ = ngeoFeatureHelper;

    /**
     * @type {import('ol/Collection').default<olFeature<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.ngeoFeatures_ = ngeoFeatures;

    /**
     * @type {import('ol/interaction/Interaction').default[]}
     * @private
     */
    this.interactions_ = [];

    /**
     * @type {?import('ol/interaction/Draw').default}
     */
    this.drawPoint = null;

    /**
     * @type {?import('ngeo/interaction/MeasureLength').default}
     */
    this.measureLength = null;

    /**
     * @type {?import('ngeo/interaction/MeasureArea').default}
     */
    this.measureArea = null;

    /**
     * @type {?import('ngeo/interaction/MeasureAzimut').default}
     */
    this.measureAzimut = null;

    /**
     * @type {?import('ol/interaction/Draw').default}
     */
    this.drawRectangle = null;

    /**
     * @type {?import('ol/interaction/Draw').default}
     */
    this.drawText = null;

    // Watch the "active" property, and disable the draw interactions
    // when "active" gets set to false.
    $scope.$watch(
      () => this.active,
      (newVal) => {
        if (newVal === false) {
          this.interactions_.forEach((interaction) => {
            interaction.setActive(false);
          });
        }
      }
    );
  }

  /**
   * Register a draw|measure interaction by setting it inactive, decorating it
   * and adding it to the map
   * @param {import('ol/interaction/Interaction').default} interaction Interaction to register.
   */
  registerInteraction(interaction) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    this.interactions_.push(interaction);
    interaction.setActive(false);
    ngeoMiscDecorateInteraction(interaction);
    this.map.addInteraction(interaction);
  }

  /**
   * Called when any of the draw or measure interaction active property changes.
   * Set the active property of this directive accordingly, i.e. if at least
   * one of the draw or measure is active then the active property is set to true.
   * @param {Event|import('ol/events/Event').default} event Event.
   */
  handleActiveChange(event) {
    this.active = this.interactions_.some((interaction) => interaction.getActive(), this);
  }

  /**
   * Called when a feature is finished being drawn. Set the default properties
   * for its style, then set its style and add it to the features collection.
   * @param {string} type Type of geometry being drawn.
   * @param {import('lib/ol.interaction.Draw').DrawEvent|import('ngeo/CustomEvent').default<import('lib/ol.interaction.Draw').DrawEvent>} evt
   *    Event.
   */
  handleDrawEnd(type, evt) {
    /** @type {import('lib/ol.interaction.Draw').DrawEvent} */
    // @ts-ignore
    const event = evt.detail ? evt.detail : evt;
    const sketch = event.feature;
    console.assert(sketch);

    const azimut = sketch.get('azimut');

    const features = this.features || this.ngeoFeatures_;

    const feature = new olFeature(sketch.getGeometry());

    const prop = ngeoFormatFeatureProperties;

    switch (type) {
      case ngeoGeometryType.CIRCLE:
        feature.set(prop.IS_CIRCLE, true);
        if (azimut !== undefined) {
          feature.set(prop.AZIMUT, azimut);
        }
        break;
      case ngeoGeometryType.TEXT:
        feature.set(prop.IS_TEXT, true);
        break;
      case ngeoGeometryType.LINE_STRING:
        feature.set(prop.ARROW_DIRECTION, ArrowDirections.NONE);
        feature.set(prop.ARROW_POSITION, ArrowPositions.FIRST);
        break;
      case ngeoGeometryType.RECTANGLE:
        feature.set(prop.IS_RECTANGLE, true);
        break;
      default:
        break;
    }

    /**
     * @type {string}
     */
    const name = this.gettextCatalog_.getString(type);
    feature.set(prop.NAME, `${name} ${features.getLength() + 1}`);

    /**
     * @type {string}
     */
    const color = type !== ngeoGeometryType.TEXT ? '#DB4436' : '#000000';
    feature.set(prop.COLOR, color);

    feature.set(prop.ANGLE, 0);
    feature.set(prop.OPACITY, 0.2);
    feature.set(prop.SHOW_MEASURE, this.showMeasure ? true : false);
    feature.set(prop.SHOW_LABEL, false);
    feature.set(prop.SIZE, 10);
    feature.set(prop.STROKE, 2);

    // set style
    this.featureHelper_.setStyle(feature);

    // push in collection
    features.push(feature);
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoDrawfeatureController', [
  ngeoDrawFeatures.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscFeatureHelper.name,
]);
myModule.controller('ngeoDrawfeatureController', DrawController);

export default myModule;
