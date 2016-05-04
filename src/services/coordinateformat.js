goog.provide('ngeo.CoordinateFormat');
goog.provide('ngeo.CoordinateFormatConfig');

goog.require('goog.math');
goog.require('goog.string');
goog.require('ol.coordinate');
goog.require('ol.proj');
goog.require('ngeo');


/**
 * @typedef {{
 *   code: (string|undefined),
 *   id: (string),
 *   label: (string),
 *   format: (function(ol.Coordinate))
 * }}
 */
ngeo.CoordinateFormatConfig;

/**
 * The `ngeoCoordinateFormat` provides a list of projection config & formaters
 * that are used to display coordinates.
 * The service provides a default config list in `projectionFormat`. This
 * list is public and can be extended. You can pick an item from the list
 * with `getProjection` function and overrides it.
 * To get a subset of this array, you can use `getProjections` function.
 *
 * @constructor
 * @export
 * @ngInject
 * @ngdoc service
 * @ngname gmfMousepositionController
 */
ngeo.CoordinateFormat = function() {

  if (typeof proj4 == 'function') {

    proj4.defs('EPSG:32631', '+proj=utm +zone=31 +ellps=WGS84 ' +
        '+datum=WGS84 +units=m +no_defs ');

    proj4.defs('EPSG:32632', '+proj=utm +zone=32 +ellps=WGS84 ' +
        '+datum=WGS84 +units=m +no_defs ');
  }

  /**
   * @type {Array.<ngeo.CoordinateFormatConfig>}
   * @export
   */
  this.projectionFormat = [{
    id: 'EPSG:2056',
    code: 'EPSG:2056',
    label: 'CH1903+ / LV95',
    format: coordinatesFormat_
  },{
    id: 'EPSG:21781',
    label: 'CH1903 / LV03',
    format: coordinatesFormat_
  },{
    id: 'EPSG:4326',
    label: 'Lon/Lat WGS84',
    format: function(coordinates) {
      return ol.coordinate.format(coordinates, ' {x} E | {y} N', 5);
    }
  },{
    id: 'EPSG:4326:DMS',
    code: 'EPSG:4326',
    label: 'Lon/Lat WGS84 DMS',
    format: function(coordinates) {
      var hdms = toStringHDMS_(coordinates);
      var yhdms = hdms.split(' ').slice(0, 4).join(' ');
      var xhdms = hdms.split(' ').slice(4, 8).join(' ');
      return xhdms + ' | ' + yhdms;
    }
  },{
    id: 'EPSG:4326:UTM3132',
    code: 'EPSG:4326',
    label: 'WGS84 UTM 32|31',
    format: function(coordinates) {
      if (coordinates[0] < 6 && coordinates[0] >= 0) {
        var utm_31t = ol.proj.transform(coordinates,
            'EPSG:4326', 'EPSG:32631');
        return ol.coordinate.format(utm_31t, '{x} | {y} (UTM32N)', 0);
      } else if (coordinates[0] < 12 && coordinates[0] >= 6) {
        var utm_32t = ol.proj.transform(coordinates,
            'EPSG:4326', 'EPSG:32632');
        return ol.coordinate.format(utm_32t, '{x} | {y} (UTM32N)', 0);
      } else {
        return '-';
      }
    }
  }];

  /**
   * @private
   * @param {ol.Coordinate|undefined} coordinates Coordinate.
   * @return {string} Formated coordinates.
   */
  function coordinatesFormat_(coordinates) {
    return ol.coordinate.format(coordinates, ' {x} E | {y} N', 0).
    replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  /**
   * @private
   * @param {ol.Coordinate|undefined} coordinates Coordinate.
   * @return {string} Hemisphere, degrees, minutes and seconds.
   */
  function toStringHDMS_(coordinates) {
    if (goog.isDef(coordinates)) {
      return degreesToStringHDMS_(coordinates[1], 'NS') + ' ' +
          degreesToStringHDMS_(coordinates[0], 'EW');
    } else {
      return '';
    }
  }

  /**
   * @private
   * @param {number} degrees Degrees.
   * @param {string} hemispheres Hemispheres.
   * @return {string} String.
   */
  function degreesToStringHDMS_(degrees, hemispheres) {
    var normalizedDegrees = goog.math.modulo(degrees + 180, 360) - 180;
    var x = Math.abs(3600 * normalizedDegrees);
    return Math.floor(x / 3600) + '\u00b0 ' +
        goog.string.padNumber(Math.floor((x / 60) % 60), 2) + '\u2032 ' +
        goog.string.padNumber(Math.floor(x % 60), 2) + ',' +
        Math.floor((x - (x < 0 ? Math.ceil(x) : Math.floor(x))) * 10) +
        '\u2033 ' + hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0);
  }
};

/**
 *
 * @returns {Array.<ngeo.CoordinateFormatConfig>} A list of all projection
 *    formats definitions.
 * @export
 */
ngeo.CoordinateFormat.prototype.getProjections = function() {
  /**
   * @type {Array.<string>}
   */
  var codes = Array.prototype.splice.call(arguments, 0);

  if (codes.length === 0) {
    return this.projectionFormat;
  }

  var projectionFormats = [];
  this.projectionFormat.forEach(function(format) {
    if (codes.indexOf(format.id) >= 0) {
      projectionFormats.push(format);
    }
  });
  return projectionFormats;
};

/**
 * @param {string} code The code of the projection.
 * @returns {ngeo.CoordinateFormatConfig|undefined} The projection config object
 *    if found.
 * @export
 */
ngeo.CoordinateFormat.prototype.getProjection = function(code) {

  var projection;
  this.projectionFormat.some(function(format) {
    if (code === format.id) {
      projection = format;
      return true;
    }
  });
  return projection;
};

ngeo.module.service('ngeoCoordinateFormat', ngeo.CoordinateFormat);
