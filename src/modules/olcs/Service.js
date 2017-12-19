goog.module('ngeo.olcs.Service');

goog.require('ngeo.Debounce');
goog.require('ngeo.Location');
goog.require('ngeo.StateManager');

const Service = class {

  /**
   * @ngInject
   * @param {!ngeo.Debounce} ngeoDebounce ngeo debounce service.
   * @param {ngeo.Location} ngeoLocation ngeo location service.
   * @param {ngeo.StateManager} ngeoStateManager The ngeo StateManager service.
   */
  constructor(ngeoDebounce, ngeoLocation, ngeoStateManager) {
    /**
     * @private
     * @type {olcs.contrib.Manager|undefined}
     */
    this.manager_;

    /**
     * @private
     * @type {ngeo.Debounce}
     */
    this.ngeoDebounce_ = ngeoDebounce;

    /**
     * @private
     * @type {ngeo.Location}
     */
    this.ngeoLocation_ = ngeoLocation;

    /**
     * @private
     * @type {ngeo.StateManager}
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
   */
  initialStateToCamera_() {
    const stateManager = this.ngeoStateManager_;

    const lon = stateManager.getInitialNumberValue('3d_lon');
    const lat = stateManager.getInitialNumberValue('3d_lat');
    const elevation = stateManager.getInitialNumberValue('3d_elevation');
    const heading = stateManager.getInitialNumberValue('3d_heading') || 0;
    const pitch = stateManager.getInitialNumberValue('3d_pitch') || 0;

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
        '3d_enabled': true,
        '3d_lon': Cesium.Math.toDegrees(position.longitude).toFixed(5),
        '3d_lat': Cesium.Math.toDegrees(position.latitude).toFixed(5),
        '3d_elevation': position.height.toFixed(0),
        '3d_heading': Cesium.Math.toDegrees(camera.heading).toFixed(3),
        '3d_pitch': Cesium.Math.toDegrees(camera.pitch).toFixed(3)
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
    this.ngeoLocation_.getParamKeysWithPrefix('3d_').forEach((key) => {
      this.ngeoStateManager_.deleteParam(key);
    });
  }

};

const name = 'ngeoOlcsService';
Service.module = angular.module(name, []).service(name, Service);

exports = Service;
