import './locationsearch.css';
import angular from 'angular';

import ngeoMapModule from 'ngeo/map/module.js';
import ngeoSearchModule from 'ngeo/search/module.js';
import * as olProj from 'ol/proj.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/** @type {!angular.IModule} **/
const appmodule = angular.module('app', ['gettext', ngeoMapModule.name, ngeoSearchModule.name]);

/**
 * @type {!angular.IComponentOptions}
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
 * @constructor
 * @param {import("ngeo/search/createLocationSearchBloodhound.js").createLocationSearchBloodhoundFunction} ngeoCreateLocationSearchBloodhound
 *    Bloodhound service.
 * @ngInject
 */
function SearchController(ngeoCreateLocationSearchBloodhound) {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map;

  const limit = 10;
  /** @type {Bloodhound} */
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
   * @type {Array.<Twitter.Typeahead.Dataset>}
   */
  this.datasets = [
    {
      source: bloodhoundEngine.ttAdapter(),
      limit: limit,
      display: (suggestion) => {
        const feature = /** @type {import("ol/Feature.js").default} */ (suggestion);
        return feature.get('label_no_html');
      },
      templates: {
        header: () => '<div class="ngeo-header">Locations</div>',
        suggestion: (suggestion) => {
          const feature = /** @type {import("ol/Feature.js").default} */ (suggestion);
          return `<p>${feature.get('label')}</p>`;
        },
      },
    },
  ];

  /**
   * @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners}
   */
  this.listeners = /** @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners} */ ({
    select: select_.bind(this),
  });
}

/**
 * @param {import("ngeo/search/createLocationSearchBloodhound.js").createLocationSearchBloodhoundFunction} ngeoCreateLocationSearchBloodhound
 *     Bloodhound service.
 * @param {number} limit Limit.
 * @return {Bloodhound} The bloodhound engine.
 * @private
 */
SearchController.prototype.createAndInitBloodhound_ = function (ngeoCreateLocationSearchBloodhound, limit) {
  const epsg3857 = olProj.get('EPSG:3857');
  console.assert(epsg3857 !== null);
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

/**
 * @param {JQueryEventObject} event Event.
 * @param {Object} suggestion Suggestion.
 * @param {Twitter.Typeahead.Dataset} dataset Dataset.
 */
function select_(event, suggestion, dataset) {
  const feature = /** @type {import("ol/Feature.js").default} */ (suggestion);
  const bbox = /** @type {import("ol/extent.js").Extent} */ (feature.get('bbox'));
  const size = this.map.getSize();
  console.assert(size !== undefined);
  const maxZoom = 16;
  this.map.getView().fit(bbox, {size, maxZoom});
}

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
