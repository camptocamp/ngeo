// The MIT License (MIT)
//
// Copyright (c) 2014-2022 Camptocamp SA
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
import ngeoLayertreeController, {LayertreeController} from 'ngeo/layertree/Controller';

import 'bootstrap/js/src/collapse'; // needed to collapse a layertree

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfLayertreeNode', [ngeoLayertreeController.name]);

myModule.value(
  'gmfLayertreeNodeTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @returns {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['gmfLayertreeNodeTemplateurl'];
    return templateUrl !== undefined ? templateUrl : 'gmf/layertree/layertreeNode';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/layertree/layertreeNode', require('./layertreeNode.html'));
  }
);

/**
 * Provides the "gmfLayertreeNode" directive, a directive for
 * creating layer trees in application.
 *
 * The directive assumes that tree nodes that are not leaves have a "children"
 * property referencing an array of child nodes.
 *
 * Example:
 *
 *      <div gmf-layertree-node="ctrl.tree"
 *        gmf-layertree-node-map="ctrl.map"
 *        gmf-layertree-node-nodelayer="ctrl.getLayer(node)"
 *        gmf-layertree-node-listeners="ctrl.listeners(treeScope, treeCtrl)">
 *      </div>
 *
 * The "gmf-layertree-node", "gmf-layertree-node-map" and
 * "gmf-layertree-node-nodelayer" attributes are mandatory attributes.
 *
 * - "gmf-layertree-node" specifies an expression providing the tree. The
 *   root of the tree is a node of a gmfLayertree or of a gmfLayertreenode. The
 *   directive watches that expression, making it possible to retrieve
 *   the tree data through Ajax.
 *
 * - "gmf-layertree-node-map" specifies an expression providing the OpenLayers
 *   map. The directive doesn't watch that expression.
 *
 * - The "gmf-layertree-node-nodelayer" specifies an expression providing the
 *   layer for a given node. In most cases that expression will be function
 *   call with "node" as the argument to the function call. E.g.
 *   "gmf-layertree-node-nodelayer="ctrl.getLayer(node)".
 *
 * - The "gmf-layertree-node-listeners" specifies an expression providing a function
 *   to bind scope events to customs functions. You'll must set the listener on
 *   the "treeScope" and probably use "treeCtrl" as context. E.g.
 *   "gmf-layertree-node-listeners="ctrl.listeners(treeScope, treeCtrl)".
 *
 * The directive comes with a default template. That template assumes that
 * tree nodes that are not leaves have a "children" property referencing an
 * array of child nodes. It also assumes that nodes have a "name" property.
 *
 * By default the directive uses "layertree.html" as its templateUrl. This
 * can be changed by redefining the "gmfLayertreeNodeTemplateUrl" value (using
 * app.module.value('gmfLayertreeNodeTemplateUrl', 'path/layertree.html'), or
 * by adding an "gmf-layertree-node-templateurl" attribute to the element.
 *
 * Example:
 *
 *      <div gmf-layertree-node="ctrl.tree"
 *        gmf-layertree-node-templateurl="path/to/layertree.html"
 *        gmf-layertree-node-map="ctrl.map"
 *        gmf-layertree-node-nodelayer="ctrl.getLayer(node)"
 *        gmf-layertree-node-listeners="ctrl.listeners(treeScope, treeCtrl)"
 *      </div>
 *
 * The directive has its own scope, but it is not an isolate scope. That scope
 * has a "layertreeCtrl" property which is a reference to the directive's
 * controller: "layertreeCtrl". You can refer to that property in a custom
 * template for example.
 *
 * See our live example: [../examples/layertree.html](../examples/layertree.html)
 *
 * @htmlAttribute {Object} gmf-layertree-node One theme (JSON).
 * @htmlAttribute {string} gmf-layertree-node-templateurl The template URL.
 * @htmlAttribute {import('ol/Map').default} gmf-layertree-node-map The map.
 * @htmlAttribute {string} gmf-layertree-node-nodelayer Expression that will be parsed
 *      to be a {@link Function} that return a {@link import('ol/layer/Layer').default}
 *      with the argument:
 *      {
 *          'node': {@link Object}|undefined,
 *          'depth': {@link number}
 *      }
 * @htmlAttribute {string} gmf-layertree-node-nodelayerexpr Expression that will be parsed
 *      to be a {@link gmf-layertree-node-nodelayer}.
 * @htmlAttribute {string} gmf-layertree-node-listeners Expression that will be parsed
 *      to be a {@link Function} with the argument:
 *      {
 *          'treeScope': !{@link angular.IScope},
 *          'treeCtrl': {@link import('ngeo/layertree/Controller').LayertreeController}
 *      }
 * @htmlAttribute {string} gmf-layertree-node-listenersexpr Expression that will be parsed
 *      to be a {@link gmf-layertree-node-listeners}.
 * @param {string|function(JQuery=, angular.IAttributes=): string} gmfLayertreeNodeTemplateUrl
 *     Template URL for the directive.
 * @returns {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfLayertreeNode
 */
function gmfLayertreeNodeComponent(gmfLayertreeNodeTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: gmfLayertreeNodeTemplateUrl,
    controller: LayertreeController,
  };
}

myModule.directive('gmfLayertreeNode', gmfLayertreeNodeComponent);

export default myModule;
