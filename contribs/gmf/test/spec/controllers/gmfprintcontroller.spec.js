/* global printCapabilities */
goog.require('gmf.printComponent');
goog.require('gmf.test.data.printcapabilities');
goog.require('ol.Map');
goog.require('ol.View');

describe('GmfPrintController', () => {

  let $controller, $rootScope, $scope;
  let gmfPrintCtrl;

  beforeEach(inject((_$controller_, _$rootScope_) => {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    gmfPrintCtrl = $controller('GmfPrintController', {
      $scope: $scope,
      gmfPrintUrl: ''
    });
    gmfPrintCtrl.map = new ol.Map({
      view: new ol.View({
        center: [0, 0],
        zoom: 4
      })
    });
    gmfPrintCtrl.map.setSize([100, 100]);
    gmfPrintCtrl.parseCapabilities_({data: printCapabilities});
  }));

  it('Get Set rotation', () => {
    expect(gmfPrintCtrl.rotation).toBe(0);
    gmfPrintCtrl.getSetRotation(25);
    expect(gmfPrintCtrl.rotation).toBe(gmfPrintCtrl.getSetRotation());
    expect(gmfPrintCtrl.rotation).toBe(25);
  });

  it('Set layout and test depending layout informations changes', () => {
    const title = 'title';
    gmfPrintCtrl.layoutInfo.title = title;

    gmfPrintCtrl.setLayout(gmfPrintCtrl.layoutInfo.layouts[1]);

    expect(gmfPrintCtrl.layoutInfo.title).toBe(title);
    expect(gmfPrintCtrl.layoutInfo.layout).toBe(gmfPrintCtrl.layoutInfo.layouts[1]);
  });

  it('Set scale and test map resolution change', () => {
    const baseScale = gmfPrintCtrl.layoutInfo.scales[1];
    const biggerScale = gmfPrintCtrl.layoutInfo.scales[2] > baseScale ?
      gmfPrintCtrl.layoutInfo.scales[2] : gmfPrintCtrl.layoutInfo.scales[0];

    gmfPrintCtrl.getSetScale(baseScale);
    expect(gmfPrintCtrl.layoutInfo.scale).toBe(baseScale);

    const view = gmfPrintCtrl.map.getView();
    const resolution = view.getResolution();
    gmfPrintCtrl.getSetScale(biggerScale);
    expect(resolution).toBeLessThan(view.getResolution());
  });

  it('Set dpi', () => {
    const dpi = 10;
    gmfPrintCtrl.setDpi(10);
    expect(gmfPrintCtrl.layoutInfo.dpi).toBe(dpi);
  });

  it('Is state', () => {
    expect(gmfPrintCtrl.isState('CAPABILITIES_NOT_LOADED')).toBeTruthy();
  });
});
