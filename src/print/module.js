/**
 * @module ngeo.print.module
 */
import ngeoPrintService from 'ngeo/print/Service.js';
import ngeoPrintUtils from 'ngeo/print/Utils.js';

/**
 * @type {angular.Module}
 */
const exports = angular.module('ngeoPrintModule', [
  ngeoPrintService.module.name,
  ngeoPrintUtils.module.name
]);


export default exports;
