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

export default `<gmf-objecteditingtools
  gmf-objecteditingtools-active="oeCtrl.toolsActive"
  gmf-objecteditingtools-copyfromactive="oeCtrl.copyFromActive"
  gmf-objecteditingtools-deletefromactive="oeCtrl.deleteFromActive"
  gmf-objecteditingtools-feature="oeCtrl.feature"
  gmf-objecteditingtools-geomtype="::oeCtrl.geomType"
  gmf-objecteditingtools-map="::oeCtrl.map"
  gmf-objecteditingtools-process="oeCtrl.process"
  gmf-objecteditingtools-queryablelayerinfo="oeCtrl.selectedQueryableLayerInfo"
  gmf-objecteditingtools-requireslayer="oeCtrl.queryableLayerListShown"
  gmf-objecteditingtools-sketchfeatures="::oeCtrl.sketchFeatures"
>
</gmf-objecteditingtools>

<div class="form-group" ng-show="oeCtrl.queryableLayerListShown">
  <label ng-show="oeCtrl.copyFromActive === true" class="col-form-label">{{'Copy from:' | translate}}</label>
  <label ng-show="oeCtrl.deleteFromActive === true" class="col-form-label">{{'Cut from:' | translate}}</label>
  <select
    class="form-control"
    ng-model="oeCtrl.selectedQueryableLayerInfo"
    ng-options="layerInfo.layerNode.name | translate for layerInfo in oeCtrl.queryableLayersInfo"
  ></select>
</div>

<form novalidate name="form" class="form gmf-objectediting-form">
  <input
    type="submit"
    value="{{'Save' | translate}}"
    class="btn btn-sm btn-default gmf-objectediting-btn-save"
    ng-click="form.$valid && oeCtrl.save()"
    ng-disabled="!oeCtrl.dirty || oeCtrl.pending || !oeCtrl.featureHasGeom"
    title="{{'Save modifications' | translate}}"
  />
  <a
    class="btn btn-sm btn-link gmf-objectediting-btn-undo"
    ng-click="oeCtrl.undo()"
    ng-disabled="!oeCtrl.dirty || oeCtrl.pending"
    title="{{'Undo latest modifications' | translate}}"
    href
    >{{'Undo' | translate}}</a
  >
  <a
    class="btn btn-sm btn-link gmf-objectediting-btn-delete"
    ng-click="oeCtrl.delete()"
    ng-disabled="oeCtrl.isStateInsert() || oeCtrl.pending"
    title="{{'Delete the feature' | translate}}"
    href
    >{{'Delete' | translate}}</a
  >
</form>`;
