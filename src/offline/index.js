/**
 * @typedef {Object} OfflineExtentByZoom
 * @property {number} zoom
 * @property {import("ol/extent.js").Extent} extent
 */

/**
 * @typedef {Object} OfflineLayerMetadata
 * @property {import("ol/Map.js").default} map
 * @property {Arra<OfflineExtentByZoom>} extentByZoom
 * @property {string} content
 * @property {string} contentType
 * @property {import("ol/layer/Layer.js").default} layer
 * @property {import("ol/source/Source.js").default} source
 * @property {string} layerType
 * @property {string} layerSerialization
 * @property {boolean} backgroundLayer
 * @property {import("ol/layer/Group.js").default} ancestors
 */

/**
 * @typedef {Object} OfflinePersistentLayer
 * @property {string} layerType
 * @property {string} layerSerialization
 * @property {boolean} backgroundLayer
 * @property {string} key
 */

/**
 * @typedef {Object} OfflinePersistentContent
 * @property {import("ol/extent.js").Extent} extent
 * @property {!Array<OfflinePersistentLayer>} layers
 * @property {!Array<number>} zooms
 */

/**
 * @typedef {Object} OfflineTile
 * @property {import("ol/coordinate.js").Coordinate} coord
 * @property {string} url
 * @property {string} response
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
