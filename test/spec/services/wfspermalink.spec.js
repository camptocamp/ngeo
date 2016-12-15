/* global msGMLOutputFuel */
goog.require('ngeo.WfsPermalink');
goog.require('ol.format.filter');
goog.require('ngeo.test.data.msGMLOutputFuel');

describe('ngeo.WfsPermalink', function() {

  var ngeoWfsPermalink;
  var ngeoQueryResult;

  beforeEach(function() {
    module('ngeo', function($provide) {
      $provide.value('ngeoWfsPermalinkOptions', {
        url: 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/mapserv_proxy',
        wfsTypes: [{featureType: 'fuel'}, {featureType: 'highway'}],
        defaultFeatureNS: 'http://mapserver.gis.umn.edu/mapserver',
        defaultFeaturePrefix: 'ms'
      });
    });

    inject(function($injector) {
      ngeoWfsPermalink = $injector.get('ngeoWfsPermalink');
      ngeoQueryResult = $injector.get('ngeoQueryResult');
    });
  });

  it('creates a service', function() {
    expect(ngeoWfsPermalink instanceof ngeo.WfsPermalink).toBe(true);
  });

  describe('#issue', function() {

    var $httpBackend;
    var map;

    beforeEach(function() {
      var url = 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/mapserv_proxy';
      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', url).respond(msGMLOutputFuel);
        $httpBackend = $injector.get('$httpBackend');
      });

      var projection = ol.proj.get('EPSG:21781');
      projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

      map = new ol.Map({
        layers: [],
        view: new ol.View({
          projection: projection,
          resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
          center: [537635, 152640],
          zoom: 0
        })
      });
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('makes a query and adds the result', function() {
      var queryData = {
        'wfsType': 'fuel',
        'showFeatures': true,
        'filterGroups': [
          {
            'filters': [
              {'property': 'osm_id', 'condition': '1420918679'}
            ]
          }
        ]
      };

      ngeoWfsPermalink.issue(queryData, map);
      $httpBackend.flush();
      expect(ngeoQueryResult.sources[ngeoQueryResult.sources.length - 1].features.length).toBe(1);
      ngeoWfsPermalink.clear();
      expect(ngeoQueryResult.total).toBe(0);
    });
  });

  describe('#createFilters_', function() {
    var expectFiltersToEqual = function(filter1, filter2) {
      expect(filter1.constructor).toBe(filter2.constructor, 'same filter type');
      if (filter1 instanceof ol.format.filter.LogicalBinary) {
        expectFiltersToEqual(filter1.conditionA, filter2.conditionA);
        expectFiltersToEqual(filter1.conditionB, filter2.conditionB);
      } else {
        expect(filter1 instanceof ol.format.filter.EqualTo);
        expect(filter1.propertyName).toBe(filter2.propertyName);
        expect(filter1.expression).toBe(filter2.expression);
      }
    };

    it('creates filters', function() {
      var queryData = {
        'wfsType': 'fuel',
        'filterGroups': [
          {
            'filters': [
              {'property': 'osm_id', 'condition': '12345'},
              {'property': 'type', 'condition': ['diesel', 'gas']}
            ]
          },
          {
            'filters': [
              {'property': 'payment', 'condition': ['card', 'cash']}
            ]
          },
          {
            'filters': [
              {'property': 'open_7_24', 'condition': '1'}
            ]
          }
        ]
      };
      var f = ol.format.filter;
      var expectedFilters = f.or(
          f.or(
            f.and(
                f.equalTo('osm_id', '12345'),
                f.or(
                  f.equalTo('type', 'diesel'),
                  f.equalTo('type', 'gas')
                )
            ),
            f.or(
              f.equalTo('payment', 'card'),
              f.equalTo('payment', 'cash')
            )
          ),
          f.equalTo('open_7_24', '1')
      );
      expectFiltersToEqual(
          ngeoWfsPermalink.createFilters_(queryData['filterGroups']),
          expectedFilters
      );
    });

    it('handles 0 filter groups', function() {
      expect(ngeoWfsPermalink.createFilters_([])).toBe(null);
    });
  });

});
