goog.provide('app.locationsearch');

/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ngeo');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
/** @suppress {extraRequire} */
goog.require('ngeo.search.createLocationSearchBloodhound');
goog.require('goog.asserts');


/** @type {!angular.Module} **/
app.module = angular.module('app', [ngeo.module.name]);


/**
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 */
app.locationSearchDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appSearchMap'
    },
    controller: 'AppSearchController as ctrl',
    bindToController: true,
    template:
        '<input type="text" placeholder="Search…" ' +
        'ngeo-search="ctrl.options" ' +
        'ngeo-search-datasets="ctrl.datasets" ' +
        'ngeo-search-listeners="ctrl.listeners">'
  };
};


app.module.directive('appLocationSearch', app.locationSearchDirective);


/**
 * @constructor
 * @param {ngeo.search.createLocationSearchBloodhound.Function} ngeoCreateLocationSearchBloodhound Bloodhound service.
 * @ngInject
 */
app.SearchController = function(ngeoCreateLocationSearchBloodhound) {

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
    limit,
    display(suggestion) {
      const feature = /** @type {ol.Feature} */ (suggestion);
      return feature.get('label_no_html');
    },
    templates: {
      header() {
        return '<div class="ngeo-header">Locations</div>';
      },
      suggestion(suggestion) {
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
    select: app.SearchController.select_.bind(this)
  });

};


/**
 * @param {ngeo.search.createLocationSearchBloodhound.Function} ngeoCreateLocationSearchBloodhound
 *     Bloodhound service.
 * @param {number} limit Limit.
 * @return {Bloodhound} The bloodhound engine.
 * @private
 */
app.SearchController.prototype.createAndInitBloodhound_ = function(ngeoCreateLocationSearchBloodhound, limit) {
  const epsg3857 = ol.proj.get('EPSG:3857');
  goog.asserts.assert(epsg3857 !== null);
  const bloodhound = ngeoCreateLocationSearchBloodhound({
    targetProjection: epsg3857,
    limit,
    origins: 'gazetteer',
    prepare(query, settings) {
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
 * @this {app.SearchController}
 * @private
 */
app.SearchController.select_ = function(event, suggestion, dataset) {
  const feature = /** @type {ol.Feature} */ (suggestion);
  const bbox = /** @type {ol.Extent} */ (feature.get('bbox'));
  const size = this.map.getSize();
  goog.asserts.assert(size !== undefined);
  const maxZoom = 16;
  this.map.getView().fit(bbox, {size, maxZoom});
};


app.module.controller('AppSearchController', app.SearchController);


/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {
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


app.module.controller('MainController', app.MainController);
