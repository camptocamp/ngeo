import angular from 'angular';
import gmfControllersAbstractAppController from 'gmf/controllers/AbstractAppController.js';
import ngeoQueryBboxQueryComponent from 'ngeo/query/bboxQueryComponent.js';
import ngeoMapResizemap from 'ngeo/map/resizemap.js';
import * as olProj from 'ol/proj.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olControlScaleLine from 'ol/control/ScaleLine.js';
import olControlZoom from 'ol/control/Zoom.js';
import olControlRotate from 'ol/control/Rotate.js';
import * as olInteraction from 'ol/interaction.js';

/**
 * API application abstract controller.
 *
 * This file includes `goog.require`'s for desktop/api components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
class AbstractAPIController extends gmfControllersAbstractAppController {
  /**
   * @param {Config} config A part of the application config.
   * @param {angular.IScope} $scope Scope.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @ngInject
   */
  constructor(config, $scope, $injector) {
    super();

    const viewConfig = {
      projection: olProj.get(`EPSG:${config.srid || 21781}`)
    };
    Object.assign(viewConfig, config.mapViewConfig || {});

    const arrow = gmfControllersAbstractAppController.prototype.getLocationIcon();

    /**
     * @type {import("ol/Map.js").default}
     * @export
     */
    this.map = new olMap({
      pixelRatio: config.mapPixelRatio,
      layers: [],
      view: new olView(viewConfig),
      controls: config.mapControls || [
        new olControlScaleLine({
          target: document.getElementById('scaleline')
        }),
        new olControlZoom({
          zoomInTipLabel: '',
          zoomOutTipLabel: ''
        }),
        new olControlRotate({
          label: arrow,
          tipLabel: ''
        })
      ],
      interactions: config.mapInteractions || olInteraction.defaults({
        pinchRotate: true,
        altShiftDragRotate: true
      }),
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true
    });

    gmfControllersAbstractAppController.call(this, config, $scope, $injector);
  }
}

const module = angular.module('GmfAbstractAPIControllerModule', [
  gmfControllersAbstractAppController.name,
  ngeoMapResizemap.name,
  ngeoQueryBboxQueryComponent.name
]);

module.controller('AbstractAPIController', AbstractAPIController);

module.value('isDesktop', true);

module.value('ngeoQueryOptions', {
  'limit': 20
});


export default module;
