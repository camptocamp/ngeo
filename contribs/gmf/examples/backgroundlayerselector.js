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
import appURL from './url.js';
import './backgroundlayerselector.css';
import gmfBackgroundlayerselectorModule from 'gmf/backgroundlayerselector/module.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfBackgroundlayerselectorModule.name,
  gmfMapComponent.name,
  gmfThemeThemes.name,
]);

module.value('gmfTreeUrl', appURL.GMF_THEMES);

module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes Themes service.
 * @constructor
 * @ngInject
 */
function MainController(gmfThemes) {
  gmfThemes.loadThemes();

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [],
    view: new olView({
      center: [2632464, 1185457],
      projection: EPSG2056,
      minZoom: 3,
      zoom: 3,
    }),
  });
}

module.controller('MainController', MainController);

export default module;
