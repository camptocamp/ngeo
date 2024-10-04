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

export default `<div class="dropdown">
  <button
    class="btn btn-link dropdown-toggle ngeo-filter-condition-button"
    ng-class="{disabled: $ctrl.aRuleIsActive}"
    type="button"
    data-toggle="dropdown"
    ng-disabled="$ctrl.aRuleIsActive"
  >
    <span class="fa-solid fa-gear"></span>
  </button>
  <ul class="dropdown-menu">
    <li ng-repeat="condition in ::$ctrl.conditions">
      <a href ng-click="$ctrl.setCondition(condition)">
        <span
          ng-class="{'ngeo-filter-condition-criteria-active': condition.value == $ctrl.datasource.filterCondition}"
          class="fa-solid fa-check ngeo-filter-condition-criteria"
        >
        </span>
        <span>{{::condition.text | translate}}</span>
      </a>
    </li>
  </ul>
</div>

<ngeo-rule
  ng-repeat="rule in $ctrl.directedRules"
  feature-overlay="::$ctrl.featureOverlay"
  class="ngeo-filter-rule-directed"
  map="$ctrl.map"
  rule="rule"
  tool-group="$ctrl.toolGroup"
>
</ngeo-rule>

<hr class="ngeo-filter-separator-rules" />

<div ng-repeat="rule in $ctrl.customRules">
  <a
    class="btn btn-sm btn-link ngeo-filter-rule-custom-rm-btn"
    ng-click="!$ctrl.aRuleIsActive && $ctrl.removeCustomRule(rule)"
    ng-disabled="$ctrl.aRuleIsActive"
    href
  >
    <span class="fa-solid fa-xmark"></span>
  </a>
  <ngeo-rule
    feature-overlay="::$ctrl.featureOverlay"
    class="ngeo-filter-rule-custom"
    map="$ctrl.map"
    rule="rule"
    tool-group="$ctrl.toolGroup"
  >
  </ngeo-rule>
</div>

<div class="dropdown">
  <button
    class="btn btn-link dropdown-toggle"
    ng-class="{disabled: $ctrl.aRuleIsActive}"
    type="button"
    data-toggle="dropdown"
    ng-disabled="$ctrl.aRuleIsActive"
  >
    <span translate>+ Add a new criteria</span>
  </button>
  <ul class="dropdown-menu">
    <li ng-repeat="attribute in ::$ctrl.geometryAttributes">
      <a href ng-click="$ctrl.createAndAddCustomRule(attribute)">
        <span translate>Spatial filter</span>
      </a>
    </li>

    <li role="presentation" class="divider"></li>
    <li ng-repeat="attribute in ::$ctrl.otherAttributes">
      <a href ng-click="$ctrl.createAndAddCustomRule(attribute)">
        <span>{{::attribute.name | translate}}</span>
      </a>
    </li>
  </ul>
</div>

<hr class="ngeo-filter-separator-criteria" />

<button
  class="btn btn-link"
  type="button"
  ng-click="$ctrl.apply()"
  ng-disabled="$ctrl.datasource.visible === false"
>
  <span class="fa-solid fa-check"></span>
  <span translate>Apply filter</span>
</button>

<button
  class="btn btn-link"
  type="button"
  ng-click="$ctrl.getData()"
  ng-disabled="$ctrl.datasource.visible === false"
>
  <span class="fa-solid fa-chevron-right"></span>
  <span translate>Get data</span>
</button>`;
