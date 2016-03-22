goog.provide('ngeo.popoverDirective');
goog.provide('ngeo.popoverAnchorDirective');
goog.provide('ngeo.popoverContentDirective');
goog.provide('ngeo.PopoverController');

goog.require('ngeo');

/**
 * Provides a directive used to display a Bootstrap popover.
 *
 *<div ngeo-popover>
 *  <a ngeo-popover-anchor class="btn btn-info">anchor 1</a>
 *  <div ngeo-popover-content="">
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
ngeo.popoverDirective = function() {
  return {
    restrict: 'A',
    scope : true,
    controller: 'NgeoPopoverController',
    link : function(scope, elem, attrs, ngeoPopoverCtrl) {

      ngeoPopoverCtrl.anchorElm.on('hidden.bs.popover', function() {
        /**
         * @type {{inState : Object}}
         */
        var popover = ngeoPopoverCtrl.anchorElm.data('bs.popover');
        popover['inState'].click = false;
      });

      ngeoPopoverCtrl.anchorElm.on('inserted.bs.popover', function() {
        ngeoPopoverCtrl.shown = true;
        ngeoPopoverCtrl.bodyElm.parent().on('click', function(e) {
          e.stopPropagation();
        })
      });

      ngeoPopoverCtrl.anchorElm.popover({
        container: 'body',
        html: true,
        content: ngeoPopoverCtrl.bodyElm
      });

      scope.$on('$destroy', function() {
        ngeoPopoverCtrl.anchorElm.popover('destroy');
        ngeoPopoverCtrl.anchorElm.unbind('inserted.bs.popover');
        ngeoPopoverCtrl.anchorElm.unbind('hidden.bs.popover');
      })
    }
  }
};

/**
 * @ngdoc directive
 * @ngInject
 * @ngname ngeoPopoverAnchor
 * @return {angular.Directive} The Directive Definition Object
 */
ngeo.popoverAnchorDirective = function() {
  return {
    restrict: 'A',
    require: '^^ngeoPopover',
    link: function(scope, elem, attrs, ngeoPopoverCtrl) {
      ngeoPopoverCtrl.anchorElm = elem;
    }
  }
};

/**
 * @ngdoc directive
 * @ngInject
 * @ngname ngeoPopoverContent
 * @return {angular.Directive} The Directive Definition Object
 */
ngeo.popoverContentDirective = function() {
  return {
    restrict: 'A',
    transclude: true,
    require: '^^ngeoPopover',
    link: function(scope, elem, attrs, ngeoPopoverCtrl, transclude) {
      transclude(scope, function(transcludedElm, scope) {
        ngeoPopoverCtrl.bodyElm = transcludedElm;
      });
    }
  }
};

/**
 * The controller for the 'popover' directive.
 * @constructor
 * @ngInject
 * @export
 * @ngdoc controller
 * @ngname NgeoPopoverController
 * @param {angular.Scope} $scope Scope.
 */
ngeo.PopoverController = function($scope) {
  var self = this;
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

  function onClick(clickEvent) {

    if (self.anchorElm[0] !== clickEvent.target && self.shown) {
      self.shown = false;
      self.anchorElm.popover('hide');
    }

  }

  angular.element('body').on('click', onClick);

  $scope.$on('$destroy', function() {
    angular.element('body').off('click', onClick);
  })
};

ngeo.module.controller('NgeoPopoverController', ngeo.PopoverController);
ngeo.module.directive('ngeoPopover', ngeo.popoverDirective);
ngeo.module.directive('ngeoPopoverAnchor', ngeo.popoverAnchorDirective);
ngeo.module.directive('ngeoPopoverContent', ngeo.popoverContentDirective);
