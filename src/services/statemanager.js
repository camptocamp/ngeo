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
   * @type {!Object.<string, *>}
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


  /**
   * @type {Array.<string>}
   */
  this.excludedKeyListForURL = ['theme'];

  // Populate initialState with the application's initial state. The initial
  // state is read from the location URL, or from the local storage if there
  // is no state in the location URL.

  const paramKeys = ngeoLocation.getParamKeys();
  let i, theme;
  const themeRegex = new RegExp(/\/theme\/([^\?\/]*)/);
  const urlPath = ngeoLocation.getPath();
  const locationInitState = {};

  if (paramKeys.length === 0 ||
      (paramKeys.length === 1 && paramKeys[0] == 'debug')) {
    if (this.localStorage.isAvailable()) {
      const count = this.localStorage.getCount();
      for (i = 0; i < count; ++i) {
        const key = this.localStorage.key(i);
        goog.asserts.assert(key !== null);

        this.usedKeyRegexp.some(function(keyRegexp) {
          if (key.match(keyRegexp)) {
            const value = this.getItemFromLocalStorage_(key);
            goog.asserts.assert(value !== null);
            this.initialState[key] = value;

            //Do not copy excluded parameters in the URL
            if (this.excludedKeyListForURL.indexOf(key) < 0) {
              locationInitState[key] = this.initialState[key];
            }
            return true;
          }
        }, this);
      }
      this.ngeoLocation.updateParams(locationInitState);
    }
  } else {
    paramKeys.forEach(function(key) {
      this.usedKeyRegexp.some(function(keyRegexp) {
        if (key.match(keyRegexp)) {
          const value = this.getItemFromLocalStorage_(key);
          if (value !== null) {
            this.initialState[key] = value;
            return true;
          }
        }
      }, this);
    }, this);
    //Retrieve selected theme in url path
    theme = urlPath.match(themeRegex);
    if (theme) {
      this.initialState['theme'] = theme[1];
    }
  }
};


/**
 * Get the item for the given key  from localStorage and try to parse to the appropriate type
 * If it cannot be parsed, the raw value (string) is returned
 *
 * @param  {string} key the localStorage key for the item
 * @return {*} Param value.
 * @private
 */
ngeo.StateManager.prototype.getItemFromLocalStorage_ = function(key) {
  const value = this.localStorage.get(key);
  try {
    return angular.fromJson(value);
  } catch (e) {
    return value;
  }
};


/**
 * Get the item for the given key  from Location and try to parse to the appropriate type
 * If it cannot be parsed, the raw value (string) is returned
 *
 * @param  {string} key the localStorage key for the item
 * @return {*} Param value.
 * @private
 */
ngeo.StateManager.prototype.getItemFromLocation_ = function(key) {
  const value = this.ngeoLocation.getParam(key);
  try {
    return angular.fromJson(value);
  } catch (e) {
    return value;
  }
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {*} State value.
 */
ngeo.StateManager.prototype.getInitialValue = function(key) {
  return this.initialState[key];
};


/**
 * Update the application state with the values in `object`.
 * @param {!Object.<string, string>} object Object.
 */
ngeo.StateManager.prototype.updateState = function(object) {
  const locationObject = {};
  Object.keys(object).forEach(copyWithoutExcludedKeys, this);
  this.ngeoLocation.updateParams(locationObject);
  if (this.localStorage.isAvailable()) {
    let key;
    for (key in object) {
      this.localStorage.set(key, angular.toJson(object[key]));
    }
  }

  function copyWithoutExcludedKeys(key) {
    //Do not copy excluded parameters in the URL
    if (this.excludedKeyListForURL.indexOf(key) < 0) {
      locationObject[key] = object[key];
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
