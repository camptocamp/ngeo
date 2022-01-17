// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// @ts-nocheck
import angular from 'angular';
import {getLayer as gmfLayertreeSyncLayertreeMapGetLayer} from 'gmf/layertree/SyncLayertreeMap';
import gmfTestDataThemes from '../data/themes';
import gmfTestDataThemescapabilities from '../data/themescapabilities';
import {uncheckAllNodes} from '../data/manipulateThemes';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerGroup from 'ol/layer/Group';
import olLayerImage from 'ol/layer/Image';

/**
 * @return {[angular.IHttpBackendService, import('gmf/layertree/SyncLayertreeMap.js).default', Element, import("ol/Map.js").default, (treeCtrl: import("ngeo/layertree/Controller.js").LayertreeController) => import("ol/layer/Base").default)]}
 */
export const setupSyncLayertreeMap = () => {
  const map = new olMap({
    view: new olView({
      center: [0, 0],
      zoom: 0,
    }),
  });

  const group = new olLayerGroup();
  map.getLayers().push(group);

  const element = angular.element(
    '<div ngeo-layertree="tree"' +
      'ngeo-layertree-map="map"' +
      'ngeo-layertree-nodelayer="getLayer(treeCtrl)"' +
      '</div>'
  );

  let $httpBackend_;
  let gmfSyncLayertreeMap_;
  let getLayer;

  angular.mock.inject(($rootScope, $compile, $httpBackend, gmfSyncLayertreeMap, gmfThemes, gmfTreeUrl) => {
    $httpBackend_ = $httpBackend;
    gmfSyncLayertreeMap_ = gmfSyncLayertreeMap;

    const reGmfTreeUrl = new RegExp(`^${gmfTreeUrl}`);
    // Deactivate all layers in themes.json
    uncheckAllNodes(gmfTestDataThemes.themes);
    // Prepare request simulation
    $httpBackend.when('GET', reGmfTreeUrl).respond(gmfTestDataThemes);
    $httpBackend
      .when('GET', 'https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml?lang=fr')
      .respond(gmfTestDataThemescapabilities.swisstopo);
    $httpBackend
      .when('GET', 'https://geomapfish-demo-2-6.camptocamp.com/tiles/1.0.0/WMTSCapabilities.xml')
      .respond(gmfTestDataThemescapabilities.demo);
    $httpBackend
      .when('GET', 'https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml')
      .respond(gmfTestDataThemescapabilities.asitvd);

    // Prepare themes
    $httpBackend.expectGET(reGmfTreeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    // Prepare layertree
    getLayer = function (treeCtrl) {
      const layer = gmfSyncLayertreeMap.createLayer(treeCtrl, map, group);
      return layer;
    };
  });
  return [$httpBackend_, gmfSyncLayertreeMap_, element, map, getLayer];
}

describe('gmf.layertree.SyncLayertreeMap', () => {
  /** @type {angular.IHttpBackendService} */
  let $httpBackend_;
  let gmfSyncLayertreeMap_;
  let element;
  let map;
  let getLayer;

  beforeEach(() => {
    [$httpBackend_, gmfSyncLayertreeMap_, element, map, getLayer] = setupSyncLayertreeMap();
  });

  // ================== miscellaneous ================

  it('Get layer', () => {
    angular.mock.inject(($rootScope, $compile) => {
      // Init, compile layertree
      $rootScope.tree = gmfTestDataThemes.themes[1]; // Theme 'Demo'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

    const roottreeCtrl = element.scope().layertreeCtrl;
    const treeGroup = roottreeCtrl.children[1]; // Group 'Layers'
    const treeLayer = treeGroup.children[0]; // Leaf 'cinema'
    const layer = gmfLayertreeSyncLayertreeMapGetLayer(treeLayer);

    expect(treeLayer.layer).toBe(null);
    expect(layer.constructor).toBe(olLayerImage);
  });

  // ================== Create ================

  it('Create WMS Layer in mixed group', () => {
    angular.mock.inject(($rootScope, $compile) => {
      // Init, compile layertree
      $rootScope.tree = gmfTestDataThemes.themes[1]; // Theme 'Demo'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

    const roottreeCtrl = element.scope().layertreeCtrl;
    const treeGroup = roottreeCtrl.children[0]; // Group 'OSM functions mixed'
    const treeLeaf = treeGroup.children[0]; // osm scale;
    const wmsParamLayers = treeLeaf.layer.getSource().getParams().LAYERS;

    expect(treeLeaf.node.name).toEqual(wmsParamLayers);
  });

  it('Create WMS Layer in a not mixed group', () => {
    // Activate some layers (see matching tree in GMF admin) in theme "demo", group "layers"
    gmfTestDataThemes.themes[1].children[1].children[0].children[0].metadata.isChecked = true; // cinema
    gmfTestDataThemes.themes[1].children[1].children[1].metadata.isChecked = true; // police
    gmfTestDataThemes.themes[1].children[1].children[2].metadata.isChecked = true; // post_office
    angular.mock.inject(($rootScope, $compile) => {
      // Init, compile layertree
      $rootScope.tree = gmfTestDataThemes.themes[1]; // Theme 'Demo'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

    const roottreeCtrl = element.scope().layertreeCtrl;
    const treeGroup = roottreeCtrl.children[1]; // Group 'Layers'
    const wmsParamLayers = treeGroup.layer.getSource().getParams().LAYERS;
    const checkedLayers = ['cinema', 'police', 'post_office']; // order count !

    expect(wmsParamLayers).toEqual(checkedLayers.reverse().join(','));
  });

  it('Create WMTS Layer (in a mixed group)', () => {
    angular.mock.inject(($rootScope, $compile) => {
      // Init, compile layertree
      $rootScope.tree = gmfTestDataThemes.themes[0]; // Theme 'Cadastre'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

    $httpBackend_.flush(); // To get capabilities (and source) for the WMTS layer.

    const roottreeCtrl = element.scope().layertreeCtrl;
    const treeGroup = roottreeCtrl.children[0]; // Group 'Cadastre'
    const treeLeaf = treeGroup.children[1]; // Leaf 'ch.are.alpenkonvention'

    expect(treeLeaf.node.name).toBe(treeLeaf.layer.getSource().getLayer());
  });

  // ================== Sync ================

  it('Sync WMS Layer in mixed group', () => {
    angular.mock.inject(($rootScope, $compile) => {
      // Init, compile layertree
      $rootScope.tree = gmfTestDataThemes.themes[1]; // Theme 'Demo'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

    const roottreeCtrl = element.scope().layertreeCtrl;
    const treeGroup = roottreeCtrl.children[0]; // Group 'OSM functions mixed'
    const treeLeaf = treeGroup.children[0]; // osm scale;

    roottreeCtrl.setState('off');
    gmfSyncLayertreeMap_.sync_(treeGroup);
    expect(treeLeaf.layer.getVisible()).toBe(false);

    gmfSyncLayertreeMap_.sync_(treeGroup);
    treeLeaf.setState('on');
    gmfSyncLayertreeMap_.sync_(treeLeaf);
    const wmsParamLayers = treeLeaf.layer.getSource().getParams().LAYERS;
    expect(wmsParamLayers).toBe('osm_scale');
  });

  it('Sync WMS Layer in a not mixed group', () => {
    angular.mock.inject(($rootScope, $compile) => {
      // Init, compile layertree
      $rootScope.tree = gmfTestDataThemes.themes[1]; // Theme 'Demo'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

    const roottreeCtrl = element.scope().layertreeCtrl;
    const treeGroup = roottreeCtrl.children[1]; // Group 'Layers'
    const treeLeaf = treeGroup.children[0]; // Leaf 'cinema'

    roottreeCtrl.setState('off');
    gmfSyncLayertreeMap_.sync_(treeGroup);
    expect(treeGroup.layer.getVisible()).toBe(false);

    treeLeaf.setState('on');
    gmfSyncLayertreeMap_.sync_(treeLeaf);
    let wmsParamLayers = treeGroup.layer.getSource().getParams().LAYERS;
    expect(wmsParamLayers).toBe('cinema');

    // Group is on, original order must be kept.
    treeGroup.setState('on');
    gmfSyncLayertreeMap_.sync_(treeGroup);
    wmsParamLayers = treeGroup.layer.getSource().getParams().LAYERS;
    expect(wmsParamLayers).toEqual(
      'firestations,sustenance,entertainment,osm_time,post_office,police,cinema'
    );
  });

  it('Sync WMTS Layer (in a mixed group)', () => {
    angular.mock.inject(($rootScope, $compile) => {
      // Init, compile layertree
      $rootScope.tree = gmfTestDataThemes.themes[0]; // Theme 'Cadastre'
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

    $httpBackend_.flush(); // To get capabilities (and source) for the WMTS layer.

    const roottreeCtrl = element.scope().layertreeCtrl;
    const treeGroup = roottreeCtrl.children[0]; // Group 'Cadastre'
    const treeLeaf = treeGroup.children[0]; // Leaf 'ch.are.alpenkonvention'

    treeGroup.setState('off');
    gmfSyncLayertreeMap_.sync_(treeGroup);
    expect(treeLeaf.layer.getVisible()).toBe(false);

    treeLeaf.setState('on');
    gmfSyncLayertreeMap_.sync_(treeLeaf);
    expect(treeLeaf.layer.getVisible()).toBe(true);
  });
});
