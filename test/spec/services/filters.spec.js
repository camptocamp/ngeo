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
describe('ngeo.misc.filters', () => {
  /** @type {angular.IFilterService} */
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
    expect(unitPrefix(999.51, 'm')).toBe('1\u00a0km');
    expect(unitPrefix(999.49, 'm')).toBe('999\u00a0m');
    expect(unitPrefix(995.1, 'm', undefined, 2)).toBe('1\u00a0km');
    expect(unitPrefix(994.9, 'm', undefined, 2)).toBe('990\u00a0m');
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
