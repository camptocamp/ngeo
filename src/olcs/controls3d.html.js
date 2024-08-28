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

export default `<div class="ngeo-tools">
  <div class="ngeo-angle"><div class="ngeo-angle3d"></div></div>
  <button class="ngeo-left ngeo-tilt-left" ng-click="$ctrl.tilt(5)"></button>
  <button class="ngeo-right ngeo-tilt-right" ng-click="$ctrl.tilt(-5)"></button>
</div>
<div class="ngeo-zoom">
  <button class="ol-zoom-in" ng-click="$ctrl.zoom(1)"></button>
  <button class="ol-zoom-out" ng-click="$ctrl.zoom(-1)"></button>
</div>
<div class="ngeo-tools">
  <div class="ngeo-rotation"><div class="ngeo-rotation3d"></div></div>
  <button class="ngeo-left" ng-click="$ctrl.rotate(-15)"></button>
  <button class="ngeo-right" ng-click="$ctrl.rotate(15)"></button>
</div>`;
