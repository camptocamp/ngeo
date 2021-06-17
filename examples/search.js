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
import {SEARCH} from './url.js';
import './search.css';

import ngeoMapModule from 'ngeo/map/module.js';
import {proj as EPSG2056} from 'ngeo/proj/EPSG_2056.js';
import ngeoSearchModule from 'ngeo/search/module.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import * as olProj from 'ol/proj.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';
import SimpleGeometry from 'ol/geom/SimpleGeometry.js';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', ngeoMapModule.name, ngeoSearchModule.name]);

/**
 * @type {angular.IComponentOptions}
 */
const searchComponent = {
  bindings: {
    'map': '=appSearchMap',
  },
  controller: 'AppSearchController',
  template:
    '<input type="text" placeholder="search…" ' +
    'ngeo-search="$ctrl.options" ' +
    'ngeo-search-datasets="$ctrl.datasets" ' +
    'ngeo-search-listeners="$ctrl.listeners">',
};

myModule.component('appSearch', searchComponent);

/**
 * @class
 * @param {JQuery} $element Element.
 * @param {angular.IScope} $rootScope Angular root scope.
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {Function} ngeoSearchCreateGeoJSONBloodhound
 *    The ngeo create GeoJSON Bloodhound service.
 * @ngInject
 */
function SearchController($element, $rootScope, $compile, ngeoSearchCreateGeoJSONBloodhound) {
  /**
   * @type {JQuery}
   */
  this.$element = $element;

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {import("ol/layer/Vector.js").default}
   */
  this.vectorLayer_;

  /** @type {Bloodhound<*>} */
  const bloodhoundEngine = this.createAndInitBloodhound_(ngeoSearchCreateGeoJSONBloodhound);

  /**
   * @type {Twitter.Typeahead.Options}
   */
  this.options = /** @type {Twitter.Typeahead.Options} */ ({
    highlight: true,
    hint: undefined,
    minLength: undefined,
  });

  /**
   * @type {Twitter.Typeahead.Dataset<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>[]}
   */
  this.datasets = [
    {
      source: bloodhoundEngine.ttAdapter(),
      display: (suggestion) => {
        const feature =
          /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} */ (suggestion);
        return feature.get('label');
      },
      templates: {
        header: () => '<div class="ngeo-header">Addresses</div>',
        suggestion: (suggestion) => {
          const feature =
            /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} */ (
              suggestion
            );

          // A scope for the ng-click on the suggestion's « i » button.
          const scope = $rootScope.$new(true);
          // @ts-ignore: scope ......
          scope.feature = feature;
          // @ts-ignore: scope ......
          scope.click = function (event) {
            window.alert(feature.get('label'));
            event.stopPropagation();
          };

          const html = `<p>${feature.get('label')}<button ng-click="click($event)">i</button></p>`;
          return $compile(html)(scope).html();
        },
      },
    },
  ];

  /**
   * @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners<*>}
   */
  this.listeners = {
    select: (event, suggestion, dataset) => {
      if (!this.map) {
        throw new Error('Missing map');
      }
      const feature = /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} */ (
        suggestion
      );
      const featureGeometry = feature.getGeometry();
      if (!(featureGeometry instanceof SimpleGeometry)) {
        throw new Error('Missing Wrong geometry type');
      }
      const size = this.map.getSize();
      if (!size) {
        throw new Error('Missing size');
      }
      /**
       * @type {olSourceVector<import("ol/geom/Geometry.js").default>}
       */
      const source = this.vectorLayer_.getSource();
      source.clear(true);
      source.addFeature(feature);
      this.map.getView().fit(featureGeometry, {
        size: size,
        maxZoom: 16,
      });
    },
  };
}

/**
 */
SearchController.prototype.$onInit = function () {
  this.vectorLayer_ = this.createVectorLayer_();
  // Empty the search field on focus and blur.
  const input = this.$element.find('input');
  input.on('focus blur', () => {
    input.val('');
  });
};

/**
 * @return {import("ol/layer/Vector.js").default} The vector layer.
 */
SearchController.prototype.createVectorLayer_ = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const vectorLayer = new olLayerVector({
    source: new olSourceVector(),
  });
  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(this.map);
  return vectorLayer;
};

/**
 * @param {Function} ngeoSearchCreateGeoJSONBloodhound
 *    The ngeo create GeoJSON Bloodhound service.
 * @return {Bloodhound<*>} The bloodhound engine.
 */
SearchController.prototype.createAndInitBloodhound_ = function (ngeoSearchCreateGeoJSONBloodhound) {
  const url = SEARCH;
  const bloodhound = ngeoSearchCreateGeoJSONBloodhound(url, undefined, olProj.get('EPSG:3857'), EPSG2056);
  bloodhound.initialize();
  return bloodhound;
};

myModule.controller('AppSearchController', SearchController);

/**
 * @class
 * @ngInject
 */
function MainController() {
  /**
   * @type {import("ol/Map.js").default}
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

myModule.controller('MainController', MainController);

export default myModule;
