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
import * as Sentry from '@sentry/browser';

import user, {UserState} from 'ngeo/store/user.ts';

/**
 * Availables functionalities.
 *
 * @typedef {Object} AuthenticationFunctionalities
 * @property {string[]} default_basemap Base maps to use by default.
 * @property {string[]} default_theme Theme to use by default.
 * @property {string[]} [filterable_layers] A list of layer names that can be filtered.
 * @property {string[]} [open_panel] When set, contains the name of the panel to open upon loading
 *    an application.
 * @property {string[]} [preset_layer_filter] Default filtrable datasource name.
 */

/**
 * @typedef {Object} RoleInfo
 * @property {number} id Role identifier.
 * @property {string} name Role name.
 */

/**
 * @typedef {Object} User
 * @property {string|null} email User's email address
 * @property {boolean|null} is_intranet The user is in the intranet.
 * @property {AuthenticationFunctionalities|null} functionalities Configured functionalities of the user
 * @property {boolean|null} is_password_changed True if the password of the user has been changed.
 *    False otherwise.
 * @property {RoleInfo[]} roles Roles information.
 * @property {string|null} username The name of the user.
 * @property {string|null} otp_key
 * @property {string|null} otp_uri
 * @property {string|null} two_factor_totp_secret
 */

/**
 * @typedef {Object} AuthenticationLoginResponse
 * @property {AuthenticationFunctionalities} [functionalities]
 * @property {boolean} [is_password_changed]
 * @property {RoleInfo[]} [roles]
 * @property {string} [username]
 * @property {string} [otp_key]
 * @property {string} [otp_uri]
 */

/**
 * @typedef {angular.IHttpResponse<AuthenticationLoginResponse>} AuthenticationLoginResponsePromise
 */

/**
 * @typedef {Object} AuthenticationDefaultResponse
 * @property {boolean} success
 */

/**
 * @enum {string}
 * @hidden
 */
export const RouteSuffix = {
  CHANGE_PASSWORD: 'loginchangepassword',
  IS_LOGGED_IN: 'loginuser',
  LOGIN: 'login',
  LOGOUT: 'logout',
  RESET_PASSWORD: 'loginresetpassword',
};

/**
 * An "authentication" service for a GeoMapFish application. Upon loading, it
 * launches a request to determine whether a user is currently logged in or
 * not.
 *
 * The possible API requests it supports, which are all self-explanatory, are:
 *
 * - changePassword
 * - login
 * - logout
 * - resetPassword
 *
 * @hidden
 */
export class AuthenticationService {
  /**
   * @param {angular.IHttpService} $http Angular http service.
   * @param {angular.IScope} $rootScope The directive's scope.
   * @param {string} authenticationBaseUrl URL to "authentication" web service.
   * @param {import('gmf/options').gmfAuthenticationConfig} gmfAuthenticationConfig
   *    The configuration
   * @param {import('gmf/options').gmfAuthenticationNoReloadRole} gmfAuthenticationNoReloadRole
   * @param {angular.IIntervalService} $interval Angular interval service
   *    The no reload roles
   * @ngInject
   */
  constructor(
    $http,
    $rootScope,
    authenticationBaseUrl,
    gmfAuthenticationConfig,
    gmfAuthenticationNoReloadRole,
    $interval
  ) {
    /**
     * @type {angular.IHttpService}
     * @private
     */
    this.$http_ = $http;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.$rootScope_ = $rootScope;

    /**
     * The authentication url without trailing slash
     *
     * @type {string}
     * @private
     */
    this.baseUrl_ = authenticationBaseUrl.replace(/\/$/, '');

    /**
     * @type {User}
     * @private
     */
    this.user_ = null;
    user.getProperties().subscribe({
      next: (properties) => {
        this.user_ = properties;
      },
    });

    /**
     * Don't request a new user object from the back-end after
     * logging out if the logged-in user's role has this role.
     *
     * @type {?import('gmf/options').gmfAuthenticationNoReloadRole}
     * @private
     */
    this.noReloadRole_ = gmfAuthenticationNoReloadRole;

    this.load_();

    this.verifyConnection_ = $interval(() => {
      this.checkConnection_();
    }, 60000);
  }

  /**
   * Check whether the user is connected or not like on load.
   *
   * @private
   */
  checkConnection_() {
    if (this.user_.username) {
      const url = `${this.baseUrl_}/${RouteSuffix.IS_LOGGED_IN}`;
      this.$http_
        .get(url, {withCredentials: true})
        .then((resp) => {
          if (this.user_.username !== resp.data.username) {
            this.handleDisconnection();
          }
        })
        .catch((err) => {
          throw `Error on connection check: ${err.statusText}`;
        });
    }
  }

  handleDisconnection() {
    const noReload = this.noReloadRole_ ? this.getRolesNames().includes(this.noReloadRole_) : false;
    this.resetUser_(UserState.DISCONNECTED, noReload);
  }

  /**
   * Load the authentication service, which sends an asynch request to
   * determine whether the user is currently connected or not.
   *
   * @private
   */
  load_() {
    const url = `${this.baseUrl_}/${RouteSuffix.IS_LOGGED_IN}`;
    this.$http_
      .get(url, {withCredentials: true})
      .then((resp) => this.checkUser_(resp))
      .then(
        (resp) => this.handleLogin_(true, resp),
        (resp) => {
          throw 'Login fail.';
        }
      );
  }

  /**
   * @param {string} login Login.
   * @param {string} oldPwd Old password.
   * @param {string} newPwd New password.
   * @param {string} confPwd New password confirmation.
   * @param {string} [otp]
   * @returns {angular.IPromise<void>} Promise.
   */
  changePassword(login, oldPwd, newPwd, confPwd, otp = undefined) {
    const url = `${this.baseUrl_}/${RouteSuffix.CHANGE_PASSWORD}`;

    return this.$http_
      .post(
        url,
        $.param({
          'login': login,
          'oldPassword': oldPwd,
          'otp': otp,
          'newPassword': newPwd,
          'confirmNewPassword': confPwd,
        }),
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          withCredentials: true,
        }
      )
      .then((resp) => this.checkUser_(resp))
      .then(
        (resp) => this.setUser_(resp.data, UserState.LOGGED_IN),
        (resp) => {
          throw 'Change password fail.';
        }
      );
  }

  /**
   * @param {string} login Login name.
   * @param {string} pwd Password.
   * @param {string} [otp]
   * @returns {angular.IPromise<AuthenticationLoginResponsePromise>} Promise.
   */
  login(login, pwd, otp = undefined) {
    const url = `${this.baseUrl_}/${RouteSuffix.LOGIN}`;
    const params = {'login': login, 'password': pwd};
    if (otp) {
      Object.assign(params, {'otp': otp});
    }

    return this.$http_
      .post(url, $.param(params), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        withCredentials: true,
      })
      .then((resp) => this.checkUser_(resp))
      .then((resp) => this.onSuccessfulLogin(resp))
      .then(
        (resp) => this.handleLogin_(false, resp),
        (resp) => {
          throw 'Login fail.';
        }
      );
  }

  /**
   * Check the user to have a user with all parameters in all cases.
   *
   * @param {AuthenticationLoginResponsePromise} resp Ajax response.
   * @returns {AuthenticationLoginResponsePromise} Response.
   */
  checkUser_(resp) {
    if (!resp.data) {
      return resp;
    }
    const emptyUserProperties = user.getEmptyUserProperties();
    resp.data = {...emptyUserProperties, ...resp.data};
    return resp;
  }

  /**
   * Method defined in the aim to be replaced.
   *
   * @param {AuthenticationLoginResponsePromise} resp Ajax response.
   * @returns {AuthenticationLoginResponsePromise} Response.
   */
  onSuccessfulLogin(resp) {
    return resp;
  }

  /**
   * @returns {angular.IPromise<void>} Promise.
   */
  logout() {
    const noReload = this.noReloadRole_ ? this.getRolesNames().includes(this.noReloadRole_) : false;
    const url = `${this.baseUrl_}/${RouteSuffix.LOGOUT}`;
    return this.$http_.get(url, {withCredentials: true}).then(() => {
      this.resetUser_(UserState.LOGGED_OUT, noReload);
    });
  }

  /**
   * @param {string} login Login name.
   * @returns {angular.IPromise<AuthenticationDefaultResponse>} Promise.
   */
  resetPassword(login) {
    const url = `${this.baseUrl_}/${RouteSuffix.RESET_PASSWORD}`;

    return this.$http_
      .post(url, $.param({'login': login}), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then((resp) => resp.data);
  }

  /**
   * @returns {string|null} User's email
   */
  getEmail() {
    return this.user_.email || null;
  }

  /**
   * @returns {number[]} The roles IDs.
   */
  getRolesIds() {
    return this.user_.roles ? this.user_.roles.map((role) => role.id) : [];
  }

  /**
   * @returns {string[]} The roles names.
   */
  getRolesNames() {
    return this.user_.roles ? this.user_.roles.map((role) => role.name) : [];
  }

  /**
   * @param {boolean} checkingLoginStatus Checking the login status?
   * @param {AuthenticationLoginResponsePromise} resp Ajax response.
   * @returns {AuthenticationLoginResponsePromise} Response.
   * @private
   */
  handleLogin_(checkingLoginStatus, resp) {
    const userState = checkingLoginStatus ? UserState.READY : UserState.LOGGED_IN;
    this.setUser_(resp.data, userState);
    return resp;
  }

  /**
   * @param {AuthenticationLoginResponse} respData Response.
   * @param {UserState} userState state of the user.
   * @private
   */
  setUser_(respData, userState) {
    Sentry.setUser({
      username: respData.username,
    });

    user.setUser(respData, userState);
  }

  /**
   * @param {UserState} userState state of the user.
   * @param {boolean} noReload Don't request a new user object from
   * the back-end after logging out, defaults to false.
   * @private
   */
  resetUser_(userState, noReload) {
    const emptyUserProperties = user.getEmptyUserProperties();
    user.setUser(emptyUserProperties, userState);
    if (!noReload) {
      this.load_();
    }
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfAuthenticationService', []);
myModule.service('gmfAuthenticationService', AuthenticationService);

export default myModule;
