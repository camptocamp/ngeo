// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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
import olCollection from 'ol/Collection';
import olInteractionDraw from 'ol/interaction/Draw';
import olMap from 'ol/Map';
import olStyleStyle from 'ol/style/Style';
import olStyleStroke from 'ol/style/Stroke';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';
import {interactionDecoration} from 'ngeo/misc/decorate';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfDrawProfileLine', []);

/**
 * Simple directive that can be put on any element. The directive listen on
 * clicks events to allow/disallow to draw one line (and only one) on the
 * map. Typically used to draw the line that will serve the gmf.Profile.
 *
 * Example:
 *
 *      <gmf-drawprofileline
 *        gmf-drawprofileline-active="mainCtrl.drawProfileActive"
 *        gmf-drawprofileline-map="mainCtrl.map"
 *        gmf-drawprofileline-line="mainCtrl.line"
 *      </gmf-drawprofileline>
 *
 *
 * @htmlAttribute {import('ol/Map').default} gmf-drawprofileline-map The map.
 * @htmlAttribute {import('ol/geom/LineString').default} gmf-drawprofileline-line The variable to
 *     connect with the drawn line.
 * @htmlAttribute {boolean} [gmf]-drawprofileline-active Active the component.
 * @htmlAttribute {import('ol/style/Style').default} [gmf]-drawprofileline-style Optional style
 *     for the drawn line.
 * @returns {angular.IDirective} Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfDrawprofileline
 */
function profileDrawLineComponent() {
  return {
    scope: true,
    controller: 'GmfDrawprofilelineController as ctrl',
    restrict: 'A',
    bindToController: {
      'getMapFn': '&gmfDrawprofilelineMap',
      'line': '=gmfDrawprofilelineLine',
      'active': '=gmfDrawprofilelineActive',
      'getStyleFn': '&?gmfDrawprofilelineStyle',
    },
  };
}

myModule.directive('gmfDrawprofileline', profileDrawLineComponent);

/**
 * @param {angular.IScope} $scope Scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfDrawprofilelineController
 */
export function Controller($scope, $timeout) {
  /**
   * @type {?import('ol/geom/LineString').default}
   */
  this.line = null;

  /**
   * @type {?import('ol/Map').default}
   */
  this.map_ = null;

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.features_ = new olCollection();

  /**
   * @type {?() => olMap}
   */
  this.getMapFn = null;

  /**
   * @type {?() => olStyleStyle}
   */
  this.getStyleFn = null;

  /**
   * @type {import('ngeo/map/FeatureOverlay').FeatureOverlay}
   */
  const overlay = ngeoMapFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(this.features_);

  const style = new olStyleStyle({
    stroke: new olStyleStroke({
      color: '#ffcc33',
      width: 2,
    }),
  });
  overlay.setStyle(style);

  /**
   * @type {import('ol/interaction/Draw').default}
   */
  this.interaction = new olInteractionDraw({
    type: 'LineString',
    features: this.features_,
  });

  interactionDecoration(this.interaction);

  // Clear the line as soon as a new drawing is started.
  this.interaction.on(/** @type {import('ol/Observable').EventTypes} */ ('drawstart'), (event) => {
    this.features_.clear();
  });

  // Update the profile with the new geometry.
  this.interaction.on(
    /** @type {import('ol/Observable').EventTypes} */ ('drawend'),
    /** @type {function(?): ?} */ (
      /**
       * @param {import('lib/ol.interaction.Draw').DrawEvent} event
       */
      (event) => {
        this.line = /** @type {import('ol/geom/LineString').default} */ (event.feature.getGeometry());
        // using timeout to prevent double click to zoom the map
        $timeout(() => {
          this.interaction.setActive(false);
        }, 0);
      }
    )
  );

  // Line may be removed from an other component
  // for example closing the chart panel
  $scope.$watch(
    () => this.line,
    (newLine, oldLine) => {
      if (newLine === null) {
        this.clear_();
      }
    }
  );

  $scope.$watch(
    () => this.active,
    (newValue) => {
      if (newValue === false) {
        this.clear_();
      }
      // Will activate the interaction automatically the first time
      this.interaction.setActive(this.active);
    }
  );
}

/**
 * Initialise the controller.
 */
Controller.prototype.$onInit = function () {
  if (!this.getMapFn) {
    throw new Error('Missing getMapFn');
  }
  const map = this.getMapFn();
  if (!(map instanceof olMap)) {
    throw new Error('Wrong map');
  }
  this.map_ = map;
  this.map_.addInteraction(this.interaction);
};

/**
 * Clear the overlay and profile line.
 */
Controller.prototype.clear_ = function () {
  this.features_.clear();
  this.line = null;
};

myModule.controller('GmfDrawprofilelineController', Controller);

export default myModule;
