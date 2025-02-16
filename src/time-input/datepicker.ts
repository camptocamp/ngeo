import {css, CSSResult, html, TemplateResult, unsafeCSS} from 'lit';
import i18next from 'i18next';
import {customElement} from 'lit/decorators.js';
import GmfTimeInput from 'gmf/time-input/time-input';

/**
 * Gives you a datepicker (simple or range) based on OGC time.
 * Based on GmfTimeInput.
 * Example:
 * <gmf-datepicker time="myTimeConfig"></gmf-datepicker>
 */
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
    const i18nextOptions = {nsSeparator: '#'};
    const datepickerStart = html`
      <span>${i18next.t(startText, i18nextOptions)}</span>
      <input
        class="datepicker-start"
        type="date"
        .min=${this.timeProp.minValue}
        .max=${this.getDateMax()}
        .value=${this.timeProp.minDefValue ?? this.timeProp.minValue}
        @change="${(e: InputEvent) => this.onDateStartSelected(e)}"
      />
    `;
    let datepickerEnd = null;
    if (this.isTimeRange()) {
      datepickerEnd = html`
        <span>${i18next.t('To:', i18nextOptions)}</span>
        <input
          class="datepicker-end"
          type="date"
          .min=${this.getDateMin()}
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

  /**
   * On range mode, calculate the min date value with the second date-picker's value.
   * @returns The min selectable date.
   * @private
   */
  private getDateMin(): string {
    if (!this.isTimeRange()) {
      return this.timeProp.minValue;
    }
    const start: HTMLInputElement = this.shadowRoot.querySelector('.datepicker-start');
    return start ? start.value : this.timeProp.minValue;
  }

  /**
   * On range mode, calculate the max date value with the second date-picker's value.
   * @returns The max selectable date.
   * @private
   */
  private getDateMax(): string {
    if (!this.isTimeRange()) {
      return this.timeProp.maxValue;
    }
    const end: HTMLInputElement = this.shadowRoot.querySelector('.datepicker-end');
    return end ? end.value : this.timeProp.maxValue;
  }
}
