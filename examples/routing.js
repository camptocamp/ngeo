/**
 */

/**
 * This example shows the ngeo routing directive.
 */
import './routing.css';
import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

import angular from 'angular';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoRoutingModule from 'ngeo/routing/module.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name, ngeoRoutingModule.name]);

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
      center: [931010.1535989442, 5961705.842297254],
      zoom: 9,
    }),
  });

  /**
   * @type {boolean}
   */
  this.routingfeatureActive = true;
}

module.controller('MainController', MainController);

export default module;
