// The MIT License (MIT)
//
// Copyright (c) 2021-2022 Camptocamp SA
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
import {customElement} from 'lit/decorators';
import ToolButtonElement from 'gmfapi/elements/ToolButtonElement';
import i18next from 'i18next';
import 'bootstrap/js/src/tooltip';
import {state} from 'lit/decorators';
import panels from 'gmfapi/store/panels';

@customElement('gmf-print-button')
export class ToolButtonPrint extends ToolButtonElement {
  constructor() {
    super('print');
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Print')}"
      >
        <span class="fa fa-print"></span>
      </button>
    `;
  }
}

@customElement('gmf-draw-button')
export class ToolButtonDraw extends ToolButtonElement {
  constructor() {
    super('draw');
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Draw and Measure')}"
      >
        <span class="fa fa-paint-brush"></span>
      </button>
    `;
  }
}

@customElement('gmf-filter-button')
export class ToolButtonFilter extends ToolButtonElement {
  @state() private filter_ = false;

  constructor() {
    super('filter');
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions.push(
      panels.getFilterActive().subscribe({
        next: (active: boolean) => {
          this.filter_ = active;
        },
      })
    );
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Filter')}"
      >
        <span class="fa ${this.filter_ ? 'fa-funnel-dollar' : 'fa-filter'}"></span>
      </button>
    `;
  }
}

@customElement('gmf-editing-button')
export class ToolButtonEditing extends ToolButtonElement {
  constructor() {
    super('editing');
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Editing')}"
      >
        <span class="fa fa-edit"></span>
      </button>
    `;
  }
}

@customElement('gmf-profile-button')
export class ToolButtonProfile extends ToolButtonElement {
  constructor() {
    super('profile');
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Elevation profile')}"
      >
        <span class="fa fa-chart-area"></span>
      </button>
    `;
  }
}

@customElement('gmf-googlestreetview-button')
export class ToolButtonGooglestreetview extends ToolButtonElement {
  constructor() {
    super('googlestreetview');
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Google Street View')}"
      >
        <span class="fa fa-street-view"></span>
      </button>
    `;
  }
}

@customElement('gmf-mapillary-button')
export class ToolButtonMapillary extends ToolButtonElement {
  constructor() {
    super('mapillary');
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Mapillary')}"
      >
        <span class="fa fa-street-view"></span>
      </button>
    `;
  }
}

@customElement('gmf-select-button')
export class ToolButtonSelect extends ToolButtonElement {
  constructor() {
    super('selection');
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Selection')}"
      >
        <span>
          <i class="fa fa-mouse-pointer"></i>
          <i class="fa fa-info fa-xs offset-info-icon"></i>
        </span>
      </button>
    `;
  }
}

@customElement('gmf-import-button')
export class ToolButtonImport extends ToolButtonElement {
  constructor() {
    super('import');
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Import Layer')}"
      >
        <span class="fa fa-upload"></span>
      </button>
    `;
  }
}

@customElement('gmf-routing-button')
export class ToolButtonRouting extends ToolButtonElement {
  constructor() {
    super('routing');
  }

  render(): TemplateResult {
    return html`
      <button
        @click=${() => this.click_()}
        class="btn btn-default ${this.active_ ? 'active' : ''}"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="${i18next.t('Routing')}"
      >
        <span class="fa fa-map-signs"></span>
      </button>
    `;
  }
}
