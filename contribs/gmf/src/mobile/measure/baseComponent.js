/**
 * @module gmf.mobile.measure.baseComponent
 */
import ngeoMiscDecorate from 'ngeo/misc/decorate.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import * as olEvents from 'ol/events.js';

const exports = angular.module('gmfMobileMeasureBase', [
  ngeoMiscFilters.name,
]);


/**
 * Base controller class for Length and Area components.
 *
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!angular.$filter} $filter Angular filter
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @constructor
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasureBaseController
 */
exports.Controller = function($scope, $filter, gettextCatalog) {

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
   * @type {!angularGettext.Catalog}
   * @protected
   */
  this.gettextCatalog = gettextCatalog;

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

  this.scope.$watch(() => this.active, (newVal) => {
    this.measure.setActive(newVal);
  });

  /**
   * @type {number|undefined}
   * @export
   */
  this.precision;

  /**
   * @type {ngeo.interaction.Measure}
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
exports.Controller.prototype.init = function() {

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


export default exports;
