goog.provide('gmf.EditfeatureselectorController');
goog.provide('gmf.editfeatureselectorDirective');

goog.require('gmf');
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
 * @param {gmf.TreeManager} gmfTreeManager The gmf TreeManager service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureselectorController
 */
gmf.EditfeatureselectorController = function($scope, $timeout, gmfTreeManager) {

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
   * List of active snappable Layertree controllers with state equal to 'on'.
   * @type {Array.<ngeo.LayertreeController>}
   * @export
   */
  this.snappableOnTreeCtrls = [];

  /**
   *
   * @type {Object.<number, gmf.EditfeatureselectorController.SnappableTreeCtrlCacheItem>}
   * @private
   */
  this.snappableOnTreeCtrlCache_ = {};

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

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
  this.treeCtrlReferencesWatcherUnregister_();
};


/**
 * Registers a newly added Layertree controller.
 *
 *  - If it's editable, add it to the editable Layertree controller array
 *
 * @param {ngeo.LayertreeController} treeCtrl Layertree controller to register
 * @private
 */
gmf.EditfeatureselectorController.prototype.registerTreeCtrl_ = function(
  treeCtrl
) {
  // If treeCtrl is editable, add it to the list of editable tree ctrls
  if (gmf.LayertreeController.isEditable(treeCtrl)) {
    this.editableTreeCtrls.push(treeCtrl);
  }

  // If treeCtrl is snappable, listen to its state change. When it becomes
  // visible, it's added to the list of "snappable on" tree ctrls.
  var snappableConfig = gmf.LayertreeController.getSnappingConfig(treeCtrl);
  if (snappableConfig) {
    var uid = goog.getUid(treeCtrl);

    var stateWatcherUnregister = this.scope_.$watch(
      function() {
        return treeCtrl.getState();
      }.bind(this),
      this.handleTreeCtrlStateChange_.bind(this, treeCtrl)
    );

    this.snappableOnTreeCtrlCache_[uid] = {
      stateWatcherUnregister: stateWatcherUnregister
    };

    // This extra call is to initialize the treeCtrl with its current state
    this.handleTreeCtrlStateChange_(treeCtrl, treeCtrl.getState());
  }
};


/**
 * Unregisters a removed Layertree controller.
 *
 *  - If it's editable, remove it from the editable Layertree controller array
 *
 * @param {ngeo.LayertreeController} treeCtrl Layertree controller to register
 * @private
 */
gmf.EditfeatureselectorController.prototype.unregisterTreeCtrl_ = function(
  treeCtrl
) {
  // Editable
  var index = this.editableTreeCtrls.indexOf(treeCtrl);
  if (index !== -1) {
    this.editableTreeCtrls.splice(index, 1);
  }

  // Snappable
  var uid = goog.getUid(treeCtrl);
  if (this.snappableOnTreeCtrlCache_[uid]) {
    this.snappableOnTreeCtrlCache_[uid].stateWatcherUnregister();
    delete this.snappableOnTreeCtrlCache_[uid];
  }
  index = this.snappableOnTreeCtrls.indexOf(treeCtrl);
  if (index !== -1) {
    this.snappableOnTreeCtrls.splice(index, 1);
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
  // Note: a snappable treeCtrl can only be a leaf, therefore the only possible
  //       states are: 'on' and 'off'.
  if (newVal === 'on') {
    this.snappableOnTreeCtrls.push(treeCtrl);
  } else {
    var index = this.snappableOnTreeCtrls.indexOf(treeCtrl);
    if (index !== -1) {
      this.snappableOnTreeCtrls.splice(index, 1);
    }
  }
};


/**
 * @typedef {{
 *     stateWatcherUnregister: (Function)
 * }}
 */
gmf.EditfeatureselectorController.SnappableTreeCtrlCacheItem;


gmf.module.controller(
  'GmfEditfeatureselectorController', gmf.EditfeatureselectorController);
