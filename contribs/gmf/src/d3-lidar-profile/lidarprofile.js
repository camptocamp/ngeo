goog.provide('gmf.lidarProfile');

/**
* Provides a D3js component to be used to draw an lidar point cloud
* profile chart.
* Requires access to a Pytree webservice: https://github.com/sitn/pytree
*
* @constructor
* @param {Object} options from pytree
*/

gmf.lidarProfile = function(options) {

  /**
  * @type {gmf.lidarProfile.plot}
  */
  this.plot = new gmf.lidarProfile.plot(options, this);

  /**
  * @type {gmf.lidarProfile.loader}
  */
  this.loader = new gmf.lidarProfile.loader(options, this.plot);

  /**
  * @type {gmf.lidarProfile.measure}
  */
  this.measure = new gmf.lidarProfile.measure(options, this);


};
