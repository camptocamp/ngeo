goog.provide('gmf.source.Swisstopo');

goog.require('ol.Attribution');
goog.require('ol.source.WMTS');
goog.require('ol.tilegrid.WMTS');


/**
 * @const {!Array.<number>}
 * @private
 */
gmf.source.SwisstopoResolutions_ = [
  4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
  1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5
];


/**
 * @const {ol.tilegrid.WMTS}
 * @private
 */
gmf.source.SwisstopoTileGrid_ = new ol.tilegrid.WMTS({
  extent: [420000, 30000, 900000, 350000],
  resolutions: gmf.source.SwisstopoResolutions_,
  matrixIds: gmf.source.SwisstopoResolutions_.map(function(value, index) {
    return String(index);
  })
});


/**
 * Layer source for the Swisstopo tile server.
 * WARNING: This tile server is not publicly available: you have to be
 *          registered by Swisstopo to use the service.
 * @see https://api3.geo.admin.ch/services/sdiservices.html#wmts
 *
 * @constructor
 * @extends {ol.source.WMTS}
 * @param {gmfx.source.SwisstopoOptions} options WMTS options.
 */
gmf.source.Swisstopo = function(options) {

  var format = options.format ? options.format : 'png';

  goog.base(this, {
    attributions: [gmf.source.Swisstopo.ATTRIBUTION_],
    url: 'https://wmts{5-9}.geo.admin.ch/1.0.0/{Layer}/default/{Time}' +
        '/21781/{TileMatrix}/{TileRow}/{TileCol}.' + format,
    dimensions: {
      'Time': options.timestamp
    },
    projection: 'EPSG:21781',
    requestEncoding: 'REST',
    layer: options.layer,
    style: 'default',
    matrixSet: '21781',
    format: 'image/' + format,
    tileGrid: gmf.source.SwisstopoTileGrid_
  });
};
goog.inherits(gmf.source.Swisstopo, ol.source.WMTS);


/**
 * @const {ol.Attribution}
 * @private
 */
gmf.source.Swisstopo.ATTRIBUTION_ = new ol.Attribution({
  html: '&copy; <a href="http://www.swisstopo.admin.ch">swisstopo</a>'
});
