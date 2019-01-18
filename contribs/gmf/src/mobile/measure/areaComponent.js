/**
 */
import angular from 'angular';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoInteractionMeasureAreaMobile from 'ngeo/interaction/MeasureAreaMobile.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import gmfMobileMeasureBaseComponent from 'gmf/mobile/measure/baseComponent.js';

const exports = angular.module('gmfMobileMeasureArea', [
  ngeoMiscFilters.name,
]);


exports.value('gmfMobileMeasureAreaTemplateUrl',
  /**
   * @param {JQLite} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} The template url.
   */
  (element, attrs) => {
    const templateUrl = attrs['gmfMobileMeasureAreaTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/measure/areaComponent';
  });

exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put(
    'gmf/measure/areaComponent',
    require('./baseComponent.html')
  );
});


/**
 * Provide a directive to do a area measure on the mobile devices.
 *
 * Example:
 *
 *      <div gmf-mobile-measurearea
 *        gmf-mobile-measurearea-active="ctrl.measureAreaActive"
 *        gmf-mobile-measurearea-map="::ctrl.map">
 *      </div>
 *
 * @htmlAttribute {boolean} gmf-mobile-measurearea-active Used to active
 * or deactivate the component.
 * @htmlAttribute {number=} gmf-mobile-measurearea-precision the number of significant digits to display.
 * @htmlAttribute {import("ol/Map.js").default} gmf-mobile-measurearea-map The map.
 * @htmlAttribute {import("ol/style/Style.js").default|Array.<import("ol/style/Style.js").default>|import("ol/StyleFunction.js").default=}
 *     gmf-mobile-measurearea-sketchstyle A style for the measure area.
 * @param {string|function(!JQLite=, !angular.IAttributes=)}
 *     gmfMobileMeasureAreaTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileMeasureArea
 */
function component(gmfMobileMeasureAreaTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasureareaActive',
      'precision': '<?gmfMobileMeasureareaPrecision',
      'map': '=gmfMobileMeasureareaMap',
      'sketchStyle': '=?gmfMobileMeasureareaSketchstyle'
    },
    controller: 'GmfMobileMeasureAreaController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureAreaTemplateUrl,
    /**
     * @param {angular.Scope} scope Scope.
     * @param {JQLite} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {import("gmf/mobile/measure.js").default.areaComponent.Controller_} controller Controller.
     */
    link: (scope, element, attrs, controller) => {
      controller.init();
    }
  };
}


exports.directive('gmfMobileMeasurearea', component);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!angular.IFilterService} $filter Angular filter
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasureAreaController
 */
function Controller($scope, $filter, gettextCatalog) {

  gmfMobileMeasureBaseComponent.Controller.call(
    this,
    $scope,
    $filter,
    gettextCatalog
  );

  /**
   * @type {import("ngeo/interaction/MeasureAreaMobile.js").default}
   * @export
   */
  this.measure;
}

olUtilInherits(exports, gmfMobileMeasureBaseComponent.Controller);

/**
 * Initialise the controller.
 */
Controller.prototype.init = function() {

  this.measure = new ngeoInteractionMeasureAreaMobile(this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
    precision: this.precision,
    sketchStyle: this.sketchStyle
  });

  gmfMobileMeasureBaseComponent.Controller.prototype.init.call(this);
};

/**
 * Add current sketch point to line measure
 * @export
 */
Controller.prototype.addPoint = function() {
  this.drawInteraction.addToDrawing();
};


/**
 * Clear the sketch feature
 * @export
 */
Controller.prototype.clear = function() {
  this.drawInteraction.clearDrawing();
};


/**
 * Finish line measure
 * @export
 */
Controller.prototype.finish = function() {
  this.drawInteraction.finishDrawing();
};


/**
 * Deactivate the directive.
 * @export
 */
Controller.prototype.deactivate = function() {
  this.active = false;
};


exports.controller('GmfMobileMeasureAreaController', Controller);


export default exports;
