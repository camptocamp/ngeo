/**
 * @module gmf.lidarprofile.component
 */


/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfLidarprofile', []);


exports.value('gmfLidarprofileTemplateUrl',
  /**
     * @param {!angular.JQLite} $element Element.
     * @param {!angular.Attributes} $attrs Attributes.
     * @return {string} Template.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfLidarprofileTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/lidarprofile';
  });

exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/lidarprofile', require('./component.html'));
});


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfLidarprofileTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfLidarprofileTemplateUrl($element, $attrs, gmfLidarprofileTemplateUrl) {
  return gmfLidarprofileTemplateUrl($element, $attrs);
}


/**
 * Provide a component that display a lidar profile panel.
 * You can have only one lidarprofile in your page.
 *
 * Example:
 *
 *      <gmf-lidarprofile
 *        gmf-lidarprofile-active="ctrl.profileActive"
 *        gmf-lidarprofile-line="ctrl.profileLine">
 *      </gmf-lidarprofile>
 *
 * @ngdoc component
 * @ngname gmfLidarprofile
 */
exports.component_ = {
  controller: 'GmfLidarprofileController',
  bindings: {
    'active': '=gmfLidarprofileActive',
    'line': '=gmfLidarprofileLine'
  },
  templateUrl: gmfLidarprofileTemplateUrl
};

exports.component('gmfLidarprofile', exports.component_);


/**
 * @private
 */
exports.Controller_ = class {

  /**
   * @param {angular.Scope} $scope Angular scope.
   * @private
   * @ngInject
   * @ngdo controller
   * @ngname GmfLidarprofileController
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


exports.controller('GmfLidarprofileController', exports.Controller_);


export default exports;
