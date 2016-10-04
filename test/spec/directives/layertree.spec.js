goog.require('ol.Map');
goog.require('ngeo.LayertreeController');

describe('ngeo.layertreeDirective', function() {

  var element;
  var map;
  var roottreeCtrl;

  beforeEach(function() {

    map = new ol.Map({
      view: new ol.View({
        center: [0, 0],
        zoom: 0
      })
    });

    element = angular.element(
      '<div ngeo-layertree="tree"' +
        'ngeo-layertree-map="map"' +
        'ngeo-layertree-nodelayer="getLayer(node)"' +
      '</div>'
    );

    var tree = {
      'name': 'Root',
      'children': [{
        'name': 'Node 0',
        'children': [{
          'name': 'Leaf 00'
        }, {
          'name': 'Leaf 01'
        }]
      }, {
        'name': 'Leaf 1'
      }]
    };

    var getLayer = function(node) {
      return new ol.layer.Image();
    };

    inject(function($rootScope, $compile, $sce) {
      $rootScope.tree = tree;
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

    roottreeCtrl = element.scope().layertreeCtrl;

  });

  it('Get state', function() {
    var treeNode0 = roottreeCtrl.children[0];
    var treeLeaf00 = treeNode0.children[0];
    var treeLeaf01 = treeNode0.children[1];
    var treeLeaf1 = roottreeCtrl.children[1];
    expect(roottreeCtrl.getState()).toBe('off');
    expect(treeNode0.getState()).toBe('off');
    expect(treeLeaf00.getState()).toBe('off');
    expect(treeLeaf01.getState()).toBe('off');
    expect(treeLeaf1.getState()).toBe('off');
  });

  it('Set state', function() {
    var treeNode0 = roottreeCtrl.children[0];
    var treeLeaf00 = treeNode0.children[0];
    var treeLeaf01 = treeNode0.children[1];
    var treeLeaf1 = roottreeCtrl.children[1];

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

  it('Refresh state', function() {
    var treeNode0 = roottreeCtrl.children[0];
    var treeLeaf01 = treeNode0.children[1];
    treeLeaf01.state_ = 'on';
    treeNode0.refreshState();
    expect(treeNode0.getState()).toBe('indeterminate');
    expect(roottreeCtrl.getState()).toBe('indeterminate');
  });

  it('Get calculate state', function() {
    var treeNode0 = roottreeCtrl.children[0];
    var treeLeaf01 = treeNode0.children[1];
    treeLeaf01.state_ = 'on';
    expect(roottreeCtrl.getCalculateState()).toBe('indeterminate');
    expect(treeNode0.getCalculateState()).toBe('indeterminate');
    expect(treeLeaf01.getCalculateState()).toBe('on');
  });

  it('Get first parent tree', function() {
    var treeNode0 = roottreeCtrl.children[0];
    var treeLeaf01 = treeNode0.children[1];
    var treeLeaf1 = roottreeCtrl.children[1];
    expect(ngeo.LayertreeController.getFirstParentTree(treeLeaf01).node.name).toBe(treeNode0.node.name);
    expect(ngeo.LayertreeController.getFirstParentTree(treeLeaf1).node.name).toBe(treeLeaf1.node.name);
  });

  it('Traverse tree', function() {
    // All nodes of the graph
    var visited = '';
    roottreeCtrl.traverseDepthFirst(function(treeCtrl) {
      visited += ', ' + treeCtrl.node.name;
    });
    expect(visited).toBe(', Root, Node 0, Leaf 00, Leaf 01, Leaf 1');

    // Stop at first node
    visited = '';
    roottreeCtrl.traverseDepthFirst(function(treeCtrl) {
      visited = visited + ', ' + treeCtrl.node.name;
      return ngeo.LayertreeController.VisitorDecision.STOP;
    });
    expect(visited).toBe(', Root');

    // Stop at leaf01 node
    visited = '';
    roottreeCtrl.traverseDepthFirst(function(treeCtrl) {
      visited = visited + ', ' + treeCtrl.node.name;
      if (treeCtrl.node.name === 'Leaf 01') {
        return ngeo.LayertreeController.VisitorDecision.STOP;
      }
    });
    expect(visited).toBe(', Root, Node 0, Leaf 00, Leaf 01');

    // Skip Node0 children
    visited = '';
    roottreeCtrl.traverseDepthFirst(function(treeCtrl) {
      visited = visited + ', ' + treeCtrl.node.name;
      if (treeCtrl.node.name === 'Node 0') {
        return ngeo.LayertreeController.VisitorDecision.SKIP;
      }
    });
    expect(visited).toBe(', Root, Node 0, Leaf 1');
  });
});
