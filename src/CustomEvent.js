/**
 * @module import("ngeo/CustomEvent.js").default
 */
import {inherits as olUtilInherits} from 'ol/util.js';
import olEventsEvent from 'ol/events/Event.js';

/**
 * @constructor
 * @extends {import("ol/events/Event.js").default}
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

olUtilInherits(exports, olEventsEvent);


export default exports;
