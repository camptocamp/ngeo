import {customElement} from 'lit/decorators.js';
import GmfTimeInput from 'gmf/time-input/time-input';
import {css, CSSResult, html, TemplateResult, unsafeCSS} from 'lit';
import {debounce} from 'ngeo/misc/debounce2';
import {TimePropertyResolutionEnum} from 'gmf/datasource/OGC';

@customElement('gmf-timeslider')
export default class GmfTimeslider extends GmfTimeInput {
  private isInitialRendering = true;
  private onSliderRelease = debounce(() => {
    this.callCb();
  }, 300);

  static styles: CSSResult[] = [
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
    if (!this.time) {
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
        .min=${this.dateMin}
        .max=${this.dateMax}
        .value=${this.dateStart}
        step=${this.getInterval()}
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
          .min=${this.dateMin}
          .max=${this.dateMax}
          .value=${this.dateEnd}
          step=${this.getInterval()}
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
   * Update start time on input change.
   * @param event input event.
   * @protected
   * @override
   */
  protected onDateStartSelected(event: InputEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.updateTime(parseInt(target.value));
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
    this.updateTime(this.dateStart, parseInt(target.value));
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
   * @private
   */
  private getLocalDate(date: number): string {
    const option: Intl.DateTimeFormatOptions = {
      year: 'numeric',
    };
    if (this.time.resolution === TimePropertyResolutionEnum.SECOND) {
      option.hour = 'numeric';
      option.day = 'numeric';
      option.month = 'numeric';
    }
    if (this.time.resolution === TimePropertyResolutionEnum.DAY) {
      option.day = 'numeric';
      option.month = 'numeric';
    } else if (this.time.resolution === TimePropertyResolutionEnum.MONTH) {
      option.month = 'numeric';
    }
    return new Date(date).toLocaleDateString(undefined, option);
  }

  /**
   * @returns the input "step" based on the wanted interval and the min/max.
   * @private
   */
  private getInterval(): number {
    if (!this.time.interval || this.time.interval.length !== 4) {
      return 1;
    }
    const secondsInterval = this.time.interval[0];
    if (secondsInterval > 0) {
      return secondsInterval * 1000;
    }
    const dayInterval = this.time.interval[1];
    const daySeconds = 1000 * 60 * 60 * 24;
    if (dayInterval > 0) {
      return dayInterval * daySeconds;
    }
    const timestampDiff = this.dateMax - this.dateMin;
    const monthInterval = this.time.interval[2];
    if (monthInterval > 0) {
      const nbMonth = this.getMonthDiff(new Date(this.dateMin), new Date(this.dateMax));
      return Math.floor(timestampDiff / (nbMonth >= 0 ? nbMonth : 1) / monthInterval);
    }
    const yearInterval = this.time.interval[3];
    const nbYears = this.getYearDiff(new Date(this.dateMin), new Date(this.dateMax));
    return Math.floor(timestampDiff / (nbYears >= 0 ? nbYears : 1) / yearInterval);
  }

  /**
   * @returns the amount of months between two dates.
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
   * @returns the amount of years between two dates.
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
    this.fillColor();
    if (isStart) {
      this.onDateStartSelected(event);
    } else {
      this.onDateEndSelected(event);
    }
  }

  /**
   * Update the slider colors based on both sliders positions.
   * @private
   */
  private fillColor() {
    //  var(--color-light);
    const sliderTrack: HTMLInputElement = this.shadowRoot.querySelector('.slider-track');
    const percent1 = ((this.dateStart - this.dateMin) / (this.dateMax - this.dateMin)) * 100;
    const percent2 = ((this.dateEnd - this.dateMin) / (this.dateMax - this.dateMin)) * 100;
    sliderTrack.style.background = `linear-gradient(to right, var(--brand-secondary) ${percent1}% , var(--brand-primary) ${percent1}% , var(--brand-primary) ${percent2}%, var(--brand-secondary) ${percent2}%)`;
  }
}
