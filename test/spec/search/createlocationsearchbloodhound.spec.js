// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import ngeoTestDataGeoAdminLocationSearch from '../data/geoAdminLocationSearch';
import * as olProj from 'ol/proj';

describe('ngeo.search.createLocationSearchBloodhound', () => {
  /**
   * @type {import('ngeo/search/createLocationSearchBloodhound').createLocationSearchBloodhoundFunction}
   */
  let ngeoCreateLocationSearchBloodhound;

  beforeEach(() => {
    angular.mock.inject((_ngeoCreateLocationSearchBloodhound_) => {
      ngeoCreateLocationSearchBloodhound = _ngeoCreateLocationSearchBloodhound_;
    });
  });

  it('Parses the features correctly', () => {
    const bloodhound = ngeoCreateLocationSearchBloodhound({
      targetProjection: olProj.get('EPSG:3857'),
      limit: 5,
    });
    const transform = bloodhound.remote.transform;

    const features = transform(ngeoTestDataGeoAdminLocationSearch);
    expect(features.length).toBe(5);

    const feature = features[0];
    expect(feature.getId()).toBe('5586');
    expect(feature.get('label')).toBe('<i>Populated Place</i> <b>Lausanne</b> (VD) - Lausanne');
    expect(feature.get('label_no_html')).toBe('Populated Place Lausanne (VD) - Lausanne');
    expect(feature.get('label_simple')).toBe('Lausanne');

    expect(feature.getGeometry().getCoordinates()).arrayToBeCloseTo([745348.9689, 5869543.255]);
    expect(feature.get('bbox')).arrayToBeCloseTo([732811.7205, 5861483.7511, 748269.0879, 5877508.3355]);
  });
});
