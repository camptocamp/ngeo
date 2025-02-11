import {LitElement} from 'lit';
import {property, state} from 'lit/decorators.js';
import {TimePropertyModeEnum, TimeProperty, TimeRange} from 'ngeo/datasource/OGC';

/**
 * Base class for OGC time based input component (slider, datepicker)
 */
export default class GmfTimeInput extends LitElement {
  @property({type: Object}) time?: TimeProperty = undefined;
  @property({type: Object}) args?: unknown = undefined;
  @property({type: Object}) onchangeCb?: (time: TimeRange, args?: unknown) => void = undefined;
  @state() protected dateStart?: number;
  @state() protected dateEnd?: number;
  // Min and max as number are for sliders
  @state() protected dateMin?: number;
  @state() protected dateMax?: number;

  /**
   * Lit updated - set time on "time" property change.
   * @param changedProperties changed properties.
   */
  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);
    if (changedProperties.has('time') && this.time) {
      this.getCorrectTimeObject();
      this.dateStart = +new Date(this.time.minDefValue ?? this.time.minValue);
      this.dateEnd = +new Date(this.time.maxDefValue ?? this.time.maxValue);
      this.dateMin = +new Date(this.time.minValue);
      this.dateMax = +new Date(this.time.maxValue);
      this.updateTime(this.dateStart, this.dateEnd);
    }
  }

  /**
   * Update start time on input change.
   * @param event input event.
   * @protected
   */
  protected onDateStartSelected(event: InputEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.updateTime(+new Date(target.value));
    this.callCb();
  }

  /**
   * Update end time on input change.
   * @param event input event.
   * @protected
   */
  protected onDateEndSelected(event: InputEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.updateTime(this.dateStart, +new Date(target.value));
    this.callCb();
  }

  /**
   * On time change, update the displayed time, call the
   * provided callback with the new time and properties args and
   * then demand angularjs to digest (via window.runAngularDigestLoop).
   * @param dateStart start timestamp.
   * @param dateEnd optional end timestamp.
   * @protected
   */
  protected updateTime(dateStart: number, dateEnd?: number): void {
    this.dateStart = dateStart;
    if (dateEnd) {
      this.dateEnd = dateEnd;
    }
  }

  /**
   * Call the provided callback with the new time and properties args and
   * then demand angularjs to digest (via window.runAngularDigestLoop).
   * @protected
   */
  protected callCb(): void {
    const time: TimeRange = {
      start: this.dateStart,
    };
    if (this.isTimeRange()) {
      time.end = this.dateEnd;
    }
    if (!this.onchangeCb) {
      return;
    }
    this.onchangeCb(time, this.args);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((window as any).runAngularDigestLoop) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      (window as any).runAngularDigestLoop();
    }
  }

  /**
   * Get correct input time object form provided time object.
   * @protected
   */
  protected getCorrectTimeObject(): void {
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
   * @protected
   */
  protected asIsoDateString(dateTxt: string): string {
    return new Date(dateTxt).toISOString().slice(0, 10);
  }

  /**
   * @returns true if the "time range" mode must be displayed.
   * @protected
   */
  protected isTimeRange(): boolean {
    return this.time.mode === TimePropertyModeEnum.RANGE;
  }
}
