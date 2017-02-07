goog.provide('ngeo.StateManager');

goog.require('goog.asserts');
goog.require('goog.storage.mechanism.HTML5LocalStorage');
goog.require('ngeo');
goog.require('ngeo.Location');


ngeo.module.value('ngeoUsedKeyRegexp', [new RegExp('.*')]);


/**
 * Provides a service for managing the application state.
 * The application state is written to both the URL and the local storage.
 * @constructor
 * @struct
 * @param {!ngeo.Location} ngeoLocation ngeo location service.
 * @param {!Array.<!RegExp>} ngeoUsedKeyRegexp regexp used to identify the used keys.
 * @ngInject
 */
ngeo.StateManager = function(ngeoLocation, ngeoUsedKeyRegexp) {

  /**
   * Object representing the application's initial state.
   * @type {!Object.<string, string>}
   */
  this.initialState = {};

  /**
   * @type {!ngeo.Location}
   */
  this.ngeoLocation = ngeoLocation;

  /**
   * @type {goog.storage.mechanism.HTML5LocalStorage}
   */
  this.localStorage = new goog.storage.mechanism.HTML5LocalStorage();

  /**
   * @type {!Array.<!RegExp>}
   */
  this.usedKeyRegexp = ngeoUsedKeyRegexp;


  // Populate initialState with the application's initial state. The initial
  // state is read from the location URL, or from the local storage if there
  // is no state in the location URL.

  const paramKeys = ngeoLocation.getParamKeys();

  if (paramKeys.length === 0 ||
      (paramKeys.length === 1 && paramKeys[0] == 'debug')) {
    if (this.localStorage.isAvailable()) {
      for (const key in this.localStorage) {
        goog.asserts.assert(key !== null);
        goog.asserts.assert(key !== undefined);

        this.usedKeyRegexp.some(function(keyRegexp) {
          if (key.match(keyRegexp)) {
            const value = this.localStorage.get(key);
            if (value !== null && value !== undefined) {
              this.initialState[key] = value;
            } else {
              this.initialState[key] = '';
            }
            return true;
          }
        }, this);
      }
    }
  } else {
    paramKeys.forEach(function(key) {
      this.usedKeyRegexp.some(function(keyRegexp) {
        if (key.match(keyRegexp)) {
          const value = this.ngeoLocation.getParam(key);
          if (value !== null) {
            this.initialState[key] = value;
            return true;
          }
        }
      }, this);
    }, this);
  }
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {string|undefined} State value.
 */
ngeo.StateManager.prototype.getInitialValue = function(key) {
  return this.initialState[key];
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {string|undefined} State value.
 */
ngeo.StateManager.prototype.getInitialStringValue = function(key) {
  const value = this.initialState[key];
  if (value === undefined) {
    return undefined;
  }
  return goog.asserts.assertString(value);
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {number|undefined} State value.
 */
ngeo.StateManager.prototype.getInitialNumberValue = function(key) {
  const value = this.initialState[key];
  if (value === undefined) {
    return undefined;
  }
  return goog.asserts.assertNumber(value);
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {boolean|undefined} State value.
 */
ngeo.StateManager.prototype.getInitialBooleanValue = function(key) {
  const value = this.initialState[key];
  if (value === undefined) {
    return undefined;
  }
  return goog.asserts.assertBoolean(value);
};


/**
 * Update the application state with the values in `object`.
 * @param {!Object.<string, string>} object Object.
 */
ngeo.StateManager.prototype.updateState = function(object) {
  this.ngeoLocation.updateParams(object);
  if (this.localStorage.isAvailable()) {
    for (const key in object) {
      goog.asserts.assert(key !== undefined);
      goog.asserts.assert(key !== null);
      const value = object[key];
      goog.asserts.assert(value !== undefined);
      goog.asserts.assert(value !== null);
      this.localStorage.set(key, value);
    }
  }
};


/**
 * Delete a parameter
 * @param {string} key Key.
 */
ngeo.StateManager.prototype.deleteParam = function(key) {
  this.ngeoLocation.deleteParam(key);
  if (this.localStorage.isAvailable()) {
    this.localStorage.remove(key);
  }
};

ngeo.module.service('ngeoStateManager', ngeo.StateManager);
