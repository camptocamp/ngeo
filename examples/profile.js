goog.provide('profile_example');


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

  $http.get('data/profile.json').then(angular.bind(this, function(resp) {
    this['profileData'] = resp.data['profile'];
  }));

  var profileOptions = {
    extractor: {
      z: function(item) { return item['values']['mnt']; },
      dist: function(item) { return item['dist']; }
    },
    hoverCallback: angular.bind(this, function(point) {
      // An item in the list of points given to the profile.
      this['point'] = point;
    }),
    outCallback: angular.bind(this, function() {
      this['point'] = null;
    })
  };

  this['profileOptions'] = profileOptions;
  this['point'] = null;
};


app.module.controller('MainController', app.MainController);
