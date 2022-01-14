// The MIT License (MIT)
//
// Copyright (c) 2018-2022 Camptocamp SA
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

import {LidarprofileClientConfig as GmfLidarprofileUtilsLidarprofileClientConfig} from 'ngeo/lidarprofile/Utils';

import configuration, {Configuration} from 'gmfapi/store/config';

export type LidarprofileServerConfigClassification = {
  /**
   * Color
   */
  color?: string;
  /**
   * Name
   */
  name?: string;
  /**
   * Value
   */
  value?: string;
  /**
   * Visible (Value can be 1 or 0)
   */
  visible?: number;
};

export type LidarprofileServerConfigClassifications = {
  [x: number]: LidarprofileServerConfigClassification;
};

type LidarprofileServerConfigLevel = {
  /**
   * Max
   */
  max?: number;
  /**
   * Width
   */
  width?: number;
};

export type LidarprofileServerConfigLevels = {
  [x: number]: LidarprofileServerConfigLevel;
};

export type LidarprofileServerConfigPointAttribute = {
  /**
   * Bytes
   */
  bytes?: number;
  /**
   * Elements
   */
  elements?: number;
  /**
   * Name
   */
  name?: string;
  /**
   * Value
   */
  value?: string;
  /**
   * Visible
   */
  visible?: number;
};

export type LidarprofileServerConfigPointAttributes = {
  [x: string]: LidarprofileServerConfigPointAttribute;
};

type LidarprofileServerConfig = {
  /**
   * Classes names normalized
   */
  classes_names_normalized?: {
    [x: number]: string;
  };
  /**
   * Classes names standard
   */
  classes_names_standard?: {
    [x: number]: string;
  };
  /**
   * Classification colors
   */
  classification_colors?: LidarprofileServerConfigClassifications;
  /**
   * Debug
   */
  debug?: boolean;
  /**
   * Default attribute
   */
  default_attribute?: string;
  /**
   * Default color
   */
  default_color?: string;
  /**
   * Default point
   * attribute
   */
  default_point_attribute?: string;
  /**
   * Default point cloud
   */
  default_point_cloud?: string;
  /**
   * Initial LOD
   */
  initialLOD?: number;
  /**
   * Max levels
   */
  max_levels?: LidarprofileServerConfigLevels;
  /**
   * Max point number
   */
  max_point_number?: number;
  /**
   * Min LOD
   */
  minLOD?: number;
  /**
   * Point attributes
   */
  point_attributes?: LidarprofileServerConfigPointAttributes;
  /**
   * Point size
   */
  point_size?: number;
  /**
   * Vertical pan tolerance
   */
  vertical_pan_tolerance?: number;
  /**
   * Width
   */
  width?: number;
};

export class LidarprofileConfigService {
  pytreeLidarprofileJsonUrl: string;

  loaded: boolean;

  /**
   * The client configuration.
   */
  clientConfig: GmfLidarprofileUtilsLidarprofileClientConfig;

  /**
   * The configuration from the LIDAR server.
   */
  serverConfig: undefined | LidarprofileServerConfig;

  /**
   * Configuration service to configure the gmf.lidarPanelComponent and gmf.lidarprofile instance
   * Requires a Pytree service: https://github.com/sitn/pytree
   */
  constructor() {
    configuration.getConfig().subscribe({
      next: (configuration: Configuration) => {
        if (configuration) {
          this.pytreeLidarprofileJsonUrl = configuration.pytreeLidarprofileJsonUrl;
        }
      },
    });

    this.loaded = false;

    /**
     * The client configuration.
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
     */
    this.serverConfig = null;
  }

  /**
   * Initialize the service variables from Pytree profile_config_gmf2 route
   *
   * @returns Promise<void | Response> The server configuration.
   */
  initProfileConfig(): Promise<void | Response> {
    const url = `${this.pytreeLidarprofileJsonUrl}/profile/config`;

    return fetch(url).then((resp) =>
      resp.json().then((data: LidarprofileServerConfig) => {
        this.serverConfig = {
          classification_colors: data.classification_colors || null,
          debug: !!data.debug,
          default_attribute: data.default_attribute || '',
          default_color: data.default_color || '',
          default_point_attribute: data.default_point_attribute || '',
          default_point_cloud: data.default_point_cloud || '',
          initialLOD: data.initialLOD || 0,
          max_levels: data.max_levels || null,
          max_point_number: data.max_point_number || 50000,
          minLOD: data.minLOD || 0,
          point_attributes: data.point_attributes || null,
          point_size: data.point_size || 0,
          width: data.width || 0,
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
      })
    );
  }
}

const gmfLidarprofileConfig = new LidarprofileConfigService();
export default gmfLidarprofileConfig;
