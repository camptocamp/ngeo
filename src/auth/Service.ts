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

import * as Sentry from '@sentry/browser';

import user, {User, UserState} from 'ngeo/store/user';
import configuration, {
  Configuration,
  gmfAuthenticationConfig as gmfOptionsGmfAuthenticationConfig,
  gmfAuthenticationNoReloadRole as gmfOptionsGmfAuthenticationNoReloadRole,
} from 'ngeo/store/config';

type AuthenticationLoginResponse = {
  functionalities?: any;
  is_password_changed?: boolean;
  roles?: any[];
  username?: string;
  otp_key?: string;
  otp_uri?: string;
};

type AuthenticationDefaultResponse = {
  success: boolean;
};

export enum RouteSuffix {
  CHANGE_PASSWORD = 'loginchangepassword',
  IS_LOGGED_IN = 'loginuser',
  LOGIN = 'login',
  LOGOUT = 'logout',
  RESET_PASSWORD = 'loginresetpassword',
}

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
 */
export class AuthenticationService {
  /**
   * The authentication url without trailing slash.
   *
   * @private
   */
  baseUrl_: string;

  /**
   * The user.
   *
   * @private
   */
  user_: User;

  /**
   * Don't request a new user object from the back-end after
   * logging out if the logged-in user's role has this role.
   *
   * @private
   */
  noReloadRole_: undefined | gmfOptionsGmfAuthenticationNoReloadRole;

  verifyConnection_: number;

  constructor() {
    /**
     * The authentication url without trailing slash.
     *
     * @private
     */
    this.baseUrl_ = null;

    /**
     * @private
     */
    this.user_ = null;
    user.getProperties().subscribe({
      next: (properties: User) => {
        this.user_ = properties;
      },
    });

    /**
     * Don't request a new user object from the back-end after
     * logging out if the logged-in user's role has this role.
     *
     * @private
     */
    this.noReloadRole_ = null;

    configuration.getConfig().subscribe({
      next: (configuration: Configuration) => {
        const config: gmfOptionsGmfAuthenticationConfig = configuration.gmfAuthenticationConfig;
        this.noReloadRole_ = configuration.gmfAuthenticationNoReloadRole;
        this.baseUrl_ = configuration.authenticationBaseUrl.replace(/\/$/, '');
        this.load_();
      },
    });

    this.verifyConnection_ = window.setInterval(() => {
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
      const options = {method: 'GET', withCredentials: true};
      fetch(url, options)
        .then((resp) => resp.json())
        .then((data) => {
          if (this.user_.username !== data.username) {
            this.handleDisconnection();
          }
        })
        .catch((err) => {
          console.error(`Error on connection check: ${err.statusText}`);
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
    const options = {method: 'GET', withCredentials: true};
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => this.checkUser_(data))
      .then(
        (data) => this.handleLogin_(true, data),
        (data) => console.error('Login fail.')
      );
  }

  /**
   * @param login Login.
   * @param oldPwd Old password.
   * @param newPwd New password.
   * @param confPwd New password confirmation.
   * @param {string} [otp] One-time password.
   * @returns Promise.
   */
  changePassword(
    login: string,
    oldPwd: string,
    newPwd: string,
    confPwd: string,
    otp: string = undefined
  ): Promise<void> {
    const url = `${this.baseUrl_}/${RouteSuffix.CHANGE_PASSWORD}`;
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true,
      body: $.param({
        'login': login,
        'oldPassword': oldPwd,
        'otp': otp,
        'newPassword': newPwd,
        'confirmNewPassword': confPwd,
      }),
    };

    return fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => this.checkUser_(data))
      .then(
        (data) => this.setUser_(data, UserState.LOGGED_IN),
        (data) => console.error('Change password fail.')
      );
  }

  /**
   * @param login Login name.
   * @param pwd Password.
   * @param {string} [otp] One-time password.
   * @returns Promise.
   */
  login(login: string, pwd: string, otp: string = undefined): Promise<void | Response> {
    const url = `${this.baseUrl_}/${RouteSuffix.LOGIN}`;
    const params = {'login': login, 'password': pwd};
    if (otp) {
      Object.assign(params, {'otp': otp});
    }
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true,
      body: $.param(params),
    };

    return fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => this.checkUser_(data))
      .then((data) => this.onSuccessfulLogin(data))
      .then(
        (data) => this.handleLogin_(false, data),
        (data) => console.error('Login fail.')
      );
  }

  /**
   * Check the user to have a user with all parameters in all cases.
   *
   * @param data Ajax response.
   * @returns Response.
   * FIXME: typing and doc
   */
  checkUser_(data: any): any {
    if (!data) {
      return data;
    }
    const emptyUserProperties = user.getEmptyUserProperties();
    data = {...emptyUserProperties, ...data};
    return data;
  }

  /**
   * Method defined in the aim to be replaced.
   *
   * @param data Ajax response.
   * @returns Response.
   * FIXME: typing and doc
   */
  onSuccessfulLogin(data: any): any {
    return data;
  }

  /**
   * @returns Promise.
   */
  logout(): Promise<void> {
    const noReload = this.noReloadRole_ ? this.getRolesNames().includes(this.noReloadRole_) : false;
    const url = `${this.baseUrl_}/${RouteSuffix.LOGOUT}`;
    const options = {method: 'GET', withCredentials: true};
    return fetch(url, options).then(() => {
      this.resetUser_(UserState.LOGGED_OUT, noReload);
    });
  }

  /**
   * @param login Login name.
   * @returns Promise.
   */
  resetPassword(login: string): Promise<Response> {
    const url = `${this.baseUrl_}/${RouteSuffix.RESET_PASSWORD}`;
    const options = {
      method: 'POST',
      withCredentials: true,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: $.param({'login': login}),
    };

    return fetch(url, options).then((resp) => resp.json().then((data) => data));
  }

  /**
   * @returns User's email
   */
  getEmail(): string | null {
    return this.user_.email || null;
  }

  /**
   * @returns The roles IDs.
   */
  getRolesIds(): number[] {
    return this.user_.roles ? this.user_.roles.map((role) => role.id) : [];
  }

  /**
   * @returns The roles names.
   */
  getRolesNames(): string[] {
    return this.user_.roles ? this.user_.roles.map((role) => role.name) : [];
  }

  /**
   * @param checkingLoginStatus Checking the login status?
   * @param data Ajax response.
   * @returns Response.
   * @private
   * FIXME: typing and doc
   */
  handleLogin_(checkingLoginStatus: boolean, data: any): any {
    const userState = checkingLoginStatus ? UserState.READY : UserState.LOGGED_IN;
    this.setUser_(data, userState);
    return data;
  }

  /**
   * @param respData Response.
   * @param userState state of the user.
   * @private
   */
  setUser_(respData: User, userState: UserState): void {
    Sentry.setUser({
      username: respData.username,
    });

    user.setUser(respData, userState);
  }

  /**
   * @param userState state of the user.
   * @param noReload Don't request a new user object from
   * the back-end after logging out, defaults to false.
   * @private
   */
  resetUser_(userState: UserState, noReload: boolean): void {
    const emptyUserProperties = user.getEmptyUserProperties();
    user.setUser(emptyUserProperties, userState);
    if (!noReload) {
      this.load_();
    }
  }
}

const ngeoAuthService = new AuthenticationService();
export default ngeoAuthService;
