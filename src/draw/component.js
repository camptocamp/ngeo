/**
 * @module ngeo.draw.component
 */
import ngeoDrawController from 'ngeo/draw/Controller.js';

/** @suppress {extraRequire} */
import ngeoDrawPoint from 'ngeo/draw/point.js';

/** @suppress {extraRequire} */
import ngeoDrawRectangle from 'ngeo/draw/rectangle.js';

/** @suppress {extraRequire} */
import ngeoDrawText from 'ngeo/draw/text.js';

/** @suppress {extraRequire} */
import ngeoMeasureArea from 'ngeo/measure/area.js';

/** @suppress {extraRequire} */
import ngeoMeasureAzimut from 'ngeo/measure/azimut.js';

/** @suppress {extraRequire} */
import ngeoMeasureLength from 'ngeo/measure/length.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoDrawfeature', [
  ngeoDrawController.module.name,
  ngeoDrawPoint.name,
  ngeoDrawRectangle.name,
  ngeoDrawText.name,
  ngeoMeasureArea.name,
  ngeoMeasureAzimut.name,
  ngeoMeasureLength.name,
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
exports.directive_ = function() {
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

exports.directive('ngeoDrawfeature', exports.directive_);


export default exports;
