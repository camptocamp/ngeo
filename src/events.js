import {unlistenByKey} from 'ol/events.js';

/**
 * Unregisters event listeners on a list of event targets, then empty
 * the list.
 *
 * @param {Array<import('ol/events.js').EventsKey>} keys List of keys
 *     to unlisten.
 */
export function unlistenByKeys(keys) {
  for (const key of keys) {
    unlistenByKey(key);
  }
  keys.length = 0;
}
