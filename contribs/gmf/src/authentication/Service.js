import angular from 'angular';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import olEventsEventTarget from 'ol/events/Target.js';


/**
 * Availables functionalities.
 * @typedef {Object} AuthenticationFunctionalities
 * @property {Array.<string>} default_basemap Base maps to use by default.
 * @property {Array.<string>} default_theme Theme to use by default.
 * @property {Array.<string>} [filtrable_layers] A list of layer names that can be filtered.
 * @property location: {Array.<string>} Availables locations.
 */


/**
 * @typedef {Object} User
 * @property {AuthenticationFunctionalities|null} functionalities Configured functionalities of the user
 * @property {boolean|null} is_password_changed True if the password of the user has been changed. False otherwise.
 * @property {number|null} role_id the role id of the user.
 * @property {string|null} role_name The role name of the user.
 * @property {string|null} username The name of the user.
 */


 /**
  * @typedef {Object} AuthenticationEventItem
  * @property {User} user
  */

/**
 * @typedef {import("ngeo/CustomEvent.js").default.<AuthenticationEventItem>} AuthenticationEvent
 */


/**
 * @typedef {Object} AuthenticationLoginResponse
 * @property {AuthenticationFunctionalities} [functionalities]
 * @property {boolean} [is_password_changed]
 * @property {number} [role_id]
 * @property {string} [role_name]
 * @property {string} [username]
 */


/**
 * @typedef {Object} AuthenticationDefaultResponse
 * @property {boolean} success
 */


/**
 * @enum {string}
 */
export const RouteSuffix = {
  CHANGE_PASSWORD: 'loginchange',
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
 *
 * @extends {import("ol/events/EventTarget.js").default}
 */
class Service extends olEventsEventTarget {

  /**
   * @param {angular.IHttpService} $http Angular http service.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @param {angular.Scope} $rootScope The directive's scope.
   * @param {string} authenticationBaseUrl URL to "authentication" web service.
   * @param {User} gmfUser User.
   * @ngInject
   */
  constructor($http, $injector, $rootScope, authenticationBaseUrl, gmfUser) {

    super();

    /**
     * @type {angular.IHttpService}
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
     * @type {User}
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
    const url = `${this.baseUrl_}/${RouteSuffix.IS_LOGGED_IN}`;
    this.$http_.get(url, {withCredentials: true}).then(
      this.handleLogin_.bind(this, true)
    );
  }

  /**
   * @param {string} oldPwd Old password.
   * @param {string} newPwd New password.
   * @param {string} confPwd New password confirmation.
   * @return {angular.IPromise} Promise.
   * @export
   */
  changePassword(oldPwd, newPwd, confPwd) {
    const url = `${this.baseUrl_}/${RouteSuffix.CHANGE_PASSWORD}`;

    return this.$http_.post(url, $.param({
      'oldPassword': oldPwd,
      'newPassword': newPwd,
      'confirmNewPassword': confPwd
    }), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    }).then(((response) => {
      this.user_.is_password_changed = true;
    }));
  }

  /**
   * @param {string} login Login name.
   * @param {string} pwd Password.
   * @return {angular.IPromise} Promise.
   * @export
   */
  login(login, pwd) {
    const url = `${this.baseUrl_}/${RouteSuffix.LOGIN}`;

    return this.$http_.post(url, $.param({'login': login, 'password': pwd}), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    }).then(
      this.handleLogin_.bind(this, false));
  }

  /**
   * @return {angular.IPromise} Promise.
   * @export
   */
  logout() {
    const noReload = this.user_['role_name'] === this.noReloadRole_;
    const url = `${this.baseUrl_}/${RouteSuffix.LOGOUT}`;
    return this.$http_.get(url, {withCredentials: true}).then(() => {
      this.resetUser_(noReload);
    });
  }

  /**
   * @param {string} login Login name.
   * @return {angular.IPromise} Promise.
   * @export
   */
  resetPassword(login) {
    const url = `${this.baseUrl_}/${RouteSuffix.RESET_PASSWORD}`;

    /**
     * @param {angular.IHttpResponse} resp Ajax response.
     * @return {AuthenticationDefaultResponse} Response.
     */
    const successFn = function(resp) {
      const respData = /** @type AuthenticationDefaultResponse} */ (
        resp.data);
      return respData;
    }.bind(this);

    return this.$http_.post(url, $.param({'login': login}), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(successFn);
  }

  /**
   * @return {?AuthenticationFunctionalities} The role functionalities.
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
   * @param {angular.IHttpResponse} resp Ajax response.
   * @return {angular.IHttpResponse} Response.
   * @private
   */
  handleLogin_(checkingLoginStatus, resp) {
    const respData = /** @type {AuthenticationLoginResponse} */ (resp.data);
    this.setUser_(respData, !checkingLoginStatus);
    if (checkingLoginStatus) {
      /** @type {AuthenticationEvent} */
      const event = new ngeoCustomEvent('ready', {user: this.user_});
      this.dispatchEvent(event);
    }
    return resp;
  }

  /**
   * @param {AuthenticationLoginResponse} respData Response.
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
      /** @type {AuthenticationEvent} */
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
    /** @type {AuthenticationEvent} */
    const event = new ngeoCustomEvent('logout', {user: this.user_});
    this.dispatchEvent(event);
    if (!noReload) {
      this.load_();
    }
  }
}


/**
 * @type {!angular.IModule}
 */
const module = angular.module('gmfAuthenticationService', []);
module.service('gmfAuthenticationService', Service);

module.value('gmfUser', {
  'functionalities': null,
  'is_password_changed': null,
  'role_id': null,
  'role_name': null,
  'username': null
});


export default module;
