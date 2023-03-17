/**
 * @typedef {Object} MapFishPrintSpec
 * @property {MapFishPrintAttributes} attributes
 * @property {string} layout
 * @property {string} format
 * @property {string} lang
 * @property {MapFishPrintSMTP} [smtp] STMP object definition
 */

/**
 * @typedef {Object} MapFishPrintAttributes
 * @property {MapFishPrintMap} map
 */

/**
 * @typedef {Object} MapFishPrintMap
 * @property {Array.<number>} bbox
 * @property {Array.<number>} center
 * @property {number} scale
 * @property {number} dpi
 * @property {Array.<MapFishPrintLayer>} layers
 * @property {string} projection
 * @property {number} rotation
 * @property {boolean} [useNearestScale] Indicates if the map should adjust its scale/zoom level to be
 *    equal to one of those defined in the configuration file.
 */

/**
 * @typedef {Object} MapFishPrintLayer
 * @property {string} type
 * @property {number} opacity
 */

/**
 * extends {MapFishPrintLayer}
 * @typedef {Object} MapFishPrintVectorLayer
 * @property {string} type (MapFishPrintLayer)
 * @property {number} opacity (MapFishPrintLayer)
 * @property {import("geojson").Object} geoJson
 * @property {MapFishPrintVectorStyle} style
 */

/**
 * @typedef {Object} MapFishPrintVectorStyle
 * @property {number} version
 */

/**
 * extends {MapFishPrintLayer}
 * @typedef {Object} MapFishPrintWmsLayer
 * @property {string} type (MapFishPrintLayer)
 * @property {number} opacity (MapFishPrintLayer)
 * @property {string} baseURL
 * @property {Object.<string, string>} customParams
 * @property {Array.<string>} layers
 * @property {string} serverType
 * @property {Array.<string>} [styles]
 * @property {string} version
 * @property {boolean} useNativeAngle
 * @property {string} imageFormat
 */

/**
 * @typedef {Object} MapFishPrintWmtsMatrix
 * @property {string} identifier
 * @property {number} scaleDenominator
 * @property {Array.<number>} tileSize
 * @property {Array.<number>} topLeftCorner
 * @property {Array.<number>} matrixSize
 */

/**
 * extends {MapFishPrintLayer}
 * @typedef {Object} MapFishPrintWmtsLayer
 * @property {string} type (MapFishPrintLayer)
 * @property {number} opacity (MapFishPrintLayer)
 * @property {string} baseURL
 * @property {Object} dimensions
 * @property {Object} dimensionParams
 * @property {string} imageFormat
 * @property {string} layer
 * @property {Array.<MapFishPrintWmtsMatrix>} matrices
 * @property {string} matrixSet
 * @property {string} requestEncoding
 * @property {string} style
 * @property {string} version
 */

/**
 * @typedef {Object} MapFishPrintReportResponse
 * @property {string} ref
 * @property {string} [statusURL]
 * @property {string} [downloadURL]
 */

/**
 * @typedef {Object} MapFishPrintStatusResponse
 * @property {boolean} done
 * @property {string} [status]
 * @property {string} [error]
 * @property {string} [downloadURL]
 */

/**
 * @typedef {Object} MapFishPrintSymbolizers
 * @property {Array.<MapFishPrintSymbolizer>} symbolizers
 */

/**
 * @typedef {Object} MapFishPrintSymbolizer
 * @property {string} type
 */

/**
 * extends {MapFishPrintSymbolizer}
 * @typedef {Object} MapFishPrintSymbolizerLine
 * @property {string} type (MapFishPrintSymbolizer)
 * @property {string} strokeColor
 * @property {number} strokeOpacity
 * @property {number} strokeWidth
 * @property {string} strokeDashstyle
 * @property {string} strokeLinecap
 */

/**
 * extends {MapFishPrintSymbolizer}
 * @typedef {Object} MapFishPrintSymbolizerPoint
 * @property {string} type (MapFishPrintSymbolizer)
 * @property {string} externalGraphic
 * @property {string} graphicFormat
 * @property {number} graphicOpacity
 * @property {number} graphicHeight
 * @property {number} graphicWidth
 * @property {string} fillColor
 * @property {number} fillOpacity
 * @property {number} pointRadius
 * @property {number} rotation
 * @property {string} strokeColor
 * @property {number} strokeOpacity
 * @property {number} strokeWidth
 * @property {string} graphicName
 */

/**
 * extends {MapFishPrintSymbolizer}
 * @typedef {Object} MapFishPrintSymbolizerPolygon
 * @property {string} type (MapFishPrintSymbolizer)
 * @property {string} fillColor
 * @property {number} fillOpacity
 * @property {string} strokeColor
 * @property {number} strokeOpacity
 * @property {number} strokeWidth
 * @property {string} strokeDashstyle
 */

/**
 * extends {MapFishPrintSymbolizer}
 * @typedef {Object} MapFishPrintSymbolizerText
 * @property {string} type (MapFishPrintSymbolizer)
 * @property {string} label
 * @property {string} labelAlign
 * @property {string} labelRotation
 * @property {string} fontWeight
 * @property {string} fontSize
 * @property {string} fontFamily
 * @property {number} labelXOffset
 * @property {number} labelYOffset
 * @property {string} haloColor
 * @property {number} haloOpacity
 * @property {number} haloRadius
 * @property {string} fontColor
 * @property {number} goodnessOfFit
 */

/**
 * @typedef {Object} MapFishPrintSMTP
 * @property {string} to Email address
 */

/**
 * @hidden
 */
export const nothing = null;
