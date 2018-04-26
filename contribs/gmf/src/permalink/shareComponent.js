/**
 * @module gmf.permalink.shareComponent
 */
import gmfPermalinkShareService from 'gmf/permalink/ShareService.js';

const exports = angular.module('gmfPermalinkShareComponent', [
  gmfPermalinkShareService.module.name,
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


/**
 * The controller for the share component
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.statemanager.Location} ngeoLocation ngeo Location service.
 * @param {gmf.permalink.ShareService} gmfShareService service for sharing map.
 * @param {angular.$q} $q Angular q service
 * @param {angular.Attributes} $attrs Attributes.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfShareController
 */
exports.Controller_ = function($scope, ngeoLocation, gmfShareService, $q, $attrs) {

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
  this.permalink = ngeoLocation.getUriString();

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
   * @type {boolean}
   * @export
   */
  this.showLengthWarning = this.permalink.length > gmfPermalinkShareService.URL_MAX_LEN ||
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

};


/**
 * Get the short version of the permalink if the email is not provided
 * @export
 */
exports.Controller_.prototype.getShortUrl = function() {
  this.$q_.when(this.gmfShareService_.getShortUrl(this.permalink))
    .then(
      onSuccess_.bind(this),
      onError_.bind(this)
    );

  /**
   * Success handler when trying to fetch a short url for the permalink
   * @param  {gmfx.ShortenerAPIResponse|angular.$http.HttpPromise} resp service response
   * @private
   */
  function onSuccess_(resp) {
    this.shortLink = resp.data.short_url;
    this.errorOnGetShortUrl = false;
  }

  /**
   * Error handler when trying to fetch a short url for the permalink
   * @param  {gmfx.ShortenerAPIResponse|angular.$http.HttpPromise} resp service response
   * @private
   */
  function onError_(resp) {
    this.shortLink = this.permalink;
    this.errorOnGetShortUrl = true;
  }

};


/**
 * Send the short version of the permalink if the email is provided
 * @export
 */
exports.Controller_.prototype.sendShortUrl = function() {
  if (this.$scope_['gmfShareForm'].$valid) {
    this.$q_.when(this.gmfShareService_.sendShortUrl(this.permalink, this.email, this.message))
      .then(
        onSuccess_.bind(this),
        onError_.bind(this)
      );
  }

  /**
   * Success handler when trying to send the short version of the permalink
   * @param  {gmfx.ShortenerAPIResponse|angular.$http.HttpPromise} resp service response
   * @private
   */
  function onSuccess_(resp) {
    this.successfullySent = true;
  }

  /**
   * Error handler when trying to to send the short version of the permalink
   * @param  {gmfx.ShortenerAPIResponse|angular.$http.HttpPromise} resp service response
   * @private
   */
  function onError_(resp) {
    this.errorOnsend = true;
  }

};

exports.controller('GmfShareController', exports.Controller_);


export default exports;
