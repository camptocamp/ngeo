goog.provide('ngeo.interaction.MeasureArea');

goog.require('ngeo.interaction.Measure');
goog.require('ol.geom.Polygon');
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
ngeo.interaction.MeasureArea = function(opt_options) {

  var options = opt_options !== undefined ? opt_options : {};

  goog.base(this, options);


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg = options.continueMsg !== undefined ? options.continueMsg :
      goog.dom.createDom(goog.dom.TagName.SPAN, {},
          'Click to continue drawing the polygon.',
          goog.dom.createDom(goog.dom.TagName.BR),
          'Double-click or click starting point to finish.');

};
goog.inherits(ngeo.interaction.MeasureArea, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureArea.prototype.createDrawInteraction = function(style,
    source) {

  return new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'Polygon',
        source: source,
        style: style
      }));

};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureArea.prototype.handleMeasure = function(callback) {
  var geom = /** @type {ol.geom.Polygon} */
      (this.sketchFeature.getGeometry());
  var proj = this.getMap().getView().getProjection();
  var dec = this.decimals;
  var output = ngeo.interaction.Measure.getFormattedArea(geom, proj, dec);
  var verticesCount = geom.getCoordinates()[0].length;
  var coord = null;
  if (verticesCount > 2) {
    coord = geom.getInteriorPoint().getCoordinates();
  }
  callback(output, coord);
};
