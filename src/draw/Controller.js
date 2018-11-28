/**
 * @module ngeo.draw.Controller
 */
import googAsserts from 'goog/asserts.js';

import ngeoDrawFeatures from 'ngeo/draw/features.js';

import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';
import ngeoMiscDecorate from 'ngeo/misc/decorate.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import olFeature from 'ol/Feature.js';

/**
 * @param {!angular.IScope} $scope Scope.
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext service.
 * @param {ngeo.misc.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ol.Collection.<ol.Feature>} ngeoFeatures Collection of features.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoDrawfeatureController
 */
const exports = function($scope, $sce, gettextCatalog,
  ngeoFeatureHelper, ngeoFeatures) {

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  if (this.active === undefined) {
    this.active = false;
  }

  /**
   * Alternate collection of features in which to push the drawn features.
   * If not defined, then `ngeoFeatures` is used instead.
   * @type {!ol.Collection.<!ol.Feature>|undefined}
   * @export
   */
  this.features;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.showMeasure;

  /**
   * @type {angularGettext.Catalog}
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
   * @type {ngeo.misc.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.ngeoFeatures_ = ngeoFeatures;

  /**
   * @type {Array.<ol.interaction.Interaction>}
   * @private
   */
  this.interactions_ = [];

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPoint;

  /**
   * @type {ngeo.interaction.MeasureLength}
   * @export
   */
  this.measureLength;

  /**
   * @type {ngeo.interaction.MeasureArea}
   * @export
   */
  this.measureArea;

  /**
   * @type {ngeo.interaction.MeasureAzimut}
   * @export
   */
  this.measureAzimut;

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawRectangle;

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawText;


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

};


/**
 * Register a draw|measure interaction by setting it inactive, decorating it
 * and adding it to the map
 * @param {ol.interaction.Interaction} interaction Interaction to register.
 * @export
 */
exports.prototype.registerInteraction = function(
  interaction) {
  this.interactions_.push(interaction);
  interaction.setActive(false);
  ngeoMiscDecorate.interaction(interaction);
  this.map.addInteraction(interaction);
};


/**
 * Called when any of the draw or measure interaction active property changes.
 * Set the active property of this directive accordingly, i.e. if at least
 * one of the draw or measure is active then the active property is set to true.
 * @param {ol.Object.Event} event Event.
 * @export
 */
exports.prototype.handleActiveChange = function(event) {
  this.active = this.interactions_.some(interaction => interaction.getActive(), this);
};


/**
 * Called when a feature is finished being drawn. Set the default properties
 * for its style, then set its style and add it to the features collection.
 * @param {string} type Type of geometry being drawn.
 * @param {ol.interaction.Draw.Event|ngeox.MeasureEvent} event Event.
 * @export
 */
exports.prototype.handleDrawEnd = function(type, event) {
  let sketch;
  if (event.feature) {
    // ol.interaction.Draw.Event
    sketch = event.feature;
  } else {
    // ngeox.MeasureEvent
    sketch = event.detail.feature;
  }
  googAsserts.assert(sketch);

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
};


/**
 * @type {!angular.IModule}
 */
exports.module = angular.module('ngeoDrawfeatureController', [
  ngeoDrawFeatures.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscFeatureHelper.module.name,
]);
exports.module.controller('ngeoDrawfeatureController', exports);


export default exports;
