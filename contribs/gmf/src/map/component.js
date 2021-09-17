// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
import gmfPermalinkModule from 'gmf/permalink/module';
import gmfEditingSnapping from 'gmf/editing/Snapping';
import gmfFileDropZoneModule from 'gmf/dropfile/module';
import ngeoMapModule from 'ngeo/map/module';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfMapComponent', [
  gmfPermalinkModule.name,
  gmfEditingSnapping.name,
  gmfFileDropZoneModule.name,
  ngeoMapModule.name,
  ngeoMapFeatureOverlayMgr.name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/map', require('./component.html'));
  }
);

/**
 * A "map" directive for a GeoMapFish application.
 *
 * Example:
 *
 *      <gmf-map gmf-map-map="mainCtrl.map"></gmf-map>
 *
 * @htmlAttribute {import('ol/Map').default} gmf-map-map The map.
 * @htmlAttribute {boolean|undefined} gmf-map-manage-resize Whether to update
 *     the size of the map on browser window resize.
 * @htmlAttribute {boolean|undefined} gmf-map-resize-transition The duration
 *     (milliseconds) of the animation that may occur on the div containing
 *     the map. Used to smoothly resize the map while the animation is in
 *     progress.
 * @returns {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMap
 */
function gmfMapComponent() {
  return {
    scope: {
      'map': '<gmfMapMap',
      'manageResize': '<gmfMapManageResize',
      'resizeTransition': '<gmfMapResizeTransition',
    },
    controller: 'GmfMapController as ctrl',
    bindToController: true,
    templateUrl: 'gmf/map',
  };
}

myModule.directive('gmfMap', gmfMapComponent);

/**
 * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 * @param {import('gmf/permalink/Permalink').PermalinkService} gmfPermalink The gmf permalink service.
 * @param {import('gmf/editing/Snapping').EditingSnappingService} gmfSnapping The gmf snapping service.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMapController
 */
export function Controller(ngeoFeatureOverlayMgr, gmfPermalink, gmfSnapping, $injector) {
  // Scope properties

  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {?boolean}
   */
  this.manageResize = null;

  /**
   * @type {?boolean}
   */
  this.resizeTransition = null;

  // Injected properties

  /**
   * @type {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr}
   */
  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;

  /**
   * @type {import('gmf/permalink/Permalink').PermalinkService}
   */
  this.gmfPermalink_ = gmfPermalink;

  /**
   * @type {import('gmf/editing/Snapping').EditingSnappingService}
   */
  this.gmfSnapping_ = gmfSnapping;

  /**
   * @type {?boolean}
   */
  this.fileDropEnabled = $injector.has('gmfFileDropEnabled') ? $injector.get('gmfFileDropEnabled') : false;
}

/**
 * Called on initialization of the controller.
 */
Controller.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  this.ngeoFeatureOverlayMgr_.init(this.map);
  this.gmfPermalink_.setMap(this.map);
  this.gmfSnapping_.setMap(this.map);
};

myModule.controller('GmfMapController', Controller);

export default myModule;
