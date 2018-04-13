goog.provide('ngeo.interaction.MeasureLength');

goog.require('goog.asserts');
goog.require('ngeo.interaction.Measure');
goog.require('ol');
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
 * @param {!ngeox.unitPrefix} format The format function
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeox.interaction.MeasureOptions=} options Options
 */
ngeo.interaction.MeasureLength = function(format, gettextCatalog, options = /** @type {ngeox.interaction.MeasureOptions} */({})) {

  ngeo.interaction.Measure.call(this, /** @type {ngeo.interaction.MeasureBaseOptions} */ (options));


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg;
  if (options.continueMsg !== undefined) {
    this.continueMsg = options.continueMsg;
  } else {
    this.continueMsg = document.createElement('span');
    this.continueMsg.textContent = gettextCatalog.getString('Click to continue drawing the line.');
    const br = document.createElement('br');
    br.textContent = gettextCatalog.getString('Double-click or click last point to finish.');
    this.continueMsg.appendChild(br);
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
ngeo.interaction.MeasureLength.prototype.createDrawInteraction = function(style, source) {
  return new ol.interaction.Draw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    source: source,
    style: style
  });
};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureLength.prototype.handleMeasure = function(callback) {
  const geom = goog.asserts.assertInstanceof(this.sketchFeature.getGeometry(), ol.geom.LineString);
  const proj = this.getMap().getView().getProjection();
  goog.asserts.assert(proj);
  const output = ngeo.interaction.Measure.getFormattedLength(geom, proj, this.precision, this.format);
  const coord = geom.getLastCoordinate();
  callback(output, coord);
};
