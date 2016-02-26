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
/** @suppress {extraRequire} */
goog.require('gmf.proj.EPSG21781');
/** @suppress {extraRequire} */
goog.require('gmf.proj.EPSG2056');

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
    var groupValues = goog.isDef(datasource.groupValues) ? datasource.groupValues : [];
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
 * @this {gmf.SearchController}
 * @private
 */
gmf.SearchController.prototype.getBloodhoudRemoteOptions_ = function() {
  var gettextCatalog = this.gettextCatalog_;
  return {
    prepare: function(query, settings) {
      var coordinates;
      var url = settings.url;
      var lang = gettextCatalog.currentLanguage;
      var interfaceName = 'mobile'; // FIXME dynamic interfaces
      var queryParsed = this.parseInput_();
      if (queryParsed === '') {
        coordinates = this.returnGeo_(); // Handles the parsed input.
      }
      url = goog.uri.utils.setParam(url, 'query', queryParsed);
      url = goog.uri.utils.setParam(url, 'lang', lang);
      url = goog.uri.utils.setParam(url, 'interface', interfaceName);
      if (coordinates) {
        url = goog.uri.utils.setParam(url, 'long', coordinates[0]);
        url = goog.uri.utils.setParam(url, 'lat', coordinates[1]);
      }
      settings.xhrFields = {
        withCredentials: true
      };
      settings.url = url;
      return settings;
    }.bind(this)
  };
};


/**
 * @param {string} query Get the coordinates.
 * @return {ol.Coordinate} Return the cleaned coordinates.
*/
gmf.SearchController.prototype.matchCoordinate_ = function(query) {
  var match = query.match(/([\d\.']+)[\s,\/]+([\d\.']+)/);
  if (match) {
    var left = parseFloat(match[1].replace(/'/g, ''));
    var right = parseFloat(match[2].replace(/'/g, ''));

    return [left, right];
  }
  return null;
};


/**
 * @return {string} Either an alpha-numerical string or null.
 * @private
 */
gmf.SearchController.prototype.parseInput_ = function() {
  var query = this.input_value;
  var inputAlpha = '^[a-zA-Z]{1}';
  var regexpAlpha = new RegExp(inputAlpha, 'g');
  var matchAlpha = query.match(regexpAlpha);

  if (matchAlpha) {
    return query;
  } else {
    return '';
  }
};


/**
 * @return {ol.Coordinate} Return the coordinates.
 * @private
 */
gmf.SearchController.prototype.returnGeo_ = function() {
  var query = this.input_value;
  var result = null;

  /*
    Codes to test for Bern:
    CH1903 / LV03: 598'655.0, 200'470.0
    CH1903+ / LV95:	2'598'655.00, 1'200'470.00
    WGS 84 (long/lat):	7.42096, 46.95531

    Inversed Coordinates to test for Bern:
    CH1903 / LV03: 200'470.0, 598'655.0
    CH1903+ / LV95:	1'200'470.00, 2'598'655.00
    WGS 84 (long/lat):	46.95531, 7.42096

    Source: https://map.geo.admin.ch/?topic=swisstopo&lang=en&bgLayer=ch.swisstopo.pixelkarte-farbe&X=200393.28&Y=596671.16&zoom=6
  */

  // Projection system array. Default is "EPSG:3857"
  var confProj = ['EPSG:4326','EPSG:2056','EPSG:21781'];

  var DMSCoordinate = '([\\d\\.\']+)[\\s,]+([\\d\\.\']+)+([\\s,]+([\\d\\.\']+)[\\s,]+([\\d\\.\']+))?';
  var DMSMinutes = '\s*([0-9]{0}[\'|′])';

  var regexpCoordinate = new RegExp(DMSCoordinate);
  var regexpDMSMinutes = new RegExp(DMSMinutes, 'g');

  // Fire the regex.
  var matchCoordinate = query.match(regexpCoordinate);
  var matchDMSMinutes = query.match(regexpDMSMinutes);

  // Set projection system.
  var projectionSystem = 'none';

  if (matchDMSMinutes) {
    var matchLength = matchDMSMinutes.length;
    switch (matchLength) {
      case 4:
        projectionSystem = confProj[1];
        break;
      case 2:
        projectionSystem = confProj[2];
        break;
      default:
        projectionSystem = 'none';
    }
  } else if (matchCoordinate) {
    projectionSystem = confProj[0];
  }

  // FIXME: Do I really need this?
  //var mapProjectionCode = this.map_.getView().getProjection().getCode();

  // If we have found a projection system, let's move on.
  if (projectionSystem != 'none') {
    var coordinate = this.matchCoordinate_(query);

    // Split the coordinates in "left" and "right"
    var left = coordinate[0];
    var right = coordinate[1];

    // Get the extent.
    var extent = [-5271708.772301536, -3713105.8482010243, 6469018.772301536, 4114045.8482010243]; // FIXME: currently static as "make check" leads to an error with the line below:
    //var extent = this.map_.getView().calculateExtent(this.map_.getSize()); // FIXME: is that right as "make check" leads to an error ???
    console.log('extent: ', extent);

    // Get the position. We need these values to show the location on the map.
    var position = '';
    position = [left > right ? left : right, right < left ? right : left];

    // Let's calculate the position we have to return. CAUTION: This is still not returning geo-coordinates that point to Bern.
    var valid = false;
    if (ol.extent.containsCoordinate(extent, position)) {
      valid = true;
    } else {
      position = ol.proj.transform(position, confProj[1], confProj[2]);
      if (ol.extent.containsCoordinate(extent, position)) {
        valid = true;
      } else {
        position = [left < right ? left : right, right > left ? right : left];
        position = ol.proj.transform(position, confProj[0], confProj[2]);
        if (ol.extent.containsCoordinate(extent, position)) {
          valid = true;
        }
      }
    }

    if (valid) {
      // Go to the position on the map, set a marker and return the geo-coordinates.
      this.map_.getView().setCenter(position); // Center the map.
      // FIXME: Here I want to set the marker, but how???

      // Return the transformed geo-coordinates.
      result = [Math.round(position[0] * 1000) / 1000, Math.round(position[1] * 1000) / 1000];
    }
  }
  return result;
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
    return;
  }

  var featureGeometry = /** @type {ol.geom.SimpleGeometry} */
      (feature.getGeometry());
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
