


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.constant('gmfPermalinkOptions',
    /** @type {gmfx.PermalinkOptions} */ ({
      crosshairStyle: new ol.style.Style({
        image: new ol.style.RegularShape({
          stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 255, 1)',
            width: 2
          }),
          points: 4,
          radius: 8,
          radius2: 0,
          angle: 0
        })
      })
    }));

/**
 * @constructor
 */
app.MainController = function() {

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

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
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 3
    })
  });
};

app.module.controller('MainController', app.MainController);
