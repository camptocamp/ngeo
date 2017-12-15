goog.require('gmf.authentication.Service');

describe('gmf.authentication.Service', () => {
  let gmfAuthentication;
  let authenticationBaseUrl;
  let isLoggedInUrl;
  let loginUrl;
  let logoutUrl;
  let $httpBackend;

  beforeEach(() => {
    inject(($injector) => {
      gmfAuthentication = $injector.get('gmfAuthenticationService');
      authenticationBaseUrl = $injector.get('authenticationBaseUrl');

      isLoggedInUrl = `${authenticationBaseUrl}/${gmf.authentication.Service.RouteSuffix.IS_LOGGED_IN}`;
      loginUrl = `${authenticationBaseUrl}/${gmf.authentication.Service.RouteSuffix.LOGIN}`;
      logoutUrl = `${authenticationBaseUrl}/${gmf.authentication.Service.RouteSuffix.LOGOUT}`;

      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', isLoggedInUrl).respond({});

      // need to flush after the initialization to process the request which
      // queries the initial logged-in status
      $httpBackend.flush();
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('emits READY after login status check', () => {
    const spy = jasmine.createSpy();
    let event;
    ol.events.listenOnce(
      gmfAuthentication, 'ready', (evt) => {
        event = evt;
        spy();
      });

    $httpBackend.when('GET', isLoggedInUrl).respond({});

    gmfAuthentication.load_();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(event).toBeDefined();
    expect(event.type).toBe('ready');
    expect(event.detail.user.username).toBe(null);
  });

  it('logins successful', () => {
    const spy = jasmine.createSpy();
    let event;
    ol.events.listenOnce(
      gmfAuthentication, 'login', (evt) => {
        event = evt;
        spy();
      });

    $httpBackend.when('POST', loginUrl).respond({'username': 'user'});

    gmfAuthentication.login('user', 'pwd');
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(event).toBeDefined();
    expect(event.type).toBe('login');
    expect(event.detail.user.username).toBe('user');
  });

  it('trys to login with wrong credentials', () => {
    const spy = jasmine.createSpy();
    ol.events.listenOnce(
      gmfAuthentication, 'login', spy);

    $httpBackend.when('POST', loginUrl).respond({});

    gmfAuthentication.login('user', 'wrong-pwd');
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(0);
  });

  it('logs out', () => {
    const spy = jasmine.createSpy();
    ol.events.listenOnce(
      gmfAuthentication, 'logout', spy);

    $httpBackend.when('GET', logoutUrl).respond('true');

    gmfAuthentication.logout();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
  });
});
