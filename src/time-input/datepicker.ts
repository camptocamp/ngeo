import {html, TemplateResult} from 'lit';
import i18next from 'i18next';
import {customElement} from 'lit/decorators.js';
import GmfTimeInput from 'gmf/time-input/time-input';

@customElement('gmf-datepicker')
export default class GmfDatepicker extends GmfTimeInput {
  /**
   * Lit rendering.
   * @returns the html template for datepicker(s).
   */
  render(): TemplateResult {
    if (!this.time) {
      return html``;
    }
    const startText = this.isTimeRange() ? 'From:' : 'Date:';
    const datepickerStart = html`
      <span>${i18next.t(startText)}</span>
      <input
        type="date"
        .min=${this.time.minValue}
        .max=${this.time.maxValue}
        .value=${this.time.minDefValue ?? this.time.minValue}
        @change="${(e: InputEvent) => this.onDateStartSelected(e)}"
      />
    `;
    let datepickerEnd = null;
    if (this.isTimeRange()) {
      datepickerEnd = html`
        <span>${i18next.t('To:')}</span>
        <input
          type="date"
          .min=${this.time.minValue}
          .max=${this.time.maxValue}
          .value=${this.time.maxDefValue ?? this.time.maxValue}
          @change="${(e: InputEvent) => this.onDateEndSelected(e)}"
        />
      `;
    }
    return html` <div>
      <span>${datepickerStart}</span>
      ${datepickerEnd ? html`<span>${datepickerEnd}</span>` : html``}
    </div>`;
  }
}
