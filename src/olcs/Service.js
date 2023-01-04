/* global Cesium */

import angular from 'angular';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import {Permalink3dParam} from 'ngeo/olcs/constants.js';
import ngeoStatemanagerService from 'ngeo/statemanager/Service.js';

/**
 * @hidden
 */
export const OlcsService = class {
  /**
   * @ngInject
   * @param {!import("ngeo/misc/debounce.js").miscDebounce<function(): void>} ngeoDebounce ngeo debounce
   *    service.
   * @param {!import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo location
   *    service.
   * @param {import("ngeo/statemanager/Service.js").StatemanagerService} ngeoStateManager The ngeo
   *    StateManager service.
   */
  constructor(ngeoDebounce, ngeoLocation, ngeoStateManager) {
    /**
     * @private
     * @type {import('olcs/contrib/Manager.js').default|undefined}
     */
    this.manager_;

    /**
     * @private
     * @type {!import("ngeo/misc/debounce.js").miscDebounce<function(): void>}
     */
    this.ngeoDebounce_ = ngeoDebounce;

    /**
     * @private
     * @type {!import("ngeo/statemanager/Location.js").StatemanagerLocation}
     */
    this.ngeoLocation_ = ngeoLocation;

    /**
     * @private
     * @type {import("ngeo/statemanager/Service.js").StatemanagerService}
     */
    this.ngeoStateManager_ = ngeoStateManager;
  }

  /**
   * @param {import('olcs/contrib/Manager.js').default} manager Manager.
   */
  initialize(manager) {
    this.manager_ = manager;

    this.manager_.on('load', () => {
      this.cameraToState_();
    });

    if (this.ngeoStateManager_.getInitialBooleanValue('3d_enabled')) {
      this.initialStateToCamera_();
    }
  }

  /**
   * @return {import('olcs/contrib/Manager.js').default|undefined} the manager.
   */
  getManager() {
    return this.manager_;
  }

  /**
   * @private
   * @return {Promise<undefined>} A promise after load & enabled.
   */
  initialStateToCamera_() {
    const stateManager = this.ngeoStateManager_;

    const lon = stateManager.getInitialNumberValue(Permalink3dParam.LON);
    const lat = stateManager.getInitialNumberValue(Permalink3dParam.LAT);
    const elevation = stateManager.getInitialNumberValue(Permalink3dParam.ELEVATION);
    const heading = stateManager.getInitialNumberValue(Permalink3dParam.HEADING) || 0;
    const pitch = stateManager.getInitialNumberValue(Permalink3dParam.PITCH) || 0;

    console.assert(lon !== undefined);
    console.assert(lat !== undefined);
    console.assert(elevation !== undefined);
    return this.manager_.set3dWithView(lon, lat, elevation, heading, pitch);
  }

  /**
   * @private
   */
  cameraToState_() {
    const manager = this.manager_;
    const scene = manager.getOl3d().getCesiumScene();
    const camera = scene.camera;

    camera.moveEnd.addEventListener(
      this.ngeoDebounce_(
        () => {
          const position = camera.positionCartographic;
          this.ngeoStateManager_.updateState({
            [Permalink3dParam.ENABLED]: true,
            // @ts-ignore: Cesium
            [Permalink3dParam.LON]: Cesium.Math.toDegrees(position.longitude).toFixed(5),
            // @ts-ignore: Cesium
            [Permalink3dParam.LAT]: Cesium.Math.toDegrees(position.latitude).toFixed(5),
            [Permalink3dParam.ELEVATION]: position.height.toFixed(0),
            // @ts-ignore: Cesium
            [Permalink3dParam.HEADING]: Cesium.Math.toDegrees(camera.heading).toFixed(3),
            // @ts-ignore: Cesium
            [Permalink3dParam.PITCH]: Cesium.Math.toDegrees(camera.pitch).toFixed(3),
          });
        },
        1000,
        true
      )
    );

    this.manager_.on('toggle', (event) => {
      if (!event.target.is3dEnabled()) {
        this.remove3dState_();
      }
    });
  }

  /**
   * @private
   */
  remove3dState_() {
    this.ngeoLocation_.getParamKeysWithPrefix(Permalink3dParam.PREFIX).forEach((key) => {
      this.ngeoStateManager_.deleteParam(key);
    });
  }
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular
  .module(name, [ngeoMiscDebounce.name, ngeoStatemanagerLocation.name, ngeoStatemanagerService.name])
  .service('ngeoOlcsService', OlcsService);

export default module;
