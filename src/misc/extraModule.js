/**
 * @module ngeo.misc.extraModule
 */
import ngeoMiscAutoProjection from 'ngeo/misc/AutoProjection.js';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';
import ngeoMiscControlComponent from 'ngeo/misc/controlComponent.js';
import ngeoMiscDatepickerComponent from 'ngeo/misc/datepickerComponent.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoMiscEventHelper from 'ngeo/misc/EventHelper.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscFile from 'ngeo/misc/File.js';
import ngeoMiscFilereaderComponent from 'ngeo/misc/filereaderComponent.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoMiscGetBrowserLanguage from 'ngeo/misc/getBrowserLanguage.js';
import ngeoMiscSortableComponent from 'ngeo/misc/sortableComponent.js';
import ngeoMiscTime from 'ngeo/misc/Time.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoMiscExtraModule', [
  ngeoMiscAutoProjection.module.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscControlComponent.name,
  ngeoMiscDatepickerComponent.name,
  ngeoMiscDebounce.name,
  ngeoMiscEventHelper.module.name,
  ngeoMiscFeatureHelper.module.name,
  ngeoMiscFile.module.name,
  ngeoMiscFilereaderComponent.name,
  ngeoMiscFilters.name,
  ngeoMiscGetBrowserLanguage.name,
  ngeoMiscSortableComponent.name,
  ngeoMiscTime.module.name,
  ngeoMiscToolActivateMgr.module.name,
  ngeoMiscWMSTime.module.name,
]);


export default exports;
