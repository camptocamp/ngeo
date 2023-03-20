import angular from 'angular';
import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent.js';
import ngeoEditingCreatefeatureComponent from 'ngeo/editing/createfeatureComponent.js';
import ngeoEditingCreateregularpolygonfromclickComponent from 'ngeo/editing/createregularpolygonfromclickComponent.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('ngeoEditingModule', [
  ngeoEditingAttributesComponent.name,
  ngeoEditingCreatefeatureComponent.name,
  ngeoEditingCreateregularpolygonfromclickComponent.name,
]);
