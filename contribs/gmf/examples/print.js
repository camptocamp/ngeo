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
import './print.css';
import './gmf-hidden.inc.css';
import gmfLayertreeComponent from 'gmf/layertree/gmfComponent';

import gmfMapComponent from 'gmf/map/component';

import gmfPrintComponent from 'gmf/print/component';

import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';

import gmfThemeThemes from 'gmf/theme/Themes';
import ngeoMapModule from 'ngeo/map/module';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfLayertreeComponent.name,
  gmfMapComponent.name,
  gmfPrintComponent.name,
  gmfThemeThemes.name,
  ngeoMapModule.name, //for ngeo.map.FeatureOverlay, perhaps remove me
]);

/**
 * @class
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf themes service.
 * @ngInject
 */
function MainController(gmfThemes) {
  gmfThemes.loadThemes();

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2537635, 1152640],
      zoom: 3,
    }),
  });

  /**
   * @type {import('gmf/themes').GmfTheme[]|undefined}
   */
  this.themes = undefined;

  /**
   * @type {import('gmf/themes').GmfTheme|undefined}
   */
  this.treeSource = undefined;

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      this.themes = themes;
      this.treeSource = themes[3];
    }
  });

  ngeoMapFeatureOverlayMgr.init(this.map);
}

myModule.controller('MainController', MainController);

myModule.constant('gmfPrintOptions', {
  fieldsValues: {
    comments: 'Default comments example',
    legend: true,
  },
});
options(myModule);

export default myModule;
