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
 *
 * This directive uses the ngeoFeatureOverlayMgr to create a feature overlay
 * for drawing features on the map. The application is responsible to
 * initialize the ngeoFeatureOverlayMgr with the map.
 */
goog.provide('gmf.SearchController');
goog.provide('gmf.searchDirective');

goog.require('gmf');
goog.require('gmf.mapDirective');
goog.require('ngeo.CreateGeoJSONBloodhound');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.searchDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.proj');


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
 *     create GeoJSON Bloodhound service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @export
 * @ngInject
 */
gmf.SearchController = function($scope, $compile,
    ngeoCreateGeoJSONBloodhound, ngeoFeatureOverlayMgr) {

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
   * @type {ngeo.FeatureOverlay}
   * @private
   */
  this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

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

    /** @type {Array.<string>} */
    var groupByProperties = goog.isDef(datasource.groupByProperties) ?
        datasource.groupByProperties : [];
    var filter;

    do {
      var title = datasource.title;

      if (groupByProperties.length > 0) {
        // Add an optional filter function to keep objects only from one
        // "layername" from a GMF's fulltextsearch service.
        filter = this.filterLayername_(groupByProperties[0]);
        title = title + groupByProperties[0];
        groupByProperties.shift();
      } else {
        filter = undefined;
      }

      this.datasets.push(this.createDataset_({
        title: title,
        projection: datasource.projection,
        url: datasource.url
      }, filter));

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
 * @param {gmfx.SearchDirectiveDatasource} config The config of the dataset.
 * @param {(function(GeoJSONFeature): boolean)=} opt_filter Afilter function
 *     based on a GeoJSONFeaturesCollection's array.
 * @return {TypeaheadDataset} A typeahead dataset.
 * @private
 */
gmf.SearchController.prototype.createDataset_ = function(config, opt_filter) {
  var directiveScope = this.scope_;
  var compile = this.compile_;
  var bloodhoundEngine = this.createAndInitBloodhound_(config, opt_filter);
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

        var scope = directiveScope.$new(true);
        scope['feature'] = feature;

        var html = '<p>' + feature.get('label') + '</p>';
        return compile(html)(scope);
      }
    })
  });
};


/**
 * @param {string} layername The dataset "type" to keep.
 * @return {(function(GeoJSONFeature): boolean)} A filter function based on a
 *     GeoJSONFeaturesCollection's array.
 * @private
 */
gmf.SearchController.prototype.filterLayername_ = function(layername) {
  return (
      /**
       * @param {GeoJSONFeature} feature
       * @return {boolean}
       */
      function(feature) {
        return (feature['properties']['layer_name'] === layername);
      });
};


/**
 * @param {gmfx.SearchDirectiveDatasource} config The config of the dataset.
 * @param {(function(GeoJSONFeature): boolean)=} opt_filter Afilter function
 *     based on a GeoJSONFeaturesCollection's array.
 * @return {Bloodhound} The bloodhound engine.
 * @private
 */
gmf.SearchController.prototype.createAndInitBloodhound_ = function(config,
    opt_filter) {
  var url = config.url + '?query=%QUERY&';
  var mapProjectionCode = this.map_.getView().getProjection().getCode();
  var bloodhound = this.ngeoCreateGeoJSONBloodhound_(url, opt_filter,
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
  this.featureOverlay_.clear();
  this.featureOverlay_.addFeature(feature);
  var fitArray = featureGeometry.getType() === 'GeometryCollection' ?
      featureGeometry.getExtent() : featureGeometry;
  var mapSize = /** @type {ol.Size} */ (map.getSize());
  map.getView().fit(fitArray, mapSize,
      /** @type {olx.view.FitOptions} */ ({maxZoom: 16}));
};


gmfModule.controller('GmfSearchController', gmf.SearchController);
