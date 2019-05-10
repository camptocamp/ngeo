// @ts-nocheck
import angular from 'angular';
import {PermalinkShareService} from 'gmf/permalink/ShareService';


describe('gmf.permalink.ShareService', () => {
  /** @type {angular.IHttpBackendService} */
  let $httpBackend;
  const successResponse = {
    short_url: 'http://fake/gmf'
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
    // @ts-ignore: Don't understand ...
    if (!(gmfShareService instanceof PermalinkShareService)) {
      throw new Error('Missing gmfShareService');
    }

    const permalink = 'http://fake/c2c/permalink';
    const params = {
      url: permalink
    };

    $httpBackend.expectPOST(shortenerUrl, $.param(params));
    // @ts-ignore: Ununderstandable issue wisible only on Travis...
    gmfShareService.getShortUrl(permalink);
    $httpBackend.flush();

    params.email = 'fake@c2c.com';
    $httpBackend.expectPOST(shortenerUrl, $.param(params));
    if (!params.email) {
      throw new Error('Missing params.email');
    }
    // @ts-ignore: Ununderstandable issue wisible only on Travis...
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
      });

    angular.mock.inject((_$httpBackend_, _gmfShareService_, _gmfShortenerCreateUrl_) => {
      $httpBackend = _$httpBackend_;
      gmfShareService = _gmfShareService_;
      shortenerUrl = _gmfShortenerCreateUrl_;
      $httpBackend.when('POST', shortenerUrl).respond(successResponse);
    });
    // @ts-ignore: Don't understand ...
    if (!(gmfShareService instanceof PermalinkShareService)) {
      throw new Error('Missing gmfShareService');
    }
    if (shortenerUrl) {
      throw new Error('Missing shortenerUrl');
    }

    // @ts-ignore: Ununderstandable issue wisible only on Travis...
    gmfShareService.getShortUrl(shortenerUrl);
    $httpBackend.verifyNoOutstandingExpectation();
  });
});
