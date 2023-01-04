/**
 */
import angular from 'angular';
import ngeoMapBackgroundLayerMgr from 'ngeo/map/BackgroundLayerMgr.js';
import ngeoMapComponent from 'ngeo/map/component.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import ngeoMapRecenter from 'ngeo/map/recenter.js';
import ngeoMapResizemap from 'ngeo/map/resizemap.js';
import ngeoMapScaleselector from 'ngeo/map/scaleselector.js';

/**
 * Also related to the map but not included in the module:
 *  - ngeo.map.FeatureOverlay (already required by ngeo.map.FeatureOverlayMgr)
 *
 * @type {!angular.IModule}
 */
export default angular.module('ngeoMapModule', [
  ngeoMapBackgroundLayerMgr.name,
  ngeoMapComponent.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoMapRecenter.name,
  ngeoMapResizemap.name,
  ngeoMapScaleselector.name,
]);
