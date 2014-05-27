


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr ToolActivate manager.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Interaction
  *    decorator.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoFeatureOverlayMgr, ngeoToolActivateMgr,
    ngeoDecorateInteraction) {

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
      center: [1444682, 5979706],
      zoom: 4
    })
  });

  var map = this.map;

  // initialize the feature overlay manager with the map
  ngeoFeatureOverlayMgr.init(map);

  /**
   * Collection shared between the drawing interactions and the feature
   * overlay used to render the drawn features.
   * @type {ol.Collection.<ol.Feature>}
   */
  var features = new ol.Collection();

  var overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(new ol.style.Style({
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
  }));


  // manage clicks on the map
  this.mapClickIsEnabled = true;
  var content = document.getElementById('popup-content');
  this.map.on('singleclick', (function(evt) {
    if (this.mapClickIsEnabled) {
      var c = ol.coordinate.toStringXY(evt.coordinate);
      content.innerHTML = '<p>You clicked here: <code>' + c + '</code></p>';
    }
  }).bind(this));

  var mapClickTool = new ngeo.ToolActivate(this, 'mapClickIsEnabled');
  ngeoToolActivateMgr.registerTool('mapTools', mapClickTool, true);


  // draw point interaction
  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPoint = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'Point',
        features: features
      }));
  this.drawPoint.setActive(false);
  ngeoDecorateInteraction(this.drawPoint);
  map.addInteraction(this.drawPoint);

  var drawPointTool = new ngeo.ToolActivate(this.drawPoint, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawPointTool);

  // draw line interaction
  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawLine = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'LineString',
        features: features
      }));
  this.drawLine.setActive(false);
  ngeoDecorateInteraction(this.drawLine);
  map.addInteraction(this.drawLine);

  var drawLineTool = new ngeo.ToolActivate(this.drawLine, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawLineTool);

  // draw polygon interaction
  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPolygon = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'Polygon',
        features: features
      }));
  this.drawPolygon.setActive(false);
  ngeoDecorateInteraction(this.drawPolygon);
  map.addInteraction(this.drawPolygon);

  var drawPolygonTool = new ngeo.ToolActivate(this.drawPolygon, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawPolygonTool);
};


app.module.controller('MainController', app.MainController);
