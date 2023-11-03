// The MIT License (MIT)
//
// Copyright (c) 2016-2023 Camptocamp SA
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

import angular from 'angular';
import {layerLoading} from 'ngeo/misc/decorate';
import olLayerImage from 'ol/layer/Image';
import olLayerGroup from 'ol/layer/Group';
import olSourceImage from 'ol/source/Image';

describe('ngeo.misc.DecorateLayerLoading test suite', () => {
  /** @type {angular.IScope} */
  let scope;

  beforeEach(
    angular.mock.inject(($rootScope) => {
      scope = $rootScope.$new();
    }),
  );

  it('should increment layerLoadingCount recursively', () => {
    const imageSource = new olSourceImage({});
    const layer = new olLayerImage({source: imageSource});
    const lg_1 = new olLayerGroup();
    const lg_2 = new olLayerGroup();

    layerLoading(layer, scope);
    layerLoading(lg_1, scope);
    layerLoading(lg_2, scope);

    lg_1.getLayers().insertAt(0, layer);
    lg_2.getLayers().insertAt(0, lg_1);

    expect(layer.get('load_count')).toBe(0);
    expect(lg_1.get('load_count')).toBe(0);
    expect(lg_2.get('load_count')).toBe(0);

    imageSource.dispatchEvent('imageloadstart');

    expect(layer.get('load_count')).toBe(1);
    expect(lg_1.get('load_count')).toBe(1);
    expect(lg_2.get('load_count')).toBe(1);

    imageSource.dispatchEvent('imageloadend');

    expect(layer.get('load_count')).toBe(0);
    expect(lg_1.get('load_count')).toBe(0);
    expect(lg_2.get('load_count')).toBe(0);
  });
});
