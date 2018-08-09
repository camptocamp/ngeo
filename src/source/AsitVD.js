/**
 * @module ngeo.source.AsitVD
 */
import olSourceWMTS from 'ol/source/WMTS.js';
import olTilegridWMTS from 'ol/tilegrid/WMTS.js';


/**
 * @const {!Array.<number>}
 */
const asitVDResolutions = [
  4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
  1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5
];


/**
 * @const {ol.tilegrid.WMTS}
 */
const asitVDTileGrid = new olTilegridWMTS({
  extent: [420000, 30000, 900000, 350000],
  resolutions: asitVDResolutions,
  matrixIds: asitVDResolutions.map((value, index) => `${index}`)
});


/**
 * Layer source for the ASIT VD tile server.
 * @see https://www.asitvd.ch/chercher/geoservices/fond-de-plan-asit-vd.html
 *
 */
const exports = class extends olSourceWMTS {

  /**
   * @param {ngeox.source.AsitVDOptions} options WMTS options.
   */
  constructor(options) {
    super({
      attributions: 'géodonnées &copy; Etat de Vaud & &copy; contributeurs OpenStreetMap',
      url: 'https://ows{1-4}.asitvd.ch/wmts/1.0.0/{Layer}/default/default/0/' +
        '21781/{TileMatrix}/{TileRow}/{TileCol}.png',
      projection: 'EPSG:21781',
      requestEncoding: 'REST',
      layer: options.layer,
      style: 'default',
      matrixSet: '21781',
      format: 'image/png',
      tileGrid: asitVDTileGrid
    });
  }
};


export default exports;
