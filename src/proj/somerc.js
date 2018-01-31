goog.module('ngeo.proj.somerc');
goog.module.declareLegacyNamespace();

goog.require('ol.proj');
goog.require('ol.proj.proj4');
// webpack: import proj4 from 'proj4';
// webpack: import somerc from 'proj4/projections/somerc.js';

if (typeof ol.proj.proj4.get() !== 'function' && typeof proj4 === 'function') {  // nowebpack
  ol.proj.setProj4(proj4);  // nowebpack
}  // nowebpack
// webpack: proj4.Proj.projections.add(somerc);
