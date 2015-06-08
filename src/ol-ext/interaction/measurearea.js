goog.provide('ngeo.interaction.MeasureArea');

goog.require('ngeo.interaction.Measure');
goog.require('ol.geom.Polygon');
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
ngeo.interaction.MeasureArea = function(opt_options) {

  var options = goog.isDef(opt_options) ? opt_options : {};

  goog.base(this, options);


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg = goog.isDef(options.continueMsg) ? options.continueMsg :
      goog.dom.createDom(goog.dom.TagName.SPAN, {},
          'Click to continue drawing the polygon.',
          goog.dom.createDom(goog.dom.TagName.BR),
          'Double-click or click starting point to finish.');

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
  var coord = null;
  if (verticesCount > 2) {
    coord = geom.getInteriorPoint().getCoordinates();
  }
  callback(output, coord);
};


/**
 * Format measure output.
 * @param {ol.geom.Polygon} polygon
 * @return {string}
 * @private
 */
ngeo.interaction.MeasureArea.prototype.formatMeasure_ = function(polygon) {
  var map = this.getMap();
  var sourceProj = map.getView().getProjection();
  var geom = /** @type {ol.geom.Polygon} */ (polygon.clone().transform(
      sourceProj, 'EPSG:4326'));
  var coordinates = geom.getLinearRing(0).getCoordinates();
  var area = Math.abs(ol.sphere.WGS84.geodesicArea(coordinates));
  var output;
  if (area > 1000000) {
    output = parseFloat((area / 1000000).toPrecision(3)) +
        ' ' + 'km<sup>2</sup>';
  } else {
    output = parseFloat(area.toPrecision(3)) + ' ' + 'm<sup>2</sup>';
  }
  return output;
};
