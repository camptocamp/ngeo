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

module.config([
  '$compileProvider',
  function ($compileProvider) {
    if (!('debug' in decodeQueryString(window.location.search))) {
      // Disable the debug info
      $compileProvider.debugInfoEnabled(false);
    }
  },
]);

export default module;
