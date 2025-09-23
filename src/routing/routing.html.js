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

export default `<div class="ngeo-routing">
  <div class="ngeo-routing-start form-group">
    <ngeo-routing-feature
      ngeo-routing-feature-map="$ctrl.map"
      ngeo-routing-feature-feature="$ctrl.startFeature_"
      ngeo-routing-feature-fill-color="$ctrl.colors.startFill"
      ngeo-routing-feature-stroke-color="$ctrl.colors.startStroke"
      ngeo-routing-feature-on-change="$ctrl.handleChange"
    >
    </ngeo-routing-feature>
  </div>

  <div class="ngeo-routing-vias form-group" ng-repeat="(index, via) in $ctrl.viaArray">
    <div class="form-inline">
      <div class="form-group">
        <ngeo-routing-feature
          ngeo-routing-feature-map="$ctrl.map"
          ngeo-routing-feature-feature="via.feature"
          ngeo-routing-feature-fill-color="$ctrl.colors.viaFill"
          ngeo-routing-feature-stroke-color="$ctrl.colors.viaStroke"
          ngeo-routing-feature-on-change="$ctrl.handleChange"
        >
        </ngeo-routing-feature>
      </div>
      <button type="button" class="btn prime delete-via" ng-click="$ctrl.deleteVia(index)">
        <span class="fa-solid fa-trash"></span>
      </button>
    </div>
  </div>

  <div class="ngeo-routing-destination form-group">
    <ngeo-routing-feature
      ngeo-routing-feature-map="$ctrl.map"
      ngeo-routing-feature-feature="$ctrl.targetFeature_"
      ngeo-routing-feature-fill-color="$ctrl.colors.destinationFill"
      ngeo-routing-feature-stroke-color="$ctrl.colors.destinationStroke"
      ngeo-routing-feature-on-change="$ctrl.handleChange"
    >
    </ngeo-routing-feature>
  </div>

  <div class="form-group fill">
    <button type="button" class="btn prime" ng-click="$ctrl.clearRoute()">
      <span class="fa-solid fa-trash"></span> <span translate>Clear</span>
    </button>
    <button type="button" class="btn prime" ng-click="$ctrl.reverseRoute()">
      <span class="fa-solid fa-arrow-right-arrow-left"></span> <span translate>Reverse</span>
    </button>
    <button type="button" class="btn prime" ng-click="$ctrl.addVia()">
      <span class="fa-solid fa-plus"></span> <span translate>Add via</span>
    </button>
  </div>

  <div class="clearfix"></div>

  <div ng-if="$ctrl.routingProfiles.length > 1">
    <div class="form-group">
      <label class="col-form-label col-md-4" translate>Profile</label>
      <div class="col-md-8">
        <select class="form-control" ng-model="$ctrl.selectedRoutingProfile">
          <option ng-repeat="profile in $ctrl.routingProfiles" ng-value="profile">{{profile.label}}</option>
        </select>
      </div>
    </div>
  </div>

  <div class="ngeo-routing-error form-group clearfix" ng-hide="$ctrl.errorMessage === ''">
    {{$ctrl.errorMessage}}
  </div>

  <div class="clearfix"></div>

  <div ng-hide="$ctrl.routeDuration === null && $ctrl.routeDistance <= 0">
    <div class="row">
      <div class="col-md-12">
        <strong translate>Route statistics</strong>
      </div>
    </div>
    <div class="row" ng-hide="$ctrl.routeDuration === null">
      <div class="col-md-4 text-right" translate>Duration</div>
      <div class="col-md-8">{{$ctrl.routeDuration | ngeoDuration}}</div>
    </div>

    <div class="row" ng-hide="$ctrl.routeDistance <= 0">
      <div class="col-md-4 text-right" translate>Distance</div>
      <div class="col-md-8">{{$ctrl.routeDistance | ngeoUnitPrefix:'m'}}</div>
    </div>
  </div>
</div>`;
