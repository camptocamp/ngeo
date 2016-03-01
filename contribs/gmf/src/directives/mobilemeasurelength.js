goog.provide('gmf.MobileMeasureLengthController');
goog.provide('gmf.mobileMeasureLengthDirective');

goog.require('gmf');
goog.require('ngeo.DecorateInteraction');
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
    function(element, attrs) {
      var templateUrl = attrs['gmfMobileMeasureLengthTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/mobilemeasurelength.html';
    });


/**
 * Provide a "mobile measure" directive.
 *
 * Example:
 *
 *      <div gmf-mobile-measure-length=""
 *        gmf-mobile-measure-length-active="ctrl.measureLengthActive"
 *        gmf-mobile-measure-length-map="::ctrl.map">
 *      </div>
 *
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
          'active': '=gmfMobileMeasureLengthActive',
          'decimals': '<?gmfMobileMeasureLengthDecimals',
          'map': '=gmfMobileMeasureLengthMap',
          'sketchStyle': '=?gmfMobileMeasureLengthSketchStyle'
        },
        controller: 'GmfMobileMeasureLengthController',
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: gmfMobileMeasureLengthTemplateUrl
      };
    };


gmf.module.directive('gmfMobileMeasureLength',
                     gmf.mobileMeasureLengthDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasureLengthController
 */
gmf.MobileMeasureLengthController = function($scope, ngeoDecorateInteraction) {

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

  $scope.$watch(function() {
    return this.active;
  }.bind(this), function(newVal) {
    this.measure.setActive(newVal);
  }.bind(this));

  /**
   * @type {number|undefined}
   * @export
   */
  this.decimals;

  /**
   * @type {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction}
   * @export
   */
  this.sketchStyle;

  if (this.sketchStyle === undefined) {
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
  }

  /**
   * @type {ngeo.interaction.MeasureLengthMobile}
   * @export
   */
  this.measure = new ngeo.interaction.MeasureLengthMobile({
    decimals: this.decimals,
    sketchStyle: this.sketchStyle
  });

  this.measure.setActive(this.active);
  ngeoDecorateInteraction(this.measure);
  this.map.addInteraction(this.measure);

  /**
   * @type {ngeo.interaction.MobileDraw}
   * @export
   */
  this.drawInteraction = /** @type {ngeo.interaction.MobileDraw} */ (
      this.measure.getDrawInteraction());

  var drawInteraction = this.drawInteraction;
  ngeoDecorateInteraction(drawInteraction);

  Object.defineProperty(this, 'hasPoints', {
    get: function() {
      return this.drawInteraction.getFeature() !== null;
    }
  });

  /**
   * @type {boolean}
   * @export
   */
  this.dirty = false;

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
          $scope.$apply();
        }
      },
      this
  );

  /**
   * @type {boolean}
   * @export
   */
  this.drawing = false;

  ol.events.listen(
      drawInteraction,
      ol.Object.getChangeEventType(
          ngeo.interaction.MobileDrawProperty.DRAWING),
      function() {
        this.drawing = drawInteraction.getDrawing();
      },
      this
  );

  /**
   * @type {boolean}
   * @export
   */
  this.valid = false;

  ol.events.listen(
      drawInteraction,
      ol.Object.getChangeEventType(
          ngeo.interaction.MobileDrawProperty.VALID),
      function() {
        this.valid = drawInteraction.getValid();
      },
      this
  );
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
