/**
 * @module gmf.mobile.measure.lengthComponent
 */
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoInteractionMeasureLengthMobile from 'ngeo/interaction/MeasureLengthMobile.js';
import ngeoMiscDecorate from 'ngeo/misc/decorate.js';
import * as olEvents from 'ol/events.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

const exports = angular.module('gmfMobileMeasureLength', [
  ngeoMiscFilters.name,
]);


exports.value('gmfMobileMeasureLengthTemplateUrl',
  /**
   * @param {angular.JQLite} element Element.
   * @param {angular.Attributes} attrs Attributes.
   * @return {string} The template url.
   */
  (element, attrs) => {
    const templateUrl = attrs['gmfMobileMeasureLengthTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/measure/lengthComponent';
  });

exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/measure/lengthComponent', require('./lengthComponent.html'));
});


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
 * @htmlAttribute {ol.Map} gmf-mobile-measurelength-map The map.
 * @htmlAttribute {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction=}
 *     gmf-mobile-measurelength-sketchstyle A style for the measure length.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     gmfMobileMeasureLengthTemplateUrl Template URL for the directive.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileMeasureLength
 */
exports.component_ =
    function(gmfMobileMeasureLengthTemplateUrl) {
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
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         * @param {gmf.mobile.measure.lengthComponent.Controller_} controller Controller.
         */
        link: (scope, element, attrs, controller) => {
          controller.init();
        }
      };
    };


exports.directive('gmfMobileMeasurelength',
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
 * @ngname GmfMobileMeasureLengthController
 */
exports.Controller_ = function($scope, $filter, gettextCatalog) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.IFilterService}
   * @private
   */
  this.filter_ = $filter;

  /**
   * @type {!angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  this.scope_.$watch(() => this.active, (newVal) => {
    this.measure.setActive(newVal);
  });

  /**
   * @type {number|undefined}
   * @export
   */
  this.precision;

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
   * @type {ngeo.interaction.MeasureLengthMobile}
   * @export
   */
  this.measure;

  /**
   * @type {ngeo.interaction.MobileDraw}
   * @export
   */
  this.drawInteraction;

  /**
   * @type {boolean}
   * @export
   */
  this.dirty = false;

  /**
   * @type {boolean}
   * @export
   */
  this.drawing = false;

  /**
   * @type {boolean}
   * @export
   */
  this.valid = false;
};

/**
 * Initialise the controller.
 */
exports.Controller_.prototype.init = function() {

  this.measure = new ngeoInteractionMeasureLengthMobile(this.filter_('ngeoUnitPrefix'), this.gettextCatalog_, {
    precision: this.precision,
    sketchStyle: this.sketchStyle
  });

  this.measure.setActive(this.active);
  ngeoMiscDecorate.interaction(this.measure);


  this.drawInteraction = /** @type {ngeo.interaction.MobileDraw} */ (
    this.measure.getDrawInteraction());

  const drawInteraction = this.drawInteraction;
  ngeoMiscDecorate.interaction(drawInteraction);

  Object.defineProperty(this, 'hasPoints', {
    get() {
      return this.drawInteraction.getFeature() !== null;
    }
  });

  olEvents.listen(
    drawInteraction,
    'change:dirty',
    function() {
      this.dirty = drawInteraction.getDirty();

      // this is where the angular scope is forced to be applied. We
      // only need to do this when dirty, as going to "no being dirty"
      // is made by a click on a button where Angular is within scope
      if (this.dirty) {
        this.scope_.$apply();
      }
    },
    this
  );

  olEvents.listen(
    drawInteraction,
    'change:drawing',
    function() {
      this.drawing = drawInteraction.getDrawing();
    },
    this
  );

  olEvents.listen(
    drawInteraction,
    'change:valid',
    function() {
      this.valid = drawInteraction.getValid();
    },
    this
  );

  this.map.addInteraction(this.measure);
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


exports.controller('GmfMobileMeasureLengthController',
  exports.Controller_);


export default exports;
