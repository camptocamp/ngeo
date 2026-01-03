// The MIT License (MIT)
//
// Copyright (c) 2024-2026 Camptocamp SA
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

import svgSpinner from 'gmf/icons/spinner_svg';

export default `<div
  class="text-center btn-group dropup"
  gmf-elevation
  gmf-elevation-active="ctrl.active"
  gmf-elevation-elevation="ctrl.elevationValue"
  gmf-elevation-loading="ctrl.elevationLoading"
  gmf-elevation-layer="ctrl.selectedElevationLayer"
  gmf-elevation-layersconfig="::ctrl.options.layersconfig"
  gmf-elevation-map="::ctrl.map"
  ng-show="::ctrl.show"
>
  <a
    class="btn btn-default"
    aria-expanded="false"
    ng-class="::{'dropdown-toggle': ctrl.options.layers.length > 1}"
    ng-attr-data-toggle="{{::(ctrl.options.layers.length > 1) ? 'dropdown' : ''}}"
  >
    <span class="gmf-elevationwidget-value">
      {{ctrl.elevationValue}}
      <span ng-show="ctrl.elevationLoading" class="fa-solid fa-spin custom-spinner-generic"
        >${svgSpinner('1rem')}</span>
      <span ng-show="!ctrl.elevationValue && !ctrl.elevationLoading" translate>Raster</span> </span
    ><span class="caret" ng-if="::ctrl.options.layers.length > 1"></span>
  </a>
  <ul class="dropdown-menu dropdown-menu-right" role="menu" ng-if="::ctrl.options.layers.length > 1">
    <li class="dropdown-header" translate>Data source</li>
    <li ng-repeat="elevationItem in ::ctrl.options.layers">
      <a href ng-click="ctrl.selectedElevationLayer = elevationItem">
        <span class="fa-solid fa-fw" ng-class="{'fa-check': ctrl.selectedElevationLayer === elevationItem}"></span>
        {{elevationItem | translate}}
      </a>
    </li>
  </ul>
</div>`;
