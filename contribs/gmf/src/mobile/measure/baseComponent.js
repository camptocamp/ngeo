// The MIT License (MIT)
//
// Copyright (c) 2018-2020 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import {interactionDecoration} from 'ngeo/misc/decorate.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import {listen} from 'ol/events.js';
import MobileDraw from 'ngeo/interaction/MobileDraw.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfMobileMeasureBase', [ngeoMiscFilters.name]);

/**
 * Base controller class for Length and Area components.
 *
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.IFilterService} $filter Angular filter
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasureBaseController
 * @hidden
 */
export function MeasueMobileBaseController($scope, $filter, gettextCatalog) {
  /**
   * @type {angular.IScope}
   */
  this.scope = $scope;

  /**
   * @type {angular.IFilterService}
   */
  this.filter = $filter;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog = gettextCatalog;

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {boolean}
   */
  this.active = false;

  this.scope.$watch(
    () => this.active,
    (newVal) => {
      if (!this.measure) {
        throw new Error('Missing measure');
      }
      this.measure.setActive(newVal);
    }
  );

  /**
   * @type {?import("ngeo/interaction/Measure.js").default}
   */
  this.measure = null;

  /**
   * @type {?import("ngeo/interaction/MobileDraw.js").default}
   */
  this.drawInteraction = null;

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
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.measure) {
    throw new Error('Missing measure');
  }

  this.measure.setActive(this.active);
  interactionDecoration(this.measure);

  const drawInteraction = this.measure.getDrawInteraction();
  if (!(drawInteraction instanceof MobileDraw)) {
    throw new Error('Wrong drawInteraction');
  }
  this.drawInteraction = drawInteraction;
  interactionDecoration(drawInteraction);

  Object.defineProperty(this, 'hasPoints', {
    get() {
      return this.drawInteraction.getFeature() !== null;
    },
  });

  listen(
    drawInteraction,
    'change:dirty',
    /** @type {import("ol/events.js").ListenerFunction} */
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

  listen(
    drawInteraction,
    'change:drawing',
    /** @type {import("ol/events.js").ListenerFunction} */
    (evt) => {
      this.drawing = drawInteraction.getDrawing();
    },
    this
  );

  listen(
    drawInteraction,
    'change:valid',
    /** @type {import("ol/events.js").ListenerFunction} */
    (evt) => {
      this.valid = drawInteraction.getValid();
    },
    this
  );

  this.map.addInteraction(this.measure);
};

module.controller('gmfMeasueMobileBaseController', MeasueMobileBaseController);

export default module;
