goog.provide('gmf.EditfeatureselectorController');
goog.provide('gmf.editfeatureselectorDirective');

goog.require('goog.asserts');
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

gmf.module.directive('gmfEditfeatureselector', gmf.editfeatureselectorDirective);


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

  /**
   * @param {Array.<ngeo.LayertreeController>} value First level controllers.
   */
  var updateEditableTreeCtrls = function(value) {
    // Timeout required, because the collection event is fired before the
    // leaf nodes are created and they are the ones we're looking for here.
    this.$timeout_(function() {
      if (value) {
        var editables = this.editableTreeCtrls;

        editables.length = 0;
        this.gmfTreeManager_.rootCtrl.traverseDepthFirst(function(treeCtrl) {
          if (treeCtrl.node.editable) {
            goog.asserts.assert(treeCtrl.children.length === 0);
            editables.push(treeCtrl);
          }
        });
      }
    }.bind(this), 0);
  };

  /**
   * @type {function()}
   * @private
   */
  this.treeCtrlsWatcherUnregister_ = $scope.$watchCollection(function() {
    if (gmfTreeManager.rootCtrl) {
      return gmfTreeManager.rootCtrl.children;
    }
  }, updateEditableTreeCtrls.bind(this));


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
  this.treeCtrlsWatcherUnregister_();
};


gmf.module.controller('GmfEditfeatureselectorController', gmf.EditfeatureselectorController);
