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
  this.profileConfig.currentZoom = 1;
  this.profileConfig.previousDomain = [];
  this.profileConfig.distanceOffset = 0;
  this.profileConfig.initialLOD = 7;
  this.profileConfig.pointAttributes = {};

};

gmf.LidarProfileConfig.prototype.initProfileConfig = function() {
  this.getClassificationColors();
  this.getSelectedMaterial();
  this.getMaterials();
  this.getWidth();
  this.getPointAttributes();
  this.getMinLOD();
  this.getMaxLOD();
}

gmf.LidarProfileConfig.prototype.getClassificationColors = function() {
  this.$http_.get(this.pytreeLidarProfileJsonUrl_ + '/get_classification_colors').then((resp) => {
    this.profileConfig.classification = resp.data;
  });
};

gmf.LidarProfileConfig.prototype.getMaterials = function() {

  this.profileConfig.materials = [
    {'name': 'COLOR_PACKED', 'value': 'COLOR_PACKED', 'selected': ''},
    {'name': 'RGB', 'value': 'RGB','selected': 'selected'},
    {'name': 'CLASSIFICATION',  'value': 'CLASSIFICATION','selected': ''}
  ]
};

gmf.LidarProfileConfig.prototype.getSelectedMaterial = function() {
  this.$http_.get(this.pytreeLidarProfileJsonUrl_ + '/get_default_material').then((resp) => {
    this.profileConfig.selectedMaterial = resp.data;
  });
};

gmf.LidarProfileConfig.prototype.getWidth = function() {
  this.profileConfig.profilWidth = 11;
};

gmf.LidarProfileConfig.prototype.getMinLOD = function() {
  this.profileConfig.minLOD = 0;
};

gmf.LidarProfileConfig.prototype.getMaxLOD = function() {
  this.profileConfig.maxLOD = 5;
};

gmf.LidarProfileConfig.prototype.getPointAttributes = function() {

  this.profileConfig.pointAttributes.POSITION_CARTESIAN = {
    name: 'POSITION_CARTESIAN',
    elements: 3,
    bytes: 12
  }

  this.profileConfig.pointAttributes.POSITION_PROJECTED_PROFILE = {
    name: 'POSITION_PROJECTED_PROFILE',
    elements: 2,
    bytes: 8
  }

  this.profileConfig.pointAttributes.COLOR_PACKED = {
    name: 'COLOR_PACKED',
    elements: 4,
    bytes: 4
  }

  this.profileConfig.pointAttributes.RGB = {
    name: 'RGB',
    elements: 3,
    bytes: 3
  }

  this.profileConfig.pointAttributes.RGBA = {
    name: 'RGBA',
    elements: 4,
    bytes: 4
  }

  this.profileConfig.pointAttributes.INTENSITY = {
    name: 'INTENSITY',
    elements: 1,
    bytes: 2
  }

  this.profileConfig.pointAttributes.CLASSIFICATION = {
    name: 'CLASSIFICATION',
    elements: 1,
    bytes: 1
  }
};

gmf.module.service('gmfLidarProfileConfig', gmf.LidarProfileConfig);
