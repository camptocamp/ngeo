goog.provide('gmf.EditfeatureselectorController');
goog.provide('gmf.editfeatureselectorDirective');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
/** @suppress {extraRequire} */
goog.require('gmf.editfeatureDirective');


/**
 * Directive that uses the GMF Theme service to collect the editable layers
 * and create a drop-down list out of them. When the user selects one of the
 * layer from the list, a `gmf-editfeature` directive is created and shown,
 * which allows the user to edit that layer.
 *
 * Example:
 *
 *     <gmf-editfeatureselector
 *         gmf-editfeatureselector-active="ctrl.editFeatureSelectorActive"
 *         gmf-editfeatureselector-map="::ctrl.map"
 *         gmf-editfeatureselector-tolerance="::ctrl.tolerance"
 *         gmf-editfeatureselector-vector="::ctrl.vectorLayer">
 *     </gmf-editfeatureselector>
 *
 * @htmlAttribute {boolean} gmf-editfeatureselector-active Whether the
 *     directive is active or not.
 * @htmlAttribute {ol.Map} gmf-editfeatureselector-map The map.
 * @htmlAttribute {number|undefined} gmf-editfeatureselector-tolerance The
 *     buffer in pixels to use when making queries to get the features.
 * @htmlAttribute {ol.layer.Vector} gmf-editfeatureselector-vector The vector
 *     layer where the selected or created features are drawn.
 * @return {angular.Directive} The directive specs.
 * @ngdoc directive
 * @ngname gmfEditfeatureselector
 */
gmf.editfeatureselectorDirective = function() {
  return {
    controller: 'GmfEditfeatureselectorController',
    scope: {
      'active': '=gmfEditfeatureselectorActive',
      'map': '<gmfEditfeatureselectorMap',
      'tolerance': '<?gmfEditfeatureselectorTolerance',
      'vectorLayer': '<gmfEditfeatureselectorVector'
    },
    bindToController: true,
    controllerAs: 'efsCtrl',
    templateUrl: gmf.baseTemplateUrl + '/editfeatureselector.html'
  };
};

gmf.module.directive(
  'gmfEditfeatureselector', gmf.editfeatureselectorDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {gmf.Themes} gmfThemes The gmf Themes service.
 * @param {gmf.TreeManager} gmfTreeManager The gmf TreeManager service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureselectorController
 */
gmf.EditfeatureselectorController = function($scope, $timeout, gmfThemes,
    gmfTreeManager) {

  // === Directive options ===

  /**
   * @type {boolean}
   * @export
   */
  this.active = this.active === true;

  $scope.$watch(
    function() {
      return this.active;
    }.bind(this),
    this.handleActiveChange_.bind(this)
  );

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {number|undefined}
   * @export
   */
  this.tolerance;

  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.vectorLayer;


  // === Injected services ===

  /**
   * @type {!angular.Scope} $scope Angular scope.
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

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

  this.treeCtrlReferencesWatcherUnregister_ = $scope.$watchCollection(
    function() {
      return this.gmfTreeManager_.getTreeCtrlReferences();
    }.bind(this),
    function(newVal, oldVal) {
      var i, ii;

      // (1) Register newly added Layertree controllers
      for (i = 0, ii = newVal.length; i < ii; i++) {
        if (oldVal.indexOf(newVal[i]) === -1) {
          this.registerTreeCtrl_(newVal[i]);
        }
      }

      // (2) Unregister removed Layertree controllers
      for (i = 0, ii = oldVal.length; i < ii; i++) {
        if (newVal.indexOf(oldVal[i]) === -1) {
          this.unregisterTreeCtrl_(oldVal[i]);
        }
      }
    }.bind(this)
  );


  // === Other inner properties ===

  /**
   * Flag shared with the `gmf-editfeature` directive used to determine if it
   * has unsaved changes or not.
   * @type {boolean}
   * @export
   */
  this.dirty = false;

  /**
   * @type {ol.EventsKey}
   * @private
   */
  this.gmfThemesChangeEventKey_ = ol.events.listen(
    this.gmfThemes_,
    gmf.ThemesEventType.CHANGE,
    this.handleThemesChange_,
    this
  );

  /**
   * List of editable Layertree controllers.
   * @type {Array.<ngeo.LayertreeController>}
   * @export
   */
  this.editableTreeCtrls = [];

  /**
   * The currently selected Layertree controller.
   * @type {?ngeo.LayertreeController}
   * @export
   */
  this.selectedEditableTreeCtrl = null;

  $scope.$watch(
    function() {
      return this.selectedEditableTreeCtrl;
    }.bind(this),
    function(newValue, oldValue) {
      this.dirty = false;
      this.state = gmf.EditfeatureController.State.IDLE;
    }.bind(this)
  );

  /**
   * The state of this directive shared with the `gmf-editfeature` directive.
   * This property allows the proper management of the "stop editing" button.
   * When clicked, the according state is set and the `gmf-editfeature`
   * directive checks if it has unsaved changes and allow this directive to
   * continue the action that was made or not.
   * @type {string}
   * @export
   */
  this.state = gmf.EditfeatureController.State.IDLE;

  $scope.$watch(
    function() {
      return this.state;
    }.bind(this),
    function(newValue, oldValue) {
      if (newValue === gmf.EditfeatureController.State.STOP_EDITING_EXECUTE ||
          newValue === gmf.EditfeatureController.State.DEACTIVATE_EXECUTE) {
        this.selectedEditableTreeCtrl = null;
      }
      if (newValue === gmf.EditfeatureController.State.DEACTIVATE_EXECUTE) {
        this.active = false;
      }
    }.bind(this)
  );

  /**
   * A reference to the OGC servers loaded by the theme service.
   * @type {GmfOgcServers}
   * @private
   */
  this.ogcServers_ = null;

  /**
   * The list of Snappable items, i.e. configurations required to enable
   * snapping in the `gmf-editfeature` directive.
   * @type {Array.<gmfx.SnappableItem>}
   * @export
   */
  this.snappableItems = [];

  /**
   * A cache containing all available snappable items, in which the listening
   * of the state of the `treeCtrl` is registered and unregistered.
   * @type {gmf.EditfeatureselectorController.SnappableItemCache}
   * @private
   */
  this.snappableItemsCache_ = {};

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

};


/**
 * Called when the themes change. Get the OGC servers, then listen to the
 * tree manager Layertree controllers array changes.
 * @private
 */
gmf.EditfeatureselectorController.prototype.handleThemesChange_ = function() {

  this.ogcServers_ = null;

  this.gmfThemes_.getOgcServersObject().then(function(ogcServers) {
    console.log(ogcServers);

    this.ogcServers_ = ogcServers;

  }.bind(this));
};


/**
 * Called when the 'stop editing' button is clicked. Set the 'state'
 * variable to 'pending' allow the editfeature directive to check if it can
 * stop or if it requires confirmation due to unsaved modifications.
 * @export
 */
gmf.EditfeatureselectorController.prototype.stopEditing = function() {
  this.state = gmf.EditfeatureController.State.STOP_EDITING_PENDING;
};


/**
 * Called when the active property of the this directive changes. Manage
 * the activation/deactivation accordingly.
 * @param {boolean} active Whether the directive is active or not.
 * @private
 */
gmf.EditfeatureselectorController.prototype.handleActiveChange_ = function(active) {
  if (!active) {
    if (!this.dirty) {
      this.selectedEditableNode = null;
    } else {
      // There are unsaved modifications. Prevent the deactivation and
      // set the state accordingly for the `gmf-editfeature` directive
      // to manage the unsaved modifications.
      // The changes are made inside a $timeout to be taken into account
      // in the next digest cycle.
      this.$timeout_(function() {
        this.active = true;
        this.stopEditing();
      }.bind(this));
    }
  }
};


/**
 * @private
 */
gmf.EditfeatureselectorController.prototype.handleDestroy_ = function() {
  ol.events.unlistenByKey(this.gmfThemesChangeEventKey_);
  this.treeCtrlReferencesWatcherUnregister_();
};


/**
 * Registers a newly added Layertree controller 'leaf'.
 *
 *  - If it's editable, add it to the editable Layertree controller array
 * -  If it's snappable, create and add a `gmfx.SnappableItem` and add it
 *    to a cache. The state of the treeCtrl gets also watched. Once the state
 *    becomes `on`, then the item is pushed in the list of snappableItems that
 *    is shared with the `gmf-editfeature` directive.
 *
 * @param {ngeo.LayertreeController} treeCtrl Layertree controller to register
 * @private
 */
gmf.EditfeatureselectorController.prototype.registerTreeCtrl_ = function(
  treeCtrl
) {

  // Skip any Layertree controller that has a node that is not a leaf
  var node = /** @type {GmfThemesGroup|GmfThemesLeaf} */ (treeCtrl.node);
  if (node.children) {
    return;
  }

  // If treeCtrl is editable, add it to the list of editable tree ctrls
  if (gmf.LayertreeController.isEditable(treeCtrl)) {
    this.editableTreeCtrls.push(treeCtrl);
  }

  // If treeCtrl is snappable and supports WFS, listen to its state change.
  // When it becomes visible, it's added to the list of snappable tree ctrls.
  var snappingConfig = gmf.LayertreeController.getSnappingConfig(treeCtrl);
  if (snappingConfig) {
    var wfsConfig = this.getSnappingHandlerWFSConfig_(treeCtrl);
    if (wfsConfig) {
      var uid = goog.getUid(treeCtrl);

      var stateWatcherUnregister = this.scope_.$watch(
        function() {
          return treeCtrl.getState();
        }.bind(this),
        this.handleTreeCtrlStateChange_.bind(this, treeCtrl)
      );

      this.snappableItemsCache_[uid] = {
        item: {
          snappingConfig: snappingConfig,
          wfsConfig: wfsConfig
        },
        stateWatcherUnregister: stateWatcherUnregister
      };

      // This extra call is to initialize the treeCtrl with its current state
      this.handleTreeCtrlStateChange_(treeCtrl, treeCtrl.getState());
    }
  }
};


/**
 * Unregisters a removed Layertree controller 'leaf'.
 *
 *  - If it's editable, remove it from the editable Layertree controller array
 *  - If it's snappable, remove it from both the snappable cache and list
 *    and also unlisten the state watcher.
 *
 * @param {ngeo.LayertreeController} treeCtrl Layertree controller to register
 * @private
 */
gmf.EditfeatureselectorController.prototype.unregisterTreeCtrl_ = function(
  treeCtrl
) {

  // Skip any Layertree controller that has a node that is not a leaf
  var node = /** @type {GmfThemesGroup|GmfThemesLeaf} */ (treeCtrl.node);
  if (node.children) {
    return;
  }

  // Editable
  var index = this.editableTreeCtrls.indexOf(treeCtrl);
  if (index !== -1) {
    this.editableTreeCtrls.splice(index, 1);
  }

  // Snappable
  var uid = goog.getUid(treeCtrl);
  if (this.snappableItemsCache_[uid]) {
    this.snappableItemsCache_[uid].stateWatcherUnregister();
    var item = this.snappableItemsCache_[uid].item;
    index = this.snappableItems.indexOf(item);
    if (index !== -1) {
      this.snappableItems.splice(index, 1);
    }
    delete this.snappableItemsCache_[uid];
  }

};


/**
 * @param {ngeo.LayertreeController} treeCtrl The layer tree controller
 * @param {?string} newVal New state value
 * @private
 */
gmf.EditfeatureselectorController.prototype.handleTreeCtrlStateChange_ = function(
  treeCtrl, newVal
) {

  var uid = goog.getUid(treeCtrl);
  var item = this.snappableItemsCache_[uid].item;

  // Note: a snappable treeCtrl can only be a leaf, therefore the only possible
  //       states are: 'on' and 'off'.
  if (newVal === 'on') {
    this.snappableItems.push(item);
  } else {
    var index = this.snappableItems.indexOf(item);
    if (index !== -1) {
      this.snappableItems.splice(index, 1);
    }
  }

  // FIXME - remove
  //console.log(this.snappableItems);
};


/**
 * Get the configuration required to do WFS requests (for snapping purpose)
 * from a Layertree controller that has a leaf node.
 *
 * The following requirements must be met in order for a treeCtrl to be
 * considered supporting WFS:
 *
 * 1) ogcServers objects are loaded
 * 2) its node `type` property is equal to `WMS`
 * 3) in its node `childLayers` property, the `queryable` property is set
 *    to `true`
 * 4) if its node `mixed` property is:
 *   a) true: then the node must have an `ogcServer` property set
 *   b) false: then the first parent node must have an `ogcServer` property set
 * 5) the ogcServer defined in 3) has the `wfsSupport` property set to `true`.
 *
 * @param {ngeo.LayertreeController} treeCtrl The layer tree controller
 * @return {?gmfx.SnappingHandlerWFSConfig} The configuration object.
 * @private
 */
gmf.EditfeatureselectorController.prototype.getSnappingHandlerWFSConfig_ = function(
  treeCtrl
) {

  // (1)
  if (this.ogcServers_ === null) {
    return null;
  }

  var node = /** @type {GmfThemesLeaf} */ (treeCtrl.node);

  // (2)
  if (node.type !== gmf.Themes.NodeType.WMS) {
    return null;
  }

  // (3)
  var featureTypes = [];
  for (var i = 0, ii = node.childLayers.length; i < ii; i++) {
    if (node.childLayers[i].queryable) {
      featureTypes.push(node.childLayers[i].name);
    }
  }
  if (!featureTypes.length) {
    return null;
  }

  // (4)
  var ogcServerName;
  var parentNode = /** @type {GmfThemesGroup} */ (treeCtrl.parent.node);
  if (parentNode.mixed) {
    ogcServerName = node.ogcServer;
  } else {
    var firstTreeCtrl = ngeo.LayertreeController.getFirstParentTree(treeCtrl);
    var firstNode = /** @type {GmfThemesGroup} */ (firstTreeCtrl.node);
    ogcServerName = firstNode.ogcServer;
  }
  if (!ogcServerName) {
    return null;
  }

  // (5)
  var ogcServer = this.ogcServers_[ogcServerName];
  if (!ogcServer.wfsSupport) {
    return null;
  }

  // At this point, every requirements have been met.
  // Create and return the configuration.
  var urlWfs = ogcServer.urlWfs;
  goog.asserts.assert(urlWfs, 'urlWfs should be defined.');

  return {
    featureTypes: featureTypes.join(','),
    url: urlWfs
  };
};


/**
 * @typedef {Object<number, gmf.EditfeatureselectorController.SnappableItemCacheItem>}
 */
gmf.EditfeatureselectorController.SnappableItemCache;


/**
 * @typedef {{
 *     item: (gmfx.SnappableItem),
 *     stateWatcherUnregister: (Function)
 * }}
 */
gmf.EditfeatureselectorController.SnappableItemCacheItem;


gmf.module.controller(
  'GmfEditfeatureselectorController', gmf.EditfeatureselectorController);
