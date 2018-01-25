goog.provide('ngeo.draw.component');

goog.require('ngeo.draw.Controller');
/** @suppress {extraRequire} */
goog.require('ngeo.draw.point');
/** @suppress {extraRequire} */
goog.require('ngeo.draw.rectangle');
/** @suppress {extraRequire} */
goog.require('ngeo.draw.text');
/** @suppress {extraRequire} */
goog.require('ngeo.measure.area');
/** @suppress {extraRequire} */
goog.require('ngeo.measure.azimut');
/** @suppress {extraRequire} */
goog.require('ngeo.measure.length');

/**
 * @type {!angular.Module}
 */
ngeo.draw.component = angular.module('ngeoDrawfeature', [
  ngeo.draw.Controller.module.name,
  ngeo.draw.point.name,
  ngeo.draw.rectangle.name,
  ngeo.draw.text.name,
  ngeo.measure.area.name,
  ngeo.measure.azimut.name,
  ngeo.measure.length.name,
]);


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
 * @htmlAttribute {boolean} ngeo-drawfeature-showmeasure. Checks the
 *      checkbox in order to display the feature measurements as a label.
 *      Default to false.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawfeature
 */
ngeo.draw.component.directive_ = function() {
  return {
    controller: 'ngeoDrawfeatureController as dfCtrl',
    scope: true,
    bindToController: {
      'active': '=ngeoDrawfeatureActive',
      'features': '=?ngeoDrawfeatureFeatures',
      'map': '=ngeoDrawfeatureMap',
      'showMeasure': '=?ngeoDrawfeatureShowmeasure'
    }
  };
};

ngeo.draw.component.directive('ngeoDrawfeature', ngeo.draw.component.directive_);
