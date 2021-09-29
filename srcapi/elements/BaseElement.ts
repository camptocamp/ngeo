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

import i18next from 'i18next';
import {LitElement, unsafeCSS, css, CSSResult} from 'lit';
import configuration, {Configuration} from 'gmfapi/store/config';
import {Subscription} from 'rxjs';

/**
 * This is a base element.
 *
 * That includes:
 * - i18next initialization.
 * - Bootstrap (custom build + color in vars), Font Awesome, reset and some custom style.
 * - Configuration directly available by overriding the `initConfig` method.
 * - RXJS subscription added to subscriptions are unsubscribe on element removal.
 */
export default class GmfBaseElement extends LitElement {
  i18nLanguageChangedCallback_: () => void;

  protected subscriptions: Subscription[] = [];

  // bootstrap/font-awesome

  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  static resetStyle: CSSResult = css`
    ${unsafeCSS(require('!!raw-loader!gmf/css/reset.css').default)}
  `;
  static bootstrapStyle: CSSResult = css`
    ${unsafeCSS(require('!!raw-loader!ngeo/bootstrap-custom.css').default)}
  `;
  static fontawesomeStyle: CSSResult = css`
    ${unsafeCSS(require('!!raw-loader!@fortawesome/fontawesome-free/css/all.min.css').default)}
  `;
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */

  // Make some Bootstrap values configurable
  static bootstrapVarStyle: CSSResult = css`
    body a,
    body .btn-link {
      color: var(--link-color);
    }
    body a:hover,
    body .btn-link:hover {
      color: var(--link-hover-color);
    }
    body .btn:focus,
    body .form-control:focus,
    body .btn.focus,
    body .form-control.focus {
      box-shadow: 0 0 0 0.2rem var(--input-btn-focus-color);
      border-color: var(--brand-primary);
    }
    body .modal-header {
      border-color: var(--link-color);
    }
    body .table tr td,
    body .table tr th {
      border-color: var(--table-border-color);
    }
    body .nav-pills .nav-link.active,
    body .nav-pills .show > .nav-link {
      background-color: var(--brand-primary);
    }
  `;

  // Common styles for components
  static commonStyle: CSSResult = css`
    /* PANELS */
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

    /* FORMS */
    .form-control,
    .btn.prime {
      border-radius: 0;
    }
    .btn.prime {
      background-color: var(--brand-primary);
      border-color: var(--input-border-focus);
      color: white;
    }
    .btn.prime.active {
      box-shadow: inset 0 0.37rem 0.75rem var(--light-box-shadow-color);
    }
    .btn.prime:hover,
    .btn.prime.active {
      background-color: var(--input-border-focus);
      border-color: var(--input-border-focus-darken);
    }
  `;
  static styles: CSSResult[] = [
    GmfBaseElement.resetStyle,
    GmfBaseElement.bootstrapStyle,
    GmfBaseElement.bootstrapVarStyle,
    GmfBaseElement.fontawesomeStyle,
    GmfBaseElement.commonStyle,
  ];

  connectedCallback(): void {
    // i18n
    this.i18nLanguageChangedCallback_ = () => this.requestUpdate();
    i18next.on('languageChanged', this.i18nLanguageChangedCallback_);

    super.connectedCallback();

    // config
    this.subscriptions.push(
      configuration.getConfig().subscribe({
        next: (configuration: Configuration) => {
          if (configuration) {
            this.initConfig(configuration);
          }
        },
      })
    );
  }

  disconnectedCallback(): void {
    // i18n
    i18next.off('languageChanged', this.i18nLanguageChangedCallback_);

    super.disconnectedCallback();

    // config
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Init the config and allows to override it in the inherited class.
   *
   * @param {Configuration} configuration The configuration object.
   * @abstract
   * @protected
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initConfig(configuration: Configuration): void {}
}
