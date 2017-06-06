goog.module('ngeo.wmtsGetCapDirective');
goog.module.declareLegacyNamespace();

goog.require('ol.format.WMTSCapabilities');
goog.require('ol.source.WMTS');


/**
 * @constructor
 * @param {gettext} gettext Gettext.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoWmtsGetCapTemplateUrl The template url.
 * @ngInject
 */
exports = function(gettext, gettextCatalog, ngeoWmtsGetCapTemplateUrl) {
  // Go through all layers, assign needed properties,
  // and remove useless layers (no name or bad crs without children
  // or no intersection between map extent and layer extent)
  const getLayersList = function(getCap, getCapUrl) {
    const layers = [];

    for (const layer of getCap['Contents']['Layer']) {
      // If the WMTS layer has no title, it can't be displayed
      if (!layer['Title']) {
        layer['isInvalid'] = true;
        layer['Abstract'] = gettext('Invalid layer: missing name');
      }

      if (!layer['isInvalid']) {
        const getTileMetadata = getCap['OperationsMetadata']['GetTile']['DCP']['HTTP']['Get'][0];
        const requestEncoding = getTileMetadata['Constraint'][0]['AllowedValues']['Value'][0];
        const layerOptions = {
          'layer': layer['Identifier'],
          'requestEnconding': requestEncoding
        };
        layer['sourceConfig'] = ol.source.WMTS.optionsFromCapabilities(getCap, layerOptions);
        layer['attribution'] = getCap['ServiceProvider']['ProviderName'];
        layer['attributionUrl'] = getCap['ServiceProvider']['ProviderSite'];
        layer['capabilitiesUrl'] = getCapUrl;
      }

      layers.push(layer);
    }

    return layers;
  };

  return {
    restrict: 'A',
    templateUrl: ngeoWmtsGetCapTemplateUrl,
    scope: {
      'getCap': '=ngeoWmtsGetCap',
      'map': '=ngeoWmtsGetCapMap',
      'url': '=ngeoWmtsGetCapUrl',
      'options': '=ngeoWmtsGetCapOptions'
    },
    link(scope) {

      // List of layers available in the GetCapabilities.
      // The layerXXXX properties use layer objects from the parsing of
      // a  GetCapabilities file, not ol layer object.
      scope['layers'] = [];
      scope['options'] = scope['options'] || {};
      scope.$watch('getCap', (val) => {
        let err;
        try {
          val = new ol.format.WMTSCapabilities().read(val);
        } catch (e) {
          err = e;
        }

        if (err || !val) {
          console.error('WMTS GetCap parsing failed: ', err || val);
          scope['userMsg'] = gettext('Parsing failed');
          return;
        }

        scope['layers'] = [];
        scope['options'].layerSelected = null; // the layer selected on click
        scope['options'].layerHovered = null;

        if (val && val['Contents'] && val['Contents']['Layer']) {
          scope['layers'] = getLayersList(val, scope['url']);
        }
      });

      // Add the selected layer to the map
      scope['addLayerSelected'] = function() {
        const getCapLay = scope['options'].layerSelected;
        if (getCapLay && scope['options']['getOlLayerFromGetCapLayer']) {
          let msg = gettextCatalog.getString('WMTS layer added succesfully');
          try {
            const olLayer = scope['options']['getOlLayerFromGetCapLayer'](getCapLay);
            if (olLayer) {
              scope['map'].addLayer(olLayer);
            }

          } catch (e) {
            console.error(`Add layer failed:${e}`);
            msg = `${gettextCatalog.getString('WMTS layer could not be added')} ${e.message}`;
          }
          alert(msg);
        }
      };

      // Get the abstract to display in the text area
      scope['getAbstract'] = function() {
        const l = scope['options'].layerSelected || scope['options'].layerHovered || {};
        return gettextCatalog.getString(l.Abstract) || '';
      };
    }
  };
};

exports.module = angular.module('ngeo.wmtsGetCapDirective', [
  'gettext'
]);

exports.module.value('ngeoWmtsGetCapTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
    (element, attrs) => {
      const templateUrl = attrs['ngeoWmtsGetCapTemplateUrl'];
      return templateUrl !== undefined ? templateUrl :
          `${ngeo.baseModuleTemplateUrl}/import/partials/wmts-get-cap.html`;
    });

/**
 * This directive displays the list of layers available in the
 * GetCapabilities object.
 */
exports.module.directive('ngeoWmtsGetCap', exports);
