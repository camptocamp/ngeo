// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import {Permalink3dParam} from 'ngeo/olcs/constants.js';
import ngeoStatemanagerService from 'ngeo/statemanager/Service.js';
import {toDegrees} from 'ol/math.js';

/**
 * @hidden
 */
export const OlcsService = class {
  /**
   * @ngInject
   * @param {import("ngeo/misc/debounce.js").miscDebounce<function(): void>} ngeoDebounce ngeo debounce
   *    service.
   * @param {import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo location
   *    service.
   * @param {import("ngeo/statemanager/Service.js").StatemanagerService} ngeoStateManager The ngeo
   *    StateManager service.
   */
  constructor(ngeoDebounce, ngeoLocation, ngeoStateManager) {
    /**
     * @private
     * @type {?import('olcs/contrib/Manager.js').default}
     */
    this.manager_ = null;

    /**
     * @private
     * @type {import("ngeo/misc/debounce.js").miscDebounce<function(): void>}
     */
    this.ngeoDebounce_ = ngeoDebounce;

    /**
     * @private
     * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
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
   * @return {?import('olcs/contrib/Manager.js').default} the manager.
   */
  getManager() {
    return this.manager_;
  }

  /**
   * @private
   * @return {Promise<undefined>} A promise after load & enabled.
   */
  initialStateToCamera_() {
    if (!this.manager_) {
      throw new Error('Missing manager');
    }
    const stateManager = this.ngeoStateManager_;

    const lon = stateManager.getInitialNumberValue(Permalink3dParam.LON);
    const lat = stateManager.getInitialNumberValue(Permalink3dParam.LAT);
    const elevation = stateManager.getInitialNumberValue(Permalink3dParam.ELEVATION);
    const heading = stateManager.getInitialNumberValue(Permalink3dParam.HEADING) || 0;
    const pitch = stateManager.getInitialNumberValue(Permalink3dParam.PITCH) || 0;

    if (!lon) {
      throw new Error('Missing lon');
    }
    if (!lat) {
      throw new Error('Missing lat');
    }
    if (!elevation) {
      throw new Error('Missing elevation');
    }
    return this.manager_.set3dWithView(lon, lat, elevation, heading, pitch);
  }

  /**
   * @private
   */
  cameraToState_() {
    if (!this.manager_) {
      throw new Error('Missing manager');
    }
    const manager = this.manager_;
    const scene = manager.getOl3d().getCesiumScene();
    const camera = scene.camera;

    camera.moveEnd.addEventListener(
      this.ngeoDebounce_(
        () => {
          const position = camera.positionCartographic;
          this.ngeoStateManager_.updateState({
            [Permalink3dParam.ENABLED]: true,
            [Permalink3dParam.LON]: toDegrees(position.longitude).toFixed(5),
            [Permalink3dParam.LAT]: toDegrees(position.latitude).toFixed(5),
            [Permalink3dParam.ELEVATION]: position.height.toFixed(0),
            [Permalink3dParam.HEADING]: toDegrees(camera.heading).toFixed(3),
            [Permalink3dParam.PITCH]: toDegrees(camera.pitch).toFixed(3),
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
 * @type {angular.IModule}
 * @hidden
 */
const module = angular
  .module(name, [ngeoMiscDebounce.name, ngeoStatemanagerLocation.name, ngeoStatemanagerService.name])
  .service('ngeoOlcsService', OlcsService);

export default module;
