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
  '   xsi:schemaLocation="http://mapserver.gis.umn.edu/mapserver https://geomapfish-demo-2-5.camptocamp.com/mapserv?SERVICE=WFS&amp;VERSION=1.1.0&amp;REQUEST=DescribeFeatureType&amp;TYPENAME=feature:information,feature:bus_stop&amp;OUTPUTFORMAT=SFE_XMLSCHEMA  http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"' +
  '   numberOfFeatures="3">' +
  '</wfs:FeatureCollection>';
