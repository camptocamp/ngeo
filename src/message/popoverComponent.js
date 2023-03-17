import angular from 'angular';
import 'bootstrap/js/src/tooltip.js';
import 'bootstrap/js/src/popover.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoPopover', []);

/**
 * Provides a directive used to display a Bootstrap popover.
 *
 *    <div ngeo-popover>
 *      <a ngeo-popover-anchor class="btn btn-info">anchor 1</a>
 *      <div ngeo-popover-body>
 *        <ul>
 *          <li>action 1:
 *            <input type="range"/>
 *          </li>
 *        </ul>
 *      </div>
 *    </div>
 *
 * @ngdoc directive
 * @ngInject
 * @ngname ngeoPopover
 * @return {angular.IDirective} The Directive Definition Object.
 */
function messagePopoverComponent() {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoPopoverController as popoverCtrl',
    link: (scope, elem, attrs, ngeoPopoverCtrl) => {
      ngeoPopoverCtrl.anchorElm.on('inserted.bs.popover', () => {
        ngeoPopoverCtrl.bodyElm.show();
        ngeoPopoverCtrl.shown = true;
      });

      ngeoPopoverCtrl.anchorElm.popover({
        container: 'body',
        html: true,
        content: ngeoPopoverCtrl.bodyElm,
        boundary: 'viewport',
        placement: attrs['ngeoPopoverPlacement'] || 'right',
      });

      if (attrs['ngeoPopoverDismiss']) {
        $(attrs['ngeoPopoverDismiss']).on('scroll', () => {
          ngeoPopoverCtrl.dismissPopover();
        });
      }

      scope.$on('$destroy', () => {
        ngeoPopoverCtrl.anchorElm.popover('dispose');
        ngeoPopoverCtrl.anchorElm.unbind('inserted.bs.popover');
        ngeoPopoverCtrl.anchorElm.unbind('hidden.bs.popover');
      });
    },
  };
}

/**
 * @ngdoc directive
 * @ngInject
 * @ngname ngeoPopoverAnchor
 * @return {angular.IDirective} The Directive Definition Object
 */
function messagePopoverAnchorComponent() {
  return {
    restrict: 'A',
    require: '^^ngeoPopover',
    link: (scope, elem, attrs, ngeoPopoverCtrl) => {
      ngeoPopoverCtrl.anchorElm = elem;
    },
  };
}

/**
 * @ngdoc directive
 * @ngInject
 * @ngname ngeoPopoverContent
 * @return {angular.IDirective} The Directive Definition Object
 */
function messagePopoverContentComponent() {
  return {
    restrict: 'A',
    require: '^^ngeoPopover',
    link: (scope, elem, attrs, ngeoPopoverCtrl) => {
      ngeoPopoverCtrl.bodyElm = elem;
      elem.hide();
    },
  };
}

/**
 * The controller for the 'popover' directive.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoPopoverController
 * @param {angular.IScope} $scope Scope.
 * @private
 * @hidden
 */
function PopoverController($scope) {
  /**
   * The state of the popover (displayed or not)
   * @type {boolean}
   */
  this.shown = false;

  /**
   * @type {JQuery|undefined}
   */
  this.anchorElm = undefined;

  /**
   * @type {JQuery|undefined}
   */
  this.bodyElm = undefined;

  function onClick(clickEvent) {
    if (
      this.anchorElm[0] !== clickEvent.target &&
      this.bodyElm.parent()[0] !== clickEvent.target &&
      this.bodyElm.parent().find(clickEvent.target).length === 0 &&
      this.shown
    ) {
      this.dismissPopover();
    }
  }

  const clickHandler = onClick.bind(this);

  document.body.addEventListener('click', clickHandler);

  $scope.$on('$destroy', () => {
    document.body.removeEventListener('click', clickHandler);
  });
}

/**
 * Dismiss popover function
 */
PopoverController.prototype.dismissPopover = function () {
  this.shown = false;
  this.anchorElm.popover('hide');
};

module.controller('NgeoPopoverController', PopoverController);
module.directive('ngeoPopover', messagePopoverComponent);
module.directive('ngeoPopoverAnchor', messagePopoverAnchorComponent);
module.directive('ngeoPopoverContent', messagePopoverContentComponent);

export default module;
