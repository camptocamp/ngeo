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

import {BehaviorSubject} from 'rxjs';
import OlGeomLineString from 'ol/geom/LineString';

/**
 * Object used to expose the OpenLayer map.
 *
 * Example of usage:
 * ```js
 *    (window as any).gmfapi.store.line.getLine().subscribe({
 *      next: (line: OlGeomLineString) => {
 *        if (line) {
 *          ...
 *        }
 *      },
 *    })
 * ```
 */
export class LineModel {
  /**
   * The observable line's properties.
   *
   * @private
   */
  line_: BehaviorSubject<OlGeomLineString> = new BehaviorSubject<OlGeomLineString>(null);

  /**
   * Get the lines
   *
   * @returns {BehaviorSubject<OlGeomLineString>} The existing line.
   */
  getLine(): BehaviorSubject<OlGeomLineString> {
    return this.line_;
  }

  /**
   * Set the line.
   *
   * @param line The line
   */
  setLine(line: OlGeomLineString): void {
    this.line_.next(line);
  }
}

const line = new LineModel();
export default line;
