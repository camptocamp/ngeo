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

/* eslint max-len: 0 */

export default {
  "background_layers": [
    {
      "dimensions": {},
      "id": 134,
      "imageType": "image/jpeg",
      "layer": "map",
      "matrixSet": "epsg2056_005",
      "metadata": {
        "directedFilterAttributes": [
          "name",
          "type",
          "timestamp"
        ],
        "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
        "ogcServer": "Main PNG",
        "thumbnail": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/cadastre.jpeg",
        "wmsLayers": "buildings_query"
      },
      "name": "OSM map",
      "type": "WMTS",
      "url": "https://geomapfish-demo-2-7.camptocamp.com/tiles/1.0.0/WMTSCapabilities.xml"
    },
    {
      "dimensions": {
        "DIM1": "default",
        "ELEVATION": "0"
      },
      "id": 133,
      "imageType": "image/jpeg",
      "layer": "asitvd.fond_couleur",
      "matrixSet": "2056",
      "metadata": {
        "thumbnail": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/cadastre.jpeg"
      },
      "name": "asitvd.fond_couleur",
      "type": "WMTS",
      "url": "https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml"
    },
    {
      "dimensions": {
        "DIM1": "default",
        "ELEVATION": "0"
      },
      "id": 132,
      "imageType": "image/jpeg",
      "layer": "asitvd.fond_gris",
      "matrixSet": "2056",
      "metadata": {
        "thumbnail": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/cadastre.jpeg"
      },
      "name": "asitvd.fond_gris",
      "type": "WMTS",
      "url": "https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml"
    },
  ],
  "errors": [],
  "ogcServers": {
    "ArcGIS VD WFS": {
      "attributes": {},
      "credential": true,
      "imageType": "image/png",
      "isSingleTile": false,
      "namespace": null,
      "type": "arcgis",
      "url": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=ArcGIS+VD+WFS&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "urlWfs": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=ArcGIS+VD+WFS&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "wfsSupport": true
    },
    "ArcGIS VD noWFS 2": {
      "attributes": null,
      "credential": true,
      "imageType": "image/png",
      "isSingleTile": false,
      "namespace": null,
      "type": "arcgis",
      "url": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=ArcGIS+VD+noWFS+2&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "urlWfs": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=ArcGIS+VD+noWFS+2&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "wfsSupport": false
    },
    "Main Jpeg": {
      "attributes": {
        "accommodation": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "aeroways10": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "aeroways11": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "aeroways12": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "aeroways13": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "aeroways14": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "aeroways15": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "aeroways16": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "aeroways17": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "aeroways18": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "bank": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "buildings": {
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "number": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "buildings15": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "buildings16": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "buildings17": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "buildings18": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "buildings_query": {
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          }
        },
        "bus_stop": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "cinema": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "way": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "entertainment": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "firestations": {
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "integer"
          }
        },
        "floor_slider": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "fuel": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "hospitals": {
          "date": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "date"
          },
          "datetime": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "email": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "link": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "integer"
          }
        },
        "hotel": {
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "way": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          }
        },
        "hotel_label": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "way": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "information": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "landuse10": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse11": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse12": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse13": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse14": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse15": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse16": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse17": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse18": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse4": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse5": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse6": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse7": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse8": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "landuse9": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "line": {
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "LineStringPropertyType"
          },
          "kind": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "many_attributes": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name2": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name3": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name4": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name5": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name6": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "osm_open": {
          "autolink_email": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "autolink_url": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "open": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "double"
          },
          "timestamp": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "type": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "osm_scale": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "way": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "osm_time": {
          "date": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "date"
          },
          "datetime": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "double"
          },
          "timestamp": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "type": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "osm_time2": {
          "date": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "date"
          },
          "datetime": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "double"
          },
          "timestamp": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "type": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "osm_time_default": {
          "date": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "date"
          },
          "datetime": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "double"
          },
          "timestamp": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "type": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "osm_time_default_slider": {
          "date": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "date"
          },
          "datetime": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "double"
          },
          "timestamp": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "type": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "osm_time_mount_year": {
          "date": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "date"
          },
          "datetime": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "double"
          },
          "timestamp": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "type": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "osm_time_year_mounth": {
          "date": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "date"
          },
          "datetime": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "double"
          },
          "timestamp": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "type": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "parking": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "place_of_worship": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "places0": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places1": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places10": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places11": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places12": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places13": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places14": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places15": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places16": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places17": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places18": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places2": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places3": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places4": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places5": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places6": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places7": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places8": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "places9": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "point": {
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "kind": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "police": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "polygon": {
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "MultiPolygonPropertyType"
          },
          "kind": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "post_office": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "railways10": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "railways11": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "railways12": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "railways13": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "railways14": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "railways15": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "railways16": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "railways17": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "railways18": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "railways8": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "railways9": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads10": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads11": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads12": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads13": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads14": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads15": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads16": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads17": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads18": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads5": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads6": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads7": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads8": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "roads9": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "sustenance": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "tourism_activity": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "waterarea10": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea11": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea12": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea13": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea14": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea15": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea16": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea17": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea18": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea4": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea5": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea6": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea7": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea8": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterarea9": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways10": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways11": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways12": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways13": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways14": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways15": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways16": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways17": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways18": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways6": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways7": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways8": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "waterways9": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        }
      },
      "credential": true,
      "imageType": "image/jpeg",
      "isSingleTile": false,
      "namespace": "http://mapserver.gis.umn.edu/mapserver",
      "type": "mapserver",
      "url": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=Main+Jpeg&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "urlWfs": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=Main+Jpeg&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "wfsSupport": true
    },
    "Main PNG": {
      "attributes": {
        "accommodation": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "bank": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "bus_stop": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "cinema": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "way": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "entertainment": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "firestations": {
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "integer"
          }
        },
        "floor_slider": {
          "msGeometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "GeometryPropertyType"
          }
        },
        "fuel": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "line": {
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "LineStringPropertyType"
          },
          "kind": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "many_attributes": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name2": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name3": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name4": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name5": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name6": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "osm_open": {
          "autolink_email": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "autolink_url": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "open": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "double"
          },
          "timestamp": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "dateTime"
          },
          "type": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "osm_scale": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "way": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "parking": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "place_of_worship": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "point": {
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "kind": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "police": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "polygon": {
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "MultiPolygonPropertyType"
          },
          "kind": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "post_office": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "sustenance": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        },
        "tourism_activity": {
          "access": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "aerialway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "amenity": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "barrier": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "bicycle": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "brand": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "building": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "covered": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "denomination": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "display_name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ele": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "foot": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "geom": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "highway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "layer": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "leisure": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "man_made": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "motorcar": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "name": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "natural": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "operator": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "osm_id": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "long"
          },
          "place": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "population": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "power": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "railway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "ref": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "religion": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "shop": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "sport": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "surface": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "tourism": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "waterway": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          },
          "wood": {
            "minOccurs": "0",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "string"
          }
        }
      },
      "credential": true,
      "imageType": "image/png",
      "isSingleTile": false,
      "namespace": "http://mapserver.gis.umn.edu/mapserver",
      "type": "mapserver",
      "url": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=Main+PNG&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "urlWfs": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=Main+PNG&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "wfsSupport": true
    },
    "Main no WFS": {
      "attributes": null,
      "credential": true,
      "imageType": "image/png",
      "isSingleTile": false,
      "namespace": null,
      "type": "mapserver",
      "url": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=Main+no+WFS&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "urlWfs": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=Main+no+WFS&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "wfsSupport": false
    },
    "QGIS server": {
      "attributes": {
        "landuse": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "landuse_alias": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "alias": "Name Alias",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "alias": "ID Alias",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "type": {
            "alias": "Type Alias",
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "landuse_ingrp": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "osm_firestations": {
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          }
        },
        "osm_firestations_dual_restricted": {
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          }
        },
        "osm_firestations_ingrp": {
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          }
        },
        "osm_firestations_restricted": {
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          }
        },
        "osm_firestations_restricted_ingrp": {
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PolygonPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          }
        },
        "osm_hospitals": {
          "date": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "date"
          },
          "datetime": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "dateTime"
          },
          "email": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "link": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          }
        },
        "osm_hospitals_dual_restricted": {
          "date": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "date"
          },
          "datetime": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "dateTime"
          },
          "email": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "link": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          }
        },
        "osm_hospitals_ingrp": {
          "date": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "date"
          },
          "datetime": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "dateTime"
          },
          "email": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "link": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          }
        },
        "osm_hospitals_restricted": {
          "date": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "date"
          },
          "datetime": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "dateTime"
          },
          "email": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "link": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          }
        },
        "osm_hospitals_restricted_ingrp": {
          "date": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "date"
          },
          "datetime": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "dateTime"
          },
          "email": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "link": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          }
        },
        "points": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "timestamp": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "points_ingrp": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "timestamp": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "pointscopier": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "timestamp": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "pointslabels": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "timestamp": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "railways": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "LineStringPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "railways_ingrp": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "LineStringPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "restricted": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "timestamp": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "time": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "timestamp": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        },
        "time_ingrp": {
          "fid": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "type": "int"
          },
          "geom_4326": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "geometry": {
            "maxOccurs": "1",
            "minOccurs": "0",
            "namespace": "http://www.opengis.net/gml",
            "type": "PointPropertyType"
          },
          "name": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "osm_id": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "long"
          },
          "timestamp": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          },
          "type": {
            "namespace": "http://www.w3.org/2001/XMLSchema",
            "nillable": "true",
            "type": "string"
          }
        }
      },
      "credential": true,
      "imageType": "image/png",
      "isSingleTile": false,
      "namespace": "http://www.qgis.org/gml",
      "type": "qgisserver",
      "url": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=QGIS+server&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "urlWfs": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=QGIS+server&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "wfsSupport": true
    },
    "QGIS server no WFS": {
      "attributes": null,
      "credential": true,
      "imageType": "image/png",
      "isSingleTile": false,
      "namespace": null,
      "type": "qgisserver",
      "url": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=QGIS+server+no+WFS&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "urlWfs": "https://geomapfish-demo-2-7.camptocamp.com/mapserv_proxy?ogcserver=QGIS+server+no+WFS&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin",
      "wfsSupport": false
    },
    "WMS CH topo fr": {
      "attributes": null,
      "credential": false,
      "imageType": "image/png",
      "isSingleTile": false,
      "namespace": null,
      "type": "mapserver",
      "url": "https://wms.geo.admin.ch?lang=fr",
      "urlWfs": "https://wms.geo.admin.ch?lang=fr",
      "wfsSupport": false
    }
  },
  "themes": [
    {
      "children": [
        {
          "children": [
            {
              "dimensions": {},
              "id": 125,
              "imageType": "image/jpeg",
              "layer": "asitvd.fond_pourortho",
              "matrixSet": "2056",
              "metadata": {
                "disclaimer": "\u00a9 <a href='http://asitvd.ch'>ASIT VD</a>, Contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "isChecked": true,
                "legend": true,
                "maxResolution": 100.0,
                "minResolution": 1.0
              },
              "name": "asitvd.fond_pourortho",
              "type": "WMTS",
              "url": "https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml"
            },
            {
              "dimensions": {},
              "id": 119,
              "imageType": "image/jpeg",
              "layer": "ch.are.alpenkonvention",
              "matrixSet": "2056_26",
              "metadata": {
                "copyable": true,
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true,
                "maxResolution": 50.0,
                "minQueryResolution": 5.0,
                "minResolution": 10.0,
                "ogcServer": "WMS CH topo fr",
                "wmsLayers": "ch.are.alpenkonvention"
              },
              "name": "ch.are.alpenkonvention",
              "type": "WMTS",
              "url": "https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml?lang=fr"
            },
            {
              "dimensions": {},
              "id": 120,
              "imageType": "image/jpeg",
              "layer": "ch.astra.hauptstrassennetz",
              "matrixSet": "2056_26",
              "metadata": {
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true,
                "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                "opacity": 0.8,
                "queryLayers": "ch.astra.ausnahmetransportrouten"
              },
              "name": "ch.astra.hauptstrassennetz",
              "type": "WMTS",
              "url": "https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml?lang=fr"
            },
            {
              "children": [
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "ch.swisstopo.dreiecksvermaschung",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 115,
                  "imageType": "image/png",
                  "layers": "ch.swisstopo.dreiecksvermaschung",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                    "legend": true
                  },
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.dreiecksvermaschung",
                  "ogcServer": "WMS CH topo fr",
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 118,
                  "imageType": "image/png",
                  "layers": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "directedFilterAttributes": [
                      "Classification_des_roches"
                    ],
                    "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                    "legend": true,
                    "opacity": 0.25
                  },
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
                  "ogcServer": "WMS CH topo fr",
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 117,
                  "imageType": "image/png",
                  "layers": "ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                    "legend": true
                  },
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen",
                  "ogcServer": "WMS CH topo fr",
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "ch.swisstopo.geologie-gravimetrischer_atlas",
                      "queryable": false
                    }
                  ],
                  "dimensions": {},
                  "id": 116,
                  "imageType": "image/png",
                  "layers": "ch.swisstopo.geologie-gravimetrischer_atlas",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                    "legend": true
                  },
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.geologie-gravimetrischer_atlas",
                  "ogcServer": "WMS CH topo fr",
                  "type": "WMS"
                }
              ],
              "id": 260,
              "metadata": {
                "isExpanded": true
              },
              "mixed": true,
              "name": "Sub group"
            }
          ],
          "id": 30,
          "metadata": {
            "exclusiveGroup": true,
            "isExpanded": true
          },
          "mixed": true,
          "name": "Cadastre"
        }
      ],
      "functionalities": {
        "default_basemap": [
          "blank"
        ]
      },
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/cadastre.jpeg",
      "id": 29,
      "metadata": {},
      "name": "Cadastre"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 1.41,
                  "minResolutionHint": 0.53,
                  "name": "osm_scale",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 114,
              "imageType": "image/png",
              "layers": "osm_scale",
              "maxResolutionHint": 1.41,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendRule": "OSM"
              },
              "minResolutionHint": 0.53,
              "name": "osm_scale",
              "ogcServer": "Main PNG",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_open",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 139,
              "imageType": "image/png",
              "layers": "osm_open",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "enumeratedAttributes": [
                  "type"
                ],
                "searchAlias": [
                  "searchalias"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "osm_open",
              "ogcServer": "Main PNG",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "bank",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 140,
              "imageType": "image/png",
              "layers": "bank",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "Layer with very very very very very long name",
              "ogcServer": "Main PNG",
              "type": "WMS"
            },
            {
              "children": [
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 110,
                  "imageType": "image/png",
                  "layers": "osm_time",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                    "editingAttributesOrder": [
                      "osm_id",
                      "name",
                      "type",
                      "timestamp"
                    ],
                    "identifierAttributeField": "name",
                    "legend": true,
                    "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_r_s",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      0,
                      1,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2013-12-01T00:00:00Z",
                    "minDefValue": null,
                    "minValue": "2006-01-01T00:00:00Z",
                    "mode": "range",
                    "resolution": "month",
                    "widget": "slider"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 143,
                  "imageType": "image/png",
                  "layers": "osm_time",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_v_s",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      0,
                      1,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2013-12-01T00:00:00Z",
                    "minDefValue": null,
                    "minValue": "2006-01-01T00:00:00Z",
                    "mode": "value",
                    "resolution": "month",
                    "widget": "slider"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 144,
                  "imageType": "image/png",
                  "layers": "osm_time",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_v_dp",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      0,
                      1,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2013-12-01T00:00:00Z",
                    "minDefValue": null,
                    "minValue": "2006-01-01T00:00:00Z",
                    "mode": "value",
                    "resolution": "month",
                    "widget": "datepicker"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 126,
                  "imageType": "image/png",
                  "layers": "osm_time",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "identifierAttributeField": "name",
                    "legend": true,
                    "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                    "legendRule": "Dans les temps",
                    "queryLayers": "5",
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_r_dp",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      0,
                      1,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2013-12-01T00:00:00Z",
                    "minDefValue": null,
                    "minValue": "2006-01-01T00:00:00Z",
                    "mode": "range",
                    "resolution": "month",
                    "widget": "datepicker"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time_year_mounth",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 177,
                  "imageType": "image/png",
                  "layers": "osm_time_year_mounth",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_r_year_mounth",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      0,
                      1,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2013-01-01T00:00:00Z",
                    "minDefValue": null,
                    "minValue": "2006-01-01T00:00:00Z",
                    "mode": "range",
                    "resolution": "year",
                    "widget": "slider"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time_year_mounth",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 178,
                  "imageType": "image/png",
                  "layers": "osm_time_year_mounth",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_d_year_mounth",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      0,
                      1,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2013-01-01T00:00:00Z",
                    "minDefValue": null,
                    "minValue": "2006-01-01T00:00:00Z",
                    "mode": "value",
                    "resolution": "year",
                    "widget": "slider"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time_mount_year",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 179,
                  "imageType": "image/png",
                  "layers": "osm_time_mount_year",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_r_mounth_year",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      1,
                      0,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2013-12-01T00:00:00Z",
                    "minDefValue": null,
                    "minValue": "2006-01-01T00:00:00Z",
                    "mode": "range",
                    "resolution": "month",
                    "widget": "slider"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time_mount_year",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 180,
                  "imageType": "image/png",
                  "layers": "osm_time_mount_year",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_v_mounth_year",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      1,
                      0,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2013-12-01T00:00:00Z",
                    "minDefValue": null,
                    "minValue": "2006-01-01T00:00:00Z",
                    "mode": "value",
                    "resolution": "month",
                    "widget": "slider"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time_mount_year",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 184,
                  "imageType": "image/png",
                  "layers": "osm_time_mount_year",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "long wms-t layer name name name name name name name",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      1,
                      0,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2013-12-01T00:00:00Z",
                    "minDefValue": null,
                    "minValue": "2006-01-01T00:00:00Z",
                    "mode": "value",
                    "resolution": "month",
                    "widget": "slider"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time_default_slider",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 277,
                  "imageType": "image/png",
                  "layers": "osm_time_default_slider",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_r_dp_default",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      0,
                      1,
                      0,
                      0
                    ],
                    "maxDefValue": "2017-06-01T00:00:00Z",
                    "maxValue": "2019-12-01T00:00:00Z",
                    "minDefValue": "2015-06-01T00:00:00Z",
                    "minValue": "2010-01-01T00:00:00Z",
                    "mode": "range",
                    "resolution": "month",
                    "widget": "datepicker"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time_default_slider",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 278,
                  "imageType": "image/png",
                  "layers": "osm_time_default_slider",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_r_s_default",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      0,
                      1,
                      0,
                      0
                    ],
                    "maxDefValue": "2017-06-01T00:00:00Z",
                    "maxValue": "2019-12-01T00:00:00Z",
                    "minDefValue": "2015-06-01T00:00:00Z",
                    "minValue": "2010-01-01T00:00:00Z",
                    "mode": "range",
                    "resolution": "month",
                    "widget": "slider"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time_default",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 276,
                  "imageType": "image/png",
                  "layers": "osm_time_default",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_v_dp_default",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      0,
                      1,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2019-12-01T00:00:00Z",
                    "minDefValue": "2015-06-01T00:00:00Z",
                    "minValue": "2010-01-01T00:00:00Z",
                    "mode": "value",
                    "resolution": "month",
                    "widget": "datepicker"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time_default",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 275,
                  "imageType": "image/png",
                  "layers": "osm_time_default",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_v_s_default",
                  "ogcServer": "Main PNG",
                  "time": {
                    "interval": [
                      0,
                      1,
                      0,
                      0
                    ],
                    "maxDefValue": null,
                    "maxValue": "2019-12-01T00:00:00Z",
                    "minDefValue": "2015-06-01T00:00:00Z",
                    "minValue": "2010-01-01T00:00:00Z",
                    "mode": "value",
                    "resolution": "month",
                    "widget": "slider"
                  },
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time",
                      "queryable": true
                    },
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "osm_time2",
                      "queryable": true
                    }
                  ],
                  "dimensions": {},
                  "id": 624,
                  "imageType": "image/png",
                  "layers": "osm_time,osm_time2",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "identifierAttributeField": "name",
                    "legend": true,
                    "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                    "legendRule": "Dans les temps",
                    "queryLayers": "5",
                    "timeAttribute": "timestamp"
                  },
                  "minResolutionHint": 0.0,
                  "name": "osm_time_r_dp_two_layers",
                  "ogcServer": "Main PNG",
                  "type": "WMS"
                }
              ],
              "id": 145,
              "metadata": {},
              "mixed": true,
              "name": "osm_time"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "sustenance",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "entertainment",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 141,
              "imageType": "image/png",
              "layers": "sustenance,entertainment",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "two_layers",
              "ogcServer": "Main PNG",
              "type": "WMS"
            },
            {
              "dimensions": {},
              "id": 120,
              "imageType": "image/jpeg",
              "layer": "ch.astra.hauptstrassennetz",
              "matrixSet": "2056_26",
              "metadata": {
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true,
                "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                "opacity": 0.8,
                "queryLayers": "ch.astra.ausnahmetransportrouten"
              },
              "name": "ch.astra.hauptstrassennetz",
              "type": "WMTS",
              "url": "https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml?lang=fr"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_open",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 181,
              "imageType": "image/png",
              "layers": "osm_open",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "no_wfs",
              "ogcServer": "Main no WFS",
              "type": "WMS"
            },
            {
              "dimensions": {},
              "id": 119,
              "imageType": "image/jpeg",
              "layer": "ch.are.alpenkonvention",
              "matrixSet": "2056_26",
              "metadata": {
                "copyable": true,
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true,
                "maxResolution": 50.0,
                "minQueryResolution": 5.0,
                "minResolution": 10.0,
                "ogcServer": "WMS CH topo fr",
                "wmsLayers": "ch.are.alpenkonvention"
              },
              "name": "ch.are.alpenkonvention",
              "type": "WMTS",
              "url": "https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml?lang=fr"
            }
          ],
          "id": 68,
          "metadata": {
            "isExpanded": true
          },
          "mixed": true,
          "name": "OSM functions mixed"
        },
        {
          "children": [
            {
              "children": [
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "cinema",
                      "queryable": true
                    }
                  ],
                  "id": 99,
                  "imageType": "image/png",
                  "layers": "cinema",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                    "identifierAttributeField": "display_name",
                    "isChecked": true,
                    "legend": true,
                    "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                    "queryIconPosition": [
                      "5"
                    ]
                  },
                  "minResolutionHint": 0.0,
                  "name": "cinema",
                  "type": "WMS"
                }
              ],
              "id": 621,
              "metadata": {},
              "mixed": false,
              "name": "GSGMF-1574"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "police",
                  "queryable": true
                }
              ],
              "id": 105,
              "imageType": "image/png",
              "layers": "police",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isChecked": true,
                "legend": true,
                "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                "legendRule": "Poste de police"
              },
              "minResolutionHint": 0.0,
              "name": "police_stations",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "post_office",
                  "queryable": true
                }
              ],
              "id": 106,
              "imageType": "image/png",
              "layers": "post_office",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Office de poste",
                "queryIconPosition": [
                  "30",
                  "15"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "post_office",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_time",
                  "queryable": true
                }
              ],
              "id": 126,
              "imageType": "image/png",
              "layers": "osm_time",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "identifierAttributeField": "name",
                "legend": true,
                "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                "legendRule": "Dans les temps",
                "queryLayers": "5",
                "timeAttribute": "timestamp"
              },
              "minResolutionHint": 0.0,
              "name": "osm_time_r_dp",
              "time": {
                "interval": [
                  0,
                  1,
                  0,
                  0
                ],
                "maxDefValue": null,
                "maxValue": "2013-12-01T00:00:00Z",
                "minDefValue": null,
                "minValue": "2006-01-01T00:00:00Z",
                "mode": "range",
                "resolution": "month",
                "widget": "datepicker"
              },
              "type": "WMS"
            },
            {
              "children": [
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "entertainment",
                      "queryable": true
                    }
                  ],
                  "id": 102,
                  "imageType": "image/png",
                  "layers": "entertainment",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                    "identifierAttributeField": "display_name",
                    "legend": true,
                    "legendRule": "Caf\u00e9s",
                    "queryIconPosition": [
                      "30",
                      "15",
                      "0"
                    ]
                  },
                  "minResolutionHint": 0.0,
                  "name": "entertainment",
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "sustenance",
                      "queryable": true
                    }
                  ],
                  "id": 107,
                  "imageType": "image/png",
                  "layers": "sustenance",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                    "identifierAttributeField": "display_name",
                    "legend": true,
                    "legendRule": "Restaurant",
                    "queryIconPosition": [
                      "30",
                      "15",
                      "0"
                    ]
                  },
                  "minResolutionHint": 0.0,
                  "name": "sustenance",
                  "type": "WMS"
                }
              ],
              "id": 137,
              "metadata": {},
              "mixed": false,
              "name": "Loisirs"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "firestations",
                  "queryable": true
                }
              ],
              "id": 122,
              "imageType": "image/png",
              "layers": "firestations",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendRule": "Casernes de pompiers"
              },
              "minResolutionHint": 0.0,
              "name": "firestations",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 596,
          "metadata": {},
          "mixed": false,
          "name": "Layers",
          "ogcServer": "Main PNG"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "cinema",
                  "queryable": true
                }
              ],
              "id": 99,
              "imageType": "image/png",
              "layers": "cinema",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                "queryIconPosition": [
                  "5"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "cinema",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "police",
                  "queryable": true
                }
              ],
              "id": 105,
              "imageType": "image/png",
              "layers": "police",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                "legendRule": "Poste de police"
              },
              "minResolutionHint": 0.0,
              "name": "police_stations",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "post_office",
                  "queryable": true
                }
              ],
              "id": 106,
              "imageType": "image/png",
              "layers": "post_office",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Office de poste",
                "queryIconPosition": [
                  "30",
                  "15"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "post_office",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_time",
                  "queryable": true
                }
              ],
              "id": 126,
              "imageType": "image/png",
              "layers": "osm_time",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "identifierAttributeField": "name",
                "legend": true,
                "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                "legendRule": "Dans les temps",
                "queryLayers": "5",
                "timeAttribute": "timestamp"
              },
              "minResolutionHint": 0.0,
              "name": "osm_time_r_dp",
              "time": {
                "interval": [
                  0,
                  1,
                  0,
                  0
                ],
                "maxDefValue": null,
                "maxValue": "2013-12-01T00:00:00Z",
                "minDefValue": null,
                "minValue": "2006-01-01T00:00:00Z",
                "mode": "range",
                "resolution": "month",
                "widget": "datepicker"
              },
              "type": "WMS"
            },
            {
              "children": [
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "entertainment",
                      "queryable": true
                    }
                  ],
                  "id": 102,
                  "imageType": "image/png",
                  "layers": "entertainment",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                    "identifierAttributeField": "display_name",
                    "legend": true,
                    "legendRule": "Caf\u00e9s",
                    "queryIconPosition": [
                      "30",
                      "15",
                      "0"
                    ]
                  },
                  "minResolutionHint": 0.0,
                  "name": "entertainment",
                  "type": "WMS"
                },
                {
                  "childLayers": [
                    {
                      "maxResolutionHint": 999999999.0,
                      "minResolutionHint": 0.0,
                      "name": "sustenance",
                      "queryable": true
                    }
                  ],
                  "id": 107,
                  "imageType": "image/png",
                  "layers": "sustenance",
                  "maxResolutionHint": 999999999.0,
                  "metadata": {
                    "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                    "identifierAttributeField": "display_name",
                    "legend": true,
                    "legendRule": "Restaurant",
                    "queryIconPosition": [
                      "30",
                      "15",
                      "0"
                    ]
                  },
                  "minResolutionHint": 0.0,
                  "name": "sustenance",
                  "type": "WMS"
                }
              ],
              "id": 137,
              "metadata": {},
              "mixed": false,
              "name": "Loisirs"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "firestations",
                  "queryable": true
                }
              ],
              "id": 122,
              "imageType": "image/png",
              "layers": "firestations",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendRule": "Casernes de pompiers"
              },
              "minResolutionHint": 0.0,
              "name": "firestations",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 597,
          "metadata": {
            "exclusiveGroup": true
          },
          "mixed": false,
          "name": "Layers-exclusive",
          "ogcServer": "Main PNG"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "bank",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "place_of_worship",
                  "queryable": true
                }
              ],
              "id": 109,
              "imageType": "image/png",
              "layers": "osm",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isLegendExpanded": true,
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "osm",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 66,
          "metadata": {
            "opacity": 0.654321
          },
          "mixed": false,
          "name": "Group",
          "ogcServer": "Main PNG"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "hotel_label",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "hotel",
                  "queryable": true
                }
              ],
              "id": 281,
              "imageType": "image/png",
              "layers": "hotel_filter",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "queryLayers": "hotel"
              },
              "minResolutionHint": 0.0,
              "name": "filter_double",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "hotel_label",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "hotel",
                  "queryable": true
                }
              ],
              "id": 286,
              "imageType": "image/png",
              "layers": "hotel_filter",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "filter_double_all",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_time",
                  "queryable": true
                }
              ],
              "id": 126,
              "imageType": "image/png",
              "layers": "osm_time",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "identifierAttributeField": "name",
                "legend": true,
                "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                "legendRule": "Dans les temps",
                "queryLayers": "5",
                "timeAttribute": "timestamp"
              },
              "minResolutionHint": 0.0,
              "name": "osm_time_r_dp",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_time2",
                  "queryable": true
                }
              ],
              "id": 147,
              "imageType": "image/png",
              "layers": "osm_time2",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "directedFilterAttributes": [
                  "name",
                  "type",
                  "timestamp"
                ],
                "enumeratedAttributes": [
                  "type"
                ],
                "identifierAttributeField": "name",
                "legendRule": "Dans les temps",
                "timeAttribute": "timestamp"
              },
              "minResolutionHint": 0.0,
              "name": "osm_time_r_dp_2",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 1.41,
                  "minResolutionHint": 0.53,
                  "name": "osm_scale",
                  "queryable": true
                }
              ],
              "id": 114,
              "imageType": "image/png",
              "layers": "osm_scale",
              "maxResolutionHint": 1.41,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendRule": "OSM"
              },
              "minResolutionHint": 0.53,
              "name": "osm_scale",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_open",
                  "queryable": true
                }
              ],
              "id": 139,
              "imageType": "image/png",
              "layers": "osm_open",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "enumeratedAttributes": [
                  "type"
                ],
                "searchAlias": [
                  "searchalias"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "osm_open",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "bank",
                  "queryable": true
                }
              ],
              "id": 140,
              "imageType": "image/png",
              "layers": "bank",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "Layer with very very very very very long name",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "sustenance",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "entertainment",
                  "queryable": true
                }
              ],
              "id": 141,
              "imageType": "image/png",
              "layers": "sustenance,entertainment",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "two_layers",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "aster",
                  "queryable": false
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "cinema",
                  "queryable": true
                }
              ],
              "id": 150,
              "imageType": "image/png",
              "layers": "half_query",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "Half query",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "srtm",
                  "queryable": false
                }
              ],
              "id": 151,
              "imageType": "image/png",
              "layers": "srtm",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "srtm",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "aster",
                  "queryable": false
                }
              ],
              "id": 152,
              "imageType": "image/png",
              "layers": "aster",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "aster",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "many_attributes",
                  "queryable": true
                }
              ],
              "id": 186,
              "imageType": "image/png",
              "layers": "many_attributes",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "many_attributes",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 146,
          "metadata": {},
          "mixed": false,
          "name": "OSM functions",
          "ogcServer": "Main PNG",
          "time": {
            "interval": [
              0,
              1,
              0,
              0
            ],
            "maxDefValue": null,
            "maxValue": "2013-12-01T00:00:00Z",
            "minDefValue": null,
            "minValue": "2006-01-01T00:00:00Z",
            "mode": "range",
            "resolution": "month",
            "widget": "datepicker"
          }
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.dreiecksvermaschung",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 115,
              "imageType": "image/png",
              "layers": "ch.swisstopo.dreiecksvermaschung",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "ch.swisstopo.dreiecksvermaschung",
              "ogcServer": "WMS CH topo fr",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.geologie-gravimetrischer_atlas",
                  "queryable": false
                }
              ],
              "dimensions": {},
              "id": 116,
              "imageType": "image/png",
              "layers": "ch.swisstopo.geologie-gravimetrischer_atlas",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "ch.swisstopo.geologie-gravimetrischer_atlas",
              "ogcServer": "WMS CH topo fr",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 117,
              "imageType": "image/png",
              "layers": "ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen",
              "ogcServer": "WMS CH topo fr",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 118,
              "imageType": "image/png",
              "layers": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "directedFilterAttributes": [
                  "Classification_des_roches"
                ],
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true,
                "opacity": 0.25
              },
              "minResolutionHint": 0.0,
              "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
              "ogcServer": "WMS CH topo fr",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "vd.npa_localite",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 272,
              "imageType": "image/png",
              "layers": "vd.npa_localite",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "NPA localite noWFS",
              "ogcServer": "ArcGIS VD noWFS 2",
              "style": "default",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 26.46,
                  "minResolutionHint": 0.0,
                  "name": "ch.bfe.solarenergie-eignung-fassaden_fulldetail",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 26.46,
                  "name": "ch.bfe.solarenergie-eignung-fassaden_overview",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "ch.bfe.solarenergie-eignung-fassaden_getfeatureinfo",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 274,
              "imageType": "image/png",
              "layers": "ch.bfe.solarenergie-eignung-fassaden",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "ch.bfe.solarenergie-eignung-fassaden",
              "ogcServer": "WMS CH topo fr",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 26.46,
                  "minResolutionHint": 0.0,
                  "name": "ch.bfe.solarenergie-eignung-daecher_fulldetail",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 26.46,
                  "name": "ch.bfe.solarenergie-eignung-daecher_overview",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "ch.bfe.solarenergie-eignung-daecher_getfeatureinfo",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 273,
              "imageType": "image/png",
              "layers": "ch.bfe.solarenergie-eignung-daecher",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "ch.bfe.solarenergie-eignung-daecher",
              "ogcServer": "WMS CH topo fr",
              "type": "WMS"
            }
          ],
          "id": 153,
          "metadata": {},
          "mixed": true,
          "name": "External"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_open",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 139,
              "imageType": "image/png",
              "layers": "osm_open",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "enumeratedAttributes": [
                  "type"
                ],
                "searchAlias": [
                  "searchalias"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "osm_open",
              "ogcServer": "Main PNG",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 118,
              "imageType": "image/png",
              "layers": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "directedFilterAttributes": [
                  "Classification_des_roches"
                ],
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true,
                "opacity": 0.25
              },
              "minResolutionHint": 0.0,
              "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
              "ogcServer": "WMS CH topo fr",
              "type": "WMS"
            },
            {
              "dimensions": {},
              "id": 134,
              "imageType": "image/jpeg",
              "layer": "map",
              "matrixSet": "epsg2056_005",
              "metadata": {
                "directedFilterAttributes": [
                  "name",
                  "type",
                  "timestamp"
                ],
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "ogcServer": "Main PNG",
                "thumbnail": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/cadastre.jpeg",
                "wmsLayers": "buildings_query"
              },
              "name": "OSM map",
              "type": "WMTS",
              "url": "https://geomapfish-demo-2-7.camptocamp.com/tiles/1.0.0/WMTSCapabilities.xml"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_time2",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 147,
              "imageType": "image/png",
              "layers": "osm_time2",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "directedFilterAttributes": [
                  "name",
                  "type",
                  "timestamp"
                ],
                "enumeratedAttributes": [
                  "type"
                ],
                "identifierAttributeField": "name",
                "legendRule": "Dans les temps",
                "timeAttribute": "timestamp"
              },
              "minResolutionHint": 0.0,
              "name": "osm_time_r_dp_2",
              "ogcServer": "Main PNG",
              "time": {
                "interval": [
                  0,
                  1,
                  0,
                  0
                ],
                "maxDefValue": null,
                "maxValue": "2013-12-01T00:00:00Z",
                "minDefValue": null,
                "minValue": "2006-01-01T00:00:00Z",
                "mode": "range",
                "resolution": "month",
                "widget": "datepicker"
              },
              "type": "WMS"
            }
          ],
          "id": 174,
          "metadata": {},
          "mixed": true,
          "name": "Filters mixed"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_open",
                  "queryable": true
                }
              ],
              "id": 139,
              "imageType": "image/png",
              "layers": "osm_open",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "enumeratedAttributes": [
                  "type"
                ],
                "searchAlias": [
                  "searchalias"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "osm_open",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_time2",
                  "queryable": true
                }
              ],
              "id": 147,
              "imageType": "image/png",
              "layers": "osm_time2",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "directedFilterAttributes": [
                  "name",
                  "type",
                  "timestamp"
                ],
                "enumeratedAttributes": [
                  "type"
                ],
                "identifierAttributeField": "name",
                "legendRule": "Dans les temps",
                "timeAttribute": "timestamp"
              },
              "minResolutionHint": 0.0,
              "name": "osm_time_r_dp_2",
              "time": {
                "interval": [
                  0,
                  1,
                  0,
                  0
                ],
                "maxDefValue": null,
                "maxValue": "2013-12-01T00:00:00Z",
                "minDefValue": null,
                "minValue": "2006-01-01T00:00:00Z",
                "mode": "range",
                "resolution": "month",
                "widget": "datepicker"
              },
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 183,
          "metadata": {},
          "mixed": false,
          "name": "Filters",
          "ogcServer": "Main PNG"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "floor_slider",
                  "queryable": false
                }
              ],
              "id": 279,
              "imageType": "image/png",
              "layers": "floor_slider",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "floor_slider",
              "type": "WMS"
            }
          ],
          "dimensions": {
            "FLOOR": null
          },
          "id": 280,
          "metadata": {},
          "mixed": false,
          "name": "Floor slider",
          "ogcServer": "Main PNG"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "vd.npa_localite",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 272,
              "imageType": "image/png",
              "layers": "vd.npa_localite",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "NPA localite noWFS",
              "ogcServer": "ArcGIS VD noWFS 2",
              "style": "default",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 28.0,
                  "minResolutionHint": 0.0,
                  "name": "vd.regime_hydrique",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 285,
              "imageType": "image/png",
              "layers": "vd.regime_hydrique",
              "maxResolutionHint": 28.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "vd.regime_hydrique noWFS",
              "ogcServer": "ArcGIS VD noWFS 2",
              "style": "default",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_firestations",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 241,
              "imageType": "image/png",
              "layers": "osm_firestations",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true,
                "legendRule": "osm_firestations"
              },
              "minResolutionHint": 0.0,
              "name": "osm_firestations no wfs",
              "ogcServer": "QGIS server no WFS",
              "type": "WMS"
            }
          ],
          "id": 284,
          "metadata": {},
          "mixed": true,
          "name": "ESRI no WFS no Geom"
        }
      ],
      "functionalities": {
        "default_basemap": [
          "OSM map"
        ]
      },
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/osm.png",
      "id": 64,
      "metadata": {},
      "name": "Demo"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "line",
                  "queryable": true
                }
              ],
              "edit_columns": [
                {
                  "name": "name",
                  "type": "xsd:string"
                },
                {
                  "name": "kind_id",
                  "nillable": true,
                  "type": "xsd:integer"
                },
                {
                  "name": "geom",
                  "nillable": true,
                  "srid": 2056,
                  "type": "gml:MultiLineStringPropertyType"
                },
                {
                  "enumeration": [
                    "tree",
                    "house"
                  ],
                  "name": "kind",
                  "nillable": true,
                  "restriction": "enumeration",
                  "type": "xsd:string"
                }
              ],
              "editable": true,
              "id": 111,
              "imageType": "image/png",
              "layers": "line",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "identifierAttributeField": "name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Line"
              },
              "minResolutionHint": 0.0,
              "name": "line",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "polygon",
                  "queryable": true
                }
              ],
              "edit_columns": [
                {
                  "name": "name",
                  "type": "xsd:string"
                },
                {
                  "name": "kind_id",
                  "nillable": true,
                  "type": "xsd:integer"
                },
                {
                  "name": "check",
                  "type": "xsd:boolean"
                },
                {
                  "name": "date",
                  "nillable": true,
                  "type": "xsd:date"
                },
                {
                  "name": "time",
                  "nillable": true,
                  "type": "xsd:time"
                },
                {
                  "name": "datetime",
                  "nillable": true,
                  "type": "xsd:dateTime"
                },
                {
                  "name": "geom",
                  "nillable": true,
                  "srid": 2056,
                  "type": "gml:MultiPolygonPropertyType"
                },
                {
                  "enumeration": [
                    "tree",
                    "house"
                  ],
                  "name": "kind",
                  "nillable": true,
                  "restriction": "enumeration",
                  "type": "xsd:string"
                }
              ],
              "editable": true,
              "id": 112,
              "imageType": "image/png",
              "layers": "polygon",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "editingAttributesOrder": [
                  "name",
                  "kind_id",
                  "check"
                ],
                "identifierAttributeField": "name",
                "isChecked": true,
                "lastUpdateDateColumn": "last_update_timestamp",
                "lastUpdateUserColumn": "last_update_user",
                "legend": true,
                "legendRule": "Polygon",
                "readonlyAttributes": [
                  "datetime",
                  "kind_id"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "polygon",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "point",
                  "queryable": true
                }
              ],
              "edit_columns": [
                {
                  "name": "name",
                  "type": "xsd:string"
                },
                {
                  "maxLength": 50,
                  "name": "short_name",
                  "nillable": true,
                  "type": "xsd:string"
                },
                {
                  "name": "short_name2",
                  "nillable": true,
                  "type": "xsd:string"
                },
                {
                  "name": "short_name3",
                  "nillable": true,
                  "type": "xsd:string"
                },
                {
                  "name": "kind_id",
                  "type": "xsd:integer"
                },
                {
                  "name": "good",
                  "nillable": true,
                  "type": "xsd:boolean"
                },
                {
                  "name": "internal_id",
                  "nillable": true,
                  "type": "xsd:integer"
                },
                {
                  "name": "height",
                  "nillable": true,
                  "type": "xsd:decimal"
                },
                {
                  "name": "geom",
                  "nillable": true,
                  "srid": 2056,
                  "type": "gml:MultiPointPropertyType"
                },
                {
                  "enumeration": [
                    "tree new",
                    "house new"
                  ],
                  "name": "kind",
                  "nillable": true,
                  "restriction": "enumeration",
                  "type": "xsd:string"
                }
              ],
              "editable": true,
              "id": 113,
              "imageType": "image/png",
              "layers": "point",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "editingEnumerations": {
                  "kind_id": {
                    "order_by": "to_order",
                    "value": "name2"
                  }
                },
                "identifierAttributeField": "name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Point",
                "metadataUrl": "https://www.camptocamp.com/"
              },
              "minResolutionHint": 0.0,
              "name": "point",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 72,
          "metadata": {
            "disclaimer": "Editing theme",
            "isExpanded": true
          },
          "mixed": false,
          "name": "Edit",
          "ogcServer": "Main PNG"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "point",
                  "queryable": true
                }
              ],
              "id": 154,
              "imageType": "image/png",
              "layers": "point",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "Camptocamp",
                "snappingConfig": {}
              },
              "minResolutionHint": 0.0,
              "name": "point snap",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "line",
                  "queryable": true
                }
              ],
              "id": 155,
              "imageType": "image/png",
              "layers": "line",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "snappingConfig": {}
              },
              "minResolutionHint": 0.0,
              "name": "line snap",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "polygon",
                  "queryable": true
                }
              ],
              "id": 163,
              "imageType": "image/png",
              "layers": "polygon",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "snappingConfig": {}
              },
              "minResolutionHint": 0.0,
              "name": "polygon snap",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 164,
          "metadata": {},
          "mixed": false,
          "name": "Snapping",
          "ogcServer": "Main PNG"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "point",
                  "queryable": true
                }
              ],
              "id": 156,
              "imageType": "image/png",
              "layers": "point",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "snappingConfig": {
                  "tolerance": 50
                }
              },
              "minResolutionHint": 0.0,
              "name": "point snap tolerance",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "line",
                  "queryable": true
                }
              ],
              "id": 157,
              "imageType": "image/png",
              "layers": "line",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "snappingConfig": {
                  "tolerance": 50
                }
              },
              "minResolutionHint": 0.0,
              "name": "line snap tolerance",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "polygon",
                  "queryable": true
                }
              ],
              "id": 158,
              "imageType": "image/png",
              "layers": "polygon",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "snappingConfig": {
                  "tolerance": 50
                }
              },
              "minResolutionHint": 0.0,
              "name": "polygon snap tolerance",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 165,
          "metadata": {},
          "mixed": false,
          "name": "Snapping tollerance",
          "ogcServer": "Main PNG"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "line",
                  "queryable": true
                }
              ],
              "id": 159,
              "imageType": "image/png",
              "layers": "line",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "snappingConfig": {
                  "edge": false
                }
              },
              "minResolutionHint": 0.0,
              "name": "line snap no edge",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "polygon",
                  "queryable": true
                }
              ],
              "id": 161,
              "imageType": "image/png",
              "layers": "polygon",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "snappingConfig": {
                  "edge": false
                }
              },
              "minResolutionHint": 0.0,
              "name": "polygon snap no edge",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 166,
          "metadata": {},
          "mixed": false,
          "name": "Snapping no edge",
          "ogcServer": "Main PNG"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "line",
                  "queryable": true
                }
              ],
              "id": 160,
              "imageType": "image/png",
              "layers": "line",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "snappingConfig": {
                  "vertex": false
                }
              },
              "minResolutionHint": 0.0,
              "name": "line snap no vertex",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "polygon",
                  "queryable": true
                }
              ],
              "id": 162,
              "imageType": "image/png",
              "layers": "polygon",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "snappingConfig": {
                  "vertex": false
                }
              },
              "minResolutionHint": 0.0,
              "name": "polygon snap no vertex",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 167,
          "metadata": {},
          "mixed": false,
          "name": "Snapping no vertex",
          "ogcServer": "Main PNG"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/edit.png",
      "id": 73,
      "metadata": {
        "disclaimer": "Editing theme"
      },
      "name": "Edit"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "firestations",
                  "queryable": true
                }
              ],
              "id": 122,
              "imageType": "image/png",
              "layers": "firestations",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendRule": "Casernes de pompiers"
              },
              "minResolutionHint": 0.0,
              "name": "firestations",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 620,
          "metadata": {
            "isExpanded": true
          },
          "mixed": false,
          "name": "Administration",
          "ogcServer": "Main PNG"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/administration.jpeg",
      "id": 5,
      "metadata": {
        "timeAttribute": "cvb"
      },
      "name": "Administration"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "bus_stop",
                  "queryable": true
                }
              ],
              "id": 101,
              "imageType": "image/png",
              "layers": "bus_stop",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendRule": "Arr\u00eat de bus"
              },
              "minResolutionHint": 0.0,
              "name": "bus_stop",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 93,
          "metadata": {},
          "mixed": false,
          "name": "Enseignement",
          "ogcServer": "Main PNG"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/enseignement2.jpeg",
      "id": 92,
      "metadata": {},
      "name": "Enseignement"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "bus_stop",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 101,
              "imageType": "image/png",
              "layers": "bus_stop",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendRule": "Arr\u00eat de bus"
              },
              "minResolutionHint": 0.0,
              "name": "bus_stop",
              "ogcServer": "Main PNG",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 261,
              "imageType": "image/png",
              "layers": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true,
                "opacity": 0.25,
                "printLayers": "un_petit_test"
              },
              "minResolutionHint": 0.0,
              "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung2",
              "ogcServer": "WMS CH topo fr",
              "type": "WMS"
            }
          ],
          "id": 35,
          "metadata": {
            "isExpanded": true
          },
          "mixed": true,
          "name": "Enseignement 2"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/enseignement.jpeg",
      "id": 38,
      "metadata": {},
      "name": "Enseignement 2"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_open",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 139,
              "imageType": "image/png",
              "layers": "osm_open",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "enumeratedAttributes": [
                  "type"
                ],
                "searchAlias": [
                  "searchalias"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "osm_open",
              "ogcServer": "Main PNG",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 118,
              "imageType": "image/png",
              "layers": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "directedFilterAttributes": [
                  "Classification_des_roches"
                ],
                "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                "legend": true,
                "opacity": 0.25
              },
              "minResolutionHint": 0.0,
              "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
              "ogcServer": "WMS CH topo fr",
              "type": "WMS"
            },
            {
              "dimensions": {},
              "id": 134,
              "imageType": "image/jpeg",
              "layer": "map",
              "matrixSet": "epsg2056_005",
              "metadata": {
                "directedFilterAttributes": [
                  "name",
                  "type",
                  "timestamp"
                ],
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "ogcServer": "Main PNG",
                "thumbnail": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/cadastre.jpeg",
                "wmsLayers": "buildings_query"
              },
              "name": "OSM map",
              "type": "WMTS",
              "url": "https://geomapfish-demo-2-7.camptocamp.com/tiles/1.0.0/WMTSCapabilities.xml"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_time2",
                  "queryable": true
                }
              ],
              "dimensions": {},
              "id": 147,
              "imageType": "image/png",
              "layers": "osm_time2",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "directedFilterAttributes": [
                  "name",
                  "type",
                  "timestamp"
                ],
                "enumeratedAttributes": [
                  "type"
                ],
                "identifierAttributeField": "name",
                "legendRule": "Dans les temps",
                "timeAttribute": "timestamp"
              },
              "minResolutionHint": 0.0,
              "name": "osm_time_r_dp_2",
              "ogcServer": "Main PNG",
              "time": {
                "interval": [
                  0,
                  1,
                  0,
                  0
                ],
                "maxDefValue": null,
                "maxValue": "2013-12-01T00:00:00Z",
                "minDefValue": null,
                "minValue": "2006-01-01T00:00:00Z",
                "mode": "range",
                "resolution": "month",
                "widget": "datepicker"
              },
              "type": "WMS"
            }
          ],
          "id": 174,
          "metadata": {},
          "mixed": true,
          "name": "Filters mixed"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_open",
                  "queryable": true
                }
              ],
              "id": 139,
              "imageType": "image/png",
              "layers": "osm_open",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "enumeratedAttributes": [
                  "type"
                ],
                "searchAlias": [
                  "searchalias"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "osm_open",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_time2",
                  "queryable": true
                }
              ],
              "id": 147,
              "imageType": "image/png",
              "layers": "osm_time2",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "directedFilterAttributes": [
                  "name",
                  "type",
                  "timestamp"
                ],
                "enumeratedAttributes": [
                  "type"
                ],
                "identifierAttributeField": "name",
                "legendRule": "Dans les temps",
                "timeAttribute": "timestamp"
              },
              "minResolutionHint": 0.0,
              "name": "osm_time_r_dp_2",
              "time": {
                "interval": [
                  0,
                  1,
                  0,
                  0
                ],
                "maxDefValue": null,
                "maxValue": "2013-12-01T00:00:00Z",
                "minDefValue": null,
                "minValue": "2006-01-01T00:00:00Z",
                "mode": "range",
                "resolution": "month",
                "widget": "datepicker"
              },
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 183,
          "metadata": {},
          "mixed": false,
          "name": "Filters",
          "ogcServer": "Main PNG"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/filters.png",
      "id": 176,
      "metadata": {},
      "name": "Filters"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "fuel",
                  "queryable": true
                }
              ],
              "id": 124,
              "imageType": "image/png",
              "layers": "fuel",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Station service"
              },
              "minResolutionHint": 0.0,
              "name": "fuel",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 8,
          "metadata": {
            "isExpanded": true
          },
          "mixed": false,
          "name": "fuel",
          "ogcServer": "Main PNG"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/gestion_eaux.jpeg",
      "id": 3,
      "metadata": {},
      "name": "Gestion des eaux"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "line",
                  "queryable": true
                }
              ],
              "edit_columns": [
                {
                  "name": "name",
                  "type": "xsd:string"
                },
                {
                  "name": "kind_id",
                  "nillable": true,
                  "type": "xsd:integer"
                },
                {
                  "name": "geom",
                  "nillable": true,
                  "srid": 2056,
                  "type": "gml:MultiLineStringPropertyType"
                },
                {
                  "enumeration": [
                    "tree",
                    "house"
                  ],
                  "name": "kind",
                  "nillable": true,
                  "restriction": "enumeration",
                  "type": "xsd:string"
                }
              ],
              "editable": true,
              "id": 111,
              "imageType": "image/png",
              "layers": "line",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "identifierAttributeField": "name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Line"
              },
              "minResolutionHint": 0.0,
              "name": "line",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "polygon",
                  "queryable": true
                }
              ],
              "edit_columns": [
                {
                  "name": "name",
                  "type": "xsd:string"
                },
                {
                  "name": "kind_id",
                  "nillable": true,
                  "type": "xsd:integer"
                },
                {
                  "name": "check",
                  "type": "xsd:boolean"
                },
                {
                  "name": "date",
                  "nillable": true,
                  "type": "xsd:date"
                },
                {
                  "name": "time",
                  "nillable": true,
                  "type": "xsd:time"
                },
                {
                  "name": "datetime",
                  "nillable": true,
                  "type": "xsd:dateTime"
                },
                {
                  "name": "geom",
                  "nillable": true,
                  "srid": 2056,
                  "type": "gml:MultiPolygonPropertyType"
                },
                {
                  "enumeration": [
                    "tree",
                    "house"
                  ],
                  "name": "kind",
                  "nillable": true,
                  "restriction": "enumeration",
                  "type": "xsd:string"
                }
              ],
              "editable": true,
              "id": 112,
              "imageType": "image/png",
              "layers": "polygon",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "editingAttributesOrder": [
                  "name",
                  "kind_id",
                  "check"
                ],
                "identifierAttributeField": "name",
                "isChecked": true,
                "lastUpdateDateColumn": "last_update_timestamp",
                "lastUpdateUserColumn": "last_update_user",
                "legend": true,
                "legendRule": "Polygon",
                "readonlyAttributes": [
                  "datetime",
                  "kind_id"
                ]
              },
              "minResolutionHint": 0.0,
              "name": "polygon",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "point",
                  "queryable": true
                }
              ],
              "edit_columns": [
                {
                  "name": "name",
                  "type": "xsd:string"
                },
                {
                  "maxLength": 50,
                  "name": "short_name",
                  "nillable": true,
                  "type": "xsd:string"
                },
                {
                  "name": "short_name2",
                  "nillable": true,
                  "type": "xsd:string"
                },
                {
                  "name": "short_name3",
                  "nillable": true,
                  "type": "xsd:string"
                },
                {
                  "name": "kind_id",
                  "type": "xsd:integer"
                },
                {
                  "name": "good",
                  "nillable": true,
                  "type": "xsd:boolean"
                },
                {
                  "name": "internal_id",
                  "nillable": true,
                  "type": "xsd:integer"
                },
                {
                  "name": "height",
                  "nillable": true,
                  "type": "xsd:decimal"
                },
                {
                  "name": "geom",
                  "nillable": true,
                  "srid": 2056,
                  "type": "gml:MultiPointPropertyType"
                },
                {
                  "enumeration": [
                    "tree new",
                    "house new"
                  ],
                  "name": "kind",
                  "nillable": true,
                  "restriction": "enumeration",
                  "type": "xsd:string"
                }
              ],
              "editable": true,
              "id": 113,
              "imageType": "image/png",
              "layers": "point",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "editingEnumerations": {
                  "kind_id": {
                    "order_by": "to_order",
                    "value": "name2"
                  }
                },
                "identifierAttributeField": "name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Point",
                "metadataUrl": "https://www.camptocamp.com/"
              },
              "minResolutionHint": 0.0,
              "name": "point",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "polygon",
                  "queryable": true
                }
              ],
              "id": 170,
              "imageType": "image/png",
              "layers": "polygon",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "copyable": true
              },
              "minResolutionHint": 0.0,
              "name": "Multi-Polygon Query pas \u00e9ditable mais queryable",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "polygon",
                  "queryable": true
                }
              ],
              "id": 171,
              "imageType": "image/png",
              "layers": "polygon",
              "maxResolutionHint": 999999999.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "Multi-Polygon Query2 pas \u00e9ditable mais queryable",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "line",
                  "queryable": true
                }
              ],
              "id": 172,
              "imageType": "image/png",
              "layers": "line",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "copyable": true
              },
              "minResolutionHint": 0.0,
              "name": "Multi-Line pas \u00e9ditable mais queryable",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "point",
                  "queryable": true
                }
              ],
              "id": 173,
              "imageType": "image/png",
              "layers": "point",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "copyable": true
              },
              "minResolutionHint": 0.0,
              "name": "Multi-Point pas \u00e9ditable mais queryable",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 169,
          "metadata": {},
          "mixed": false,
          "name": "ObjectEditing",
          "ogcServer": "Main PNG"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/edit.png",
      "id": 168,
      "metadata": {},
      "name": "ObjectEditing"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "bank",
                  "queryable": true
                }
              ],
              "id": 100,
              "imageType": "image/png",
              "layers": "bank",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Banques"
              },
              "minResolutionHint": 0.0,
              "name": "bank",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "place_of_worship",
                  "queryable": true
                }
              ],
              "id": 104,
              "imageType": "image/png",
              "layers": "place_of_worship",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Autre lieux de culte"
              },
              "minResolutionHint": 0.0,
              "name": "place_of_worship",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 7,
          "metadata": {
            "isExpanded": true
          },
          "mixed": false,
          "name": "Patrimoine",
          "ogcServer": "Main PNG"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/patrimoine.jpeg",
      "id": 4,
      "metadata": {},
      "name": "Patrimoine"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "accommodation",
                  "queryable": true
                }
              ],
              "id": 123,
              "imageType": "image/png",
              "layers": "alpine_hut",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendRule": "H\u00f4tel"
              },
              "minResolutionHint": 0.0,
              "name": "accommodation",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "tourism_activity",
                  "queryable": true
                }
              ],
              "id": 108,
              "imageType": "image/png",
              "layers": "tourism_activity",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Mus\u00e9e"
              },
              "minResolutionHint": 0.0,
              "name": "tourism_activity",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 9,
          "metadata": {
            "isExpanded": true
          },
          "mixed": false,
          "name": "Paysage",
          "ogcServer": "Main PNG"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/paysage.jpeg",
      "id": 598,
      "metadata": {
        "disclaimer": "This is a test disclaimer, to test metadata addition."
      },
      "name": "Paysage"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "fuel",
                  "queryable": true
                }
              ],
              "id": 124,
              "imageType": "image/png",
              "layers": "fuel",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Station service"
              },
              "minResolutionHint": 0.0,
              "name": "fuel",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "tourism_activity",
                  "queryable": true
                }
              ],
              "id": 108,
              "imageType": "image/png",
              "layers": "tourism_activity",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Mus\u00e9e"
              },
              "minResolutionHint": 0.0,
              "name": "tourism_activity",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 563,
          "metadata": {},
          "mixed": false,
          "name": "Gestion des eaux",
          "ogcServer": "Main PNG"
        }
      ],
      "functionalities": {
        "default_basemap": [
          "OSM map"
        ],
        "default_theme": [
          "Cadastre"
        ],
        "location": [
          "\"Lausanne\": [535436, 155243, 539476, 150443]"
        ]
      },
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/osm.png",
      "id": 185,
      "metadata": {},
      "name": "Testsearchtheme"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "fuel",
                  "queryable": true
                }
              ],
              "id": 124,
              "imageType": "image/png",
              "layers": "fuel",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "isChecked": true,
                "legend": true,
                "legendRule": "Station service"
              },
              "minResolutionHint": 0.0,
              "name": "fuel",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "parking",
                  "queryable": true
                }
              ],
              "id": 103,
              "imageType": "image/png",
              "layers": "parking",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendRule": "Parking"
              },
              "minResolutionHint": 0.0,
              "name": "parking",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "bus_stop",
                  "queryable": true
                }
              ],
              "id": 101,
              "imageType": "image/png",
              "layers": "bus_stop",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "disclaimer": "\u00a9 Les contributeurs d\u2019<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
                "identifierAttributeField": "display_name",
                "legend": true,
                "legendRule": "Arr\u00eat de bus"
              },
              "minResolutionHint": 0.0,
              "name": "bus_stop",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 36,
          "metadata": {
            "disclaimer": "Test for a disclaimer to test metadata",
            "isExpanded": true
          },
          "mixed": false,
          "name": "Transport",
          "ogcServer": "Main PNG"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/transports.jpeg",
      "id": 37,
      "metadata": {},
      "name": "Transport"
    },
    {
      "children": [
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 14.0,
                  "minResolutionHint": 0.0,
                  "name": "points",
                  "queryable": true
                }
              ],
              "id": 237,
              "imageType": "image/png",
              "layers": "points",
              "maxResolutionHint": 14.0,
              "metadata": {
                "legend": true,
                "legendRule": "points",
                "snappingConfig": {}
              },
              "minResolutionHint": 0.0,
              "name": "points",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "railways",
                  "queryable": true
                }
              ],
              "id": 227,
              "imageType": "image/png",
              "layers": "railways",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true,
                "legendImage": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png",
                "legendRule": "railways",
                "snappingConfig": {}
              },
              "minResolutionHint": 0.0,
              "name": "railways",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "landuse",
                  "queryable": true
                }
              ],
              "id": 223,
              "imageType": "image/png",
              "layers": "landuse",
              "maxResolutionHint": 56.0,
              "metadata": {
                "legend": true,
                "legendRule": "landuse",
                "snappingConfig": {}
              },
              "minResolutionHint": 0.0,
              "name": "landuse",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "landuse_alias",
                  "queryable": true
                }
              ],
              "id": 257,
              "imageType": "image/png",
              "layers": "landuse_alias",
              "maxResolutionHint": 56.0,
              "metadata": {
                "legend": true,
                "legendRule": "landuse_alias"
              },
              "minResolutionHint": 0.0,
              "name": "landuse_alias",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 14.0,
                  "minResolutionHint": 0.0,
                  "name": "points",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "landuse",
                  "queryable": true
                }
              ],
              "id": 247,
              "imageType": "image/png",
              "layers": "points,landuse",
              "maxResolutionHint": 56.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "points+landuse",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "landuse_ingrp",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "time_ingrp",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "points_ingrp",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "railways_ingrp",
                  "queryable": true
                }
              ],
              "id": 228,
              "imageType": "image/png",
              "layers": "group",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "group",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "time",
                  "queryable": true
                }
              ],
              "id": 225,
              "imageType": "image/png",
              "layers": "time",
              "maxResolutionHint": 56.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "time range",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_firestations",
                  "queryable": true
                }
              ],
              "edit_columns": [
                {
                  "name": "name",
                  "nillable": true,
                  "type": "xsd:string"
                },
                {
                  "name": "geom",
                  "nillable": true,
                  "srid": 2056,
                  "type": "gml:PolygonPropertyType"
                }
              ],
              "editable": true,
              "id": 238,
              "imageType": "image/png",
              "layers": "osm_firestations",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true,
                "legendRule": "osm_firestations",
                "snappingConfig": {}
              },
              "minResolutionHint": 0.0,
              "name": "osm_firestations",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_hospitals",
                  "queryable": true
                }
              ],
              "edit_columns": [
                {
                  "name": "name",
                  "nillable": true,
                  "type": "xsd:string"
                },
                {
                  "name": "email",
                  "nillable": true,
                  "type": "xsd:string"
                },
                {
                  "name": "link",
                  "nillable": true,
                  "type": "xsd:string"
                },
                {
                  "name": "datetime",
                  "nillable": true,
                  "type": "xsd:dateTime"
                },
                {
                  "name": "date",
                  "nillable": true,
                  "type": "xsd:date"
                },
                {
                  "name": "geom",
                  "nillable": true,
                  "srid": 2056,
                  "type": "gml:PointPropertyType"
                }
              ],
              "editable": true,
              "id": 240,
              "imageType": "image/png",
              "layers": "osm_hospitals",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "directedFilterAttributes": [
                  "date"
                ],
                "legend": true,
                "timeAttribute": "date"
              },
              "minResolutionHint": 0.0,
              "name": "osm_hospitals",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_firestations_ingrp",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_hospitals_ingrp",
                  "queryable": true
                }
              ],
              "id": 244,
              "imageType": "image/png",
              "layers": "osm",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "osm_group",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_hospitals",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_firestations",
                  "queryable": true
                }
              ],
              "id": 258,
              "imageType": "image/png",
              "layers": "osm_hospitals,osm_firestations",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "osm_dual",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "restricted",
                  "queryable": true
                }
              ],
              "id": 226,
              "imageType": "image/png",
              "layers": "restricted",
              "maxResolutionHint": 56.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "restricted",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "pointscopier",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "pointslabels",
                  "queryable": true
                }
              ],
              "id": 283,
              "imageType": "image/png",
              "layers": "filter_group",
              "maxResolutionHint": 56.0,
              "metadata": {},
              "minResolutionHint": 0.0,
              "name": "filter_group",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 235,
          "metadata": {
            "isExpanded": true
          },
          "mixed": false,
          "name": "QGIS server",
          "ogcServer": "QGIS server"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_firestations_restricted",
                  "queryable": true
                }
              ],
              "id": 269,
              "imageType": "image/png",
              "layers": "osm_firestations_restricted",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true,
                "legendRule": "osm_firestations_restricted"
              },
              "minResolutionHint": 0.0,
              "name": "osm_firestations_restricted",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_hospitals_restricted",
                  "queryable": true
                }
              ],
              "id": 239,
              "imageType": "image/png",
              "layers": "osm_hospitals_restricted",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true,
                "legendRule": "osm_hospitals_restricted"
              },
              "minResolutionHint": 0.0,
              "name": "osm_hospitals_restricted",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_hospitals_dual_restricted",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_firestations_dual_restricted",
                  "queryable": true
                }
              ],
              "id": 243,
              "imageType": "image/png",
              "layers": "osm_hospitals_dual_restricted,osm_firestations_dual_restricted",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "osm_dual_restricted",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_firestations_restricted_ingrp",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_hospitals_restricted_ingrp",
                  "queryable": true
                }
              ],
              "id": 259,
              "imageType": "image/png",
              "layers": "restricted_group",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "osm_group_restricted",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 270,
          "metadata": {},
          "mixed": false,
          "name": "Private group",
          "ogcServer": "QGIS server"
        },
        {
          "children": [
            {
              "childLayers": [
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "landuse",
                  "queryable": true
                }
              ],
              "id": 234,
              "imageType": "image/png",
              "layers": "landuse",
              "maxResolutionHint": 56.0,
              "metadata": {
                "legend": true,
                "legendRule": "landuse"
              },
              "minResolutionHint": 0.0,
              "name": "landuse no wfs",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 14.0,
                  "minResolutionHint": 0.0,
                  "name": "points",
                  "queryable": true
                }
              ],
              "id": 233,
              "imageType": "image/png",
              "layers": "points",
              "maxResolutionHint": 14.0,
              "metadata": {
                "legend": true,
                "legendRule": "points"
              },
              "minResolutionHint": 0.0,
              "name": "points no wfs",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "railways",
                  "queryable": true
                }
              ],
              "id": 232,
              "imageType": "image/png",
              "layers": "railways",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true,
                "legendRule": "railways"
              },
              "minResolutionHint": 0.0,
              "name": "railways no wfs",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 14.0,
                  "minResolutionHint": 0.0,
                  "name": "points",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "landuse",
                  "queryable": true
                }
              ],
              "id": 248,
              "imageType": "image/png",
              "layers": "points,landuse",
              "maxResolutionHint": 56.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "points+landuse no wfs",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "landuse_ingrp",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "time_ingrp",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 56.0,
                  "minResolutionHint": 0.0,
                  "name": "points_ingrp",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "railways_ingrp",
                  "queryable": true
                }
              ],
              "id": 236,
              "imageType": "image/png",
              "layers": "group",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "group no wfs",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_firestations",
                  "queryable": true
                }
              ],
              "id": 241,
              "imageType": "image/png",
              "layers": "osm_firestations",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true,
                "legendRule": "osm_firestations"
              },
              "minResolutionHint": 0.0,
              "name": "osm_firestations no wfs",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_hospitals",
                  "queryable": true
                }
              ],
              "id": 242,
              "imageType": "image/png",
              "layers": "osm_hospitals",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true,
                "legendRule": "osm_hospitals"
              },
              "minResolutionHint": 0.0,
              "name": "osm_hospitals no wfs",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_hospitals",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_firestations",
                  "queryable": true
                }
              ],
              "id": 245,
              "imageType": "image/png",
              "layers": "osm_hospitals,osm_firestations",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "osm dual no wfs",
              "type": "WMS"
            },
            {
              "childLayers": [
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_firestations_ingrp",
                  "queryable": true
                },
                {
                  "maxResolutionHint": 999999999.0,
                  "minResolutionHint": 0.0,
                  "name": "osm_hospitals_ingrp",
                  "queryable": true
                }
              ],
              "id": 246,
              "imageType": "image/png",
              "layers": "osm",
              "maxResolutionHint": 999999999.0,
              "metadata": {
                "legend": true
              },
              "minResolutionHint": 0.0,
              "name": "osm group no wfs",
              "type": "WMS"
            }
          ],
          "dimensions": {},
          "id": 222,
          "metadata": {},
          "mixed": false,
          "name": "QGIS server no WFS",
          "ogcServer": "QGIS server no WFS"
        }
      ],
      "functionalities": {},
      "icon": "https://geomapfish-demo-2-7.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/img/QGIS_logo_2017.png",
      "id": 221,
      "metadata": {},
      "name": "QGIS server"
    }
  ]
}
