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

import svgSpinner from 'gmf/icons/spinner_svg';

export default `<div class="gmf-profile-container panel" ng-show="ctrl.active">
  <div class="spinner-profile" ng-show="ctrl.isLoading">
    <i class="fa-solid fa-spin"
      >${svgSpinner('3rem')}</i>
  </div>

  <div
    class="ngeo-profile"
    ng-if="!ctrl.isErrored && !ctrl.isLoading"
    ngeo-profile="ctrl.profileData"
    ngeo-profile-highlight="ctrl.profileHighlight"
    ngeo-profile-options="::ctrl.profileOptions"
  ></div>

  <ul class="gmf-profile-legend" ng-if="!ctrl.isErrored && !ctrl.isLoading">
    <li ng-repeat="name in ::ctrl.getLayersNames()">
      <i class="fa-solid fa-minus" ng-style="ctrl.getStyle(name)"></i>
      {{name | translate}}
      <span ng-if="ctrl.currentPoint.elevations[name] != null">
        {{ctrl.currentPoint.elevations[name]}}&nbsp;{{ctrl.currentPoint.yUnits}}
      </span>
    </li>
  </ul>

  <div class="gmf-profile-export btn-group dropup" ng-show="!ctrl.isErrored && !ctrl.isLoading">
    <a
      class="dropdown-toggle"
      href=""
      ng-show="ctrl.profileData.length !== 0"
      data-toggle="dropdown"
      aria-expanded="false"
    >
      {{'Export' | translate}}
    </a>

    <ul class="dropdown-menu dropdown-menu-right" role="menu">
      <li>
        <a href="" ng-click="::ctrl.downloadCsv()">
          <i class="fa-solid fa-table"></i>&nbsp;{{'Download CSV' | translate}}</a
        >
      </li>
    </ul>
  </div>

  <div class="gmf-profile-error" ng-show="ctrl.isErrored">
    <p>{{'The profile service does not respond, please try later.' | translate}}</p>
  </div>
  <div class="close" ng-click="ctrl.line = null">&times;</div>
</div>`;
