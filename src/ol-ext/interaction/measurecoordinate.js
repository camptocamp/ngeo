goog.provide('ngeo.interaction.MeasureCoordinate');

goog.require('ngeo.interaction.Measure');
goog.require('ol.coordinate');
goog.require('ol.interaction.Draw');



/**
 * @constructor
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 */
ngeo.interaction.MeasureCoordinate = function(opt_options) {
  var options = goog.isDef(opt_options) ? opt_options : {};

  goog.base(this, options);
};
goog.inherits(ngeo.interaction.MeasureCoordinate, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureCoordinate.prototype.getDrawInteraction =
    function(style, source) {

  return new ol.interaction.Draw(/** @type {olx.interaction.DrawOptions} */ ({
    type: 'Point',
    source: source,
    style: style
  }));
};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureCoordinate.prototype.handleMeasureEnd =
    function(callback) {
  var geom = /** @type {ol.geom.Point} */ (this.sketchFeature.getGeometry());
  var coordinates = geom.getCoordinates();

  callback(ol.coordinate.format(coordinates, '{x} / {y}'), coordinates);
};
