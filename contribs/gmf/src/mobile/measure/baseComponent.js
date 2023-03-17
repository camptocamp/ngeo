import angular from 'angular';
import {interactionDecoration} from 'ngeo/misc/decorate.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import * as olEvents from 'ol/events.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfMobileMeasureBase', [ngeoMiscFilters.name]);

/**
 * Base controller class for Length and Area components.
 *
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!angular.IFilterService} $filter Angular filter
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasureBaseController
 * @hidden
 */
export function MeasueMobileBaseController($scope, $filter, gettextCatalog) {
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
   */
  this.map;

  /**
   * @type {boolean}
   */
  this.active;

  this.scope.$watch(
    () => this.active,
    (newVal) => {
      this.measure.setActive(newVal);
    }
  );

  /**
   * @type {number|undefined}
   */
  this.precision;

  /**
   * @type {import("ol/style/Style.js").StyleLike}
   */
  this.sketchStyle = new olStyleStyle({
    fill: new olStyleFill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new olStyleStroke({
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2,
    }),
    image: new olStyleRegularShape({
      stroke: new olStyleStroke({
        color: 'rgba(0, 0, 0, 0.7)',
        width: 2,
      }),
      points: 4,
      radius: 8,
      radius2: 0,
      angle: 0,
    }),
  });

  /**
   * @type {import("ngeo/interaction/Measure.js").default}
   */
  this.measure;

  /**
   * @type {import("ngeo/interaction/MobileDraw.js").default}
   */
  this.drawInteraction;

  /**
   * @type {boolean}
   */
  this.dirty = false;

  /**
   * @type {boolean}
   */
  this.drawing = false;

  /**
   * @type {boolean}
   */
  this.valid = false;
}

/**
 * Initialise the controller.
 */
MeasueMobileBaseController.prototype.init = function () {
  this.measure.setActive(this.active);
  interactionDecoration(this.measure);

  this.drawInteraction = /** @type {import("ngeo/interaction/MobileDraw.js").default} */ (
    this.measure.getDrawInteraction()
  );

  const drawInteraction = this.drawInteraction;
  interactionDecoration(drawInteraction);

  Object.defineProperty(this, 'hasPoints', {
    get() {
      return this.drawInteraction.getFeature() !== null;
    },
  });

  olEvents.listen(
    drawInteraction,
    'change:dirty',
    (evt) => {
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
    (evt) => {
      this.drawing = drawInteraction.getDrawing();
    },
    this
  );

  olEvents.listen(
    drawInteraction,
    'change:valid',
    (evt) => {
      this.valid = drawInteraction.getValid();
    },
    this
  );

  this.map.addInteraction(this.measure);
};

module.controller('gmfMeasueMobileBaseController', MeasueMobileBaseController);

export default module;
