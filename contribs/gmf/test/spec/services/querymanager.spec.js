goog.require('gmf.QueryManager');

describe('gmf.QueryManager', function() {
  var queryManager;

  beforeEach(function() {
    module('ngeo', function($provide) {
      $provide.value('ngeoQueryOptions', {});
    });
    inject(function($injector) {
      queryManager = $injector.get('gmfQueryManager');
    });
  });

  describe('#createSources_', function () {
    var getSourceById = function(sources, id) {
      var results = $.grep(sources, function(source) {
        return source.id === id;
      });
      return (results.length > 0) ? results[0] : null;
    };

    it('creates a source only with queryable child layers', function () {
      queryManager.sources_.length = 0;
      var osmTheme = gmf.Themes.findThemeByName(themes.themes, 'OSM');
      queryManager.createSources_(osmTheme);
      var osmSource = getSourceById(queryManager.sources_, 109);
      // hotel is ignored because `queryable` is `0`
      var expectedLayers =
          'fuel,information,cinema,alpine_hut,bus_stop,cafe,parking,' +
          'police,post_office,restaurant,bank,place_of_worship';
      expect(osmSource.params.LAYERS).toBe(expectedLayers);
    });

    it('creates a source for queryable WMTS overlay layers', function () {
      queryManager.sources_.length = 0;
      var cadasterTheme = gmf.Themes.findThemeByName(themes.themes, 'Cadastre');
      queryManager.createSources_(cadasterTheme);

      // layer 'non-queryable-wmts-layer' without `wmsUrl`
      var sourceNonQueryable = getSourceById(queryManager.sources_, 91346);
      expect(sourceNonQueryable).toBeNull();

      // layer 'ch.are.alpenkonvention' with `wmsUrl` and `wmsLayers` and `queryLayers`
      // (`wmsLayers` takes precedence over `queryLayers`)
      var sourceAlpConvention = getSourceById(queryManager.sources_, 119);
      expect(sourceAlpConvention).toBeDefined();
      expect(sourceAlpConvention.params.LAYERS).toBe('ch.are.alpenkonvention');

      // layer 'ch.astra.ausnahmetransportrouten' with `wmsUrl` and `queryLayers`
      var sourceRoutes = getSourceById(queryManager.sources_, 120);
      expect(sourceRoutes).toBeDefined();
      expect(sourceRoutes.params.LAYERS).toBe('ch.astra.ausnahmetransportrouten');
    });
  });
});
