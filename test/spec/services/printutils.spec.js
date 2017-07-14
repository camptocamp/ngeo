goog.require('ngeo.PrintUtils');

describe('ngeo.PrintUtils', () => {

  let ngeoPrintUtils;

  beforeEach(() => {
    inject(($injector) => {
      ngeoPrintUtils = $injector.get('ngeoPrintUtils');
    });
  });

  describe('#getOptimalResolution', () => {

    let inchesPerMeter, dotsPerInch;

    beforeEach(() => {
      inchesPerMeter = ngeo.PrintUtils.INCHES_PER_METER_;
      dotsPerInch = ngeo.PrintUtils.DOTS_PER_INCH_;

      // consider 3200 dots per meter
      ngeo.PrintUtils.INCHES_PER_METER_ = 40;
      ngeo.PrintUtils.DOTS_PER_INCH_ = 80;
    });

    afterEach(() => {
      ngeo.PrintUtils.INCHES_PER_METER_ = inchesPerMeter;
      ngeo.PrintUtils.DOTS_PER_INCH_ = dotsPerInch;
    });

    it('returns the optimal resolution', () => {
      const mapSize = [2, 1];  // px
      const printMapSize = [640, 320];  // dots
      const printScale = 10;  // scale denominator
      const optimalResolution = ngeoPrintUtils.getOptimalResolution(
          mapSize, printMapSize, printScale);
      expect(optimalResolution).toBe(1);
    });
  });
});
