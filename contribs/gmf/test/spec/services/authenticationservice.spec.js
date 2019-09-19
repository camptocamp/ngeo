// @ts-nocheck
import angular from 'angular';
import {RouteSuffix} from 'gmf/authentication/Service.js';
import {listenOnce} from 'ol/events.js';

describe('gmf.authentication.Service', () => {
  let gmfAuthentication;
  let authenticationBaseUrl;
  let isLoggedInUrl;
  let loginUrl;
  let logoutUrl;
  /** @type {angular.IHttpBackendService} */
  let $httpBackend;

  beforeEach(() => {
    angular.mock.inject((_$httpBackend_, _gmfAuthenticationService_, _authenticationBaseUrl_) => {
      gmfAuthentication = _gmfAuthenticationService_;
      authenticationBaseUrl = _authenticationBaseUrl_;

      isLoggedInUrl = `${authenticationBaseUrl}/${RouteSuffix.IS_LOGGED_IN}`;
      loginUrl = `${authenticationBaseUrl}/${RouteSuffix.LOGIN}`;
      logoutUrl = `${authenticationBaseUrl}/${RouteSuffix.LOGOUT}`;

      $httpBackend = _$httpBackend_;
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
    /** @type {?import('gmf/authentication/Service.js').AuthenticationEvent} */
    let event_ = null;
    listenOnce(gmfAuthentication, 'ready', (evt) => {
      event_ = /** @type {import('gmf/authentication/Service.js').AuthenticationEvent} */(evt);
      spy();
    });

    $httpBackend.when('GET', isLoggedInUrl).respond({});

    gmfAuthentication.load_();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(event_).toBeDefined();
    if (!event_) {
      throw new Error('Missing event_');
    }
    // @ts-ignore: ???
    expect(event_.type).toBe('ready');
    // @ts-ignore: ???
    expect(event_.detail.user.username).toBe(null);
  });

  it('logins successful', () => {
    const spy = jasmine.createSpy();
    /** @type {?import('gmf/authentication/Service.js').AuthenticationEvent} */
    let event_ = null;
    listenOnce(gmfAuthentication, 'login', (evt) => {
      event_ = /** @type {import('gmf/authentication/Service.js').AuthenticationEvent} */(evt);
      spy();
    });

    $httpBackend.when('POST', loginUrl).respond({'username': 'user'});

    gmfAuthentication.login('user', 'pwd');
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(event_).toBeDefined();
    if (!event_) {
      throw new Error('Missing event_');
    }
    // @ts-ignore: ???
    expect(event_.type).toBe('login');
    // @ts-ignore: ???
    expect(event_.detail.user.username).toBe('user');
  });

  it('trys to login with wrong credentials', () => {
    const spy = jasmine.createSpy();
    listenOnce(
      gmfAuthentication, 'login', spy);

    $httpBackend.when('POST', loginUrl).respond({});

    gmfAuthentication.login('user', 'wrong-pwd');
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(0);
  });

  it('logs out', () => {
    const spy = jasmine.createSpy();
    listenOnce(gmfAuthentication, 'logout', spy);

    $httpBackend.when('GET', logoutUrl).respond('true');

    gmfAuthentication.logout();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
  });
});
