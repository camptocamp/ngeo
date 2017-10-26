goog.provide('ngeo.proj.EPSG3947');
goog.module.declareLegacyNamespace();

goog.require('ol.proj');
goog.require('ol.proj.proj4');

if (typeof ol.proj.proj4.get() !== 'function' && typeof proj4 === 'function') {
  ol.proj.setProj4(proj4);
}

if (typeof proj4 == 'function') {
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

  ol.proj.proj4.defs('EPSG:3947', epsg3947def);
  ol.proj.get('EPSG:3947').setExtent(epsg3947extent);
}

exports = 'EPSG:3947';
