/**
 * @module ngeo search namespace
 */
goog.provide('ngeo.modules.search');

goog.require('ol.format.GeoJSON');
goog.require('ol.obj');


/**
 * @type {!angular.Module}
 */
ngeo.modules.search.module = angular.module('ngeoSearch', []);


/**
 * Provides the "ngeoSearch" directive, which uses Twitter's
 * typeahead component to change an input text into a search field.
 *
 * Example:
 *
 *      <input type="text"
 *        ngeo-search="ctrl.typeaheadOptions"
 *        ngeo-search-datasets="ctrl.typeaheadDatasets"
 *        ngeo-search-listeners="crtl.typeaheadListeners">
 *
 * See our live example: [../examples/search.html](../examples/search.html)
 *
 * @htmlAttribute {TypeaheadOptions} ngeo-search The options.
 * @htmlAttribute {Array.<TypeaheadDataset>} ngeo-search-datasets The sources datasets.
 * @htmlAttribute {ngeox.SearchDirectiveListeners} ngeo-search-listeners The listeners.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoSearch
 */
ngeo.modules.search.Directive = function() {
  return {
    restrict: 'A',
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         */
        function(scope, element, attrs) {

          var typeaheadOptionsExpr = attrs['ngeoSearch'];
          var typeaheadOptions = /** @type {TypeaheadOptions} */
              (scope.$eval(typeaheadOptionsExpr));

          var typeaheadDatasetsExpr = attrs['ngeoSearchDatasets'];
          var typeaheadDatasets = /** @type {Array.<TypeaheadDataset>} */
              (scope.$eval(typeaheadDatasetsExpr));

          var args = typeaheadDatasets.slice();
          args.unshift(typeaheadOptions);

          element.typeahead.apply(element, args);

          var typeaheadListenersExpr = attrs['ngeoSearchListeners'];
          var typeaheadListeners_ =
              /** @type {ngeox.SearchDirectiveListeners} */
              (scope.$eval(typeaheadListenersExpr));

          /**
           * @type {ngeox.SearchDirectiveListeners}
           */
          var typeaheadListeners = ngeo.modules.search.Directive.adaptListeners_(
              typeaheadListeners_);

          element.on('typeahead:open', function() {
            scope.$apply(function() {
              typeaheadListeners.open();
            });
          });

          element.on('typeahead:close', function() {
            scope.$apply(function() {
              typeaheadListeners.close();
            });
          });

          element.on('typeahead:cursorchange',
              /**
               * @param {jQuery.Event} event Event.
               * @param {Object} suggestion Suggestion.
               * @param {TypeaheadDataset} dataset Dataset.
               */
              function(event, suggestion, dataset) {
                scope.$apply(function() {
                  typeaheadListeners.cursorchange(event, suggestion, dataset);
                });
              });

          element.on('typeahead:select',
              /**
               * @param {jQuery.Event} event Event.
               * @param {Object} suggestion Suggestion.
               * @param {TypeaheadDataset} dataset Dataset.
               */
              function(event, suggestion, dataset) {
                scope.$apply(function() {
                  typeaheadListeners.select(event, suggestion, dataset);
                });
              });

          element.on('typeahead:autocomplete',
              /**
               * @param {jQuery.Event} event Event.
               * @param {Object} suggestion Suggestion.
               * @param {TypeaheadDataset} dataset Dataset.
               */
              function(event, suggestion, dataset) {
                scope.$apply(function() {
                  typeaheadListeners.autocomplete(event, suggestion, dataset);
                });
              });
        }
  };
};


// Register the directive in the module
ngeo.modules.search.module.directive('ngeoSearch', ngeo.modules.search.Directive);


/**
 * Create a real ngeox.SearchDirectiveListeners object out of the object
 * returned by $eval.
 * @param {ngeox.SearchDirectiveListeners} object Object.
 * @return {ngeox.SearchDirectiveListeners} The listeners object.
 * @private
 */
ngeo.modules.search.Directive.adaptListeners_ = function(object) {
  /** @type {ngeox.SearchDirectiveListeners} */
  var typeaheadListeners;
  if (object === undefined) {
    typeaheadListeners = {
      open: ol.nullFunction,
      close: ol.nullFunction,
      cursorchange: ol.nullFunction,
      select: ol.nullFunction,
      autocomplete: ol.nullFunction
    };
  } else {
    typeaheadListeners = {
      open: object.open !== undefined ?
          object.open : ol.nullFunction,
      close: object.close !== undefined ?
          object.close : ol.nullFunction,
      cursorchange: object.cursorchange !== undefined ?
          object.cursorchange : ol.nullFunction,
      select: object.select !== undefined ?
          object.select : ol.nullFunction,
      autocomplete: object.autocomplete !== undefined ?
          object.autocomplete : ol.nullFunction
    };
  }
  return typeaheadListeners;
};


/**
 * Provides a function that creates a Bloodhound engine
 * expecting GeoJSON responses from the search web service, and creating
 * `ol.Feature` objects as suggestions.
 *
 * Example:
 *
 *     var bloodhound = ngeoCreateGeoJSONBloodhound(
 *       'http://example.com/fulltextsearch?query=%QUERY',
 *       aFilterFunction,
 *       ol.proj.get('EPSG:3857'));
 *     bloodhound.initialize();
 *
 *     var bloodhound = ngeoCreateGeoJSONBloodhound(
 *       '',
 *       undefined,
 *       ol.proj.get('EPSG:3857'),
 *       ol.proj.get('EPSG:21781'),
 *       {
 *         remote: {
 *           url: mySearchEngineUrl,
 *           replace: function(url, query) {
 *             return url +
 *                 '?qtext=' + encodeURIComponent(query) +
 *                 '&lang=' + gettextCatalog.currentLanguage;
 *           }
 *         }
 *       }
 *     );
 *     bloodhound.initialize();
 *
 * @typedef {function(string, (function(GeoJSONFeature): boolean)=,
 * ol.proj.Projection=, ol.proj.Projection=, BloodhoundOptions=,
 * BloodhoundRemoteOptions=):Bloodhound}
 * @ngdoc service
 * @ngname ngeoCreateGeoJSONBloodhound
 */
ngeo.CreateGeoJSONBloodhound;


/**
 * @param {string} url an URL to a search service.
 * @param {(function(GeoJSONFeature): boolean)=} opt_filter function to filter
 *     results.
 * @param {ol.proj.Projection=} opt_featureProjection Feature projection.
 * @param {ol.proj.Projection=} opt_dataProjection Data projection.
 * @param {BloodhoundOptions=} opt_options optional Bloodhound options. If
 *     undefined, the default Bloodhound config will be used.
 * @param {BloodhoundRemoteOptions=} opt_remoteOptions optional Bloodhound
 * remote options. Effective only if `remote` is not defined in `opt_options`.
 * @return {Bloodhound} The Bloodhound object.
 */
ngeo.modules.search.createGeoJSONBloodhound = function(url, opt_filter, opt_featureProjection,
    opt_dataProjection, opt_options, opt_remoteOptions) {
  var geojsonFormat = new ol.format.GeoJSON();
  var bloodhoundOptions = /** @type {BloodhoundOptions} */ ({
    remote: {
      url: url,
      prepare: function(query, settings) {
        settings.url = settings.url.replace('%QUERY', query);
        return settings;
      },
      transform: function(parsedResponse) {
        /** @type {GeoJSONFeatureCollection} */
        var featureCollection = /** @type {GeoJSONFeatureCollection} */
            (parsedResponse);
        if (opt_filter !== undefined) {
          featureCollection = /** @type {GeoJSONFeatureCollection} */ ({
            type: 'FeatureCollection',
            features: featureCollection.features.filter(opt_filter)
          });
        }

        return geojsonFormat.readFeatures(featureCollection, {
          featureProjection: opt_featureProjection,
          dataProjection: opt_dataProjection
        });
      }
    },
    // datumTokenizer is required by the Bloodhound constructor but it
    // is not used when only a remote is passsed to Bloodhound.
    datumTokenizer: ol.nullFunction,
    queryTokenizer: Bloodhound.tokenizers.whitespace
  });

  // the options objects are cloned to avoid updating the passed object
  var options = ol.obj.assign({}, opt_options || {});
  var remoteOptions = ol.obj.assign({}, opt_remoteOptions || {});

  if (options.remote) {
    // move the remote options to opt_remoteOptions
    ol.obj.assign(remoteOptions, options.remote);
    delete options.remote;
  }

  ol.obj.assign(bloodhoundOptions, options);
  ol.obj.assign(bloodhoundOptions.remote, remoteOptions);

  return new Bloodhound(bloodhoundOptions);
};


ngeo.modules.search.module.value('ngeoCreateGeoJSONBloodhound', ngeo.modules.search.createGeoJSONBloodhound);
