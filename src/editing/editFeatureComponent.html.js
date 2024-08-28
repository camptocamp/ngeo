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
        <span ng-switch-when="Point">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em">
            <path
              d="M7.948 10.25c-1.26.009-2.349-1.23-2.184-2.48.11-1.153 1.218-2.124 2.387-2.013 1.064.06 2.022.956 2.09 2.028.1.975-.492 1.973-1.42 2.31a2.2 2.2 0 0 1-.873.155m.047-1.357c.606.03 1.103-.703.827-1.248-.215-.499-.934-.709-1.357-.343-.393.3-.47.941-.11 1.295.16.18.395.295.64.296"
            />
          </svg>
          {{'Draw new point' | translate}}
        </span>
        <span ng-switch-when="MultiPoint">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em">
            <path
              d="M7.948 10.25c-1.26.009-2.349-1.23-2.184-2.48.11-1.153 1.218-2.124 2.387-2.013 1.064.06 2.022.956 2.09 2.028.1.975-.492 1.973-1.42 2.31a2.2 2.2 0 0 1-.873.155m.047-1.357c.606.03 1.103-.703.827-1.248-.215-.499-.934-.709-1.357-.343-.393.3-.47.941-.11 1.295.16.18.395.295.64.296"
            />
          </svg>
          {{'Draw new point' | translate}}
        </span>
        <span ng-switch-when="LineString">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em">
            <path
              d="M6.626.267C5.366.26 4.27 1.498 4.436 2.75c.109 1.153 1.216 2.129 2.384 2.017 1.064-.06 2.031-.96 2.1-2.031.1-.975-.497-1.977-1.424-2.313a2.2 2.2 0 0 0-.87-.155zm.046 1.364c.605-.03 1.095.7.819 1.244-.215.498-.93.71-1.353.344-.392-.3-.473-.94-.112-1.293.16-.18.4-.294.645-.295zM3.916 8.397c-1.256-.007-2.353 1.225-2.19 2.475.104 1.16 1.223 2.142 2.397 2.023 1.062-.066 2.019-.962 2.087-2.036.093-.932-.446-1.892-1.312-2.259a2.2 2.2 0 0 0-.983-.203zm.048 1.363c.612-.028 1.104.716.807 1.266-.228.493-.94.682-1.355.313-.377-.3-.457-.923-.106-1.276a.89.89 0 0 1 .654-.303m8.05 1.467c-1.25-.023-2.353 1.178-2.224 2.422.075 1.165 1.179 2.174 2.358 2.078 1.07-.043 2.05-.936 2.13-2.016.103-.936-.434-1.905-1.301-2.278-.301-.14-.631-.214-.963-.207zm.008 1.364c.615-.037 1.115.708.821 1.26-.217.478-.906.684-1.322.344-.424-.297-.5-.976-.113-1.332a.88.88 0 0 1 .615-.272zm-6.81-2.163c-.143.417-.282.832-.434 1.245 1.92.67 3.84 1.333 5.755 2.011.153-.432.296-.863.455-1.293-1.92-.67-3.841-1.335-5.759-2.011zm.426-6.874C4.973 5.436 4.313 7.32 3.642 9.2q.648.225 1.292.458 1-2.85 2.012-5.694-.648-.224-1.29-.458z"
            />
          </svg>
          {{'Draw new linestring' | translate}}
        </span>
        <span ng-switch-when="MultiLineString">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em">
            <path
              d="M6.626.267C5.366.26 4.27 1.498 4.436 2.75c.109 1.153 1.216 2.129 2.384 2.017 1.064-.06 2.031-.96 2.1-2.031.1-.975-.497-1.977-1.424-2.313a2.2 2.2 0 0 0-.87-.155zm.046 1.364c.605-.03 1.095.7.819 1.244-.215.498-.93.71-1.353.344-.392-.3-.473-.94-.112-1.293.16-.18.4-.294.645-.295zM3.916 8.397c-1.256-.007-2.353 1.225-2.19 2.475.104 1.16 1.223 2.142 2.397 2.023 1.062-.066 2.019-.962 2.087-2.036.093-.932-.446-1.892-1.312-2.259a2.2 2.2 0 0 0-.983-.203zm.048 1.363c.612-.028 1.104.716.807 1.266-.228.493-.94.682-1.355.313-.377-.3-.457-.923-.106-1.276a.89.89 0 0 1 .654-.303m8.05 1.467c-1.25-.023-2.353 1.178-2.224 2.422.075 1.165 1.179 2.174 2.358 2.078 1.07-.043 2.05-.936 2.13-2.016.103-.936-.434-1.905-1.301-2.278-.301-.14-.631-.214-.963-.207zm.008 1.364c.615-.037 1.115.708.821 1.26-.217.478-.906.684-1.322.344-.424-.297-.5-.976-.113-1.332a.88.88 0 0 1 .615-.272zm-6.81-2.163c-.143.417-.282.832-.434 1.245 1.92.67 3.84 1.333 5.755 2.011.153-.432.296-.863.455-1.293-1.92-.67-3.841-1.335-5.759-2.011zm.426-6.874C4.973 5.436 4.313 7.32 3.642 9.2q.648.225 1.292.458 1-2.85 2.012-5.694-.648-.224-1.29-.458z"
            />
          </svg>
          {{'Draw new linestring' | translate}}
        </span>
        <span ng-switch-when="Polygon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em">
            <path
              d="M5.045-.029c-1.26-.008-2.35 1.23-2.184 2.48.06.632.43 1.202.936 1.576-.479 1.358-.968 2.714-1.45 4.072-1.257-.008-2.363 1.23-2.2 2.48.105 1.16 1.228 2.13 2.402 2.012a2.3 2.3 0 0 0 1.45-.67c1.273.53 2.553 1.056 3.823 1.59a2 2 0 0 0 0 .438c.074 1.165 1.176 2.17 2.355 2.074 1.07-.042 2.057-.932 2.138-2.012a2.3 2.3 0 0 0-.453-1.607q.654-.89 1.31-1.778c.186.04.369.047.562.031 1.067-.047 2.04-.935 2.122-2.012.11-.964-.464-1.959-1.373-2.31a2 2 0 0 0-.343-.108l-.125-1.857c.743-.313 1.326-1.036 1.388-1.856.11-.964-.463-1.958-1.372-2.309a2.2 2.2 0 0 0-.92-.172c-.08 0-.158-.008-.235 0-.841.098-1.565.75-1.84 1.545-1.26-.004-2.53-.009-3.791-.016C7.045.918 6.564.361 5.919.127a2.2 2.2 0 0 0-.874-.156m.047 1.357c.605-.03 1.103.704.827 1.248-.215.499-.934.71-1.358.343-.392-.299-.47-.94-.109-1.294a.87.87 0 0 1 .64-.297m8.08.063c.62-.026 1.099.719.796 1.263-.232.498-.967.692-1.373.297-.361-.308-.431-.939-.078-1.28a.9.9 0 0 1 .656-.28M7.246 2.919c1.257.005 2.517.024 3.775.032a2.33 2.33 0 0 0 1.622 1.513q.064.936.125 1.872c-.877.376-1.511 1.322-1.388 2.293.042.482.267.94.592 1.295-.416.567-.826 1.136-1.248 1.7a2 2 0 0 0-.67-.109v.016c-.632-.012-1.235.287-1.654.748-1.26-.525-2.517-1.063-3.775-1.59.005-.043.013-.083.015-.126a2.27 2.27 0 0 0-.967-2.074q.707-2.014 1.42-4.025c.052 0 .104.005.156 0 .898-.05 1.72-.7 1.997-1.545m6.38 4.602c.62-.025 1.098.72.796 1.264-.233.497-.967.691-1.373.296-.362-.308-.432-.938-.078-1.279a.9.9 0 0 1 .655-.28M2.393 9.456c.612-.028 1.109.729.811 1.28-.228.493-.942.68-1.357.311-.377-.3-.46-.926-.11-1.28a.9.9 0 0 1 .656-.311m7.66 3.432c.615-.037 1.12.711.826 1.263-.217.48-.91.684-1.326.344-.423-.297-.495-.986-.109-1.342a.86.86 0 0 1 .609-.265"
            />
          </svg>
          {{'Draw new polygon' | translate}}
        </span>
        <span ng-switch-when="MultiPolygon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em">
            <path
              d="M5.045-.029c-1.26-.008-2.35 1.23-2.184 2.48.06.632.43 1.202.936 1.576-.479 1.358-.968 2.714-1.45 4.072-1.257-.008-2.363 1.23-2.2 2.48.105 1.16 1.228 2.13 2.402 2.012a2.3 2.3 0 0 0 1.45-.67c1.273.53 2.553 1.056 3.823 1.59a2 2 0 0 0 0 .438c.074 1.165 1.176 2.17 2.355 2.074 1.07-.042 2.057-.932 2.138-2.012a2.3 2.3 0 0 0-.453-1.607q.654-.89 1.31-1.778c.186.04.369.047.562.031 1.067-.047 2.04-.935 2.122-2.012.11-.964-.464-1.959-1.373-2.31a2 2 0 0 0-.343-.108l-.125-1.857c.743-.313 1.326-1.036 1.388-1.856.11-.964-.463-1.958-1.372-2.309a2.2 2.2 0 0 0-.92-.172c-.08 0-.158-.008-.235 0-.841.098-1.565.75-1.84 1.545-1.26-.004-2.53-.009-3.791-.016C7.045.918 6.564.361 5.919.127a2.2 2.2 0 0 0-.874-.156m.047 1.357c.605-.03 1.103.704.827 1.248-.215.499-.934.71-1.358.343-.392-.299-.47-.94-.109-1.294a.87.87 0 0 1 .64-.297m8.08.063c.62-.026 1.099.719.796 1.263-.232.498-.967.692-1.373.297-.361-.308-.431-.939-.078-1.28a.9.9 0 0 1 .656-.28M7.246 2.919c1.257.005 2.517.024 3.775.032a2.33 2.33 0 0 0 1.622 1.513q.064.936.125 1.872c-.877.376-1.511 1.322-1.388 2.293.042.482.267.94.592 1.295-.416.567-.826 1.136-1.248 1.7a2 2 0 0 0-.67-.109v.016c-.632-.012-1.235.287-1.654.748-1.26-.525-2.517-1.063-3.775-1.59.005-.043.013-.083.015-.126a2.27 2.27 0 0 0-.967-2.074q.707-2.014 1.42-4.025c.052 0 .104.005.156 0 .898-.05 1.72-.7 1.997-1.545m6.38 4.602c.62-.025 1.098.72.796 1.264-.233.497-.967.691-1.373.296-.362-.308-.432-.938-.078-1.279a.9.9 0 0 1 .655-.28M2.393 9.456c.612-.028 1.109.729.811 1.28-.228.493-.942.68-1.357.311-.377-.3-.46-.926-.11-1.28a.9.9 0 0 1 .656-.311m7.66 3.432c.615-.037 1.12.711.826 1.263-.217.48-.91.684-1.326.344-.423-.297-.495-.986-.109-1.342a.86.86 0 0 1 .609-.265"
            />
          </svg>
          {{'Draw new polygon' | translate}}
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
          <span class="fa fa-trash"></span>
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
