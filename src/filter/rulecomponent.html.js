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
import svgLine from 'gmf/icons/line_svg';
import svgPolygon from 'gmf/icons/polygon_svg';
import svgCircle from 'gmf/icons/circle_svg';
import svgRectangle from 'gmf/icons/rectangle_svg';

export default `<div class="dropdown">
  <button
    class="btn btn-default btn-sm btn-block dropdown-toggle"
    type="button"
    data-toggle="dropdown"
    ng-click="$ctrl.toggle()"
  >
    <span>{{ ::$ctrl.clone.name | translate }}</span>
  </button>
  <div class="dropdown-menu form-group" ng-class="{show: $ctrl.rule.active}">
    <select
      class="form-control ngeo-rule-operators-list"
      ng-if="::$ctrl.clone.operators"
      ng-model="$ctrl.clone.operator"
      ng-options="$ctrl.operators[operator] | translate for operator in ::$ctrl.clone.operators track by operator"
    ></select>

    <div ng-switch="::$ctrl.clone.type">
      <div
        class="ngeo-rule-type-date form-group"
        ng-if="$ctrl.rule.active"
        ng-switch-when="date|datetime"
        ng-switch-when-separator="|"
      >
        <div ng-switch="$ctrl.clone.operator">
          <div ng-switch-when="..|time_during" ng-switch-when-separator="|">
            <gmf-datepicker
              ngeo-event
              ngeo-event-on="'change'"
              ngeo-event-model="time"
              ngeo-event-cb="$ctrl.onDateRangeSelected(time)"
              ng-prop-time="$ctrl.timeRangeMode">
            </gmf-datepicker>
          </div>
          <div ng-switch-default>
            <gmf-datepicker
             ngeo-event
             ngeo-event-on="'change'"
             ngeo-event-model="time"
             ngeo-event-cb="$ctrl.onDateSelected(time)"
             ng-prop-time="$ctrl.timeValueMode">
            </gmf-datepicker>
          </div>
        </div>
      </div>

      <div class="ngeo-rule-type-geometry form-group" ng-switch-when="geometry">
        <div ng-switch="$ctrl.geomType">
          <span ng-switch-when="Point"
            >${svgPoint}</span>
          <span ng-switch-when="LineString"
            >${svgLine}</span>
          <span ng-switch-when="Polygon"
            >${svgPolygon}</span>
          <span ng-switch-when="Circle"
            >${svgCircle}</span>
          <span ng-switch-when="Rectangle"
            >${svgRectangle}</span>
        </div>
        <ngeo-drawfeature
          ngeo-drawfeature-active="$ctrl.drawActive"
          ngeo-drawfeature-features="$ctrl.drawnFeatures"
          ngeo-drawfeature-map="$ctrl.map"
        >
          <div ngeo-btn-group class="btn-group">
            <a
              data-toggle="tooltip"
              title="{{'Draw a point on the map' | translate}}"
              href
              ngeo-btn
              ngeo-drawpoint
              class="btn btn-sm btn-default ngeo-drawfeature-point"
              ng-show="['intersects', 'within'].indexOf($ctrl.clone.operator) !== -1"
              ng-class="{active: dfCtrl.drawPoint.active}"
              ng-model="dfCtrl.drawPoint.active"
              >${svgPoint}</a>
            <a
              data-toggle="tooltip"
              title="{{'Draw a line on the map' | translate}}"
              href
              ngeo-btn
              ngeo-measurelength
              class="btn btn-sm btn-default ngeo-drawfeature-linestring"
              ng-show="['intersects', 'within'].indexOf($ctrl.clone.operator) !== -1"
              ng-class="{active: dfCtrl.measureLength.active}"
              ng-model="dfCtrl.measureLength.active"
              >${svgLine}</a>
            <a
              data-toggle="tooltip"
              title="{{'Draw a polygon on the map' | translate}}"
              href
              ngeo-btn
              ngeo-measurearea
              class="btn btn-sm btn-default ngeo-drawfeature-polygon"
              ng-class="{active: dfCtrl.measureArea.active}"
              ng-model="dfCtrl.measureArea.active"
              >${svgPolygon}</a>
            <a
              data-toggle="tooltip"
              title="{{'Draw a circle on the map' | translate}}"
              href
              ngeo-btn
              ngeo-measureazimut
              ngeo-measureazimut-nbpoints="32"
              class="btn btn-sm btn-default ngeo-drawfeature-circle"
              ng-class="{active: dfCtrl.measureAzimut.active}"
              ng-model="dfCtrl.measureAzimut.active"
              >${svgCircle}</a>
            <a
              data-toggle="tooltip"
              title="{{'Draw a rectangle on the map' | translate}}"
              href
              ngeo-btn
              ngeo-drawrectangle
              class="btn btn-sm btn-default ngeo-drawfeature-rectangle"
              ng-class="{active: dfCtrl.drawRectangle.active}"
              ng-model="dfCtrl.drawRectangle.active"
              >${svgRectangle}</a>
          </div>

          <div class="ngeo-rule-type-geometry-instructions" ng-if="$ctrl.drawActive">
            <span ng-if="dfCtrl.drawPoint.active"> {{ 'Draw a point on the map.' | translate }} </span>
            <span ng-if="dfCtrl.measureLength.active">
              {{ 'Draw a line string on the map.' | translate }}
            </span>
            <span ng-if="dfCtrl.measureArea.active"> {{ 'Draw a polygon on the map.' | translate }} </span>
            <span ng-if="dfCtrl.measureAzimut.active"> {{ 'Draw a circle on the map.' | translate }} </span>
            <span ng-if="dfCtrl.drawRectangle.active">
              {{ 'Draw a rectangle on the map.' | translate }}
            </span>
          </div>
        </ngeo-drawfeature>
      </div>

      <div class="checkbox ngeo-rule-type-select" ng-switch-when="select">
        <a ng-click="$ctrl.selectAllChoices()" href>{{ All | translate}} </a>
        <label class="form-group ol-unselectable" ng-repeat="choice in ::$ctrl.clone.choices">
          <input
            ng-checked="$ctrl.clone.literal && $ctrl.clone.literal.indexOf(choice) > -1"
            ng-click="$ctrl.toggleChoiceSelection(choice)"
            type="checkbox"
            value="choice"
          />
          <span>{{ choice | translate }}</span>
        </label>
      </div>

      <div class="form-group ngeo-rule-type-text" ng-switch-default>
        <div ng-switch="$ctrl.clone.operator">
          <div ng-switch-when="..">
            <div class="ngeo-between-rule-start">
              <span translate>Between </span>
              <input type="number" class="form-control" ng-model="$ctrl.clone.lowerBoundary" />
            </div>
            <div class="ngeo-between-rule-end">
              <span translate> and </span>
              <input type="number" class="form-control" ng-model="$ctrl.clone.upperBoundary" />
            </div>
          </div>
          <div ng-switch-default>
            <input
              type="number"
              class="form-control"
              ng-if="$ctrl.clone.type === 'number'"
              ng-model="$ctrl.clone.literal"
            />
            <input
              type="text"
              class="form-control"
              ng-if="$ctrl.clone.type !== 'number'"
              ng-model="$ctrl.clone.literal"
            />
          </div>
        </div>
      </div>

      <div class="ngeo-rule-btns">
        <button class="btn btn-sm btn-default" ng-click="$ctrl.apply()" type="button">
          {{'OK' | translate}}
        </button>
        <button class="btn btn-sm btn-default" ng-click="$ctrl.cancel()" type="button">
          {{'Cancel' | translate}}
        </button>
      </div>
    </div>
  </div>
</div>

<div class="ngeo-rule-value" ng-if="$ctrl.rule.value !== null">
  <a
    class="btn btn-sm btn-link"
    ng-click="!$ctrl.rule.active && $ctrl.reset()"
    ng-disabled="$ctrl.rule.active"
    href
  >
    <span class="fa-solid fa-xmark"></span>
  </a>

  <div ng-switch="::$ctrl.rule.type">
    <div ng-switch-when="date|datetime" ng-switch-when-separator="|">
      <div ng-switch="$ctrl.rule.operator">
        <div ng-switch-when="..|time_during" ng-switch-when-separator="|">
          <span translate>From </span>
          <span>{{ $ctrl.timeToDate($ctrl.rule.lowerBoundary) }}</span>
          <span translate> to </span>
          <span>{{ $ctrl.timeToDate($ctrl.rule.upperBoundary) }}</span>
        </div>
        <div ng-switch-default>
          <span>{{ $ctrl.operatorsShortFormat[$ctrl.rule.operator] }}</span>
          <span>{{ $ctrl.timeToDate($ctrl.rule.literal) }}</span>
        </div>
      </div>
    </div>

    <div ng-switch-when="geometry">
      <span>{{ $ctrl.operators[$ctrl.rule.operator] }}</span>
      <span ng-switch="$ctrl.getRuleGeometryType()">
        <span class="gmf-icon gmf-icon-point" ng-switch-when="Point"> </span>
        <span class="gmf-icon gmf-icon-line" ng-switch-when="LineString"> </span>
        <span class="gmf-icon gmf-icon-polygon" ng-switch-when="Polygon"> </span>
        <span class="gmf-icon gmf-icon-circle" ng-switch-when="Circle"> </span>
        <span class="gmf-icon gmf-icon-rectangle" ng-switch-when="Rectangle"> </span>
      </span>
    </div>

    <div ng-switch-when="select">
      <span ng-repeat="choice in $ctrl.rule.literal"> {{ choice | translate }}{{ $last ? '' : ', ' }} </span>
    </div>

    <div ng-switch-default>
      <div ng-switch="$ctrl.rule.operator">
        <div ng-switch-when="..|time_during" ng-switch-when-separator="|">
          <span translate>Between </span>
          <span>{{ $ctrl.rule.lowerBoundary }}</span>
          <span translate> and </span>
          <span>{{ $ctrl.rule.upperBoundary }}</span>
        </div>
        <div ng-switch-default>
          <span>{{ $ctrl.operatorsShortFormat[$ctrl.rule.operator] }}</span>
          <span>{{ $ctrl.rule.literal }}</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
