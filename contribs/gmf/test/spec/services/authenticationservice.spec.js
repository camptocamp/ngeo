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
import user, {UserState} from 'ngeo/store/user.ts';

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
      const expectedUser = user.getEmptyUserProperties();
      $httpBackend.when('GET', isLoggedInUrl).respond(expectedUser);



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
    /** @type {User} */
    let countCall = 0;
    let gmfUser = null;
    const sub = user.getProperties().subscribe({
      next: (properties) => {
        if (user.getState() === UserState.READY) {
          countCall += 1;
          if (countCall === 2) {
            // Get only the second call (called here). The first call is
            // done in the service itself in the constructor.
            gmfUser = properties;
            sub.unsubscribe();
            spy();
          }
        }
      }
    });

    const expectedUser = user.getEmptyUserProperties();
    $httpBackend.when('GET', isLoggedInUrl).respond(expectedUser);

    gmfAuthentication.load_();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(countCall).toBe(2);
    expect(gmfUser).toBeDefined();
    expect(gmfUser.username).toBe(null);
  });

  it('logins successful', () => {
    const spy = jasmine.createSpy();
    /** @type {User} */
    let gmfUser = null;
    const sub = user.getProperties().subscribe({
      next: (properties) => {
        if (user.getState() === UserState.LOGGED_IN) {
          gmfUser = properties;
          sub.unsubscribe();
          spy();
        }
      }
    });

    const expectedUser = user.getEmptyUserProperties();
    expectedUser.username = 'user';
    $httpBackend.when('POST', loginUrl).respond(expectedUser);

    gmfAuthentication.login('user', 'pwd');
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(gmfUser).toBeDefined();
    expect(gmfUser.username).toBe('user');
  });

  it('Try to login with wrong credentials', () => {
    const spy = jasmine.createSpy();
    const sub = user.getProperties().subscribe({
      next: (properties) => {
        if (user.getState() === UserState.LOGGED_IN) {
          sub.unsubscribe();
          spy();
        }
      }
    });

    $httpBackend.when('POST', loginUrl).respond(401);

    gmfAuthentication.login('user', 'wrong-pwd');
    $httpBackend.flush();
    expect(spy.calls.count()).toBe(0);
  });

  it('logs out', () => {
    const spy = jasmine.createSpy();
    let gmfUser = null;
    const sub = user.getProperties().subscribe({
      next: (properties) => {
        if (user.getState() === UserState.LOGGED_OUT) {
          gmfUser = properties;
          sub.unsubscribe();
          spy();
        }
      }
    });

    $httpBackend.when('GET', logoutUrl).respond('true');

    gmfAuthentication.logout();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(gmfUser.username).toBe(null);
  });

  it('emits disconnected if user has changed', () => {
    const spy = jasmine.createSpy();
    let gmfUser = null;
    const sub = user.getProperties().subscribe({
      next: (properties) => {
        if (user.getState() === UserState.DISCONNECTED) {
          gmfUser = properties;
          sub.unsubscribe();
          spy();
        }
      }
    });
    $httpBackend.when('GET', logoutUrl).respond('true');

    gmfAuthentication.user_.username = 'hans';
    const newUser = user.getProperties().value;
    newUser.username = 'hans';
    user.setUser(newUser, UserState.LOGGED_IN);
    const expectedUser = user.getEmptyUserProperties();
    $httpBackend.when('GET', isLoggedInUrl).respond(expectedUser);

    gmfAuthentication.checkConnection_();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(gmfUser.username).toBe(null);
    expect(gmfAuthentication.user_.username).toBe(null);
  });
});
