goog.provide('gmf.Authentication');
goog.provide('gmf.AuthenticationEventType');
goog.provide('gmf.AuthenticationEvent');

goog.require('gmf');
goog.require('ol.events.Event');
goog.require('ol.events.EventTarget');


/**
 * @typedef {{
 *     functionalities: (gmfx.AuthenticationFunctionalities|undefined),
 *     is_password_changed: (boolean|undefined),
 *     role_id: (number|undefined),
 *     role_name: (string|undefined),
 *     username: (string|undefined)
 * }}
 */
gmf.AuthenticationLoginResponse;


/**
 * @typedef {{
 *     success: boolean
 * }}
 */
gmf.AuthenticationDefaultResponse;


/**
 * @enum {string}
 */
gmf.AuthenticationRouteSuffix = {
  CHANGE_PASSWORD: 'loginchange',
  IS_LOGGED_IN: 'loginuser',
  LOGIN: 'login',
  LOGOUT: 'logout',
  RESET_PASSWORD: 'loginresetpassword'
};


gmf.module.value('gmfUser', {
  'functionalities': null,
  'is_password_changed': null,
  'role_id': null,
  'role_name': null,
  'username': null
});


/**
 * @enum {string}
 */
gmf.AuthenticationEventType = {
  /**
   * Triggered after a login.
   */
  LOGIN: 'login',
  /**
   * Triggered after a logout.
   */
  LOGOUT: 'logout',
  /**
   * Triggered after the authentication service has loaded the login status.
   */
  READY: 'ready'
};

/**
 * @classdesc
 * Event emitted by the authentication service.
 *
 * @constructor
 * @struct
 * @extends {ol.events.Event}
 * @param {gmf.AuthenticationEventType} type Event type.
 * @param {gmfx.User} user The current user.
 */
gmf.AuthenticationEvent = function(type, user) {

  ol.events.Event.call(this, type);

  /**
   * The logged-in user.
   * @type {gmfx.User}
   */
  this.user = user;

};
ol.inherits(gmf.AuthenticationEvent, ol.events.Event);


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
 * @constructor
 * @struct
 * @extends {ol.events.EventTarget}
 * @param {angular.$http} $http Angular http service.
 * @param {string} authenticationBaseUrl URL to "authentication" web service.
 * @param {gmfx.User} gmfUser User.
 * @ngInject
 */
gmf.Authentication = function($http, authenticationBaseUrl, gmfUser) {

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
};
ol.inherits(gmf.Authentication, ol.events.EventTarget);


/**
 * Load the authentication service, which sends an asynch request to
 * determine whether the user is currently connected or not.
 * @private
 */
gmf.Authentication.prototype.load_ = function() {
  const url = `${this.baseUrl_}/${gmf.AuthenticationRouteSuffix.IS_LOGGED_IN}`;
  this.$http_.get(url, {withCredentials: true}).then(
    this.handleLogin_.bind(this, true)
  );
};


/**
 * @param {string} oldPwd Old password.
 * @param {string} newPwd New password.
 * @param {string} confPwd New password confirmation.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Authentication.prototype.changePassword = function(oldPwd, newPwd,
  confPwd) {

  const url = `${this.baseUrl_}/${gmf.AuthenticationRouteSuffix.CHANGE_PASSWORD}`;

  return this.$http_.post(url, $.param({
    'oldPassword': oldPwd,
    'newPassword': newPwd,
    'confirmNewPassword': confPwd
  }), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    withCredentials: true
  });
};


/**
 * @param {string} login Login name.
 * @param {string} pwd Password.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Authentication.prototype.login = function(login, pwd) {

  const url = `${this.baseUrl_}/${gmf.AuthenticationRouteSuffix.LOGIN}`;

  return this.$http_.post(url, $.param({'login': login, 'password': pwd}), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    withCredentials: true
  }).then(
    this.handleLogin_.bind(this, false));
};


/**
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Authentication.prototype.logout = function() {
  const url = `${this.baseUrl_}/${gmf.AuthenticationRouteSuffix.LOGOUT}`;
  return this.$http_.get(url, {withCredentials: true}).then(
    this.resetUser_.bind(this));
};


/**
 * @param {string} login Login name.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Authentication.prototype.resetPassword = function(login) {
  const url = `${this.baseUrl_}/${gmf.AuthenticationRouteSuffix.RESET_PASSWORD}`;

  /**
   * @param {angular.$http.Response} resp Ajax response.
   * @return {gmf.AuthenticationDefaultResponse} Response.
   */
  const successFn = function(resp) {
    const respData = /** @type {gmf.AuthenticationDefaultResponse} */ (
      resp.data);
    return respData;
  }.bind(this);

  return this.$http_.post(url, $.param({'login': login}), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(successFn);
};


/**
 * @return {?gmfx.AuthenticationFunctionalities} The role functionalities.
 */
gmf.Authentication.prototype.getFunctionalities = function() {
  return this.user_.functionalities;
};


/**
 * @return {number|null} The role ID.
 */
gmf.Authentication.prototype.getRoleId = function() {
  return this.user_.role_id;
};


/**
 * @param {boolean} checkingLoginStatus Checking the login status?
 * @param {angular.$http.Response} resp Ajax response.
 * @return {angular.$http.Response} Response.
 * @private
 */
gmf.Authentication.prototype.handleLogin_ = function(checkingLoginStatus, resp) {
  const respData = /** @type {gmf.AuthenticationLoginResponse} */ (resp.data);
  this.setUser_(respData, !checkingLoginStatus);
  if (checkingLoginStatus) {
    this.dispatchEvent(new gmf.AuthenticationEvent(
      gmf.AuthenticationEventType.READY, this.user_));
  }
  return resp;
};


/**
 * @param {gmf.AuthenticationLoginResponse} respData Response.
 * @param {boolean} emitEvent Emit a login event?
 * @private
 */
gmf.Authentication.prototype.setUser_ = function(respData, emitEvent) {
  for (const key in respData) {
    this.user_[key] = respData[key];
  }
  if (emitEvent && respData.username !== undefined) {
    this.dispatchEvent(new gmf.AuthenticationEvent(
      gmf.AuthenticationEventType.LOGIN, this.user_));
  }
};


/**
 * @private
 */
gmf.Authentication.prototype.resetUser_ = function() {
  for (const key in this.user_) {
    this.user_[key] = null;
  }
  this.dispatchEvent(new gmf.AuthenticationEvent(
    gmf.AuthenticationEventType.LOGOUT, this.user_));
  this.load_();
};


gmf.module.service('gmfAuthentication', gmf.Authentication);
