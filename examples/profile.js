goog.provide('profile');


goog.require('ngeo');
goog.require('ngeo.profileDirective');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);



/**
 * @constructor
 * @param {angular.$http} $http The $http angular service.
 * @param {angular.Scope} $scope The $scope angular service.
 */
app.MainController = function($http, $scope) {

  this['profilePoisData'] = [
    {sort: 1, dist: 1000, title: 'First POI', id: 12345},
    {sort: 2, dist: 3000, title: 'Second POI', id: 12346}
  ];

  $http.get('data/profile.json').then(angular.bind(this, function(resp) {
    this['profileData'] = resp.data['profile'];
  }));


  /**
   * Factory for creating simple getter functions for extractors.
   * If the value is in a child property, the opt_childKey must be defined.
   * The type parameter is used by closure to type the returned function.
   * @param {T} type An object of the expected result type.
   * @param {string} key Key used for retrieving the value.
   * @param {string=} opt_childKey Key of a child object.
   * @template T
   * @return {function(Object): T}
   */
  var typedFunctionsFactory = function(type, key, opt_childKey) {
    return (
        /**
         * @param {Object} item
         * @return {T}
         * @template T
         */
        function(item) {
          if (opt_childKey !== undefined) {
            item = item[opt_childKey];
          }
          return item[key];
        });
  };

  var types = {
    number: 1,
    string: ''
  };


  /**
   * @type {ngeox.profile.ElevationExtractor}
   */
  var elevationExtractor = {
    z: typedFunctionsFactory(types.number, 'mnt', 'values'),
    dist: typedFunctionsFactory(types.number, 'dist')
  };


  /**
   * @type {ngeox.profile.PoiExtractor}
   */
  var poiExtractor = {
    sort: typedFunctionsFactory(types.number, 'sort'),
    id: typedFunctionsFactory(types.string, 'id'),
    dist: typedFunctionsFactory(types.number, 'dist'),
    title: typedFunctionsFactory(types.string, 'title'),
    /**
      * @param {Object} item
      * @param {number=} opt_z
      * @return {number}
      */
    z: function(item, opt_z) {
      if (opt_z !== undefined) {
        item['z'] = opt_z;
      }
      return item['z'];
    }
  };


  // Using closures for hoverCallback and outCallback since
  // wrapping in angular.bind leads to a closure error.
  // See PR https://github.com/google/closure-compiler/pull/867
  var that = this;

  /**
   * @param {Object} point
   */
  var hoverCallback = function(point) {
    // An item in the list of points given to the profile.
    that['point'] = point;
  };

  var outCallback = function() {
    that['point'] = null;
  };


  this['profileOptions'] = {
    elevationExtractor: elevationExtractor,
    poiExtractor: poiExtractor,
    hoverCallback: hoverCallback,
    outCallback: outCallback
  };


  this['point'] = null;
};


app.module.controller('MainController', app.MainController);
