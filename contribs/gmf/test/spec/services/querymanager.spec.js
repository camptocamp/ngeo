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
  });
});
