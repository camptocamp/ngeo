// The MIT License (MIT)
//
// Copyright (c) 2024 Camptocamp SA
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
import svgText from 'gmf/icons/text_svg';

export default `<ngeo-drawfeature
  ngeo-btn-group
  class="btn-group"
  ngeo-drawfeature-active="efCtrl.drawActive"
  ngeo-drawfeature-map="efCtrl.map"
  ngeo-drawfeature-uid="efCtrl.ngeoDrawFeatureUid"
  ngeo-drawfeature-showmeasure="efCtrl.showMeasure"
>
  <a
    data-toggle="tooltip"
    title="{{'Draw a point on the map' | translate}}"
    href
    ngeo-btn
    ngeo-drawpoint
    class="btn btn-default ngeo-drawfeature-point"
    ng-class="{active: dfCtrl.drawPoint.active}"
    ng-model="dfCtrl.drawPoint.active"
    >${svgPoint}</a>
  <a
    data-toggle="tooltip"
    title="{{'Draw a line on the map' | translate}}"
    href
    ngeo-btn
    ngeo-measurelength
    class="btn btn-default ngeo-drawfeature-linestring"
    ng-class="{active: dfCtrl.measureLength.active}"
    ng-model="dfCtrl.measureLength.active"
    >${svgLine}</a>
  <a
    data-toggle="tooltip"
    title="{{'Draw a polygon on the map' | translate}}"
    href
    ngeo-btn
    ngeo-measurearea
    class="btn btn-default ngeo-drawfeature-polygon"
    ng-class="{active: dfCtrl.measureArea.active}"
    ng-model="dfCtrl.measureArea.active"
    >${svgPolygon}</a>
  <a
    data-toggle="tooltip"
    title="{{'Draw a circle on the map' | translate}}"
    href
    ngeo-btn
    ngeo-measureazimut
    class="btn btn-default ngeo-drawfeature-circle"
    ng-class="{active: dfCtrl.measureAzimut.active}"
    ng-model="dfCtrl.measureAzimut.active"
    >${svgCircle}</a>
  <a
    data-toggle="tooltip"
    title="{{'Draw a rectangle on the map' | translate}}"
    href
    ngeo-btn
    ngeo-drawrectangle
    class="btn btn-default ngeo-drawfeature-rectangle"
    ng-class="{active: dfCtrl.drawRectangle.active}"
    ng-model="dfCtrl.drawRectangle.active"
    >${svgRectangle}</a>
  <a
    data-toggle="tooltip"
    title="{{'Draw a text label on the map' | translate}}"
    href
    ngeo-btn
    ngeo-drawtext
    class="btn btn-default ngeo-drawfeature-text"
    ng-class="{active: dfCtrl.drawText.active}"
    ng-model="dfCtrl.drawText.active"
    >${svgText}</a>
</ngeo-drawfeature>

<div ng-switch="efCtrl.selectedFeature">
  <hr class="gmf-drawfeature-separator" ng-show="efCtrl.getFeaturesArray().length > 0" />
  <div ng-switch-when="null">
    <div ng-switch="efCtrl.drawActive">
      <div ng-switch-when="true">
        <!-- adube! -->
        <gmf-drawfeatureoptions
          ng-if="efCtrl.measureLength && efCtrl.measureLength.active"
          measure-length="::efCtrl.measureLength"
          map="::efCtrl.map"
        >
        </gmf-drawfeatureoptions>
        <gmf-drawfeatureoptions
          ng-if="efCtrl.measureArea && efCtrl.measureArea.active"
          measure-area="::efCtrl.measureArea"
          map="::efCtrl.map"
        >
        </gmf-drawfeatureoptions>
        <gmf-drawfeatureoptions
          ng-if="efCtrl.measureAzimut && efCtrl.measureAzimut.active"
          measure-azimut="::efCtrl.measureAzimut"
          map="::efCtrl.map"
        >
        </gmf-drawfeatureoptions>
        <gmf-drawfeatureoptions
          ng-if="efCtrl.drawRectangle && efCtrl.drawRectangle.active"
          draw-rectangle="::efCtrl.drawRectangle"
          map="::efCtrl.map"
        >
        </gmf-drawfeatureoptions>
      </div>

      <div ng-show="efCtrl.getFeaturesArray().length > 0" ng-switch-default>
        <div class="ngeo-drawfeature-actionbuttons">
          <button
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            ngeo-exportfeatures
            ngeo-exportfeatures-features="efCtrl.features"
            class="btn btn-link btn-sm dropdown-toggle"
          >
            <span class="fa-solid fa-file-export"></span>
            {{'Export' | translate}}
          </button>
          <button ng-click="efCtrl.clearFeatures()" class="btn btn-link btn-sm">
            <span class="fa-solid fa-trash"></span>
            {{'Delete All' | translate}}
          </button>
        </div>
        <div class="gmf-eol"></div>
        <div class="gmf-drawfeature-featurelist list-group list-group-sm">
          <button
            role="button"
            class="list-group-item"
            ng-repeat="feature in efCtrl.getFeaturesArray()"
            ng-click="efCtrl.selectFeatureFromList(feature);"
          >
            {{ feature.get(efCtrl.nameProperty) }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div ng-switch-default>
    <button ng-click="efCtrl.selectedFeature = null;" class="btn btn-link btn-sm">
      <span class="fa-solid fa-arrow-left"></span>
      {{'List' | translate}}
    </button>
    <div class="ngeo-drawfeature-actionbuttons">
      <button
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        ngeo-exportfeatures
        ngeo-exportfeatures-features="efCtrl.selectedFeatures"
        class="btn btn-link btn-sm dropdown-toggle"
      >
        <span class="fa-solid fa-file-export"></span>
        {{'Export' | translate}}
      </button>
      <button ng-click="efCtrl.removeFeature(efCtrl.selectedFeature);" class="btn btn-link btn-sm">
        <span class="fa-solid fa-trash"></span>
        {{'Delete' | translate}}
      </button>
    </div>

    <div class="gmf-eol"></div>

    <gmf-featurestyle gmf-featurestyle-feature="efCtrl.selectedFeature"> </gmf-featurestyle>
  </div>
</div>`;
