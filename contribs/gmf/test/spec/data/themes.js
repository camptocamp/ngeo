goog.provide('gmf.test.data.themes');

var themes = {
  "themes": [{
    "name": "Enseignement 2",
    "functionalities": {},
    "id": 38,
    "icon": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/b7a05523c1fb4cc78927cb8c4b89b813/img/enseignement.jpeg",
    "children": [{
      "name": "Enseignement",
      "id": 35,
      "mixed": false,
      "serverOGC": "source for image/jpeg",
      "children": [{
        "layers": "bus_stop",
        "name": "bus_stop",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "bus_stop",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 101,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "legendRule": "Arr\u00eats de bus",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }, {
        "layers": "information",
        "name": "information",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "information",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 98,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "Informations",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }],
      "metadata": {
        "isExpanded": "true"
      }
    }],
    "metadata": {}
  }, {
    "name": "Transport",
    "functionalities": {},
    "id": 37,
    "icon": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/b7a05523c1fb4cc78927cb8c4b89b813/img/transports.jpeg",
    "children": [{
      "name": "Transport",
      "id": 36,
      "mixed": false,
      "serverOGC": "source for image/jpeg",
      "children": [{
        "layers": "fuel",
        "name": "fuel",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "fuel",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 124,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "Stations service",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }, {
        "layers": "parking",
        "name": "parking",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "parking",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 103,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "legendRule": "Parkings",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }, {
        "layers": "bus_stop",
        "name": "bus_stop",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "bus_stop",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 101,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "legendRule": "Arr\u00eats de bus",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }],
      "metadata": {
        "isExpanded": "true"
      }
    }],
    "metadata": {}
  }, {
    "name": "Cadastre",
    "functionalities": {},
    "id": 29,
    "icon": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/b7a05523c1fb4cc78927cb8c4b89b813/img/cadastre.jpeg",
    "children": [{
      "mixed": true,
      "metadata": {
        "isExpanded": "true"
      },
      "children": [{
        "layers": "ch.swisstopo.dreiecksvermaschung",
        "minResolutionHint": 0.0,
        "name": "ch.swisstopo.dreiecksvermaschung",
        "url": "http://wms.geo.admin.ch?lang=fr",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "minResolutionHint": 0.0,
          "name": "ch.swisstopo.dreiecksvermaschung",
          "maxResolutionHint": 26458.319045841065,
          "queryable": true
        }],
        "wfsSupport": false,
        "maxResolutionHint": 26458.319045841065,
        "urlWfs": "http://wms.geo.admin.ch?lang=fr",
        "serverOGC": "source for http://wms.geo.admin.ch?lang=fr",
        "type": "WMS",
        "id": 115,
        "imageType": "image/jpeg",
        "metadata": {
          "legend": "true",
          "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>"
        }
      }, {
        "layers": "ch.swisstopo.geologie-gravimetrischer_atlas",
        "minResolutionHint": 0.0,
        "name": "ch.swisstopo.geologie-gravimetrischer_atlas",
        "url": "http://wms.geo.admin.ch?lang=fr",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "minResolutionHint": 0.0,
          "name": "ch.swisstopo.geologie-gravimetrischer_atlas",
          "maxResolutionHint": 26458.319045841065,
          "queryable": true
        }],
        "wfsSupport": false,
        "maxResolutionHint": 26458.319045841065,
        "urlWfs": "http://wms.geo.admin.ch?lang=fr",
        "serverOGC": "source for http://wms.geo.admin.ch?lang=fr",
        "type": "WMS",
        "id": 116,
        "imageType": "image/jpeg",
        "metadata": {
          "legend": "true",
          "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>"
        }
      }, {
        "layers": "ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen",
        "minResolutionHint": 0.0,
        "name": "ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen",
        "url": "http://wms.geo.admin.ch?lang=fr",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "minResolutionHint": 0.0,
          "name": "ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen",
          "maxResolutionHint": 26458.319045841065,
          "queryable": true
        }],
        "wfsSupport": false,
        "maxResolutionHint": 26458.319045841065,
        "urlWfs": "http://wms.geo.admin.ch?lang=fr",
        "serverOGC": "source for http://wms.geo.admin.ch?lang=fr",
        "type": "WMS",
        "id": 117,
        "imageType": "image/jpeg",
        "metadata": {
          "isChecked": "true",
          "legend": "true",
          "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>"
        }
      }, {
        "layers": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
        "minResolutionHint": 0.0,
        "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
        "url": "http://wms.geo.admin.ch?lang=fr",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "minResolutionHint": 0.0,
          "name": "ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung",
          "maxResolutionHint": 26458.319045841065,
          "queryable": true
        }],
        "wfsSupport": false,
        "maxResolutionHint": 26458.319045841065,
        "urlWfs": "http://wms.geo.admin.ch?lang=fr",
        "serverOGC": "source for http://wms.geo.admin.ch?lang=fr",
        "type": "WMS",
        "id": 118,
        "imageType": "image/jpeg",
        "metadata": {
          "legend": "true",
          "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>"
        }
      }, {
        "name": "ch.are.alpenkonvention",
        "url": "https://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr",
        "type": "WMTS",
        "dimensions": {},
        "matrixSet": "21781_26",
        "id": 119,
        "imageType": "image/jpeg",
        "metadata": {
          "wmsUrl": "https://wms.geo.admin.ch/",
          "wmsLayers": "ch.are.alpenkonvention",
          "minResolutionHint": "10",
          "maxResolutionHint": "1000",
          "maxResolution": "1000.0",
          "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
          "legend": "true",
          "minResolution": "100.0"
        }
      }, {
        "style": "ch.astra.ausnahmetransportrouten",
        "name": "ch.astra.ausnahmetransportrouten",
        "url": "https://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr",
        "matrixSet": "21781_26",
        "dimensions": {
          "Time": "20141003"
        },
        "type": "WMTS",
        "id": 120,
        "imageType": "image/jpeg",
        "metadata": {
          "wmsUrl": "https://wms.geo.admin.ch/",
          "queryLayers": "ch.astra.ausnahmetransportrouten",
          "legend": "true",
          "disclaimer": "<a href=\"http://www.geo.admin.ch/\">Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>"
        }
      }],
      "id": 30,
      "name": "Cadastre"
    }],
    "metadata": {}
  }, {
    "name": "OSM",
    "functionalities": {
      "default_basemap": ["map"]
    },
    "id": 64,
    "icon": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/b7a05523c1fb4cc78927cb8c4b89b813/img/osm.png",
    "children": [{
      "mixed": true,
      "metadata": {
        "isExpanded": "true"
      },
      "children": [{
        "layers": "osm_time",
        "name": "osm_time",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "osm_time",
          "queryable": true
        }],
        "wfsSupport": true,
        "time": {
          "widget": "slider",
          "interval": [0, 1, 0, 0],
          "maxValue": "2013-12-31T00:00:00Z",
          "minValue": "2006-01-01T00:00:00Z",
          "maxDefValue": null,
          "minDefValue": null,
          "resolution": "day",
          "mode": "range"
        },
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "serverOGC": "source for image/jpeg",
        "type": "WMS",
        "id": 110,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "name",
          "isChecked": "true",
          "legendRule": "Dans les temps",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }, {
        "layers": "osm_scale",
        "minResolutionHint": 0.5291663809168212,
        "name": "osm_scale",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "minResolutionHint": 0.5291663809168212,
          "name": "osm_scale",
          "maxResolutionHint": 1.4111103491115238,
          "queryable": true
        }],
        "wfsSupport": true,
        "maxResolutionHint": 1.4111103491115238,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "serverOGC": "source for image/jpeg",
        "type": "WMS",
        "id": 114,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "OSM",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }, {
        "layers": "osm_open",
        "name": "osm_open",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "osm_open",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "serverOGC": "source for image/png",
        "type": "WMS",
        "id": 139,
        "imageType": "image/png",
        "metadata": {}
      }, {
        "layers": "restaurant",
        "name": "Layer with very very very very very long name",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "restaurant",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "serverOGC": "source for image/jpeg",
        "type": "WMS",
        "id": 140,
        "imageType": "image/jpeg",
        "metadata": {}
      }],
      "id": 68,
      "name": "OSM function"
    }, {
      "name": "Layers",
      "id": 63,
      "mixed": false,
      "serverOGC": "source for image/jpeg",
      "children": [{
        "layers": "hotel",
        "name": "hotel",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "hotel",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 97,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "H\u00f4tels",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }, {
        "layers": "cinema",
        "name": "cinema",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "cinema",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 99,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "Cin\u00e9mas",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }, {
        "layers": "police",
        "name": "police",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "police",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 105,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "Postes de police",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }, {
        "layers": "post_office",
        "name": "post_office",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "post_office",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 106,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "Offices de poste",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }, {
        "layers": "osm_time",
        "name": "osm_time",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "osm_time",
          "queryable": true
        }],
        "wfsSupport": true,
        "time": {
          "widget": "datepicker",
          "interval": [0, 1, 0, 0],
          "maxValue": "2013-12-31T00:00:00Z",
          "minValue": "2006-01-01T00:00:00Z",
          "maxDefValue": null,
          "minDefValue": null,
          "resolution": "day",
          "mode": "range"
        },
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 126,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "name",
          "legend": "true",
          "legendRule": "Dans les temps"
        }
      }, {
        "metadata": {},
        "children": [{
          "layers": "cafe",
          "name": "cafe",
          "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
          "isSingleTile": false,
          "serverType": "mapserver",
          "childLayers": [{
            "name": "cafe",
            "queryable": true
          }],
          "wfsSupport": true,
          "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
          "type": "WMS",
          "id": 102,
          "imageType": "image/jpeg",
          "metadata": {
            "identifierAttributeField": "display_name",
            "isChecked": "true",
            "legendRule": "Caf\u00e9s",
            "legend": "true",
            "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
          }
        }, {
          "layers": "restaurant",
          "name": "restaurant",
          "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
          "isSingleTile": false,
          "serverType": "mapserver",
          "childLayers": [{
            "name": "restaurant",
            "queryable": true
          }],
          "wfsSupport": true,
          "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
          "type": "WMS",
          "id": 107,
          "imageType": "image/jpeg",
          "metadata": {
            "identifierAttributeField": "display_name",
            "isChecked": "true",
            "legendRule": "Restaurants",
            "legend": "true",
            "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
          }
        }],
        "id": 137,
        "name": "Restaurants"
      }],
      "metadata": {}
    }, {
      "name": "Group",
      "id": 66,
      "mixed": false,
      "serverOGC": "source for image/jpeg",
      "children": [{
        "layers": "osm",
        "name": "osm",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "fuel",
          "queryable": true
        }, {
          "name": "hotel",
          "queryable": true
        }, {
          "name": "information",
          "queryable": true
        }, {
          "name": "cinema",
          "queryable": true
        }, {
          "name": "alpine_hut",
          "queryable": true
        }, {
          "name": "bus_stop",
          "queryable": true
        }, {
          "name": "cafe",
          "queryable": true
        }, {
          "name": "parking",
          "queryable": true
        }, {
          "name": "police",
          "queryable": true
        }, {
          "name": "post_office",
          "queryable": true
        }, {
          "name": "restaurant",
          "queryable": true
        }, {
          "name": "bank",
          "queryable": true
        }, {
          "name": "place_of_worship",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 109,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isLegendExpanded": "true",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OSM"
        }
      }],
      "metadata": {}
    }],
    "metadata": {}
  }, {
    "name": "Edit",
    "functionalities": {},
    "id": 73,
    "icon": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/b7a05523c1fb4cc78927cb8c4b89b813/img/edit.png",
    "children": [{
      "mixed": true,
      "metadata": {
        "isExpanded": "true",
        "disclaimer": "Editing theme"
      },
      "children": [{
        "layers": "line",
        "name": "line",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "line",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "serverOGC": "source for image/png",
        "type": "WMS",
        "id": 111,
        "imageType": "image/png",
        "metadata": {
          "identifierAttributeField": "name",
          "isChecked": "true",
          "legend": "true",
          "legendRule": "Line"
        }
      }, {
        "layers": "polygon",
        "name": "polygon",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "polygon",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "serverOGC": "source for image/png",
        "type": "WMS",
        "id": 112,
        "imageType": "image/png",
        "metadata": {
          "identifierAttributeField": "name",
          "isChecked": "true",
          "legend": "true",
          "legendRule": "Polygon"
        }
      }, {
        "layers": "point",
        "name": "point",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "point",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "serverOGC": "source for image/jpeg",
        "type": "WMS",
        "id": 113,
        "imageType": "image/jpeg",
        "metadata": {
          "metadataUrl": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/b7a05523c1fb4cc78927cb8c4b89b813/htdocs/example.html",
          "isChecked": "true",
          "identifierAttributeField": "name",
          "legend": "true",
          "legendRule": "Point"
        }
      }],
      "id": 72,
      "name": "Edit"
    }],
    "metadata": {
      "disclaimer": "Editing theme"
    }
  }, {
    "name": "Enseignement",
    "functionalities": {},
    "id": 92,
    "icon": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/b7a05523c1fb4cc78927cb8c4b89b813/img/enseignement2.jpeg",
    "children": [{
      "name": "Enseignement",
      "id": 93,
      "mixed": false,
      "serverOGC": "source for image/jpeg",
      "children": [{
        "layers": "bus_stop",
        "name": "bus_stop",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "bus_stop",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 101,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "legendRule": "Arr\u00eats de bus",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }],
      "metadata": {}
    }],
    "metadata": {}
  }, {
    "name": "Patrimoine",
    "functionalities": {},
    "id": 4,
    "icon": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/b7a05523c1fb4cc78927cb8c4b89b813/img/patrimoine.jpeg",
    "children": [{
      "name": "Patrimoine",
      "id": 7,
      "mixed": false,
      "serverOGC": "source for image/jpeg",
      "children": [{
        "layers": "bank",
        "name": "bank",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "bank",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 100,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "Banques",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }, {
        "layers": "place_of_worship",
        "name": "place_of_worship",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "place_of_worship",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 104,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "Lieux de culte",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }],
      "metadata": {
        "isExpanded": "true"
      }
    }],
    "metadata": {}
  }, {
    "name": "Gestion des eaux",
    "functionalities": {},
    "id": 3,
    "icon": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/b7a05523c1fb4cc78927cb8c4b89b813/img/gestion_eaux.jpeg",
    "children": [{
      "name": "Gestion des eaux",
      "id": 8,
      "mixed": false,
      "serverOGC": "source for image/jpeg",
      "children": [{
        "layers": "fuel",
        "name": "fuel",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "fuel",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 124,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "Stations service",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }],
      "metadata": {
        "isExpanded": "true"
      }
    }],
    "metadata": {}
  }, {
    "name": "Paysage",
    "functionalities": {},
    "id": 2,
    "icon": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/b7a05523c1fb4cc78927cb8c4b89b813/img/paysage.jpeg",
    "children": [{
      "name": "Paysage",
      "id": 9,
      "mixed": false,
      "serverOGC": "source for image/jpeg",
      "children": [{
        "layers": "alpine_hut",
        "name": "alpine_hut",
        "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "isSingleTile": false,
        "serverType": "mapserver",
        "childLayers": [{
          "name": "alpine_hut",
          "queryable": true
        }],
        "wfsSupport": true,
        "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
        "type": "WMS",
        "id": 123,
        "imageType": "image/jpeg",
        "metadata": {
          "identifierAttributeField": "display_name",
          "isChecked": "true",
          "legendRule": "Cabanes alpines",
          "legend": "true",
          "disclaimer": "\u00a9 les contributeurs d\u2019OpenStreetMap"
        }
      }],
      "metadata": {
        "isExpanded": "true"
      }
    }],
    "metadata": {}
  }],
  "background_layers": [{
    "name": "map",
    "url": "https://geomapfish-demo.camptocamp.net/2.0/tiles/1.0.0/WMTSCapabilities.xml",
    "dimensions": {},
    "type": "WMTS",
    "id": 134,
    "imageType": "image/jpeg",
    "metadata": {
      "thumbnail": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/-/img/cadastre.jpeg"
    }
  }],
  "errors": ["The layer 'zoo' (zoo) is not defined in WMS capabilities"],
  "serversOGC": {
    "source for http://wms.geo.admin.ch?lang=fr": {
      "wfsSupport": false,
      "url": "http://wms.geo.admin.ch?lang=fr",
      "isSingleTile": false,
      "auth": "none",
      "urlWfs": "http://wms.geo.admin.ch?lang=fr",
      "type": "mapserver",
      "imageType": "image/jpeg"
    },
    "source for image/jpeg": {
      "wfsSupport": true,
      "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
      "isSingleTile": false,
      "auth": "main",
      "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
      "type": "mapserver",
      "imageType": "image/jpeg"
    },
    "source for image/png": {
      "wfsSupport": true,
      "url": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
      "isSingleTile": false,
      "auth": "main",
      "urlWfs": "https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy?cache_version=b7a05523c1fb4cc78927cb8c4b89b813",
      "type": "mapserver",
      "imageType": "image/png"
    }
  }
};

var capabilities = {
  "asitvd": '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd" version="1.0.0"><ows:ServiceIdentification><ows:Title>ASITVD-WMTS-FONDS</ows:Title><ows:Abstract>Ce service permet l affichage d\'un fond de plan homogegravene et harmonieux sur tout le canton. Ce fond de plan pourra avantageusement mettre en valeur vos données dans un guichet cartographique ou une application métier. </ows:Abstract><ows:ServiceType>OGC WMTS</ows:ServiceType><ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion></ows:ServiceIdentification><ows:ServiceProvider><ows:ServiceContact><ows:ContactInfo></ows:ContactInfo></ows:ServiceContact></ows:ServiceProvider><ows:OperationsMetadata><ows:Operation name="GetCapabilities"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://ows.asitvd.ch/wmts?"><ows:Constraint name="GetEncoding"><ows:AllowedValues><ows:Value>KVP</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get></ows:HTTP></ows:DCP></ows:Operation><ows:Operation name="GetTile"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://ows.asitvd.ch/wmts?"><ows:Constraint name="GetEncoding"><ows:AllowedValues><ows:Value>KVP</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get></ows:HTTP></ows:DCP></ows:Operation><ows:Operation name="GetFeatureInfo"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://ows.asitvd.ch/wmts?"><ows:Constraint name="GetEncoding"><ows:AllowedValues><ows:Value>KVP</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get></ows:HTTP></ows:DCP></ows:Operation></ows:OperationsMetadata><Contents><Layer><ows:Title>Fond ASIT VD - couleur</ows:Title><ows:Abstract>Service de fond de plan WMTS ASIT VD: données OSM et Etat de Vaud - couleurs</ows:Abstract><ows:Identifier>asitvd.fond_couleur</ows:Identifier><Style isDefault="true"><ows:Identifier>default</ows:Identifier></Style><Format>image/png</Format><Dimension><ows:Identifier>DIM1</ows:Identifier><Default>default</Default><Value>default</Value></Dimension><Dimension><ows:Identifier>ELEVATION</ows:Identifier><Default>0</Default><Value>0</Value></Dimension><TileMatrixSetLink><TileMatrixSet>21781</TileMatrixSet></TileMatrixSetLink><TileMatrixSetLink><TileMatrixSet>2056</TileMatrixSet></TileMatrixSetLink><ResourceURL format="image/png" resourceType="tile" template="http://ows.asitvd.ch/wmts/1.0.0/asitvd.fond_couleur/default/{DIM1}/{ELEVATION}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"></ResourceURL></Layer><Layer><ows:Title>Fond de plan ASIT VD - transparent pour photos</ows:Title><ows:Abstract>Service de fond de plan WMTS ASIT VD: données OSM et Etat de Vaud - transparent pour orthophotos</ows:Abstract><ows:Identifier>asitvd.fond_pourortho</ows:Identifier><Style isDefault="true"><ows:Identifier>default</ows:Identifier></Style><Format>image/png</Format><Dimension><ows:Identifier>DIM1</ows:Identifier><Default>default</Default><Value>default</Value></Dimension><Dimension><ows:Identifier>ELEVATION</ows:Identifier><Default>0</Default><Value>0</Value></Dimension><TileMatrixSetLink><TileMatrixSet>21781</TileMatrixSet></TileMatrixSetLink><TileMatrixSetLink><TileMatrixSet>2056</TileMatrixSet></TileMatrixSetLink><ResourceURL format="image/png" resourceType="tile" template="http://ows.asitvd.ch/wmts/1.0.0/asitvd.fond_pourortho/default/{DIM1}/{ELEVATION}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"></ResourceURL></Layer><Layer><ows:Title>Fond ASIT VD - niveau de gris</ows:Title><ows:Abstract>Service de fond de plan WMTS ASIT VD: données OSM et Etat de Vaud - tons de gris</ows:Abstract><ows:Identifier>asitvd.fond_gris</ows:Identifier><Style isDefault="true"><ows:Identifier>default</ows:Identifier></Style><Format>image/png</Format><Dimension><ows:Identifier>DIM1</ows:Identifier><Default>default</Default><Value>default</Value></Dimension><Dimension><ows:Identifier>ELEVATION</ows:Identifier><Default>0</Default><Value>0</Value></Dimension><TileMatrixSetLink><TileMatrixSet>21781</TileMatrixSet></TileMatrixSetLink><TileMatrixSetLink><TileMatrixSet>2056</TileMatrixSet></TileMatrixSetLink><ResourceURL format="image/png" resourceType="tile" template="http://ows.asitvd.ch/wmts/1.0.0/asitvd.fond_gris/default/{DIM1}/{ELEVATION}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"></ResourceURL></Layer><TileMatrixSet><ows:Identifier>21781</ows:Identifier><ows:BoundingBox crs="urn:ogc:def:crs:EPSG:6.3:21781"><ows:LowerCorner>420000.000000 30000.000000</ows:LowerCorner><ows:UpperCorner>900000.000000 350000.000000</ows:UpperCorner></ows:BoundingBox><ows:SupportedCRS>urn:ogc:def:crs:EPSG:6.3:21781</ows:SupportedCRS><TileMatrix><ows:Identifier>0</ows:Identifier><ScaleDenominator>14285714.28571428731083869934</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>1</ows:Identifier><ScaleDenominator>13392857.14285714365541934967</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>2</ows:Identifier><ScaleDenominator>12500000.00000000186264514923</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>3</ows:Identifier><ScaleDenominator>11607142.85714285820722579956</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>4</ows:Identifier><ScaleDenominator>10714285.71428571455180644989</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>5</ows:Identifier><ScaleDenominator>9821428.57142857275903224945</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>6</ows:Identifier><ScaleDenominator>8928571.42857142910361289978</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>7</ows:Identifier><ScaleDenominator>8035714.28571428637951612473</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>8</ows:Identifier><ScaleDenominator>7142857.14285714365541934967</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>9</ows:Identifier><ScaleDenominator>6250000.00000000093132257462</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>10</ows:Identifier><ScaleDenominator>5357142.85714285727590322495</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>11</ows:Identifier><ScaleDenominator>4464285.71428571455180644989</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>12</ows:Identifier><ScaleDenominator>3571428.57142857182770967484</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>13</ows:Identifier><ScaleDenominator>2678571.42857142863795161247</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>14</ows:Identifier><ScaleDenominator>2321428.57142857182770967484</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>15</ows:Identifier><ScaleDenominator>1785714.28571428591385483742</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>4</MatrixWidth><MatrixHeight>3</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>16</ows:Identifier><ScaleDenominator>892857.14285714295692741871</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>8</MatrixWidth><MatrixHeight>5</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>17</ows:Identifier><ScaleDenominator>357142.85714285715948790312</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>19</MatrixWidth><MatrixHeight>13</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>18</ows:Identifier><ScaleDenominator>178571.42857142857974395156</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>38</MatrixWidth><MatrixHeight>25</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>19</ows:Identifier><ScaleDenominator>71428.57142857143480796367</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>94</MatrixWidth><MatrixHeight>63</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>20</ows:Identifier><ScaleDenominator>35714.28571428571740398183</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>188</MatrixWidth><MatrixHeight>125</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>21</ows:Identifier><ScaleDenominator>17857.14285714285870199092</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>375</MatrixWidth><MatrixHeight>250</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>22</ows:Identifier><ScaleDenominator>8928.57142857142935099546</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>750</MatrixWidth><MatrixHeight>500</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>23</ows:Identifier><ScaleDenominator>7142.85714285714311699849</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>938</MatrixWidth><MatrixHeight>625</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>24</ows:Identifier><ScaleDenominator>5357.14285714285779249622</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1250</MatrixWidth><MatrixHeight>834</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>25</ows:Identifier><ScaleDenominator>3571.42857142857155849924</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1875</MatrixWidth><MatrixHeight>1250</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>26</ows:Identifier><ScaleDenominator>1785.71428571428577924962</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3750</MatrixWidth><MatrixHeight>2500</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>27</ows:Identifier><ScaleDenominator>892.85714285714288962481</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>7500</MatrixWidth><MatrixHeight>5000</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>28</ows:Identifier><ScaleDenominator>357.14285714285716721861</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>18750</MatrixWidth><MatrixHeight>12500</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>29</ows:Identifier><ScaleDenominator>178.57142857142858360930</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>37500</MatrixWidth><MatrixHeight>25000</MatrixHeight></TileMatrix></TileMatrixSet><TileMatrixSet><ows:Identifier>2056</ows:Identifier><ows:BoundingBox crs="urn:ogc:def:crs:EPSG:6.3:2056"><ows:LowerCorner>2420000.000000 130000.000000</ows:LowerCorner><ows:UpperCorner>2900000.000000 1350000.000000</ows:UpperCorner></ows:BoundingBox><ows:SupportedCRS>urn:ogc:def:crs:EPSG:6.3:2056</ows:SupportedCRS><TileMatrix><ows:Identifier>0</ows:Identifier><ScaleDenominator>14285714.28571428731083869934</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>1</ows:Identifier><ScaleDenominator>13392857.14285714365541934967</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>2</ows:Identifier><ScaleDenominator>12500000.00000000186264514923</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>3</ows:Identifier><ScaleDenominator>11607142.85714285820722579956</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>4</ows:Identifier><ScaleDenominator>10714285.71428571455180644989</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>5</ows:Identifier><ScaleDenominator>9821428.57142857275903224945</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>6</ows:Identifier><ScaleDenominator>8928571.42857142910361289978</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>7</ows:Identifier><ScaleDenominator>8035714.28571428637951612473</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>3</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>8</ows:Identifier><ScaleDenominator>7142857.14285714365541934967</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>3</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>9</ows:Identifier><ScaleDenominator>6250000.00000000093132257462</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>3</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>10</ows:Identifier><ScaleDenominator>5357142.85714285727590322495</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>4</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>11</ows:Identifier><ScaleDenominator>4464285.71428571455180644989</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>4</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>12</ows:Identifier><ScaleDenominator>3571428.57142857182770967484</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>5</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>13</ows:Identifier><ScaleDenominator>2678571.42857142863795161247</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3</MatrixWidth><MatrixHeight>7</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>14</ows:Identifier><ScaleDenominator>2321428.57142857182770967484</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3</MatrixWidth><MatrixHeight>8</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>15</ows:Identifier><ScaleDenominator>1785714.28571428591385483742</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>4</MatrixWidth><MatrixHeight>10</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>16</ows:Identifier><ScaleDenominator>892857.14285714295692741871</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>8</MatrixWidth><MatrixHeight>20</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>17</ows:Identifier><ScaleDenominator>357142.85714285715948790312</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>19</MatrixWidth><MatrixHeight>48</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>18</ows:Identifier><ScaleDenominator>178571.42857142857974395156</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>38</MatrixWidth><MatrixHeight>96</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>19</ows:Identifier><ScaleDenominator>71428.57142857143480796367</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>94</MatrixWidth><MatrixHeight>239</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>20</ows:Identifier><ScaleDenominator>35714.28571428571740398183</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>188</MatrixWidth><MatrixHeight>477</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>21</ows:Identifier><ScaleDenominator>17857.14285714285870199092</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>375</MatrixWidth><MatrixHeight>954</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>22</ows:Identifier><ScaleDenominator>8928.57142857142935099546</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>750</MatrixWidth><MatrixHeight>1907</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>23</ows:Identifier><ScaleDenominator>7142.85714285714311699849</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>938</MatrixWidth><MatrixHeight>2383</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>24</ows:Identifier><ScaleDenominator>5357.14285714285779249622</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1250</MatrixWidth><MatrixHeight>3178</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>25</ows:Identifier><ScaleDenominator>3571.42857142857155849924</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1875</MatrixWidth><MatrixHeight>4766</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>26</ows:Identifier><ScaleDenominator>1785.71428571428577924962</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3750</MatrixWidth><MatrixHeight>9532</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>27</ows:Identifier><ScaleDenominator>892.85714285714288962481</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>7500</MatrixWidth><MatrixHeight>19063</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>28</ows:Identifier><ScaleDenominator>357.14285714285716721861</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>18750</MatrixWidth><MatrixHeight>47657</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>29</ows:Identifier><ScaleDenominator>178.57142857142858360930</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>37500</MatrixWidth><MatrixHeight>95313</MatrixHeight></TileMatrix></TileMatrixSet></Contents></Capabilities>',

  map: '<Capabilities version="1.0.0" xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xsi:schemaLocation="http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd"> <ows:ServiceIdentification> </ows:ServiceIdentification> <ows:ServiceProvider> </ows:ServiceProvider> <ows:OperationsMetadata> <ows:Operation name="GetCapabilities"> <ows:DCP> <ows:HTTP> <ows:Get xlink:href="https://tiles.geomapfish-demo.camptocamp.net/1.0.0/WMTSCapabilities.xml"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> </ows:HTTP> </ows:DCP> </ows:Operation> <ows:Operation name="GetTile"> <ows:DCP> <ows:HTTP> <ows:Get xlink:href="https://tiles.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles0.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles1.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles2.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles3.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles4.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles5.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles6.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles7.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles8.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles9.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> </ows:HTTP> </ows:DCP> </ows:Operation> </ows:OperationsMetadata> <!-- <ServiceMetadataURL xlink:href="" /> --> <Contents> <Layer> <ows:Title>map</ows:Title> <ows:Identifier>map</ows:Identifier> <Style isDefault="true"> <ows:Identifier>default</ows:Identifier> </Style> <Format>image/png</Format> <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles0.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles1.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles2.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles3.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles4.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles5.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles6.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles7.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles8.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles9.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <TileMatrixSetLink> <TileMatrixSet>swissgrid_005</TileMatrixSet> </TileMatrixSetLink> </Layer> <Layer> <ows:Title>map_jpeg</ows:Title> <ows:Identifier>map_jpeg</ows:Identifier> <Style isDefault="true"> <ows:Identifier>default</ows:Identifier> </Style> <Format>image/jpeg</Format> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles0.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles1.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles2.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles3.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles4.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles5.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles6.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles7.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles8.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles9.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <TileMatrixSetLink> <TileMatrixSet>swissgrid_005</TileMatrixSet> </TileMatrixSetLink> </Layer> <TileMatrixSet> <ows:Identifier>swissgrid_005</ows:Identifier> <ows:SupportedCRS>urn:ogc:def:crs:epsg::21781</ows:SupportedCRS> <TileMatrix> <ows:Identifier>0</ows:Identifier> <ScaleDenominator>3571428.57143</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>2</MatrixWidth> <MatrixHeight>2</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>1</ows:Identifier> <ScaleDenominator>1785714.28571</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>4</MatrixWidth> <MatrixHeight>3</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>2</ows:Identifier> <ScaleDenominator>892857.142857</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>8</MatrixWidth> <MatrixHeight>5</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>3</ows:Identifier> <ScaleDenominator>357142.857143</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>19</MatrixWidth> <MatrixHeight>13</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>4</ows:Identifier> <ScaleDenominator>178571.428571</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>38</MatrixWidth> <MatrixHeight>25</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>5</ows:Identifier> <ScaleDenominator>71428.5714286</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>94</MatrixWidth> <MatrixHeight>63</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>6</ows:Identifier> <ScaleDenominator>35714.2857143</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>188</MatrixWidth> <MatrixHeight>125</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>7</ows:Identifier> <ScaleDenominator>17857.1428571</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>375</MatrixWidth> <MatrixHeight>250</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>8</ows:Identifier> <ScaleDenominator>7142.85714286</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>938</MatrixWidth> <MatrixHeight>625</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>9</ows:Identifier> <ScaleDenominator>3571.42857143</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>1875</MatrixWidth> <MatrixHeight>1250</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>10</ows:Identifier> <ScaleDenominator>1785.71428571</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>3750</MatrixWidth> <MatrixHeight>2500</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>11</ows:Identifier> <ScaleDenominator>892.857142857</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>7500</MatrixWidth> <MatrixHeight>5000</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>12</ows:Identifier> <ScaleDenominator>357.142857143</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>18750</MatrixWidth> <MatrixHeight>12500</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>13</ows:Identifier> <ScaleDenominator>178.571428571</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>37500</MatrixWidth> <MatrixHeight>25000</MatrixHeight> </TileMatrix> </TileMatrixSet> </Contents> </Capabilities>'
}
