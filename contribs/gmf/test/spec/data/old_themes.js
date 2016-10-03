/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "themes|capabilities" }] */
goog.provide('gmf.test.data.old_themes');

var old_themes = {
  'themes': [{
    'name': 'Enseignement',
    'functionalities': {},
    'id': 38,
    'icon': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/ff12098f80144fe69ca9d5d630436748/img/enseignement.jpeg',
    'children': [{
      'mixed': false,
      'metadata': {},
      'children': [{
        'layers': 'bus_stop',
        'name': 'bus_stop',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 101,
        'imageType': 'image/jpeg',
        'metadata': {
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Arr\u00eats de bus'
        }
      }, {
        'layers': 'information',
        'name': 'information',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 98,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Informations'
        }
      }],
      'id': 35,
      'name': 'Enseignement'
    }],
    'metadata': {}
  }, {
    'name': 'Transport',
    'functionalities': {},
    'id': 37,
    'icon': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/ff12098f80144fe69ca9d5d630436748/img/transports.jpeg',
    'children': [{
      'mixed': false,
      'metadata': {},
      'children': [{
        'layers': 'fuel',
        'name': 'fuel',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 124,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Stations service'
        }
      }, {
        'layers': 'parking',
        'name': 'parking',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 103,
        'imageType': 'image/jpeg',
        'metadata': {
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Parkings'
        }
      }, {
        'layers': 'bus_stop',
        'name': 'bus_stop',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 101,
        'imageType': 'image/jpeg',
        'metadata': {
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Arr\u00eats de bus'
        }
      }],
      'id': 36,
      'name': 'Transport'
    }],
    'metadata': {}
  }, {
    'name': 'Cadastre',
    'functionalities': {},
    'id': 29,
    'icon': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/ff12098f80144fe69ca9d5d630436748/img/cadastre.jpeg',
    'children': [{
      'mixed': true,
      'metadata': {},
      'children': [{
        'layers': 'ch.swisstopo.dreiecksvermaschung',
        'minResolutionHint': 0.0,
        'name': 'ch.swisstopo.dreiecksvermaschung',
        'url': 'http://wms.geo.admin.ch?lang=fr',
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': false,
        'maxResolutionHint': 26458.32,
        'urlWfs': null,
        'type': 'WMS',
        'id': 115,
        'imageType': 'image/jpeg',
        'metadata': {
          'legend': 'true',
          'disclaimer': '<a href="http://www.geo.admin.ch/">Donn\u00e9es publiques de l\'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>'
        }
      }, {
        'layers': 'ch.swisstopo.geologie-gravimetrischer_atlas',
        'minResolutionHint': 0.0,
        'name': 'ch.swisstopo.geologie-gravimetrischer_atlas',
        'url': 'http://wms.geo.admin.ch?lang=fr',
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': false,
        'maxResolutionHint': 26458.32,
        'urlWfs': null,
        'type': 'WMS',
        'id': 116,
        'imageType': 'image/jpeg',
        'metadata': {
          'legend': 'true',
          'disclaimer': '<a href="http://www.geo.admin.ch/">Donn\u00e9es publiques de l\'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>'
        }
      }, {
        'layers': 'ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen',
        'minResolutionHint': 0.0,
        'name': 'ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen',
        'url': 'http://wms.geo.admin.ch?lang=fr',
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': false,
        'maxResolutionHint': 26458.32,
        'urlWfs': null,
        'type': 'WMS',
        'id': 117,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'legend': 'true',
          'disclaimer': '<a href="http://www.geo.admin.ch/">Donn\u00e9es publiques de l\'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>'
        }
      }, {
        'layers': 'ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung',
        'minResolutionHint': 0.0,
        'name': 'ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung',
        'url': 'http://wms.geo.admin.ch?lang=fr',
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': false,
        'maxResolutionHint': 26458.32,
        'urlWfs': null,
        'type': 'WMS',
        'id': 118,
        'imageType': 'image/jpeg',
        'metadata': {
          'legend': 'true',
          'disclaimer': '<a href="http://www.geo.admin.ch/">Donn\u00e9es publiques de l\'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>'
        }
      }, {
        'name': 'non-queryable-wmts-layer',
        'url': 'http://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr',
        'dimensions': {},
        'type': 'WMTS',
        'id': 91346,
        'imageType': 'image/jpeg',
        'metadata': {
          'max_resolution': '1000.0',
          'legend': 'true',
          'min_resolution': '100.0'
        }
      }, {
        'name': 'ch.are.alpenkonvention',
        'url': 'http://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr',
        'dimensions': {},
        'type': 'WMTS',
        'id': 119,
        'imageType': 'image/jpeg',
        'metadata': {
          'max_resolution': '1000.0',
          'wmsUrl': 'https://wms.geo.admin.ch/',
          'wmsLayers': 'ch.are.alpenkonvention',
          'queryLayers': 'ch.astra.ausnahmetransportrouten.queryLayers',
          'legend': 'true',
          'disclaimer': '<a href="http://www.geo.admin.ch/">Donn\u00e9es publiques de l\'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>',
          'min_resolution': '100.0'
        }
      }, {
        'style': 'ch.astra.ausnahmetransportrouten',
        'name': 'ch.astra.ausnahmetransportrouten',
        'url': 'http://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr',
        'matrixSet': '21781_26',
        'dimensions': {
          'Time': '20141003'
        },
        'type': 'WMTS',
        'id': 120,
        'imageType': 'image/jpeg',
        'metadata': {
          'legend': 'true',
          'wmsUrl': 'https://wms.geo.admin.ch/',
          'queryLayers': 'ch.astra.ausnahmetransportrouten',
          'disclaimer': '<a href="http://www.geo.admin.ch/">Donn\u00e9es publiques de l\'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>'
        }
      }],
      'id': 30,
      'name': 'Cadastre'
    }],
    'metadata': {}
  }, {
    'name': 'OSM',
    'functionalities': {},
    'id': 64,
    'icon': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/ff12098f80144fe69ca9d5d630436748/img/osm.png',
    'children': [{
      'mixed': false,
      'metadata': {},
      'children': [{
        'layers': 'osm',
        'name': 'osm',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 0,
        'childLayers': [{
          'name': 'fuel',
          'queryable': 1
        }, {
          'name': 'hotel',
          'queryable': 0
        }, {
          'name': 'information',
          'queryable': 1
        }, {
          'name': 'cinema',
          'queryable': 1
        }, {
          'name': 'alpine_hut',
          'queryable': 1
        }, {
          'name': 'bank',
          'queryable': 1
        }, {
          'name': 'bus_stop',
          'queryable': 1
        }, {
          'name': 'cafe',
          'queryable': 1
        }, {
          'name': 'parking',
          'queryable': 1
        }, {
          'name': 'place_of_worship',
          'queryable': 1
        }, {
          'name': 'police',
          'queryable': 1
        }, {
          'name': 'post_office',
          'queryable': 1
        }, {
          'name': 'restaurant',
          'queryable': 1
        }, {
          'name': 'zoo',
          'queryable': 1
        }],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 109,
        'imageType': 'image/jpeg',
        'metadata': {
          'identifier_attribute_field': 'display_name',
          'legend': 'true',
          'is_legend_expanded': 'true',
          'disclaimer': '\u00a9 les contributeurs d\u2019OSM'
        }
      }],
      'id': 66,
      'name': 'Group'
    }, {
      'mixed': true,
      'metadata': {},
      'children': [{
        'layers': 'osm_time',
        'name': 'osm_time',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': false,
        'time': {
          'widget': 'slider',
          'interval': [0, 1, 0, 0],
          'maxValue': '2013-12-31T00:00:00Z',
          'minValue': '2006-01-01T00:00:00Z',
          'maxDefValue': null,
          'minDefValue': null,
          'resolution': 'day',
          'mode': 'range'
        },
        'urlWfs': null,
        'type': 'WMS',
        'id': 110,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Dans les temps'
        }
      }, {
        'layers': 'osm_scale',
        'minResolutionHint': 0.53,
        'name': 'osm_scale',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 0,
        'childLayers': [],
        'wfsSupport': true,
        'maxResolutionHint': 1.41,
        'urlWfs': null,
        'type': 'WMS',
        'id': 114,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'OSM'
        }
      }],
      'id': 68,
      'name': 'OSM function'
    }, {
      'mixed': false,
      'metadata': {},
      'children': [{
        'layers': 'hotel',
        'name': 'hotel',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 97,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'H\u00f4tels'
        }
      }, {
        'layers': 'cinema',
        'name': 'cinema',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 99,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Cin\u00e9mas'
        }
      }, {
        'layers': 'cafe',
        'name': 'cafe',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 102,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Caf\u00e9s'
        }
      }, {
        'layers': 'police',
        'name': 'police',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 105,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Postes de police'
        }
      }, {
        'layers': 'post_office',
        'name': 'post_office',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 106,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Offices de poste'
        }
      }, {
        'layers': 'restaurant',
        'name': 'restaurant',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 107,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Restaurants'
        }
      }, {
        'layers': 'osm_time',
        'name': 'osm_time',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'time': {
          'widget': 'datepicker',
          'interval': [0, 1, 0, 0],
          'maxValue': '2013-12-31T00:00:00Z',
          'minValue': '2006-01-01T00:00:00Z',
          'maxDefValue': null,
          'minDefValue': null,
          'resolution': 'day',
          'mode': 'range'
        },
        'urlWfs': null,
        'type': 'WMS',
        'id': 126,
        'imageType': 'image/jpeg',
        'metadata': {
          'identifier_attribute_field': 'name',
          'legend': 'true',
          'legend_rule': 'Dans les temps'
        }
      }],
      'id': 63,
      'name': 'Layers'
    }],
    'metadata': {}
  }, {
    'name': 'Edit',
    'functionalities': {},
    'id': 73,
    'icon': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/ff12098f80144fe69ca9d5d630436748/img/edit.png',
    'children': [{
      'mixed': true,
      'metadata': {},
      'children': [{
        'layers': 'line',
        'name': 'line',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'editable': true,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 111,
        'imageType': 'image/png',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'name',
          'legend': 'true',
          'legend_rule': 'Line'
        }
      }, {
        'layers': 'polygon',
        'name': 'polygon',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'editable': true,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 112,
        'imageType': 'image/png',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'name',
          'legend': 'true',
          'legend_rule': 'Polygon'
        }
      }, {
        'layers': 'point',
        'name': 'point',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'editable': true,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 113,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'metadata_url': 'http://example.com/camptocamp',
          'identifier_attribute_field': 'name',
          'legend': 'true',
          'legend_rule': 'Point'
        }
      }],
      'id': 72,
      'name': 'Edit'
    }],
    'metadata': {}
  }, {
    'name': 'Enseignement',
    'functionalities': {},
    'id': 92,
    'icon': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/ff12098f80144fe69ca9d5d630436748/img/enseignement2.jpeg',
    'children': [{
      'mixed': false,
      'metadata': {},
      'children': [{
        'layers': 'bus_stop',
        'name': 'bus_stop',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 101,
        'imageType': 'image/jpeg',
        'metadata': {
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Arr\u00eats de bus'
        }
      }, {
        'layers': 'information',
        'name': 'information',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 98,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Informations'
        }
      }],
      'id': 35,
      'name': 'Enseignement'
    }],
    'metadata': {}
  }, {
    'name': 'Patrimoine',
    'functionalities': {},
    'id': 4,
    'icon': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/ff12098f80144fe69ca9d5d630436748/img/patrimoine.jpeg',
    'children': [{
      'mixed': false,
      'metadata': {},
      'children': [{
        'layers': 'bank',
        'name': 'bank',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 100,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Banques'
        }
      }, {
        'layers': 'place_of_worship',
        'name': 'place_of_worship',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 104,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Lieux de culte'
        }
      }],
      'id': 7,
      'name': 'Patrimoine'
    }],
    'metadata': {}
  }, {
    'name': 'Gestion des eaux',
    'functionalities': {},
    'id': 3,
    'icon': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/ff12098f80144fe69ca9d5d630436748/img/gestion_eaux.jpeg',
    'children': [{
      'mixed': false,
      'metadata': {},
      'children': [{
        'layers': 'zoo',
        'name': 'zoo',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 108,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Zoos'
        }
      }, {
        'layers': 'fuel',
        'name': 'fuel',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 124,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Stations service'
        }
      }],
      'id': 8,
      'name': 'Gestion des eaux'
    }],
    'metadata': {}
  }, {
    'name': 'Paysage',
    'functionalities': {},
    'id': 2,
    'icon': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/ff12098f80144fe69ca9d5d630436748/img/paysage.jpeg',
    'children': [{
      'mixed': false,
      'metadata': {},
      'children': [{
        'layers': 'alpine_hut',
        'name': 'alpine_hut',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 123,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Cabanes alpines'
        }
      }, {
        'layers': 'zoo',
        'name': 'zoo',
        'url': null,
        'isSingleTile': false,
        'serverType': 'mapserver',
        'queryable': 1,
        'childLayers': [],
        'wfsSupport': true,
        'urlWfs': null,
        'type': 'WMS',
        'id': 108,
        'imageType': 'image/jpeg',
        'metadata': {
          'is_checked': 'true',
          'identifier_attribute_field': 'display_name',
          'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
          'legend': 'true',
          'legend_rule': 'Zoos'
        }
      }],
      'id': 9,
      'name': 'Paysage'
    }],
    'metadata': {}
  }],
  'background_layers': [{
    'name': 'asitvd.fond_gris',
    'url': 'http://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml',
    'dimensions': {
      'DIM1': 'default',
      'ELEVATION': '0'
    },
    'type': 'WMTS',
    'id': 132,
    'imageType': 'image/jpeg',
    'metadata': {
      'thumbnail': 'https://geomapfish-demo.camptocamp.net/2.0/wsgi/project/-/img/cadastre.jpeg',
      'wmsUrl': 'https://wms.geo.admin.ch/',
      'wmsLayers': 'ch.are.alpenkonvention'
    }
  }, {
    'name': 'asitvd.fond_couleur',
    'url': 'https://geomapfish-demo.camptocamp.net/2.0/tiles-asitvd/1.0.0/WMTSCapabilities.xml',
    'dimensions': {},
    'type': 'WMTS',
    'id': 135,
    'imageType': 'image/jpeg',
    'metadata': {
      'thumbnail': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/-/img/cadastre.jpeg',
      'ogcServer': 'Main PNG',
      'queryLayers': 'ch.astra.ausnahmetransportrouten'
    }
  }, {
    'name': 'map',
    'url': 'https://geomapfish-demo.camptocamp.net/2.1/tiles/1.0.0/WMTSCapabilities.xml',
    'dimensions': {},
    'type': 'WMTS',
    'id': 134,
    'imageType': 'image/jpeg',
    'metadata': {
      'thumbnail': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/project/-/img/cadastre.jpeg',
      'wmsUrl': 'https://wms.geo.admin.ch/',
      'wmsLayers': 'ch.are.alpenkonvention'
    }
  }],
  'errors': [],
  'ogcServers': {
    'Main PNG': {
      'url': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/mapserv_proxy?',
      'isSingleTile': false,
      'auth': 'main',
      'wfsSupport': true,
      'urlWfs': 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/mapserv_proxy?',
      'type': 'mapserver',
      'imageType': 'image/png'
    }
  }
};
var capabilities = {
  'asitvd': '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd" version="1.0.0"><ows:ServiceIdentification><ows:Title>ASITVD-WMTS-FONDS</ows:Title><ows:Abstract>Ce service permet l affichage d\'un fond de plan homogegravene et harmonieux sur tout le canton. Ce fond de plan pourra avantageusement mettre en valeur vos données dans un guichet cartographique ou une application métier. </ows:Abstract><ows:ServiceType>OGC WMTS</ows:ServiceType><ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion></ows:ServiceIdentification><ows:ServiceProvider><ows:ServiceContact><ows:ContactInfo></ows:ContactInfo></ows:ServiceContact></ows:ServiceProvider><ows:OperationsMetadata><ows:Operation name="GetCapabilities"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://ows.asitvd.ch/wmts?"><ows:Constraint name="GetEncoding"><ows:AllowedValues><ows:Value>KVP</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get></ows:HTTP></ows:DCP></ows:Operation><ows:Operation name="GetTile"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://ows.asitvd.ch/wmts?"><ows:Constraint name="GetEncoding"><ows:AllowedValues><ows:Value>KVP</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get></ows:HTTP></ows:DCP></ows:Operation><ows:Operation name="GetFeatureInfo"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://ows.asitvd.ch/wmts?"><ows:Constraint name="GetEncoding"><ows:AllowedValues><ows:Value>KVP</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get></ows:HTTP></ows:DCP></ows:Operation></ows:OperationsMetadata><Contents><Layer><ows:Title>Fond ASIT VD - couleur</ows:Title><ows:Abstract>Service de fond de plan WMTS ASIT VD: données OSM et Etat de Vaud - couleurs</ows:Abstract><ows:Identifier>asitvd.fond_couleur</ows:Identifier><Style isDefault="true"><ows:Identifier>default</ows:Identifier></Style><Format>image/png</Format><Dimension><ows:Identifier>DIM1</ows:Identifier><Default>default</Default><Value>default</Value></Dimension><Dimension><ows:Identifier>ELEVATION</ows:Identifier><Default>0</Default><Value>0</Value></Dimension><TileMatrixSetLink><TileMatrixSet>21781</TileMatrixSet></TileMatrixSetLink><TileMatrixSetLink><TileMatrixSet>2056</TileMatrixSet></TileMatrixSetLink><ResourceURL format="image/png" resourceType="tile" template="http://ows.asitvd.ch/wmts/1.0.0/asitvd.fond_couleur/default/{DIM1}/{ELEVATION}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"></ResourceURL></Layer><Layer><ows:Title>Fond de plan ASIT VD - transparent pour photos</ows:Title><ows:Abstract>Service de fond de plan WMTS ASIT VD: données OSM et Etat de Vaud - transparent pour orthophotos</ows:Abstract><ows:Identifier>asitvd.fond_pourortho</ows:Identifier><Style isDefault="true"><ows:Identifier>default</ows:Identifier></Style><Format>image/png</Format><Dimension><ows:Identifier>DIM1</ows:Identifier><Default>default</Default><Value>default</Value></Dimension><Dimension><ows:Identifier>ELEVATION</ows:Identifier><Default>0</Default><Value>0</Value></Dimension><TileMatrixSetLink><TileMatrixSet>21781</TileMatrixSet></TileMatrixSetLink><TileMatrixSetLink><TileMatrixSet>2056</TileMatrixSet></TileMatrixSetLink><ResourceURL format="image/png" resourceType="tile" template="http://ows.asitvd.ch/wmts/1.0.0/asitvd.fond_pourortho/default/{DIM1}/{ELEVATION}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"></ResourceURL></Layer><Layer><ows:Title>Fond ASIT VD - niveau de gris</ows:Title><ows:Abstract>Service de fond de plan WMTS ASIT VD: données OSM et Etat de Vaud - tons de gris</ows:Abstract><ows:Identifier>asitvd.fond_gris</ows:Identifier><Style isDefault="true"><ows:Identifier>default</ows:Identifier></Style><Format>image/png</Format><Dimension><ows:Identifier>DIM1</ows:Identifier><Default>default</Default><Value>default</Value></Dimension><Dimension><ows:Identifier>ELEVATION</ows:Identifier><Default>0</Default><Value>0</Value></Dimension><TileMatrixSetLink><TileMatrixSet>21781</TileMatrixSet></TileMatrixSetLink><TileMatrixSetLink><TileMatrixSet>2056</TileMatrixSet></TileMatrixSetLink><ResourceURL format="image/png" resourceType="tile" template="http://ows.asitvd.ch/wmts/1.0.0/asitvd.fond_gris/default/{DIM1}/{ELEVATION}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"></ResourceURL></Layer><TileMatrixSet><ows:Identifier>21781</ows:Identifier><ows:BoundingBox crs="urn:ogc:def:crs:EPSG:6.3:21781"><ows:LowerCorner>420000.000000 30000.000000</ows:LowerCorner><ows:UpperCorner>900000.000000 350000.000000</ows:UpperCorner></ows:BoundingBox><ows:SupportedCRS>urn:ogc:def:crs:EPSG:6.3:21781</ows:SupportedCRS><TileMatrix><ows:Identifier>0</ows:Identifier><ScaleDenominator>14285714.28571428731083869934</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>1</ows:Identifier><ScaleDenominator>13392857.14285714365541934967</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>2</ows:Identifier><ScaleDenominator>12500000.00000000186264514923</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>3</ows:Identifier><ScaleDenominator>11607142.85714285820722579956</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>4</ows:Identifier><ScaleDenominator>10714285.71428571455180644989</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>5</ows:Identifier><ScaleDenominator>9821428.57142857275903224945</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>6</ows:Identifier><ScaleDenominator>8928571.42857142910361289978</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>7</ows:Identifier><ScaleDenominator>8035714.28571428637951612473</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>8</ows:Identifier><ScaleDenominator>7142857.14285714365541934967</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>9</ows:Identifier><ScaleDenominator>6250000.00000000093132257462</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>10</ows:Identifier><ScaleDenominator>5357142.85714285727590322495</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>11</ows:Identifier><ScaleDenominator>4464285.71428571455180644989</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>12</ows:Identifier><ScaleDenominator>3571428.57142857182770967484</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>13</ows:Identifier><ScaleDenominator>2678571.42857142863795161247</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>14</ows:Identifier><ScaleDenominator>2321428.57142857182770967484</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>15</ows:Identifier><ScaleDenominator>1785714.28571428591385483742</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>4</MatrixWidth><MatrixHeight>3</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>16</ows:Identifier><ScaleDenominator>892857.14285714295692741871</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>8</MatrixWidth><MatrixHeight>5</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>17</ows:Identifier><ScaleDenominator>357142.85714285715948790312</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>19</MatrixWidth><MatrixHeight>13</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>18</ows:Identifier><ScaleDenominator>178571.42857142857974395156</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>38</MatrixWidth><MatrixHeight>25</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>19</ows:Identifier><ScaleDenominator>71428.57142857143480796367</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>94</MatrixWidth><MatrixHeight>63</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>20</ows:Identifier><ScaleDenominator>35714.28571428571740398183</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>188</MatrixWidth><MatrixHeight>125</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>21</ows:Identifier><ScaleDenominator>17857.14285714285870199092</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>375</MatrixWidth><MatrixHeight>250</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>22</ows:Identifier><ScaleDenominator>8928.57142857142935099546</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>750</MatrixWidth><MatrixHeight>500</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>23</ows:Identifier><ScaleDenominator>7142.85714285714311699849</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>938</MatrixWidth><MatrixHeight>625</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>24</ows:Identifier><ScaleDenominator>5357.14285714285779249622</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1250</MatrixWidth><MatrixHeight>834</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>25</ows:Identifier><ScaleDenominator>3571.42857142857155849924</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1875</MatrixWidth><MatrixHeight>1250</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>26</ows:Identifier><ScaleDenominator>1785.71428571428577924962</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3750</MatrixWidth><MatrixHeight>2500</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>27</ows:Identifier><ScaleDenominator>892.85714285714288962481</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>7500</MatrixWidth><MatrixHeight>5000</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>28</ows:Identifier><ScaleDenominator>357.14285714285716721861</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>18750</MatrixWidth><MatrixHeight>12500</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>29</ows:Identifier><ScaleDenominator>178.57142857142858360930</ScaleDenominator><TopLeftCorner>420000.000000 350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>37500</MatrixWidth><MatrixHeight>25000</MatrixHeight></TileMatrix></TileMatrixSet><TileMatrixSet><ows:Identifier>2056</ows:Identifier><ows:BoundingBox crs="urn:ogc:def:crs:EPSG:6.3:2056"><ows:LowerCorner>2420000.000000 130000.000000</ows:LowerCorner><ows:UpperCorner>2900000.000000 1350000.000000</ows:UpperCorner></ows:BoundingBox><ows:SupportedCRS>urn:ogc:def:crs:EPSG:6.3:2056</ows:SupportedCRS><TileMatrix><ows:Identifier>0</ows:Identifier><ScaleDenominator>14285714.28571428731083869934</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>1</ows:Identifier><ScaleDenominator>13392857.14285714365541934967</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>2</ows:Identifier><ScaleDenominator>12500000.00000000186264514923</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>3</ows:Identifier><ScaleDenominator>11607142.85714285820722579956</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>4</ows:Identifier><ScaleDenominator>10714285.71428571455180644989</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>5</ows:Identifier><ScaleDenominator>9821428.57142857275903224945</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>6</ows:Identifier><ScaleDenominator>8928571.42857142910361289978</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>7</ows:Identifier><ScaleDenominator>8035714.28571428637951612473</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>3</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>8</ows:Identifier><ScaleDenominator>7142857.14285714365541934967</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>3</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>9</ows:Identifier><ScaleDenominator>6250000.00000000093132257462</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>3</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>10</ows:Identifier><ScaleDenominator>5357142.85714285727590322495</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>4</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>11</ows:Identifier><ScaleDenominator>4464285.71428571455180644989</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>4</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>12</ows:Identifier><ScaleDenominator>3571428.57142857182770967484</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>5</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>13</ows:Identifier><ScaleDenominator>2678571.42857142863795161247</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3</MatrixWidth><MatrixHeight>7</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>14</ows:Identifier><ScaleDenominator>2321428.57142857182770967484</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3</MatrixWidth><MatrixHeight>8</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>15</ows:Identifier><ScaleDenominator>1785714.28571428591385483742</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>4</MatrixWidth><MatrixHeight>10</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>16</ows:Identifier><ScaleDenominator>892857.14285714295692741871</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>8</MatrixWidth><MatrixHeight>20</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>17</ows:Identifier><ScaleDenominator>357142.85714285715948790312</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>19</MatrixWidth><MatrixHeight>48</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>18</ows:Identifier><ScaleDenominator>178571.42857142857974395156</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>38</MatrixWidth><MatrixHeight>96</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>19</ows:Identifier><ScaleDenominator>71428.57142857143480796367</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>94</MatrixWidth><MatrixHeight>239</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>20</ows:Identifier><ScaleDenominator>35714.28571428571740398183</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>188</MatrixWidth><MatrixHeight>477</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>21</ows:Identifier><ScaleDenominator>17857.14285714285870199092</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>375</MatrixWidth><MatrixHeight>954</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>22</ows:Identifier><ScaleDenominator>8928.57142857142935099546</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>750</MatrixWidth><MatrixHeight>1907</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>23</ows:Identifier><ScaleDenominator>7142.85714285714311699849</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>938</MatrixWidth><MatrixHeight>2383</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>24</ows:Identifier><ScaleDenominator>5357.14285714285779249622</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1250</MatrixWidth><MatrixHeight>3178</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>25</ows:Identifier><ScaleDenominator>3571.42857142857155849924</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>1875</MatrixWidth><MatrixHeight>4766</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>26</ows:Identifier><ScaleDenominator>1785.71428571428577924962</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>3750</MatrixWidth><MatrixHeight>9532</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>27</ows:Identifier><ScaleDenominator>892.85714285714288962481</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>7500</MatrixWidth><MatrixHeight>19063</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>28</ows:Identifier><ScaleDenominator>357.14285714285716721861</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>18750</MatrixWidth><MatrixHeight>47657</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>29</ows:Identifier><ScaleDenominator>178.57142857142858360930</ScaleDenominator><TopLeftCorner>2420000.000000 1350000.000000</TopLeftCorner><TileWidth>256</TileWidth><TileHeight>256</TileHeight><MatrixWidth>37500</MatrixWidth><MatrixHeight>95313</MatrixHeight></TileMatrix></TileMatrixSet></Contents></Capabilities>',

  map: '<Capabilities version="1.0.0" xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xsi:schemaLocation="http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd"> <ows:ServiceIdentification> </ows:ServiceIdentification> <ows:ServiceProvider> </ows:ServiceProvider> <ows:OperationsMetadata> <ows:Operation name="GetCapabilities"> <ows:DCP> <ows:HTTP> <ows:Get xlink:href="https://tiles.geomapfish-demo.camptocamp.net/1.0.0/WMTSCapabilities.xml"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> </ows:HTTP> </ows:DCP> </ows:Operation> <ows:Operation name="GetTile"> <ows:DCP> <ows:HTTP> <ows:Get xlink:href="https://tiles.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles0.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles1.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles2.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles3.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles4.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles5.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles6.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles7.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles8.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> <ows:Get xlink:href="https://tiles9.geomapfish-demo.camptocamp.net/"> <ows:Constraint name="GetEncoding"> <ows:AllowedValues> <ows:Value>REST</ows:Value> </ows:AllowedValues> </ows:Constraint> </ows:Get> </ows:HTTP> </ows:DCP> </ows:Operation> </ows:OperationsMetadata> <!-- <ServiceMetadataURL xlink:href="" /> --> <Contents> <Layer> <ows:Title>map</ows:Title> <ows:Identifier>map</ows:Identifier> <Style isDefault="true"> <ows:Identifier>default</ows:Identifier> </Style> <Format>image/png</Format> <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles0.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles1.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles2.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles3.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles4.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles5.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles6.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles7.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles8.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <ResourceURL format="image/png" resourceType="tile" template="https://tiles9.geomapfish-demo.camptocamp.net/1.0.0/map/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png" /> <TileMatrixSetLink> <TileMatrixSet>swissgrid_005</TileMatrixSet> </TileMatrixSetLink> </Layer> <Layer> <ows:Title>map_jpeg</ows:Title> <ows:Identifier>map_jpeg</ows:Identifier> <Style isDefault="true"> <ows:Identifier>default</ows:Identifier> </Style> <Format>image/jpeg</Format> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles0.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles1.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles2.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles3.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles4.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles5.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles6.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles7.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles8.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles9.geomapfish-demo.camptocamp.net/1.0.0/map_jpeg/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg" /> <TileMatrixSetLink> <TileMatrixSet>swissgrid_005</TileMatrixSet> </TileMatrixSetLink> </Layer> <TileMatrixSet> <ows:Identifier>swissgrid_005</ows:Identifier> <ows:SupportedCRS>urn:ogc:def:crs:epsg::21781</ows:SupportedCRS> <TileMatrix> <ows:Identifier>0</ows:Identifier> <ScaleDenominator>3571428.57143</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>2</MatrixWidth> <MatrixHeight>2</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>1</ows:Identifier> <ScaleDenominator>1785714.28571</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>4</MatrixWidth> <MatrixHeight>3</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>2</ows:Identifier> <ScaleDenominator>892857.142857</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>8</MatrixWidth> <MatrixHeight>5</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>3</ows:Identifier> <ScaleDenominator>357142.857143</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>19</MatrixWidth> <MatrixHeight>13</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>4</ows:Identifier> <ScaleDenominator>178571.428571</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>38</MatrixWidth> <MatrixHeight>25</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>5</ows:Identifier> <ScaleDenominator>71428.5714286</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>94</MatrixWidth> <MatrixHeight>63</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>6</ows:Identifier> <ScaleDenominator>35714.2857143</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>188</MatrixWidth> <MatrixHeight>125</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>7</ows:Identifier> <ScaleDenominator>17857.1428571</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>375</MatrixWidth> <MatrixHeight>250</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>8</ows:Identifier> <ScaleDenominator>7142.85714286</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>938</MatrixWidth> <MatrixHeight>625</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>9</ows:Identifier> <ScaleDenominator>3571.42857143</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>1875</MatrixWidth> <MatrixHeight>1250</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>10</ows:Identifier> <ScaleDenominator>1785.71428571</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>3750</MatrixWidth> <MatrixHeight>2500</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>11</ows:Identifier> <ScaleDenominator>892.857142857</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>7500</MatrixWidth> <MatrixHeight>5000</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>12</ows:Identifier> <ScaleDenominator>357.142857143</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>18750</MatrixWidth> <MatrixHeight>12500</MatrixHeight> </TileMatrix> <TileMatrix> <ows:Identifier>13</ows:Identifier> <ScaleDenominator>178.571428571</ScaleDenominator> <TopLeftCorner>420000.0 350000.0</TopLeftCorner> <TileWidth>256</TileWidth> <TileHeight>256</TileHeight> <MatrixWidth>37500</MatrixWidth> <MatrixHeight>25000</MatrixHeight> </TileMatrix> </TileMatrixSet> </Contents> </Capabilities>'
};
