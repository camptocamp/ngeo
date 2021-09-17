// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfLidarprofile', []);

myModule.value(
  'gmfLidarprofileTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfLidarprofileTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/lidarprofile';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/lidarprofile', require('./component.html'));
  }
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfLidarprofileTemplateUrl Template function.
 * @returns {string} Template URL.
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

myModule.component('gmfLidarprofile', lidarprofileComponent);

/**
 * @hidden
 */
export class Controller {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @ngInject
   * @ngdo controller
   * @ngname GmfLidarprofileController
   */
  constructor($scope) {
    /**
     * The OpenLayers LineStringt that defines the profile
     *
     * @type {?import('ol/geom/LineString').default}
     */
    this.line = null;

    /**
     * The profile active state
     *
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

myModule.controller('GmfLidarprofileController', Controller);

export default myModule;
