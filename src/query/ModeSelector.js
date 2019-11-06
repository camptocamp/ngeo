import angular from 'angular';
import ngeoQueryAction from 'ngeo/query/Action.js';
import ngeoQueryMode from 'ngeo/query/Mode.js';

import {listen as olEventsListen} from 'ol/events.js';
import {MAC} from 'ol/has.js';


/**
 * @hidden
 */
export class QueryModeSelector {

  /**
   * Service that provides the query "mode", i.e. how queries on the
   * map should be made by the user.
   *
   * It also provides the query "action", i.e. what to do with the
   * query results.
   *
   * Both the "mode" and "action" can be temporarily set if a key is
   * pressed on the keyboard by the user. Therefore, this service
   * listens to the keyboard `keydown` and `keyup` events to
   * temporarily set them accordingly depending on the key that was
   * pressed.
   *
   * @param {angular.IScope} $rootScope .
   */
  constructor($rootScope) {

    // Constants

    /**
     * The key to press to temporarily set the action to "ADD"
     * @type {string}
     * @private
     */
    this.keyActionAdd_ = 'a';

    /**
     * The key to press to temporarily set the action to "REMOVE"
     * @type {string}
     * @private
     */
    this.keyActionRemove_ = 'x';

    /**
     * @type {string[]}
     * @private
     */
    this.keysAction_ = [this.keyActionAdd_, this.keyActionRemove_];

    // Variables

    /**
     * The action currently active.
     * @type {string}
     * @private
     */
    this.action_ = ngeoQueryAction.REPLACE;

    /**
     * If a key is pressed, it can temporarily change the currently
     * active action. When that happens, the currently active action
     * is stored here to be restored later, after the key has been
     * released.
     * @type {?string}
     * @private
     */
    this.previousAction_ = null;

    /**
     * The mode currently active.
     * @type {string}
     * @private
     */
    this.mode_ = ngeoQueryMode.CLICK;

    /**
     * If a key is pressed, it can temporarily change the currently
     * active mode. When that happens, the currently active mode is
     * stored here to be restored later, after the key has been
     * released.
     * @type {?string}
     * @private
     */
    this.previousMode_ = null;

    /**
     * The action key currently being pressed. Only those registered
     * in `this.keysAction_` can be active.
     * @type {?string}
     * @private
     */
    this.activeActionKey_ = null;

    /**
     * If drawing is active, the selection is blocked.
     * @type {boolean}
     */
    this.isBlocked = false;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.rootScope_ = $rootScope;

    // Event listeners
    olEventsListen(document, 'keydown', this.handleKeyDown_, this);
    olEventsListen(document, 'keyup', this.handleKeyUp_, this);
  }

  /**
   * @return {string} The query action currently active
   */
  get action() {
    return this.action_;
  }

  /**
   * @param {string} action The query action to set as active
   */
  set action(action) {
    this.action_ = action;
  }

  /**
   * @return {string} The query mode currently active
   */
  get mode() {
    return this.mode_;
  }

  /**
   * @param {string} mode The query mode to set as active
   */
  set mode(mode) {
    this.mode_ = mode;
  }

  // Handlers

  /**
   * @param {Event|import("ol/events/Event.js").default} evt Event.
   * @private
   */
  handleKeyDown_(evt) {
    if (!(evt instanceof KeyboardEvent)) {
      return;
    }

    const key = evt.key;
    if (this.keysAction_.includes(key) && !this.previousAction_) {
      // An 'action' key was pressed and none were already previously
      // pressed. In other words, only the first 'action key' is handled.
      this.previousAction_ = this.action;
      let newAction;
      switch (key) {
        case this.keyActionAdd_:
          newAction = ngeoQueryAction.ADD;
          break;
        case this.keyActionRemove_:
          newAction = ngeoQueryAction.REMOVE;
          break;
        default:
          break;
      }
      if (newAction) {
        this.action = newAction;
        this.activeActionKey_ = key;
        this.rootScope_.$apply();
      }

    } else if ((MAC ? evt.metaKey : evt.ctrlKey) && !this.previousMode_ && !this.isBlocked) {
      // The 'ctrl' (or 'meta' key) on mac was pressed
      this.previousMode_ = this.mode;
      this.mode = ngeoQueryMode.DRAW_BOX;
      this.rootScope_.$apply();
    }
  }

  /**
   * @param {Event|import("ol/events/Event.js").default} evt Event.
   * @private
   */
  handleKeyUp_(evt) {
    if (!(evt instanceof KeyboardEvent)) {
      return;
    }

    let updateScope = false;

    // On any 'keyup', if no 'ctrl' (or 'meta' on mac) is pressed and
    // there is a previous mode set, then set it as new active mode.
    if (!(evt.metaKey || evt.ctrlKey) && this.previousMode_ && !this.isBlocked) {
      this.mode = this.previousMode_;
      this.previousMode_ = null;
      updateScope = true;
    }

    // If the active action key was released, then restore the
    // previous action.
    const key = evt.key;
    if (this.activeActionKey_ === key && this.previousAction_) {
      this.action = this.previousAction_;
      this.previousAction_ = null;
      this.activeActionKey_ = null;
      updateScope = true;
    }

    if (updateScope) {
      this.rootScope_.$apply();
    }
  }
}


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoQueryModeSelector', [
]);
module.service('ngeoQueryModeSelector', QueryModeSelector);


export default module;
