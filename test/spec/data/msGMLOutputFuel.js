// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

export default '<?xml version=\'1.0\' encoding="UTF-8" ?>' +
  '<wfs:FeatureCollection' +
  '   xmlns:ms="http://mapserver.gis.umn.edu/mapserver"' +
  '   xmlns:gml="http://www.opengis.net/gml"' +
  '   xmlns:wfs="http://www.opengis.net/wfs"' +
  '   xmlns:ogc="http://www.opengis.net/ogc"' +
  '   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
  '   xsi:schemaLocation="http://mapserver.gis.umn.edu/mapserver https://geomapfish-demo-2-6.camptocamp.com/mapserv?SERVICE=WFS&amp;VERSION=1.1.0&amp;REQUEST=DescribeFeatureType&amp;TYPENAME=feature:fuel&amp;OUTPUTFORMAT=SFE_XMLSCHEMA  http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">' +
  '      <gml:boundedBy>' +
  '        <gml:Envelope srsName="EPSG:21781">' +
  '          <gml:lowerCorner>545277.898290 148729.093947</gml:lowerCorner>' +
  '          <gml:upperCorner>545277.898290 148729.093947</gml:upperCorner>' +
  '        </gml:Envelope>' +
  '      </gml:boundedBy>' +
  '    <gml:featureMember>' +
  '      <ms:fuel gml:id="fuel.1420918679">' +
  '        <gml:boundedBy>' +
  '          <gml:Envelope srsName="EPSG:21781">' +
  '            <gml:lowerCorner>545277.898290 148729.093947</gml:lowerCorner>' +
  '            <gml:upperCorner>545277.898290 148729.093947</gml:upperCorner>' +
  '          </gml:Envelope>' +
  '        </gml:boundedBy>' +
  '        <ms:THE_GEOM>' +
  '          <gml:Point srsName="EPSG:21781">' +
  '            <gml:pos>545277.898290 148729.093947</gml:pos>' +
  '          </gml:Point>' +
  '        </ms:THE_GEOM>' +
  '        <ms:display_name>1420918679</ms:display_name>' +
  '        <ms:name></ms:name>' +
  '        <ms:osm_id>1420918679</ms:osm_id>' +
  '        <ms:access></ms:access>' +
  '        <ms:aerialway></ms:aerialway>' +
  '        <ms:amenity>fuel</ms:amenity>' +
  '        <ms:barrier></ms:barrier>' +
  '        <ms:bicycle></ms:bicycle>' +
  '        <ms:brand></ms:brand>' +
  '        <ms:building></ms:building>' +
  '        <ms:covered></ms:covered>' +
  '        <ms:denomination></ms:denomination>' +
  '        <ms:ele></ms:ele>' +
  '        <ms:foot></ms:foot>' +
  '        <ms:highway></ms:highway>' +
  '        <ms:layer></ms:layer>' +
  '        <ms:leisure></ms:leisure>' +
  '        <ms:man_made></ms:man_made>' +
  '        <ms:motorcar></ms:motorcar>' +
  '        <ms:natural></ms:natural>' +
  '        <ms:operator>Frères Jubin</ms:operator>' +
  '        <ms:population></ms:population>' +
  '        <ms:power></ms:power>' +
  '        <ms:place></ms:place>' +
  '        <ms:railway></ms:railway>' +
  '        <ms:ref></ms:ref>' +
  '        <ms:religion></ms:religion>' +
  '        <ms:shop></ms:shop>' +
  '        <ms:sport></ms:sport>' +
  '        <ms:surface></ms:surface>' +
  '        <ms:tourism></ms:tourism>' +
  '        <ms:waterway></ms:waterway>' +
  '        <ms:wood></ms:wood>' +
  '      </ms:fuel>' +
  '    </gml:featureMember>' +
  '</wfs:FeatureCollection>';
