goog.require('gmf.ShareService');

describe('gmf.ShareService', () => {
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
    let gmfShareService;

    inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      gmfShareService = $injector.get('gmfShareService');
      shortenerUrl = $injector.get('gmfShortenerCreateUrl');
      $httpBackend.when('POST', shortenerUrl).respond(successResponse);
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
    let shortenerUrl;
    let gmfShareService;

    module(($provide) => {
      $provide.value('gmfShortenerCreateUrl', '');
    });

    inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      gmfShareService = $injector.get('gmfShareService');
      shortenerUrl = $injector.get('gmfShortenerCreateUrl');
      $httpBackend.when('POST', shortenerUrl).respond(successResponse);
    });

    gmfShareService.getShortUrl(shortenerUrl);
    $httpBackend.verifyNoOutstandingExpectation();

  });
});
