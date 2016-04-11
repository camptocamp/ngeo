goog.require('gmf.LayertreeController');
goog.require('gmf.Themes');
goog.require('gmf.ThemesEventType');
goog.require('gmf.test.data.themes');

describe('gmf.LayertreeController', function() {
  var layertreeController;

  beforeEach(function () {

    inject(function ($rootScope, $compile, $templateCache) {
      $templateCache.put('gmf/layertree.html', '<div></div>');

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
});
