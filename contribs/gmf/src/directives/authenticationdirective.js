goog.provide('gmf.AuthenticationController');
goog.provide('gmf.authenticationDirective');

goog.require('gmf');
goog.require('gmf.Authentication');
/** @suppress {extraRequire} */
goog.require('ngeo.modalDirective');


gmfModule.value('gmfAuthenticationTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
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
 * @example
 * <gmf-authentication></gmf-authentication>
 *
 * @param {string} gmfAuthenticationTemplateUrl Url to template.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfAuthentication
 */
gmf.authenticationDirective = function(gmfAuthenticationTemplateUrl) {
  return {
    scope: {},
    controller: 'GmfAuthenticationController',
    controllerAs: 'authCtrl',
    templateUrl: gmfAuthenticationTemplateUrl
  };
};

gmfModule.directive('gmfAuthentication', gmf.authenticationDirective);



/**
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {angular.Scope} $scope The directive's scope.
 * @param {gmf.Authentication} gmfAuthentication GMF Authentication service
 * @param {gmf.User} gmfUser
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfAuthenticationController
 */
gmf.AuthenticationController = function(gettextCatalog, $scope,
    gmfAuthentication, gmfUser) {

  /**
   * @type {gmf.User}
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
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {gmf.Authentication}
   * @private
   */
  this.gmfAuthentication_ = gmfAuthentication;

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
   * @type {string}
   * @export
   */
  this.error = '';

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

  if (oldPwd === newPwd) {
    this.setError_(this.translate('The old and new passwords are the same.'));
    return;
  }

  if (newPwd !== confPwd) {
    this.setError_(this.translate('The passwords don\'t match.'));
    return;
  }

  var error = this.translate('Could not change password.');
  this.gmfAuthentication_.changePassword(oldPwd, newPwd, confPwd).then(
      goog.bind(function() {
        this.changePasswordModalShown = true;
        this.changePasswordReset();
      }, this),
      goog.bind(this.setError_, this, error));
};


/**
 * Calls the authentication service login method.
 * @export
 */
gmf.AuthenticationController.prototype.login = function() {
  var error = this.translate('Could not connect.');
  this.gmfAuthentication_.login(this.loginVal, this.pwdVal).then(
      goog.bind(this.resetError_, this),
      goog.bind(this.setError_, this, error));
};


/**
 * Calls the authentication service logout method.
 * @export
 */
gmf.AuthenticationController.prototype.logout = function() {
  var error = this.translate('Could not log out.');
  this.gmfAuthentication_.logout().then(
      goog.bind(this.resetError_, this),
      goog.bind(this.setError_, this, error));
};


/**
 * Calls the authentication service resetPassword method.
 * @export
 */
gmf.AuthenticationController.prototype.resetPassword = function() {

  if (!this.loginVal) {
    this.setError_(this.translate('Please, input a login...'));
    return;
  }

  var error = this.translate('An error occured while reseting the password.');

  this.gmfAuthentication_.resetPassword(this.loginVal).then(
      goog.bind(
          /**
           * @param {gmf.AuthenticationDefaultResponse} respData
           */
          function(respData) {
            this.resetPasswordModalShown = true;
            this.resetError_();
          },
          this
      ),
      goog.bind(this.setError_, this, error)
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
 * @param {string} error
 * @private
 */
gmf.AuthenticationController.prototype.setError_ = function(error) {
  this.error = error;
};


/**
 * @private
 */
gmf.AuthenticationController.prototype.resetError_ = function() {
  this.setError_('');
};


/**
 * @param {string} str String to translate.
 * @return {string}
 * @export
 */
gmf.AuthenticationController.prototype.translate = function(str) {
  return this.gettextCatalog_.getString(str);
};


gmfModule.controller('GmfAuthenticationController',
    gmf.AuthenticationController);
