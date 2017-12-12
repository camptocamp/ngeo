goog.provide('gmf.authentication.Service');

goog.require('ngeo.CustomEvent');
goog.require('gmf');
goog.require('ol.events.EventTarget');


/**
 * @enum {string}
 */
gmf.authentication.service.RouteSuffix = {
  CHANGE_PASSWORD: 'loginchange',
  IS_LOGGED_IN: 'loginuser',
  LOGIN: 'login',
  LOGOUT: 'logout',
  RESET_PASSWORD: 'loginresetpassword'
};

// todo?
gmf.module.value('gmfUser', {
  'functionalities': null,
  'is_password_changed': null,
  'role_id': null,
  'role_name': null,
  'username': null
});


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
gmf.authentication.Service = class {

  /**
   * @param {angular.$http} $http Angular http service.
   * @param {string} authenticationBaseUrl URL to "authentication" web service.
   * @param {gmfx.User} gmfUser User.
   * @ngInject
   */
  constructor($http, authenticationBaseUrl, gmfUser) {

    ol.events.EventTarget.call(this);

    /**
     * @type {angular.$http}
     * @private
     */
    this.$http_ = $http;

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

    this.load_();
  }

  /**
   * Load the authentication service, which sends an asynch request to
   * determine whether the user is currently connected or not.
   * @private
   */
  load_() {
    const url = `${this.baseUrl_}/${gmf.authentication.service.RouteSuffix.IS_LOGGED_IN}`;
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
    const url = `${this.baseUrl_}/${gmf.authentication.service.RouteSuffix.CHANGE_PASSWORD}`;

    return this.$http_.post(url, $.param({
      'oldPassword': oldPwd,
      'newPassword': newPwd,
      'confirmNewPassword': confPwd
    }), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    });
  }

  /**
   * @param {string} login Login name.
   * @param {string} pwd Password.
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  login(login, pwd) {
    const url = `${this.baseUrl_}/${gmf.authentication.service.RouteSuffix.LOGIN}`;

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
    const url = `${this.baseUrl_}/${gmf.authentication.service.RouteSuffix.LOGOUT}`;
    return this.$http_.get(url, {withCredentials: true}).then(
      this.resetUser_.bind(this));
  }

  /**
   * @param {string} login Login name.
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  resetPassword(login) {
    const url = `${this.baseUrl_}/${gmf.authentication.service.RouteSuffix.RESET_PASSWORD}`;

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
      const event = new ngeo.CustomEvent('ready', {user: this.user_});
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
    for (const key in respData) {
      this.user_[key] = respData[key];
    }
    if (emitEvent && respData.username !== undefined) {
      /** @type {gmfx.AuthenticationEvent} */
      const event = new ngeo.CustomEvent('login', {user: this.user_});
      this.dispatchEvent(event);
    }
  }

  /**
   * @private
   */
  resetUser_() {
    for (const key in this.user_) {
      this.user_[key] = null;
    }
    /** @type {gmfx.AuthenticationEvent} */
    const event = new ngeo.CustomEvent('logout', {user: this.user_});
    this.dispatchEvent(event);
  }
};

ol.inherits(gmf.authentication.Service, ol.events.EventTarget);

gmf.authentication.module.service('gmfAuthentication', gmf.authentication.Service);
