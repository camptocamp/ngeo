goog.provide('ngeo.StateManager');

goog.require('goog.asserts');
goog.require('goog.storage.mechanism.HTML5LocalStorage');
goog.require('ngeo');
goog.require('ngeo.Location');


/**
 * Provides a service for managing the application state.
 * The application state is written to both the URL and the local storage.
 * @constructor
 * @struct
 * @param {ngeo.Location} ngeoLocation ngeo location service.
 * @ngInject
 */
ngeo.StateManager = function(ngeoLocation) {

  /**
   * Object representing the application's initial state.
   * @type {!Object.<string ,string>}
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


  /**
   * @type {Array.<string>}
   */
  this.excludedKeyListForURL = ['theme'];

  // Populate initialState with the application's initial state. The initial
  // state is read from the location URL, or from the local storage if there
  // is no state in the location URL.

  const paramKeys = ngeoLocation.getParamKeys();
  let i, key, theme;
  const themeRegex = new RegExp(/\/theme\/([^\?\/]*)/);
  const urlPath = ngeoLocation.getPath();
  const locationInitState = {};

  if (paramKeys.length === 0 ||
      (paramKeys.length === 1 && paramKeys[0] == 'debug')) {
    if (this.localStorage.isAvailable()) {
      const count = this.localStorage.getCount();
      for (i = 0; i < count; ++i) {
        key = this.localStorage.key(i);
        goog.asserts.assert(key !== null);
        this.initialState[key] = this.getItemFromLocalStorage_(key);

        //Do not copy excluded parameters in the URL
        if (this.excludedKeyListForURL.indexOf(key) < 0) {
          locationInitState[key] = this.initialState[key];
        }
      }
      this.ngeoLocation.updateParams(locationInitState);
    }
  } else {
    for (i = 0; i < paramKeys.length; ++i) {
      key = paramKeys[i];
      this.initialState[key] = this.getItemFromLocation_(key);
    }
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
