/**
 */
import angular from 'angular';
import googAsserts from 'goog/asserts.js';
import ngeoUtils from 'ngeo/utils.js';

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
 * This file also provides an ngeo.statemanager.Location.MockProvider function that you can
 * use to mock Angular's $location provider and make it possible to use both
 * ngeoLocation and ng-include.
 *
 *     app.module.config(ngeo.statemanager.Location.MockProvider);
 *
 * The ngeo Location type.
 *
 * See our live example: [../examples/permalink.html](../examples/permalink.html)
 *
 * @param {Location} location Location.
 * @param {History} history History.
 * @constructor
 * @ngdoc service
 * @ngname ngeoLocation
 */
function Location(location, history) {
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
  this.queryData_ = ngeoUtils.decodeQueryString(location.search);

  /**
   * @type {!Object.<string, string>}
   * @private
   */
  this.fragment_ = ngeoUtils.decodeQueryString(location.hash);
}


/**
 * @param {History} history History.
 * @param {string} state State.
 */
exports.replaceState = function(history, state) {
  try {
    history.replaceState(null, '', state);
  } catch (error) {
    // replaceState fails on some browser if the domain in the state
    // is not the same as location.origin
  }
};


/**
 * Get the location's current path.
 * @return {string|undefined} The path.
 * @export
 */
Location.prototype.getPath = function() {
  return this.path_;
};


/**
 * Get the location's URI as a string
 * @return {string} The URI.
 * @export
 */
Location.prototype.getUriString = function() {
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

  const encodedQueryData = ngeoUtils.encodeQueryString(this.queryData_);
  if (encodedQueryData.length > 0) {
    out.push('?', encodedQueryData);
  }

  const encodedFragment = ngeoUtils.encodeQueryString(this.fragment_);
  if (encodedFragment.length > 0) {
    out.push('#', encodedFragment);
  }
  return out.join('');
};


/**
 * Check if a param exists in the location's URI.
 * @param {string} key Param key.
 * @return {boolean} True if the param exists.
 * @export
 */
Location.prototype.hasParam = function(key) {
  return key in this.queryData_;
};


/**
 * Check if a param exists in the fragment of the location's URI.
 * @param {string} key Param key.
 * @return {boolean} True if the param exists.
 * @export
 */
Location.prototype.hasFragmentParam = function(key) {
  return key in this.fragment_;
};


/**
 * Get a param in the location's URI.
 * @param {string} key Param key.
 * @return {string|undefined} Param value.
 * @export
 */
Location.prototype.getParam = function(key) {
  return this.queryData_[key];
};


/**
 * Get a param from the fragment of the location's URI.
 * @param {string} key Param key.
 * @return {string|undefined} Param value.
 * @export
 */
Location.prototype.getFragmentParam = function(key) {
  return this.fragment_[key];
};


/**
 * Get a param in the location's URI as integer. If the entry does not exist,
 * or if the value can not be parsed as integer, `undefined` is returned.
 * @param {string} key Param key.
 * @return {number|undefined} Param value.
 * @export
 */
Location.prototype.getParamAsInt = function(key) {
  const value = this.getParam(key);
  if (value === undefined) {
    return undefined;
  }
  googAsserts.assertString(value);
  const valueAsInt = parseInt(value, 10);
  return (isNaN(valueAsInt)) ? undefined : valueAsInt;
};


/**
 * Get a param in the location's URI as a floating point number.
 * If the entry does not exist, or if the value can not be parsed,
 * `undefined` is returned.
 * @param {string} key Param key.
 * @return {number|undefined} Param value.
 * @export
 */
Location.prototype.getParamAsFloat = function(key) {
  const value = this.getParam(key);
  if (value === undefined) {
    return undefined;
  }
  googAsserts.assertString(value);
  const valueAsFloat = parseFloat(value);
  return isNaN(valueAsFloat) ? undefined : valueAsFloat;
};


/**
 * Get a param from the fragment of the location's URI as integer. If the entry
 * does not exist, or if the value can not be parsed as integer, `undefined` is returned.
 * @param {string} key Param key.
 * @return {number|undefined} Param value.
 * @export
 */
Location.prototype.getFragmentParamAsInt = function(key) {
  const value = this.getFragmentParam(key);
  if (value === undefined) {
    return undefined;
  }
  googAsserts.assertString(value);
  const valueAsInt = parseInt(value, 10);
  return (isNaN(valueAsInt)) ? undefined : valueAsInt;
};


/**
 * Get an array with all existing param's keys in the location's URI.
 * @return {Array.<string>} Param keys.
 * @export
 */
Location.prototype.getParamKeys = function() {
  const keys = [];
  for (const key in this.queryData_) {
    keys.push(key);
  }
  return keys;
};


/**
 * Get an array with all existing param's keys from the fragment of the location's URI.
 * @return {Array.<string>} Param keys.
 * @export
 */
Location.prototype.getFragmentParamKeys = function() {
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
 * @export
 */
Location.prototype.getParamKeysWithPrefix = function(prefix) {
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
 * @export
 */
Location.prototype.getFragmentParamKeysWithPrefix = function(prefix) {
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
 * @export
 */
Location.prototype.updateParams = function(params) {
  for (const key in params) {
    this.queryData_[key] = params[key];
  }
};


/**
 * Set or create a param in the fragment of the location's URI.
 * @param {!Object.<string, string>} params Parameters.
 * @export
 */
Location.prototype.updateFragmentParams = function(params) {
  for (const key in params) {
    this.fragment_[key] = params[key];
  }
};


/**
 * Delete a param in the location's URI.
 * @param {string} key Param key.
 * @export
 */
Location.prototype.deleteParam = function(key) {
  delete this.queryData_[key];
};


/**
 * Delete a param int the fragment of the location's URI.
 * @param {string} key Param key.
 * @export
 */
Location.prototype.deleteFragmentParam = function(key) {
  delete this.fragment_[key];
};


/**
 * Refresh the the location's URI.
 * @export
 */
Location.prototype.refresh = function() {
  exports.replaceState(this.history_, this.getUriString());
};


/**
 * Set a new path for this location.
 * @param {string} path Path.
 * @export
 */
Location.prototype.setPath = function(path) {
  this.path_ = path;
};


/**
 * The factory creating the ngeo Location service.
 *
 * @param {angular.IScope} $rootScope The root scope.
 * @param {angular.IWindowService} $window Angular window service.
 * @return {import("ngeo/statemanager/Location.js").default} The ngeo location service.
 * @ngInject
 */
function LocationFactory($rootScope, $window) {
  const history = $window.history;
  const service = new exports($window.location, $window.history);

  let lastUri = service.getUriString();
  $rootScope.$watch(() => {
    const newUri = service.getUriString();
    if (lastUri !== newUri) {
      $rootScope.$evalAsync(() => {
        lastUri = newUri;
        if (history !== undefined && history.replaceState !== undefined) {
          exports.replaceState(history, newUri);
        }
        $rootScope.$broadcast('ngeoLocationChange');
      });
    }
  });

  return service;
}

/**
 * A function that changes Angular's $location provider to avoid problem
 * when both ngeoLocation and $location are used in an application. This
 * is how you can use that function in an application:
 *
 * app.module.config(ngeo.statemanager.Location.MockProvider);
 *
 * @param {angular.ILocationProvider} $locationProvider Angular location
 *     provider.
 * @ngInject
 */
exports.MockProvider = function($locationProvider) {
  /**
   * @return {angular.ILocationService} Mock object for Angular location service.
   */
  $locationProvider['$get'] = function() {
    const locationMock = /** @type {angular.ILocationService} */ ({
      /**
       * @return {string} Absolute URL.
       */
      absUrl() {
        return '';
      },
      /**
       * @param {string=} opt_path Path.
       * @return {string} Hash.
       */
      hash(opt_path) {
        return opt_path !== undefined ? this : '';
      },
      /**
       * @return {string} Host.
       */
      host() {
        return '';
      },
      /**
       * @param {string=} opt_path Path.
       * @return {string} Path.
       */
      path(opt_path) {
        return opt_path !== undefined ? this : '';
      },
      /**
       * @return {number} Port.
       */
      port() {
        return 0;
      },
      /**
       * @return {string} Protocol.
       */
      protocol() {
        return '';
      },
      replace() {
      },
      /**
       * @param {string=} opt_search Search.
       * @param {Object=} opt_paramValue Parameters.
       * @return {Object} Search.
       */
      search(opt_search, opt_paramValue) {
        return opt_search !== undefined ? this : {};
      },
      /**
       * @param {string=} opt_url URL.
       * @return {string} URL.
       */
      url(opt_url) {
        return '';
      }
    });
    return locationMock;
  };
};


/**
 * @type {!angular.IModule}
 * FIXME add utils dependencies.
 * FIXME What about Mockup provider ?
 */
const module = angular.module('ngeoLocation', []);
module.factory('ngeoLocation', LocationFactory);


export default module;
