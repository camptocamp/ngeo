import angular from 'angular';
import './svg.css';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import LayerVector from 'ol/layer/Vector.js';
import SourceVector from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js';

import MapModule from 'ngeo/map/module.js';

/** @type {!angular.IModule} **/
const appmodule = angular.module('app', [MapModule.name]);

/**
 * @constructor
 * @ngInject
 * @hidden
 */
function MainController() {
  const source = new SourceVector();
  const feature1 = new Feature({
    geometry: new Point([599000, 200000]),
  });
  feature1.setStyle([
    new Style({
      image: new Icon({
        // @ts-ignore: For Webpack
        src: 'data:image/svg+xml;base64,' + btoa(require('./inline.svg')),
        // For IE compatibility
        imgSize: [65, 65],
      }),
    }),
  ]);
  source.addFeature(feature1);

  const feature2 = new Feature({
    geometry: new Point([600000, 200000]),
  });
  feature2.setStyle([
    new Style({
      image: new Icon({
        // @ts-ignore: For Webpack
        src: 'data:image/svg+xml;base64,' + btoa(require('./inline.svg?viewbox&width=30px')),
        // For IE compatibility
        imgSize: [30, 30],
      }),
    }),
  ]);
  source.addFeature(feature2);

  const feature3 = new Feature({
    geometry: new Point([601000, 200000]),
  });
  feature3.setStyle([
    new Style({
      image: new Icon({
        // @ts-ignore: For Webpack
        src: require('./url.svg?url'),
        // For IE compatibility
        imgSize: [65, 65],
      }),
    }),
  ]);
  source.addFeature(feature3);

  this.map = new Map({
    layers: [
      new LayerVector({
        source,
      }),
    ],
    view: new View({
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1],
      center: [600000, 200000],
      zoom: 4,
    }),
  });
}

appmodule.controller('MainController', MainController);

export default module;
