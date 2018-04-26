/**
 * @module ngeo.source.Swisstopo
 */
import googAsserts from 'goog/asserts.js';
import olSourceWMTS from 'ol/source/WMTS.js';
import olTilegridWMTS from 'ol/tilegrid/WMTS.js';


/**
 * Available resolutions as defined in
 * http://api3.geo.admin.ch/services/sdiservices.html#wmts.
 * @const {!Array.<number>}
 */
const swisstopoResolutions = [
  4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
  1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5,
  0.25, 0.1
];


/**
 * The matrix set is is constructed by passing the matrix set defined in the
 * table at http://api3.geo.admin.ch/services/sdiservices.html#wmts.
 * @param {number} level The zoomlevel
 * @return {!Array.<string>} matrix set.
 */
const createSwisstopoMatrixSet = function(level) {
  googAsserts.assert(level < swisstopoResolutions.length);
  const matrixSet = new Array(level);
  for (let i = 0; i <= level; ++i) {
    matrixSet[i] = String(i);
  }
  return matrixSet;
};


/**
 * Configure tilematrix set 26 (maximum zoomlevel without interpolation).
 * See ch.swisstopo.pixelkarte-farbe from
 * http://wmts10.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml
 * and notes in http://api3.geo.admin.ch/services/sdiservices.html#wmts.
 * @const {!Object.<string, ol.tilegrid.WMTS>}
 */
const swisstopoTileGrids = {
  'EPSG:2056': new olTilegridWMTS({
    extent: [2420000, 1030000, 2900000, 1350000],
    resolutions: swisstopoResolutions.slice(0, 27 + 1),
    matrixIds: createSwisstopoMatrixSet(27)
  }),
  'EPSG:21781': new olTilegridWMTS({
    extent: [420000, 30000, 900000, 350000],
    resolutions: swisstopoResolutions.slice(0, 27 + 1),
    matrixIds: createSwisstopoMatrixSet(27)
  })
};

/**
 * @param {string} projection The projection.
 * @param {string} format The format.
 * @return {string} the url.
 */
const swisstopoCreateUrl = function(projection, format) {
  if (projection === 'EPSG:2056') {
    return `${'https://wmts{20-24}.geo.admin.ch/1.0.0/{Layer}/default/{Time}' +
      '/2056/{TileMatrix}/{TileCol}/{TileRow}.'}${format}`;
  } else if (projection === 'EPSG:21781') {
    return `${'https://wmts{5-9}.geo.admin.ch/1.0.0/{Layer}/default/{Time}' +
      '/21781/{TileMatrix}/{TileRow}/{TileCol}.'}${format}`;
  }
  googAsserts.fail(`Unsupported projection ${projection}`);
};

/**
 * Layer source for the Swisstopo tile server.
 * WARNING: This tile server is not publicly available: you have to be
 *          registered by Swisstopo to use the service.
 * @see https://api3.geo.admin.ch/services/sdiservices.html#wmts
 */
const exports = class extends olSourceWMTS {

  /**
   * @param {ngeox.source.SwisstopoOptions} options WMTS options.
   */
  constructor(options) {
    const format = options.format || 'image/png';
    const projection = options.projection;
    googAsserts.assert(projection === 'EPSG:21781' || projection === 'EPSG:2056');
    const tilegrid = swisstopoTileGrids[projection];
    const projectionCode = projection.split(':')[1];
    const extension = format.split('/')[1];
    googAsserts.assert(projectionCode);
    googAsserts.assert(extension);

    super({
      attributions: '&copy; <a href="http://www.swisstopo.admin.ch">swisstopo</a>',
      url: swisstopoCreateUrl(projection, extension),
      dimensions: {
        'Time': options.timestamp
      },
      projection: projection,
      requestEncoding: 'REST',
      layer: options.layer,
      style: 'default',
      matrixSet: projectionCode,
      format: format,
      tileGrid: tilegrid,
      crossOrigin: options.crossOrigin
    });
  }
};


export default exports;
