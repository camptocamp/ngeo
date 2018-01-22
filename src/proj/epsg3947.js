goog.provide('ngeo.proj.EPSG3947');
goog.module.declareLegacyNamespace();

goog.require('ol.proj');
/** @suppress {extraRequire} */
goog.require('ol.proj.proj4');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.lcc');
// webpack: import proj4 from 'proj4';

const epsg3947def = [
  '+proj=lcc',
  '+lat_1=46.25',
  '+lon_0=3',
  '+lat_0=47',
  '+lat_2=47.75',
  '+x_0=1700000',
  '+y_0=6200000',
  '+ellps=GRS80',
  '+towgs84=0,0,0,0,0,0,0',
  '+units=m',
  '+no_defs'
].join(' ');
const epsg3947extent = [619993.48, 5637784.91, 2212663.72, 6731809.22];

proj4.defs('EPSG:3947', epsg3947def);
// webpack: olProjProj4.register(proj4);
ol.proj.get('EPSG:3947').setExtent(epsg3947extent);

exports = 'EPSG:3947';
