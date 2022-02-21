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
import './drawfeature.css';
import 'bootstrap/js/src/tooltip';
import gmfMapComponent from 'gmf/map/component';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';

import gmfDrawingModule from 'gmf/drawing/module';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties';
import ngeoMapModule from 'ngeo/map/module';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfDrawingModule.name,
  gmfMapComponent.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ngeo/misc/FeatureHelper').FeatureHelper} ngeoFeatureHelper Gmf feature helper service.
 * @param {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>} ngeoFeatures Collection of
 *    features.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @class
 * @ngInject
 */
function MainController($scope, ngeoFeatureHelper, ngeoFeatures, ngeoToolActivateMgr) {
  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  const view = new olView({
    center: [0, 0],
    zoom: 3,
  });

  ngeoFeatureHelper.setProjection(view.getProjection());

  const featureOverlay = ngeoMapFeatureOverlayMgr.getFeatureOverlay();
  featureOverlay.setFeatures(ngeoFeatures);

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: view,
  });

  /**
   * @type {boolean}
   */
  this.drawFeatureActive = true;

  const drawFeatureToolActivate = new ngeoMiscToolActivate(this, 'drawFeatureActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawFeatureToolActivate, true);

  /**
   * @type {boolean}
   */
  this.pointerMoveActive = false;

  const pointerMoveToolActivate = new ngeoMiscToolActivate(this, 'pointerMoveActive');
  ngeoToolActivateMgr.registerTool('mapTools', pointerMoveToolActivate, false);

  $scope.$watch(
    () => this.pointerMoveActive,
    (newVal) => {
      if (newVal) {
        this.map.on(
          /** @type {import('ol/Observable').EventTypes} */ ('pointermove'),
          /** @type {function(?): ?} */ (
            /**
             * @param {import('ol/MapBrowserEvent').default<unknown>} evt
             */ (evt) => {
              this.handleMapPointerMove_(evt);
            }
          )
        );
      } else {
        this.map.un(
          /** @type {import('ol/Observable').EventTypes} */ ('pointermove'),
          /** @type {function(?): ?} */ (
            /**
             * @param {import('ol/MapBrowserEvent').default<unknown>} evt
             */ (evt) => {
              this.handleMapPointerMove_(evt);
            }
          )
        );
        $('#pointermove-feature').html('');
      }
    }
  );

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover',
  });
}

/**
 * @param {import('ol/MapBrowserEvent').default<unknown>} evt MapBrowser event
 */
MainController.prototype.handleMapPointerMove_ = function (evt) {
  const pixel = evt.pixel;

  const feature = this.map.forEachFeatureAtPixel(pixel, (feature) => feature);

  $('#pointermove-feature').html(feature ? feature.get(ngeoFormatFeatureProperties.NAME) : 'None');

  this.scope_.$apply();
};

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
