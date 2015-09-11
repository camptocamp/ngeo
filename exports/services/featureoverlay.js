goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');

goog.exportProperty(
    ngeo.FeatureOverlayMgr.prototype,
    'init',
    ngeo.FeatureOverlayMgr.prototype.init);

goog.exportProperty(
    ngeo.FeatureOverlayMgr.prototype,
    'getLayer',
    ngeo.FeatureOverlayMgr.prototype.getLayer);

goog.exportProperty(
    ngeo.FeatureOverlayMgr.prototype,
    'getFeatureOverlay',
    ngeo.FeatureOverlayMgr.prototype.getFeatureOverlay);

goog.exportProperty(
    ngeo.FeatureOverlay.prototype,
    'addFeature',
    ngeo.FeatureOverlay.prototype.addFeature);

goog.exportProperty(
    ngeo.FeatureOverlay.prototype,
    'removeFeature',
    ngeo.FeatureOverlay.prototype.removeFeature);

goog.exportProperty(
    ngeo.FeatureOverlay.prototype,
    'clear',
    ngeo.FeatureOverlay.prototype.clear);

goog.exportProperty(
    ngeo.FeatureOverlay.prototype,
    'setFeatures',
    ngeo.FeatureOverlay.prototype.setFeatures);

goog.exportProperty(
    ngeo.FeatureOverlay.prototype,
    'setStyle',
    ngeo.FeatureOverlay.prototype.setStyle);
