/*global describe beforeEach inject expect it*/

goog.require('ngeo.WMSTime');

describe('ngeoWMSTime service', () => {
  let ngeoWMSTime;

  const wmsTime = {
    widget: /** @type {ngeox.TimePropertyWidgetEnum} */ ('slider'),
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: /** @type {ngeox.TimePropertyResolutionEnum}*/ ('year'),
    mode: /** @type {ngeox.TimePropertyModeEnum} */ ('value'),
    interval: [0, 0, 1, 0]
  };

  beforeEach(() => {
    inject(($injector) => {
      ngeoWMSTime = $injector.get('ngeoWMSTime');
    });
  });

  it('should format the time regarding the resolution and with a mode set on value', () => {
    const timeValues = ngeoWMSTime.getOptions(wmsTime)['values'];
    let timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues
    });
    expect(timeParam).toBe('2014');

    wmsTime.resolution = 'month';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues
    });
    expect(timeParam).toBe('2014-01');

    wmsTime.resolution = 'day';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues
    });
    expect(timeParam).toBe('2014-01-01');

    wmsTime.resolution = 'second';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues
    });
    expect(timeParam).toBe('2014-01-01T00:00:00Z');
  });


  it('should format the time regarding the resolution and with a mode set on range', () => {
    wmsTime.mode = 'range';
    wmsTime.resolution = 'year';
    const timeValues = ngeoWMSTime.getOptions(wmsTime)['values'];
    let timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues[0],
      end: timeValues[1]
    });
    expect(timeParam).toBe('2014/2015');

    wmsTime.resolution = 'month';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues[0],
      end: timeValues[1]
    });
    expect(timeParam).toBe('2014-01/2015-12');

    wmsTime.resolution = 'day';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues[0],
      end: timeValues[1]
    });
    expect(timeParam).toBe('2014-01-01/2015-12-31');

    wmsTime.resolution = 'second';
    timeParam = ngeoWMSTime.formatWMSTimeParam(wmsTime, {
      start: timeValues[0],
      end: timeValues[1]
    });
    expect(timeParam).toBe('2014-01-01T00:00:00Z/2015-12-31T00:00:00Z');
  });

});
