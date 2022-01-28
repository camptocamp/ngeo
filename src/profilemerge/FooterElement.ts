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

import GmfBaseElement from 'gmfapi/elements/BaseElement';
import i18next from 'i18next';
import {css, CSSResult, html, TemplateResult} from 'lit';
import {customElement, state} from 'lit/decorators';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import loadingSvg from 'gmf/icons/spinner.svg';

import {Coordinate as OlCoordinateCoordinate} from 'ol/coordinate';
import LineString from 'ol/geom/LineString';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import olOverlay from 'ol/Overlay';
import olGeomLineString from 'ol/geom/LineString';
import olGeomPoint from 'ol/geom/Point';
import {EventsKey, listen, unlistenByKey} from 'ol/events';
// FIXME: mapbrowserevent type
//import BaseEvent from 'ol/events/Event';
//import MapBrowserEvent from 'ol/MapBrowserEvent';

import {GridColumnDef as NgeoDownloadCsvGridColumnDef} from 'ngeo/download/Csv';

import panels from 'gmfapi/store/panels';
import config, {
  Configuration,
  gmfProfileOptions,
  LineConfiguration,
  ngeoProfileOptions,
} from 'gmfapi/store/config';

type ProfileElement = {
  dist: number;
  x: number;
  y: number;
  values: {
    [x: string]: number;
  };
};

type Point = {
  x: number;
  y: number;
};

/**
 * The result of the profile service
 */
type ProfileServiceResult = {
  profile: ProfileElement[];
};

/**
 *
 * Information to display for a given point in the profile. The point is
 * typically given by the profile's hover.
 */
type ProfileHoverPointInformations = {
  /**
   * Coordinate of the point.
   */
  coordinate?: OlCoordinateCoordinate;
  /**
   * distance of the point on the line. Can be in meters or kilometers.
   */
  distance?: number;
  /**
   * Elevations of the point (example: {aster: 556.5, srtm: 560}).
   */
  elevations?: {
    [x: string]: number;
  };
  /**
   * Units of the x axis.
   */
  xUnits?: string;
  /**
   * Units of the y axis.
   */
  yUnits?: string;
};

/**
 * The POI data extractor is used to extract data from a POI.
 * The POI is an item of the POI data array.
 */
type PoiExtractor = {
  /**
   * Extract the id of a POI.
   */
  id: (arg1: unknown) => string;
  /**
   * Extract the distance from origin of a POI.
   */
  dist: (arg1: unknown) => number;
  /**
   * Extract the elevation of a POI.
   */
  z: (arg1: unknown, arg2: number | undefined) => number;
  /**
   * Extract the sequence number of a POI.
   */
  sort: (arg1: unknown) => number;
  /**
   * Extract the title of a POI.
   */
  title: (arg1: unknown) => string;
};

type ProfileFormatter = {
  /**
   * Format the xhover distance.
   */
  xhover: (arg1: number, arg2: string) => string;
  /**
   * Format the yhover elevation.
   */
  yhover: (arg1: number, arg2: string) => string;
  /**
   * Format the xtick, for graduating the x axis.
   */
  xtick: (arg0: number, arg1: string) => string | number;
  /**
   * Format the ytick, for graduating the y axis.
   */
  ytick: (arg0: number, arg1: string) => string | number;
};

type I18n = {
  /**
   * Text for the x axis. Will be completed by ` km` or ' m' (for kilometers or meters).
   */
  xAxis?: string;
  /**
   * Text for the y axis. Will be completed by ' m' (for meters).
   */
  yAxis?: string;
};

/**
 * Options for the profile.
 */
type ProfileOptions<T> = {
  linesConfiguration?: {[x: string]: LineConfiguration};

  /**
   * Formatter giving full control on how numbers are formatted.
   */
  formatter?: ProfileFormatter;
  /**
   * Extract the distance from origin of a point (an
   * item of the elevation data array).
   */
  distanceExtractor: (arg1: T) => number;
  /**
   * Extractor for parsing POI data.
   */
  poiExtractor?: PoiExtractor;
  /**
   * Allows to modify the raw x
   * and y scales. Notably, it is possible to modify the y domain according to XY ratio rules,
   * add padding or enforce y lower bound.
   */
  scaleModifier?: (arg1: () => void, arg2: () => void, arg3: number, arg4: number) => void;
  /**
   * A
   * callback called from the profile when the mouse moves over a point. The point, an item of the elevation
   * data array, is passed as the first argument of the function.
   */
  hoverCallback?: (
    arg1: Point,
    arg2: number,
    arg3: string,
    arg4: {[x: string]: number},
    arg5: string
  ) => void;
  /**
   * A callback called from the profile when the mouse leaves the profile.
   */
  outCallback?: () => void;
  i18n?: I18n;
};

@customElement('gmf-profilemerge-footer')
export default class GmfProfilemergeFooter extends GmfBaseElement {
  @state() private active = false;
  @state() private isErrored = false;
  @state() private isLoading = false;
  @state() private profileData: ProfileElement[] = [];
  @state() private profileHighlight = -1;
  @state() private profileOptions: ProfileOptions<ProfileElement> = null;
  @state() private currentPoint: ProfileHoverPointInformations;
  @state() private line: LineString = null;
  @state() private nbPoints_ = 100;
  @state() private layersNames_: string[] = [];
  @state() private map_: Map = null;
  @state() private measureTooltip_: olOverlay = null;
  @state() private measureTooltipElement_: HTMLElement = null;
  @state() private profileLabels_ = {
    xAxis: i18next.t('Distance'),
    yAxis: i18next.t('Elevation'),
  };
  @state() private snappedPoint_: Feature<Geometry> = new Feature();
  @state() private pointerMoveKey_: EventsKey = null;
  @state() private gmfProfileJsonUrl_: string = undefined;
  @state() private options: gmfProfileOptions = undefined;
  @state() private ngeoOptions: ngeoProfileOptions = undefined;

  static styles: CSSResult[] = [
    ...GmfBaseElement.styles,
    css`
      .spinner-profile {
        width: 100%;
        i {
          fill: black;
          margin-top: 2rem;
          margin-left: 50%;
          margin-right: 50%;
        }
      }
    `,
  ];

  // FIXME: csv + hoverlay
  // pointHoverOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();
  // ngeoCsvDownload_ = ngeoCsvDownload;
  // pointHoverOverlay_.addFeature(this.snappedPoint_);

  /**
   * @type {function():import('ol/Map').default}
   */
  getMapFn: () => import('ol/Map').default = (): import('ol/Map').default => null;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getOptionsFn = () => ({});

  connectedCallback(): void {
    super.connectedCallback();

    this.subscriptions.push(
      config.getConfig().subscribe({
        next: (properties: Configuration) => {
          if (properties) {
            this.gmfProfileJsonUrl_ = properties.gmfProfileJsonUrl;
            this.options = properties.gmfProfileOptions;
            this.ngeoOptions = properties.ngeoProfileOptions;

            this.map_ = this.getMapFn();
            this.nbPoints_ = this.options.numberOfPoints || 100;

            //this.pointHoverOverlay_.setStyle(buildStyle(this.options.hoverPointStyle));

            for (const name in this.ngeoOptions.linesConfiguration) {
              // Keep an array of all layer names.
              this.layersNames_.push(name);
              // Add generic zExtractor to lineConfiguration object that doesn't have one.
              const lineConfig = this.ngeoOptions.linesConfiguration[name];
              if (!lineConfig.zExtractor) {
                // @ts-ignore: There look to have a type error in d3
                this.ngeoOptions.linesConfiguration[name].zExtractor = this.getZFactory_(name);
              }
            }

            this.profileOptions = {
              linesConfiguration: this.ngeoOptions.linesConfiguration,
              distanceExtractor: this.getDist_.bind(this),
              hoverCallback: this.hoverCallback_.bind(this),
              outCallback: this.outCallback_.bind(this),
              i18n: this.profileLabels_,
            };

            const optionsFn = this.getOptionsFn;
            if (optionsFn) {
              const options = optionsFn();
              if (!options) {
                throw new Error('Missing options');
              }
              Object.assign(this.profileOptions, options);
            }
          }

          this.updateEventsListening_();
        },
      })
    );
  }

  protected render(): TemplateResult {
    // FIXME: array.map() -> undefined

    // const liRepeatTmpl = html`
    //   ${this.getLayersNames().map((name) => {
    //     html`
    //       <i class="fa fa-minus" .style="${this.getStyle(name)}"></i>
    //       ${i18next.t('name')}
    //       ${!this.currentPoint.elevations[name] !== null
    //         ? html` <span> ${this.currentPoint.elevations[name]} ${this.currentPoint.yUnits} </span> `
    //         : ``}
    //     `;
    //   })}
    // `;

    return html`
      <div class="gmf-profile-container panel" ?hidden="${this.active}">
        <div class="spinner-profile" ?hidden="${this.isLoading}">
          <i class="fa fa-spin svg-spinner"
            >${
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              unsafeSVG(loadingSvg)
            }</i
          >
        </div>

        ${!this.isErrored && !this.isLoading
          ? html` <div
              class="ngeo-profile"
              ngeo-profile="this.profileData"
              .ngeo-profile-highlight="${this.profileHighlight}"
              .ngeo-profile-options="${this.profileOptions}"
            ></div>`
          : ``}
        ${!this.isErrored && !this.isLoading
          ? html`
              <ul class="gmf-profile-legend">
                ${this.layersNames_ !== undefined ? 'liRepeatTmpl' : ''}
              </ul>
            `
          : ``}

        <div class="gmf-profile-export btn-group dropup" ?hidden="${!this.isErrored && !this.isLoading}">
          <a
            class="dropdown-toggle"
            href=""
            ?hidden=${this.profileData.length !== 0}
            data-toggle="dropdown"
            aria-expanded="false"
          >
            ${i18next.t('Export')}
          </a>

          <ul class="dropdown-menu dropdown-menu-right" role="menu">
            <li>
              <a href="" @click="${() => this.downloadCsv()}">
                <i class="fa fa-table"></i>&nbsp;${i18next.t('Download CSV')}</a
              >
            </li>
          </ul>
        </div>

        <div ?hidden=${this.isErrored} class="gmf-profile-error">
          <p>${i18next.t('The profile service does not respond, please try later.')}</p>
        </div>
      </div>
    `;
  }

  update_(): void {
    this.isErrored = false;
    if (this.line) {
      this.getJsonProfile_();
    } else {
      this.profileData = [];
    }
    this.active = !!this.line;
    const panelOptions = {
      state: this.active,
    };
    panels.openFooterPanel('profileresult', panelOptions);
  }

  updateEventsListening_(): void {
    if (this.active && this.map_ !== null) {
      this.pointerMoveKey_ = listen(
        this.map_,
        'pointermove',
        /**
         * @param {import('ol/MapBrowserEvent').default<MouseEvent>} mapBrowserEvent .
         */
        (mapBrowserEvent) => {
          if (!this.map_) {
            throw new Error('Missing map');
          }
          if (mapBrowserEvent.dragging || !this.line) {
            return;
          }
          const coordinate = this.map_.getEventCoordinate(mapBrowserEvent.originalEvent);
          const closestPoint = this.line.getClosestPoint(coordinate);
          // compute distance to line in pixels
          const eventToLine = new olGeomLineString([closestPoint, coordinate]);
          const resolution = this.map_.getView().getResolution();
          if (resolution === undefined) {
            throw new Error('Missing resolution');
          }
          const pixelDist = eventToLine.getLength() / resolution;

          if (pixelDist < 16) {
            this.profileHighlight = this.getDistanceOnALine_(closestPoint);
          } else {
            this.profileHighlight = -1;
          }
          // FIXME: update ui
          //this.$scope_.$apply();
        }
      );
    } else {
      if (this.pointerMoveKey_) {
        unlistenByKey(this.pointerMoveKey_);
      }
    }
  }

  /**
   * Return the distance between the beginning of the line and the given point.
   * The point must be on the line. If not, this function will return the total
   * length of the line.
   *
   * @param {import('ol/coordinate').Coordinate} pointOnLine A point on the given line.
   * @returns {number} A distance.
   */
  getDistanceOnALine_(pointOnLine: OlCoordinateCoordinate): number {
    if (!this.line) {
      throw new Error('Missing line');
    }
    let segment;
    let distOnLine = 0;
    /** @type {[number, number, number, number]} */
    const fakeExtent: [number, number, number, number] = [
      pointOnLine[0] - 0.5,
      pointOnLine[1] - 0.5,
      pointOnLine[0] + 0.5,
      pointOnLine[1] + 0.5,
    ];
    this.line.forEachSegment((firstPoint, lastPoint) => {
      segment = new olGeomLineString([firstPoint, lastPoint]);
      // Is the pointOnLine on this swegement ?
      if (segment.intersectsExtent(fakeExtent)) {
        // If the closestPoint is on the line, add the distance between the first
        // point of this segment and the pointOnLine.
        segment.setCoordinates([firstPoint, pointOnLine]);
        return (distOnLine += segment.getLength()); // Assign value and break;
      } else {
        // Do the sum of the length of each eventual previous segment.
        distOnLine += segment.getLength();
      }
    });
    return distOnLine;
  }

  /**
   * @param {Point} pointObject Point.
   * @param {number} dist distance on the line.
   * @param {string} xUnits X units label.
   * @param {Object<string, number>} elevationsRef Elevations references.
   * @param {string} yUnits Y units label.
   */
  hoverCallback_(
    pointObject: Point,
    dist: number,
    xUnits: string,
    elevationsRef: {[x: string]: number},
    yUnits: string
  ): void {
    const point = pointObject;
    // Update information point.
    const coordinate = [point.x, point.y];

    this.currentPoint.elevations = elevationsRef;
    this.currentPoint.distance = dist;
    this.currentPoint.xUnits = xUnits;
    this.currentPoint.yUnits = yUnits;
    this.currentPoint.coordinate = coordinate;

    // Update hover.
    const geom = new olGeomPoint(coordinate);
    this.createMeasureTooltip_();
    this.measureTooltipElement_.innerHTML = this.getTooltipHTML_();
    this.measureTooltip_.setPosition(coordinate);
    this.snappedPoint_.setGeometry(geom);
  }

  outCallback_(): void {
    // Reset information point.
    delete this.currentPoint.coordinate;
    delete this.currentPoint.distance;
    this.currentPoint.elevations = {};
    delete this.currentPoint.xUnits;
    delete this.currentPoint.yUnits;

    // Reset hover.
    this.removeMeasureTooltip_();
    this.snappedPoint_.setGeometry(undefined);
  }

  /**
   * @returns {string} A text formatted to a tooltip.
   */
  getTooltipHTML_(): string {
    const separator = '&nbsp;: ';
    let elevationName, translatedElevationName;
    const innerHTML = [];
    const DistDecimal = this.currentPoint.xUnits === 'm' ? 0 : 2;
    const value = this.formatDecimals(this.currentPoint.distance, DistDecimal);
    innerHTML.push(`${this.profileLabels_.xAxis} ${separator} ${value}&nbsp;${this.currentPoint.xUnits}`);
    for (elevationName in this.currentPoint.elevations) {
      translatedElevationName = i18next.t(elevationName);
      const intValue = this.currentPoint.elevations[elevationName];
      const value =
        intValue === null
          ? i18next.t('no value')
          : `${this.formatDecimals(intValue, 0)}&nbsp;${this.currentPoint.yUnits}`;
      innerHTML.push(`${translatedElevationName} ${separator} ${value}`);
    }
    return innerHTML.join('</br>');
  }

  formatDecimals(num: number, decimals: number): number {
    return Number((Math.round(num * 100) / 100).toFixed(decimals));
  }

  /**
   * Creates a new 'hover' tooltip
   */
  createMeasureTooltip_(): void {
    if (!this.map_) {
      throw new Error('Missing map');
    }
    this.removeMeasureTooltip_();
    this.measureTooltipElement_ = document.createElement('div');
    this.measureTooltipElement_.className += 'tooltip ngeo-tooltip-measure';
    this.measureTooltip_ = new olOverlay({
      element: this.measureTooltipElement_,
      offset: [0, -15],
      positioning: 'bottom-center',
    });
    this.map_.addOverlay(this.measureTooltip_);
  }

  /**
   * Destroy the 'hover' tooltip
   */
  removeMeasureTooltip_(): void {
    if (this.measureTooltipElement_ !== null) {
      if (!this.map_) {
        throw new Error('Missing map');
      }
      if (!this.measureTooltip_) {
        throw new Error('Missing measureTooltip_');
      }
      if (!this.measureTooltipElement_.parentNode) {
        throw new Error('Missing measureTooltipElement_.parentNode');
      }
      this.measureTooltipElement_.parentNode.removeChild(this.measureTooltipElement_);
      this.measureTooltipElement_ = null;
      this.map_.removeOverlay(this.measureTooltip_);
    }
  }

  /**
   * Return the styler value of a ProfileLineConfiguration.
   *
   * @param {string} layerName name of the elevation layer.
   * @returns {object} The object representation of the style.
   */
  getStyle(layerName: string): any {
    const lineConfiguration = this.ngeoOptions.linesConfiguration[layerName];
    if (!lineConfiguration) {
      return {};
    }
    return {
      'color': lineConfiguration.color || '#F00',
    };
  }

  /**
   * Return a copy of the existing layer names.
   *
   * @returns {string[]} The names of layers.
   */
  getLayersNames(): string[] {
    return this.layersNames_.slice(0);
  }

  /**
   * @param {string} layerName name of the elevation layer.
   * @returns {function(ProfileElement): number} Z extractor function.
   */
  getZFactory_(layerName: string): (arg0: ProfileElement) => number {
    /**
     * Generic GMF extractor for the 'given' value in 'values' in profileData.
     *
     * @param {ProfileElement} item The item.
     * @returns {number|null} The elevation or `null` if the value is not present in the data.
     * @private
     */
    const getZFn = function (item: ProfileElement): number | null {
      if ('values' in item && layerName in item.values && item.values[layerName]) {
        return item.values[layerName];
      }
      return null;
    };
    return getZFn;
  }

  /**
   * Extractor for the 'dist' value in profileData.
   *
   * @param {ProfileElement} item The item.
   * @returns {number} The distance.
   */
  getDist_(item: ProfileElement): number {
    if ('dist' in item) {
      return item.dist;
    }
    return 0;
  }

  /**
   * Request the profile.
   */
  getJsonProfile_(): void {
    if (!this.line) {
      throw new Error('Missing line');
    }

    this.isLoading = true;

    const geom = {
      'type': 'LineString',
      'coordinates': this.line.getCoordinates(),
    };

    const params = {
      'layers': this.layersNames_.join(','),
      'geom': JSON.stringify(geom),
      'nbPoints': this.nbPoints_,
    };

    const options = {
      method: 'POST',
      params: $.param(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    fetch(this.gmfProfileJsonUrl_, options)
      .then((resp: Response) => resp.json())
      .then((data: ProfileServiceResult) => {
        const profileData = data.profile;
        if (profileData instanceof Array) {
          this.isLoading = false;
          this.profileData = profileData;
        }
      })
      .catch(() => {
        this.isLoading = false;
        this.isErrored = true;
        throw new Error('Can not get JSON profile.');
      });
  }

  downloadCsv(): void {
    if (this.profileData.length === 0) {
      return;
    }

    const headers: NgeoDownloadCsvGridColumnDef[] = [];
    let hasDistance = false;
    const firstPoint = this.profileData[0];
    if ('dist' in firstPoint) {
      headers.push({name: 'distance'});
      hasDistance = true;
    }
    const layers: string[] = [];
    for (const layer in firstPoint.values) {
      headers.push({'name': layer});
      layers.push(layer);
    }
    headers.push({name: 'x'});
    headers.push({name: 'y'});

    const rows = this.profileData.map((point) => {
      const row: {[x: string]: unknown} = {};
      if (hasDistance) {
        row.distance = point.dist;
      }

      layers.forEach((layer) => {
        row[layer] = point.values[layer];
      });

      row.x = point.x;
      row.y = point.y;

      return row;
    });

    // FIXME: import ngeoCSVDownloads
    console.log(rows);
    //this.ngeoCsvDownload_.startDownload(rows, headers, 'profile.csv');
  }
}
