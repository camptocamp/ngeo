/**
 * @module gmf.mobile.measure.areaComponent
 */
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoInteractionMeasureAreaMobile from 'ngeo/interaction/MeasureAreaMobile.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import gmfMobileMeasureBaseComponent from 'gmf/mobile/measure/baseComponent.js';

const exports = angular.module('gmfMobileMeasureArea', [
  ngeoMiscFilters.name,
]);


exports.value('gmfMobileMeasureAreaTemplateUrl',
  /**
   * @param {angular.JQLite} element Element.
   * @param {angular.Attributes} attrs Attributes.
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
    require('./lengthComponent.html')
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
 * @htmlAttribute {ol.Map} gmf-mobile-measurearea-map The map.
 * @htmlAttribute {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction=}
 *     gmf-mobile-measurearea-sketchstyle A style for the measure area.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     gmfMobileMeasureAreaTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileMeasureArea
 */
exports.component_ =
    function(gmfMobileMeasureAreaTemplateUrl) {
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
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         * @param {gmf.mobile.measure.areaComponent.Controller_} controller Controller.
         */
        link: (scope, element, attrs, controller) => {
          controller.init();
        }
      };
    };


exports.directive('gmfMobileMeasurearea',
  exports.component_);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!angular.IFilterService} $filter Angular filter
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasureAreaController
 */
exports.Controller_ = function($scope, $filter, gettextCatalog) {

  gmfMobileMeasureBaseComponent.Controller.call(
    this,
    $scope,
    $filter,
    gettextCatalog
  );

  /**
   * @type {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction}
   * @export
   */
  this.sketchStyle = new olStyleStyle({
    fill: new olStyleFill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new olStyleStroke({
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2
    }),
    image: new olStyleRegularShape({
      stroke: new olStyleStroke({
        color: 'rgba(0, 0, 0, 0.7)',
        width: 2
      }),
      points: 4,
      radius: 8,
      radius2: 0,
      angle: 0
    })
  });

  /**
   * @type {ngeo.interaction.MeasureAreaMobile}
   * @export
   */
  this.measure;
};

olUtilInherits(exports, gmfMobileMeasureBaseComponent.Controller);

/**
 * Initialise the controller.
 */
exports.Controller_.prototype.init = function() {

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
exports.Controller_.prototype.addPoint = function() {
  this.drawInteraction.addToDrawing();
};


/**
 * Clear the sketch feature
 * @export
 */
exports.Controller_.prototype.clear = function() {
  this.drawInteraction.clearDrawing();
};


/**
 * Finish line measure
 * @export
 */
exports.Controller_.prototype.finish = function() {
  this.drawInteraction.finishDrawing();
};


/**
 * Deactivate the directive.
 * @export
 */
exports.Controller_.prototype.deactivate = function() {
  this.active = false;
};


exports.controller('GmfMobileMeasureAreaController',
  exports.Controller_);


export default exports;
