import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Service} from 'apps/service.js';
import {MessageType} from 'ngeo/message/Message.js';

@customElement('ngeo-auth-form')
class ngeoAuthForm extends LitElement {
  @property({type: Boolean}) isLoading = false;
  @property({type: Boolean}) allowPasswordChange = false;
  @property({type: Boolean}) error = false;
  @property({type: String}) infoMessage = '';
  render() {
    return html`
      ${Service.user && Service.user.username !== null ? html`
        <div>
          <div class="form-group">
            <span>Logged in as</span>
            <strong>${Service.user.username}</strong>.
          </div>

          <form
            name="logoutForm"
            role="form"
            @submit=${(e: any) => this.logout(e)}
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
            @submit=${(e: any) => this.submit(e)}>
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
        <div class="authentication-error help-block"></div>
      `: ''}

    `;
  }
  // Disable shadow DOM
  protected createRenderRoot() {
    return this;
  }

  submit(e: any) {
    e.preventDefault();

    this.isLoading = true;
    const errors = [];
    let form = e.target;

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
      Service.auth.login(form.login.value, form.password.value).then(() => {
        this.isLoading = false
        form.reset();
        this.resetError_();
      }).catch(() => {
        this.isLoading = false;
        form.reset();
        this.setError_('Incorrect credentials or disabled account.');
      });
    }
  }


  logout(e: any) {
    this.isLoading = true;
    Service.auth.logout().then(() => {
      this.isLoading = false;
      this.resetError_();
    }).catch(() => {
      this.isLoading = false;
      this.setError_('Could not log out.');
    });
  }

  setError_(errors: string|string[], messageType?: MessageType) {
    if (messageType == undefined) {
      messageType = MessageType.ERROR;
    }
    if (this.error) {
      this.resetError_();
    }
    this.error = true;
    const container = jQuery('.authentication-error');

    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    errors.forEach((error) => {
      const options: import('ngeo/message/Message.js').Message = {
        msg: error,
        target: container,
      };
      if (messageType) {
        options.type = messageType;
      }
      Service.notification.notify(options);
    });
  }

  resetError_() {
    Service.notification.clear();
    this.error = false;
  }

}
