goog.provide('app.modifyrectangle');

goog.require('ngeo.interaction.ModifyRectangle');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');
goog.require('ol.geom.Polygon');
goog.require('ol.Collection');
goog.require('ol.Feature');
goog.require('ol.style.Style');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');


/** @type {!angular.Module} **/
const module = angular.module('app', ['ngeo']);


/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [-10997148, 4569099],
      zoom: 4
    })
  });

  const map = this.map;

  const rectangle = new ol.geom.Polygon([[
              [-9e6, 4e6], [-11e6, 4e6], [-11e6, 6e6], [-9e6, 6e6]
  ]]);

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.features = new ol.Collection();

  this.features.push(new ol.Feature({
    geometry: rectangle,
    'isRectangle': true
  }));

  const style = (function() {
    const styles = {};
    styles['Polygon'] = [
      new ol.style.Style({
        fill: new ol.style.Fill({
          color: [255, 255, 255, 0.5]
        })
      }),
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: [255, 255, 255, 1],
          width: 5
        })
      }),
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: [0, 153, 255, 1],
          width: 3
        })
      })
    ];

    styles['Point'] = [
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: [0, 153, 255, 1]
          }),
          stroke: new ol.style.Stroke({
            color: [255, 255, 255, 0.75],
            width: 1.5
          })
        }),
        zIndex: 100000
      })
    ];
    styles['GeometryCollection'] = styles['Polygon'].concat(styles['Point']);

    return function(feature, resolution) {
      return styles[feature.getGeometry().getType()];
    };
  })();

  const vectorSource = new ol.source.Vector({
    features: this.features
  });
  const vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {ngeo.interaction.ModifyRectangle}
   * @export
   */
  this.interaction = new ngeo.interaction.ModifyRectangle(
    /** @type {olx.interaction.ModifyOptions} */({
      features: this.features,
      style
    }));

  const interaction = this.interaction;
  map.addInteraction(interaction);
  interaction.setActive(true);

};


module.controller('MainController', app.MainController);
