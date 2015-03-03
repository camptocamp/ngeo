goog.provide('ngeo.interaction.MeasureLength');

goog.require('ngeo.interaction.Measure');
goog.require('ol.geom.LineString');
goog.require('ol.interaction.Draw');
goog.require('ol.sphere.WGS84');



/**
 * @classdesc
 * Interaction dedicated to measure length.
 *
 * @constructor
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 */
ngeo.interaction.MeasureLength = function(opt_options) {

  var options = goog.isDef(opt_options) ? opt_options : {};

  goog.base(this, options);


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   * @private
   */
  this.continueMsg_ = goog.isDef(options.continueMsg) ? options.continueMsg :
      goog.dom.createDom(goog.dom.TagName.SPAN, {},
          'Click to continue drawing the line.',
          goog.dom.createDom(goog.dom.TagName.BR),
          'Double-click or click last point to finish.');

};
goog.inherits(ngeo.interaction.MeasureLength, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureLength.prototype.getDrawInteraction = function(style,
    overlay) {

  return new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'LineString',
        features: overlay.getFeatures(),
        style: style
      }));

};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureLength.prototype.handleMeasure = function(callback) {
  var geom = /** @type {ol.geom.LineString} */
      (this.sketchFeature.getGeometry());
  var output = this.formatMeasure_(geom);
  var coord = geom.getLastCoordinate();
  callback(output, coord, this.continueMsg_);
};


/**
 * Format measure output.
 * @param {ol.geom.LineString} line
 * @return {string}
 * @private
 */
ngeo.interaction.MeasureLength.prototype.formatMeasure_ = function(line) {
  var length = 0;
  var map = this.getMap();
  var sourceProj = map.getView().getProjection();
  var coordinates = line.getCoordinates();
  for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
    var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
    var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
    length += ol.sphere.WGS84.haversineDistance(c1, c2);
  }
  var output;
  if (length > 1000) {
    output = parseFloat((length / 1000).toPrecision(3)) +
        ' ' + 'km';
  } else {
    output = parseFloat(length.toPrecision(3)) +
        ' ' + 'm';
  }
  return output;
};
