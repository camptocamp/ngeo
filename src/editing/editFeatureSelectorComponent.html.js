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

export default `<div ng-switch="efsCtrl.selectedEditableTreeCtrl">
  <div ng-switch-when="null">
    <select
      class="form-control"
      ng-model="efsCtrl.selectedEditableTreeCtrl"
      ng-show="efsCtrl.editableTreeCtrls.length > 0"
      ng-options="treeCtrl.node.name | translate for treeCtrl in efsCtrl.editableTreeCtrls"
    >
      <option value="" translate>-- Choose a layer --</option>
    </select>
    <span ng-show="efsCtrl.editableTreeCtrls.length == 0" translate>No editable layer available!</span>
  </div>

  <div ng-switch-default>
    <div class="row">
      <div class="col-sm-12">
        <span translate>Currently editing: </span>
        <b>{{ efsCtrl.selectedEditableTreeCtrl.node.name | translate }}</b>
        <span class="fa fa-pen-to-square"></span>
        <br />
        <button ng-click="efsCtrl.stopEditing()" class="btn btn-link btn-sm pull-right">
          <span class="fa fa-xmark"></span>
          {{'Stop editing' | translate}}
        </button>
      </div>
    </div>

    <gmf-editfeature
      gmf-editfeature-dirty="efsCtrl.dirty"
      gmf-editfeature-editabletreectrl="::efsCtrl.selectedEditableTreeCtrl"
      gmf-editfeature-map="::efsCtrl.map"
      gmf-editfeature-state="efsCtrl.state"
      gmf-editfeature-vector="::efsCtrl.vectorLayer"
    >
    </gmf-editfeature>
  </div>
</div>`;
