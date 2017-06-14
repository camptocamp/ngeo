goog.provide('ngeo.extendedProfile');
goog.require('ngeo.extendedProfile.config');
goog.require('ngeo.extendedProfile.loader');
goog.require('ngeo.extendedProfile.utils');
goog.require('ngeo.extendedProfile.config');
goog.require('ngeo.extendedProfile.measure');
goog.require('ngeo.extendedProfile.plot2canvas');
goog.require('ngeo.extendedProfile.raster');

/**
 * Provides a D3js component to be used to draw an elevation
 * extendedProfile chart.
 *
 *     let selection = d3.select('#element_id');
 *     let extendedProfile = ngeo.extendedProfile({
 *       distanceExtractor: function (item) {return item['dist'];},
 *       linesConfiguration: {
 *         'lineZ1': {
 *           zExtractor: function (item) {return item['values']['z1'];}
 *         },
 *         'lineZ2': {
 *           color: '#00F',
 *           zExtractor: function (item) {return item['values']['z2'];}
 *         }
 *       },
 *       hoverCallback: function(point, dist, xUnits, elevations, yUnits) {
 *         console.log(point.x, point.y);
 *       },
 *       outCallback: function() {
 *         console.log("out");
 *       }
 *     });
 *     selection.datum(data).call(extendedProfile);
 *
 * The selection data must be an array.
 * The layout for the items of this array is unconstrained: the distance values
 * is extracted using the distanceExtractor config option and multiples z values
 * can be displayed by providing multiple linesConfiguration with its specific
 * zExtractor.
 * Optionally you can provide a color in your linesConfiguration. A line without
 * color will be red. Each linesConfiguration name is used as class for its
 * respective line. So you can pass a styleDefs config option (inline css) to
 * customize the line or all the chart.
 * Optionally, POIs can be displayed and depend on a poiExtractor
 * config option.
 *
 * The data below will work for the above example:
 *
 *     [
 *         {
 *             "y": 199340,
 *             "values": {"z1": 788.7, "z2": 774.2},
 *             "dist": 0.0,
 *             "x": 541620
 *         }, ...
 *     ]
 *
 * @constructor
 * @struct
 * @return {Object} D3js component.
 * @param {ngeox.extendedProfile.extendedProfileOptions} options extendedProfile options.
 * @export
 */
ngeo.extendedProfile.plot = function(options) {

  /**
   * Whether the simplified extendedProfile should be shown.
   * @type {boolean}
   */
  const light = options.light !== undefined ? options.light : false;

  /**
   * The values for margins around the chart defined in pixels.
   */
  const margin = light ? {top: 0, right: 0, bottom: 0, left: 0} :
      {top: 40, right: 10, bottom: 10, left: 40};

  /**
   * Hover callback function.
   * @type {function(Object, number, string, Object.<string, number>, string)}
   */
  const hoverCallback = options.hoverCallback !== undefined ?
      options.hoverCallback : ol.nullFunction;

  /**
   * Out callback function.
   * @type {function()}
   */
  const outCallback = options.outCallback !== undefined ?
      options.outCallback : ol.nullFunction;

  /**
   * Distance data extractor used to get the dist values.
   */
  const distanceExtractor = options.distanceExtractor;

  /**
   * Line configuration object.
   */
  const linesConfiguration = options.linesConfiguration;

  /**
   * Number of differents configurations for the line.
   */
  const numberOfLines = Object.keys(linesConfiguration).length;

  /**
   * Method to get the coordinate in pixels from a distance.
   */
  const bisectDistance = d3.bisector(d => distanceExtractor(d)).left;

  /**
   * POI data extractor.
   */
  const poiExtractor = options.poiExtractor;

  /**
   * Optional SVG inline style.
   */
  const styleDefs = options.styleDefs;

  /**
   * @type {number}
   */
  const poiLabelAngle = options.poiLabelAngle !== undefined ?
      options.poiLabelAngle : -60;

  /**
   * @type {Object.<string, string>}
   */
  const i18n = options.i18n || {};

  /**
   * @type {string}
   */
  const xAxisLabel = (i18n.xAxis || 'Distance');

  /**
   * @type {string}
   */
  const yAxisLabel = (i18n.yAxis || 'Elevation');

  /**
   * @type {ngeox.extendedProfile.extendedProfileFormatter}
   */
  const formatter = {
    /**
     * @param {number} dist Distance.
     * @param {string} units Units.
     * @return {string} Distance.
     */
    xhover(dist, units) {
      return `${parseFloat(dist.toPrecision(3))} ${units}`;
    },
    /**
     * @param {number} ele Elevation.
     * @param {string} units Units.
     * @return {string} Elevation.
     */
    yhover(ele, units) {
      return `${Math.round(ele)} m`;
    },
    /**
     * @param {number} dist Distance.
     * @param {string} units Units.
     * @return {string|number} Distance.
     */
    xtick(dist, units) {
      return dist;
    },
    /**
     * @param {number} ele Elevation.
     * @param {string} units Units.
     * @return {string|number} Elevation.
     */
    ytick(ele, units) {
      return ele;
    }
  };

  if (options.formatter !== undefined) {
    ol.obj.assign(formatter, options.formatter);
  }

  /**
   * @type {boolean}
   */
  const lightXAxis = options.lightXAxis !== undefined ? options.lightXAxis : false;

  // Objects shared with the showPois function
  /**
   * @type {Object}
   */
  let svg;

  /**
   * D3 x scale.
   */
  let x;

  /**
   * D3 y scale.
   */
  let y;

  /**
   * Scale modifier to allow customizing the x and y scales.
   */
  const scaleModifier = options.scaleModifier;

  let g;

  /**
   * Height of the chart in pixels
   */
  let height;

  /**
   * Width of the chart in pixels
   */
  let width;

  /**
  * Factor to determine whether to use 'm' or 'km'.
  */
  let xFactor;

  /**
  * Distance units. Either 'm' or 'km'.
  */
  let xUnits;

  /**
   * D3 extent of the distance.
   */
  let xDomain;


  const extendedProfile = function(selection) {
    ngeo.extendedProfile.config.getProfileConfig('http://localhost:5001');
    ngeo.extendedProfile.loader.getProfileByLOD(0, ngeo.extendedProfile.config.plotParams.initialLOD, $('#coordinates').val(), 0, 1, true);
  };

  return extendedProfile;

};
