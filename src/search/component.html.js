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

export default `<div class="gmf-search">
  <input
    type="text"
    ng-attr-placeholder="{{$ctrl.placeholder|translate}}"
    class="form-control"
    ng-model="$ctrl.inputValue"
    ngeo-search="$ctrl.options"
    ngeo-search-datasets="$ctrl.datasets"
    ngeo-search-listeners="$ctrl.listeners"
  />
  <span
    class="gmf-clear-button ng-hide"
    ng-hide="!$ctrl.clearButton || $ctrl.inputValue == '' && $ctrl.featureOverlay_.isEmpty()"
    ng-click="$ctrl.onClearButton()"
  >
  </span>
</div>
<span ng-if="$ctrl.options.colorChooser">
  <span ng-show="$ctrl.displayColorPicker" ngeo-popover ngeo-popover-placement="bottom">
    <button
      class="gmf-color-button fa-solid fa-droplet"
      ngeo-popover-anchor
      data-original-title="{{'Change the color of the search result'|translate}}"
    ></button>
    <div ngeo-popover-content>
      <div ngeo-colorpicker ngeo-colorpicker-color="$ctrl.color"></div>
    </div>
  </span>
</span>`;
