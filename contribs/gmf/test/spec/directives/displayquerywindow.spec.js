goog.require('gmf.displayquerywindowDirective');

describe('gmf.displayquerywindowDirective', function() {

  let displayQueriesController;
  let ngeoQueryResult;
  let $scope;
  let $rootScope;

  beforeEach(inject(function($injector, _$controller_, _$rootScope_) {
    ngeoQueryResult = $injector.get('ngeoQueryResult');
    const $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    const data = {
      featuresStyleFn() {
        return new ol.style.Style();
      },
      selectedFeatureStyleFn() {
        return undefined;
      }
    };
    displayQueriesController = $controller(
        'GmfDisplayquerywindowController', {$scope}, data);
  }));

  describe('#show', function() {

    it('deals with no sources', function() {
      ngeoQueryResult.total = 0;
      ngeoQueryResult.sources = [];
      $rootScope.$digest();
      expect(displayQueriesController.open).toBe(false);
    });

    it('deals with a single source', function() {
      ngeoQueryResult.total = 2;
      ngeoQueryResult.sources = [{
        features: [
          new ol.Feature(),
          new ol.Feature()
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

    it('deals with multiple sources', function() {
      ngeoQueryResult.total = 5;
      ngeoQueryResult.sources = [{
        features: [
          new ol.Feature(),
          new ol.Feature()
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
          new ol.Feature(),
          new ol.Feature(),
          new ol.Feature()
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
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[2]);
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);

      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[2]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[2]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[1]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[0]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[1]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);
    });

    it('deals with selected sources', function() {
      ngeoQueryResult.total = 5;
      ngeoQueryResult.sources = [{
        features: [
          new ol.Feature(),
          new ol.Feature()
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
          new ol.Feature(),
          new ol.Feature(),
          new ol.Feature()
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
      expect(displayQueriesController.getResultLength()).toBe(3);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[2]);
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[0]);

      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[1]);
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[2]);
      displayQueriesController.next();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[0]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[2]);

      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[2]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[2]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[1]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[0]);
      displayQueriesController.previous();
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[2].features[2]);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[2]);

      // show results for all sources
      displayQueriesController.setSelectedSource(null);
      expect(displayQueriesController.getResultLength()).toBe(5);
      expect(displayQueriesController.source).toBe(ngeoQueryResult.sources[0]);
      expect(displayQueriesController.feature).toBe(ngeoQueryResult.sources[0].features[0]);
    });
  });
});
