/**
 * @module ngeo.editing.module
 */
import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent.js';
import ngeoEditingCreatefeatureComponent from 'ngeo/editing/createfeatureComponent.js';
import ngeoEditingCreateregularpolygonfromclickComponent from 'ngeo/editing/createregularpolygonfromclickComponent.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoEditingModule', [
  ngeoEditingAttributesComponent.name,
  ngeoEditingCreatefeatureComponent.name,
  ngeoEditingCreateregularpolygonfromclickComponent.name,
]);


export default exports;
