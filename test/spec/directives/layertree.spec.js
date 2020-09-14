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
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerImage from 'ol/layer/Image.js';
import {getFirstParentTree, LayertreeVisitorDecision} from 'ngeo/layertree/Controller.js';

describe('ngeo.layertree.component', () => {
  /** @type {import("ngeo/layertree/Controller.js").LayertreeController} */
  let roottreeCtrl;

  beforeEach(() => {
    const map = new olMap({
      view: new olView({
        center: [0, 0],
        zoom: 0,
      }),
    });

    const element = angular.element(
      '<div ngeo-layertree="tree"' +
        'ngeo-layertree-map="map"' +
        'ngeo-layertree-nodelayer="getLayer(node)"' +
        '</div>'
    );

    const tree = {
      'name': 'Root',
      'children': [
        {
          'name': 'Node 0',
          'children': [
            {
              'name': 'Leaf 00',
            },
            {
              'name': 'Leaf 01',
            },
          ],
        },
        {
          'name': 'Leaf 1',
        },
      ],
    };

    /**
     * @param {*} node
     */
    const getLayer = function (node) {
      return new olLayerImage();
    };

    angular.mock.inject(($rootScope, $compile, $sce) => {
      $rootScope.tree = tree;
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

    // @ts-ignore: scope ...
    roottreeCtrl = element.scope().layertreeCtrl;
  });

  it('Get state', () => {
    const treeNode0 = roottreeCtrl.children[0];
    const treeLeaf00 = treeNode0.children[0];
    const treeLeaf01 = treeNode0.children[1];
    const treeLeaf1 = roottreeCtrl.children[1];
    expect(roottreeCtrl.getState()).toBe('off');
    expect(treeNode0.getState()).toBe('off');
    expect(treeLeaf00.getState()).toBe('off');
    expect(treeLeaf01.getState()).toBe('off');
    expect(treeLeaf1.getState()).toBe('off');
  });

  it('Set state', () => {
    const treeNode0 = roottreeCtrl.children[0];
    const treeLeaf00 = treeNode0.children[0];
    const treeLeaf01 = treeNode0.children[1];
    const treeLeaf1 = roottreeCtrl.children[1];

    treeLeaf01.setState('on');
    expect(roottreeCtrl.getState()).toBe('indeterminate');
    expect(treeNode0.getState()).toBe('indeterminate');
    expect(treeLeaf00.getState()).toBe('off');
    expect(treeLeaf01.getState()).toBe('on');
    expect(treeLeaf1.getState()).toBe('off');

    treeLeaf00.setState('on');
    expect(roottreeCtrl.getState()).toBe('indeterminate');
    expect(treeNode0.getState()).toBe('on');
    expect(treeLeaf00.getState()).toBe('on');
    expect(treeLeaf01.getState()).toBe('on');
    expect(treeLeaf1.getState()).toBe('off');

    treeLeaf1.setState('on');
    expect(roottreeCtrl.getState()).toBe('on');
    expect(treeNode0.getState()).toBe('on');
    expect(treeLeaf00.getState()).toBe('on');
    expect(treeLeaf01.getState()).toBe('on');
    expect(treeLeaf1.getState()).toBe('on');

    roottreeCtrl.setState('This is not a state'); // = 'off'
    expect(roottreeCtrl.getState()).toBe('off');
    expect(treeNode0.getState()).toBe('off');
    expect(treeLeaf00.getState()).toBe('off');
    expect(treeLeaf01.getState()).toBe('off');
    expect(treeLeaf1.getState()).toBe('off');

    treeNode0.setState('on');
    expect(roottreeCtrl.getState()).toBe('indeterminate');
    expect(treeNode0.getState()).toBe('on');
    expect(treeLeaf00.getState()).toBe('on');
    expect(treeLeaf01.getState()).toBe('on');
    expect(treeLeaf1.getState()).toBe('off');
  });

  it('Refresh state', () => {
    const treeNode0 = roottreeCtrl.children[0];
    const treeLeaf01 = treeNode0.children[1];
    treeLeaf01.state_ = 'on';
    treeNode0.refreshState();
    expect(treeNode0.getState()).toBe('indeterminate');
    expect(roottreeCtrl.getState()).toBe('indeterminate');
  });

  it('Get calculate state', () => {
    const treeNode0 = roottreeCtrl.children[0];
    const treeLeaf01 = treeNode0.children[1];
    treeLeaf01.state_ = 'on';
    expect(roottreeCtrl.getCalculateState()).toBe('indeterminate');
    expect(treeNode0.getCalculateState()).toBe('indeterminate');
    expect(treeLeaf01.getCalculateState()).toBe('on');
  });

  it('Get first parent tree', () => {
    const treeNode0 = roottreeCtrl.children[0];
    const treeLeaf01 = treeNode0.children[1];
    const treeLeaf1 = roottreeCtrl.children[1];
    expect(getFirstParentTree(treeLeaf01).node.name).toBe(treeNode0.node.name);
    expect(getFirstParentTree(treeLeaf1).node.name).toBe(treeLeaf1.node.name);
  });

  it('Traverse tree', () => {
    // All nodes of the graph
    let visited = '';
    roottreeCtrl.traverseDepthFirst((treeCtrl) => {
      visited += `, ${treeCtrl.node.name}`;
    });
    expect(visited).toBe(', Root, Node 0, Leaf 00, Leaf 01, Leaf 1');

    // Stop at first node
    visited = '';
    roottreeCtrl.traverseDepthFirst((treeCtrl) => {
      visited = `${visited}, ${treeCtrl.node.name}`;
      return LayertreeVisitorDecision.STOP;
    });
    expect(visited).toBe(', Root');

    // Stop at leaf01 node
    visited = '';
    roottreeCtrl.traverseDepthFirst((treeCtrl) => {
      visited = `${visited}, ${treeCtrl.node.name}`;
      if (treeCtrl.node.name === 'Leaf 01') {
        return LayertreeVisitorDecision.STOP;
      }
    });
    expect(visited).toBe(', Root, Node 0, Leaf 00, Leaf 01');

    // Skip Node0 children
    visited = '';
    roottreeCtrl.traverseDepthFirst((treeCtrl) => {
      visited = `${visited}, ${treeCtrl.node.name}`;
      if (treeCtrl.node.name === 'Node 0') {
        return LayertreeVisitorDecision.SKIP;
      }
    });
    expect(visited).toBe(', Root, Node 0, Leaf 1');
  });
});
