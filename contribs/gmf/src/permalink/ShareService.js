// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
 * @typedef {Object} ShortenerAPIResponseData
 * @property {string} short_url
 */

/**
 * @typedef {Object} ShortenerAPIResponse
 * @property {ShortenerAPIResponseData} data Response payload to the shortener API
 * @property {number} status HTTP status
 */

/**
 * @typedef {Object} ShortenerAPIRequestParams
 * @property {string} url
 * @property {string} [email]
 * @property {string} [message]
 */

/**
 * Service to handle the sharing of the permalink.
 * @param {angular.IHttpService} $http Angular http service.
 * @param {string} gmfShortenerCreateUrl URL for the shortener API
 * @class
 * @ngInject
 * @ngname gmfShareService
 * @hidden
 */
export function PermalinkShareService($http, gmfShortenerCreateUrl) {
  /**
   * @type {angular.IHttpService}
   */
  this.$http_ = $http;

  /**
   * @type {string}
   */
  this.gmfShortenerCreateUrl_ = gmfShortenerCreateUrl;
}

/**
 * Get a short URL of the permalink by calling the url shortener service.
 * - If no shortener API url have been specified, it returns the permalink itself.
 * @param  {string} url the permalink
 * @return {ShortenerAPIResponse|angular.IHttpPromise<void>} an object containing the permalink not
 *    shortened or the promise attached to the shortener API request
 */
PermalinkShareService.prototype.getShortUrl = function (url) {
  const params = /** @type {ShortenerAPIRequestParams} */ ({
    url,
  });

  if (!this.gmfShortenerCreateUrl_) {
    return {
      data: {
        short_url: url,
      },
      status: 200,
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
 * @return {angular.IHttpPromise<void>} the promise attached to the shortener API request
 */
PermalinkShareService.prototype.sendShortUrl = function (shortUrl, email, opt_message) {
  const params = /** @type {ShortenerAPIRequestParams} */ ({
    url: shortUrl,
    email: email,
  });

  if (opt_message) {
    params.message = opt_message;
  }

  return this.postShortUrl_(params);
};

/**
 * @param {ShortenerAPIRequestParams} params parameters for the request
 * @return {angular.IHttpPromise<void>} the promise attached to the shortener API request
 */
PermalinkShareService.prototype.postShortUrl_ = function (params) {
  // Override default behavior of $http.post method (sending data in json format)
  return this.$http_.post(this.gmfShortenerCreateUrl_, $.param(params), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  });
};

/**
 * Max length defined for the complete url.
 * Check IE limits, see {@link http://support.microsoft.com/kb/208427}
 * @type {number}
 * @hidden
 */
export const URL_MAX_LEN = 2083;

/**
 * Max length defined for the url parth section.
 * Check IE limits, see {@link http://support.microsoft.com/kb/208427}
 * @type {number}
 * @hidden
 */
export const URL_PATH_MAX_LEN = 2048;

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfShareService', []);

myModule.service('gmfShareService', PermalinkShareService);

export default myModule;
