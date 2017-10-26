goog.module('ngeo.wmtsGetCapItemDirective');
goog.module.declareLegacyNamespace();


/**
 * @constructor
 * @param {angular.Scope} $scope .
 * @ngInject
 */
exports.Controller = function($scope) {
  /**
   * @type {ngeox.ImportWmtsGetCapItemOptions}
   */
  const options = $scope['options'];

  // Add preview layer
  $scope['addPreviewLayer'] = function(evt, getCapLayer) {
    evt.stopPropagation();
    options.layerHovered = getCapLayer;
    if (getCapLayer['isInvalid']) {
      return;
    }
    options.addPreviewLayer($scope['map'], getCapLayer);
  };

  // Remove preview layer
  $scope['removePreviewLayer'] = function(evt) {
    evt.stopPropagation();
    options.layerHovered = null;
    options.removePreviewLayer($scope['map']);
  };

  // Select the layer clicked
  $scope['toggleLayerSelected'] = function(evt, getCapLayer) {
    evt.stopPropagation();

    options.layerSelected = (options.layerSelected &&
        options['layerSelected']['Title'] == getCapLayer['Title']) ?
      null : getCapLayer;
  };
};

/**
 * @param {angular.$compile} $compile .
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *    ngeoWmtsGetCapItemTemplateUrl The template url.
 * @ngInject
 * @return {angular.Directive} .
 */
exports.directive = function($compile, ngeoWmtsGetCapItemTemplateUrl) {

  // Zoom to layer extent
  const zoomToLayerExtent = function(scope, layer, map) {
    let extent = layer.extent;
    if (scope['options'].transformExtent) {
      extent = scope['options'].transformExtent(layer.extent);
    }
    const view = map.getView();
    const mapSize = map.getSize();
    if (extent) {
      view.fit(extent, mapSize);
    }
  };

  return {
    restrict: 'A',
    templateUrl: ngeoWmtsGetCapItemTemplateUrl,
    controller: 'NgeoWmtsGetCapItemDirectiveController',
    compile(elt) {
      const contents = elt.contents().remove();
      let compiledContent;
      return function(scope, elt) {
        if (!compiledContent) {
          compiledContent = $compile(contents);
        }
        compiledContent(scope, (clone, scope) => {
          elt.append(clone);
        });

        const headerGroup = elt.find('> .ngeo-header-group');
        headerGroup.find('.fa-zoom-in').on('click', (evt) => {
          evt.stopPropagation();
          zoomToLayerExtent(scope, scope.layer, scope['map']);
        });
      };
    }
  };
};

exports.module = angular.module('ngeo.wmtsGetCapItemDirective', []);

exports.module.value('ngeoWmtsGetCapItemTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
  (element, attrs) => {
    const templateUrl = attrs['ngeoWmsGetCapItemTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseModuleTemplateUrl}/import/partials/wmts-get-cap-item.html`;
  });

exports.module.controller('NgeoWmtsGetCapItemDirectiveController', exports.Controller);
exports.module.directive('ngeoWmtsGetCapItem', exports.directive);
