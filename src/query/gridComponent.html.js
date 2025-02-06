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

export default `<div class="gmf-displayquerygrid panel" ng-show="ctrl.active">
  <div class="close" ng-click="ctrl.clear()">&times;</div>

  <ul class="nav nav-pills" role="tablist">
    <li
      class="nav-item"
      ng-repeat="gridSource in ctrl.getGridSources() track by gridSource.source.label"
      role="presentation"
      ng-click="ctrl.selectTab(gridSource)"
    >
      <a
        class="nav-link"
        href="#{{ctrl.escapeValue(gridSource.source.label)}}"
        ng-class="{'active' : ctrl.isSelected(gridSource)}"
        data-target="#{{ctrl.escapeValue(gridSource.source.label)}}"
        aria-controls="{{ctrl.escapeValue(gridSource.source.label)}}"
        role="tab"
        data-toggle="tab"
      >
        <span> {{gridSource.source.label | translate}} ({{gridSource.source.features.length}}) </span>
      </a>
    </li>
  </ul>

  <div class="tab-content">
    <div
      ng-repeat="gridSource in ctrl.getGridSources() track by gridSource.source.label"
      role="tabpanel"
      class="tab-pane"
      ng-class="{'active' : ctrl.isSelected(gridSource)}"
      id="{{ctrl.escapeValue(gridSource.source.label)}}"
    >
      <ngeo-grid ngeo-grid-configuration="gridSource.configuration"> </ngeo-grid>
    </div>
    <div class="container-fluid">
      <div
        ng-show="!ctrl.pending && ctrl.getActiveGridSource() && ctrl.getActiveGridSource().configuration !== null"
        class="row"
      >
        <div class="col-md-5 my-auto">
          <span ng-if="ctrl.hasOneWithTooManyResults_()" class="gmf-query-grid-too-many text-warning"
            ><span ng-if="ctrl.sumOfAvailableResults >= 0">{{'Only' | translate}} {{ctrl.sumOfFeatures}} {{'of' | translate}} {{ctrl.sumOfAvailableResults}}
            {{'results displayed, as the maximum number is reached. Please refine your query.' | translate
            }}</span
          ><span ng-if="ctrl.sumOfAvailableResults < 0">{{'One of the queries returns the maximum number of results, but probably not all the  results are displayed. Please refine your query.' | translate}}
          </span
          ></span
          >
        </div>
        <div class="col-md-7" class="pull-right">
          <ul class="nav justify-content-end">
            <li class="ng-hide" ng-show="ctrl.isOneSelected()">
              <div class="btn btn-sm ng-binding">
                {{ctrl.getSelectedRowCount()}} <span translate>selected element(s)</span>
              </div>
            </li>

            <li ng-show="ctrl.isOneSelected()" class="ng-hide">
              <button
                class="btn btn-link btn-sm"
                title="{{'Zoom to selection' | translate}}"
                ng-click="ctrl.zoomToSelection()"
              >
                <i class="fa-solid fa-magnifying-glass-plus"></i> <span translate>Zoom to</span>
              </button>
            </li>

            <li ng-show="ctrl.isOneSelected()" class="ng-hide">
              <button
                class="btn btn-link btn-sm"
                title="{{'Export selection as CSV' | translate}}"
                ng-click="ctrl.downloadCsv()"
              >
                <i class="fa-solid fa-download"></i> <span translate>Export as CSV</span>
              </button>
            </li>

            <li class="dropdown">
              <button
                type="button"
                class="dropup btn btn-default btn-sm dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span translate>Select</span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dLabel">
                <li>
                  <a href="" ng-click="ctrl.selectAll()" translate>All</a>
                </li>

                <li>
                  <a href="" ng-click="ctrl.unselectAll()" translate>None</a>
                </li>

                <li>
                  <a href="" ng-click="ctrl.invertSelection()" translate>Reverse selection</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div ng-show="ctrl.pending" class="spinner-grid">
      <i class="fa-solid fa-spin"
        >${svgSpinner('3rem')}</i>
    </div>
  </div>
</div>`;
