import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('ngeo-auth-form')
class MyHeader extends LitElement {
  @property({type: String}) user = '';
  @property({type: String}) password = '';
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
          </form>
      </div>
    `;
  }
  // Disable shadow DOM
  protected createRenderRoot() {
    return this;
  }

  submit(e: any) {
    e.preventDefault();
    let form = e.target;
    let login = {
      username: form.login.value,
      password: form.password.value
    };
    console.log(login);
    form.reset();
  }

  log(evt: any) {
    console.log(evt);
  }
}
