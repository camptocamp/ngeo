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

export default `<div class="gmf-time-slider">
  <div ui-slider="sliderCtrl.sliderOptions" ng-model="sliderCtrl.dates">
    <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" data-toggle="tooltip" title="">
    </span>
  </div>

  <div class="gmf-time-slider-displayed-dates">
    <div class="gmf-time-slider-start-date" ng-if="::sliderCtrl.time.mode === 'range'">
      <span>{{sliderCtrl.getLocalizedDate(sliderCtrl.dates[0])}}</span>
    </div>

    <div class="gmf-time-slider-start-date" ng-if="::sliderCtrl.time.mode === 'value'">
      <span>{{sliderCtrl.getLocalizedDate(sliderCtrl.dates)}}</span>
    </div>

    <div class="gmf-time-slider-end-date" ng-if="::sliderCtrl.time.mode === 'range'">
      <span>{{sliderCtrl.getLocalizedDate(sliderCtrl.dates[1])}}</span>
    </div>
  </div>
</div>`;
