import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Service} from 'apps/service.js';

@customElement('ngeo-auth-form')
class ngeoAuthForm extends LitElement {
  @property({type: Boolean}) isLoading = false;
  @property({type: Boolean}) allowPasswordChange = false;
  @property({type: String}) infoMessage = '';
  render() {
    return html`
      ${Service.user ? html`
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
        <div ng-if="$ctrl.infoMessage" class="alert alert-warning">
          <span>{{ $ctrl.infoMessage }}</span>
        </div>      
      `: ''}

    `;
  }
  // Disable shadow DOM
  protected createRenderRoot() {
    return this;
  }

  submit(e: any) {
    this.isLoading = true;
    e.preventDefault();
    let form = e.target;
    let user = form.login.value;
    const pwd = form.password.value;
    //this.dispatchEvent(new CustomEvent('login-event', {bubbles: true, composed: true, detail: loginObject}));

    Service.auth.login(user, pwd).then(() => {
      this.isLoading = false
      form.reset();
    }).catch(() => {
      this.isLoading = false;
      form.reset();
      // TODO error handling
    });
  }

  logout(e: any) {
    this.isLoading = true;
    Service.auth.logout().then(() => {
      this.isLoading = false;
    }).catch(() => {
      this.isLoading = false;
      // TODO error handling
    });
  }
}
