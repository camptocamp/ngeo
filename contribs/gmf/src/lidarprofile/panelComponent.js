import angular from 'angular';
import gmfLidarprofileConfig from 'gmf/lidarprofile/Config.js';
import gmfLidarprofileManager from 'gmf/lidarprofile/Manager.js';
import gmfProfileDrawLineComponent from 'gmf/profile/drawLineComponent.js';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';
import ngeoDownloadCsv from 'ngeo/download/Csv.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';


/**
 * @type {!angular.IModule}
 */
const module = angular.module('gmfLidarprofilePanel', [
  gmfLidarprofileConfig.name,
  gmfLidarprofileManager.name,
  gmfProfileDrawLineComponent.name,
  ngeoMiscBtnComponent.name,
  ngeoDownloadCsv.name,
  ngeoMiscToolActivateMgr.name,
]);


module.value('gmfLidarprofilePanelTemplateUrl',
  /**
     * @param {!JQuery} $element Element.
     * @param {!angular.IAttributes} $attrs Attributes.
     * @return {string} Template.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfLidarprofilePanelTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/lidarprofilePanel';
  });

module.run(/* @ngInject */ ($templateCache) => {
  // @ts-ignore: webpack
  $templateCache.put('gmf/lidarprofilePanel', require('./panelComponent.html'));
});


/**
 * @param {!JQuery} $element Element.
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!JQuery, !angular.IAttributes): string} gmfLidarprofilePanelTemplateUrl
 *     Template function.
 * @return {string} Template URL.
 * @ngInject
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
const component = {
  controller: 'gmfLidarprofilePanelController',
  bindings: {
    'active': '=gmfLidarprofilePanelActive',
    'map': '<gmfLidarprofilePanelMap',
    'line': '=gmfLidarprofilePanelLine'
  },
  templateUrl: gmfLidarprofilePanelTemplateUrl
};


module.component('gmfLidarprofilePanel', component);


/**
 * @private
 */
class Controller {

  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {import("gmf/lidarprofile/Manager.js").LidarprofileManager} gmfLidarprofileManager gmf gmfLidarprofileManager.
   * @param {import("gmf/lidarprofile/Config.js").LidarprofileConfigService} gmfLidarprofileConfig gmf Lidar profile config.
   * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager service
   * @param {import("ngeo/download/Csv.js").DownloadCsvService} ngeoCsvDownload CSV Download service.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname gmfLidarprofilePanelController
   */
  constructor($scope, gmfLidarprofileManager, gmfLidarprofileConfig, ngeoToolActivateMgr,
    ngeoCsvDownload) {

    /**
     * @type {boolean}
     * @export
     */
    this.ready = false;

    /**
     * @type {import("gmf/lidarprofile/Config.js").LidarprofileConfigService}
     * @private
     */
    this.profileConfig_ = gmfLidarprofileConfig;

    /**
     * @type {import("gmf/lidarprofile/Manager.js").LidarprofileManager}
     */
    this.profile = gmfLidarprofileManager;

    /**
     * @type {boolean}
     * @export
     */
    this.active = false;

    /**
     * @type {import("ol/Map.js").default}
     * @export
     */
    this.map = null;

    /**
     * The Openlayers LineString geometry of the profle
     * @type {import("ol/geom/LineString.js").default}
     * @export
     */
    this.line;

    /**
     * State of the measure tool
     * @type {boolean}
     * @export
     */
    this.measureActive = false;

    /**
     * @type {import("ngeo/download/Csv.js").DownloadCsvService}
     * @private
     */
    this.ngeoCsvDownload_ = ngeoCsvDownload;

    /**
     * @type {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr}
     * @private
     */
    this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

    // Initialize the tools inside of the tool manager
    this.tool = new ngeoMiscToolActivate(this, 'active');
    this.ngeoToolActivateMgr_.registerTool('mapTools', this.tool, false);

    // Activate the controls inside the panel.
    $scope.$watch(
      () => this.active,
      (newValue, oldValue) => {
        if (oldValue !== newValue) {
          this.updateEventsListening_(newValue);
        }
      });

    // Watch the line to update the profileData (data for the chart).
    $scope.$watch(
      () => this.line,
      (newLine, oldLine) => {
        if (oldLine !== newLine) {
          this.update_();
        }
      });
  }


  /**
   * @private
   */
  $onInit() {
    this.profile.init(this.profileConfig_, this.map);
  }


  /**
   * @private
   */
  initConfigAndActivateTool_() {
    this.profileConfig_.initProfileConfig().then((resp) => {
      this.ready = true;
      this.ngeoToolActivateMgr_.activateTool(this.tool);
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
      } else {
        this.ngeoToolActivateMgr_.activateTool(this.tool);
      }
    } else {
      this.clearAll();
      this.ngeoToolActivateMgr_.deactivateTool(this.tool);
    }
  }


  /**
   * @private
   */
  update_() {
    this.profile.clearBuffer();
    if (this.line) {
      this.profile.setLine(this.line);
      this.profile.getProfileByLOD([], 0, true, this.profileConfig_.serverConfig.minLOD);
    } else {
      this.clearAll();
    }
  }

  /**
   * Clear the LIDAR profile tool.
   * @export
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
   * @export
   */
  setMeasureActive() {
    this.measureActive = true;
    this.profile.measure.clearMeasure();
    this.profile.measure.setMeasureActive();
  }


  /**
   * Clear the current measure
   * @export
   */
  clearMeasure() {
    this.measureActive = false;
    this.profile.measure.clearMeasure();
  }


  /**
   * Reload and reset the plot for the current profile (reloads data)
   * @export
   */
  resetPlot() {
    this.profile.clearBuffer();
    if (this.line) {
      this.profile.getProfileByLOD([], 0, true, 0);
    }
  }


  /**
   * Get all available point attributes.
   * @return {Array.<lidarprofileServer.ConfigPointAttributes>|undefined} available point attributes.
   * @export
   */
  getAvailablePointAttributes() {
    return this.profileConfig_.clientConfig.pointAttributes.availableOptions;
  }


  /**
   * Get / Set the selected point attribute
   * @param {lidarprofileServer.ConfigPointAttributes=} opt_selectedOption the new selected point attribute.
   * @return {lidarprofileServer.ConfigPointAttributes|undefined} Selected point attribute
   * @export
   */
  getSetSelectedPointAttribute(opt_selectedOption) {
    if (opt_selectedOption !== undefined) {
      this.profileConfig_.clientConfig.pointAttributes.selectedOption = opt_selectedOption;
      this.profile.plot.changeStyle(opt_selectedOption.value);
    }
    return this.profileConfig_.clientConfig.pointAttributes.selectedOption;
  }


  /**
   * Get the available classifications for this dataset
   * @export
   * @return {lidarprofileServer.ConfigClassifications} classification list
   */
  getClassification() {
    return this.profileConfig_.serverConfig.classification_colors;
  }


  /**
   * Sets the visible classification in the profile
   * @export
   * @param {lidarprofileServer.ConfigClassification} classification selected value
   * @param {number} key of the classification code
   */
  setClassification(classification, key) {
    this.profileConfig_.serverConfig.classification_colors[key].visible = classification.visible;
    if (this.line) {
      this.profile.plot.setClassActive(this.profileConfig_.serverConfig.classification_colors,
        this.profileConfig_.serverConfig.default_attribute);
    }
  }


  /**
   * Export the profile data to CSV file
   * @export
   */
  csvExport() {
    if (this.line) {
      const points = this.profile.utils.getFlatPointsByDistance(this.profile.profilePoints) || {};
      const csvData = this.profile.utils.getCSVData(points);
      let headerColumns = Object.keys(points[0]);
      headerColumns = headerColumns.map((column) => {
        return {'name': column};
      });
      this.ngeoCsvDownload_.startDownload(csvData, headerColumns, 'LIDAR_profile.csv');
    }
  }


  /**
   * Export the current d3 chart to PNG file
   * @export
   */
  pngExport() {
    if (this.line) {
      this.profile.utils.downloadProfileAsImageFile(this.profileConfig_.clientConfig);
    }
  }
}


module.controller('gmfLidarprofilePanelController', Controller);


export default module;
