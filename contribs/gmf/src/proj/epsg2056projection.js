goog.provide('gmf.proj.EPSG2056');

goog.require('ol.proj');

if (typeof proj4 == 'function') {
  proj4.defs('EPSG:2056',
      '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 ' +
      '+k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel ' +
      '+towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs');
  ol.proj.get('EPSG:2056').setExtent([2420000, 1030000, 2900000, 1350000]);
}
