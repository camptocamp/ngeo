goog.module('ngeo.importOnlineDirective');
goog.module.declareLegacyNamespace();

goog.require('ngeo.fileService');


/**
 * @constructor
 * @param {angular.$q} $q .
 * @param {angular.$timeout} $timeout .
 * @param {ngeo.File} ngeoFile .
 * @param {gettext} gettext .
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
       ngeoImportOnlineTemplateUrl The template url.
 * @ngInject
 * @struct
 */
exports = function($q, $timeout, ngeoFile, gettext, gettextCatalog, ngeoImportOnlineTemplateUrl) {

  var timeoutP;

  return {
    restrict: 'A',
    templateUrl: ngeoImportOnlineTemplateUrl,
    scope: {
      'options': '=ngeoImportOnlineOptions'
    },
    link: function(scope, elt) {
      /**
       * @type {ngeox.ImportOnlineOptions}
       */
      var options = scope['options'];
      if (!options || (typeof options.handleFileContent !== 'function')) {
        elt.remove();
        return;
      }

      scope['handleFileContent'] = options.handleFileContent;

      var initUserMsg = function() {
        scope['userMessage'] = gettext('Connect');
        scope['progress'] = 0;
        scope['loading'] = false;
      };
      initUserMsg();

      /**
       * @param {Array<{name: string, url: string}>} nameUrls .
       * @return {function(string, function())} The matching function.
       */
      var substringMatcher = function(nameUrls) {
        return function(q, cb) {
          var matches = [];
          if (!q) {
            matches = nameUrls;
          } else {
            var regex = new RegExp(q, 'i');
            nameUrls.forEach(function(nameUrl) {
              if (regex.test(nameUrl['name'])) {
                matches.push(nameUrl);
              }
            });
          }
          cb(matches);
        };
      };

      var nameUrls = scope['options'].urls;
      if (nameUrls && nameUrls.length > 0 && !nameUrls[0]['name']) {
        nameUrls = nameUrls.map(function(url) {
          return {
            'name': url,
            'url': url
          };
        });
      }

      // Create the typeAhead input for the list of urls available
      var taElt = elt.find('input[name=url]').typeahead({
        hint: true,
        highlight: true,
        minLength: 0
      }, {
        name: 'wms',
        displayKey: 'name',
        limit: 500,
        source: substringMatcher(nameUrls)
      }).on('typeahead:selected', function(evt, nameUrl) {
        taElt.typeahead('close');
        // When a WMS is selected in the list, start downloading the
        // GetCapabilities
        scope['fileUrl'] = nameUrl['url'];
        scope['handleFileUrl']();
        scope.$digest();
      }).on('focus', function() {
      });

      scope.$on('gettextLanguageChanged', function() {
        if (scope['fileUrl'] && /lang=/.test(scope['fileUrl'])) {
          scope['handleFileUrl']();
        }
      });

      scope['cancel'] = function() {
        scope['progress'] = 0;
        if (scope['canceler']) {
          scope['canceler'].resolve();
          scope['canceler'] = null;
        }
      };

      scope['isValid'] = function(url) {
        if (options.isValidUrl) {
          return options.isValidUrl(url);
        }
        return true;
      };

      // Handle URL of WMS
      scope['handleFileUrl'] = function() {
        var url = scope['fileUrl'];

        if (options.transformUrl) {
          url = options.transformUrl(url);
        }

        scope['canceler'] = $q.defer();
        scope['loading'] = true;
        scope['userMessage'] = gettext('Dowloading file');
        $timeout.cancel(timeoutP);

        // Angularjs doesn't handle onprogress event
        ngeoFile.load(url, scope['canceler']).then(function(fileContent) {
          scope['canceler'] = null;

          return scope['handleFileContent'](fileContent, {
            url: scope['fileUrl']
          });

        }).then(function(result) {
          scope['userMessage'] = result.message;

        }, function(err) {
          scope['userMessage'] = err.message;

        }).finally(function() {
          scope['canceler'] = null;
          scope['loading'] = false;
          timeoutP = $timeout(initUserMsg, 10000);
        });
      };
    }
  };
};

exports.module = angular.module('ngeo.importOnlineDirective', [
  ngeo.fileService.module.name,
  'gettext'
]);

exports.module.value('ngeoImportOnlineTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {boolean} Template URL.
     */
    function(element, attrs) {
      var templateUrl = attrs['ngeoImportOnlineTemplateUrl'];
      return templateUrl !== undefined ? templateUrl :
          ngeo.baseModuleTemplateUrl + '/import/partials/import-online.html';
    });

exports.module.directive('ngeoImportOnline', exports);
