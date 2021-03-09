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

import angular from 'angular';
import olStyleStyle from 'ol/style/Style.js';
import olFeature from 'ol/Feature.js';

describe('gmf.query.windowComponent', () => {
  /** @type {import('gmf/query/windowComponent.js').QueryWindowController} */
  let displayQueriesController;
  /** @type {import('ngeo/query/MapQuerent.js').QueryResult} */
  let ngeoQueryResult;
  let $element;
  /** @type {angular.IScope} */
  let $scope;
  /** @type {angular.IScope} */
  let $rootScope;
  /** @type {import('ngeo/statemanager/WfsPermalink.js').QueryResultSource[]} */
  let sources;

  beforeEach(
    angular.mock.inject((_$controller_, _$rootScope_, _ngeoQueryResult_) => {
      ngeoQueryResult = _ngeoQueryResult_;
      const $controller = _$controller_;
      $element = angular.element('<div></div>');
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      const data = {
        featuresStyleFn() {
          return new olStyleStyle();
        },
        /**
         * @type {function():olStyleStyle}
         */
        selectedFeatureStyleFn() {
          return undefined;
        },
      };

      sources = [
        {
          features: [
            new olFeature({
              bar: undefined,
              foo: 'bar',
              empty: undefined,
            }),
            new olFeature({
              bar: 'baz',
              empty: undefined,
            }),
          ],
          id: 123,
          label: 'Test 1',
          pending: false,
        },
        {
          features: [],
          id: 234,
          label: 'Test 2',
          pending: false,
        },
        {
          features: [
            new olFeature({
              foo: 'bar',
            }),
            new olFeature(),
            new olFeature({
              bar: 'baz',
            }),
          ],
          id: 345,
          label: 'Test 3',
          pending: false,
        },
      ];

      displayQueriesController = $controller('GmfDisplayquerywindowController', {$element, $scope}, data);
    })
  );

  describe('#show', () => {
    it('deals with no sources', () => {
      ngeoQueryResult.total = 0;
      ngeoQueryResult.sources = [];
      $rootScope.$digest();
      expect(displayQueriesController.open).toBe(false);
    });

    it('deals with a single source', () => {
      ngeoQueryResult.total = 2;
      ngeoQueryResult.sources = [sources[0]];
      $rootScope.$digest();
      expect(displayQueriesController.open).toBe(true);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);

      // toggle through features
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[1]);
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[1]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);
    });

    it('deals with multiple sources', () => {
      ngeoQueryResult.total = 5;
      ngeoQueryResult.sources = sources;
      $rootScope.$digest();
      expect(displayQueriesController.open).toBe(true);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);

      // toggle through features
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[1]);
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[0]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[2]);
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[1]);
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);

      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[1]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[2]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[0]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[1]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);
    });

    it('deals with selected sources', () => {
      ngeoQueryResult.total = 5;
      ngeoQueryResult.sources = sources;
      $rootScope.$digest();
      expect(displayQueriesController.open).toBe(true);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);

      // now select the first source
      displayQueriesController.setSelectedSource(ngeoQueryResult.sources[0]);
      expect(displayQueriesController.getResultLength()).toBe(2);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);

      // toggle through features
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[1]);
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);

      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[1]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);

      // try to select the 2nd source with no results
      displayQueriesController.setSelectedSource(ngeoQueryResult.sources[1]);
      // first source should still be selected
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);

      // select the 3rd source
      displayQueriesController.setSelectedSource(ngeoQueryResult.sources[2]);
      expect(displayQueriesController.getResultLength()).toBe(2);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[2]);
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[0]);

      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[1]);
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[0]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[2]);

      displayQueriesController.previous();
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[2]);
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[1]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[0]);
      displayQueriesController.previous();

      // show results for all sources
      displayQueriesController.setSelectedSource(null);
      expect(displayQueriesController.getResultLength()).toBe(4);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);
    });

    it('Get csv data', () => {
      expect(displayQueriesController.getCSVData_(null)).toBeUndefined();

      // @ts-ignore
      expect(displayQueriesController.getCSVData_({features: []})).toBeUndefined();

      expect(displayQueriesController.getCSVData_(sources[0])).toEqual([
        {bar: undefined, foo: 'bar', empty: undefined},
        {bar: 'baz', empty: undefined},
      ]);
    });

    it('Get csv header définition', () => {
      expect(displayQueriesController.getCSVHeaderDefinition_(null)).toBeUndefined();

      const data = [
        // @ts-ignore
        {bar: undefined, foo: 'bar', empty: undefined},
        // @ts-ignore
        {bar: 'baz', empty: undefined},
      ];
      expect(displayQueriesController.getCSVHeaderDefinition_(data)).toEqual([{name: 'foo'}, {name: 'bar'}]);
    });
  });
});
