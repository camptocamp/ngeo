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
  'themes': [
    {
      'name': 'Enseignement 2',
      'functionalities': {},
      'id': 38,
      'icon':
        'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/enseignement.jpeg',
      'children': [
        {
          'name': 'Enseignement 2',
          'id': 35,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'bus_stop',
              'minResolutionHint': 0.0,
              'name': 'bus_stop',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'bus_stop',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 101,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'legendRule': 'Arr\u00eat de bus',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'information',
              'minResolutionHint': 0.0,
              'name': 'information',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'information',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 98,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Informations',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
          ],
          'metadata': {
            'isExpanded': true,
          },
        },
      ],
      'metadata': {},
    },
    {
      'name': 'Transport',
      'functionalities': {},
      'id': 37,
      'icon':
        'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/transports.jpeg',
      'children': [
        {
          'name': 'Transport',
          'id': 36,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'fuel',
              'minResolutionHint': 0.0,
              'name': 'fuel',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'fuel',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 124,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Station service',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'parking',
              'minResolutionHint': 0.0,
              'name': 'parking',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'parking',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 103,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'legendRule': 'Parking',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'bus_stop',
              'minResolutionHint': 0.0,
              'name': 'bus_stop',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'bus_stop',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 101,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'legendRule': 'Arr\u00eat de bus',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
          ],
          'metadata': {
            'isExpanded': true,
          },
        },
      ],
      'metadata': {},
    },
    {
      'name': 'Cadastre',
      'functionalities': {},
      'id': 29,
      'icon':
        'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/cadastre.jpeg',
      'children': [
        {
          'mixed': true,
          'metadata': {
            'isExpanded': true,
          },
          'children': [
            {
              'layers': 'ch.swisstopo.dreiecksvermaschung',
              'minResolutionHint': 0.0,
              'dimensions': {},
              'name': 'ch.swisstopo.dreiecksvermaschung',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'ch.swisstopo.dreiecksvermaschung',
                  'maxResolutionHint': 26458.32,
                  'queryable': true,
                },
              ],
              'ogcServer': 'WMS CH topo fr',
              'maxResolutionHint': 26458.32,
              'type': 'WMS',
              'id': 115,
              'imageType': 'image/png',
              'metadata': {
                'legend': 'true',
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
              },
            },
            {
              'layers': 'ch.swisstopo.geologie-gravimetrischer_atlas',
              'minResolutionHint': 0.0,
              'dimensions': {},
              'name': 'ch.swisstopo.geologie-gravimetrischer_atlas',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'ch.swisstopo.geologie-gravimetrischer_atlas',
                  'maxResolutionHint': 26458.32,
                  'queryable': true,
                },
              ],
              'ogcServer': 'WMS CH topo fr',
              'maxResolutionHint': 26458.32,
              'type': 'WMS',
              'id': 116,
              'imageType': 'image/png',
              'metadata': {
                'legend': 'true',
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
              },
            },
            {
              'layers': 'ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen',
              'minResolutionHint': 0.0,
              'dimensions': {},
              'name': 'ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen',
                  'maxResolutionHint': 26458.32,
                  'queryable': true,
                },
              ],
              'ogcServer': 'WMS CH topo fr',
              'maxResolutionHint': 26458.32,
              'type': 'WMS',
              'id': 117,
              'imageType': 'image/png',
              'metadata': {
                'isChecked': true,
                'legend': 'true',
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
              },
            },
            {
              'layers': 'ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung',
              'minResolutionHint': 0.0,
              'dimensions': {},
              'name': 'ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung',
                  'maxResolutionHint': 26458.32,
                  'queryable': true,
                },
              ],
              'ogcServer': 'WMS CH topo fr',
              'maxResolutionHint': 26458.32,
              'type': 'WMS',
              'id': 118,
              'imageType': 'image/png',
              'metadata': {
                'legend': 'true',
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
              },
            },
            {
              'layer': 'ch.are.alpenkonvention',
              'dimensions': {},
              'url': 'https://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr',
              'matrixSet': '21781_26',
              'name': 'ch.are.alpenkonvention',
              'type': 'WMTS',
              'id': 119,
              'imageType': 'image/jpeg',
              'metadata': {
                'wmsUrl': 'https://wms.geo.admin.ch/',
                'wmsLayers': 'ch.are.alpenkonvention',
                'minResolutionHint': 10.0,
                'maxResolutionHint': 1000.0,
                'maxResolution': 1000.0,
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
                'legend': 'true',
                'minResolution': 100.0,
              },
            },
            {
              'style': 'ch.astra.ausnahmetransportrouten',
              'dimensions': {
                'Time': '20141003',
              },
              'url': 'https://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr',
              'matrixSet': '21781_26',
              'layer': 'ch.astra.ausnahmetransportrouten',
              'name': 'ch.astra.ausnahmetransportrouten',
              'type': 'WMTS',
              'id': 120,
              'imageType': 'image/jpeg',
              'metadata': {
                'wmsUrl': 'https://wms.geo.admin.ch/',
                'queryLayers': 'ch.astra.ausnahmetransportrouten',
                'legend': 'true',
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
              },
            },
          ],
          'id': 30,
          'name': 'Cadastre',
        },
      ],
      'metadata': {},
    },
    {
      'name': 'OSM',
      'functionalities': {
        'default_basemap': ['map'],
      },
      'id': 64,
      'icon':
        'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/osm.png',
      'children': [
        {
          'mixed': true,
          'metadata': {
            'isExpanded': true,
          },
          'children': [
            {
              'layers': 'osm_scale',
              'minResolutionHint': 0.53,
              'dimensions': {},
              'name': 'osm_scale',
              'childLayers': [
                {
                  'minResolutionHint': 0.53,
                  'name': 'osm_scale',
                  'maxResolutionHint': 1.41,
                  'queryable': true,
                },
              ],
              'ogcServer': 'Main PNG',
              'maxResolutionHint': 1.41,
              'type': 'WMS',
              'id': 114,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'OSM',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'osm_open',
              'minResolutionHint': 0.0,
              'dimensions': {},
              'name': 'osm_open',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'osm_open',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'ogcServer': 'Main PNG',
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 139,
              'imageType': 'image/png',
              'metadata': {},
            },
            {
              'layers': 'bank',
              'minResolutionHint': 0.0,
              'dimensions': {},
              'name': 'Layer with very very very very very long name',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'bank',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'ogcServer': 'Main PNG',
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 140,
              'imageType': 'image/png',
              'metadata': {},
            },
            {
              'mixed': true,
              'metadata': {},
              'children': [
                {
                  'layers': 'osm_time',
                  'minResolutionHint': 0.0,
                  'dimensions': {},
                  'name': 'osm_time_r_s',
                  'childLayers': [
                    {
                      'minResolutionHint': 0.0,
                      'name': 'osm_time',
                      'maxResolutionHint': 999999999.0,
                      'queryable': true,
                    },
                  ],
                  'ogcServer': 'Main PNG',
                  'maxResolutionHint': 999999999.0,
                  'time': {
                    'widget': 'slider',
                    'interval': [0, 1, 0, 0],
                    'maxValue': '2013-12-01T00:00:00Z',
                    'minValue': '2006-01-01T00:00:00Z',
                    'maxDefValue': null,
                    'minDefValue': null,
                    'resolution': 'month',
                    'mode': 'range',
                  },
                  'type': 'WMS',
                  'id': 110,
                  'imageType': 'image/png',
                  'metadata': {
                    'identifierAttributeField': 'name',
                    'isChecked': true,
                    'legendRule': 'Dans les temps',
                    'legend': 'true',
                    'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
                  },
                },
                {
                  'layers': 'osm_time',
                  'minResolutionHint': 0.0,
                  'dimensions': {},
                  'name': 'osm_time_v_s',
                  'childLayers': [
                    {
                      'minResolutionHint': 0.0,
                      'name': 'osm_time',
                      'maxResolutionHint': 999999999.0,
                      'queryable': true,
                    },
                  ],
                  'ogcServer': 'Main PNG',
                  'maxResolutionHint': 999999999.0,
                  'time': {
                    'widget': 'slider',
                    'interval': [0, 1, 0, 0],
                    'maxValue': '2013-12-01T00:00:00Z',
                    'minValue': '2006-01-01T00:00:00Z',
                    'maxDefValue': null,
                    'minDefValue': null,
                    'resolution': 'month',
                    'mode': 'value',
                  },
                  'type': 'WMS',
                  'id': 143,
                  'imageType': 'image/png',
                  'metadata': {},
                },
                {
                  'layers': 'osm_time',
                  'minResolutionHint': 0.0,
                  'dimensions': {},
                  'name': 'osm_time_v_dp',
                  'childLayers': [
                    {
                      'minResolutionHint': 0.0,
                      'name': 'osm_time',
                      'maxResolutionHint': 999999999.0,
                      'queryable': true,
                    },
                  ],
                  'ogcServer': 'Main PNG',
                  'maxResolutionHint': 999999999.0,
                  'time': {
                    'widget': 'datepicker',
                    'interval': [0, 1, 0, 0],
                    'maxValue': '2013-12-01T00:00:00Z',
                    'minValue': '2006-01-01T00:00:00Z',
                    'maxDefValue': null,
                    'minDefValue': null,
                    'resolution': 'month',
                    'mode': 'value',
                  },
                  'type': 'WMS',
                  'id': 144,
                  'imageType': 'image/png',
                  'metadata': {},
                },
                {
                  'layers': 'osm_time',
                  'minResolutionHint': 0.0,
                  'dimensions': {},
                  'name': 'osm_time_r_dp',
                  'childLayers': [
                    {
                      'minResolutionHint': 0.0,
                      'name': 'osm_time',
                      'maxResolutionHint': 999999999.0,
                      'queryable': true,
                    },
                  ],
                  'ogcServer': 'Main PNG',
                  'maxResolutionHint': 999999999.0,
                  'time': {
                    'widget': 'datepicker',
                    'interval': [0, 1, 0, 0],
                    'maxValue': '2013-12-01T00:00:00Z',
                    'minValue': '2006-01-01T00:00:00Z',
                    'maxDefValue': null,
                    'minDefValue': null,
                    'resolution': 'month',
                    'mode': 'range',
                  },
                  'type': 'WMS',
                  'id': 126,
                  'imageType': 'image/png',
                  'metadata': {
                    'identifierAttributeField': 'name',
                    'legend': 'true',
                    'legendRule': 'Dans les temps',
                  },
                },
              ],
              'id': 145,
              'name': 'osm_time',
            },
            {
              'layers': 'sustenance,entertainment',
              'minResolutionHint': 0.0,
              'dimensions': {},
              'name': 'two_layers',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'sustenance',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
                {
                  'minResolutionHint': 0.0,
                  'name': 'entertainment',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'ogcServer': 'Main PNG',
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 141,
              'imageType': 'image/png',
              'metadata': {},
            },
            {
              'style': 'ch.astra.ausnahmetransportrouten',
              'dimensions': {
                'Time': '20141003',
              },
              'url': 'https://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr',
              'matrixSet': '21781_26',
              'layer': 'ch.astra.ausnahmetransportrouten',
              'name': 'ch.astra.ausnahmetransportrouten',
              'type': 'WMTS',
              'id': 120,
              'imageType': 'image/jpeg',
              'metadata': {
                'wmsUrl': 'https://wms.geo.admin.ch/',
                'queryLayers': 'ch.astra.ausnahmetransportrouten',
                'legend': 'true',
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
              },
            },
          ],
          'id': 68,
          'name': 'OSM functions mixed',
        },
        {
          'name': 'Layers',
          'id': 63,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'cinema',
              'minResolutionHint': 0.0,
              'name': 'cinema',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'cinema',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 99,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Cin\u00e9mas',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'police',
              'minResolutionHint': 0.0,
              'name': 'police',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'police',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 105,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Poste de police',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'post_office',
              'minResolutionHint': 0.0,
              'name': 'post_office',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'post_office',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 106,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Office de poste',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'osm_time',
              'minResolutionHint': 0.0,
              'name': 'osm_time_r_dp',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'osm_time',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'time': {
                'widget': 'datepicker',
                'interval': [0, 1, 0, 0],
                'maxValue': '2013-12-01T00:00:00Z',
                'minValue': '2006-01-01T00:00:00Z',
                'maxDefValue': null,
                'minDefValue': null,
                'resolution': 'month',
                'mode': 'range',
              },
              'type': 'WMS',
              'id': 126,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'name',
                'legend': 'true',
                'legendRule': 'Dans les temps',
              },
            },
            {
              'mixed': false,
              'metadata': {},
              'children': [
                {
                  'layers': 'entertainment',
                  'minResolutionHint': 0.0,
                  'name': 'entertainment',
                  'childLayers': [
                    {
                      'minResolutionHint': 0.0,
                      'name': 'entertainment',
                      'maxResolutionHint': 999999999.0,
                      'queryable': true,
                    },
                  ],
                  'maxResolutionHint': 999999999.0,
                  'type': 'WMS',
                  'id': 102,
                  'imageType': 'image/png',
                  'metadata': {
                    'identifierAttributeField': 'display_name',
                    'isChecked': true,
                    'legendRule': 'Caf\u00e9s',
                    'legend': 'true',
                    'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
                  },
                },
                {
                  'layers': 'sustenance',
                  'minResolutionHint': 0.0,
                  'name': 'sustenance',
                  'childLayers': [
                    {
                      'minResolutionHint': 0.0,
                      'name': 'sustenance',
                      'maxResolutionHint': 999999999.0,
                      'queryable': true,
                    },
                  ],
                  'maxResolutionHint': 999999999.0,
                  'type': 'WMS',
                  'id': 107,
                  'imageType': 'image/png',
                  'metadata': {
                    'identifierAttributeField': 'display_name',
                    'isChecked': true,
                    'legendRule': 'Restaurant',
                    'legend': 'true',
                    'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
                  },
                },
              ],
              'id': 137,
              'name': 'Loisirs',
            },
            {
              'layers': 'hospitals',
              'minResolutionHint': 0.0,
              'name': 'hospitals',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'hospitals',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 121,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'H\u00f4pital',
                'legend': 'false',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
          ],
          'metadata': {},
        },
        {
          'name': 'Group',
          'id': 66,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'osm',
              'minResolutionHint': 0.0,
              'name': 'osm',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'hotel',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
                {
                  'minResolutionHint': 0.0,
                  'name': 'bank',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
                {
                  'minResolutionHint': 0.0,
                  'name': 'place_of_worship',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 109,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isLegendExpanded': true,
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
          ],
          'metadata': {},
        },
        {
          'name': 'OSM functions',
          'id': 146,
          'dimensions': {},
          'time': {
            'widget': 'datepicker',
            'interval': [0, 1, 0, 0],
            'maxValue': '2013-12-01T00:00:00Z',
            'minValue': '2006-01-01T00:00:00Z',
            'maxDefValue': null,
            'minDefValue': null,
            'resolution': 'month',
            'mode': 'range',
          },
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'osm_time',
              'minResolutionHint': 0.0,
              'name': 'osm_time_r_dp',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'osm_time',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 126,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'name',
                'legend': 'true',
                'legendRule': 'Dans les temps',
              },
            },
            {
              'layers': 'osm_time2',
              'minResolutionHint': 0.0,
              'name': 'osm_time_r_dp_2',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'osm_time2',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 147,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'name',
                'legendRule': 'Dans les temps',
              },
            },
            {
              'layers': 'osm_scale',
              'minResolutionHint': 0.53,
              'name': 'osm_scale',
              'childLayers': [
                {
                  'minResolutionHint': 0.53,
                  'name': 'osm_scale',
                  'maxResolutionHint': 1.41,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 1.41,
              'type': 'WMS',
              'id': 114,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'OSM',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'osm_open',
              'minResolutionHint': 0.0,
              'name': 'osm_open',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'osm_open',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 139,
              'imageType': 'image/png',
              'metadata': {},
            },
            {
              'layers': 'bank',
              'minResolutionHint': 0.0,
              'name': 'Layer with very very very very very long name',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'bank',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 140,
              'imageType': 'image/png',
              'metadata': {},
            },
            {
              'layers': 'sustenance,entertainment',
              'minResolutionHint': 0.0,
              'name': 'two_layers',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'sustenance',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
                {
                  'minResolutionHint': 0.0,
                  'name': 'entertainment',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 141,
              'imageType': 'image/png',
              'metadata': {},
            },
            {
              'layers': 'half_query',
              'minResolutionHint': 0.0,
              'name': 'Half query',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'aster',
                  'maxResolutionHint': 999999999.0,
                  'queryable': false,
                },
                {
                  'minResolutionHint': 0.0,
                  'name': 'cinema',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 150,
              'imageType': 'image/png',
              'metadata': {},
            },
            {
              'layers': 'srtm',
              'minResolutionHint': 0.0,
              'name': 'srtm',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'srtm',
                  'maxResolutionHint': 999999999.0,
                  'queryable': false,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 151,
              'imageType': 'image/png',
              'metadata': {},
            },
            {
              'layers': 'aster',
              'minResolutionHint': 0.0,
              'name': 'aster',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'aster',
                  'maxResolutionHint': 999999999.0,
                  'queryable': false,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 152,
              'imageType': 'image/png',
              'metadata': {},
            },
          ],
          'metadata': {},
        },
        {
          'name': 'External',
          'id': 153,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'WMS CH topo fr',
          'children': [
            {
              'layers': 'ch.swisstopo.dreiecksvermaschung',
              'minResolutionHint': 0.0,
              'name': 'ch.swisstopo.dreiecksvermaschung',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'ch.swisstopo.dreiecksvermaschung',
                  'maxResolutionHint': 26458.32,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 26458.32,
              'type': 'WMS',
              'id': 115,
              'imageType': 'image/png',
              'metadata': {
                'legend': 'true',
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
              },
            },
            {
              'layers': 'ch.swisstopo.geologie-gravimetrischer_atlas',
              'minResolutionHint': 0.0,
              'name': 'ch.swisstopo.geologie-gravimetrischer_atlas',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'ch.swisstopo.geologie-gravimetrischer_atlas',
                  'maxResolutionHint': 26458.32,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 26458.32,
              'type': 'WMS',
              'id': 116,
              'imageType': 'image/png',
              'metadata': {
                'legend': 'true',
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
              },
            },
            {
              'layers': 'ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen',
              'minResolutionHint': 0.0,
              'name': 'ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'ch.swisstopo.geologie-geotechnik-gk500-lithologie_hauptgruppen',
                  'maxResolutionHint': 26458.32,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 26458.32,
              'type': 'WMS',
              'id': 117,
              'imageType': 'image/png',
              'metadata': {
                'isChecked': true,
                'legend': 'true',
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
              },
            },
            {
              'layers': 'ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung',
              'minResolutionHint': 0.0,
              'name': 'ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'ch.swisstopo.geologie-geotechnik-gk500-gesteinsklassierung',
                  'maxResolutionHint': 26458.32,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 26458.32,
              'type': 'WMS',
              'id': 118,
              'imageType': 'image/png',
              'metadata': {
                'legend': 'true',
                'disclaimer':
                  "<a href='http://www.geo.admin.ch/'>Donn\u00e9es publiques de l'infrastructure f\u00e9d\u00e9rale de donn\u00e9es g\u00e9ographiques (IFDG)</a>",
              },
            },
          ],
          'metadata': {},
        },
      ],
      'metadata': {},
    },
    {
      'name': 'Edit',
      'functionalities': {},
      'id': 73,
      'icon':
        'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/edit.png',
      'children': [
        {
          'name': 'Edit',
          'id': 72,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'line',
              'minResolutionHint': 0.0,
              'name': 'line',
              'editable': true,
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'line',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 111,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'name',
                'isChecked': true,
                'legend': 'true',
                'legendRule': 'Line',
              },
            },
            {
              'layers': 'polygon',
              'minResolutionHint': 0.0,
              'name': 'polygon',
              'editable': true,
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'polygon',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 112,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'name',
                'isChecked': true,
                'legend': 'true',
                'legendRule': 'Polygon',
              },
            },
            {
              'layers': 'point',
              'minResolutionHint': 0.0,
              'name': 'point',
              'editable': true,
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'point',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 113,
              'imageType': 'image/png',
              'metadata': {
                'metadataUrl':
                  'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/htdocs/example.html',
                'isChecked': true,
                'identifierAttributeField': 'name',
                'legend': 'true',
                'legendRule': 'Point',
              },
            },
          ],
          'metadata': {
            'isExpanded': true,
            'disclaimer': 'Editing theme',
          },
        },
        {
          'name': 'Snapping',
          'id': 164,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'point',
              'minResolutionHint': 0.0,
              'name': 'point snap',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'point',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 154,
              'imageType': 'image/png',
              'metadata': {
                'snappingConfig': {},
              },
            },
            {
              'layers': 'line',
              'minResolutionHint': 0.0,
              'name': 'line snap',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'line',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 155,
              'imageType': 'image/png',
              'metadata': {
                'snappingConfig': {},
              },
            },
            {
              'layers': 'polygon',
              'minResolutionHint': 0.0,
              'name': 'polygon snap',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'polygon',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 163,
              'imageType': 'image/png',
              'metadata': {
                'snappingConfig': {},
              },
            },
          ],
          'metadata': {},
        },
        {
          'name': 'Snapping tollerance',
          'id': 165,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'point',
              'minResolutionHint': 0.0,
              'name': 'point snap tolerance',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'point',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 156,
              'imageType': 'image/png',
              'metadata': {
                'snappingConfig': {
                  'tolerance': 50,
                },
              },
            },
            {
              'layers': 'line',
              'minResolutionHint': 0.0,
              'name': 'line snap tolerance',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'line',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 157,
              'imageType': 'image/png',
              'metadata': {
                'snappingConfig': {
                  'tolerance': 50,
                },
              },
            },
            {
              'layers': 'polygon',
              'minResolutionHint': 0.0,
              'name': 'polygon snap tolerance',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'polygon',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 158,
              'imageType': 'image/png',
              'metadata': {
                'snappingConfig': {
                  'tolerance': 50,
                },
              },
            },
          ],
          'metadata': {},
        },
        {
          'name': 'Snapping no edge',
          'id': 166,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'line',
              'minResolutionHint': 0.0,
              'name': 'line snap no edge',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'line',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 159,
              'imageType': 'image/png',
              'metadata': {
                'snappingConfig': {
                  'edge': false,
                },
              },
            },
            {
              'layers': 'polygon',
              'minResolutionHint': 0.0,
              'name': 'polygon snap no edge',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'polygon',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 161,
              'imageType': 'image/png',
              'metadata': {
                'snappingConfig': {
                  'edge': false,
                },
              },
            },
          ],
          'metadata': {},
        },
        {
          'name': 'Snapping no vertex',
          'id': 167,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'line',
              'minResolutionHint': 0.0,
              'name': 'line snap no vertex',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'line',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 160,
              'imageType': 'image/png',
              'metadata': {
                'snappingConfig': {
                  'vertex': false,
                },
              },
            },
            {
              'layers': 'polygon',
              'minResolutionHint': 0.0,
              'name': 'polygon snap no vertex',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'polygon',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 162,
              'imageType': 'image/png',
              'metadata': {
                'snappingConfig': {
                  'vertex': false,
                },
              },
            },
          ],
          'metadata': {},
        },
      ],
      'metadata': {
        'disclaimer': 'Editing theme',
      },
    },
    {
      'name': 'Administration',
      'functionalities': {},
      'id': 5,
      'icon':
        'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/administration.jpeg',
      'children': [
        {
          'name': 'Administration',
          'id': 6,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'hospitals',
              'minResolutionHint': 0.0,
              'name': 'hospitals',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'hospitals',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 121,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'H\u00f4pital',
                'legend': 'false',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'firestations',
              'minResolutionHint': 0.0,
              'name': 'firestations',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'firestations',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 122,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'legendRule': 'Casernes de pompiers',
                'legend': 'false',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
          ],
          'metadata': {
            'isExpanded': true,
          },
        },
      ],
      'metadata': {},
    },
    {
      'name': 'Enseignement',
      'functionalities': {},
      'id': 92,
      'icon':
        'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/enseignement2.jpeg',
      'children': [
        {
          'name': 'Enseignement',
          'id': 93,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'bus_stop',
              'minResolutionHint': 0.0,
              'name': 'bus_stop',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'bus_stop',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 101,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'legendRule': 'Arr\u00eat de bus',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
          ],
          'metadata': {},
        },
      ],
      'metadata': {},
    },
    {
      'name': 'Patrimoine',
      'functionalities': {},
      'id': 4,
      'icon':
        'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/patrimoine.jpeg',
      'children': [
        {
          'name': 'Patrimoine',
          'id': 7,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'bank',
              'minResolutionHint': 0.0,
              'name': 'bank',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'bank',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 100,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Banques',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'place_of_worship',
              'minResolutionHint': 0.0,
              'name': 'place_of_worship',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'place_of_worship',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 104,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Autre lieux de culte',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
          ],
          'metadata': {
            'isExpanded': true,
          },
        },
      ],
      'metadata': {},
    },
    {
      'name': 'Gestion des eaux',
      'functionalities': {},
      'id': 3,
      'icon':
        'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/gestion_eaux.jpeg',
      'children': [
        {
          'name': 'Gestion des eaux',
          'id': 8,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'tourism_activity',
              'minResolutionHint': 0.0,
              'name': 'tourism_activity',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'tourism_activity',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 108,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Mus\u00e9e',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'fuel',
              'minResolutionHint': 0.0,
              'name': 'fuel',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'fuel',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 124,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Station service',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
          ],
          'metadata': {
            'isExpanded': true,
          },
        },
      ],
      'metadata': {},
    },
    {
      'name': 'Paysage',
      'functionalities': {},
      'id': 2,
      'icon':
        'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/paysage.jpeg',
      'children': [
        {
          'name': 'Paysage',
          'id': 9,
          'dimensions': {},
          'mixed': false,
          'ogcServer': 'Main PNG',
          'children': [
            {
              'layers': 'alpine_hut',
              'minResolutionHint': 0.0,
              'name': 'accommodation',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'accommodation',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 123,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'H\u00f4tel',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'tourism_activity',
              'minResolutionHint': 0.0,
              'name': 'tourism_activity',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'tourism_activity',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 108,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Mus\u00e9e',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
            {
              'layers': 'information',
              'minResolutionHint': 0.0,
              'name': 'information',
              'childLayers': [
                {
                  'minResolutionHint': 0.0,
                  'name': 'information',
                  'maxResolutionHint': 999999999.0,
                  'queryable': true,
                },
              ],
              'maxResolutionHint': 999999999.0,
              'type': 'WMS',
              'id': 98,
              'imageType': 'image/png',
              'metadata': {
                'identifierAttributeField': 'display_name',
                'isChecked': true,
                'legendRule': 'Informations',
                'legend': 'true',
                'disclaimer': '\u00a9 les contributeurs d\u2019OpenStreetMap',
              },
            },
          ],
          'metadata': {
            'isExpanded': true,
          },
        },
      ],
      'metadata': {},
    },
  ],
  'background_layers': [
    {
      'layer': 'map',
      'dimensions': {},
      'url': 'https://geomapfish-demo-2-6.camptocamp.com//tiles/1.0.0/WMTSCapabilities.xml?',
      'name': 'OSM',
      'type': 'WMTS',
      'id': 134,
      'imageType': 'image/jpeg',
      'metadata': {
        'thumbnail':
          'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/cadastre.jpeg',
      },
    },
    {
      'layer': 'asitvd.fond_gris',
      'dimensions': {
        'DIM1': 'default',
        'ELEVATION': '0',
      },
      'url': 'https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml',
      'name': 'asitvd fond gris',
      'type': 'WMTS',
      'id': 132,
      'imageType': 'image/jpeg',
      'metadata': {
        'thumbnail':
          'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/cadastre.jpeg',
      },
    },
    {
      'layer': 'asitvd.fond_couleur',
      'dimensions': {
        'DIM1': 'default',
        'ELEVATION': '0',
      },
      'url': 'https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml',
      'name': 'asitvd fond couleur',
      'type': 'WMTS',
      'id': 133,
      'imageType': 'image/jpeg',
      'metadata': {
        'thumbnail':
          'https://geomapfish-demo-2-6.camptocamp.com/static-cgxp/276bcfffd75a40debc73e47936bfe884/img/cadastre.jpeg',
      },
    },
  ],
  'errors': [],
  'ogcServers': {
    'WMS CH topo fr': {
      'url': 'https://wms.geo.admin.ch?lang=fr',
      'isSingleTile': false,
      'wfsSupport': false,
      'urlWfs': 'https://wms.geo.admin.ch?lang=fr',
      'type': 'mapserver',
      'imageType': 'image/png',
    },
    'Main Jpeg': {
      'url':
        'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy?username=admin&ogcserver=Main+Jpeg&cache_version=276bcfffd75a40debc73e47936bfe884',
      'isSingleTile': false,
      'wfsSupport': true,
      'urlWfs':
        'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy?username=admin&ogcserver=Main+Jpeg&cache_version=276bcfffd75a40debc73e47936bfe884',
      'type': 'mapserver',
      'imageType': 'image/jpeg',
    },
    'Main PNG': {
      'url':
        'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy?username=admin&ogcserver=Main+PNG&cache_version=276bcfffd75a40debc73e47936bfe884',
      'isSingleTile': false,
      'wfsSupport': true,
      'urlWfs':
        'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy?username=admin&ogcserver=Main+PNG&cache_version=276bcfffd75a40debc73e47936bfe884',
      'type': 'mapserver',
      'imageType': 'image/png',
    },
  },
};
