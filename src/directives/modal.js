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
 * @htmlAttribute {boolean} ngeo-modal-destroy-content-on-hide Destroy the
 *     content when the modal is hidden
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
   * @param {!angular.$transclude} $transclude is a transclude linking
   *      function pre-bound to the correct transclusion scope.
   */
  constructor($scope, $element, $transclude) {
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
     * @type {!angular.$transclude}
     */
    this.$transclude_ = $transclude;

    /**
     * @private
     * @type {angular.Scope}
     */
    this.childScope_;

    /**
     * @private
     * @type {jQuery}
     */
    this.modal_;

    /**
     * @export
     * @type {boolean}
     */
    this.destroyContent;

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

  /**
   * @export
   */
  $onInit() {
    this.modal_ = this.$element_.children();

    this.destroyContent = !!this.destroyContent;
    this.resizable = !!this.resizable;

    this.childScope_ = this.$scope_.$new();

    // move the modal to document body to ensure that it is on top of
    // other elements even if in a positioned element initially.
    angular.element(document.body).append(this.modal_);

    this.modal_.find('.modal-dialog').draggable();

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

    if (this.destroyContent) {
      this.modal_.on('hide.bs.modal', this.onHide_.bind(this));
      this.modal_.on('show.bs.modal', this.onShow_.bind(this));
    } else {
      if (this.resizable) {
        this.modal_.find('.modal-content').resizable().append(this.$transclude_());
      } else {
        this.modal_.find('.modal-content').append(this.$transclude_());
      }
    }
  }

  /**
   * @private
   */
  onShow_() {
    this.childScope_ = this.$scope_.$new();
    this.$transclude_(this.childScope_, (scope, clone) => {
      if (this.resizable) {
        this.modal_.find('.modal-content').resizable().append(clone);
      } else {
        this.modal_.find('.modal-content').append(clone);
      }
    });
  }

  /**
   * @private
   */
  onHide_() {
    this.childScope_.$destroy();
    const content = this.modal_.find('.modal-content');
    if (this.resizable && content.hasClass('ui-resizable')) {
      content.resizable('destroy');
    }
    content.empty();
  }
};

/**
 * @type {!angular.Component}
 */
ngeo.modalDirective.Component = {
  template: `<div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
      </div>
    </div>
  </div>`,
  restrict: 'E',
  require: {
    'ngModel': 'ngModel'
  },
  transclude: true,
  controller: ngeo.modalDirective.Controller,
  bindings: {
    'destroyContent': '<ngeoModalDestroyContentOnHide',
    'resizable': '<ngeoModalResizable'
  }
};

ngeo.module.component('ngeoModal', ngeo.modalDirective.Component);
