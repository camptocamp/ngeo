import angular from 'angular';
import {encodeQueryString, decodeQueryString} from 'ngeo/utils.js';

/**
 * Provides a service for interacting with the URL in the
 * browser address bar.
 *
 * WARNING: because of a bug in Angular this service is not compatible with
 * the $location service. This further means that service is not compatible
 * with the $anchorScroll and $route services, and with the ng-include and
 * ng-view directives (which are based on the $anchorScroll and $route
 * services). See <https://github.com/angular/angular.js/issues/1417>.
 *
 * See our live example: [../examples/permalink.html](../examples/permalink.html)
 *
 * @param {Location} location Location.
 * @param {History} history History.
 * @constructor
 * @ngdoc service
 * @ngname ngeoLocation
 * @hidden
 */
export function StatemanagerLocation(location, history) {
  /**
   * @type {History}
   * @private
   */
  this.history_ = history;

  /**
   * @type {string|undefined}
   * @private
   */
  this.schema_ = location.protocol.substring(0, location.protocol.length - 1);

  /**
   * @type {string|undefined}
   * @private
   */
  this.domain_ = location.hostname;

  /**
   * @type {number|undefined}
   * @private
   */
  this.port_ = location.port ? parseInt(location.port, 10) : undefined;

  /**
   * @type {string|undefined}
   * @private
   */
  this.path_ = location.pathname;

  /**
   * @type {!Object.<string, string>}
   * @private
   */
  this.queryData_ = decodeQueryString(location.search);

  /**
   * @type {!Object.<string, string>}
   * @private
   */
  this.fragment_ = decodeQueryString(location.hash);
}

/**
 * @param {History} history History.
 * @param {string} state State.
 * @private
 * @hidden
 */
function replaceState(history, state) {
  try {
    history.replaceState(null, '', state);
  } catch (error) {
    // replaceState fails on some browser if the domain in the state
    // is not the same as location.origin
  }
}

/**
 * Get the location's current path.
 * @return {string|undefined} The path.
 */
StatemanagerLocation.prototype.getPath = function () {
  return this.path_;
};

/**
 * Get the location's URI as a string
 * @return {string} The URI.
 */
StatemanagerLocation.prototype.getUriString = function () {
  const out = [];

  if (this.schema_) {
    out.push(this.schema_, ':');
  }

  if (this.domain_ || this.schema_ === 'file') {
    out.push('//');

    out.push(this.domain_);

    if (this.port_ !== undefined) {
      out.push(':', String(this.port_));
    }
  }

  if (this.path_) {
    if (this.domain_ && this.path_.charAt(0) !== '/') {
      out.push('/');
    }
    out.push(this.path_);
  }

  const encodedQueryData = encodeQueryString(this.queryData_);
  if (encodedQueryData.length > 0) {
    out.push('?', encodedQueryData);
  }

  const encodedFragment = encodeQueryString(this.fragment_);
  if (encodedFragment.length > 0) {
    out.push('#', encodedFragment);
  }
  return out.join('');
};

/**
 * Check if a param exists in the location's URI.
 * @param {string} key Param key.
 * @return {boolean} True if the param exists.
 */
StatemanagerLocation.prototype.hasParam = function (key) {
  return key in this.queryData_;
};

/**
 * Check if a param exists in the fragment of the location's URI.
 * @param {string} key Param key.
 * @return {boolean} True if the param exists.
 */
StatemanagerLocation.prototype.hasFragmentParam = function (key) {
  return key in this.fragment_;
};

/**
 * Get a param in the location's URI.
 * @param {string} key Param key.
 * @return {string|undefined} Param value.
 */
StatemanagerLocation.prototype.getParam = function (key) {
  return this.queryData_[key];
};

/**
 * Get a param from the fragment of the location's URI.
 * @param {string} key Param key.
 * @return {string|undefined} Param value.
 */
StatemanagerLocation.prototype.getFragmentParam = function (key) {
  return this.fragment_[key];
};

/**
 * Get a param in the location's URI as integer. If the entry does not exist,
 * or if the value can not be parsed as integer, `undefined` is returned.
 * @param {string} key Param key.
 * @return {number|undefined} Param value.
 */
StatemanagerLocation.prototype.getParamAsInt = function (key) {
  const value = this.getParam(key);
  if (value === undefined) {
    return undefined;
  }
  console.assert(typeof value == 'string');
  const valueAsInt = parseInt(value, 10);
  return isNaN(valueAsInt) ? undefined : valueAsInt;
};

/**
 * Get a param in the location's URI as a floating point number.
 * If the entry does not exist, or if the value can not be parsed,
 * `undefined` is returned.
 * @param {string} key Param key.
 * @return {number|undefined} Param value.
 */
StatemanagerLocation.prototype.getParamAsFloat = function (key) {
  const value = this.getParam(key);
  if (value === undefined) {
    return undefined;
  }
  console.assert(typeof value == 'string');
  const valueAsFloat = parseFloat(value);
  return isNaN(valueAsFloat) ? undefined : valueAsFloat;
};

/**
 * Get a param from the fragment of the location's URI as integer. If the entry
 * does not exist, or if the value can not be parsed as integer, `undefined` is returned.
 * @param {string} key Param key.
 * @return {number|undefined} Param value.
 */
StatemanagerLocation.prototype.getFragmentParamAsInt = function (key) {
  const value = this.getFragmentParam(key);
  if (value === undefined) {
    return undefined;
  }
  console.assert(typeof value == 'string');
  const valueAsInt = parseInt(value, 10);
  return isNaN(valueAsInt) ? undefined : valueAsInt;
};

/**
 * Get an array with all existing param's keys in the location's URI.
 * @return {Array.<string>} Param keys.
 */
StatemanagerLocation.prototype.getParamKeys = function () {
  const keys = [];
  for (const key in this.queryData_) {
    keys.push(key);
  }
  return keys;
};

/**
 * Get an array with all existing param's keys from the fragment of the location's URI.
 * @return {Array.<string>} Param keys.
 */
StatemanagerLocation.prototype.getFragmentParamKeys = function () {
  const keys = [];
  for (const key in this.fragment_) {
    keys.push(key);
  }
  return keys;
};

/**
 * Get an array with all existing param's keys in the location's URI that start
 * with the given prefix.
 * @param {string} prefix Key prefix.
 * @return {Array.<string>} Param keys.
 */
StatemanagerLocation.prototype.getParamKeysWithPrefix = function (prefix) {
  const keys = [];
  for (const key in this.queryData_) {
    if (key.indexOf(prefix) == 0) {
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Get an array with all existing param's keys from the fragment of the location's URI
 * that start with the given prefix.
 * @param {string} prefix Key prefix.
 * @return {Array.<string>} Param keys.
 */
StatemanagerLocation.prototype.getFragmentParamKeysWithPrefix = function (prefix) {
  const keys = [];
  for (const key in this.fragment_) {
    if (key.indexOf(prefix) == 0) {
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Set or create a param in the location's URI.
 * @param {!Object.<string, string>} params Parameters.
 */
StatemanagerLocation.prototype.updateParams = function (params) {
  for (const key in params) {
    this.queryData_[key] = params[key];
  }
};

/**
 * Set or create a param in the fragment of the location's URI.
 * @param {!Object.<string, string>} params Parameters.
 */
StatemanagerLocation.prototype.updateFragmentParams = function (params) {
  for (const key in params) {
    this.fragment_[key] = params[key];
  }
};

/**
 * Delete a param in the location's URI.
 * @param {string} key Param key.
 */
StatemanagerLocation.prototype.deleteParam = function (key) {
  delete this.queryData_[key];
};

/**
 * Delete a param int the fragment of the location's URI.
 * @param {string} key Param key.
 */
StatemanagerLocation.prototype.deleteFragmentParam = function (key) {
  delete this.fragment_[key];
};

/**
 * Refresh the the location's URI.
 */
StatemanagerLocation.prototype.refresh = function () {
  replaceState(this.history_, this.getUriString());
};

/**
 * Set a new path for this location.
 * @param {string} path Path.
 */
StatemanagerLocation.prototype.setPath = function (path) {
  this.path_ = path;
};

/**
 * The factory creating the ngeo Location service.
 *
 * @param {angular.IScope} $rootScope The root scope.
 * @param {angular.IWindowService} $window Angular window service.
 * @return {StatemanagerLocation} The ngeo location service.
 * @ngInject
 * @private
 * @hidden
 */
function LocationFactory($rootScope, $window) {
  const history = $window.history;
  const service = new StatemanagerLocation($window.location, $window.history);

  let lastUri = service.getUriString();
  $rootScope.$watch(() => {
    const newUri = service.getUriString();
    if (lastUri !== newUri) {
      $rootScope.$evalAsync(() => {
        lastUri = newUri;
        if (history !== undefined && history.replaceState !== undefined) {
          replaceState(history, newUri);
        }
        $rootScope.$broadcast('ngeoLocationChange');
      });
    }
  });

  return service;
}

/**
 * @type {!angular.IModule}
 * @hidden
 * FIXME add utils dependencies.
 */
const module = angular.module('ngeoLocation', []);
module.factory('ngeoLocation', LocationFactory);

export default module;
