// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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

import {Subscription} from 'rxjs';
import i18next from 'i18next';
import configuration, {
  Configuration,
  ngeoCsvEncoding,
  ngeoCsvExtension,
  ngeoCsvIncludeHeader,
  ngeoCsvQuote,
  ngeoCsvSeparator,
} from 'gmfapi/store/config';
import {download} from 'ngeo/download/service';

/**
 * Definition for grid columns.
 */
type GridColumnDef = {
  /**
   * Name of a column.
   */
  name: string;
};

export class DownloadCsvService {
  encoding_: ngeoCsvEncoding;
  extension_: ngeoCsvExtension;
  includeHeader_: ngeoCsvIncludeHeader;
  quote_: ngeoCsvQuote;
  separator_: ngeoCsvSeparator;
  subscriptions: Subscription[] = [];

  constructor() {
    this.subscriptions.push(
      configuration.getConfig().subscribe({
        next: (configuration: Configuration) => {
          if (configuration) {
            this.encoding_ = configuration.ngeoCsvEncoding;
            this.extension_ = configuration.ngeoCsvExtension;
            this.includeHeader_ = configuration.ngeoCsvIncludeHeader;
            this.quote_ = configuration.ngeoCsvQuote;
            this.separator_ = configuration.ngeoCsvSeparator;
          }
        },
      })
    );
  }

  /**
   * Generate a CSV.
   *
   * @param {Object<string, any>[]} data Entries/objects to include in the CSV.
   * @param {GridColumnDef[]} columnDefs Column definitions.
   * @returns {string} The CSV file as string.
   */
  generateCsv(data: {[x: string]: any}[], columnDefs: GridColumnDef[]): string {
    if (data.length == 0 || columnDefs.length == 0) {
      return '';
    }

    const translatedColumnHeaders: any[] = columnDefs.map((columnHeader: GridColumnDef) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      i18next.t(columnHeader.name)
    );

    const header = this.getRow_(translatedColumnHeaders);
    const dataRows = data.map((values) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      const rowValues: any[] = columnDefs.map((columnHeader: GridColumnDef) => values[columnHeader.name]);
      return this.getRow_(rowValues);
    });

    return this.includeHeader_ ? header + dataRows.join('') : dataRows.join('');
  }

  /**
   * @param {any[]} values Values.
   * @returns {string} CSV row.
   */
  getRow_(values: any[]): string {
    const matchAllQuotesRegex = new RegExp(this.quote_, 'g');
    const doubleQuote = this.quote_ + this.quote_;

    const rowValues = values.map((value) => {
      if (value !== undefined && value !== null) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const strValue = `${value}`;
        // wrap each value into quotes and escape quotes with double quotes
        return `${this.quote_}${strValue.replace(matchAllQuotesRegex, doubleQuote)}${this.quote_}`;
      } else {
        return '';
      }
    });

    return `${rowValues.join(this.separator_)}\n`;
  }

  /**
   * Generate a CSV and start a download with the generated file.
   *
   * @param {Object<string, any>[]} data Entries/objects to include in the CSV.
   * @param {GridColumnDef[]} columnDefs Column definitions.
   * @param {string} fileName The CSV file name, without the extension.
   */
  startDownload(data: {[x: string]: any}[], columnDefs: GridColumnDef[], fileName: string): void {
    const fileContent = this.generateCsv(data, columnDefs);
    download(fileContent, fileName, `text/csv;charset=${this.encoding_}`);
  }
}

const downloadCsvService = new DownloadCsvService();
export default downloadCsvService;
