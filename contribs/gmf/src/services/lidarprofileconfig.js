goog.provide('gmf.LidarProfileConfig');

goog.require('gmf');


/**
 * TODO
 * @constructor
 * @struct
 * @param {angular.$http} $http Angular http service.
 * @param {string} pytreeLidarProfileJsonUrl pytree Lidar profile URL.
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
  this.profileConfig.previousDomainX = [];
  this.profileConfig.previousDomainY = [];
  this.profileConfig.currentZoom = 1;
  this.profileConfig.distanceOffset = 0;
  this.profileConfig.margin = {
    'left': 40,
    'top': 10,
    'right': 200,
    'bottom': 40
  };

  this.profileConfig.tolerance = 5;
  this.profileConfig.configLoaded = false;

};

gmf.LidarProfileConfig.prototype.initProfileConfig = function() {
  return this.$http_.get(`${this.pytreeLidarProfileJsonUrl_}/profile_config_gmf2`).then((resp) => {

    this.profileConfig.classification = resp.data['classification_colors'];
    this.profileConfig.profilWidth = resp.data['width'];
    this.profileConfig.autoWidth = true;
    this.profileConfig.minLOD = resp.data['minLOD'];
    this.profileConfig.initialLOD = resp.data['initialLOD'];
    this.profileConfig.pointSize = resp.data['point_size'];
    this.profileConfig.pointAttributes = resp.data['point_attributes'];
    this.profileConfig.defaultPointAttribute = resp.data['default_point_attribute'];
    console.log('attributes from pytree', this.profileConfig.pointAttributes);
    this.profileConfig.maxLevels = resp.data['max_levels'];
    this.profileConfig.maxPoints = resp.data['max_point_number'];
    this.profileConfig.pointSum = 0;
    this.profileConfig.defaultAttribute = resp.data['default_attribute'];
    this.profileConfig.defaultPointCloud = resp.data['default_point_cloud'];
    this.profileConfig.defaultColor = resp.data['default_color'];
    this.profileConfig.pointClouds = resp.data['pointclouds'];

  });
};

gmf.LidarProfileConfig.prototype.getConfig = function() {

};

gmf.module.service('gmfLidarProfileConfig', gmf.LidarProfileConfig);
