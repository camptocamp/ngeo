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

export default `<div ng-if="$ctrl.drawRectangle">
  <label>{{'Height:' | translate}}</label>
  <div class="input-group">
    <input class="form-control" min="0" ng-model="$ctrl.height" type="number" />
    <select class="form-control" ng-model="$ctrl.heightUnits">
      <option value="m">{{'m (meters)' | translate}}</option>
      <option value="km">{{'km (kilometers)' | translate}}</option>
    </select>
  </div>
</div>

<div ng-switch="::(!!$ctrl.measureAzimut)">
  <label ng-switch-when="true">{{'Radius:' | translate}}</label>
  <label ng-switch-default>{{'Length:' | translate}}</label>
</div>
<div class="input-group">
  <input class="form-control" min="0" ng-model="$ctrl.length" type="number" />
  <select class="form-control" ng-model="$ctrl.lengthUnits">
    <option value="m">{{'m (meters)' | translate}}</option>
    <option value="km">{{'km (kilometers)' | translate}}</option>
  </select>
</div>

<p class="gmf-drawfeatureoptions-help-rectangle" ng-if="$ctrl.drawRectangle">
  {{ 'Note: drawing a rectangle of a specific size requires both height and length to be defined.' |
  translate}}
</p>`;
