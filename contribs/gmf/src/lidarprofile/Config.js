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

/**
 * @typedef {Object<number, LidarprofileServerConfigClassification>}
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
 * @typedef {Object<number, LidarprofileServerConfigLevel>}
 *     LidarprofileServerConfigLevels
 */

/**
 * @typedef {Object} LidarprofileServerConfigLevel
 * @property {number} [max] Max
 * @property {number} [width] Width
 */

/**
 * @typedef {Object<string, LidarprofileServerConfigPointAttribute>}
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
 * @property {Object<number, string>} [classes_names_normalized]
 *     Classes names normalized
 * @property {Object<number, string>} [classes_names_standard]
 *     Classes names standard
 * @property {LidarprofileServerConfigClassifications} [classification_colors]
 *     Classification colors
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
 * @property {LidarprofileServerConfigPointAttributes} [point_attributes]
 *     Point attributes
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
     * @type {?import("gmf/lidarprofile/Config.js").LidarprofileServerConfig}
     */
    this.serverConfig = null;
  }

  /**
   * Initialize the service variables from Pytree profile_config_gmf2 route
   * @return {angular.IPromise<void>} configuration values
   */
  initProfileConfig() {
    return this.$http_.get(`${this.pytreeLidarprofileJsonUrl}/profile/config`).then((resp) => {
      this.serverConfig = {
        classification_colors: resp.data.classification_colors || null,
        debug: !!resp.data.debug,
        default_attribute: resp.data.default_attribute || '',
        default_color: resp.data.default_color || '',
        default_point_attribute: resp.data.default_point_attribute || '',
        default_point_cloud: resp.data.default_point_cloud || '',
        initialLOD: resp.data.initialLOD || 0,
        max_levels: resp.data.max_levels || null,
        max_point_number: resp.data.max_point_number || 50000,
        minLOD: resp.data.minLOD || 0,
        point_attributes: resp.data.point_attributes || null,
        point_size: resp.data.point_size || 0,
        width: resp.data.width || 0,
      };

      const attr = [];
      for (const key in this.serverConfig.point_attributes) {
        if (this.serverConfig.point_attributes[key].visible == 1) {
          attr.push(this.serverConfig.point_attributes[key]);
        }
      }

      const selectedMat = this.serverConfig.point_attributes[this.serverConfig.default_point_attribute];

      this.clientConfig.pointAttributes = {
        // @ts-ignore
        availableOptions: attr,
        selectedOption: selectedMat,
      };
    });
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfLidarprofileConfig', []);
myModule.service('gmfLidarprofileConfig', LidarprofileConfigService);

export default myModule;
