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
 * @return {!goog.Uri}
 */
ngeo.Location.prototype.getUri = function() {
  return this.uri_;
};


/**
 * Get the location's current path.
 * @return {string} The path.
 */
ngeo.Location.prototype.getPath = function() {
  return this.uri_.getPath();
};


/**
 * Get the location's URI as a string
 * @param {Object.<string, string>=} opt_params Params.
 * @return {string} The URI.
 */
ngeo.Location.prototype.getUriString = function(opt_params) {
  var extendedUri;
  if (goog.isDef(opt_params)) {
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
 */
ngeo.Location.prototype.hasParam = function(key) {
  return this.uri_.getQueryData().containsKey(key);
};


/**
 * Get a param in the location's URI.
 * @param {string} key Param key.
 * @return {string} Param value.
 */
ngeo.Location.prototype.getParam = function(key) {
  return /** @type {string} */ (this.uri_.getQueryData().get(key));
};


/**
 * Get an array with all existing param's keys in the location's URI.
 * @return {Array.<string>} Param keys.
 */
ngeo.Location.prototype.getParamKeys = function() {
  return this.uri_.getQueryData().getKeys();
};


/**
 * Set or create a param in the location's URI.
 * @param {Object.<string, string>} params
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
 */
ngeo.Location.prototype.deleteParam = function(key) {
  this.uri_.getQueryData().remove(key);
};


/**
 * Refresh the the location's URI.
 */
ngeo.Location.prototype.refresh = function() {
  this.history_.replaceState(null, '', this.getUriString());
};


/**
 * Set a new path for this location.
 * @param {string} path Path.
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
        if (goog.isDef(history) && goog.isDef(history.replaceState)) {
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
      absUrl: function() {
        return '';
      },
      hash: function(opt_path) {
        return goog.isDef(opt_path) ? this : '';
      },
      host: function() {
        return '';
      },
      path: function(opt_path) {
        return goog.isDef(opt_path) ? this : '';
      },
      port: function() {
        return 0;
      },
      protocol: function() {
        return '';
      },
      replace: function() {
      },
      search: function(opt_search, opt_paramValue) {
        return goog.isDef(opt_search) ? this : {};
      },
      url: function(opt_url) {
        return '';
      }
    });
    return locationMock;
  };
};
