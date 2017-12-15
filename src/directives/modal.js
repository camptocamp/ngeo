goog.provide('ngeo.modalDirective');

goog.require('goog.asserts');
goog.require('ngeo');


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
 *       <div class="modal-header">
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
 * @htmlAttribute {boolean} ngeo-modal-resizable Whether the modal can be
 *     resized or not. Defaults to `false`.
 * @ngdoc component
 * @ngname ngeoModal
 */
ngeo.modalDirective;

ngeo.modalDirective.Controller = class {
  /**
   * @ngInject
   * @param {!angular.Scope} $scope Scope.
   * @param {!jQuery} $element Element.
   */
  constructor($scope, $element) {
    /**
     * @private
     * @type {!jQuery}
     */
    this.$element_ = $element;

    /**
     * @private
     * @type {!angular.Scope}
     */
    this.$scope_ = $scope;

    /**
     * @private
     * @type {jQuery}
     */
    this.modal_;

    /**
     * @export
     * @type {boolean}
     */
    this.resizable;

    /**
     * @export
     * @type {angular.NgModelController|null}
     */
    this.ngModel;
  }

  $onInit() {
    this.modal_ = this.$element_.children();

    this.resizable = !!this.resizable;

    const dialog = this.modal_.find('.modal-dialog');
    dialog.draggable();
    if (this.resizable) {
      dialog.resizable();
    }

    this.ngModel.$render = () => {
      this.modal_.modal(this.ngModel.$viewValue ? 'show' : 'hide');
    };

    this.modal_.on('shown.bs.modal hidden.bs.modal', (e) => {
      const type = e.type;
      goog.asserts.assert(type == 'shown' || type == 'hidden');
      this.$scope_.$apply(() => {
        this.ngModel.$setViewValue(type == 'shown');
      });
    });
  }

  $onDestroy() {
    const dialog = this.modal_.find('.modal-dialog');
    dialog.draggable('destroy');
    if (this.resizable) {
      dialog.resizable('destroy');
    }
  }
};

/**
 * @type {!angular.Component}
 */
ngeo.modalDirective.Component = {
  template: `<div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <ng-transclude></ng-transclude>
      </div>
    </div>
  </div>`,
  require: {
    'ngModel': 'ngModel'
  },
  transclude: true,
  controller: ngeo.modalDirective.Controller,
  bindings: {
    'resizable': '<ngeoModalResizable'
  }
};

ngeo.module.component('ngeoModal', ngeo.modalDirective.Component);
