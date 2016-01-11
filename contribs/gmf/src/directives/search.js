goog.provide('gmf.SearchController');
goog.provide('gmf.searchDirective');

goog.require('gmf');
goog.require('ngeo.CreateGeoJSONBloodhound');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
/**
 * This goog.require is needed because it provides 'ngeo-search' used in
 * the template.
 * @suppress {extraRequire}
 */
goog.require('ngeo.searchDirective');
goog.require('ol.Map');
goog.require('ol.proj');


gmfModule.value('gmfSearchTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfSearchTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/search.html';
    });


/**
 * A "search" directive that allows to search and recenter on a selected
 * result's feature.
 * It can search in multiple GeoJSON datasources.
 * It can filter and group results by a feature's property.
 *
 * This directive uses the ngeoFeatureOverlayMgr to create a feature overlay
 * for drawing features on the map. The application is responsible to
 * initialize the ngeoFeatureOverlayMgr with the map.
 *
 * @example
 * <gmf-search gmf-search-map="ctrl.map"
 *             gmf-search-datasources="ctrl.searchDatasources"
 *             gmf-search-clearbutton="true">
 * </gmf-search>
 *
 * @param {string} gmfSearchTemplateUrl URL to template.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfSearch
 */
gmf.searchDirective = function(gmfSearchTemplateUrl) {
  return {
    restrict: 'E',
    scope: {
      'getMapFn': '&gmfSearchMap',
      'getDatasourcesFn': '&gmfSearchDatasources',
      'clearbutton': '=gmfSearchClearbutton'
    },
    controller: 'GmfSearchController',
    controllerAs: 'ctrl',
    templateUrl: gmfSearchTemplateUrl,
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Atttributes.
         */
        function(scope, element, attrs) {
          if (!scope['clearbutton']) {
            var ctrl = scope['ctrl'];
            // Empty the search field on focus and blur.
            element.find('input').on('focus blur', function() {
              ctrl.clear();
            });
          }
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
 * @ngdoc controller
 * @ngname GmfSearchController
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
   * Whether or not to show a button to clear the search text.
   * Default to false.
   * @type {boolean}
   * @export
   */
  this.clearButton = this.scope_['clearbutton'] || false;

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

  /**
   * @type {string}
   * @export
   */
  this.input_value = '';

  // Create each datasource
  for (var i = 0; i < this.datasources_.length; i++) {
    var datasource = this.datasources_[i];

    /** @type {Array.<string>} */
    var groupValues = goog.isDef(datasource.groupValues) &&
        goog.isDef(datasource.groupsKey) ? datasource.groupValues : [];
    var filter;

    do {
      var title = datasource.datasetTitle;

      if (groupValues.length > 0) {
        // Add an optional filter function to keep objects only from one
        // "layername" from a GMF's fulltextsearch service.
        filter = this.filterLayername_(datasource.groupsKey, groupValues[0]);
        title = title + groupValues[0];
        groupValues.shift();
      } else {
        filter = undefined;
      }

      this.datasets.push(this.createDataset_({
        bloodhoundOptions: datasource.bloodhoundOptions,
        datasetTitle: title,
        groupsKey: datasource.groupsKey,
        labelKey: datasource.labelKey,
        projection: datasource.projection,
        typeaheadDatasetOptions: datasource.typeaheadDatasetOptions,
        url: datasource.url
      }, filter));

    } while (groupValues.length > 0);
  }


  /**
   * @type {ngeox.SearchDirectiveListeners}
   * @export
   */
  this.listeners = /** @type {ngeox.SearchDirectiveListeners} */ ({
    select: goog.bind(gmf.SearchController.select_, this),
    close: goog.bind(gmf.SearchController.close_, this)
  });
};


/**
 * @param {gmfx.SearchDirectiveDatasource} config The config of the dataset.
 * @param {(function(GeoJSONFeature): boolean)=} opt_filter A filter function
 *     based on a GeoJSONFeaturesCollection's array.
 * @return {TypeaheadDataset} A typeahead dataset.
 * @private
 */
gmf.SearchController.prototype.createDataset_ = function(config, opt_filter) {
  var directiveScope = this.scope_;
  var compile = this.compile_;
  var bloodhoundEngine = this.createAndInitBloodhound_(config, opt_filter);
  var typeaheadDataset = /** @type {TypeaheadDataset} */ ({
    source: bloodhoundEngine.ttAdapter(),
    display: function(suggestion) {
      var feature = /** @type {ol.Feature} */ (suggestion);
      return feature.get(config.labelKey);
    },
    templates: /* TypeaheadTemplates */ ({
      header: function() {
        return '<div class="search-header">' + config.datasetTitle + '</div>';
      },
      suggestion: function(suggestion) {
        var feature = /** @type {ol.Feature} */ (suggestion);

        var scope = directiveScope.$new(true);
        scope['feature'] = feature;

        var html = '<p class="search-label">' + feature.get(config.labelKey) +
                   '</p>';
        if (config.groupsKey) {
          html += '<p class="search-group">' + feature.get(config.groupsKey) +
                  '</p>';
        }
        html = '<div class="search-datum">' + html + '</div>';
        return compile(html)(scope);
      }
    })
  });
  if (config.typeaheadDatasetOptions) {
    goog.object.extend(typeaheadDataset, config.typeaheadDatasetOptions);
  }
  return typeaheadDataset;
};


/**
 * @param {string} groupsKey key used to group this set of data.
 * @param {string} groupValue The dataset "type" to keep.
 * @return {(function(GeoJSONFeature): boolean)} A filter function based on a
 *     GeoJSONFeaturesCollection's array.
 * @private
 */
gmf.SearchController.prototype.filterLayername_ = function(groupsKey,
    groupValue) {
  return (
      /**
       * @param {GeoJSONFeature} feature
       * @return {boolean}
       */
      function(feature) {
        return (feature['properties'][groupsKey] === groupValue);
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
  var mapProjectionCode = this.map_.getView().getProjection().getCode();
  var bloodhound = this.ngeoCreateGeoJSONBloodhound_(config.url, opt_filter,
      ol.proj.get(mapProjectionCode), ol.proj.get(config.projection),
      config.bloodhoundOptions);
  bloodhound.initialize();
  return bloodhound;
};


/**
 * @private
 */
gmf.SearchController.prototype.setTTDropdownVisibility_ = function() {
  if (this.clearButton) {
    var ttDropdown = $('.twitter-typeahead .tt-menu');
    (this.input_value) ? ttDropdown.show() : ttDropdown.hide();
  }
};


/**
 * @export
 */
gmf.SearchController.prototype.clear = function() {
  var typeahead = $('.twitter-typeahead');
  var ttmenu = typeahead.children('.tt-menu');
  var inputs = typeahead.children('input');
  // clear model value, the 'real' input value and tt's suggestions
  this.input_value = '';
  $(inputs[1]).typeahead('val', '');
  ttmenu.children('.tt-dataset').empty();
  this.setTTDropdownVisibility_();
};


/**
 * @param {jQuery.Event} event Event.
 * @param {ol.Feature} feature Feature.
 * @param {TypeaheadDataset} dataset Dataset.
 * @this {gmf.SearchController}
 * @private
 */
gmf.SearchController.select_ = function(event, feature, dataset) {
  var featureGeometry = /** @type {ol.geom.SimpleGeometry} */
      (feature.getGeometry());
  this.featureOverlay_.clear();
  this.featureOverlay_.addFeature(feature);
  var fitArray = featureGeometry.getType() === 'GeometryCollection' ?
      featureGeometry.getExtent() : featureGeometry;
  var mapSize = /** @type {ol.Size} */ (this.map_.getSize());
  this.map_.getView().fit(fitArray, mapSize,
      /** @type {olx.view.FitOptions} */ ({maxZoom: 16}));
  this.clear();
};


/**
 * @param {jQuery.Event} event Event.
 * @this {gmf.SearchController}
 * @private
 */
gmf.SearchController.close_ = function(event) {
  this.setTTDropdownVisibility_();
};


gmfModule.controller('GmfSearchController', gmf.SearchController);
