goog.module('ngeo.olcs.Service');

goog.require('ngeo.Debounce');
goog.require('ngeo.Location');

const Service = class {

  /**
   * @ngInject
   * @param {angular.Scope} $rootScope Angular root scope.
   * @param {!ngeo.Debounce} ngeoDebounce ngeo debounce service.
   * @param {ngeo.Location} ngeoLocation ngeo location service.
   */
  constructor($rootScope, ngeoDebounce, ngeoLocation) {
    /**
     * @private
     * @type {olcs.contrib.Manager|undefined}
     */
    this.manager_;

    /**
     * @private
     * @type {angular.Scope}
     */
    this.$rootScope = $rootScope;

    /**
     * @private
     * @type {ngeo.Location}
     */
    this.ngeoDebounce_ = ngeoDebounce;

    /**
     * @private
     * @type {ngeo.Debounce}
     */
    this.ngeoLocation_ = ngeoLocation;

  }

  /**
   * @export
   * @param {olcs.contrib.Manager} manager Manager.
   */
  initialize(manager) {
    this.manager_ = manager;

    const unWatchFn = this.$rootScope.$watch(
      () => this.manager_.getOl3d(),
      (ol3d) => {
        if (ol3d) {
          if(this.ngeoLocation_.hasParam('3d_enabled')) {
            this.cameraFromPermalink_();
          }
          this.setupPermalink_();
          unWatchFn();
        }
      }
    );
  }

  /**
   * @export
   * @return {olcs.contrib.Manager|undefined} the manager.
   */
  getManager() {
    return this.manager_;
  }

  /**
   * @export
   * @return {number} the min tilt.
   */
  getMinTilt() {
    return 0;
  }

  /**
   * @export
   * Almost Pi / 2
   * @return {number} the max tilt.
   */
  getMaxTilt() {
    return 7 * Math.PI / 16;
  }

  /**
   * @private
   */
  cameraFromPermalink_() {
    const manager = this.manager_;
    const scene = manager.getOl3d().getCesiumScene();
    const camera = scene.camera;

    const lon = this.ngeoLocation_.getParamAsFloat('3d_lon');
    const lat = this.ngeoLocation_.getParamAsFloat('3d_lat');
    const elevation = this.ngeoLocation_.getParamAsInt('3d_elevation');
    const destination = Cesium.Cartesian3.fromDegrees(lon, lat, elevation);

    const heading = Cesium.Math.toRadians(
      this.ngeoLocation_.getParamAsFloat('3d_heading') || 0);
    const pitch = Cesium.Math.toRadians(
      this.ngeoLocation_.getParamAsFloat('3d_pitch') || 0);
    const roll = 0;
    const orientation = {heading, pitch, roll};

    camera.setView({
      destination,
      orientation
    });
  }

  /**
   * @private
   */
  setupPermalink_() {
    const manager = this.manager_;
    const scene = manager.getOl3d().getCesiumScene();
    const camera = scene.camera;
    const is3DCurrentlyEnabled = manager.getOl3d().getEnabled();

    camera.moveEnd.addEventListener(this.ngeoDebounce_(() => {
      if (is3DCurrentlyEnabled) {
        const position = camera.positionCartographic;
        this.ngeoLocation_.updateParams({
          '3d_enabled': true,
          '3d_lon': Cesium.Math.toDegrees(position.longitude).toFixed(5),
          '3d_lat': Cesium.Math.toDegrees(position.latitude).toFixed(5),
          '3d_elevation': position.height.toFixed(0),
          '3d_heading': Cesium.Math.toDegrees(camera.heading).toFixed(3),
          '3d_pitch': Cesium.Math.toDegrees(camera.pitch).toFixed(3)
        });
      }
    }, 1000, true));

    this.$rootScope.$watch(
      () => this.manager_.getOl3d().getEnabled(),
      this.on3dToggle_.bind(this)
    );
  }

  /**
   * @private
   */
  teardownPermalink_() {
    this.ngeoLocation_.getParamKeysWithPrefix('3d_').forEach((key) => {
      this.ngeoLocation_.deleteParam(key);
    });
  }

  /**
   * @private
   * @param {boolean} enabled Is 3d active or not.
   */
  on3dToggle_(enabled) {
    if (!enabled) {
      this.teardownPermalink_();
    }
  }

};

const name = 'ngeoOlcsService';
Service.module = angular.module(name, []).service(name, Service);

exports = Service;
