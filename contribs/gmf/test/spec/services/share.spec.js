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

// @ts-nocheck
import angular from 'angular';
import {PermalinkShareService} from 'gmf/permalink/ShareService.js';

describe('gmf.permalink.ShareService', () => {
  /** @type {angular.IHttpBackendService} */
  let $httpBackend;
  const successResponse = {
    short_url: 'http://fake/gmf',
  };

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Should get a short version of the permalink', () => {
    let shortenerUrl;
    let gmfShareService = null;

    angular.mock.inject((_$httpBackend_, _gmfShareService_, _gmfShortenerCreateUrl_) => {
      $httpBackend = _$httpBackend_;
      gmfShareService = _gmfShareService_;
      shortenerUrl = _gmfShortenerCreateUrl_;
      $httpBackend.when('POST', shortenerUrl).respond(successResponse);
    });
    if (!(gmfShareService instanceof PermalinkShareService)) {
      throw new Error('Missing gmfShareService');
    }

    const permalink = 'http://fake/c2c/permalink';
    const params = {
      url: permalink,
    };

    $httpBackend.expectPOST(shortenerUrl, $.param(params));
    gmfShareService.getShortUrl(permalink);
    $httpBackend.flush();

    params.email = 'fake@c2c.com';
    $httpBackend.expectPOST(shortenerUrl, $.param(params));
    if (!params.email) {
      throw new Error('Missing params.email');
    }
    gmfShareService.sendShortUrl(permalink, params.email);
    $httpBackend.flush();
  });

  it('Should return the permalink if no URL for the shorten service has been provided', () => {
    /** @type {?string} */
    let shortenerUrl = null;
    let gmfShareService = null;

    angular.mock.module(
      /**
       * @param {angular.IModule} $provide
       */
      ($provide) => {
        $provide.value('gmfShortenerCreateUrl', '');
      }
    );

    angular.mock.inject((_$httpBackend_, _gmfShareService_, _gmfShortenerCreateUrl_) => {
      $httpBackend = _$httpBackend_;
      gmfShareService = _gmfShareService_;
      shortenerUrl = _gmfShortenerCreateUrl_;
      $httpBackend.when('POST', shortenerUrl).respond(successResponse);
    });
    if (!(gmfShareService instanceof PermalinkShareService)) {
      throw new Error('Missing gmfShareService');
    }
    if (shortenerUrl) {
      throw new Error('Missing shortenerUrl');
    }

    gmfShareService.getShortUrl(shortenerUrl);
    $httpBackend.verifyNoOutstandingExpectation();
  });
});
