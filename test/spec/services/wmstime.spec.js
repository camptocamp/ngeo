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

import angular from 'angular';
import {TimePropertyWidgetEnum, TimePropertyResolutionEnum, TimePropertyModeEnum} from 'ngeo/datasource/OGC';

describe('ngeo.misc.WMSTime service', () => {
  /** @type {import('ngeo/misc/WMSTime').WMSTime} */
  let ngeoWMSTime;

  /** @type {import('ngeo/datasource/OGC').TimeProperty} */
  const wmsTime = {
    widget: TimePropertyWidgetEnum.SLIDER,
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    resolution: TimePropertyResolutionEnum.YEAR,
    mode: TimePropertyModeEnum.VALUE,
    interval: [0, 0, 1, 0],
  };

  beforeEach(() => {
    angular.mock.inject((_ngeoWMSTime_) => {
      ngeoWMSTime = _ngeoWMSTime_;
    });
  });

  it('should format the time regarding the resolution and with a mode set on value', () => {
    wmsTime.mode = 'value';
    wmsTime.resolution = 'year';
    const timeValues = ngeoWMSTime.getOptions(wmsTime)['values'];
    let timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: /** @type {number} */ (timeValues),
    });
    expect(timeParam).toBe('2014');

    wmsTime.resolution = 'month';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: /** @type {number} */ (timeValues),
    });
    expect(timeParam).toBe('2014-01');

    wmsTime.resolution = 'day';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: /** @type {number} */ (timeValues),
    });
    expect(timeParam).toBe('2014-01-01');

    wmsTime.resolution = 'second';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: /** @type {number} */ (timeValues),
    });
    expect(timeParam).toBe('2014-01-01T00:00:00Z');
  });

  it('should format the time regarding the resolution and with a mode set on range', () => {
    wmsTime.mode = 'range';
    wmsTime.resolution = 'year';
    const timeValues = ngeoWMSTime.getOptions(wmsTime).values;
    if (!Array.isArray(timeValues)) {
      throw new Error('Wrong time values type');
    }

    let timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues[0],
      end: timeValues[1],
    });
    expect(timeParam).toBe('2014/2015');

    wmsTime.resolution = 'month';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues[0],
      end: timeValues[1],
    });
    expect(timeParam).toBe('2014-01/2015-12');

    wmsTime.resolution = 'day';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues[0],
      end: timeValues[1],
    });
    expect(timeParam).toBe('2014-01-01/2015-12-31');

    wmsTime.resolution = 'second';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues[0],
      end: timeValues[1],
    });
    expect(timeParam).toBe('2014-01-01T00:00:00Z/2015-12-31T00:00:00Z');
  });
});
