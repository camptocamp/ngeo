import {html, LitElement, TemplateResult} from 'lit';
import i18next from 'i18next';
import {customElement, property, state} from 'lit/decorators.js';
import {TimePropertyModeEnum, TimeProperty, TimeRange} from 'ngeo/datasource/OGC';

@customElement('gmf-datepicker')
export default class GmfBaseElement extends LitElement {
  @property({type: Object}) time?: TimeProperty = undefined;
  @property({type: Object}) args?: unknown = undefined;
  @property({type: Object}) onchangeCb?: (time: TimeRange, args?: unknown) => void = undefined;
  @state() private dateStart?: number;
  @state() private dateEnd?: number;

  /**
   * Lit updated - set time on "time" property change.
   * @param changedProperties changed properties.
   */
  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);
    if (changedProperties.has('time') && this.time) {
      this.getCorrectTimeObject();
      this.dateStart = +new Date(this.time.minValue);
      this.dateEnd = +new Date(this.time.maxValue);
      this.updateTime(this.dateStart, this.dateEnd);
    }
  }

  /**
   * Update start time on input change.
   * @param event input event.
   * @private
   */
  private onDateStartSelected(event: InputEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.updateTime(+new Date(target.value));
  }

  /**
   * Update end time on input change.
   * @param event input event.
   * @private
   */
  private onDateEndSelected(event: InputEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.updateTime(this.dateStart, +new Date(target.value));
  }

  /**
   * On time change, update the displayed time, call the
   * provided callback with the new time and properties args and
   * then demand angularjs to digest (via window.runAngularDigestLoop).
   * @param dateStart start timestamp.
   * @param dateEnd optional end timestamp.
   * @private
   */
  private updateTime(dateStart: number, dateEnd?: number): void {
    this.dateStart = dateStart;
    const time: TimeRange = {
      start: dateStart,
    };
    if (this.isTimeRange()) {
      this.dateEnd = dateEnd;
      time.end = dateEnd;
    }
    if (!this.onchangeCb) {
      return;
    }
    this.onchangeCb(time, this.args);
    if ((window as any)['runAngularDigestLoop']) {
      (window as any)['runAngularDigestLoop']();
    }
  }

  /**
   * Get correct input time object form provided time object.
   * @private
   */
  private getCorrectTimeObject(): void {
    if (this.time.minValue) {
      this.time.minValue = this.asIsoDateString(this.time.minValue);
    }
    if (this.time.maxValue) {
      this.time.maxValue = this.asIsoDateString(this.time.maxValue);
    }
    if (this.time.minDefValue) {
      this.time.minDefValue = this.asIsoDateString(this.time.minDefValue);
    }
    if (this.time.maxDefValue) {
      this.time.maxDefValue = this.asIsoDateString(this.time.maxDefValue);
    }
  }

  /**
   * @param dateTxt a string date like '2006-12-01T00:00:00Z'
   * @returns a string iso date like '2006-12-01'.
   * @private
   */
  private asIsoDateString(dateTxt: string): string {
    return new Date(dateTxt).toISOString().slice(0, 10);
  }

  /**
   * @returns true if the "time range" mode must be displayed.
   * @private
   */
  private isTimeRange(): boolean {
    return this.time.mode === TimePropertyModeEnum.RANGE;
  }

  /**
   * Lit rendering.
   * @returns the html template.
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
          .value=${this.time.maxDefValue ?? this.time.minValue}
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
