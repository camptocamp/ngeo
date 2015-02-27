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

  this['point'] = null;
};


/**
 * @param {Object} point The point object. It correspond to an item in the list
 * of points given to the profile.
 */
app.MainController.prototype.onProfileHover = function(point) {
  this['point'] = point;
};


/**
 */
app.MainController.prototype.onProfileOut = function() {
  this['point'] = null;
};


app.module.controller('MainController', app.MainController);
