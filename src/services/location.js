goog.provide('ngeo.Location');
goog.provide('ngeo.MockLocationProvider');

goog.require('goog.Uri');
goog.require('goog.object');
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
 * See our live example: {@link ../examples/permalink.html}
 *
 * @param {Location} location Location.
 * @param {History} history History.
 * @constructor
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
  var extendedUri;
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
 * Get a param in the location's URI.
 * @param {string} key Param key.
 * @return {string} Param value.
 * @export
 */
ngeo.Location.prototype.getParam = function(key) {
  return /** @type {string} */ (this.uri_.getQueryData().get(key));
};


/**
 * Get a param in the location's URI as integer. If the entry does not exist,
 * or if the value can not be parsed as integer, `undefined` is returned.
 * @param {string} key Param key.
 * @return {number|undefined} Param value.
 * @export
 */
ngeo.Location.prototype.getParamAsInt = function(key) {
  if (!this.hasParam(key)) {
    return undefined;
  }
  var value = /** @type {string} */ (this.uri_.getQueryData().get(key));
  var valueAsInt = parseInt(value, 10);
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
 * Get an array with all existing param's keys in the location's URI that start
 * with the given prefix.
 * @param {string} prefix Key prefix.
 * @return {Array.<string>} Param keys.
 * @export
 */
ngeo.Location.prototype.getParamKeysWithPrefix = function(prefix) {
  return this.uri_.getQueryData().getKeys().filter(function(key) {
    return key.indexOf(prefix) == 0;
  });
};


/**
 * Set or create a param in the location's URI.
 * @param {Object.<string, string>} params Parameters.
 * @export
 */
ngeo.Location.prototype.updateParams = function(params) {
  var qd = this.uri_.getQueryData();
  goog.object.forEach(params, function(val, key) {
    qd.set(key, val);
  });
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
 * The factory creating the ngeo Location service.
 *
 * @param {angular.Scope} $rootScope The root scope.
 * @param {angular.$window} $window Angular window service.
 * @return {ngeo.Location} The ngeo location service.
 * @ngInject
 */
ngeo.LocationFactory = function($rootScope, $window) {
  var history = $window.history;
  var service = new ngeo.Location($window.location, $window.history);

  var lastUri = service.getUriString();
  $rootScope.$watch(function() {
    var newUri = service.getUriString();
    if (lastUri !== newUri) {
      $rootScope.$evalAsync(function() {
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
    var locationMock = /** @type {angular.$location} */ ({
      /**
       * @return {string} Absolute URL.
       */
      absUrl: function() {
        return '';
      },
      /**
       * @param {string=} opt_path Path.
       * @return {string} Hash.
       */
      hash: function(opt_path) {
        return opt_path !== undefined ? this : '';
      },
      /**
       * @return {string} Host.
       */
      host: function() {
        return '';
      },
      /**
       * @param {string=} opt_path Path.
       * @return {string} Path.
       */
      path: function(opt_path) {
        return opt_path !== undefined ? this : '';
      },
      /**
       * @return {number} Port.
       */
      port: function() {
        return 0;
      },
      /**
       * @return {string} Protocol.
       */
      protocol: function() {
        return '';
      },
      replace: function() {
      },
      /**
       * @param {string=} opt_search Search.
       * @param {Object=} opt_paramValue Parameters.
       * @return {Object} Search.
       */
      search: function(opt_search, opt_paramValue) {
        return opt_search !== undefined ? this : {};
      },
      /**
       * @param {string=} opt_url URL.
       * @return {string} URL.
       */
      url: function(opt_url) {
        return '';
      }
    });
    return locationMock;
  };
};
