goog.provide('gmf.searchDirective');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
goog.require('ngeo.AutoProjection');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.colorpickerDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.popoverDirective');
/** @suppress {extraRequire} */
goog.require('gmf.FulltextSearchService');
goog.require('ol.Feature');
goog.require('ol.Map');
goog.require('ol.geom.Point');
goog.require('ol.obj');
goog.require('ol.proj');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');
goog.require('ol.uri');


gmf.module.value('gmfSearchTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
  (element, attrs) => {
    const templateUrl = attrs['gmfSearchTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/search.html`;
  });


/**
 * A directive that allows to search and recenter on a selected
 * result's feature.
 * It can search in multiple GeoJSON datasources.
 * It can filter and group results by a feature's property.
 *
 * This directive uses the {@link ngeo.FeatureOverlayMgr} to create a
 * feature overlay for drawing features on the map. The application
 * is responsible to initialize the {@link ngeo.FeatureOverlayMgr}
 * with the map.
 *
 * Example flat results:
 *
 *      <gmf-search gmf-search-map="ctrl.map"
 *        gmf-search-options="ctrl.searchOptions"
 *        gmf-search-styles="ctrl.searchStyles"
 *        gmf-search-datasources="ctrl.searchDatasources"
 *        gmf-search-coordinatesprojections="ctrl.searchCoordinatesProjections"
 *        gmf-search-clearbutton="true">
 *      </gmf-search>
 *      <script>
 *        (function() {
 *          let module = angular.module('app');
 *          module.value('fulltextsearchUrl', '${request.route_url('fulltextsearch', _query={"limit": 20}) | n}');
 *          module.value('gmfSearchGroups', []);
 *          module.constant('gmfSearchActions', [
 *                {action: 'add_theme', title: 'Add a theme'},
 *                {action: 'add_group', title: 'Add a sub theme'},
 *                {action: 'add_layer', title: 'Add a layer'}
 *          ]);
 *        })();
 *      </script>
 *
 * Example with categories:
 *
 *      <gmf-search gmf-search-map="ctrl.map"
 *        gmf-search-options="ctrl.searchOptions"
 *        gmf-search-styles="ctrl.searchStyles"
 *        gmf-search-datasources="ctrl.searchDatasources"
 *        gmf-search-coordinatesprojections="ctrl.searchCoordinatesProjections"
 *        gmf-search-clearbutton="true">
 *        gmf-search-colorchooser="true">
 *      </gmf-search>
 *      <script>
 *        (function() {
 *          let module = angular.module('app');
 *          module.value('fulltextsearchUrl', '${request.route_url('fulltextsearch', _query={"limit": 30, "partitionlimit": 5}) | n}');
 *          module.value('gmfSearchGroups', ${dumps(fulltextsearch_groups) | n});
 *          module.value('gmfSearchActions', []);
 *        })();
 *      </script>
 *
 * @param {string} gmfSearchTemplateUrl URL to template.
 * @htmlAttribute {string} gmf-search-input-value The input value (read only).
 * @htmlAttribute {ol.Map} gmf-search-map The map.
 * @htmlAttribute {TypeaheadOptions|undefined} gmf-search-options Addition Typeahead options.
 * @htmlAttribute {gmfx.SearchDirectiveDatasource} gmf-search-datasource
 *      The datasources.
 * @htmlAttribute {Object.<string, ol.style.Style>}
 *      gmf-search-styles A map of styles to apply on searched features. Keys
 *      must be the 'layer_name' propertie of features except for coordinates
 *      where the key ifor its style is the value of the constant
 *      'gmf.COORDINATES_LAYER_NAME'. The 'default' key is used to apply the
 *      default style.
 * @htmlAttribute {Array.<string>} gmf-search-coordinatesprojections codes
 *      of supported projections for coordinates search (projections must be
 *      defined in ol3). If not provided, only the map's view projection
 *      format will be supported.
 * @htmlAttribute {boolean} gmf-search-clearbutton The clear button.
 * @htmlAttribute {boolean} gmf-search-colorchooser Whether to let the user
 *      change the style of the feature on the map. Default is false.
 * @htmlAttribute {ngeox.SearchDirectiveListeners} gmf-search-listeners
 *      The listeners.
 * @htmlAttribute {number} gmf-search-maxzoom The maximum zoom we will zoom on result, default is 16.
 * @htmlAttribute {function} gmf-search-on-init Optional function called when the directive is initialized.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfSearch
 */
gmf.searchDirective = function(gmfSearchTemplateUrl) {
  return {
    restrict: 'E',
    bindToController: {
      'inputValue': '=?gmfSearchInputValue',
      'placeholder': '@?gmfSearchPlaceholder'
    },
    scope: {
      'getMapFn': '&gmfSearchMap',
      'getDatasourcesFn': '&gmfSearchDatasources',
      'typeaheadOptions': '<?gmfSearchOptions',
      'featuresStyles': '<?gmfSearchStyles',
      'clearbutton': '=gmfSearchClearbutton',
      'colorchooser': '=gmfSearchColorchooser',
      'coordinatesProjections': '=?gmfSearchCoordinatesprojections',
      'additionalListeners': '=gmfSearchListeners',
      'maxZoom': '<gmfSearchMaxzoom',
      'onInitCallback': '&?gmfSearchOnInit'
    },
    controller: 'GmfSearchController as ctrl',
    templateUrl: gmfSearchTemplateUrl,
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link(scope, element, attrs) {
      if (!scope['clearbutton']) {
        const ctrl = scope['ctrl'];
        // Empty the search field on focus and blur.
        element.find('input').on('focus blur', () => {
          ctrl.clear();
        });
      }

      const callback = scope['onInitCallback'];
      if (callback) {
        callback();
      }
    }
  };
};


gmf.module.directive('gmfSearch', gmf.searchDirective);


/**
 * @constructor
 * @private
 * @param {angular.Scope} $scope The directive's scope.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angular.$injector} $injector Main injector.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.AutoProjection} ngeoAutoProjection The ngeo coordinates service.
 * @param {ngeo.search.createGeoJSONBloodhound.Function} ngeoSearchCreateGeoJSONBloodhound The ngeo
 *     create GeoJSON Bloodhound service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {gmf.Themes} gmfThemes gmf Themes service.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {gmf.FulltextSearchService} gmfFulltextSearchService gmf Full text search service.
 * @ngInject
 * @ngdoc controller
 * @ngname GmfSearchController
 */
gmf.SearchController = function($scope, $compile, $timeout, $injector, gettextCatalog,
  ngeoAutoProjection, ngeoSearchCreateGeoJSONBloodhound, ngeoFeatureOverlayMgr,
  gmfThemes, gmfTreeManager, gmfFulltextSearchService) {


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
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {gmf.FulltextSearchService}
   * @private
   */
  this.fullTextSearch_ = gmfFulltextSearchService;

  /**
   * @type {ngeo.search.createGeoJSONBloodhound.Function}
   * @private
   */
  this.ngeoSearchCreateGeoJSONBloodhound_ = ngeoSearchCreateGeoJSONBloodhound;

  /**
   * @type {ngeo.FeatureOverlayMgr}
   * @private
   */
  this.ngeoFeatureOverlayMgr = ngeoFeatureOverlayMgr;

  /**
   * @type {ngeo.Location|undefined}
   * @private
   */
  this.ngeoLocation_;

  if ($injector.has('ngeoLocation')) {
    this.ngeoLocation_ = $injector.get('ngeoLocation');
  }

  /**
   * @type {ngeo.AutoProjection}
   * @private
   */
  this.ngeoAutoProjection_ = ngeoAutoProjection;

  const map = this.scope_['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!ol.Map}
   * @private
   */
  this.map_ = map;

  /**
   * @type {Object}
   * @private
   */
  this.styles_ = {};

  /**
   * Whether or not to show a button to clear the search text.
   * Default to false.
   * @type {boolean}
   * @export
   */
  this.clearButton = this.scope_['clearbutton'] || false;

  /**
   * @type {boolean}
   * @export
   */
  this.colorchooser = this.scope_['colorchooser'] || false;

  /**
   * @type {string}
   * @export
   */
  this.placeholder;

  /**
   * The maximum zoom we will zoom on result.
   * @type {number}
   * @export
   */
  this.maxZoom = parseInt(this.scope_['maxZoom'], 10) || 16;

  let coordProj = this.scope_['coordinatesProjections'];
  if (coordProj === undefined) {
    coordProj = [this.map_.getView().getProjection()];
  } else {
    coordProj = this.ngeoAutoProjection_.getProjectionList(coordProj);
  }
  /**
   * Supported projection for coordinates search.
   * @type {Array.<ol.proj.Projection>}
   * @private
   */
  this.coordinatesProjections_ = coordProj;

  this.initStyles_();

  /**
   * @type {ngeo.FeatureOverlay}
   * @private
   */
  this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();
  this.featureOverlay_.setStyle(this.getSearchStyle_.bind(this));

  const datasources = this.scope_['getDatasourcesFn']();
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
    highlight: true
  });

  ol.obj.assign(this.options, this.scope_['typeaheadOptions'] || {});

  /**
   * @type {Array.<TypeaheadDataset>}
   * @export
   */
  this.datasets = [];

  /**
   * @type {string}
   * @export
   */
  this.inputValue;

  // Create each datasource
  for (let i = 0; i < this.datasources_.length; i++) {
    const datasource = this.datasources_[i];

    /** @type {Array.<string>} */
    const groupValues = datasource.groupValues !== undefined ? datasource.groupValues : [];
    /** @type {Array.<string>} */
    const groupActions = datasource.groupActions ? datasource.groupActions : [];
    const filters = [];

    if (groupValues.length === 0) {
      filters.push({
        'title': '',
        'filter': this.filterLayername_()
      });
    } else {
      groupValues.forEach(function(layerName) {
        filters.push({
          'title': layerName,
          'filter': this.filterLayername_(layerName)
        });
      }, this);
    }

    groupActions.forEach(function(action) {
      filters.push({
        'title': gettextCatalog.getString(action['title']),
        'filter': this.filterAction_(action['action'])
      });
    }, this);

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

  // For searching coordinates
  this.datasets.push({
    source: this.createSearchCoordinates_(this.map_.getView()),
    name: 'coordinates',
    display: 'label',
    templates: {
      header() {
        const header = gettextCatalog.getString('Recenter to');
        return `<div class="gmf-search-header" translate>${header}</div>`;
      },
      suggestion(suggestion) {
        const coordinates = suggestion['label'];

        let html = `<p class="gmf-search-label">${coordinates}</p>`;
        html = `<div class="gmf-search-datum">${html}</div>`;
        return html;
      }
    }
  });

  /**
   * @type {string}
   * @export
   */
  this.color;

  /**
   * @type {boolean}
   * @export
   */
  this.displayColorPicker = false;

  $scope.$watch(
    () => this.color,
    this.setStyleColor.bind(this)
  );

  /**
   * @type {ngeox.SearchDirectiveListeners}
   * @export
   */
  this.listeners = this.mergeListeners_(
    this.scope_['additionalListeners'],
    /** @type {ngeox.SearchDirectiveListeners} */ ({
      select: gmf.SearchController.select_.bind(this),
      close: gmf.SearchController.close_.bind(this),
      datasetsempty: gmf.SearchController.datasetsempty_.bind(this)
    }));
};


/**
 * Called on initialization of the controller.
 */
gmf.SearchController.prototype.$onInit = function() {
  this.inputValue = this.inputValue || '';
  this.placeholder = this.placeholder || '';

  if (this.ngeoLocation_) {
    const searchQuery = this.ngeoLocation_.getParam('search');
    if (searchQuery) {
      let resultIndex = 1;
      if (this.ngeoLocation_.getParam('search-select-index')) {
        resultIndex = parseInt(this.ngeoLocation_.getParam('search-select-index'), 10);
      }
      let mapZoom;
      if (this.ngeoLocation_.getParam('map_zoom')) {
        mapZoom = parseInt(this.ngeoLocation_.getParam('map_zoom'), 10);
      }
      this.fulltextsearch_(searchQuery, resultIndex, mapZoom);
    }
  }
};


/**
 * Merges the custom listeners received via the directive attributes and the
 * listeners that are needed for this controller to function (close and select).
 * @param {ngeox.SearchDirectiveListeners} additionalListeners Custom provided
 *    listeners.
 * @param {ngeox.SearchDirectiveListeners} listeners Default listeners.
 * @return {ngeox.SearchDirectiveListeners} Merged listeners.
 * @private
 */
gmf.SearchController.prototype.mergeListeners_ = function(additionalListeners, listeners) {
  if (additionalListeners === undefined) {
    return listeners;
  }
  return {
    open: additionalListeners.open,
    close: additionalListeners.close === undefined ?
      listeners.close : function() {
        listeners.close();
        additionalListeners.close();
      },
    cursorchange: additionalListeners.cursorchange,
    datasetsempty: additionalListeners.datasetsempty,
    select: additionalListeners.select === undefined ?
      listeners.select : function(evt, obj, dataset) {
        listeners.select(evt, obj, dataset);
        additionalListeners.select(evt, obj, dataset);
      },
    autocomplete: additionalListeners.autocomplete
  };
};


/**
 * @param {gmfx.SearchDirectiveDatasource} config The config of the dataset.
 * @param {(function(GeoJSONFeature): boolean)=} opt_filter A filter function
 *     based on a GeoJSONFeaturesCollection's array.
 * @return {TypeaheadDataset} A typeahead dataset.
 * @private
 */
gmf.SearchController.prototype.createDataset_ = function(config, opt_filter) {
  const gettextCatalog = this.gettextCatalog_;
  const directiveScope = this.scope_;
  const compile = this.compile_;
  const bloodhoundEngine = this.createAndInitBloodhound_(config, opt_filter);
  const typeaheadDataset = /** @type {TypeaheadDataset} */ ({
    limit: Infinity,
    source: bloodhoundEngine.ttAdapter(),
    display(suggestion) {
      const feature = /** @type {ol.Feature} */ (suggestion);
      return feature.get(config.labelKey);
    },
    templates: /* TypeaheadTemplates */ ({
      header() {
        if (config.datasetTitle === undefined) {
          return '';
        } else {
          const header = gettextCatalog.getString(config.datasetTitle);
          return `<div class="gmf-search-header">${header}</div>`;
        }
      },
      suggestion(suggestion) {
        const feature = /** @type {ol.Feature} */ (suggestion);

        const scope = directiveScope.$new(true);
        scope['feature'] = feature;

        let html = `<p class="gmf-search-label" translate>${
          feature.get(config.labelKey)}</p>`;
        html += `<p class="gmf-search-group" translate>${feature.get('layer_name') ||
                config.datasetTitle}</p>`;
        html = `<div class="gmf-search-datum">${html}</div>`;
        return compile(html)(scope);
      }
    })
  });
  if (config.typeaheadDatasetOptions) {
    ol.obj.assign(typeaheadDataset, config.typeaheadDatasetOptions);
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
      const properties = feature['properties'];
      if (properties['actions']) {
        // result is an action (add_theme, add_group, ...)
        // add it to the corresponding group
        return !properties['layer_name'] && properties['actions'].some(act => act.action === action);
      } else {
        return false;
      }
    }
  );
};


/**
 * @param {string=} opt_layerName The layerName to keep. If null, keep all layers
 *     (In all cases, except actions layers).
 * @return {(function(GeoJSONFeature): boolean)} A filter function based on a
 *     GeoJSONFeaturesCollection's array.
 * @private
 */
gmf.SearchController.prototype.filterLayername_ = function(opt_layerName) {
  return (
  /**
       * @param {GeoJSONFeature} feature
       * @return {boolean}
       */
    function(feature) {
      const featureLayerName = feature['properties']['layer_name'];
      // Keep only layers with layer_name (don't keep action layers).
      if (featureLayerName === undefined) {
        return false;
      }
      if (opt_layerName === undefined) {
        return true;
      }
      return featureLayerName === opt_layerName;
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
  const mapProjectionCode = this.map_.getView().getProjection().getCode();
  const remoteOptions = this.getBloodhoudRemoteOptions_();
  const bloodhound = this.ngeoSearchCreateGeoJSONBloodhound_(config.url, opt_filter,
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
  const gettextCatalog = this.gettextCatalog_;
  return {
    rateLimitWait: 50,
    prepare(query, settings) {
      const url = settings.url;
      const lang = gettextCatalog.currentLanguage;
      const interfaceName = 'mobile'; // FIXME dynamic interfaces
      settings.xhrFields = {
        withCredentials: true
      };
      settings.url = ol.uri.appendParams(url, {
        'query': query,
        'lang': lang,
        'interface': interfaceName
      });
      return settings;
    }
  };
};


/**
 * @param {ol.View} view View.
 * @return {function(string, function(Object))} function defining parameters for the search suggestions.
 * @private
*/
gmf.SearchController.prototype.createSearchCoordinates_ = function(view) {
  const viewProjection = view.getProjection();
  const extent = viewProjection.getExtent();
  return function(query, callback) {
    const suggestions = [];
    const coordinates = this.ngeoAutoProjection_.stringToCoordinates(query);
    if (coordinates === null) {
      return;
    }
    const position = this.ngeoAutoProjection_.tryProjectionsWithInversion(coordinates,
      extent, viewProjection, this.coordinatesProjections_);
    if (position === null) {
      return;
    }
    suggestions.push({
      label: coordinates.join(' '),
      position,
      'tt_source': 'coordinates'
    });
    callback(suggestions);
  }.bind(this);
};


/**
 * Init the style object for the search results. It set defaults for the
 * coordinates and the polygon styles, and both can be overloaded from directive
 * attributes. The styles from directive attributes can specify custom styles
 * for each search group.
 * @private
 */
gmf.SearchController.prototype.initStyles_ = function() {
  this.styles_[gmf.COORDINATES_LAYER_NAME] = new ol.style.Style({
    image: new ol.style.RegularShape({
      stroke: new ol.style.Stroke({color: [0, 0, 0, 0.7], width: 2}),
      points: 4,
      radius: 8,
      radius2: 0,
      angle: 0
    })
  });
  const fill = new ol.style.Fill({
    color: [65, 134, 240, 0.5]
  });
  const stroke = new ol.style.Stroke({
    color: [65, 134, 240, 1],
    width: 2
  });
  this.styles_['default'] = new ol.style.Style({
    fill,
    stroke,
    image: new ol.style.Circle({
      radius: 5,
      fill,
      stroke
    })
  });
  const customStyles = this.scope_['featuresStyles'] || {};
  ol.obj.assign(this.styles_, customStyles);
};

/**
 * Style for search results.
 * @param {null|ol.Feature|ol.render.Feature} feature The searched feature.
 * @param {number} resolution The current resolution of the map.
 * @return {ol.style.Style} A style for this kind of features.
 * @private
 */
gmf.SearchController.prototype.getSearchStyle_ = function(feature, resolution) {
  goog.asserts.assert(feature);
  const style = this.styles_[feature.get('layer_name')] || this.styles_['default'];
  if (this.color) {
    const color = ol.color.asArray(this.color);
    const strokeStyle = style.getStroke();
    if (strokeStyle) {
      // 100% opacity for the stroke color
      const strokeColor = color.slice();
      strokeColor[3] = 1;
      strokeStyle.setColor(strokeColor);

      const fillStyle = style.getFill();
      if (fillStyle) {
        // 50% opacity for the fill color
        const fillColor = color.slice();
        fillColor[3] = 0.5;
        fillStyle.setColor(fillColor);
      }
    }
  }
  return style;
};

/**
 * Set a new color for the search feature style.
 * @param {string} color The color to set.
 * @export
 */
gmf.SearchController.prototype.setStyleColor = function(color) {
  if (color) {
    this.color = color;
    this.ngeoFeatureOverlayMgr.getLayer().changed();
  }
};

/**
 * @private
 */
gmf.SearchController.prototype.setTTDropdownVisibility_ = function() {
  if (this.clearButton) {
    const ttDropdown = $('.twitter-typeahead .tt-menu');
    (this.inputValue) ? ttDropdown.show() : ttDropdown.hide();
  }
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
  const typeahead = $('.twitter-typeahead');
  const ttmenu = typeahead.children('.tt-menu');
  const inputs = typeahead.children('input');
  // clear model value, the 'real' input value and tt's suggestions
  this.inputValue = '';
  $(inputs[1]).typeahead('val', '');
  ttmenu.children('.tt-dataset').empty();
  this.setTTDropdownVisibility_();
  this.displayColorPicker = false;
};


/**
 * @export
 */
gmf.SearchController.prototype.blur = function() {
  const typeahead = $('.twitter-typeahead');
  const inputs = typeahead.children('input');
  // Blur as soon as possible in digest loops
  this.timeout_(() => {
    $(inputs[1]).blur();
  });
};


/**
 * @param {jQuery.Event} event Event.
 * @param {Object|ol.Feature} suggestion Suggestion.
 * @param {TypeaheadDataset} dataset Dataset.
 * @this {gmf.SearchController}
 * @private
 */
gmf.SearchController.select_ = function(event, suggestion, dataset) {
  if (suggestion['tt_source'] === 'coordinates') {
    const geom = new ol.geom.Point(suggestion['position']);

    this.featureOverlay_.clear();
    this.featureOverlay_.addFeature(new ol.Feature({
      geometry: geom,
      'layer_name': gmf.COORDINATES_LAYER_NAME
    }));
    this.map_.getView().setCenter(suggestion['position']);
    this.leaveSearch_();
  } else {
    goog.asserts.assertInstanceof(suggestion, ol.Feature);
    this.selectFromGMF_(event, suggestion, dataset);
  }
};


/**
 * @param {jQuery.Event} event Event.
 * @param {ol.Feature} feature Feature.
 * @param {TypeaheadDataset} dataset Dataset.
 * @this {gmf.SearchController}
 * @private
 */
gmf.SearchController.prototype.selectFromGMF_ = function(event, feature, dataset) {
  const actions = feature.get('actions');
  const featureGeometry = /** @type {ol.geom.SimpleGeometry} */
      (feature.getGeometry());
  if (actions) {
    for (let i = 0, ii = actions.length; i < ii; i++) {
      const action = actions[i];
      const actionName = action['action'];
      const actionData = action['data'];
      if (actionName == 'add_theme') {
        this.gmfThemes_.getThemesObject().then((themes) => {
          const theme = gmf.Themes.findThemeByName(themes, actionData);
          if (theme) {
            this.gmfTreeManager_.addFirstLevelGroups(theme.children);
          }
        });
      } else if (actionName == 'add_group') {
        this.gmfTreeManager_.addGroupByName(actionData, true);
      } else if (actionName == 'add_layer') {
        const groupActions = /** @type {Array.<string>} */ (
          this.datasources_[0].groupActions);
        let datasourcesActionsHaveAddLayer;
        groupActions.forEach((groupAction) => {
          if (groupAction['action'] === 'add_layer') {
            return datasourcesActionsHaveAddLayer = true;
          }
        });
        if (datasourcesActionsHaveAddLayer) {
          const silent = !!featureGeometry;
          this.gmfTreeManager_.addGroupByLayerName(actionData, true, silent);
        }
      }
    }
  }

  const size = this.map_.getSize();
  if (featureGeometry && size) {
    const view = this.map_.getView();
    this.featureOverlay_.clear();
    this.featureOverlay_.addFeature(feature);
    this.displayColorPicker = true;
    const fitArray = featureGeometry.getType() === 'GeometryCollection' ?
      featureGeometry.getExtent() : featureGeometry;
    view.fit(fitArray, {
      size,
      maxZoom: this.maxZoom});
  }
  this.leaveSearch_();
};


/**
 * @private
 */
gmf.SearchController.prototype.leaveSearch_ = function() {
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


/**
 * @param {jQuery.Event} event Event.
 * @param {string} query Query.
 * @param {boolean} empty Empty.
 * @this {gmf.SearchController}
 * @private
 */
gmf.SearchController.datasetsempty_ = function(event, query, empty) {
  // workaround to display a 'no result found' in the search result when all of
  // the datasets are empty.
  // based on https://github.com/twitter/typeahead.js/issues/780#issuecomment-251554452
  // FIXME: remove this workaround when https://github.com/corejavascript/typeahead.js/issues/60 is fixed

  const menu = $('.twitter-typeahead .tt-menu');
  const message = menu.children('.gmf-search-no-results');
  if (message.length == 0) {
    const div = $('<div class="gmf-search-no-results" translate>No result found</div>');
    menu.append(div);
  }
  if (empty) {
    message.show();
    menu.show();
  } else {
    message.hide();
  }

};

/**
 * Performs a full-text search and centers the map on the first search result.
 * @param {string} query Search query.
 * @param {number} resultIndex Return nth result instead.
 * @param {number=} opt_zoom Optional zoom level.
 * @private
 */
gmf.SearchController.prototype.fulltextsearch_ = function(query, resultIndex, opt_zoom) {
  if (resultIndex < 1) { // can't be lower than one
    resultIndex = 1;
  }
  this.fullTextSearch_.search(query, {'limit': resultIndex})
    .then((data) => {
      if (data && data.features[resultIndex - 1]) {
        const format = new ol.format.GeoJSON();
        const feature = format.readFeature(data.features[resultIndex - 1]);
        this.featureOverlay_.addFeature(feature);
        const fitOptions = /** @type {olx.view.FitOptions} */ ({});
        if (opt_zoom !== undefined) {
          fitOptions.maxZoom = opt_zoom;
        }
        this.map_.getView().fit(feature.getGeometry().getExtent(), fitOptions);
        this.inputValue = /** @type {string} */ (feature.get('label'));
      }
    });
};


gmf.module.controller('GmfSearchController', gmf.SearchController);
