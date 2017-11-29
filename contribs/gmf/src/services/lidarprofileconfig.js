goog.provide('gmf.LidarProfileConfig');

goog.require('gmf');


/**
 * TODO
 * @constructor
 * @struct
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfLidarProfileConfig
 */
gmf.LidarProfileConfig = function($http, pytreeLidarProfileJsonUrl) {
  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$http_ = $http;
  this.pytreeLidarProfileJsonUrl_ = pytreeLidarProfileJsonUrl;
  this.profileConfig = {};
  this.profileConfig.scaleX = {};
  this.profileConfig.currentScaleY = {};
  this.profileConfig.previousDomain = [];
  this.profileConfig.pointAttributes = {};
  this.profileConfig.currentZoom = 1;
  this.profileConfig.distanceOffset = 0;
  this.profileConfig.margin = {
    'left': 40,
    'top': 10,
    'right': 200,
    'bottom': 40
  };
  // snap tolerance for d3 profile highlight
  this.profileConfig.tolerance= 5;

};

gmf.LidarProfileConfig.prototype.initProfileConfig = function() {
  this.getConfig();
}

gmf.LidarProfileConfig.prototype.getConfig = function() {
  this.$http_.get(this.pytreeLidarProfileJsonUrl_ + '/profile_config_gmf2').then((resp) => {

    this.profileConfig.classification = resp.data['classification_colors'];
    this.profileConfig.profilWidth = resp.data['width'];
    this.profileConfig.minLOD = resp.data['minLOD'];
    this.profileConfig.maxLOD = resp.data['maxLOD'];
    this.profileConfig.initialLOD = resp.data['initialLOD'];
    this.profileConfig.pointSize = resp.data['point_size'];
    this.profileConfig.pointAttributes = resp.data['point_attributes'];
    this.profileConfig.defaultAttribute = resp.data['default_attribute'];
    this.profileConfig.defaultPointCloud = resp.data['default_point_cloud'];
    this.profileConfig.defaultColor = resp.data['default_color'];
    this.profileConfig.pointClouds = resp.data['pointclouds'];

    });
};

gmf.module.service('gmfLidarProfileConfig', gmf.LidarProfileConfig);
