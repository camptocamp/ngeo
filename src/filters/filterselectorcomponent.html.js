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

export default `<div class="form-group" ng-switch="$ctrl.filtrableDataSources.length">
  <span ng-switch-when="0" translate>No filtrable layer available!</span>
  <select
    class="form-control"
    ng-disabled="$ctrl.aRuleIsActive"
    ng-switch-default
    ng-model="$ctrl.gmfDataSourceBeingFiltered.dataSource"
    ng-options="dataSource.name | translate for dataSource in $ctrl.filtrableDataSources"
  >
    <option value="" translate>-- Layer to filter --</option>
  </select>

  <div ng-if="$ctrl.customRules && $ctrl.directedRules && $ctrl.readyDataSource">
    <hr class="gmf-filterselector-separator" />

    <div class="dropdown gmf-filterselector-savedfilters">
      <button
        class="btn btn-link dropdown-toggle ngeo-filter-condition-button"
        ng-class="{disabled: $ctrl.aRuleIsActive || $ctrl.gmfSavedFilters.currentDataSourceItems.length === 0}"
        type="button"
        data-toggle="dropdown"
        ng-disabled="$ctrl.aRuleIsActive || $ctrl.gmfSavedFilters.currentDataSourceItems.length === 0"
      >
        <span translate>Saved</span>
      </button>
      <ul class="dropdown-menu">
        <li ng-repeat="item in $ctrl.gmfSavedFilters.currentDataSourceItems">
          <a href ng-click="$ctrl.saveFilterLoadItem(item)">
            <span>{{::item.name}}</span>
          </a>
        </li>

        <li role="separator" class="divider"></li>
        <li>
          <a href ng-click="$ctrl.saveFilterManage()">
            <span translate>Manage saved filters</span>
          </a>
        </li>
      </ul>
    </div>

    <ngeo-filter
      a-rule-is-active="$ctrl.aRuleIsActive"
      custom-rules="$ctrl.customRules"
      datasource="$ctrl.readyDataSource"
      directed-rules="$ctrl.directedRules"
      feature-overlay="$ctrl.featureOverlay"
      filter-is-applied="$ctrl.filterIsApplied"
      map="$ctrl.map"
      tool-group="$ctrl.toolGroup"
    >
    </ngeo-filter>

    <div>
      <button
        class="btn btn-link gmf-filterselector-savebtn"
        type="button"
        ng-click="!$ctrl.aRuleIsActive && $ctrl.saveFilterShowModal()"
        ng-disabled="$ctrl.aRuleIsActive"
      >
        <span class="fa-solid fa-floppy-disk"></span>
        <span translate>Save</span>
      </button>
    </div>
  </div>

  <ngeo-modal ng-model="$ctrl.saveFilterSaveModalShown">
    <div class="modal-header ui-draggable-handle">
      <h4 class="modal-title">{{'Save filter' | translate}}</h4>
      <button type="button" class="close" data-dismiss="modal" aria-label="{{'Close' | translate}}">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p class="gmf-filterselector-savefilter-desc" translate>
        You can save the filter that you created to re-load it later.
      </p>
      <input
        type="text"
        class="form-control"
        name="name"
        ng-model="$ctrl.saveFilterName"
        placeholder="{{'Filter name' | translate}}"
      />
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">{{'Cancel' | translate}}</button>
      <button
        type="button"
        ng-click="$ctrl.saveFilterSave()"
        ng-disabled="$ctrl.saveFilterName === ''"
        class="btn prime"
      >
        {{'Save' | translate}}
      </button>
    </div>
  </ngeo-modal>

  <ngeo-modal ng-model="$ctrl.saveFilterManageModalShown">
    <div class="gmf-filterselector-managefilter-modal">
      <div class="modal-header ui-draggable-handle">
        <h4 class="modal-title">{{'Manage filters' | translate}}</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="{{'Close' | translate}}">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ul>
          <li ng-repeat="item in $ctrl.gmfSavedFilters.currentDataSourceItems">
            <span>{{::item.name}}</span>
            <a href ng-click="$ctrl.saveFilterRemoveItem(item)"> {{ 'Delete' | translate }} </a>
            <div class="gmf-eol"></div>
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">{{'Close' | translate}}</button>
      </div>
    </div>
  </ngeo-modal>
</div>`;
