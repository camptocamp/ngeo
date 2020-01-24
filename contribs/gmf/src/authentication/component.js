import angular from 'angular';
import gmfAuthenticationService from 'gmf/authentication/Service.js';
import {MessageType} from 'ngeo/message/Message.js';
import ngeoMessageNotification from 'ngeo/message/Notification.js';
import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';
import {listen} from 'ol/events.js';

import qruri from 'qruri';

/**
 * Password validator function with an error message.
 * Configuration options for the permalink service.
 * @typedef {Object} PasswordValidator
 * @property {function(string): boolean} isPasswordValid
 * @property {string} notValidMessage
 */


/**
 * The Authentication configuration.
 * @typedef {Object} AuthenticationConfig
 * @property {boolean} allowPasswordReset Whether to show the password forgotten link. Default to true.
 * @property {boolean} allowPasswordChange Whether to show the change password button. Default to true.
 *    You can also specify a `PasswordValidator` Object to add constraint on user's new password.
 * @property {boolean} forcePasswordChange Force the user to change its password. Default to false.
 *    If you set it to true, you should also allow the user to change its password. Don't add this option
 *    alone, use it in a dedicated authentication component.
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
  const templateUrl = attrs.gmfAuthenticationTemplateurl;
  return templateUrl !== undefined ? templateUrl :
    'gmf/authentication';
}


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/authentication', require('./component.html'));
  });


/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfAuthenticationTemplateUrl Template function.
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
 *        gmf-authentication-info-message="mainCtrl.loginInfoMessage">
 *      </gmf-authentication>
 *
 * @htmlAttribute {PasswordValidator} gmf-authentication-password-validator A PasswordValidator
 *     Object to add constraint on user's new password. The `allowPasswordChange` config. To use
 *     it you must also allow the user to change its password.
 * @htmlAttribute {string} gmf-authentication-info-message Message to show above the authentication form.
 * @htmlAttribure {boolean} gmf-authentication-modal Is the authentication is included in the modal window.
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
 *           gmf-authentication-modal="::true">
 *         </gmf-authentication>
 *       </div>
 *     </ngeo-modal>
 *
 * @ngdoc component
 * @ngname gmfAuthentication
 */
const authenticationComponent = {
  bindings: {
    'passwordValidator': '<?gmfAuthenticationPasswordValidator',
    'infoMessage': '=?gmfAuthenticationInfoMessage',
    'modal': '=?gmfAuthenticationModal'
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
   * @param {angular.IScope} $scope Scope.
   * @param {JQuery} $element Element.
   * @param {boolean} gmfTwoFactorAuth Two factor authentication is required.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import("gmf/authentication/Service.js").AuthenticationService} gmfAuthenticationService
   *    GMF Authentication service
   * @param {import('gmf/authentication/Service.js').User} gmfUser User.
   * @param {import("ngeo/message/Notification.js").MessageNotification} ngeoNotification Ngeo notification
   *    service.
   * @param {AuthenticationConfig} gmfAuthenticationConfig The configuration
   * @ngInject
   * @ngdoc controller
   * @ngname GmfAuthenticationController
   */
  constructor($scope, $element, gmfTwoFactorAuth, gettextCatalog, gmfAuthenticationService,
    gmfUser, ngeoNotification, gmfAuthenticationConfig) {

    /**
     * @type {JQuery}
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
    this.twoFactorAuth = gmfTwoFactorAuth;

    /**
     * @type {boolean}
     */
    this.allowPasswordReset = gmfAuthenticationConfig.allowPasswordReset !== false;

    /**
     * @type {boolean}
     */
    this.allowPasswordChange = gmfAuthenticationConfig.allowPasswordChange !== false;

    /**
     * @type {PasswordValidator?}
     */
    this.passwordValidator = null;

    /**
     * @type {?string}
     */
    this.infoMessage = null;

    /**
     * @type {?boolean}
     */
    this.modal = false;

    /**
     * @type {boolean}
     */
    this.changingPassword = false;

    /**
     * @type {boolean}
     */
    this.userMustChangeItsPassword = false;

    listen(gmfAuthenticationService, 'mustChangePassword', () => {
      this.changingPassword = true;
      this.userMustChangeItsPassword = true;
    });

    listen(gmfAuthenticationService, 'changePasswordReset', () => {
      this.resetError_();
      this.changingPassword = false;
      this.userMustChangeItsPassword = false;
      this.oldPwdVal = '';
      this.newPwdVal = '';
      this.newPwdConfVal = '';
    });

    listen(gmfAuthenticationService, 'login', () => {
      this.changingPassword = false;
      this.userMustChangeItsPassword = false;
    });

    /**
     * @type {boolean}
     */
    this.resetPasswordModalShown = false;

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

    /**
     * @type {string}
     */
    this.otpVal;

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

    this.otpImage;

    /**
     * @type {boolean}
     */
    this.isLoading = false;

    $scope.$watch(
      () => this.gmfUser.otp_uri,
      (val) => {
        if (val) {
          this.otpImage = qruri(val, {
            margin: 2
          });
        }
      }
    );
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
        const username = this.gmfUser.username;
        this.gmfAuthenticationService_.changePassword(username, oldPwd, newPwd, confPwd, this.otpVal)
          .then(() => {
            this.changePasswordReset();
            this.setError_(
              [gettextCatalog.getString('Your password has successfully been changed.')],
              MessageType.INFORMATION
            );
          })
          .catch((err) => {
            this.oldPwdVal = '';
            this.otpVal = '';
            this.setError_(gettextCatalog.getString('Incorrect old password.'));
          });
      }
    }
  }

  /**
   * Calls the authentication service login method.
   */
  login() {
    const gettextCatalog = this.gettextCatalog;

    this.isLoading = true;
    const errors = [];
    if (this.loginVal === '') {
      errors.push(gettextCatalog.getString('The username is required.'));
    }
    if (this.pwdVal === '') {
      errors.push(gettextCatalog.getString('The password is required.'));
    }
    if (errors.length) {
      this.isLoading = false;
      this.setError_(errors);
    } else {
      this.gmfAuthenticationService_.login(this.loginVal, this.pwdVal, this.otpVal)
        .then(() => {
          this.isLoading = false;
          this.loginVal = '';
          this.pwdVal = '';
          this.otpVal = '';
          this.resetError_();
        })
        .catch(() => {
          this.isLoading = false;
          this.pwdVal = '';
          this.otpVal = '';
          this.setError_(gettextCatalog.getString('Incorrect credentials or disabled account.'));
        });
    }
  }

  /**
   * Calls the authentication service logout method.
   */
  logout() {
    const gettextCatalog = this.gettextCatalog;

    this.isLoading = true;
    this.gmfAuthenticationService_.logout()
      .then(() => {
        this.isLoading = false;
        this.resetError_();
      })
      .catch(() => {
        this.isLoading = false;
        this.setError_(gettextCatalog.getString('Could not log out.'));
      });
  }

  /**
   * Calls the authentication service resetPassword method.
   */
  resetPassword() {
    const gettextCatalog = this.gettextCatalog;

    this.isLoading = true;
    if (!this.loginVal) {
      this.setError_(gettextCatalog.getString('Please, input a login...'));
      return;
    }

    this.gmfAuthenticationService_.resetPassword(this.loginVal)
      .then(() => {
        this.isLoading = false;
        this.resetPasswordModalShown = true;
        this.resetError_();
      })
      .catch(() => {
        this.isLoading = false;
        this.setError_(gettextCatalog.getString('An error occurred while resetting the password.'));
      });

  }


  // OTHER METHODS

  /**
   * Reset the changePassword values and error.
   */
  changePasswordReset() {
    this.gmfAuthenticationService_.changePasswordReset();
  }

  /**
   * @param {string|string[]} errors Errors.
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

    errors.forEach((error) => {
      /** @type {import('ngeo/message/Message.js').Message} */
      const options = {
        msg: error,
        target: container,
      };
      if (messageType) {
        options.type = messageType;
      }
      this.notification_.notify(options);
    });
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
