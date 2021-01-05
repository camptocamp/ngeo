// The MIT License (MIT)
//
// Copyright (c) 2016-2020 Camptocamp SA
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

import gmfEditingEditFeatureComponent, {EditingState} from 'gmf/editing/editFeatureComponent.js';

import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('GmfEditingFeatureSelectorComponent', [
  gmfEditingEditFeatureComponent.name,
  gmfLayertreeTreeManager.name,
  gmfThemeThemes.name,
]);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    $templateCache.put(
      'gmf/editing/editFeatureSelectorComponent',
      // @ts-ignore: webpack
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
 *         gmf-editfeatureselector-vector="::ctrl.vectorLayer"
 *         gmf-editfeatureselector-tree="ctrl.selectedEditableTreeCtrl"
 *     </gmf-editfeatureselector>
 *
 * @htmlAttribute {boolean} gmf-editfeatureselector-active Whether the
 *     directive is active or not.
 * @htmlAttribute {import("ol/Map.js").default} gmf-editfeatureselector-map The map.
 * @htmlAttribute {import("ol/layer/Vector.js").default} gmf-editfeatureselector-vector The vector
 *     layer where the selected or created features are drawn.
 * @htmlAttribute {import("ngeo/layertree/Controller.js").default} gmf-editfeatureselector-tree The
 *     layertree controller handling the selectable editable layers list.
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
      'vectorLayer': '<gmfEditfeatureselectorVector',
      'selectedEditableTreeCtrl': '=?gmfEditfeatureselectorTree',
    },
    bindToController: true,
    templateUrl: 'gmf/editing/editFeatureSelectorComponent',
  };
}

module.directive('gmfEditfeatureselector', editingEditFeatureComponent);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf Themes service.
 * @param {import("gmf/layertree/TreeManager.js").LayertreeTreeManager} gmfTreeManager The gmf TreeManager
 *    service.
 * @constructor
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureselectorController
 */
export function Controller($scope, $timeout, gmfThemes, gmfTreeManager) {
  // === Directive options ===

  /**
   * @type {boolean}
   */
  this.active = this.active === true;

  $scope.$watch(() => this.active, this.handleActiveChange_.bind(this));

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {?import("ol/layer/Vector.js").default}
   */
  this.vectorLayer = null;

  // === Injected services ===

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {angular.ITimeoutService}
   */
  this.$timeout_ = $timeout;

  /**
   * @type {import("gmf/theme/Themes.js").ThemesService}
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @param {Array<import("ngeo/layertree/Controller.js").LayertreeController>} value First level
   *    controllers.
   */
  const updateEditableTreeCtrls = (value) => {
    // Timeout required, because the collection event is fired before the
    // leaf nodes are created and they are the ones we're looking for here.
    this.$timeout_(() => {
      if (value) {
        const editables = this.editableTreeCtrls;

        editables.length = 0;
        if (this.gmfTreeManager_.rootCtrl) {
          this.gmfTreeManager_.rootCtrl.traverseDepthFirst((treeCtrl) => {
            const gmfLayer = /** @type {import('gmf/themes.js').GmfLayer} */ (treeCtrl.node);
            if (gmfLayer.editable) {
              editables.push(treeCtrl);
            }
          });
        }
      }
    }, 0);
  };

  /**
   * @type {function(): void}
   */
  this.treeCtrlsWatcherUnregister_ = $scope.$watchCollection(() => {
    if (gmfTreeManager.rootCtrl) {
      return gmfTreeManager.rootCtrl.children;
    }
    return [];
  }, updateEditableTreeCtrls);

  // === Other inner properties ===

  /**
   * Flag shared with the `gmf-editfeature` directive used to determine if it
   * has unsaved changes or not.
   * @type {boolean}
   */
  this.dirty = false;

  /**
   * List of editable Layertree controllers.
   * @type {Array<import("ngeo/layertree/Controller.js").LayertreeController>}
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

Controller.prototype.handleDestroy_ = function () {
  this.treeCtrlsWatcherUnregister_();
};

module.controller('GmfEditfeatureselectorController', Controller);

export default module;
