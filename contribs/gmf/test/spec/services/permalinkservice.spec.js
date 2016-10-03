/* global old_themes */
goog.require('gmf.Permalink');
goog.require('gmf');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.StateManager');
goog.require('ngeo.Location');
goog.require('ol.Map');
goog.require('ol.Collection');
goog.require('ol.layer.Group');
goog.require('ngeo.proj.EPSG2056');


describe('Permalink service', function() {
  var PermalinkService;
  var StateManagerService;
  var ngeoLocation;

  beforeEach(inject(function($injector) {
    StateManagerService = $injector.get('ngeoStateManager');
    PermalinkService = $injector.get('gmfPermalink');
    ngeoLocation = $injector.get('ngeoLocation');
    var map = new ol.Map({layers : [], view: new ol.View({projection: ol.proj.get('EPSG:2056')})});
    PermalinkService.setMap(map);
    // need to work on a clone of themes, because the permalink service
    // seems to change the original object?!
    // FIXME use the current version of the themes.
    var themesClone = goog.object.unsafeClone(old_themes);
    PermalinkService.themes_ = themesClone['themes'];


    //create fake layerTree
    var LayerHelper = $injector.get('ngeoLayerHelper');

    var dataGroup = LayerHelper.getGroupFromMap(map, gmf.DATALAYERGROUP_NAME);
    var firstLevelGroup = LayerHelper.createBasicGroup(new ol.Collection([
      LayerHelper.createBasicWMSLayer('', 'l_g1_1'),
      LayerHelper.createBasicWMSLayer('', 'l_g1_2')
    ]));

    var secondLevelGroup = LayerHelper.createBasicGroup(new ol.Collection([
      LayerHelper.createBasicWMSLayer('', 'l_g2_1'),
      LayerHelper.createBasicWMSLayer('', 'l_g2_2')
    ]));

    firstLevelGroup.getLayers().insertAt(0, secondLevelGroup);
    dataGroup.getLayers().insertAt(0, firstLevelGroup);
  }));

  describe('#getWfsPermalinkData_', function() {
    it('returns null if no query params', function() {
      ngeoLocation.updateParams({});
      expect(PermalinkService.getWfsPermalinkData_()).toBe(null);
    });

    it('return null when no filters', function() {
      // ?wfs_layer=fuel&wfs_osm_id=
      ngeoLocation.updateParams({wfs_layer: 'fuel', wfs_osm_id: ''});
      expect(PermalinkService.getWfsPermalinkData_()).toBe(null);
    });

    it('works with a single filter', function() {
      // ?wfs_layer=fuel&wfs_osm_id=1420918679
      ngeoLocation.updateParams({wfs_layer: 'fuel', wfs_osm_id: '1420918679'});
      var expectedQueryParams = {
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

    it('works with a single filter with multiple conditions', function() {
      // ?wfs_layer=fuel&wfs_osm_id=1420918679,441134960&wfs_showFeatures=0
      ngeoLocation.updateParams({
        wfs_layer: 'fuel', wfs_osm_id: '1420918679,441134960', wfs_showFeatures: '0'});
      var expectedQueryParams = {
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

    it('works with multiple filters', function() {
      // ?wfs_layer=osm_scale&wfs_highway=bus_stop&wfs_name=Grand-Pont&wfs_operator=TL
      ngeoLocation.updateParams({
        wfs_layer: 'osm_scale', wfs_highway: 'bus_stop', wfs_name: 'Grand-Pont',
        wfs_operator: 'TL'});
      var expectedQueryParams = {
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

    it('works with multipe filter groups', function() {
      // ?wfs_layer=osm_scale&wfs_ngroups=2&wfs_0_ele=380&wfs_0_highway=bus_stop&
      // wfs_0_operator=TL&wfs_1_highway=bus_stop&wfs_1_name=Grand-Pont&wfs_1_operator=TL
      ngeoLocation.updateParams({
        wfs_layer: 'osm_scale', wfs_ngroups: '2',
        wfs_0_ele: '380', wfs_0_highway: 'bus_stop', wfs_0_operator: 'TL',
        wfs_1_highway: 'bus_stop', wfs_1_name: 'Grand-Pont', wfs_1_operator: 'TL'
      });
      var expectedQueryParams = {
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

  describe('#getMapCenter', function() {
    it('returns the unprojected center', function() {
      StateManagerService.initialState['map_x'] = 2537046;
      StateManagerService.initialState['map_y'] = 1180040;
      expect(PermalinkService.getMapCenter()).toEqual([2537046, 1180040]);
    });

    it('accepts flipped coordinates (x/y switched)', function() {
      PermalinkService.sourceProjections_ = [ol.proj.get('EPSG:2056'), ol.proj.get('EPSG:4326')];
      StateManagerService.initialState['map_x'] = 46.7685575;
      StateManagerService.initialState['map_y'] = 6.6144562;
      var center = PermalinkService.getMapCenter();
      expect(center[0]).toBeCloseTo(2537046, 0);
      expect(center[1]).toBeCloseTo(1180040, 0);
    });

    it('reprojects the center', function() {
      PermalinkService.sourceProjections_ = [ol.proj.get('EPSG:2056'), ol.proj.get('EPSG:4326')];
      StateManagerService.initialState['map_x'] = 6.6144562;
      StateManagerService.initialState['map_y'] = 46.7685575;
      var center = PermalinkService.getMapCenter();
      expect(center[0]).toBeCloseTo(2537046, 0);
      expect(center[1]).toBeCloseTo(1180040, 0);
    });
  });
});
