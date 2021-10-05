// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
import './search.css';
import gmfMapComponent from 'gmf/map/component';

import gmfSearchModule from 'gmf/search/module';
import gmfThemeThemes from 'gmf/theme/Themes';
import ngeoMessageNotification from 'ngeo/message/Notification';
import {MessageType} from 'ngeo/message/Message';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import ngeoMapModule from 'ngeo/map/module';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import options, {SEARCH} from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfMapComponent.name,
  gmfSearchModule.name,
  gmfThemeThemes.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
]);

/**
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes Themes service.
 * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo
 *    feature overlay manager service.
 * @class
 * @ngInject
 */
function MainController(gmfThemes, ngeoFeatureOverlayMgr) {
  gmfThemes.loadThemes();

  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * @type {Twitter.Typeahead.Options}
   */
  this.searchOptions = {
    minLength: 2,
  };

  /**
   * @type {string}
   */
  this.inputValue = '';

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
      center: [0, 0],
      zoom: 4,
    }),
  });

  /**
   * @type {function(): void}
   */
  this.searchIsReady = () => {
    ngeoMessageNotification.notify({
      msg: 'gmf-search initialized',
      target: document.querySelector('#message'),
      type: MessageType.SUCCESS,
    });
  };
}

myModule.controller('MainController', MainController);

myModule.constant('gmfSearchGroups', []);
myModule.constant('gmfSearchOptions', {
  colorChooser: true,
  delay: 50,
  placeholder: 'Search for « Laus » for example…',
  styles: {
    osm: {
      fill: {color: [255, 255, 255, 0.6]},
      circle: {
        fill: {color: [255, 255, 255, 0.6]},
        radius: 5,
        stroke: {color: [255, 0, 0, 1], width: 2},
      },
      stroke: {color: [255, 0, 0, 1], width: 2},
    },
  },
  datasources: [
    {
      datasetTitle: 'test',
      groupValues: ['osm', 'district'],
      groupActions: [],
      labelKey: 'label',
      projection: EPSG2056,
      bloodhoundOptions: /** @type {Bloodhound.BloodhoundOptions<unknown>} */ ({
        remote: {
          rateLimitWait: 250,
        },
      }),
      url: SEARCH,
    },
  ],
});
options(myModule);

export default myModule;
