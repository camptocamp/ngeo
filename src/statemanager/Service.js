// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';

/**
 * Provides a service for managing the application state.
 * The application state is written to both the URL and the local storage.
 * @hidden
 */
export class StatemanagerService {
  /**
   * @param {import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo location service.
   * @param {RegExp[]} ngeoUsedKeyRegexp regexp used to identify the used keys.
   * @ngInject
   */
  constructor(ngeoLocation, ngeoUsedKeyRegexp) {
    /**
     * Object representing the application's initial state.
     * @type {Object<string, string>}
     */
    this.initialState = {};

    /**
     * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
     */
    this.ngeoLocation = ngeoLocation;

    /**
     * @type {RegExp[]}
     */
    this.usedKeyRegexp = ngeoUsedKeyRegexp;

    /**
     * @type {boolean}
     * @private
     */
    this.useLocalStorage_ = false;

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
            return false;
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
          return false;
        });
      });
    }
  }

  /**
   * @param {boolean} value Use localStorage
   * @return {boolean} localStorage will be used.
   */
  setUseLocalStorage(value) {
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
  }

  /**
   * Get the state value for `key`.
   * @param {string} key State key.
   * @return {string|undefined} State value.
   */
  getInitialStringValue(key) {
    return this.initialState[key];
  }

  /**
   * Get the state value for `key`.
   * @param {string} key State key.
   * @return {number|undefined} State value.
   */
  getInitialNumberValue(key) {
    const value = this.initialState[key];
    if (value === undefined) {
      return undefined;
    }
    return parseFloat(value);
  }

  /**
   * Get the state value for `key`.
   * @param {string} key State key.
   * @return {boolean|undefined} State value.
   */
  getInitialBooleanValue(key) {
    const value = this.initialState[key];
    if (value === undefined) {
      return undefined;
    }
    return value === 'true';
  }

  /**
   * Update the application state with the values in `object`.
   * @param {Object<string, string>} object Object.
   */
  updateState(object) {
    this.ngeoLocation.updateParams(object);
    if (this.useLocalStorage_) {
      for (const key in object) {
        console.assert(key);
        const value = object[key];
        console.assert(value !== undefined);
        window.localStorage[key] = value;
      }
    }
  }

  /**
   * Delete a parameter
   * @param {string} key Key.
   */
  deleteParam(key) {
    this.ngeoLocation.deleteParam(key);
    if (this.useLocalStorage_) {
      delete window.localStorage[key];
    }
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoStateManager', [ngeoStatemanagerLocation.name]);
module.service('ngeoStateManager', StatemanagerService);
module.value('ngeoUsedKeyRegexp', [new RegExp('.*')]);

export default module;
