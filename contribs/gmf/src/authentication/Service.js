import angular from 'angular';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import olEventsEventTarget from 'ol/events/Target.js';
// @ts-ignore
import * as Sentry from '@sentry/browser';


/**
 * Availables functionalities.
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
 */


/**
 * @typedef {Object} AuthenticationEventItem
 * @property {User} user
 */

/**
 * @typedef {import("ngeo/CustomEvent.js").default<AuthenticationEventItem>} AuthenticationEvent
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
  RESET_PASSWORD: 'loginresetpassword'
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
 * @hidden
 */
export class AuthenticationService extends olEventsEventTarget {

  /**
   * @param {angular.IHttpService} $http Angular http service.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @param {angular.IScope} $rootScope The directive's scope.
   * @param {string} authenticationBaseUrl URL to "authentication" web service.
   * @param {User} gmfUser User.
   * @param {import("gmf/authentication/component.js").AuthenticationConfig} gmfAuthenticationConfig
   *    The configuration
   * @ngInject
   */
  constructor($http, $injector, $rootScope, authenticationBaseUrl, gmfUser, gmfAuthenticationConfig) {

    super();

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
     * @type {string}
     * @private
     */
    this.baseUrl_ = authenticationBaseUrl.replace(/\/$/, '');

    /**
     * @type {User}
     * @private
     */
    this.user_ = gmfUser;

    /**
     * @type {boolean}
     */
    this.forcePasswordChange = gmfAuthenticationConfig.forcePasswordChange === true;

    /**
      * Don't request a new user object from the back-end after
      * logging out if the logged-in user's role has this role.
      * @type {?string}
      * @private
      */
    this.noReloadRole_ = $injector.has('gmfAuthenticationNoReloadRole')
      ? $injector.get('gmfAuthenticationNoReloadRole')
      : null;

    this.load_();
  }

  /**
   * Load the authentication service, which sends an asynch request to
   * determine whether the user is currently connected or not.
   * @private
   */
  load_() {
    const url = `${this.baseUrl_}/${RouteSuffix.IS_LOGGED_IN}`;
    this.$http_.get(url, {withCredentials: true}).then(
      this.handleLogin_.bind(this, true)
    );
  }

  /**
   * @param {string} login Login.
   * @param {string} oldPwd Old password.
   * @param {string} newPwd New password.
   * @param {string} confPwd New password confirmation.
   * @param {string} [otp]
   * @return {angular.IPromise<void>} Promise.
   */
  changePassword(login, oldPwd, newPwd, confPwd, otp = undefined) {
    const url = `${this.baseUrl_}/${RouteSuffix.CHANGE_PASSWORD}`;

    return this.$http_.post(url, $.param({
      'login': login,
      'oldPassword': oldPwd,
      'otp': otp,
      'newPassword': newPwd,
      'confirmNewPassword': confPwd
    }), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    }).then((resp) => {
      this.setUser_(resp.data, true);
    });
  }

  /**
   * @param {string} login Login name.
   * @param {string} pwd Password.
   * @param {string} [otp]
   * @return {angular.IPromise<angular.IHttpResponse<AuthenticationLoginResponse>>} Promise.
   */
  login(login, pwd, otp = undefined) {
    const url = `${this.baseUrl_}/${RouteSuffix.LOGIN}`;
    const params = {'login': login, 'password': pwd};
    if (otp) {
      Object.assign(params, {'otp': otp});
    }

    return this.$http_.post(url, $.param(params), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    }).then(
      this.handleLogin_.bind(this, false)
    );
  }

  /**
   * @return {angular.IPromise<void>} Promise.
   */
  logout() {
    const noReload = this.noReloadRole_ ? this.getRolesNames().includes(this.noReloadRole_) : false;
    const url = `${this.baseUrl_}/${RouteSuffix.LOGOUT}`;
    return this.$http_.get(url, {withCredentials: true}).then(() => {
      this.resetUser_(noReload);
    });
  }

  /**
   * @param {string} login Login name.
   * @return {angular.IPromise<AuthenticationDefaultResponse>} Promise.
   */
  resetPassword(login) {
    const url = `${this.baseUrl_}/${RouteSuffix.RESET_PASSWORD}`;

    return this.$http_.post(url, $.param({'login': login}), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then((resp) => resp.data);
  }

  /**
   * @return {string|null} User's email
   */
  getEmail() {
    return this.user_.email || null;
  }

  /**
   * @return {number[]} The roles IDs.
   */
  getRolesIds() {
    return this.user_.roles ? this.user_.roles.map((role) => role.id) : [];
  }

  /**
   * @return {string[]} The roles names.
   */
  getRolesNames() {
    return this.user_.roles ? this.user_.roles.map((role) => role.name) : [];
  }

  /**
   * @param {boolean} checkingLoginStatus Checking the login status?
   * @param {angular.IHttpResponse<AuthenticationLoginResponse>} resp Ajax response.
   * @return {angular.IHttpResponse<AuthenticationLoginResponse>} Response.
   * @private
   */
  handleLogin_(checkingLoginStatus, resp) {
    if (resp.data.is_password_changed === false && this.forcePasswordChange) {
      const event = new ngeoCustomEvent('mustChangePassword');
      this.dispatchEvent(event);
      return;
    }
    this.setUser_(resp.data, !checkingLoginStatus);
    if (checkingLoginStatus) {
      const event = new ngeoCustomEvent('ready', {user: this.user_});
      this.dispatchEvent(event);
    }
    return resp;
  }

  /**
   * @param {AuthenticationLoginResponse} respData Response.
   * @param {boolean} emitEvent Emit a login event?
   */
  setUser_(respData, emitEvent) {
    Sentry.setUser({
      username: respData.username
    });

    for (const key in this.user_) {
      // @ts-ignore: unsupported syntax
      this.user_[key] = null;
    }
    for (const key in respData) {
      // @ts-ignore: unsupported syntax
      this.user_[key] = respData[key];
    }
    if (emitEvent && respData.username !== undefined) {
      const event = new ngeoCustomEvent('login', {user: this.user_});
      this.dispatchEvent(event);
    }
  }

  /**
   * @private
   * @param {boolean} noReload Don't request a new user object from
   * the back-end after logging out, defaults to false.
   */
  resetUser_(noReload) {
    noReload = noReload || false;
    for (const key in this.user_) {
      // @ts-ignore: unsupported syntax
      this.user_[key] = null;
    }
    const event = new ngeoCustomEvent('logout', {user: this.user_});
    this.dispatchEvent(event);
    if (!noReload) {
      this.load_();
    }
  }

  changePasswordReset() {
    const event = new ngeoCustomEvent('changePasswordReset');
    this.dispatchEvent(event);
  }
}


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfAuthenticationService', []);
module.service('gmfAuthenticationService', AuthenticationService);

module.value('gmfUser', {
  functionalities: null,
  is_password_changed: null,
  roles: null,
  username: null
});


export default module;
