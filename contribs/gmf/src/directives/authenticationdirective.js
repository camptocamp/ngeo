goog.provide('gmf.AuthenticationController');
goog.provide('gmf.authenticationDirective');

goog.require('gmf');
goog.require('gmf.Authentication');
goog.require('ngeo.Notification');
/** @suppress {extraRequire} */
goog.require('ngeo.modalDirective');


gmf.module.value('gmfAuthenticationTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {boolean} Template URL.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfAuthenticationTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/authentication.html';
    });


/**
 * An "authentication" directive for a GeoMapFish application. With the
 * use of the "authentication" service, it features a complete interface
 * for the user to be able to login, logout, change or reset his or her
 * password.  The `gmfUser` angular value is also used to keep track of
 * the user information. When empty, that means that the user isn't connected
 * yet.
 *
 * While not logged in, the "login" form is shown, which allows the user to
 * either log in or ask for a password reset.
 *
 * Once logged in, the "logout" form is shown, which allows the user to either
 * log out or change his or her password.
 *
 * Example:
 *
 *      <gmf-authentication></gmf-authentication>
 *
 * @param {string} gmfAuthenticationTemplateUrl Url to template.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfAuthentication
 */
gmf.authenticationDirective = function(gmfAuthenticationTemplateUrl) {
  return {
    scope: true,
    controller: 'GmfAuthenticationController',
    controllerAs: 'authCtrl',
    templateUrl: gmfAuthenticationTemplateUrl
  };
};

gmf.module.directive('gmfAuthentication', gmf.authenticationDirective);


/**
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {angular.Scope} $scope The directive's scope.
 * @param {gmf.Authentication} gmfAuthentication GMF Authentication service
 * @param {gmfx.User} gmfUser User.
 * @param {ngeo.Notification} ngeoNotification Ngeo notification service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfAuthenticationController
 */
gmf.AuthenticationController = function(gettextCatalog, $scope,
    gmfAuthentication, gmfUser, ngeoNotification) {

  /**
   * @type {gmfx.User}
   * @export
   */
  this.gmfUser = gmfUser;

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog = gettextCatalog;

  /**
   * @type {gmf.Authentication}
   * @private
   */
  this.gmfAuthentication_ = gmfAuthentication;

  /**
   * @type {ngeo.Notification}
   * @private
   */
  this.notification_ = ngeoNotification;

  /**
   * @type {boolean}
   * @export
   */
  this.changingPassword = false;

  /**
   * @type {boolean}
   * @export
   */
  this.changePasswordModalShown = false;

  /**
   * @type {boolean}
   * @export
   */
  this.resetPasswordModalShown = false;

  /**
   * @type {boolean}
   * @export
   */
  this.error = false;

  // LOGIN form values

  /**
   * @type {string}
   * @export
   */
  this.loginVal = '';

  /**
   * @type {string}
   * @export
   */
  this.pwdVal = '';

  // CHANGE PASSWORD form values

  /**
   * @type {string}
   * @export
   */
  this.oldPwdVal = '';

  /**
   * @type {string}
   * @export
   */
  this.newPwdVal = '';

  /**
   * @type {string}
   * @export
   */
  this.newPwdConfVal = '';

};


// METHODS THAT CALL THE AUTHENTICATION SERVICE METHODS


/**
 * Calls the authentication service changePassword method.
 * @export
 */
gmf.AuthenticationController.prototype.changePassword = function() {

  var oldPwd = this.oldPwdVal;
  var newPwd = this.newPwdVal;
  var confPwd = this.newPwdConfVal;
  var cat = this.gettextCatalog;

  var errors = [];
  // (1) validation - passwords are required
  if (oldPwd === '') {
    errors.push(cat.getString('The old password is required.'));
  }
  if (newPwd === '') {
    errors.push(cat.getString('The new password is required.'));
  }
  if (confPwd === '') {
    errors.push(cat.getString('The password confirmation is required.'));
  }

  if (errors.length) {
    this.setError_(errors);
  } else {
    // (2) validation - passwords must be new and must also match
    if (oldPwd === newPwd) {
      errors.push(cat.getString('The old and new passwords are the same.'));
    }
    if (newPwd !== confPwd) {
      errors.push(cat.getString('The passwords don\'t match.'));
    }

    if (errors.length) {
      this.setError_(errors);
    } else {
      // (3) send request with current credentials, which may fail if
      //     the old password given is incorrect.
      var error = cat.getString('Incorrect old password.');
      this.gmfAuthentication_.changePassword(oldPwd, newPwd, confPwd).then(
          function() {
            this.changePasswordModalShown = true;
            this.changePasswordReset();
          }.bind(this),
          this.setError_.bind(this, error));
    }
  }
};


/**
 * Calls the authentication service login method.
 * @export
 */
gmf.AuthenticationController.prototype.login = function() {
  var cat = this.gettextCatalog;
  var errors = [];
  if (this.loginVal === '') {
    errors.push(cat.getString('The username is required.'));
  }
  if (this.pwdVal === '') {
    errors.push(cat.getString('The password is required.'));
  }
  if (errors.length) {
    this.setError_(errors);
  } else {
    var error = cat.getString('Incorrect username or password.');
    this.gmfAuthentication_.login(this.loginVal, this.pwdVal).then(
        this.resetError_.bind(this),
        this.setError_.bind(this, error));
  }
};


/**
 * Calls the authentication service logout method.
 * @export
 */
gmf.AuthenticationController.prototype.logout = function() {
  var error = this.gettextCatalog.getString('Could not log out.');
  this.gmfAuthentication_.logout().then(
      this.resetError_.bind(this),
      this.setError_.bind(this, error));
};


/**
 * Calls the authentication service resetPassword method.
 * @export
 */
gmf.AuthenticationController.prototype.resetPassword = function() {

  if (!this.loginVal) {
    this.setError_(this.gettextCatalog.getString('Please, input a login...'));
    return;
  }

  var error = this.gettextCatalog.getString('An error occured while reseting the password.');

  /**
   * @param {gmf.AuthenticationDefaultResponse} respData Response.
   */
  var resetPasswordSuccessFn = function(respData) {
    this.resetPasswordModalShown = true;
    this.resetError_();
  }.bind(this);

  this.gmfAuthentication_.resetPassword(this.loginVal).then(
      resetPasswordSuccessFn,
      this.setError_.bind(this, error)
    );
};


// OTHER METHODS


/**
 * Reset the changePassword values and error.
 * @export
 */
gmf.AuthenticationController.prototype.changePasswordReset = function() {
  this.resetError_();
  this.changingPassword = false;
  this.oldPwdVal = '';
  this.newPwdVal = '';
  this.newPwdConfVal = '';
};


/**
 * @param {string|Array.<string>} errors Errors.
 * @private
 */
gmf.AuthenticationController.prototype.setError_ = function(errors) {
  if (this.error) {
    this.resetError_();
  }

  this.error = true;

  var container = angular.element('.gmf-authentication-error');

  if (!Array.isArray(errors)) {
    errors = [errors];
  }

  errors.forEach(function(error) {
    this.notification_.notify({
      msg: error,
      target: container,
      type: ngeo.MessageType.ERROR
    });
  }, this);
};


/**
 * @private
 */
gmf.AuthenticationController.prototype.resetError_ = function() {
  this.notification_.clear();
  this.error = false;
};


gmf.module.controller('GmfAuthenticationController',
    gmf.AuthenticationController);
