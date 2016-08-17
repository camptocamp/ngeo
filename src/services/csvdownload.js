goog.provide('ngeo.CsvDownload');

goog.require('ngeo');


/**
 * Service to generate and download a CSV file from tabular data.
 * Column headers are translated using {@link angularGettext.Catalog}.
 *
 * @param {angularGettext.Catalog} gettextCatalog Gettext service.
 * @constructor
 * @ngdoc service
 * @ngname ngeoCsvDownload
 * @ngInject
 */
ngeo.CsvDownload = function(gettextCatalog) {

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * Separator character.
   * @type {string}
   * @private
   */
  this.separator_ = ',';

  /**
   * Quote character.
   * @type {string}
   * @private
   */
  this.quote_ = '"';
};


/**
 * Generate a CSV.
 *
 * @param {Array.<Object>} data Entries/objects to include in the CSV.
 * @param {Array.<ngeox.GridColumnDef>} columnDefs Column definitions.
 * @return {string} The CSV file as string.
 * @export
 */
ngeo.CsvDownload.prototype.generateCsv = function(data, columnDefs) {
  if (data.length == 0 || columnDefs.length == 0) {
    return '';
  }

  var translatedColumnHeaders = columnDefs.map(function(columnHeader) {
    return this.gettextCatalog_.getString(columnHeader.name);
  }.bind(this));

  var header = this.getRow_(translatedColumnHeaders);
  var dataRows = data.map(function(values) {
    var rowValues = columnDefs.map(function(columnHeader) {
      return values[columnHeader.name];
    });
    return this.getRow_(rowValues);
  }.bind(this));

  return header + dataRows.join('');
};


/**
 * @param {Array.<?>} values Values.
 * @return {string} CSV row.
 * @export
 */
ngeo.CsvDownload.prototype.getRow_ = function(values) {
  var matchAllQuotesRegex = new RegExp(this.quote_, 'g');
  var doubleQuote = this.quote_ + this.quote_;

  var rowValues = values.map(function(value) {
    if (value !== undefined && value !== null) {
      value = '' + value;
      // wrap each value into quotes and escape quotes with double quotes
      return this.quote_ + value.replace(matchAllQuotesRegex, doubleQuote) + this.quote_;
    } else {
      return '';
    }
  }.bind(this));

  return rowValues.join(this.separator_) + '\n';
};


/**
 * Generate a CSV and start a download with the generated file.
 *
 * @param {Array.<Object>} data Entries/objects to include in the CSV.
 * @param {Array.<ngeox.GridColumnDef>} columnDefs Column definitions.
 * @param {string} fileName The CSV file name.
 * @export
 */
ngeo.CsvDownload.prototype.startDownload = function(data, columnDefs, fileName) {
  var fileContent = this.generateCsv(data, columnDefs);

  var hiddenElement = document.createElement('a');
  // FF requires the link to be in the body
  document.body.appendChild(hiddenElement);
  hiddenElement.href = 'data:attachment/csv,' + encodeURI(fileContent);
  hiddenElement.target = '_blank';
  hiddenElement.download = fileName;
  hiddenElement.click();
  document.body.removeChild(hiddenElement);
};

ngeo.module.service('ngeoCsvDownload', ngeo.CsvDownload);
