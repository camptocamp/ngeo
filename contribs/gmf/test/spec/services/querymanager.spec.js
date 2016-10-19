/* global themes */
goog.require('gmf.Themes');
goog.require('gmf.QueryManager');
goog.require('gmf.test.data.themes');

describe('gmf.QueryManager', function() {
  var queryManager;
  var gmfThemes;
  var $httpBackend;

  beforeEach(function() {
    module('ngeo', function($provide) {
      $provide.value('ngeoQueryOptions', {});
    });
    inject(function($injector) {
      queryManager = $injector.get('gmfQueryManager');
      queryManager.sources_.length = 0;
      gmfThemes = $injector.get('gmfThemes');
      var treeUrl = $injector.get('gmfTreeUrl');
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', treeUrl + '?cache_version=0').respond(themes);
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var getSourceById = function(sources, id) {
    var results = $.grep(sources, function(source) {
      return source.id === id;
    });
    return (results.length > 0) ? results[0] : null;
  };

  describe('#handleThemesLoad_', function() {
    it('Creates sources when the themes are loaded', function() {
      gmfThemes.loadThemes();
      $httpBackend.flush();
      expect(queryManager.sources_.length).toBeGreaterThan(0);

      // overlay layer
      var osmSource = getSourceById(queryManager.sources_, 109);
      expect(osmSource).not.toBeNull();

      // background layer
      var bgLayerSource = getSourceById(queryManager.sources_, 115);
      expect(bgLayerSource).not.toBeNull();
      expect(bgLayerSource.params.LAYERS).toBe('ch.swisstopo.dreiecksvermaschung');
      expect(bgLayerSource.url).toBe('https://wms.geo.admin.ch?lang=fr');
    });
  });

  describe('#createSources_', function() {
    it('Creates sources on queryable layers with WFS support', function() {
      var osmTheme = gmf.Themes.findThemeByName(themes.themes, 'OSM');
      var firstLevelGroup = osmTheme.children[3]; // OSM Function
      queryManager.createSources_(firstLevelGroup, firstLevelGroup, themes.ogcServers);
      var children, osmSource;

      // Child 0 (osm_time) is queryable and has wfs support.
      children = firstLevelGroup.children[0]; // osm_time
      osmSource = getSourceById(queryManager.sources_, children.id);
      expect(osmSource.params.LAYERS).toBe('osm_time');
      expect(osmSource.wfsQuery).toBe(true);

      // Child 8 (srtm) is not queryable
      children = firstLevelGroup.children[8];
      osmSource = getSourceById(queryManager.sources_, children.id);
      expect(children.childLayers[0].queryable).toBe(false);
      expect(osmSource).toBeNull();
    });

    it('Creates sources on queryable layer without WFS support', function() {
      var osmTheme = gmf.Themes.findThemeByName(themes.themes, 'Cadastre');
      var firstLevelGroup = osmTheme.children[0]; // 'Cadastre'
      queryManager.createSources_(firstLevelGroup, firstLevelGroup, themes.ogcServers);
      var osmSource = getSourceById(queryManager.sources_, 115);
      expect(osmSource.params.LAYERS).toBe('ch.swisstopo.dreiecksvermaschung');
      expect(osmSource.wfsQuery).toBe(false);
    });

    it('Creates a source for queryable WMTS overlay layers', function() {
      var cadasterTheme = gmf.Themes.findThemeByName(themes.themes, 'Cadastre');
      cadasterTheme.children.forEach(function(group) {
        queryManager.createSources_(group, group, themes.ogcServers);
      });

      // layer 'non-queryable-wmts-layer' without `wmsUrl`
      var sourceNonQueryable = getSourceById(queryManager.sources_, 91346);
      expect(sourceNonQueryable).toBeNull();

      // layer with `wmsUrl` and `wmsLayers` and 'ch.astra.ausnahmetransportrouten.queryLayers'
      // `queryLayers`. (`queryLayers` takes precedence over `wmsLayers`)
      var sourceAlpConvention = getSourceById(queryManager.sources_, 115);
      expect(sourceAlpConvention).not.toBeNull();
      expect(sourceAlpConvention.params.LAYERS).toBe('ch.swisstopo.dreiecksvermaschung');

      // layer 'ch.astra.ausnahmetransportrouten' with `wmsUrl` and `queryLayers`
      var sourceRoutes = getSourceById(queryManager.sources_, 116);
      expect(sourceRoutes).not.toBeNull();
      expect(sourceRoutes.params.LAYERS).toBe('ch.swisstopo.geologie-gravimetrischer_atlas');
    });

    // FIXME no data to run this test
    //it('creates a source for bg. WMTS layers with ogcServer', function() {
    //  var node = themes.background_layers[2];
    //  console.log(node);
    //  queryManager.createSources_(node, node, themes.ogcServers);

    //  // layer 'asitvd.fond_couleur'
    //  console.log(queryManager.sources_);
    //  var source = getSourceById(queryManager.sources_, 133);
    //  expect(source).not.toBeNull();
    //  expect(source.params.LAYERS).toBe('ch.astra.ausnahmetransportrouten');
    //  expect(source.url).toBe('https://geomapfish-demo.camptocamp.net/2.1/wsgi/mapserv_proxy?');
    //});
  });
});
