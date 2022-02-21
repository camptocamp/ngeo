// The MIT License (MIT)
//
// Copyright (c) 2022 Camptocamp SA
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

import {TemplateResult, html, css, CSSResult} from 'lit';
import {customElement, state} from 'lit/decorators';
import GmfBaseElement from 'gmfapi/elements/BaseElement';

import OlGeomLineString from 'ol/geom/LineString';

import line from 'ngeo/lidar/line';
import panels from 'gmfapi/store/panels';

@customElement('gmf-lidar-footer')
export class gmfLidarFooter extends GmfBaseElement {
  @state() line: OlGeomLineString = null;

  initConfig(): void {
    this.subscriptions.push(
      line.getLine().subscribe({
        next: (line: OlGeomLineString) => {
          if (line) {
            this.line = line;
          } else {
            panels.closeFooterPanel();
          }
        },
      })
    );
  }

  static styles: CSSResult[] = [
    ...GmfBaseElement.styles,
    css`
      #gmf-lidarprofile-container {
        position: relative;
        overflow: hidden;
        padding: var(--app-margin);
        border-top: solid 0.06rem black;
        background-color: white;
        height: var(--lidarprofile-height);
        display: flex;
      }

      #gmf-lidarprofile-container .lidarprofile {
        width: calc(100% - var(--profile-legend-width));
        background-color: #f5f5f5;
      }

      #gmf-lidarprofile-container .lidar-legend {
        list-style-type: none;
        width: var(--profile-legend-width);
        padding: var(--app-margin);
      }

      #gmf-lidarprofile-container .close {
        height: 0.62rem;
        cursor: pointer;
      }

      #gmf-lidarprofile-container .lidar-error {
        visibility: hidden;
        position: absolute;
        z-index: 10;
        margin: var(--app-margin);
        padding-left: 6.25rem;
        padding-top: 6.25rem;
        width: calc(100% - 3.12rem - var(--profile-legend-width));
        height: calc(var(--lidarprofile-height) - 3.12rem);
        font-size: 1.5em;
        opacity: 1;
        background: #e1f1f7;
        color: #4b717f;
      }

      #gmf-lidarprofile-container .lod-info {
        max-height: 6.25rem;
        overflow-y: auto;
      }

      .gmf-lidarprofile-automatic-width {
        color: gray;
      }

      .gmf-lidarprofile-chart-active main {
        height: calc(100% - var(--lidarprofile-height));
      }

      .gmf-tooltip-measure {
        font-weight: bold;
      }
    `,
  ];

  render(): TemplateResult {
    return html`
      <div id="gmf-lidarprofile-container" class="panel">
        <div class="lidarprofile">
          <div class="lidar-error"></div>
          <canvas class="lidar-canvas"></canvas>
          <svg class="lidar-svg" style="fill: #ffff00; position: absolute; z-index: 1"></svg>
        </div>
        <div class="lidar-legend">
          <div class="width-info"></div>
          <div class="lod-info"></div>
          <div class="lidar-info"></div>
        </div>
        <div class="close" @click="${() => this.closePanel()}">&times;</div>
      </div>
    `;
  }

  /**
   * Reset the line and close the footer
   */
  closePanel(): void {
    this.line = null;
    line.setLine(null);
    panels.closeFooterPanel();
  }
}
