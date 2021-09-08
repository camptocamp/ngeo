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

import './locationsearch.css';
import angular from 'angular';

import ngeoMapModule from 'ngeo/map/module';
import ngeoSearchModule from 'ngeo/search/module';
import * as olProj from 'ol/proj';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';

/** @type {angular.IModule} **/
const appmodule = angular.module('app', ['gettext', ngeoMapModule.name, ngeoSearchModule.name]);

/**
 * @type {angular.IComponentOptions}
 */
const locationSearchComponent = {
  bindings: {
    'map': '=appSearchMap',
  },
  controller: 'AppSearchController',
  template:
    '<input type="text" placeholder="Search…" ' +
    'ngeo-search="$ctrl.options" ' +
    'ngeo-search-datasets="$ctrl.datasets" ' +
    'ngeo-search-listeners="$ctrl.listeners">',
};

appmodule.component('appLocationSearch', locationSearchComponent);

/**
 * @class
 * @param {import('ngeo/search/createLocationSearchBloodhound').createLocationSearchBloodhoundFunction} ngeoCreateLocationSearchBloodhound
 *    Bloodhound service.
 * @ngInject
 */
function SearchController(ngeoCreateLocationSearchBloodhound) {
  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  const limit = 10;
  /** @type {Bloodhound<import('ol/Feature').default<import('ol/geom/Geometry').default>[]>} */
  const bloodhoundEngine = this.createAndInitBloodhound_(ngeoCreateLocationSearchBloodhound, limit);

  /**
   * @type {Twitter.Typeahead.Options}
   */
  this.options = /** @type {Twitter.Typeahead.Options} */ ({
    highlight: true,
    hint: undefined,
    minLength: undefined,
  });

  /**
   * @type {Twitter.Typeahead.Dataset<import('ol/Feature').default<import('ol/geom/Geometry').default>>[]}
   */
  this.datasets = [
    {
      source: bloodhoundEngine.ttAdapter(),
      limit: limit,
      display: (suggestion) => {
        const feature = suggestion;
        return feature.get('label_no_html');
      },
      templates: {
        header: () => '<div class="ngeo-header">Locations</div>',
        suggestion: (suggestion) => {
          const feature = suggestion;
          return `<p>${feature.get('label')}</p>`;
        },
      },
    },
  ];

  /**
   * @type {import('ngeo/search/searchDirective').SearchDirectiveListeners<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.listeners = {
    select: (event, suggestion, dataset) => {
      if (!this.map) {
        throw new Error('Missing map');
      }
      const feature = /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>} */ (
        suggestion
      );
      /**
       * @type {import('ol/extent').Extent}
       */
      const bbox = feature.get('bbox');
      const size = this.map.getSize();
      if (!size) {
        throw new Error('issing size');
      }
      const maxZoom = 16;
      this.map.getView().fit(bbox, {size, maxZoom});
    },
  };
}

/**
 * @param {import('ngeo/search/createLocationSearchBloodhound').createLocationSearchBloodhoundFunction} ngeoCreateLocationSearchBloodhound
 *     Bloodhound service.
 * @param {number} limit Limit.
 * @return {Bloodhound<import('ol/Feature').default<import('ol/geom/Geometry').default>[]>} The bloodhound engine.
 */
SearchController.prototype.createAndInitBloodhound_ = function (ngeoCreateLocationSearchBloodhound, limit) {
  const epsg3857 = olProj.get('EPSG:3857');
  if (!epsg3857) {
    throw new Error('Missing epsg3857');
  }
  const bloodhound = ngeoCreateLocationSearchBloodhound({
    targetProjection: epsg3857,
    limit: limit,
    origins: 'gazetteer',
    prepare: (query, settings) => {
      // in a real application the interface language could be used here
      const lang = 'fr';
      settings.url += `&lang=${lang}`;
      return settings;
    },
  });
  bloodhound.initialize();
  return bloodhound;
};

appmodule.controller('AppSearchController', SearchController);

/**
 * @class
 * @ngInject
 */
function MainController() {
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
}

appmodule.controller('MainController', MainController);

export default module;
