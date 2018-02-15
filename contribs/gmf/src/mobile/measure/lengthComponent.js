goog.provide('gmf.mobile.measure.lengthComponent');

goog.require('gmf');
goog.require('ngeo.misc.filters');
goog.require('ngeo.interaction.MeasureLengthMobile');
goog.require('ngeo.misc.decorate');
goog.require('ol.events');
goog.require('ol.Object');
goog.require('ol.style.Fill');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');

gmf.mobile.measure.lengthComponent = angular.module('gmfMobileMeasureLength', [
  ngeo.misc.filters.name,
]);


gmf.mobile.measure.lengthComponent.value('gmfMobileMeasureLengthTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} The template url.
     */
  (element, attrs) => {
    const templateUrl = attrs['gmfMobileMeasureLengthTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseModuleTemplateUrl}/mobile/measure/lengthComponent.html`;
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
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileMeasureLength
 */
gmf.mobile.measure.lengthComponent.component_ =
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


gmf.mobile.measure.lengthComponent.directive('gmfMobileMeasurelength',
  gmf.mobile.measure.lengthComponent.component_);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$filter} $filter Angular filter
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasureLengthController
 */
gmf.mobile.measure.lengthComponent.Controller_ = function($scope, $filter) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.$filter}
   * @private
   */
  this.filter_ = $filter;

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
  this.sketchStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2
    }),
    image: new ol.style.RegularShape({
      stroke: new ol.style.Stroke({
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
gmf.mobile.measure.lengthComponent.Controller_.prototype.init = function() {

  this.measure = new ngeo.interaction.MeasureLengthMobile(this.filter_('ngeoUnitPrefix'), {
    precision: this.precision,
    sketchStyle: this.sketchStyle
  });

  this.measure.setActive(this.active);
  ngeo.misc.decorate.interaction(this.measure);


  this.drawInteraction = /** @type {ngeo.interaction.MobileDraw} */ (
    this.measure.getDrawInteraction());

  const drawInteraction = this.drawInteraction;
  ngeo.misc.decorate.interaction(drawInteraction);

  Object.defineProperty(this, 'hasPoints', {
    get() {
      return this.drawInteraction.getFeature() !== null;
    }
  });

  ol.events.listen(
    drawInteraction,
    ol.Object.getChangeEventType('dirty'),
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

  ol.events.listen(
    drawInteraction,
    ol.Object.getChangeEventType('drawing'),
    function() {
      this.drawing = drawInteraction.getDrawing();
    },
    this
  );

  ol.events.listen(
    drawInteraction,
    ol.Object.getChangeEventType('valid'),
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
gmf.mobile.measure.lengthComponent.Controller_.prototype.addPoint = function() {
  this.drawInteraction.addToDrawing();
};


/**
 * Clear the sketch feature
 * @export
 */
gmf.mobile.measure.lengthComponent.Controller_.prototype.clear = function() {
  this.drawInteraction.clearDrawing();
};


/**
 * Finish line measure
 * @export
 */
gmf.mobile.measure.lengthComponent.Controller_.prototype.finish = function() {
  this.drawInteraction.finishDrawing();
};


/**
 * Deactivate the directive.
 * @export
 */
gmf.mobile.measure.lengthComponent.Controller_.prototype.deactivate = function() {
  this.active = false;
};


gmf.mobile.measure.lengthComponent.controller('GmfMobileMeasureLengthController',
  gmf.mobile.measure.lengthComponent.Controller_);
