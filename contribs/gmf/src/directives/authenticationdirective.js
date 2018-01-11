goog.provide('gmf.authenticationDirective');

goog.require('gmf');
goog.require('gmf.Authentication');
goog.require('ngeo.Notification');
/** @suppress {extraRequire} */
goog.require('ngeo.modalDirective');
goog.require('ol.events');


gmf.module.value('gmfAuthenticationTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
  (element, attrs) => {
    const templateUrl = attrs['gmfAuthenticationTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/authentication.html`;
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
 *      <gmf-authentication
 *        gmf-authentication-force-password-change="::true">
 *      </gmf-authentication>
 *
 * @param {string} gmfAuthenticationTemplateUrl Url to template.
 * @htmlAttribute {boolean} gmf-authentication-allow-password-reset Whether to
 *     show the password forgotten link. Default to true.
 * @htmlAttribute {boolean} gmf-authentication-allow-password-change Whether to
 *     show the change password button. Default to true.
 * @htmlAttribute {boolean} gmf-authentication-force-password-change Force the
 *     user to change its password. Default to false. If you set it to true, you
 *     should also allow the user to change its password.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfAuthentication
 */
gmf.authenticationDirective = function(gmfAuthenticationTemplateUrl) {
  return {
    bindToController: true,
    scope: {
      'allowPasswordReset': '<?gmfAuthenticationAllowPasswordReset',
      'allowPasswordChange': '<?gmfAuthenticationAllowPasswordChange',
      'forcePasswordChange': '<?gmfAuthenticationForcePasswordChange'
    },
    controller: 'GmfAuthenticationController as authCtrl',
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
 * @private
 * @struct
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
  this.allowPasswordReset;

  /**
   * @type {boolean}
   * @export
   */
  this.allowPasswordChange;

  /**
   * @type {boolean}
   * @export
   */
  this.forcePasswordChange;

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

  ol.events.listen(gmfAuthentication, gmf.AuthenticationEventType.READY,
    this.onLoginReady_.bind(this));
};


/**
 * Initialise the controller.
 */
gmf.AuthenticationController.prototype.$onInit = function() {
  this.allowPasswordReset = this.allowPasswordReset !== false;
  this.allowPasswordChange = this.allowPasswordChange !== false;
  this.forcePasswordChange = this.forcePasswordChange === true;
};


// METHODS THAT CALL THE AUTHENTICATION SERVICE METHODS


/**
 * Calls the authentication service changePassword method.
 * @export
 */
gmf.AuthenticationController.prototype.changePassword = function() {
  const gettextCatalog = this.gettextCatalog;

  const oldPwd = this.oldPwdVal;
  const newPwd = this.newPwdVal;
  const confPwd = this.newPwdConfVal;

  const errors = [];
  // (1) validation - passwords are required
  if (oldPwd === '') {
    errors.push(gettextCatalog.getString('The old password is required.'));
  }
  if (newPwd === '') {
    errors.push(gettextCatalog.getString('The new password is required.'));
  }
  if (confPwd === '') {
    errors.push(gettextCatalog.getString('The password confirmation is required.'));
  }

  if (errors.length) {
    this.setError_(errors);
  } else {
    // (2) validation - passwords must be new and must also match
    if (oldPwd === newPwd) {
      errors.push(gettextCatalog.getString('The old and new passwords are the same.'));
    }
    if (newPwd !== confPwd) {
      errors.push(gettextCatalog.getString('The passwords don\'t match.'));
    }

    if (errors.length) {
      this.setError_(errors);
    } else {
      // (3) send request with current credentials, which may fail if
      //     the old password given is incorrect.
      const error = gettextCatalog.getString('Incorrect old password.');
      this.gmfAuthentication_.changePassword(oldPwd, newPwd, confPwd).then(
        () => {
          this.changePasswordModalShown = true;
          this.changePasswordReset();
        },
        this.setError_.bind(this, error));
    }
  }
};


/**
 * Calls the authentication service login method.
 * @export
 */
gmf.AuthenticationController.prototype.login = function() {
  const gettextCatalog = this.gettextCatalog;

  const errors = [];
  if (this.loginVal === '') {
    errors.push(gettextCatalog.getString('The username is required.'));
  }
  if (this.pwdVal === '') {
    errors.push(gettextCatalog.getString('The password is required.'));
  }
  if (errors.length) {
    this.setError_(errors);
  } else {
    const error = gettextCatalog.getString('Incorrect username or password.');
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
  const gettextCatalog = this.gettextCatalog;
  const error = gettextCatalog.getString('Could not log out.');
  this.gmfAuthentication_.logout().then(
    this.resetError_.bind(this),
    this.setError_.bind(this, error));
};


/**
 * Calls the authentication service resetPassword method.
 * @export
 */
gmf.AuthenticationController.prototype.resetPassword = function() {
  const gettextCatalog = this.gettextCatalog;

  if (!this.loginVal) {
    this.setError_(gettextCatalog.getString('Please, input a login...'));
    return;
  }

  const error = gettextCatalog.getString('An error occured while reseting the password.');

  /**
   * @param {gmf.AuthenticationDefaultResponse} respData Response.
   */
  const resetPasswordSuccessFn = function(respData) {
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
 * @param {gmf.AuthenticationEvent} e GMF Authentification event.
 * @private
 */
gmf.AuthenticationController.prototype.onLoginReady_ = function(e) {
  if (e.user.is_password_changed === false && this.forcePasswordChange) {
    const gettextCatalog = this.gettextCatalog;
    const msg = gettextCatalog.getString('You must change your password.');
    this.notification_.notify({
      msg,
      type: ngeo.MessageType.WARNING
    });
  }
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

  const container = angular.element('.gmf-authentication-error');

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
