goog.provide('gmf.authentication.component');

goog.require('gmf');
goog.require('gmf.authentication.Service');
goog.require('ngeo');
goog.require('ngeo.message.Notification');
/** @suppress {extraRequire} */
goog.require('ngeo.message.modalComponent');


/**
 * @type {angular.Module}
 */
gmf.authentication.component = angular.module('gmfAuthentication', [
  gmf.authentication.Service.module.name,
  ngeo.message.modalComponent.name,
]);

gmf.module.requires.push(gmf.authentication.component.name);

/**
 * @param {angular.JQLite} element Element.
 * @param {angular.Attributes} attrs Attributes.
 * @return {string} Template URL.
 */
gmf.authentication.component.gmfAuthenticationTemplateUrl_ = (element, attrs) => {
  const templateUrl = attrs['gmfAuthenticationTemplateurl'];
  return templateUrl !== undefined ? templateUrl :
    `${gmf.baseModuleTemplateUrl}/authentication/component.html`;
};


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfAuthenticationTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfAuthenticationTemplateUrl($element, $attrs, gmfAuthenticationTemplateUrl) {
  return gmfAuthenticationTemplateUrl($element, $attrs);
}


/**
 * An "authentication" component for a GeoMapFish application. With the
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
 *        gmf-authentication-allow-password-reset="true"
 *        gmf-authentication-allow-password-change="true">
 *      </gmf-authentication>
 *
 * @htmlAttribute {boolean} gmf-authentication-allow-password-change Whether to
 *     show the change password button. Default to true.
 * @htmlAttribute {boolean} gmf-authentication-allow-password-reset Whether to
 *     show the password forgotten link. Default to true.
 * @ngdoc component
 * @ngname gmfAuthentication
 */
gmf.authentication.component.component_ = {
  bindings: {
    'allowPasswordChange': '<?gmfAuthenticationAllowPasswordChange'
  },
  controller: 'GmfAuthenticationController',
  templateUrl: gmfAuthenticationTemplateUrl
};

gmf.authentication.component.value('gmfAuthenticationTemplateUrl',
  gmf.authentication.component.gmfAuthenticationTemplateUrl_);

gmf.authentication.component.component('gmfAuthentication', gmf.authentication.component.component_);


/**
 * @private
 */
gmf.authentication.component.AuthenticationController_ = class {
  /**
   * @private
   * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
   * @param {angular.Scope} $scope The directive's scope.
   * @param {gmf.authentication.Service} gmfAuthenticationService GMF Authentication service
   * @param {gmfx.User} gmfUser User.
   * @param {ngeo.message.Notification} ngeoNotification Ngeo notification service.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfAuthenticationController
   */
  constructor(gettextCatalog, $scope, gmfAuthenticationService, gmfUser, ngeoNotification) {

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
     * @type {gmf.authentication.Service}
     * @private
     */
    this.gmfAuthenticationService_ = gmfAuthenticationService;

    /**
     * @type {ngeo.message.Notification}
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
  }

  /**
   * Initialise the controller.
   */
  $onInit() {
    if (this.allowPasswordReset === undefined) {
      this.allowPasswordReset = true;
    }
    if (this.allowPasswordChange === undefined) {
      this.allowPasswordChange = true;
    }
  }


  // METHODS THAT CALL THE AUTHENTICATION SERVICE METHODS

  /**
   * Calls the authentication service changePassword method.
   * @export
   */
  changePassword() {
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
        this.gmfAuthenticationService_.changePassword(oldPwd, newPwd, confPwd).then(
          () => {
            this.changePasswordModalShown = true;
            this.changePasswordReset();
          },
          this.setError_.bind(this, error));
      }
    }
  }

  /**
   * Calls the authentication service login method.
   * @export
   */
  login() {
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
      this.gmfAuthenticationService_.login(this.loginVal, this.pwdVal).then(
        this.resetError_.bind(this),
        this.setError_.bind(this, error));
    }
  }

  /**
   * Calls the authentication service logout method.
   * @export
   */
  logout() {
    const gettextCatalog = this.gettextCatalog;
    const error = gettextCatalog.getString('Could not log out.');
    this.gmfAuthenticationService_.logout().then(
      this.resetError_.bind(this),
      this.setError_.bind(this, error));
  }

  /**
   * Calls the authentication service resetPassword method.
   * @export
   */
  resetPassword() {
    const gettextCatalog = this.gettextCatalog;

    if (!this.loginVal) {
      this.setError_(gettextCatalog.getString('Please, input a login...'));
      return;
    }

    const error = gettextCatalog.getString('An error occured while reseting the password.');

    /**
     * @param {gmfx.AuthenticationDefaultResponse} respData Response.
     */
    const resetPasswordSuccessFn = function(respData) {
      this.resetPasswordModalShown = true;
      this.resetError_();
    }.bind(this);

    this.gmfAuthenticationService_.resetPassword(this.loginVal).then(
      resetPasswordSuccessFn,
      this.setError_.bind(this, error)
    );
  }


  // OTHER METHODS

  /**
   * Reset the changePassword values and error.
   * @export
   */
  changePasswordReset() {
    this.resetError_();
    this.changingPassword = false;
    this.oldPwdVal = '';
    this.newPwdVal = '';
    this.newPwdConfVal = '';
  }

  /**
   * @param {string|Array.<string>} errors Errors.
   * @private
   */
  setError_(errors) {
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
        type: ngeo.message.Message.Type.ERROR
      });
    }, this);
  }

  /**
   * @private
   */
  resetError_() {
    this.notification_.clear();
    this.error = false;
  }
};

gmf.authentication.component.controller('GmfAuthenticationController',
  gmf.authentication.component.AuthenticationController_);
