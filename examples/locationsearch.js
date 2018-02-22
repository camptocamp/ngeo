goog.provide('app.locationsearch');

// webpack: import './locationsearch.css';
// webpack: import './common_dependencies.js';
goog.require('goog.asserts');
goog.require('ngeo.map.module');
goog.require('ngeo.search.module');
goog.require('ol.proj');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
const module = angular.module('app', [
  ngeo.map.module.name,
  ngeo.search.module.name
]);


/**
 * @type {!angular.Component}
 */
app.locationsearch.locationSearchComponent = {
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


module.component('appLocationSearch', app.locationsearch.locationSearchComponent);


/**
 * @constructor
 * @param {ngeo.search.createLocationSearchBloodhound.Function} ngeoCreateLocationSearchBloodhound Bloodhound service.
 * @ngInject
 */
app.locationsearch.SearchController = function(ngeoCreateLocationSearchBloodhound) {

  /**
   * @type {ol.Map}
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
      const feature = /** @type {ol.Feature} */ (suggestion);
      return feature.get('label_no_html');
    },
    templates: {
      header: () => '<div class="ngeo-header">Locations</div>',
      suggestion: (suggestion) => {
        const feature = /** @type {ol.Feature} */ (suggestion);
        return `<p>${feature.get('label')}</p>`;
      }
    }
  }];

  /**
   * @type {ngeox.SearchDirectiveListeners}
   * @export
   */
  this.listeners = /** @type {ngeox.SearchDirectiveListeners} */ ({
    select: app.locationsearch.SearchController.select_.bind(this)
  });

};


/**
 * @param {ngeo.search.createLocationSearchBloodhound.Function} ngeoCreateLocationSearchBloodhound
 *     Bloodhound service.
 * @param {number} limit Limit.
 * @return {Bloodhound} The bloodhound engine.
 * @private
 */
app.locationsearch.SearchController.prototype.createAndInitBloodhound_ = function(ngeoCreateLocationSearchBloodhound, limit) {
  const epsg3857 = ol.proj.get('EPSG:3857');
  goog.asserts.assert(epsg3857 !== null);
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
app.locationsearch.SearchController.select_ = function(event, suggestion, dataset) {
  const feature = /** @type {ol.Feature} */ (suggestion);
  const bbox = /** @type {ol.Extent} */ (feature.get('bbox'));
  const size = this.map.getSize();
  goog.asserts.assert(size !== undefined);
  const maxZoom = 16;
  this.map.getView().fit(bbox, {size, maxZoom});
};


module.controller('AppSearchController', app.locationsearch.SearchController);


/**
 * @constructor
 * @ngInject
 */
app.locationsearch.MainController = function() {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 4
    })
  });

};


module.controller('MainController', app.locationsearch.MainController);
