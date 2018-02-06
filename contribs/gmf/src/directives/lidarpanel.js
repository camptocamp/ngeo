goog.provide('gmf.lidarPanelComponent');

goog.require('gmf');
goog.require('gmf.lidarProfile.Config');
goog.require('gmf.lidarProfile.Manager');
/** @suppress {extraRequire} */
goog.require('ngeo.btngroupDirective');
goog.require('ngeo.CsvDownload');
goog.require('ngeo.ToolActivateMgr');
goog.require('ngeo.ToolActivate');
goog.require('ol.geom.LineString');


gmf.module.value('gmfLidarPanelTemplateUrl',
  /**
     * @param {!angular.JQLite} $element Element.
     * @param {!angular.Attributes} $attrs Attributes.
     * @return {string} Template.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfLidarPanelTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/lidarpanel.html`;
  });


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfLidarPanelTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfLidarPanelTemplateUrl($element, $attrs, gmfLidarPanelTemplateUrl) {
  return gmfLidarPanelTemplateUrl($element, $attrs);
}


/**
 * Provide a component that display a lidar profile panel.
 * @ngdoc component
 * @ngname gmfLidarPanel
 */
gmf.lidarPanelComponent = {
  controller: 'gmfLidarPanelController',
  bindings: {
    'active': '=gmfLidarPanelActive',
    'map': '<gmfLidarPanelMap',
    'line': '=gmfLidarPanelLine'
  },
  templateUrl: gmfLidarPanelTemplateUrl
};


gmf.module.component('gmfLidarPanel', gmf.lidarPanelComponent);


/**
 * @private
 */
gmf.LidarPanelController_ = class {

  /**
   * @param {angular.Scope} $scope Angular scope.
   * @param {gmf.lidarProfile.Manager} gmfLidarProfileManager gmf gmfLidarProfileManager.
   * @param {gmf.lidarProfile.Config} gmfLidarProfileConfig gmf Lidar profile config.
   * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager service
   * @param {ngeo.ToolActivate} ngeoToolActivate Ngeo ToolActivate service.
   * @param {ngeo.CsvDownload} ngeoCsvDownload CSV Download service.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname gmfLidarPanelController
   */
  constructor($scope, gmfLidarProfileManager, gmfLidarProfileConfig, ngeoToolActivateMgr,
    ngeoToolActivate, ngeoCsvDownload) {

    /**
     * @type {boolean}
     * @export
     */
    this.ready = false;

    /**
     * @type {gmf.lidarProfile.Config}
     * @private
     */
    this.profileConfig_ = gmfLidarProfileConfig;

    /**
     * @type {gmf.lidarProfile.Manager}
     */
    this.profile = gmfLidarProfileManager;

    /**
     * @type {boolean}
     * @export
     */
    this.active = false;

    /**
     * @type {ol.Map}
     * @export
     */
    this.map = null;

    /**
     * The Openlayers LineString geometry of the profle
     * @type {ol.geom.LineString}
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
     * @type {ngeo.CsvDownload}
     * @private
     */
    this.ngeoCsvDownload_ = ngeoCsvDownload;

    /**
     * @type {ngeo.ToolActivateMgr}
     * @private
     */
    this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

    // Initialize the tools inside of the tool manager
    this.tool = new ngeo.ToolActivate(this, 'active');
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
      this.profile.getProfileByLOD(0, true, this.profileConfig_.serverConfig.minLOD);
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
      this.profile.getProfileByLOD(0, true, 0);
    }
  }


  /**
   * Get all available point attributes.
   * @return {Array.<lidarProfileServer.ConfigPointAttributes>|undefined} available point attributes.
   * @export
   */
  getAvailablePointAttributes() {
    return this.profileConfig_.clientConfig.pointAttributes.availableOptions;
  }


  /**
   * Get / Set the selected point attribute
   * @param {lidarProfileServer.ConfigPointAttributes=} opt_selectedOption the new selected point attribute.
   * @return {lidarProfileServer.ConfigPointAttributes|undefined} Selected point attribute
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
   * @return {lidarProfileServer.ConfigClassifications} classification list
   */
  getClassification() {
    return this.profileConfig_.serverConfig.classification_colors;
  }


  /**
   * Sets the visible classification in the profile
   * @export
   * @param {lidarProfileServer.ConfigClassification} classification selected value
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
   * Get the profile width or set the profil width and request new profile from Pytree.
   * @param {number=} opt_profileWidth the new profile width.
   * @return {number} width of the profile
   * @export
   */
  getSetWidth(opt_profileWidth) {
    if (opt_profileWidth !== undefined) {
      this.profileConfig_.serverConfig.width = opt_profileWidth;
      if (this.line) {
        this.profile.clearBuffer();
        this.profile.getProfileByLOD(0, true, this.profileConfig_.serverConfig.minLOD);
      }
    }
    return this.profileConfig_.serverConfig.width;
  }


  /**
   * Use profile width defined per span and LOD in Pytree config
   * @param {boolean=} opt_autoWidth use a precalculated profile width from pytree if true.
   * @return {boolean} The autoWidth state
   * @export
   */
  getSetAutoWidth(opt_autoWidth) {
    if (opt_autoWidth !== undefined) {
      this.profileConfig_.clientConfig.autoWidth = opt_autoWidth;
      if (this.line) {
        this.profile.clearBuffer();
        this.profile.getProfileByLOD(0, true, this.profileConfig_.serverConfig.minLOD);
      }
    }
    return !!this.profileConfig_.clientConfig.autoWidth;
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
};

gmf.module.controller('gmfLidarPanelController', gmf.LidarPanelController_);
