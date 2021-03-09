// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

import gmfObjecteditingGetWMSFeatureComponent from 'gmf/objectediting/getWMSFeatureComponent.js';

import ngeoEditingCreatefeatureComponent from 'ngeo/editing/createfeatureComponent.js';

import ngeoEditingCreateregularpolygonfromclickComponent from 'ngeo/editing/createregularpolygonfromclickComponent.js';

import ngeoGeometryType from 'ngeo/GeometryType.js';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import {getUid as olUtilGetUid} from 'ol/util.js';

/**
 * @typedef {Object} ObjectEditingQueryableLayerInfo
 * @property {import('gmf/themes.js').GmfOgcServer} ogcServer
 * @property {import('gmf/themes.js').GmfLayerWMS} layerNode
 */

/**
 * @enum {string}
 * @hidden
 */
export const ObjecteditingProcessType = {
  ADD: 'add',
  DELETE: 'delete',
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfObjecteditingToolsComponent', [
  gmfObjecteditingGetWMSFeatureComponent.name,
  ngeoEditingCreatefeatureComponent.name,
  ngeoEditingCreateregularpolygonfromclickComponent.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/objectediting/toolsComponent', require('./toolsComponent.html'));
  }
);

/**
 * Directive used to edit the geometry of a single feature using advanced
 * tools.
 *
 * Example:
 *
 *     <gmf-objecteditingtools
 *         gmf-objecteditingtools-active="ctrl.objectEditingActive"
 *         gmf-objecteditingtools-copyfromactive="ctrl.objectEditingCopyFromActive"
 *         gmf-objecteditingtools-deletefromactive="ctrl.objectEditingDeleteFromActive"
 *         gmf-objecteditingtools-feature="ctrl.objectEditingFeature"
 *         gmf-objecteditingtools-geomtype="ctrl.objectEditingGeomType"
 *         gmf-objecteditingtools-map="::ctrl.map"
 *         gmf-objecteditingtools-process="::ctrl.process"
 *         gmf-objecteditingtools-queryablelayerinfo="::ctrl.queryableLayerInfo"
 *         gmf-objecteditingtools-requireslayer="ctrl.requiresLayer"
 *         gmf-objecteditingtools-sketchfeatures="::ctrl.sketchFeatures">
 *     </gmf-objecteditingtools>
 *
 * @htmlAttribute {boolean} gmf-objecteditingtools-active Whether the
 *     directive is active or not.
 * @htmlAttribute {boolean} gmf-objecteditingtools-copyfromactive Whether the
 *     'Copy from' tool is active or not.
 * @htmlAttribute {boolean} gmf-objecteditingtools-deletefromactive Whether the
 *     'Delete from' tool is active or not.
 * @htmlAttribute {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} gmf-objecteditingtools-feature The feature to
 *     edit.
 * @htmlAttribute {string} gmf-objecteditingtools-geomtype The geometry type.
 * @htmlAttribute {import("ol/Map.js").default} gmf-objecteditingtools-map The map.
 * @htmlAttribute {string} gmf-objectediting-process Determines the
 *     behavior to adopt when sketch features are added.
 * @htmlAttribute {ObjectEditingQueryableLayerInfo} gmf-objectediting-queryablelayerinfo
 *     Queryable layer information.
 * @htmlAttribute {boolean} gmf-objectediting-requireslayer Flag that determines
 *     if the currently active tool requires a queryable layer or not.
 * @htmlAttribute {import("ol/Collection.js").default<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>} gmf-objectediting-sketchfeatures
 *     Collection of temporary features being drawn by the tools.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfObjecteditingtools
 */
function objectEditingToolsComponent() {
  return {
    controller: 'GmfObjecteditingtoolsController as oetCtrl',
    scope: {
      'active': '=gmfObjecteditingtoolsActive',
      'copyFromActive': '=gmfObjecteditingtoolsCopyfromactive',
      'deleteFromActive': '=gmfObjecteditingtoolsDeletefromactive',
      'feature': '<gmfObjecteditingtoolsFeature',
      'geomType': '<gmfObjecteditingtoolsGeomtype',
      'map': '<gmfObjecteditingtoolsMap',
      'process': '=gmfObjecteditingtoolsProcess',
      'queryableLayerInfo': '=gmfObjecteditingtoolsQueryablelayerinfo',
      'requiresLayer': '=gmfObjecteditingtoolsRequireslayer',
      'sketchFeatures': '<gmfObjecteditingtoolsSketchfeatures',
    },
    bindToController: true,
    templateUrl: 'gmf/objectediting/toolsComponent',
  };
}

myModule.directive('gmfObjecteditingtools', objectEditingToolsComponent);

/**
 * @private
 * @hidden
 */
const NAMESPACE = 'oet';

/**
 * @param {angular.IScope} $scope Scope.
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @param {import('gmf/options.js').gmfObjectEditingToolsOptions} gmfObjectEditingToolsOptions The options.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfObjecteditingtoolsController
 */
export function Controller($scope, ngeoToolActivateMgr, gmfObjectEditingToolsOptions) {
  // == Scope properties ==

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {boolean}
   */
  this.copyFromActive = false;

  /**
   * @type {boolean}
   */
  this.deleteFromActive = false;

  /**
   * @type {?import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>}
   */
  this.feature = null;

  /**
   * @type {?string}
   */
  this.geomType = null;

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {?ObjectEditingQueryableLayerInfo}
   */
  this.queryableLayerInfo = null;

  /**
   * @type {?string}
   */
  this.process = null;

  /**
   * @type {boolean}
   */
  this.requiresLayer = false;

  /**
   * @type {?import("ol/Collection.js").default<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>}
   */
  this.sketchFeatures = null;

  // == Injected properties ==

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr}
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  // == Other properties ==

  /**
   * @type {string}
   */
  this.geomTypePolygon = ngeoGeometryType.POLYGON;

  /**
   * @type {string[]}
   */
  this.toolActiveNames_ = [];

  /**
   * @type {boolean}
   */
  this.drawActive = false;

  this.registerTool_('drawActive', ObjecteditingProcessType.ADD);

  /**
   * @type {boolean}
   */
  this.eraseActive = false;

  this.registerTool_('eraseActive', ObjecteditingProcessType.DELETE);

  /**
   * @type {boolean}
   */
  this.drawTriangleActive = false;

  /**
   * @type {number}
   */
  this.triangleAngle = (Math.PI / 180) * 90; // 90 degrees

  const oeToolsOptions = gmfObjectEditingToolsOptions;

  /**
   * @type {number}
   */
  this.triangleRadius =
    oeToolsOptions.regularPolygonRadius !== undefined ? oeToolsOptions.regularPolygonRadius : 100;

  this.registerTool_('drawTriangleActive', ObjecteditingProcessType.ADD);
  this.registerTool_('copyFromActive', ObjecteditingProcessType.ADD, true);
  this.registerTool_('deleteFromActive', ObjecteditingProcessType.DELETE, true);

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
}

/**
 * Init the controller
 */
Controller.prototype.$onInit = function () {
  this.scope_.$watch(
    () => this.active,
    (newVal, oldVal) => {
      // if it's not active, deactivate tools
      if (!this.active) {
        this.requiresLayer = false;
        for (let i = 0, ii = this.toolActiveNames_.length; i < ii; i++) {
          // @ts-ignore: Strange behivior...
          this[this.toolActiveNames_[i]] = false;
        }
      }
    }
  );
};

/**
 * Register a tool using its `active` property name and what behavior it should
 * have when it is active and a sketch feature is added
 *
 * This method:
 *  - registers a watcher on the tool active property to manage this directive
 *    main active property, i.e the directive is considered active when one
 *    of the tools is active,  otherwise it's not active.
 *
 *  - creates a `ngeo.misc.ToolActivate` object and registers it in a group so
 *    that only one tool can be active at a time
 *
 * @param {string} toolActiveName The name of the active property for the tool.
 * @param {string} process The behavior the tool should use when active
 *     and when sketch features are added.
 * @param {boolean=} opt_requiresLayer Whether the tool requires the queryable
 *     layer or not. Defaults to `false`.
 */
Controller.prototype.registerTool_ = function (toolActiveName, process, opt_requiresLayer) {
  const requiresLayer = opt_requiresLayer === true;

  this.scope_.$watch(
    // @ts-ignore: Strange behivior...
    () => this[toolActiveName],
    this.handleToolActiveChange_.bind(this, process, requiresLayer)
  );

  const group = `${NAMESPACE}-${olUtilGetUid(this)}`;
  const toolActivate = new ngeoMiscToolActivate(this, toolActiveName);
  this.ngeoToolActivateMgr_.registerTool(group, toolActivate, false);

  this.toolActiveNames_.push(toolActiveName);
};

/**
 * Called when any of the tool 'active' property changes.
 * @param {string} process The behavior the tool should use when active.
 * @param {boolean} requiresLayer Whether the tool requires the queryable
 *     layer or not.
 * @param {boolean|undefined} newVal New value.
 */
Controller.prototype.handleToolActiveChange_ = function (process, requiresLayer, newVal) {
  // Update process if a tool was activated.
  if (newVal) {
    this.process = process;
    this.requiresLayer = requiresLayer;
  }

  // If one tool is active, update active property to true.
  let active = false;
  for (let i = 0, ii = this.toolActiveNames_.length; i < ii; i++) {
    // @ts-ignore: Strange behivior...
    active = this[this.toolActiveNames_[i]];
    if (active) {
      break;
    }
  }
  this.active = active;
};

Controller.prototype.handleDestroy_ = function () {};

myModule.controller('GmfObjecteditingtoolsController', Controller);

export default myModule;
