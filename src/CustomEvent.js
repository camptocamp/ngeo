/**
 * @module ngeo.CustomEvent
 */
import * as olBase from 'ol/index.js';
import olEventsEvent from 'ol/events/Event.js';

/**
 * @constructor
 * @extends {ol.events.Event}
 * @param {string} type Event type.
 * @param {T} detail Event Detail.
 * @template T
 */
const exports = function(type, detail = {}) {

  olEventsEvent.call(this, type);

  /**
   * @type {T}
   */
  this.detail = detail;

};

olBase.inherits(exports, olEventsEvent);


export default exports;
