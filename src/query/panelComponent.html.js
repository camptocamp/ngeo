// The MIT License (MIT)
//
// Copyright (c) 2024-2025 Camptocamp SA
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

import svgPoint from 'gmf/icons/point_svg';
import svgRectangle from 'gmf/icons/rectangle_svg';
import svgPolygon from 'gmf/icons/polygon_svg';

export default `<div class="btn-group">
  <button
    data-toggle="tooltip"
    title="{{'While active, click on the map to issue a query' | translate}}"
    class="btn btn-default"
    ng-class="{active: $ctrl.ngeoQueryModeSelector.mode === 'click'}"
    ng-click="$ctrl.ngeoQueryModeSelector.mode = 'click'"
  >${svgPoint}</button>
  <button
    data-toggle="tooltip"
    title="{{'While active, click twice the map to issue a query using a box' | translate}}"
    class="btn btn-default"
    ng-class="{active: $ctrl.ngeoQueryModeSelector.mode === 'drawbox'}"
    ng-click="$ctrl.ngeoQueryModeSelector.mode = 'drawbox'"
  >${svgRectangle}</button>
  <button
    data-toggle="tooltip"
    title="{{'While active, click on the map multiple times to draw a polygon, which will issue a query using it' | translate}}"
    class="btn btn-default"
    ng-class="{active: $ctrl.ngeoQueryModeSelector.mode === 'drawpolygon'}"
    ng-click="$ctrl.ngeoQueryModeSelector.mode = 'drawpolygon'"
  >${svgPolygon}</button>
</div>

<div class="ngeo-query-panel-actions">
  <div class="form-check">
    <label class="form-check-label">
      <input
        type="radio"
        class="form-check-input"
        ng-model="$ctrl.ngeoQueryModeSelector.action"
        value="add"
      />
      <span>{{'Add' | translate }}</span>
    </label>
  </div>
  <div class="form-check">
    <label class="form-check-label">
      <input
        type="radio"
        class="form-check-input"
        ng-model="$ctrl.ngeoQueryModeSelector.action"
        value="remove"
      />
      <span>{{'Remove' | translate }}</span>
    </label>
  </div>
  <div class="form-check">
    <label class="form-check-label">
      <input
        type="radio"
        class="form-check-input"
        ng-model="$ctrl.ngeoQueryModeSelector.action"
        value="replace"
      />
      <span>{{'Replace' | translate }}</span>
    </label>
  </div>
</div>

<div class="ngeo-query-panel-help">
  <span ng-show="$ctrl.ngeoQueryModeSelector.mode === 'click'"
    >{{'Query by "click" on the map is currently active. All queryable layers, including WMS and WFS, will return results.' | translate }}</span
  >
  <span ng-show="$ctrl.ngeoQueryModeSelector.mode === 'drawbox'"
    >{{'Query by "box" on the map is currently active. Not all queryable layers will return results. Only those that support WFS will do so.' | translate }}</span
  >
  <span ng-show="$ctrl.ngeoQueryModeSelector.mode === 'drawpolygon'"
    >{{'Query by "polygon" on the map is currently active. Not all queryable layers will return results. Only those that support WFS will do so.' | translate }}</span
  >
</div>`;
