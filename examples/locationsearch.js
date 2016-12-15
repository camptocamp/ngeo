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
 * @param {ngeo.search.CreateLocationSearchBloodhound} ngeoCreateLocationSearchBloodhound Bloodhound service.
 * @ngInject
 */
app.SearchController = function(ngeoCreateLocationSearchBloodhound) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  var limit = 10;
  /** @type {Bloodhound} */
  var bloodhoundEngine = this.createAndInitBloodhound_(
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
    display: function(suggestion) {
      var feature = /** @type {ol.Feature} */ (suggestion);
      return feature.get('label_no_html');
    },
    templates: {
      header: function() {
        return '<div class="ngeo-header">Locations</div>';
      },
      suggestion: function(suggestion) {
        var feature = /** @type {ol.Feature} */ (suggestion);
        return '<p>' + feature.get('label') + '</p>';
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
 * @param {ngeo.search.CreateLocationSearchBloodhound} ngeoCreateLocationSearchBloodhound Bloodhound service.
 * @param {number} limit Limit.
 * @return {Bloodhound} The bloodhound engine.
 * @private
 */
app.SearchController.prototype.createAndInitBloodhound_ = function(ngeoCreateLocationSearchBloodhound, limit) {
  var proj = ol.proj.get('EPSG:3857');
  goog.asserts.assert(proj !== null);
  var bloodhound = ngeoCreateLocationSearchBloodhound({
    targetProjection: proj,
    limit: limit,
    origins: 'gazetteer',
    prepare: function(query, settings) {
      // in a real application the interface language could be used here
      var lang = 'fr';
      settings.url += '&lang=' + lang;
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
  var map = /** @type {ol.Map} */ (this.map);
  var feature = /** @type {ol.Feature} */ (suggestion);
  var bbox = /** @type {ol.Extent} */
      (feature.get('bbox'));
  var mapSize = /** @type {ol.Size} */ (map.getSize());
  map.getView().fit(bbox, mapSize,
      /** @type {olx.view.FitOptions} */ ({maxZoom: 16}));
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
