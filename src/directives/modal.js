/**
 * @fileoverview Provides the "ngeoModal" directive. This directive allows
 * displaying a modal window. The directive takes care or the show/hide
 * actions.
 *
 *
 * Example:
 *
 * <ngeo-modal ngeo-modal-shown="modalShown">
 *   <div class="modal-header">
 *     <button type="button" class="close" data-dismiss="modal"
 *         aria-hidden="true">&times;</button>
 *     <h4 class="modal-title">The Title</h4>
 *   </div>
 *   <div class="modal-body">Some content</div>
 * </ngeo-modal>
 *
 * This directive requires Bootstrap's `modal` classes and associated jQuery
 * plugin.
 */

goog.provide('ngeo.modalDirective');

goog.require('ngeo');


/**
 * @param {angular.$parse} $parse Angular parse service.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 */
ngeo.modalDirective = function($parse) {
  return {
    template: '<div class="modal fade" tabindex="-1" role="dialog">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<ng-transclude></ng-transclude>' +
        '</div>' +
        '</div>' +
        '</div>',
    restrict: 'E',
    transclude: true,
    link:
        /**
         * @param {!angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         */
        function(scope, element, attrs) {
          var modal = element.children();

          var shownGet = $parse(attrs['ngeoModalShown']);
          var shownSet = shownGet.assign;

          scope.$watch(attrs['ngeoModalShown'], function(value) {
            modal.modal(value ? 'show' : 'hide');
          });

          modal.on('shown.bs.modal', function() {
            scope.$apply(function() {
              shownSet(scope, true);
            });
          });

          modal.on('hidden.bs.modal', function() {
            scope.$apply(function() {
              shownSet(scope, false);
            });
          });
        }
  };
};

ngeoModule.directive('ngeoModal', ngeo.modalDirective);
