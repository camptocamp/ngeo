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
 * @typedef {Object} MapFishPrintCapabilities
 * @property {MapFishPrintCapabilitiesLayout[]} layouts
 * @property {string[]} formats
 * @property {MapFishPrintCapabilitiesSMTP} [smtp] STMP object definition
 */

/**
 * Fields that can come from a print v3 server and can be used in the partial
 * of the gmf print panel.
 * @typedef {Object} MapFishPrintCapabilitiesLayout
 * @property {string} name
 * @property {MapFishPrintCapabilitiesLayoutAttribute[]} [attributes] Custom print layoutInfo.
 */

/**
 * @typedef {Object} MapFishPrintCapabilitiesLayoutAttribute
 * @property {string} name Name of the form field.
 * @property {string|boolean|number} [default] Default value of the form field.
 * @property {string} [value] Not returned by the print, added by ngeo.
 * @property {string} type Type of the field. Can be 'String', 'Boolean' or 'Number'.
 * @property {Object<string, MapFishPrintCapabilitiesLayoutAttributeClientParamsElement>} [clientParams] The client info description.
 * @property {MapFishPrintCapabilitiesLayoutAttributeClientInfo} [clientInfo] Only for the map.
 */

/**
 * @typedef {Object} MapFishPrintCapabilitiesLayoutAttributeClientParamsElement
 * @property {string|boolean|number} [default] Default value of the form field.
 * @property {string} type Type of the field. Can be 'String', 'Boolean' or 'Number'.
 * @property {boolean} [isArray] Is an array
 * @property {Object<string, MapFishPrintCapabilitiesLayoutAttributeClientParamsElement>} embeddedType The embedded types.
 */

/**
 * @typedef {Object} MapFishPrintCapabilitiesLayoutAttributeClientInfo
 * @property {number[]} dpiSuggestions
 * @property {number[]} scales
 * @property {number} maxDpi
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} MapFishPrintCapabilitiesSMTP
 * @property {boolean} enabled
 */

/**
 * @typedef {Object} DataSourceTableObject
 * @property {string[]} columns
 * @property {(string|number|boolean)[][]} data
 */

/**
 * @typedef {Object} DataSourcePrintReportObject
 * @property {string} title
 * @property {DataSourceTableObject} table
 */

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
 * @property {number[]} bbox
 * @property {number[]} center
 * @property {number} scale
 * @property {number} dpi
 * @property {MapFishPrintLayer[]} layers
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
 * @property {import("geojson").GeoJsonObject} geoJson
 * @property {MapFishPrintVectorStyle} style
 */

/**
 * A MapFishPrintVectorStyle Must contains one key "version" with the version the use as value.
 * Others key-values are MapFishPrintSymbolizers.
 * @typedef {Object<string, number|import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizers>} MapFishPrintVectorStyle
 */

/**
 * extends {MapFishPrintLayer}
 * @typedef {Object} MapFishPrintWmsLayer
 * @property {string} type (MapFishPrintLayer)
 * @property {number} opacity (MapFishPrintLayer)
 * @property {string} baseURL
 * @property {Object<string, string>} customParams
 * @property {string[]} layers
 * @property {string} serverType
 * @property {string[]} [styles]
 * @property {string} version
 * @property {boolean} useNativeAngle
 * @property {string} imageFormat
 */

/**
 * @typedef {Object} MapFishPrintWmtsMatrix
 * @property {string} identifier
 * @property {number} scaleDenominator
 * @property {number[]} tileSize
 * @property {number[]} topLeftCorner
 * @property {number[]} matrixSize
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
 * @property {MapFishPrintWmtsMatrix[]} matrices
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
 * @property {MapFishPrintSymbolizer[]} symbolizers
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
 * @typedef {Object} MapFishPrintLegend
 * @property {MapFishPrintLegendClass[]} classes
 */

/**
 * @typedef {Object} MapFishPrintLegendClass
 * @property {string} [name]
 * @property {string[]} [icons]
 * @property {number} [dpi]
 * @property {MapFishPrintLegendClass[]} [classes]
 */

/**
 * @hidden
 * @type {null}
 */
export const nothing = null;
