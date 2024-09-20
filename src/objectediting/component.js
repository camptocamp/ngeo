Controller.$inject = [
  '$scope',
  '$timeout',
  'gettextCatalog',
  'gmfEditFeature',
  'gmfObjectEditingQuery',
  'gmfTreeManager',
  'ngeoFeatureHelper',
  'ngeoLayerHelper',
  'ngeoToolActivateMgr',
];
// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import gmfEditingEditFeature from 'gmf/editing/EditFeature';
import gmfLayertreeSyncLayertreeMap, {
  getLayer as syncLayertreeMapGetLayer,
} from 'gmf/layertree/SyncLayertreeMap';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager';
import {isEmpty, toXY} from 'gmf/objectediting/geom';
import gmfObjecteditingQuery from 'gmf/objectediting/Query';
import gmfObjecteditingToolsComponent, {ObjecteditingProcessType} from 'gmf/objectediting/toolsComponent';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper';
import {interactionDecoration as ngeoMiscDecorateInteraction} from 'ngeo/misc/decorate';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import {toMulti, deleteCondition} from 'ngeo/utils';
import {getUid as olUtilGetUid} from 'ol/util';
import olCollection from 'ol/Collection';
import {listen, unlistenByKey} from 'ol/events';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import LinearRing from 'ol/geom/LinearRing';
import Polygon from 'ol/geom/Polygon';
import MultiPoint from 'ol/geom/MultiPoint';
import MultiLineString from 'ol/geom/MultiLineString';
import MultiPolygon from 'ol/geom/MultiPolygon';
import GeometryCollection from 'ol/geom/GeometryCollection';
import olLayerImage from 'ol/layer/Image';
import olLayerTile from 'ol/layer/WebGLTile';
import olInteractionModify from 'ol/interaction/Modify';
import olStyleCircle from 'ol/style/Circle';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olStyleStyle from 'ol/style/Style';
import {CollectionEvent} from 'ol/Collection';

// @ts-ignore: not supported import
import {OL3Parser} from 'jsts/org/locationtech/jts/io';
import 'jsts/org/locationtech/jts/monkey';
import htmlTemplate from './component.html';

/**
 * @typedef {Object<string, import('ol/style/Style').default | import('ol/style/Style').default[]>} StylesObject
 */

/**
 * @enum {string}
 * @hidden
 */
const ObjecteditingState = {
  INSERT: 'insert',
  UPDATE: 'update',
};

/**
 * @hidden
 */
export const NAMESPACE = 'oe';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfObjectEditingComponent', [
  gmfEditingEditFeature.name,
  gmfLayertreeSyncLayertreeMap.name,
  gmfLayertreeTreeManager.name,
  gmfObjecteditingQuery.name,
  gmfObjecteditingToolsComponent.name,
  ngeoMapLayerHelper.name,
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('gmf/objectediting', htmlTemplate);
    },
  ],
);
myModule.value(
  'gmfObjecteditingTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfObjecteditingTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/objectediting';
  },
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfObjecteditingTemplateUrl Template function.
 * @returns {string} Template URL.
 * @private
 * @hidden
 */
gmfObjecteditingTemplateUrl.$inject = ['$element', '$attrs', 'gmfObjecteditingTemplateUrl'];
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
 * @htmlAttribute {import('ol/Feature').default<import('ol/geom/Geometry').default>} gmf-objectediting-feature The feature to edit.
 * @htmlAttribute {string} gmf-objectediting-geomtype The geometry type.
 * @htmlAttribute {number} gmf-objectediting-layernodeid The GMF layer node id.
 * @htmlAttribute {import('ol/Map').default} gmf-objectediting-map The map.
 * @htmlAttribute {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>} gmf-objectediting-sketchfeatures
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
    'sketchFeatures': '<gmfObjecteditingSketchfeatures',
  },
  templateUrl: gmfObjecteditingTemplateUrl,
};
myModule.component('gmfObjectediting', objecteditingComponent);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import('gmf/editing/EditFeature').EditingEditFeature} gmfEditFeature Gmf edit feature service.
 * @param {import('gmf/objectediting/Query').ObjectEditingQuery} gmfObjectEditingQuery Gmf ObjectEditing
 *     query service.
 * @param {import('gmf/layertree/TreeManager').LayertreeTreeManager} gmfTreeManager The gmf TreeManager
 *    service.
 * @param {import('ngeo/misc/FeatureHelper').FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {import('ngeo/map/LayerHelper').LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @class
 * @hidden
 * @ngdoc controller
 * @ngname GmfObjecteditingController
 */
export function Controller(
  $scope,
  $timeout,
  gettextCatalog,
  gmfEditFeature,
  gmfObjectEditingQuery,
  gmfTreeManager,
  ngeoFeatureHelper,
  ngeoLayerHelper,
  ngeoToolActivateMgr,
) {
  // == Scope properties ==

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {?import('ol/Feature').default<import('ol/geom/Geometry').default>}
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
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {?import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.sketchFeatures = null;

  // == Injected properties ==

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {angular.ITimeoutService}
   */
  this.timeout_ = $timeout;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {import('gmf/editing/EditFeature').EditingEditFeature}
   */
  this.gmfEditFeature_ = gmfEditFeature;

  /**
   * @type {import('gmf/objectediting/Query').ObjectEditingQuery}
   */
  this.gmfObjectEditingQuery_ = gmfObjectEditingQuery;

  /**
   * @type {import('gmf/objectediting/toolsComponent').ObjectEditingQueryableLayerInfo[]}
   */
  this.queryableLayersInfo = [];

  /**
   * @type {?import('gmf/objectediting/toolsComponent').ObjectEditingQueryableLayerInfo}
   */
  this.selectedQueryableLayerInfo = null;

  /**
   * Whether to show or hide the queryable list of layers. It is shown only
   * when a tool requires it, which is managed in the `gmf-objecteditingtools`
   * component.
   *
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
   * @type {import('ngeo/map/LayerHelper').LayerHelper}
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {import('gmf/layertree/TreeManager').LayertreeTreeManager}
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {import('ngeo/misc/FeatureHelper').FeatureHelper}
   */
  this.ngeoFeatureHelper_ = ngeoFeatureHelper;

  /**
   * @type {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr}
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  // == Other properties ==

  /**
   * @type {boolean}
   */
  this.skipGeometryChange_ = false;

  /**
   * @type {string}
   */
  this.process = ObjecteditingProcessType.ADD;

  /**
   * @type {?import('ol/layer/Image').default<import('ol/source/Image').default>|import('ol/layer/WebGLTile').default<import('ol/source/Tile').default>}
   */
  this.editableWMSLayer_ = null;

  /**
   * @type {jsts.io.OL3Parser}
   */
  this.jstsOL3Parser_ = new OL3Parser(undefined, {
    geom: {
      Point,
      LineString,
      LinearRing,
      Polygon,
      MultiPoint,
      MultiLineString,
      MultiPolygon,
      GeometryCollection,
    },
  });

  /**
   * The state of the feature determines whether the next 'save' request
   * should be an 'insert' or 'update' one.
   *
   * @type {?string}
   */
  this.state_ = null;

  /**
   * @type {?import('ol/geom/Geometry').default[]}
   */
  this.geometryChanges_ = [];

  /**
   * @type {StylesObject}
   */
  this.defaultStyles_ = {};

  /**
   * @type {StylesObject}
   */
  this.defaultStylesWoVertice_ = {};

  /**
   * @type {StylesObject}
   */
  this.dirtyStyles_ = {};

  /**
   * @type {StylesObject}
   */
  this.dirtyStylesWoVertice_ = {};

  /**
   * Flag that is toggled while a request is pending.
   *
   * @type {boolean}
   */
  this.pending = false;

  /**
   * @type {boolean}
   */
  this.dirty = false;

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.listenerKeys_ = [];

  /**
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.features_ = new olCollection();

  /**
   * @type {import('ol/Collection').default<olInteractionModify>}
   */
  this.interactions_ = new olCollection();

  /**
   * @type {import('ol/interaction/Modify').default}
   */
  this.modify_ = new olInteractionModify({
    deleteCondition: deleteCondition,
    features: this.features_,
    style: ngeoFeatureHelper.getVertexStyle(false),
  });
  this.interactions_.push(this.modify_);

  /**
   * @type {import('ngeo/misc/ToolActivate').default}
   */
  this.modifyToolActivate_ = new ngeoMiscToolActivate(this.modify_, 'active');

  /**
   * @type {boolean}
   */
  this.toolsActive = false;

  /**
   * @type {import('ngeo/misc/ToolActivate').default}
   */
  this.toolsToolActivate_ = new ngeoMiscToolActivate(this, 'toolsActive');
}

/**
 * Init the controller
 */
Controller.prototype.$onInit = function () {
  this.gmfObjectEditingQuery_.getQueryableLayersInfo().then(this.handleGetQueryableLayersInfo_.bind(this));
  this.scope_.$watch(
    () => this.active,
    (newVal, oldVal) => {
      if (newVal != oldVal) {
        this.toggle_(newVal);
      }
    },
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
          this.gmfTreeManager_.rootCtrl.traverseDepthFirst(this.registerTreeCtrl_.bind(this));
        }
      });
    },
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
    },
  );
  const defaultColor = [39, 155, 145];
  const dirtyColor = [153, 51, 51];
  this.initializeStyles_(this.defaultStyles_, defaultColor);
  this.initializeStyles_(this.defaultStylesWoVertice_, defaultColor, false);
  this.initializeStyles_(this.dirtyStyles_, dirtyColor);
  this.initializeStyles_(this.dirtyStylesWoVertice_, dirtyColor, false);
  this.scope_.$watch(() => this.dirty, this.setFeatureStyle_.bind(this));
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
Controller.prototype.delete = function () {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString('Do you really want to delete the feature?');
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
    this.gmfEditFeature_
      .deleteFeature(this.layerNodeId, this.feature)
      .then(this.handleDeleteFeature_.bind(this));
  }
};

/**
 * Save the current modifications.
 */
Controller.prototype.save = function () {
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
    this.gmfEditFeature_.insertFeatures(this.layerNodeId, [feature]).then(this.handleEditFeature_.bind(this));
  } else if (this.state_ === ObjecteditingState.UPDATE) {
    this.gmfEditFeature_.updateFeature(this.layerNodeId, feature).then(this.handleEditFeature_.bind(this));
  }
};

/**
 * Undo the latest modifications.
 */
Controller.prototype.undo = function () {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  if (this.geometryChanges_.length <= 1) {
    return;
  }
  this.skipGeometryChange_ = true;
  this.geometryChanges_.pop();
  const clone = cloneGeometry(this.geometryChanges_[this.geometryChanges_.length - 1]);
  this.feature.setGeometry(clone);
  this.skipGeometryChange_ = false;
};

/**
 * @returns {boolean} Whether the state is INSERT or not.
 */
Controller.prototype.isStateInsert = function () {
  return this.state_ === ObjecteditingState.INSERT;
};

// == Private methods ==

/**
 * Called after a delete request.
 *
 * @param {angular.IHttpResponse<ArrayBuffer|Document|Node|Object|string>} resp Ajax response.
 */
Controller.prototype.handleDeleteFeature_ = function (resp) {
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
 *
 * @param {angular.IHttpResponse<ArrayBuffer|Document|Node|Object|string>} resp Ajax response.
 */
Controller.prototype.handleEditFeature_ = function (resp) {
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
 */
Controller.prototype.initializeInteractions_ = function () {
  this.interactions_.forEach((interaction) => {
    interaction.setActive(false);
    ngeoMiscDecorateInteraction(interaction);
  });
};

/**
 * Register interactions by adding them to the map
 */
Controller.prototype.registerInteractions_ = function () {
  this.interactions_.forEach((interaction) => {
    if (!this.map) {
      throw new Error('Missing map');
    }
    this.map.addInteraction(interaction);
  });
};

/**
 * Unregister interactions, i.e. remove them from the map
 */
Controller.prototype.unregisterInteractions_ = function () {
  this.interactions_.forEach((interaction) => {
    if (!this.map) {
      throw new Error('Missing map');
    }
    this.map.removeInteraction(interaction);
  });
};

/**
 * Activate or deactivate this component.
 *
 * @param {boolean} active Whether to activate this component or not.
 */
Controller.prototype.toggle_ = function (active) {
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
    keys.push(
      listen(
        this.feature,
        `change:${this.feature.getGeometryName()}`,
        this.handleFeatureGeometryChange_,
        this,
      ),
    );
    keys.push(listen(this.modify_, 'change:active', this.setFeatureStyle_, this));
    keys.push(listen(this.modify_, 'modifyend', this.handleModifyInteractionModifyEnd_, this));
    keys.push(
      listen(window, 'beforeunload', /** @type {function(?): ?} */ this.handleWindowBeforeUnload_, this),
    );
    keys.push(listen(this.sketchFeatures, 'add', this.handleSketchFeaturesAdd_, this));
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
 */
Controller.prototype.undoAllChanges_ = function () {
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
 */
Controller.prototype.resetGeometryChanges_ = function () {
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
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleModifyInteractionModifyEnd_ = function (evt) {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  let geometry = this.feature.getGeometry();
  if (!geometry) {
    throw new Error('Missing geometry');
  }
  if (geometry.getType() === 'MultiPolygon') {
    const jstsGeom = this.jstsOL3Parser_.read(geometry);
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
 * @param {import('ol/color').Color} color Color.
 * @param {boolean} [opt_incVertice=true] Whether to include vertice or not.
 */
Controller.prototype.initializeStyles_ = function (styles, color, opt_incVertice) {
  const incVertice = opt_incVertice !== false;
  const rgbaColor = color.slice();
  rgbaColor.push(0.3);
  const image = new olStyleCircle({
    radius: 8,
    stroke: new olStyleStroke({
      color: color,
      width: 1,
    }),
    fill: new olStyleFill({
      color: rgbaColor,
    }),
  });
  styles.Point = new olStyleStyle({
    image,
  });
  styles.MultiPoint = new olStyleStyle({
    image,
  });
  styles.LineString = [
    new olStyleStyle({
      stroke: new olStyleStroke({
        color: color,
        width: 3,
      }),
    }),
  ];
  if (incVertice) {
    styles.LineString.push(this.ngeoFeatureHelper_.getVertexStyle(true));
  }
  styles.MultiLineString = [
    new olStyleStyle({
      stroke: new olStyleStroke({
        color: color,
        width: 3,
      }),
    }),
  ];
  if (incVertice) {
    styles.MultiLineString.push(this.ngeoFeatureHelper_.getVertexStyle(true));
  }
  styles.Polygon = [
    new olStyleStyle({
      stroke: new olStyleStroke({
        color: color,
        width: 2,
      }),
      fill: new olStyleFill({
        color: rgbaColor,
      }),
    }),
  ];
  if (incVertice) {
    styles.Polygon.push(this.ngeoFeatureHelper_.getVertexStyle(true));
  }
  styles.MultiPolygon = [
    new olStyleStyle({
      stroke: new olStyleStroke({
        color: color,
        width: 2,
      }),
      fill: new olStyleFill({
        color: rgbaColor,
      }),
    }),
  ];
  if (incVertice) {
    styles.MultiPolygon.push(this.ngeoFeatureHelper_.getVertexStyle(true));
  }
};

/**
 * Set the style of the feature depending on:
 *  - the geometry type
 *  - the dirty state of the component
 *  - whether the modify control is active or not
 */
Controller.prototype.setFeatureStyle_ = function () {
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
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl Layertree controller
 *    to register
 */
Controller.prototype.registerTreeCtrl_ = function (treeCtrl) {
  // Skip any Layertree controller that has a node that is not a leaf
  const nodeGroup = /** @type {import('gmf/themes').GmfGroup} */ treeCtrl.node;
  if (nodeGroup.children && nodeGroup.children.length) {
    return;
  }
  const nodeLayer = /** @type {import('gmf/themes').GmfLayer} */ treeCtrl.node;
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
 */
Controller.prototype.unregisterAllTreeCtrl_ = function () {
  this.editableWMSLayer_ = null;
};

/**
 * Refresh the WMS layer, if set.
 */
Controller.prototype.refreshWMSLayer_ = function () {
  if (this.editableWMSLayer_) {
    this.ngeoLayerHelper_.refreshWMSLayer(this.editableWMSLayer_);
  }
};

/**
 * Called before the window unloads. Show a confirmation message if there are
 * unsaved modifications.
 *
 * @param {Event} e Event.
 * @returns {string|undefined} Message
 */
Controller.prototype.handleWindowBeforeUnload_ = function (e) {
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
 * Depending on the current behavior, use the added sketch feature to process
 * the existing geometry.
 *
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleSketchFeaturesAdd_ = function (evt) {
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
 */
Controller.prototype.handleFeatureGeometryChange_ = function () {
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
 * @param {import('gmf/objectediting/toolsComponent').ObjectEditingQueryableLayerInfo[]} layersInfo
 *    List of queryable layers information, which contains the node and ogcServer.
 */
Controller.prototype.handleGetQueryableLayersInfo_ = function (layersInfo) {
  this.queryableLayersInfo = layersInfo;
  if (this.queryableLayersInfo.length) {
    this.selectedQueryableLayerInfo = this.queryableLayersInfo[0];
  }
};
Controller.prototype.handleDestroy_ = function () {
  this.features_.clear();
  this.toggle_(false);
  this.undoAllChanges_();
};

// == Static methods and type definitions ==

/**
 * Utility method that gets the clone of a geometry, which can be null or
 * undefined. In the latter case, a null value is returned instead of a
 * geometry.
 *
 * @param {?import('ol/geom/Geometry').default|undefined} geometry A geometry, undefined or
 *     null value.
 * @returns {?import('ol/geom/Geometry').default} A geometry clone or null value.
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
myModule.controller('GmfObjecteditingController', Controller);
export default myModule;
