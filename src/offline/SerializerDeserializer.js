/**
 * @module ngeo.offline.SerializerDeserializer
 */
import olTilegridTileGrid from 'ol/tilegrid/TileGrid.js';
import olTilegridWMTS from 'ol/tilegrid/WMTS.js';
import * as olProj from 'ol/proj.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import olSourceWMTS from 'ol/source/WMTS.js';
import olLayerTile from 'ol/layer/Tile.js';


const SerDes = class {
  /**
   * @param {Object} options The options
   */
  constructor({gutter}) {
    /**
     * @private
     */
    this.gutter_ = gutter;
  }

  /**
   * @private
   * @param {ol.Object} olObject An OL object
   * @return {Object} The serializable properties of the object
   */
  createBaseObject_(olObject) {
    const properties = olObject.getProperties();
    const obj = {};
    for (const key in properties) {
      const value = properties[key];
      const typeOf = typeof value;
      if (typeOf === 'string' || typeOf === 'number') {
        obj[key] = value;
      }
    }
    return obj;
  }

  /**
   * @param {ol.tilegrid.TileGrid} tilegrid .
   * @return {string} .
   */
  serializeTilegrid(tilegrid) {
    const obj = {};
    obj['extent'] = tilegrid.getExtent();
    obj['minZoom'] = tilegrid.getMinZoom();
    obj['origin'] = tilegrid.getOrigin(0); // hack
    obj['resolutions'] = tilegrid.getResolutions();
    obj['tileSize'] = tilegrid.getTileSize(tilegrid.getMinZoom());
    return JSON.stringify(obj);
  }

  /**
   * @param {string} serialization .
   * @return {ol.tilegrid.TileGrid} tilegrid
   */
  deserializeTilegrid(serialization) {
    const options = /** @type {olx.tilegrid.TileGridOptions} */ (JSON.parse(serialization));
    return new olTilegridTileGrid(options);
  }

  /**
   * @param {ol.tilegrid.WMTS} tilegrid .
   * @return {string|undefined} .
   */
  serializeTilegridWMTS(tilegrid) {
    if (!tilegrid) {
      return undefined;
    }
    const obj = {};
    const resolutions = tilegrid.getResolutions();
    obj['extent'] = tilegrid.getExtent();
    obj['minZoom'] = tilegrid.getMinZoom();
    obj['matrixIds'] = tilegrid.getMatrixIds();
    obj['resolutions'] = resolutions;

    obj['origins'] = [];
    for (let z = 0; z < resolutions.length; ++z) {
      obj['origins'].push(tilegrid.getOrigin(z));
    }
    return JSON.stringify(obj);
  }

  /**
   * @param {string} serialization .
   * @return {ol.tilegrid.WMTS} tilegrid .
   */
  deserializeTilegridWMTS(serialization) {
    const options = /** @type {olx.tilegrid.WMTSOptions} */ (JSON.parse(serialization));
    return new olTilegridWMTS(options);
  }


  /**
   * @param {ol.source.TileWMS} source .
   * @return {string} .
   */
  serializeSourceTileWMS(source) {
    const obj = this.createBaseObject_(source);
    obj['params'] = source.getParams();
    obj['urls'] = source.getUrls();
    obj['tileGrid'] = this.serializeTilegrid(source.getTileGrid());
    const projection = source.getProjection();
    if (projection) {
      obj['projection'] = olProj.get(source.getProjection()).getCode();
    }

    return JSON.stringify(obj);
  }

  /**
   * @param {string} serialization .
   * @param {function(ol.ImageTile, string)=} tileLoadFunction .
   * @return {ol.source.TileWMS} source .
   */
  deserializeSourceTileWMS(serialization, tileLoadFunction) {
    const options = /** @type {olx.source.TileWMSOptions} */ (JSON.parse(serialization));
    options['tileLoadFunction'] = tileLoadFunction;
    if (options['tileGrid']) {
      options['tileGrid'] = this.deserializeTilegrid(options['tileGrid']);
    }
    options['gutter'] = this.gutter_;
    return new olSourceTileWMS(options);
  }

  /**
   * @param {ol.source.WMTS} source .
   * @return {string} .
   */
  serializeSourceWMTS(source) {
    const obj = this.createBaseObject_(source);
    obj['dimensions'] = source.getDimensions();
    obj['format'] = source.getFormat();
    obj['urls'] = source.getUrls();
    obj['version'] = source.getVersion();
    obj['layer'] = source.getLayer();
    obj['style'] = source.getStyle();
    obj['matrixSet'] = source.getMatrixSet();
    // The OL getTileGrid method is expected to return a WMTS tilegrid so it is OK to cast here.
    const tileGridWMTS = /** @type {ol.tilegrid.WMTS} */ (source.getTileGrid());
    obj['tileGrid'] = this.serializeTilegridWMTS(tileGridWMTS);
    obj['requestEncoding'] = source.getRequestEncoding();
    const projection = source.getProjection();
    if (projection) {
      obj['projection'] = olProj.get(source.getProjection()).getCode();
    }

    return JSON.stringify(obj);
  }

  /**
   * @param {string} serialization .
   * @param {function(ol.ImageTile, string)=} tileLoadFunction .
   * @return {ol.source.WMTS} .
   */
  deserializeSourceWMTS(serialization, tileLoadFunction) {
    const options = /** @type {olx.source.WMTSOptions} */ (JSON.parse(serialization));
    options['tileLoadFunction'] = tileLoadFunction;
    if (options['tileGrid']) {
      options['tileGrid'] = this.deserializeTilegridWMTS(options['tileGrid']);
    }
    return new olSourceWMTS(options);
  }

  /**
   * @private
   * @param {number} number Some number which may be Infinity
   * @return {number} The same number or an arbitrary big number instead of Infinity
   */
  makeInfinitySerializable_(number) {
    if (number === Infinity) {
      return 1000;
    }
    return number;
  }

  /**
   * @param {ol.layer.Tile|ol.layer.Image} layer .
   * @param {ol.source.Source=} source .
   * @return {string} .
   */
  serializeTileLayer(layer, source) {
    const obj = this.createBaseObject_(layer);
    obj['opacity'] = layer.getOpacity();
    obj['visible'] = layer.getVisible();
    obj['minResolution'] = layer.getMinResolution();
    obj['maxResolution'] = this.makeInfinitySerializable_(layer.getMaxResolution());
    obj['zIndex'] = layer.getZIndex();
    source = source || layer.getSource();
    if (source instanceof olSourceTileWMS) {
      obj['source'] = this.serializeSourceTileWMS(source);
      obj['sourceType'] = 'tileWMS';
    } else if (source instanceof olSourceWMTS) {
      obj['source'] = this.serializeSourceWMTS(source);
      obj['sourceType'] = 'WMTS';
    }
    return JSON.stringify(obj);
  }

  /**
   * @param {string} serialization .
   * @param {function(ol.ImageTile, string)=} tileLoadFunction .
   * @return {ol.layer.Tile} .
   */
  deserializeTileLayer(serialization, tileLoadFunction) {
    const options = /** @type {olx.layer.TileOptions} */ (JSON.parse(serialization));
    const sourceType = options['sourceType'];
    if (sourceType === 'tileWMS') {
      options['source'] = this.deserializeSourceTileWMS(options['source'], tileLoadFunction);
    } else if (sourceType === 'WMTS') {
      options['source'] = this.deserializeSourceWMTS(options['source'], tileLoadFunction);
    }
    return new olLayerTile(options);
  }
};

const exports = SerDes;


export default exports;
