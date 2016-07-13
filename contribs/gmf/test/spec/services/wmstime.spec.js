/*global describe beforeEach inject expect it*/

goog.require('gmf.WMSTime');

describe('gmfWMSTime service', function() {
  var gmfWMSTime;

  var wmsTime = {
    widget: /** @type {ngeox.TimePropertyWidgetEnum} */ ('slider'),
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: /** @type {ngeox.TimePropertyResolutionEnum}*/ ('year'),
    mode: /** @type {ngeox.TimePropertyModeEnum} */ ('value'),
    interval : [0,0,1,0]
  };

  beforeEach(function() {
    inject(function($injector) {
      gmfWMSTime = $injector.get('gmfWMSTime');
    });
  });

  it('should format the time regarding the resolution and with a mode set on value', function() {
    var timeValues = gmfWMSTime.getOptions(wmsTime)['values'];
    var timeParam = gmfWMSTime.formatWMSTimeParam(wmsTime, {
      start :  timeValues
    });
    expect(timeParam).toBe('2014');

    wmsTime.resolution = 'month';
    timeParam = gmfWMSTime.formatWMSTimeParam(wmsTime, {
      start :  timeValues
    });
    expect(timeParam).toBe('2014-01');

    wmsTime.resolution = 'day';
    timeParam = gmfWMSTime.formatWMSTimeParam(wmsTime, {
      start :  timeValues
    });
    expect(timeParam).toBe('2014-01-01');

    wmsTime.resolution = 'second';
    timeParam = gmfWMSTime.formatWMSTimeParam(wmsTime, {
      start :  timeValues
    });
    expect(timeParam).toBe('2014-01-01T00:00:00Z');
  });


  it('should format the time regarding the resolution and with a mode set on range', function() {
    wmsTime.mode = 'range';
    wmsTime.resolution = 'year';
    var timeValues = gmfWMSTime.getOptions(wmsTime)['values'];
    var timeParam = gmfWMSTime.formatWMSTimeParam(wmsTime, {
      start :  timeValues[0],
      end : timeValues[1]
    });
    expect(timeParam).toBe('2014/2015');

    wmsTime.resolution = 'month';
    timeParam = gmfWMSTime.formatWMSTimeParam(wmsTime, {
      start :  timeValues[0],
      end : timeValues[1]
    });
    expect(timeParam).toBe('2014-01/2015-12');

    wmsTime.resolution = 'day';
    timeParam = gmfWMSTime.formatWMSTimeParam(wmsTime, {
      start :  timeValues[0],
      end : timeValues[1]
    });
    expect(timeParam).toBe('2014-01-01/2015-12-31');

    wmsTime.resolution = 'second';
    timeParam = gmfWMSTime.formatWMSTimeParam(wmsTime, {
      start :  timeValues[0],
      end : timeValues[1]
    });
    expect(timeParam).toBe('2014-01-01T00:00:00Z/2015-12-31T00:00:00Z');
  });

});
