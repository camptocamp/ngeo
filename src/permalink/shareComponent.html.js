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

import svgSpinner from 'gmf/icons/spinner_svg';

export default `<div class="modal-header ui-draggable-handle">
  <h4 class="modal-title" translate>Share this map</h4>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  <form role="form" name="gmfShareForm" novalidate>
    <div class="form-group">
      <label for="gmfShareInputShortLink-{{::$ctrl.uid}}" translate>Permalink</label>
      <input
        type="text"
        class="form-control"
        id="gmfShareInputShortLink-{{::$ctrl.uid}}"
        onclick="this.select()"
        ng-model="$ctrl.shortLink"
        readonly="True"
      />
      <p class="help-block" translate>Copy this link to share it.</p>
      <p class="text-danger" ng-if="$ctrl.showLengthWarning">
        <span class="fa-solid fa-triangle-exclamation"></span>
        <!-- prettier-ignore -->
        {{'You have a lot of drawn elements in this map. The above link may not be correctly supported by some browsers.' | translate}}
      </p>
      <p class="text-danger" ng-if="$ctrl.errorOnGetShortUrl">
        <span class="fa-solid fa-exclamation"></span>
        {{'Error, cannot get the shortened URL.' | translate}}
      </p>
    </div>
    <hr ng-if="::$ctrl.options.enableEmail !== false" />
    <div class="gmf-share-email" ng-if="::$ctrl.options.enableEmail !== false">
      <div class="form-group">
        <label for="gmfShareInputEmail-{{::$ctrl.uid}}" translate>Send this link to</label>
        <input
          type="email"
          class="form-control"
          name="inputEmail"
          id="gmfShareInputEmail-{{::$ctrl.uid}}"
          placeholder="E-mail"
          ng-model="$ctrl.email"
          required
        />
        <span ng-show="gmfShareForm.$submitted || gmfShareForm.inputEmail.$touched">
          <span
            class="text-danger"
            ng-show="gmfShareForm.inputEmail.$error.email || gmfShareForm.inputEmail.$error.required"
          >
            <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
            {{'Invalid email.' | translate}}</span
          >
        </span>
      </div>
      <div class="form-group">
        <textarea
          class="form-control"
          ng-attr-placeholder="{{'Message (optional)' | translate }}"
          ng-model="$ctrl.message"
        ></textarea>
      </div>
      <span class="text-default" ng-if="!$ctrl.isFinishedState">
        <i class="fa-solid custom-spinner-generic fa-spin"
          >${svgSpinner('1rem')}</i>
      </span>
      <span class="text-success" ng-if="$ctrl.successfullySent">
        <i class="fa-solid fa-check" aria-hidden="true"></i>
        {{ 'Link successfully sent.' | translate }}
      </span>
      <span class="text-danger" ng-if="$ctrl.errorOnsend">
        <i class="fa-solid fa-exclamation" aria-hidden="true"></i>
        {{ 'Error, the link has not been sent.' | translate }}
      </span>
    </div>
    <div class="text-right">
      <button type="button" class="btn btn-default" data-dismiss="modal" translate>Close</button>
      <button
        ng-if="::$ctrl.options.enableEmail !== false"
        type="submit"
        class="btn prime"
        ng-click="$ctrl.sendShortUrl()"
        ng-disabled="!gmfShareForm.$valid"
        translate
      >
        Send
      </button>
    </div>
  </form>
</div>`;
