import angular from 'angular';

/**
 * @typedef {Object.<number, !LidarprofileServerConfigClassification>}
 *     LidarprofileServerConfigClassifications
 */

/**
 * @typedef {Object} LidarprofileServerConfigClassification
 * @property {string} [color] Color
 * @property {string} [name] Name
 * @property {string} [value] Value
 * @property {number} [visible] Visible (Value can be 1 or 0)
 */

/**
 * @typedef {Object.<number, !LidarprofileServerConfigLevel>}
 *     LidarprofileServerConfigLevels
 */

/**
 * @typedef {Object} LidarprofileServerConfigLevel
 * @property {number} [max] Max
 * @property {number} [width] Width
 */

/**
 * @typedef {Object.<number, !LidarprofileServerConfigPointAttribute>}
 *     LidarprofileServerConfigPointAttributes
 */

/**
 * @typedef {Object} LidarprofileServerConfigPointAttribute
 * @property {number} [bytes] Bytes
 * @property {number} [elements] Elements
 * @property {string} [name] Name
 * @property {string} [value] Value
 * @property {number} [visible] Visible
 */

/**
 * @typedef {Object} LidarprofileServerConfig
 * @property {Object.<number, string>} [classes_names_normalized]
 *     Classes names normalized
 * @property {Object.<number, string>} [classes_names_standard]
 *     Classes names standard
 * @property {LidarprofileServerConfigClassifications}
 *     [classification_colors] Classification colors
 * @property {boolean} [debug] Debug
 * @property {string} [default_attribute] Default attribute
 * @property {string} [default_color] Default color
 * @property {string} [default_point_attribute] Default point
 *     attribute
 * @property {string} [default_point_cloud] Default point cloud
 * @property {number} [initialLOD] Initial LOD
 * @property {LidarprofileServerConfigLevels} [max_levels] Max levels
 * @property {number} [max_point_number] Max point number
 * @property {number} [minLOD] Min LOD
 * @property {LidarprofileServerConfigPointAttributes}
 *     [point_attributes] Point attributes
 * @property {number} [point_size] Point size
 * @property {number} [vertical_pan_tolerance] Vertical pan tolerance
 * @property {number} [width] Width
 */

/**
 * @hidden
 */
export class LidarprofileConfigService {
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
     * @type {import("gmf/lidarprofile/Utils.js").LidarprofileClientConfig}
     */
    this.clientConfig = {
      autoWidth: true,
      margin: {
        'left': 40,
        'top': 10,
        'right': 200,
        'bottom': 40,
      },
      pointAttributes: {},
      pointSum: 0,
      tolerance: 5,
    };

    /**
     * The configuration from the LIDAR server.
     * @type {import("gmf/lidarprofile/Config.js").LidarprofileServerConfig}
     */
    this.serverConfig = null;
  }

  /**
   * Initialize the service variables from Pytree profile_config_gmf2 route
   * @return {angular.IPromise} configuration values
   */
  initProfileConfig() {
    return this.$http_.get(`${this.pytreeLidarprofileJsonUrl}/profile/config`).then((resp) => {
      this.serverConfig = /** @type {import("gmf/lidarprofile/Config.js").LidarprofileServerConfig} */ ({
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
        width: resp.data['width'] || 0,
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
        selectedOption: selectedMat,
      };
    });
  }
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfLidarprofileConfig', []);
module.service('gmfLidarprofileConfig', LidarprofileConfigService);

export default module;
