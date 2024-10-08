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

export default `<div class="gmf-print">
  <div
    ng-show="$ctrl.isState('CAPABILITIES_NOT_LOADED') !== true && $ctrl.isState('ERROR_ON_GETCAPABILITIES') !== true"
  >
    <div class="gmf-print-layout-selector"><ng-transclude /></div>
    <div ng-repeat="attribute in $ctrl.layoutInfo.simpleAttributes" class="gmf-print-layoutinfo form-group">
      <div
        ng-if="$ctrl.options.hiddenAttributes === undefined || $ctrl.options.hiddenAttributes.indexOf(attribute.name) < 0"
      >
        <input
          ng-if="attribute.type === 'number'"
          ng-model="attribute.value"
          class="form-control"
          type="number"
          ng-attr-placeholder="{{attribute.name | translate}}"
        />

        <input
          ng-if="attribute.type === 'text'"
          ng-model="attribute.value"
          class="form-control"
          type="text"
          ng-attr-placeholder="{{attribute.name | translate}}"
        />

        <textarea
          ng-if="attribute.type === 'textarea'"
          ng-model="attribute.value"
          class="form-control"
          row="3"
          ng-attr-placeholder="{{attribute.name | translate}}"
        ></textarea>

        <div ng-if="attribute.type === 'checkbox'" class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" ng-model="attribute.value" type="checkbox" />
            <span>{{attribute.name | translate}}</span>
          </label>
        </div>
      </div>
    </div>

    <div ng-show="$ctrl.layoutInfo.legend !== undefined" class="gmf-print-legend checkbox">
      <label>
        <input ng-model="$ctrl.layoutInfo.legend" type="checkbox" />
        <span translate>Legend</span>
      </label>
    </div>

    <div class="gmf-print-layout-selector">
      <div ng-show="$ctrl.layoutInfo.layouts.length !== 1" class="form-group row">
        <label class="col-form-label col-md-5" translate>Layout</label>

        <div class="col-md-7">
          <div class="btn-group btn-block">
            <button type="button" class="btn btn-default form-control dropdown-toggle" data-toggle="dropdown">
              <span>{{$ctrl.layoutInfo.layout | translate}}&nbsp;</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-right btn-block" role="menu">
              <li ng-repeat="layout in $ctrl.layoutInfo.layouts">
                <a ng-click="$ctrl.setLayout(layout)" href="">{{layout | translate}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div ng-show="$ctrl.layoutInfo.scales.length !== 1" class="gmf-print-scale-selector form-group row">
        <label class="col-form-label col-md-5" translate>Scale</label>

        <div class="col-md-7">
          <div class="btn-group btn-block">
            <button
              type="button"
              class="btn btn-default form-control dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <span>{{$ctrl.layoutInfo.scale | ngeoScalify}}&nbsp;</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-right btn-block" role="menu">
              <li ng-repeat="scale in $ctrl.layoutInfo.scales">
                <a ng-click="$ctrl.getSetScale(scale)" href="">{{scale | ngeoScalify}}</a>
              </li>
              <span ng-if="::$ctrl.options.scaleInput">
                <li class="dropdown-header" translate>Manual entry</li>
                <li>
                  <div class="gmf-print-custom-scale">
                    1 :
                    <input
                      class="gmf-print-custom-scale-input"
                      type="number"
                      min="1"
                      ng-model="$ctrl.getSetScale"
                      ng-model-options="{getterSetter: true}"
                    />
                  </div></li
              ></span>
            </ul>
          </div>
        </div>
      </div>

      <div ng-show="$ctrl.layoutInfo.dpis.length !== 1" class="gmf-print-dpi-selector form-group row">
        <label class="col-form-label col-md-3" translate>DPI</label>

        <div class="col-md-5">
          <div class="btn-group btn-block">
            <button
              type="button"
              class="btn btn-default form-control dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <span>{{$ctrl.layoutInfo.dpi}}&nbsp;</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-right btn-block" role="menu">
              <li ng-repeat="dpi in $ctrl.layoutInfo.dpis">
                <a href="" ng-click="$ctrl.setDpi(dpi)">{{dpi}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="gmf-print-rotation-selector form-group row">
        <label class="col-form-label col-md-3" translate>Rotation</label>

        <div class="col-md-5">
          <input
            class="form-control gmf-print-rotation-input"
            type="range"
            value="0"
            min="-180"
            max="180"
            data-toggle="tooltip"
            title="{{'You can also use Alt+Shift on the map' | translate}}"
          />
        </div>

        <div class="col-md-4">
          <input class="form-control gmf-print-rotation-input" type="number" min="-180" max="180" value="0" />
        </div>
      </div>
    </div>

    <div ng-show="$ctrl.smtpSupported && $ctrl.smtpEmail" class="gmf-print-smtp checkbox">
      <label>
        <input ng-disabled="$ctrl.isState('PRINTING')" ng-model="$ctrl.smtpEnabled" type="checkbox" />
        <span translate>Send file by email</span>
      </label>
    </div>

    <div class="gmf-print-actions form-group pull-right">
      <span ng-show="$ctrl.isState('PRINTING')">
        <i class="fa-solid custom-spinner-generic fa-spin"
          >${svgSpinner('1rem')}</i>
      </span>

      <a
        ng-show="$ctrl.isState('PRINTING')"
        class="gmf-print-cancel btn btn-link"
        href=""
        ng-click="$ctrl.cancel()"
        translate
        >Abort</a
      >

      <button
        ng-show="$ctrl.layoutInfo.formats.png"
        class="gmf-print-image btn prime"
        ng-disabled="$ctrl.isState('PRINTING')"
        ng-click="$ctrl.print('png')"
        translate
      >
        Image
      </button>

      <button
        ng-show="$ctrl.layoutInfo.formats.pdf"
        class="gmf-print-pdf btn prime"
        ng-disabled="$ctrl.isState('PRINTING')"
        ng-click="$ctrl.print('pdf')"
        translate
      >
        PDF
      </button>
    </div>

    <div
      ng-show="$ctrl.isState('ERROR_ON_REPORT')"
      class="gmf-print-error-report form-group pull-left text-danger"
    >
      <p>{{'Error during the print, please try again.' | translate}}</p>
    </div>
  </div>

  <div ng-show="$ctrl.isState('CAPABILITIES_NOT_LOADED')" class="gmf-print-wait form-group pull-left">
    <p>{{'Connecting to the print server, please wait.' | translate}}</p>
  </div>

  <div
    ng-show="$ctrl.isState('ERROR_ON_GETCAPABILITIES')"
    class="gmf-print-error-capabilities form-group pull-left text-danger"
  >
    <p>{{'The print server is unavailable. Please, try later.' | translate}}</p>
  </div>

  <div ng-show="$ctrl.smtpMessage" class="gmf-print-smtp-message form-group pull-left">
    <button class="btn prime" ng-click="$ctrl.closeSmtpMessage()" translate>Close</button>
    <p>{{'The file will be sent to your email when ready.' | translate}}</p>
  </div>
</div>`;
