/**
 */
import angular from 'angular';
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
import ngeoMiscSortableComponent from 'ngeo/misc/sortableComponent.js';
import ngeoMiscTime from 'ngeo/misc/Time.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('ngeoMiscExtraModule', [
  ngeoMiscAutoProjection.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscControlComponent.name,
  ngeoMiscDatepickerComponent.name,
  ngeoMiscDebounce.name,
  ngeoMiscEventHelper.name,
  ngeoMiscFeatureHelper.name,
  ngeoMiscFile.name,
  ngeoMiscFilereaderComponent.name,
  ngeoMiscFilters.name,
  ngeoMiscSortableComponent.name,
  ngeoMiscTime.name,
  ngeoMiscToolActivateMgr.name,
  ngeoMiscWMSTime.name,
]);
