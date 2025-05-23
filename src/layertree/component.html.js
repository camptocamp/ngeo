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

import svgSpinner from 'gmf/icons/spinner_svg';
import svgDot from 'gmf/icons/dot_svg';
import svgLayers from 'gmf/icons/layers_svg';
import svgStackIndeterminate from 'gmf/icons/stack-indeterminate_svg';
import svgSwipe from 'gmf/icons/swipe_svg';
import svgSearchGo from 'gmf/icons/search-go_svg';

export default `<div class="gmf-layertree-root-tools" ng-if="layertreeCtrl.isRoot">
  <a
    href
    ng-if="gmfLayertreeCtrl.nodesCount() > 0 || !gmfLayertreeCtrl.gmfExternalDataSourcesManager.isEmpty()"
    ng-click="gmfLayertreeCtrl.removeAllNodes()"
  >
    <span class="fa-solid fa-trash"></span> {{'Clear all' | translate}}
  </a>
</div>
<div
  ng-if="::!layertreeCtrl.isRoot"
  id="gmf-layertree-node-{{::layertreeCtrl.uid}}"
  ng-class="[layertreeCtrl.node.children ? 'gmf-layertree-group' : 'gmf-layertree-leaf', 'gmf-layertree-depth-' + layertreeCtrl.depth, gmfLayertreeCtrl.getResolutionStyle(layertreeCtrl.node), gmfLayertreeCtrl.getNodeState(layertreeCtrl), 'gmf-layertree-node-' + layertreeCtrl.node.id]"
>
  <div
    class="ngeo-sortable-handle"
    ng-show="layertreeCtrl.depth === 1 && layertreeCtrl.parent.children.length > 1"
  >
    <i class="gmf-layertree-sortable-handle-icon fa-solid fa-ellipsis-vertical"></i>
  </div>

  <a
    ng-if="::layertreeCtrl.node.children"
    data-toggle="collapse"
    href="#gmf-layertree-layer-group-{{::layertreeCtrl.uid}}"
    aria-expanded="{{::layertreeCtrl.node.metadata.isExpanded}}"
    class="fa-solid gmf-layertree-expand-node fa-fw"
  >
  </a>

  <a
    href
    ng-click="::gmfLayertreeCtrl.toggleActive(layertreeCtrl)"
    ng-if="::!layertreeCtrl.node.children && gmfLayertreeCtrl.getLegendIconURL(layertreeCtrl)"
    class="gmf-layertree-layer-icon"
  >
    <div>
      <!--This div is required for flex issues with IE11-->
      <img
        ng-if="::(legendIconUrl=gmfLayertreeCtrl.getLegendIconURL(layertreeCtrl))"
        ng-src="{{::legendIconUrl}}"
        loading="lazy"
      />
    </div>
  </a>
  <a
    href
    ng-click="::gmfLayertreeCtrl.toggleActive(layertreeCtrl)"
    ng-if="::!layertreeCtrl.node.children && !gmfLayertreeCtrl.getLegendIconURL(layertreeCtrl)"
    class="gmf-layertree-layer-icon gmf-layertree-no-layer-icon"
    >${svgDot}</a>

  <a
    href
    ng-click="::gmfLayertreeCtrl.toggleActive(layertreeCtrl)"
    ng-if="layertreeCtrl.node.children && layertreeCtrl.layer.loading"
    class="fa-solid fa-fw custom-spinner-generic fa-spin"
    >${svgSpinner('1rem')}</a>
  <a
    href
    ng-click="::gmfLayertreeCtrl.toggleActive(layertreeCtrl)"
    ng-if="layertreeCtrl.node.children && !layertreeCtrl.layer.loading"
    class="gmf-layertree-state gmf-not-intermediate"
    >${svgLayers}</a>
  <a
    href
    ng-click="::gmfLayertreeCtrl.toggleActive(layertreeCtrl)"
    ng-if="layertreeCtrl.node.children && !layertreeCtrl.layer.loading"
    class="gmf-layertree-state gmf-intermediate"
    >${svgStackIndeterminate}</a>

  <a
    href
    data-sentry="id:{{layertreeCtrl.node.id}}"
    ng-click="::gmfLayertreeCtrl.toggleActive(layertreeCtrl)"
    class="gmf-layertree-name"
  >
    {{layertreeCtrl.node.name | translate}}
    <i
      ng-if="gmfLayertreeCtrl.gmfLayerBeingSwipe.layer && gmfLayertreeCtrl.gmfLayerBeingSwipe.layer === layertreeCtrl.layer"
      >${svgSwipe}</i>

    <i
      class="gmf-layertree-zoom"
      data-toggle="tooltip"
      data-placement="top"
      data-title="{{'Not visible at current scale. Click to zoom.'|translate}}"
      ng-click="::gmfLayertreeCtrl.zoomToResolution(layertreeCtrl); $event.preventDefault(); $event.stopPropagation();"
      ng-if="gmfLayertreeCtrl.getNodeState(layertreeCtrl) == 'on'"
      >${svgSearchGo}</i>

    <span
      ngeo-popover
      ngeo-popover-dismiss=".content"
      ng-if="gmfLayertreeCtrl.getNodeState(layertreeCtrl) !== 'off' && layertreeCtrl.node.time && layertreeCtrl.node.time.mode !== 'disabled'"
    >
      <span
        ngeo-popover-anchor
        class="fa-regular fa-clock"
        ng-click="$event.preventDefault(); $event.stopPropagation()"
        data-toggle="tooltip"
        data-placement="top"
        title="{{'Click to enter a period.'|translate}}"
      >
      </span>

      <div ngeo-popover-content>
        <gmf-datepicker
          ng-if="::layertreeCtrl.node.time.widget === 'datepicker'"
          ngeo-event
          ngeo-event-on="'change'"
          ngeo-event-model="time"
          ngeo-event-cb="gmfLayertreeCtrl.updateTimeData(layertreeCtrl, time)"
          ng-prop-time="layertreeCtrl.node.time">
        </gmf-datepicker>

        <gmf-timeslider
          ng-if="::layertreeCtrl.node.time.widget === 'slider'"
          ngeo-event
          ngeo-event-on="'change'"
          ngeo-event-model="time"
          ngeo-event-cb="gmfLayertreeCtrl.updateTimeData(layertreeCtrl, time)"
          ng-prop-time="layertreeCtrl.node.time">
        </gmf-timeslider>
      </div>
    </span>

    <span
      class="fa-solid fa-pen-to-square"
      data-toggle="tooltip"
      data-placement="right"
      title="{{'Currently editing this layer'|translate}}"
      ng-if="layertreeCtrl.properties.editing"
    >
    </span>

    <span
      class="fa-solid fa-magnet"
      ng-if="layertreeCtrl.node.metadata.snappingConfig"
      ng-class="gmfLayertreeCtrl.isSnappingActivated(layertreeCtrl) ? 'on' : 'off'"
      ng-click="gmfLayertreeCtrl.toggleSnapping(layertreeCtrl); $event.preventDefault(); $event.stopPropagation();"
      data-toggle="tooltip"
      data-placement="top"
      data-title="{{'Click to toggle snapping.'|translate}}"
    >
    </span>
  </a>

  <span class="gmf-layertree-right-buttons">
    <a href="" ng-if="::layertreeCtrl.depth == 1" ng-click="gmfLayertreeCtrl.removeNode(layertreeCtrl.node)">
      <span class="fa-solid fa-trash"></span>
    </a>

    <a
      class="gmf-layertree-node-menu-btn"
      href=""
      ng-if="::gmfLayertreeCtrl.supportsCustomization(layertreeCtrl)"
      ng-click="::gmfLayertreeCtrl.toggleNodeMenu('#gmf-layertree-node-menu-' + layertreeCtrl.uid)"
    >
      <span class="fa-solid fa-gear"></span>
    </a>

    <span
      ngeo-popover
      ng-if="::(layertreeCtrl.depth === 1 && !layertreeCtrl.node.mixed) || (layertreeCtrl.depth > 1 && layertreeCtrl.parent.node.mixed && !layertreeCtrl.node.children) || (gmfLayertreeCtrl.getLegendsObject(layertreeCtrl) && layertreeCtrl.node.metadata.legend) || layertreeCtrl.getDataSource().filtrable"
      ngeo-popover-dismiss=".content"
      ng-click="::gmfLayertreeCtrl.tagPopup(layertreeCtrl.node)"
    >
      <span ngeo-popover-anchor class="extra-actions fa-solid fa-gear" id="popup-id-{{layertreeCtrl.node.ol_uid}}">
      </span>

      <div ngeo-popover-content>
        <ul>
          <li ng-if="::gmfLayertreeCtrl.supportsOpacityChange(layertreeCtrl)">
            <i class="fa-solid fa-droplet fa-fw"></i>
            <span>{{'Opacity'|translate}}</span>
            <input
              class="input-action"
              type="range"
              min="0"
              max="1"
              step="0.01"
              ng-model="layertreeCtrl.layer.opacity"
            />
          </li>

          <li
            ng-if="::gmfLayertreeCtrl.getLegendsObject(layertreeCtrl) && layertreeCtrl.node.metadata.legend"
          >
            <i class="fa-solid fa-table-list fa-fw"></i>
            <a
              ng-click="::gmfLayertreeCtrl.toggleNodeLegend('#gmf-layertree-node-' + layertreeCtrl.uid + '-legend'); popoverCtrl.dismissPopover()"
              href=""
            >
              {{'Show/hide legend'|translate}}
            </a>
          </li>

          <li ng-if="::gmfLayertreeCtrl.supportsOpacityChange(layertreeCtrl)">
            <i
              >${svgSwipe}</i>
            <a
              ng-click="::gmfLayertreeCtrl.toggleSwipeLayer(layertreeCtrl); popoverCtrl.dismissPopover()"
              href=""
              ng-model="layertreeCtrl.layer"
            >
              {{'Swipe with this layer'| translate}}
            </a>
          </li>

          <li ng-if="gmfLayertreeCtrl.isFiltrable(layertreeCtrl)">
            <i class="fa-solid fa-filter fa-fw"></i>
            <a ng-click="gmfLayertreeCtrl.toggleFiltrableDataSource(layertreeCtrl.getDataSource())" href="">
              {{'Filter'|translate}}
            </a>
          </li>

          <li
            class="more-options-info"
            ng-if="::gmfLayertreeCtrl.getFirstParentWithLayerFunctions(layertreeCtrl) !== null"
          >
            <span>{{'More options at the group level'|translate}}</span>
          </li>
        </ul>
      </div>
    </span>

    <span class="gmf-layertree-metadata" ng-if="::layertreeCtrl.node.metadata.metadataUrl">
      <span ng-if="::gmfLayertreeCtrl.options.openLinksInNewWindow === true">
        <a
          title="{{'More information'|translate}}"
          href="{{::layertreeCtrl.node.metadata.metadataUrl}}"
          target="blank_"
        >
        </a>
      </span>

      <span ng-if="::gmfLayertreeCtrl.options.openLinksInNewWindow !== true">
        <a
          title="{{'More information'|translate}}"
          href=""
          ng-click="gmfLayertreeCtrl.displayMetadata(layertreeCtrl)"
        >
        </a>
      </span>
    </span>
  </span>
</div>

<div
  class="gmf-layertree-node-menu d-none"
  id="gmf-layertree-node-menu-{{::layertreeCtrl.uid}}"
  ng-class="'gmf-layertree-node-menu-' + layertreeCtrl.node.id"
  ng-if="::gmfLayertreeCtrl.supportsCustomization(layertreeCtrl)"
>
  <div
    class="more-options-info"
    ng-if="::gmfLayertreeCtrl.getFirstParentWithLayerFunctions(layertreeCtrl) !== null"
  >
    <span>{{'More options at the group level'|translate}}</span>
  </div>

  <div ng-if="::gmfLayertreeCtrl.supportsOpacityChange(layertreeCtrl)">
    <i class="fa-solid fa-droplet fa-fw"></i>
    <span>{{'Opacity'|translate}}</span>
    <input
      class="input-action"
      type="range"
      min="0"
      max="1"
      step="0.01"
      ng-model="layertreeCtrl.layer.opacity"
    />
  </div>

  <a
    class="gmf-layertree-node-menu-togglelegend"
    ng-if="::gmfLayertreeCtrl.supportsLegend(layertreeCtrl)"
    ng-click="::gmfLayertreeCtrl.toggleNodeLegend('#gmf-layertree-node-' + layertreeCtrl.uid + '-legend')"
    href=""
  >
    <span class="fa-solid fa-table-list"> </span>
    {{'Show/hide legend'|translate}}
  </a>
</div>
<div
  ng-if="::!layertreeCtrl.isRoot && gmfLayertreeCtrl.getLegendsObject(layertreeCtrl) && layertreeCtrl.node.metadata.legend"
  id="gmf-layertree-node-{{::layertreeCtrl.uid}}-legend"
  class="gmf-layertree-legend"
  ng-class="[gmfLayertreeCtrl.getNodeState(layertreeCtrl), layertreeCtrl.node.metadata.isLegendExpanded ? 'show' : '']"
>
  <a
    title="{{'Hide legend'|translate}}"
    ng-click="::gmfLayertreeCtrl.toggleNodeLegend('#gmf-layertree-node-' + layertreeCtrl.uid + '-legend')"
    href=""
  >
    {{'Hide legend'|translate}}
  </a>
  <div ng-if="gmfLayertreeCtrl.isNodeLegendVisible('#gmf-layertree-node-' + layertreeCtrl.uid + '-legend')">
    <div ng-repeat="(title, url) in gmfLayertreeCtrl.getLegendsObject(layertreeCtrl)">
      <p ng-if="gmfLayertreeCtrl.getNumberOfLegendsObject(layertreeCtrl) > 1">{{title|translate}}</p>
      <img ng-src="{{url}}" />
    </div>
  </div>
</div>

<ul
  class="gmf-layertree-root-external-datasources"
  ng-if="layertreeCtrl.isRoot && (gmfLayertreeCtrl.gmfExternalDataSourcesManager.wmsGroups.length || gmfLayertreeCtrl.gmfExternalDataSourcesManager.wmtsGroups.length || gmfLayertreeCtrl.gmfExternalDataSourcesManager.fileGroup.dataSources.length)"
>
  <gmf-datasourcegrouptree
    class="gmf-layertree-node gmf-layertree-depth-1"
    ng-repeat="wmtsGroup in gmfLayertreeCtrl.gmfExternalDataSourcesManager.wmtsGroups"
    group="wmtsGroup"
  >
  </gmf-datasourcegrouptree>
  <gmf-datasourcegrouptree
    class="gmf-layertree-node gmf-layertree-depth-1"
    ng-repeat="wmsGroup in gmfLayertreeCtrl.gmfExternalDataSourcesManager.wmsGroups"
    group="wmsGroup"
    get-scale="gmfLayertreeCtrl.getScale_()"
  >
  </gmf-datasourcegrouptree>
  <gmf-datasourcegrouptree
    class="gmf-layertree-node gmf-layertree-depth-1"
    ng-if="gmfLayertreeCtrl.gmfExternalDataSourcesManager.fileGroup.dataSources.length"
    group="gmfLayertreeCtrl.gmfExternalDataSourcesManager.fileGroup"
  >
  </gmf-datasourcegrouptree>
</ul>

<ul
  id="gmf-layertree-layer-group-{{::layertreeCtrl.uid}}"
  ng-if="::layertreeCtrl.node.children"
  ng-class="{collapse: !(layertreeCtrl.isRoot || gmfLayertreeCtrl.options.isExpanded), show: layertreeCtrl.node.metadata.isExpanded}"
  ngeo-sortable="::layertreeCtrl.isRoot && layertreeCtrl.node.children"
  ngeo-sortable-options="{handleClassName: 'ngeo-sortable-handle', draggerClassName: 'gmf-layertree-dragger', placeholderClassName : 'gmf-layertree-curr-drag-item'}"
  ngeo-sortable-callback="::gmfLayertreeCtrl.afterReorder"
  ngeo-sortable-callback-ctx="::gmfLayertreeCtrl"
>
  <li
    class="gmf-layertree-node"
    ng-repeat="node in layertreeCtrl.node.children"
    ng-class="'gmf-layertree-depth-' + layertreeCtrl.depth"
    gmf-layertree-node="node"
    gmf-layertree-node-notroot
    gmf-layertree-node-map="layertreeCtrl.map"
    gmf-layertree-node-nodelayerexpr="layertreeCtrl.nodelayerExpr"
    gmf-layertree-node-listenersexpr="layertreeCtrl.listenersExpr"
  ></li>
</ul>`;
