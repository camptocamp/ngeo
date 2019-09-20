import angular from 'angular';

import {PermalinkParam} from 'gmf/index.js';

import gmfAuthenticationService from 'gmf/authentication/Service.js';

import gmfThemeManager, {ThemeEventType} from 'gmf/theme/Manager.js';

import gmfThemeThemes, {findThemeByName, findGroupByName} from 'gmf/theme/Themes.js';
import ngeoPopover from 'ngeo/Popover.js';

import ngeoDrawFeatures from 'ngeo/draw/features.js';

import ngeoDatasourceGroup from 'ngeo/datasource/Group.js';
import ngeoDatasourceOGC, {guessServiceTypeByUrl, Type} from 'ngeo/datasource/OGC.js';
import {Permalink3dParam} from 'ngeo/olcs/constants.js';
import ngeoFormatFeatureHash from 'ngeo/format/FeatureHash.js';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';

import ngeoMiscDebounce from 'ngeo/misc/debounce.js';

import ngeoMiscEventHelper from 'ngeo/misc/EventHelper.js';
import ngeoStatemanagerModule from 'ngeo/statemanager/module.js';
import ngeoStatemanagerService from 'ngeo/statemanager/Service.js';
import ngeoLayertreeController, {LayertreeVisitorDecision} from 'ngeo/layertree/Controller.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import {listen, unlistenByKey} from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import olGeomMultiPoint from 'ol/geom/MultiPoint.js';
import olGeomPoint from 'ol/geom/Point.js';
import olStyleIcon from 'ol/style/Icon.js';
import olStyleStyle from 'ol/style/Style.js';
import olLayerGroup from 'ol/layer/Group.js';
import {CollectionEvent} from 'ol/Collection.js';


/**
 * Configuration options for the permalink service.
 * @typedef {Object} PermalinkOptions
 * @property {import("ol/style/Style.js").StyleLike} [crosshairStyle] An alternate
 * style for the crosshair feature added by the permalink service.
 * @property {boolean} [crosshairEnabledByDefault] Display the crosshair, gets overridden by the
 * `map_crosshair` parameter. Default is `false`.
 * @property {string[]} [projectionCodes] EPSG codes (e.g. 'EPSG:3857' or '3857').
 * The permalink service will accept coordinates in these projections and try to detect which projection
 * the given coordinates are in.
 * @property {boolean} [useLocalStorage] Store the values in the local storage. Default is `false`.
 * @property {number} [pointRecenterZoom] Zoom level to use when result is a single point feature.
 * If not set the map is not zoomed to a specific zoom level.
 */


/**
 * @enum {string}
 * @hidden
 */
export const OpenLayersLayerProperties = {
  OPACITY: 'opacity'
};


/**
 * External data source separators
 * @enum {string}
 * @hidden
 */
const ExtDSSeparator = {
  LIST: ',',
  NAMES: ';'
};


/**
 * @enum {string}
 * @hidden
 */
const ParamPrefix = {
  DIMENSIONS: 'dim_',
  TREE_ENABLE: 'tree_enable_',
  TREE_GROUP_LAYERS: 'tree_group_layers_',
  TREE_GROUP_OPACITY: 'tree_group_opacity_',
  TREE_OPACITY: 'tree_opacity_',
  WFS: 'wfs_'
};


/**
 * The Permalink service for GMF, which uses the `ngeo.statemanager.Service` to
 * manage the GMF application state. Here's the list of states are are managed:
 *
 * - the map center and zoom level
 * - the current background layer selected
 * - whether to add a crosshair feature in the map or not
 * - the dimensions value
 *
 * It can also be used to add different types of things in the map,
 * such as features, external data sources, etc.
 *
 * This is made using parameters in the url, which can be static
 * (i.e. parameters that always have the same name) or dynamic
 * (i.e. parameters that have a static prefix but with a full name
 * being dynamic).
 *
 * Here's a complete list of possible parameters and what they do. But
 * first, a legend
 *
 * === Parameters [type] ===
 *
 * - `[paramameter_name]` (type)
 *     [parameter documentation]
 *
 *
 * === Parameters (static) ===
 *
 * A static parameter always have the same name.
 *
 * - `baselayer_ref` - "string"
 *     The name of the base layer that should be set visible as
 *     default in the map. If none is set, then the default one in the
 *     loaded theme is set instead.
 *
 * - `eds_n` (string), `eds_u` (string)
 *     These parameters stand for:
 *      - eds_n: "External Data Sources Names"
 *      - eds_u: "External Data Sources Urls"
 *     These parameters define external WMS/WMTS data sources to add
 *     to the map upon initialization. Both values are comma-separated
 *     lists, `eds_u` containing the urls to the services and `eds_n`
 *     the layer names (separated by `;`). Here's an example:
 *     &eds_n=a;b;c,d,e&eds_u=host1.com,host2.com,host3.com, which reads as:
 *      - host1.com - layers: a, b and c
 *      - host2.com - layers: d
 *      - host3.com - layers: e
 *     For these parameters to work properly, they must define the
 *     same number of elements, i.e. same number of names and urls.
 *
 * - `map_crosshair` (boolean)
 *     If this parameter set to `true`, then a crosshair marker will be
 *     added to the center of the map upon initialization. The marker
 *     will stay at this location.
 *
 * - `map_tooltip` (string)
 *     If set, then the text defined in this parameter will be added
 *     as a tooltip at center of the map upon initialization.
 *
 * - `map_x` (number), `map_y` (number)
 *     These two parameters define a coordinate the map view should be
 *     centered to upon initialization. The value must be in the map
 *     view projection.
 *
 * - `map_zoom` (number)
 *     Defines the zoom level the map view should be zoomed to upon
 *     initialitation.
 *
 * - `rl_features` (string)
 *     This parameter defines vector features to add to the map upon
 *     initializaton. In addition, if the application includes the
 *     draw tool, the features added can be modified. The draw tool
 *     can also be used to add new features, which are automatically
 *     added in the url.
 *
 * - `tree_groups` (string)
 *     Defines the layer groups that should be added to the layer tree
 *     upon application initialization as a comma-separated list. For
 *     example: Layers,Filters,Externals
 *
 * - `wfs_layer` (string)
 *     If set, this parameter defines the name of a layer that
 *     supports WFS to use to fetch features and add them to the map
 *     upon initialization. The dynamic parameter `wfs_[]` is
 *     required to identify the features to fetch.
 *
 * - `wfs_ngroups` (number)
 *     If set, then `wfs_layer` represents the name of a group and
 *     this property defines how many layers are in it. Requires
 *     `wfs_layer` to be set.
 *
 * - `wfs_show_features` (boolean)
 *     If set to `false` or `0`, then the features returned by the
 *     `wfs_layer` parameter will not be shown in the map.
 *
 *
 * === Parameters (dynamic) ===
 *
 * Dynamic parameters have variable names, which is always composed of:
 *  - a static prefix
 *  - a variable suffix
 *
 * The same dynamic parameter can be set multiple times, with
 * different suffix values as name.
 *
 * For example: `&wfs_a=&wfs_b=`.
 * - `wfs_` is the static prefix
 * - the name used as reference for this dynamic parameter is `wfs_[]`
 * - therefore, this example has 2 `wfs_[]` parameters set, with `a`
 *   and `b` being the variable suffix
 *
 *
 * - `dim_[]` (string)
 *     Variable suffix: the name of a dimension
 *     Value: *
 *     Defines the value of a specific dimension to set upon loading
 *     the application. For example: `&dim_time=2019-01-25T14:45:51.986Z`.
 *     WMS data sources that support the dimension set will be
 *     initialized with its value.
 *
 * - `tree_enable_[]` (boolean)
 *     Variable suffix: the name of a layer group
 *     Value: whether the group should be enabled or not in the layer tree
 *     For example: `&tree_enable_polygon=true&tree_enable_point=false`
 *     means that the group `polygon` will be enabled in the layer
 *     tree, but not `point`.
 *
 * - `tree_group_layers_[]` (string)
 *     Variable suffix: the name of a layer group
 *     Value: a comma-separated list of layers within the group that
 *     should be enabled upon initialization.
 *     For example: `&tree_group_layers_polygon=forest,lake` means
 *     that only the layers `forest` and `lake` within the group
 *     `polygon` would be enabled upon initialization.
 *
 * - `tree_opacity_[]` (number)
 *     Variable suffix: the name of a layer group
 *     Value: Number between 0 (transparent) and 1 (opaque)
 *     Defines the opacity of a layer group upon initialization.
 *
 * - `wfs_[]` (string)
 *     Variable suffix: the name of an attribute
 *     Value: A comma-separated list of values for the attribute
 *     This parameter requires `wfs_layer` in order to work
 *     properly. If set, it defines the filters to build to fetch the
 *     features to add to the map. For example:
 *     `&wfs_layer=fuel&wfs_osm_id=1420918679,441134960` the layer
 *     `fuel` will be fetched features with the attribute `osm_id`
 *     equal to `1420918679` or `441134960`.
 *     If `wfs_ngroups` is set, then an index is added to after the
 *     prefix of the `wfs_[]` parameter, for example:
 *     `wfs_ngroups=2&wfs_0_[]=&wfs_1_[]=`
 *
 *
 * === More documentation ===
 *
 * To have the whole possibilities offer by the permalink, these services
 * should be instantiated: ngeoBackgroundLayerMgr, ngeoFeatureOverlayMgr,
 * ngeoFeatureHelper, gmfPermalinkOptions, gmfThemes, gmfObjectEditingManager,
 * gmfThemeManager, defaultTheme, gmfTreeManager, ngeoWfsPermalink,
 * ngeoAutoProjection and ngeoFeatures.
 *
 * Used functionalities:
 *
 *  * `default_theme`: Theme to use by default.
 *
 * @constructor
 * @param {angular.IQService} $q The Angular $q service.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.IScope} $rootScope Angular rootScope.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {import("ngeo/misc/debounce.js").miscDebounce<function(): void>} ngeoDebounce ngeo Debounce factory.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {import("ngeo/misc/EventHelper.js").EventHelper} ngeoEventHelper Ngeo event helper service
 * @param {import("ngeo/statemanager/Service.js").StatemanagerService} ngeoStateManager The ngeo statemanager
 *    service.
 * @param {import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo location service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfPermalink
 */
export function PermalinkService(
  $q, $timeout, $rootScope, $injector, ngeoDebounce, gettextCatalog, ngeoEventHelper, ngeoStateManager,
  ngeoLocation
) {

  /**
   * @type {angular.IQService}
   * @private
   */
  this.q_ = $q;

  /**
   * @type {angular.IScope}
   * @private
   */
  this.rootScope_ = $rootScope;

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.$timeout_ = $timeout;

  // == listener keys ==

  /**
   * The key for map view 'propertychange' event.
   * @type {?import("ol/events.js").EventsKey}
   * @private
   */
  this.mapViewPropertyChangeEventKey_ = null;

  // == properties from params ==

  /**
   * @type {import("ngeo/misc/debounce.js").miscDebounce<function(): void>}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * @type {import("ngeo/misc/EventHelper.js").EventHelper}
   * @private
   */
  this.ngeoEventHelper_ = ngeoEventHelper;

  /**
   * @type {import("ngeo/statemanager/Service.js").StatemanagerService}
   * @private
   */
  this.ngeoStateManager_ = ngeoStateManager;

  /**
   * @type {?import("ol/Collection.js").default<olFeature<import("ol/geom/Geometry.js").default>>}
   * @private
   */
  this.ngeoFeatures_ = $injector.has('ngeoFeatures') ?
    $injector.get('ngeoFeatures') : null;

  /**
   * @type {?import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager}
   * @private
   */
  this.ngeoBackgroundLayerMgr_ = $injector.has('ngeoBackgroundLayerMgr') ?
    $injector.get('ngeoBackgroundLayerMgr') : null;

  /**
   * @type {?import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr}
   */
  const ngeoFeatureOverlayMgr = $injector.has('ngeoFeatureOverlayMgr') ?
    $injector.get('ngeoFeatureOverlayMgr') : null;

  /**
   * @type {?import("ngeo/map/FeatureOverlay.js").FeatureOverlay}
   * @private
   */
  this.featureOverlay_ = ngeoFeatureOverlayMgr ? ngeoFeatureOverlayMgr.getFeatureOverlay() : null;

  /**
   * @type {?import("ngeo/misc/FeatureHelper.js").FeatureHelper}
   * @private
   */
  this.featureHelper_ = $injector.has('ngeoFeatureHelper') ? $injector.get('ngeoFeatureHelper') : null;

  /**
   * @type {?import("ngeo/query/Querent.js").Querent}
   * @private
   */
  this.ngeoQuerent_ = $injector.has('ngeoQuerent') ? $injector.get('ngeoQuerent') : null;

  /**
   * The options to configure the gmf permalink service with.
   * @type {PermalinkOptions}
   */
  const gmfPermalinkOptions =
    $injector.has('gmfPermalinkOptions') ?
      $injector.get('gmfPermalinkOptions') :
      {};
  if (gmfPermalinkOptions.useLocalStorage === true) {
    // localStorage is deactivated by default
    this.ngeoStateManager_.setUseLocalStorage(true);
  }

  /**
   * @type {boolean}
   * @private
   */
  this.crosshairEnabledByDefault_ = !!gmfPermalinkOptions.crosshairEnabledByDefault;

  /**
   * @type {number|undefined}
   * @private
   */
  this.pointRecenterZoom_ = gmfPermalinkOptions.pointRecenterZoom;

  /**
   * @type {?import("gmf/datasource/ExternalDataSourcesManager.js").ExternalDatSourcesManager}
   * @private
   */
  this.gmfExternalDataSourcesManager_ = $injector.has('gmfExternalDataSourcesManager') ?
    $injector.get('gmfExternalDataSourcesManager') : null;

  /**
   * @type {?import("gmf/theme/Themes.js").ThemesService}
   * @private
   */
  this.gmfThemes_ = $injector.has('gmfThemes') ? $injector.get('gmfThemes') : null;

  /**
   * @type {?import("gmf/objectediting/Manager.js").ObjecteditingManagerService}
   * @private
   */
  this.gmfObjectEditingManager_ = $injector.has('gmfObjectEditingManager') ?
    $injector.get('gmfObjectEditingManager') : null;

  /**
   * @type {?import("gmf/theme/Manager.js").ThemeManagerService}
   * @private
   */
  this.gmfThemeManager_ = $injector.has('gmfThemeManager') ? $injector.get('gmfThemeManager') : null;

  /**
   * @type {string|undefined}
   * @private
   */
  this.defaultTheme_ = $injector.has('defaultTheme') ? $injector.get('defaultTheme') : undefined;

  /**
   * @type {?import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
   * @private
   */
  this.gmfTreeManager_ = $injector.has('gmfTreeManager') ? $injector.get('gmfTreeManager') : null;

  // == other properties ==

  /**
   * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {?import("ngeo/statemanager/WfsPermalink.js").WfsPermalinkService}
   * @private
   */
  this.ngeoWfsPermalink_ = $injector.has('ngeoWfsPermalink') ? $injector.get('ngeoWfsPermalink') : null;

  /**
   * @type {?import('gmf/authentication/Service.js').User}
   */
  this.gmfUser_ = $injector.has('gmfUser') ? $injector.get('gmfUser') : null;

  /**
   * @type {?import("ol/Map.js").default}
   * @private
   */
  this.map_ = null;

  /**
   * @type {?import("ngeo/misc/AutoProjection.js").AutoProjectionService}
   * @private
   */
  this.ngeoAutoProjection_ = $injector.has('ngeoAutoProjection') ?
    $injector.get('ngeoAutoProjection') : null;

  /**
   * @type {import("ol/events.js").EventsKey[]}
   */
  this.listenerKeys_ = [];

  /**
   * A list of projections that the coordinates in the permalink can be in.
   * @type {?Array<import("ol/proj/Projection.js").default>}
   * @private
   */
  this.sourceProjections_ = null;
  if (gmfPermalinkOptions.projectionCodes !== undefined && this.ngeoAutoProjection_) {
    const projections = this.ngeoAutoProjection_.getProjectionList(gmfPermalinkOptions.projectionCodes);
    if (projections.length > 0) {
      this.sourceProjections_ = projections;
    }
  }

  /**
   * @type {?olFeature<import("ol/geom/Geometry.js").default>}
   * @private
   */
  this.crosshairFeature_ = null;

  /**
   * @type {import("ol/style/Style.js").StyleLike}
   * @private
   */
  this.crosshairStyle_ = [];

  if (gmfPermalinkOptions.crosshairStyle !== undefined) {
    this.crosshairStyle_ = gmfPermalinkOptions.crosshairStyle;
  } else {
    this.crosshairStyle_ = [new olStyleStyle({
      image: new olStyleIcon({
        // @ts-ignore: webpack
        src: 'data:image/svg+xml;base64,' + btoa(require('gmf/permalink/crosshair.svg'))
      })
    })];
  }

  /**
   * @type {?import("ngeo/Popover.js").default}
   * @private
   */
  this.mapTooltip_ = null;

  /**
   * @type {import("ngeo/format/FeatureHash.js").default}
   * @private
   */
  this.featureHashFormat_ = new ngeoFormatFeatureHash({
    setStyle: false,
    encodeStyles: false,
    propertiesType: {
      'fillColor': ngeoFormatFeatureProperties.COLOR,
      'fillOpacity': ngeoFormatFeatureProperties.OPACITY,
      'fontColor': ngeoFormatFeatureProperties.COLOR,
      'fontSize': ngeoFormatFeatureProperties.SIZE,
      'isBox': ngeoFormatFeatureProperties.IS_RECTANGLE,
      'isCircle': ngeoFormatFeatureProperties.IS_CIRCLE,
      'isLabel': ngeoFormatFeatureProperties.IS_TEXT,
      'name': ngeoFormatFeatureProperties.NAME,
      'pointRadius': ngeoFormatFeatureProperties.SIZE,
      'showLabel': ngeoFormatFeatureProperties.SHOW_LABEL,
      'showMeasure': ngeoFormatFeatureProperties.SHOW_MEASURE,
      'strokeColor': ngeoFormatFeatureProperties.COLOR,
      'strokeWidth': ngeoFormatFeatureProperties.STROKE
    },
    defaultValues: {
      'name': feature => {
        const geometry = feature.getGeometry();
        if (!geometry) {
          throw new Error('Missing geometry');
        }
        return gettextCatalog.getString(geometry.getType());
      },
      'fillOpacity': () => 0.5,
      'showLabel': () => false,
      'showMeasure': () => false
    }
  });

  // == event listeners ==

  if (this.ngeoBackgroundLayerMgr_) {
    listen(this.ngeoBackgroundLayerMgr_, 'change', this.handleBackgroundLayerManagerChange_, this);
  }

  // visibility
  this.rootScope_.$on('ngeo-layertree-state', (event, treeCtrl, firstParent) => {
    /** @type {Object<string, string>} */
    const newState = {};
    if (firstParent.node.mixed) {
      const state = treeCtrl.getState();
      if (state !== 'on' && state !== 'off') {
        throw new Error('Wrong state');
      }
      const visible = state === 'on';
      treeCtrl.traverseDepthFirst(
        /**
         * @param {import('ngeo/layertree/Controller.js').LayertreeController} ctrl
         */
        (ctrl) => {
          const groupNode = /** @type {import('gmf/themes.js').GmfGroup} */(ctrl.node);
          if (groupNode.children === undefined) {
            const param = ParamPrefix.TREE_ENABLE + ctrl.node.name;
            newState[param] = `${visible}`;
          }
        }
      );
    } else {
      /** @type {string[]} */
      const gmfLayerNames = [];
      firstParent.traverseDepthFirst(
        /**
         * @param {import('ngeo/layertree/Controller.js').LayertreeController} ctrl
         */
        (ctrl) => {
          /**
           * @type {import('gmf/themes.js').GmfGroup}
           */
          const groupNode = treeCtrl.node;
          if (groupNode.children === undefined && ctrl.getState() === 'on') {
            gmfLayerNames.push(ctrl.node.name);
          }
        }
      );
      newState[`${ParamPrefix.TREE_GROUP_LAYERS}${firstParent.node.name}`] = gmfLayerNames.join(',');
    }
    this.ngeoStateManager_.updateState(newState);
  });
  this.rootScope_.$on('ngeo-layertree-opacity', (event, treeCtrl) => {
    /** @type {Object<string, string>} */
    const newState = {};
    const opacity = treeCtrl.layer.getOpacity();
    const stateName = `${(treeCtrl.parent.node.mixed ?
      ParamPrefix.TREE_OPACITY : ParamPrefix.TREE_GROUP_OPACITY
    )}${treeCtrl.node.name}`;
    newState[stateName] = opacity;
    this.ngeoStateManager_.updateState(newState);
  });

  // ngeoFeatures
  //   (1) read from features from the state manager first, add them
  //   (2) listen for further features added/removed
  const features = this.getFeatures();
  if (this.ngeoFeatures_) {
    features.forEach((feature) => {
      if (this.featureHelper_) {
        this.featureHelper_.setStyle(feature);
      }
      this.addNgeoFeature_(feature);
    });

    this.ngeoFeatures_.extend(features);
    listen(this.ngeoFeatures_, 'add', this.handleNgeoFeaturesAdd_, this);
    listen(this.ngeoFeatures_, 'remove', this.handleNgeoFeaturesRemove_, this);
  }

  if (this.featureHelper_) {
    this.rootScope_.$on('$localeChangeSuccess', () => {
      features.forEach((feature) => {
        if (!this.featureHelper_) {
          throw new Error('Missing featureHelper');
        }
        this.featureHelper_.setStyle(feature);
      });
    });
  }

  if (this.gmfThemeManager_) {
    this.rootScope_.$on(ThemeEventType.THEME_NAME_SET, (event, name) => {
      this.setThemeInUrl_(name);
    });
  }

  // External DataSources

  /**
   * @type {?angular.IPromise<void>}
   * @private
   */
  this.setExternalDataSourcesStatePromise_ = null;

  if (this.ngeoQuerent_ && this.gmfExternalDataSourcesManager_) {
    // First, load the external data sources that are defined in the url
    this.initExternalDataSources_().then(() => {
      if (!this.gmfExternalDataSourcesManager_) {
        throw new Error('Missing gmfExternalDataSourcesManager');
      }
      // Then, listen to the changes made to the external data sources to
      // update the url accordingly.
      listen(
        this.gmfExternalDataSourcesManager_.wmsGroupsCollection,
        'add',
        this.handleExternalDSGroupCollectionAdd_,
        this
      );
      listen(
        this.gmfExternalDataSourcesManager_.wmsGroupsCollection,
        'remove',
        this.handleExternalDSGroupCollectionRemove_,
        this
      );
      listen(
        this.gmfExternalDataSourcesManager_.wmtsGroupsCollection,
        'add',
        this.handleExternalDSGroupCollectionAdd_,
        this
      );
      listen(
        this.gmfExternalDataSourcesManager_.wmtsGroupsCollection,
        'remove',
        this.handleExternalDSGroupCollectionRemove_,
        this
      );

      // We also need to 'register' the existing groups as well, i.e. those
      // that were created by the Permalink
      for (const wmsGroup of this.gmfExternalDataSourcesManager_.wmsGroups) {
        this.registerExternalDSGroup_(wmsGroup);
      }
      for (const wmtsGroup of this.gmfExternalDataSourcesManager_.wmtsGroups) {
        this.registerExternalDSGroup_(wmtsGroup);
      }
    });
  }

  this.initLayers_();
}


// === Map X, Y, Z ===

/**
 * Get the coordinate to use to initialize the map view from the state manager.
 * @return {?import("ol/coordinate.js").Coordinate} The coordinate for the map view center.
 */
PermalinkService.prototype.getMapCenter = function() {
  if (!this.map_) {
    throw new Error('Missing map');
  }
  const x = this.ngeoStateManager_.getInitialNumberValue(PermalinkParam.MAP_X);
  const y = this.ngeoStateManager_.getInitialNumberValue(PermalinkParam.MAP_Y);

  if (x !== undefined && y !== undefined && !isNaN(x) && !isNaN(y)) {
    const center = [x, y];
    if (this.sourceProjections_ !== null && this.ngeoAutoProjection_) {
      const targetProjection = this.map_.getView().getProjection();
      const reprojectedCenter = this.ngeoAutoProjection_.tryProjectionsWithInversion(
        center, targetProjection.getExtent(), targetProjection,
        this.sourceProjections_);
      if (reprojectedCenter) {
        return reprojectedCenter;
      }
    }
    return center;
  }
  return null;
};


/**
 * Get the zoom level to use to initialize the map view from the state manager.
 * @return {number|undefined} The zoom for the map view.
 */
PermalinkService.prototype.getMapZoom = function() {
  const zoom = this.ngeoStateManager_.getInitialNumberValue(PermalinkParam.MAP_Z);
  return zoom !== undefined && isNaN(zoom) ? undefined : zoom;
};


// === Map crosshair ===


/**
 * Get the map crosshair property from the state manager, if defined.
 * @return {boolean} Whether map crosshair property is set or not.
 */
PermalinkService.prototype.getMapCrosshair = function() {
  const crosshair = this.ngeoStateManager_.getInitialBooleanValue(PermalinkParam.MAP_CROSSHAIR);
  return crosshair === undefined ? this.crosshairEnabledByDefault_ : crosshair;
};


/**
 * Sets the map crosshair to the center (or the map center if nothing provided).
 * Overwrites an existing map crosshair.
 * @param {?import("ol/coordinate.js").Coordinate=} opt_center Optional center coordinate.
 */
PermalinkService.prototype.setMapCrosshair = function(opt_center) {
  if (!this.map_) {
    throw new Error('Missing map');
  }
  if (!this.featureOverlay_) {
    throw new Error('Missing featureOverlay');
  }
  let crosshairCoordinate;
  if (opt_center) {
    crosshairCoordinate = opt_center;
  } else {
    crosshairCoordinate = this.map_.getView().getCenter();
  }
  if (!Array.isArray(crosshairCoordinate)) {
    throw new Error('Wrong crosshairCoordinate');
  }

  // remove existing crosshair first
  if (this.crosshairFeature_) {
    this.featureOverlay_.removeFeature(this.crosshairFeature_);
  }
  // set new crosshair
  this.crosshairFeature_ = new olFeature(new olGeomPoint(crosshairCoordinate));
  this.crosshairFeature_.setStyle(this.crosshairStyle_);

  // add to overlay
  this.featureOverlay_.addFeature(this.crosshairFeature_);
};


// === Map tooltip ===


/**
 * Get the tooltip text from the state manager.
 * @return {string|undefined} Tooltip text.
 */
PermalinkService.prototype.getMapTooltip = function() {
  return this.ngeoStateManager_.getInitialStringValue(PermalinkParam.MAP_TOOLTIP);
};

/**
 * Sets the map tooltip to the center (or the map center if nothing provided).
 * Overwrites an existing map tooltip.
 * @param {string} tooltipText Text to display in tooltip.
 * @param {?import("ol/coordinate.js").Coordinate=} opt_center Optional center coordinate.
 */
PermalinkService.prototype.setMapTooltip = function(tooltipText, opt_center) {
  if (!this.map_) {
    throw new Error('Missing map');
  }
  /** @type {import("ol/coordinate.js").Coordinate} */
  let tooltipPosition;
  if (opt_center) {
    tooltipPosition = opt_center;
  } else {
    const center = this.map_.getView().getCenter();
    if (!center) {
      throw new Error('Missing center');
    }
    tooltipPosition = center;
  }
  if (!Array.isArray(tooltipPosition)) {
    throw new Error('Wrong tooltipPosition type');
  }

  const div = $('<div/>', {
    'class': 'gmf-permalink-tooltip',
    'text': tooltipText
  })[0];

  if (this.mapTooltip_ !== null) {
    this.map_.removeOverlay(this.mapTooltip_);
  }

  this.mapTooltip_ = new ngeoPopover({
    element: div,
    position: tooltipPosition
  });

  this.map_.addOverlay(this.mapTooltip_);
};


// === NgeoFeatures (A.K.A. DrawFeature, RedLining) ===


/**
 * Get the ngeo features from the state manager for initialization purpose
 * @return {Array<olFeature<import("ol/geom/Geometry.js").default>>} The features read from the state manager.
 */
PermalinkService.prototype.getFeatures = function() {
  const f = this.ngeoStateManager_.getInitialStringValue(PermalinkParam.FEATURES);
  if (f !== undefined && f !== '') {
    return this.featureHashFormat_.readFeatures(f);
  }
  return [];
};


/**
 * @param {Object<string, string>} dimensions The global dimensions object.
 */
PermalinkService.prototype.setDimensions = function(dimensions) {
  // apply initial state
  const keys = this.ngeoLocation_.getParamKeysWithPrefix(ParamPrefix.DIMENSIONS);
  for (const key of keys) {
    const value = this.ngeoLocation_.getParam(key);
    if (!value) {
      throw new Error('Missing value');
    }
    dimensions[key.slice(ParamPrefix.DIMENSIONS.length)] = value;
  }

  this.rootScope_.$watchCollection(() => dimensions, (dimensions) => {
    /** @type {Object<string, string>} */
    const params = {};
    for (const key in dimensions) {
      params[ParamPrefix.DIMENSIONS + key] = dimensions[key];
    }
    this.ngeoLocation_.updateParams(params);
  });
};


/**
 * Bind an ol3 map object to this service. The service will, from there on,
 * listen to the properties changed within the map view and update the following
 * state properties: map_x, map_y and map_zoom.
 *
 * If the service is already bound to a map, those events are unlistened first.
 *
 * @param {?import("ol/Map.js").default} map The ol3 map object.
 */
PermalinkService.prototype.setMap = function(map) {

  if (map === this.map_) {
    return;
  }

  if (this.map_) {
    this.unregisterMap_();
    this.map_ = null;
  }

  if (map) {
    this.map_ = map;
    if (this.gmfObjectEditingManager_) {
      this.gmfObjectEditingManager_.getFeature().then((feature) => {
        this.registerMap_(map, feature);
      });
    } else {
      this.registerMap_(map, null);
    }
  }
};


/**
 * Listen to the map view property change and update the state accordingly.
 * @param {import("ol/Map.js").default} map The ol3 map object.
 * @param {?olFeature<import("ol/geom/Geometry.js").default>} oeFeature ObjectEditing feature
 * @private
 */
PermalinkService.prototype.registerMap_ = function(map, oeFeature) {

  const view = map.getView();
  let center;

  // (1) Initialize the map view with either:
  //     a) the given ObjectEditing feature
  //     b) the X, Y and Z available within the permalink service, if available
  const geom = typeof oeFeature !== 'undefined' && oeFeature !== null ? oeFeature.getGeometry() : undefined;
  if (geom) {
    const size = map.getSize();
    if (!size) {
      throw new Error('Missing size');
    }
    let maxZoom;
    if (geom instanceof olGeomPoint || geom instanceof olGeomMultiPoint) {
      maxZoom = this.pointRecenterZoom_;
    }
    /** @type {import('ol/View.js').FitOptions} */
    const options = {
      size,
    };
    if (maxZoom) {
      options.maxZoom = maxZoom;
    }
    view.fit(geom.getExtent(), options);
  } else {
    const enabled3d = this.ngeoStateManager_.getInitialBooleanValue(Permalink3dParam.ENABLED);
    if (!enabled3d) {
      center = this.getMapCenter();
      if (center) {
        view.setCenter(center);
      }
      const zoom = this.getMapZoom();
      if (zoom !== undefined) {
        view.setZoom(zoom);
      }
    }
  }

  // (2) Listen to any property changes within the view and apply them to
  //     the permalink service
  this.mapViewPropertyChangeEventKey_ = listen(view, 'propertychange', this.ngeoDebounce_(() => {
    const center = view.getCenter();
    if (!center) {
      throw new Error('Missing center');
    }
    const zoom = view.getZoom();
    /** @type {Object<string, string>} */
    const object = {};
    object[PermalinkParam.MAP_X] = `${Math.round(center[0])}`;
    object[PermalinkParam.MAP_Y] = `${Math.round(center[1])}`;
    object[PermalinkParam.MAP_Z] = `${zoom}`;
    this.ngeoStateManager_.updateState(object);
  }, 300, /* invokeApply */ true), this);

  // (3) Add map crosshair, if set
  if (this.getMapCrosshair() && this.featureOverlay_) {
    this.setMapCrosshair(center);
  }

  // (4) Add map tooltip, if set
  const tooltipText = this.getMapTooltip();
  if (tooltipText) {
    this.setMapTooltip(tooltipText, center);
  }

  // (6) check for a wfs permalink
  const wfsPermalinkData = this.getWfsPermalinkData_();
  if (wfsPermalinkData !== null && this.ngeoWfsPermalink_) {
    this.ngeoWfsPermalink_.issue(wfsPermalinkData, map);
  }
};


/**
 * Remove any event listeners from the current map.
 * @private
 */
PermalinkService.prototype.unregisterMap_ = function() {
  if (!this.mapViewPropertyChangeEventKey_) {
    throw new Error('Missing mapViewPropertyChangeEventKey');
  }
  unlistenByKey(this.mapViewPropertyChangeEventKey_);
  this.mapViewPropertyChangeEventKey_ = null;
};


// === Background layer ===


/**
 * Get the background layer object to use to initialize the map from the state manager.
 * @param {Array<import("ol/layer/Base.js").default>} layers Array of background layer objects.
 * @return {?import("ol/layer/Base.js").default} Background layer.
 */
PermalinkService.prototype.getBackgroundLayer = function(layers) {
  const layerName = this.ngeoStateManager_.getInitialStringValue(PermalinkParam.BG_LAYER);
  if (layerName !== undefined) {
    for (const layer of layers) {
      if (layer.get('label') === layerName) {
        return layer;
      }
    }
  }
  return null;
};


/**
 * Get the background layer opacity to use to initialize the map from the state manager.
 * @return {?number} Opacity.
 */
PermalinkService.prototype.getBackgroundLayerOpacity = function() {
  const opacity_ = this.ngeoStateManager_.getInitialNumberValue(PermalinkParam.BG_LAYER_OPACITY);
  return opacity_ === undefined ? null : opacity_ / 100;
};


/**
 * Called when the background layer changes. Update the state using the
 * background layer label, i.e. its name.
 * @private
 */
PermalinkService.prototype.handleBackgroundLayerManagerChange_ = function() {
  if (!this.map_ || !this.ngeoBackgroundLayerMgr_) {
    return;
  }

  // get layer label, i.e its name
  const layer = this.ngeoBackgroundLayerMgr_.get(this.map_);
  if (!layer) {
    throw new Error('Missing layer');
  }
  const layerName = layer.get('label');
  if (typeof layerName != 'string') {
    throw new Error('Wrong layerName type');
  }

  // set it in state
  /** @type {Object<string, string>} */
  const object = {};
  object[PermalinkParam.BG_LAYER] = layerName;
  this.ngeoStateManager_.updateState(object);

  const backgroundLayer = this.ngeoBackgroundLayerMgr_.getOpacityBgLayer(this.map_);
  if (backgroundLayer) {
    const opacity = this.getBackgroundLayerOpacity();
    if (opacity !== null) {
      backgroundLayer.setOpacity(opacity);
    } else {
      const opacity = backgroundLayer.getOpacity();
      /** @type {Object<string, string>} */
      const object = {};
      object[PermalinkParam.BG_LAYER_OPACITY] = `${opacity * 100}`;
      this.ngeoStateManager_.updateState(object);
    }
    listen(backgroundLayer, 'change:opacity', () => {
      const opacity = backgroundLayer.getOpacity();
      /** @type {Object<string, string>} */
      const object = {};
      object[PermalinkParam.BG_LAYER_OPACITY] = `${opacity * 100}`;
      this.ngeoStateManager_.updateState(object);
    });
  }
};


// === Layers (layer tree) ===


/**
 * Get the current first level node names in the tree manager and update the
 * correspondent state of the permalink.
 */
PermalinkService.prototype.refreshFirstLevelGroups = function() {
  if (!this.gmfTreeManager_) {
    return;
  }
  if (!this.gmfTreeManager_.rootCtrl) {
    throw new Error('Missing gmfTreeManager_.rootCtrl');
  }
  // Get first-level-groups order
  const groupNode = /** @type {import('gmf/themes.js').GmfGroup} */(this.gmfTreeManager_.rootCtrl.node);
  const groupNodes = groupNode.children;
  const orderedNames = groupNodes ? groupNodes.map(node => node.name) : [];

  // set it in state
  /** @type {Object<string, string>} */
  const object = {};
  object[PermalinkParam.TREE_GROUPS] = orderedNames.join(',');
  this.ngeoStateManager_.updateState(object);
};


/**
 * Return true if there is a theme specified in the URL path.
 * @private
 * @param {string[]} pathElements Array of path elements.
 * @return {boolean} theme in path.
 */
PermalinkService.prototype.themeInUrl_ = function(pathElements) {
  const indexOfTheme = pathElements.indexOf('theme');
  return indexOfTheme != -1 && indexOfTheme == pathElements.length - 2;
};


/**
 * @param {string} themeName Theme name.
 * @private
 */
PermalinkService.prototype.setThemeInUrl_ = function(themeName) {
  const path = this.ngeoLocation_.getPath();
  if (!path) {
    throw new Error('Missing path');
  }
  if (themeName) {
    const pathElements = path.split('/');
    if (pathElements.length <= 1) {
      throw new Error('Wrong pathElements');
    }
    if (pathElements[pathElements.length - 1] === '') {
      // case where the path is just "/"
      pathElements.splice(pathElements.length - 1);
    }
    if (this.themeInUrl_(pathElements)) {
      pathElements[pathElements.length - 1] = themeName;
    } else {
      pathElements.push('theme', themeName);
    }
    this.ngeoLocation_.setPath(pathElements.join('/'));
  }
};


/**
 * Get the default theme from url, local storage, user functionalities or
 * defaultTheme constant.
 * @return {?string} default theme name.
 */
PermalinkService.prototype.defaultThemeName = function() {
  const path = this.ngeoLocation_.getPath();
  if (!path) {
    throw new Error('Missing path');
  }
  // check if we have a theme in url
  const pathElements = path.split('/');
  if (this.themeInUrl_(pathElements)) {
    return decodeURI(pathElements[pathElements.length - 1]);
  }

  // check if we have a theme in the local storage
  const tn = this.ngeoStateManager_.getInitialStringValue('theme');
  if (tn) {
    return tn;
  }

  const defaultTheme = this.defaultThemeNameFromFunctionalities();
  if (defaultTheme !== null) {
    return defaultTheme;
  }

  // fallback to the defaultTheme constant
  if (this.defaultTheme_) {
    return this.defaultTheme_;
  }

  return null;
};


/**
 * Get the default theme from user functionalities.
 * @return {?string} default theme name.
 */
PermalinkService.prototype.defaultThemeNameFromFunctionalities = function() {
  //check if we have a theme in the user functionalities
  if (!this.gmfUser_) {
    return null;
  }
  const functionalities = this.gmfUser_.functionalities;
  if (functionalities && 'default_theme' in functionalities) {
    const defaultTheme = functionalities.default_theme;
    if (defaultTheme.length > 0) {
      return defaultTheme[0];
    }
  }
  return null;
};


/**
 * @private
 */
PermalinkService.prototype.initLayers_ = function() {
  const initialUri = window.location.href;
  let authenticationRequired = false;

  if (!this.gmfThemes_) {
    return;
  }
  this.gmfThemes_.getThemesObject().then((themes) => {
    const themeName = this.defaultThemeName();

    if (this.gmfThemeManager_) {
      this.gmfThemeManager_.setThemeName(this.gmfThemeManager_.modeFlush ? themeName : '');
    }

    /**
     * @type {Array<(import('gmf/themes.js').GmfGroup)>}
     */
    let firstLevelGroups = [];
    let theme;
    // Check if we have the groups in the permalink
    const groupsNames = this.ngeoLocation_.getParam(PermalinkParam.TREE_GROUPS);
    if (groupsNames === undefined) {
      theme = findThemeByName(themes, themeName);
      if (theme) {
        firstLevelGroups = theme.children;
      }
    } else {
      groupsNames.split(',').forEach((groupName) => {
        const group = findGroupByName(themes, groupName);
        if (group) {
          firstLevelGroups.push(group);
        } else {
          authenticationRequired = true;
        }
      });
    }

    if (this.gmfTreeManager_) {
      this.gmfTreeManager_.setFirstLevelGroups(firstLevelGroups);
    }

    this.$timeout_(() => {
      if (!this.gmfTreeManager_ || !this.gmfTreeManager_.rootCtrl) {
        // we don't have any layertree
        if (authenticationRequired && this.gmfUser_ && this.gmfUser_.roles === null) {
          this.rootScope_.$broadcast('authenticationrequired', {url: initialUri});
        }
        return;
      }

      /**
       * Enable the layers and set the opacity
       * @param {import('ngeo/layertree/Controller.js').LayertreeController} treeCtrl Controller
       * @return {LayertreeVisitorDecision|undefined} the result
       */
      const visitor = (treeCtrl) => {
        if (treeCtrl.isRoot) {
          return undefined;
        }
        const groupNode = /** @type {import('gmf/themes.js').GmfGroup} */(treeCtrl.node);
        const parentGroupNode = /** @type {import('gmf/themes.js').GmfGroup} */(treeCtrl.parent.node);

        const opacity = this.ngeoStateManager_.getInitialNumberValue((
          parentGroupNode.mixed ?
            ParamPrefix.TREE_OPACITY :
            ParamPrefix.TREE_GROUP_OPACITY
        ) + treeCtrl.node.name);
        if (opacity !== undefined && treeCtrl.layer) {
          treeCtrl.layer.setOpacity(opacity);
        }
        if (treeCtrl.parent.node && parentGroupNode.mixed && groupNode.children == undefined) {
          // Layer of a mixed group
          const enable = this.ngeoStateManager_.getInitialBooleanValue(
            ParamPrefix.TREE_ENABLE + treeCtrl.node.name
          );
          if (enable !== undefined) {
            treeCtrl.setState(enable ? 'on' : 'off', false);
          }
        } else if (!groupNode.mixed && treeCtrl.depth == 1) {
          // First level non mixed group
          const groupLayers = this.ngeoStateManager_.getInitialStringValue(
            ParamPrefix.TREE_GROUP_LAYERS + treeCtrl.node.name
          );
          if (groupLayers !== undefined) {
            const groupLayersArray = groupLayers == '' ? [] : groupLayers.split(',');

            /**
             * Enable the layers and set the opacity
             * @param {import('ngeo/layertree/Controller.js').LayertreeController} treeCtrl Controller
             * @return {LayertreeVisitorDecision|undefined} the result
             */
            const visitor = (treeCtrl) => {
              const groupNode = /** @type {import('gmf/themes.js').GmfGroup} */(treeCtrl.node);
              if (groupNode.children === undefined) {
                const enable = groupLayersArray.includes(treeCtrl.node.name);
                if (enable) {
                  groupLayersArray.splice(groupLayersArray.indexOf(treeCtrl.node.name), 1);
                }
                treeCtrl.setState(enable ? 'on' : 'off', false);
              }
              return undefined;
            };
            treeCtrl.traverseDepthFirst(visitor);
            if (groupLayersArray.length > 0) {
              authenticationRequired = true;
            }
          }
        }
      };
      this.gmfTreeManager_.rootCtrl.traverseDepthFirst(visitor);
      const firstParents = this.gmfTreeManager_.rootCtrl.children;
      firstParents.forEach((firstParent) => {
        firstParent.traverseDepthFirst((treeCtrl) => {
          if (treeCtrl.getState() !== 'indeterminate') {
            this.rootScope_.$broadcast('ngeo-layertree-state', treeCtrl, firstParent);
            return LayertreeVisitorDecision.STOP;
          }
        });
      });

      if (authenticationRequired && this.gmfUser_ && this.gmfUser_.roles === null) {
        this.rootScope_.$broadcast('authenticationrequired', {url: initialUri});
      }
    });
  });
};


// === ngeoFeatures, A.K.A features from the DrawFeature, RedLining  ===


/**
 * @param {Event|import('ol/events/Event.js').default} event Collection event.
 * @private
 */
PermalinkService.prototype.handleNgeoFeaturesAdd_ = function(event) {
  if (event instanceof CollectionEvent) {
    const feature = event.element;
    if (!(feature instanceof olFeature)) {
      throw new Error('Wrong feature type');
    }
    this.addNgeoFeature_(feature);
  }
};


/**
 * @param {Event|import('ol/events/Event.js').default} event Collection event.
 * @private
 */
PermalinkService.prototype.handleNgeoFeaturesRemove_ = function(event) {
  if (event instanceof CollectionEvent) {
    const feature = event.element;
    if (!(feature instanceof olFeature)) {
      throw new Error('Wrong feature type');
    }
    this.removeNgeoFeature_(feature);
  }
};


/**
 * Listen to any changes that may occur within the feature in order to
 * update the state of the permalink accordingly.
 * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
 * @private
 */
PermalinkService.prototype.addNgeoFeature_ = function(feature) {
  const uid = olUtilGetUid(feature);
  this.ngeoEventHelper_.addListenerKey(
    uid,
    listen(feature, 'change', this.ngeoDebounce_(this.handleNgeoFeaturesChange_, 250, true), this)
  );
};


/**
 * Unregister any event listener from the feature.
 * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
 * @private
 */
PermalinkService.prototype.removeNgeoFeature_ = function(feature) {
  const uid = olUtilGetUid(feature);
  this.ngeoEventHelper_.clearListenerKey(uid);
  this.handleNgeoFeaturesChange_();
};


/**
 * Called once upon initialization of the permalink service if there's at
 * least one feature in the ngeoFeatures collection, then called every time
 * the collection changes or any of the features within the collection changes.
 * @private
 */
PermalinkService.prototype.handleNgeoFeaturesChange_ = function() {
  if (!this.ngeoFeatures_) {
    return;
  }
  const features = this.ngeoFeatures_.getArray();
  const data = this.featureHashFormat_.writeFeatures(features);

  /** @type {Object<string, string>} */
  const object = {};
  object[PermalinkParam.FEATURES] = data;
  this.ngeoStateManager_.updateState(object);
};


/**
 * Get the query data for a WFS permalink.
 * @return {?import('ngeo/statemanager/WfsPermalink.js').WfsPermalinkData} The query data.
 * @private
 */
PermalinkService.prototype.getWfsPermalinkData_ = function() {
  const wfsLayer = this.ngeoLocation_.getParam(PermalinkParam.WFS_LAYER);
  if (!wfsLayer) {
    return null;
  }

  const numGroups = this.ngeoLocation_.getParamAsInt(PermalinkParam.WFS_NGROUPS);
  const paramKeys = this.ngeoLocation_.getParamKeysWithPrefix(ParamPrefix.WFS);

  const filterGroups = [];
  let filterGroup;
  if (numGroups === undefined) {
    // no groups are used, e.g. '?wfs_layer=fuel&wfs_osm_id=123
    filterGroup = this.createFilterGroup_(ParamPrefix.WFS, paramKeys);
    if (filterGroup !== null) {
      filterGroups.push(filterGroup);
    }
  } else {
    // filter groups are used, e.g. '?wfs_layer=osm_scale&wfs_ngroups=2&wfs_0_ele=380&
    // wfs_0_highway=bus_stop&&wfs_1_name=Grand-Pont'
    for (let i = 0; i < numGroups; i++) {
      filterGroup = this.createFilterGroup_(`${ParamPrefix.WFS}${i}_`, paramKeys);
      if (filterGroup !== null) {
        filterGroups.push(filterGroup);
      }
    }
  }

  if (filterGroups.length == 0) {
    return null;
  }

  const showFeaturesParam = this.ngeoLocation_.getParam(PermalinkParam.WFS_SHOW_FEATURES);
  const showFeatures = !(showFeaturesParam === '0' || showFeaturesParam === 'false');

  return {
    wfsType: wfsLayer,
    showFeatures: showFeatures,
    filterGroups: filterGroups
  };
};


/**
 * Create a filter group for a given prefix from the query params.
 * @param {string} prefix E.g. `wfs_` or `wfs_0_`.
 * @param {string[]} paramKeys All param keys starting with `wfs_`.
 * @return {import('ngeo/statemanager/WfsPermalink.js').WfsPermalinkFilterGroup|null} A filter group.
 * @private
 */
PermalinkService.prototype.createFilterGroup_ = function(prefix, paramKeys) {
  /**
   * @type {Array<import('ngeo/statemanager/WfsPermalink.js').WfsPermalinkFilter>}
   */
  const filters = [];

  paramKeys.forEach((paramKey) => {
    if (paramKey == PermalinkParam.WFS_LAYER || paramKey == PermalinkParam.WFS_SHOW_FEATURES ||
        paramKey == PermalinkParam.WFS_NGROUPS || !paramKey.startsWith(prefix)) {
      return;
    }
    const value = this.ngeoLocation_.getParam(paramKey);
    if (!value) {
      return;
    }

    const condition = value.split(',');
    const filter = {
      property: paramKey.replace(prefix, ''),
      condition: condition
    };
    filters.push(filter);
  });

  return (filters.length > 0) ? {filters} : null;
};


// === External Data Sources management ===


/**
 * @return {angular.IPromise<void>} Promise
 * @private
 */

PermalinkService.prototype.initExternalDataSources_ = function() {
  if (!this.ngeoQuerent_) {
    throw new Error('Missing ngeoQuerent');
  }
  if (!this.gmfExternalDataSourcesManager_) {
    throw new Error('Missing gmfExternalDataSourcesManager');
  }
  const ngeoQuerent = this.ngeoQuerent_;
  const gmfExtDSManager = this.gmfExternalDataSourcesManager_;

  const promises = [];

  const layerNamesString = this.ngeoStateManager_.getInitialStringValue(
    PermalinkParam.EXTERNAL_DATASOURCES_NAMES);
  const urlsString = this.ngeoStateManager_.getInitialStringValue(
    PermalinkParam.EXTERNAL_DATASOURCES_URLS);

  if (layerNamesString && urlsString) {

    const layerNames = layerNamesString.split(ExtDSSeparator.LIST);
    const urls = urlsString.split(ExtDSSeparator.LIST);

    for (let i = 0, ii = urls.length; i < ii; i++) {
      // Stop iterating if we do not have the same number of urls and layer
      // names
      const groupLayerNamesString = layerNames[i];

      if (!groupLayerNamesString) {
        break;
      }

      const groupLayerNames = groupLayerNamesString.split(
        ExtDSSeparator.NAMES);
      const url = urls[i];

      const serviceType = guessServiceTypeByUrl(url);

      const getCapabilitiesDefer = this.q_.defer();
      promises.push(getCapabilitiesDefer.promise);

      if (serviceType === Type.WMS) {
        ngeoQuerent.wmsGetCapabilities(url).then(
          (capabilities) => {
            getCapabilitiesDefer.resolve({
              capabilities,
              groupLayerNames,
              serviceType,
              url
            });
          },
          () => {
            // Query to the WMS service didn't work
            getCapabilitiesDefer.reject({
              groupLayerNames,
              serviceType,
              url
            });
          }
        );
      } else if (serviceType === Type.WMTS) {
        ngeoQuerent.wmtsGetCapabilities(url).then(
          (capabilities) => {
            getCapabilitiesDefer.resolve({
              capabilities,
              groupLayerNames,
              serviceType,
              url
            });
          },
          () => {
            // Query to the WMTS service didn't work
            getCapabilitiesDefer.reject({
              groupLayerNames,
              serviceType,
              url
            });
          }
        );
      } else {
        // Wrong service type
        getCapabilitiesDefer.reject({
          groupLayerNames,
          serviceType,
          url
        });
      }
    }
  }

  return this.q_.all(promises).then(
    (responses) => {
      for (const response of responses) {

        // WMS - For each layer name, find its layer capability object, then
        //       create the data source
        if (response.serviceType === Type.WMS) {
          for (const layerName of response.groupLayerNames) {
            const layerCap = ngeoQuerent.wmsFindLayerCapability(
              response.capabilities.Capability.Layer.Layer,
              layerName
            );
            if (layerCap) {
              gmfExtDSManager.createAndAddDataSourceFromWMSCapability(
                layerCap,
                response.capabilities,
                response.url
              );
            } else {
              // TODO - handle 'not found' layer in capabilities
            }
          }

        } else if (response.serviceType === Type.WMTS) {

          // WMTS - For each layer name, find its layer capability object, then
          //        create the data source
          for (const layerName of response.groupLayerNames) {
            const layerCap = ngeoQuerent.wmtsFindLayerCapability(
              response.capabilities.Contents.Layer,
              layerName
            );
            if (layerCap) {
              gmfExtDSManager.createAndAddDataSourceFromWMTSCapability(
                layerCap,
                response.capabilities,
                response.url
              );
            } else {
              // TODO - handle 'not found' layer in capabilities
            }
          }
        }
      }
    },
    (rejections) => {
      // TODO - handle rejections
    }
  );
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Collection event.
 * @private
 */
PermalinkService.prototype.handleExternalDSGroupCollectionAdd_ = function(evt) {
  if (evt instanceof CollectionEvent) {
    const group = evt.element;
    if (!(group instanceof ngeoDatasourceGroup)) {
      throw new Error('Wrong group type');
    }
    this.registerExternalDSGroup_(group);
    this.setExternalDataSourcesState_();
  }
};


/**
 * @param {import("ngeo/datasource/Group.js").default} group Data source group.
 * @private
 */
PermalinkService.prototype.registerExternalDSGroup_ = function(group) {
  this.listenerKeys_.push(
    listen(group.dataSourcesCollection, 'add', this.setExternalDataSourcesState_, this),
    listen(group.dataSourcesCollection, 'remove', this.setExternalDataSourcesState_, this),
  );
};


/**
 * Contains the layer name
 * @param {import("ol/layer/Base.js").default} layer The layer to inspect
 * @param {string} name The layer name to find
 * @return {boolean} The containing status
 */
PermalinkService.prototype.containsLayerName = function(layer, name) {
  if (layer instanceof olLayerGroup) {
    for (const l of layer.getLayers().getArray()) {
      if (!l) {
        throw new Error('Missing layer');
      }
      if (this.containsLayerName(l, name)) {
        return true;
      }
    }
    return false;
  } else {
    return layer.get('layerNodeName') == name;
  }
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Collection event.
 * @private
 */
PermalinkService.prototype.handleExternalDSGroupCollectionRemove_ = function(evt) {
  if (evt instanceof CollectionEvent) {
    const group = evt.element;
    if (!(group instanceof ngeoDatasourceGroup)) {
      throw new Error('Wrong group type');
    }
    this.unregisterExternalDSGroup_(group);
    this.setExternalDataSourcesState_();
  }
};


/**
 * @param {import("ngeo/datasource/Group.js").default} group Data source group.
 * @private
 */
PermalinkService.prototype.unregisterExternalDSGroup_ = function(group) {
  this.listenerKeys_.forEach(unlistenByKey);
};


/**
 * Set the External Data Sources parameters in the url.
 * @private
 */
PermalinkService.prototype.setExternalDataSourcesState_ = function() {

  if (this.setExternalDataSourcesStatePromise_) {
    this.$timeout_.cancel(this.setExternalDataSourcesStatePromise_);
  }

  this.setExternalDataSourcesStatePromise_ = this.$timeout_(() => {
    if (!this.gmfExternalDataSourcesManager_) {
      throw new Error('Missing gmfExternalDataSourcesManager');
    }
    const names = [];
    const urls = [];

    // (1) Collect WMS Groups and their layer names
    for (const wmsGroup of this.gmfExternalDataSourcesManager_.wmsGroups) {

      // (1a) url
      urls.push(wmsGroup.url);

      // (1b) layer names
      const wmsGroupLayerNames = [];
      for (const wmsDataSource of wmsGroup.dataSources) {
        if (wmsDataSource instanceof ngeoDatasourceOGC) {
          // External WMS data sources always have only one OGC layer name,
          // as they are created using a single Capability Layer object that
          // has only 1 layer name
          const layerName = wmsDataSource.getWFSLayerNames()[0];
          wmsGroupLayerNames.push(layerName);
        }
      }
      names.push(wmsGroupLayerNames.join(ExtDSSeparator.NAMES));
    }

    // (2) Collect WMTS Groups and their layer names
    for (const wmtsGroup of this.gmfExternalDataSourcesManager_.wmtsGroups) {

      // (2a) url
      urls.push(wmtsGroup.url);

      // (2b) layer names
      const wmtsGroupLayerNames = [];
      for (const wmtsDataSource of
        /** @type {Array<import('ngeo/datasource/OGC').default>} */(wmtsGroup.dataSources)
      ) {
        if (!wmtsDataSource.wmtsLayer) {
          throw new Error('Missing wmtsDataSource.wmtsLayer');
        }
        wmtsGroupLayerNames.push(wmtsDataSource.wmtsLayer);
      }
      names.push(wmtsGroupLayerNames.join(ExtDSSeparator.NAMES));
    }

    // (3) Update state
    this.ngeoStateManager_.updateState({
      [PermalinkParam.EXTERNAL_DATASOURCES_NAMES]: names.join(
        ExtDSSeparator.LIST
      ),
      [PermalinkParam.EXTERNAL_DATASOURCES_URLS]: urls.join(
        ExtDSSeparator.LIST
      )
    });

    // (4) Reset promise
    this.setExternalDataSourcesStatePromise_ = null;
  });
};


/**
 * Clean the permalink parameters
 * @param {Array<import('gmf/themes.js').GmfGroup>} groups firstlevel groups of the tree
 */
PermalinkService.prototype.cleanParams = function(groups) {
  const keys = this.ngeoLocation_.getParamKeys();
  for (const key of keys) {
    if (key.startsWith(ParamPrefix.TREE_GROUP_LAYERS)) {
      const value = key.substring(ParamPrefix.TREE_GROUP_LAYERS.length);
      for (const group of groups) {
        if (group.name == value) {
          this.ngeoStateManager_.deleteParam(key);
          break;
        }
      }
    }
    if (key.startsWith(ParamPrefix.TREE_GROUP_OPACITY)) {
      const value = key.substring(ParamPrefix.TREE_GROUP_OPACITY.length);
      for (const group of groups) {
        if (group.name == value) {
          this.ngeoStateManager_.deleteParam(key);
          break;
        }
      }
    }
  }
  this.$timeout_(() => {
    if (!this.map_) {
      return;
    }
    const layer = this.map_.getLayerGroup();
    if (!layer) {
      throw new Error('Missing layer');
    }
    for (const key of keys) {
      if (key.startsWith(ParamPrefix.TREE_ENABLE)) {
        const value = key.substring(ParamPrefix.TREE_ENABLE.length);
        if (!this.containsLayerName(layer, value)) {
          this.ngeoStateManager_.deleteParam(key);
        }
      }
      if (key.startsWith(ParamPrefix.TREE_OPACITY)) {
        const value = key.substring(ParamPrefix.TREE_OPACITY.length);
        if (!this.containsLayerName(layer, value)) {
          this.ngeoStateManager_.deleteParam(key);
        }
      }
    }
  });
};


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfPermalink', [
  gmfAuthenticationService.name,
  gmfThemeManager.name,
  gmfThemeThemes.name,
  ngeoDrawFeatures.name,
  ngeoLayertreeController.name,
  ngeoMiscDebounce.name,
  ngeoMiscEventHelper.name,
  ngeoStatemanagerModule.name,
]);

module.service('gmfPermalink', PermalinkService);


module.value('gmfPermalinkOptions', /** @type {PermalinkOptions} */ ({}));


/** Configure the ngeo state manager */
(function() {
  const regexp = [];
  for (const key1 in ParamPrefix) {
    regexp.push(new RegExp(`${/** @type {Object<string, string>} */(ParamPrefix)[key1]}.*`));
  }
  for (const key2 in PermalinkParam) {
    regexp.push(new RegExp(/** @type {Object<string, string>} */(ParamPrefix)[key2]));
  }
  ngeoStatemanagerService.value('ngeoUsedKeyRegexp', regexp);
})();


export default module;
