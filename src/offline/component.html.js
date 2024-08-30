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

export default `<div class="main-button">
  <span ng-if="!$ctrl.hasData()">
    <div class="no-data fas fa-arrow-circle-down" ng-click="$ctrl.toggleViewExtentSelection()"></div>
  </span>
  <span ng-if="$ctrl.hasData()">
    <div class="with-data fas fa-arrow-circle-down" ng-click="$ctrl.showMenu()"></div>
  </span>
</div>

<div
  ng-if="$ctrl.selectingExtent && !$ctrl.networkStatus.isDisconnected()"
  class="validate-extent btn btn-primary"
>
  <div ng-if="!$ctrl.downloading" ng-click="$ctrl.computeSizeAndDisplayAlertLoadData()" translate>
    Save map
  </div>
  <div ng-if="$ctrl.downloading" ng-click="$ctrl.askAbortDownload()" translate>Abort</div>
</div>

<div ng-if="$ctrl.downloading" class="in-progress">
  <div>{{$ctrl.progressPercents}}%</div>
</div>

<ngeo-modal ng-model="$ctrl.menuDisplayed">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="{{'Close' | translate}}">
      <span aria-hidden="true">&times;</span>
    </button>
    <h4 class="modal-title" translate>Offline map</h4>
  </div>
  <div class="modal-body">
    <div ng-if="$ctrl.hasData()">
      <button
        type="button"
        class="extent-zoom btn btn-default"
        ng-if="!$ctrl.offlineMode.isEnabled()"
        ng-click="$ctrl.activateOfflineMode()"
        translate
      >
        Activate offline mode
      </button>
      <button
        type="button"
        class="extent-zoom btn btn-default"
        ng-if="$ctrl.offlineMode.isEnabled() && !$ctrl.networkStatus.isDisconnected()"
        ng-click="$ctrl.deactivateOfflineMode()"
        translate
      >
        Deactivate offline mode
      </button>

      <button
        type="button"
        class="extent-show btn btn-default"
        ng-if="$ctrl.offlineMode.isEnabled()"
        ng-click="$ctrl.toggleExtentVisibility()"
      >
        <span ng-if="$ctrl.isExtentVisible()" translate>Hide extent</span>
        <span ng-if="!$ctrl.isExtentVisible()" translate>Show extent</span>
      </button>
      <button
        type="button"
        class="delete btn btn-default"
        ng-if="!$ctrl.networkStatus.isDisconnected()"
        ng-click="$ctrl.displayAlertDestroyData = true"
        translate
      >
        Delete data
      </button>
    </div>
    <div ng-if="!$ctrl.hasData() && !$ctrl.networkStatus.isDisconnected()">
      <button
        type="button"
        class="new-data btn btn-default"
        ng-click="$ctrl.toggleViewExtentSelection()"
        translate
      >
        Save new map
      </button>
    </div>
  </div>
</ngeo-modal>

<ngeo-modal ng-model="$ctrl.displayAlertLoadData">
  <div class="modal-header">
    <h4 class="modal-title" translate>Warning</h4>
  </div>
  <div class="modal-body">
    <p translate>
      ~{{$ctrl.estimatedLoadDataSize}}MB of maps will be downloaded (until scale 1:25'000) - Don't lock your
      device or navigate away from this site during the download process. Deactivate "private" mode of your
      browser.
    </p>
    <button
      type="button"
      class="validate btn btn-primary"
      data-dismiss="modal"
      ng-click="$ctrl.validateExtent()"
      translate
    >
      Ok
    </button>
    <button type="button" class="delete btn btn-default" data-dismiss="modal" translate>Cancel</button>
  </div>
</ngeo-modal>

<ngeo-modal ng-model="$ctrl.displayAlertNoLayer">
  <div class="modal-header">
    <h4 class="modal-title" translate>Warning</h4>
  </div>
  <div class="modal-body">
    <p translate>No maps selected for saving.</p>
    <button type="button" class="delete btn btn-default" data-dismiss="modal" translate>Ok</button>
  </div>
</ngeo-modal>

<ngeo-modal ng-model="$ctrl.displayAlertDestroyData">
  <div class="modal-header">
    <h4 class="modal-title" translate>Warning</h4>
  </div>
  <div class="modal-body">
    <p translate>Do you really want to remove your data ?</p>
    <button
      type="button"
      class="validate btn btn-primary"
      data-dismiss="modal"
      ng-click="$ctrl.deleteData()"
      translate
    >
      Ok
    </button>
    <button type="button" class="delete btn btn-default" data-dismiss="modal" translate>Cancel</button>
  </div>
</ngeo-modal>

<ngeo-modal ng-model="$ctrl.displayAlertAbortDownload">
  <div class="modal-header">
    <h4 class="modal-title" translate>Warning</h4>
  </div>
  <div class="modal-body">
    <p translate>Do you really want to remove your data ?</p>
    <button
      type="button"
      class="validate btn btn-primary"
      data-dismiss="modal"
      ng-click="$ctrl.abortDownload()"
      translate
    >
      Ok
    </button>
    <button
      type="button"
      class="delete btn btn-default"
      data-dismiss="modal"
      ng-click="$ctrl.followDownloadProgression_()"
      translate
    >
      Cancel
    </button>
  </div>
</ngeo-modal>`;
