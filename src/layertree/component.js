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
import ngeoLayertreeController, {LayertreeController} from 'ngeo/layertree/Controller.js';

import 'bootstrap/js/src/collapse.js'; // needed to collapse a layertree

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoLayertree', [ngeoLayertreeController.name]);

myModule.value(
  'ngeoLayertreeTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['ngeoLayertreeTemplateurl'];
    return templateUrl !== undefined ? templateUrl : 'ngeo/layertree';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/layertree', require('./component.html'));
  }
);

/**
 * Provides the "ngeoLayertree" directive, a directive for
 * creating layer trees in application.
 *
 * The directive assumes that tree nodes that are not leaves have a "children"
 * property referencing an array of child nodes.
 *
 * Example:
 *
 *      <div ngeo-layertree="ctrl.tree"
 *        ngeo-layertree-map="ctrl.map"
 *        ngeo-layertree-nodelayer="ctrl.getLayer(node)"
 *        ngeo-layertree-listeners="ctrl.listeners(treeScope, treeCtrl)">
 *      </div>
 *
 * The "ngeo-layertree", "ngeo-layertree-map" and
 * "ngeo-layertree-nodelayer" attributes are mandatory attributes.
 *
 * - "ngeo-layertree" specifies an expression providing the tree. The
 *   directive watches that expression, making it possible to retrieve
 *   the tree data through Ajax.
 *
 * - "ngeo-layertree-map" specifies an expression providing the OpenLayers
 *   map. The directive doesn't watch that expression.
 *
 * - The "ngeo-layertree-nodelayer" specifies an expression providing the
 *   layer for a given node. In most cases that expression will be function
 *   call with "node" as the argument to the function call. E.g.
 *   "ngeo-layertree-nodelayer="ctrl.getLayer(node)".
 *
 * - The "ngeo-layertree-listeners" specifies an expression providing a function
 *   to bind scope events to customs functions. You'll must set the listener on
 *   the "treeScope" and probably use "treeCtrl" as context. E.g.
 *   "ngeo-layertree-listeners="ctrl.listeners(treeScope, treeCtrl)".
 *
 * The directive comes with a default template. That template assumes that
 * tree nodes that are not leaves have a "children" property referencing an
 * array of child nodes. It also assumes that nodes have a "name" property.
 *
 * By default the directive uses "layertree.html" as its templateUrl. This
 * can be changed by redefining the "ngeoLayertreeTemplateUrl" value (using
 * app.module.value('ngeoLayertreeTemplateUrl', 'path/layertree.html'), or
 * by adding an "ngeo-layertree-templateurl" attribute to the element.
 *
 * Example:
 *
 *      <div ngeo-layertree="ctrl.tree"
 *        ngeo-layertree-templateurl="path/to/layertree.html"
 *        ngeo-layertree-map="ctrl.map"
 *        ngeo-layertree-nodelayer="ctrl.getLayer(node)"
 *        ngeo-layertree-listeners="ctrl.listeners(treeScope, treeCtrl)"
 *      </div>
 *
 * The directive has its own scope, but it is not an isolate scope. That scope
 * has a "layertreeCtrl" property which is a reference to the directive's
 * controller: "layertreeCtrl". You can refer to that property in a custom
 * template for example.
 *
 * See our live example: [../examples/layertree.html](../examples/layertree.html)
 *
 * @htmlAttribute {Object} ngeo-layertree One theme (JSON).
 * @htmlAttribute {string} ngeo-layertree-templateurl The template URL.
 * @param ngeoLayertreeTemplateUrl
 * @htmlAttribute {import("ol/Map.js").default} ngeo-layertree-map The map.
 * @htmlAttribute {string} ngeo-layertree-nodelayer Expression that will be parsed
 *      to be a {@link Function} that return a {@link import("ol/layer/Layer.js").default}
 *      with the argument:
 *      {
 *          'node': {@link Object}|undefined,
 *          'depth': {@link number}
 *      }
 * @htmlAttribute {string} ngeo-layertree-nodelayerexpr Expression that will be parsed
 *      to be a {@link ngeo-layertree-nodelayer}.
 * @htmlAttribute {string} ngeo-layertree-listeners Expression that will be parsed
 *      to be a {@link Function} with the argument:
 *      {
 *          'treeScope': !{@link angular.IScope},
 *          'treeCtrl': {@link import("ngeo/layertree/Controller.js").LayertreeController}
 *      }
 * @htmlAttribute {string} ngeo-layertree-listenersexpr Expression that will be parsed
 *      to be a {@link ngeo-layertree-listeners}.
 * @param {string|function(JQuery=, angular.IAttributes=): string}
 *     ngeoLayertreeTemplateUrl Template URL for the directive.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoLayertree
 */
function gmfLayertreeComponent(ngeoLayertreeTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: ngeoLayertreeTemplateUrl,
    controller: LayertreeController,
  };
}

myModule.directive('ngeoLayertree', gmfLayertreeComponent);

export default myModule;
