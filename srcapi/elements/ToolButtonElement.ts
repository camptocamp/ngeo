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

import BaseElement from 'gmfapi/elements/BaseElement';
import {css, html, TemplateResult} from 'lit';
import {state, property, customElement} from 'lit/decorators';
import {Subscription} from 'rxjs';
import panels from 'gmfapi/store/panels';
import $ from 'jquery';
import 'bootstrap/js/src/tooltip';

/**
 * Base element of the application tools icon.
 *
 * Example:
 * ```js
 *    import {html, css} from 'lit';
 *    import {customElement} from 'lit/decorators.js';
 *
 *    // @ts-ignore
 *    @customElement('my-button')
 *    export class MyToolButtonElement extends (window as any).gmfapi.elements.ToolButtonElement {
 *      constructor() {
 *        super(panelName);
 *      }
 *
 *      render(): TemplateResult {
 *        return html`
 *          <button
 *            @click=${() => this.click_()}
 *            class="btn btn-default ${this.active_ ? 'active' : ''}"
 *            data-toggle="tooltip"
 *            data-placement="left"
 *            data-original-title="${i18next.t('Title')}"
 *          >
 *            <span class="fa fa-my-icon"></span>
 *          </button>
 *        `;
 *      }
 *    }
 * ```
 */
export default class ToolButtonElement extends BaseElement {
  @state() protected active_ = false;
  @state() protected title_ = false;
  protected subscriptions: Subscription[] = [];
  protected panelName_: string;
  static styles = [
    ...BaseElement.styles,
    css`
      button.btn {
        margin: 0;
        margin-top: -1px;
        width: 2rem;
        height: 2rem;
        display: inline-block;
        font-weight: 400;
        color: #212529;
        text-align: center;
        vertical-align: middle;
        user-select: none;
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
        line-height: 1.5;
        border-radius: 0;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        background-color: var(--brand-primary);
        border-radius: 0;
        border: var(--border);
        border-color: var(--border-color);
        border-right-width: 0;
        border-left-width: 0;
      }
      button.btn:focus {
        box-shadow: unset;
      }
      button:hover {
        background-color: var(--hover-background-color);
      }

      button.active,
      button:active {
        box-shadow: none;
      }
      button.active {
        background-color: var(--brand-secondary);
        border-left: 0.06rem solid;
        border-left-color: var(--brand-secondary);
        margin-left: -0.06rem;
      }
    `,
  ];

  constructor(panelName: string) {
    super();
    this.panelName_ = panelName;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions.push(
      panels.getActiveToolPanel().subscribe({
        next: (panel: string) => {
          this.active_ = panel && panel == this.panelName_;
        },
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected activePanels_(panels: string[]): void {}

  protected click_(): void {
    panels.openToolPanel(this.panelName_);
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${this.title_}"
      >
        <slot></slot>
      </button>
    `;
  }

  firstUpdated(): void {
    $(this.shadowRoot.querySelectorAll("[data-toggle='tooltip']")).tooltip();
  }
}

/**
 * Default implementation of the application tools icon.
 *
 * Example with an icon classes:
 * ```js
 *    <gmf-tool-button slot="tool-button" iconClasses="fa fa-print" panelName="my-panel"></gmf-tool-button>
 * ```
 *
 * Example with a slot:
 * ```js
 *    <gmf-tool-button slot="tool-button" panelName="my-panel">
 *      <span>
 *        <i class="fa fa-mouse-pointer"></i>
 *      </span>
 *    </gmf-tool-button>
 * ```
 */
@customElement('gmf-tool-button')
export class ToolButtonDefault extends ToolButtonElement {
  @property({type: String})
  panelName: string;
  @property({type: String})
  title: string;
  @property({type: String})
  iconClasses: string;

  connectedCallback(): void {
    super.connectedCallback();
    this.panelName_ = this.panelName;
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${this.title}"
      >
        ${this.iconClasses ? html`<span class="${this.iconClasses}"></span>` : html`<slot></slot>`}
      </button>
    `;
  }
}
