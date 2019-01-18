/**
 */

import angular from 'angular';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfLidarprofile', []);


module.value('gmfLidarprofileTemplateUrl',
  /**
     * @param {!JQLite} $element Element.
     * @param {!angular.IAttributes} $attrs Attributes.
     * @return {string} Template.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfLidarprofileTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/lidarprofile';
  });

module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/lidarprofile', require('./component.html'));
});


/**
 * @param {!JQLite} $element Element.
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!JQLite, !angular.IAttributes): string} gmfLidarprofileTemplateUrl Template function.
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
const component = {
  controller: 'GmfLidarprofileController',
  bindings: {
    'active': '=gmfLidarprofileActive',
    'line': '=gmfLidarprofileLine'
  },
  templateUrl: gmfLidarprofileTemplateUrl
};

exports.component('gmfLidarprofile', component);


/**
 * @private
 */
class Controller {

  /**
   * @param {angular.IScope} $scope Angular scope.
   * @private
   * @ngInject
   * @ngdo controller
   * @ngname GmfLidarprofileController
  */
  constructor($scope) {

    /**
     * The Openlayer LineStringt that defines the profile
     * @type {import("ol/geom/LineString.js").default}
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
}


module.controller('GmfLidarprofileController', Controller);


export default module;
