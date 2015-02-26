goog.provide('ngeo.interaction.MeasureArea');

goog.require('ngeo.interaction.Measure');
goog.require('ol.geom.Polygon');
goog.require('ol.interaction.Draw');



/**
 * @classdesc
 * Interaction dedicated to measure length.
 *
 * @constructor
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 */
ngeo.interaction.MeasureArea = function(opt_options) {

  var options = goog.isDef(opt_options) ? opt_options : {};

  goog.base(this, options);


  /**
   * Message to show after the first point is clicked.
   * @type {string}
   * @private
   */
  this.continueMsg_ = goog.isDef(options.continueMsg) ? options.continueMsg :
      'Click to continue drawing the polygon<br>' +
      'Double-click or click starting point to finish';

};
goog.inherits(ngeo.interaction.MeasureArea, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureArea.prototype.getDrawInteraction = function(style,
    overlay) {

  return new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'Polygon',
        features: overlay.getFeatures(),
        style: style
      }));

};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureArea.prototype.handleMeasure = function(callback) {
  var geom = /** @type {ol.geom.Polygon} */
      (this.sketchFeature.getGeometry());
  var output = this.formatMeasure_(geom);
  var verticesCount = geom.getCoordinates()[0].length;
  var helpMsg = this.continueMsg_;
  var coord = null;
  if (verticesCount > 2) {
    coord = geom.getInteriorPoint().getCoordinates();
  }
  callback(output, coord, helpMsg);
};


/**
 * Format measure output.
 * @param {ol.geom.Polygon} polygon
 * @return {string}
 * @private
 */
ngeo.interaction.MeasureArea.prototype.formatMeasure_ = function(polygon) {
  var area = polygon.getArea();
  var output;
  if (area > 10000) {
    output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
  } else {
    output = (Math.round(area * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
  }
  return output;
};
