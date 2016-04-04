goog.provide('gmf.PrintController');
goog.provide('gmf.printDirective');

goog.require('gmf');
goog.require('ngeo.CreatePrint');
goog.require('ngeo.PrintUtils');


ngeo.module.value('gmfPrintTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfPrintTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/print.html';
    });


/**
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     gmfPrintTemplateUrl Template url for the directive.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfPrint
 */
gmf.printDirective = function(gmfPrintTemplateUrl) {
  return {
    bindToController: true,
    controller: 'GmfPrintController',
    controllerAs: 'ctrl',
    templateUrl: gmfPrintTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'map': '=gmfPrintMap',
      'active': '=gmfPrintActive'
    },
    link: function(scope, element, attr) {
      var ctrl = scope['ctrl'];
      scope.$watch(function() {
        return ctrl.active;
      }, function(active) {
        this.setListenCompose(active);
      }.bind(ctrl));
    }
  };
};


gmf.module.directive('gmfPrint', gmf.printDirective);


/**
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angular.$q} $q The Angular $q service.
 * @param {ngeo.PrintUtils} ngeoPrintUtils The ngeo PrintUtils service.
 * @param {ngeo.CreatePrint} ngeoCreatePrint The ngeo Create Print function.
 * @param {string} gmfPrintUrl A MapFishPrint url.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfPrintController
 */
gmf.PrintController = function($timeout, $q, ngeoPrintUtils, ngeoCreatePrint,
    gmfPrintUrl) {

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {angular.$q}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {ngeo.PrintUtils}
   * @private
   */
  this.ngeoPrintUtils_ = ngeoPrintUtils;

  /**
   * @type {ngeo.Print}
   * @private
   */
  this.ngeoPrint_ = ngeoCreatePrint(gmfPrintUrl);

  /**
   * @type {?angular.$q.Deferred}
   * @private
   */
  this.requestCanceler_ = null;

  /**
   * @type {?angular.$q.Promise}
   * @private
   */
  this.statusTimeoutPromise_ = null;

  /**
   * Text to display a "loading" message while waiting for the report.
   * @type {string}
   * @export
   */
  this.printState = '';

  /**
   * Current report reference id.
   * @type {string}
   * @private
   */
  this.curRef_ = '';

  /**
   * @type {string}
   * @export
   */
  this.title;

  /**
   * @type {string}
   * @export
   */
  this.comment;

  /**
   * @type {boolean}
   * @export
   */
  this.legend = true;

  /**
   * @type {Array.<string>}
   * @export
   */
  this.layouts = ['A4 portrait', 'A4 landscape', 'A3 portrait', 'A3 landscape'];

  /**
   * @type {string}
   * @export
   */
  this.layout = this.layouts[0];

  /**
   * @type {Array.<number>}
   * @export
   */
  this.scales = [100, 250, 500, 2500, 5000, 10000, 25000, 50000, 100000,
      500000];

  /**
   * @type {number}
   * @export
   */
  this.scale = this.scales[0];

  /**
   * @type {Array.<number>}
   * @export
   */
  this.dpis = [72];

  /**
   * @type {number}
   * @export
   */
  this.dpi = this.dpis[0];

  /**
   * @type {number}
   * @export
   */
  this.rotation = 0;

  /**
   * @type {Array.<number>}
   * @export
   */
  this.paperSize = [555, 675];

  /**
   * @type {Array.<string>}
   * @export
   */
  this.availableOutput = [];


  /**
   * @return {ol.Size} Size in dots of the map to print.
   */
  var getSizeFn = function() {
    return this.paperSize;
  }.bind(this);

  /**
   * @param {olx.FrameState} frameState Frame state.
   * @return {number} Scale of the map to print.
   */
  var getScaleFn = function(frameState) {
    var mapSize = frameState.size;
    var viewResolution = frameState.viewState.resolution;
    return this.getOptimalScale_(mapSize, viewResolution);
  }.bind(this);

  /**
   * @type {function(ol.render.Event)}
   */
  this.postcomposeListener_ = ngeoPrintUtils.createPrintMaskPostcompose(
      getSizeFn, getScaleFn);
};


/**
 * TODO
 * @param {string} layout TODO
 * @export
 */
gmf.PrintController.prototype.setLayout = function(layout) {
  this.layout = layout;
};


/**
 * TODO
 * @param {number} scale TODO
 * @export
 */
gmf.PrintController.prototype.setScale = function(scale) {
  this.scale = scale;
};


/**
 * TODO
 * @param {number} dpi TODO
 * @export
 */
gmf.PrintController.prototype.setDpi = function(dpi) {
  this.dpi = dpi;
};

/**
 * Draw the print window in a map postcompose listener.
 * @param {boolean} listen true To display mask. False to hides it.
 * events.
 * @private
 */
gmf.PrintController.prototype.setListenCompose = function(listen) {
  if (listen) {
    this.map.on('postcompose', this.postcomposeListener_);
  } else {
    this.map.un('postcompose', this.postcomposeListener_);
  }
};

/**
 * @export
 */
gmf.PrintController.prototype.print = function() {
  this.requestCanceler_ = this.$q_.defer();
  this.printState = 'Printing...';

  var customAttributes = {
    'datasource': [],
    'debug': 0,
    'comments': this.comment,
    'title': this.title
  }

  var mapSize = this.map.getSize();
  var viewResolution = this.map.getView().getResolution();
  var scale = this.getOptimalScale_(mapSize, viewResolution);

  var spec = this.ngeoPrint_.createSpec(this.map, scale, this.dpi,
      this.layout, customAttributes);

  this.ngeoPrint_.createReport(spec, /** @type {angular.$http.Config} */ ({
    timeout: this.requestCanceler_.promise
  })).then(
      this.handleCreateReportSuccess_.bind(this),
      this.handleCreateReportError_.bind(this)
  );
};


/**
 * TODO
 * @export
 */
gmf.PrintController.prototype.cancel = function() {
  // Cancel the latest request, if it's not finished yet.
  goog.asserts.assert(!goog.isNull(this.requestCanceler_));
  this.requestCanceler_.resolve();

  // Cancel the status timeout if there's one set, to make sure no other
  // status request is sent.
  if (!goog.isNull(this.statusTimeoutPromise_)) {
    this.$timeout_.cancel(this.statusTimeoutPromise_);
  }

  goog.asserts.assert(this.curRef_.length > 0);

  this.ngeoPrint_.cancel(this.curRef_);

  this.resetPrintStates_();
};


/**
 * TODO
 * @param {string=} opt_printState the print state.
 * @private
 */
gmf.PrintController.prototype.resetPrintStates_ = function(opt_printState) {
  this.printState = opt_printState || '';
  this.curRef_ = '';
};


/**
 * @param {ol.Size} mapSize Size of the map on the screen (px).
 * @param {number} viewResolution Resolution of the map on the screen.
 * @return {number} The best scale. -1 is returned if there is no optimal
 *     scale, that is the optimal scale is lower than or equal to the first
 *     value in printMapScales.
 * @private
 */
gmf.PrintController.prototype.getOptimalScale_ = function(mapSize,
    viewResolution) {
  if (mapSize !== undefined && viewResolution !== undefined) {
    return this.ngeoPrintUtils_.getOptimalScale(mapSize, viewResolution,
        this.paperSize, this.scales);
  }
  return this.scales[0];
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.PrintController.prototype.handleCreateReportSuccess_ = function(resp) {
  var mfResp = /** @type {MapFishPrintReportResponse} */ (resp.data);
  var ref = mfResp.ref;
  goog.asserts.assert(ref.length > 0);
  this.curRef_ = ref;
  this.getStatus_(ref);
};


/**
 * @param {string} ref Ref.
 * @private
 */
gmf.PrintController.prototype.getStatus_ = function(ref) {
  this.requestCanceler_ = this.$q_.defer();
  this.ngeoPrint_.getStatus(ref, /** @type {angular.$http.Config} */ ({
    timeout: this.requestCanceler_.promise
  })).then(
      this.handleGetStatusSuccess_.bind(this, ref),
      this.handleCreateReportError_.bind(this)
  );
};


/**
 * @param {string} ref Ref.
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.PrintController.prototype.handleGetStatusSuccess_ = function(ref, resp) {
  var mfResp = /** @type {MapFishPrintStatusResponse} */ (resp.data);
  var done = mfResp.done;
  if (done) {
    // The report is ready. Open it by changing the window location.
    window.location.href = this.ngeoPrint_.getReportUrl(ref);
    this.resetPrintStates_();
  } else {
    // The report is not ready yet. Check again in 1s.
    var that = this;
    this.statusTimeoutPromise_ = this.$timeout_(function() {
      that.getStatus_(ref);
    }, 1000, false);
  }
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.PrintController.prototype.handleCreateReportError_ = function(resp) {
  this.resetPrintStates_('Print error');
};


gmf.module.controller('GmfPrintController', gmf.PrintController);
