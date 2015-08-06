/**
 * @fileoverview this file provides the "search" directive and controller for
 * a GeoMapFish application.
 *
 * FIXME: The 'placeholder' in the input field is hard-coded and can't currently
 * be internationalised.
 *
 * Example:
 *
 * <gmf-search gmf-search-map="ctrl.map"
 *             gmf-search-datasources="ctrl.searchDatasources">
 * </gmf-search>
 */
goog.provide('gmf.searchDirective');


goog.require('gmf');
goog.require('gmf.mapDirective');
goog.require('ngeo.CreateGeoJSONBloodhound');
goog.require('ngeo.searchDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.proj');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');


/**
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
gmf.searchDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'getMapFn': '&gmfSearchMap',
      'getDatasourcesFn': '&gmfSearchDatasources'
    },
    controller: 'GmfSearchController',
    controllerAs: 'ctrl',
    template:
        '<input type="text" placeholder="search…" ' +
        'ngeo-search="ctrl.options" ' +
        'ngeo-search-datasets="ctrl.datasets" ' +
        'ngeo-search-listeners="ctrl.listeners">',
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Atttributes.
         */
        function(scope, element, attrs) {
          // Empty the search field on focus and blur.
          element.find('input').on('focus blur', function() {
            $(this).val('');
          });
        }
  };
};

gmfModule.directive('gmfSearch', gmf.searchDirective);



/**
 * @constructor
 * @param {angular.Scope} $scope The directive's scope.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {ngeo.CreateGeoJSONBloodhound} ngeoCreateGeoJSONBloodhound The ngeo
 * create GeoJSON Bloodhound service.
 * @ngInject
 * @export
 */
gmf.SearchController = function($scope, $compile,
    ngeoCreateGeoJSONBloodhound) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.$compile}
   * @private
   */
  this.compile_ = $compile;

  /**
   * @type {ngeo.CreateGeoJSONBloodhound}
   * @private
   */
  this.ngeoCreateGeoJSONBloodhound_ = ngeoCreateGeoJSONBloodhound;

  var map = this.scope_['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!ol.Map}
   * @private
   */
  this.map_ = map;

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = this.createVectorLayer_();

  var datasources = this.scope_['getDatasourcesFn']();
  goog.asserts.assertArray(datasources);

  /**
   * @type {Array.<gmfx.SearchDirectiveDatasource>}
   * @private
   */
  this.datasources_ = datasources;

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
  this.datasets = [];

  for (var i = 0; i < this.datasources_.length; i++) {
    var datasource = this.datasources_[i];
    var groupByProperties = datasource.groupByProperties || [];
    var filter;

    do {
      var title = datasource.title;

      if (groupByProperties[0]) {
        //Add an optional filter function to keep objects only from one
        //"layername" from a GMF's fulltextsearch service.
        filter = this.filterLayername_(groupByProperties[0]);
        title = title + groupByProperties[0];
        groupByProperties.shift();
      } else {
        filter = undefined;
      }

      this.datasets.push(this.createDataset_({
        'title': title,
        'filter': filter,
        'projection': datasource.projection,
        'url': datasource.url
      }));

    } while (groupByProperties.length > 0);
  }



  /**
   * @type {ngeox.SearchDirectiveListeners}
   * @export
   */
  this.listeners = /** @type {ngeox.SearchDirectiveListeners} */ ({
    selected: goog.bind(gmf.SearchController.selected_, this)
  });

};


/**
 * @return {ol.layer.Vector} The vector layer.
 * @private
 */
gmf.SearchController.prototype.createVectorLayer_ = function() {
  var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      useSpatialIndex: false
    })
  });
  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(this.map_);
  return vectorLayer;
};


/**
 * @param {gmfx.SearchDirectiveDatasource} config The config of the dataset.
 * @return {TypeaheadDataset} A typeahead dataset.
 * @private
 */
gmf.SearchController.prototype.createDataset_ = function(config) {
  var directive_scope = this.scope_;
  var compile = this.compile_;
  var bloodhoundEngine = this.createAndInitBloodhound_(config);
  return /** @type {TypeaheadDataset} */ ({
    source: bloodhoundEngine.ttAdapter(),
    display: function(suggestion) {
      var feature = /** @type {ol.Feature} */ (suggestion);
      return feature.get('label');
    },
    templates: /* TypeaheadTemplates */ ({
      header: function() {
        return '<div class="header">' + config.title + '</div>';
      },
      suggestion: function(suggestion) {
        var feature = /** @type {ol.Feature} */ (suggestion);

        var scope = directive_scope.$new(true);
        scope['feature'] = feature;

        var html = '<p>' + feature.get('label') + '</p>';
        return compile(html)(scope);
      }
    })
  });
};


/**
 * @param {string} layername The dataset "type" to keep.
 * @return {(function(Object): boolean)} A filter function based on a
 * GeoJSONFeaturesCollection's array.
 * @private
 */
gmf.SearchController.prototype.filterLayername_ = function(layername) {
  return function(feature) {
    return (feature['properties']['layer_name'] === layername);
  };
};


/**
 * @param {gmfx.SearchDirectiveDatasource} config The config of the dataset.
 * @return {Bloodhound} The bloodhound engine.
 * @private
 */
gmf.SearchController.prototype.createAndInitBloodhound_ = function(config) {
  var url = config.url + '?query=%QUERY&';
  var mapProjectionCode = this.map_.getView().getProjection().getCode();
  var bloodhound = this.ngeoCreateGeoJSONBloodhound_(url, config.filter,
      ol.proj.get(mapProjectionCode), ol.proj.get(config.projection));
  bloodhound.initialize();
  return bloodhound;
};


/**
 * @param {jQuery.Event} event Event.
 * @param {Object} suggestion Suggestion.
 * @param {TypeaheadDataset} dataset Dataset.
 * @this {gmf.SearchController}
 * @private
 */
gmf.SearchController.selected_ = function(event, suggestion, dataset) {
  var map = /** @type {ol.Map} */ (this.map_);
  var feature = /** @type {ol.Feature} */ (suggestion);
  var featureGeometry = /** @type {ol.geom.SimpleGeometry} */
      (feature.getGeometry());
  var fitArray = featureGeometry.getType() === 'GeometryCollection' ?
      featureGeometry.getExtent() : featureGeometry;
  var mapSize = /** @type {ol.Size} */ (map.getSize());
  var source = this.vectorLayer_.getSource();
  source.clear(true);
  source.addFeature(feature);
  map.getView().fit(fitArray, mapSize,
      /** @type {olx.view.FitOptions} */ ({maxZoom: 16}));
};


gmfModule.controller('GmfSearchController', gmf.SearchController);

