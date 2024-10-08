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

export default `<div ng-if="fsCtrl.feature && fsCtrl.type">
  <div class="form-group">
    <input
      ng-model="fsCtrl.getSetName"
      ng-model-options="{getterSetter: true}"
      ng-attr-placeholder="{{'Name' | translate}}"
      class="form-control"
    />
  </div>
  <div ng-if="fsCtrl.type !== 'Text'" class="form-group">
    <input
      id="gmf-featurestyle-showlabel-{{::fsCtrl.uid}}"
      type="checkbox"
      ng-model="fsCtrl.getSetShowLabel"
      ng-model-options="{getterSetter: true}"
    />
    <label ng-switch="fsCtrl.type" for="gmf-featurestyle-showlabel-{{::fsCtrl.uid}}" class="col-form-label">
      {{'Display label' | translate}}
    </label>
  </div>
  <div ng-if="fsCtrl.type !== 'Text'" class="form-group">
    <input
      id="gmf-featurestyle-showmeasure-{{::fsCtrl.uid}}"
      type="checkbox"
      ng-model="fsCtrl.getSetShowMeasure"
      ng-model-options="{getterSetter: true}"
    />
    <label ng-switch="fsCtrl.type" for="gmf-featurestyle-showmeasure-{{::fsCtrl.uid}}" class="col-form-label">
      <span ng-switch-when="Circle"> {{'Display azimuth and radius' | translate}} </span>
      <span ng-switch-when="Polygon"> {{'Display surface' | translate}} </span>
      <span ng-switch-when="Rectangle"> {{'Display surface' | translate}} </span>
      <span ng-switch-when="LineString"> {{'Display length' | translate}} </span>
      <span ng-switch-when="Point"> {{'Display coordinates' | translate}} </span>
    </label>
    <em class="text-muted"> ({{ fsCtrl.measure }}) </em>
  </div>

  <div class="form-group">
    <div ngeo-colorpicker="" ngeo-colorpicker-color="fsCtrl.color"></div>
  </div>

  <div ng-if="fsCtrl.type === 'Point'" class="form-group">
    <div class="row">
      <label class="col-form-label col-md-5">{{'Size' | translate}}</label>
      <div class="col-md-7">
        <input
          type="range"
          class="form-control"
          min="3"
          max="20"
          step="1"
          ng-model="fsCtrl.getSetSize"
          ng-model-options="{getterSetter: true}"
        />
      </div>
    </div>
  </div>

  <div ng-if="fsCtrl.type === 'Text'" class="form-group">
    <div class="row">
      <label class="col-form-label col-md-5">{{'Size' | translate}}</label>
      <div class="col-md-7">
        <input
          type="range"
          class="form-control"
          min="8"
          max="30"
          step="1"
          ng-model="fsCtrl.getSetSize"
          ng-model-options="{getterSetter: true}"
        />
      </div>
    </div>
  </div>

  <div
    ng-if="fsCtrl.type === 'Circle' || fsCtrl.type === 'LineString' || fsCtrl.type === 'Polygon' || fsCtrl.type === 'Rectangle'"
    class="form-group"
  >
    <div class="row">
      <label class="col-form-label col-md-5">{{'Stroke' | translate}}</label>
      <div class="col-md-7">
        <input
          type="range"
          class="form-control"
          min="0.5"
          max="5"
          step="0.5"
          ng-model="fsCtrl.getSetStroke"
          ng-model-options="{getterSetter: true}"
        />
      </div>
    </div>
  </div>

  <div ng-if="fsCtrl.type === 'LineString'">
    <div class="form-group">
      <div class="row">
        <label class="col-form-label col-md-5">{{'Arrow direction' | translate}}</label>
        <div class="col-md-7">
          <select
            class="form-control"
            ng-model="fsCtrl.getSetArrowDirection"
            ng-model-options="{getterSetter: true}"
          >
            <option value="{{::fsCtrl.arrowDirections.NONE}}">{{'None' | translate}}</option>
            <option value="{{::fsCtrl.arrowDirections.FORWARD}}">{{'Forward' | translate}}</option>
            <option value="{{::fsCtrl.arrowDirections.BACKWARD}}">{{'Backward' | translate}}</option>
            <option value="{{::fsCtrl.arrowDirections.BOTH}}">{{'Both' | translate}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <label class="col-md-5">{{'Arrow position' | translate}}</label>
        <div class="col-md-7">
          <select
            class="form-control"
            ng-disabled="fsCtrl.getSetArrowDirection() === 'none'"
            ng-model="fsCtrl.getSetArrowPosition"
            ng-model-options="{getterSetter: true}"
          >
            <option value="{{::fsCtrl.arrowPositions.FIRST}}">{{'First segment' | translate}}</option>
            <option value="{{::fsCtrl.arrowPositions.LAST}}">{{'Last segment' | translate}}</option>
            <option value="{{::fsCtrl.arrowPositions.EVERY}}">{{'Every segment' | translate}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div
    ng-if="fsCtrl.type === 'Circle' || fsCtrl.type === 'Polygon' || fsCtrl.type === 'Rectangle'"
    class="form-group"
  >
    <div class="row">
      <label class="col-form-label col-md-5">{{'Opacity' | translate}}</label>
      <div class="col-md-7">
        <input
          type="range"
          class="form-control"
          min="0"
          max="1"
          step="0.05"
          ng-model="fsCtrl.getSetOpacity"
          ng-model-options="{getterSetter: true}"
        />
      </div>
    </div>
  </div>

  <div ng-if="fsCtrl.type === 'Text'" class="form-group">
    <div class="row">
      <label class="col-form-label col-md-5">{{'Angle' | translate}}</label>
      <div class="col-md-7">
        <input
          type="range"
          class="form-control"
          min="-180"
          max="180"
          step="22.5"
          ng-model="fsCtrl.getSetAngle"
          ng-model-options="{getterSetter: true}"
        />
      </div>
    </div>
  </div>
</div>`;
