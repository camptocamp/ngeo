import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Service} from 'apps/service.js';

@customElement('ngeo-auth-form')
class ngeoAuthForm extends LitElement {
  @property({type: Boolean}) isLoading = false;
  render() {
    return html`
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
    let loginObject = {
      username: form.login.value,
      password: form.password.value
    };
    this.dispatchEvent(new CustomEvent('login-event', {bubbles: true, composed: true, detail: loginObject}));
    form.reset();

    Service.auth.login();

    setTimeout(() => this.isLoading = false, 2000);
  }

  log(evt: any) {
    console.log(evt);
  }
}
