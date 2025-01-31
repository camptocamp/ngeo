// The MIT License (MIT)
//
// Copyright (c) 2021-2025 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {html, TemplateResult, unsafeCSS, CSSResult, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import GmfBaseElement from 'gmfapi/elements/BaseElement';
import {Message, MessageType} from 'ngeo/message/Message';
import ngeoMessageNotification from 'ngeo/message/Notification';
import {litIcon as svgSpinner} from 'gmf/icons/spinner_svg';
import {gmfBackgroundlayerStatus} from 'ngeo/backgroundlayerselector/status';
import user, {User, UserState} from 'gmfapi/store/user';
// @ts-ignore
import qruri from 'qruri';
import i18next from 'i18next';
import authenticationService from './service';
import {Configuration} from 'gmfapi/store/config';

/**
 * The definition of a PasswordValidator
 */
export type PasswordValidator = {
  isPasswordValid: (val: string) => boolean;
  notValidMessage: string;
};

@customElement('gmf-auth-form')
export default class GmfAuthForm extends GmfBaseElement {
  @property({type: Object}) private passwordValidator: PasswordValidator = null;
  @state() private loginInfoMessage = '';
  @state() private isLoading = false;
  @state() private disconnectedShown = false;
  @state() private resetPasswordShown = false;
  @state() private twoFactorAuth = false;
  @state() private allowPasswordChange = false;
  @state() private allowPasswordReset = false;
  @state() private oidcUserInformationUrl = '';
  @state() private changingPassword = false;
  @state() private userMustChangeItsPassword = false;
  @state() private openIdConnectUrl = '';
  @state() private error = false;
  @state() private otpImage = '';
  @state() private gmfUser: User = null;
  @state() private customCSS_ = '';
  private changingPasswordUsername_ = '';
  private initialApplicationUrl = window.location.href;
  private currentApplicationUrl = window.location.href;
  private openIdConnectBaseUrl = '';

  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions.push(
      user.getProperties().subscribe({
        next: (properties: User) => {
          this.gmfUser = properties;
          this.setOtpImage_();
          if (this.gmfUser.is_password_changed === false) {
            this.handleUserMustChangeItsPassword_();
          } else {
            this.onUserStateUpdate_(user.getState());
          }
        },
      }),

      user.getLoginMessage().subscribe({
        next: (message: string) => {
          this.loginInfoMessage = message;
          this._updateOpenIdConnectUrl();
        },
      }),
    );

    window.addEventListener('popstate', () => {
      this.currentApplicationUrl = window.location.href;
      this._updateOpenIdConnectUrl();
    });
    this._updateOpenIdConnectUrl();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const loginField = document.body.querySelector('input[slot=gmf-auth-login]') as HTMLInputElement;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const passwordField = document.body.querySelector('input[slot=gmf-auth-password]') as HTMLInputElement;

    loginField.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key == 'Enter') {
        this.login(event);
      }
    });
    passwordField.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key == 'Enter') {
        this.login(event);
      }
    });
  }

  _updateOpenIdConnectUrl(): void {
    const applicationUrl = this.loginInfoMessage ? this.currentApplicationUrl : this.initialApplicationUrl;
    const params = new URLSearchParams({
      came_from: applicationUrl,
    });
    this.openIdConnectUrl = `${this.openIdConnectBaseUrl}?${params.toString()}`;
  }

  // override default initConfig
  initConfig(configuration: Configuration): void {
    this.twoFactorAuth = configuration.gmfTwoFactorAuth;
    this.allowPasswordChange = configuration.gmfAuthenticationConfig.allowPasswordChange;
    this.allowPasswordReset = configuration.gmfAuthenticationConfig.allowPasswordReset;
    this.oidcUserInformationUrl = configuration.gmfAuthenticationConfig.oidcUserInformationUrl;
    this.openIdConnectBaseUrl = configuration.gmfOidcLoginUrl;
    if (configuration.gmfCustomCSS && configuration.gmfCustomCSS.authentication !== undefined) {
      this.customCSS_ = configuration.gmfCustomCSS.authentication;
    }
  }

  static styles: CSSResult[] = [
    ...GmfBaseElement.styles,
    css`
      [hidden] {
        display: none !important;
      }
      .login-spinner {
        float: left;
        margin-right: 20px;
      }

      i.fa-spin {
        fill: black;
        width: 1.3rem;
      }
      .btn.btn-default {
        background-color: var(--map-tools-bg-color);
        border-color: var(--onhover-color);
        color: var(--map-tools-color);
      }
      .btn.btn-default.active {
        box-shadow: inset $light-box-shadow var(--light-box-shadow-color);
      }
      .btn.btn-default:hover,
      .btn.btn-default.active {
        background-color: var(--onhover-color);
        border-color: var(--onhover-color-darken);
      }
    `,
  ];

  protected render(): TemplateResult {
    return html`
      <style>
        ${unsafeCSS(this.customCSS_)}
      </style>

      ${this.gmfUser.is_intranet
        ? html`
            <div class="form-group">
              <span>${i18next.t('You are recognized as an intranet user.')}</span>
            </div>
          `
        : ''}
      ${this.gmfUser.username !== null
        ? html`
            <div>
              <div class="form-group">
                <span>${i18next.t('Logged in as')}</span>
                <strong>${this.gmfUser.username}</strong>.
              </div>

              ${this.oidcUserInformationUrl
                ? html`
                    <div class="form-group">
                      <span
                        ><a href="${this.oidcUserInformationUrl}" target="_blank"
                          >${i18next.t('User information on the OIDC service')}</a
                        ></span
                      >
                    </div>
                  `
                : html``}
              ${!this.changingPassword
                ? html`
                    <form name="logoutForm" role="form" @submit=${(evt: Event) => this.logout(evt)}>
                      <div class="form-group">
                        <input type="submit" class="form-control btn prime" value=${i18next.t('Logout')} />
                      </div>
                      <div class="form-group">
                        <input
                          ?hidden="${!(this.allowPasswordChange && this.gmfUser.login_type !== 'oidc')}"
                          type="button"
                          class="form-control btn btn-default"
                          value=${i18next.t('Change password')}
                          @click=${() => (this.changingPassword = true)}
                        />
                      </div>
                    </form>
                  `
                : ''}
            </div>
          `
        : ''}
      ${this.loginInfoMessage
        ? html`
            <div class="alert alert-warning">
              <span>${this.loginInfoMessage}</span>
            </div>
          `
        : ''}
      ${this.disconnectedShown
        ? html`
            <div class="alert alert-warning">
              ${i18next.t('You are not logged in any more. The Interface has been reloaded.')}
            </div>
          `
        : ''}
      ${this.gmfUser.username === null && !this.changingPassword
        ? this.gmfUser.login_type === 'oidc'
          ? html`<a class="btn prime form-control" role="button" href="${this.openIdConnectUrl}"
              >${i18next.t('Connect')}</a
            >`
          : html`
              <div>
                <form name="loginForm" role="form" @submit=${(evt: Event) => this.login(evt)}>
                  <div class="form-group">
                    <slot name="gmf-auth-login"></slot>
                  </div>
                  <div class="form-group">
                    <slot name="gmf-auth-password"></slot>
                  </div>
                  ${this.twoFactorAuth
                    ? html`
                        <div class="form-group">
                          ${i18next.t('The following field should be kept empty on first login:')}
                          <input
                            type="text"
                            class="form-control"
                            name="otp"
                            autocomplete="one-time-code"
                            placeholder=${i18next.t('Authentication code')}
                          />
                        </div>
                      `
                    : ''}
                  <div class="form-group">
                    <input type="submit" class="form-control btn prime" value=${i18next.t('Connect')} />
                  </div>
                  ${this.isLoading
                    ? html`
                        <div class="login-spinner">
                          <i class="fa-solid fa-spin">${svgSpinner()}</i>
                        </div>
                      `
                    : ''}
                  <div ?hidden="${!this.allowPasswordReset}" class="form-group">
                    <a @click=${(evt: Event) => this.resetPassword(evt)} href=""
                      >${i18next.t('Password forgotten?')}</a
                    >
                  </div>
                </form>

                ${this.resetPasswordShown
                  ? html` <div class="alert alert-info">
                      ${i18next.t('A new password has just been sent to you by e-mail.')}
                    </div>`
                  : ''}
              </div>
            `
        : ''}
      ${this.changingPassword
        ? html`
            <div>
              ${this.userMustChangeItsPassword
                ? html` <div class="alert alert-warning">${i18next.t('You must change your password')}</div>`
                : ''}

              <form name="changePasswordForm" role="form" @submit=${(evt: Event) => this.changePassword(evt)}>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    name="oldpassword"
                    autocomplete="current-password"
                    aria-describedby="password-constraints"
                    placeholder=${i18next.t('Old password')}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    name="newpassword"
                    autocomplete="new-password"
                    placeholder=${i18next.t('New password')}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    name="newpasswordconfirm"
                    autocomplete="new-password"
                    placeholder=${i18next.t('Confirm new password')}
                  />
                </div>
                ${this.gmfUser.otp_uri
                  ? html`
                      <div class="form-group">
                        <label>${i18next.t('Two factor authentication QR code:')}</label>
                        <div><img class="" src="${this.otpImage}" /></div>
                      </div>
                    `
                  : ''}
                ${this.gmfUser.two_factor_totp_secret
                  ? html`
                      <div class="form-group">
                        <label>${i18next.t('Two factor authentication key:')}</label>
                        <code>${this.gmfUser.two_factor_totp_secret}</code>
                      </div>
                    `
                  : ''}
                ${this.twoFactorAuth
                  ? html`
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          name="otp"
                          autocomplete="one-time-code"
                          placeholder=${i18next.t('Authentication code')}
                        />
                      </div>
                    `
                  : ''}

                <div class="form-group">
                  <input type="submit" class="form-control btn prime" value=${i18next.t('Change password')} />
                </div>
                <div class="form-group">
                  <input
                    type="button"
                    class="form-control btn btn-default"
                    value="Cancel"
                    @click=${() => this.changePasswordReset()}
                  />
                </div>
              </form>
            </div>
          `
        : ''}

      <div ?hidden="${!this.error}" class="auth-error help-block"></div>
    `;
  }

  /**
   * @private
   */
  setOtpImage_(): void {
    if (this.gmfUser.otp_uri) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      this.otpImage = qruri(this.gmfUser.otp_uri, {
        margin: 2,
      });
    }
  }

  /**
   * @param {UserState} userState state of the user.
   * @private
   */
  onUserStateUpdate_(userState: UserState): void {
    if (userState === UserState.LOGGED_IN) {
      this.changingPassword = false;
      this.userMustChangeItsPassword = false;
    } else if (userState === UserState.DISCONNECTED) {
      this.disconnectedShown = true;
    }
  }

  /**
   * @private
   */
  handleUserMustChangeItsPassword_(): void {
    this.changingPasswordUsername_ = this.gmfUser.username;
    this.changingPassword = true;
    this.userMustChangeItsPassword = true;
  }

  // METHODS THAT CALL THE AUTHENTICATION SERVICE METHODS

  /**
   * Calls the authentication service changePassword method.
   * @param evt the event
   */
  changePassword(evt: Event): void {
    evt.preventDefault();

    const errors = [];
    const form = evt.target as HTMLFormElement;
    const oldPwd = (form.oldpassword as HTMLInputElement).value;
    const newPwd = (form.newpassword as HTMLInputElement).value;
    const confPwd = (form.newpasswordconfirm as HTMLInputElement).value;

    let otpVal = '';
    if (this.twoFactorAuth) {
      otpVal = (form.otp as HTMLInputElement).value;
    }

    // Validation - Passwords are required.
    if (oldPwd === '') {
      errors.push(i18next.t('The old password is required.'));
    }
    if (newPwd === '') {
      errors.push(i18next.t('The new password is required.'));
    }
    if (confPwd === '') {
      errors.push(i18next.t('The password confirmation is required.'));
    }

    if (errors.length) {
      this.setError_(errors);
    } else {
      // Default validation - Passwords must be new and must also match.
      if (oldPwd === newPwd) {
        errors.push(i18next.t('The old and new passwords are the same.'));
      }
      if (newPwd !== confPwd) {
        errors.push(i18next.t("The passwords don't match."));
      }
      // Custom validation - If a passwordValidaor is set, use it to validate the new password.
      if (this.passwordValidator) {
        if (!this.passwordValidator.isPasswordValid(oldPwd)) {
          errors.push(i18next.t(this.passwordValidator.notValidMessage));
        }
      }

      if (errors.length) {
        this.setError_(errors);
      } else {
        // Send request with current credentials, which may fail if the old password given is incorrect.
        let username;
        if (this.userMustChangeItsPassword) {
          username = this.changingPasswordUsername_;
        } else {
          username = this.gmfUser.username;
        }
        console.assert(!username);
        authenticationService
          .changePassword(username, oldPwd, newPwd, confPwd, otpVal)
          .then(() => {
            this.changePasswordReset();
            this.setError_(
              [i18next.t('Your password has successfully been changed.')],
              MessageType.INFORMATION,
            );
          })
          .catch(() => {
            /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
            // Reset the values cannot be done via Event values
            const oldPwd = this.renderRoot.querySelector('input[name = "oldpassword"]') as HTMLInputElement;
            oldPwd.value = '';

            if (this.twoFactorAuth) {
              const otp = this.renderRoot.querySelector('input[name = "otp"]') as HTMLInputElement;
              otp.value = '';
            }

            this.setError_([i18next.t('Incorrect old password.')]);
          });
      }
    }
  }

  /**
   * Calls the authentication service login method.
   * @param evt Event from the form submit action.
   */
  login(evt: Event): void {
    evt.preventDefault();

    this.manualLoginLogout_();

    this.isLoading = true;
    const errors = [];
    const form = this.renderRoot.querySelector('form') as HTMLFormElement;
    const loginVal = (document.body.querySelector('input[slot=gmf-auth-login]') as HTMLInputElement).value;
    const pwdVal = (document.body.querySelector('input[slot=gmf-auth-password]') as HTMLInputElement).value;

    if (loginVal === '') {
      errors.push(i18next.t('The username is required.'));
    }
    if (pwdVal === '') {
      errors.push(i18next.t('The password is required.'));
    }
    let otpVal = '';
    if (this.twoFactorAuth) {
      otpVal = (form.otp as HTMLInputElement).value;
    }
    if (errors.length) {
      this.isLoading = false;
      this.setError_(errors);
    } else {
      authenticationService
        .login(loginVal, pwdVal, otpVal)
        .then(() => {
          this.cleanForm_();
          this.resetError_();
        })
        .catch(() => {
          this.setError_([i18next.t('Incorrect credentials or disabled account.')]);
        })
        .finally(() => {
          this.isLoading = false;
          form.reset();
        });
    }
  }

  /**
   * Calls the authentication service logout method.
   * @param evt Event from the form submit action.
   */
  logout(evt: Event): void {
    evt.preventDefault();

    this.manualLoginLogout_();

    this.isLoading = true;
    authenticationService
      .logout()
      .then(() => {
        this.cleanForm_();
        this.resetError_();
      })
      .catch(() => {
        this.setError_([i18next.t('Could not log out.')]);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  /**
   * Effects on manual try to login/logout.
   */
  manualLoginLogout_(): void {
    // Set the user could lead to a new background.
    gmfBackgroundlayerStatus.touchedByUser = true;
  }

  /**
   * Calls the authentication service resetPassword method.
   * @param evt Event from the form submit action.
   */
  resetPassword(evt: Event): void {
    evt.preventDefault();

    this.isLoading = true;

    const login = (document.body.querySelector('input[slot=gmf-auth-login]') as HTMLInputElement).value;

    if (login === '') {
      this.isLoading = false;
      this.setError_([i18next.t('Please, input a login...')]);
      return;
    }

    authenticationService
      .resetPassword(login)
      .then(() => {
        this.cleanForm_();
        this.resetPasswordShown = true;
        this.resetError_();
      })
      .catch(() => {
        this.setError_([i18next.t('An error occurred while resetting the password.')]);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  // OTHER METHODS

  /**
   * Reset the changePassword values and error.
   */
  changePasswordReset(): void {
    this.cleanForm_();
    this.resetError_();
    this.changingPassword = false;
    this.userMustChangeItsPassword = false;

    /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
    const oldPwd = this.renderRoot.querySelector('input[name = "oldpassword"]') as HTMLInputElement;
    const newPwd = this.renderRoot.querySelector('input[name = "newpassword"]') as HTMLInputElement;
    const newPwdConf = this.renderRoot.querySelector(
      'input[name = "newpasswordconfirm"]',
    ) as HTMLInputElement;
    oldPwd.value = '';
    newPwd.value = '';
    newPwdConf.value = '';
    authenticationService.resetUser(UserState.DISCONNECTED, true);
  }

  /**
   * Set an error notification.
   * @param errors List of errors
   * @param messageType Type of message
   */
  setError_(errors: string[], messageType?: MessageType): void {
    if (messageType == undefined) {
      messageType = MessageType.ERROR;
    }
    if (this.error) {
      this.resetError_();
    }
    this.error = true;
    const container = this.renderRoot.querySelector('.auth-error');

    errors.forEach((error) => {
      const options: Message = {
        msg: error,
        target: container,
      };
      if (messageType) {
        options.type = messageType;
      }
      ngeoMessageNotification.notify(options);
    });
  }

  /**
   * Clear the form
   */
  cleanForm_(): void {
    const form = this.renderRoot.querySelector('form') as HTMLFormElement;

    const loginField = document.body.querySelector('input[slot=gmf-auth-login]') as HTMLInputElement;

    const passwordField = document.body.querySelector('input[slot=gmf-auth-password]') as HTMLInputElement;
    form.reset();
    loginField.value = '';
    passwordField.value = '';
  }

  /**
   * Reset the error notification
   */
  resetError_(): void {
    ngeoMessageNotification.clear();
    this.error = false;
  }
}
