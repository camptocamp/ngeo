goog.require('ngeo.PrintUtils');

describe('ngeo.PrintUtils', function() {

  var ngeoPrintUtils;

  beforeEach(function() {
    inject(function($injector) {
      printUtils = $injector.get('ngeoPrintUtils');
    });
  });

  describe('#getOptimalResolution', function() {

    var inchesPerMeter, dotsPerInch;

    beforeEach(function() {
      inchesPerMeter = ngeo.PrintUtils.INCHES_PER_METER_;
      dotsPerInch = ngeo.PrintUtils.DOTS_PER_INCH_;

      // consider 3200 dots per meter
      ngeo.PrintUtils.INCHES_PER_METER_ = 40;
      ngeo.PrintUtils.DOTS_PER_INCH_ = 80;
    });

    afterEach(function() {
      ngeo.PrintUtils.INCHES_PER_METER_ = inchesPerMeter;
      ngeo.PrintUtils.DOTS_PER_INCH_ = dotsPerInch;
    });

    it('returns the optimal resolution', function() {
      var mapSize = [2, 1];  // px
      var printMapSize = [640, 320];  // dots
      var printScale = 10;  // scale denominator
      var optimalResolution = printUtils.getOptimalResolution(
          mapSize, printMapSize, printScale);
      expect(optimalResolution).toBe(1);
    });
  });
});
