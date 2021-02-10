import angular from 'angular';
import gmfAuthenticationService from 'gmf/authentication/Service.js';
import {gmfBackgroundlayerStatus} from 'gmf/backgroundlayerselector/status.js';
import {MessageType} from 'ngeo/message/Message.js';
import ngeoMessageNotification from 'ngeo/message/Notification.js';

import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';


/**
 * Password validator function with an error message.
 * Configuration options for the permalink service.
 * @typedef {Object} PasswordValidator
 * @property {function(string): boolean} isPasswordValid
 * @property {string} notValidMessage
 */


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfAuthentication', [
  gmfAuthenticationService.name,
  ngeoMessageNotification.name,
  ngeoMessageModalComponent.name,
]);


/**
 * @param {JQuery} element Element.
 * @param {angular.IAttributes} attrs Attributes.
 * @return {string} Template URL.
 * @private
 * @hidden
 */
function gmfAuthenticationTemplateUrl_(element, attrs) {
  const templateUrl = attrs['gmfAuthenticationTemplateurl'];
  return templateUrl !== undefined ? templateUrl :
    'gmf/authentication';
}


module.run(/* @ngInject */ ($templateCache) => {
  // @ts-ignore: webpack
  $templateCache.put('gmf/authentication', require('./component.html'));
});


/**
 * @param {!JQuery} $element Element.
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!JQuery, !angular.IAttributes): string} gmfAuthenticationTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
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
 *     show the change password button. Default to true. You can also specify a PasswordValidator Object
 *     to add constraint on user's new password.
 * @htmlAttribute {PasswordValidator} gmf-authentication-password-validator A PasswordValidator
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
 *         ng-model="mainCtrl.userMustChangeItsPassword">
 *       <div class="modal-header ui-draggable-handle">
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
const authenticationComponent = {
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

module.value('gmfAuthenticationTemplateUrl',
  gmfAuthenticationTemplateUrl_);

module.component('gmfAuthentication', authenticationComponent);


/**
 * @private
 * @hidden
 */
class AuthenticationController {
  /**
   * @param {!JQuery} $element Element.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import("gmf/authentication/Service.js").AuthenticationService} gmfAuthenticationService
   *    GMF Authentication service
   * @param {import('gmf/authentication/Service.js').User} gmfUser User.
   * @param {import("ngeo/message/Notification.js").MessageNotification} ngeoNotification Ngeo notification
   *    service.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfAuthenticationController
   */
  constructor($element, gettextCatalog, gmfAuthenticationService, gmfUser, ngeoNotification) {

    /**
     * @type {!JQuery}
     * @private
     */
    this.$element_ = $element;

    /**
     * @type {import('gmf/authentication/Service.js').User}
     */
    this.gmfUser = gmfUser;

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog = gettextCatalog;

    /**
     * @type {import("gmf/authentication/Service.js").AuthenticationService}
     * @private
     */
    this.gmfAuthenticationService_ = gmfAuthenticationService;

    /**
     * @type {import("ngeo/message/Notification.js").MessageNotification}
     * @private
     */
    this.notification_ = ngeoNotification;

    /**
     * @type {boolean}
     */
    this.allowPasswordReset;

    /**
     * @type {boolean}
     */
    this.allowPasswordChange;

    /**
     * @type {PasswordValidator?}
     */
    this.passwordValidator = null;

    /**
     * @type {boolean}
     */
    this.forcePasswordChange;

    /**
     * @type {?string}
     */
    this.infoMessage = null;

    /**
     * @type {boolean}
     */
    this.changingPassword = false;

    /**
     * @type {boolean}
     */
    this.userMustChangeItsPassword = false;

    /**
     * @type {boolean}
     */
    this.resetPasswordShown = false;

    /**
     * @type {boolean}
     */
    this.error = false;

    // LOGIN form values

    /**
     * @type {string}
     */
    this.loginVal = '';

    /**
     * @type {string}
     */
    this.pwdVal = '';

    // CHANGE PASSWORD form values

    /**
     * @type {string}
     */
    this.oldPwdVal = '';

    /**
     * @type {string}
     */
    this.newPwdVal = '';

    /**
     * @type {string}
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
    this.userMustChangeItsPassword = (this.gmfUser.is_password_changed === false && this.forcePasswordChange);
  }


  // METHODS THAT CALL THE AUTHENTICATION SERVICE METHODS

  /**
   * Calls the authentication service changePassword method.
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
            this.changePasswordReset();
            this.setError_(
              [gettextCatalog.getString('Your password has successfully been changed.')],
              MessageType.INFORMATION
            );
          })
          .catch((err) => {
            this.setError_(gettextCatalog.getString('Incorrect old password.'));
          });
      }
    }
  }

  /**
   * Calls the authentication service login method.
   */
  login() {
    this.manualLoginLogout_();
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
      this.gmfAuthenticationService_.login(this.loginVal, this.pwdVal)
        .then(() => {
          this.resetError_();
        })
        .catch(() => {
          this.setError_(gettextCatalog.getString('Incorrect credentials or disabled account.'));
        });
    }
  }

  /**
   * Calls the authentication service logout method.
   */
  logout() {
    this.manualLoginLogout_();
    const gettextCatalog = this.gettextCatalog;
    this.gmfAuthenticationService_.logout()
      .then(() => {
        this.resetError_();
      })
      .catch(() => {
        this.setError_(gettextCatalog.getString('Could not log out.'));
      });
  }

  /**
   * Effects on manual try to login/logout.
   */
  manualLoginLogout_() {
    // Set the user could lead to a new background.
    gmfBackgroundlayerStatus.touchedByUser = true;
  }

  /**
   * Calls the authentication service resetPassword method.
   */
  resetPassword() {
    const gettextCatalog = this.gettextCatalog;

    if (!this.loginVal) {
      this.setError_(gettextCatalog.getString('Please, input a login...'));
      return;
    }

    this.gmfAuthenticationService_.resetPassword(this.loginVal)
      .then(() => {
        this.resetPasswordShown = true;
        this.resetError_();
      })
      .catch(() => {
        this.setError_(gettextCatalog.getString('An error occurred while resetting the password.'));
      });

  }


  // OTHER METHODS

  /**
   * Reset the changePassword values and error.
   */
  changePasswordReset() {
    this.resetError_();
    this.changingPassword = false;
    this.oldPwdVal = '';
    this.newPwdVal = '';
    this.newPwdConfVal = '';
  }

  /**
   * @param {string|Array<string>} errors Errors.
   * @param {MessageType} [messageType] Type.
   * @private
   */
  setError_(errors, messageType) {
    if (messageType == undefined) {
      messageType = MessageType.ERROR;
    }
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
        type: messageType
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

module.controller('GmfAuthenticationController', AuthenticationController);


export default module;
