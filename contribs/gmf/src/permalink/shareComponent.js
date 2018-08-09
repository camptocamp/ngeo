/**
 * @module gmf.permalink.shareComponent
 */
import gmfPermalinkShareService from 'gmf/permalink/ShareService.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import * as olBase from 'ol/index.js';

const exports = angular.module('gmfPermalinkShareComponent', [
  gmfPermalinkShareService.module.name,
  ngeoStatemanagerLocation.module.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/permalink/shareComponent', require('./shareComponent.html'));
});


exports.value('gmfPermalinkShareTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfPermalinkShareTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/permalink/shareComponent';
  });


/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} gmfPermalinkShareTemplateUrl Template function.
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
exports.component_ = {
  bindings: {
    'enableEmail': '<gmfShareEmail'
  },
  controller: 'GmfShareController',
  templateUrl: gmfPermalinkShareTemplateUrl
};
exports.component('gmfShare', exports.component_);


class ShareComponentController {
  /**
   * The controller for the share component
   * @param {angular.Scope} $scope Scope.
   * @param {ngeo.statemanager.Location} ngeoLocation ngeo Location service.
   * @param {gmf.permalink.ShareService} gmfShareService service for sharing map.
   * @param {angular.$q} $q Angular q service
   * @param {angular.Attributes} $attrs Attributes.
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
    this.uid = olBase.getUid(this);

    /**
     * @type {angular.Scope}
     * @private
     */
    this.$scope_ = $scope;

    /**
     * @type {gmf.permalink.ShareService}
     * @private
     */
    this.gmfShareService_ = gmfShareService;

    /**
     * @type {angular.$q}
     * @private
     */
    this.$q_ = $q;

    /**
     * @type {ngeo.statemanager.Location}
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
