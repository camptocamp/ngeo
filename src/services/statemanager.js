goog.provide('ngeo.StateManager');

goog.require('goog.asserts');
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
   * @type {!Array.<!RegExp>}
   */
  this.usedKeyRegexp = ngeoUsedKeyRegexp;

  /**
   * @type {boolean}
   */
  this.useLocalStorage;

  try {
    if ('localStorage' in window) {
      window.localStorage.setItem('test', '');
      window.localStorage.removeItem('test');
    } else {
      this.useLocalStorage = false;
    }
  } catch (err) {
    console.error(err);
    this.useLocalStorage = false;
  }

  // Populate initialState with the application's initial state. The initial
  // state is read from the location URL, or from the local storage if there
  // is no state in the location URL.

  const paramKeys = ngeoLocation.getParamKeys();

  if (paramKeys.length === 0 ||
      (paramKeys.length === 1 && paramKeys[0] == 'debug')) {
    if (this.useLocalStorage !== false) {
      for (const key in window.localStorage) {
        goog.asserts.assert(key);

        this.usedKeyRegexp.some(function(keyRegexp) {
          if (key.match(keyRegexp)) {
            const value = window.localStorage[key];
            if (value !== undefined) {
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
          if (value !== undefined) {
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
  if (value === undefined || value === null) {
    return undefined;
  }
  return value;
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {number|undefined} State value.
 */
ngeo.StateManager.prototype.getInitialNumberValue = function(key) {
  const value = this.initialState[key];
  if (value === undefined || value === null) {
    return undefined;
  }
  return parseFloat(value);
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {boolean|undefined} State value.
 */
ngeo.StateManager.prototype.getInitialBooleanValue = function(key) {
  const value = this.initialState[key];
  if (value === undefined || value === null) {
    return undefined;
  }
  return value === 'true';
};


/**
 * Update the application state with the values in `object`.
 * @param {!Object.<string, string>} object Object.
 */
ngeo.StateManager.prototype.updateState = function(object) {
  this.ngeoLocation.updateParams(object);
  if (this.useLocalStorage !== false) {
    for (const key in object) {
      goog.asserts.assert(key !== undefined);
      goog.asserts.assert(key !== null);
      const value = object[key];
      goog.asserts.assert(value !== undefined);
      goog.asserts.assert(value !== null);
      window.localStorage[key] = value;
    }
  }
};


/**
 * Delete a parameter
 * @param {string} key Key.
 */
ngeo.StateManager.prototype.deleteParam = function(key) {
  this.ngeoLocation.deleteParam(key);
  if (this.useLocalStorage !== false) {
    delete window.localStorage[key];
  }
};

ngeo.module.service('ngeoStateManager', ngeo.StateManager);
