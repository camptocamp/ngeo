import angular from 'angular';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoInteractionMeasureLengthMobile from 'ngeo/interaction/MeasureLengthMobile.js';
import {MeasueMobileBaseController} from 'gmf/mobile/measure/baseComponent.js';


/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfMobileMeasureLength', [
  ngeoMiscFilters.name,
]);


module.value('gmfMobileMeasureLengthTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} The template url.
   */
  (element, attrs) => {
    const templateUrl = attrs.gmfMobileMeasureLengthTemplateurl;
    return templateUrl !== undefined ? templateUrl :
      'gmf/measure/lengthComponent';
  });


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/measure/lengthComponent', require('./baseComponent.html'));
  }
);


/**
 * Provide a directive to do a length measure on the mobile devices.
 *
 * Example:
 *
 *      <div gmf-mobile-measurelength
 *        gmf-mobile-measurelength-active="ctrl.measureLengthActive"
 *        gmf-mobile-measurelength-map="::ctrl.map">
 *      </div>
 *
 * @htmlAttribute {boolean} gmf-mobile-measurelength-active Used to active
 * or deactivate the component.
 * @htmlAttribute {number=} gmf-mobile-measurelength-precision the number of significant digits to display.
 * @htmlAttribute {import("ol/Map.js").default} gmf-mobile-measurelength-map The map.
 * @htmlAttribute {import("ol/style/Style.js").StyleLike=}
 *     gmf-mobile-measurelength-sketchstyle A style for the measure length.
 * @param {string|function(!JQuery=, !angular.IAttributes=):string}
 *     gmfMobileMeasureLengthTemplateUrl Template URL for the directive.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileMeasureLength
 */
function mobileMeasureLenthComponent(gmfMobileMeasureLengthTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurelengthActive',
      'precision': '<?gmfMobileMeasurelengthPrecision',
      'map': '=gmfMobileMeasurelengthMap',
      'sketchStyle': '=?gmfMobileMeasurelengthSketchstyle'
    },
    controller: 'GmfMobileMeasureLengthController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureLengthTemplateUrl,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController=} controller Controller.
     */
    link: (scope, element, attrs, controller) => {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    }
  };
}


module.directive('gmfMobileMeasurelength', mobileMeasureLenthComponent);


/**
 * @private
 * @hidden
 */
class Controller extends MeasueMobileBaseController {
  /**
   * @param {!angular.IScope} $scope Angular scope.
   * @param {!angular.IFilterService} $filter Angular filter
   * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @ngInject
   */
  constructor($scope, $filter, gettextCatalog) {
    super($scope, $filter, gettextCatalog);

    /**
     * @type {?import("ngeo/interaction/MeasureLengthMobile.js").default}
     */
    this.measure = null;
  }

  /**
   * Initialise the controller.
   */
  init() {
    if (!this.precision) {
      throw new Error('Missing precision');
    }
    this.measure = new ngeoInteractionMeasureLengthMobile(
      this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
        precision: this.precision,
        sketchStyle: this.sketchStyle
      }
    );

    super.init();
  }

  /**
   * Add current sketch point to line measure
   */
  addPoint() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.addToDrawing();
  }

  /**
   * Clear the sketch feature
   */
  clear() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.clearDrawing();
  }

  /**
   * Finish line measure
   */
  finish() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.finishDrawing();
  }

  /**
   * Deactivate the directive.
   */
  deactivate() {
    this.active = false;
  }
}

module.controller('GmfMobileMeasureLengthController', Controller);


export default module;
