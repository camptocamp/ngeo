// The MIT License (MIT)
//
// Copyright (c) 2020-2021 Camptocamp SA
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

import {BehaviorSubject} from 'rxjs';
import OlMap from 'ol/Map';

export class MapModel {
  /**
   * The observable map's properties.
   *
   * @private
   */
  map_: BehaviorSubject<OlMap> = new BehaviorSubject<OlMap>(null);

  /**
   * @returns the OpenLayers map.
   */
  getMap(): BehaviorSubject<OlMap> {
    return this.map_;
  }

  /**
   * Set the OpenLayers map.
   *
   * @param map the OpenLayers map
   */
  setMap(map: OlMap): void {
    this.map_.next(map);
  }
}

const map = new MapModel();
export default map;
