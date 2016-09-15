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
    it('creates sources when the themes are loaded', function() {
      gmfThemes.loadThemes();
      $httpBackend.flush();
      expect(queryManager.sources_.length).toBeGreaterThan(0);

      // overlay layer
      var osmSource = getSourceById(queryManager.sources_, 109);
      expect(osmSource).not.toBeNull();

      // background layer
      var bgLayerSource = getSourceById(queryManager.sources_, 134);
      expect(bgLayerSource).not.toBeNull();
      expect(bgLayerSource.params.LAYERS).toBe('ch.are.alpenkonvention');
      expect(bgLayerSource.url).toBe('https://wms.geo.admin.ch/');
    });
  });

  describe('#createSources_', function() {
    // FIXME old ways to check wfs query support
    //it('creates a source only with queryable child layers', function() {
    //  var osmTheme = gmf.Themes.findThemeByName(themes.themes, 'OSM');
    //  queryManager.createSources_(osmTheme, themes.ogcServers);
    //  var osmSource = getSourceById(queryManager.sources_, 109);
    //  // hotel is ignored because `queryable` is `0`
    //  var expectedLayers =
    //      'fuel,information,cinema,alpine_hut,bank,bus_stop,cafe,parking,' +
    //      'place_of_worship,police,post_office,restaurant,zoo';
    //  expect(osmSource.params.LAYERS).toBe(expectedLayers);
    //  expect(osmSource.wfsQuery).toBe(true);
    //});

    // FIXME
    //it('does not create sources for non-queryable layers', function() {
    //  var osmTheme = gmf.Themes.findThemeByName(themes.themes, 'OSM');
    //  queryManager.createSources_(osmTheme, themes.ogcServers);
    //  var osmScaleSource = getSourceById(queryManager.sources_, 114);
    //  // layer is ignored because `queryable` is `0`
    //  expect(osmScaleSource).toBeNull();
    //});

    // FIXME old ways to check wfs query support
    //it('handles layers w/o WFS support', function() {
    //  var osmTheme = gmf.Themes.findThemeByName(themes.themes, 'OSM');
    //  queryManager.createSources_(osmTheme, themes.ogcServers);
    //  var osmTimeSource = getSourceById(queryManager.sources_, 110);
    //  expect(osmTimeSource).not.toBeNull();
    //  // layer does not support wfs ("wfsSupport": false)
    //  expect(osmTimeSource.wfsQuery).toBe(false);
    //});

    it('creates a source for queryable WMTS overlay layers', function() {
      var cadasterTheme = gmf.Themes.findThemeByName(themes.themes, 'Cadastre');
      queryManager.createSources_(cadasterTheme, themes.ogcServers);

      // layer 'non-queryable-wmts-layer' without `wmsUrl`
      var sourceNonQueryable = getSourceById(queryManager.sources_, 91346);
      expect(sourceNonQueryable).toBeNull();

      // layer 'ch.are.alpenkonvention' with `wmsUrl` and `wmsLayers` and `queryLayers`
      // (`wmsLayers` takes precedence over `queryLayers`)
      var sourceAlpConvention = getSourceById(queryManager.sources_, 119);
      expect(sourceAlpConvention).not.toBeNull();
      expect(sourceAlpConvention.params.LAYERS).toBe('ch.are.alpenkonvention');

      // layer 'ch.astra.ausnahmetransportrouten' with `wmsUrl` and `queryLayers`
      var sourceRoutes = getSourceById(queryManager.sources_, 120);
      expect(sourceRoutes).not.toBeNull();
      expect(sourceRoutes.params.LAYERS).toBe('ch.astra.ausnahmetransportrouten');
    });

    it('creates a source for bg. WMTS layers with ogcServer', function() {
      queryManager.createSources_(themes.background_layers[1], themes.ogcServers);

      // layer 'asitvd.fond_couleur'
      var source = getSourceById(queryManager.sources_, 135);
      expect(source).not.toBeNull();
      expect(source.params.LAYERS).toBe('ch.astra.ausnahmetransportrouten');
      expect(source.url).toBe('https://geomapfish-demo.camptocamp.net/2.1/wsgi/mapserv_proxy?');
    });
  });
});
