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
const module = angular.module('app', [
  'gettext',
  ngeoLayertreeModule.name,
  ngeoMapModule.name,
  ngeoMessagePopup.name,
]);

/**
 * An application-specific component wrapping the ngeo tree layer component.
 * The component includes a controller defining the tree tree.
 *
 * @type {!angular.IComponentOptions}
 */
const layertreeComponent = {
  bindings: {
    'map': '=appLayertreeMap',
  },
  controller: 'AppLayertreeController',
  // use "::$ctrl.tree" for the "tree" expression as we know the
  // layer tree won't change
  template:
    '<div ngeo-layertree="::$ctrl.tree" ' +
    'ngeo-layertree-templateurl="examples/layertree" ' +
    'ngeo-layertree-map="$ctrl.map" ' +
    'ngeo-layertree-nodelayer="$ctrl.getLayer(node)">' +
    '</div>',
};

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('examples/layertree', require('./partials/layertree.html'));
  }
);

module.component('appLayertree', layertreeComponent);

/**
 * @constructor
 * @param {angular.IHttpService} $http Angular http service.
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {function(Object):import("ol/layer/Layer.js").default} appGetLayer Get layer service.
 * @param {import("ngeo/message/Popup.js").PopupFactory} ngeoCreatePopup Popup service.
 * @ngInject
 */
function LayertreeController($http, $sce, appGetLayer, ngeoCreatePopup) {
  /**
   * @type {Object|undefined}
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
   * @type {function(Object):import("ol/layer/Layer.js").default}
   */
  this.getLayer_ = appGetLayer;

  /**
   * @private
   * @type {import("ngeo/message/Popup.js").MessagePopup}
   */
  this.infoPopup_ = ngeoCreatePopup();

  /**
   * @type {Object.<string, !angular.IPromise>}
   * @private
   */
  this.promises_ = {};
}

/**
 * Function called by the ngeo-layertree directives to create a layer
 * from a tree node. The function should return `null` if no layer should
 * be associated to the node (because it's not a leaf).
 * @param {Object} node Node object.
 * @return {import("ol/layer/Layer.js").default} The layer for this node.
 */
LayertreeController.prototype.getLayer = function (node) {
  return this.getLayer_(node);
};

/**
 * @param {Object} node Tree node.
 * @param {import("ol/layer/Layer.js").default} layer Layer.
 */
LayertreeController.prototype.onButtonClick = function (node, layer) {
  const layerType = node['layerType'];
  if (!(layerType in this.promises_)) {
    this.promises_[layerType] = this.http_.get('data/metadata.html').then((resp) => {
      const html = this.sce_.trustAsHtml(resp.data);
      return html;
    });
  }
  const infoPopup = this.infoPopup_;
  this.promises_[layerType].then((html) => {
    infoPopup.setTitle(node['name']);
    infoPopup.setContent(html);
    infoPopup.setOpen(true);
  });
};

module.controller('AppLayertreeController', LayertreeController);

/**
 * A function that returns a layer for a node. A cache is used, so always the
 * same layer instance is returned for a given node. This function is called by
 * the ngeoLayertree directive for creating layers from tree nodes. The
 * function returns `null` when no layer should be created for the node.
 *
 * @param {Object} node Layer tree node.
 * @return {import("ol/layer/Layer.js").default} Layer.
 */
const getLayer = (function () {
  /**
   * @type {Object.<string, import("ol/layer/Layer.js").default>}
   */
  const layerCache = {};
  return (
    /**
     * @param {Object} node Tree node.
     * @return {import("ol/layer/Layer.js").default} Layer.
     */
    function (node) {
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
          layer: 'watercolor',
        });
      } else if (type == 'stamenTerrain-labels') {
        source = new olSourceStamen({
          layer: 'terrain-labels',
        });
      } else if (type == 'osmHumanitarian') {
        source = new olSourceOSM({
          url: 'https://tile-{a-c}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        });
      } else if (type == 'osmCycle') {
        source = new olSourceOSM({
          url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
        });
      } else if (type == 'osmTransport') {
        source = new olSourceOSM({
          url: 'https://{a-c}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
        });
      } else {
        source = new olSourceOSM();
      }
      const layer = new olLayerTile({
        source,
      });
      layer.set('type', type);
      layerCache[type] = layer;
      return layer;
    }
  );
})();

module.value('appGetLayer', getLayer);

/**
 * The application's main directive.
 * @constructor
 * @ngInject
 */
function MainController() {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      center: [-10983710.59086991, 4686507.078220731],
      zoom: 4,
    }),
  });
}

module.controller('MainController', MainController);

export default module;
