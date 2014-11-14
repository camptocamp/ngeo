goog.provide('ngeo.Location');
goog.provide('ngeo_location_service');

goog.require('goog.Uri');
goog.require('goog.object');
goog.require('ngeo');



/**
 * The ngeo Location type.
 * @constructor
 * @param {Location} location Location.
 * @param {History} history History.
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
 * @param {Object.<string, string>=} opt_params Params.
 * @return {string} The URI.
 */
ngeo.Location.prototype.getUri = function(opt_params) {
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
 * @param {string} key Param key.
 * @return {string} Param value.
 */
ngeo.Location.prototype.getParam = function(key) {
  return /** @type {string} */ (this.uri_.getQueryData().get(key));
};


/**
 * @param {Object.<string, string>} params
 */
ngeo.Location.prototype.updateParams = function(params) {
  var qd = this.uri_.getQueryData();
  goog.object.forEach(params, function(val, key) {
    qd.set(key, val);
  });
};


/**
 * @param {string} key Param key.
 */
ngeo.Location.prototype.deleteParam = function(key) {
  this.uri_.getQueryData().remove(key);
};


/**
 */
ngeo.Location.prototype.refresh = function() {
  this.history_.replaceState(null, '', this.getUri());
};


/**
 * The factory creating the ngeo Location service.
 */
ngeoModule.factory('ngeoLocation', [
  '$rootScope', '$window',
  /**
   * @param {angular.Scope} $rootScope The root scope.
   * @param {angular.$window} $window Angular window service.
   * @return {ngeo.Location} The ngeo location service.
   */
  function($rootScope, $window) {

    var history = $window.history;
    var service = new ngeo.Location($window.location, $window.history);

    var lastUri = service.getUri();
    $rootScope.$watch(function() {
      var newUri = service.getUri();
      if (lastUri !== newUri) {
        $rootScope.$evalAsync(function() {
          lastUri = newUri;
          if (goog.isDef(history)) {
            history.replaceState(null, '', newUri);
          }
          $rootScope.$broadcast('ngeoLocationChange');
        });
      }
    });

    return service;
  }]);
