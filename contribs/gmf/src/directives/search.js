goog.provide('gmf.SearchController');
goog.provide('gmf.searchDirective');

goog.require('gmf');
goog.require('gmf.Themes');
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


gmf.module.value('gmfSearchTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
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
 * Example flat results:
 *
 *      <gmf-search gmf-search-map="ctrl.map"
 *        gmf-search-datasources="ctrl.searchDatasources"
 *        gmf-search-currenttheme="ctrl.theme"
 *        gmf-search-clearbutton="true">
 *      </gmf-search>
 *      <script>
 *        (function() {
 *          var module = angular.module('app');
 *          module.constant('fulltextsearchUrl', '${request.route_url('fulltextsearch', _query={"limit": 20}) | n}');
 *          module.constant('gmfSearchGroups', []);
 *          module.constant('gmfSearchActions', ['add_theme', 'add_group', 'add_layer']);
 *        })();
 *      </script>
 *
 * Example with categories:
 *
 *      <gmf-search gmf-search-map="ctrl.map"
 *        gmf-search-datasources="ctrl.searchDatasources"
 *        gmf-search-currenttheme="ctrl.theme"
 *        gmf-search-clearbutton="true">
 *      </gmf-search>
 *      <script>
 *        (function() {
 *          var module = angular.module('app');
 *          module.constant('fulltextsearchUrl', '${request.route_url('fulltextsearch', _query={"limit": 30, "partitionlimit": 5}) | n}');
 *          module.constant('gmfSearchGroups', ${dumps(fulltextsearch_groups) | n});
 *          module.constant('gmfSearchActions', []);
 *        })();
 *      </script>
 *
 * @param {string} gmfSearchTemplateUrl URL to template.
 * @htmlAttribute {ol.Map} gmf-search-map The map.
 * @htmlAttribute {gmfx.SearchDirectiveDatasource} gmf-search-datasource
 *      The datasources.
 * @htmlAttribute {boolean} gmf-search-clearbutton The clear button.
 * @htmlAttribute {Object} gmf-themeselector-currenttheme The selected theme.
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
      'clearbutton': '=gmfSearchClearbutton',
      'currentTheme': '=gmfSearchCurrenttheme'
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


gmf.module.directive('gmfSearch', gmf.searchDirective);


/**
 * @constructor
 * @param {angular.Scope} $scope The directive's scope.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.CreateGeoJSONBloodhound} ngeoCreateGeoJSONBloodhound The ngeo
 *     create GeoJSON Bloodhound service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname GmfSearchController
 */
gmf.SearchController = function($scope, $compile, $timeout, gettextCatalog,
    ngeoCreateGeoJSONBloodhound, ngeoFeatureOverlayMgr, gmfThemes) {


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
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

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
    var groupValues = datasource.groupValues !== undefined ? datasource.groupValues : [];
    /** @type {Array.<string>} */
    var groupActions = datasource.groupActions ? datasource.groupActions : [];
    var filters = [];

    if (groupValues.length === 0) {
      filters.push({
        'title': undefined,
        'filter': undefined
      });
    } else {
      groupValues.forEach(function(layerName) {
        filters.push({
          'title': layerName,
          'filter': this.filterLayername_(layerName)
        });
      }, this);
      groupActions.forEach(function(action) {
        filters.push({
          'title': action,
          'filter': this.filterAction_(action)
        });
      }, this);
    }

    filters.forEach(function(filter) {
      this.datasets.push(this.createDataset_({
        bloodhoundOptions: datasource.bloodhoundOptions,
        datasetTitle: filter['title'],
        groupsKey: 'layer_name',
        labelKey: datasource.labelKey,
        projection: datasource.projection,
        typeaheadDatasetOptions: datasource.typeaheadDatasetOptions,
        url: datasource.url
      }, filter['filter']));
    }, this);
  }


  /**
   * @type {ngeox.SearchDirectiveListeners}
   * @export
   */
  this.listeners = /** @type {ngeox.SearchDirectiveListeners} */ ({
    select: gmf.SearchController.select_.bind(this),
    close: gmf.SearchController.close_.bind(this)
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
    limit: Infinity,
    source: bloodhoundEngine.ttAdapter(),
    display: function(suggestion) {
      var feature = /** @type {ol.Feature} */ (suggestion);
      return feature.get(config.labelKey);
    },
    templates: /* TypeaheadTemplates */ ({
      header: function() {
        return config.datasetTitle === undefined ? '' :
          '<div class="search-header">' + config.datasetTitle + '</div>';
      },
      suggestion: function(suggestion) {
        var feature = /** @type {ol.Feature} */ (suggestion);

        var scope = directiveScope.$new(true);
        scope['feature'] = feature;

        var html = '<p class="search-label">' + feature.get(config.labelKey) +
                   '</p>';
        html += '<p class="search-group">' + feature.get('layer_name') +
                '</p>';
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
 * @param {string} action The action to keep.
 * @return {(function(GeoJSONFeature): boolean)} A filter function based on a
 *     GeoJSONFeaturesCollection's array.
 * @private
 */
gmf.SearchController.prototype.filterAction_ = function(action) {
  return (
      /**
       * @param {GeoJSONFeature} feature
       * @return {boolean}
       */
      function(feature) {
        var properties = feature['properties'];
        if (properties['actions']) {
          // result is an action (add_theme, add_group, ...)
          // add it to the corresponding group
          return !properties['layer_name'] && properties['actions'].some(function(act) {
            return act.action === action;
          })
        } else {
          return false;
        }
      }
  );
};


/**
 * @param {string} layerName The layerName to keep.
 * @return {(function(GeoJSONFeature): boolean)} A filter function based on a
 *     GeoJSONFeaturesCollection's array.
 * @private
 */
gmf.SearchController.prototype.filterLayername_ = function(layerName) {
  return (
      /**
       * @param {GeoJSONFeature} feature
       * @return {boolean}
       */
      function(feature) {
        var properties = feature['properties'];
        return properties['layer_name'] === layerName;
      }
  );
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
  var remoteOptions = this.getBloodhoudRemoteOptions_();
  var bloodhound = this.ngeoCreateGeoJSONBloodhound_(config.url, opt_filter,
      ol.proj.get(mapProjectionCode), ol.proj.get(config.projection),
      config.bloodhoundOptions, remoteOptions);
  bloodhound.initialize();
  return bloodhound;
};


/**
 * @return {BloodhoundRemoteOptions} Options.
 * @private
 */
gmf.SearchController.prototype.getBloodhoudRemoteOptions_ = function() {
  var gettextCatalog = this.gettextCatalog_;
  return {
    prepare: function(query, settings) {
      var url = settings.url;
      var lang = gettextCatalog.currentLanguage;
      var interfaceName = 'mobile'; // FIXME dynamic interfaces
      url = goog.uri.utils.setParam(url, 'query', query);
      url = goog.uri.utils.setParam(url, 'lang', lang);
      url = goog.uri.utils.setParam(url, 'interface', interfaceName);
      settings.xhrFields = {
        withCredentials: true
      };
      settings.url = url;
      return settings;
    }
  };
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
 * @param {string} themeName The name of the theme to set.
 * @private
 */
gmf.SearchController.prototype.setTheme_ = function(themeName) {
  this.gmfThemes_.getThemesObject().then(function(themes) {
    var theme = gmf.Themes.findThemeByName(themes, themeName);
    if (theme) {
      this.scope_['currentTheme'] = theme;
    }
  }.bind(this));
};


/**
 * @export
 */
gmf.SearchController.prototype.onClearButton = function() {
  this.featureOverlay_.clear();
  this.clear();
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
 * @export
 */
gmf.SearchController.prototype.blur = function() {
  var typeahead = $('.twitter-typeahead');
  var inputs = typeahead.children('input');
  // Blur as soon as possible in digest loops
  this.timeout_(function() {
    $(inputs[1]).blur();
  });
};


/**
 * @param {jQuery.Event} event Event.
 * @param {ol.Feature} feature Feature.
 * @param {TypeaheadDataset} dataset Dataset.
 * @this {gmf.SearchController}
 * @private
 */
gmf.SearchController.select_ = function(event, feature, dataset) {
  var actions = feature.get('actions');
  if (actions) {
    for (var i = 0, ii = actions.length; i < ii; i++) {
      var action = actions[i];
      var actionName = action['action'];
      var actionData = action['data'];
      if (actionName == 'add_theme') {
        this.setTheme_(actionData);
      }
      // FIXME: handle add_layer and add_group actions
    }
  }

  var featureGeometry = /** @type {ol.geom.SimpleGeometry} */
      (feature.getGeometry());
  if (goog.isDefAndNotNull(featureGeometry)) {
    this.featureOverlay_.clear();
    this.featureOverlay_.addFeature(feature);
    var fitArray = featureGeometry.getType() === 'GeometryCollection' ?
        featureGeometry.getExtent() : featureGeometry;
    var mapSize = /** @type {ol.Size} */ (this.map_.getSize());
    this.map_.getView().fit(fitArray, mapSize,
        /** @type {olx.view.FitOptions} */ ({maxZoom: 16}));
    if (!this.clearButton) {
      this.clear();
    }
  }
  this.blur();
};


/**
 * @param {jQuery.Event} event Event.
 * @this {gmf.SearchController}
 * @private
 */
gmf.SearchController.close_ = function(event) {
  if (!this.clearButton) {
    this.setTTDropdownVisibility_();
  }
};


gmf.module.controller('GmfSearchController', gmf.SearchController);
