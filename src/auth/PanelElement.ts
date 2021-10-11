// The MIT License (MIT)
//
// Copyright (c) 2021 Camptocamp SA
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

import {html, TemplateResult, unsafeCSS} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import loadingSvg from 'gmf/icons/spinner.svg';
import i18next from 'i18next';
import GmfBaseElement from 'ngeo/BaseElement';
import {Configuration, PasswordValidator} from 'ngeo/store/config';

import './ComponentElement.ts';
import './auth.css';

@customElement('gmf-auth-panel')
export default class AuthPanel extends GmfBaseElement {
  @property({type: String}) loginInfoMessage = '';
  @property({type: Boolean}) postLoading = false;
  @property({type: Object}) passwordValidator: PasswordValidator = null;
  @state() private customCSS_ = '';

  // override default initConfig
  initConfig(configuration: Configuration): void {
    if (configuration.gmfCustomCSS && configuration.gmfCustomCSS.authenticationPanel !== undefined) {
      this.customCSS_ = configuration.gmfCustomCSS.authenticationPanel;
    }
  }

  protected render(): TemplateResult {
    const spinnerTemplate = this.postLoading
      ? html`
          <style>
            ${unsafeCSS(this.customCSS_)}
          </style>
          <div>
            <i class="fa fa-spin svg-lit-element"> ${unsafeSVG(loadingSvg)} </i>
            ${i18next.t('Loading themes, please wait...')}
          </div>
        `
      : '';
    return html`
      <div class="row">
        <div class="col-sm-12">
          <div class="gmf-app-tools-content-heading">
            ${i18next.t('Login')}
            <a class="btn close" @click=${this.closePanel.bind(this)}>&times;</a>
          </div>
          <gmf-auth-component
            .loginInfoMessage=${this.loginInfoMessage}
            .passwordValidator=${this.passwordValidator}
          ></gmf-auth-component>
          ${spinnerTemplate}
        </div>
      </div>
    `;
  }

  closePanel(): void {
    this.dispatchEvent(new CustomEvent('close-panel', {detail: false}));
  }
}
