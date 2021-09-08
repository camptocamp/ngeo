// The MIT License (MIT)
//
// Copyright (c) 2019-2021 Camptocamp SA
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

/**
 * @typedef {Object} OfflineExtentByZoom
 * @property {number} zoom
 * @property {import('ol/extent').Extent} extent
 */

/**
 * @typedef {Object} OfflineLayerMetadata
 * @property {import('ol/Map').default} map
 * @property {OfflineExtentByZoom[]} extentByZoom
 * @property {import('ol/layer/Layer').default<unknown>} layer
 * @property {import('ol/source/Source').default} source
 * @property {string|undefined} layerType
 * @property {string|undefined} layerSerialization
 * @property {boolean} backgroundLayer
 * @property {import('ol/layer/Group').default[]} ancestors
 */

/**
 * @typedef {Object} OfflinePersistentLayer
 * @property {string|undefined} layerType
 * @property {string|undefined} layerSerialization
 * @property {boolean} backgroundLayer
 * @property {string} key
 */

/**
 * @typedef {Object} OfflinePersistentContent
 * @property {import('ol/extent').Extent} extent
 * @property {!OfflinePersistentLayer[]} layers
 * @property {!number[]} zooms
 */

/**
 * @typedef {Object} OfflineTile
 * @property {import('ol/coordinate').Coordinate} coord
 * @property {string} url
 * @property {?string} response
 */

/**
 * @callback onTileDownloadSuccess
 * @param {number} progress
 * @param {OfflineTile} tile
 * @return {Promise}
 */

/**
 * @callback onTileDownloadError
 * @param {number} progress
 * @return {Promise}
 */

/**
 * @typedef {Object} OfflineOnTileDownload
 * @property {onTileDownloadSuccess} onTileDownloadSuccess
 * @property {onTileDownloadError} onTileDownloadError
 */

export default {};
