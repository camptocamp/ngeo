import olStyleStyle from 'ol/style/Style.js';
import olFeature from 'ol/Feature.js';

describe('gmf.query.windowComponent', () => {

  let displayQueriesController;
  let ngeoQueryResult;
  let $element;
  let $scope;
  let $rootScope;

  beforeEach(angular.mock.inject((_$controller_, _$rootScope_, _ngeoQueryResult_) => {
    ngeoQueryResult = _ngeoQueryResult_;
    const $controller = _$controller_;
    $element = angular.element('<div></div>');
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    const data = {
      featuresStyleFn() {
        return new olStyleStyle();
      },
      selectedFeatureStyleFn() {
        return undefined;
      }
    };
    displayQueriesController = $controller(
      'GmfDisplayquerywindowController', {$element, $scope}, data);
  }));

  describe('#show', () => {

    it('deals with no sources', () => {
      ngeoQueryResult.total = 0;
      ngeoQueryResult.sources = [];
      $rootScope.$digest();
      expect(displayQueriesController.open).toBe(false);
    });

    it('deals with a single source', () => {
      ngeoQueryResult.total = 2;
      ngeoQueryResult.sources = [{
        features: [
          new olFeature({
            foo: 'bar'
          }),
          new olFeature({
            bar: 'baz'
          })
        ],
        id: 123,
        label: 'Test',
        pending: false,
        queried: true
      }];
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
      ngeoQueryResult.sources = [{
        features: [
          new olFeature({
            foo: 'bar'
          }),
          new olFeature({
            bar: 'baz'
          })
        ],
        id: 123,
        label: 'Test 1',
        pending: false,
        queried: true
      }, {
        features: [],
        id: 234,
        label: 'Test 2',
        pending: false,
        queried: true
      }, {
        features: [
          new olFeature({
            foo: 'bar'
          }),
          new olFeature(),
          new olFeature({
            bar: 'baz'
          })
        ],
        id: 345,
        label: 'Test 3',
        pending: false,
        queried: true
      }];
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
      ngeoQueryResult.sources = [{
        features: [
          new olFeature({
            foo: 'bar'
          }),
          new olFeature({
            bar: 'baz'
          })
        ],
        id: 123,
        label: 'Test 1',
        pending: false,
        queried: true
      }, {
        features: [],
        id: 234,
        label: 'Test 2',
        pending: false,
        queried: true
      }, {
        features: [
          new olFeature({
            foo: 'bar'
          }),
          new olFeature(),
          new olFeature({
            bar: 'baz'
          })
        ],
        id: 345,
        label: 'Test 3',
        pending: false,
        queried: true
      }];
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
  });
});
