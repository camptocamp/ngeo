goog.provide('ngeo.interaction.MeasureLength');

goog.require('ngeo.interaction.Measure');
goog.require('ol.geom.LineString');
goog.require('ol.interaction.Draw');


/**
 * @classdesc
 * Interaction dedicated to measure length.
 *
 * See our live example: [../examples/measure.html](../examples/measure.html)
 *
 * @constructor
 * @struct
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.unitPrefix} format The format function
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 * @export
 */
ngeo.interaction.MeasureLength = function(format, opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  ngeo.interaction.Measure.call(this, options);


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg;
  if (options.continueMsg !== undefined) {
    this.continueMsg = options.continueMsg;
  } else {
    this.continueMsg = document.createElement('span');
    this.continueMsg.textContent = 'Click to continue drawing the line.';
    const br = document.createElement('br');
    br.textContent = 'Double-click or click last point to finish.';
    this.continueMsg.append(br);
  }

  /**
   * The format function
   * @type {ngeox.unitPrefix}
   */
  this.format = format;

};
ol.inherits(ngeo.interaction.MeasureLength, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureLength.prototype.createDrawInteraction = function(style,
    source) {

  return new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'LineString',
        source,
        style
      }));

};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureLength.prototype.handleMeasure = function(callback) {
  const geom = /** @type {ol.geom.LineString} */
      (this.sketchFeature.getGeometry());
  const proj = this.getMap().getView().getProjection();
  const dec = this.decimals;
  const output = ngeo.interaction.Measure.getFormattedLength(geom, proj, dec, this.format);
  const coord = geom.getLastCoordinate();
  callback(output, coord);
};
