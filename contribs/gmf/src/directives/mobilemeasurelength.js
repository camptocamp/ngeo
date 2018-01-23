goog.provide('gmf.mobileMeasurelengthDirective');

goog.require('gmf');
goog.require('ngeo.DecorateInteraction');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ngeo.interaction.MeasureLengthMobile');
goog.require('ngeo.interaction.MobileDraw');
goog.require('ol.style.Fill');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


gmf.module.value('gmfMobileMeasureLengthTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} The template url.
     */
  (element, attrs) => {
    const templateUrl = attrs['gmfMobileMeasureLengthTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/mobilemeasurelength.html`;
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
gmf.mobileMeasureLengthDirective =
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
         * @param {gmf.MobileMeasureLengthController} controller Controller.
         */
        link(scope, element, attrs, controller) {
          controller.init();
        }
      };
    };


gmf.module.directive('gmfMobileMeasurelength',
  gmf.mobileMeasureLengthDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {angular.$filter} $filter Angular filter
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasureLengthController
 */
gmf.MobileMeasureLengthController = function($scope, ngeoDecorateInteraction, $filter) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {ngeo.DecorateInteraction}
   * @private
   */
  this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

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
gmf.MobileMeasureLengthController.prototype.init = function() {

  this.measure = new ngeo.interaction.MeasureLengthMobile(this.filter_('ngeoUnitPrefix'), {
    precision: this.precision,
    sketchStyle: this.sketchStyle
  });

  this.measure.setActive(this.active);
  this.ngeoDecorateInteraction_(this.measure);


  this.drawInteraction = /** @type {ngeo.interaction.MobileDraw} */ (
    this.measure.getDrawInteraction());

  const drawInteraction = this.drawInteraction;
  this.ngeoDecorateInteraction_(drawInteraction);

  Object.defineProperty(this, 'hasPoints', {
    get() {
      return this.drawInteraction.getFeature() !== null;
    }
  });

  ol.events.listen(
    drawInteraction,
    ol.Object.getChangeEventType(
      ngeo.interaction.MobileDrawProperty.DIRTY),
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
    ol.Object.getChangeEventType(
      ngeo.interaction.MobileDrawProperty.DRAWING),
    function() {
      this.drawing = drawInteraction.getDrawing();
    },
    this
  );

  ol.events.listen(
    drawInteraction,
    ol.Object.getChangeEventType(
      ngeo.interaction.MobileDrawProperty.VALID),
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
gmf.MobileMeasureLengthController.prototype.addPoint = function() {
  this.drawInteraction.addToDrawing();
};


/**
 * Clear the sketch feature
 * @export
 */
gmf.MobileMeasureLengthController.prototype.clear = function() {
  this.drawInteraction.clearDrawing();
};


/**
 * Finish line measure
 * @export
 */
gmf.MobileMeasureLengthController.prototype.finish = function() {
  this.drawInteraction.finishDrawing();
};


/**
 * Deactivate the directive.
 * @export
 */
gmf.MobileMeasureLengthController.prototype.deactivate = function() {
  this.active = false;
};


gmf.module.controller('GmfMobileMeasureLengthController',
  gmf.MobileMeasureLengthController);
