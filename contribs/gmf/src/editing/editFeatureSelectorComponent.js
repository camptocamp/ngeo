import angular from 'angular';

import gmfEditingEditFeatureComponent, {EditingState} from 'gmf/editing/editFeatureComponent.js';

import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('GmfEditingFeatureSelectorComponent', [
  gmfEditingEditFeatureComponent.name,
  gmfLayertreeTreeManager.name,
  gmfThemeThemes.name,
]);

module.run(
  /* @ngInject */ ($templateCache) => {
    $templateCache.put(
      // @ts-ignore: webpack
      'gmf/editing/editFeatureSelectorComponent',
      require('./editFeatureSelectorComponent.html')
    );
  }
);

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
 *         gmf-editfeatureselector-vector="::ctrl.vectorLayer"
 *         gmf-editfeatureselector-tree="ctrl.selectedEditableTreeCtrl"
 *         gmf-editfeatureselector-closeaftersave="::true">
 *     </gmf-editfeatureselector>
 *
 * @htmlAttribute {boolean} gmf-editfeatureselector-active Whether the
 *     directive is active or not.
 * @htmlAttribute {import("ol/Map.js").default} gmf-editfeatureselector-map The map.
 * @htmlAttribute {number|undefined} gmf-editfeatureselector-tolerance The
 *     buffer in pixels to use when making queries to get the features.
 * @htmlAttribute {import("ol/layer/Vector.js").default} gmf-editfeatureselector-vector The vector
 *     layer where the selected or created features are drawn.
 * @htmlAttribute {import("ngeo/layertree/Controller.js").default} gmf-editfeatureselector-tree The
 *     layertree controller handling the selectable editable layers list.
 * @htmlAttribute {boolean} gmf-editfeatureselector-closeaftersave If true,
 *     immediately return to the main edit panel after save. Default is false.
 * @return {angular.IDirective} The directive specs.
 * @ngdoc directive
 * @ngname gmfEditfeatureselector
 */
function editingEditFeatureComponent() {
  return {
    controller: 'GmfEditfeatureselectorController as efsCtrl',
    scope: {
      'active': '=gmfEditfeatureselectorActive',
      'map': '<gmfEditfeatureselectorMap',
      'tolerance': '<?gmfEditfeatureselectorTolerance',
      'vectorLayer': '<gmfEditfeatureselectorVector',
      'selectedEditableTreeCtrl': '=?gmfEditfeatureselectorTree',
      'closeAfterSave': '=?gmfEditfeatureselectorCloseaftersave',
    },
    bindToController: true,
    templateUrl: 'gmf/editing/editFeatureSelectorComponent',
  };
}

module.directive('gmfEditfeatureselector', editingEditFeatureComponent);

/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf Themes service.
 * @param {import("gmf/layertree/TreeManager.js").LayertreeTreeManager} gmfTreeManager The gmf TreeManager
 *    service.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureselectorController
 */
function Controller($scope, $timeout, gmfThemes, gmfTreeManager) {
  // === Directive options ===

  /**
   * @type {boolean}
   */
  this.active = this.active === true;

  $scope.$watch(() => this.active, this.handleActiveChange_.bind(this));

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {number|undefined}
   */
  this.tolerance;

  /**
   * @type {import("ol/layer/Vector.js").default}
   */
  this.vectorLayer;

  /**
   * @type {boolean}
   * @export
   */
  this.closeAfterSave;

  // === Injected services ===

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {import("gmf/theme/Themes.js").ThemesService}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @param {Array.<import("ngeo/layertree/Controller.js").LayertreeController>} value First level
   *    controllers.
   */
  const updateEditableTreeCtrls = function (value) {
    // Timeout required, because the collection event is fired before the
    // leaf nodes are created and they are the ones we're looking for here.
    this.$timeout_(() => {
      if (value) {
        const editables = this.editableTreeCtrls;

        editables.length = 0;
        this.gmfTreeManager_.rootCtrl.traverseDepthFirst((treeCtrl) => {
          if (treeCtrl.node.editable) {
            console.assert(treeCtrl.children.length === 0);
            editables.push(treeCtrl);
          }
        });
      }
    }, 0);
  };

  /**
   * @type {function(): void}
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
   */
  this.dirty = false;

  /**
   * List of editable Layertree controllers.
   * @type {Array.<import("ngeo/layertree/Controller.js").LayertreeController>}
   */
  this.editableTreeCtrls = [];

  /**
   * The currently selected Layertree controller.
   * @type {?import("ngeo/layertree/Controller.js").LayertreeController}
   */
  this.selectedEditableTreeCtrl = null;

  $scope.$watch(
    () => this.selectedEditableTreeCtrl,
    (newValue, oldValue) => {
      this.dirty = false;
      this.state = EditingState.IDLE;
    }
  );

  /**
   * The state of this directive shared with the `gmf-editfeature` directive.
   * This property allows the proper management of the "stop editing" button.
   * When clicked, the according state is set and the `gmf-editfeature`
   * directive checks if it has unsaved changes and allow this directive to
   * continue the action that was made or not.
   * @type {string}
   */
  this.state = EditingState.IDLE;

  $scope.$watch(
    () => this.state,
    (newValue, oldValue) => {
      if (newValue === EditingState.STOP_EDITING_EXECUTE || newValue === EditingState.DEACTIVATE_EXECUTE) {
        this.selectedEditableTreeCtrl = null;
      }
      if (newValue === EditingState.DEACTIVATE_EXECUTE) {
        this.active = false;
      }
    }
  );

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
}

/**
 * Called when the 'stop editing' button is clicked. Set the 'state'
 * variable to 'pending' allow the editfeature directive to check if it can
 * stop or if it requires confirmation due to unsaved modifications.
 */
Controller.prototype.stopEditing = function () {
  this.state = EditingState.STOP_EDITING_PENDING;
};

/**
 * Called when the active property of the this directive changes. Manage
 * the activation/deactivation accordingly.
 * @param {boolean} active Whether the directive is active or not.
 * @private
 */
Controller.prototype.handleActiveChange_ = function (active) {
  if (!active) {
    if (!this.dirty) {
      this.stopEditing();
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
Controller.prototype.handleDestroy_ = function () {
  this.treeCtrlsWatcherUnregister_();
};

module.controller('GmfEditfeatureselectorController', Controller);

export default module;
