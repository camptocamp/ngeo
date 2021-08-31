import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import AngularServices from 'ngeo/services';
import { MessageType } from 'ngeo/message/Message.js';

@customElement('ngeo-auth-component')
class ngeoAuthComponent extends LitElement {
  @property({ type: Boolean }) isLoading = false;
  @property({ type: Boolean }) allowPasswordChange = false;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) infoMessage = '';
  render() {
    return html`
      ${AngularServices.user && AngularServices.user.username !== null ? html`
        <div>
          <div class="form-group">
            <span>Logged in as</span>
            <strong>${AngularServices.user.username}</strong>.
          </div>

          <form
            name="logoutForm"
            role="form"
            @submit=${this.logout}
          >
            <div class="form-group">
              <input type="submit" class="form-control btn prime" value="Logout" />
            </div>
            <div class="form-group">
              ${this.allowPasswordChange ? html`
              <input
                type="button"
                class="form-control btn btn-default"
                value="Change password"
              />
              `: ''}
            </div>
          </form>
        </div>
      `: html`
        <div>
          <form
            name="loginForm"
            role="form"
            @submit=${(evt: Event) => this.submit(evt)}>
            <div class="form-group">
              <input
                  type="text"
                  class="form-control"
                  name="login"
                  placeholder="Username"
              />
            </div>
            <div class="form-group">
                <input
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Password"
                />
            </div>
            <div class="form-group">
              <input type="submit" class="form-control btn prime" value="Connect" />
            </div>
            ${this.isLoading ? html`
            <div class="login-spinner">
              <i class="fa fa-spin fa-spinner"></i>
            </div>
            `: ''}
          </form>
        </div>
      `}

      ${this.infoMessage ? html`
        <div class="alert alert-warning">
          <span>${this.infoMessage}</span>
        </div>
      `: ''}

      ${this.error ? html`
        <div class="auth-error help-block"></div>
      `: ''}

    `;
  }
  // Disable shadow DOM
  protected createRenderRoot() {
    return this;
  }

  /**
   * Login action
   * @param evt Event from the form submit action.
   */
  submit(evt: Event) {
    evt.preventDefault();

    this.isLoading = true;
    const errors = [];
    const form = evt.target as HTMLFormElement;

    if (form.login.value === '') {
      errors.push('The username is required.');
    }
    if (form.password.value === '') {
      errors.push('The password is required.');
    }
    if (errors.length) {
      this.isLoading = false;
      this.setError_(errors);
    } else {
      AngularServices.auth.login(form.login.value, form.password.value).then(() => {
        this.resetError_();
      }).catch(() => {
        this.setError_(['Incorrect credentials or disabled account.']);
      }).finally(() => {
        this.isLoading = false;
        form.reset();
      });
    }
  }

  /**
   * Logout action
   */
  logout() {
    this.isLoading = true;
    AngularServices.auth.logout().then(() => {
      this.resetError_();
    }).catch(() => {
      this.setError_(['Could not log out.']);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  /**
   * Set an error notification
   * @param errors 
   * @param messageType 
   */
  setError_(errors: string[], messageType?: MessageType) {
    if (messageType == undefined) {
      messageType = MessageType.ERROR;
    }
    if (this.error) {
      this.resetError_();
    }
    this.error = true;
    const container = document.querySelector('.auth-error');

    errors.forEach((error) => {
      const options: import('ngeo/message/Message.js').Message = {
        msg: error,
        target: container,
      };
      if (messageType) {
        options.type = messageType;
      }
      AngularServices.notification.notify(options);
    });
  }

  /**
   * Reset the error notification
   */
  resetError_() {
    AngularServices.notification.clear();
    this.error = false;
  }

}
