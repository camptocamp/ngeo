// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
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
import olMap from 'ol/Map';
import olControlControl from 'ol/control/Control';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoControl', []);

/**
 * Provides a directive that can be used to add a control to the map
 * using a DOM element.
 *
 * Example:
 *
 *     <div ngeo-control="ctrl.control" ngeo-control-map="ctrl.map"></div>
 *
 * The expression passed to "ngeo-control" should evaluate to a control
 * instance, and the expression passed to "ngeo-control-map" should
 * evaluate to a map instance.
 *
 * See our live example: [../examples/control.html](../examples/control.html)
 *
 * @htmlAttribute {import('ol/Map').default} ngeo-control-map The map.
 * @returns {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoControl
 */
function controlComponent() {
  return {
    restrict: 'A',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {
      const control =
        /** @type {import('ol/control/Control').default} */
        (scope.$eval(attrs['ngeoControl']));
      console.assert(control instanceof olControlControl);

      const map = /** @type {import('ol/Map').default} */ (scope.$eval(attrs['ngeoControlMap']));
      console.assert(map instanceof olMap);

      control.setTarget(element[0]);
      map.addControl(control);
    },
  };
}

myModule.directive('ngeoControl', controlComponent);

export default myModule;
