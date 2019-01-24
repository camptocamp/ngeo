import olEventsEvent from 'ol/events/Event.js';


export default class extends olEventsEvent {
  /**
   * @constructor
   * @param {string} type Event type.
   * @param {T} detail Event Detail.
   * @template T
   */
  constructor(type, detail = {}) {
    super(type);

    /**
     * @type {T}
     */
    this.detail = detail;
  }
}
