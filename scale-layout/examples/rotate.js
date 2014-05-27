


/** @const **/
var app = {};


/** @type {!angular.Module} **/
var module = angular.module('app', ['ngeo']);


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
        source: new ol.source.MapQuest({layer: 'sat'})
      })
    ],
    view: new ol.View({
      center: [-10997148, 4569099],
      zoom: 4
    })
  });

  var map = this.map;

  var polygon = new ol.geom.Polygon([[
              [-9e6, 4e6], [-11e6, 4e6], [-11e6, 6e6], [-9e6, 6e6]
  ]]);

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.features = new ol.Collection();

  this.features.push(new ol.Feature({
    geometry: polygon
  }));

  var vectorSource = new ol.source.Vector({
    features: this.features
  });
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);


  var style = (function() {
    var styles = {};
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
    styles['Point'] = new ol.style.Style({
      image: new ol.style.Circle(),
      text: new ol.style.Text({
        text: '\uf01e',
        font: 'normal 18px FontAwesome',
        fill: new ol.style.Fill({
          color: '#ffffff'
        })
      })
    });

    styles['GeometryCollection'] = styles['Polygon'].concat(styles['Point']);

    return function(feature, resolution) {
      return styles[feature.getGeometry().getType()];
    };
  })();

  /**
   * @type {ngeo.interaction.Rotate}
   * @export
   */
  this.interaction = new ngeo.interaction.Rotate(
    /** @type {olx.interaction.ModifyOptions} */({
      features: this.features,
      layers: [this.vectorLayer],
      style: style
    }));

  var interaction = this.interaction;
  interaction.setActive(false);
  map.addInteraction(interaction);

  map.on('singleclick', function(evt) {
    var feature = this.map.forEachFeatureAtPixel(evt.pixel,
      function(feature) {
        return feature;
      });
    if (feature) {
      this.interaction.setActive(true);
    }
  }, this);
};


module.controller('MainController', app.MainController);
