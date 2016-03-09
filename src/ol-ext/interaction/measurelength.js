goog.provide('ngeo.interaction.MeasureLength');

goog.require('ngeo.interaction.Measure');
goog.require('ol.geom.LineString');
goog.require('ol.interaction.Draw');


/**
 * @classdesc
 * Interaction dedicated to measure length.
 *
 * See our live example: {@link ../examples/measure.html}
 *
 * @constructor
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 */
ngeo.interaction.MeasureLength = function(opt_options) {

  var options = opt_options !== undefined ? opt_options : {};

  goog.base(this, options);


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg = options.continueMsg !== undefined ? options.continueMsg :
      goog.dom.createDom(goog.dom.TagName.SPAN, {},
          'Click to continue drawing the line.',
          goog.dom.createDom(goog.dom.TagName.BR),
          'Double-click or click last point to finish.');

};
goog.inherits(ngeo.interaction.MeasureLength, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureLength.prototype.createDrawInteraction = function(style,
    source) {

  return new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'LineString',
        source: source,
        style: style
      }));

};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureLength.prototype.handleMeasure = function(callback) {
  var geom = /** @type {ol.geom.LineString} */
      (this.sketchFeature.getGeometry());
  var proj = this.getMap().getView().getProjection();
  var dec = this.decimals;
  var output = ngeo.interaction.Measure.getFormattedLength(geom, proj, dec);
  var coord = geom.getLastCoordinate();
  callback(output, coord);
};
