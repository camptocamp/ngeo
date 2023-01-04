import angular from 'angular';
import gmfTestDataPrintcapabilities from '../data/printcapabilities.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';

describe('GmfPrintController', () => {
  let $controller, $rootScope, $scope;
  let gmfPrintCtrl;

  beforeEach(
    angular.mock.inject((_$controller_, _$rootScope_) => {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      const $element = angular.element('<div></div>');
      gmfPrintCtrl = $controller('GmfPrintController', {
        $element: $element,
        $scope: $scope,
        gmfPrintUrl: '',
      });
      gmfPrintCtrl.map = new olMap({
        view: new olView({
          center: [0, 0],
          zoom: 4,
        }),
      });
      gmfPrintCtrl.map.setSize([100, 100]);
      gmfPrintCtrl.parseCapabilities_({data: gmfTestDataPrintcapabilities});
    })
  );

  it('Set rotation', () => {
    expect(gmfPrintCtrl.rotation).toBe(0);
    gmfPrintCtrl.setRotation(25);
    expect(gmfPrintCtrl.rotation).toBe(25);
    gmfPrintCtrl.setRotation(190);
    expect(gmfPrintCtrl.rotation).toBe(180);
    gmfPrintCtrl.setRotation(-1000);
    expect(gmfPrintCtrl.rotation).toBe(-180);
  });

  it('Set layout and test depending layout information changes', () => {
    const title = 'title';
    gmfPrintCtrl.layoutInfo.title = title;

    gmfPrintCtrl.setLayout(gmfPrintCtrl.layoutInfo.layouts[1]);

    expect(gmfPrintCtrl.layoutInfo.title).toBe(title);
    expect(gmfPrintCtrl.layoutInfo.layout).toBe(gmfPrintCtrl.layoutInfo.layouts[1]);
  });

  it('Set scale and test map resolution change', () => {
    const baseScale = gmfPrintCtrl.layoutInfo.scales[1];
    const biggerScale =
      gmfPrintCtrl.layoutInfo.scales[2] > baseScale
        ? gmfPrintCtrl.layoutInfo.scales[2]
        : gmfPrintCtrl.layoutInfo.scales[0];

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
