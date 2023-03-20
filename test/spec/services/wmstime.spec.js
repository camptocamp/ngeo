import angular from 'angular';
import {
  TimePropertyWidgetEnum,
  TimePropertyResolutionEnum,
  TimePropertyModeEnum,
} from 'ngeo/datasource/OGC.js';

describe('ngeo.misc.WMSTime service', () => {
  let ngeoWMSTime;

  const wmsTime = {
    widget: TimePropertyWidgetEnum.SLIDER,
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
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
      start: timeValues,
    });
    expect(timeParam).toBe('2014');

    wmsTime.resolution = 'month';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues,
    });
    expect(timeParam).toBe('2014-01');

    wmsTime.resolution = 'day';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues,
    });
    expect(timeParam).toBe('2014-01-01');

    wmsTime.resolution = 'second';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues,
    });
    expect(timeParam).toBe('2014-01-01T00:00:00Z');
  });

  it('should format the time regarding the resolution and with a mode set on range', () => {
    wmsTime.mode = 'range';
    wmsTime.resolution = 'year';
    const timeValues = ngeoWMSTime.getOptions(wmsTime)['values'];
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
