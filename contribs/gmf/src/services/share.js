goog.provide('gmf.ShareService');

goog.require('gmf');


/**
 * Service to handle the sharing of the permalink.
 * @param {angular.$http} $http Angular http service.
 * @param  {string} gmfShortenerCreateUrl URL for the shortener API
 * @constructor
 * @ngInject
 * @export
 * @ngname gmfShareService
 */
gmf.ShareService = function($http, gmfShortenerCreateUrl) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;


  /**
   * @type {string}
   * @private
   */
  this.gmfShortenerCreateUrl_ = gmfShortenerCreateUrl;

};


/**
 * Get a short URL of the permalink by calling the url shortener service.
 * - If no shortener API url have been specified, it returns the permalink itself.
 * @param  {string} url the permalink
 * @return {gmfx.ShortenerAPIResponse|angular.$http.HttpPromise} an object containing the permalink not shortened or
 * the promise attached to the shortener API request
 */
gmf.ShareService.prototype.getShortUrl = function(url) {
  var params = /** @type {gmfx.ShortenerAPIRequestParams} */ ({
    url : url
  });

  if (!this.gmfShortenerCreateUrl_) {
    return {
      data : {
        short_url : url
      },
      status : 200
    };
  }

  return this.postShortUrl_(params);
};


/**
 * Send the short permalink to the email provided
 * - If email is provided, the short permalink will be sent to this email
 * @param  {string} shortUrl the short permalink to send
 * @param  {string} email the email to which the short url must be send
 * @param  {string=} opt_message message for the email
 * @return {angular.$http.HttpPromise} the promise attached to the shortener API request
 */
gmf.ShareService.prototype.sendShortUrl = function(shortUrl, email, opt_message) {
  var params = /** @type {gmfx.ShortenerAPIRequestParams} */ ({
    url : shortUrl,
    email : email
  });

  if (opt_message) {
    params['message'] = opt_message;
  }

  return this.postShortUrl_(params);
};


/**
 * @param  {gmfx.ShortenerAPIRequestParams} params parameters for the request
 * @return {angular.$http.HttpPromise} the promise attached to the shortener API request
 * @private
 */
gmf.ShareService.prototype.postShortUrl_ = function(params) {
  //Override default behavior of $http.post method (sending data in json format)
  return this.$http_.post(this.gmfShortenerCreateUrl_, $.param(params), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });
};


/**
 * Max length defined for the complete url
 * @constant
 * @type {number}
 * Check IE limits
 * @see {@link http://support.microsoft.com/kb/208427}
 */
gmf.ShareService.URL_MAX_LEN = 2083;

/**
 * Max length defined for the url parth section
 * @constant
 * @type {number}
 * Check IE limits
 * @see {@link http://support.microsoft.com/kb/208427}
 */
gmf.ShareService.URL_PATH_MAX_LEN = 2048;


gmf.module.service('gmfShareService', gmf.ShareService);
