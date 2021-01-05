// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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
import gmfControllersAbstractAppController, {
  AbstractAppController,
  getLocationIcon,
} from 'gmf/controllers/AbstractAppController.js';
import ngeoMapResizemap from 'ngeo/map/resizemap.js';
import {get as getProjection} from 'ol/proj.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olControlScaleLine from 'ol/control/ScaleLine.js';
import olControlZoom from 'ol/control/Zoom.js';
import olControlRotate from 'ol/control/Rotate.js';
import {defaults as interactionsDefaults} from 'ol/interaction.js';
import olInteractionDragPan from 'ol/interaction/DragPan.js';
import {noModifierKeys} from 'ol/events/condition.js';

/**
 * API application abstract controller.
 *
 * This file includes `import`'s for desktop/api components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
export class AbstractAPIController extends AbstractAppController {
  /**
   * @param {import('gmf/controllers/AbstractAppController.js').Config} config A part of the application
   * @param {angular.IScope} $scope Scope.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @ngInject
   */
  constructor(config, $scope, $injector) {
    const viewConfig = {
      projection: getProjection(`EPSG:${config.srid || 2056}`),
    };
    Object.assign(viewConfig, config.mapViewConfig || {});

    const scaleline = document.getElementById('scaleline');
    if (!scaleline) {
      throw new Error('Missing scaleline');
    }
    const map = new olMap({
      pixelRatio: config.mapPixelRatio,
      maxTilesLoading: config.maxTilesLoading || 128,
      layers: [],
      view: new olView(viewConfig),
      controls: config.mapControls || [
        new olControlScaleLine({
          target: scaleline,
          // See: https://www.w3.org/TR/CSS21/syndata.html#length-units
          dpi: 96,
        }),
        new olControlZoom({
          target: 'ol-zoom-control',
          zoomInTipLabel: '',
          zoomOutTipLabel: '',
        }),
        new olControlRotate({
          label: getLocationIcon(),
          tipLabel: '',
        }),
      ],
      interactions:
        config.mapInteractions ||
        interactionsDefaults({
          dragPan: false,
          pinchRotate: true,
          altShiftDragRotate: true,
        }),
    });
    map.addInteraction(
      new olInteractionDragPan({
        condition: dragPanCondition,
      })
    );

    super(config, map, $scope, $injector);
  }
}

/**
 * Allow map pan with all buttons except right click (context menu)
 * @param {import("ol/MapBrowserEvent.js").default} event MapBrowser event
 * @return {boolean}
 */
function dragPanCondition(event) {
  const pointerEvent = /** @type {import("ol/MapBrowserPointerEvent.js").default} */ (event).pointerEvent;
  return noModifierKeys(event) && pointerEvent.button !== 2;
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('GmfAbstractAPIControllerModule', [
  gmfControllersAbstractAppController.name,
  ngeoMapResizemap.name,
]);

module.controller('AbstractAPIController', AbstractAPIController);

module.value('isDesktop', true);

module.value('ngeoQueryOptions', {
  'limit': 20,
});

export default module;
