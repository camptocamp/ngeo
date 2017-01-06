goog.require('gmf.ShareService');

describe('gmf.ShareService', () => {
  let gmfShareService;
  let $httpBackend;
  let shortenerUrl;
  const successResponse = {
    short_url: 'http://fake/gmf'
  };

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Should get a short version of the permalink', () => {
    inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', shortenerUrl).respond(successResponse);
      gmfShareService = $injector.get('gmfShareService');
      shortenerUrl = $injector.get('gmfShortenerCreateUrl');
    });

    const permalink = 'htpp://fake/c2c/permalink';
    const params = /** @type {gmfx.ShortenerAPIRequestParams} */ ({
      url: permalink
    });

    $httpBackend.expectPOST(shortenerUrl, $.param(params));
    gmfShareService.getShortUrl(permalink);
    $httpBackend.flush();

    params.email = 'fake@c2c.com';
    $httpBackend.expectPOST(shortenerUrl, $.param(params));
    gmfShareService.sendShortUrl(permalink, params.email);
    $httpBackend.flush();

  });

  it('Should return the permalink if no URL for the shorten service has been provided', () => {
    module(($provide) => {
      $provide.value('gmfShortenerCreateUrl', '');
    });

    inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', shortenerUrl).respond(successResponse);
      gmfShareService = $injector.get('gmfShareService');
      shortenerUrl = $injector.get('gmfShortenerCreateUrl');
    });

    gmfShareService.getShortUrl(shortenerUrl);
    $httpBackend.verifyNoOutstandingExpectation();

  });
});
