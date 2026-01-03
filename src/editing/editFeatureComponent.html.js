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

import svgPoint from 'gmf/icons/point_svg';
import svgLine from 'gmf/icons/line_svg';
import svgPolygon from 'gmf/icons/polygon_svg';

export default `<div>
  <div ng-switch="efCtrl.feature">
    <a
      ng-switch-when="null"
      ng-if="efCtrl.geomType"
      href
      ngeo-btn
      ngeo-createfeature
      ngeo-createfeature-active="efCtrl.createActive"
      ngeo-createfeature-features="::efCtrl.features"
      ngeo-createfeature-geom-type="::efCtrl.geomType"
      ngeo-createfeature-map="::efCtrl.map"
      class="btn btn-default"
      ng-class="{active: efCtrl.createActive}"
      ng-model="efCtrl.createActive"
    >
      <span ng-switch="::efCtrl.geomType">
        <span ng-switch-when="Point">${svgPoint} {{'Draw new point' | translate}}
        </span>
        <span ng-switch-when="MultiPoint">${svgPoint} {{'Draw new point' | translate}}
        </span>
        <span ng-switch-when="LineString">${svgLine} {{'Draw new linestring' | translate}}
        </span>
        <span ng-switch-when="MultiLineString">${svgLine} {{'Draw new linestring' | translate}}
        </span>
        <span ng-switch-when="Polygon">${svgPolygon} {{'Draw new polygon' | translate}}
        </span>
        <span ng-switch-when="MultiPolygon">${svgPolygon} {{'Draw new polygon' | translate}}
        </span>
      </span>
    </a>
    <div ng-switch-default>
      <form
        novalidate
        name="form"
        class="form gmf-editfeature-attributes-container"
        ng-if="efCtrl.attributes"
      >
        <div class="row">
          <div class="col-sm-12">
            <a
              class="close"
              ng-click="efCtrl.cancel()"
              ng-disabled="efCtrl.pending"
              title="{{'Cancel modifications' | translate}}"
              href
              >&times;</a
            >
          </div>
        </div>
        <ngeo-attributes
          ngeo-attributes-attributes="::efCtrl.attributes"
          ngeo-attributes-disabled="efCtrl.pending"
          ngeo-attributes-feature="::efCtrl.feature"
        >
        </ngeo-attributes>
        <input
          type="submit"
          value="{{'Save' | translate}}"
          class="btn btn-sm btn-default gmf-editfeature-btn-save"
          ng-click="form.$valid && efCtrl.save()"
          ng-disabled="!efCtrl.dirty || efCtrl.pending || !form.$valid"
          title="{{'Save modifications' | translate}}"
        />
        <a
          class="btn btn-sm btn-default gmf-editfeature-btn-cancel"
          ng-click="efCtrl.confirmCancel()"
          ng-disabled="efCtrl.pending"
          title="{{'Cancel modifications' | translate}}"
          href
          >{{'Cancel' | translate}}</a
        >
        <button
          class="btn btn-sm btn-link gmf-editfeature-btn-delete"
          ng-click="efCtrl.delete()"
          ng-disabled="efCtrl.pending"
          ng-show="efCtrl.featureId"
          title="{{'Delete this feature' | translate}}"
        >
          <span class="fa-solid fa-trash"></span>
          {{'Delete' | translate}}
        </button>
      </form>
    </div>
  </div>
  <ngeo-modal ng-model="efCtrl.unsavedModificationsModalShown">
    <div class="modal-header ui-draggable-handle">
      <h4 class="modal-title">{{'Unsaved modifications!' | translate}}</h4>
      <button type="button" class="close" data-dismiss="modal" aria-label="{{'Close' | translate}}">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">{{'There are unsaved changes.' | translate}}</div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-default"
        data-dismiss="modal"
        ng-click="efCtrl.continueWithoutSaving()"
      >
        {{'Continue without saving' | translate}}
      </button>
      <button type="button" class="btn prime" data-dismiss="modal">{{'Cancel' | translate}}</button>
      <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="efCtrl.submit()">
        {{'Save' | translate}}
      </button>
    </div>
  </ngeo-modal>
  <ngeo-modal ng-model="efCtrl.showServerError">
    <div class="modal-header ui-draggable-handle">{{'Server error.' | translate}}</div>
    <div class="modal-body">
      {{efCtrl.serverErrorType}}<br />
      {{efCtrl.serverErrorMessage || ('Unexpected server error.' | translate)}}
    </div>
  </ngeo-modal>
</div>`;
