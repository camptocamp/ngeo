import angular from 'angular';
import gmfControllersAbstractAppController, {
  AbstractAppController,
  getLocationIcon,
} from 'gmf/controllers/AbstractAppController.js';
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
      projection: olProj.get(`EPSG:${config.srid || 21781}`),
    };
    Object.assign(viewConfig, config.mapViewConfig || {});

    super(
      config,
      new olMap({
        pixelRatio: config.mapPixelRatio,
        layers: [],
        view: new olView(viewConfig),
        controls: config.mapControls || [
          new olControlScaleLine({
            target: document.getElementById('scaleline'),
          }),
          new olControlZoom({
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
          olInteraction.defaults({
            pinchRotate: true,
            altShiftDragRotate: true,
          }),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true,
      }),
      $scope,
      $injector
    );
  }
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('GmfAbstractAPIControllerModule', [
  gmfControllersAbstractAppController.name,
  ngeoMapResizemap.name,
  ngeoQueryBboxQueryComponent.name,
]);

module.controller('AbstractAPIController', AbstractAPIController);

module.value('isDesktop', true);

module.value('ngeoQueryOptions', {
  'limit': 20,
});

export default module;
