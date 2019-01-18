/**
 */
import angular from 'angular';
import gmfPermalinkShareService from 'gmf/permalink/ShareService.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import {getUid as olUtilGetUid} from 'ol/util.js';

const exports = angular.module('gmfPermalinkShareComponent', [
  gmfPermalinkShareService.name,
  ngeoStatemanagerLocation.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/permalink/shareComponent', require('./shareComponent.html'));
});


exports.value('gmfPermalinkShareTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfPermalinkShareTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/permalink/shareComponent';
  });


/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} gmfPermalinkShareTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfPermalinkShareTemplateUrl($attrs, gmfPermalinkShareTemplateUrl) {
  return gmfPermalinkShareTemplateUrl($attrs);
}


/**
 * Component to display a shortened permalink and share it by email
 * Example:
 *
 *      <gmf-share
 *        gmf-share-email="true">
 *      </gmf-share>
 *
 * @htmlAttribute {boolean} gmf-share-email Enable emailing capability.
 * @type {!angular.Component}
 */
const component = {
  bindings: {
    'enableEmail': '<gmfShareEmail'
  },
  controller: 'GmfShareController',
  templateUrl: gmfPermalinkShareTemplateUrl
};
exports.component('gmfShare', component);


class ShareComponentController {
  /**
   * The controller for the share component
   * @param {angular.IScope} $scope Scope.
   * @param {import("ngeo/statemanager/Location.js").default} ngeoLocation ngeo Location service.
   * @param {import("gmf/permalink/ShareService.js").default} gmfShareService service for sharing map.
   * @param {angular.IQService} $q Angular q service
   * @param {angular.IAttributes} $attrs Attributes.
   * @constructor
   * @ngInject
   * @ngdoc controller
   * @ngname GmfShareController
   */
  constructor($scope, ngeoLocation, gmfShareService, $q, $attrs) {

    /**
     * @type {number}
     * @export
     */
    this.uid = olUtilGetUid(this);

    /**
     * @type {angular.IScope}
     * @private
     */
    this.$scope_ = $scope;

    /**
     * @type {import("gmf/permalink/ShareService.js").default}
     * @private
     */
    this.gmfShareService_ = gmfShareService;

    /**
     * @type {angular.IQService}
     * @private
     */
    this.$q_ = $q;

    /**
     * @type {import("ngeo/statemanager/Location.js").default}
     * @private
     */
    this.ngeoLocation_ = ngeoLocation;

    /**
     * @type {boolean}
     * @export
     */
    this.enableEmail;

    /**
     * @type {string}
     * @export
     */
    this.shortLink;

    /**
     * @type {string}
     * @export
     */
    this.email;

    /**
     * @type {string}
     * @export
     */
    this.message;

    /**
     * @type {string}
     * @private
     */
    this.permalink_ = this.ngeoLocation_.getUriString();

    /**
     * @type {boolean}
     * @export
     */
    this.showLengthWarning = this.permalink_.length > gmfPermalinkShareService.URL_MAX_LEN ||
    ngeoLocation.getPath() > gmfPermalinkShareService.URL_PATH_MAX_LEN;

    /**
     * @type {boolean}
     * @export
     */
    this.successfullySent = false;

    /**
     * @type {boolean}
     * @export
     */
    this.errorOnsend = false;

    /**
     * @type {boolean}
     * @export
     */
    this.errorOnGetShortUrl = false;

    this.getShortUrl();
  }

  /**
   * Get the short version of the permalink if the email is not provided
   * @export
   */
  getShortUrl() {
    this.$q_.when(this.gmfShareService_.getShortUrl(this.permalink_))
      .then((resp) => {
        this.shortLink = resp.data.short_url;
        this.errorOnGetShortUrl = false;
      }, (resp) => {
        this.shortLink = this.permalink;
        this.errorOnGetShortUrl = true;
      });
  }

  /**
   * Send the short version of the permalink if the email is provided
   * @export
   */
  sendShortUrl() {
    if (this.$scope_['gmfShareForm'].$valid) {
      this.$q_.when(this.gmfShareService_.sendShortUrl(this.permalink_, this.email, this.message))
        .then((resp) => {
          this.successfullySent = true;
        }, (resp) => {
          this.errorOnsend = true;
        });
    }
  }
}

exports.controller('GmfShareController', ShareComponentController);


export default exports;
