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

/**
 * Base element to the application tools panel.
 *
 * Include the style for the header.
 *
 * Example:
 * ```js
 *    export default class MyToolPanel extent gmfapi.elements.ToolPanelElement {
 *      render(): TemplateResult {
 *        return html`${this.getTitle(i18next.t('Title'))}
 *          your template`
 *      }
 *    }
 * ```
 */
export default class PanelElement extends BaseElement {
  static styles = [
    ...BaseElement.styles,
    css`
      .gmf-app-tools-content-heading {
        color: var(--color-light);
        padding-bottom: var(--app-margin);
        margin-bottom: var(--app-margin);
        margin-top: calc(var(--grid-gutter-width) / 2);
        border-bottom: 0.06rem solid;
        border-bottom-color: var(--color-light);
        font-size: 0.8rem;
      }
    `,
  ];

  getTitle(panelName: string): TemplateResult {
    return html` <div class="gmf-app-tools-content-heading">${panelName}</div> `;
  }
}
