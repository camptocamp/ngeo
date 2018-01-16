goog.require('gmf.contextualdata.component');
goog.require('gmf.map.component');
goog.require('gmf.raster.RasterService');
goog.require('ol.Map');
goog.require('ol.View');

describe('gmf.contextualdata.component', () => {

  let $compile;
  let $document;
  let contextualdataController;
  let map;
  let $httpBackend;
  let callbackSpy;

  beforeEach(inject(($injector, _$httpBackend_, _$rootScope_, _$compile_, _$document_) => {
    const $rootScope = _$rootScope_;
    $compile = _$compile_;
    $document = _$document_;
    $httpBackend = _$httpBackend_;

    const element = angular.element(
      '<gmf-map gmf-map-map="map" gmf-contextualdata="" gmf-contextualdata-map="::map" gmf-contextualdata-projections="[4326,3857]" gmf-contextualdata-callback="callback"></gmf-map>');
    element.css({
      position: 'absolute',
      top: 10,
      left: 20,
      width: 800,
      height: 400
    });
    angular.element($document[0].body).append(element);
    const scope = $rootScope.$new();

    map = new ol.Map({
      view: new ol.View({
        center: [0, 0],
        zoom: 0,
        projection: 'EPSG:4326'
      })
    });
    scope.map = map;
    callbackSpy = jasmine.createSpy();
    scope.callback = function(coordinate, data) {
      callbackSpy();
      return {
        'extra_value': data.elevation * 2
      };
    };
    $compile(element)(scope);
    scope.$digest();

    contextualdataController = scope.cdCtrl;

    // mock getCoordinateFromPixel & getPixelFromCoordinate
    // since map has no frameState yet
    map.getCoordinateFromPixel = function(pixel) {
      return [1, 2];
    };
    map.getPixelFromCoordinate = function(coordinate) {
      return [50, 100];
    };

    // mock the template
    let html = '';
    html += '{{coord_4326_eastern}},{{coord_4326_northern}},';
    html += '{{coord_3857_eastern}},{{elevation}},';
    html += '{{extra_value}}';
    $httpBackend.whenGET('contextualdata.html').respond(html);

    $httpBackend.whenGET('https://fake/gmf/raster?lat=2&lon=1').respond({
      'elevation': 1234
    });
  }));

  afterEach(() => {
    map.setTarget(null);
  });

  describe('#init', () => {
    it('creates a popover container', () => {
      const popover = $document.find('div.popover');
      expect(popover.length).toBe(1);
    });
  });

  describe('#popover', () => {
    it('popover content is correct', () => {
      const event = {
        clientX: 100,
        clientY: 200,
        preventDefault: () => {}
      };
      contextualdataController.handleMapContextMenu_(event);
      // make sure the template for contextualdatacontent directive is loaded
      $httpBackend.flush();
      const content = $document.find('div.popover-content')[0].innerHTML;
      expect(content).toBe('1,2,111319.49079327358,1234,2468');
      expect(callbackSpy.calls.count()).toBe(1);
    });
  });
});
