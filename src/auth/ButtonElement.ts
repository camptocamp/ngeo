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

import {TemplateResult, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import ToolButtonElement from 'gmfapi/elements/ToolButtonElement';
import i18next from 'i18next';
import 'bootstrap/js/src/tooltip';
import user, {User} from 'gmfapi/store/user';
import {state} from 'lit/decorators.js';

@customElement('gmf-auth-button')
export class ToolButtonAuth extends ToolButtonElement {
  constructor() {
    super('auth');
  }
  @state() private login_ = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions.push(
      user.getProperties().subscribe({
        next: (properties: User) => {
          this.login_ = !!properties.username;
        },
      }),
    );
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Login')}"
      >
        <span class="fa-solid ${this.login_ ? 'fa-user-xmark' : 'fa-user'}"></span>
      </button>
    `;
  }
}
