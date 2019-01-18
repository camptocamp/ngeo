/**
 */
import angular from 'angular';
import ngeoMiscDecorate from 'ngeo/misc/decorate.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import * as olEvents from 'ol/events.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

const exports = angular.module('gmfMobileMeasureBase', [
  ngeoMiscFilters.name,
]);


/**
 * Base controller class for Length and Area components.
 *
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!angular.$filter} $filter Angular filter
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasureBaseController
 */
function Controller($scope, $filter, gettextCatalog) {

  /**
   * @type {angular.IScope}
   * @protected
   */
  this.scope = $scope;

  /**
   * @type {angular.IFilterService}
   * @protected
   */
  this.filter = $filter;

  /**
   * @type {!angular.gettext.gettextCatalog}
   * @protected
   */
  this.gettextCatalog = gettextCatalog;

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  this.scope.$watch(() => this.active, (newVal) => {
    this.measure.setActive(newVal);
  });

  /**
   * @type {number|undefined}
   * @export
   */
  this.precision;

  /**
   * @type {import("ol/style/Style.js").default|Array.<import("ol/style/Style.js").default>|import("ol/StyleFunction.js").default}
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
   * @type {import("ngeo/interaction/Measure.js").default}
   * @export
   */
  this.measure;

  /**
   * @type {import("ngeo/interaction/MobileDraw.js").default}
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
exports.Controller.prototype.init = function() {

  this.measure.setActive(this.active);
  ngeoMiscDecorate.interaction(this.measure);

  this.drawInteraction = /** @type {import("ngeo/interaction/MobileDraw.js").default} */ (
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
        this.scope.$apply();
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


export default module;
