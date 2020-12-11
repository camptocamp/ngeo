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
import 'bootstrap/js/src/tooltip.js';
import 'bootstrap/js/src/popover.js';

/**
 * @type {angular.IModule}
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
      if (!ngeoPopoverCtrl) {
        throw new Error('Missing ngeoPopoverCtrl');
      }

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
      if (!ngeoPopoverCtrl) {
        throw new Error('Missing ngeoPopoverCtrl');
      }
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
      if (!ngeoPopoverCtrl) {
        throw new Error('Missing ngeoPopoverCtrl');
      }
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
   * @type {?JQuery}
   */
  this.anchorElm = null;

  /**
   * @type {?JQuery}
   */
  this.bodyElm = null;

  /**
   * @param {Event} clickEvent
   */
  const clickHandler = (clickEvent) => {
    if (!this.anchorElm) {
      throw new Error('Missing anchorElm');
    }
    if (!this.bodyElm) {
      throw new Error('Missing bodyElm');
    }
    if (
      this.anchorElm[0] !== clickEvent.target &&
      this.bodyElm.parent()[0] !== clickEvent.target &&
      this.bodyElm.parent().find(clickEvent.target).length === 0 &&
      this.shown
    ) {
      this.dismissPopover();
    }
  };

  document.body.addEventListener('click', clickHandler);

  $scope.$on('$destroy', () => {
    document.body.removeEventListener('click', clickHandler);
  });
}

/**
 * Dismiss popover function
 */
PopoverController.prototype.dismissPopover = function () {
  if (!this.anchorElm) {
    throw new Error('Missing anchorElm');
  }
  this.shown = false;
  this.anchorElm.popover('hide');
};

module.controller('NgeoPopoverController', PopoverController);
module.directive('ngeoPopover', messagePopoverComponent);
module.directive('ngeoPopoverAnchor', messagePopoverAnchorComponent);
module.directive('ngeoPopoverContent', messagePopoverContentComponent);

export default module;
