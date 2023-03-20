import angular from 'angular';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';

/**
 * Provides a service for managing the application state.
 * The application state is written to both the URL and the local storage.
 * @constructor
 * @param {!import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo location service.
 * @param {!Array.<!RegExp>} ngeoUsedKeyRegexp regexp used to identify the used keys.
 * @ngInject
 * @hidden
 */
export function StatemanagerService(ngeoLocation, ngeoUsedKeyRegexp) {
  /**
   * Object representing the application's initial state.
   * @type {!Object.<string, string>}
   */
  this.initialState = {};

  /**
   * @type {!import("ngeo/statemanager/Location.js").StatemanagerLocation}
   */
  this.ngeoLocation = ngeoLocation;

  /**
   * @type {!Array.<!RegExp>}
   */
  this.usedKeyRegexp = ngeoUsedKeyRegexp;

  /**
   * @type {boolean}
   * @private
   */
  this.useLocalStorage_;

  this.setUseLocalStorage(false);

  // Populate initialState with the application's initial state. The initial
  // state is read from the location URL, or from the local storage if there
  // is no state in the location URL.

  const paramKeys = ngeoLocation.getParamKeys().filter((key) => key != 'debug' && key != 'no_redirect');

  if (paramKeys.length === 0) {
    if (this.useLocalStorage_) {
      for (const key in window.localStorage) {
        console.assert(key);

        this.usedKeyRegexp.some((keyRegexp) => {
          if (key.match(keyRegexp)) {
            const value = window.localStorage[key];
            if (value !== undefined || value !== null) {
              this.initialState[key] = value;
            } else {
              this.initialState[key] = '';
            }
            return true;
          }
        });
      }
    }
  } else {
    paramKeys.forEach((key) => {
      this.usedKeyRegexp.some((keyRegexp) => {
        if (key.match(keyRegexp)) {
          const value = this.ngeoLocation.getParam(key);
          if (value !== undefined) {
            this.initialState[key] = value;
            return true;
          }
        }
      });
    });
  }
}

/**
 * @param {boolean} value Use localStorage
 * @return {boolean} localStorage will be used.
 */
StatemanagerService.prototype.setUseLocalStorage = function (value) {
  this.useLocalStorage_ = value;

  // check if localStorage is supported
  if (this.useLocalStorage_) {
    try {
      if ('localStorage' in window) {
        window.localStorage['test'] = '';
        delete window.localStorage['test'];
      } else {
        this.useLocalStorage_ = false;
      }
    } catch (err) {
      console.error(err);
      this.useLocalStorage_ = false;
    }
  }
  return this.useLocalStorage_;
};

/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {string|undefined} State value.
 */
StatemanagerService.prototype.getInitialValue = function (key) {
  return this.initialState[key];
};

/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {string|undefined} State value.
 */
StatemanagerService.prototype.getInitialStringValue = function (key) {
  return this.initialState[key];
};

/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {number|undefined} State value.
 */
StatemanagerService.prototype.getInitialNumberValue = function (key) {
  const value = this.initialState[key];
  if (value === undefined) {
    return undefined;
  }
  return parseFloat(value);
};

/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {boolean|undefined} State value.
 */
StatemanagerService.prototype.getInitialBooleanValue = function (key) {
  const value = this.initialState[key];
  if (value === undefined) {
    return undefined;
  }
  return value === 'true';
};

/**
 * Update the application state with the values in `object`.
 * @param {!Object.<string, string>} object Object.
 */
StatemanagerService.prototype.updateState = function (object) {
  this.ngeoLocation.updateParams(object);
  if (this.useLocalStorage_) {
    for (const key in object) {
      console.assert(key);
      const value = object[key];
      console.assert(value !== undefined);
      window.localStorage[key] = value;
    }
  }
};

/**
 * Delete a parameter
 * @param {string} key Key.
 */
StatemanagerService.prototype.deleteParam = function (key) {
  this.ngeoLocation.deleteParam(key);
  if (this.useLocalStorage_) {
    delete window.localStorage[key];
  }
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoStateManager', [ngeoStatemanagerLocation.name]);
module.service('ngeoStateManager', StatemanagerService);
module.value('ngeoUsedKeyRegexp', [new RegExp('.*')]);

export default module;
