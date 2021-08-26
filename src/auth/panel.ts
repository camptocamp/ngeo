import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import './form.ts';
import './auth.css';

@customElement('ngeo-auth-panel')
export default class AuthPanel extends LitElement {
  @property({type: String}) loginInfoMessage = '';
  @property({type: Boolean}) postLooading = {};

  protected render() {
    return html`
      <div class="row">
        <div class="col-sm-12">
          <div class="gmf-app-tools-content-heading">
            {{'Login' | translate}}
            <a class="btn close" @click=${this.close}>&times;</a>
          </div>
          <ngeo-auth-form></ngeo-auth-form>
          <hr>
          <gmf-authentication gmf-authentication-info-message=${this.loginInfoMessage}></gmf-authentication>
          ${this.postLooading ? html`
          <div>
            <i class="fa fa-spin fa-spinner"></i>
            {{'Loading themes, please wait...' | translate}}
          </div>
          `: ''}
        </div>
      </div>
    `;
  }
  // Disable shadow DOM
  protected createRenderRoot() {
    return this;
  }

  close() {
    this.dispatchEvent(new CustomEvent('closePanel', {detail: false}));
  }
}
