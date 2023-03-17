import angular from 'angular';
describe('ngeo.misc.filters', () => {
  let $filter;

  beforeEach(
    angular.mock.inject((_$filter_) => {
      $filter = _$filter_;
    })
  );

  it('Ngeo Scalify', () => {
    const ngeoScalify = $filter('ngeoScalify');
    expect(ngeoScalify(25000)).toBe('1\u00a0:\u00a025,000');
  });

  it('Ngeo Number format', () => {
    const number = $filter('ngeoNumber');
    expect(number(0)).toBe('0');
    expect(number(Infinity)).toBe('\u221e');
    expect(number(-Infinity)).toBe('-\u221e');
    expect(number(0.1234)).toBe('0.123');
    expect(number(1.234)).toBe('1.23');
    expect(number(-1.234)).toBe('-1.23');
    expect(number(12.34)).toBe('12.3');
    expect(number(123.4)).toBe('123');
    expect(number(1234)).toBe('1,230');
    expect(number(12340)).toBe('12,300');
    expect(number(0.1)).toBe('0.1');
    expect(number(0.01)).toBe('0.01');
    expect(number(1.23456789, 4)).toBe('1.235');
    expect(number(1.23456789, 6)).toBe('1.23457');
  });

  it('Ngeo Unit Prefix', () => {
    const unitPrefix = $filter('ngeoUnitPrefix');
    expect(unitPrefix(10)).toBe('10');
    expect(unitPrefix(10, 'm')).toBe('10\u00a0m');
    expect(unitPrefix(1000)).toBe('1\u00a0k');
    expect(unitPrefix(1000, 'm')).toBe('1\u00a0km');
    expect(unitPrefix(1000, 'm2', 'square')).toBe('1,000\u00a0m2');
    expect(unitPrefix(1000000, 'm2', 'square')).toBe('1\u00a0km2');
    expect(unitPrefix(1e19, 'm')).toBe('10,000\u00a0Pm');
    expect(unitPrefix(8192, 'o', 'binary')).toBe('8\u00a0Kio');
    expect(unitPrefix(1123.132, 'm')).toBe('1.12\u00a0km');
    expect(unitPrefix(1123.132, 'm', 'unit', 6)).toBe('1.12313\u00a0km');
  });

  it('Ngeo Number coordinates', () => {
    const ngeoNumberCoordinates = $filter('ngeoNumberCoordinates');
    let co = [7.1234, 46.9876];
    expect(ngeoNumberCoordinates(co)).toBe('7 47');
    expect(ngeoNumberCoordinates(co, 2, 'co {x} E; {y} N')).toBe('co 7.12 E; 46.99 N');

    co = [2600000, 1600000];
    expect(ngeoNumberCoordinates(co, 0, '{x}, {y}')).toBe('2,600,000, 1,600,000');
  });

  it('Ngeo DMS coordinates', () => {
    const ngeoDMSCoordinates = $filter('ngeoDMSCoordinates');
    const co = [7.1234, 46.9876];
    expect(ngeoDMSCoordinates(co)).toBe('7\u00b0 07\u2032 24\u2033 E 46\u00b0 59\u2032 15\u2033 N');
    expect(ngeoDMSCoordinates(co, 2, '[{y}; {x}]')).toBe(
      '[46\u00b0 59\u2032 15.36\u2033 N; 7\u00b0 07\u2032 24.24\u2033 E]'
    );
  });
});
