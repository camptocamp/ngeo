import angular from 'angular';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfLidarprofile', []);

module.value(
  'gmfLidarprofileTemplateUrl',
  /**
   * @param {!JQuery} $element Element.
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} Template.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfLidarprofileTemplateUrl'];
    return templateUrl !== undefined ? templateUrl : 'gmf/lidarprofile';
  }
);

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/lidarprofile', require('./component.html'));
  }
);

/**
 * @param {!JQuery} $element Element.
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!JQuery, !angular.IAttributes): string} gmfLidarprofileTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
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
const lidarprofileComponent = {
  controller: 'GmfLidarprofileController',
  bindings: {
    'active': '=gmfLidarprofileActive',
    'line': '=gmfLidarprofileLine',
  },
  templateUrl: gmfLidarprofileTemplateUrl,
};

module.component('gmfLidarprofile', lidarprofileComponent);

/**
 * @private
 * @hidden
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
     */
    this.line;

    /**
     * The profile active state
     * @type {boolean}
     */
    this.active = false;

    // Watch the line to update the profileData (data for the chart).
    $scope.$watch(
      () => this.line,
      (newLine, oldLine) => {
        if (oldLine !== newLine) {
          this.active = !!this.line;
        }
      }
    );
  }
}

module.controller('GmfLidarprofileController', Controller);

export default module;
