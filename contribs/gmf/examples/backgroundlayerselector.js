// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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
import './backgroundlayerselector.css';
import gmfBackgroundlayerselectorModule from 'gmf/backgroundlayerselector/module';

import gmfMapComponent from 'gmf/map/component';

import gmfThemeThemes from 'gmf/theme/Themes';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import olMap from 'ol/Map';
import olView from 'ol/View';
import options from './options';
import ngeoMapModule from 'ngeo/map/module';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfBackgroundlayerselectorModule.name,
  gmfMapComponent.name,
  gmfThemeThemes.name,
  ngeoMapModule.name,
]);

/**
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes Themes service.
 * @class
 * @ngInject
 */
function MainController(gmfThemes) {
  gmfThemes.loadThemes();

  /**
   * @type {import('ol/Map').default}
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

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
