goog.provide('ngeo.source.Swisstopo');

goog.require('ol.Attribution');
goog.require('ol.source.WMTS');
goog.require('ol.tilegrid.WMTS');


/**
 * @const {!Array.<number>}
 * @private
 */
ngeo.source.SwisstopoResolutions_ = [
  4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
  1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5
];


/**
 * @const {ol.tilegrid.WMTS}
 * @private
 */
ngeo.source.SwisstopoTileGrid2056_ = new ol.tilegrid.WMTS({
  extent: [1420000, 130000, 1900000, 1350000],
  resolutions: ngeo.source.SwisstopoResolutions_,
  matrixIds: ngeo.source.SwisstopoResolutions_.map(function(value, index) {
    return String(index);
  })
});


/**
 * @const {ol.tilegrid.WMTS}
 * @private
 */
ngeo.source.SwisstopoTileGrid21781_ = new ol.tilegrid.WMTS({
  extent: [420000, 30000, 900000, 350000],
  resolutions: ngeo.source.SwisstopoResolutions_,
  matrixIds: ngeo.source.SwisstopoResolutions_.map(function(value, index) {
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
 * @param {ngeox.source.SwisstopoOptions} options WMTS options.
 * @export
 */
ngeo.source.Swisstopo = function(options) {

  var format = options.format ? options.format : 'png';
  var projection = (options.projection || 'EPSG:21781').toUpperCase();
  var tilegrid = projection === 'EPSG:21781' ? ngeo.source.SwisstopoTileGrid21781_ :
    ngeo.source.SwisstopoTileGrid2056_;

  ol.source.WMTS.call(this, {
    attributions: [ngeo.source.Swisstopo.ATTRIBUTION_],
    url: 'https://wmts{5-9}.geo.admin.ch/1.0.0/{Layer}/default/{Time}' +
        '/' + projection + '/{TileMatrix}/{TileRow}/{TileCol}.' + format,
    dimensions: {
      'Time': options.timestamp
    },
    projection: projection,
    requestEncoding: 'REST',
    layer: options.layer,
    style: 'default',
    matrixSet: projection.split(':')[1],
    format: 'image/' + format,
    tileGrid: tilegrid
  });
};
ol.inherits(ngeo.source.Swisstopo, ol.source.WMTS);


/**
 * @const {ol.Attribution}
 * @private
 */
ngeo.source.Swisstopo.ATTRIBUTION_ = new ol.Attribution({
  html: '&copy; <a href="http://www.swisstopo.admin.ch">swisstopo</a>'
});
