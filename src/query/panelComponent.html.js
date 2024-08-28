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

export default `<div class="btn-group">
  <button
    data-toggle="tooltip"
    title="{{'While active, click on the map to issue a query' | translate}}"
    class="btn btn-default"
    ng-class="{active: $ctrl.ngeoQueryModeSelector.mode === 'click'}"
    ng-click="$ctrl.ngeoQueryModeSelector.mode = 'click'"
  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em"><path d="M7.948 10.25c-1.26.009-2.349-1.23-2.184-2.48.11-1.153 1.218-2.124 2.387-2.013 1.064.06 2.022.956 2.09 2.028.1.975-.492 1.973-1.42 2.31a2.2 2.2 0 0 1-.873.155m.047-1.357c.606.03 1.103-.703.827-1.248-.215-.499-.934-.709-1.357-.343-.393.3-.47.941-.11 1.295.16.18.395.295.64.296"/></svg></button>
  <button
    data-toggle="tooltip"
    title="{{'While active, click twice the map to issue a query using a box' | translate}}"
    class="btn btn-default"
    ng-class="{active: $ctrl.ngeoQueryModeSelector.mode === 'drawbox'}"
    ng-click="$ctrl.ngeoQueryModeSelector.mode = 'drawbox'"
  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em"><path d="M2.317 14.491a2.2 2.2 0 0 1-.874-.156C.257 13.91-.343 12.38.242 11.262a2.27 2.27 0 0 1 1.28-1.139l-.016-4.258c-.02-.008-.042-.008-.063-.016C.258 5.424-.343 3.894.243 2.776.74 1.731 2.115 1.194 3.174 1.7c.572.246 1.007.747 1.217 1.326L11.6 3.01c.028-.077.055-.16.093-.234.5-1.045 1.874-1.582 2.933-1.076.979.422 1.584 1.59 1.28 2.62a2.3 2.3 0 0 1-1.467 1.576l.016 4.228c.057.02.115.035.171.062.979.422 1.584 1.59 1.28 2.621-.24.95-1.151 1.688-2.137 1.685a2.2 2.2 0 0 1-.874-.156c-.625-.224-1.083-.757-1.295-1.373l-7.207.015c-.302.864-1.151 1.516-2.075 1.513zm-.14-1.357c.508.052 1.045-.42.982-.951-.03-.542-.63-.978-1.154-.78-.472.146-.764.713-.547 1.17.089.223.27.413.5.499a.8.8 0 0 0 .218.062m11.45 0c.509.052 1.045-.42.982-.951-.03-.542-.63-.978-1.154-.78-.472.146-.764.713-.546 1.17.088.223.27.413.499.499a.8.8 0 0 0 .218.062M4.39 11.527l7.192-.015q.045-.128.109-.25c.259-.542.747-.944 1.31-1.139V5.88c-.036-.012-.073-.017-.109-.031-.628-.225-1.085-.768-1.295-1.388H4.407a2.33 2.33 0 0 1-1.42 1.435l.015 4.227c.056.02.118.037.172.063.576.248 1.009.757 1.217 1.342zm-2.215-6.88c.51.052 1.046-.42.983-.95-.03-.543-.63-.979-1.154-.781-.472.146-.764.714-.547 1.17.089.224.27.414.5.5a.8.8 0 0 0 .218.062m11.45 0c.51.052 1.046-.42.983-.95-.03-.543-.63-.979-1.154-.781-.472.146-.764.714-.546 1.17.088.224.27.414.499.5a.8.8 0 0 0 .218.062"/></svg></button>
  <button
    data-toggle="tooltip"
    title="{{'While active, click on the map multiple times to draw a polygon, which will issue a query using it' | translate}}"
    class="btn btn-default"
    ng-class="{active: $ctrl.ngeoQueryModeSelector.mode === 'drawpolygon'}"
    ng-click="$ctrl.ngeoQueryModeSelector.mode = 'drawpolygon'"
  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em"><path d="M5.045-.029c-1.26-.008-2.35 1.23-2.184 2.48.06.632.43 1.202.936 1.576-.479 1.358-.968 2.714-1.45 4.072-1.257-.008-2.363 1.23-2.2 2.48.105 1.16 1.228 2.13 2.402 2.012a2.3 2.3 0 0 0 1.45-.67c1.273.53 2.553 1.056 3.823 1.59a2 2 0 0 0 0 .438c.074 1.165 1.176 2.17 2.355 2.074 1.07-.042 2.057-.932 2.138-2.012a2.3 2.3 0 0 0-.453-1.607q.654-.89 1.31-1.778c.186.04.369.047.562.031 1.067-.047 2.04-.935 2.122-2.012.11-.964-.464-1.959-1.373-2.31a2 2 0 0 0-.343-.108l-.125-1.857c.743-.313 1.326-1.036 1.388-1.856.11-.964-.463-1.958-1.372-2.309a2.2 2.2 0 0 0-.92-.172c-.08 0-.158-.008-.235 0-.841.098-1.565.75-1.84 1.545-1.26-.004-2.53-.009-3.791-.016C7.045.918 6.564.361 5.919.127a2.2 2.2 0 0 0-.874-.156m.047 1.357c.605-.03 1.103.704.827 1.248-.215.499-.934.71-1.358.343-.392-.299-.47-.94-.109-1.294a.87.87 0 0 1 .64-.297m8.08.063c.62-.026 1.099.719.796 1.263-.232.498-.967.692-1.373.297-.361-.308-.431-.939-.078-1.28a.9.9 0 0 1 .656-.28M7.246 2.919c1.257.005 2.517.024 3.775.032a2.33 2.33 0 0 0 1.622 1.513q.064.936.125 1.872c-.877.376-1.511 1.322-1.388 2.293.042.482.267.94.592 1.295-.416.567-.826 1.136-1.248 1.7a2 2 0 0 0-.67-.109v.016c-.632-.012-1.235.287-1.654.748-1.26-.525-2.517-1.063-3.775-1.59.005-.043.013-.083.015-.126a2.27 2.27 0 0 0-.967-2.074q.707-2.014 1.42-4.025c.052 0 .104.005.156 0 .898-.05 1.72-.7 1.997-1.545m6.38 4.602c.62-.025 1.098.72.796 1.264-.233.497-.967.691-1.373.296-.362-.308-.432-.938-.078-1.279a.9.9 0 0 1 .655-.28M2.393 9.456c.612-.028 1.109.729.811 1.28-.228.493-.942.68-1.357.311-.377-.3-.46-.926-.11-1.28a.9.9 0 0 1 .656-.311m7.66 3.432c.615-.037 1.12.711.826 1.263-.217.48-.91.684-1.326.344-.423-.297-.495-.986-.109-1.342a.86.86 0 0 1 .609-.265"/></svg></button>
</div>

<div class="ngeo-query-panel-actions">
  <div class="form-check">
    <label class="form-check-label">
      <input
        type="radio"
        class="form-check-input"
        ng-model="$ctrl.ngeoQueryModeSelector.action"
        value="add"
      />
      <span>{{'Add' | translate }}</span>
    </label>
  </div>
  <div class="form-check">
    <label class="form-check-label">
      <input
        type="radio"
        class="form-check-input"
        ng-model="$ctrl.ngeoQueryModeSelector.action"
        value="remove"
      />
      <span>{{'Remove' | translate }}</span>
    </label>
  </div>
  <div class="form-check">
    <label class="form-check-label">
      <input
        type="radio"
        class="form-check-input"
        ng-model="$ctrl.ngeoQueryModeSelector.action"
        value="replace"
      />
      <span>{{'Replace' | translate }}</span>
    </label>
  </div>
</div>

<div class="ngeo-query-panel-help">
  <span ng-show="$ctrl.ngeoQueryModeSelector.mode === 'click'"
    >{{'Query by "click" on the map is currently active. All queryable layers, including WMS and WFS, will return results.' | translate }}</span
  >
  <span ng-show="$ctrl.ngeoQueryModeSelector.mode === 'drawbox'"
    >{{'Query by "box" on the map is currently active. Not all queryable layers will return results. Only those that support WFS will do so.' | translate }}</span
  >
  <span ng-show="$ctrl.ngeoQueryModeSelector.mode === 'drawpolygon'"
    >{{'Query by "polygon" on the map is currently active. Not all queryable layers will return results. Only those that support WFS will do so.' | translate }}</span
  >
</div>`;
