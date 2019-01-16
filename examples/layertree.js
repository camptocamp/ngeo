/**
 * @module app.layertree
 */
const exports = {};

/**
 * This example shows how to create a layer tree tree based
 * on ngeo's ngeoLayertree directive.
 */

import './layertree.css';
import angular from 'angular';
import olMap from 'ol/Map.js';

import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceStamen from 'ol/source/Stamen.js';
import ngeoLayertreeModule from 'ngeo/layertree/module.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMessagePopup from 'ngeo/message/Popup.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoLayertreeModule.name,
  ngeoMapModule.name,
  ngeoMessagePopup.module.name,
]);


/**
 * An application-specific component wrapping the ngeo tree layer component.
 * The component includes a controller defining the tree tree.
 *
 * @type {!angular.Component}
 */
exports.layertreeComponent = {
  bindings: {
    'map': '=appLayertreeMap'
  },
  controller: 'AppLayertreeController',
  // use "::$ctrl.tree" for the "tree" expression as we know the
  // layer tree won't change
  template:
      '<div ngeo-layertree="::$ctrl.tree" ' +
      'ngeo-layertree-templateurl="examples/layertree" ' +
      'ngeo-layertree-map="$ctrl.map" ' +
      'ngeo-layertree-nodelayer="$ctrl.getLayer(node)">' +
      '</div>'
};

exports.module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('examples/layertree', require('./partials/layertree.html'));
});

exports.module.component('appLayertree', exports.layertreeComponent);


/**
 * @constructor
 * @param {angular.IHttpService} $http Angular http service.
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {function(Object):ol.layer.Layer} appGetLayer Get layer service.
 * @param {PopupFactory} ngeoCreatePopup Popup service.
 * @ngInject
 * @export
 */
exports.LayertreeController = function($http, $sce, appGetLayer, ngeoCreatePopup) {

  /**
   * @type {Object|undefined}
   * @export
   */
  this.tree = undefined;

  $http.get('data/tree.json').then((resp) => {
    this.tree = resp.data;
  });

  /**
   * @private
   * @type {angular.IHttpService}
   */
  this.http_ = $http;

  /**
   * @private
   * @type {angular.ISCEService}
   */
  this.sce_ = $sce;

  /**
   * @private
   * @type {function(Object):ol.layer.Layer}
   */
  this.getLayer_ = appGetLayer;

  /**
   * @private
   * @type {ngeo.message.Popup}
   */
  this.infoPopup_ = ngeoCreatePopup();

  /**
   * @type {Object.<string, !angular.IPromise>}
   * @private
   */
  this.promises_ = {};
};


/**
 * Function called by the ngeo-layertree directives to create a layer
 * from a tree node. The function should return `null` if no layer should
 * be associated to the node (because it's not a leaf).
 * @param {Object} node Node object.
 * @return {ol.layer.Layer} The layer for this node.
 * @export
 */
exports.LayertreeController.prototype.getLayer = function(node) {
  return this.getLayer_(node);
};


/**
 * @param {Object} node Tree node.
 * @param {ol.layer.Layer} layer Layer.
 * @export
 */
exports.LayertreeController.prototype.onButtonClick = function(node, layer) {
  const layerType = node['layerType'];
  if (!(layerType in this.promises_)) {
    this.promises_[layerType] = this.http_.get('data/metadata.html').then(
      (resp) => {
        const html = this.sce_.trustAsHtml(resp.data);
        return html;
      }
    );
  }
  const infoPopup = this.infoPopup_;
  this.promises_[layerType].then((html) => {
    infoPopup.setTitle(node['name']);
    infoPopup.setContent(html);
    infoPopup.setOpen(true);
  });
};


exports.module.controller('AppLayertreeController', exports.LayertreeController);


/**
 * A function that returns a layer for a node. A cache is used, so always the
 * same layer instance is returned for a given node. This function is called by
 * the ngeoLayertree directive for creating layers from tree nodes. The
 * function returns `null` when no layer should be created for the node.
 *
 * @param {Object} node Layer tree node.
 * @return {ol.layer.Layer} Layer.
 */
exports.getLayer = (function() {
  /**
   * @type {Object.<string, ol.layer.Layer>}
   */
  const layerCache = {};
  return (
    /**
         * @param {Object} node Tree node.
         * @return {ol.layer.Layer} Layer.
         */
    function(node) {
      if (!('layerType' in node)) {
        return null;
      }
      const type = node['layerType'];
      if (type in layerCache) {
        return layerCache[type];
      }
      let source;
      if (type == 'stamenWatercolor') {
        source = new olSourceStamen({
          layer: 'watercolor'
        });
      } else if (type == 'stamenTerrain-labels') {
        source = new olSourceStamen({
          layer: 'terrain-labels'
        });
      } else if (type == 'osmHumanitarian') {
        source = new olSourceOSM({
          url: 'https://tile-{a-c}.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        });
      } else if (type == 'osmCycle') {
        source = new olSourceOSM({
          url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'
        });
      } else if (type == 'osmTransport') {
        source = new olSourceOSM({
          url: 'https://{a-c}.tile.thunderforest.com/transport/{z}/{x}/{y}.png'
        });
      } else {
        source = new olSourceOSM();
      }
      const layer = new olLayerTile({
        source
      });
      layer.set('type', type);
      layerCache[type] = layer;
      return layer;
    }
  );
})();


exports.module.value('appGetLayer', exports.getLayer);


/**
 * The application's main directive.
 * @constructor
 * @ngInject
 */
exports.MainController = function() {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      center: [-10983710.59086991, 4686507.078220731],
      zoom: 4
    })
  });
};


exports.module.controller('MainController', exports.MainController);


export default exports;
