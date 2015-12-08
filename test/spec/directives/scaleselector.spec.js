goog.require('ol.Map');
goog.require('ngeo.scaleselectorDirective');

describe('ngeo.scaleselectorDirective', function() {

  var element;
  var map;
  var scales;

  beforeEach(function() {

    map = new ol.Map({
      view: new ol.View({
        center: [0, 0],
        zoom: 0
      })
    });

    element = angular.element(
        '<div ngeo-scaleselector="scales"' +
            'ngeo-scaleselector-map="map">' +
        '</div>');

    inject(function($rootScope, $compile, $sce) {
      scales = {
        '0': $sce.trustAsHtml('1&nbsp;:&nbsp;200\'000\'000'),
        '1': $sce.trustAsHtml('1&nbsp;:&nbsp;100\'000\'000'),
        '2': $sce.trustAsHtml('1&nbsp;:&nbsp;50\'000\'000'),
        '3': $sce.trustAsHtml('1&nbsp;:&nbsp;25\'000\'000'),
        '4': $sce.trustAsHtml('1&nbsp;:&nbsp;12\'000\'000')
      };

      $rootScope.map = map;
      $rootScope.scales = scales;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

  });

  it('creates an element with expected number of li elements', function() {
    var lis = element.find('li');
    expect(lis.length).toBe(5);
  });

  describe('calling setZoom in Angular context', function() {

    it('does not throw', function() {
      var scope = element.scope();

      function test() {
        scope.$apply(function() {
          map.getView().setZoom(4);
        });
      }

      expect(test).not.toThrow();
      expect(scope.scaleselectorCtrl.currentScale).toBe(scales[4]);
    });

  });

});
