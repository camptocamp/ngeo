import ngeoQueryAction from 'ngeo/query/Action.js';

import {listen as olEventsListen} from 'ol/events.js';

/**
 * @module ngeo.query.Keyboard
 */
class Keyboard {

  /**
   * Listens to the keyboard `keydown` and `keyup` events to keep
   * track of the query action to do depending on the key being
   * pressed.
   */
  constructor() {

    // Constants

    /**
     * The key to press for "ADD" action
     * @type {string}
     * @private
     */
    this.keyAdd_ = 'a';

    /**
     * The key to press for "REMOVE" action
     * @type {string}
     * @private
     */
    this.keyRemove_ = 'x';

    /**
     * @type {Array.<string>}
     * @private
     */
    this.keys_ = [this.keyAdd_, this.keyRemove_];

    // Variables

    /**
     * The key currently being pressed. Only those registered in
     * `this.keys_` can be active.
     * @type {?string}
     * @private
     */
    this.activeKey_ = null;

    // Event listeners
    olEventsListen(document, 'keydown', this.handleKeyDown_, this);
    olEventsListen(document, 'keyup', this.handleKeyUp_, this);
  }

  // Getters

  /**
   * @return {string} The query action depending on the key currently
   * being pressed.
   */
  get action() {
    let action = ngeoQueryAction.REPLACE;
    if (this.activeKey_) {
      if (this.activeKey_ === this.keyAdd_) {
        action = ngeoQueryAction.ADD;
      } else if (this.activeKey_ === this.keyRemove_) {
        action = ngeoQueryAction.REMOVE;
      }
    }
    return action;
  }

  // Handlers

  /**
   * @param {KeyboardEvent} evt Event.
   * @private
   */
  handleKeyDown_(evt) {
    if (!this.activeKey_ && this.keys_.includes(evt.key)) {
      this.activeKey_ = evt.key;
    }
  }

  /**
   * @param {KeyboardEvent} evt Event.
   * @private
   */
  handleKeyUp_(evt) {
    if (this.activeKey_ && this.activeKey_ === evt.key) {
      this.activeKey_ = null;
    }
  }
}

export default new Keyboard();
