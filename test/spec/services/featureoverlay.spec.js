goog.require('ngeo.FeatureOverlayMgr');

describe('ngeo.FeatureOverlayMgr', function() {
  var ngeoFeatureOverlayMgr;
  var map;
  var layer;

  beforeEach(function() {
    map = new ol.Map({});

    inject(function($injector) {
      ngeoFeatureOverlayMgr = $injector.get('ngeoFeatureOverlayMgr');
      ngeoFeatureOverlayMgr.init(map);
      layer = ngeoFeatureOverlayMgr.getLayer();
    });
  });

  it('creates an unmanaged layer', function() {
    expect(map.getLayers().getLength()).toBe(0);
    expect(layer).toBeDefined();
  });

  it('adds and removes features', function() {
    var overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
    var feature = new ol.Feature();
    overlay.addFeature(feature);
    expect(layer.getSource().getFeatures().length).toBe(1);

    overlay.removeFeature(feature);
    expect(layer.getSource().getFeatures().length).toBe(0);
  });

  it('removes all the features', function() {
    var overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
    var feature = new ol.Feature();
    overlay.addFeature(feature);
    overlay.clear();
    expect(layer.getSource().getFeatures().length).toBe(0);
  });

  it('doesn\'t remove features from other overlays', function() {
    var overlay1 = ngeoFeatureOverlayMgr.getFeatureOverlay();
    var feature1 = new ol.Feature();
    overlay1.addFeature(feature1);

    var overlay2 = ngeoFeatureOverlayMgr.getFeatureOverlay();
    var feature2 = new ol.Feature();
    overlay2.addFeature(feature2);

    expect(layer.getSource().getFeatures().length).toBe(2);

    overlay2.clear();

    expect(layer.getSource().getFeatures().length).toBe(1);
  });

  it('correctly sets styles', function() {
    var overlay1 = ngeoFeatureOverlayMgr.getFeatureOverlay();
    var style1 = new ol.style.Style();
    overlay1.setStyle(style1);

    var overlay2 = ngeoFeatureOverlayMgr.getFeatureOverlay();
    var style2 = new ol.style.Style();
    overlay2.setStyle(style2);

    var feature1 = new ol.Feature();
    overlay1.addFeature(feature1);

    var feature2 = new ol.Feature();
    overlay2.addFeature(feature2);

    var styleFunction = ngeoFeatureOverlayMgr.getLayer().getStyleFunction();

    var resolution = 1;
    var styles;

    styles = styleFunction(feature1, resolution);
    expect(styles.length).toEqual(1);
    expect(styles[0]).toBe(style1);

    styles = styleFunction(feature2, resolution);
    expect(styles.length).toEqual(1);
    expect(styles[0]).toBe(style2);
  });
});
