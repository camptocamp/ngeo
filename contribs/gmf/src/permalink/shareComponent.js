// The MIT License (MIT)
//
// Copyright (c) 2016-2020 Camptocamp SA
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
import gmfPermalinkShareService, {URL_MAX_LEN, URL_PATH_MAX_LEN} from 'gmf/permalink/ShareService.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import {getUid as olUtilGetUid} from 'ol/util.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfPermalinkShareComponent', [
  gmfPermalinkShareService.name,
  ngeoStatemanagerLocation.name,
]);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/permalink/shareComponent', require('./shareComponent.html'));
  }
);

module.value(
  'gmfPermalinkShareTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfPermalinkShareTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/permalink/shareComponent';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} gmfPermalinkShareTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfPermalinkShareTemplateUrl($attrs, gmfPermalinkShareTemplateUrl) {
  return gmfPermalinkShareTemplateUrl($attrs);
}

/**
 * Component to display a shortened permalink and share it by email Example:
 *
 *      <gmf-share></gmf-share>
 *
 * @type {angular.IComponentOptions}
 */
const permalinkShareComponent = {
  controller: 'GmfShareController',
  templateUrl: gmfPermalinkShareTemplateUrl,
};
module.component('gmfShare', permalinkShareComponent);

/**
 * @private
 * @hidden
 */
class ShareComponentController {
  /**
   * The controller for the share component
   * @param {angular.IScope} $scope Scope.
   * @param {import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo Location service.
   * @param {import("gmf/permalink/ShareService.js").PermalinkShareService} gmfShareService service for
   *    sharing map.
   * @param {angular.IQService} $q Angular q service
   * @param {angular.IAttributes} $attrs Attributes.
   * @param {import('gmf/options.js').gmfShareOptions} gmfShareOptions The options.
   * @constructor
   * @ngInject
   * @ngdoc controller
   * @ngname GmfShareController
   */
  constructor($scope, ngeoLocation, gmfShareService, $q, $attrs, gmfShareOptions) {
    this.options = gmfShareOptions;

    /**
     * @type {string}
     */
    this.uid = olUtilGetUid(this);

    /**
     * @type {angular.IScope}
     * @private
     */
    this.$scope_ = $scope;

    /**
     * @type {import("gmf/permalink/ShareService.js").PermalinkShareService}
     * @private
     */
    this.gmfShareService_ = gmfShareService;

    /**
     * @type {angular.IQService}
     * @private
     */
    this.$q_ = $q;

    /**
     * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
     * @private
     */
    this.ngeoLocation_ = ngeoLocation;

    /**
     * @type {string}
     */
    this.shortLink = '';

    /**
     * @type {string}
     */
    this.email = '';

    /**
     * @type {string}
     */
    this.message = '';

    /**
     * @type {string}
     * @private
     */
    this.permalink_ = this.ngeoLocation_.getUriString();

    const path = ngeoLocation.getPath();
    if (!path) {
      throw new Error('Missing path');
    }
    /**
     * @type {boolean}
     */
    this.showLengthWarning = this.permalink_.length > URL_MAX_LEN || path.length > URL_PATH_MAX_LEN;

    /**
     * @type {boolean}
     */
    this.successfullySent = false;

    /**
     * @type {boolean}
     */
    this.errorOnsend = false;

    /**
     * @type {boolean}
     */
    this.isFinishedState = true;

    /**
     * @type {boolean}
     */
    this.errorOnGetShortUrl = false;

    this.getShortUrl();
  }

  /**
   * Get the short version of the permalink if the email is not provided
   */
  getShortUrl() {
    this.$q_.when(this.gmfShareService_.getShortUrl(this.permalink_)).then(
      (resp) => {
        this.shortLink = /** @type {angular.IHttpResponse<{short_url: string}>} */ (resp).data.short_url;
        this.errorOnGetShortUrl = false;
      },
      (resp) => {
        this.shortLink = this.permalink_;
        this.errorOnGetShortUrl = true;
      }
    );
  }

  /**
   * Send the short version of the permalink if the email is provided
   */
  sendShortUrl() {
    this.errorOnsend = false;
    this.successfullySent = false;
    this.isFinishedState = false;

    // @ts-ignore: scope ......
    if (this.$scope_.gmfShareForm.$valid) {
      this.$q_.when(this.gmfShareService_.sendShortUrl(this.permalink_, this.email, this.message)).then(
        (resp) => {
          this.successfullySent = true;
          this.isFinishedState = true;
        },
        (resp) => {
          this.errorOnsend = true;
          this.isFinishedState = true;
        }
      );
    }
  }
}

module.controller('GmfShareController', ShareComponentController);

export default module;
