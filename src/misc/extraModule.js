// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
