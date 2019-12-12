import angular from 'angular';

import ngeoDrawController from 'ngeo/draw/Controller.js';
import ngeoDrawPoint from 'ngeo/draw/point.js';
import ngeoDrawRectangle from 'ngeo/draw/rectangle.js';
import ngeoDrawText from 'ngeo/draw/text.js';
import ngeoMeasureArea from 'ngeo/measure/area.js';
import ngeoMeasureAzimut from 'ngeo/measure/azimut.js';
import ngeoMeasureLength from 'ngeo/measure/length.js';


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDrawfeature', [
  ngeoDrawController.name,
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
 * @htmlAttribute {import("ol/Collection.js").default=} ngeo-drawfeature-features The features
 *     collection in which to push the drawn features. If none is provided,
 *     then the `ngeoFeatures` collection is used.
 * @htmlAttribute {import("ol/Map.js").default} ngeo-drawfeature-map The map.
 * @htmlAttribute {boolean} ngeo-drawfeature-showmeasure. Checks the
 *      checkbox in order to display the feature measurements as a label.
 *      Default to false.
 * @htmlAttribute {string=} ngeo-drawfeature-uid A prefix to use to
 *      create unique ids for each created draw interaction as
 *      property. Used to find those draw interactions later on from the
 *      map, using the property set.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawfeature
 */
function drawComponent() {
  return {
    controller: 'ngeoDrawfeatureController as dfCtrl',
    scope: true,
    bindToController: {
      'active': '=ngeoDrawfeatureActive',
      'features': '=?ngeoDrawfeatureFeatures',
      'map': '=ngeoDrawfeatureMap',
      'showMeasure': '=?ngeoDrawfeatureShowmeasure',
      'uid': '<?ngeoDrawfeatureUid'
    }
  };
}

module.directive('ngeoDrawfeature', drawComponent);


export default module;
