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
import OlMap from 'ol/Map';
import i18next from 'i18next';
import panels from 'gmfapi/store/panels';
import map from 'gmfapi/store/map';
import BaseElement from 'gmfapi/elements/BaseElement';
import {Configuration} from 'gmfapi/store/config';

// TODO:
//
// ngeo-resizemap
// .ui-resizable-* => Lit-Draggable
// and related

/**
 * Interface for panel resizing:
 * Store mouse initial position, handles of the elements to move or resize
 * and their original width
 */
 export interface PanelResize {
  /**
   * Drag event to store coordinates from
   */
  event: MouseEvent;
  /**
   * Initial mouse horizontal offset
   */
   offsetLeft: number;
  /**
   * Element separating the elements to resize
   */
   separator: HTMLElement;
  /**
   * Left element to resize
   */
  leftElement: HTMLElement;
  /**
   * Right element to resize
   */
  rightElement: HTMLElement;
  /**
   * Initial width of left element
   */
  leftWidth: number;
  /**
   * Initial width of right element
   */
  rightWidth: number;
}

@customElement('gmf-desktop-canvas')
export default class GmfDesktopCanvas extends BaseElement {
  @state() private toolPanel_: string = null;
  @state() private footerPanel_: string = null;
  @state() private showDatapanel_ = true;
  @state() private showInfobar_ = false;
  @state() private customCSS_ = '';
  private map_: OlMap;

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

      .gmf-app-desktop-splitter {
        width: 100%;
        height: 100%;
        display: flex;
      }
      .ui-resizable-e {
        width: 7px;
        height: 100%;
        background-color: $brand-secondary-dark;
        background-color: var(--brand-secondary-dark);
        cursor: ew-resize;
        border: {
          left: $border;
          left-color: $border-color;
          left-color: var(--border-color);
          right: $border;
          right-color: $border-color;
          right-color: var(--border-color);
        }
      }
      #gmf-app-data-panel {
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

      #gmf-app-data-panel-separator {
        float: left;
      }

      #gmf-app-tool-panel-separator {
        float: right;
      }

      .ui-resizable-w {
      width: 7px;
      background-color: var(--brand-secondary-dark);
      cursor: ew-resize;
      z-index: 3;
      border: {
        left: $border;
        left-color: $border-color;
        left-color: var(--border-color);
        right: $border;
        right-color: $border-color;
        right-color: var(--border-color);
      }
    }

      .gmf-app-map-container {
        width: 100%;
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
      map.getMap().subscribe({
        next: (map: OlMap) => {
          if (map) {
            this.map_ = map;
          }
        },
      })
    );
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
    const desktopCanvas = document.querySelector('gmf-desktop-canvas').shadowRoot;
    desktopCanvas.addEventListener('mousedown', (event: MouseEvent) => {
      this.resizeDataPanel(event, desktopCanvas);
    });
    desktopCanvas.addEventListener('mousedown', (event: MouseEvent) => {
      this.resizeToolPanel(event, desktopCanvas);
    });
  }

  initConfig(configuration: Configuration): void {
    if (configuration.gmfOptions && configuration.gmfOptions.showInfobar !== undefined) {
      this.showInfobar_ = configuration.gmfOptions.showInfobar;
    }
    if (configuration.gmfCustomCSS && configuration.gmfCustomCSS.desktopCanvas !== undefined) {
      this.customCSS_ = configuration.gmfCustomCSS.desktopCanvas;
    }
    this.toggleBackgroundSelector();
  }

  toggleShowInfobar_(): void {
    this.showInfobar_ = !this.showInfobar_;
    this.toggleBackgroundSelector();
  }

  toggleBackgroundSelector(): void {
    if (this.showInfobar_) {
      document.documentElement.style.setProperty(`--current-footer-height`, 'var(--infobar-height)');
    } else {
      document.documentElement.style.setProperty(`--current-footer-height`, '0px');
    }
  }

  /**
   * Store initial mouse position, listen to drag event and resize elements
   *
   * @param {PanelResize} panelResizeEvent
   * @param {HTMLElement} separator
   * @param {HTMLElement} leftElement
   * @param {HTMLElement} rightElement
   */
  onMouseDown = (
    panelResizeEvent: PanelResize,
    separator: HTMLElement,
    leftElement: HTMLElement,
    rightElement: HTMLElement) => (event: MouseEvent) => {

    panelResizeEvent = {
      event,
      offsetLeft: separator.offsetLeft,
      separator: separator,
      leftElement: leftElement,
      rightElement: rightElement,
      leftWidth: leftElement.offsetWidth,
      rightWidth: rightElement.offsetWidth,
    };

    document.onmousemove = this.onMouseMove(panelResizeEvent);
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  /**
   * Compute drag offset, change element position or width accordingly
   *
   * @param {PanelResize} panelResizeEvent
   */
  onMouseMove = (panelResizeEvent: PanelResize) => (event: MouseEvent) => {
    const delta = {
      x: event.clientX - panelResizeEvent.event.clientX,
      y: event.clientY - panelResizeEvent.event.clientY
    };
    // Prevent negative-sized elements
    delta.x = Math.min(Math.max(delta.x, - panelResizeEvent.leftWidth), panelResizeEvent.rightWidth);

    panelResizeEvent.separator.style.left = `${panelResizeEvent.offsetLeft + delta.x}px`;
    panelResizeEvent.leftElement.style.width = `${panelResizeEvent.leftWidth + delta.x}px`;
    panelResizeEvent.rightElement.style.width = `${panelResizeEvent.rightWidth - delta.x}px`;

    return event;
  }

  /**
   * Resize the data (left) panel when dragging the separator
   *
   * @param {ShadowRoot} desktopCanvas The desktop canvas
   */
  resizeDataPanel(event: MouseEvent, desktopCanvas: ShadowRoot): MouseEvent {
    let panelResizeEvent: PanelResize; // Store drag infos
    const separator = desktopCanvas.getElementById('gmf-app-data-panel-separator');
    const leftElement = desktopCanvas.getElementById('gmf-app-data-panel');
    const rightElement = desktopCanvas.getElementById('gmf-app-map-container');

    separator.onmousedown = this.onMouseDown(panelResizeEvent, separator, leftElement, rightElement);

    return event;
  }

  /**
   * Resize the tool (right) panel when dragging the separator
   *
   * @param {ShadowRoot} desktopCanvas The desktop canvas
   */
   resizeToolPanel(event: MouseEvent, desktopCanvas: ShadowRoot): MouseEvent {
    let panelResizeEvent: PanelResize; // Store drag infos
    const separator = desktopCanvas.getElementById('gmf-app-tool-panel-separator');
    const leftElement = desktopCanvas.getElementById('gmf-app-map-container');
    const rightElement = desktopCanvas.getElementById("gmf-app-tools-content");

    separator.onmousedown = this.onMouseDown(panelResizeEvent, separator, leftElement, rightElement);

    return event;
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
        class="${this.toolPanel_ ? `gmf-tool-active gmf-tool-${this.toolPanel_}-active` : ''} ${
      this.footerPanel_ ? `gmf-footer-active gmf-footer-${this.footerPanel_}-active` : ''
    }"
      >

        <div class="gmf-app-desktop-splitter">
          <div
            id="gmf-app-data-panel"
            class="gmf-app-data-panel ui-resizable"
            ngeo-resizemap="mainCtrl.map"
            ngeo-resizemap-state="mainCtrl.dataPanelActive"
          >
            <slot name="data"></slot>
          </div>

          <div id="gmf-app-data-panel-separator" class="ui-resizable-e" ></div>

          <div id="gmf-app-map-container" class="gmf-app-map-container" ${
            this.showInfobar_ ? 'gmf-app-infobar-active' : ''
          }">
            <div class="gmf-app-map ${this.showInfobar_ ? 'gmf-app-infobar-active' : ''}">
              <slot name="map"></slot>
            </div>
            <!--infobar-->
            <div class="gmf-app-footer ${this.showInfobar_ ? 'gmf-app-active' : ''}">
              <button
                class="btn fa gmf-app-map-info ${
                  this.showInfobar_ ? 'fa-angle-double-down' : 'fa-angle-double-up'
                }"
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

          <div id="gmf-app-tools" class="gmf-app-tools" ngeo-resizemap="mainCtrl.map" ngeo-resizemap-state="mainCtrl.toolsActive">
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

            <div id="gmf-app-tool-panel-separator" class="ui-resizable-w ${
                this.toolPanel_ ? `gmf-app-tools-content-${this.toolPanel_}` : 'hide'
              }" ></div>

            <div id="gmf-app-tools-content"
              class="gmf-app-tools-content container-fluid ${
                this.toolPanel_ ? `gmf-app-tools-content-${this.toolPanel_}` : 'hide'
              }"
            >


              <div class="row">

                <div class="col-sm-12">
                  <a class="btn close" @click=${() => panels.closeToolPanel()}>×</a>
                  <slot name="tool-panel-${this.toolPanel_}"></slot>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
      <footer><slot name="footer-${this.footerPanel_}"></slot></footer>
    `;
  }

  updated(): void {
    if (this.map_) {
      this.map_.updateSize();
      this.map_.renderSync();
    }
  }
}
