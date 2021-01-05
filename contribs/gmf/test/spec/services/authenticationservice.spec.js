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
      event_ = /** @type {import('gmf/authentication/Service.js').AuthenticationEvent} */ (evt);
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
      event_ = /** @type {import('gmf/authentication/Service.js').AuthenticationEvent} */ (evt);
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
    listenOnce(gmfAuthentication, 'login', spy);

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
