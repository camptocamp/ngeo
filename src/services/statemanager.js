/**
 * @fileoverview This files provides a service for managing the application
 * state. The application state is written to both the URL and the local
 * storage.
 */
goog.provide('ngeo.StateManager');

goog.require('goog.asserts');
goog.require('goog.storage.mechanism.HTML5LocalStorage');
goog.require('ngeo');
goog.require('ngeo.Location');



/**
 * Provides a service for managing the application state.
 * The application state is written to both the URL and the local storage.
 * @constructor
 * @param {ngeo.Location} ngeoLocation ngeo location service.
 * @ngInject
 */
ngeo.StateManager = function(ngeoLocation) {

  /**
   * Object representing the application's initial state.
   * @type {Object.<string ,string>}
   */
  this.initialState = {};

  /**
   * @type {ngeo.Location}
   */
  this.ngeoLocation = ngeoLocation;

  /**
   * @type {goog.storage.mechanism.HTML5LocalStorage}
   */
  this.localStorage = new goog.storage.mechanism.HTML5LocalStorage();

  // Populate initialState with the application's initial state. The initial
  // state is read from the location URL, or from the local storage if there
  // is no state in the location URL.

  var paramKeys = ngeoLocation.getParamKeys();
  var i, key;

  if (paramKeys.length === 0 ||
      (paramKeys.length === 1 && paramKeys[0] == 'debug')) {
    if (this.localStorage.isAvailable()) {
      var count = this.localStorage.getCount();
      for (i = 0; i < count; ++i) {
        key = this.localStorage.key(i);
        goog.asserts.assert(!goog.isNull(key));
        this.initialState[key] = this.localStorage.get(key);
      }
    }
  } else {
    var keys = ngeoLocation.getParamKeys();
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      this.initialState[key] = ngeoLocation.getParam(key);
    }
  }

  this.ngeoLocation.updateParams({});
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
 * Update the application state with the values in `object`.
 * @param {Object.<string, string>} object Object.
 */
ngeo.StateManager.prototype.updateState = function(object) {
  this.ngeoLocation.updateParams(object);
  if (this.localStorage.isAvailable()) {
    var key;
    for (key in object) {
      this.localStorage.set(key, object[key]);
    }
  }
};


/**
 * Delete a parameter
 * @param {string} key
 */
ngeo.StateManager.prototype.deleteParam = function(key) {
  this.ngeoLocation.deleteParam(key);
  if (this.localStorage.isAvailable()) {
    this.localStorage.remove(key);
  }
};

ngeoModule.service('ngeoStateManager', ngeo.StateManager);
