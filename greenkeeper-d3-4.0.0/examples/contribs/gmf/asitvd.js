


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


/**
 * @constructor
 */
app.MainController = function() {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new gmf.source.AsitVD({
          layer: 'asitvd.fond_couleur'
        })
      })
    ],
    view: new ol.View({
      resolutions: [250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5],
      center: [535000, 154000],
      zoom: 0
    })
  });
};

app.module.controller('MainController', app.MainController);
