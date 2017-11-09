goog.provide('gmf.importdatasourceComponent');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.datasource.ExternalDataSourcesManager');
/** @suppress {extraRequire} */
goog.require('gmf.wmscapabilitylayertreenodeComponent');
/** @suppress {extraRequire} */
goog.require('gmf.wmtscapabilitylayertreeComponent');
goog.require('ngeo.Querent');
goog.require('ngeo.datasource.OGC');


/**
 * @private
 */
gmf.ImportdatasourceController = class {

  /**
   * @param {!angular.JQLite} $element Element.
   * @param {!angular.$filter} $filter Angular filter.
   * @param {!angular.$injector} $injector Main injector.
   * @param {!angular.Scope} $scope Angular scope.
   * @param {!angular.$timeout} $timeout Angular timeout service.
   * @param {!gmf.datasource.ExternalDataSourcesManager}
   *     gmfExternalDataSourcesManager GMF service responsible of managing
   *     external data sources.
   * @param {!ngeo.Querent} ngeoQuerent Ngeo querent service.
   * @private
   * @struct
   * @ngInject
   * @ngdoc controller
   * @ngname GmfImportdatasourceController
   */
  constructor($element, $filter, $injector, $scope, $timeout,
    gmfExternalDataSourcesManager, ngeoQuerent) {

    // Binding properties

    /**
     * @type {!ol.Map}
     * @export
     */
    this.map;


    // Injected properties

    /**
     * @type {!angular.JQLite}
     * @private
     */
    this.element_ = $element;

    /**
     * @type {!angular.Scope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {!angular.$timeout}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {!gmf.datasource.ExternalDataSourcesManager}
     * @private
     */
    this.gmfExternalDataSourcesManager_ = gmfExternalDataSourcesManager;

    /**
     * @type {!ngeo.Querent}
     * @private
     */
    this.ngeoQuerent_ = ngeoQuerent;


    // Model properties

    /**
     * @type {File|undefined}
     * @export
     */
    this.file;

    /**
     * @type {string|undefined}
     * @export
     */
    this.url;


    // Inner properties

    /**
     * @type {!angular.JQLite}
     * @private
     */
    this.fileInput_ = $element.find('input[type=file]');

    /**
     * @type {boolean}
     * @export
     */
    this.hasError = false;

    /**
     * @type {?angular.$q.Promise}
     * @private
     */
    this.hasErrorPromise_ = null;

    /**
     * @type {string}
     * @export
     */
    this.mode = gmf.ImportdatasourceController.Mode.ONLINE;

    /**
     * @type {!Array.<string>}
     * @export
     */
    this.modes = [
      gmf.ImportdatasourceController.Mode.LOCAL,
      gmf.ImportdatasourceController.Mode.ONLINE
    ];

    /**
     * @type {boolean}
     * @export
     */
    this.pending = false;

    /**
     * @type {!ngeox.unitPrefix}
     * @private
     */
    this.unitPrefixFormat_ = /** @type {ngeox.unitPrefix} */ (
      $filter('ngeoUnitPrefix'));

    /**
     * Current WMS Capabilities that were connected.
     * @type {?Object}
     * @export
     */
    this.wmsCapabilities = null;

    /**
     * Current WTMS Capabilities that were connected.
     * @type {?Object}
     * @export
     */
    this.wmtsCapabilities = null;

    /**
     * @type {Bloodhound|undefined}
     * @private
     */
    this.serversEngine_;

    const servers = $injector.has('gmfExternalOGCServers') ?
      /** @type {Array.<!gmfx.ExternalOGCServer>|undefined} */ (
        $injector.get('gmfExternalOGCServers')
      ) : undefined;

    if (servers) {
      const serverUrls = servers.map(server => server['url']);
      this.serversEngine_ = new Bloodhound({
        /**
         * Allows search queries to match from string from anywhere within
         * the url, and not only from the beginning of the string (which is
         * the default, non-configurable behaviour of bloodhound).
         *
         * Borrowed from:
         * https://stackoverflow.com/questions/22059933/twitter-typeahead-js-how-to-return-all-matched-elements-within-a-string
         *
         * @param {BloodhoundDatum} datum Datum.
         * @return {Array.<string>} List of datum tokenizers.
         */
        datumTokenizer: (datum) => {
          goog.asserts.assertString(datum);
          const originalDatumTokenizers = Bloodhound.tokenizers.whitespace(
            datum);
          goog.asserts.assert(originalDatumTokenizers);
          const datumTokenizers = [];
          for (const originalDatumTokenizer of originalDatumTokenizers) {
            let i = 0;
            while ((i + 1) < originalDatumTokenizer.length) {
              datumTokenizers.push(
                originalDatumTokenizer.substr(
                  i,
                  originalDatumTokenizer.length
                )
              );
              i++;
            }
          }
          return datumTokenizers;
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        identify: false,
        local: serverUrls
      });
    }

    // Register input[type=file] onchange event, use HTML5 File api
    this.fileInput_.on('change', () => {
      this.file = this.fileInput_[0].files && this.fileInput_[0].files[0] ?
        this.fileInput_[0].files[0] : undefined;
      this.scope_.$apply();
    });
  }

  /**
   * Called on initialization of the component.
   */
  $onInit() {
    this.gmfExternalDataSourcesManager_.map = this.map;


    if (this.serversEngine_) {
      // Timeout to let Angular render the placeholder of the input properly,
      // otherwise typeahead would copy the string with {{}} in it...
      this.timeout_(() => {
        goog.asserts.assert(this.serversEngine_);
        const $urlInput = this.element_.find('input[name=url]');
        $urlInput.typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        }, {
          name: 'url',
          source: this.serversEngine_.ttAdapter()
        });
      });
    }
  }

  /**
   * Triggers a 'click' on the "Browse" button.
   * @export
   */
  browse() {
    this.element_.find('input[type=file][name=file]').click();
  }

  /**
   * Connect to given online resource URL.
   * @export
   */
  connect() {
    const url = goog.asserts.assertString(this.url);
    const serviceType = ngeo.datasource.OGC.guessServiceTypeByUrl(url);

    this.startWorking_();
    if (serviceType === ngeo.datasource.OGC.Type.WMS) {
      this.ngeoQuerent_.wmsGetCapabilities(url).then(
        (wmsCapabilities) => {
          this.wmsCapabilities = wmsCapabilities;
          this.stopWorking_();
        },
        () => {
          // Something went wrong...
          this.stopWorking_(true);
        }
      );
    } else if (serviceType === ngeo.datasource.OGC.Type.WMTS) {
      this.ngeoQuerent_.wmtsGetCapabilities(url).then(
        (wmtsCapabilities) => {
          this.wmtsCapabilities = wmtsCapabilities;
          this.stopWorking_();
        },
        () => {
          // Something went wrong...
          this.stopWorking_(true);
        }
      );
    } else {
      // Could not determine the type of url
      this.timeout_(() => {
        this.stopWorking_(true);
      });
    }
  }

  /**
   * Create data source from file.
   * @export
   */
  load() {
    const file = goog.asserts.assert(this.file);
    this.gmfExternalDataSourcesManager_.createAndAddDataSourceFromFile(file);
  }

  /**
   * @return {string} The name of the file and human-readable size.
   * @export
   */
  get fileNameAndSize() {
    let nameAndSize = '';

    const file = this.file;
    if (file !== undefined) {
      const fileSize = this.unitPrefixFormat_(file.size, 'o');
      nameAndSize = `${file.name}, ${fileSize}`;
    }

    return nameAndSize;
  }


  // === Private methods ===

  /**
   * @private
   */
  startWorking_() {
    this.pending = true;
    this.hasError = false;

    // Clear any previous objects
    this.wmsCapabilities = null;
    this.wmtsCapabilities = null;
  }

  /**
   * @param {boolean=} opt_hasError Whether we stopped working because of after
   *     an error.
   * @private
   */
  stopWorking_(opt_hasError = false) {
    this.pending = false;
    if (opt_hasError) {
      this.hasError = true;
      if (this.hasErrorPromise_) {
        this.timeout_.cancel(this.hasErrorPromise_);
      }
      this.hasErrorPromise_ = this.timeout_(() => {
        this.hasError = false;
        this.hasErrorPromise_ = null;
      }, 3000);
    }
  }
};


/**
 * @enum {string}
 */
gmf.ImportdatasourceController.Mode = {
  LOCAL: 'Local',
  ONLINE: 'Online'
};


gmf.module.component('gmfImportdatasource', {
  bindings: {
    'map': '<'
  },
  controller: gmf.ImportdatasourceController,
  templateUrl: () => `${gmf.baseTemplateUrl}/importdatasource.html`
});
