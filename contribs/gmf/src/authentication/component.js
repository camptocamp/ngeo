/**
 */
import angular from 'angular';
import gmfAuthenticationService from 'gmf/authentication/Service.js';
import ngeoMessageMessage from 'ngeo/message/Message.js';
import ngeoMessageNotification from 'ngeo/message/Notification.js';

import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';

/**
 * @type {angular.IModule}
 */
const exports = angular.module('gmfAuthentication', [
  gmfAuthenticationService.module.name,
  ngeoMessageNotification.module.name,
  ngeoMessageModalComponent.name,
]);


/**
 * @param {angular.JQLite} element Element.
 * @param {angular.Attributes} attrs Attributes.
 * @return {string} Template URL.
 */
exports.gmfAuthenticationTemplateUrl_ = (element, attrs) => {
  const templateUrl = attrs['gmfAuthenticationTemplateurl'];
  return templateUrl !== undefined ? templateUrl :
    'gmf/authentication';
};


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/authentication', require('./component.html'));
});


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
 *        gmf-authentication-info-message="mainCtrl.loginInfoMessage"
 *        gmf-authentication-allow-password-change="::true">
 *      </gmf-authentication>
 *
 * @htmlAttribute {boolean} gmf-authentication-allow-password-reset Whether to
 *     show the password forgotten link. Default to true.
 * @htmlAttribute {boolean|function} gmf-authentication-allow-password-change Whether to
 *     show the change password button. Default to true. You can also specify a gmfx.PasswordValidator Object
 *     to add constraint on user's new password.
 * @htmlAttribute {gmfx.PasswordValidator} gmf-authentication-password-validator A gmfx.PasswordValidator
 *     Object to add constraint on user's new password. The gmf-authentication-allow-password-change. To use
 *     it you must also allow the user to change its password.
 * @htmlAttribute {boolean} gmf-authentication-force-password-change Force the
 *     user to change its password. Default to false. If you set it to true, you
 *     should also allow the user to change its password. Don't add this option alone, use
 *     it in a dedicated authentication component, in a ngeo-modal, directly in
 *     your index.html (see example 2.)
 * @htmlAttribute {string} gmf-authentication-info-message Message to show above the authentication form.
 *
 * Example 2:
 *
 *     <ngeo-modal
 *         ngeo-modal-closable="false"
 *         ng-model="mainCtrl.userMustChangeItsPassword()"
 *         ng-model-options="{getterSetter: true}">
 *       <div class="modal-header">
 *         <h4 class="modal-title">
 *           {{'You must change your password' | translate}}
 *         </h4>
 *       </div>
 *       <div class="modal-body">
 *         <gmf-authentication
 *           gmf-authentication-force-password-change="::true">
 *         </gmf-authentication>
 *       </div>
 *     </ngeo-modal>
 *
 * @ngdoc component
 * @ngname gmfAuthentication
 */
const component = {
  bindings: {
    'allowPasswordReset': '<?gmfAuthenticationAllowPasswordReset',
    'allowPasswordChange': '<?gmfAuthenticationAllowPasswordChange',
    'passwordValidator': '<?gmfAuthenticationPasswordValidator',
    'forcePasswordChange': '<?gmfAuthenticationForcePasswordChange',
    'infoMessage': '=?gmfAuthenticationInfoMessage'
  },
  controller: 'GmfAuthenticationController',
  templateUrl: gmfAuthenticationTemplateUrl
};

exports.value('gmfAuthenticationTemplateUrl',
  exports.gmfAuthenticationTemplateUrl_);

exports.component('gmfAuthentication', component);


/**
 * @private
 */
class AuthenticationController {
  /**
   * @private
   * @param {!angular.JQLite} $element Element.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import("gmf/authentication/Service.js").default} gmfAuthenticationService GMF Authentication service
   * @param {gmfx.User} gmfUser User.
   * @param {import("ngeo/message/Notification.js").default} ngeoNotification Ngeo notification service.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfAuthenticationController
   */
  constructor($element, gettextCatalog, gmfAuthenticationService, gmfUser, ngeoNotification) {

    /**
     * @type {!angular.JQLite}
     * @private
     */
    this.$element_ = $element;

    /**
     * @type {gmfx.User}
     * @export
     */
    this.gmfUser = gmfUser;

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog = gettextCatalog;

    /**
     * @type {import("gmf/authentication/Service.js").default}
     * @private
     */
    this.gmfAuthenticationService_ = gmfAuthenticationService;

    /**
     * @type {import("ngeo/message/Notification.js").default}
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
     * @type {gmfx.PasswordValidator?}
     * @export
     */
    this.passwordValidator = null;

    /**
     * @type {boolean}
     * @export
     */
    this.forcePasswordChange;

    /**
     * @type {?string}
     * @export
     */
    this.infoMessage = null;

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
    this.allowPasswordReset = this.allowPasswordReset !== false;
    this.allowPasswordChange = this.allowPasswordChange !== false;
    this.forcePasswordChange = this.forcePasswordChange === true;
    if (this.forcePasswordChange) {
      this.changingPassword = true;
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
    // Validation - Passwords are required.
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
      // Default validation - Passwords must be new and must also match.
      if (oldPwd === newPwd) {
        errors.push(gettextCatalog.getString('The old and new passwords are the same.'));
      }
      if (newPwd !== confPwd) {
        errors.push(gettextCatalog.getString('The passwords don\'t match.'));
      }
      // Custom validation - If a passwordValidator is set, use it to validate the new password.
      if (this.passwordValidator) {
        if (!this.passwordValidator.isPasswordValid(oldPwd)) {
          errors.push(gettextCatalog.getString(this.passwordValidator.notValidMessage));
        }
      }

      if (errors.length) {
        this.setError_(errors);
      } else {
        // Send request with current credentials, which may fail if the old password given is incorrect.
        this.gmfAuthenticationService_.changePassword(oldPwd, newPwd, confPwd)
          .then(() => {
            this.changePasswordModalShown = true;
            this.changePasswordReset();
          })
          .catch((err) => {
            this.setError_(gettextCatalog.getString('Incorrect old password.'));
          });
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
      const error = gettextCatalog.getString('Incorrect credentials or disabled account.');
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

    const error = gettextCatalog.getString('An error occurred while resetting the password.');

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
   * @return {boolean} True if the user must change is password and if the "forcePasswordChange" option of
   *    this component is set to true.
   * @export
   */
  userMustChangeItsPassword() {
    return (this.gmfUser.is_password_changed === false && this.forcePasswordChange);
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

    const container = this.$element_.find('.gmf-authentication-error');

    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    errors.forEach(function(error) {
      this.notification_.notify({
        msg: error,
        target: container,
        type: ngeoMessageMessage.Type.ERROR
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
}

exports.controller('GmfAuthenticationController', AuthenticationController);


export default exports;
