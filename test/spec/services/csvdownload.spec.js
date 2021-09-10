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
describe('ngeo.download.Csv', () => {
  /** @type {import('ngeo/download/Csv').DownloadCsvService} */
  let ngeoCsvDownload;

  beforeEach(
    angular.mock.inject((_ngeoCsvDownload_) => {
      ngeoCsvDownload = _ngeoCsvDownload_;
    })
  );

  describe('#generateCsv', () => {
    it('deals with no data', () => {
      expect(ngeoCsvDownload.generateCsv([], [])).toBe('');
    });

    it('generates a CSV', () => {
      const columnDefs = [{name: 'col 1'}, {name: 'col 2'}, {name: 'col 3'}];
      /**
       * @type {any[]}
       */
      const data = [
        {
          'col 1': 'some text',
          'col 2': 123,
          'col 3': true,
          'column that should be ignored': 'some text',
        },
        {
          'col 1': 'some "more" text',
          'col 2': null,
          'col 3': undefined,
        },
      ];
      const csv = ngeoCsvDownload.generateCsv(data, columnDefs);

      const expectedCsv =
        '"col 1","col 2","col 3"\n' + '"some text","123","true"\n' + '"some ""more"" text",,\n';

      expect(csv).toBe(expectedCsv);
    });
  });
});
