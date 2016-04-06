goog.provide('ngeo.PrintUtils');

goog.require('ngeo');


/**
 * Provides a service with print utility functions.
 *
 * @constructor
 * @ngdoc service
 * @ngname ngeoPrintUtils
 */
ngeo.PrintUtils = function() {
};


/**
 * @const
 * @private
 */
ngeo.PrintUtils.INCHES_PER_METER_ = 39.37;


/**
 * @const
 * @private
 */
ngeo.PrintUtils.DOTS_PER_INCH_ = 72;


/**
 * Return a function to use as map postcompose listener for drawing a print
 * mask on the map.
 * @param {function():ol.Size} getSize User-defined function returning the
 *     size in dots of the map to print.
 * @param {function(olx.FrameState):number} getScale User-defined function
 *     returning the scale of the map to print.
 * @param {function():number=} opt_rotation User defined function returning the
 *     inclination of the canevas in degree (-180 to 180).
 * returning the scale of the map to print.
 * @return {function(ol.render.Event)} Function to use as a map postcompose
 * listener.
 * @export
 */
ngeo.PrintUtils.prototype.createPrintMaskPostcompose = function(getSize,
    getScale, opt_rotation) {
  var self = this;

  return (
      /**
       * @param {ol.render.Event} evt Postcompose event.
       */
      function(evt) {
        var context = evt.context;
        var frameState = evt.frameState;

        var resolution = frameState.viewState.resolution;

        var viewportWidth = frameState.size[0] * frameState.pixelRatio;
        var viewportHeight = frameState.size[1] * frameState.pixelRatio;

        var centerX = viewportWidth / 2;
        var centerY = viewportHeight / 2;

        var size = getSize();
        var scale = getScale(frameState);

        var ppi = ngeo.PrintUtils.DOTS_PER_INCH_;
        var ipm = ngeo.PrintUtils.INCHES_PER_METER_;

        var extentHalfWidth =
            (((size[0] / ppi) / ipm) * scale / resolution) / 2;
        self.extentHalfHorizontalDistance_ =
            (((size[0] / ppi) / ipm) * scale) / 2;

        var extentHalfHeight =
            (((size[1] / ppi) / ipm) * scale / resolution) / 2;
        self.extentHalfVerticalDistance_ =
            (((size[1] / ppi) / ipm) * scale) / 2;

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(viewportWidth, 0);
        context.lineTo(viewportWidth, viewportHeight);
        context.lineTo(0, viewportHeight);
        context.lineTo(0, 0);
        context.closePath();

        var rotation = (opt_rotation ? opt_rotation() * Math.PI / 180 : 0);
        // diagonal = distance p1 to center.
        var diagonal = Math.sqrt(Math.pow(extentHalfWidth, 2) +
            Math.pow(extentHalfHeight, 2));
        // gamma = angle between horizontal and diagonal (with rotation).
        var gamma = Math.atan(extentHalfHeight / extentHalfWidth) - rotation;
        // omega = angle between diagonal and vertical (with rotation).
        var omega = Math.atan(extentHalfWidth / extentHalfHeight) - rotation;
        // Calculation of each corner.
        var x1 = centerX - Math.cos(gamma) * diagonal;
        var y1 = centerY + Math.sin(gamma) * diagonal;
        var x2 = centerX + Math.sin(omega) * diagonal;
        var y2 = centerY + Math.cos(omega) * diagonal;
        var x3 = centerX + Math.cos(gamma) * diagonal;
        var y3 = centerY - Math.sin(gamma) * diagonal;
        var x4 = centerX - Math.sin(omega) * diagonal;
        var y4 = centerY - Math.cos(omega) * diagonal;

        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.lineTo(x4, y4);
        context.lineTo(x1, y1);
        context.closePath();

        context.fillStyle = 'rgba(0, 5, 25, 0.5)';
        context.fill();
      });
};


/**
 * Get the optimal print scale for a map, the map being defined by its
 * size (in pixels) and resolution (in map units per pixel).
 * @param {ol.Size} mapSize Size of the map on the screen (px).
 * @param {number} mapResolution Resolution of the map on the screen.
 * @param {ol.Size} printMapSize Size of the map on the paper (dots).
 * @param {Array.<number>} printMapScales Supported map scales on the paper.
 * The scales are provided as scale denominators, sorted in ascending order.
 * E.g. `[500, 1000, 2000, 4000]`.
 * @return {number} The best scale. `-1` is returned if there is no optimal
 * scale, that is the optimal scale is lower than or equal to the first value
 * in `printMapScales`.
 * @export
 */
ngeo.PrintUtils.prototype.getOptimalScale = function(
    mapSize, mapResolution, printMapSize, printMapScales) {

  var mapWidth = mapSize[0] * mapResolution;
  var mapHeight = mapSize[1] * mapResolution;

  var scaleWidth = mapWidth * ngeo.PrintUtils.INCHES_PER_METER_ *
      ngeo.PrintUtils.DOTS_PER_INCH_ / printMapSize[0];
  var scaleHeight = mapHeight * ngeo.PrintUtils.INCHES_PER_METER_ *
      ngeo.PrintUtils.DOTS_PER_INCH_ / printMapSize[1];

  var scale = Math.min(scaleWidth, scaleHeight);

  var optimal = -1;
  for (var i = 0, ii = printMapScales.length; i < ii; ++i) {
    if (scale > printMapScales[i]) {
      optimal = printMapScales[i];
    }
  }

  return optimal;
};


/**
 * Get the optimal map resolution for a print scale and a map size.
 * @param {ol.Size} mapSize Size of the map on the screen (px).
 * @param {ol.Size} printMapSize Size of the map on the paper (dots).
 * @param {number} printMapScale Map scale on the paper.
 * @return {number} The optimal map resolution.
 * @export
 */
ngeo.PrintUtils.prototype.getOptimalResolution = function(
    mapSize, printMapSize, printMapScale) {

  var dotsPerMeter =
      ngeo.PrintUtils.DOTS_PER_INCH_ * ngeo.PrintUtils.INCHES_PER_METER_;

  var resolutionX = (printMapSize[0] * printMapScale) /
      (dotsPerMeter * mapSize[0]);
  var resolutionY = (printMapSize[1] * printMapScale) /
      (dotsPerMeter * mapSize[1]);

  var optimalResolution = Math.max(resolutionX, resolutionY);

  return optimalResolution;
};


/**
 * Get the coordinates of the bottom left corner of the printed map.
 * @param {ol.Coordinate} mapCenter Center of the map to print.
 * @return {ol.Coordinate} The coordinates of the bottom left corner.
 */
ngeo.PrintUtils.prototype.getBottomLeftCorner = function(mapCenter) {
  return [mapCenter[0] - this.extentHalfHorizontalDistance_,
    mapCenter[1] - this.extentHalfVerticalDistance_];
};


/**
 * Get the coordinates of the bottom rigth corner of the printed map.
 * @param {ol.Coordinate} mapCenter Center of the map to print.ç
 * @return {ol.Coordinate} The coordinates of the bottom rigth corner.
 */
ngeo.PrintUtils.prototype.getBottomRightCorner = function(mapCenter) {
  return [mapCenter[0] + this.extentHalfHorizontalDistance_,
    mapCenter[1] - this.extentHalfVerticalDistance_];
};


/**
 * Get the coordinates of the up left corner of the printed map.
 * @param {ol.Coordinate} mapCenter Center of the map to print.
 * @return {ol.Coordinate} The coordinates of the up left corner.
 */
ngeo.PrintUtils.prototype.getUpLeftCorner = function(mapCenter) {
  return [mapCenter[0] - this.extentHalfHorizontalDistance_,
    mapCenter[1] + this.extentHalfVerticalDistance_];
};


/**
 * Get the coordinates of the up right corner of the printed map.
 * @param {ol.Coordinate} mapCenter Center of the map to print.
 * @return {ol.Coordinate} The coordinates of the up right corner.
 */
ngeo.PrintUtils.prototype.getUpRightCorner = function(mapCenter) {
  return [mapCenter[0] + this.extentHalfHorizontalDistance_,
    mapCenter[1] + this.extentHalfVerticalDistance_];
};


ngeo.module.service('ngeoPrintUtils', ngeo.PrintUtils);
