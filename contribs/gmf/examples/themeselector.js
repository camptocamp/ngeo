// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import './themeselector.css';
import gmfThemeModule from 'gmf/theme/module.js';

import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import options from './options.js';

/** @type {angular.IModule} **/
const myModule = angular.module('gmfapp', ['gettext', gmfLayertreeTreeManager.name, gmfThemeModule.name]);

/**
 * @constructor
 * @param {angular.IHttpService} $http Angular's $http service.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes Themes service.
 * @param {import("gmf/theme/Manager.js").ThemeManagerService} gmfThemeManager gmf Tree Manager service.
 * @ngInject
 */
function MainController($http, gmfThemes, gmfThemeManager) {
  /**
   * @param {import('gmf/themes.js').GmfTheme} theme Theme.
   * @return {boolean} Theme is 'Enseignement'
   */
  this.filter = function (theme) {
    return theme.name !== 'Enseignement';
  };

  /**
   * @type {import("gmf/theme/Manager.js").ThemeManagerService}
   */
  this.manager = gmfThemeManager;

  gmfThemes.loadThemes();
}

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
