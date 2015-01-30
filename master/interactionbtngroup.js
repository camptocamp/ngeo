


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);



/**
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoDecorateInteraction) {
  var source = new ol.source.Vector();

  var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33'
        })
      })
    })
  });

  /** @type {ol.Map} */
  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
      }),
      vector
    ],
    view: new ol.View({
      center: [-10997148, 4569099],
      zoom: 4
    })
  });
  this['map'] = map;

  /** @type {ol.interaction.Draw} */
  var drawPolygon = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'Polygon',
        source: source
      }));
  drawPolygon.setActive(false);
  ngeoDecorateInteraction(drawPolygon);
  map.addInteraction(drawPolygon);
  this['drawPolygon'] = drawPolygon;

  /** @type {ol.interaction.Draw} */
  var drawPoint = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'Point',
        source: source
      }));
  drawPoint.setActive(false);
  ngeoDecorateInteraction(drawPoint);
  map.addInteraction(drawPoint);
  this['drawPoint'] = drawPoint;

  /** @type {ol.interaction.Draw} */
  var drawLine = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'LineString',
        source: source
      }));
  drawLine.setActive(false);
  ngeoDecorateInteraction(drawLine);
  map.addInteraction(drawLine);
  this['drawLine'] = drawLine;

};


app.module.controller('MainController', app.MainController);
