// The MIT License (MIT)
//
// Copyright (c) 2021 Camptocamp SA
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

import {TemplateResult, html, css, unsafeCSS} from 'lit';
import {state, customElement} from 'lit/decorators.js';
import panels from 'gmfapi/store/panels';
import i18next from 'i18next';
import BaseElement from 'gmfapi/elements/BaseElement';
import {Configuration} from 'gmfapi/store/config';

// TODO:
//
// ngeo-resizemap
// .ui-resizable-* => Lit-Draggable
// and related

@customElement('gmf-desktop-canvas')
export default class GmfDesktopCanvas extends BaseElement {
  @state() private toolPanel_: string = null;
  @state() private footerPanel_: string = null;
  @state() private showDatapanel_ = true;
  @state() private showInfobar_ = false;
  @state() private customCSS_ = '';

  static styles = [
    ...BaseElement.styles,
    css`
      .pull-right {
        float: right;
      }
      .hide {
        display: none;
      }

      .btn {
        font-size: 0.8rem;
        line-height: 1.5;
      }
      button.btn:focus {
        box-shadow: unset;
      }

      footer {
        position: relative;
        z-index: 3;
      }

      .ui-resizable-helper {
        border: 2px;
        border-color: var(--brand-secondary-dark);
        background-color: var(--brand-secondary);
        opacity: 0.4;
      }

      .gmf-app-data-panel {
        display: block;
        float: left;
        background-color: var(--brand-secondary);
        width: var(--left-panel-width);
        height: 100%;
        display: flex;
        flex-flow: column;
      }

      .gmf-app-data-panel .gmf-app-data-panel-collapse-btn {
        display: block;
      }
      .gmf-app-data-panel .gmf-app-data-panel-expand-btn {
        display: none;
      }

      .gmf-app-data-panel .gmf-app-data-panel-toggle-btn {
        height: calc(1.5 * var(--icon-font-size));
        left: -1px;
        padding: 0.5rem 0.1rem;
        position: relative;
        top: calc(50% - var(--icon-font-size));
        cursor: pointer;
      }

      .gmf-app-data-panel .ui-resizable-e {
        background-color: var(--brand-secondary-dark);
        cursor: ew-resize;
        border-left: var(--border);
        border-left-color: var(--border-color);
        border-right: var(--border);
        border-right-color: var(--border-color);
      }

      .gmf-app-map-container {
        width: auto;
        height: 100%;
        overflow: hidden;
        position: relative;
        display: block;
        border-top: 0.06rem solid;
        border-top-color: var(--btn-default-border);
      }
      .gmf-app-map-container .gmf-app-footer {
        padding: var(--padding-small-vertical);
        position: absolute;
        z-index: 2;
        bottom: calc(var(--infobar-height) * -1);
        /* Prevent footer to be displayed on 2 lines when screen width is small */
        max-height: var(--infobar-height);
        min-height: var(--infobar-height);

        background-color: var(--main-bg-color-09);
        width: 100%;
        /* Cancel default navbar bottom margin */
        margin-bottom: 0;
        /* Buttons or inputs in bar are supposed to be '-sm' */
        transition: 0.2s ease-out all;
        border-top: var(--border);
        border-top-color: var(--border-color);
      }
      .gmf-app-footer.gmf-app-active {
        bottom: 0;
      }
      .gmf-app-footer > div {
        display: inline-block;
      }
      .gmf-app-footer > div.footer {
        display: block;
      }

      .gmf-app-footer button.gmf-app-map-info {
        position: absolute;
        /* Button is supposed to be .btn-sm */
        bottom: calc(var(--infobar-height) - 1px);
        border-top-left-radius: var(--border-radius-base);
        border-top-right-radius: var(--border-radius-base);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        background-color: var(--main-bg-color-08);
        padding: 0;
        left: 50%;
        width: var(--width);
        margin-left: calc(var(--width) / -2);
        border-bottom: none;
        border: var(--border);
        border-color: var(--border-color);
        font-weight: 900;
      }

      .gmf-app-map.gmf-app-infobar-active {
        bottom: var(--infobar-height);
        position: absolute;
        height: calc(100% - var(--infobar-height));
      }

      .gmf-app-map {
        transition: 0.2s ease-out all;
        bottom: 0;
        position: absolute;
        height: 100%;
        width: 100%;
      }

      .gmf-app-tools {
        float: right;
        background-color: var(--brand-secondary);
        left: 0 !important;
        display: flex;
        width: fit-content;
      }

      .gmf-app-tools-content {
        min-width: var(--right-panel-width);
        padding: 0 0;
        transition: margin-right 0.2s ease, width 0.001s ease;
        height: 100%;
        flex-grow: 1;
        order: 1;
        width: var(--right-panel-width);
        left: 0 !important;
      }
      .gmf-app-tools-content .row {
        padding: 0 var(--app-margin);
      }
      .gmf-app-tools-content .close {
        font-size: 1.2rem;
        padding: 0;
        position: absolute;
        top: 0.6rem;
        right: 1rem;
      }

      .gmf-app-tools-content .gmf-app-tools-content-toggle-btn {
        height: 1.5 * var(--icon-font-size) !important;
        right: 9px;
        padding: 0.5rem 0.1rem;
        position: relative;
        top: calc(50% - var(--icon-font-size));
        cursor: pointer;
        z-index: 5;
      }

      .gmf-app-tools-content .ui-resizable-w {
        background-color: var(--brand-secondary-dark);
        cursor: ew-resize;
        left: 5px;
        border-left: var(--border);
        border-left-color: var(--border-color);
        border-right: var(--border);
        border-right-color: var(--border-color);
      }

      .gmf-app-tools-content .gmf-app-tools-content-collapse-btn {
        display: block;
      }
      .gmf-app-tools-content .gmf-app-tools-content-expand-btn {
        display: none;
      }

      .gmf-app-tools-content > div {
        height: 100%;
        margin-right: calc(var(--app-margin) * -1);
        margin-left: calc(var(--app-margin) * -1);
      }
      .gmf-app-tools-content > div > div {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      }

      .gmf-app-tools-content.gmf-app-active {
        margin-right: 0;
      }

      .gmf-app-tools-content .profile-panel button {
        width: 100%;
      }

      .gmf-app-tools-content .widget-scene-canvas {
        width: 100% !important;
      }

      .gmf-app-tools .gmf-app-bar {
        background-color: var(--brand-primary);
        border-left: var(--border);
        border-left-color: var(--border-color);
        order: 2;
        height: 100%;
        position: relative;
        z-index: 2;
        flex-shrink: 0;
        padding-top: 1px;
      }

      .gmf-app-tools .gmf-app-bar .btn-group-vertical {
        width: 100%;
      }

      .gmf-app-tools .gmf-app-bar .container-fluid {
        padding: 0;
      }

      .gmf-app-data-panel,
      .gmf-app-tools {
        height: 100%;
        position: relative;
      }

      main {
        height: 100%;
      }
      main.gmf-footer-active {
        height: calc(100% - 10rem);
      }
      footer {
        height: 10rem;
      }

      .gmf-app-tools-content-googlestreetview {
        width: 25rem;
      }

      .gmf-app-tools-content-mapillary {
        width: 25rem;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.subscriptions.push(
      panels.getActiveToolPanel().subscribe({
        next: (panel: string) => {
          this.toolPanel_ = panel;
        },
      })
    );
    this.subscriptions.push(
      panels.getActiveFooterPanel().subscribe({
        next: (panel: string) => {
          this.footerPanel_ = panel;
        },
      })
    );
  }

  initConfig(configuration: Configuration): void {
    if (configuration.gmfOptions && configuration.gmfOptions.showInfobar !== undefined) {
      this.showInfobar_ = configuration.gmfOptions.showInfobar;
    }
    if (configuration.gmfCustomCSS && configuration.gmfCustomCSS.desktopCanvas !== undefined) {
      this.customCSS_ = configuration.gmfCustomCSS.desktopCanvas;
    }
  }

  toggleShowInfobar_(): void {
    this.showInfobar_ = !this.showInfobar_;
  }

  render(): TemplateResult {
    return html`
      <style>
        ${unsafeCSS(this.customCSS_)}
      </style>

      <header>
        <slot name="header"></slot>
      </header>

      <main
        class="${this.toolPanel_ ? `gmf-tool-active gmf-tool-${this.toolPanel_}-active` : ''} ${this
          .footerPanel_
          ? `gmf-footer-active gmf-footer-${this.footerPanel_}-active`
          : ''}"
      >
        <div
          class="gmf-app-data-panel ui-resizable"
          ngeo-resizemap="mainCtrl.map"
          ngeo-resizemap-state="mainCtrl.dataPanelActive"
        >
          <slot name="data"></slot>
        </div>

        <div class="gmf-app-tools" ngeo-resizemap="mainCtrl.map" ngeo-resizemap-state="mainCtrl.toolsActive">
          <div class="gmf-app-bar">
            <div class="btn-group-vertical">
              <slot name="tool-button"></slot>
            </div>
            <br />
            <br />
            <span
              data-toggle="tooltip"
              data-placement="left"
              data-original-title="${i18next.t('Share this map')}"
            >
              <div class="container-fluid">
                <slot name="tool-button-separate"></slot>
              </div>
            </span>
          </div>

          <div
            class="gmf-app-tools-content container-fluid ${this.toolPanel_
              ? `gmf-app-tools-content-${this.toolPanel_}`
              : 'hide'}"
          >
            <div class="row">
              <div class="col-sm-12">
                <a class="btn close" @click=${() => panels.closeToolPanel()}>×</a>
                <slot name="tool-panel-${this.toolPanel_}"></slot>
              </div>
            </div>
          </div>
        </div>
        <div class="gmf-app-map-container ${this.showInfobar_ ? 'gmf-app-infobar-active' : ''}">
          <div class="gmf-app-map ${this.showInfobar_ ? 'gmf-app-infobar-active' : ''}">
            <slot name="map"></slot>
          </div>
          <!--infobar-->
          <div class="gmf-app-footer ${this.showInfobar_ ? 'gmf-app-active' : ''}">
            <button
              class="btn fa gmf-app-map-info ${this.showInfobar_
                ? 'fa-angle-double-down'
                : 'fa-angle-double-up'}"
              @click=${() => this.toggleShowInfobar_()}
            ></button>
            <slot name="infobar-left"></slot>
            <div class="pull-right">
              <slot name="infobar-right"></slot>
            </div>
            <div class="footer">
              <slot name="infobar-footer"></slot>
            </div>
          </div>
        </div>
        <slot name="modal"></slot>
      </main>
      <footer><slot name="footer-${this.footerPanel_}"></slot></footer>
    `;
  }
}
