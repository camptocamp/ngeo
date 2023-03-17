import angular from 'angular';
import 'jquery-ui/ui/widgets/draggable.js';
import 'bootstrap/js/src/modal.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoModal', []);

/**
 * Provides the "ngeoModal" component.
 *
 * This component shows a Bootstrap modal when the `ngModel` expression
 * evaluates to `true`, and it hides it when the `ngModel` expression
 * evaluates to `false`.
 *
 * The components also changes the `ngModel` value when the user manually
 * closes the modal.
 *
 * This component is based on Bootstrap's `modal` classes and associated
 * jQuery plugin.
 *
 *     <ngeo-modal ng-model="modalShown">
 *       <div class="modal-header ui-draggable-handle">
 *         <button type="button" class="close" data-dismiss="modal"
 *                 aria-hidden="true">&times;</button>
 *         <h4 class="modal-title">The Title</h4>
 *       </div>
 *       <div class="modal-body">Some content</div>
 *     </ngeo-modal>
 *
 * Note: for z-indexing purpose, the modal DOM element is automatically moved
 * to document body element.
 *
 * See our live example: [../examples/modal.html](../examples/modal.html)
 *
 * @htmlAttribute {string} ngeo-draggable-handle The jquery selector that define the element
 *     that can starts the dragging sequence. Defaults to `.ui-draggable-handle`.
 * @htmlAttribute {boolean} ngeo-modal-resizable Whether the modal can be
 *     resized or not. Defaults to `false`.
 * @htmlAttribute {boolean} ngeo-modal-closable Whether the modal can be
 *     closed by clicking outside it or by hiting the `escape` keyboard key. Defaults to `true`.
 * @ngdoc component
 * @ngname ngeoModal
 * @type {!angular.IComponentOptions}
 */
const messageModalComponent = {
  template: `<div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <ng-transclude></ng-transclude>
      </div>
    </div>
  </div>`,
  require: {
    'ngModel': 'ngModel',
  },
  transclude: true,
  controller: 'ngeoModalController',
  bindings: {
    'draggableHandle': '=?ngeodraggableHandle',
    'resizable': '<ngeoModalResizable',
    'closable': '<ngeoModalClosable',
  },
};

module.component('ngeoModal', messageModalComponent);

/**
 * @private
 * @hidden
 */
class Controller {
  /**
   * @ngInject
   * @param {!angular.IScope} $scope Scope.
   * @param {!JQuery} $element Element.
   */
  constructor($scope, $element) {
    /**
     * @private
     * @type {!JQuery}
     */
    this.$element_ = $element;

    /**
     * @private
     * @type {!angular.IScope}
     */
    this.$scope_ = $scope;

    /**
     * @private
     * @type {JQuery}
     */
    this.modal_;

    /**
     * @type {string}
     */
    this.draggableHandle;

    /**
     * @type {boolean}
     */
    this.closable;

    /**
     * @type {boolean}
     */
    this.resizable;

    /**
     * @type {angular.INgModelController|null}
     */
    this.ngModel;
  }

  $onInit() {
    this.closable = this.closable !== false;

    this.resizable = !!this.resizable;

    this.draggableHandle = this.draggableHandle || '.ui-draggable-handle';
  }

  $postLink() {
    this.modal_ = this.$element_.children();

    if (!this.closable) {
      this.modal_.attr('data-keyboard', 'false');
      this.modal_.attr('data-backdrop', 'static');
    }

    const dialog = this.modal_.find('.modal-dialog');
    dialog.draggable({
      handle: this.draggableHandle,
    });
    if (this.resizable) {
      dialog.resizable();
    }

    this.ngModel.$render = () => {
      this.modal_.modal(this.ngModel.$viewValue ? 'show' : 'hide');
    };

    this.modal_.on('shown.bs.modal hidden.bs.modal', (e) => {
      const type = e.type;
      console.assert(type == 'shown' || type == 'hidden');
      this.ngModel.$setViewValue(type == 'shown');
    });
  }

  $onDestroy() {
    // Force close the modal.
    this.modal_.modal('hide');
    // Destroy the children's plugins.
    const dialog = this.modal_.find('.modal-dialog');
    dialog.draggable('destroy');
    if (this.resizable) {
      dialog.resizable('destroy');
    }
  }
}

module.controller('ngeoModalController', Controller);

export default module;
