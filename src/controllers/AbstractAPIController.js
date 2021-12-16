// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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
import ngeoMapResizemap from 'ngeo/map/resizemap';

/**
 * API application abstract controller.
 *
 * This file includes `import`'s for desktop/api components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
export class AbstractAPIController extends AbstractAppController {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @ngInject
   */
  constructor($scope, $injector) {
    super($scope, $injector, false);
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('GmfAbstractAPIControllerModule', [
  gmfControllersAbstractAppController.name,
  ngeoMapResizemap.name,
]);

myModule.controller('AbstractAPIController', AbstractAPIController);

export default myModule;
