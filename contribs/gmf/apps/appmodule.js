/**
 * This file provides the "app" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */

import angular from 'angular';
import {decodeQueryString} from 'ngeo/utils.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('app', []);

module.config(['$compileProvider', function($compileProvider) {
  if (!('debug' in decodeQueryString(window.location.search))) {
    // Disable the debug info
    $compileProvider.debugInfoEnabled(false);
  }
}]);

/**
 * @type {Array.<Object.<string, string>>}
 */
const appFloors = [
  {value: '10', label: '10'},
  {value: '9', label: '9'},
  {value: '8', label: '8'},
  {value: '7', label: '7'},
  {value: '6', label: '6'},
  {value: '5', label: '5'},
  {value: '4', label: '4'},
  {value: '3', label: '3'},
  {value: '2', label: '2'},
  {value: 'NULL', label: 'N'},
  {value: '*', label: '*'}
];
module.constant('appFloors', appFloors);

export default module;
