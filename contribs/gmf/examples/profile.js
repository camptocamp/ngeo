goog.provide('gmf-profile');

goog.require('ngeo.FeatureOverlayMgr');
goog.require('gmf.mapDirective');
goog.require('gmf.profileDirective');
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.geom.Point');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.proj');
goog.require('ol.source.OSM');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.constant(
    'gmfProfileJsonUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/profile.json');

app.module.constant(
    'gmfProfileCsvUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/profile.csv');

/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {angular.$filter} $filter Angular filter
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @constructor
 * @ngInject
 */
app.MainController = function($scope, $filter, ngeoFeatureOverlayMgr) {

  var projection = ol.proj.get('EPSG:21781');

  /**
   * @type {angular.$filter}
   * @export
   */
  this.$filter_ = $filter;

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
      center: [600000, 200000],
      zoom: 3
    })
  });

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
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
      radius: 3,
      fill: new ol.style.Fill({color: '#ffffff'})
    })
  }));

  /**
   * @type {ol.Feature}
   * @private
   */
  this.snappedPoint_ = new ol.Feature();
  overlay.addFeature(this.snappedPoint_);

  // initialize the feature overlay manager with the map
  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * @type {ol.geom.LineString}
   * @export
   */
  this.profileLine = null;

  /**
   * @type {Object.<string, gmfx.ProfileLineConfiguration>}
   * @export
   */
  this.profileLinesconfiguration = {
    'aster': {
      'color':'#0404A0'
    },
    'srtm': {
      'color':'#04A004'
    }
  };

  /**
   * Overlay to show the measurement.
   * @type {ol.Overlay}
   * @private
   */
  this.measureTooltip_ = null;

  /**
   * The measure tooltip element.
   * @type {Element}
   * @private
   */
  this.measureTooltipElement_ = null;

  /**
   * Callback given to the gmf profile directive and that used on line or
   * profile hover to display informations on the elevations points.
   * @param {gmfx.ProfileHoverPointInformations} pointInformation Informations
   *     on the current hovered point of the line.
   * @export
   */
  this.profileInformationsCallback = function(pointInformation) {
    var coordinate = pointInformation.coordinate || null;
    var geom;
    if (coordinate) {
      // Display tooltip on the line
      geom =  new ol.geom.Point(coordinate);
      this.createMeasureTooltip_();
      this.measureTooltipElement_.innerHTML =
          this.getTooltipHTML_(pointInformation);
      this.measureTooltip_.setPosition(coordinate);
      this.snappedPoint_.setGeometry(geom);
    } else {
      // Remove tooltip.
      this.removeMeasureTooltip_();
      geom = null;
    }
    this.snappedPoint_.setGeometry(geom);
  }.bind(this);

  /**
   * Draw line interaction.
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawLine = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'LineString',
        features: features
      }));

  this.drawLine.setActive(false);
  this.map.addInteraction(this.drawLine);

  /**
   * Toggle activation of the draw line interaction.
   * @export
   */
  this.toggleDrawLineActive = function() {
    if (this.drawLine.getActive()) {
      this.drawLine.setActive(false);
      this.clear_();
    } else {
      this.drawLine.setActive(true);
    }
  };

  this.clear_ = function() {
    features.clear(); // For the draw overlay.
    this.profileLine = null; // To reset the profile.
  };

  this.drawLine.on('drawstart', function() {
    this.clear_();
  }, this);

  this.drawLine.on('drawend', function(e) {
    // Update the profile with the new geometry
    this.profileLine = e.feature.getGeometry();
    $scope.$digest();
  }, this);
};


app.module.controller('MainController', app.MainController);


/**
 * Can be I18N in real usecase.
 * @param {!gmfx.ProfileHoverPointInformations} pointInformations Informations
 *     on the current hovered point of the line.
 * @return {string} A texte formated to a tooltip.
 * @private
 */
app.MainController.prototype.getTooltipHTML_ = function(pointInformations) {
  var elevationName;
  var innerHTML = [];
  var number = this.$filter_('number');
  var DistDecimal = pointInformations.xUnits === 'm' ? 0 : 2;
  innerHTML.push(
      'Distance : ' +
      number(pointInformations.distance, DistDecimal) +
      ' ' +
      pointInformations.xUnits
  );
  for (elevationName in pointInformations.elevations) {
    innerHTML.push(
        elevationName +
        ' : ' +
        number(pointInformations.elevations[elevationName], 0) +
        ' ' + pointInformations.yUnits
    );
  }
  return innerHTML.join('</br>');
};


/**
 * Creates a new measure tooltip
 * @private
 */
app.MainController.prototype.createMeasureTooltip_ = function() {
  this.removeMeasureTooltip_();
  this.measureTooltipElement_ = document.createElement('div');
  this.measureTooltipElement_.className += 'tooltip tooltip-measure';
  this.measureTooltip_ = new ol.Overlay({
    element: this.measureTooltipElement_,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  this.map.addOverlay(this.measureTooltip_);
};


/**
 * Destroy the help tooltip
 * @private
 */
app.MainController.prototype.removeMeasureTooltip_ = function() {
  if (this.measureTooltipElement_ !== null) {
    this.measureTooltipElement_.parentNode.removeChild(
        this.measureTooltipElement_);
    this.measureTooltipElement_ = null;
    this.map.removeOverlay(this.measureTooltip_);
  }
};
