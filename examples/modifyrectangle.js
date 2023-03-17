import './modifyrectangle.css';
import angular from 'angular';
import ngeoInteractionModifyRectangle from 'ngeo/interaction/ModifyRectangle.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olCollection from 'ol/Collection.js';
import olFeature from 'ol/Feature.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @type {!angular.IModule} **/
const appmodule = angular.module('app', ['gettext', ngeoMapModule.name]);

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
      center: [-10997148, 4569099],
      zoom: 4,
    }),
  });

  const map = this.map;

  const rectangle = new olGeomPolygon([
    [
      [-9e6, 4e6],
      [-11e6, 4e6],
      [-11e6, 6e6],
      [-9e6, 6e6],
    ],
  ]);

  /**
   * @type {import("ol/Collection.js").default.<import("ol/Feature.js").default>}
   */
  this.features = new olCollection();

  this.features.push(
    new olFeature({
      geometry: rectangle,
      'isRectangle': true,
    })
  );

  const style = (function () {
    const styles = {};
    styles['Polygon'] = [
      new olStyleStyle({
        fill: new olStyleFill({
          color: [255, 255, 255, 0.5],
        }),
      }),
      new olStyleStyle({
        stroke: new olStyleStroke({
          color: [255, 255, 255, 1],
          width: 5,
        }),
      }),
      new olStyleStyle({
        stroke: new olStyleStroke({
          color: [0, 153, 255, 1],
          width: 3,
        }),
      }),
    ];

    styles['Point'] = [
      new olStyleStyle({
        image: new olStyleCircle({
          radius: 7,
          fill: new olStyleFill({
            color: [0, 153, 255, 1],
          }),
          stroke: new olStyleStroke({
            color: [255, 255, 255, 0.75],
            width: 1.5,
          }),
        }),
        zIndex: 100000,
      }),
    ];
    styles['GeometryCollection'] = styles['Polygon'].concat(styles['Point']);

    return function (feature, resolution) {
      return styles[feature.getGeometry().getType()];
    };
  })();

  const vectorSource = new olSourceVector({
    features: this.features,
  });
  const vectorLayer = new olLayerVector({
    source: vectorSource,
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {import("ngeo/interaction/ModifyRectangle.js").default}
   */
  this.interaction = new ngeoInteractionModifyRectangle(
    /** @type {import('ol/interaction/Modify.js').Options} */ ({
      features: this.features,
      style: style,
    })
  );

  const interaction = this.interaction;
  map.addInteraction(interaction);
  interaction.setActive(true);
}

appmodule.controller('MainController', MainController);

export default module;
