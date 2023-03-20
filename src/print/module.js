/**
 */
import angular from 'angular';
import ngeoPrintService from 'ngeo/print/Service.js';
import ngeoPrintUtils from 'ngeo/print/Utils.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('ngeoPrintModule', [ngeoPrintService.name, ngeoPrintUtils.name]);
