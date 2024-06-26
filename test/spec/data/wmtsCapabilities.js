// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
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

/* eslint max-len: ["error", { "code": 110, "ignoreStrings": true }] */

export default '<?xml version="1.0" encoding="UTF-8"?>' +
  '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd">' +
  '<ows:ServiceIdentification>' +
  '<ows:Title>Coordinates Labs</ows:Title>' +
  '<ows:ServiceType>OGC WMTS</ows:ServiceType>' +
  '<ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion>' +
  '</ows:ServiceIdentification>' +
  '<ows:ServiceProvider>' +
  '<ows:ProviderName>Coordinates</ows:ProviderName>' +
  '<ows:ProviderSite xlink:href="http://labs.coordinates.com" />' +
  '<ows:ServiceContact />' +
  '</ows:ServiceProvider>' +
  '<ows:OperationsMetadata>' +
  '<ows:Operation name="GetCapabilities">' +
  '<ows:DCP>' +
  '<ows:HTTP>' +
  '<ows:Get xlink:href="https://labs.coordinates.com/services;key=d740ea02e0c44cafb70dce31a774ca10/wmts/1.0.0/layer/7328/WMTSCapabilities.xml?">' +
  '<ows:Constraint name="GetEncoding">' +
  '<ows:AllowedValues>' +
  '<ows:Value>KVP</ows:Value>' +
  '</ows:AllowedValues>' +
  '</ows:Constraint>' +
  '</ows:Get>' +
  '</ows:HTTP>' +
  '</ows:DCP>' +
  '</ows:Operation>' +
  '<ows:Operation name="GetFeatureInfo">' +
  '<ows:DCP>' +
  '<ows:HTTP>' +
  '<ows:Get xlink:href="https://labs.coordinates.com/services;key=d740ea02e0c44cafb70dce31a774ca10/wmts/?">' +
  '<ows:Constraint name="GetEncoding">' +
  '<ows:AllowedValues>' +
  '<ows:Value>KVP</ows:Value>' +
  '</ows:AllowedValues>' +
  '</ows:Constraint>' +
  '</ows:Get>' +
  '</ows:HTTP>' +
  '</ows:DCP>' +
  '</ows:Operation>' +
  '</ows:OperationsMetadata>' +
  '<Contents>' +
  '<Layer>' +
  '<ows:Title>New Zealand Earthquakes</ows:Title>' +
  '<ows:Abstract>Historical earthquake data, accessed via the [GeoNet WFS feed](http://info.geonet.org.nz/display/appdata/Advanced+Queries). The data has been filtered to only include quakes in proximity to New Zealand with an `eventtype` of "Earthquake" or "none" per the [GeoNet catalog](http://info.geonet.org.nz/display/appdata/Catalog+Output). Most fields have been removed. Please also note the excluded data per this [GeoNet page](http://info.geonet.org.nz/display/appdata/The+Gap). We acknowledge the New Zealand GeoNet project and its sponsors EQC, GNS Science and LINES, for providing data used in this layer</ows:Abstract>' +
  '<ows:Identifier>layer-7328</ows:Identifier>' +
  '<ows:BoundingBox crs="urn:ogc:def:crs:EPSG::3857">' +
  '<ows:LowerCorner>-20037508.342789 -6406581.708337</ows:LowerCorner>' +
  '<ows:UpperCorner>20037508.342789 -3653545.667928</ows:UpperCorner>' +
  '</ows:BoundingBox>' +
  '<ows:WGS84BoundingBox crs="urn:ogc:def:crs:OGC:2:84">' +
  '<ows:LowerCorner>-180.000000 -49.454297</ows:LowerCorner>' +
  '<ows:UpperCorner>180.000000 -31.160000</ows:UpperCorner>' +
  '</ows:WGS84BoundingBox>' +
  '<Style isDefault="true">' +
  '<ows:Title>Weighted point styles</ows:Title>' +
  '<ows:Identifier>style=39</ows:Identifier>' +
  '</Style>' +
  '<Format>image/png</Format>' +
  '<InfoFormat>application/json</InfoFormat>' +
  '<InfoFormat>text/html</InfoFormat>' +
  '<TileMatrixSetLink>' +
  '<TileMatrixSet>EPSG:3857</TileMatrixSet>' +
  '</TileMatrixSetLink>' +
  '<ResourceURL format="image/png" resourceType="tile" template="https://coordinates-tiles-a.global.ssl.fastly.net/services;key=d740ea02e0c44cafb70dce31a774ca10/tiles/v4/layer=7328,{style}/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png" />' +
  '<ResourceURL format="application/json" resourceType="FeatureInfo" template="https://labs.coordinates.com/services;key=d740ea02e0c44cafb70dce31a774ca10/wmts/1.0.0/layer/7328/featureinfo/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}/{I}/{J}.json" />' +
  '<ResourceURL format="text/html" resourceType="FeatureInfo" template="https://labs.coordinates.com/services;key=d740ea02e0c44cafb70dce31a774ca10/wmts/1.0.0/layer/7328/featureinfo/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}/{I}/{J}.html" />' +
  '</Layer>' +
  '<TileMatrixSet>' +
  '<ows:Title>GoogleMapsCompatible</ows:Title>' +
  "<ows:Abstract>The well-known 'GoogleMapsCompatible' tile matrix set defined by the OGC WMTS specification</ows:Abstract>" +
  '<ows:Identifier>EPSG:3857</ows:Identifier>' +
  '<ows:BoundingBox crs="urn:ogc:def:crs:EPSG::3857">' +
  '<ows:LowerCorner>-20037508.342789 -20037508.342789</ows:LowerCorner>' +
  '<ows:UpperCorner>20037508.342789 20037508.342789</ows:UpperCorner>' +
  '</ows:BoundingBox>' +
  '<ows:SupportedCRS>urn:ogc:def:crs:EPSG::3857</ows:SupportedCRS>' +
  '<WellKnownScaleSet>urn:ogc:def:wkss:OGC:1.0:GoogleMapsCompatible</WellKnownScaleSet>' +
  '<TileMatrix>' +
  '<ows:Identifier>0</ows:Identifier>' +
  '<ScaleDenominator>559082264.029</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>1</MatrixWidth>' +
  '<MatrixHeight>1</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>1</ows:Identifier>' +
  '<ScaleDenominator>279541132.014</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>2</MatrixWidth>' +
  '<MatrixHeight>2</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>2</ows:Identifier>' +
  '<ScaleDenominator>139770566.007</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>4</MatrixWidth>' +
  '<MatrixHeight>4</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>3</ows:Identifier>' +
  '<ScaleDenominator>69885283.0036</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>8</MatrixWidth>' +
  '<MatrixHeight>8</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>4</ows:Identifier>' +
  '<ScaleDenominator>34942641.5018</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>16</MatrixWidth>' +
  '<MatrixHeight>16</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>5</ows:Identifier>' +
  '<ScaleDenominator>17471320.7509</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>32</MatrixWidth>' +
  '<MatrixHeight>32</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>6</ows:Identifier>' +
  '<ScaleDenominator>8735660.37545</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>64</MatrixWidth>' +
  '<MatrixHeight>64</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>7</ows:Identifier>' +
  '<ScaleDenominator>4367830.18772</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>128</MatrixWidth>' +
  '<MatrixHeight>128</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>8</ows:Identifier>' +
  '<ScaleDenominator>2183915.09386</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>256</MatrixWidth>' +
  '<MatrixHeight>256</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>9</ows:Identifier>' +
  '<ScaleDenominator>1091957.54693</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>512</MatrixWidth>' +
  '<MatrixHeight>512</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>10</ows:Identifier>' +
  '<ScaleDenominator>545978.773466</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>1024</MatrixWidth>' +
  '<MatrixHeight>1024</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>11</ows:Identifier>' +
  '<ScaleDenominator>272989.386733</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>2048</MatrixWidth>' +
  '<MatrixHeight>2048</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>12</ows:Identifier>' +
  '<ScaleDenominator>136494.693366</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>4096</MatrixWidth>' +
  '<MatrixHeight>4096</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>13</ows:Identifier>' +
  '<ScaleDenominator>68247.3466832</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>8192</MatrixWidth>' +
  '<MatrixHeight>8192</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>14</ows:Identifier>' +
  '<ScaleDenominator>34123.6733416</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>16384</MatrixWidth>' +
  '<MatrixHeight>16384</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>15</ows:Identifier>' +
  '<ScaleDenominator>17061.8366708</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>32768</MatrixWidth>' +
  '<MatrixHeight>32768</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>16</ows:Identifier>' +
  '<ScaleDenominator>8530.9183354</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>65536</MatrixWidth>' +
  '<MatrixHeight>65536</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>17</ows:Identifier>' +
  '<ScaleDenominator>4265.4591677</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>131072</MatrixWidth>' +
  '<MatrixHeight>131072</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>18</ows:Identifier>' +
  '<ScaleDenominator>2132.72958385</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>262144</MatrixWidth>' +
  '<MatrixHeight>262144</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>19</ows:Identifier>' +
  '<ScaleDenominator>1066.36479192</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>524288</MatrixWidth>' +
  '<MatrixHeight>524288</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>20</ows:Identifier>' +
  '<ScaleDenominator>533.182395962</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>1048576</MatrixWidth>' +
  '<MatrixHeight>1048576</MatrixHeight>' +
  '</TileMatrix>' +
  '<TileMatrix>' +
  '<ows:Identifier>21</ows:Identifier>' +
  '<ScaleDenominator>266.591197981</ScaleDenominator>' +
  '<TopLeftCorner>-20037508.3428 20037508.3428</TopLeftCorner>' +
  '<TileWidth>256</TileWidth>' +
  '<TileHeight>256</TileHeight>' +
  '<MatrixWidth>2097152</MatrixWidth>' +
  '<MatrixHeight>2097152</MatrixHeight>' +
  '</TileMatrix>' +
  '</TileMatrixSet>' +
  '</Contents>' +
  '<ServiceMetadataURL xlink:href="https://labs.coordinates.com/services;key=d740ea02e0c44cafb70dce31a774ca10/wmts/1.0.0/layer/7328/WMTSCapabilities.xml" />' +
  '</Capabilities>';
