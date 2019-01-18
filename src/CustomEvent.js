import {inherits as olUtilInherits} from 'ol/util.js';
import olEventsEvent from 'ol/events/Event.js';

/**
 * @constructor
 * @extends {import("ol/events/Event.js").default}
 * @param {string} type Event type.
 * @param {T} detail Event Detail.
 * @template T
 */
function CustomEvent(type, detail = {}) {

  olEventsEvent.call(this, type);

  /**
   * @type {T}
   */
  this.detail = detail;
}

olUtilInherits(CustomEvent, olEventsEvent);


export default CustomEvent;
