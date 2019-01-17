/**
 * @module app.locationsearch
 */
const exports = {};

import './locationsearch.css';
import angular from 'angular';
import googAsserts from 'goog/asserts.js';

import ngeoMapModule from 'ngeo/map/module.js';
import ngeoSearchModule from 'ngeo/search/module.js';
import * as olProj from 'ol/proj.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.IModule} **/
const appmodule = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoSearchModule.name
]);


/**
 * @type {!angular.Component}
 */
exports.locationSearchComponent = {
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


appmodule.component('appLocationSearch', exports.locationSearchComponent);


/**
 * @constructor
 * @param {ngeo.search.createLocationSearchBloodhound.Function} ngeoCreateLocationSearchBloodhound Bloodhound service.
 * @ngInject
 */
exports.SearchController = function(ngeoCreateLocationSearchBloodhound) {

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map;

  const limit = 10;
  /** @type {Bloodhound} */
  const bloodhoundEngine = this.createAndInitBloodhound_(
    ngeoCreateLocationSearchBloodhound, limit);

  /**
   * @type {TypeaheadOptions}
   * @export
   */
  this.options = /** @type {TypeaheadOptions} */ ({
    highlight: true,
    hint: undefined,
    minLength: undefined
  });

  /**
   * @type {Array.<TypeaheadDataset>}
   * @export
   */
  this.datasets = [{
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
      }
    }
  }];

  /**
   * @type {SearchDirectiveListeners}
   * @export
   */
  this.listeners = /** @type {SearchDirectiveListeners} */ ({
    select: exports.SearchController.select_.bind(this)
  });

};


/**
 * @param {ngeo.search.createLocationSearchBloodhound.Function} ngeoCreateLocationSearchBloodhound
 *     Bloodhound service.
 * @param {number} limit Limit.
 * @return {Bloodhound} The bloodhound engine.
 * @private
 */
exports.SearchController.prototype.createAndInitBloodhound_ = function(ngeoCreateLocationSearchBloodhound, limit) {
  const epsg3857 = olProj.get('EPSG:3857');
  googAsserts.assert(epsg3857 !== null);
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


/**
 * @param {jQuery.Event} event Event.
 * @param {Object} suggestion Suggestion.
 * @param {TypeaheadDataset} dataset Dataset.
 * @this {app.locationsearch.SearchController}
 * @private
 */
exports.SearchController.select_ = function(event, suggestion, dataset) {
  const feature = /** @type {import("ol/Feature.js").default} */ (suggestion);
  const bbox = /** @type {import("ol/Extent.js").default} */ (feature.get('bbox'));
  const size = this.map.getSize();
  googAsserts.assert(size !== undefined);
  const maxZoom = 16;
  this.map.getView().fit(bbox, {size, maxZoom});
};


appmodule.controller('AppSearchController', exports.SearchController);


/**
 * @constructor
 * @ngInject
 */
exports.MainController = function() {
  /**
   * @type {import("ol/Map.js").default}
   * @export
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

};


appmodule.controller('MainController', exports.MainController);


export default exports;
