goog.provide('ngeo.interaction.MeasureArea');

goog.require('goog.asserts');
goog.require('ngeo.interaction.Measure');
goog.require('ol');
goog.require('ol.geom.Polygon');
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
ngeo.interaction.MeasureArea = function(format, gettextCatalog, options = {}) {

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
    this.continueMsg.textContent = gettextCatalog.getString('Click to continue drawing the polygon.');
    const br = document.createElement('br');
    br.textContent = gettextCatalog.getString('Double-click or click starting point to finish.');
    this.continueMsg.appendChild(br);
  }

  /**
   * The format function
   * @type {ngeox.unitPrefix}
   */
  this.format = format;

};
ol.inherits(ngeo.interaction.MeasureArea, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureArea.prototype.createDrawInteraction = function(style, source) {
  return new ol.interaction.Draw({
    type: /** @type {ol.geom.GeometryType} */ ('Polygon'),
    source: source,
    style: style
  });
};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureArea.prototype.handleMeasure = function(callback) {
  const geom = goog.asserts.assertInstanceof(this.sketchFeature.getGeometry(), ol.geom.Polygon);
  const proj = this.getMap().getView().getProjection();
  goog.asserts.assert(proj);
  const output = ngeo.interaction.Measure.getFormattedArea(geom, proj, this.precision, this.format);
  const verticesCount = geom.getCoordinates()[0].length;
  let coord = null;
  if (verticesCount > 3) {
    coord = geom.getInteriorPoint().getCoordinates();
  }
  callback(output, coord);
};
