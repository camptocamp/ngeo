import './control.css';
import angular from 'angular';
import ngeoMapModule from 'ngeo/map/module.js';

import ngeoMiscControlComponent from 'ngeo/misc/controlComponent.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olControlMousePosition from 'ol/control/MousePosition.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name, ngeoMiscControlComponent.name]);

/**
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
      center: [0, 0],
      zoom: 4,
    }),
  });

  /**
   * @type {import('ol/control/Control.js').default}
   */
  this.control = new olControlMousePosition({
    className: 'mouse-position',
  });
}

module.controller('MainController', MainController);

export default module;
