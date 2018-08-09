/**
 * @module gmf.authentication.Service
 */
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import olEventsEventTarget from 'ol/events/EventTarget.js';

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
 * @extends {ol.events.EventTarget}
 */
const exports = class extends olEventsEventTarget {

  /**
   * @param {angular.$http} $http Angular http service.
   * @param {angular.$injector} $injector Main injector.
   * @param {angular.Scope} $rootScope The directive's scope.
   * @param {string} authenticationBaseUrl URL to "authentication" web service.
   * @param {gmfx.User} gmfUser User.
   * @ngInject
   */
  constructor($http, $injector, $rootScope, authenticationBaseUrl, gmfUser) {

    super();

    /**
     * @type {angular.$http}
     * @private
     */
    this.$http_ = $http;

    /**
     * @type {angular.Scope}
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
     * @type {gmfx.User}
     * @private
     */
    this.user_ = gmfUser;

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
    const url = `${this.baseUrl_}/${exports.RouteSuffix.IS_LOGGED_IN}`;
    this.$http_.get(url, {withCredentials: true}).then(
      this.handleLogin_.bind(this, true)
    );
  }

  /**
   * @param {string} oldPwd Old password.
   * @param {string} newPwd New password.
   * @param {string} confPwd New password confirmation.
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  changePassword(oldPwd, newPwd, confPwd) {
    const url = `${this.baseUrl_}/${exports.RouteSuffix.CHANGE_PASSWORD}`;

    return this.$http_.post(url, $.param({
      'oldPassword': oldPwd,
      'newPassword': newPwd,
      'confirmNewPassword': confPwd
    }), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    }).then(((response) => {
      this.user_.is_password_changed = true;
      this.$rootScope_.$digest();
    }).bind(this));
  }

  /**
   * @param {string} login Login name.
   * @param {string} pwd Password.
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  login(login, pwd) {
    const url = `${this.baseUrl_}/${exports.RouteSuffix.LOGIN}`;

    return this.$http_.post(url, $.param({'login': login, 'password': pwd}), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    }).then(
      this.handleLogin_.bind(this, false));
  }

  /**
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  logout() {
    const noReload = this.user_['role_name'] === this.noReloadRole_;
    const url = `${this.baseUrl_}/${exports.RouteSuffix.LOGOUT}`;
    return this.$http_.get(url, {withCredentials: true}).then(() => {
      this.resetUser_(noReload);
    });
  }

  /**
   * @param {string} login Login name.
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  resetPassword(login) {
    const url = `${this.baseUrl_}/${exports.RouteSuffix.RESET_PASSWORD}`;

    /**
     * @param {angular.$http.Response} resp Ajax response.
     * @return {gmfx.AuthenticationDefaultResponse} Response.
     */
    const successFn = function(resp) {
      const respData = /** @type gmfx.AuthenticationDefaultResponse} */ (
        resp.data);
      return respData;
    }.bind(this);

    return this.$http_.post(url, $.param({'login': login}), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(successFn);
  }

  /**
   * @return {?gmfx.AuthenticationFunctionalities} The role functionalities.
   */
  getFunctionalities() {
    return this.user_.functionalities;
  }

  /**
   * @return {number|null} The role ID.
   */
  getRoleId() {
    return this.user_.role_id;
  }

  /**
   * @param {boolean} checkingLoginStatus Checking the login status?
   * @param {angular.$http.Response} resp Ajax response.
   * @return {angular.$http.Response} Response.
   * @private
   */
  handleLogin_(checkingLoginStatus, resp) {
    const respData = /** @type {gmfx.AuthenticationLoginResponse} */ (resp.data);
    this.setUser_(respData, !checkingLoginStatus);
    if (checkingLoginStatus) {
      /** @type {gmfx.AuthenticationEvent} */
      const event = new ngeoCustomEvent('ready', {user: this.user_});
      this.dispatchEvent(event);
    }
    return resp;
  }

  /**
   * @param {gmfx.AuthenticationLoginResponse} respData Response.
   * @param {boolean} emitEvent Emit a login event?
   * @private
   */
  setUser_(respData, emitEvent) {
    for (const key in this.user_) {
      this.user_[key] = null;
    }
    for (const key in respData) {
      this.user_[key] = respData[key];
    }
    if (emitEvent && respData.username !== undefined) {
      /** @type {gmfx.AuthenticationEvent} */
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
      this.user_[key] = null;
    }
    /** @type {gmfx.AuthenticationEvent} */
    const event = new ngeoCustomEvent('logout', {user: this.user_});
    this.dispatchEvent(event);
    if (!noReload) {
      this.load_();
    }
  }
};

/**
 * @enum {string}
 */
exports.RouteSuffix = {
  CHANGE_PASSWORD: 'loginchange',
  IS_LOGGED_IN: 'loginuser',
  LOGIN: 'login',
  LOGOUT: 'logout',
  RESET_PASSWORD: 'loginresetpassword'
};

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('gmfAuthenticationService', []);
exports.module.service('gmfAuthenticationService', exports);

exports.module.value('gmfUser', {
  'functionalities': null,
  'is_password_changed': null,
  'role_id': null,
  'role_name': null,
  'username': null
});


export default exports;
