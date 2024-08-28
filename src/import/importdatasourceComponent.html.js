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

export default `<div class="form-group">
  <select
    class="form-control"
    ng-model="$ctrl.mode"
    ng-options="mode | translate for mode in $ctrl.modes"
    ng-click="$ctrl.hasError = false"
  ></select>
</div>

<div>
  <form name="idsl_form" novalidate ng-show="$ctrl.mode === 'Local'">
    <div class="form-group">
      <div class="input-group">
        <div class="custom-file">
          <input type="file" class="custom-file-input" required />
          <label class="custom-file-label" translate>No file</label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <button
        class="btn prime form-control"
        ng-class="{'has-error': $ctrl.hasError}"
        title="{{'Load a file from local' | translate}}"
        type="submit"
        ng-click="idsl_form.$valid && $ctrl.load()"
        ng-disabled="$ctrl.file === undefined || $ctrl.hasError"
      >
        <span ng-if="!$ctrl.hasError">{{'Load local file' | translate}}</span>
        <span ng-if="$ctrl.hasError">{{'Unable to load the file' | translate}}</span>
      </button>
    </div>
  </form>

  <form name="idsc_form" novalidate ng-show="$ctrl.mode === 'Online'">
    <div class="form-group gmf-importdatasource-url-form-group">
      <input
        autocomplete="off"
        class="form-control"
        name="url"
        placeholder="{{'Choose or enter online resource URL' | translate}}"
        required
        type="url"
        ng-disabled="$ctrl.pending"
        ng-model="$ctrl.url"
      />
    </div>
    <div class="form-group">
      <button
        class="btn prime form-control gmf-importdatasource-connect-btn"
        ng-class="{'has-error': $ctrl.hasError}"
        title="{{'Connect to online resource' | translate}}"
        type="submit"
        ng-click="idsc_form.$valid && $ctrl.connect()"
        ng-disabled="idsc_form.$invalid || $ctrl.pending"
      >
        <span ng-if="$ctrl.pending">{{'Connecting, please wait...' | translate}}</span>
        <span ng-if="!$ctrl.pending && $ctrl.hasError">{{'Failed to connect' | translate}}</span>
        <span ng-if="!$ctrl.pending && !$ctrl.hasError">{{'Connect' | translate}}</span>
      </button>
    </div>
  </form>
</div>

<div ng-if="$ctrl.isLoading">
  <i class="fa custom-spinner-importkml fa-spin"
    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em">
      <circle
        cx="256"
        cy="48"
        r="48"
        style="
          opacity: 1;
          fill-opacity: 1;
          stroke: #000;
          stroke-width: 0;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      />
      <circle
        cx="109.17"
        cy="108.313"
        r="43"
        style="
          opacity: 1;
          fill-opacity: 1;
          stroke: #000;
          stroke-width: 0;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      />
      <circle
        cx="46.537"
        cy="257.328"
        r="38"
        style="
          opacity: 1;
          fill-opacity: 1;
          stroke: #000;
          stroke-width: 0;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      />
      <circle
        cx="108.028"
        cy="403.972"
        r="33"
        style="
          opacity: 1;
          fill-opacity: 1;
          stroke: #000;
          stroke-width: 0;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      />
      <circle
        cx="255.794"
        cy="463.935"
        r="28"
        style="
          opacity: 1;
          fill-opacity: 1;
          stroke: #000;
          stroke-width: 0;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      />
      <circle
        cx="402.894"
        cy="402.936"
        r="23"
        style="
          opacity: 1;
          fill-opacity: 1;
          stroke: #000;
          stroke-width: 0;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      />
      <circle
        cx="463.623"
        cy="256.106"
        r="18"
        style="
          opacity: 1;
          fill-opacity: 1;
          stroke: #000;
          stroke-width: 0;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      /></svg
  ></i>
</div>

<div
  class="gmf-importdatasource-layers"
  ng-if="($ctrl.wmsCapabilities !== null || $ctrl.wmtsCapabilities !== null) && $ctrl.mode === 'Online'"
>
  <hr />
  <input
    class="form-control"
    placeholder="{{'Search' | translate}}"
    ng-disabled="$ctrl.pending"
    ng-model="$ctrl.searchText"
    ng-model-options="{ debounce: 250 }"
    ng-change="$ctrl.search()"
  />
  <gmf-wmscapabilitylayertreenode
    capabilities="::$ctrl.wmsCapabilities"
    layer="::$ctrl.wmsCapabilities.Capability.Layer"
    url="::$ctrl.url"
    ng-if="$ctrl.wmsCapabilities !== null"
  >
  </gmf-wmscapabilitylayertreenode>
  <gmf-wmtscapabilitylayertree
    capabilities="::$ctrl.wmtsCapabilities"
    layers="::$ctrl.wmtsCapabilities.Contents.Layer"
    url="::$ctrl.url"
    ng-if="$ctrl.wmtsCapabilities !== null"
  >
  </gmf-wmtscapabilitylayertree>
</div>`;
