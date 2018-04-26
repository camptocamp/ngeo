/**
 * @module ngeo.olcs.Service
 */
import googAsserts from 'goog/asserts.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import ngeoOlcsConstants from 'ngeo/olcs/constants.js';
import ngeoStatemanagerService from 'ngeo/statemanager/Service.js';

const Service = class {

  /**
   * @ngInject
   * @param {!ngeox.miscDebounce} ngeoDebounce ngeo debounce service.
   * @param {!ngeo.statemanager.Location} ngeoLocation ngeo location service.
   * @param {ngeo.statemanager.Service} ngeoStateManager The ngeo StateManager service.
   */
  constructor(ngeoDebounce, ngeoLocation, ngeoStateManager) {
    /**
     * @private
     * @type {olcs.contrib.Manager|undefined}
     */
    this.manager_;

    /**
     * @private
     * @type {!ngeox.miscDebounce}
     */
    this.ngeoDebounce_ = ngeoDebounce;

    /**
     * @private
     * @type {!ngeo.statemanager.Location}
     */
    this.ngeoLocation_ = ngeoLocation;

    /**
     * @private
     * @type {ngeo.statemanager.Service}
     */
    this.ngeoStateManager_ = ngeoStateManager;

  }

  /**
   * @export
   * @param {olcs.contrib.Manager} manager Manager.
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
   * @export
   * @return {olcs.contrib.Manager|undefined} the manager.
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

    const lon = stateManager.getInitialNumberValue(ngeoOlcsConstants.Permalink3dParam.LON);
    const lat = stateManager.getInitialNumberValue(ngeoOlcsConstants.Permalink3dParam.LAT);
    const elevation = stateManager.getInitialNumberValue(ngeoOlcsConstants.Permalink3dParam.ELEVATION);
    const heading = stateManager.getInitialNumberValue(ngeoOlcsConstants.Permalink3dParam.HEADING) || 0;
    const pitch = stateManager.getInitialNumberValue(ngeoOlcsConstants.Permalink3dParam.PITCH) || 0;

    googAsserts.assert(lon !== undefined);
    googAsserts.assert(lat !== undefined);
    googAsserts.assert(elevation !== undefined);
    return this.manager_.set3dWithView(lon, lat, elevation, heading, pitch);
  }

  /**
   * @private
   */
  cameraToState_() {
    const manager = this.manager_;
    const scene = manager.getOl3d().getCesiumScene();
    const camera = scene.camera;

    camera.moveEnd.addEventListener(this.ngeoDebounce_(() => {
      const position = camera.positionCartographic;
      this.ngeoStateManager_.updateState({
        [ngeoOlcsConstants.Permalink3dParam.ENABLED]: true,
        [ngeoOlcsConstants.Permalink3dParam.LON]: Cesium.Math.toDegrees(position.longitude).toFixed(5),
        [ngeoOlcsConstants.Permalink3dParam.LAT]: Cesium.Math.toDegrees(position.latitude).toFixed(5),
        [ngeoOlcsConstants.Permalink3dParam.ELEVATION]: position.height.toFixed(0),
        [ngeoOlcsConstants.Permalink3dParam.HEADING]: Cesium.Math.toDegrees(camera.heading).toFixed(3),
        [ngeoOlcsConstants.Permalink3dParam.PITCH]: Cesium.Math.toDegrees(camera.pitch).toFixed(3)
      });
    }, 1000, true));

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
    this.ngeoLocation_.getParamKeysWithPrefix(ngeoOlcsConstants.Permalink3dParam.PREFIX).forEach((key) => {
      this.ngeoStateManager_.deleteParam(key);
    });
  }

};

const name = 'ngeoOlcsService';
Service.module = angular.module(name, [
  ngeoMiscDebounce.name,
  ngeoStatemanagerLocation.module.name,
  ngeoStatemanagerService.module.name,
]).service(name, Service);

const exports = Service;


export default exports;
