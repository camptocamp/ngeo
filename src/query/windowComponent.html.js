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

import svgSpinner from 'gmf/icons/spinner_svg';

export default `<div class="spinner-window" ng-if="ctrl.isLoading">
  <i class="fa-solid fa-spin"
    >${svgSpinner('3rem')}</i>
</div>

<div
  class="gmf-displayquerywindow"
  ng-class="{'desktop': ctrl.desktop, 'mobile': !ctrl.desktop}"
  ng-show="ctrl.open"
>
  <button
    class="collapse-button"
    type="button"
    ng-show="::!ctrl.desktop"
    ngeo-swipe-up="ctrl.collapsed = false"
    ngeo-swipe-down="ctrl.collapsed = true"
    ngeo-swipe-disable-mouse
    ng-click="ctrl.collapsed = !ctrl.collapsed"
    ng-class="[ctrl.collapsed ? 'collapse-button-up' : 'collapse-button-down']"
  ></button>

  <div
    class="windowcontainer"
    ng-swipe-disable-mouse
    ng-swipe-left="ctrl.next()"
    ng-swipe-right="ctrl.previous()"
  >
    <button type="button" class="btn fa-solid fa-xmark close" ng-click="ctrl.close()"></button>

    <div
      class="animation-container"
      ng-class="[ctrl.collapsed ? '' : 'animation-container-detailed', ctrl.isNext ? 'next' : 'previous']"
    >
      <div ng-animate-swap="ctrl.animate" class="slide-animation gmf-animatable">
        <div class="header ui-draggable-handle">
          <p class="title">{{ctrl.source.label | translate}}</p>
          <p class="subtitle">{{ctrl.getFeatureValues()[ctrl.source.identifierAttributeField]}}</p>
        </div>

        <div class="details">
          <table>
            <tr
              ng-repeat="(key, value) in ctrl.getFeatureValues()"
              ng-if="value !== undefined || ctrl.options.displayNullAttributes == true"
            >
              <td class="details-key" ng-bind-html="key | translate | ngeoTrustHtml"></td>
              <td class="details-value" ng-bind-html="value | removeCDATA | ngeoTrustHtmlAuto"></td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="navigate">
      <div class="placeholder">
        <button
          type="button"
          class="previous btn"
          ng-disabled="ctrl.isFirst()"
          ng-show="ctrl.getResultLength() > 1"
          ng-click="ctrl.previous()"
        >
          <span ng-show="::ctrl.desktop">{{'Prev.' | translate}}</span>
        </button>
      </div>

      <div class="results">
        <span ng-show="::!ctrl.desktop">{{'Result' | translate}}</span>
        <span>{{ctrl.currentResult + 1}}</span>
        <span>/</span>
        <span>{{ctrl.getResultLength()}}</span>

        <div ng-show="::ctrl.desktop" class="dropup">
          <button
            type="button"
            class="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="fa-solid fa-filter"></span>
          </button>

          <ul class="dropdown-menu dropdown-menu-right" role="menu">
            <li>
              <a href="#" ng-click="ctrl.setSelectedSource(null)">
                <i class="fa-solid fa-fw" ng-class="{'fa-check': ctrl.selectedSource === null}"> </i>
                <span>{{'All layers' | translate}} ({{ctrl.ngeoQueryResult.total}})</span>
              </a>
            </li>

            <li role="separator" class="divider"></li>

            <li
              ng-repeat-start="source in ctrl.ngeoQueryResult.sources"
              ng-repeat-end
              ng-class="{'disabled': source.features.length <= 0}"
            >
              <a href="#" ng-click="ctrl.setSelectedSource(source)">
                <i class="fa-solid fa-fw" ng-class="{'fa-check': ctrl.selectedSource === source}"> </i>
                <span>{{source.label | translate}} ({{source.features.length}})</span>
              </a>
            </li>
          </ul>
        </div>

        <div ng-show="::ctrl.desktop" class="dropup">
          <button
            type="button"
            class="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="fa-solid fa-download"></span>
          </button>

          <ul class="dropdown-menu dropdown-menu-right" role="menu">
            <li
              ng-repeat-start="source in ctrl.ngeoQueryResult.sources"
              ng-repeat-end
              ng-class="{'disabled': source.features.length <= 0}"
            >
              <a href="#" ng-click="ctrl.downloadCSV(source)">
                <span>{{'Export' | translate}} {{source.label | translate}}</span>
              </a>
            </li>
          </ul>
        </div>

        <div ng-show="::ctrl.desktop" class="d-inline">
          <button
            class="btn btn-default"
            title="{{'Zoom to current feature' | translate}}"
            ng-click="ctrl.zoomToCurrentFeature()"
          >
            <i class="fa fa-search-plus"></i>
          </button>
        </div>
      </div>

      <div class="placeholder">
        <button
          type="button"
          class="next btn"
          ng-disabled="ctrl.isLast()"
          ng-show="ctrl.getResultLength() > 1"
          ng-click="ctrl.next()"
        >
          <span ng-show="::ctrl.desktop">{{'Next' | translate}}</span>
        </button>
      </div>
    </div>
  </div>
</div>`;
