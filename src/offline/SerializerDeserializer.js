// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import OlTilegridTileGrid from 'ol/tilegrid/TileGrid';
import OlTilegridWMTS from 'ol/tilegrid/WMTS';
import * as olProj from 'ol/proj';
import OlSourceTileWMS from 'ol/source/TileWMS';
import OlSourceWMTS from 'ol/source/WMTS';
import OlLayerTile from 'ol/layer/Tile';

const SerDes = class {
  /**
   * @param {unknown} options The options
   */
  // @ts-ignore
  constructor({gutter}) {
    /**
     * @private
     */
    this.gutter_ = gutter;
  }

  /**
   * @private
   * @param {import('ol/Object').default} olObject An OL object
   * @return {Object<string, string|number|string[]|boolean>} The serializable properties of the object
   */
  createBaseObject_(olObject) {
    const properties = olObject.getProperties();
    /**
     * @type {Object<string, string|number>}
     */
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
   * @param {OlTilegridTileGrid} tilegrid .
   * @return {string} .
   */
  serializeTilegrid(tilegrid) {
    /**
     * @type {Object<string, unknown>}
     */
    const obj = {};
    obj.extent = tilegrid.getExtent();
    obj.minZoom = tilegrid.getMinZoom();
    obj.origin = tilegrid.getOrigin(0); // hack
    obj.resolutions = tilegrid.getResolutions();
    obj.tileSize = tilegrid.getTileSize(tilegrid.getMinZoom());
    return JSON.stringify(obj);
  }

  /**
   * @param {string} serialization .
   * @return {OlTilegridTileGrid} tilegrid
   */
  deserializeTilegrid(serialization) {
    /**
     * @type {import ("ol/tilegrid/WMTS").Options}
     */
    const options = JSON.parse(serialization);
    return new OlTilegridTileGrid(options);
  }

  /**
   * @param {OlTilegridWMTS} tilegrid .
   * @return {string|undefined} .
   */
  serializeTilegridWMTS(tilegrid) {
    if (!tilegrid) {
      return undefined;
    }
    /**
     * @type {{
     *   'extent': import('ol/extent').Extent,
     *   'minZoom': number,
     *   'matrixIds': string[],
     *   'resolutions': number[],
     *   'origins': import('ol/coordinate').Coordinate[],
     * }}
     */
    const obj = {};
    const resolutions = tilegrid.getResolutions();
    obj.extent = tilegrid.getExtent();
    obj.minZoom = tilegrid.getMinZoom();
    obj.matrixIds = tilegrid.getMatrixIds();
    obj.resolutions = resolutions;

    obj.origins = [];
    for (let z = 0; z < resolutions.length; ++z) {
      obj.origins.push(tilegrid.getOrigin(z));
    }
    return JSON.stringify(obj);
  }

  /**
   * @param {string} serialization .
   * @return {OlTilegridWMTS} tilegrid .
   */
  deserializeTilegridWMTS(serialization) {
    /**
     * @type {import ("ol/tilegrid/WMTS").Options}
     */
    const options = JSON.parse(serialization);
    return new OlTilegridWMTS(options);
  }

  /**
   * @param {OlSourceTileWMS} source .
   * @return {string} .
   */
  serializeSourceTileWMS(source) {
    const obj = this.createBaseObject_(source);
    obj.params = source.getParams();
    obj.urls = source.getUrls();
    obj.tileGrid = this.serializeTilegrid(source.getTileGrid());
    const projection = source.getProjection();
    if (projection) {
      obj.projection = olProj.get(source.getProjection()).getCode();
    }

    return JSON.stringify(obj);
  }

  /**
   * @param {string} serialization .
   * @param {function(import('ol/ImageTile').default, string): void} [tileLoadFunction] .
   * @return {OlSourceTileWMS} source .
   */
  deserializeSourceTileWMS(serialization, tileLoadFunction) {
    /**
     * @type {import ("ol/source/TileWMS").Options}
     */
    const options = JSON.parse(serialization);
    // @ts-ignore
    options.tileLoadFunction = tileLoadFunction;
    if (options.tileGrid) {
      options.tileGrid = this.deserializeTilegrid(/** @type {any} */ (options).tileGrid);
    }
    options.gutter = this.gutter_;
    return new OlSourceTileWMS(options);
  }

  /**
   * @param {OlSourceWMTS} source .
   * @return {string} .
   */
  serializeSourceWMTS(source) {
    const obj = this.createBaseObject_(source);
    obj.dimensions = source.getDimensions();
    obj.format = source.getFormat();
    obj.urls = source.getUrls();
    obj.version = source.getVersion();
    obj.layer = source.getLayer();
    obj.style = source.getStyle();
    obj.matrixSet = source.getMatrixSet();
    // The OL getTileGrid method is expected to return a WMTS tilegrid so it is OK to cast here.
    const tileGridWMTS = /** @type {OlTilegridWMTS} */ (source.getTileGrid());
    obj.tileGrid = this.serializeTilegridWMTS(tileGridWMTS);
    obj.requestEncoding = source.getRequestEncoding();
    const projection = source.getProjection();
    if (projection) {
      obj.projection = olProj.get(source.getProjection()).getCode();
    }

    return JSON.stringify(obj);
  }

  /**
   * @param {string} serialization .
   * @param {function(import('ol/ImageTile').default, string): void} [tileLoadFunction] .
   * @return {OlSourceWMTS} .
   */
  deserializeSourceWMTS(serialization, tileLoadFunction) {
    /**
     * @type {import("ol/source/WMTS").Options}
     */
    const options = JSON.parse(serialization);
    // @ts-ignore
    options.tileLoadFunction = tileLoadFunction;
    if (options.tileGrid) {
      options.tileGrid = this.deserializeTilegridWMTS(/** @type {any} */ (options).tileGrid);
    }
    return new OlSourceWMTS(options);
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
   * @param {!import('ol/layer/Tile').default<import('ol/source/Tile').default>|import('ol/layer/Image').default<import('ol/source/Image').default>} layer .
   * @param {import('ol/source/Source').default} [source] .
   * @return {string} .
   */
  serializeTileLayer(layer, source) {
    const obj = this.createBaseObject_(layer);
    obj.opacity = layer.getOpacity();
    obj.visible = layer.getVisible();
    obj.minResolution = layer.getMinResolution();
    obj.maxResolution = this.makeInfinitySerializable_(layer.getMaxResolution());
    obj.zIndex = layer.getZIndex();
    source = source || layer.getSource();
    if (source instanceof OlSourceTileWMS) {
      obj.source = this.serializeSourceTileWMS(source);
      obj.sourceType = 'tileWMS';
    } else if (source instanceof OlSourceWMTS) {
      obj.source = this.serializeSourceWMTS(source);
      obj.sourceType = 'WMTS';
    }
    return JSON.stringify(obj);
  }

  /**
   * @param {string} serialization .
   * @param {function(import('ol/ImageTile').default, string): void} [tileLoadFunction] .
   * @return {!import('ol/layer/Tile').default<import('ol/source/Tile').default>} .
   */
  deserializeTileLayer(serialization, tileLoadFunction) {
    /**
     * @type {import('ol/layer/BaseTile').Options<import('ol/source/Tile').default>}
     */
    const options = JSON.parse(serialization);
    // @ts-ignore
    const sourceType = options.sourceType;
    if (sourceType === 'tileWMS') {
      options.source = this.deserializeSourceTileWMS(/** @type {any} */ (options).source, tileLoadFunction);
    } else if (sourceType === 'WMTS') {
      options.source = this.deserializeSourceWMTS(/** @type {any} */ (options).source, tileLoadFunction);
    }
    return new OlLayerTile(options);
  }
};

const exports = SerDes;

export default exports;
