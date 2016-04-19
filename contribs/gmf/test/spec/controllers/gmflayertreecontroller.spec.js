/*global describe beforeEach inject expect it themes spyOn*/
/*eslint no-undef: "error"*/

goog.require('gmf.LayertreeController');
goog.require('gmf.test.data.themes');
goog.require('ol.Map');
goog.require('ol.layer.Group');
goog.require('ol.layer.Layer');
goog.require('ol.layer.Image');

describe('GmfLayertree', function() {

  var $controller, $rootScope, $scope;
  var controllerBindings, gmfLayertreeCtrl, osmThemeNode, mixedNode, nonMixedNode;
  var map = new ol.Map({layers : []});

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    controllerBindings = {
      openLinksInNewWindowFn : function() {
        return false
      },
      map : map
    };
    gmfLayertreeCtrl = $controller('GmfLayertreeController',
      {
        $scope: $scope,
        gmfWmsUrl : ''
      },
      controllerBindings
    );

    osmThemeNode = themes['themes'].filter(function(theme) {
      return theme.name === 'OSM';
    })[0];
    mixedNode = osmThemeNode.children.filter(function(node) {
      return node.name === 'OSM function';
    })[0];
    nonMixedNode = osmThemeNode.children.filter(function(node) {
      return node.name === 'Layers';
    })[0];

    spyOn(gmfLayertreeCtrl, 'prepareLayer_');

  }));

  it('getLayer should return ol.layer.Group in case of a MIXED node', function() {
    var parentTreeCtrl = {
      node : osmThemeNode,
      depth : 1,
      layer : null
    };

    var layer = gmfLayertreeCtrl.getLayer(mixedNode, parentTreeCtrl, 1);

    expect(layer).toBeDefined();
    expect(layer instanceof ol.layer.Group).toBeTruthy();
  });

  it('getLayer should add layer to the parent node in case of parent node is MIXED', function() {
    var parentTreeCtrl = {
      node : mixedNode,
      depth : 1,
      layer : gmfLayertreeCtrl.getLayer(mixedNode, osmThemeNode, 1)
    };
    var childNode = mixedNode.children[0];
    var layer = gmfLayertreeCtrl.getLayer(childNode, parentTreeCtrl, 2);

    expect(layer).toBeDefined();
    expect(layer instanceof ol.layer.Layer).toBeTruthy();
    expect(gmfLayertreeCtrl.prepareLayer_).toHaveBeenCalledWith(childNode, layer);
    expect(parentTreeCtrl.layer.getLayers().getLength()).toBe(1);
    expect(parentTreeCtrl.layer.getLayers().item(0)).toBe(layer);
  });

  it('getLayer should create a ol.layer.Image in case of a NON-MIXED group', function() {
    var parentTreeCtrl = {
      node : osmThemeNode,
      depth : 1,
      layer : null
    };

    var layer = gmfLayertreeCtrl.getLayer(nonMixedNode, parentTreeCtrl, 1);

    expect(layer).toBeDefined();
    expect(layer instanceof ol.layer.Image).toBeTruthy();
    expect(gmfLayertreeCtrl.prepareLayer_).toHaveBeenCalledWith(nonMixedNode, layer);
  })

});
