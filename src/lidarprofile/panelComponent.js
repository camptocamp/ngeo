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

import angular from 'angular';
import gmfLidarprofileConfig from 'gmf/lidarprofile/Config';
import gmfLidarprofileManager from 'gmf/lidarprofile/Manager';
import ngeoDownloadCsv from 'ngeo/download/Csv';
import panels from 'gmfapi/store/panels';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfLidarprofilePanel', []);

myModule.value(
  'gmfLidarprofilePanelTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfLidarprofilePanelTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/lidarprofilePanel';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/lidarprofilePanel', require('./panelComponent.html'));
  }
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfLidarprofilePanelTemplateUrl
 *     Template function.
 * @returns {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfLidarprofilePanelTemplateUrl($element, $attrs, gmfLidarprofilePanelTemplateUrl) {
  return gmfLidarprofilePanelTemplateUrl($element, $attrs);
}

/**
 * Provide a component that display a lidar profile panel.
 * You can have only one lidarprofile in your page.
 *
 * Example:
 *
 *      <gmf-lidarprofile-panel
 *        gmf-lidarprofile-panel-active="ctrl.profileActive"
 *        gmf-lidarprofile-panel-map="::ctrl.map"
 *        gmf-lidarprofile-panel-line="ctrl.profileLine">
 *      </gmf-lidarprofile-panel>
 *
 * You must also have a pytreeLidarprofileJsonUrl constant defined like:
 * `module.constant('pytreeLidarprofileJsonUrl', 'https://sample.com/pytree/');`
 *
 * @ngdoc component
 * @ngname gmfLidarprofilePanel
 */
const lidarprofilePanelComponent = {
  controller: 'gmfLidarprofilePanelController',
  bindings: {
    'active': '=gmfLidarprofilePanelActive',
    'map': '<gmfLidarprofilePanelMap',
    'line': '=gmfLidarprofilePanelLine',
  },
  templateUrl: gmfLidarprofilePanelTemplateUrl,
};

myModule.component('gmfLidarprofilePanel', lidarprofilePanelComponent);

/**
 * @hidden
 */
export class Controller {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @ngInject
   * @ngdoc controller
   * @ngname gmfLidarprofilePanelController
   */
  constructor($scope) {
    /**
     * @type {boolean}
     */
    this.ready = false;

    /**
     * @type {import('gmf/lidarprofile/Config').LidarprofileConfigService}
     * @private
     */
    this.profileConfig_ = gmfLidarprofileConfig;

    /**
     * @type {import('gmf/lidarprofile/Manager').LidarprofileManager}
     */
    this.profile = gmfLidarprofileManager;

    /**
     * @type {boolean}
     */
    this.active = false;

    /**
     * @type {?import('ol/Map').default}
     */
    this.map = null;

    /**
     * The OpenLayers LineString geometry of the profle
     *
     * @type {?import('ol/geom/LineString').default}
     */
    this.line = null;

    /**
     * State of the measure tool
     *
     * @type {boolean}
     */
    this.measureActive = false;

    /**
     * @type {import('ngeo/download/Csv').DownloadCsvService}
     * @private
     */
    this.ngeoCsvDownload_ = ngeoDownloadCsv;

    // Activate the controls inside the panel.
    $scope.$watch(
      () => this.active,
      (newValue, oldValue) => {
        if (oldValue !== newValue) {
          this.updateEventsListening_(newValue);
        }
      }
    );

    // Watch the line to update the profileData (data for the chart).
    $scope.$watch(
      () => this.line,
      (newLine, oldLine) => {
        if (oldLine !== newLine) {
          this.update_();
        }
      }
    );
  }

  $onInit() {
    if (!this.map) {
      throw new Error('Missing map');
    }
    this.profile.init(this.profileConfig_, this.map);
  }

  /**
   * @private
   */
  initConfigAndActivateTool_() {
    this.profileConfig_.initProfileConfig().then((resp) => {
      this.ready = true;
    });
  }

  /**
   * @param {boolean} activate Activation state of the plugin
   * @private
   */
  updateEventsListening_(activate) {
    if (activate === true) {
      if (!this.ready) {
        this.initConfigAndActivateTool_();
      }
    } else {
      this.clearAll();
    }
  }

  /**
   * @private
   */
  update_() {
    this.profile.clearBuffer();
    if (this.line) {
      if (!this.profileConfig_.serverConfig) {
        throw new Error('Missing profileConfig_.serverConfig');
      }
      const panelOptions = {
        state: true,
      };
      panels.openFooterPanel('lidarresult', panelOptions);
      this.profile.setLine(this.line);
      this.profile.getProfileByLOD([], 0, true, this.profileConfig_.serverConfig.minLOD);
    } else {
      panels.closeFooterPanel();
      this.clearAll();
    }
  }

  /**
   * Clear the LIDAR profile tool.
   */
  clearAll() {
    this.line = null;
    this.profile.setLine(null);
    this.profile.cartoHighlight.setPosition(undefined);
    this.clearMeasure();
    this.resetPlot();
  }

  /**
   * Activate the measure tool
   */
  setMeasureActive() {
    if (!this.profile.measure) {
      throw new Error('Missing profile.measure');
    }
    this.measureActive = true;
    this.profile.measure.clearMeasure();
    this.profile.measure.setMeasureActive();
  }

  /**
   * Clear the current measure
   */
  clearMeasure() {
    if (!this.profile.measure) {
      throw new Error('Missing profile.measure');
    }
    this.measureActive = false;
    this.profile.measure.clearMeasure();
  }

  /**
   * Reload and reset the plot for the current profile (reloads data)
   */
  resetPlot() {
    this.profile.clearBuffer();
    if (this.line) {
      this.profile.getProfileByLOD([], 0, true, 0);
    }
  }

  /**
   * Get all available point attributes.
   *
   * @returns {import('gmf/lidarprofile/Config').LidarprofileServerConfigPointAttributes[] | undefined}
   *    Available point attributes.
   */
  getAvailablePointAttributes() {
    return this.profileConfig_.clientConfig.pointAttributes.availableOptions;
  }

  /**
   * Get / Set the selected point attribute
   *
   * @param {import('gmf/lidarprofile/Config').LidarprofileServerConfigPointAttribute} [opt_selectedOption]
   *    The new selected point attribute.
   * @returns {import('gmf/lidarprofile/Config').LidarprofileServerConfigPointAttribute|undefined}
   *    Selected point attribute
   */
  getSetSelectedPointAttribute(opt_selectedOption) {
    if (!this.profile.plot) {
      throw new Error('Missing profile.plot');
    }
    if (opt_selectedOption !== undefined) {
      this.profileConfig_.clientConfig.pointAttributes.selectedOption = opt_selectedOption;
      this.profile.plot.changeStyle(opt_selectedOption.value);
    }
    return this.profileConfig_.clientConfig.pointAttributes.selectedOption;
  }

  /**
   * Get the available classifications for this dataset
   *
   * @returns {import('gmf/lidarprofile/Config').LidarprofileServerConfigClassifications}
   *    classification list
   */
  getClassification() {
    if (!this.profileConfig_.serverConfig) {
      throw new Error('Missing profileConfig_.serverConfig');
    }
    return this.profileConfig_.serverConfig.classification_colors;
  }

  /**
   * Sets the visible classification in the profile
   *
   * @param {import('gmf/lidarprofile/Config').LidarprofileServerConfigClassification} classification
   *    selected value
   * @param {number} key of the classification code
   */
  setClassification(classification, key) {
    if (!this.profile.plot) {
      throw new Error('Missing profile.plot');
    }
    if (!this.profileConfig_.serverConfig) {
      throw new Error('Missing profileConfig_.serverConfig');
    }
    this.profileConfig_.serverConfig.classification_colors[key].visible = classification.visible;
    if (this.line) {
      this.profile.plot.setClassActive(
        this.profileConfig_.serverConfig.classification_colors,
        this.profileConfig_.serverConfig.default_attribute
      );
    }
  }

  /**
   * Export the profile data to CSV file
   */
  csvExport() {
    if (this.line) {
      const points = this.profile.utils.getFlatPointsByDistance(this.profile.profilePoints) || [];
      const csvData = this.profile.utils.getCSVData(points);
      const headerColumnNames = Object.keys(points[0]);
      const headerColumns = headerColumnNames.map((columnName) => {
        return {'name': columnName};
      });
      this.ngeoCsvDownload_.startDownload(csvData, headerColumns, 'LIDAR_profile.csv');
    }
  }

  /**
   * Export the current d3 chart to PNG file
   */
  pngExport() {
    if (this.line) {
      this.profile.utils.downloadProfileAsImageFile(this.profileConfig_.clientConfig);
    }
  }
}

myModule.controller('gmfLidarprofilePanelController', Controller);

export default myModule;
