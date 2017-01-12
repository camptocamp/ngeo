goog.module('ngeo.importDndDirective');
goog.module.declareLegacyNamespace();

goog.require('ngeo.fileService');

/**
 * @constructor
 * @param {Window} $window The window.
 * @param {jQuery} $document The document.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.File} ngeoFile The ngeo file service.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoImportDndTemplateUrl The template url.
 * @ngInject
 * @struct
 */
exports = function($window, $document, gettextCatalog, ngeoFile, ngeoImportDndTemplateUrl) {

  return {
    restrict: 'A',
    templateUrl: ngeoImportDndTemplateUrl,
    scope: {
      'options': '=ngeoImportDndOptions'
    },
    link(scope, elt) {

      /**
       * @type {ngeox.ImportDndOptions}
       */
      const options = scope['options'];
      if (!options || (typeof options.handleFileContent !== 'function')) {
        elt.remove();
        return;
      }

      scope['handleFileContent'] = options.handleFileContent;

      elt.click(function() {
        // Hide the drop zone on click,
        // used when for some reasons unknown
        // the element stays displayed. See:
        // https://github.com/geoadmin/mf-geoadmin3/issues/1908
        this.style.display = 'none';

      }).on('dragleave drop', function(evt) {
        this.style.display = 'none';

      }).on('dragover dragleave drop', (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

      }).on('drop', (evt) => {

        // A file, an <a> html tag or a plain text url can be dropped
        const files = evt.originalEvent.dataTransfer.files;

        if (files && files.length > 0) {
          ngeoFile.read(files[0]).then((fileContent) => {
            scope['handleFileContent'](fileContent, files[0]);
          });

        } else if (evt.originalEvent.dataTransfer.types) {
          // No files so may be it's HTML link or a URL which has been
          // dropped
          const text = evt.originalEvent.dataTransfer.getData('text/plain');

          if (options.isValidUrl(text)) {
            ngeoFile.load(text).then(fileContent => scope['handleFileContent'](fileContent, {
              url: text
            }))['catch']((err) => {
              $window.alert(gettextCatalog.getString(err.message));
            });
          } else {
            $window.alert(gettextCatalog.getString('Invalid URL') + text);
          }
        }
      });

      // Display the drop zone if the content dragged is dropable.
      const onDragEnter = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        const types = evt.originalEvent.dataTransfer.types || [];
        for (let i = 0, len = types.length; i < len; ++i) {
          if (/(files|text\/plain)/i.test(types[i])) {
            elt.css('display', 'table');
            break;
          }
        }
      };
      $document.on('dragenter', onDragEnter);

      // Block drag of all elements by default to avoid
      // unwanted display of dropzone.
      const onDragStart = function() {
        return false;
      };
      $document.on('dragstart', onDragStart);

      scope.$on('$destroy', () => {
        $document.off('dragEnter', onDragEnter).off('dragstart', onDragStart);
      });
    }
  };
};


exports.module = angular.module('ngeo.importDndDirective', [
  'gettext',
  ngeo.fileService.module.name
]);

exports.module.value('ngeoImportDndTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {boolean} Template URL.
     */
    (element, attrs) => {
      const templateUrl = attrs['ngeoImportDndTemplateUrl'];
      return templateUrl !== undefined ? templateUrl :
          `${ngeo.baseModuleTemplateUrl}/import/partials/import-dnd.html`;
    });

exports.module.directive('ngeoImportDnd', exports);
