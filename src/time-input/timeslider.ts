import {customElement, state} from 'lit/decorators.js';
import GmfTimeInput from 'gmf/time-input/time-input';
import {css, CSSResult, html, TemplateResult, unsafeCSS} from 'lit';
import {debounce} from 'ngeo/misc/debounce2';
import {TimePropertyResolutionEnum} from 'gmf/datasource/OGC';

@customElement('gmf-timeslider')
export default class GmfTimeslider extends GmfTimeInput {
  @state() protected sliderStart?: number;
  @state() protected sliderEnd?: number;
  private isInitialRendering = true;
  private datesSteps: number[];
  private readonly onSliderRelease = debounce(() => {
    this.callCb();
  }, 300);

  static readonly styles: CSSResult[] = [
    css`
      .container {
        position: relative;
        width: 100%;
        height: 3rem;
      }
      input[type='range'] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;
        outline: none;
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        background-color: transparent;
        pointer-events: none;
      }
      .slider-track {
        width: 100%;
        height: 5px;
        position: absolute;
        margin: 0.5rem 0;
        top: 0;
        bottom: 0;
        border-radius: 5px;
        background: linear-gradient(
          to right,
          var(--brand-secondary) 0%,
          var(--brand-primary) 0%,
          var(--brand-primary) 100%,
          var(--brand-secondary) 100%
        );
      }
      input[type='range']::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        height: 5px;
      }
      input[type='range']::-moz-range-track {
        -moz-appearance: none;
        height: 5px;
      }
      input[type='range']::-ms-track {
        appearance: none;
        height: 5px;
      }
      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 1.2em;
        width: 0.4em;
        background-color: var(--main-bg-color);
        border: solid 1px var(--btn-default-border);
        cursor: pointer;
        margin-top: -0.3rem;
        pointer-events: auto;
        border-radius: 2px;
      }
      input[type='range']::-moz-range-thumb {
        -webkit-appearance: none;
        height: 1.2em;
        width: 0.4em;
        cursor: pointer;
        border-radius: 2px;
        background-color: var(--main-bg-color);
        border: solid 1px var(--btn-default-border);
        pointer-events: auto;
      }
      input[type='range']::-ms-thumb {
        appearance: none;
        height: 1.2em;
        width: 0.4em;
        cursor: pointer;
        border-radius: 2px;
        background-color: var(--main-bg-color);
        border: solid 1px var(--btn-default-border);
        pointer-events: auto;
      }
      input[type='range']:active::-webkit-slider-thumb {
        background-color: white;
        border: 1px solid var(--brand-secondary);
      }
      .dates-txt {
        position: relative;
        display: flex;
        justify-content: space-between;
        top: 2rem;
      }
    `,
  ];

  /**
   * Lit rendering.
   * @returns the html template for timeslider(s).
   */
  render(): TemplateResult {
    if (!this.timeProp || !this.datesSteps) {
      return html``;
    }
    // On initial rendering, the colouring must be applied once the value are
    // known in the element.
    if (this.isInitialRendering && this.isTimeRange()) {
      setTimeout(() => this.fillColor(), 100);
    }
    this.isInitialRendering = false;
    const sliderStart = html`
      <input
        class="slider-start"
        type="range"
        .min="0"
        .max=${this.datesSteps.length - 1}
        .value=${this.sliderStart}
        step="1"
        @input="${(e: InputEvent) => this.onDateStartMoved(e)}"
      />
    `;
    const dateTxtStart = html` <div class="date-start">${this.getLocalDate(this.dateStart)}</div> `;
    let sliderEnd = null;
    let dateTxtEnd = null;
    if (this.isTimeRange()) {
      sliderEnd = html`
        <input
          class="slider-end"
          type="range"
          .min="0"
          .max=${this.datesSteps.length - 1}
          .value=${this.sliderEnd}
          step="1"
          @input="${(e: InputEvent) => this.onDateEndMoved(e)}"
        />
      `;
      dateTxtEnd = html` <div class="date-end">${this.getLocalDate(this.dateEnd)}</div> `;
    }
    return html` <style>
        ${unsafeCSS(GmfTimeInput.styles)}
      </style>
      <div class="container">
        <div class="slider-track">${sliderStart} ${sliderEnd ? html`${sliderEnd}` : html``}</div>
        <div class="dates-txt">${dateTxtStart} ${dateTxtEnd ? html`${dateTxtEnd}` : html``}</div>
      </div>`;
  }

  /**
   * Set up the start date and the end date based on the time attribute.
   * Set up also the slider min and max and possible matching dates.
   * @protected
   * @override
   */
  protected setupMinMaxDefaultValues(): void {
    this.datesSteps = this.computeDatesSteps();
    const dateStart = +new Date(this.timeProp.minDefValue ?? this.timeProp.minValue);
    const dateEnd = +new Date(this.timeProp.maxDefValue ?? this.timeProp.maxValue);
    const dateStartInSteps = this.findNearestValue(dateStart, this.datesSteps);
    const dateEndInSteps = this.findNearestValue(dateEnd, this.datesSteps);
    this.sliderStart = this.datesSteps.indexOf(dateStartInSteps);
    this.sliderEnd = this.datesSteps.indexOf(dateEndInSteps);
    this.updateTime(dateStart, dateEnd);
    this.onSliderRelease();
  }

  /**
   * In an array of number, find the nearest matching value.
   * The values must be sorted (smallest first).
   * @param value the base value to find the nearest value.
   * @param values the sorted possible values.
   * @returns The nearest value in the values array.
   * @private
   */
  private findNearestValue(value: number, values: number[]): number {
    return values.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    }, 0);
  }

  /**
   * Update start time on input change.
   * @param event input event.
   * @protected
   * @override
   */
  protected onDateStartSelected(event: InputEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    this.sliderStart = value;
    this.updateTime(this.datesSteps[value]);
    this.onSliderRelease();
  }

  /**
   * Update end time on input change.
   * @param event input event.
   * @protected
   * @override
   */
  protected onDateEndSelected(event: InputEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    this.sliderEnd = value;
    this.updateTime(this.datesSteps[this.sliderStart], this.datesSteps[value]);
    this.onSliderRelease();
  }

  /**
   * Update the slider representation on slider move.
   * @param event input event.
   * @private
   */
  private onDateStartMoved(event: InputEvent): void {
    this.onDateMoved(true, event);
  }

  /**
   * Update the slider representation on slider move.
   * @param event input event.
   * @private
   */
  private onDateEndMoved(event: InputEvent): void {
    this.onDateMoved(false, event);
  }

  /**
   * Get the right date representation based on the resolution.
   * @param date The date (timestamp) to format.
   * @returns the date in a local format.
   * @private
   */
  private getLocalDate(date: number): string {
    const option: Intl.DateTimeFormatOptions = {
      year: 'numeric',
    };
    if (this.timeProp.resolution === TimePropertyResolutionEnum.SECOND) {
      option.hour = 'numeric';
      option.day = 'numeric';
      option.month = 'numeric';
    }
    if (this.timeProp.resolution === TimePropertyResolutionEnum.DAY) {
      option.day = 'numeric';
      option.month = 'numeric';
    } else if (this.timeProp.resolution === TimePropertyResolutionEnum.MONTH) {
      option.month = 'numeric';
    }
    return new Date(date).toLocaleDateString(undefined, option);
  }

  /**
   * @returns all possible date in an array, based on the wanted values OR
   * on the wanted interval and the min/max dates. Max values: 10000.
   * @private
   */
  private computeDatesSteps(): number[] {
    // If predefined values, returns them as date.
    if (this.timeProp.values) {
      return this.computeDatesStepsFromValues();
    }
    const dateMin = +new Date(this.timeProp.minValue);
    const dateMax = +new Date(this.timeProp.maxValue);
    // No timeProp.interval ? returns min max and notify the error.
    if (!this.timeProp.interval && this.time.interval.length !== 4) {
      console.error('No valid time interval provided.');
      return [dateMin, dateMax];
    }
    // Compute date steps from time.interval
    const secondsInterval = this.timeProp.interval[3];
    if (secondsInterval > 0) {
      return this.computeDatesStepsForSeconds(dateMin, dateMax, secondsInterval);
    }
    const dayInterval = this.timeProp.interval[2];
    if (dayInterval > 0) {
      return this.computeDatesStepsForDays(dateMin, dateMax, dayInterval);
    }
    const monthInterval = this.timeProp.interval[1];
    if (monthInterval > 0) {
      return this.computeDatesStepsForMonth(dateMin, dateMax, monthInterval);
    }
    const yearInterval = this.timeProp.interval[0];
    return this.computeDatesStepsForYear(dateMin, dateMax, yearInterval);
  }

  /**
   * @param length the length of wanted array.
   * @returns An array with repeated null values, the times of the provided
   * length (limited to 10000).
   * @private
   */
  private getLimitedArray = (length: number): null[] => {
    return Array(Math.min(length, 10000)).fill(null) as null[];
  };

  /**
   * @returns the timestamp of the time.values.
   * @private
   */
  private computeDatesStepsFromValues(): number[] {
    return this.timeProp.values.map((value) => +new Date(value));
  }

  /**
   * @param dateMin The minimal date.
   * @param dateMax The maximal date
   * @param interval the wanted interval
   * @returns All the seconds timestamps between the provided dates and regarding the wanted interval.
   * @private
   */
  private computeDatesStepsForSeconds(dateMin: number, dateMax: number, interval: number): number[] {
    const oneSecond = 1000;
    const dateDiff = dateMax - dateMin;
    const steps = Math.ceil(dateDiff / (oneSecond * interval));
    const datesSteps = this.getLimitedArray(steps).map((_, index) => {
      const date = new Date(dateMin);
      date.setSeconds(date.getSeconds() + oneSecond * index);
      return +date;
    });
    datesSteps.push(+new Date(this.timeProp.maxValue));
    return datesSteps;
  }

  /**
   * @param dateMin The minimal date.
   * @param dateMax The maximal date
   * @param interval the wanted interval
   * @returns All the days timestamps between the provided dates and regarding the wanted interval.
   * @private
   */
  private computeDatesStepsForDays(dateMin: number, dateMax: number, interval: number): number[] {
    const oneSecond = 1000;
    const oneDay = oneSecond * 60 * 60 * 24;
    const dateDiff = dateMax - dateMin;
    const steps = Math.ceil(dateDiff / (oneDay * interval));
    const datesSteps = this.getLimitedArray(steps).map((_, index) => {
      const date = new Date(dateMin);
      date.setDate(date.getDate() + index);
      return +date;
    });
    datesSteps.push(+new Date(this.timeProp.maxValue));
    return datesSteps;
  }

  /**
   * @param dateMin The minimal date.
   * @param dateMax The maximal date
   * @param interval the wanted interval
   * @returns All the month timestamp between the provided dates and regarding the wanted interval.
   * @private
   */
  private computeDatesStepsForMonth(dateMin: number, dateMax: number, interval: number): number[] {
    let nbMonth = this.getMonthDiff(new Date(dateMin), new Date(dateMax));
    nbMonth = nbMonth > 0 ? nbMonth : 1;
    nbMonth = Math.ceil(nbMonth / interval);
    const datesSteps = this.getLimitedArray(nbMonth).map((_, index) => {
      const date = new Date(dateMin);
      date.setMonth(date.getMonth() + index);
      return +date;
    });
    datesSteps.push(+new Date(this.timeProp.maxValue));
    return datesSteps;
  }

  /**
   * @param dateMin The minimal date.
   * @param dateMax The maximal date
   * @param interval the wanted interval
   * @returns All the years timestamp between the provided dates and regarding the wanted interval.
   * @private
   */
  private computeDatesStepsForYear(dateMin: number, dateMax: number, interval: number): number[] {
    let nbYear = this.getYearDiff(new Date(dateMin), new Date(dateMax));
    nbYear = nbYear > 0 ? nbYear : 1;
    nbYear = Math.ceil(nbYear / interval);
    const datesSteps = this.getLimitedArray(nbYear).map((_, index) => {
      const date = new Date(dateMin);
      date.setFullYear(date.getFullYear() + index);
      return +date;
    });
    datesSteps.push(+new Date(this.timeProp.maxValue));
    return datesSteps;
  }

  /**
   * @returns The amount of months between two dates.
   * @param date1 min date.
   * @param date2 max date.
   * @private
   */
  private getMonthDiff(date1: Date, date2: Date): number {
    let months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return months <= 0 ? 0 : months;
  }

  /**
   * @returns The amount of years between two dates.
   * @param date1 min date.
   * @param date2 max date.
   * @private
   */
  private getYearDiff(date1: Date, date2: Date): number {
    return date2.getFullYear() - date1.getFullYear();
  }

  /**
   * Updates the input values and representation.
   * Manage the sliders to not let one goes beyond the other.
   * @param isStart is the start/first slider
   * @param event the original input event.
   * @private
   */
  private onDateMoved(isStart: boolean, event: InputEvent): void {
    if (!this.isTimeRange()) {
      this.onDateStartSelected(event);
      return;
    }
    const minGap = 0;
    const sliderStart: HTMLInputElement = this.shadowRoot.querySelector('.slider-start');
    const sliderEnd: HTMLInputElement = this.shadowRoot.querySelector('.slider-end');
    // Block slider to not let it go beyond the other slider.
    if (parseInt(sliderEnd.value) - parseInt(sliderStart.value) <= minGap) {
      if (isStart) {
        sliderStart.value = `${parseInt(sliderEnd.value) - minGap}`;
      } else {
        sliderEnd.value = `${parseInt(sliderStart.value) + minGap}`;
      }
    }
    if (isStart) {
      this.onDateStartSelected(event);
    } else {
      this.onDateEndSelected(event);
    }
    this.fillColor();
  }

  /**
   * Update the slider colors based on both sliders positions.
   * @private
   */
  private fillColor() {
    const sliderTrack: HTMLInputElement = this.shadowRoot.querySelector('.slider-track');
    const nbSteps = this.datesSteps.length - 1;
    const percent1 = (this.sliderStart / nbSteps) * 100;
    const percent2 = (this.sliderEnd / nbSteps) * 100;
    sliderTrack.style.background = `linear-gradient(to right, var(--brand-secondary) ${percent1}% , var(--brand-primary) ${percent1}% , var(--brand-primary) ${percent2}%, var(--brand-secondary) ${percent2}%)`;
  }
}
