goog.module('ngeo.proj.utm');
goog.module.declareLegacyNamespace();

goog.require('ol.proj'); // nowebpack
goog.require('ol.proj.proj4'); // nowebpack
// webpack: import proj4 from 'proj4/lib/core.js';
// webpack: import utm from 'proj4/lib/projections/utm.js';

if (typeof ol.proj.proj4.get() !== 'function' && typeof proj4 === 'function') {  // nowebpack
  ol.proj.setProj4(proj4);  // nowebpack
}  // nowebpack
// webpack: proj4.Proj.projections.add(utm);
