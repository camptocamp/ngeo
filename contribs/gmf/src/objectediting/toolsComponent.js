/**
 * @module gmf.objectediting.toolsComponent
 */

/** @suppress {extraRequire} */
import gmfObjecteditingGetWMSFeatureComponent from 'gmf/objectediting/getWMSFeatureComponent.js';

/** @suppress {extraRequire} */
import ngeoEditingCreatefeatureComponent from 'ngeo/editing/createfeatureComponent.js';

/** @suppress {extraRequire} */
import ngeoEditingCreateregularpolygonfromclickComponent from 'ngeo/editing/createregularpolygonfromclickComponent.js';

import ngeoGeometryType from 'ngeo/GeometryType.js';

/** @suppress {extraRequire} */
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import * as olBase from 'ol/index.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfObjecteditingToolsComponent', [
  gmfObjecteditingGetWMSFeatureComponent.name,
  ngeoEditingCreatefeatureComponent.name,
  ngeoEditingCreateregularpolygonfromclickComponent.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.module.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/objectediting/toolsComponent', require('./toolsComponent.html'));
});


/**
 * A list of additional options for this directive that are not defined as
 * html attributes. All keys of this hash are optional. For the complete list
 * of keys and their possible values, see in gmfx.js, under:
 * `gmfx.ObjectEditingToolsOptions`.
 */
exports.value('gmfObjectEditingToolsOptions', {});


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
 * @htmlAttribute {ol.Feature} gmf-objecteditingtools-feature The feature to
 *     edit.
 * @htmlAttribute {string} gmf-objecteditingtools-geomtype The geometry type.
 * @htmlAttribute {ol.Map} gmf-objecteditingtools-map The map.
 * @htmlAttribute {string} gmf-objectediting-process Determines the
 *     behavior to adopt when sketch features are added.
 * @htmlAttribute {gmfx.ObjectEditingQueryableLayerInfo} gmf-objectediting-queryablelayerinfo
 *     Queryable layer information.
 * @htmlAttribute {boolean} gmf-objectediting-requireslayer Flag that determines
 *     if the currently active tool requires a queryable layer or not.
 * @htmlAttribute {ol.Collection.<ol.Feature>} gmf-objectediting-sketchfeatures
 *     Collection of temporary features being drawn by the tools.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfObjecteditingtools
 */
exports.directive_ = function() {
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
      'sketchFeatures': '<gmfObjecteditingtoolsSketchfeatures'
    },
    bindToController: true,
    templateUrl: 'gmf/objectediting/toolsComponent'
  };
};

exports.directive('gmfObjecteditingtools',
  exports.directive_);


/**
 * @param {angular.$injector} $injector Main injector.
 * @param {!angular.Scope} $scope Scope.
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfObjecteditingtoolsController
 */
exports.Controller_ = function($injector, $scope, ngeoToolActivateMgr) {

  // == Scope properties ==

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  /**
   * @type {boolean}
   * @export
   */
  this.copyFromActive;

  /**
   * @type {boolean}
   * @export
   */
  this.deleteFromActive;

  /**
   * @type {ol.Feature}
   * @export
   */
  this.feature;

  /**
   * @type {string}
   * @export
   */
  this.geomType;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {gmfx.ObjectEditingQueryableLayerInfo}
   * @export
   */
  this.queryableLayerInfo;

  /**
   * @type {string}
   * @export
   */
  this.process;

  /**
   * @type {boolean}
   * @export
   */
  this.requiresLayer;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.sketchFeatures;


  // == Injected properties ==

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {ngeo.misc.ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  // == Other properties ==

  /**
   * @type {string}
   * @export
   */
  this.geomTypePolygon = ngeoGeometryType.POLYGON;

  /**
   * @type {Array.<string>}
   * @private
   */
  this.toolActiveNames_ = [];

  /**
   * @type {boolean}
   * @export
   */
  this.drawActive = false;

  this.registerTool_('drawActive',
    exports.ProcessType.ADD);

  /**
   * @type {boolean}
   * @export
   */
  this.eraseActive = false;

  this.registerTool_('eraseActive',
    exports.ProcessType.DELETE);

  /**
   * @type {boolean}
   * @export
   */
  this.drawTriangleActive = false;

  /**
   * @type {number}
   * @export
   */
  this.triangleAngle = Math.PI / 180 * 90; // 90 degrees

  const oeToolsOptions = /** @type {gmfx.ObjectEditingToolsOptions} */ (
    $injector.get('gmfObjectEditingToolsOptions'));

  /**
   * @type {number}
   * @export
   */
  this.triangleRadius = oeToolsOptions.regularPolygonRadius !== undefined ?
    oeToolsOptions.regularPolygonRadius : 100;

  this.registerTool_('drawTriangleActive',
    exports.ProcessType.ADD);

  this.registerTool_('copyFromActive',
    exports.ProcessType.ADD, true);

  this.registerTool_('deleteFromActive',
    exports.ProcessType.DELETE, true);

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
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
 * @private
 */
exports.Controller_.prototype.registerTool_ = function(
  toolActiveName, process, opt_requiresLayer
) {

  const requiresLayer = opt_requiresLayer === true;

  this.scope_.$watch(
    () => this[toolActiveName],
    this.handleToolActiveChange_.bind(this, process, requiresLayer)
  );

  const group = `${exports.Controller_.NAMESPACE_}-${olBase.getUid(this)}`;
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
 * @private
 */
exports.Controller_.prototype.handleToolActiveChange_ = function(
  process, requiresLayer, newVal
) {

  // Update process if a tool was activated.
  if (newVal) {
    this.process = process;
    this.requiresLayer = requiresLayer;
  }

  // Update active property
  let active = false;
  for (let i = 0, ii = this.toolActiveNames_.length; i < ii; i++) {
    active = active || this[this.toolActiveNames_[i]];
    if (active) {
      break;
    }
  }
  this.active = active;

  if (!this.active) {
    this.requiresLayer = false;
  }
};


/**
 * @private
 */
exports.Controller_.prototype.handleDestroy_ = function() {};


exports.controller('GmfObjecteditingtoolsController',
  exports.Controller_);


/**
 * @const
 * @private
 */
exports.Controller_.NAMESPACE_ = 'oet';


/**
 * @enum {string}
 */
exports.ProcessType = {
  ADD: 'add',
  DELETE: 'delete'
};


export default exports;
