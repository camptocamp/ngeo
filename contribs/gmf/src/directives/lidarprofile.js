goog.provide('gmf.lidarProfileComponent');
goog.require('gmf');
goog.require('ol.geom.LineString');


gmf.module.value('gmfLidarProfileTemplateUrl',
  /**
     * @param {!angular.JQLite} $element Element.
     * @param {!angular.Attributes} $attrs Attributes.
     * @return {string} Template.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfLidarProfileTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/lidarprofile.html`;
  });


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfLidarProfileTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfLidarProfileTemplateUrl($element, $attrs, gmfLidarProfileTemplateUrl) {
  return gmfLidarProfileTemplateUrl($element, $attrs);
}


/**
 * Provide a component that display a lidar profile panel.
 * @ngdoc component
 * @ngname gmfLidarProfile
 */
gmf.lidarProfileComponent = {
  controller: 'GmfLidarProfileController',
  bindings: {
    'active': '=gmfLidarProfileActive',
    'line': '=gmfLidarProfileLine',
    'getMapFn': '&?gmfLidarProfileMap',
    'getOptionsFn': '&?gmfLidarProfileOptions'
  },
  templateUrl: gmfLidarProfileTemplateUrl
};


gmf.module.component('gmfLidarProfile', gmf.lidarProfileComponent);


/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {angular.$http} $http Angular http service.
 * @param {string} pytreeLidarProfileJsonUrl URL of GMF service JSON profile.
 * @param {gmf.LidarProfileConfig} gmfLidarProfileConfig LiDAR Profile Configuration Service
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfLidarProfileController
 */
gmf.LidarProfileController = function($scope, $http, pytreeLidarProfileJsonUrl, gmfLidarProfileConfig) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {string}
   * @private
   */
  this.pytreeLidarProfileJsonUrl_ = pytreeLidarProfileJsonUrl;

  /**
   * @type {gmf.LidarProfileConfig}
   * @private
   */
  this.gmfLidarProfileConfig_ = gmfLidarProfileConfig;

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = null;

  /**
   * The Openlayer LineStringt that defines the profile
   * @type {ol.geom.LineString}
   * @export
   */
  this.line;

  /**
   * The profile active state
   * @type {boolean}
   * @export
   */
  this.active = false;


  // Watch the line to update the profileData (data for the chart).
  $scope.$watch(
    () => this.line,
    (newLine, oldLine) => {
      if (oldLine !== newLine) {
        this.update_();
      }
    });

};


/**
 * @private
 */
gmf.LidarProfileController.prototype.$onInit = function() {
  this.map_ = this['getMapFn'] ? this['getMapFn']() : null;
};


/**
 * @private
 */
gmf.LidarProfileController.prototype.update_ = function() {
  this.active = !!this.line;
};


gmf.module.controller('GmfLidarProfileController', gmf.LidarProfileController);
