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

import {TemplateResult} from 'lit';
import {LitElementI18n} from 'ngeo/localize/i18n';
import {state} from 'lit/decorators.js';
import {customElement} from 'lit/decorators.js';
import {Subscription} from 'rxjs';
import configuration, {Configuration} from 'ngeo/store/config';
import {html, unsafeStatic} from 'lit/static-html.js';

export default class gmfEntryPoint extends LitElementI18n {
  @state() private content = '';
  protected subscriptions_: Subscription[] = [];

  init(content: string, url: string): void {
    if (content) {
      this.content = content;
    } else if (url) {
      fetch(url)
        .then((response: Response) => {
          response
            .text()
            .then((content: string) => {
              this.content = content;
            })
            .catch(function () {
              console.error(`Error while fetching the URL: ${url}`);
            });
        })
        .catch(function () {
          console.error(`Error while fetching the URL: ${url}`);
        });
    }
  }

  render(): TemplateResult {
    return html`${unsafeStatic(this.content)}`;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.subscriptions_.forEach((sub) => sub.unsubscribe());
  }

  // Disable shadow DOM
  protected createRenderRoot(): LitElementI18n {
    return this;
  }
}

@customElement('gmf-header-entrypoint')
export class gmfHeaderEntryPoint extends gmfEntryPoint {
  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions_.push(
      configuration.getConfig().subscribe({
        next: (configuration: Configuration) => {
          if (configuration) {
            this.init(configuration.gmfHeaderEntrypoint, configuration.gmfHeaderEntrypointUrl);
          }
        },
      })
    );
  }
}

@customElement('gmf-theme-header-entrypoint')
export class gmfHeader2EntryPoint extends gmfEntryPoint {
  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions_.push(
      configuration.getConfig().subscribe({
        next: (configuration: Configuration) => {
          if (configuration) {
            this.init(configuration.gmfThemeHeaderEntrypoint, configuration.gmfThemeHeaderEntrypointUrl);
          }
        },
      })
    );
  }
}

@customElement('gmf-tools-button-entrypoint')
export class ngeToolsButtonEntryPoint extends gmfEntryPoint {
  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions_.push(
      configuration.getConfig().subscribe({
        next: (configuration: Configuration) => {
          if (configuration) {
            if (configuration) {
              this.init(configuration.gmfToolsButtonEntrypoint, configuration.gmfToolsButtonEntrypointUrl);
            }
          }
        },
      })
    );
  }
}

@customElement('gmf-tools-panel-entrypoint')
export class ngeToolsPanelEntryPoint extends gmfEntryPoint {
  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions_.push(
      configuration.getConfig().subscribe({
        next: (configuration: Configuration) => {
          if (configuration) {
            this.init(configuration.gmfToolsPanelEntrypoint, configuration.gmfToolsPanelEntrypointUrl);
          }
        },
      })
    );
  }
}

@customElement('gmf-map-entrypoint')
export class gmfMapEntryPoint extends gmfEntryPoint {
  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions_.push(
      configuration.getConfig().subscribe({
        next: (configuration: Configuration) => {
          if (configuration) {
            this.init(configuration.gmfMapEntrypoint, configuration.gmfMapEntrypointUrl);
          }
        },
      })
    );
  }
}

@customElement('gmf-infobar-entrypoint')
export class gmfInfobarEntryPoint extends gmfEntryPoint {
  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions_.push(
      configuration.getConfig().subscribe({
        next: (configuration: Configuration) => {
          if (configuration) {
            this.init(configuration.gmfInfobarEntrypoint, configuration.gmfInfobarEntrypointUrl);
          }
        },
      })
    );
  }
}

@customElement('gmf-footer-panel-entrypoint')
export class gmfFooterPanelEntryPoint extends gmfEntryPoint {
  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions_.push(
      configuration.getConfig().subscribe({
        next: (configuration: Configuration) => {
          if (configuration) {
            this.init(configuration.gmfFooterPanelEntrypoint, configuration.gmfFooterPanelEntrypointUrl);
          }
        },
      })
    );
  }
}
