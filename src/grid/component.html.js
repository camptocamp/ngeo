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

export default `<div class="ngeo-grid-table-container">
  <table
    float-thead="$ctrl.floatTheadConfig"
    ng-model="$ctrl.configuration.data"
    class="table table-bordered table-striped table-hover"
  >
    <thead class="table-header">
      <tr>
        <th
          ng-repeat="columnDefs in $ctrl.configuration.columnDefs"
          ng-click="$ctrl.sort(columnDefs.name)"
          ng-bind-html="columnDefs.name | ngeoTrustHtml | translate"
        >
          <i ng-show="$ctrl.sortedBy !== columnDefs.name" class="fa fa-fw"></i>
          <i
            ng-show="$ctrl.sortedBy === columnDefs.name && $ctrl.sortAscending === true"
            class="fa fa-caret-up"
          ></i>
          <i
            ng-show="$ctrl.sortedBy === columnDefs.name && $ctrl.sortAscending === false"
            class="fa fa-caret-down"
          ></i>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        ng-repeat="attributes in $ctrl.configuration.data"
        ng-class="['row-' + $ctrl.configuration.getRowUid(attributes), $ctrl.configuration.isRowSelected(attributes) ? 'ngeo-grid-active': '']"
        ng-click="$ctrl.clickRow(attributes, $event)"
        ng-mousedown="$ctrl.preventTextSelection($event)"
      >
        <td
          ng-repeat="columnDefs in $ctrl.configuration.columnDefs"
          ng-bind-html="attributes[columnDefs.name] | removeCDATA | ngeoTrustHtmlAuto"
        ></td>
      </tr>
    </tbody>
  </table>
</div>`;
