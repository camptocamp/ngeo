goog.provide('gmf.SnappingHandler');

goog.require('goog.net.XhrIo');
goog.require('ol.interaction.Snap');
goog.require('ol.format.WFS');


/**
 * @classdesc
 * Events emitted by {@link ngeo.Menu} instances are instances of this type.
 *
 * @constructor
 * @param {gmfx.SnappableItem} item Snapping item containing all
 *     required configurations to do the snapping.
 */
gmf.SnappingHandler = function(item) {

  /**
   * @type {gmfx.SnappableItem}
   * @private
   */
  this.item_ = item;

  /**
   * @type {string}
   * @private
   */
  this.featureNS_ = 'http://mapserver.gis.umn.edu/mapserver';

  /**
   * @type {string}
   * @private
   */
  this.featurePrefix_ = 'feature';

  /**
   * @type {string}
   * @private
   */
  this.geometryName_ = 'the_geom';

  /**
   * @type {number}
   * @private
   */
  this.maxFeatures_ = 50;

  /**
   * @type {?ol.Map}
   * @private
   */
  this.map_ = null;

  /**
   * @type {?ol.interaction.Snap}
   * @private
   */
  this.snapInteraction_ = new ol.interaction.Snap({
    edge: item.snappingConfig.edge,
    features: this.item_.features,
    pixelTolerance: item.snappingConfig.tolerance,
    vertex: item.snappingConfig.vertex
  });

  /**
   * @type {?number}
   * @private
   */
  this.viewChangeTimerId_ = null;

};


/**
 * Bind the handler to a new map. Unbind first if there's an existing map.
 * @param {?ol.Map} map Map.
 * @export
 */
gmf.SnappingHandler.prototype.setMap = function(map) {

  // Unbind previous map
  if (this.map_) {
    this.map_.removeInteraction(this.snapInteraction_);
    //this.item_.features.clear();
    this.map_ = null;
  }

  // Bind new map
  if (map) {
    map.addInteraction(this.snapInteraction_);

    var view = map.getView();
    ol.events.listen(
      view,
      ol.Object.getChangeEventType(ol.View.Property.CENTER),
      this.handleViewChange_,
      this
    );
    ol.events.listen(
      view,
      ol.Object.getChangeEventType(ol.View.Property.RESOLUTION),
      this.handleViewChange_,
      this
    );

    this.map_ = map;

    this.loadFeatures_();
  }

};


/**
 * Called when the view of the map changes. Load the features.
 * @private
 */
gmf.SnappingHandler.prototype.handleViewChange_ = function() {
  if (this.viewChangeTimerId_ !== null) {
    clearTimeout(this.viewChangeTimerId_);
    this.viewChangeTimerId_ = null;
  }
  this.viewChangeTimerId_ = setTimeout(this.loadFeatures_.bind(this), 400);
};


/**
 * Load features using current map view settings.
 * @private
 */
gmf.SnappingHandler.prototype.loadFeatures_ = function() {
  var map = this.map_;
  var view = map.getView();
  var size = map.getSize();
  goog.asserts.assert(size);

  var extent = view.calculateExtent(size);
  var projCode = view.getProjection().getCode();
  var featureTypes = this.item_.wfsConfig.featureTypes.split(',');

  var getFeatureOptions = {
    srsName: projCode,
    featureNS: this.featureNS_,
    featurePrefix: this.featurePrefix_,
    featureTypes: featureTypes,
    outputFormat: 'GML3',
    bbox: extent,
    geometryName: this.geometryName_,
    maxFeatures: this.maxFeatures_
  };

  var wfsFormat = new ol.format.WFS();
  var xmlSerializer = new XMLSerializer();
  var featureRequestXml = wfsFormat.writeGetFeature(getFeatureOptions);
  var featureRequest = xmlSerializer.serializeToString(featureRequestXml);
  var url = this.item_.wfsConfig.url;

  var xhr = new goog.net.XhrIo();
  goog.events.listenOnce(
    xhr,
    goog.net.EventType.COMPLETE,
    this.handleGetFeature_,
    false,
    this);

  xhr.send(url, 'POST', featureRequest);
};


/**
 * @param {goog.events.Event} event Event
 * @private
 */
gmf.SnappingHandler.prototype.handleGetFeature_ = function(event) {

  var xhr = /** @type {goog.net.XhrIo} */ (event.target);
  var responseText = xhr.getResponseText();

  console.log(responseText);
};
