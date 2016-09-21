/* global themes capabilities*/
goog.require('gmf.SyncLayertreeMap');
goog.require('gmf.test.data.themes');

describe('gmf.SyncLayertreeMap', function() {
  var gmfSyncLayertreeMap;
  var gmfThemes;
  var treeUrl;
  var $httpBackend;
  var element;
  var map;
  var roottreeCtrl;
  var group;
  var getLayer;

  beforeEach(function() {
    map = new ol.Map({
      view: new ol.View({
        center: [0, 0],
        zoom: 0
      })
    });

    group = new ol.layer.Group();
    map.getLayers().push(group);

    element = angular.element(
      '<div ngeo-layertree="tree"' +
        'ngeo-layertree-map="map"' +
        'ngeo-layertree-nodelayer="getLayer(treeCtrl)"' +
      '</div>'
    );

    inject(function($injector, $rootScope, $compile) {
      gmfSyncLayertreeMap = $injector.get('gmfSyncLayertreeMap');
      gmfThemes = $injector.get('gmfThemes');

      // Prepare request simulation
      treeUrl = $injector.get('gmfTreeUrl') + '?cache_version=0';
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', treeUrl).respond(themes);
      $httpBackend.when('GET', 'https://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr').respond(capabilities);

      // Prepare themes
      $httpBackend.expectGET(treeUrl);
      gmfThemes.loadThemes();
      $httpBackend.flush();

      // Prepare layertree
      getLayer = function(treeCtrl) {
        var layer = gmfSyncLayertreeMap.createLayer(treeCtrl, map, group);
        return layer;
      };
    });
  });

  // ================== miscellaneous ================

  it('get All Possible WMS Layer Param', function() {
    inject(function($rootScope, $compile) {
      // Init, compile layertree
      $rootScope.tree = themes.themes[3]; // Theme 'OSM'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });
    roottreeCtrl = element.scope().layertreeCtrl;
    var treeGroup = roottreeCtrl.children[1]; // Group 'Layers'
    // Order count !
    var possibilities = ['cinema','post_office','osm_time',
      'entertainment','sustenance','hospitals','police'];

    expect(gmfSyncLayertreeMap.getAllPossibleWMSLayerParam(treeGroup)).toEqual(
        possibilities);
  });

  it('Get layer', function() {
    inject(function($rootScope, $compile) {
      // Init, compile layertree
      $rootScope.tree = themes.themes[3]; // Theme 'OSM'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });
    roottreeCtrl = element.scope().layertreeCtrl;

    var treeGroup = roottreeCtrl.children[1]; // Group 'Layers'
    var treeLayer = treeGroup.children[0]; // Leaf 'cinema'
    var layer = gmfSyncLayertreeMap.getLayer(treeLayer);

    expect(treeLayer.layer).toBe(null);
    expect(layer.constructor).toBe(ol.layer.Image);
  });

  // ================== Create ================

  it('Create WMS Layer in mixed group', function() {
    inject(function($rootScope, $compile) {
      // Init, compile layertree
      $rootScope.tree = themes.themes[3]; // Theme 'OSM'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });
    roottreeCtrl = element.scope().layertreeCtrl;
    var treeGroup = roottreeCtrl.children[0]; // Group 'OSM functions mixed'
    var treeLeaf = treeGroup.children[0]; // osm scale;
    var wmsParamLayers = treeLeaf.layer.getSource().getParams()['LAYERS'];

    expect(treeLeaf.node.name).toEqual(wmsParamLayers);
  });

  it('Create WMS Layer in a not mixed group', function() {
    inject(function($rootScope, $compile) {
      // Init, compile layertree
      $rootScope.tree = themes.themes[3]; // Theme 'OSM'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });
    roottreeCtrl = element.scope().layertreeCtrl;
    var treeGroup = roottreeCtrl.children[1]; // Group 'Layers'
    var wmsParamLayers = treeGroup.layer.getSource().getParams()['LAYERS'];
    var checkedLayers = ['cinema','post_office','entertainment','sustenance',
      'hospitals','police']; // order count !

    expect(wmsParamLayers).toEqual(checkedLayers.reverse().join(','));
  });

  // FIXME source is null... must wait.
  //it('Create WMTS Layer (in a mixed group)', function() {
  //  inject(function($rootScope, $compile) {
  //    // Init, compile layertree
  //    $rootScope.tree = themes.themes[2]; // Theme 'Cadastre'
  //    $rootScope.map = map;
  //    $rootScope.getLayer = getLayer;
  //    $compile(element)($rootScope);
  //    $rootScope.$digest();
  //  });
  //  roottreeCtrl = element.scope().layertreeCtrl;
  //  var treeGroup = roottreeCtrl.children[0]; // Group 'Cadastre'
  //  var treeLeaf = treeGroup.children[4]; // Leaf 'ch.alpenkonvention'

  //  expect(treeLeaf.node.name).toBe(treeLeaf.layer.getSource().getLayer());
  //});

  // ================== Sync ================

  it('Sync WMS Layer in mixed group', function() {
    inject(function($rootScope, $compile) {
      // Init, compile layertree
      $rootScope.tree = themes.themes[3]; // Theme 'OSM'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });
    roottreeCtrl = element.scope().layertreeCtrl;
    var treeGroup = roottreeCtrl.children[0]; // Group 'OSM functions mixed'
    var treeLeaf = treeGroup.children[0]; // osm scale;
    var wmsParamLayers;

    roottreeCtrl.setState('off');
    gmfSyncLayertreeMap.sync(map, treeGroup);
    expect(treeLeaf.layer.getVisible()).toBe(false);

    gmfSyncLayertreeMap.sync(map, treeGroup);
    treeLeaf.setState('on');
    gmfSyncLayertreeMap.sync(map, treeLeaf);
    wmsParamLayers = treeLeaf.layer.getSource().getParams()['LAYERS'];
    expect(wmsParamLayers).toBe('osm_scale');
  });

  it('Sync WMS Layer in a not mixed group', function() {
    inject(function($rootScope, $compile) {
      // Init, compile layertree
      $rootScope.tree = themes.themes[3]; // Theme 'OSM'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });
    roottreeCtrl = element.scope().layertreeCtrl;
    var treeGroup = roottreeCtrl.children[1]; // Group 'Layers'
    var treeLeaf = treeGroup.children[0]; // Leaf 'cinema'
    var wmsParamLayers;

    roottreeCtrl.setState('off');
    gmfSyncLayertreeMap.sync(map, treeGroup);
    expect(treeGroup.layer.getVisible()).toBe(false);

    treeLeaf.setState('on');
    gmfSyncLayertreeMap.sync(map, treeLeaf);
    wmsParamLayers = treeGroup.layer.getSource().getParams()['LAYERS'];
    expect(wmsParamLayers).toBe('cinema');

    // Group is on, original order must be kept.
    treeGroup.setState('on');
    gmfSyncLayertreeMap.sync(map, treeGroup);
    wmsParamLayers = treeGroup.layer.getSource().getParams()['LAYERS'];
    var allWMSLayerParam = gmfSyncLayertreeMap.getAllPossibleWMSLayerParam(
        treeGroup);
    expect(wmsParamLayers).toEqual(allWMSLayerParam.reverse().join(','));
  });


  // FIXME source is null... must wait.
  //it('Create WMTS Layer (in a mixed group)', function() {
  //  inject(function($rootScope, $compile) {
  //    // Init, compile layertree
  //    $rootScope.tree = themes.themes[2]; // Theme 'Cadastre'
  //    $rootScope.map = map;
  //    $rootScope.getLayer = getLayer;
  //    $compile(element)($rootScope);
  //    $rootScope.$digest();
  //  });
  //  roottreeCtrl = element.scope().layertreeCtrl;
  //  var treeGroup = roottreeCtrl.children[0]; // Group 'Cadastre'
  //  var treeLeaf = treeGroup.children[4]; // Leaf 'ch.alpenkonvention'

  //  roottreeCtrl.setState('off');
  //  gmfSyncLayertreeMap.sync(map, treeGroup);
  //  expect(treeGroup.layer.getVisible()).toBe(false);

  //  treeLeaf.setState('on');
  //  gmfSyncLayertreeMap.sync(map, treeLeaf);
  //  expect(treeGroup.layer.getVisible()).toBe(true);
  //});
});
