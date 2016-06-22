goog.provide('gmf.shareDirective');
goog.provide('gmf.ShareController');

goog.require('gmf');
goog.require('gmf.ShareService');


/**
 * Directive to display a shortened permalink and share it by email
 * Example:
 *
 *      <gmf-share
 *        gmf-share-email="true">
 *      </gmf-share>
 *
 * @htmlAttribute {boolean} gmf-share-email Enable emailing capability.
 * @return {angular.Directive}  The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfShare
 */
gmf.shareDirective = function() {
  return {
    restrict: 'E',
    controller: 'GmfShareController',
    controllerAs: 'shareCtrl',
    templateUrl: gmf.baseTemplateUrl + '/share.html'
  };
};


/**
* The controller for the share directive
* @param {angular.Scope} $scope Scope.
* @param {ngeo.Location} ngeoLocation ngeo Location service.
* @param {gmf.ShareService} gmfShareService service for sharing map.
* @param {angular.$q} $q Angular q service
* @param {angular.Attributes} $attrs Attributes.
* @constructor
* @ngInject
* @export
* @ngdoc controller
* @ngname GmfShareController
*/
gmf.ShareController = function($scope, ngeoLocation, gmfShareService, $q, $attrs) {


  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {gmf.ShareService}
   * @private
   */
  this.gmfShareService_ = gmfShareService;

  /**
   * @type {angular.$q}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {ngeo.Location}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type boolean
   * @export
   */
  this.enableEmail = $attrs['gmfShareEmail'] === 'true';

  /**
   * @type string
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
   * @type boolean
   * @export
   */
  this.showLenghtWarning = this.permalink.length > gmf.ShareService.URL_MAX_LEN ||
  ngeoLocation.getPath() > gmf.ShareService.URL_PATH_MAX_LEN;

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
  this.errorOnGetShortUrl;

  this.getShortUrl();

};


/**
 * Get the short version of the permalink if the email is not provided
 * @export
 */
gmf.ShareController.prototype.getShortUrl = function() {
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
gmf.ShareController.prototype.sendShortUrl = function() {
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
    this.errorOnsend_ = true;
  }

};


gmf.module.directive('gmfShare', gmf.shareDirective);
gmf.module.controller('GmfShareController', gmf.ShareController);
