import angular from 'angular';
import {DOTS_PER_INCH, INCHES_PER_METER} from 'ngeo/print/Utils.js';

describe('ngeo.print.Utils', () => {
  let ngeoPrintUtilsService;

  beforeEach(() => {
    angular.mock.inject((ngeoPrintUtils) => {
      ngeoPrintUtilsService = ngeoPrintUtils;
    });
  });

  describe('#getOptimalResolution', () => {
    it('returns the optimal resolution', () => {
      const mapSize = [2, 1]; // px
      const printMapSize = [
        (640 * DOTS_PER_INCH) / INCHES_PER_METER / 2,
        (320 * DOTS_PER_INCH) / INCHES_PER_METER / 2,
      ]; // dots
      const printScale = 10; // scale denominator
      const optimalResolution = ngeoPrintUtilsService.getOptimalResolution(mapSize, printMapSize, printScale);
      expect(optimalResolution).toBe(1.0322601290363873);
    });
  });
});
