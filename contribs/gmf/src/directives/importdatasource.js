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
  constructor($element, $timeout, gmfExternalDataSourcesManager, ngeoQuerent) {

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
     * @type {string|undefined}
     * @export
     */
    this.url;


    // Inner properties

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
  }

  /**
   * Called on initialization of the component.
   */
  $onInit() {
    this.gmfExternalDataSourcesManager_.map = this.map;
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
   * Load local file
   * @export
   */
  load() {
    // Todo
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
