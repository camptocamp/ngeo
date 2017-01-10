goog.provide('gmf.ExportFeatures');
goog.provide('gmf.ExportFormat');

goog.require('gmf');
goog.require('goog.asserts');


/**
 * @enum {string}
 */
gmf.ExportFormat = {
  GPX: 'gpx',
  KML: 'kml'
};


/**
 * @typedef {function(string, gmf.ExportFormat, string)}
 */
gmf.ExportFeatures;


/**
 * @param {Document} $document Angular $document service.
 * @param {gmfx.ServiceUrls} gmfServiceUrls GMF URLs objects.
 * @return {gmf.ExportFeatures} The "export features" function.
 * @ngInject
 * @private
 * @ngdoc service
 * @ngname gmfExportFeatures
 */
gmf.exportFeaturesFactory_ = function($document, gmfServiceUrls) {
  goog.asserts.assert(gmfServiceUrls.exportgpxkml);
  const exportgpxkmlUrl = gmfServiceUrls.exportgpxkml;

  return (
      /**
       * @param {string} doc The document to export/download.
       * @param {gmf.ExportFormat} format The document format.
       * @param {string} filename File name for the exported document.
       */
      function exportFeatures(doc, format, filename) {
        const formatInput = $('<input>').attr({
          type: 'hidden',
          name: 'format',
          value: format
        });
        const nameInput = $('<input>').attr({
          type: 'hidden',
          name: 'name',
          value: filename
        });
        const docInput = $('<input>').attr({
          type: 'hidden',
          name: 'doc',
          value: doc
        });
        const form = $('<form>').attr({
          method: 'POST',
          action: exportgpxkmlUrl
        });
        form.append(formatInput, nameInput, docInput);
        angular.element($document[0].body).append(form);
        form[0].submit();
        form.remove();
      });
};

gmf.module.factory('gmfExportFeatures', gmf.exportFeaturesFactory_);
