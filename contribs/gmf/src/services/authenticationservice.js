goog.provide('gmf.Authentication');
goog.provide('gmf.AuthenticationEventType');

goog.require('gmf');
goog.require('goog.events.EventTarget');
goog.require('goog.uri.utils');


/**
 * @typedef {{
 *     functionalities: (gmf.AuthenticationFunctionalities|undefined),
 *     is_password_changed: (boolean|undefined),
 *     role_id: (number|undefined),
 *     role_name: (string|undefined),
 *     username: (string|undefined)
 * }}
 */
gmf.AuthenticationLoginResponse;


/**
 * @typedef {{
 *     default_basemap: Array.<string>,
 *     location: Array
 * }}
 */
gmf.AuthenticationFunctionalities;


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


/**
 * @typedef {{
 *     functionalities: (gmf.AuthenticationFunctionalities|null),
 *     is_password_changed: (boolean|null),
 *     role_id: (number|null),
 *     role_name: (string|null),
 *     username: (string|null)
 * }}
 */
gmf.User;


gmfModule.value('gmfUser', {
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
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {angular.$http} $http Angular http service.
 * @param {string} authenticationBaseUrl URL to "authentication" web service.
 * @param {gmf.User} gmfUser
 * @ngInject
 */
gmf.Authentication = function($http, authenticationBaseUrl, gmfUser) {

  goog.base(this);

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {string}
   * @private
   */
  this.baseUrl_ = authenticationBaseUrl;

  /**
   * @type {gmf.User}
   * @private
   */
  this.user_ = gmfUser;

  this.load_();
};
goog.inherits(gmf.Authentication, goog.events.EventTarget);


/**
 * Load the authentication service, which sends an asynch request to
 * determine whether the user is currently connected or not.
 * @private
 */
gmf.Authentication.prototype.load_ = function() {
  var url = goog.uri.utils.appendPath(
      this.baseUrl_, gmf.AuthenticationRouteSuffix.IS_LOGGED_IN);
  this.$http_.get(url, {withCredentials: true}).then(
      goog.bind(this.handleLogin_, this));
};


/**
 * @param {string} oldPwd
 * @param {string} newPwd
 * @param {string} confPwd
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Authentication.prototype.changePassword = function(oldPwd, newPwd,
    confPwd) {

  var url = goog.uri.utils.appendPath(
      this.baseUrl_, gmf.AuthenticationRouteSuffix.CHANGE_PASSWORD);

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
 * @param {string} login
 * @param {string} pwd
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Authentication.prototype.login = function(login, pwd) {

  var url = goog.uri.utils.appendPath(
      this.baseUrl_, gmf.AuthenticationRouteSuffix.LOGIN);

  return this.$http_.post(url, $.param({'login': login, 'password': pwd}), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    withCredentials: true
  }).then(
      goog.bind(this.handleLogin_, this));
};


/**
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Authentication.prototype.logout = function() {
  var url = goog.uri.utils.appendPath(
      this.baseUrl_, gmf.AuthenticationRouteSuffix.LOGOUT);
  return this.$http_.get(url, {withCredentials: true}).then(
      goog.bind(this.resetUser_, this));
};


/**
 * @param {string} login
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Authentication.prototype.resetPassword = function(login) {

  var url = goog.uri.utils.appendPath(
      this.baseUrl_, gmf.AuthenticationRouteSuffix.RESET_PASSWORD);

  return this.$http_.post(url, $.param({'login': login}), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(goog.bind(
      /**
       * @param {angular.$http.Response} resp Ajax response.
       * @return {gmf.AuthenticationDefaultResponse}
       */
      function(resp) {
        var respData = /** @type {gmf.AuthenticationDefaultResponse} */ (
            resp.data);
        return respData;
      }, this));
};


/**
 * @param {angular.$http.Response} resp Ajax response.
 * @return  {angular.$http.Response}
 * @private
 */
gmf.Authentication.prototype.handleLogin_ = function(resp) {
  var respData = /** @type {gmf.AuthenticationLoginResponse} */ (resp.data);
  this.setUser_(respData);
  return resp;
};


/**
 * @param {gmf.AuthenticationLoginResponse} respData
 * @private
 */
gmf.Authentication.prototype.setUser_ = function(respData) {
  if (respData.username !== undefined) {
    for (var key in respData) {
      this.user_[key] = respData[key];
    }
  }
};


/**
 * @private
 */
gmf.Authentication.prototype.resetUser_ = function() {
  for (var key in this.user_) {
    this.user_[key] = null;
  }
};



gmfModule.service('gmfAuthentication', gmf.Authentication);
