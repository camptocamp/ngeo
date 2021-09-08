// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
import gmfControllersAbstractAppController, {
  AbstractAppController,
} from 'gmf/controllers/AbstractAppController';
import gmfMobileMeasureModule from 'gmf/mobile/measure/module';
import gmfMobileNavigationModule from 'gmf/mobile/navigation/module';
import gmfQueryWindowComponent from 'gmf/query/windowComponent';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';

import 'gmf/controllers/vars_mobile.scss';
import 'gmf/controllers/mobile.scss';

/**
 * Mobile application abstract controller.
 *
 * This file includes `import`'s mobile components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
export class AbstractMobileController extends AbstractAppController {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @ngInject
   */
  constructor($scope, $injector) {
    super($scope, $injector, true);

    /**
     * @type {boolean}
     */
    this.leftNavVisible = false;

    /**
     * @type {boolean}
     */
    this.rightNavVisible = false;

    /**
     * @type {boolean}
     */
    this.searchOverlayVisible = false;

    /**
     * The active state of the directive responsible of area measurements.
     * @type {boolean}
     */
    this.measureAreaActive = false;

    /**
     * The active state of the directive responsible of point measurements.
     * @type {boolean}
     */
    this.measurePointActive = false;

    /**
     * The active state of the directive responsible of length measurements.
     * @type {boolean}
     */
    this.measureLengthActive = false;

    /**
     * @type {?string}
     */
    this.displaywindowHeight = '100vh';

    /**
     * @type {?string}
     */
    this.displaywindowWidth = '100vw';

    /**
     * The ngeo ToolActivate manager service.
     * @type {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr}
     */
    const ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

    const measureAreaActivate = new ngeoMiscToolActivate(this, 'measureAreaActive');
    ngeoToolActivateMgr.registerTool('mapTools', measureAreaActivate, false);

    const measurePointActivate = new ngeoMiscToolActivate(this, 'measurePointActive');
    ngeoToolActivateMgr.registerTool('mapTools', measurePointActivate, false);

    const measureLengthActivate = new ngeoMiscToolActivate(this, 'measureLengthActive');
    ngeoToolActivateMgr.registerTool('mapTools', measureLengthActivate, false);

    /**
     * @type {import('ngeo/search/searchDirective').SearchDirectiveListeners<never>}
     */
    this.searchListeners = {
      open: () => {
        this.searchOverlayVisible = true;
      },
      close: () => {
        this.searchOverlayVisible = false;
      },
    };

    this.manageResize = true;
    this.resizeTransition = 500;

    // Close right nave on successful login.
    $scope.$watch(
      () => this.gmfUser.username,
      (newVal) => {
        if (newVal !== null && this.navIsVisible()) {
          this.rightNavVisible = false;
        }
      }
    );

    /**
     * @const {string}
     */
    this.redirectUrl = $injector.get('redirectUrl');
  }

  /**
   */
  toggleLeftNavVisibility() {
    this.leftNavVisible = !this.leftNavVisible;
  }

  /**
   */
  toggleRightNavVisibility() {
    this.rightNavVisible = !this.rightNavVisible;
  }

  /**
   * Hide both navigation menus.
   */
  hideNav() {
    this.leftNavVisible = false;
    this.rightNavVisible = false;
  }

  /**
   * @return {boolean} Return true if one of the navigation menus is visible,
   * otherwise false.
   */
  navIsVisible() {
    return this.leftNavVisible || this.rightNavVisible;
  }

  /**
   * Open the menu with corresponding to the data-target attribute value.
   * @param {string} target the data-target value.
   */
  openNavMenu(target) {
    const navElements = document.getElementsByClassName('gmf-mobile-nav-button');
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < navElements.length; i++) {
      const element = /** @type {HTMLElement} */ (navElements[i]);
      if (element.dataset && element.dataset.target === target) {
        element.click();
      }
    }
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('GmfAbstractMobileControllerModule', [
  gmfControllersAbstractAppController.name,
  gmfMobileMeasureModule.name,
  gmfMobileNavigationModule.name,
  gmfQueryWindowComponent.name,
]);

myModule.controller('AbstractMobileController', AbstractMobileController);

myModule.value('isMobile', true);

export default myModule;
