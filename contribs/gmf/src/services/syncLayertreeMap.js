goog.provide('gmf.SyncLayertreeMap');

goog.require('gmf');


/**
 * TODO
 *
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngname gmfSyncLayertreeMap
 */
gmf.SyncLayertreeMap = function() {

};


/**
 * TODO
 * @param {Object} firstLevelGroup TODO.
 * @export
 */
gmf.SyncLayertreeMap.prototype.createLayers = function(firstLevelGroup) {
  console.log('TODO');
};


/**
 * TODO
 * @param {string} layersParam TODO.
 * @return {ol.layer.Group | ol.layer.Base | null} The corresponding layer.
 * @export
 */
gmf.SyncLayertreeMap.prototype.getLayer = function(layersParam) {
  return null;
};


/**
 * TODO
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @export
 */
gmf.SyncLayertreeMap.prototype.syncStates = function(treeCtrl) {
  console.log('TODO');
};


/**
 * TODO
 * @param {string} layersParam TODO.
 * @export
 */
gmf.SyncLayertreeMap.prototype.removeLayer = function(layersParam) {
  console.log('TODO');
};


gmf.module.service('gmfSyncLayertreeMap', gmf.SyncLayertreeMap);
