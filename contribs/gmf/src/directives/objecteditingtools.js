goog.provide('gmf.ObjecteditingtoolsController');
goog.provide('gmf.objecteditingtoolsDirective');

/** @suppress {extraRequire} */
goog.require('gmf.objecteditinggetwmsfeatureDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.btnDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.createfeatureDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.createregularpolygonfromclickDirective');
goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');


/**
 * Directive used to edit the geometry of a single feature using advanced
 * tools.
 *
 * Example:
 *
 *     <gmf-objecteditingtools
 *         gmf-objecteditingtools-active="ctrl.objectEditingActive"
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
 * @htmlAttribute {ol.Feature} gmf-objecteditingtools-feature The feature to
 *     edit.
 * @htmlAttribute {string} gmf-objecteditingtools-geomtype The geometry type.
 * @htmlAttribute {ol.Map} gmf-objecteditingtools-map The map.
 * @htmlAttribute {string} gmf-objectediting-process Determines the
 *     behavior to adopt when sketch features are added.
 * @htmlAttribute {gmf.ObjectEditingQuery.QueryableLayerInfo} gmf-objectediting-queryablelayerinfo
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
gmf.objecteditingtoolsDirective = function() {
  return {
    controller: 'GmfObjecteditingtoolsController',
    scope: {
      'active': '=gmfObjecteditingtoolsActive',
      'feature': '<gmfObjecteditingtoolsFeature',
      'geomType': '<gmfObjecteditingtoolsGeomtype',
      'map': '<gmfObjecteditingtoolsMap',
      'process': '=gmfObjecteditingtoolsProcess',
      'queryableLayerInfo': '=gmfObjecteditingtoolsQueryablelayerinfo',
      'requiresLayer': '=gmfObjecteditingtoolsRequireslayer',
      'sketchFeatures': '<gmfObjecteditingtoolsSketchfeatures'
    },
    bindToController: true,
    controllerAs: 'oetCtrl',
    templateUrl: gmf.baseTemplateUrl + '/objecteditingtools.html'
  };
};

gmf.module.directive('gmfObjecteditingtools', gmf.objecteditingtoolsDirective);


/**
 * @param {!angular.Scope} $scope Scope.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfObjecteditingtoolsController
 */
gmf.ObjecteditingtoolsController = function($scope, ngeoDecorateInteraction,
    ngeoToolActivateMgr) {

  // == Scope properties ==

  /**
   * @type {boolean}
   * @export
   */
  this.active;

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
   * @type {gmf.ObjectEditingQuery.QueryableLayerInfo}
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
   * @type {ngeo.DecorateInteraction}
   * @private
   */
  this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

  /**
   * @type {ngeo.ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  // == Other properties ==

  /**
   * @type {string}
   * @export
   */
  this.geomTypePolygon = ngeo.GeometryType.POLYGON;

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
    gmf.ObjecteditingtoolsController.ProcessType.ADD);

  /**
   * @type {boolean}
   * @export
   */
  this.eraseActive = false;

  this.registerTool_('eraseActive',
    gmf.ObjecteditingtoolsController.ProcessType.DELETE);

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

  /**
   * @type {number}
   * @export
   */
  this.triangleRadius = 100;

  this.registerTool_('drawTriangleActive',
    gmf.ObjecteditingtoolsController.ProcessType.ADD);

  /**
   * @type {boolean}
   * @export
   */
  this.copyFromActive = false;

  this.registerTool_('copyFromActive',
    gmf.ObjecteditingtoolsController.ProcessType.ADD, true);

  /**
   * @type {boolean}
   * @export
   */
  this.deleteFromActive = false;

  this.registerTool_('deleteFromActive',
    gmf.ObjecteditingtoolsController.ProcessType.DELETE, true);

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
 *  - creates a `ngeo.ToolActivate` object and registers it in a group so
 *    that only one tool can be active at a time
 *
 * @param {string} toolActiveName The name of the active property for the tool.
 * @param {string} process The behavior the tool should use when active
 *     and when sketch features are added.
 * @param {boolean=} opt_requiresLayer Whether the tool requires the queryable
 *     layer or not. Defaults to `false`.
 * @private
 */
gmf.ObjecteditingtoolsController.prototype.registerTool_ = function(
  toolActiveName, process, opt_requiresLayer
) {

  var requiresLayer = opt_requiresLayer === true;

  this.scope_.$watch(
    function() {
      return this[toolActiveName];
    }.bind(this),
    this.handleToolActiveChange_.bind(this, process, requiresLayer)
  );

  var group = gmf.ObjecteditingtoolsController.NAMESPACE_ +
      '-' + goog.getUid(this);
  var toolActivate = new ngeo.ToolActivate(this, toolActiveName);
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
gmf.ObjecteditingtoolsController.prototype.handleToolActiveChange_ = function(
  process, requiresLayer, newVal
) {

  // Update process if a tool was activated.
  if (newVal) {
    this.process = process;
    this.requiresLayer = requiresLayer;
  }

  // Update active property
  var active = false;
  for (var i = 0, ii = this.toolActiveNames_.length; i < ii; i++) {
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
gmf.ObjecteditingtoolsController.prototype.handleDestroy_ = function() {};


gmf.module.controller(
  'GmfObjecteditingtoolsController', gmf.ObjecteditingtoolsController);


/**
 * @const
 * @private
 */
gmf.ObjecteditingtoolsController.NAMESPACE_ = 'oet';


/**
 * @enum {string}
 */
gmf.ObjecteditingtoolsController.ProcessType = {
  ADD: 'add',
  DELETE: 'delete'
};
