goog.provide('ngeo.Location');
goog.provide('ngeo.MockLocationProvider');

goog.require('goog.Uri');
goog.require('goog.object');
goog.require('ngeo');
goog.require('ngeo.string');


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
   * @type {!goog.Uri}
   * @private
   */
  this.uri_ = goog.Uri.parse(location);
};


/**
 * Get the location's URI object.
 * @return {!goog.Uri} URI.
 * @export
 */
ngeo.Location.prototype.getUri = function() {
  return this.uri_;
};


/**
 * Get the location's current path.
 * @return {string} The path.
 * @export
 */
ngeo.Location.prototype.getPath = function() {
  return this.uri_.getPath();
};


/**
 * Get the location's URI as a string
 * @param {Object.<string, string>=} opt_params Params.
 * @return {string} The URI.
 * @export
 */
ngeo.Location.prototype.getUriString = function(opt_params) {
  let extendedUri;
  if (opt_params !== undefined) {
    extendedUri = this.uri_.clone();
    extendedUri.getQueryData().extend(opt_params);
  } else {
    extendedUri = this.uri_;
  }
  return extendedUri.toString();
};


/**
 * Check if a param exists in the location's URI.
 * @param {string} key Param key.
 * @return {boolean} True if the param exists.
 * @export
 */
ngeo.Location.prototype.hasParam = function(key) {
  return this.uri_.getQueryData().containsKey(key);
};


/**
 * Check if a param exists in the fragment of the location's URI.
 * @param {string} key Param key.
 * @return {boolean} True if the param exists.
 * @export
 */
ngeo.Location.prototype.hasFragmentParam = function(key) {
  return this.getFragmentUri_().getQueryData().containsKey(key);
};


/**
 * Get a param in the location's URI.
 * @param {string} key Param key.
 * @return {string} Param value.
 * @export
 */
ngeo.Location.prototype.getParam = function(key) {
  return /** @type {string} */ (this.uri_.getQueryData().get(key));
};


/**
 * Get a param from the fragment of the location's URI.
 * @param {string} key Param key.
 * @return {string|undefined} Param value.
 * @export
 */
ngeo.Location.prototype.getFragmentParam = function(key) {
  const val = /** @type {string} */ (this.getFragmentUri_().getQueryData().get(key));
  return val !== undefined ? ngeo.string.urlDecode(val) : undefined;
};


/**
 * Get a param in the location's URI as integer. If the entry does not exist,
 * or if the value can not be parsed as integer, `undefined` is returned.
 * @param {string} key Param key.
 * @return {number|undefined} Param value.
 * @export
 */
ngeo.Location.prototype.getParamAsInt = function(key) {
  const value = /** @type {string} */ (this.getParam(key));
  if (value === undefined) {
    return undefined;
  }
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
  const value = /** @type {string} */ (this.getFragmentParam(key));
  if (value === undefined) {
    return undefined;
  }
  const valueAsInt = parseInt(value, 10);
  return (isNaN(valueAsInt)) ? undefined : valueAsInt;
};


/**
 * Get an array with all existing param's keys in the location's URI.
 * @return {Array.<string>} Param keys.
 * @export
 */
ngeo.Location.prototype.getParamKeys = function() {
  return this.uri_.getQueryData().getKeys();
};


/**
 * Get an array with all existing param's keys from the fragment of the location's URI.
 * @return {Array.<string>} Param keys.
 * @export
 */
ngeo.Location.prototype.getFragmentParamKeys = function() {
  return this.getFragmentUri_().getQueryData().getKeys();
};


/**
 * Get an array with all existing param's keys in the location's URI that start
 * with the given prefix.
 * @param {string} prefix Key prefix.
 * @return {Array.<string>} Param keys.
 * @export
 */
ngeo.Location.prototype.getParamKeysWithPrefix = function(prefix) {
  return this.getParamKeys().filter(key => key.indexOf(prefix) == 0);
};


/**
 * Get an array with all existing param's keys from the fragment of the location's URI
 * that start with the given prefix.
 * @param {string} prefix Key prefix.
 * @return {Array.<string>} Param keys.
 * @export
 */
ngeo.Location.prototype.getFragmentParamKeysWithPrefix = function(prefix) {
  return this.getFragmentParamKeys().filter(key => key.indexOf(prefix) == 0);
};


/**
 * Set or create a param in the location's URI.
 * @param {Object.<string, string>} params Parameters.
 * @export
 */
ngeo.Location.prototype.updateParams = function(params) {
  const qd = this.uri_.getQueryData();
  for (const key in params) {
    qd.set(key, params[key]);
  }
};


/**
 * Set or create a param in the fragment of the location's URI.
 * @param {Object.<string, string>} params Parameters.
 * @export
 */
ngeo.Location.prototype.updateFragmentParams = function(params) {
  const fragmentUri = this.getFragmentUri_();
  const qd = fragmentUri.getQueryData();
  for (const key in params) {
    let val = params[key];
    val = val !== undefined ? ngeo.string.urlEncode(val) : undefined;
    qd.set(key, val);
  }
  this.updateFragmentFromUri_(fragmentUri);
};


/**
 * Delete a param in the location's URI.
 * @param {string} key Param key.
 * @export
 */
ngeo.Location.prototype.deleteParam = function(key) {
  this.uri_.getQueryData().remove(key);
};


/**
 * Delete a param int the fragment of the location's URI.
 * @param {string} key Param key.
 * @export
 */
ngeo.Location.prototype.deleteFragmentParam = function(key) {
  const fragmentUri = this.getFragmentUri_();
  fragmentUri.getQueryData().remove(key);
  this.updateFragmentFromUri_(fragmentUri);
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
  this.uri_.setPath(path);
};


/**
 * Return a {@link goog.Uri} instance where the fragment parameters are set
 * as query parameters.
 * @return {goog.Uri} An uri.
 * @private
 */
ngeo.Location.prototype.getFragmentUri_ = function() {
  const fragment = this.uri_.getFragment();
  const uri = new goog.Uri(null);
  uri.setQueryData(fragment);
  return uri;
};


/**
 * Update the fragment of the Uri with the given uri which contains
 * fragment parameters as query params.
 * @param {goog.Uri} fragmentUri An uri.
 * @private
 */
ngeo.Location.prototype.updateFragmentFromUri_ = function(fragmentUri) {
  const fragment = fragmentUri.getQueryData().toDecodedString();
  this.uri_.setFragment(fragment);
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
