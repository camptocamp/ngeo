goog.require('gmf.LayertreeController');
goog.require('gmf.test.data.themes');
goog.require('gmf.Themes');

var fakeParentController = null;
var fakeParentController = {
    'node': {},
    'layer': {}
};
fakeParentController['node'].children = []
fakeParentController['node'].mixed = true
fakeParentController['layer'].getLayers = function() { return new ol.Collection() };

describe('gmf.LayertreeController', function() {
  var layertreeController, $httpBackend, gmfThemes;

  beforeEach(function () {

    inject(function ($rootScope, $compile, $injector, $templateCache) {
      $templateCache.put('gmf/layertree.html', '<div></div>');

      gmfThemes = $injector.get('gmfThemes');
      var treeUrl = $injector.get('gmfTreeUrl');
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', treeUrl + '?cache_version=0').respond(themes);

      var element = angular.element(
        '<gmf-layertree gmf-layertree-source="treeSource" gmf-layertree-map="map">' +
        '</gmf-layertree>');
      var scope = $rootScope.$new();

      scope.map = new ol.Map({
        view: new ol.View({
          center: [0, 0],
          zoom: 0
        })
      });
      scope.treeSource = {};

      $compile(element)(scope);
      scope.$digest();

      var innerScope = element.isolateScope();
      layertreeController = innerScope.gmfLayertreeCtrl;
    });
  });

  describe('#getScale_', function() {
    it('returns the correct scale', function() {
      expect(layertreeController.getScale_()).toBeCloseTo(559081145.864);
    });
  });

  describe('#getLayer', function() {
    it('uses false as default visibility (with medadata)', function() {
      gmfThemes.loadThemes();
      $httpBackend.flush();

      var layerConfig = {
        "layers": "bus_stop",
        "name": "bus_stop",
        "url": null,
        "isSingleTile": false,
        "serverType": "mapserver",
        "queryable": 1,
        "childLayers": [],
        "wfsSupport": true,
        "urlWfs": null,
        "type": "WMS",
        "id": 101,
        "imageType": "image/jpeg",
        "ogcServer": "Main PNG", // fake property to test layer without group
        "metadata": {
        }
      };
      var layer = layertreeController.getLayer(layerConfig, fakeParentController, 2);
      expect(layer).not.toBe(null);
      expect(layer.getVisible()).toBe(false);
    });

    it('uses false as default visibility (w/o medadata)', function() {
      gmfThemes.loadThemes();
      $httpBackend.flush();
      // bus_stop layer with no `is_checked` attribute in metadata
      var layerConfig = {
        "layers": "bus_stop",
        "name": "bus_stop",
        "url": null,
        "isSingleTile": false,
        "serverType": "mapserver",
        "queryable": 1,
        "childLayers": [],
        "wfsSupport": true,
        "urlWfs": null,
        "type": "WMS",
        "id": 101,
        "imageType": "image/jpeg",
        "ogcServer": "Main PNG", // fake property to test layer without group
        "metadata": {
          "isChecked": false
        }
      };
      var layer = layertreeController.getLayer(layerConfig, fakeParentController, 2);
      expect(layer).not.toBe(null);
      expect(layer.getVisible()).toBe(false);
    });

    it('uses the visibility given in the metadata', function() {
      gmfThemes.loadThemes();
      $httpBackend.flush();
      var layerConfig = {
        "layers": "bus_stop",
        "name": "bus_stop",
        "url": null,
        "isSingleTile": false,
        "serverType": "mapserver",
        "queryable": 1,
        "childLayers": [],
        "wfsSupport": true,
        "urlWfs": null,
        "type": "WMS",
        "id": 101,
        "imageType": "image/jpeg",
        "ogcServer": "Main PNG", // fake property to test layer without group
        "metadata": {
          "isChecked": true
        }
      };
      var layer = layertreeController.getLayer(layerConfig, fakeParentController, 2);
      expect(layer).not.toBe(null);
      expect(layer.getVisible()).toBe(true);
    });
  });
});
