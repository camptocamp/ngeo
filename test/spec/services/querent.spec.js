// The MIT License (MIT)
//
// Copyright (c) 2020 Camptocamp SA
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

// @ts-nocheck
import angular from 'angular';

describe('ngeo.Querent', () => {
  /** @type {import('ngeo/query/Querent').Querent} */
  let ngeoQuerent;

  beforeEach(() => {
    angular.mock.inject((_ngeoQuerent_) => {
      ngeoQuerent = _ngeoQuerent_;
    });
  });

  it('Buffers bbox with queryIconPosition', () => {
    const resolution = 10;
    const bbox = [50, 51, 52, 53];

    let result = ngeoQuerent.bufferBboxWithQueryIconPosition_([], resolution, bbox);
    expect(result).toBe(null);

    result = ngeoQuerent.bufferBboxWithQueryIconPosition_([1], resolution, bbox);
    expect(result).toEqual([40, 41, 62, 63]);

    result = ngeoQuerent.bufferBboxWithQueryIconPosition_([1, 2], resolution, bbox);
    expect(result).toEqual([40, 31, 62, 73]);

    result = ngeoQuerent.bufferBboxWithQueryIconPosition_([1, 2, 3], resolution, bbox);
    expect(result).toEqual([40, 31, 82, 73]);

    result = ngeoQuerent.bufferBboxWithQueryIconPosition_([1, 2, 3, 4], resolution, bbox);
    expect(result).toEqual([40, 31, 82, 93]);

    result = ngeoQuerent.bufferBboxWithQueryIconPosition_([0, 0, 0, 4], resolution, bbox);
    expect(result).toEqual([50, 51, 52, 93]);

    result = ngeoQuerent.bufferBboxWithQueryIconPosition_([1, 2, 3, 4, 5], resolution, bbox);
    expect(result).toBe(null);
  });
});
