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

export default `<fieldset ng-disabled="attrCtrl.disabled">
  <div class="form-group" ng-repeat="attribute in ::attrCtrl.attributes">
    <div ng-if="attribute.type !== 'geometry'">
      <label ng-if="::attribute.type !== 'boolean'" class="col-form-label"
        >{{ ::attribute.name | translate }}
        <span class="text-muted">{{::attribute.required ? "*" : ""}}</span>
      </label>

      <div class="form-control" ng-if="::attribute.readonly" readonly>
        {{::attrCtrl.properties[attribute.name]}}
      </div>

      <div ng-if="::!attribute.readonly" ng-switch="::attribute.type">
        <div ng-switch-when="boolean" class="form-check">
          <label class="form-check-label">
            <input
              name="{{::attribute.name}}"
              class="form-check-input"
              ng-model="attrCtrl.properties[attribute.name]"
              ng-change="attrCtrl.handleInputChange(attribute.name);"
              type="checkbox"
            />
            <span>
              {{ ::attribute.name | translate }}
              <span class="text-muted">{{::attribute.required ? "*" : ""}}</span></span
            >
          </label>
        </div>

        <select
          name="{{::attribute.name}}"
          ng-required="attribute.required"
          ng-switch-when="select"
          ng-model="attrCtrl.properties[attribute.name]"
          ng-change="attrCtrl.handleInputChange(attribute.name);"
          class="form-control ngeo-highlight-invalid"
          type="text"
        >
          <option ng-repeat="attribute in ::attribute.choices" value="{{ ::attribute }}">
            {{ ::attribute | translate }}
          </option>
        </select>

        <input
          name="{{::attribute.name}}"
          ng-required="attribute.required"
          ng-switch-when="date"
          ng-model="attrCtrl.properties[attribute.name]"
          ng-change="attrCtrl.handleInputChange(attribute.name);"
          ngeo-datetimepicker
          ngeo-datetimepicker-options='&apos;{"timepicker": false, "format": "&apos; + attribute.format + &apos;", "allowBlank": true, "todayButton": false, "mask": "&apos; + attribute.mask + &apos;"}&apos;'
          class="form-control ngeo-highlight-invalid"
          type="text"
        />

        <input
          name="{{::attribute.name}}"
          id="time"
          ng-required="attribute.required"
          ng-switch-when="time"
          ng-model="attrCtrl.properties[attribute.name]"
          ng-change="attrCtrl.handleInputChange(attribute.name);"
          ngeo-datetimepicker
          ngeo-datetimepicker-options='&apos;{"datepicker": false, "format": "&apos; + attribute.format + &apos;", "todayButton": false, "mask": "&apos; + attribute.mask + &apos;", "defaultTime": "00:00"}&apos;'
          class="form-control ngeo-highlight-invalid"
          type="text"
        />

        <input
          name="{{::attribute.name}}"
          ng-required="attribute.required"
          ng-switch-when="datetime"
          ng-model="attrCtrl.properties[attribute.name]"
          ng-change="attrCtrl.handleInputChange(attribute.name);"
          ngeo-datetimepicker
          ngeo-datetimepicker-options='&apos;{"scrollTime": false, "format": "&apos; + attribute.format + &apos;", "allowBlank": true, "todayButton": false, "mask": "&apos; + attribute.mask + &apos;", "defaultTime": "00:00"}&apos;'
          class="form-control ngeo-highlight-invalid"
          type="text"
        />

        <div ng-switch-when="number" ng-switch="::attribute.numType">
          <input
            name="{{::attribute.name}}"
            ng-required="attribute.required"
            ng-switch-when="integer"
            ng-model="attrCtrl.properties[attribute.name]"
            ng-change="attrCtrl.handleInputChange(attribute.name);"
            class="form-control ngeo-highlight-invalid"
            step="1"
            type="number"
          />
          <input
            name="{{::attribute.name}}"
            ng-required="attribute.required"
            ng-switch-default
            ng-model="attrCtrl.properties[attribute.name]"
            ng-change="attrCtrl.handleInputChange(attribute.name);"
            class="form-control ngeo-highlight-invalid"
            type="number"
          />
        </div>

        <input
          name="{{::attribute.name}}"
          ng-required="attribute.required"
          ng-switch-default
          ng-model="attrCtrl.properties[attribute.name]"
          ng-change="attrCtrl.handleInputChange(attribute.name);"
          ng-maxlength="attribute.maxLength"
          class="form-control ngeo-highlight-invalid"
          type="text"
        />

        <div ng-show="attrCtrl.form.$submitted || attrCtrl.form[attribute.name].$touched">
          <p class="text-danger" ng-show="attrCtrl.form[attribute.name].$error.required">
            {{'This field is required' | translate}}
          </p>
        </div>
      </div>
    </div>
  </div>
</fieldset>`;
