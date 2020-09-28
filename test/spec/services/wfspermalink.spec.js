// The MIT License (MIT)
//
// Copyright (c) 2016-2020 Camptocamp SA
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
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import * as olProj from 'ol/proj.js';
import * as olFormatFilter from 'ol/format/filter.js';
import olFormatFilterEqualTo from 'ol/format/filter/EqualTo.js';
import olFormatFilterLogicalNary from 'ol/format/filter/LogicalNary.js';
import {WfsPermalinkService} from 'ngeo/statemanager/WfsPermalink.js';
import ngeoTestDataMsGMLOutputFuel from '../data/msGMLOutputFuel.js';

describe('ngeo.statemanager.WfsPermalink', () => {
  /** @type {import('ngeo/statemanager/WfsPermalink.js').WfsPermalinkService} */
  let ngeoWfsPermalink;
  /** @type {import('ngeo/query/MapQuerent.js').QueryResult} */
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
          'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy'
        );
        $provide.value('ngeoWfsPermalinkOptions', {
          wfsTypes: [{featureType: 'fuel'}, {featureType: 'highway'}],
          defaultFeatureNS: 'http://mapserver.gis.umn.edu/mapserver',
          defaultFeaturePrefix: 'ms',
        });
      }
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
    /** @type {import('ol/Map.js').default} */
    let map;

    beforeEach(() => {
      const url = 'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy';
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

  describe('#createFilters_', () => {
    /**
     * @param {import("ol/format/filter/Filter.js").default} filter1
     * @param {import("ol/format/filter/Filter.js").default} filter2
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
          f.or(f.equalTo('payment', 'card'), f.equalTo('payment', 'cash'))
        ),
        f.equalTo('open_7_24', '1')
      );
      expectFiltersToEqual(ngeoWfsPermalink.createFilters_(queryData['filterGroups']), expectedFilters);
    });

    it('handles 0 filter groups', () => {
      expect(ngeoWfsPermalink.createFilters_([])).toBe(null);
    });
  });
});
