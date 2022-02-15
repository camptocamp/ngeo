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

import {Subscription} from 'rxjs';

import olCollection from 'ol/Collection';
import olInteractionDraw from 'ol/interaction/Draw';
import olStyleStyle from 'ol/style/Style';
import olStyleStroke from 'ol/style/Stroke';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';
import {interactionDecoration} from 'ngeo/misc/decorate';

import OlMap from 'ol/Map';
import OlGeomLineString from 'ol/geom/LineString';
import OlCollection from 'ol/Collection';
import OlFeature from 'ol/Feature';
import OlGeomGeometry from 'ol/geom/Geometry';
import OlInteractionDraw from 'ol/interaction/Draw';
import {DrawEvent} from 'ol/interaction/Draw';

import line from 'gmfapi/store/line';
import map from 'gmfapi/store/map';
import panels from 'gmfapi/store/panels';

export class GmfDrawLine {
  /**
   * @private
   */
  map_: OlMap | undefined;

  active: boolean;

  line: OlGeomLineString | undefined;

  /**
   * @private
   */
  features_: OlCollection<OlFeature<OlGeomGeometry>>;

  interaction: OlInteractionDraw;

  subscriptions: Subscription[];

  constructor() {
    /**
     * @private
     */
    this.map_ = null;

    this.line = null;

    this.features_ = new olCollection();

    const overlay = ngeoMapFeatureOverlayMgr.getFeatureOverlay();
    overlay.setFeatures(this.features_);
    const style_ = new olStyleStyle({
      stroke: new olStyleStroke({
        color: '#ffcc33',
        width: 2,
      }),
    });
    overlay.setStyle(style_);

    this.interaction = new olInteractionDraw({
      type: 'LineString',
      features: this.features_,
    });

    interactionDecoration(this.interaction);

    this.subscriptions = [];

    this.subscriptions.push(
      line.getLine().subscribe({
        next: (line: OlGeomLineString) => {
          if (line) {
            this.line = line;
          } else {
            // Line may be removed from an other component
            // for example closing the chart panel
            this.clear_();
          }
        },
      })
    );
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
          this.active = panel === 'lidar';
          if (this.active) {
            this.map_.addInteraction(this.interaction);
            this.initInteraction();
            // Will activate the interaction automatically the first time
            this.interaction.setActive(this.active);
          } else {
            if (this.map_) {
              this.map_.removeInteraction(this.interaction);
            }
            this.clear_();
          }
        },
      })
    );
  }

  /**
   * Init the draw interaction
   */
  initInteraction(): void {
    // Clear the line as soon as a new drawing is started.
    this.interaction.on('drawstart', () => {
      this.features_.clear();
    });

    // Update the profile with the new geometry.
    this.interaction.on('drawend', (event: DrawEvent) => {
      this.line = (event.feature as OlFeature<OlGeomLineString>).getGeometry();
      // using timeout to prevent double click to zoom the map
      setTimeout(() => {
        this.interaction.setActive(false);
        line.setLine(this.line);
      }, 0);
    });
  }

  /**
   * Clear the overlay and profile line.
   */
  clear_(): void {
    this.features_.clear();
    this.line = null;
  }
}

const gmfDrawLine = new GmfDrawLine();
export default gmfDrawLine;
