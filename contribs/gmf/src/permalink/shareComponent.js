import angular from 'angular';
import gmfPermalinkShareService, {URL_MAX_LEN, URL_PATH_MAX_LEN} from 'gmf/permalink/ShareService.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import {getUid as olUtilGetUid} from 'ol/util.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfPermalinkShareComponent', [
  gmfPermalinkShareService.name,
  ngeoStatemanagerLocation.name,
]);

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/permalink/shareComponent', require('./shareComponent.html'));
  }
);

module.value(
  'gmfPermalinkShareTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfPermalinkShareTemplateUrl'];
    return templateUrl !== undefined ? templateUrl : 'gmf/permalink/shareComponent';
  }
);

/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} gmfPermalinkShareTemplateUrl Template function.
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
 *      <gmf-share
 *        gmf-share-email="true">
 *      </gmf-share>
 *
 * @htmlAttribute {boolean} gmf-share-email Enable emailing capability.
 * @type {!angular.IComponentOptions}
 */
const permalinkShareComponent = {
  bindings: {
    'enableEmail': '<gmfShareEmail',
  },
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
   * @constructor
   * @ngInject
   * @ngdoc controller
   * @ngname GmfShareController
   */
  constructor($scope, ngeoLocation, gmfShareService, $q, $attrs) {
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
     * @type {boolean}
     */
    this.enableEmail;

    /**
     * @type {string}
     */
    this.shortLink;

    /**
     * @type {string}
     */
    this.email;

    /**
     * @type {string}
     */
    this.message;

    /**
     * @type {string}
     * @private
     */
    this.permalink_ = this.ngeoLocation_.getUriString();

    /**
     * @type {boolean}
     */
    this.showLengthWarning =
      this.permalink_.length > URL_MAX_LEN || ngeoLocation.getPath().length > URL_PATH_MAX_LEN;

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
    this.errorOnGetShortUrl = false;

    this.getShortUrl();
  }

  /**
   * Get the short version of the permalink if the email is not provided
   */
  getShortUrl() {
    this.$q_.when(this.gmfShareService_.getShortUrl(this.permalink_)).then(
      (resp) => {
        this.shortLink = /** @type {angular.IHttpResponse} */ (resp).data.short_url;
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
    if (this.$scope_['gmfShareForm'].$valid) {
      this.$q_.when(this.gmfShareService_.sendShortUrl(this.permalink_, this.email, this.message)).then(
        (resp) => {
          this.successfullySent = true;
        },
        (resp) => {
          this.errorOnsend = true;
        }
      );
    }
  }
}

module.controller('GmfShareController', ShareComponentController);

export default module;
