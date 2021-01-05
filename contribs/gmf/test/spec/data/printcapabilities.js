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

export default {
  'app': 'demo',
  'layouts': [
    {
      'attributes': [
        {
          'default': '',
          'type': 'String',
          'name': 'title',
        },
        {
          'default': '',
          'type': 'String',
          'name': 'comments',
        },
        {
          'default': false,
          'type': 'Boolean',
          'name': 'debug',
        },
        {
          'clientParams': {
            'classes': {
              'default': null,
              'isArray': true,
              'embeddedType': {
                'classes': {
                  'default': null,
                  'isArray': true,
                  'type': 'recursiveDefinition',
                },
                'name': {
                  'default': null,
                  'type': 'String',
                },
                'icons': {
                  'default': null,
                  'isArray': true,
                  'type': 'URL',
                },
              },
              'type': 'LegendAttributeValue[]',
            },
            'name': {
              'default': null,
              'type': 'String',
            },
            'icons': {
              'default': null,
              'isArray': true,
              'type': 'URL',
            },
          },
          'type': 'LegendAttributeValue',
          'name': 'legend',
        },
        {
          'clientParams': {
            'graphic': {
              'default': 'file:///north.svg',
              'type': 'String',
            },
            'backgroundColor': {
              'default': 'rgba(255, 255, 255, 0)',
              'type': 'String',
            },
          },
          'type': 'NorthArrowAttributeValues',
          'name': 'northArrow',
        },
        {
          'clientParams': {
            'barSize': {
              'default': null,
              'type': 'int',
            },
            'verticalAlign': {
              'default': 'bottom',
              'type': 'String',
            },
            'orientation': {
              'default': 'horizontalLabelsBelow',
              'type': 'String',
            },
            'color': {
              'default': 'black',
              'type': 'String',
            },
            'align': {
              'default': 'left',
              'type': 'String',
            },
            'font': {
              'default': 'Helvetica',
              'type': 'String',
            },
            'padding': {
              'default': null,
              'type': 'int',
            },
            'renderAsSvg': {
              'default': null,
              'type': 'boolean',
            },
            'geodetic': {
              'default': false,
              'type': 'boolean',
            },
            'intervals': {
              'default': 3,
              'type': 'int',
            },
            'fontSize': {
              'default': 8,
              'type': 'int',
            },
            'backgroundColor': {
              'default': 'rgba(255, 255, 255, 0)',
              'type': 'String',
            },
            'fontColor': {
              'default': 'black',
              'type': 'String',
            },
            'subIntervals': {
              'default': false,
              'type': 'boolean',
            },
            'barBgColor': {
              'default': 'white',
              'type': 'String',
            },
            'labelDistance': {
              'default': null,
              'type': 'int',
            },
            'lineWidth': {
              'default': null,
              'type': 'int',
            },
            'type': {
              'default': 'bar',
              'type': 'String',
            },
            'unit': {
              'default': null,
              'type': 'String',
            },
            'lockUnits': {
              'default': false,
              'type': 'boolean',
            },
          },
          'type': 'ScalebarAttributeValues',
          'name': 'scalebar',
        },
        {
          'clientInfo': {
            'width': 555,
            'dpiSuggestions': [254],
            'scales': [500000, 100000, 50000, 25000, 10000, 5000, 2500, 500, 250, 100],
            'maxDPI': 254,
            'height': 675,
          },
          'clientParams': {
            'layers': {
              'type': 'array',
            },
            'useAdjustBounds': {
              'default': null,
              'type': 'boolean',
            },
            'scale': {
              'default': null,
              'type': 'double',
            },
            'center': {
              'isArray': true,
              'type': 'double',
            },
            'zoomToFeatures': {
              'default': null,
              'embeddedType': {
                'zoomType': {
                  'default': 'EXTENT',
                  'embeddedType': {},
                  'type': 'ZoomType',
                },
                'minScale': {
                  'default': null,
                  'type': 'double',
                },
                'layer': {
                  'default': null,
                  'type': 'String',
                },
                'minMargin': {
                  'default': 10,
                  'type': 'int',
                },
              },
              'type': 'ZoomToFeatures',
            },
            'longitudeFirst': {
              'default': null,
              'type': 'boolean',
            },
            'useNearestScale': {
              'default': null,
              'type': 'boolean',
            },
            'dpiSensitiveStyle': {
              'default': true,
              'type': 'boolean',
            },
            'areaOfInterest': {
              'embeddedType': {
                'renderAsSvg': {
                  'default': null,
                  'type': 'boolean',
                },
                'style': {
                  'default': null,
                  'type': 'String',
                },
                'display': {
                  'default': 'RENDER',
                  'embeddedType': {},
                  'type': 'AoiDisplay',
                },
                'area': {
                  'type': 'String',
                },
              },
              'type': 'AreaOfInterest',
            },
            'bbox': {
              'isArray': true,
              'type': 'double',
            },
            'rotation': {
              'default': null,
              'type': 'double',
            },
            'dpi': {
              'type': 'double',
            },
            'projection': {
              'default': null,
              'type': 'String',
            },
          },
          'type': 'MapAttributeValues',
          'name': 'map',
        },
        {
          'clientParams': {
            'attributes': [
              {
                'type': 'String',
                'name': 'title',
              },
              {
                'clientParams': {
                  'data': {
                    'isArray': true,
                    'type': 'array',
                  },
                  'columns': {
                    'isArray': true,
                    'type': 'String',
                  },
                },
                'type': 'TableAttributeValue',
                'name': 'table',
              },
            ],
          },
          'type': 'DataSourceAttributeValue',
          'name': 'datasource',
        },
      ],
      'name': '1 A4 portrait',
    },
    {
      'attributes': [
        {
          'default': '',
          'type': 'String',
          'name': 'title',
        },
        {
          'default': '',
          'type': 'String',
          'name': 'comments',
        },
        {
          'default': false,
          'type': 'Boolean',
          'name': 'debug',
        },
        {
          'clientParams': {
            'classes': {
              'default': null,
              'isArray': true,
              'embeddedType': {
                'classes': {
                  'default': null,
                  'isArray': true,
                  'type': 'recursiveDefinition',
                },
                'name': {
                  'default': null,
                  'type': 'String',
                },
                'icons': {
                  'default': null,
                  'isArray': true,
                  'type': 'URL',
                },
              },
              'type': 'LegendAttributeValue[]',
            },
            'name': {
              'default': null,
              'type': 'String',
            },
            'icons': {
              'default': null,
              'isArray': true,
              'type': 'URL',
            },
          },
          'type': 'LegendAttributeValue',
          'name': 'legend',
        },
        {
          'clientParams': {
            'graphic': {
              'default': 'file:///north.svg',
              'type': 'String',
            },
            'backgroundColor': {
              'default': 'rgba(255, 255, 255, 0)',
              'type': 'String',
            },
          },
          'type': 'NorthArrowAttributeValues',
          'name': 'northArrow',
        },
        {
          'clientParams': {
            'barSize': {
              'default': null,
              'type': 'int',
            },
            'verticalAlign': {
              'default': 'bottom',
              'type': 'String',
            },
            'orientation': {
              'default': 'horizontalLabelsBelow',
              'type': 'String',
            },
            'color': {
              'default': 'black',
              'type': 'String',
            },
            'align': {
              'default': 'left',
              'type': 'String',
            },
            'font': {
              'default': 'Helvetica',
              'type': 'String',
            },
            'padding': {
              'default': null,
              'type': 'int',
            },
            'renderAsSvg': {
              'default': null,
              'type': 'boolean',
            },
            'geodetic': {
              'default': false,
              'type': 'boolean',
            },
            'intervals': {
              'default': 3,
              'type': 'int',
            },
            'fontSize': {
              'default': 8,
              'type': 'int',
            },
            'backgroundColor': {
              'default': 'rgba(255, 255, 255, 0)',
              'type': 'String',
            },
            'fontColor': {
              'default': 'black',
              'type': 'String',
            },
            'subIntervals': {
              'default': false,
              'type': 'boolean',
            },
            'barBgColor': {
              'default': 'white',
              'type': 'String',
            },
            'labelDistance': {
              'default': null,
              'type': 'int',
            },
            'lineWidth': {
              'default': null,
              'type': 'int',
            },
            'type': {
              'default': 'bar',
              'type': 'String',
            },
            'unit': {
              'default': null,
              'type': 'String',
            },
            'lockUnits': {
              'default': false,
              'type': 'boolean',
            },
          },
          'type': 'ScalebarAttributeValues',
          'name': 'scalebar',
        },
        {
          'clientInfo': {
            'width': 800,
            'dpiSuggestions': [254],
            'scales': [500000, 100000, 50000, 25000, 10000, 5000, 2500, 500, 250, 100],
            'maxDPI': 254,
            'height': 460,
          },
          'clientParams': {
            'layers': {
              'type': 'array',
            },
            'useAdjustBounds': {
              'default': null,
              'type': 'boolean',
            },
            'scale': {
              'default': null,
              'type': 'double',
            },
            'center': {
              'isArray': true,
              'type': 'double',
            },
            'zoomToFeatures': {
              'default': null,
              'embeddedType': {
                'zoomType': {
                  'default': 'EXTENT',
                  'embeddedType': {},
                  'type': 'ZoomType',
                },
                'minScale': {
                  'default': null,
                  'type': 'double',
                },
                'layer': {
                  'default': null,
                  'type': 'String',
                },
                'minMargin': {
                  'default': 10,
                  'type': 'int',
                },
              },
              'type': 'ZoomToFeatures',
            },
            'longitudeFirst': {
              'default': null,
              'type': 'boolean',
            },
            'useNearestScale': {
              'default': null,
              'type': 'boolean',
            },
            'dpiSensitiveStyle': {
              'default': true,
              'type': 'boolean',
            },
            'areaOfInterest': {
              'embeddedType': {
                'renderAsSvg': {
                  'default': null,
                  'type': 'boolean',
                },
                'style': {
                  'default': null,
                  'type': 'String',
                },
                'display': {
                  'default': 'RENDER',
                  'embeddedType': {},
                  'type': 'AoiDisplay',
                },
                'area': {
                  'type': 'String',
                },
              },
              'type': 'AreaOfInterest',
            },
            'bbox': {
              'isArray': true,
              'type': 'double',
            },
            'rotation': {
              'default': null,
              'type': 'double',
            },
            'dpi': {
              'type': 'double',
            },
            'projection': {
              'default': null,
              'type': 'String',
            },
          },
          'type': 'MapAttributeValues',
          'name': 'map',
        },
        {
          'clientParams': {
            'attributes': [
              {
                'type': 'String',
                'name': 'title',
              },
              {
                'clientParams': {
                  'data': {
                    'isArray': true,
                    'type': 'array',
                  },
                  'columns': {
                    'isArray': true,
                    'type': 'String',
                  },
                },
                'type': 'TableAttributeValue',
                'name': 'table',
              },
            ],
          },
          'type': 'DataSourceAttributeValue',
          'name': 'datasource',
        },
      ],
      'name': '2 A3 landscape',
    },
  ],
  'formats': ['bmp', 'gif', 'pdf', 'png', 'tif', 'tiff'],
};
