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

import svgLayers from 'gmf/icons/layers_svg';

export default `<div class="gmf-layertree-group gmf-layertree-depth-1 {{$ctrl.group.visibilityState}}">
  <a
    data-toggle="collapse"
    href="#gmf-layertree-layer-group-{{::$ctrl.getGroupUid()}}"
    aria-expanded="true"
    class="fa gmf-layertree-expand-node fa-fw"
  >
  </a>

  <a class="fa fa-fw gmf-layertree-state" href ng-click="$ctrl.toggle()"
    >${svgLayers}</a>

  <a class="gmf-layertree-name" href ng-click="$ctrl.toggle()">
    <span>{{$ctrl.group.title | translate}}</span>
  </a>

  <span class="gmf-layertree-right-buttons">
    <a href="" ng-click="$ctrl.remove()">
      <span class="fa fa-trash"></span>
    </a>
  </span>
</div>

<ul id="gmf-layertree-layer-group-{{::$ctrl.getGroupUid()}}" class="collapse in show">
  <li
    class="gmf-layertree-node gmf-layertree-depth-2"
    ng-class="[dataSource.visible ? 'on' : 'off']"
    ng-repeat="dataSource in $ctrl.group.dataSources"
  >
    <div class="gmf-layertree-leaf">
      <a
        href
        ng-click="$ctrl.toggleDataSource(dataSource)"
        class="gmf-layertree-layer-icon gmf-layertree-no-layer-icon"
      >
      </a>
      <a class="gmf-layertree-name" href ng-click="$ctrl.toggleDataSource(dataSource)">
        <span>{{dataSource.name | translate}}</span>
      </a>

      <span class="gmf-layertree-right-buttons">
        <a href="" ng-click="$ctrl.removeDataSource(dataSource)">
          <span class="fa fa-trash"></span>
        </a>
        <a class="gmf-layertree-node-menu-btn" href="" ng-if="ctrl.getLegendUrl(dataSource.legend)">
          <span class="fa fa-gear"></span>
        </a>
        <span ngeo-popover ng-if="$ctrl.getLegendUrl(dataSource.legend)" ngeo-popover-dismiss=".content">
          <span ngeo-popover-anchor class="extra-actions fa fa-gear" id="popup-id-{{dataSource.id}}"> </span>

          <div ngeo-popover-content>
            <ul>
              <li ng-if="$ctrl.getLegendUrl(dataSource.legend)">
                <i class="fa fa-table-list fa-fw"></i>
                <a
                  ng-click="$ctrl.toggleNodeLegend(dataSource.id + 'legend'); popoverCtrl.dismissPopover()"
                  href=""
                >
                  {{'Show/hide legend'|translate}}
                </a>
              </li>
            </ul>
          </div>
        </span>
      </span>
    </div>
    <div id="{{dataSource.id + 'legend'}}" class="gmf-layertree-legend">
      <a
        title="{{'Hide legend'|translate}}"
        ng-click="$ctrl.toggleNodeLegend(dataSource.id + 'legend')"
        href=""
      >
        {{'Hide legend'|translate}}
      </a>
      <div ng-if="$ctrl.getLegendUrl(dataSource.legend)" class="gmf-imported-legend">
        <div class="gmf-legend-image">
          <img ng-src="{{$ctrl.getLegendUrl(dataSource.legend)}}" />
        </div>
      </div>
    </div>
  </li>
</ul>`;
