goog.provide('ngeo.importOnlineDirective');

goog.require('ngeo.fileService');

(function() {

  var module = angular.module('ngeo.importOnlineDirective', [
    ngeo.fileService.module.name,
    'gettext'
  ]);
  ngeo.importOnlineDirective.module = module;

  /**
   * @constructor
   * @param {angular.$q} $q .
   * @param {angular.$timeout} $timeout .
   * @param {ngeo.File} ngeoFile .
   * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
   * @ngInject
   * @struct
   */
  var Directive = function($q, $timeout, ngeoFile, gettextCatalog) {

    var timeoutP;

    return {
      restrict: 'A',
      templateUrl: 'modules/import/partials/import-online.html',
      scope: {
        options: '=ngeoImportOnlineOptions'
      },
      link: function(scope, elt) {

        if (!scope.options ||
            !angular.isFunction(scope.options.handleFileContent)) {
          elt.remove();
          return;
        }

        scope.handleFileContent = scope.options.handleFileContent;

        var initUserMsg = function() {
          scope.userMessage = 'connect';
          scope.progress = 0;
          scope.loading = false;
        };
        initUserMsg();

        // Create the typeAhead input for the list of urls available
        var taElt = elt.find('input[name=url]').typeahead({
          local: scope.options.urls,
          limit: 500
        });

        // Fill the list of suggestions with all the data
        var initSuggestions = function() {
          var taView = $(taElt).data('ttView');
          var dataset = taView.datasets[0];
          dataset.getSuggestions('http', function(suggestions) {
            taView.dropdownView.renderSuggestions(dataset, suggestions);
          });
        };

        taElt.on('typeahead:initialized', function(evt) {
          // Re-initialize the list of suggestions
          initSuggestions();
        }).on('typeahead:selected', function(evt, datum) {
          // When a WMS is selected in the list, start downloading the
          // GetCapabilities
          scope.fileUrl = datum.value;
          scope.handleFileUrl();
          scope.$digest();
          // Re-initialize the list of suggestions
          initSuggestions();
        });

        // Toggle list of suggestions
        var taMenu = elt.find('.tt-dropdown-menu');
        elt.find('.ngeo-import-open').on('mousedown', function(evt) {
          if (taMenu.css('display') == 'none') {
            taElt.focus();
          } else {
            taElt.blur();
          }
          // Re-initialize the list of suggestions
          initSuggestions();
          evt.preventDefault();
        });

        scope.$on('gettextLanguageChanged', function() {
          if (scope.fileUrl && /lang=/.test(scope.fileUrl)) {
            scope.handleFileUrl();
          }
        });

        scope.cancel = function() {
          scope.progress = 0;
          if (scope.canceler) {
            scope.canceler.resolve();
            scope.canceler = null;
          }
        };

        scope.isValid = function(url) {
          if (scope.options.isValidUrl) {
            scope.options.isValidUrl(url);
          }
          return true;
        };

        // Handle URL of WMS
        scope.handleFileUrl = function() {
          var url = scope.fileUrl;

          if (scope.options.transformUrl) {
            url = scope.options.transformUrl(url);
          }

          scope.canceler = $q.defer();
          scope.loading = true;
          scope.userMessage = 'uploading_file';
          $timeout.cancel(timeoutP);

          // Angularjs doesn't handle onprogress event
          ngeoFile.load(url, scope.canceler).then(function(fileContent) {
            scope.canceler = null;

            return scope.handleFileContent(fileContent, {
              url: scope.fileUrl
            });

          }).then(function(result) {
            scope.userMessage = result.message;

          }, function(err) {
            scope.userMessage = err.message;

          })['finally'](function() {
            scope.canceler = null;
            scope.loading = false;
            timeoutP = $timeout(initUserMsg, 10000);
          });
        };
      }
    };
  };

  module.directive('ngeoImportOnline', Directive);
})();
