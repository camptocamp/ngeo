import './locationsearch.css';
import angular from 'angular';

import ngeoMapModule from 'ngeo/map/module.js';
import ngeoSearchModule from 'ngeo/search/module.js';
import * as olProj from 'ol/proj.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {angular.IModule} **/
const appmodule = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoSearchModule.name
]);


/**
 * @type {angular.IComponentOptions}
 */
const locationSearchComponent = {
  bindings: {
    'map': '=appSearchMap'
  },
  controller: 'AppSearchController',
  template:
      '<input type="text" placeholder="Search…" ' +
      'ngeo-search="$ctrl.options" ' +
      'ngeo-search-datasets="$ctrl.datasets" ' +
      'ngeo-search-listeners="$ctrl.listeners">'
};


appmodule.component('appLocationSearch', locationSearchComponent);


/**
 * @constructor
 * @param {import("ngeo/search/createLocationSearchBloodhound.js").createLocationSearchBloodhoundFunction} ngeoCreateLocationSearchBloodhound
 *    Bloodhound service.
 * @ngInject
 */
function SearchController(ngeoCreateLocationSearchBloodhound) {

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  const limit = 10;
  /** @type {Bloodhound<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]>} */
  const bloodhoundEngine = this.createAndInitBloodhound_(ngeoCreateLocationSearchBloodhound, limit);

  /**
   * @type {Twitter.Typeahead.Options}
   */
  this.options = /** @type {Twitter.Typeahead.Options} */ ({
    highlight: true,
    hint: undefined,
    minLength: undefined
  });

  /**
   * @type {Array<Twitter.Typeahead.Dataset<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>>}
   */
  this.datasets = [{
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
      }
    }
  }];

  /**
   * @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>}
   */
  this.listeners = {
    select: (event, suggestion, dataset) => {
      if (!this.map) {
        throw new Error('Missing map');
      }
      const feature = /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} */ (
        suggestion
      );
      /**
       * @type {import("ol/extent.js").Extent}
       */
      const bbox = feature.get('bbox');
      const size = this.map.getSize();
      if (!size) {
        throw new Error('issing size');
      }
      const maxZoom = 16;
      this.map.getView().fit(bbox, {size, maxZoom});
    }
  };

}


/**
 * @param {import("ngeo/search/createLocationSearchBloodhound.js").createLocationSearchBloodhoundFunction} ngeoCreateLocationSearchBloodhound
 *     Bloodhound service.
 * @param {number} limit Limit.
 * @return {Bloodhound<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]>} The bloodhound engine.
 * @private
 */
SearchController.prototype.createAndInitBloodhound_ = function(ngeoCreateLocationSearchBloodhound, limit) {
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
    }
  });
  bloodhound.initialize();
  return bloodhound;
};


appmodule.controller('AppSearchController', SearchController);


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
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      center: [0, 0],
      zoom: 4
    })
  });

}


appmodule.controller('MainController', MainController);


export default module;
