goog.provide('ngeo.mainmodule');

goog.require('ngeo.datasource.module');
goog.require('ngeo.download.module');
goog.require('ngeo.draw.module');
goog.require('ngeo.editing.module');
goog.require('ngeo.filter.module');
goog.require('ngeo.googlestreetview.module');
goog.require('ngeo.grid.module');
goog.require('ngeo.layertree.module');
goog.require('ngeo.map.module');
goog.require('ngeo.measure.module');
goog.require('ngeo.print.module');
goog.require('ngeo.profile.module');
goog.require('ngeo.query.module');
goog.require('ngeo.search.module');
goog.require('ngeo.statemanager.module');
goog.require('ngeo.misc.extraModule');


ngeo.mainmodule = angular.module('ngeo', [
  ngeo.datasource.module.name,
  ngeo.download.module.name,
  ngeo.draw.module.name,
  ngeo.editing.module.name,
  ngeo.filter.module.name,
  ngeo.googlestreetview.module.name,
  ngeo.grid.module.name,
  ngeo.layertree.module.name,
  ngeo.map.module.name,
  ngeo.print.module.name,
  ngeo.profile.module.name,
  ngeo.query.module.name,
  ngeo.search.module.name,
  ngeo.statemanager.module.name,
  ngeo.misc.extraModule.name,
]);
