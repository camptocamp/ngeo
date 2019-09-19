import angular from 'angular';
import gmfEditingEditFeature from 'gmf/editing/EditFeature.js';
import gmfLayertreeSyncLayertreeMap, {getLayer as syncLayertreeMapGetLayer}
  from 'gmf/layertree/SyncLayertreeMap.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import {isEmpty, toXY} from 'gmf/objectediting/geom.js';
import gmfObjecteditingQuery from 'gmf/objectediting/Query.js';

import gmfObjecteditingToolsComponent, {ObjecteditingProcessType} from 'gmf/objectediting/toolsComponent.js';

import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import {interactionDecoration as ngeoMiscDecorateInteraction} from 'ngeo/misc/decorate.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';

import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';

import {toMulti, deleteCondition} from 'ngeo/utils.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import olCollection from 'ol/Collection.js';
import {listen, unlistenByKey} from 'ol/events.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import Point from 'ol/geom/Point.js';
import LineString from 'ol/geom/LineString.js';
import LinearRing from 'ol/geom/LinearRing.js';
import Polygon from 'ol/geom/Polygon.js';
import MultiPoint from 'ol/geom/MultiPoint.js';
import MultiLineString from 'ol/geom/MultiLineString.js';
import MultiPolygon from 'ol/geom/MultiPolygon.js';
import GeometryCollection from 'ol/geom/GeometryCollection.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olInteractionModify from 'ol/interaction/Modify.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import {CollectionEvent} from 'ol/Collection.js';

// @ts-ignore: not supported import
import {OL3Parser} from 'jsts/io.js';
import 'jsts/monkey.js';


/**
 * @typedef {Object<string, import("ol/style/Style.js").default|Array<import("ol/style/Style.js").default>>} StylesObject
 */


/**
 * @enum {string}
 * @hidden
 */
const ObjecteditingState = {
  INSERT: 'insert',
  UPDATE: 'update'
};


/**
 * @hidden
 */
export const NAMESPACE = 'oe';


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfObjectEditingComponent', [
  gmfEditingEditFeature.name,
  gmfLayertreeSyncLayertreeMap.name,
  gmfLayertreeTreeManager.name,
  gmfObjecteditingQuery.name,
  gmfObjecteditingToolsComponent.name,
  ngeoMapLayerHelper.name,
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/objectediting', require('./component.html'));
  });


module.value('gmfObjecteditingTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfObjecteditingTemplateurl;
    return templateUrl !== undefined ? templateUrl :
      'gmf/objectediting';
  }
);


/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfObjecteditingTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfObjecteditingTemplateUrl($element, $attrs, gmfObjecteditingTemplateUrl) {
  return gmfObjecteditingTemplateUrl($element, $attrs);
}


/**
 * Component used to edit the geometry of a single feature using advanced
 * tools. The geometry must be Multi.
 *
 * Example:
 *
 *     <gmf-objectediting
 *         gmf-objectediting-active="ctrl.objectEditingActive"
 *         gmf-objectediting-feature="ctrl.objectEditingFeature"
 *         gmf-objectediting-geomtype="ctrl.objectEditingGeomType"
 *         gmf-objectediting-layernodeid="ctrl.objectEditingLayerNodeId"
 *         gmf-objectediting-map="::ctrl.map"
 *         gmf-objectediting-sketchfeatures="::ctrl.sketchFeatures">
 *     </gmf-objectediting>
 *
 * @htmlAttribute {boolean} gmf-objectediting-active Whether the component is
 *     active or not.
 * @htmlAttribute {import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>} gmf-objectediting-feature The feature to edit.
 * @htmlAttribute {string} gmf-objectediting-geomtype The geometry type.
 * @htmlAttribute {number} gmf-objectediting-layernodeid The GMF layer node id.
 * @htmlAttribute {import("ol/Map.js").default} gmf-objectediting-map The map.
 * @htmlAttribute {import("ol/Collection.js").default<import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>>} gmf-objectediting-sketchfeatures
 *     Collection of temporary features being drawn by the tools.
 * @ngdoc component
 * @ngname gmfObjectediting
 */
const objecteditingComponent = {
  controller: 'GmfObjecteditingController as oeCtrl',
  bindings: {
    'active': '=gmfObjecteditingActive',
    'feature': '<gmfObjecteditingFeature',
    'geomType': '<gmfObjecteditingGeomtype',
    'layerNodeId': '<gmfObjecteditingLayernodeid',
    'map': '<gmfObjecteditingMap',
    'sketchFeatures': '<gmfObjecteditingSketchfeatures'
  },
  templateUrl: gmfObjecteditingTemplateUrl
};

module.component('gmfObjectediting', objecteditingComponent);


/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import("gmf/editing/EditFeature.js").EditingEditFeature} gmfEditFeature Gmf edit feature service.
 * @param {import("gmf/objectediting/Query.js").ObjectEditingQuery} gmfObjectEditingQuery Gmf ObjectEditing
 *     query service.
 * @param {import("gmf/layertree/TreeManager.js").LayertreeTreeManager} gmfTreeManager The gmf TreeManager
 *    service.
 * @param {import("ngeo/misc/FeatureHelper.js").FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfObjecteditingController
 */
function Controller($scope, $timeout, gettextCatalog,
  gmfEditFeature, gmfObjectEditingQuery, gmfTreeManager,
  ngeoFeatureHelper, ngeoLayerHelper, ngeoToolActivateMgr) {

  // == Scope properties ==

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {?import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>}
   */
  this.feature = null;

  /**
   * @type {?string}
   */
  this.geomType = null;

  /**
   * @type {?number}
   */
  this.layerNodeId = null;

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {?import("ol/Collection.js").default<import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>>}
   */
  this.sketchFeatures = null;


  // == Injected properties ==

  /**
   * @type {angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {import("gmf/editing/EditFeature.js").EditingEditFeature}
   * @private
   */
  this.gmfEditFeature_ = gmfEditFeature;

  /**
   * @type {import("gmf/objectediting/Query.js").ObjectEditingQuery}
   * @private
   */
  this.gmfObjectEditingQuery_ = gmfObjectEditingQuery;

  /**
   * @type {Array<import('gmf/objectediting/toolsComponent.js').ObjectEditingQueryableLayerInfo>}
   */
  this.queryableLayersInfo = [];

  /**
   * @type {?import('gmf/objectediting/toolsComponent.js').ObjectEditingQueryableLayerInfo}
   */
  this.selectedQueryableLayerInfo = null;

  /**
   * Whether to show or hide the queryable list of layers. It is shown only
   * when a tool requires it, which is managed in the `gmf-objecteditingtools`
   * component.
   * @type {boolean}
   */
  this.queryableLayerListShown = false;

  /**
   * @type {boolean}
   */
  this.copyFromActive = false;

  /**
   * @type {boolean}
   */
  this.deleteFromActive = false;

  /**
   * @type {boolean}
   */
  this.featureHasGeom = false;

  /**
   * @type {import("ngeo/map/LayerHelper.js").LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {import("ngeo/misc/FeatureHelper.js").FeatureHelper}
   * @private
   */
  this.ngeoFeatureHelper_ = ngeoFeatureHelper;

  /**
   * @type {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;


  // == Other properties ==

  /**
   * @type {boolean}
   * @private
   */
  this.skipGeometryChange_ = false;

  /**
   * @type {string}
   */
  this.process = ObjecteditingProcessType.ADD;

  /**
   * @type {?import("ol/layer/Image.js").default|import("ol/layer/Tile.js").default}
   * @private
   */
  this.editableWMSLayer_ = null;

  /**
   * @type {jsts.io.OL3Parser}
   * @private
   */
  this.jstsOL3Parser_ = new OL3Parser(undefined, {
    geom: {
      Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection
    }
  });

  /**
   * The state of the feature determines whether the next 'save' request
   * should be an 'insert' or 'update' one.
   * @type {?string}
   * @private
   */
  this.state_ = null;

  /**
   * @type {Array<?import("ol/geom/Geometry.js").default>}
   * @private
   */
  this.geometryChanges_ = [];

  /**
   * @type {StylesObject}
   * @private
   */
  this.defaultStyles_ = {};

  /**
   * @type {StylesObject}
   * @private
   */
  this.defaultStylesWoVertice_ = {};

  /**
   * @type {StylesObject}
   * @private
   */
  this.dirtyStyles_ = {};

  /**
   * @type {StylesObject}
   * @private
   */
  this.dirtyStylesWoVertice_ = {};

  /**
   * Flag that is toggled while a request is pending.
   * @type {boolean}
   */
  this.pending = false;

  /**
   * @type {boolean}
   */
  this.dirty = false;

  /**
   * @type {Array<import("ol/events.js").EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {import("ol/Collection.js").default<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>}
   * @private
   */
  this.features_ = new olCollection();

  /**
   * @type {import("ol/Collection.js").default<olInteractionModify>}
   * @private
   */
  this.interactions_ = new olCollection();

  /**
   * @type {import("ol/interaction/Modify.js").default}
   * @private
   */
  this.modify_ = new olInteractionModify({
    deleteCondition: deleteCondition,
    features: this.features_,
    style: ngeoFeatureHelper.getVertexStyle(false)
  });
  this.interactions_.push(this.modify_);

  /**
   * @type {import("ngeo/misc/ToolActivate.js").default}
   * @private
   */
  this.modifyToolActivate_ = new ngeoMiscToolActivate(this.modify_, 'active');

  /**
   * @type {boolean}
   */
  this.toolsActive = false;

  /**
   * @type {import("ngeo/misc/ToolActivate.js").default}
   * @private
   */
  this.toolsToolActivate_ = new ngeoMiscToolActivate(this, 'toolsActive');
}

/**
 * Init the controller
 */
Controller.prototype.$onInit = function() {
  this.gmfObjectEditingQuery_.getQueryableLayersInfo().then(
    this.handleGetQueryableLayersInfo_.bind(this)
  );

  this.scope_.$watch(
    () => this.active,
    (newVal, oldVal) => {
      if (newVal != oldVal) {
        this.toggle_(newVal);
      }
    }
  );

  this.scope_.$watchCollection(
    () => {
      if (this.gmfTreeManager_.rootCtrl) {
        return this.gmfTreeManager_.rootCtrl.children;
      }
    },
    (value) => {
      // Timeout required, because the collection event is fired before the
      // leaf nodes are created and they are the ones we're looking for here.
      this.timeout_(() => {
        if (value) {
          if (!this.gmfTreeManager_.rootCtrl) {
            throw new Error('Missing gmfTreeManager_.rootCtrl');
          }
          this.unregisterAllTreeCtrl_();
          this.gmfTreeManager_.rootCtrl.traverseDepthFirst(
            this.registerTreeCtrl_.bind(this)
          );
        }
      });
    }
  );

  if (!this.feature) {
    throw new Error('Missing feature');
  }
  const geometry = this.feature.getGeometry();
  this.state_ = geometry ? ObjecteditingState.UPDATE : ObjecteditingState.INSERT;

  this.scope_.$watchCollection(
    () => this.geometryChanges_,
    (newVal, oldVal) => {
      if (newVal.length) {
        if (newVal.length === 1) {
          this.dirty = false;
        } else {
          this.dirty = true;
        }
      }
    }
  );

  const defaultColor = [39, 155, 145];
  const dirtyColor = [153, 51, 51];
  this.initializeStyles_(this.defaultStyles_, defaultColor);
  this.initializeStyles_(this.defaultStylesWoVertice_, defaultColor, false);
  this.initializeStyles_(this.dirtyStyles_, dirtyColor);
  this.initializeStyles_(this.dirtyStylesWoVertice_, dirtyColor, false);

  this.scope_.$watch(
    () => this.dirty,
    this.setFeatureStyle_.bind(this)
  );

  this.features_.push(this.feature);

  this.featureHasGeom = !isEmpty(geometry);

  // Toggle on
  this.initializeInteractions_();
  this.toggle_(true);
  this.resetGeometryChanges_();

  this.scope_.$on('$destroy', this.handleDestroy_.bind(this));
};


// == API methods ==


/**
 * Delete the feature after asking for a confirmation.
 */
Controller.prototype.delete = function() {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString(
    'Do you really want to delete the feature?');
  // Confirm deletion first
  if (confirm(msg)) {
    this.dirty = false;
    this.pending = true;
    if (!this.layerNodeId) {
      throw new Error('Missing layerNodeId');
    }
    if (!this.feature) {
      throw new Error('Missing feature');
    }

    this.gmfEditFeature_.deleteFeature(
      this.layerNodeId,
      this.feature
    ).then(
      this.handleDeleteFeature_.bind(this)
    );
  }

};


/**
 * Save the current modifications.
 */
Controller.prototype.save = function() {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  if (!this.layerNodeId) {
    throw new Error('Missing layerNodeId');
  }

  this.pending = true;

  // The geometry of the feature may contain Z in its coordinates, which
  // GMF doesn't support.  This section ensures that the geometry gets purged
  // of all Z from the coordinates before saving.
  //
  // Also, this is only done before saving on a clone of the feature. Doing
  // it directly on the feature makes JSTS complain.
  const feature = this.feature.clone();
  feature.setId(this.feature.getId());
  const geometry = feature.getGeometry();
  if (geometry) {
    toXY(geometry);
  }

  if (this.state_ === ObjecteditingState.INSERT) {
    this.gmfEditFeature_.insertFeatures(
      this.layerNodeId,
      [feature]
    ).then(
      this.handleEditFeature_.bind(this)
    );
  } else if (this.state_ === ObjecteditingState.UPDATE) {
    this.gmfEditFeature_.updateFeature(
      this.layerNodeId,
      feature
    ).then(
      this.handleEditFeature_.bind(this)
    );
  }
};


/**
 * Undo the latest modifications.
 */
Controller.prototype.undo = function() {
  if (!this.feature) {
    throw new Error('Missing feature');
  }

  if (this.geometryChanges_.length <= 1) {
    return;
  }

  this.skipGeometryChange_ = true;

  this.geometryChanges_.pop();
  const clone = cloneGeometry(this.geometryChanges_[this.geometryChanges_.length - 1]);
  if (!clone) {
    throw new Error('Missing clone');
  }

  this.feature.setGeometry(clone);

  this.skipGeometryChange_ = false;
};


/**
 * @return {boolean} Whether the state is INSERT or not.
 */
Controller.prototype.isStateInsert = function() {
  return this.state_ === ObjecteditingState.INSERT;
};


// == Private methods ==


/**
 * Called after a delete request.
 * @param {angular.IHttpResponse<never>} resp Ajax response.
 * @private
 */
Controller.prototype.handleDeleteFeature_ = function(resp) {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  this.feature.setGeometry(undefined);
  this.resetGeometryChanges_();
  this.state_ = ObjecteditingState.INSERT;
  this.pending = false;
  this.refreshWMSLayer_();
};


/**
 * Called after an 'insert' or 'update' request.
 * @param {angular.IHttpResponse<never>} resp Ajax response.
 * @private
 */
Controller.prototype.handleEditFeature_ = function(resp) {
  if (!this.feature) {
    throw new Error('Missing feature');
  }

  // (1) Update the id
  const features = new olFormatGeoJSON().readFeatures(resp.data);
  if (features.length) {
    this.feature.setId(features[0].getId());
  }
  // (2) Reset geometry changes
  this.resetGeometryChanges_();
  // (3) Update state
  if (this.feature.getGeometry()) {
    this.state_ = ObjecteditingState.UPDATE;
  } else {
    this.state_ = ObjecteditingState.INSERT;
  }
  // (4) No longer pending
  this.pending = false;
  // (5) Refresh WMS layer
  this.refreshWMSLayer_();
};


/**
 * Initialize interactions by setting them inactive and decorating them
 * @private
 */
Controller.prototype.initializeInteractions_ = function() {
  this.interactions_.forEach((interaction) => {
    interaction.setActive(false);
    ngeoMiscDecorateInteraction(interaction);
  });
};


/**
 * Register interactions by adding them to the map
 * @private
 */
Controller.prototype.registerInteractions_ = function() {
  this.interactions_.forEach((interaction) => {
    if (!this.map) {
      throw new Error('Missing map');
    }
    this.map.addInteraction(interaction);
  });
};


/**
 * Unregister interactions, i.e. remove them from the map
 * @private
 */
Controller.prototype.unregisterInteractions_ = function() {
  this.interactions_.forEach((interaction) => {
    if (!this.map) {
      throw new Error('Missing map');
    }
    this.map.removeInteraction(interaction);
  });
};


/**
 * Activate or deactivate this component.
 * @param {boolean} active Whether to activate this component or not.
 * @private
 */
Controller.prototype.toggle_ = function(active) {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  if (!this.sketchFeatures) {
    throw new Error('Missing sketchFeatures');
  }

  const keys = this.listenerKeys_;
  const uid = `${NAMESPACE}-${olUtilGetUid(this)}`;
  const toolMgr = this.ngeoToolActivateMgr_;

  if (active) {

    keys.push(listen(
      this.feature,
      `change:${this.feature.getGeometryName()}`,
      this.handleFeatureGeometryChange_,
      this
    ));
    keys.push(listen(
      this.modify_,
      'change:active',
      this.setFeatureStyle_,
      this
    ));
    keys.push(listen(
      this.modify_,
      'modifyend',
      this.handleModifyInteractionModifyEnd_,
      this
    ));
    keys.push(listen(
      window,
      'beforeunload',
      // @ts-ignore: strange API
      this.handleWindowBeforeUnload_,
      this
    ));
    keys.push(listen(
      this.sketchFeatures,
      'add',
      this.handleSketchFeaturesAdd_,
      this
    ));

    toolMgr.registerTool(uid, this.modifyToolActivate_, true);
    toolMgr.registerTool(uid, this.toolsToolActivate_, false);

    this.registerInteractions_();

  } else {

    this.unregisterInteractions_();

    keys.forEach(unlistenByKey);
    keys.length = 0;

    toolMgr.unregisterTool(uid, this.modifyToolActivate_);
    toolMgr.unregisterTool(uid, this.toolsToolActivate_);

  }

  this.toolsActive = active;
  this.modify_.setActive(active);
};


/**
 * Undo all current changes.
 * @private
 */
Controller.prototype.undoAllChanges_ = function() {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  const clone = cloneGeometry(this.geometryChanges_[0]);
  if (!clone) {
    throw new Error('Missing clone');
  }
  this.feature.setGeometry(clone);

  this.resetGeometryChanges_();
  this.dirty = false;
  this.setFeatureStyle_();
};


/**
 * Reset the array of geometry changes.  If there are more than one changes,
 * reset them entirely. Then, if there's no changes, clone the current geometry
 * as the first entry. One entry means that there's no changes.
 * @private
 */
Controller.prototype.resetGeometryChanges_ = function() {
  if (this.geometryChanges_.length > 1) {
    this.geometryChanges_.length = 0;
  }
  if (this.geometryChanges_.length === 0) {
    if (!this.feature) {
      throw new Error('Missing feature');
    }
    const geometry = this.feature.getGeometry();
    const clone = cloneGeometry(geometry);
    this.geometryChanges_.push(clone);
  }
};


/**
 * Called after the modification interaction has completed modifying the
 * existing geometry. The new geometry is pushed in the changes array.
 * If the geometry type is `MultiPolygon`, we check if any of the inner
 * geometries intersects with one an other first. Those that does are merged
 * before being pushed to the changes.
 *
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleModifyInteractionModifyEnd_ = function(evt) {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  let geometry = this.feature.getGeometry();
  if (!geometry) {
    throw new Error('Missing geometry');
  }

  if (geometry.getType() === 'MultiPolygon') {
    const jstsGeom = this.jstsOL3Parser_.read(geometry);
    // @ts-ignore: jsts issue?
    const jstsBuffered = jstsGeom.buffer(0, undefined, undefined);
    geometry = toMulti(this.jstsOL3Parser_.write(jstsBuffered));
    this.skipGeometryChange_ = true;
    this.feature.setGeometry(geometry.clone());
    this.skipGeometryChange_ = false;
  }

  const clone = cloneGeometry(geometry);
  if (!clone) {
    throw new Error('Missing clone geometry');
  }
  this.geometryChanges_.push(clone);
  this.scope_.$apply();
};


/**
 * @param {StylesObject} styles Hash of style.
 * @param {import('ol/color.js').Color} color Color.
 * @param {boolean=} opt_incVertice Whether to include vertice or not. Defaults
 *     to `true`.
 * @private
 */
Controller.prototype.initializeStyles_ = function(
  styles, color, opt_incVertice
) {

  const incVertice = opt_incVertice !== false;
  const rgbaColor = color.slice();
  rgbaColor.push(0.3);

  const image = new olStyleCircle({
    radius: 8,
    stroke: new olStyleStroke({
      color: color,
      width: 1
    }),
    fill: new olStyleFill({color: rgbaColor})
  });

  styles.Point = new olStyleStyle({
    image
  });
  styles.MultiPoint = new olStyleStyle({
    image
  });

  styles.LineString = [
    new olStyleStyle({
      stroke: new olStyleStroke({
        color: color,
        width: 3
      })
    })
  ];
  if (incVertice) {
    styles.LineString.push(
      this.ngeoFeatureHelper_.getVertexStyle(true)
    );
  }
  styles.MultiLineString = [
    new olStyleStyle({
      stroke: new olStyleStroke({
        color: color,
        width: 3
      })
    })
  ];
  if (incVertice) {
    styles.MultiLineString.push(
      this.ngeoFeatureHelper_.getVertexStyle(true)
    );
  }

  styles.Polygon = [
    new olStyleStyle({
      stroke: new olStyleStroke({
        color: color,
        width: 2
      }),
      fill: new olStyleFill({
        color: rgbaColor
      })
    })
  ];
  if (incVertice) {
    styles.Polygon.push(
      this.ngeoFeatureHelper_.getVertexStyle(true)
    );
  }
  styles.MultiPolygon = [
    new olStyleStyle({
      stroke: new olStyleStroke({
        color: color,
        width: 2
      }),
      fill: new olStyleFill({
        color: rgbaColor
      })
    })
  ];
  if (incVertice) {
    styles.MultiPolygon.push(
      this.ngeoFeatureHelper_.getVertexStyle(true)
    );
  }

};


/**
 * Set the style of the feature depending on:
 *  - the geometry type
 *  - the dirty state of the component
 *  - whether the modify control is active or not
 *
 * @private
 */
Controller.prototype.setFeatureStyle_ = function() {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  const geometry = this.feature.getGeometry();
  if (geometry) {
    const geomType = geometry.getType();
    const modifyActive = this.modify_.getActive();
    let style;
    if (this.dirty) {
      if (modifyActive) {
        style = this.dirtyStyles_[geomType];
      } else {
        style = this.dirtyStylesWoVertice_[geomType];
      }
    } else {
      if (modifyActive) {
        style = this.defaultStyles_[geomType];
      } else {
        style = this.defaultStylesWoVertice_[geomType];
      }
    }
    this.feature.setStyle(style);
  }
};


/**
 * Registers a newly added Layertree controller 'leaf', i.e. groups are
 * excluded.
 *
 * If the Layertree controller node id is equal to the `layerNodeId` configured
 * with this component, then find the WMS layer associated with it for
 * for refresh purpose.
 *
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl Layertree controller
 *    to register
 * @return {void}
 * @private
 */
Controller.prototype.registerTreeCtrl_ = function(treeCtrl) {

  // Skip any Layertree controller that has a node that is not a leaf
  const nodeGroup = /** @type {import('gmf/themes.js').GmfGroup} */(treeCtrl.node);
  if (nodeGroup.children && nodeGroup.children.length) {
    return;
  }

  const nodeLayer = /** @type {import('gmf/themes.js').GmfLayer} */(treeCtrl.node);
  // Set editable WMS layer for refresh purpose
  if (nodeLayer.id === this.layerNodeId) {
    const layer = syncLayertreeMapGetLayer(treeCtrl);
    if (layer instanceof olLayerImage || layer instanceof olLayerTile) {
      this.editableWMSLayer_ = layer;
    }
  }

};


/**
 * Unregisters all currently registered Layertree controllers.
 *
 * Unset the WMS layer associated with the `layerNodeId` configured with
 * this component.
 *
 * @private
 */
Controller.prototype.unregisterAllTreeCtrl_ = function() {
  this.editableWMSLayer_ = null;
};


/**
 * Refresh the WMS layer, if set.
 * @private
 */
Controller.prototype.refreshWMSLayer_ = function() {
  if (this.editableWMSLayer_) {
    this.ngeoLayerHelper_.refreshWMSLayer(this.editableWMSLayer_);
  }
};


/**
 * Called before the window unloads. Show a confirmation message if there are
 * unsaved modifications.
 * @param {Event} e Event.
 * @return {string|undefined} Message
 * @private
 */
Controller.prototype.handleWindowBeforeUnload_ = function(e) {
  const gettextCatalog = this.gettextCatalog_;
  if (this.dirty) {
    const msg = gettextCatalog.getString('There are unsaved changes.');
    // @ts-ignore: strange API
    (e || window.event).returnValue = msg;
    return msg;
  }
  return undefined;
};


/**
 * Called when a feature is added to the collection of sketch features.
 * Depending on the current behaviour, use the added sketch feature to process
 * the existing geometry.
 *
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleSketchFeaturesAdd_ = function(evt) {
  if (evt instanceof CollectionEvent) {
    if (!this.feature) {
      throw new Error('Missing feature');
    }
    if (!this.sketchFeatures) {
      throw new Error('Missing sketchFeatures');
    }
    const sketchFeature = evt.element;
    const sketchGeom = sketchFeature.getGeometry();

    const geom = this.feature.getGeometry();

    if (geom) {
      const jstsGeom = this.jstsOL3Parser_.read(geom);
      const jstsSketchGeom = this.jstsOL3Parser_.read(sketchGeom);
      let jstsProcessedGeom;

      if (this.process === ObjecteditingProcessType.ADD) {
        jstsProcessedGeom = jstsGeom.union(jstsSketchGeom);
      } else {
        if (jstsGeom.intersects(jstsSketchGeom)) {
          jstsProcessedGeom = jstsGeom.difference(jstsSketchGeom);
        }
      }

      if (jstsProcessedGeom) {
        const processedGeom = this.jstsOL3Parser_.write(jstsProcessedGeom);
        const multiGeom = toMulti(processedGeom);
        this.feature.setGeometry(multiGeom.clone());
      }

    } else if (this.process === ObjecteditingProcessType.ADD) {
      this.feature.setGeometry(toMulti(sketchGeom.clone()));
    }

    this.sketchFeatures.clear();
  }
};


/**
 * Called when the geometry property of the feature changes, i.e. not when the
 * geometry itself changes but when a new geometry is set to the feature.
 *
 * This happens either when resetting the geometry to null, in which case
 * there's nothing to do here. Otherwise, it happens after the combinaison
 * of a sketch geometry with the existing feature geometry. This new geom
 * is pushed in the `geometryChanges_` array.
 *
 * @private
 */
Controller.prototype.handleFeatureGeometryChange_ = function() {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  const geom = this.feature.getGeometry();
  this.timeout_(() => {
    this.featureHasGeom = !isEmpty(geom);
  });

  if (this.skipGeometryChange_) {
    return;
  }

  if (geom) {
    // Use a timeout here, because there can be a scope digest already in
    // progress. For example, with tools that requires the user to draw
    // features on the map, we would need to manually call:
    // this.scope_.$apply();
    // For tools that use promises instead, such as the "copy/delete" from,
    // a scope is already in progress so we must not invoke it again.
    this.timeout_(() => {
      this.geometryChanges_.push(geom.clone());
    });
  }
};


/**
 * @param {Array<import('gmf/objectediting/toolsComponent.js').ObjectEditingQueryableLayerInfo>} layersInfo
 *    List of queryable layers information, which contains the node and ogcServer.
 * @private
 */
Controller.prototype.handleGetQueryableLayersInfo_ = function(layersInfo) {
  this.queryableLayersInfo = layersInfo;
  if (this.queryableLayersInfo.length) {
    this.selectedQueryableLayerInfo = this.queryableLayersInfo[0];
  }
};


/**
 * @private
 */
Controller.prototype.handleDestroy_ = function() {
  this.features_.clear();
  this.toggle_(false);
  this.undoAllChanges_();
};


// == Static methods and type definitions ==


/**
 * Utility method that gets the clone of a geometry, which can be null or
 * undefined. In the latter case, a null value is returned instead of a
 * geometry.
 * @param {?import("ol/geom/Geometry.js").default|undefined} geometry A geometry, undefined or
 *     null value.
 * @return {?import("ol/geom/Geometry.js").default} A geometry clone or null value.
 * @private
 * @hidden
 */
function cloneGeometry(geometry) {
  let clone = null;
  if (geometry) {
    clone = geometry.clone();
  }
  return clone;
}


module.controller('GmfObjecteditingController',
  Controller);


export default module;
