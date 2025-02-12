import {css, CSSResult, html, TemplateResult, unsafeCSS} from 'lit';
import i18next from 'i18next';
import {customElement} from 'lit/decorators.js';
import GmfTimeInput from 'gmf/time-input/time-input';

@customElement('gmf-datepicker')
export default class GmfDatepicker extends GmfTimeInput {
  static styles: CSSResult[] = [
    css`
      input[type='date'] {
        font-size: 80%;
      }
    `,
  ];

  /**
   * Lit rendering.
   * @returns the html template for datepicker(s).
   */
  render(): TemplateResult {
    if (!this.timeProp) {
      return html``;
    }
    const startText = this.isTimeRange() ? 'From:' : 'Date:';
    const datepickerStart = html`
      <span>${i18next.t(startText)}</span>
      <input
        type="date"
        .min=${this.timeProp.minValue}
        .max=${this.timeProp.maxValue}
        .value=${this.timeProp.minDefValue ?? this.timeProp.minValue}
        @change="${(e: InputEvent) => this.onDateStartSelected(e)}"
      />
    `;
    let datepickerEnd = null;
    if (this.isTimeRange()) {
      datepickerEnd = html`
        <span>${i18next.t('To:')}</span>
        <input
          type="date"
          .min=${this.timeProp.minValue}
          .max=${this.timeProp.maxValue}
          .value=${this.timeProp.maxDefValue ?? this.timeProp.maxValue}
          @change="${(e: InputEvent) => this.onDateEndSelected(e)}"
        />
      `;
    }
    return html` <style>
        ${unsafeCSS(GmfDatepicker.styles)}
      </style>
      <div>
        <span>${datepickerStart}</span>
        ${datepickerEnd ? html`<span>${datepickerEnd}</span>` : html``}
      </div>`;
  }
}
