goog.provide('ngeo.drawfeatureDirective');

goog.require('ngeo');
goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.FeatureHelper');
/** @suppress {extraRequire} */
goog.require('ngeo.btngroupDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.drawpointDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.drawrectangleDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.drawtextDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.measureareaDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.measureazimutDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.measurelengthDirective');
goog.require('ol.Feature');


/**
 * Directive used to draw vector features on a map.
 * Example:
 *
 *     <ngeo-drawfeature
 *         ngeo-btn-group
 *         class="btn-group"
 *         ngeo-drawfeature-active="ctrl.drawActive"
 *         ngeo-drawfeature-map="::ctrl.map">
 *       <a
 *         href
 *         translate
 *         ngeo-btn
 *         ngeo-drawpoint
 *         class="btn btn-default ngeo-drawfeature-point"
 *         ng-class="{active: dfCtrl.drawPoint.active}"
 *         ng-model="dfCtrl.drawPoint.active"></a>
 *       <a
 *         href
 *         translate
 *         ngeo-btn
 *         ngeo-measurelength
 *         class="btn btn-default ngeo-drawfeature-linestring"
 *         ng-class="{active: dfCtrl.measureLength.active}"
 *         ng-model="dfCtrl.measureLength.active"></a>
 *       <a
 *         href
 *         translate
 *         ngeo-btn
 *         ngeo-measurearea
 *         class="btn btn-default ngeo-drawfeature-polygon"
 *         ng-class="{active: dfCtrl.measureArea.active}"
 *         ng-model="dfCtrl.measureArea.active"></a>
 *       <a
 *         href
 *         translate
 *         ngeo-btn
 *         ngeo-measureazimut
 *         class="btn btn-default ngeo-drawfeature-circle"
 *         ng-class="{active: dfCtrl.measureAzimut.active}"
 *         ng-model="dfCtrl.measureAzimut.active"></a>
 *       <a
 *         href
 *         translate
 *         ngeo-btn
 *         ngeo-drawrectangle
 *         class="btn btn-default ngeo-drawfeature-rectangle"
 *         ng-class="{active: dfCtrl.drawRectangle.active}"
 *         ng-model="dfCtrl.drawRectangle.active"></a>
 *       <a
 *         href
 *         translate
 *         ngeo-btn
 *         ngeo-drawtext
 *         class="btn btn-default ngeo-drawfeature-text"
 *         ng-class="{active: dfCtrl.drawText.active}"
 *         ng-model="dfCtrl.drawText.active"></a>
 *     </ngeo-drawfeature>
 *
 * @htmlAttribute {boolean} ngeo-drawfeature-active Whether the directive is
 *     active or not.
 * @htmlAttribute {!ol.Collection=} ngeo-drawfeature-features The features
 *     collection in which to push the drawn features. If none is provided,
 *     then the `ngeoFeatures` collection is used.
 * @htmlAttribute {ol.Map} ngeo-drawfeature-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawfeature
 */
ngeo.drawfeatureDirective = function() {
  return {
    controller: 'ngeoDrawfeatureController as dfCtrl',
    scope: true,
    bindToController: {
      'active': '=ngeoDrawfeatureActive',
      'features': '=?ngeoDrawfeatureFeatures',
      'map': '=ngeoDrawfeatureMap'
    }
  };
};

ngeo.module.directive('ngeoDrawfeature', ngeo.drawfeatureDirective);


/**
 * @param {!angular.Scope} $scope Scope.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {angular.$sce} $sce Angular sce service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext service.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ol.Collection.<ol.Feature>} ngeoFeatures Collection of features.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoDrawfeatureController
 */
ngeo.DrawfeatureController = function($scope, $compile, $sce,
  gettextCatalog, ngeoDecorateInteraction, ngeoFeatureHelper, ngeoFeatures) {

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
   * @type {ngeo.DecorateInteraction}
   * @private
   */
  this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

  /**
   * @type {ngeo.FeatureHelper}
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
        }, this);
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
ngeo.DrawfeatureController.prototype.registerInteraction = function(
  interaction) {
  this.interactions_.push(interaction);
  interaction.setActive(false);
  this.ngeoDecorateInteraction_(interaction);
  this.map.addInteraction(interaction);
};


/**
 * Called when any of the draw or measure interaction active property changes.
 * Set the active property of this directive accordingly, i.e. if at least
 * one of the draw or measure is active then the active property is set to true.
 * @param {ol.Object.Event} event Event.
 * @export
 */
ngeo.DrawfeatureController.prototype.handleActiveChange = function(event) {
  this.active = this.interactions_.some(interaction => interaction.getActive(), this);
};


/**
 * Called when a feature is finished being drawn. Set the default properties
 * for its style, then set its style and add it to the features collection.
 * @param {string} type Type of geometry being drawn.
 * @param {ol.interaction.Draw.Event|ngeo.MeasureEvent} event Event.
 * @export
 */
ngeo.DrawfeatureController.prototype.handleDrawEnd = function(type, event) {

  const features = this.features || this.ngeoFeatures_;

  const feature = new ol.Feature(event.feature.getGeometry());

  const prop = ngeo.FeatureProperties;

  switch (type) {
    case ngeo.GeometryType.CIRCLE:
      feature.set(prop.IS_CIRCLE, true);
      if (event.feature.get('azimut') !== undefined) {
        feature.set(prop.AZIMUT, event.feature.get('azimut'));
      }
      break;
    case ngeo.GeometryType.TEXT:
      feature.set(prop.IS_TEXT, true);
      break;
    case ngeo.GeometryType.RECTANGLE:
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
  const color = type !== ngeo.GeometryType.TEXT ? '#DB4436' : '#000000';
  feature.set(prop.COLOR, color);

  feature.set(prop.ANGLE, 0);
  feature.set(prop.OPACITY, 0.2);
  feature.set(prop.SHOW_MEASURE, false);
  feature.set(prop.SHOW_LABEL, false);
  feature.set(prop.SIZE, 10);
  feature.set(prop.STROKE, 2);

  // set style
  this.featureHelper_.setStyle(feature);

  // push in collection
  features.push(feature);
};

ngeo.module.controller('ngeoDrawfeatureController', ngeo.DrawfeatureController);
