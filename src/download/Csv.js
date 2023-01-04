import angular from 'angular';
import ngeoDownloadService from 'ngeo/download/service.js';

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
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @constructor
 * @ngdoc service
 * @ngname ngeoCsvDownload
 * @ngInject
 * @hidden
 */
export function DownloadCsvService($injector, gettextCatalog) {
  /**
   * @type {angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * File extension of the CSV file.
   * @type {string}
   * @private
   */
  this.encoding_ = $injector.has('ngeoCsvEncoding') ? $injector.get('ngeoCsvEncoding') : 'utf-8';

  /**
   * File extension of the CSV file.
   * @type {string}
   * @private
   */
  this.extension_ = $injector.has('ngeoCsvExtension') ? $injector.get('ngeoCsvExtension') : '.csv';

  /**
   * Whether to include the header in the exported file or not.
   * @type {boolean}
   * @private
   */
  this.includeHeader_ = $injector.has('ngeoCsvIncludeHeader') ? $injector.get('ngeoCsvIncludeHeader') : true;

  /**
   * Quote character.
   * @type {string}
   * @private
   */
  this.quote_ = $injector.has('ngeoCsvQuote') ? $injector.get('ngeoCsvQuote') : '"';

  /**
   * Separator character.
   * @type {string}
   * @private
   */
  this.separator_ = $injector.has('ngeoCsvSeparator') ? $injector.get('ngeoCsvSeparator') : ',';

  /**
   * Download service.
   * @type {import('ngeo/download/service.js').Download}
   * @private
   */
  this.download_ = $injector.get('ngeoDownload');
}

/**
 * Generate a CSV.
 *
 * @param {Array.<Object>} data Entries/objects to include in the CSV.
 * @param {Array.<GridColumnDef>} columnDefs Column definitions.
 * @return {string} The CSV file as string.
 */
DownloadCsvService.prototype.generateCsv = function (data, columnDefs) {
  if (data.length == 0 || columnDefs.length == 0) {
    return '';
  }

  const translatedColumnHeaders = columnDefs.map((columnHeader) =>
    this.gettextCatalog_.getString(columnHeader.name)
  );

  const header = this.getRow_(translatedColumnHeaders);
  const dataRows = data.map((values) => {
    const rowValues = columnDefs.map((columnHeader) => values[columnHeader.name]);
    return this.getRow_(rowValues);
  });

  return this.includeHeader_ ? header + dataRows.join('') : dataRows.join('');
};

/**
 * @param {Array.<?>} values Values.
 * @return {string} CSV row.
 * @private
 */
DownloadCsvService.prototype.getRow_ = function (values) {
  const matchAllQuotesRegex = new RegExp(this.quote_, 'g');
  const doubleQuote = this.quote_ + this.quote_;

  const rowValues = values.map((value) => {
    if (value !== undefined && value !== null) {
      value = `${value}`;
      // wrap each value into quotes and escape quotes with double quotes
      return this.quote_ + value.replace(matchAllQuotesRegex, doubleQuote) + this.quote_;
    } else {
      return '';
    }
  });

  return `${rowValues.join(this.separator_)}\n`;
};

/**
 * Generate a CSV and start a download with the generated file.
 *
 * @param {Array.<Object>} data Entries/objects to include in the CSV.
 * @param {Array.<GridColumnDef>} columnDefs Column definitions.
 * @param {string} fileName The CSV file name, without the extension.
 */
DownloadCsvService.prototype.startDownload = function (data, columnDefs, fileName) {
  const fileContent = this.generateCsv(data, columnDefs);
  this.download_(fileContent, fileName, `text/csv;charset=${this.encoding_}`);
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoCsvDownload', [ngeoDownloadService.name]);
module.service('ngeoCsvDownload', DownloadCsvService);

export default module;
