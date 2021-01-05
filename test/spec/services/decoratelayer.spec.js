// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
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

import {layerDecoration as ngeoMiscDecorateLayer} from 'ngeo/misc/decorate.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

describe('ngeo.misc.DecorateLayer', () => {
  it('can change the visibility', () => {
    const layer = new olLayerTile({
      source: new olSourceOSM(),
      visible: false,
    });
    ngeoMiscDecorateLayer(layer);
    layer.set('visible', true);
    expect(layer.getVisible()).toBe(true);
    layer.set('visible', false);
    expect(layer.getVisible()).toBe(false);
  });

  it('can change the opacity', () => {
    const layer = new olLayerTile({
      source: new olSourceOSM(),
      opacity: 0.5,
    });
    ngeoMiscDecorateLayer(layer);
    layer.set('opacity', 0.7);
    expect(layer.getOpacity()).toBe(0.7);
  });
});
