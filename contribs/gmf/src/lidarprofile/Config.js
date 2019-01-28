import angular from 'angular';


class LidarprofileConfigService {
  /**
   * Configuration service to configure the gmf.lidarPanelComponent and gmf.lidarprofile instance
   * Requires a Pytree service: https://github.com/sitn/pytree
   *
   * @param {angular.IHttpService} $http Angular http service.
   * @param {string} pytreeLidarprofileJsonUrl pytree Lidar profile URL.
   * @ngInject
   * @ngdoc service
   * @ngname gmfLidarprofileConfig
   */
  constructor($http, pytreeLidarprofileJsonUrl) {

    /**
     * @type {angular.IHttpService}
     * @private
     */
    this.$http_ = $http;

    /**
     * @type {string}
     */
    this.pytreeLidarprofileJsonUrl = pytreeLidarprofileJsonUrl;

    /**
     * @type {boolean}
     */
    this.loaded = false;

    /**
     * The client configuration.
     * @type {LidarprofileClientConfig}
     */
    this.clientConfig = {
      autoWidth: true,
      margin: {
        'left': 40,
        'top': 10,
        'right': 200,
        'bottom': 40
      },
      pointAttributes: {},
      pointSum: 0,
      tolerance: 5
    };

    /**
     * The configuration from the LIDAR server.
     * @type {lidarprofileServer.Config}
     */
    this.serverConfig = null;
  }


  /**
   * Initialize the service variables from Pytree profile_config_gmf2 route
   * @return {angular.IPromise} configuration values
   * @export
   */
  initProfileConfig() {
    return this.$http_.get(`${this.pytreeLidarprofileJsonUrl}/profile/config`).then((resp) => {

      this.serverConfig = /** @type {lidarprofileServer.Config} */ ({
        classification_colors: resp.data['classification_colors'] || null,
        debug: !!resp.data['debug'],
        default_attribute: resp.data['default_attribute'] || '',
        default_color: resp.data['default_color'] || '',
        default_point_attribute: resp.data['default_point_attribute'] || '',
        default_point_cloud: resp.data['default_point_cloud'] || '',
        initialLOD: resp.data['initialLOD'] || 0,
        max_levels: resp.data['max_levels'] || null,
        max_point_number: resp.data['max_point_number'] || 50000,
        minLOD: resp.data['minLOD'] || 0,
        point_attributes: resp.data['point_attributes'] || null,
        point_size: resp.data['point_size'] || 0,
        width: resp.data['width'] || 0
      });

      const attr = [];
      for (const key in this.serverConfig.point_attributes) {
        if (this.serverConfig.point_attributes[key].visible == 1) {
          attr.push(this.serverConfig.point_attributes[key]);
        }
      }

      const selectedMat = this.serverConfig.point_attributes[this.serverConfig.default_point_attribute];

      this.clientConfig.pointAttributes = {
        availableOptions: attr,
        selectedOption: selectedMat
      };
    });
  }
}


/**
 * @type {!angular.IModule}
 */
const module = angular.module('gmfLidarprofileConfig', []);
module.service('gmfLidarprofileConfig', LidarprofileConfigService);

export default module;
