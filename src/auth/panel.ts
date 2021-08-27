import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import loadingSvg from 'gmf/icons/spinner.svg';

import './form.ts';
import './auth.css';

@customElement('ngeo-auth-panel')
export default class AuthPanel extends LitElement {
  @property({type: String}) loginInfoMessage = '';
  @property({type: Boolean}) postLoading = false;


  protected render() {
    //let modifiedSvg = loadingSvg.replace('<svg', '<svg height="1em" width="1em"');
    let spinnerTemplate = this.postLoading ? html`
      <div>
        <i class="fa fa-spin svg-lit-element">
          ${unsafeSVG(loadingSvg)}
        </i>
        {{'Loading themes, please wait...' | translate}}
      </div>
    `: '';
    return html`
      <div class="row">
        <div class="col-sm-12">
          <div class="gmf-app-tools-content-heading">
            {{'Login' | translate}}
            <a class="btn close" @click=${this.closePanel}>&times;</a>
          </div>
          <ngeo-auth-form @login-event=${this.eventCallback} .login-message=${this.loginInfoMessage}></ngeo-auth-form>
          <!-- <gmf-authentication gmf-authentication-info-message=${this.loginInfoMessage}></gmf-authentication> -->
          ${spinnerTemplate}
        </div>
      </div>
    `;
  }
  // Disable shadow DOM
  protected createRenderRoot() {
    return this;
  }

  eventCallback(evt: any) {
    //this.dispatchEvent(new CustomEvent('gmf-custom-event', {detail: evt.detail}));
  }

  closePanel() {
    this.dispatchEvent(new CustomEvent('close-panel', {detail: false}));
  }

  dispatch(evt: any) {}
}
