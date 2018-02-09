goog.require('ngeo.print.Utils');

describe('ngeo.print.Utils', () => {

  let ngeoPrintUtilsService;

  beforeEach(() => {
    angular.mock.inject((ngeoPrintUtils) => {
      ngeoPrintUtilsService = ngeoPrintUtils;
    });
  });

  describe('#getOptimalResolution', () => {

    let inchesPerMeter, dotsPerInch;

    beforeEach(() => {
      inchesPerMeter = ngeo.print.Utils.INCHES_PER_METER_;
      dotsPerInch = ngeo.print.Utils.DOTS_PER_INCH_;

      // consider 3200 dots per meter
      ngeo.print.Utils.INCHES_PER_METER_ = 40;
      ngeo.print.Utils.DOTS_PER_INCH_ = 80;
    });

    afterEach(() => {
      ngeo.print.Utils.INCHES_PER_METER_ = inchesPerMeter;
      ngeo.print.Utils.DOTS_PER_INCH_ = dotsPerInch;
    });

    it('returns the optimal resolution', () => {
      const mapSize = [2, 1];  // px
      const printMapSize = [640, 320];  // dots
      const printScale = 10;  // scale denominator
      const optimalResolution = ngeoPrintUtilsService.getOptimalResolution(
        mapSize, printMapSize, printScale);
      expect(optimalResolution).toBe(1);
    });
  });
});
