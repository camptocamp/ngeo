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

export default `<div class="ngeo-displaywindow" ng-show="$ctrl.open" title="">
  <div class="windowcontainer" ng-style="$ctrl.style">
    <button type="button" class="btn fa-xmark close" ng-click="$ctrl.close()"></button>

    <div class="animation-container">
      <div class="slide-animation">
        <div class="header ui-draggable-handle" ng-if="$ctrl.title !== null">
          <p class="title">{{$ctrl.title | translate}}</p>
        </div>
        <div class="details content" ng-if="$ctrl.content" ng-bind-html="$ctrl.content"></div>
        <div class="details iframe" ng-if="$ctrl.url !== null">
          <iframe
            frameborder="0"
            type="text/html"
            height="100%"
            width="100%"
            ng-src="{{ $ctrl.urlTrusted }}"
          ></iframe>
        </div>
        <div class="content-template-container"></div>
      </div>
    </div>
  </div>
</div>`;
