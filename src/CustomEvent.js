import olEventsEvent from 'ol/events/Event.js';

/**
 * @template T
 * @hidden
 */
export default class extends olEventsEvent {
  /**
   * @param {string} type Event type.
   * @param {T} detail Event Detail.
   */
  constructor(type, detail = /** @type {T} */ ({})) {
    super(type);

    /**
     * @type {T}
     */
    this.detail = detail;
  }
}
