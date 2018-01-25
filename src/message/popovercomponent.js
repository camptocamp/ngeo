goog.provide('ngeo.message.popoverComponent');

goog.require('ngeo');

/**
 * @type {angular.Module}
 */
ngeo.message.popoverComponent = angular.module('ngeoPopover', []);


/**
 * Provides a directive used to display a Bootstrap popover.
 *
 *<div ngeo-popover>
 *  <a ngeo-popover-anchor class="btn btn-info">anchor 1</a>
 *  <div ngeo-popover-content>
 *    <ul>
 *      <li>action 1:
 *        <input type="range"/>
 *      </li>
 *    </ul>
 *  </div>
 *</div>
 * @ngdoc directive
 * @ngInject
 * @ngname ngeoPopover
 * @return {angular.Directive} The Directive Definition Object.
 */
ngeo.message.popoverComponent.component_ = function() {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoPopoverController as popoverCtrl',
    link: (scope, elem, attrs, ngeoPopoverCtrl) => {
      ngeoPopoverCtrl.anchorElm.on('hidden.bs.popover', () => {
        /**
         * @type {{inState : Object}}
         */
        const popover = ngeoPopoverCtrl.anchorElm.data('bs.popover');
        popover['inState'].click = false;
      });

      ngeoPopoverCtrl.anchorElm.on('inserted.bs.popover', () => {
        ngeoPopoverCtrl.bodyElm.show();
        ngeoPopoverCtrl.shown = true;
      });

      ngeoPopoverCtrl.anchorElm.popover({
        container: 'body',
        html: true,
        content: ngeoPopoverCtrl.bodyElm,
        placement: attrs['ngeoPopoverPlacement'] || 'right'
      });

      if (attrs['ngeoPopoverDismiss']) {
        $(attrs['ngeoPopoverDismiss']).on('scroll', () => {
          ngeoPopoverCtrl.dismissPopover();
        });
      }

      scope.$on('$destroy', () => {
        ngeoPopoverCtrl.anchorElm.popover('destroy');
        ngeoPopoverCtrl.anchorElm.unbind('inserted.bs.popover');
        ngeoPopoverCtrl.anchorElm.unbind('hidden.bs.popover');
      });
    }
  };
};

/**
 * @ngdoc directive
 * @ngInject
 * @ngname ngeoPopoverAnchor
 * @return {angular.Directive} The Directive Definition Object
 */
ngeo.message.popoverComponent.anchorComponent = function() {
  return {
    restrict: 'A',
    require: '^^ngeoPopover',
    link: (scope, elem, attrs, ngeoPopoverCtrl) => {
      ngeoPopoverCtrl.anchorElm = elem;
    }
  };
};

/**
 * @ngdoc directive
 * @ngInject
 * @ngname ngeoPopoverContent
 * @return {angular.Directive} The Directive Definition Object
 */
ngeo.message.popoverComponent.contentComponent = function() {
  return {
    restrict: 'A',
    require: '^^ngeoPopover',
    link: (scope, elem, attrs, ngeoPopoverCtrl) => {
      ngeoPopoverCtrl.bodyElm = elem;
      elem.hide();
    }
  };
};

/**
 * The controller for the 'popover' directive.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoPopoverController
 * @param {angular.Scope} $scope Scope.
 */
ngeo.message.popoverComponent.PopoverController_ = function($scope) {
  /**
   * The state of the popover (displayed or not)
   * @type {boolean}
   * @export
   */
  this.shown = false;

  /**
   * @type {angular.JQLite|undefined}
   * @export
   */
  this.anchorElm = undefined;

  /**
   * @type {angular.JQLite|undefined}
   * @export
   */
  this.bodyElm = undefined;

  function onMouseDown(clickEvent) {
    if (this.anchorElm[0] !== clickEvent.target &&
      this.bodyElm.parent()[0] !== clickEvent.target &
      this.bodyElm.parent().find(clickEvent.target).length === 0 && this.shown) {
      this.dismissPopover();
    }
  }

  angular.element('body').on('mousedown', onMouseDown.bind(this));

  $scope.$on('$destroy', () => {
    angular.element('body').off('mousedown', onMouseDown);
  });
};


/**
 * Dissmiss popover function
 * @export
 */
ngeo.message.popoverComponent.PopoverController_.prototype.dismissPopover = function() {
  this.shown = false;
  this.anchorElm.popover('hide');
};


ngeo.message.popoverComponent.controller('NgeoPopoverController', ngeo.message.popoverComponent.PopoverController_);
ngeo.message.popoverComponent.directive('ngeoPopover', ngeo.message.popoverComponent.component_);
ngeo.message.popoverComponent.directive('ngeoPopoverAnchor', ngeo.message.popoverComponent.anchorComponent);
ngeo.message.popoverComponent.directive('ngeoPopoverContent', ngeo.message.popoverComponent.contentComponent);
