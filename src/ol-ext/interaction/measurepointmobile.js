goog.provide('ngeo.interaction.MeasurePointMobile');

goog.require('ngeo.interaction.Measure');
goog.require('ngeo.interaction.MobileDraw');
goog.require('ol.geom.Point');


/**
 * @classdesc
 * Interaction dedicated to measure by coordinate (point) on mobile devices.
 *
 * @constructor
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 * @export
 */
ngeo.interaction.MeasurePointMobile = function(opt_options) {

  var options = opt_options !== undefined ? opt_options : {};

  goog.object.extend(options, {displayHelpTooltip: false});

  ngeo.interaction.Measure.call(this, options);

};
ol.inherits(ngeo.interaction.MeasurePointMobile, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasurePointMobile.prototype.createDrawInteraction = function(
    style, source) {
  return new ngeo.interaction.MobileDraw({
    'type': /** @type {ol.geom.GeometryType<string>} */ ('Point'),
    'style': style,
    'source': source
  });
};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasurePointMobile.prototype.handleMeasure = function(
    callback) {
  var geom = /** @type {ol.geom.Point} */
      (this.sketchFeature.getGeometry());
  var proj = this.getMap().getView().getProjection();
  var dec = this.decimals;
  var output = ngeo.interaction.Measure.getFormattedPoint(geom, proj, dec);
  var coord = geom.getLastCoordinate();
  callback(output, coord);
};
