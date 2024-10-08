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

export default `<ul>
  <li ng-repeat="layer in ::$ctrl.layer.Layer" ng-show="layer._visible">
    <div class="gmf-wmscapabilitylayertreenode-header">
      <span
        class="gmf-wmscapabilitylayertreenode-popover-container"
        ng-if="::(layer.Name !== undefined || layer.Abstract !== undefined)"
        ngeo-popover
        ngeo-popover-dismiss=".content"
        ngeo-popover-placement="left"
      >
        <span ngeo-popover-anchor class="fa-solid fa-gear gmf-wmscapabilitylayertreenode-actions"> </span>

        <div class="gmf-wmscapabilitylayertreenode-popover-content" ngeo-popover-content>
          <ul>
            <li ng-if="::(layer.Name !== undefined)">
              <i class="fa-solid fa-plus fa-fw"></i>
              <a href="" ng-click="$ctrl.createAndAddDataSource(layer); popoverCtrl.dismissPopover()">
                <span translate>Add layer</span>
              </a>
            </li>

            <li ng-if="::(layer.Abstract !== undefined)">
              <i class="fa-solid fa-table-list fa-fw"></i>
              <a
                aria-expanded="false"
                data-toggle="collapse"
                href="#gmf-wmscapabilitylayertreenode-description-{{::$ctrl.getUid(layer)}}"
                ng-click="popoverCtrl.dismissPopover()"
              >
                <span translate>Open/Close description</span>
              </a>
            </li>
          </ul>
        </div>
      </span>

      <a
        aria-expanded="{{ layer._expanded }}"
        class="fa-solid gmf-wmscapabilitylayertreenode-expand-node fa-fw"
        data-toggle="collapse"
        href="#gmf-wmscapabilitylayertreenode-children-{{::$ctrl.getUid(layer)}}"
        ng-if="::(layer.Layer !== undefined && layer.Layer.length)"
      ></a>

      <span
        ng-if="::(layer.Layer !== undefined && layer.Layer.length)"
        class="fa-solid fa-fw gmf-wmscapabilitylayertreenode-group"
        >${svgLayers}</span>

      <a
        class="fa-solid fa-circle-thin gmf-wmscapabilitylayertreenode-no-icon fa-fw"
        ng-if="::(layer.Layer === undefined || layer.Layer.length === 0)"
      ></a>

      <span class="gmf-wmscapabilitylayertreenode-title" ng-if="!layer._searchMatch"
        >{{ ::layer.Title }}</span
      >
      <span class="gmf-wmscapabilitylayertreenode-title" ng-if="layer._searchMatch"
        >{{ layer._searchPrefix }}<span class="highlight">{{ layer._searchMatch }}</span>{{
        layer._searchSuffix }}</span
      >

      <div
        class="collapse gmf-wmscapabilitylayertreenode-description"
        id="gmf-wmscapabilitylayertreenode-description-{{::$ctrl.getUid(layer)}}"
        ng-if="::(layer.Abstract !== undefined)"
      >
        <a
          aria-expanded="false"
          class="gmf-wmscapabilitylayertreenode-description-toggle"
          data-toggle="collapse"
          href="#gmf-wmscapabilitylayertreenode-description-{{::$ctrl.getUid(layer)}}"
        >
          <span translate>Hide description</span>
        </a>
        <span class="gmf-wmscapabilitylayertreenode-description-content">{{ ::layer.Abstract }}</span>
      </div>
    </div>

    <gmf-wmscapabilitylayertreenode
      class="collapse"
      ng-class="layer._expanded ? 'show' : ''"
      id="gmf-wmscapabilitylayertreenode-children-{{::$ctrl.getUid(layer)}}"
      capabilities="::$ctrl.capabilities"
      layer="::layer"
      url="::$ctrl.url"
      ng-if="::(layer.Layer !== undefined)"
    >
    </gmf-wmscapabilitylayertreenode>
  </li>
</ul>`;
