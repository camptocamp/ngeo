// The MIT License (MIT)
//
// Copyright (c) 2016-2025 Camptocamp SA
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

import angular from 'angular';
import olMap from 'ol/Map';
import olView from 'ol/View';
import * as olProj from 'ol/proj';
import * as olFormatFilter from 'ol/format/filter';
import olFormatFilterEqualTo from 'ol/format/filter/EqualTo';
import olFormatFilterLogicalNary from 'ol/format/filter/LogicalNary';
import {WfsPermalinkService} from 'ngeo/statemanager/WfsPermalink';
import ngeoTestDataMsGMLOutputFuel from '../data/msGMLOutputFuel';

describe('ngeo.statemanager.WfsPermalink', () => {
  /** @type {import('ngeo/statemanager/WfsPermalink').WfsPermalinkService} */
  let ngeoWfsPermalink;
  /** @type {import('ngeo/query/MapQuerent').QueryResult} */
  let ngeoQueryResult;

  beforeEach(() => {
    angular.mock.module(
      'ngeo',
      /**
       * @param {angular.IModule} $provide
       */
      ($provide) => {
        $provide.value(
          'ngeoPermalinkOgcserverUrl',
          'https://geomapfish-demo-2-10.camptocamp.com/mapserv_proxy',
        );
        $provide.value('ngeoWfsPermalinkOptions', {
          wfsTypes: [{featureType: 'fuel'}, {featureType: 'highway'}],
          defaultFeatureNS: 'http://mapserver.gis.umn.edu/mapserver',
          defaultFeaturePrefix: 'ms',
        });
        $provide.value('gmfFitOptions', {});
      },
    );

    angular.mock.inject((_ngeoWfsPermalink_, _ngeoQueryResult_) => {
      ngeoWfsPermalink = _ngeoWfsPermalink_;
      ngeoQueryResult = _ngeoQueryResult_;
    });
  });

  it('creates a service', () => {
    expect(ngeoWfsPermalink instanceof WfsPermalinkService).toBe(true);
  });

  describe('#issue', () => {
    /** @type {angular.IHttpBackendService} */
    let $httpBackend;
    /** @type {import('ol/Map').default} */
    let map;

    beforeEach(() => {
      const url = 'https://geomapfish-demo-2-10.camptocamp.com/mapserv_proxy';
      angular.mock.inject((_$httpBackend_) => {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('POST', url).respond(ngeoTestDataMsGMLOutputFuel);
      });

      const projection = olProj.get('EPSG:2056');
      projection.setExtent([2485869.5728, 1076443.1884, 2837076.5648, 1299941.7864]);

      map = new olMap({
        layers: [],
        view: new olView({
          projection: projection,
          resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
          center: [2537635, 1152640],
          zoom: 0,
        }),
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('makes a query and adds the result', () => {
      const queryData = {
        'wfsType': 'fuel',
        'showFeatures': true,
        'filterGroups': [
          {
            'filters': [{'property': 'osm_id', 'condition': '1420918679'}],
          },
        ],
      };

      ngeoWfsPermalink.issue(queryData, map);
      $httpBackend.flush();
      expect(ngeoQueryResult.sources[ngeoQueryResult.sources.length - 1].features.length).toBe(1);
      ngeoWfsPermalink.clear();
      expect(ngeoQueryResult.total).toBe(0);
    });
  });

  describe('#issue with OGC server alias', () => {
    /** @type {angular.IHttpBackendService} */
    let $httpBackend;
    /** @type {import('ol/Map').default} */
    let map;
    /** @type {import('gmf/theme/Themes').ThemesService} */
    let gmfThemes;

    beforeEach(() => {
      const url = 'https://geomapfish-demo-2-10.camptocamp.com/mapserv_proxy';
      angular.mock.inject((_$httpBackend_, _gmfThemes_) => {
        $httpBackend = _$httpBackend_;
        gmfThemes = _gmfThemes_;
        $httpBackend.when('POST', url).respond(ngeoTestDataMsGMLOutputFuel);
      });

      const projection = olProj.get('EPSG:2056');
      projection.setExtent([2485869.5728, 1076443.1884, 2837076.5648, 1299941.7864]);

      map = new olMap({
        layers: [],
        view: new olView({
          projection: projection,
          resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
          center: [2537635, 1152640],
          zoom: 0,
        }),
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('applies property aliases when ogcServer is specified', (done) => {
      // Mock the ogcServers response with attribute aliases
      const mockOgcServers = {
        'test-server': {
          attributes: {
            'fuel': {
              'osm_id': {
                alias: 'id',
                namespace: 'test',
                type: 'string',
              },
              'name': {
                alias: 'station_name',
                namespace: 'test',
                type: 'string',
              },
            },
          },
        },
      };

      spyOn(gmfThemes, 'getOgcServersObject').and.returnValue(Promise.resolve(mockOgcServers));

      // Update the wfsType to use ogcServer
      ngeoWfsPermalink.wfsTypes_['fuel'].ogcServer = 'test-server';

      const queryData = {
        'wfsType': 'fuel',
        'showFeatures': true,
        'filterGroups': [
          {
            'filters': [{'property': 'osm_id', 'condition': '1420918679'}],
          },
        ],
      };

      ngeoWfsPermalink.issue(queryData, map);
      $httpBackend.flush();

      // Wait for the promise to resolve
      setTimeout(() => {
        const features = ngeoQueryResult.sources[ngeoQueryResult.sources.length - 1].features;
        expect(features.length).toBe(1);

        const feature = features[0];
        // Check that the original property no longer exists
        expect(feature.get('osm_id')).toBeUndefined();
        // Check that the aliased property exists
        expect(feature.get('id')).toBeDefined();

        ngeoWfsPermalink.clear();
        done();
      }, 100);
    });

    it('handles missing OGC server gracefully', (done) => {
      // Mock the ogcServers response without the specified server
      const mockOgcServers = {
        'other-server': {
          attributes: {},
        },
      };

      spyOn(gmfThemes, 'getOgcServersObject').and.returnValue(Promise.resolve(mockOgcServers));
      spyOn(console, 'error');

      // Update the wfsType to use a non-existent ogcServer
      ngeoWfsPermalink.wfsTypes_['fuel'].ogcServer = 'missing-server';

      const queryData = {
        'wfsType': 'fuel',
        'showFeatures': true,
        'filterGroups': [
          {
            'filters': [{'property': 'osm_id', 'condition': '1420918679'}],
          },
        ],
      };

      ngeoWfsPermalink.issue(queryData, map);
      $httpBackend.flush();

      // Wait for the promise to resolve
      setTimeout(() => {
        // Features should still be displayed (graceful degradation)
        const features = ngeoQueryResult.sources[ngeoQueryResult.sources.length - 1].features;
        expect(features.length).toBe(1);

        const feature = features[0];
        // Original property names should be preserved
        expect(feature.get('osm_id')).toBeDefined();

        // Error should be logged
        expect(console.error).toHaveBeenCalledWith(
          jasmine.stringContaining('OGC server missing-server not found'),
        );

        ngeoWfsPermalink.clear();
        done();
      }, 100);
    });

    it('handles promise rejection gracefully', (done) => {
      // Mock the ogcServers promise to reject
      spyOn(gmfThemes, 'getOgcServersObject').and.returnValue(
        Promise.reject(new Error('Failed to load OGC servers')),
      );
      spyOn(console, 'error');

      // Update the wfsType to use ogcServer
      ngeoWfsPermalink.wfsTypes_['fuel'].ogcServer = 'test-server';

      const queryData = {
        'wfsType': 'fuel',
        'showFeatures': true,
        'filterGroups': [
          {
            'filters': [{'property': 'osm_id', 'condition': '1420918679'}],
          },
        ],
      };

      ngeoWfsPermalink.issue(queryData, map);
      $httpBackend.flush();

      // Wait for the promise to reject and handle
      setTimeout(() => {
        // Features should still be displayed (graceful degradation)
        const features = ngeoQueryResult.sources[ngeoQueryResult.sources.length - 1].features;
        expect(features.length).toBe(1);

        const feature = features[0];
        // Original property names should be preserved
        expect(feature.get('osm_id')).toBeDefined();

        // Error should be logged
        expect(console.error).toHaveBeenCalledWith(
          jasmine.stringContaining('Error when getting ogc servers'),
        );

        ngeoWfsPermalink.clear();
        done();
      }, 100);
    });

    it('does not apply aliases when no attributes are defined for the feature type', (done) => {
      // Mock the ogcServers response without attributes for the feature type
      const mockOgcServers = {
        'test-server': {
          attributes: {
            'other-type': {
              'id': {
                alias: 'identifier',
                namespace: 'test',
                type: 'string',
              },
            },
          },
        },
      };

      spyOn(gmfThemes, 'getOgcServersObject').and.returnValue(Promise.resolve(mockOgcServers));

      // Update the wfsType to use ogcServer
      ngeoWfsPermalink.wfsTypes_['fuel'].ogcServer = 'test-server';

      const queryData = {
        'wfsType': 'fuel',
        'showFeatures': true,
        'filterGroups': [
          {
            'filters': [{'property': 'osm_id', 'condition': '1420918679'}],
          },
        ],
      };

      ngeoWfsPermalink.issue(queryData, map);
      $httpBackend.flush();

      // Wait for the promise to resolve
      setTimeout(() => {
        const features = ngeoQueryResult.sources[ngeoQueryResult.sources.length - 1].features;
        expect(features.length).toBe(1);

        const feature = features[0];
        // Original property names should be preserved (no aliases applied)
        expect(feature.get('osm_id')).toBeDefined();

        ngeoWfsPermalink.clear();
        done();
      }, 100);
    });
  });

  describe('#createFilters_', () => {
    /**
     * @param {import('ol/format/filter/Filter').default} filter1
     * @param {import('ol/format/filter/Filter').default} filter2
     */
    const expectFiltersToEqual = function (filter1, filter2) {
      expect(filter1.constructor).toBe(filter2.constructor, 'same filter type');
      if (filter1 instanceof olFormatFilterLogicalNary && filter2 instanceof olFormatFilterLogicalNary) {
        expect(filter1.conditions.length).toBe(filter2.conditions.length);
        for (let i = 0; i < filter1.conditions.length; ++i) {
          expectFiltersToEqual(filter1.conditions[i], filter2.conditions[i]);
        }
      } else {
        expect(filter1 instanceof olFormatFilterEqualTo);
        expect(filter2 instanceof olFormatFilterEqualTo);
        if (filter1 instanceof olFormatFilterEqualTo && filter2 instanceof olFormatFilterEqualTo) {
          expect(filter1.propertyName).toBe(filter2.propertyName);
          expect(filter1.expression).toBe(filter2.expression);
        }
      }
    };

    it('creates filters', () => {
      const queryData = {
        'wfsType': 'fuel',
        'filterGroups': [
          {
            'filters': [
              {'property': 'osm_id', 'condition': '12345'},
              {'property': 'type', 'condition': ['diesel', 'gas']},
            ],
          },
          {
            'filters': [{'property': 'payment', 'condition': ['card', 'cash']}],
          },
          {
            'filters': [{'property': 'open_7_24', 'condition': '1'}],
          },
        ],
      };
      const f = olFormatFilter;
      const expectedFilters = f.or(
        f.or(
          f.and(f.equalTo('osm_id', '12345'), f.or(f.equalTo('type', 'diesel'), f.equalTo('type', 'gas'))),
          f.or(f.equalTo('payment', 'card'), f.equalTo('payment', 'cash')),
        ),
        f.equalTo('open_7_24', '1'),
      );
      expectFiltersToEqual(ngeoWfsPermalink.createFilters_(queryData['filterGroups']), expectedFilters);
    });

    it('handles 0 filter groups', () => {
      expect(ngeoWfsPermalink.createFilters_([])).toBe(null);
    });
  });
});
