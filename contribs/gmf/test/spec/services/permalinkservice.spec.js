import gmfTestDataThemes from 'gmf/test/data/themes.js';
import gmfBase from 'gmf/index.js';
import ngeoProjEPSG2056 from 'ngeo/proj/EPSG2056.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olCollection from 'ol/Collection.js';
import * as olProj from 'ol/proj.js';
import * as olObj from 'ol/obj.js';


describe('Permalink service', () => {
  let PermalinkService;
  let StateManagerService;
  let ngeoLocation;

  beforeEach(angular.mock.inject((_ngeoStateManager_, _gmfPermalink_, _ngeoLocation_, _ngeoLayerHelper_) => {
    StateManagerService = _ngeoStateManager_;
    PermalinkService = _gmfPermalink_;
    ngeoLocation = _ngeoLocation_;
    const map = new olMap({layers: [], view: new olView({projection: olProj.get('EPSG:2056')})});
    PermalinkService.setMap(map);
    // need to work on a clone of themes, because the permalink service
    // seems to change the original object?!
    const themesClone = olObj.assign({}, gmfTestDataThemes);
    PermalinkService.themes_ = themesClone['themes'];


    //create fake layerTree
    const LayerHelper = _ngeoLayerHelper_;

    const dataGroup = LayerHelper.getGroupFromMap(map, gmfBase.DATALAYERGROUP_NAME);
    const firstLevelGroup = LayerHelper.createBasicGroup(new olCollection([
      LayerHelper.createBasicWMSLayer('', 'l_g1_1'),
      LayerHelper.createBasicWMSLayer('', 'l_g1_2')
    ]));

    const secondLevelGroup = LayerHelper.createBasicGroup(new olCollection([
      LayerHelper.createBasicWMSLayer('', 'l_g2_1'),
      LayerHelper.createBasicWMSLayer('', 'l_g2_2')
    ]));

    firstLevelGroup.getLayers().insertAt(0, secondLevelGroup);
    dataGroup.getLayers().insertAt(0, firstLevelGroup);
  }));

  describe('#getWfsPermalinkData_', () => {
    it('returns null if no query params', () => {
      ngeoLocation.updateParams({});
      expect(PermalinkService.getWfsPermalinkData_()).toBe(null);
    });

    it('return null when no filters', () => {
      // ?wfs_layer=fuel&wfs_osm_id=
      ngeoLocation.updateParams({wfs_layer: 'fuel', wfs_osm_id: ''});
      expect(PermalinkService.getWfsPermalinkData_()).toBe(null);
    });

    it('works with a single filter', () => {
      // ?wfs_layer=fuel&wfs_osm_id=1420918679
      ngeoLocation.updateParams({wfs_layer: 'fuel', wfs_osm_id: '1420918679'});
      const expectedQueryParams = {
        wfsType: 'fuel',
        showFeatures: true,
        filterGroups: [
          {
            filters: [
              {
                property: 'osm_id',
                condition: '1420918679'
              }
            ]
          }
        ]
      };
      expect(PermalinkService.getWfsPermalinkData_()).toEqual(expectedQueryParams);
    });

    it('works with a single filter with multiple conditions', () => {
      // ?wfs_layer=fuel&wfs_osm_id=1420918679,441134960&wfs_showFeatures=0
      ngeoLocation.updateParams({
        wfs_layer: 'fuel', wfs_osm_id: '1420918679,441134960', wfs_showFeatures: '0'});
      const expectedQueryParams = {
        wfsType: 'fuel',
        showFeatures: false,
        filterGroups: [
          {
            filters: [
              {
                property: 'osm_id',
                condition: ['1420918679', '441134960']
              }
            ]
          }
        ]
      };
      expect(PermalinkService.getWfsPermalinkData_()).toEqual(expectedQueryParams);
    });

    it('works with multiple filters', () => {
      // ?wfs_layer=osm_scale&wfs_highway=bus_stop&wfs_name=Grand-Pont&wfs_operator=TL
      ngeoLocation.updateParams({
        wfs_layer: 'osm_scale', wfs_highway: 'bus_stop', wfs_name: 'Grand-Pont',
        wfs_operator: 'TL'});
      const expectedQueryParams = {
        wfsType: 'osm_scale',
        showFeatures: true,
        filterGroups: [
          {
            filters: [
              {
                property: 'highway',
                condition: 'bus_stop'
              },
              {
                property: 'name',
                condition: 'Grand-Pont'
              },
              {
                property: 'operator',
                condition: 'TL'
              }
            ]
          }
        ]
      };
      expect(PermalinkService.getWfsPermalinkData_()).toEqual(expectedQueryParams);
    });

    it('works with multipe filter groups', () => {
      // ?wfs_layer=osm_scale&wfs_ngroups=2&wfs_0_ele=380&wfs_0_highway=bus_stop&
      // wfs_0_operator=TL&wfs_1_highway=bus_stop&wfs_1_name=Grand-Pont&wfs_1_operator=TL
      ngeoLocation.updateParams({
        wfs_layer: 'osm_scale', wfs_ngroups: '2',
        wfs_0_ele: '380', wfs_0_highway: 'bus_stop', wfs_0_operator: 'TL',
        wfs_1_highway: 'bus_stop', wfs_1_name: 'Grand-Pont', wfs_1_operator: 'TL'
      });
      const expectedQueryParams = {
        wfsType: 'osm_scale',
        showFeatures: true,
        filterGroups: [
          {
            filters: [
              {
                property: 'ele',
                condition: '380'
              },
              {
                property: 'highway',
                condition: 'bus_stop'
              },
              {
                property: 'operator',
                condition: 'TL'
              }
            ]
          },
          {
            filters: [
              {
                property: 'highway',
                condition: 'bus_stop'
              },
              {
                property: 'name',
                condition: 'Grand-Pont'
              },
              {
                property: 'operator',
                condition: 'TL'
              }
            ]
          }
        ]
      };
      expect(PermalinkService.getWfsPermalinkData_()).toEqual(expectedQueryParams);
    });
  });

  describe('#getMapCenter', () => {
    it('returns the unprojected center', () => {
      StateManagerService.initialState['map_x'] = 2537046;
      StateManagerService.initialState['map_y'] = 1180040;
      expect(PermalinkService.getMapCenter()).toEqual([2537046, 1180040]);
    });

    it('accepts flipped coordinates (x/y switched)', () => {
      PermalinkService.sourceProjections_ = [olProj.get('EPSG:2056'), olProj.get('EPSG:4326')];
      StateManagerService.initialState['map_x'] = 46.7685575;
      StateManagerService.initialState['map_y'] = 6.6144562;
      const center = PermalinkService.getMapCenter();
      expect(center[0]).toBeCloseTo(2537046, 0);
      expect(center[1]).toBeCloseTo(1180040, 0);
    });

    it('reprojects the center', () => {
      PermalinkService.sourceProjections_ = [olProj.get('EPSG:2056'), olProj.get('EPSG:4326')];
      StateManagerService.initialState['map_x'] = 6.6144562;
      StateManagerService.initialState['map_y'] = 46.7685575;
      const center = PermalinkService.getMapCenter();
      expect(center[0]).toBeCloseTo(2537046, 0);
      expect(center[1]).toBeCloseTo(1180040, 0);
    });
  });
});
