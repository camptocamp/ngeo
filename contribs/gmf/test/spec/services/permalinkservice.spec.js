/*global describe beforeEach inject  it expect themes spyOn */
/*eslint no-undef: "error"*/
goog.require('gmf.Permalink');
goog.require('gmf');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.StateManager');
goog.require('ngeo.Location');
goog.require('ol.Map');
goog.require('ol.Collection');
goog.require('ol.layer.Group');


describe('Permalink service', function() {
  var PermalinkService, map, LayerHelper, firstLevelGroup, secondLevelGroup, dataGroup,
      StateManagerService, osmThemeNode, ngeoLocation;
  var $injector;

  beforeEach(inject(function(_$injector_) {

    $injector = _$injector_;
    StateManagerService = $injector.get('ngeoStateManager');
    PermalinkService = $injector.get('gmfPermalink');
    ngeoLocation = $injector.get('ngeoLocation');
    map = new ol.Map({layers : []});
    PermalinkService.setMap(map);
    PermalinkService.themes_ = themes['themes'];


    //create fake layerTree
    LayerHelper = $injector.get('ngeoLayerHelper');

    dataGroup = LayerHelper.getGroupFromMap(map, gmf.DATALAYERGROUP_NAME);
    firstLevelGroup = LayerHelper.createBasicGroup(new ol.Collection([
      LayerHelper.createBasicWMSLayer('', 'l_g1_1'),
      LayerHelper.createBasicWMSLayer('', 'l_g1_2')
    ]));

    secondLevelGroup = LayerHelper.createBasicGroup(new ol.Collection([
      LayerHelper.createBasicWMSLayer('', 'l_g2_1'),
      LayerHelper.createBasicWMSLayer('', 'l_g2_2')
    ]));

    firstLevelGroup.getLayers().insertAt(0, secondLevelGroup);
    dataGroup.getLayers().insertAt(0, firstLevelGroup);

    osmThemeNode = themes['themes'].filter(function(theme) {
      return theme.name === 'OSM';
    })[0];

  }));

  it('Should registerLayer/unregisterLayer recursively', function() {
    expect(PermalinkService).toBeDefined();
    expect(Object.keys(PermalinkService.listenerKeys_).length).toBe(0);

    PermalinkService.registerDataLayerGroup_(map);
    firstLevelGroup.getLayers().forEach(shouldHaveBeenRegistered);
    secondLevelGroup.getLayers().forEach(shouldHaveBeenRegistered);

    // try to add a new layer to a group and check that the new one is registered
    firstLevelGroup.getLayers().push(LayerHelper.createBasicWMSLayer('', 'l_g1_3'));
    firstLevelGroup.getLayers().forEach(shouldHaveBeenRegistered);

    PermalinkService.unregisterLayer_(dataGroup);
    firstLevelGroup.getLayers().forEach(shouldHaveBeenUnRegistered);
    secondLevelGroup.getLayers().forEach(shouldHaveBeenUnRegistered);

    function shouldHaveBeenRegistered(layer) {
      var uid = goog.getUid(layer),
          listeners = PermalinkService.listenerKeys_[uid];
      expect(listeners).toBeDefined();
    }

    function shouldHaveBeenUnRegistered(layer) {
      var uid = goog.getUid(layer),
          listeners = PermalinkService.listenerKeys_[uid];
      expect(PermalinkService.listenerKeys_[uid].ol.length).toBe(0);
      expect(PermalinkService.listenerKeys_[uid].goog.length).toBe(0);
    }

  });

  it('Should register a layer with the previous state saved in loacalStorage. TESTING MIXED GROUP ONLY', function() {

    //delete non-mixed group from children
    osmThemeNode.children = osmThemeNode.children.filter(function(node) {
      return node.name === 'OSM function';
    });

    //only 1 theme for testing
    PermalinkService.themes_ = [osmThemeNode];

    //adding layer for each node to the map
    var fakeLayers = osmThemeNode.children[0].children.map(function(node) {
      var layer = new ol.layer.Layer({
        layerName : node.name,
        visible : true
      });
      dataGroup.getLayers().insertAt(0, layer);
      return layer;
    });

    //mocking getInitialValue to return always false (and not use localStorage)
    spyOn(StateManagerService, 'getInitialValue').and.returnValue(false);
    PermalinkService.registerDataLayerGroup_(map);
    expect(StateManagerService.getInitialValue).toHaveBeenCalled();
    fakeLayers.forEach(function(layer) {
      expect(layer.getVisible()).toBeFalsy();
    });
  });

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
});
