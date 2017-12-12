goog.provide('ngeo.layertree.DecorateLayer');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ol.layer.Base');


/**
 * Provides a function that adds properties (using
 * `Object.defineProperty`) to the layer, making it possible to control layer
 * properties with ngModel.
 *
 * Example:
 *
 *      <input type="checkbox" ngModel="layer.visible" />
 *
 * See our live examples:
 * [../examples/layeropacity.html](../examples/layeropacity.html)
 * [../examples/layervisibility.html](../examples/layervisibility.html)
 *
 * @ngdoc service
 * @ngname ngeoDecorateLayer
 * @param {ol.layer.Base} layer Layer to decorate.
 */
ngeo.layertree.DecorateLayer = function(layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Base);

  Object.defineProperty(layer, 'visible', {
    configurable: true,
    /**
     * @return {boolean} Visible.
     */
    get: () => layer.getVisible(),
    /**
     * @param {boolean} val Visible.
     */
    set: (val) => {
      layer.setVisible(val);
    }
  });

  Object.defineProperty(layer, 'opacity', {
    configurable: true,
    /**
     * @return {number} Opacity.
     */
    get: () => layer.getOpacity(),
    /**
     * @param {number} val Opacity.
     */
    set: (val) => {
      layer.setOpacity(val);
    }
  });
};


/**
 * @type {!angular.Module}
 */
ngeo.layertree.DecorateLayer.module = angular.module('ngeoDecorateLayer', []);
ngeo.layertree.DecorateLayer.module.value('ngeoDecorateLayer', ngeo.layertree.DecorateLayer);
ngeo.module.requires.push(ngeo.layertree.DecorateLayer.module.name);
