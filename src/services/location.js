goog.provide('ngeo.Location');
goog.provide('ngeo.MockLocationProvider');

goog.require('ngeo');


/**
 * @typedef {function(angular.$locationProvider)}
 */
ngeo.MockLocationProvider;


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
 * This file also provides an ngeo.mockLocationProvider function that you can
 * use to mock Angular's $location provider and make it possible to use both
 * ngeoLocation and ng-include.
 *
 *     app.module.config(ngeo.mockLocationProvider);
 *
 * The ngeo Location type.
 *
 * See our live example: [../examples/permalink.html](../examples/permalink.html)
 *
 * @param {Location} location Location.
 * @param {History} history History.
 * @constructor
 * @struct
 * @ngdoc service
 * @ngname ngeoLocation
 */
ngeo.Location = function(location, history) {
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
  this.queryData_ = ngeo.utils.decodeQueryString(location.search);

  /**
   * @type {!Object.<string, string>}
   * @private
   */
  this.fragment_ = ngeo.utils.decodeQueryString(location.hash);
};


/**
 * Get the location's current path.
 * @return {string|undefined} The path.
 * @export
 */
ngeo.Location.prototype.getPath = function() {
  return this.path_;
};


/**
 * Get the location's URI as a string
 * @return {string} The URI.
 * @export
 */
ngeo.Location.prototype.getUriString = function() {
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

  const encodedQueryData = ngeo.utils.encodeQueryString(this.queryData_);
  if (encodedQueryData.length > 0) {
    out.push('?', encodedQueryData);
  }

  const encodedFragment = ngeo.utils.encodeQueryString(this.fragment_);
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
ngeo.Location.prototype.hasParam = function(key) {
  return key in this.queryData_;
};


/**
 * Check if a param exists in the fragment of the location's URI.
 * @param {string} key Param key.
 * @return {boolean} True if the param exists.
 * @export
 */
ngeo.Location.prototype.hasFragmentParam = function(key) {
  return key in this.fragment_;
};


/**
 * Get a param in the location's URI.
 * @param {string} key Param key.
 * @return {string|undefined} Param value.
 * @export
 */
ngeo.Location.prototype.getParam = function(key) {
  return this.queryData_[key];
};


/**
 * Get a param from the fragment of the location's URI.
 * @param {string} key Param key.
 * @return {string|undefined} Param value.
 * @export
 */
ngeo.Location.prototype.getFragmentParam = function(key) {
  return this.fragment_[key];
};


/**
 * Get a param in the location's URI as integer. If the entry does not exist,
 * or if the value can not be parsed as integer, `undefined` is returned.
 * @param {string} key Param key.
 * @return {number|undefined} Param value.
 * @export
 */
ngeo.Location.prototype.getParamAsInt = function(key) {
  const value = this.getParam(key);
  if (value === undefined) {
    return undefined;
  }
  goog.asserts.assertString(value);
  const valueAsInt = parseInt(value, 10);
  return (isNaN(valueAsInt)) ? undefined : valueAsInt;
};


/**
 * Get a param from the fragment of the location's URI as integer. If the entry
 * does not exist, or if the value can not be parsed as integer, `undefined` is returned.
 * @param {string} key Param key.
 * @return {number|undefined} Param value.
 * @export
 */
ngeo.Location.prototype.getFragmentParamAsInt = function(key) {
  const value = this.getFragmentParam(key);
  if (value === undefined) {
    return undefined;
  }
  goog.asserts.assertString(value);
  const valueAsInt = parseInt(value, 10);
  return (isNaN(valueAsInt)) ? undefined : valueAsInt;
};


/**
 * Get an array with all existing param's keys in the location's URI.
 * @return {Array.<string>} Param keys.
 * @export
 */
ngeo.Location.prototype.getParamKeys = function() {
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
ngeo.Location.prototype.getFragmentParamKeys = function() {
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
ngeo.Location.prototype.getParamKeysWithPrefix = function(prefix) {
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
ngeo.Location.prototype.getFragmentParamKeysWithPrefix = function(prefix) {
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
ngeo.Location.prototype.updateParams = function(params) {
  for (const key in params) {
    this.queryData_[key] = params[key];
  }
};


/**
 * Set or create a param in the fragment of the location's URI.
 * @param {!Object.<string, string>} params Parameters.
 * @export
 */
ngeo.Location.prototype.updateFragmentParams = function(params) {
  for (const key in params) {
    this.fragment_[key] = params[key];
  }
};


/**
 * Delete a param in the location's URI.
 * @param {string} key Param key.
 * @export
 */
ngeo.Location.prototype.deleteParam = function(key) {
  delete this.queryData_[key];
};


/**
 * Delete a param int the fragment of the location's URI.
 * @param {string} key Param key.
 * @export
 */
ngeo.Location.prototype.deleteFragmentParam = function(key) {
  delete this.fragment_[key];
};


/**
 * Refresh the the location's URI.
 * @export
 */
ngeo.Location.prototype.refresh = function() {
  this.history_.replaceState(null, '', this.getUriString());
};


/**
 * Set a new path for this location.
 * @param {string} path Path.
 * @export
 */
ngeo.Location.prototype.setPath = function(path) {
  this.path_ = path;
};


/**
 * The factory creating the ngeo Location service.
 *
 * @param {angular.Scope} $rootScope The root scope.
 * @param {angular.$window} $window Angular window service.
 * @return {ngeo.Location} The ngeo location service.
 * @ngInject
 */
ngeo.LocationFactory = function($rootScope, $window) {
  const history = $window.history;
  const service = new ngeo.Location($window.location, $window.history);

  let lastUri = service.getUriString();
  $rootScope.$watch(() => {
    const newUri = service.getUriString();
    if (lastUri !== newUri) {
      $rootScope.$evalAsync(() => {
        lastUri = newUri;
        if (history !== undefined && history.replaceState !== undefined) {
          history.replaceState(null, '', newUri);
        }
        $rootScope.$broadcast('ngeoLocationChange');
      });
    }
  });

  return service;
};


ngeo.module.factory('ngeoLocation', ngeo.LocationFactory);


/**
 * A function that changes Angular's $location provider to avoid problem
 * when both ngeoLocation and $location are used in an application. This
 * is how you can use that function in an application:
 *
 * app.module.config(ngeo.mockLocationProvider);
 *
 * @param {angular.$locationProvider} $locationProvider Angular location
 *     provider.
 * @ngInject
 */
ngeo.mockLocationProvider = function($locationProvider) {
  /**
   * @return {angular.$location} Mock object for Angular location service.
   */
  $locationProvider['$get'] = function() {
    const locationMock = /** @type {angular.$location} */ ({
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
