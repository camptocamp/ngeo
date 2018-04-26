/**
 * @module gmf.editing.editFeatureSelectorComponent
 */
import googAsserts from 'goog/asserts.js';

/** @suppress {extraRequire} */
import gmfEditingEditFeatureComponent from 'gmf/editing/editFeatureComponent.js';

import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('GmfEditingFeatureSelectorComponent', [
  gmfEditingEditFeatureComponent.name,
  gmfLayertreeTreeManager.module.name,
  gmfThemeThemes.module.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/editing/editFeatureSelectorComponent', require('./editFeatureSelectorComponent.html'));
});


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
exports.component_ = function() {
  return {
    controller: 'GmfEditfeatureselectorController as efsCtrl',
    scope: {
      'active': '=gmfEditfeatureselectorActive',
      'map': '<gmfEditfeatureselectorMap',
      'tolerance': '<?gmfEditfeatureselectorTolerance',
      'vectorLayer': '<gmfEditfeatureselectorVector'
    },
    bindToController: true,
    templateUrl: 'gmf/editing/editFeatureSelectorComponent'
  };
};


exports.directive('gmfEditfeatureselector',
  exports.component_);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {gmf.theme.Themes} gmfThemes The gmf Themes service.
 * @param {gmf.layertree.TreeManager} gmfTreeManager The gmf TreeManager service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureselectorController
 */
exports.Controller_ = function($scope, $timeout, gmfThemes,
  gmfTreeManager) {

  // === Directive options ===

  /**
   * @type {boolean}
   * @export
   */
  this.active = this.active === true;

  $scope.$watch(
    () => this.active,
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
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {gmf.theme.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {gmf.layertree.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @param {Array.<ngeo.layertree.Controller>} value First level controllers.
   */
  const updateEditableTreeCtrls = function(value) {
    // Timeout required, because the collection event is fired before the
    // leaf nodes are created and they are the ones we're looking for here.
    this.$timeout_(() => {
      if (value) {
        const editables = this.editableTreeCtrls;

        editables.length = 0;
        this.gmfTreeManager_.rootCtrl.traverseDepthFirst((treeCtrl) => {
          if (treeCtrl.node.editable) {
            googAsserts.assert(treeCtrl.children.length === 0);
            editables.push(treeCtrl);
          }
        });
      }
    }, 0);
  };

  /**
   * @type {function()}
   * @private
   */
  this.treeCtrlsWatcherUnregister_ = $scope.$watchCollection(() => {
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
   * @type {Array.<ngeo.layertree.Controller>}
   * @export
   */
  this.editableTreeCtrls = [];

  /**
   * The currently selected Layertree controller.
   * @type {?ngeo.layertree.Controller}
   * @export
   */
  this.selectedEditableTreeCtrl = null;

  $scope.$watch(
    () => this.selectedEditableTreeCtrl,
    (newValue, oldValue) => {
      this.dirty = false;
      this.state = gmfEditingEditFeatureComponent.State.IDLE;
    }
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
  this.state = gmfEditingEditFeatureComponent.State.IDLE;

  $scope.$watch(
    () => this.state,
    (newValue, oldValue) => {
      if (newValue === gmfEditingEditFeatureComponent.State.STOP_EDITING_EXECUTE ||
          newValue === gmfEditingEditFeatureComponent.State.DEACTIVATE_EXECUTE) {
        this.selectedEditableTreeCtrl = null;
      }
      if (newValue === gmfEditingEditFeatureComponent.State.DEACTIVATE_EXECUTE) {
        this.active = false;
      }
    }
  );

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

};


/**
 * Called when the 'stop editing' button is clicked. Set the 'state'
 * variable to 'pending' allow the editfeature directive to check if it can
 * stop or if it requires confirmation due to unsaved modifications.
 * @export
 */
exports.Controller_.prototype.stopEditing = function() {
  this.state = gmfEditingEditFeatureComponent.State.STOP_EDITING_PENDING;
};


/**
 * Called when the active property of the this directive changes. Manage
 * the activation/deactivation accordingly.
 * @param {boolean} active Whether the directive is active or not.
 * @private
 */
exports.Controller_.prototype.handleActiveChange_ = function(active) {
  if (!active) {
    if (!this.dirty) {
      this.selectedEditableNode = null;
    } else {
      // There are unsaved modifications. Prevent the deactivation and
      // set the state accordingly for the `gmf-editfeature` directive
      // to manage the unsaved modifications.
      // The changes are made inside a $timeout to be taken into account
      // in the next digest cycle.
      this.$timeout_(() => {
        this.active = true;
        this.stopEditing();
      });
    }
  }
};


/**
 * @private
 */
exports.Controller_.prototype.handleDestroy_ = function() {
  this.treeCtrlsWatcherUnregister_();
};


exports.controller('GmfEditfeatureselectorController',
  exports.Controller_);


export default exports;
