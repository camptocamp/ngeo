import {LitElement} from 'lit';
import {property, state} from 'lit/decorators.js';
import {TimePropertyModeEnum, TimeProperty, TimeRange} from 'ngeo/datasource/OGC';

/**
 * Base class for OGC time based input component (slider, datepicker)
 * The "time" property (config) is mandatory.
 * Emits a custom event "change" with the selected value.
 */
export default class GmfTimeInput extends LitElement {
  private _time?: TimeProperty;
  @property({type: Object})
  /**
   * On time set, update the state properties.
   * Don't do that in lit "updated" to avoid loop.
   */
  set time(timeObj: TimeProperty | undefined) {
    if (this._time === timeObj) {
      return;
    }
    this._time = timeObj;
    if (timeObj) {
      this.getCorrectTimeObject();
      this.setupMinMaxDefaultValues();
      // Wait a bit that listener are ready.
      setTimeout(() => this.emitChangeEvent(), 100);
    }
  }
  get time(): TimeProperty | undefined {
    return this._time;
  }
  @state() protected timeProp?: TimeProperty;
  @state() protected dateStart?: number;
  @state() protected dateEnd?: number;

  /**
   * Set up the start and the end date based on the time attribute.
   * @protected
   */
  protected setupMinMaxDefaultValues(): void {
    this.dateStart = +new Date(this.timeProp.minDefValue ?? this.timeProp.minValue);
    this.dateEnd = +new Date(this.timeProp.maxDefValue ?? this.timeProp.maxValue);
    this.updateTime(this.dateStart, this.dateEnd);
  }

  /**
   * Update start time on input change.
   * @param event input event.
   * @protected
   */
  protected onDateStartSelected(event: InputEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.updateTime(+new Date(target.value));
    this.emitChangeEvent();
  }

  /**
   * Update end time on input change.
   * @param event input event.
   * @protected
   */
  protected onDateEndSelected(event: InputEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.updateTime(this.dateStart, +new Date(target.value));
    this.emitChangeEvent();
  }

  /**
   * Updates the displayed time.
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
   * Dispatch a "change" event with the new time value.
   * @protected
   */
  protected emitChangeEvent(): void {
    const time: TimeRange = {
      start: this.dateStart,
    };
    if (this.isTimeRange()) {
      time.end = this.dateEnd;
    }
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: time,
    });
    this.dispatchEvent(changeEvent);
  }

  /**
   * Get correct input time object form provided time object.
   * @protected
   */
  protected getCorrectTimeObject(): void {
    this.timeProp = {...this.time};
    if (this.time.minValue) {
      this.timeProp.minValue = this.asIsoDateString(this.time.minValue);
    }
    if (this.time.maxValue) {
      this.timeProp.maxValue = this.asIsoDateString(this.time.maxValue);
    }
    if (this.timeProp.minDefValue) {
      this.timeProp.minDefValue = this.asIsoDateString(this.time.minDefValue);
    }
    if (this.time.maxDefValue) {
      this.timeProp.maxDefValue = this.asIsoDateString(this.time.maxDefValue);
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
    return this.timeProp.mode === TimePropertyModeEnum.RANGE;
  }
}
