import angular from 'angular';
import {SEARCH} from './url.js';
import './search.css';

import ngeoMapModule from 'ngeo/map/module.js';
import {proj as EPSG21781} from '@geoblocks/proj/src/EPSG_21781.js';
import ngeoSearchModule from 'ngeo/search/module.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import * as olProj from 'ol/proj.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name, ngeoSearchModule.name]);

/**
 * @type {!angular.IComponentOptions}
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

module.component('appSearch', searchComponent);

/**
 * @constructor
 * @param {JQuery} $element Element.
 * @param {angular.IScope} $rootScope Angular root scope.
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {import("ngeo/search/createGeoJSONBloodhound.js").createGeoJSONBloodhound} ngeoSearchCreateGeoJSONBloodhound
 *    The ngeo create GeoJSON Bloodhound service.
 * @ngInject
 */
function SearchController($element, $rootScope, $compile, ngeoSearchCreateGeoJSONBloodhound) {
  /**
   * @private
   * @type {JQuery}
   */
  this.$element = $element;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {import("ol/layer/Vector.js").default}
   * @private
   */
  this.vectorLayer_ = this.createVectorLayer_();

  /** @type {Bloodhound} */
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
   * @type {Array.<Twitter.Typeahead.Dataset>}
   */
  this.datasets = [
    {
      source: bloodhoundEngine.ttAdapter(),
      display: (suggestion) => {
        const feature = /** @type {import("ol/Feature.js").default} */ (suggestion);
        return feature.get('label');
      },
      templates: {
        header: () => '<div class="ngeo-header">Addresses</div>',
        suggestion: (suggestion) => {
          const feature = /** @type {import("ol/Feature.js").default} */ (suggestion);

          // A scope for the ng-click on the suggestion's « i » button.
          const scope = $rootScope.$new(true);
          scope['feature'] = feature;
          scope['click'] = function (event) {
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
   * @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners}
   */
  this.listeners = /** @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners} */ ({
    select: (event, suggestion, dataset) => {
      const feature = /** @type {import('ol/Feature.js').default} */ (suggestion);
      const featureGeometry = /** @type {import('ol/geom/SimpleGeometry.js').default} */ (
        feature.getGeometry()
      );
      const size = this.map.getSize();
      const source = /** @type {olSourceVector} */ (this.vectorLayer_.getSource());
      source.clear(true);
      source.addFeature(feature);
      this.map.getView().fit(featureGeometry, {
        size: size,
        maxZoom: 16,
      });
    },
  });
}

/**
 */
SearchController.prototype.$onInit = function () {
  // Empty the search field on focus and blur.
  const input = this.$element.find('input');
  input.on('focus blur', () => {
    input.val('');
  });
};

/**
 * @return {import("ol/layer/Vector.js").default} The vector layer.
 * @private
 */
SearchController.prototype.createVectorLayer_ = function () {
  const vectorLayer = new olLayerVector({
    source: new olSourceVector(),
  });
  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(this.map);
  return vectorLayer;
};

/**
 * @param {import("ngeo/search/createGeoJSONBloodhound.js").createGeoJSONBloodhound} ngeoSearchCreateGeoJSONBloodhound
 *    The ngeo create GeoJSON Bloodhound service.
 * @return {Bloodhound} The bloodhound engine.
 * @private
 */
SearchController.prototype.createAndInitBloodhound_ = function (ngeoSearchCreateGeoJSONBloodhound) {
  const url = SEARCH;
  const bloodhound = ngeoSearchCreateGeoJSONBloodhound(url, undefined, olProj.get('EPSG:3857'), EPSG21781);
  bloodhound.initialize();
  return bloodhound;
};

module.controller('AppSearchController', SearchController);

/**
 * @constructor
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

module.controller('MainController', MainController);

export default module;
