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

import {html, TemplateResult, unsafeCSS, css, CSSResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import loadingSvg from 'gmf/icons/spinner.svg';
import i18next from 'i18next';
import GmfBaseElement from 'ngeo/BaseElement';
import {Configuration} from 'ngeo/store/config';
import GmfAuthFormElement, {PasswordValidator} from './FormElement';

// Mark as used
console.assert(GmfAuthFormElement);

@customElement('gmf-auth-panel')
export default class GmfAuthPanelElement extends GmfBaseElement {
  @property({type: String}) loginInfoMessage = '';
  @property({type: Boolean}) postLoading = false;
  @property({type: Object}) passwordValidator: PasswordValidator = null;
  @state() private customCSS_ = '';

  static styles: CSSResult[] = [
    ...GmfBaseElement.styles,
    css`
      .row {
        padding: 0 0.62rem;
      }

      .gmf-app-tools-content-heading {
        color: var(--color-light);
        padding-bottom: 0.62rem;
        margin-bottom: 0.62rem;
        margin-top: calc(30px / 2);
        border-bottom: 0.06rem solid;
        border-bottom-color: var(--color-light);
      }
      .gmf-app-tools-content-heading .close {
        padding: 0;
      }

      .svg-spinner {
        width: 1rem;
        margin-right: 5px;
      }
    `,
  ];

  // override default initConfig
  initConfig(configuration: Configuration): void {
    if (configuration.gmfCustomCSS && configuration.gmfCustomCSS.authenticationPanel !== undefined) {
      this.customCSS_ = configuration.gmfCustomCSS.authenticationPanel;
    }
  }

  protected render(): TemplateResult {
    const spinnerTemplate = this.postLoading
      ? html`
          <div>
            <i class="fa fa-spin svg-spinner"> ${unsafeSVG(loadingSvg)} </i>
            ${i18next.t('Loading themes, please wait...')}
          </div>
        `
      : '';
    return html`
      <style>
        ${unsafeCSS(this.customCSS_)}
      </style>
      <div class="row">
        <div class="col-sm-12">
          <div class="gmf-app-tools-content-heading">
            ${i18next.t('Login')}
            <a class="btn close" @click=${() => this.closePanel()}>&times;</a>
          </div>
          <gmf-auth-form
            .loginInfoMessage=${this.loginInfoMessage}
            .passwordValidator=${this.passwordValidator}
          ></gmf-auth-form>
          ${spinnerTemplate}
        </div>
      </div>
    `;
  }

  closePanel(): void {
    this.dispatchEvent(new CustomEvent('close-panel', {detail: false}));
  }
}
