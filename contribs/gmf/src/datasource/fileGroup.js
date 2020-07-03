import angular from 'angular';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfDatasourceFileGroup', []);

/**
 * @typedef {Object} DatasourceFileGroup
 * @property {import("ngeo/datasource/FileGroup.js").default|null} fileGroup
 */

module.value('gmfDatasourceFileGroup', {
  fileGroup: null,
});

export default module;
