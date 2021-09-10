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
import ngeoDownloadService from 'ngeo/download/service';

/**
 * Definition for grid columns.
 *
 * @typedef {Object} GridColumnDef
 * @property {string} name Name of a column.
 */

/**
 * Service to generate and download a CSV file from tabular data.
 * Column headers are translated using {@link angular.gettext.gettextCatalog}.
 *
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {import('ngeo/download/service').Download} ngeoDownload The download service.
 * @param {import('ngeo/options').ngeoCsvEncoding} ngeoCsvEncoding The encoding.
 * @param {import('ngeo/options').ngeoCsvExtension} ngeoCsvExtension The extension.
 * @param {import('ngeo/options').ngeoCsvIncludeHeader} ngeoCsvIncludeHeader Has headers.
 * @param {import('ngeo/options').ngeoCsvQuote} ngeoCsvQuote The quote.
 * @param {import('ngeo/options').ngeoCsvSeparator} ngeoCsvSeparator The separator.
 * @class
 * @ngdoc service
 * @ngname ngeoCsvDownload
 * @ngInject
 * @hidden
 */
export function DownloadCsvService(
  gettextCatalog,
  ngeoDownload,
  ngeoCsvEncoding,
  ngeoCsvExtension,
  ngeoCsvIncludeHeader,
  ngeoCsvQuote,
  ngeoCsvSeparator
) {
  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * File encoding of the CSV file.
   * @type {import('ngeo/options').ngeoCsvEncoding}
   */
  this.encoding_ = ngeoCsvEncoding;

  /**
   * File extension of the CSV file.
   * @type {import('ngeo/options').ngeoCsvExtension}
   */
  this.extension_ = ngeoCsvExtension;

  /**
   * Whether to include the header in the exported file or not.
   * @type {import('ngeo/options').ngeoCsvIncludeHeader}
   */
  this.includeHeader_ = ngeoCsvIncludeHeader;

  /**
   * Quote character.
   * @type {import('ngeo/options').ngeoCsvQuote}
   */
  this.quote_ = ngeoCsvQuote;

  /**
   * Separator character.
   * @type {import('ngeo/options').ngeoCsvSeparator}
   */
  this.separator_ = ngeoCsvSeparator;

  /**
   * Download service.
   * @type {import('ngeo/download/service').Download}
   */
  this.download_ = ngeoDownload;
}

/**
 * Generate a CSV.
 *
 * @param {Object<string, any>[]} data Entries/objects to include in the CSV.
 * @param {GridColumnDef[]} columnDefs Column definitions.
 * @return {string} The CSV file as string.
 */
DownloadCsvService.prototype.generateCsv = function (data, columnDefs) {
  if (data.length == 0 || columnDefs.length == 0) {
    return '';
  }

  /** @type {any[]} */
  const translatedColumnHeaders = columnDefs.map((columnHeader) =>
    this.gettextCatalog_.getString(columnHeader.name)
  );

  const header = this.getRow_(translatedColumnHeaders);
  const dataRows = data.map((values) => {
    /** @type {any[]} */
    const rowValues = columnDefs.map((columnHeader) => values[columnHeader.name]);
    return this.getRow_(rowValues);
  });

  return this.includeHeader_ ? header + dataRows.join('') : dataRows.join('');
};

/**
 * @param {any[]} values Values.
 * @return {string} CSV row.
 */
DownloadCsvService.prototype.getRow_ = function (values) {
  const matchAllQuotesRegex = new RegExp(this.quote_, 'g');
  const doubleQuote = this.quote_ + this.quote_;

  const rowValues = values.map((value) => {
    if (value !== undefined && value !== null) {
      const strValue = `${value}`;
      // wrap each value into quotes and escape quotes with double quotes
      return `${this.quote_}${strValue.replace(matchAllQuotesRegex, doubleQuote)}${this.quote_}`;
    } else {
      return '';
    }
  });

  return `${rowValues.join(this.separator_)}\n`;
};

/**
 * Generate a CSV and start a download with the generated file.
 *
 * @param {Object[]} data Entries/objects to include in the CSV.
 * @param {GridColumnDef[]} columnDefs Column definitions.
 * @param {string} fileName The CSV file name, without the extension.
 */
DownloadCsvService.prototype.startDownload = function (data, columnDefs, fileName) {
  const fileContent = this.generateCsv(data, columnDefs);
  this.download_(fileContent, fileName, `text/csv;charset=${this.encoding_}`);
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoCsvDownload', [ngeoDownloadService.name]);
myModule.service('ngeoCsvDownload', DownloadCsvService);

export default myModule;
