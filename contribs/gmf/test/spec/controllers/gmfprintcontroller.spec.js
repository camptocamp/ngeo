/* global printCapabilities */
goog.require('gmf.PrintController');
goog.require('gmf.test.data.printcapabilities');

describe('GmfPrintController', function() {

  let $controller, $rootScope, $scope;
  let gmfPrintCtrl;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    gmfPrintCtrl = $controller('GmfPrintController',
      {
        $scope,
        gmfPrintUrl: ''
      }
    );
    gmfPrintCtrl.map = new ol.Map({
      view: new ol.View({
        center: [0, 0],
        zoom: 4
      })
    });
    gmfPrintCtrl.map.setSize([100, 100]);
    gmfPrintCtrl.parseCapabilities_({data: printCapabilities});
  }));

  it('Get Set rotation', function() {
    expect(gmfPrintCtrl.rotation).toBe(0);
    gmfPrintCtrl.getSetRotation(25);
    expect(gmfPrintCtrl.rotation).toBe(gmfPrintCtrl.getSetRotation());
    expect(gmfPrintCtrl.rotation).toBe(25);
  });

  it('Set layout and test depending fields changes', function() {
    const title = 'title';
    gmfPrintCtrl.fields.title = title;

    gmfPrintCtrl.setLayout(gmfPrintCtrl.fields.layouts[1]);

    expect(gmfPrintCtrl.fields.title).toBe(title);
    expect(gmfPrintCtrl.fields.layout).toBe(gmfPrintCtrl.fields.layouts[1]);
  });

  it('Set scale and test map resolution change', function() {
    const baseScale = gmfPrintCtrl.fields.scales[1];
    const biggerScale = gmfPrintCtrl.fields.scales[2] > baseScale ?
      gmfPrintCtrl.fields.scales[2] : gmfPrintCtrl.fields.scales[0];

    gmfPrintCtrl.setScale(baseScale);
    expect(gmfPrintCtrl.fields.scale).toBe(baseScale);

    const view = gmfPrintCtrl.map.getView();
    const resolution = view.getResolution();
    gmfPrintCtrl.setScale(biggerScale);
    expect(resolution).toBeLessThan(view.getResolution());
  });

  it('Set dpi', function() {
    const dpi = 10;
    gmfPrintCtrl.setDpi(10);
    expect(gmfPrintCtrl.fields.dpi).toBe(dpi);
  });

  it('Is state', function() {
    expect(gmfPrintCtrl.isState('CAPABILITIES_NOT_LOADED')).toBeTruthy();
  });
});
