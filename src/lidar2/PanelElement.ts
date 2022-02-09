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

import {html, TemplateResult, unsafeCSS, CSSResult, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import i18next from 'i18next';
import 'bootstrap/js/src/tooltip';

import gmfLidarprofileConfig from 'ngeo/lidarprofile/Config';
import gmfLidarprofileManager from 'ngeo/lidarprofile/Manager';

import {LidarprofileConfigService} from 'ngeo/lidarprofile/Config';
import {LidarprofileManager} from 'ngeo/lidarprofile/Manager';
import {
  LidarprofileServerConfigPointAttributes,
  LidarprofileServerConfigPointAttribute,
  LidarprofileServerConfigClassifications,
  LidarprofileServerConfigClassification,
} from 'ngeo/lidarprofile/Config';

import OlMap from 'ol/Map';
import OlGeomLineString from 'ol/geom/LineString';

import DownloadCsvService from 'ngeo/download/Csv';
import GmfDrawLine from './DrawLineComponent';

import {Configuration} from 'gmfapi/store/config';
import line from 'gmfapi/store/line';
import map from 'gmfapi/store/map';
import panels from 'gmfapi/store/panels';
import ToolPanelElement from 'gmfapi/elements/ToolPanelElement';

@customElement('gmf-lidar-panel')
export default class GmfLidarPanel extends ToolPanelElement {
  @state() private customCSS_ = '';
  @state() private profileConfig_: LidarprofileConfigService = null;
  @state() private profile: LidarprofileManager = null;
  @state() private ready = false;
  @state() private active = false;
  @state() private map: undefined | OlMap = null;
  @property({type: String}) drawlineClass = '';

  // The OpenLayers LineString geometry of the profle
  @state() private line: undefined | OlGeomLineString = null;

  // State of the measure tool
  @state() private measureActive = false;

  @state() private classifications: LidarprofileServerConfigClassifications = [];

  // override default initConfig
  initConfig(configuration: Configuration): void {
    if (configuration.gmfCustomCSS && configuration.gmfCustomCSS.lidarPanel !== undefined) {
      this.customCSS_ = configuration.gmfCustomCSS.lidarPanel;
    }

    this.profile = gmfLidarprofileManager;
    this.profileConfig_ = gmfLidarprofileConfig;

    this.subscriptions.push(
      line.getLine().subscribe({
        next: (line: OlGeomLineString) => {
          this.line = line;
          if (line) {
            this.drawlineClass = '';
            this.update_();
          }
        },
      })
    );
    this.subscriptions.push(
      map.getMap().subscribe({
        next: (map: OlMap) => {
          if (map) {
            this.map = map;
            this.profile.init(this.profileConfig_, this.map);
          }
        },
      })
    );
    this.subscriptions.push(
      panels.getActiveToolPanel().subscribe({
        next: (panel: string) => {
          this.active = panel === 'lidar';
          if (this.active) {
            // Set the drawline button class to active
            this.drawlineClass = 'active';

            this.updateEventsListening_(this.active);
          } else {
            line.setLine(null);
          }
        },
      })
    );
  }

  static styles: CSSResult[] = [
    ...ToolPanelElement.styles,
    css`
      .btn.btn-default {
        background-color: var(--map-tools-bg-color);
        border-color: var(--onhover-color);
        color: var(--map-tools-color);
      }
      .btn.btn-default.active {
        box-shadow: inset 0 0.37rem 0.75rem var(--light-box-shadow-color);
      }
      .btn.btn-default:hover,
      .btn.btn-default.active {
        background-color: var(--onhover-color);
        border-color: var(--onhover-color-darken);
      }
    `,
  ];

  protected render(): TemplateResult {
    return html`
      <style>
        ${unsafeCSS(this.customCSS_)}
      </style>
      ${this.getTitle(i18next.t('Lidar profile (only on the canton of Neuchâtel)'))}
      <div class="lidar-panel" gmf-drawprofileline>
        <p>
          <button class="btn btn-default ${this.drawlineClass}" @click=${() => this.toggleDrawLine()}>
            ${i18next.t('Draw LIDAR profile line')}
          </button>
        </p>
        <p>
          ${GmfDrawLine.interaction.getActive()
            ? html`
                <em class="text-muted small">
                  ${i18next.t(
                    'Draw a line on the map to display the corresponding LIDAR profile. Use double-click to finish the drawing.'
                  )}
                </em>
              `
            : html``}
        </p>

        ${this.ready
          ? html`
              ${this.line
                ? html`
              <div>
                <button class="btn btn-default" @click=${() => this.csvExport()}">
                  ${i18next.t('CSV export')}
                </button>
                <button class="btn btn-default" @click=${() => this.pngExport()}>
                  ${i18next.t('PNG export')}
                </button>
                <button
                  class="btn btn-default"
                  @click=${() => this.resetPlot()}
                  data-toggle="tooltip"
                  data-placement="left"
                  data-original-title="${i18next.t('Reset profile')}"
                >
                  <span class="fa fa-sync"></span>
                </button>
              </div>
              <hr />
              <button
                class="btn btn-default"
                ngeo-btn
                ng-model="measureActive"
                @click=${() => this.setMeasureActive()}
                data-toggle="tooltip"
                data-placement="left"
                data-original-title="${i18next.t('Take measure on the graph')}"
              >
                ${i18next.t('Take measure')}
              </button>
              <button
                class="btn btn-default"
                @click=${() => this.clearMeasure()}
                data-toggle="tooltip"
                data-placement="left"
                data-original-title="${i18next.t('Clear measure')}"
              >
                <span class="fa fa-eraser"></span>
              </button>
            `
                : ``}

              <div>
                <hr />
                <p>${i18next.t('Material')}</p>
                <select
                  ng-options="option.name | translate for option in ::$ctrl.getAvailablePointAttributes()"
                  ng-model-options="{getterSetter: true}"
                  ng-model="$ctrl.getSetSelectedPointAttribute"
                ></select>
              </div>
              <hr />
              <p>${i18next.t('Classes')}</p>

              ${Object.entries(this.classifications).forEach(
                (classification) => html`
                  <input
                    .checked="${!!classification[1].visible}"
                    @click="${() => this.toggleVisibility(classification[1], classification[0])}"
                  />
                  <span>${classification[1].name}</span>
                `
              )}
            `
          : html` <p>${i18next.t('Initializing, please wait...')}</p> `}
      </div>
    `;
  }

  /**
   * Toggle the drawLine component status and
   * set the correct class for the toggle button.
   */
  toggleDrawLine(): void {
    this.drawlineClass = '';
    const active = GmfDrawLine.interaction.getActive();
    if (!active) {
      this.drawlineClass = 'active';
    }
    GmfDrawLine.interaction.setActive(!active);
  }

  /**
   * Toggle visibility of the selected classification object.
   *
   * @param classification The classification to change visibility.
   * @param key The key string of the toggled classification.
   */
  toggleVisibility(classification: LidarprofileServerConfigClassification, key: string): void {
    classification.visible === 0 ? 1 : 0;
    this.setClassification(classification, parseInt(key));
  }

  /**
   * @private
   */
  initConfigAndActivateTool_(): void {
    this.profileConfig_
      .initProfileConfig()
      .then(() => {
        this.ready = true;
        this.classifications = this.getClassification();
      })
      .catch((error: string) => {
        throw new Error(`Error getting profile config: ${error}`);
      });
  }

  /**
   * @param activate Activation state of the plugin
   * @private
   */
  updateEventsListening_(activate: boolean): void {
    if (activate === true) {
      if (!this.ready) {
        this.initConfigAndActivateTool_();
      }
    } else {
      this.clearAll();
    }
  }

  /**
   * @private
   */
  update_(): void {
    this.profile.clearBuffer();
    if (this.line) {
      if (!this.profileConfig_.serverConfig) {
        throw new Error('Missing profileConfig_.serverConfig');
      }
      const panelOptions = {
        state: true,
      };
      panels.openFooterPanel('lidar', panelOptions);
      this.profile.setLine(this.line);
      this.profile.getProfileByLOD([], 0, true, this.profileConfig_.serverConfig.minLOD);
    } else {
      panels.closeFooterPanel();
      this.clearAll();
    }
  }

  /**
   * Clear the LIDAR profile tool.
   */
  clearAll(): void {
    this.line = null;
    this.profile.setLine(null);
    this.profile.cartoHighlight.setPosition(undefined);
    this.clearMeasure();
    this.resetPlot();
  }
  /**
   * Activate the measure tool
   */
  setMeasureActive(): void {
    if (!this.profile.measure) {
      throw new Error('Missing profile.measure');
    }
    this.measureActive = true;
    this.profile.measure.clearMeasure();
    this.profile.measure.setMeasureActive();
  }

  /**
   * Clear the current measure
   */
  clearMeasure(): void {
    if (!this.profile.measure) {
      // FIXME: error
      //throw new Error('Missing profile.measure');
      return;
    }
    this.measureActive = false;
    this.profile.measure.clearMeasure();
  }

  /**
   * Reload and reset the plot for the current profile (reloads data)
   */
  resetPlot(): void {
    this.profile.clearBuffer();
    if (this.line) {
      this.profile.getProfileByLOD([], 0, true, 0);
    }
  }

  /**
   * Get all available point attributes.
   *
   * @returns Available point attributes.
   */
  getAvailablePointAttributes(): LidarprofileServerConfigPointAttributes[] | undefined {
    return this.profileConfig_.clientConfig.pointAttributes.availableOptions;
  }

  /**
   * Get / Set the selected point attribute
   *
   * @param {LidarprofileServerConfigPointAttribute} [opt_selectedOption] The new selected point attribute.
   * @returns Selected point attribute.
   */
  getSetSelectedPointAttribute(
    opt_selectedOption: LidarprofileServerConfigPointAttribute | undefined
  ): LidarprofileServerConfigPointAttribute | undefined {
    if (!this.profile.plot) {
      throw new Error('Missing profile.plot');
    }
    if (opt_selectedOption !== undefined) {
      this.profileConfig_.clientConfig.pointAttributes.selectedOption = opt_selectedOption;
      this.profile.plot.changeStyle(opt_selectedOption.value);
    }
    return this.profileConfig_.clientConfig.pointAttributes.selectedOption;
  }

  /**
   * Get the available classifications for this dataset
   *
   * @returns classification list
   */
  getClassification(): LidarprofileServerConfigClassifications {
    if (!this.profileConfig_.serverConfig) {
      throw new Error('Missing profileConfig_.serverConfig');
    }
    return this.profileConfig_.serverConfig.classification_colors;
  }

  /**
   * Sets the visible classification in the profile
   *
   * @param classification selected value.
   * @param key of the classification code.
   */
  setClassification(classification: LidarprofileServerConfigClassification, key: number): void {
    if (!this.profile.plot) {
      throw new Error('Missing profile.plot');
    }
    if (!this.profileConfig_.serverConfig) {
      throw new Error('Missing profileConfig_.serverConfig');
    }
    this.profileConfig_.serverConfig.classification_colors[key].visible = classification.visible;
    if (this.line) {
      this.profile.plot.setClassActive(
        this.profileConfig_.serverConfig.classification_colors,
        this.profileConfig_.serverConfig.default_attribute
      );
    }
  }

  /**
   * Export the profile data to CSV file
   */
  csvExport(): void {
    if (this.line) {
      const points = this.profile.utils.getFlatPointsByDistance(this.profile.profilePoints) || [];
      const csvData = this.profile.utils.getCSVData(points);
      const headerColumnNames = Object.keys(points[0]);
      const headerColumns = headerColumnNames.map((columnName) => {
        return {'name': columnName};
      });
      DownloadCsvService.startDownload(csvData, headerColumns, 'LIDAR_profile.csv');
    }
  }

  /**
   * Export the current d3 chart to PNG file
   */
  pngExport(): void {
    if (this.line) {
      this.profile.utils.downloadProfileAsImageFile(this.profileConfig_.clientConfig);
    }
  }
}
