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

export default `<ul class="gmf-backgroundlayerselector">
  <li
    ng-repeat="layer in ctrl.bgLayers"
    ng-click="ctrl.setLayer(layer)"
    ng-class="{'gmf-backgroundlayerselector-active': ctrl.bgLayer == layer, 'gmf-backgroundlayerselector-disabled': ctrl.opacityLayer == layer}"
  >
    <img class="gmf-thumb" ng-src="{{::layer.get('metadata')['thumbnail']}}" />
    <span class="gmf-text">{{layer.get("label") | translate}}</span>
    <span ng-class="{'gmf-backgroundlayerselector-opacity-check': ctrl.opacityLayer == layer}"></span>
  </li>

  <input
    ng-if="ctrl.opacityLayer"
    class="input-action gmf-backgroundlayerselector-opacity-slider"
    name="bg-layer-opacity"
    type="range"
    min="0"
    max="1"
    step="0.01"
    ng-model="ctrl.getSetBgLayerOpacity"
    ng-model-options="{getterSetter: true}"
  />
</ul>`;
