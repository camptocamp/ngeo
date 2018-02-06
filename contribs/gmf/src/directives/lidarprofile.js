goog.provide('gmf.lidarProfileComponent');
goog.require('gmf');


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
    'line': '=gmfLidarProfileLine'
  },
  templateUrl: gmfLidarProfileTemplateUrl
};


gmf.module.component('gmfLidarProfile', gmf.lidarProfileComponent);


/**
 * @private
 */
gmf.LidarProfileController_ = class {

  /**
   * @param {angular.Scope} $scope Angular scope.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname GmfLidarProfileController
  */
  constructor($scope) {

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
          this.active = !!this.line;
        }
      });
  }
};


gmf.module.controller('GmfLidarProfileController', gmf.LidarProfileController_);
